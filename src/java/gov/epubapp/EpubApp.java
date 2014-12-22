/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gov.epubapp;

import java.io.File;
import java.io.IOException;
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
    public static String epubTemp = "epubTemp/";
    public static String htmlFileLocation = "epubInitHTML/ulak.html";
    
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
    public static Document getDocument(File file){                
        try {
            DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
            DocumentBuilder db = dbf.newDocumentBuilder();
            Document document = db.parse(file);
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
     * @param file
     * @param tagName
     * @param attrName
     * @return 
     */
    public static ArrayList<String> getXHTML_tagProperty(File file , String tagName , String attrName){
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
    
        
    /**
     * This function used to take xhtml href list from .opf file.Result will be
     * used to create iframe tags on editable html
     * 
     * @param file
     * @return 
     */
    public static ArrayList<String> getXHTML_hrefList(File file){        
        ArrayList<String> xhtmlHrefList = new ArrayList<>();
        ArrayList<String> idrefList = getXHTML_tagProperty(file , "spine" , "idref");
        Document doc = getDocument(file);
        // Get tagName node
        Node tagNode = doc.getElementsByTagName("manifest").item(0);
        if(tagNode.hasChildNodes()){                        
//            System.out.println("manifest" + " has child Nodes and # " + tagNode.getChildNodes().getLength());
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
    public static void prepareInitHTML(File htmlFile , File opfFile){                
        // create && append iframe tags        
        Document doc = createDocumentNodes(htmlFile , getXHTML_hrefList(opfFile));  
        // write to html
        writeDocumentToFile(new File(htmlFileLocation) , doc , "html");
    }
    
    
    /*****************************************************************************
    ***********************  EPUB INFO OPERATIONs  *******************************
    ******************************************************************************/
    
    
    /**
     * This function find directory of .opf file
     * 
     * @return 
     */
    public static String findOPFDirectory(){
        // read container.xml file to find epub .opf directory
        Document doc = getDocument(new File("epubTemp/META-INF/container.xml"));
        // get <rootfile>
        Element rootFile = (Element) doc.getElementsByTagName("rootfile").item(0);
        // return path
        return rootFile.getAttribute("full-path");        
    }
        
    
}


