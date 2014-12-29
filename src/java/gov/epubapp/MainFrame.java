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
import static gov.Util.EpubApp.htmlFileLocation;
import static gov.Util.EpubApp.writeDocumentToFile;
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
        
        BookOperator book = new BookOperator("book_text1");             
        book.createEpubMode_FTP();                                           
        
        
        
        
        
        
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
