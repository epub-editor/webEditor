/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gov.Util;

import com.mongodb.BasicDBObject;
import gov.DBOperations.MongoDBOperations;
import static gov.Util.Converter.getUSER_EPUB_FILE;
import static gov.Util.EpubApp.writeDocumentToFile;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.io.IOUtils;
import org.w3c.dom.*;

/**
 *
 * @author kemal
 */
public class BookOperator {
    
    // Necessary files
    public static String epubDefault_xhtml = "/Users/kemal/NetBeansProjects/z-kitap/epubData/epubConf/epubDefault.xhtml";
    public static String epubConfDirectory = "/Users/kemal/NetBeansProjects/z-kitap/epubData/epubConf/epubDefault";
    public static String epubTempDirectory = "/Users/kemal/NetBeansProjects/z-kitap/epubData/epubTemp";  
    public static String epubOEBPSDirectory = "/Users/kemal/NetBeansProjects/z-kitap/epubData/epubTemp/OEBPS";  
    public static String epubOPFFile = "/Users/kemal/NetBeansProjects/z-kitap/epubData/epubTemp/OEBPS/ulakbim-ebook.opf";
    public static String bookPage0001_xhtml = "/Users/kemal/NetBeansProjects/z-kitap/epubData/epubTemp/OEBPS/text/book_0000.xhtml";
    
    // Other variables     
    public static String htmlFileLocation = "Users/kemal/NetBeansProjects/z-kitap/epubData/epubInitHTML/ulak.html";            
        
    public Converter converter;
    public EpubApp epubApp;    
    public Book book;
    
    public BookOperator(String bookID){
        
        converter = new Converter();
        epubApp = new EpubApp();
        book = new Book(bookID);        
        
        Process proc;
        try {
            proc = Runtime.getRuntime().exec("pwd");
            InputStream in = proc.getInputStream();   
            System.out.println("Working path :: " + IOUtils.toString(in));
        } catch (IOException ex) {
            Logger.getLogger(BookOperator.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        
    }
    
    
    /*****************************************************************************
    ************************** CREATE EPUB FILE **********************************
    ******************************************************************************/
    /**
     * This function will be used for create .epub file (MODE_FTP).In this creation
     * method there is default epub file&folders which is copied to user directory
     * .epub file created with this configuration
     * 
     * MODE_DB will create all configuration file and folder itself
     * 
     * @return
     * @throws IOException 
     */
    public void createEpubMode_FTP() throws UnknownHostException, IOException{
            
            // -1- Prepare epub configuration file/folders
            this.converter.createEpubConfFiles(epubConfDirectory,epubTempDirectory);
                  
            // -2- Get book from mongo
            ArrayList<BasicDBObject> pages = getPages(book.getBookID());
            
            // -3- create ArrayList<Document> which are contents of pages
            ArrayList<Document> docPages = new ArrayList<>();
            for(int i=0; i<pages.size(); i++){
                String content = pages.get(i).getString("bookContent");                
                docPages.add(this.epubApp.getDocument(content));
            }                                     
            
            // -4- add content documents to pages
            Document doc = this.epubApp.getDocument(new File(epubDefault_xhtml));
            epubApp.appendContentToDocument(doc , docPages.get(0) , "body");                        
            
            // -5- create .xhtml file             
            epubApp.writeDocumentToFile(new File(bookPage0001_xhtml) , doc , "xml");
            
            // -6- create || edit .OPF file   
            // -6.1- Create || edit manifest tag
            // -6.2- Create || edit spine tag
            // -6.3- Create || edit metadata tag
            ArrayList<Converter.fileNode> fileList = new ArrayList<>();
            converter.getEpubConfFiles(fileList , epubOEBPSDirectory , "");     
            
            Document documentForItemTAG = null;
            Document documentForItemrefTAG = null;
            Document doc_opf = epubApp.getDocument(new File(epubOPFFile));
            Document manifest_TAG = epubApp.getDocument("<manifest></manifest>");
            Document spine_TAG = epubApp.getDocument("<spine page-progression-direction=\"ltr\"></spine>");
            for(Converter.fileNode f:fileList){
                                      
                if(!f.file.getName().equalsIgnoreCase(".DS_Store")){
                    String ext = FilenameUtils.getExtension(f.file.getName());
                    
                    System.out.println("EXT of file " + f.file.getName() + " -- " + ext);
                
                    // create item TAG
                    documentForItemTAG = null;      // to prevent adding item tags multiple-times
                    documentForItemrefTAG = null;   // to prevent adding item tags multiple-times
                    if(f.file.getName().equalsIgnoreCase("toc.xhtml")){
                        documentForItemTAG = epubApp.getDocument("<item href=\"" + f.epubDirectory + "\" id=\"" + f.file.getName() + "\" media-type=\"application/x-dtbncx+xml\"/>");
                    }else if(ext.equalsIgnoreCase("xhtml")){
                        String pageId = f.file.getName();
                        documentForItemTAG = epubApp.getDocument("<item href=\"" + f.epubDirectory + "\" id=\"" + pageId + "\" media-type=\"application/xhtml+xml\" properties=\"scripted\" />");
                        documentForItemrefTAG = epubApp.getDocument("<itemref idref=\"" + pageId + "\" />");
                    }else if(ext.equalsIgnoreCase("jpg")){
                        documentForItemTAG = epubApp.getDocument("<item href=\"" + f.epubDirectory + "\" id=\"" + f.file.getName() + "\" media-type=\"image/jpeg\" />");
                    }else if(ext.equalsIgnoreCase("js")){
                        documentForItemTAG = epubApp.getDocument("<item href=\"" + f.epubDirectory + "\" id=\"" + f.file.getName() + "\" media-type=\"application/javascript\" />");
                    }
                    
                    // SEPERATE TAGs          
                    if(documentForItemTAG!=null)
                        epubApp.appendContentToDocument(manifest_TAG, documentForItemTAG, "manifest");
                    
                    if(documentForItemrefTAG!=null)
                        epubApp.appendContentToDocument(spine_TAG, documentForItemrefTAG, "spine");
                }
                
            }
                        
            // import new created nodes 
            Node importedManifest = doc_opf.importNode(manifest_TAG.getElementsByTagName("manifest").item(0), true);
            Node importedSpine = doc_opf.importNode(spine_TAG.getElementsByTagName("spine").item(0), true);
            // replace imported nodes
            doc_opf.getElementsByTagName("package").item(0).replaceChild( importedManifest , doc_opf.getElementsByTagName("manifest").item(0) );
            doc_opf.getElementsByTagName("package").item(0).replaceChild( importedSpine , doc_opf.getElementsByTagName("spine").item(0) );
            // write result to opf file
            writeDocumentToFile(new File(epubOPFFile) , doc_opf , "xml");
            
                        
            // -7- create epub file with using Converter class
            converter.createEPUB("ULAK_BOOK_EDITOR");     
            
    }
    
    
    /**
     * This function will be used for create .epub file (MODE_DB).In this creation
     * method configuration properties getting from databases;
     * 
     * @return
     * @throws IOException 
     */
    public void createEpubMode_DB() throws UnknownHostException{
            
            // -1- Prepare epub configuration file/folders            
                  
            // -2- Get book from mongo
            ArrayList<BasicDBObject> pages = getPages("book_text1");
            
            // -3- create ArrayList<Document> which are contents of pages
            ArrayList<Document> docPages = new ArrayList<>();
            for(int i=0; i<pages.size(); i++){
                String content = pages.get(i).getString("bookContent");                
                docPages.add(this.epubApp.getDocument(content));
            }                                     
            
            // -4- add content documents to pages
            Document doc = this.epubApp.getDocument(new File(epubDefault_xhtml));
            this.epubApp.appendContentToDocument(doc , docPages.get(0) , "body");
            
            System.out.println(this.epubApp.documentToString(doc));
            
            // -5- create .xhtml file             
            this.epubApp.writeDocumentToFile(new File(bookPage0001_xhtml) , doc , "xml");                       
            
            /*
            ArrayList<BasicDBObject> containerFile = book.getEpubContainerXML("epubContainer");
            String containerContent = containerFile.get(0).getString("content");
            String containerDirectory = containerFile.get(0).getString("directory");

            ArrayList<BasicDBObject> mimetypeFile = book.getEpubContainerXML("epubContainer");
            String mimeTypeContent = mimetypeFile.get(0).getString("content");
            String mimeTypeDirectory = mimetypeFile.get(0).getString("directory");
            */
            
            // -6- create || edit .OPF file
            // -6.1- Create || edit manifest tag
            // -6.2- Create || edit spine tag
            // -6.3- Create || edit metadata tag
            
            // -7- create epub file with using Converter class
            //converter.createEPUB("first");     
            
    }
    
    
    
    
    public ArrayList<BasicDBObject> getPages(String bookID) throws UnknownHostException{                
        MongoDBOperations mongodb;                                              
        return new MongoDBOperations().getDataFromMongo("ebook", "books", new BasicDBObject().append("bookID", bookID));        
    }
    
    public ArrayList<BasicDBObject> getEpubContainerXML(String fileID) throws UnknownHostException{                
        MongoDBOperations mongodb;                                              
        return new MongoDBOperations().getDataFromMongo("ebook", "epubConf", new BasicDBObject().append("confID", fileID));        
    }
    
    
    public void preImport(){
        converter.clearDirectory(converter.getFile_epubTemp());
    }
    
}
