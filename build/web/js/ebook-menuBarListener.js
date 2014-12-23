

                
                
                $(document).on('click' , '#menubarSaveButton' , function(event){
                        saveBooktoMongo(event);                        
                });
                
                
                $(document).on('click' , '#menubarCreateEpubButton' , function(event){
                        createEBook(event);                    
                });