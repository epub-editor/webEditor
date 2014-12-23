


                /*
                * This function is used for save project to mongoDB
                */
                function saveBooktoMongo(event) {
                    event.preventDefault();                                        

                    bookId = "book_text1";
                    bookContent = $('.present').get(0).outerHTML;                     
                    
                    console.log('saveBooktoMongo CALLED');
                    console.log(bookId);                    
                    console.log(bookContent);

                    $.post("../DBHandler", { "operation":"insert" , "bookId":bookId , "bookContent": bookContent}, function(data) {

                            var jsonObj = jQuery.parseJSON( data );  
                            console.log(jsonObj);
                            
                    });
                    
                }
                
                
                
                /*
                * This function is used for save project to mongoDB
                */
                function createEBook(event) {
                    event.preventDefault();                                        
             

                    $.ajax({
                        url:"http://localhost:8080/BookHandler",
                        type:"POST",
                        data: jQuery.parseJSON( '{"employees":[{"firstName":"John", "lastName":"Doe"}]}'),
                        contentType:"application/json; charset=utf-8",
                        dataType:"json",
                        success: function(){
                            alert("Deneme başarılı");
                        }
                      })
                    
                }