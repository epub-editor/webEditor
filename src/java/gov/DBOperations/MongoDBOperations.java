/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package gov.DBOperations;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import com.mongodb.util.JSON;
import com.google.gson.Gson;
import com.mongodb.*;

/**
 *
 * @author Kemal Sami KARACA
 */
public class MongoDBOperations {

    // VARIABLES
    private MongoClient mongoClient;
    private BasicDBObject mongoBasicDBObject;

    // CONSTRUCTORS
    public MongoDBOperations() throws UnknownHostException {
        this.mongoClient = new MongoClient();
        this.mongoBasicDBObject = new BasicDBObject();        
    }

    // ENCAPSULATION
    public void setMongoClient() throws UnknownHostException {
        mongoClient = new MongoClient();
    }

    public void setMongoClient(String host) throws UnknownHostException {
        mongoClient = new MongoClient(host);
    }

    public void setMongoClient(String host, int port) throws UnknownHostException {
        mongoClient = new MongoClient(host, port);
    }

    public MongoClient getMongoClient() {
        return mongoClient;
    }

    // METHODS  
    public Set<String> getCollectionNames(String dbName) {
        return mongoClient.getDB(dbName).getCollectionNames();
    }

    // INSERT DATA TO MONGODB
    /**
    * @param dbName which is name of the mongo db 
    * @param collName name of collection in selected database
    * @param anyObject that parameter can be any object for insert to mongodb
    */
    public <T> void insertToMongo(String dbName, String collName, T anyObject) {
        Gson gson = new Gson();
        BasicDBObject dbo = (BasicDBObject) JSON.parse(gson.toJson(anyObject));
        mongoClient.getDB(dbName).getCollection(collName).insert(dbo);
    }
    
    
    /**     
     * @param dbName which is name of the mongo db 
     * @param collName name of collection in selected database
     * @param anyObject that parameter can be any object for insert to mongodb
     * @param key unique id of the object
    */
    public <T> void insertToMongo(String dbName, String collName, T anyObject, String key) {
        Gson gson = new Gson();
        BasicDBObject dbo = (BasicDBObject) JSON.parse(gson.toJson(anyObject));
        dbo.append("u_id", key);
        mongoClient.getDB(dbName).getCollection(collName).insert(dbo);
    }
    
    
    /**     
     * @param dbName which is name of the mongo db 
     * @param collName name of collection in selected database
     * @param dbObj prepared query
    */
    public void insertToMongo(String dbName, String collName, BasicDBObject dbObj) {
        mongoClient.getDB(dbName).getCollection(collName).insert(dbObj);
    }
    
    public void insertToMongo(String dbName, String collName, List param1, List param2) {
        BasicDBObject doc = new BasicDBObject();
        for (int i = 0; i < param1.size() && i < param2.size(); i++) {
            doc.append((String) param1.get(i), param2.get(i));
        }
        mongoClient.getDB(dbName).getCollection(collName).insert(doc);
    }

    // GET DATA FROM MONGODB
    public ArrayList<BasicDBObject> getDataFromMongo(String dbName, String collName) {        
        DBCursor cursor = mongoClient.getDB(dbName).getCollection(collName).find();

        ArrayList<BasicDBObject> resultList = new ArrayList<>();
        try {
            while (cursor.hasNext()) {
                BasicDBObject obj = (BasicDBObject) cursor.next();
                resultList.add(obj);
            }
        } finally {
            cursor.close();
        }
        return resultList;
    }
    public ArrayList<BasicDBObject> getDataFromMongo(String dbName, String collName, BasicDBObject query) {        
        
        DBCursor cursor = mongoClient.getDB(dbName).getCollection(collName).find(query);        
        ArrayList<BasicDBObject> resultList = new ArrayList<>();
        try {
            while (cursor.hasNext()) {
                BasicDBObject obj = (BasicDBObject) cursor.next();
                resultList.add(obj);
            }
        } finally {
            cursor.close();
        }
        return resultList;
    }
    public ArrayList<BasicDBObject> getDataFromMongo(String dbName, String collName, String queryName, String queryValue) {
        BasicDBObject query = new BasicDBObject(queryName, queryValue);
        DBCursor cursor = mongoClient.getDB(dbName).getCollection(collName).find(query);

        ArrayList<BasicDBObject> resultList = new ArrayList<>();
        try {
            while (cursor.hasNext()) {
                BasicDBObject obj = (BasicDBObject) cursor.next();
                resultList.add(obj);
            }
        } finally {
            cursor.close();
        }
        return resultList;
    }

    //************************************************************************//
    //************************************************************************//
    //                      [AND] - [OR] operations
    //************************************************************************//
    //************************************************************************//
    public void addAndOperation(){
        BasicDBList andOperator = new BasicDBList();
        
        DBObject clause1 = new BasicDBObject("activityDate", new BasicDBObject("$gte", "carpeDay"));  
        DBObject clause2 = new BasicDBObject("activityDate", new BasicDBObject("$lt", "carpeDayNext"));
        
        andOperator.add(clause1);
        andOperator.add(clause2);                    
        //query.append("$and", andOperator);
    }
    
    /***************************************************************************
     ***************************************************************************
     ***************************************************************************
     */    

    public void printCursor(String dbName, String collName) {
        DBCursor dbc = mongoClient.getDB(dbName).getCollection(collName).find();
        System.out.println(dbc.toString());
        try {
            while (dbc.hasNext()) {
                DBObject dbo = dbc.next();
                System.out.println(dbo.toString());
            }
        } finally {
            dbc.close();
        }
    }

    /**
     * @return the mongoBasicDBObject
     */
    public BasicDBObject getMongoBasicDBObject() {
        return mongoBasicDBObject;
    }

    /**
     * @param mongoBasicDBObject the mongoBasicDBObject to set
     */
    public void setMongoBasicDBObject(BasicDBObject mongoBasicDBObject) {
        this.mongoBasicDBObject = mongoBasicDBObject;
    }
}
