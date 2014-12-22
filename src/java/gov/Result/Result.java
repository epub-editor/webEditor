/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package gov.Result;

import com.mongodb.BasicDBObject;
import java.util.ArrayList;

/**
 * @author kemal
 * @version 201409
 *
 * RESULT_CODE  >> (RESULT.001, RESULT.***)
 * RESULT_TEXT  >> (SUCCESS,NULL, etc.)
 * RESULT       >> (Activity,Club and any GENERIC OBJECT)
 */
public class Result<T>{ 
    private String RESULT_CODE;
    private String RESULT_TEXT;
    private T RESULT;    
    
    /**
     * @param null return initial Result object with RESULT.002 code
     */
    public Result(){
        this.RESULT_CODE = "RESULT.002";
        this.RESULT_TEXT = "SUCCESS && NULL";
        this.RESULT = null;        
    }
    
    /**
     * @param rCode RESULT_CODE
     * @param rText RESULT_TEXT
     */
    public Result(String rCode , String rText){
        this.RESULT_CODE = rCode;
        this.RESULT_TEXT = rText;
    }
    
    /**
     * 
     * @param rCode RESULT_CODE
     * @param rText RESULT_TEXT
     * @param rObj  Generic result object. It can be any objects such as Club,Activity, etc.
     * 
     */
    public Result(String rCode , String rText , T rObj){
        this.RESULT_CODE = rCode;
        this.RESULT_TEXT = rText;
        this.RESULT = rObj;
    }
    
    /**
     * @return the RESULT_CODE
     */
    public String getRESULT_CODE() {
        return RESULT_CODE;
    }

    /**
     * @param RESULT_CODE the RESULT_CODE to set
     */
    public void setRESULT_CODE(String RESULT_CODE) {
        this.RESULT_CODE = RESULT_CODE;
    }

    /**
     * @return the RESULT_TEXT
     */
    public String getRESULT_TEXT() {
        return RESULT_TEXT;
    }

    /**
     * @param RESULT_TEXT the RESULT_TEXT to set
     */
    public void setRESULT_TEXT(String RESULT_TEXT) {
        this.RESULT_TEXT = RESULT_TEXT;
    }    

    /**
     * @return the RESULT
     */
    public T getRESULT() {
        return RESULT;
    }

    /**
     * @param RESULT the RESULT to set
     */
    public void setRESULT(T RESULT) {
        this.RESULT = RESULT;
    }   

    
    /**
     * @param RESULT_CODE 
     * @param RESULT_TEXT
     * @param RESULT
     */
    public void setRESULT_MAIN(String RESULT_CODE, String RESULT_TEXT, T RESULT) {
        this.RESULT_CODE = RESULT_CODE;
        this.RESULT_TEXT = RESULT_TEXT;
        this.setRESULT(RESULT);
    }
    
}
