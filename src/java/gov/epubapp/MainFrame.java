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
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.swing.GroupLayout;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;


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
    
    public static void main(String[] args) {                
        
//        new MainFrame(); 
        
        String APP_PATH = "";
        
        DocumentBuilderFactory docFactory = DocumentBuilderFactory.newInstance();
        DocumentBuilder docBuilder;
        try {
            docBuilder = docFactory.newDocumentBuilder();
            InputStream is = new ByteArrayInputStream("<section><div></div></section>".getBytes());
            Document docStr = docBuilder.parse(is);  
            NodeList nL = docStr.getChildNodes();    
            for(int i=0; i<nL.getLength(); i++){
                System.out.println(nL.item(i).getNodeName());
            }
            
        } catch (ParserConfigurationException ex) {
            Logger.getLogger(MainFrame.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SAXException ex) {
            Logger.getLogger(MainFrame.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IOException ex) {
            Logger.getLogger(MainFrame.class.getName()).log(Level.SEVERE, null, ex);
        }
        

        
        BookOperator book = new BookOperator();
        Document doc = book.readWriter.getDocument(new File("/Users/kemal/NetBeansProjects/z-kitap/epubData/epubDefault.xhtml"));       
        
        NodeList nList = doc.getChildNodes();       

        for(int i=0; i<nList.getLength(); i++){
            Node n = nList.item(i);
            NodeList nListX = n.getChildNodes();
            for(int m=0; m<nListX.getLength(); m++){
                System.out.println("Node name : " + nListX.item(m).getNodeName());
            }
            
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
