

               /*
                * Function to put uploaded image
                */
               function putUploadedImage() {
                   var fileReader = new FileReader();

                   fileReader.onload = function(e) {
                       var imageSrc = e.target.result;
                       if (imageAddingLocation === "back") {//to background
                           addImageToBackground(imageSrc);
                       } else if (imageAddingLocation === "front") {//to scene
                           addImage(imageSrc);
                       }
                   };

                   fileReader.onerror = function() {
                       alert("Dosya yüklenirken hata oluştu");
                   };

                   fileReader.readAsDataURL(imageToUpload);
               }

               /*
                * Function for creating image as base64
                */
               function addImage(src, imagetype) {
                   var imgDiv = document.createElement("div");
                   imgDiv.contentEditable = "false";
                   imgDiv.classList.add("boxContainer");

                   if (imagetype !== null && imagetype === "figure") {
                       imgDiv.classList.add("figureContainer");
                   }else if( imagetype !== null && imagetype === "canvasdrawing"){
                       imgDiv.classList.add("canvasDrawingContainer");
                   }

                   var image = document.createElement("img");
                   image.src = src;
                   imgDiv.appendChild(image);

                   var removeElem = document.createElement("a");
                   removeElem.href = "#";
                   removeElem.className = "deleteIcon ui-icon-closethick";
                   imgDiv.appendChild(removeElem);

                   $(imgDiv, image).on("click", function(event) {
                       selectText(event.target);
                   });

                   var currentSection = $(".present").get(0);
                   currentSection.appendChild(imgDiv);

                   resizeAndDragHandler(imgDiv, true);

               }

               /*
                * Function to put image to background
                */
               function addImageToBackground(src) {
                   var currentSlide = $('section.present');
                   currentSlide.css("background-image", "url(" + src + ")");
                   currentSlide.css("background-size", $($("#sectionContainer")[0]).css("width") + " " + $($("#sectionContainer")[0]).css("height"));
               }

               /*
                * Function that validates extensions of given image file list
                */
               function checkImageFileExtensions(file) {
                   var imageExt = new RegExp("(^.+)((\.((jpe?g)|(png)|(gif)))$)");
                   if (!file.type.match(/image.*/) || !imageExt.test(file.name.toLowerCase())) {
                       return false;
                   }
                   return true;
               }

               /*
                * Function to select file from computer and create its thumbnail
                */
               function createThumbnailAfterFileUpload(file) {

                   if (checkImageFileExtensions(file) && file.size <= maxImageSize) {
                       $('#fromComputer .thumbnailContainer .img-image').remove();

                       var thumbnail = document.createElement("IMG");
                       var src = (window.URL) ? window.URL.createObjectURL(file) : window.webkitURL.createObjectURL(file);
                       thumbnail.setAttribute('src', src);

                       var thumbDiv = document.createElement("DIV");
                       thumbDiv.setAttribute("class", "img-thumb img-image");
                       thumbDiv.setAttribute("eba-selected", true);
                       thumbDiv.setAttribute("style", "background-color:#0D73D1; color:#fff;");

                       var imgCaption = document.createElement("P");
                       imgCaption.innerHTML = file.name;

                       $(thumbDiv).append(thumbnail);
                       $(thumbDiv).append(imgCaption);
                       $("#fromComputer .thumbnailContainer").append(thumbDiv);
                       imageToUpload = file;
                   }

               }
               
               /*
                * Function to remove image Container
                */
               function removeDivContainer(element){                   
                   pushToStack();
                   $(element).parent().remove();
               }

               $("#dialogAddImage").dialog({
                   autoOpen: false,
                   width: 745,
                   minHeight: 300,
                   modal: true,
                   resizable: false,
                   close: function() {
                       $("#buttonImageUpload").val(null);
                       $('#fromComputer .thumbnailContainer .img-image').remove();
                       imageToUpload = null;
                   },
                   buttons: [
                       {
                           text: "Tamam",
                           click: function() {

                               var activeTabIndex = $("#tabsImage").tabs("option", "active");
                               var selectedImage = $("#dialogAddImage div[eba-selected=true] img");

                               if (activeTabIndex === 0) {//from computer

                                   putUploadedImage();

                               } else if (activeTabIndex === 1) {//from eba dosya

                                   var imageSrc = getImage(selectedImage.attr("imageid"), null);
                                   if (imageAddingLocation === "back") {//to background
                                       addImageToBackground(imageSrc);
                                   } else if (imageAddingLocation === "front") {//to scene
                                       addImage(imageSrc);
                                   }

                               }

                               $(this).dialog("close");
                           }
                       },
                       {
                           text: "İptal",
                           click: function() {
                               $(this).dialog("close");
                           }
                       }
                   ]
               });
                              
               $("#dialogAddFigure").dialog({
                   autoOpen: false,
                   width: 745,
                   minHeight: 300,
                   modal: true,
                   resizable: false,
                   buttons: [
                       {
                           text: "Tamam",
                           click: function() {
                               var selectedImage = $("#dialogAddFigure div[eba-selected=true] img");
                               addImage(selectedImage.attr("src"), "figure");
                               $(this).dialog("close");
                           }
                       },
                       {
                           text: "İptal",
                           click: function() {
                               $(this).dialog("close");
                           }
                       }
                   ]
               });

               
               $("#dialogAddCanvasToDraw").dialog({                  
                   autoOpen: false,
                   width: 745,
                   minHeight: 500,
                   modal: true,
                   resizable: false,
                   open: function() {
                       
                       $("#canvasArea").empty();
                       drawingColor = "BLACK";
                       drawingSize = 1;
                       $("#selectBrushColor").val(drawingColor);
                       $("#selectBrushSize").val(drawingSize);
                       initCanvasForDrawing($("#canvasArea").get(0), 710, 400, "#fff");
                   },
                   buttons: [
                       {
                           text: "Ekle",
                           click: function() {
                               addImage($("#drawedCanvas").get(0).toDataURL("image/png"), "canvasdrawing");
                               $(this).dialog("close");
                           }
                       },
                       {
                           text: "İptal",
                           click: function() {
                               $(this).dialog("close");
                           }
                       }
                   ]
               });

               $("#tabsImage").tabs();

               $("#tabsFigures").tabs();

               $("#buttonImageUpload").change(function() {
                   createThumbnailAfterFileUpload(this.files[0]);
               });

               $(document).on("click", "#liFromEbaDosya", function(event, ui) {
                   getImages(null);
               });

               $(document).on("click", ".thumbnailContainer div.img-thumb", function() {
                   $(".thumbnailContainer div").css("backgroundColor", "#FFFFFF").css("color", "#222222").removeAttr("eba-selected");
                   $(this).css("backgroundColor", "#0D73D1").css("color", "#fff").attr("eba-selected", "true");
               });

               $(document).on("mouseenter", ".thumbnailContainer div.img-thumb", function() {
                   if ($(this).attr("eba-selected") !== "true") {
                       $(this).css("background-color", "#DBEEFF");
                   }
               });

               $(document).on("mouseleave", ".thumbnailContainer div.img-thumb", function() {
                   if ($(this).attr("eba-selected") !== "true") {
                       $(this).css("backgroundColor", "#FFFFFF");
                   }
               });

               $(document).on("click", ".img-folder", function() {
                   getImages($(this).find("img").attr("folderid"));
               });              

               $(document).on('click', 'a.deleteIcon', function() {                   
                   removeDivContainer(this);
               });

               $(document).on("dragover", "#fromComputer", function(e) {
                   e.preventDefault();
                   e.stopPropagation();
               });

               $(document).on("dragenter", "#fromComputer", function(e) {
                   e.preventDefault();
                   e.stopPropagation();
                   $(this).css("border", "dashed 3px #e1e1e1");
               });

               $(document).on("dragleave", "#fromComputer", function(e) {
                   e.preventDefault();
                   e.stopPropagation();
                   $(this).css("border", "dashed 3px #fff");
               });

               $(document).on("drop", "#fromComputer", function(e) {
                   if (e.originalEvent.dataTransfer) {
                       e.preventDefault();
                       e.stopPropagation();
                       var files = e.originalEvent.dataTransfer.files;
                       $("#buttonImageUpload")[0].files = files;
                       $(this).css("border", "dashed 3px #fff");
                   }
               });

               /*
                * Overriding paste event for image copy/paste processes
                */
               $(document.body).bind('paste', function(e) {
                   var event = e.originalEvent;
                   if (event.clipboardData) {
                       var pasted = false;
                       if (event.clipboardData.types) {
                           for (var i = 0; i < event.clipboardData.types.length; i++) {
                               var key = event.clipboardData.types[i];
                               var val = event.clipboardData.getData(key);
                               if (key === "text/html") {
                                   var wrap = document.createElement('div');
                                   wrap.innerHTML = val;
                                   if (wrap.getElementsByTagName("IMG").length > 0) {
                                       addImage(wrap.getElementsByTagName("IMG")[0].src, "image");
                                       pasted = true;
                                       break;
                                   }
                               }
                           }
                       } else {
                           var html = event.clipboardData.getData('text/html');

                           if (html !== undefined) {
                               var wrap = document.createElement('div');
                               wrap.innerHTML = val;
                               if (wrap.getElementsByTagName("IMG").length > 0) {
                                   addImage(wrap.getElementsByTagName("IMG")[0].src.replace("data:image/gif;base64,", ""), "image");
                                   pasted = true;
                               }
                           }

                       }
                       if (!pasted) {
                           document.execCommand("insertHTML", false, event.clipboardData.getData("text/plain"));
                       }
                       return false;
                   }
               });

               /*
                * TODO - aciklama yazilacak
                */
               $(document.body).bind('beforecut', function(e) {
                   if (e.target.tagName === "IMG") {
                       var containerDiv = $(e.target.parentNode);
                       containerDiv.attr("contentEditable", true);

                       window.setTimeout(function() {
                           if (containerDiv.get(0).getElementsByTagName("IMG").length === 0) {
                               containerDiv.remove();
                           } else {
                               containerDiv.attr("contentEditable", false);
                           }
                       }, 10);
                   }
               });
