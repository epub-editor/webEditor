package gov.Servlets;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import com.google.gson.Gson;
import gov.DBOperations.MongoDBOperations;
import gov.Result.Result;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author kemal
 */

@WebServlet(urlPatterns = {"/DBHandler"})
public class DBHandler extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        
        try (PrintWriter out = response.getWriter()) {                        
            
            Result resObj = new Result();
            Gson gson = new Gson();
            
            String bookId = request.getParameter("bookId");
            String bookContent = request.getParameter("bookContent");
            String operation = request.getParameter("operation");            
            
            if(operation.equalsIgnoreCase("insert")){                            
                MongoDBOperations mongodb = new MongoDBOperations();
                mongodb.insertToMongo(
                    "ebook", 
                    "books",
                    mongodb.getMongoBasicDBObject()
                            .append("bookID", bookId)
                            .append("bookContent", bookContent)
                    );
                resObj.setRESULT_MAIN("RESULT.001", "SUCCESS INSERT", bookContent);
            }else{
                resObj.setRESULT_MAIN("RESULT.001", "SUCCESS", bookContent);
            }
            
            out.write(gson.toJson(resObj));
            out.close();
                
            
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
