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
    
    
    
    public static String epubTemp =  "/Users/kemal/NetBeansProjects/z-kitap/epubData/epubTemp/";
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
                        
            proc = Runtime.getRuntime().exec("ls");
            in = proc.getInputStream();                        
            System.out.println("Working directory list :: " + IOUtils.toString(in));
            
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
            Document doc = this.epubApp.getDocument(new File("/Users/kemal/NetBeansProjects/z-kitap/epubData/epubDefault.xhtml"));
            epubApp.appendContentToDocument(doc , docPages.get(0) , "body");
            
            System.out.println(this.epubApp.documentToString(doc));
            
            // -5- create .xhtml file             
            epubApp.writeDocumentToFile(new File("/Users/kemal/NetBeansProjects/z-kitap/epubData/epubTemp/OEBPS/text/book_0000.xhtml") , doc , "xml");                                                           
            
            // -6- create || edit .OPF file
            
            // -7- create epub file with using Converter class
            //converter.createEPUB("first");     
            
                        
            
            
            
            
            
        } catch (IOException ex) {
            Logger.getLogger(BookOperator.class.getName()).log(Level.SEVERE, null, ex);
        }
                
        
    }
    
    public ArrayList<BasicDBObject> getPages(String bookID) throws UnknownHostException{
                
        MongoDBOperations mongodb;                                              
        return new MongoDBOperations().getDataFromMongo("ebook", "books", new BasicDBObject().append("bookID", bookID));        
    }
    
    
    public void preImport(){
        converter.clearDirectory(converter.getFile_epubTemp());
    }
    
}
