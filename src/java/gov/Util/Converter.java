/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gov.Util;

import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.util.Enumeration;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.apache.commons.compress.archivers.zip.ZipArchiveEntry;
import org.apache.commons.compress.archivers.zip.ZipArchiveOutputStream;
import org.apache.commons.compress.archivers.zip.ZipFile;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;

/**
 *
 * @author Kemal Sami KARACA
 * @version 1.001
 */
public class Converter {

    // DIRECTORY
    private static String DEFAULT_EPUB_CONF_DIRECTORY = "/Users/kemal/Desktop/" + "epubConf";
    private static String USER_EPUB_CONF_DIRECTORY = "/Users/kemal/Desktop/" + "epubTemp";
    private static String USER_EPUB_FILE = "/Users/kemal/Desktop/" + "epubVersion"; 
    private static String EPUB_INIT_HTML = "/Users/kemal/Desktop/" + "epubInitHTML";
    // FILES
    private static String INITIAL_HTML = "/Users/kemal/Desktop/" + "zbook_Init.xhtml";
    
    
    public Converter(){                
                
    }
    
    /**
     * @return the DEFAULT_EPUB_CONF_DIRECTORY
     */
    public static String getDEFAULT_EPUB_CONF_DIRECTORY() {
        return DEFAULT_EPUB_CONF_DIRECTORY;
    }

    /**
     * @return the USER_EPUB_CONF_DIRECTORY
     */
    public static String getUSER_EPUB_CONF_DIRECTORY() {
        return USER_EPUB_CONF_DIRECTORY;
    }

    /**
     * @return the USER_EPUB_FILE
     */
    public static String getUSER_EPUB_FILE() {
        return USER_EPUB_FILE;
    }
    
    public File getFile_epubTemp(){
        return new File(getUSER_EPUB_CONF_DIRECTORY());
    }
    public File getFile_epubVersion(){
        return new File(getUSER_EPUB_FILE()); 
    }
              
    
    
    
    
    /*****************************************************************************
    ************************** FILL EPUB CONF TEMP *******************************
    ******************************************************************************/    
    /**
     * @return 
     * 
     * This function will used to create Epub configurations in "USER_EPUB_CONF_DIRECTORY" directory
     * -1- Copy default configuration files from "DEFAULT_EPUB_CONF_DIRECTORY"
     * -2- Edit OEBPS folder configuration
     */
    public boolean createEpubConfFiles(){        
        try {
            FileUtils.copyDirectory(new File(getDEFAULT_EPUB_CONF_DIRECTORY()), new File(getUSER_EPUB_CONF_DIRECTORY()));
        } catch (IOException ex) {
            Logger.getLogger(Converter.class.getName()).log(Level.SEVERE, null, ex);
            return false;
        }
        return true;
    }
    
    
    
    
    
    /*****************************************************************************
    ************************** CREATE EPUB FILE **********************************
    ******************************************************************************/
    /**
     * 
     * @return
     * @throws IOException 
     * 
     * This function will be used for create .epub file in "USER_EPUB_FILE"
     */
    public boolean createEPUB(String epubName) throws IOException{
        FileOutputStream fOut = null;
        BufferedOutputStream bOut = null;
        ZipArchiveOutputStream tOut = null;
 
        try {
            fOut = new FileOutputStream(new File(getUSER_EPUB_FILE() + "/" + epubName + ".epub"));
            bOut = new BufferedOutputStream(fOut);
            tOut = new ZipArchiveOutputStream(bOut);   
            
            File[] children = new File(getUSER_EPUB_CONF_DIRECTORY() + "/").listFiles();
            for (File child : children) {                
                addFileToZip(tOut, child.getAbsolutePath(), "");
            }
                        
        } catch (FileNotFoundException ex) {
            Logger.getLogger(Converter.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            tOut.finish();
            tOut.close();
            bOut.close();
            fOut.close();
        }
        return false;
    }
    
    
    private static void addFileToZip(ZipArchiveOutputStream zOut, String path, String base) throws IOException {
        File f = new File(path);
        String entryName = base + f.getName();
        ZipArchiveEntry zipEntry = new ZipArchiveEntry(f, entryName);
        
        zOut.putArchiveEntry(zipEntry);
 
        if (f.isFile()) {
            FileInputStream fInputStream = null;
            try {
                fInputStream = new FileInputStream(f);
                IOUtils.copy(fInputStream, zOut);
                zOut.closeArchiveEntry();
            } finally {
                IOUtils.closeQuietly(fInputStream);
            }
 
        } else {
            zOut.closeArchiveEntry();
            File[] children = f.listFiles();
 
            if (children != null) {
                for (File child : children) {
                    addFileToZip(zOut, child.getAbsolutePath(), entryName + "/");
                }
            }
        }
    }
    
    
    
    
    
    /*****************************************************************************
    *************************  EPUB TO HTML  *************************************
    ******************************************************************************/
    public boolean extractEpub(String archivePath, String destinationPath) {
        File archiveFile = new File(archivePath);
        File unzipDestFolder = null;
 
        try {
            unzipDestFolder = new File(destinationPath);
            String[] zipRootFolder = new String[]{null};
            unzipFolder(archiveFile, archiveFile.length(), unzipDestFolder, zipRootFolder);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        return false;
    }
    public boolean extractEpub(File archiveFile, String destinationPath) {        
        File unzipDestFolder = null;
 
        try {
            unzipDestFolder = new File(destinationPath);
            String[] zipRootFolder = new String[]{null};
            unzipFolder(archiveFile, archiveFile.length(), unzipDestFolder, zipRootFolder);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        return false;
    }
     
    
    private static boolean unzipFolder(File archiveFile, long compressedSize, File zipDestinationFolder, String[] outputZipRootFolder ) {
 
        ZipFile zipFile = null;
        try {
            zipFile = new ZipFile(archiveFile);
            byte[] buf = new byte[65536];
            
            Enumeration<? extends ZipArchiveEntry> entries = zipFile.getEntries();            
            while (entries.hasMoreElements()) {
                
                ZipArchiveEntry zipEntry = entries.nextElement();
                String name = zipEntry.getName();
                name = name.replace('\\', '/');               
                
                int i = name.indexOf('/');
                if (i > 0) {
                    outputZipRootFolder[0] = name.substring(0, i);                    
                }
                                                                                                
                File destinationFile = new File(zipDestinationFolder, name);                                    
                if (name.endsWith("/")) { 
                    if (!destinationFile.isDirectory() && !destinationFile.mkdirs()) {
                        log("Error creating temp directory:" + destinationFile.getPath());
                        return false;
                    }
                    continue;
                }else if (name.indexOf('/') != -1) {
                    // Create the the parent directory if it doesn't exist                    
                    File parentFolder = destinationFile.getParentFile();                    
                    if (!parentFolder.isDirectory()) {
                        if (!parentFolder.mkdirs()) {
                            log("Error creating temp directory:" + parentFolder.getPath());
                            return false;
                        }
                    }
                }                
                
                FileOutputStream fos = null;
                try{                    

                    if(!destinationFile.isDirectory()){                                                                        
                        fos = new FileOutputStream(destinationFile);
                        int n;
                        InputStream entryContent = zipFile.getInputStream(zipEntry);
                        while ((n = entryContent.read(buf)) != -1) {
                            if (n > 0) {
                                fos.write(buf, 0, n);
                            }
                        }
                    }                   
                }finally{
                    if (fos != null) {
                        fos.close();
                    } 
                }
                                                                
            }            
            return true;
            
        } catch (IOException ex) {
            Logger.getLogger(Converter.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        return false;
    }
 
    
 
    
    
    /*****************************************************************************
    *************************  COMMON FUNCTIONs  *********************************
    ******************************************************************************/
    
    public static boolean clearDirectory(File file){                
        try { 
            FileUtils.cleanDirectory(file);
        } catch (IOException ex) {
            Logger.getLogger(Converter.class.getName()).log(Level.SEVERE, null, ex);
        }
        return false;
    }
    
    private static void log(String msg) {
        System.out.println(msg);
    }
    
        
    
}
