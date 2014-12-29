


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
             
                    bookID = "book_text1";             
                    $.post("../BookHandler", { "operation":"createBook" , "bookId":bookID }, function(data) {

                            var jsonObj = jQuery.parseJSON( data );  
                            console.log(jsonObj);
                            
                    });                    
                    
                }