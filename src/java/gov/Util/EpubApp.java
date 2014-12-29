/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gov.Util;

import gov.epubapp.MainFrame;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.xml.parsers.*;
import javax.xml.transform.*;
import javax.xml.transform.dom.*;
import javax.xml.transform.stream.*;
import org.w3c.dom.*;
import org.xml.sax.SAXException;

/**
 *
 * @author Kemal Sami KARACA
 */
public class EpubApp {
            
        
//        Converter converter = new Converter();
//        converter.createEpubConfFiles();
//        converter.createEPUB("first");                       
//        
//        converter.clearDirectory(converter.getFile_epubTemp());                
//        converter.clearDirectory(converter.getFile_epubVersion());        
//        converter.extractEpub( converter.getUSER_EPUB_FILE()+"/second.epub", converter.getUSER_EPUB_CONF_DIRECTORY());
                
        
        // bu method opf file bulur ve editable html üretilmesini sağlar
//        opfDirectory = findOPFDirectory();                
//        prepareInitHTML(new File("epubInitHTML/zbook_Init.xhtml"),new File(epubTemp+opfDirectory));                                    
                   
    
    /*****************************************************************************
    *************************  XML OPERATION  ************************************
    ******************************************************************************/
       
    public static String opfDirectory = "";
    public static String epubTemp =  "/Users/kemal/NetBeansProjects/z-kitap/epubData/epubTemp/";
    public static String htmlFileLocation = "/Users/kemal/NetBeansProjects/z-kitap/epubData/epubInitHTML/ulak.html";
    
    /**
     * This function one of the common methods for xml operations.Function provides
     * to write Document variable to "file" with given "format"(html,xml,xhtml)
     * 
     * IF file==null then result shows in stacktrace 
     * 
     * @param file
     * @param doc
     * @param format 
     */
    public static void writeDocumentToFile(File file , Document doc , String format){
        try {
            TransformerFactory transformerFactory = TransformerFactory.newInstance();
            Transformer transformer = transformerFactory.newTransformer();
            transformer.setOutputProperty(OutputKeys.INDENT, "yes");
            transformer.setOutputProperty(OutputKeys.METHOD, format);
            transformer.setOutputProperty(OutputKeys.ENCODING, "UTF-8");
            transformer.setOutputProperty("{http://xml.apache.org/xslt}indent-amount", "4");            
            StreamResult result = file==null ? new StreamResult(System.out) : new StreamResult(file);            
            DOMSource source = new DOMSource(doc);   
            transformer.transform(source, result);            
        } catch (TransformerException ex) {
            Logger.getLogger(EpubApp.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
        
    
    /**
     * This function used for create initial Document variable 
     * 
     * @param file
     * @return 
     */
    public Document getDocument(File file){                
        try {
            DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
            DocumentBuilder db = dbf.newDocumentBuilder();
            Document document = file==null ? db.newDocument() : db.parse(file);                                      
            if(file!=null)
                document.getDocumentElement().normalize();            
            
            return document;            
        } catch (ParserConfigurationException | SAXException | IOException ex) {            
            Logger.getLogger(EpubApp.class.getName()).log(Level.SEVERE, null, ex);
        }                        
        return null;
    }    
    
    /**
     * This function used for create initial Document variable from string 
     * 
     * @param str
     * @return 
     */
    public Document getDocument(String str){                
        try {
            DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
            DocumentBuilder db = dbf.newDocumentBuilder();
            InputStream inStream = new ByteArrayInputStream(str.getBytes());            
            Document document = db.parse(inStream);                                                  
            document.getDocumentElement().normalize();
            return document;            
        } catch (ParserConfigurationException | SAXException | IOException ex) {            
            Logger.getLogger(EpubApp.class.getName()).log(Level.SEVERE, null, ex);
        }                        
        return null;
    }
        
    
        
    /**
     * This function will be used to get attribute values from "tagName" node
     * 
     * @example
     *          <spine page-progression-direction="rtl">
                    <itemref idref="XHTML0000" />
                </spine>
                
                -- 
                --> if tagName=spine && attrName=idref function returns "XHTML0000"
                --

     * @param file
     * @param tagName
     * @param attrName
     * @return 
     */
    public ArrayList<String> getXHTML_tagProperty(File file , String tagName , String attrName){
        ArrayList<String> itemList = new ArrayList<>();
        Document doc = getDocument(file);
        // Get tagName node
        Node tagNode = doc.getElementsByTagName(tagName).item(0);
        if(tagNode.hasChildNodes()){            
            
            NodeList nodeLst = tagNode.getChildNodes();
            for(int i=0; i<nodeLst.getLength(); i++){
                Node node = nodeLst.item(i);
                if(node.getNodeType() == Node.ELEMENT_NODE){                    
                    Element element = (Element)node;    
                    itemList.add(element.getAttribute(attrName));                    
                }                                
            }            
        }
        
        return itemList;
    } 
    
    
    
    
    
    /*****************************************************************************
    ************************** OPF FILE OPERATIONS *******************************
    ******************************************************************************/        
    /**
     * This function used to take xhtml href list from .opf file.Result will be
     * used to create iframe tags on editable html
     * 
     * @param file should be .opf file of epub
     * @return 
     */
    public ArrayList<String> getXHTML_hrefList(File file){     
        ArrayList<String> xhtmlHrefList = new ArrayList<>();
        ArrayList<String> idrefList = getXHTML_tagProperty(file , "spine" , "idref");
        Document doc = getDocument(file);
        // Get tagName node
        Node tagNode = doc.getElementsByTagName("manifest").item(0);
        if(tagNode.hasChildNodes()){                        
            NodeList nodeLst = tagNode.getChildNodes();
            for(int i=0; i<nodeLst.getLength(); i++){
                Node node = nodeLst.item(i);
                if(node.getNodeType() == Node.ELEMENT_NODE){                    
                    Element element = (Element)node;                                           
                    if(idrefList.contains(element.getAttribute("id"))){                        
                        xhtmlHrefList.add(element.getAttribute("href"));
                    }
                }                                
            }                                   
        }
        return xhtmlHrefList;       
    }
    
    
    /**
     * This function find directory of .opf file
     * 
     * @return 
     */
    public String findOPFDirectory(){
        // read container.xml file to find epub .opf directory
        Document doc = getDocument(new File("/Users/kemal/NetBeansProjects/z-kitap/epubData/epubTemp/META-INF/container.xml"));
        // get <rootfile>
        Element rootFile = (Element) doc.getElementsByTagName("rootfile").item(0);
        // return path        
        return rootFile.getAttribute("full-path");        
    }
    
    
    
    
            
    /*****************************************************************************
    ************************** CREATE HTML FILE **********************************
    ************************* epub conf to html **********************************
    ******************************************************************************/ 
    /**
     * This function creates Document with iframe tags
     * 
     * @param file
     * @param hrefList
     * @return 
     */
    public static Document createDocumentNodes(File file , ArrayList<String> hrefList){                
        try {
            DocumentBuilderFactory docFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder docBuilder = docFactory.newDocumentBuilder();
            Document doc = file==null ? docBuilder.newDocument() : docBuilder.parse(file);  
            
            Node bodyElem = doc.getElementsByTagName("body").item(0);
            
            Element rootElement = doc.createElement("div");
            bodyElem.appendChild(rootElement);
            for(String href : hrefList){    
                Element iframe = doc.createElement("iframe");                
                rootElement.appendChild(iframe);
                
                Attr attr = doc.createAttribute("src");
		attr.setValue("../"+epubTemp+opfDirectory.substring(0,opfDirectory.lastIndexOf("/")+1)+href);
		iframe.setAttributeNode(attr);
            }                                                       
            return doc;
            
        } catch (ParserConfigurationException | SAXException | IOException ex) {
            Logger.getLogger(EpubApp.class.getName()).log(Level.SEVERE, null, ex);
        }  
        return null;
        
    }
    
        
    /**
     * This function prepare initial html file for edit xhtml
     * 
     * @param htmlFile
     * @param opfFile 
     */
    public void prepareInitHTML(File htmlFile , File opfFile){                
        // create && append iframe tags        
        Document doc = createDocumentNodes(htmlFile , getXHTML_hrefList(opfFile));  
        // write to html
        writeDocumentToFile(new File(htmlFileLocation) , doc , "html");
    }
    
        
    
    
    /**
     * 
     * 
     * @param 
     * @param  
     */
    public void prepareXHTMLFiles(String fileName , String content){                        
        
        
        // write to html
        //writeDocumentToFile(new File(htmlFileLocation) , doc , "html");
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
    public boolean appendContentToDocument(Document docMain , Document docImport , String element){
        // get list of body tags
        NodeList bodyElement;        
        bodyElement = docMain.getElementsByTagName(element);
        
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
    public String documentToString(Document doc){
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
            
    
}


