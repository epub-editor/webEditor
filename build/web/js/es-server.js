

               /*
                * This function is used for calling the service which retrieves 
                * previously saved presentations from EBA Dosya
                */
               function getPresentations(event) {
                   event.preventDefault();
                   $.post("GetPresentations", function(data) {
                       $("#selectPresentationContainer").html(data);
                   });
                   $("#dialogOpenPresentation").dialog("open");
               }


               /*
                * This function is used for calling the service which retrieves 
                * image files from user's EBA Dosya account
                */
               function getImages(pid) {
                   if (pid === "null") {
                       pid = null;
                   }
                   $.post("GetImages", {"pid": pid}, function(data) {
                       $("#fromEbaDosya div.esLoader").fadeOut();
                       $("#fromEbaDosya .thumbnailContainer").html(data);
                   });
               }


               /*
                * This function is used for calling the service which retrieves 
                * image by using it's id and put the image to DOM
                */
               function getImage(imageId, imageURL) {
                   var result = null;



                   $.ajax({
                       type: "POST",
                       url: "GetImage",
                       async: false,
                       data: imageURL === null ? {"imageId": imageId} : {"imageURL": imageURL},
                       success: function(data) {
                           if ($.trim(data) === "error" || $.trim(data) === "empty") {
                               alert("Resim yüklenemedi, bulunamadı!");
                           } else {
                               data = "data:image/gif;base64," + data;
                               result = data;
                           }
                       }
                   });









//                   if (imageURL === null) {
//                       $.ajax({
//                           type: "POST",
//                           url: "GetImage",
//                           async: false,
//                           data: {"imageId": imageId},
//                           success: function(data) {
//                               if ($.trim(data) === "error" || $.trim(data) === "empty") {
//                                   alert("Resim yüklenemedi, bulunamadı!");
//                               } else {
//                                   data = "data:image/gif;base64," + data;
//                                   result = data;
//                               }
//                           }
//                       });
//                   }
//                   else if (imageURL !== null) {
//                       $.ajax({
//                           type: "POST",
//                           url: "GetImage",
//                           async: false,
//                           data: {"imageURL": imageURL},
//                           success: function(data) {
//                               if ($.trim(data) === "error" || $.trim(data) === "empty") {
//                                   alert("Resim yüklenemedi, bulunamadı!");
//                               } else {
//                                   data = "data:image/gif;base64," + data;
//                                   result = data;
//                               }
//                           }
//                       });
//                   }
                   return result;
               }


               /*
                * This function is used for calling the service which is used 
                * for retrieving a presentation from EBA Dosya by using presentation id
                */
               function openPresentation() {
                   var selectedPresentation = $('#presentations option:selected').val();
                   $.post("GetPresentation", {"id": selectedPresentation}, function(data) {
                       $("#preLoader").show();

                       trimmedContent = $.trim(data);
                       if (trimmedContent === "empty") {
                           alert("Seçtiğiniz sunum bulunamadı!");
                       } else if (trimmedContent === "error") {
                           alert("Sunum açılırken hata oluştu!");
                       } else {
                           currentPresentationId = selectedPresentation;//global variable
                           var responseJSON = JSON.parse(trimmedContent);
                           $("#sectionContainer").html(responseJSON.content);

                           //Restoring video iframes
                           $(".videoContainer").each(function() {
                               var video = document.createElement("IFRAME");
                               video.src = $(this).find("input[type=hidden]").val();
                               video.className = "videoContainerInner";
                               $(this).append(video);
                           });

                           settings = responseJSON.settings;
                           Reveal.configure({transition: settings.transition, backgroundTransition: settings.bgTransition, loop: settings.slideLoop});
                           $("#sectionContainer").css("font-family", settings.fontType);
                           Reveal.sync();
                           Reveal.navigateTo(0, 0);
                       }

                       resizeAndDragHandler();

                       $("#preLoader").fadeOut();
                   });
               }


               /*
                * This function is used for calling the service which is used 
                * for saving current presentation to EBA Dosya clous storage
                */
               function savePresentation(event) {
                   //This code is necessary to exit from overview mode to save presentation
                   if ($(".reveal").hasClass("overview")) {
                       Reveal.toggleOverview();
                   }

                   var htmlToSave = $("#sectionContainer").clone();
                   htmlToSave.find(".videoContainer iframe").remove();//removing video iframes
                   var objectToSave = {"content": htmlToSave.html()};
                   objectToSave.settings = settings;
                   /*currentPresentationId is global variable*/
                   if (currentPresentationId === null || currentPresentationId === "null" || currentPresentationId === "") {
                       var fileName = prompt("Sunumunuz için bir dosya adı giriniz: ", "");
                       if (fileName !== null && fileName !== "") {
                           $.post("FileUpload", {"fileContent": JSON.stringify(objectToSave), "fileName": fileName}, function(data) {
                               result = $.trim(data);

                               switch (result) {
                                   case 'error-duplicate':
                                       alert("Aynı isimde dosyanız bulunmaktadır. Lütfen farklı bir isim deneyiniz.");
                                       break;
                                   case 'error':
                                       alert("Dosyanız kaydedilirken bir hata oluştu. Lütfen tekrar deneyiniz.");
                                       break;
                                   default:
                                       currentPresentationId = result;
                                       alert("Dosyanız başarıyla kaydedildi");
                                       lastSavedContent = objectToSave.content;
                               }

                           });
                       }
                   } else {
                       $.post("FileUpdate", {"fileContent": JSON.stringify(objectToSave), "currentPresentationId": currentPresentationId}, function(data) {
                           result = $.trim(data);

                           switch (result) {
                               case 'success':
                                   alert("Dosyanız başarıyla kaydedildi");
                                   lastSavedContent = objectToSave.content;
                                   break;
                               default:
                                   alert("Dosyanız kaydedilirken bir hata oluştu. Lütfen tekrar deneyiniz.");
                           }
                       });
                   }

                   event.preventDefault();
               }

               /*
                * This function is used for calling the service which is used 
                * for saving current presentation as PDF
                */
               function savePresentationAsPdf(src) {
                   $("#preLoader").show();

                   $.post("ImageToPDF", {"imgSrc": JSON.stringify(src)}, function() {
                       url = "DownloadPdf";
                       var hiddenIFrameID = 'hiddenDownloader';
                       var iframe = document.getElementById(hiddenIFrameID);
                       if (iframe === null) {
                           iframe = document.createElement('iframe');
                           iframe.id = hiddenIFrameID;
                           iframe.style.display = 'none';
                           document.body.appendChild(iframe);
                       }
                       iframe.src = url;
                       $("#preLoader").fadeOut();
                   });
               }
