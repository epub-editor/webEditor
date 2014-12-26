/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gov.epubapp;

import com.google.gson.Gson;
import com.mongodb.BasicDBObject;
import com.mongodb.DBCursor;
import com.mongodb.MongoClient;
import gov.Util.BookOperator;
import gov.Util.Converter;
import gov.Util.Converter.fileNode;
import java.awt.BorderLayout;
import java.awt.Color;
import javax.swing.JFileChooser;
import javax.swing.JFrame;
import javax.swing.JPanel;

import org.apache.commons.io.IOUtils;
import javax.swing.JOptionPane;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.BufferedWriter;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.StringWriter;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.swing.GroupLayout;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;


import org.w3c.dom.*;
import org.xml.sax.SAXException;

/**
 *
 * @author Kemal Sami KARACA
 */
public class MainFrame  {
           
    
    public static void main(String[] args) throws IOException {                
        
//        new MainFrame(); 
        
        String APP_PATH = "";
        
        DocumentBuilderFactory docFactory = DocumentBuilderFactory.newInstance();
        DocumentBuilder docBuilder;
                
        String epubOpfFile = "/Users/kemal/NetBeansProjects/z-kitap/epubData/epubTemp/OEBPS/ulakbim-ebook.opf";        
        String epubDirectory = "/Users/kemal/NetBeansProjects/z-kitap/epubData/";
        String userFileName = "userOne/";
                    
        BookOperator book = new BookOperator();     
                //book.createEpubMode_FTP();                        
        
        
        
        ArrayList<fileNode> fileList = new ArrayList<>();
        book.converter.getEpubConfFiles(fileList , "/Users/kemal/NetBeansProjects/z-kitap/epubData/epubTemp/OEBPS" , "");     
        
        
        
        
                // Burada item tagları oluşturularak document içerisine atılır
                Document documentForItemTAG = null;
                String str = "";
                for(fileNode f:fileList){

                    str = str + "<item href=\"" + f.data + "\" id=\"" + f.file.getName() + "\" media-type=\"application/xhtml+xml\"/>";    

                }
        
                System.out.println(str);
            
                
                
        Document doc = book.epubApp.getDocument(new File(epubOpfFile));       
        //System.out.println(book.epubApp.documentToString(doc));
        
        
        
        //System.out.println("Node length is :: " + nodeList.get(0).data);
        
        
                
        
        // Find the locatiopn of opf file
        // 
        // -6- create || edit .OPF file
        // -6.1- Get page xhtml file list
        
        // -6.2- Create || edit manifest tag
        // -6.3- Create || edit spine tag
        // -6.4- Create || edit metadata tag
        
        // -6.5- create epub file        
//                book.converter.createEPUB("finalEpub_7"); 
        
        
        

//        try {                                                
//            File logFile = new File("denemeXX.txt");
//
//            BufferedWriter writer = new BufferedWriter(new FileWriter(logFile));
//            writer.write("Hello world!");
//            writer.close();
//        
//        } catch (IOException ex) {
//            Logger.getLogger(MainFrame.class.getName()).log(Level.SEVERE, null, ex);
//        }                
        
    } 
    
}
