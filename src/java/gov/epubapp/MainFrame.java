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
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.swing.GroupLayout;

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
        
        new MainFrame(); 
        
        String APP_PATH = "";
        




//        File logFile = new File("denemeXX.txt");
//        try {
//            BufferedWriter writer = new BufferedWriter(new FileWriter(logFile));
//            writer.write("Hello world!");
//            writer.close();
//        } catch (IOException ex) {
//            Logger.getLogger(MainFrame.class.getName()).log(Level.SEVERE, null, ex);
//        }
                
        
    } 
    
}
