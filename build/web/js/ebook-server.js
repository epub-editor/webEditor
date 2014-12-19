


                /*
                * This function is used for save project to mongoDB
                */
                function saveBooktoMongo(event) {
                    event.preventDefault();

                    bookId = "12345";
                    bookContent = " asdlasdş ";

                    $.post("../DBHandler", { "bookId":bookId , "bookContent": bookContent}, function(data) {
                                                    
                            console.log(data);
                            
                    });                                      
                }