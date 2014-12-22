/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gov.Util;

import gov.epubapp.Converter;
import static gov.epubapp.Converter.getUSER_EPUB_FILE;
import gov.epubapp.EpubApp;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.apache.commons.io.IOUtils;

/**
 *
 * @author kemal
 */
public class BookOperator {
    
    public String path = "";
    public String ls = "";
    public File file = new File("/Users/kemal/Desktop/widget-figure-gallery-20121022.epub");
    
    public Converter converter;
    public EpubApp readWriter;
    
    
    public BookOperator(){
        
        converter = new Converter();
        readWriter = new EpubApp();
        
        Process proc;
        try {
            proc = Runtime.getRuntime().exec("pwd");
            InputStream in = proc.getInputStream();            
            path = IOUtils.toString(in);
            
            proc = Runtime.getRuntime().exec("ls");
            in = proc.getInputStream();            
            ls = IOUtils.toString(in);
                        
            System.out.println(converter.getUSER_EPUB_FILE());
            converter.createEPUB("first");     
            
            
            
        } catch (IOException ex) {
            Logger.getLogger(BookOperator.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        
        
    }
    
    
    public void preImport(){
        converter.clearDirectory(converter.getFile_epubTemp());
    }
    
}
