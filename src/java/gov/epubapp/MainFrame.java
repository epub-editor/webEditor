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
public class MainFrame extends javax.swing.JFrame {
       
    public JFileChooser fileChooser;
    public JPanel optionPanel;
    
    public MainFrame(){         
        
        this.setTitle("FrameDemo");
        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        this.setVisible(true);
        this.setSize(250, 250);    
        
        optionPanel = new OptionPanel();
        
        this.add(optionPanel,BorderLayout.WEST);
        
        javax.swing.JPanel panel = new javax.swing.JPanel();
        panel.setBackground(Color.red);
        this.add(panel, BorderLayout.CENTER);
        
    }       
    
    
    /**
     * This function will be used for append content of page to new xhtml document
     * to specific element.For example docImport can be appended to head or body
     * element
     * 
     * @example
            * Document docWithBody
            <html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="tr">
            <head></head>
            <body>
                </body>
            </html>
            * Document docContent
            <section><div/><div/></section>
            * element --> "body"
            * Result
            <html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="tr">
            <head></head>
            <body>
                <section><div/><div/></section></body>
            </html>            
     * 
     * @param docMain
     * @param docImport
     * @param element       { "body" | "head" }
     * @return boolean
     */
    public static boolean appendContentToDocument(Document docMain , Document docImport , String element){
        // get list of body tags
        NodeList bodyElement;
        if(element.equalsIgnoreCase("body")){
            bodyElement = docMain.getElementsByTagName("body");
        }else if(element.equalsIgnoreCase("head")){
            bodyElement = docMain.getElementsByTagName("head");
        }else{
            return false;
        }                
        // size of body element size should be 1
        if(bodyElement.getLength()==1){
            NodeList contentChildren = docImport.getChildNodes();            
            for(int i=0; i<contentChildren.getLength(); i++){
                Node conChild = contentChildren.item(i);  
                // <--* Node should be imported to document *--> OR
                // <--* It should be change owner of node *--> because appended node's source document different
                Node importedNode = docMain.importNode(conChild, true);
                bodyElement.item(0).appendChild(importedNode);                
            }
            return true;
        }        
        return false;
    }
            
    
    /**
     * This function one of the common methods for document operations.Function 
     * provides to convert document to readable string    
     *     
     * @param doc 
     * @return String
     */
    public static String documentToString(Document doc){
        TransformerFactory tf = TransformerFactory.newInstance();
        Transformer transformer;
        String output = "";
        try {
            transformer = tf.newTransformer();
            transformer.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "yes");
            StringWriter writer = new StringWriter();
            transformer.transform(new DOMSource(doc), new StreamResult(writer));
            output = writer.getBuffer().toString().replaceAll("\r", "");
        } catch (TransformerConfigurationException ex) {
            Logger.getLogger(MainFrame.class.getName()).log(Level.SEVERE, null, ex);
        } catch (TransformerException ex) {
            Logger.getLogger(MainFrame.class.getName()).log(Level.SEVERE, null, ex);
        }                
        return output;        
    }
            
    
    
    public static void main(String[] args) throws IOException {                
        
//        new MainFrame(); 
        
        String APP_PATH = "";
        
        DocumentBuilderFactory docFactory = DocumentBuilderFactory.newInstance();
        DocumentBuilder docBuilder;
                
            
        BookOperator book = new BookOperator();                                    
//        Document docContent = book.epubApp.getDocument("<section><div></div><div></div></section>");    
//        
//        Document docLink = book.epubApp.getDocument("<link href=\"../styles/ebook_XXXs.css\" rel=\"stylesheet\" type=\"text/css\"/>");                                                   
//        Document doc = book.epubApp.getDocument(new File("/Users/kemal/NetBeansProjects/z-kitap/epubData/epubDefault.xhtml"));                               
//
//        appendContentToDocument(doc , docContent , "body");
//        appendContentToDocument(doc, docLink , "head");
//        System.out.println(documentToString(doc));
//                                                           
//        
//        book.converter.createEPUB("finalEpub"); 
        
        


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
