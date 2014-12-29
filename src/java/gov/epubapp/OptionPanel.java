/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gov.epubapp;

import gov.Util.Converter;
import gov.Util.BookOperator;
import static gov.Util.EpubApp.*;
import java.awt.Color;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.swing.GroupLayout;
import javax.swing.JButton;
import javax.swing.JFileChooser;
import javax.swing.JPanel;
import org.apache.commons.io.IOUtils;

/**
 *
 * @author kemal
 */
public class OptionPanel extends JPanel implements ActionListener {

    BookOperator bookOp = new BookOperator("asd");
    
    private JButton importButton;
    private JButton exportButton;
    private JButton newDocument;
    private JFileChooser fileChooser;
    
    private Converter converter;
    
    public OptionPanel() {
        initComponents();
    }
    
    @SuppressWarnings("unchecked")
    private void initComponents() {
        
        converter = new Converter();
        
        importButton = new JButton();
        importButton.setText("Import epub File");                         
        importButton.addActionListener(this); 
        
        exportButton = new JButton();
        exportButton.setText("Create epub file");
        exportButton.addActionListener(this); 
        
        newDocument = new JButton();
        newDocument.setText("New Document");
        newDocument.addActionListener(this); 
        
        this.setBackground(Color.cyan);
        
        fileChooser = new JFileChooser();                                
        this.setLayout(layoutConf());      
        
    }
          
    public GroupLayout layoutConf(){
        GroupLayout layout = new GroupLayout(this);
        
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)                                  
                .addComponent(importButton)
                .addComponent(exportButton)
                .addComponent(newDocument)
        );                
        
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                .addGroup(layout.createSequentialGroup()
                    .addComponent(importButton)
                    .addComponent(exportButton)
                    .addComponent(newDocument)
                    .addContainerGap())
            
        );        
        return layout;        
    } 
    
    @Override
    public void actionPerformed(ActionEvent e){
                                                    
        if(e.getSource() == importButton){
                                    
            int returnVal = fileChooser.showOpenDialog(this);
            if(returnVal == JFileChooser.APPROVE_OPTION){
                
// Aşağıdaki commetli satırlar açılacak

//                bookOp.file = fileChooser.getSelectedFile();                                   
//                
//                // -0- Clear directory of "epubTemp"
//                bookOp.preImport();
//                // -1- Extract epub file to "epubTemp" directory                
//                boolean isOK = converter.extractEpub( bookOp.file , converter.getUSER_EPUB_CONF_DIRECTORY());
//                // -2- If extract properly then create editable html
//                if(isOK){
//                    opfDirectory = findOPFDirectory();                
//                    prepareInitHTML(new File("epubInitHTML/zbook_Init.xhtml"),new File(epubTemp+opfDirectory));
//                }
                                
            }else if(returnVal == JFileChooser.CANCEL_OPTION){
                System.out.println("IMPORT-BUTTON > Cancel selected");
            }else if(returnVal == JFileChooser.ERROR_OPTION){
                System.out.println("IMPORT-BUTTON > Error occured");
            }else{
                System.out.println("IMPORT-BUTTON > Unexpected ERROR");
            }
            
            
        }else if(e.getSource() == exportButton){
            
            try { 
                converter.createEPUB("first");
            } catch (IOException ex) {
                Logger.getLogger(OptionPanel.class.getName()).log(Level.SEVERE, null, ex);
            }
            
            
        }else if(e.getSource() == newDocument){
            System.out.println("Create new Document");
            System.out.println(" -1- ");
            converter.clearDirectory(converter.getFile_epubTemp());
            converter.createEpubConfFiles();
        }
        
    }
    
    
}
