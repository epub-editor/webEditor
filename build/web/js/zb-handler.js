                /******************************************************************************
                ****************************** INITIALIZATION *********************************
                ******************************************************************************/                                                          
               
//                document.write('<script src="jquery-1.9.1.js" type="text/javascript"></script>');                       
//                document.write('<script src="jquery-migrate-1.2.1.min.js" type="text/javascript"></script>');
//                document.write('<script src="jquery-ui-1.10.3.custom.js" type="text/javascript"></script>');
//                document.write('<script src="jwerty.js" type="text/javascript"></script>');
//                document.write('<script src="spectrum/spectrum.js" type="text/javascript"></script>');
//                document.write('<script src="contextMenu/jquery.contextMenu.js" type="text/javascript"></script>');
//                document.write('<script src="contextMenu/jquery.ui.position.js" type="text/javascript"></script>');        
//
//                // undo & redo handler            
//                document.write('<script src="es-undoRedo.js" type="text/javascript"></script>');
//                // text selection operation
//                document.write('<script src="es-selection.js" type="text/javascript"></script>');
//                // map library
//                document.write('<script src="https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyAQkZ0hPQiLT4_efvb4IuskAk1neh3r8Fk&sensor=true&libraries=places" type="text/javascript"></script>');        
//
//                document.write('<script src="es-init.js" type="text/javascript"></script>');        
//
//                document.write('<script src="es-server.js" type="text/javascript"></script>');
//                document.write('<script src="es-text-modifications.js" type="text/javascript"></script>');
//                document.write('<script src="es-presentation.js" type="text/javascript"></script>');
//                document.write('<script src="es-image.js" type="text/javascript"></script>');
//                document.write('<script src="es-elements.js" type="text/javascript"></script>');
//                document.write('<script src="es-print.js" type="text/javascript"></script>');
//                document.write('<script src="js/head.min.js" type="text/javascript"></script>');
//                document.write('<script src="html2canvas.js" type="text/javascript"></script>');
                
                
                /******************************************************************************
                ******************************* UTIL FUNCTIONS ********************************
                ******************************************************************************/
                function importFilesToIframe(iframeElem){                                        
                    
                    scriptNew = document.createElement('script');
                    scriptNew.src = '../../' + 'js/zb-handler.js';
                    $(scriptNew).appendTo($(iframeElem).contents().find('head').get(0)); 
                    
                    libs = ['../../js/jquery-1.9.1.js' ,
                            '../../js/jquery-migrate-1.2.1.min.js',
                            '../../js/jquery-ui-1.10.3.custom.js',
                            '../../js/jwerty.js',                            
                            '../../spectrum/spectrum.js',
                            '../../js/contextMenu/jquery.contextMenu.js',
                            '../../js/contextMenu/jquery.ui.position.js',
                            '../../js/es-undoRedo.js',
                            '../../js/es-selection.js',
                            'https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyAQkZ0hPQiLT4_efvb4IuskAk1neh3r8Fk&sensor=true&libraries=places',
                            '../../js/es-init.js',
                            '../../js/es-server.js',
                            '../../js/es-text-modifications.js',
                            '../../js/es-presentation.js',
                            '../../js/es-image.js',
                            '../../js/es-elements.js',
                            '../../js/es-print.js',
                            '../../lib/js/head.min.js',
                            '../../js/html2canvas.js'];
                        
                        
                    for(i=0; i<libs.length; i++){
                        scriptNew = document.createElement('script');
                        scriptNew.src = libs[i];
//                        $(scriptNew).appendTo($(iframeElem).contents().find('head').get(0)); 
                    }
                                        
                }
