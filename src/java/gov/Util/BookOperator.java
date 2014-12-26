/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gov.Util;

import com.mongodb.BasicDBObject;
import gov.DBOperations.MongoDBOperations;
import static gov.Util.Converter.getUSER_EPUB_FILE;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
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
    public static String bookPage0001_xhtml = "/Users/kemal/NetBeansProjects/z-kitap/epubData/epubTemp/OEBPS/text/book_0000.xhtml";
    
    // Other variables     
    public static String htmlFileLocation = "Users/kemal/NetBeansProjects/z-kitap/epubData/epubInitHTML/ulak.html";            
        
    public Converter converter;
    public EpubApp epubApp;           
    
    public BookOperator(){
        
        converter = new Converter();
        epubApp = new EpubApp();
        
        Process proc;
        try {
            
            
            
            proc = Runtime.getRuntime().exec("pwd");
            InputStream in = proc.getInputStream();   
            System.out.println("Working path :: " + IOUtils.toString(in));
            
            System.out.println(Runtime.getRuntime().exec("cd epubData"));
            proc = Runtime.getRuntime().exec("pwd");
            in = proc.getInputStream();   
            System.out.println("Working path change to :: " + IOUtils.toString(in));
            
            proc = Runtime.getRuntime().exec("ls");
            in = proc.getInputStream();                        
            System.out.println("Working directory list :: " + IOUtils.toString(in)); 
            
            
            
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
    public void createEpubMode_FTP() throws UnknownHostException{
            
            // -1- Prepare epub configuration file/folders
            this.converter.createEpubConfFiles(epubConfDirectory,epubTempDirectory);
                  
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
            epubApp.appendContentToDocument(doc , docPages.get(0) , "body");
            
            System.out.println(this.epubApp.documentToString(doc));
            
            // -5- create .xhtml file             
            epubApp.writeDocumentToFile(new File(bookPage0001_xhtml) , doc , "xml");
            
            // -6- create || edit .OPF file
            // -6.1- Create || edit manifest tag
            // -6.2- Create || edit spine tag
            // -6.3- Create || edit metadata tag
            
            // -7- create epub file with using Converter class
            //converter.createEPUB("first");     
            
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
            epubApp.appendContentToDocument(doc , docPages.get(0) , "body");
            
            System.out.println(this.epubApp.documentToString(doc));
            
            // -5- create .xhtml file             
            epubApp.writeDocumentToFile(new File(bookPage0001_xhtml) , doc , "xml");
            
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
