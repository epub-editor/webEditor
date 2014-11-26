


               function setLinkAddressToTextInput() {
                   var urlPattern = /(^)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi;
                   var urlPatternWithProtocol = /(^)((https?:\/\/)[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi;
                   var parentsAndSelf = $(getSelectedElement()).is("section") ? $(getSelectedElement()) : $(getSelectedElement()).parentsUntil("section").andSelf();

                   if (parentsAndSelf.is("a")) {
                       $("#hyperlinkTextInput").val(parentsAndSelf.filter("a").attr("href"));
                       $("#hyperlinkTextLabel").val(parentsAndSelf.filter("a").text());
                   } else {
                       var selectedText = window.getSelection().toString();
                       $("#hyperlinkTextLabel").val(selectedText);

                       if (selectedText.match(urlPattern)) {
                           if (selectedText.match(urlPatternWithProtocol)) {
                               $("#hyperlinkTextInput").val(selectedText);
                           } else {
                               $("#hyperlinkTextInput").val("http://" + selectedText);
                           }
                       } else {
                           $("#hyperlinkTextInput").val("http://");
                       }
                   }
               }

               function createBlockQuote(event) {
                   pushToStack();

                   var newCreatedBlock;
                   var parentsAndSelf = $(getSelectedElement()).parentsUntil("section").andSelf();
                   if (parentsAndSelf.is("blockquote")) {//delete

                       var blockqoute = parentsAndSelf.filter("blockquote");
                       blockqoute.before(blockqoute.text());
                       $(blockqoute).remove();

                   } else {//insert

                       document.execCommand('formatBlock', false, 'blockquote');
                       newCreatedBlock = $('blockquote').not($('.blockContainer'))[0];
                       $(newCreatedBlock).html("<div>" + newCreatedBlock.innerHTML + "</div>");
                       $(newCreatedBlock).addClass("blockContainer");
                       $(newCreatedBlock).attr("contenteditable", "true");

                       //caret set to last position of blockquote
                       selectText(newCreatedBlock);
                       getRangeOfSelection("caretToLast");

                       var newDIV = document.createElement("DIV");
                       newDIV.innerHTML = "<br/>";
                       $(newDIV).insertAfter($(newCreatedBlock));
                       $(newDIV).insertBefore($(newCreatedBlock));

                       //Buradaki div'in konulmasının sebebi getSelectedElement() methodunun blockquote tag'ını yakalayamamasıdır.
                       var outerDIV = document.createElement("DIV");
                       $(outerDIV).addClass("blockContainerMainDIV");
                       $(outerDIV).insertBefore($(newCreatedBlock));
                       $(outerDIV).append($(newCreatedBlock));
                   }

                   event.preventDefault();
               }

               function insertHR(event) {
                   getRangeOfSelection(2);
                   document.execCommand("insertHTML", false, "<hr>");
                   document.execCommand("insertHTML", false, "<div><br/></div>");
                   event.preventDefault();
               }

               function insertPageNumber(event) {
                   var sectionNumberDivs = $(".sectionPageNumber");
                   if (sectionNumberDivs.is(":visible")) {
                       sectionNumberDivs.hide();
                   } else {
                       sectionNumberDivs.show();
                   }

                   event.preventDefault();
               }

               function addTextBox() {
                   var imgDiv = document.createElement("div");
                   imgDiv.contentEditable = "false";
                   imgDiv.className = "boxContainer textBoxContainer";
                   imgDiv.tabIndex = "-1";

                   var innerDiv = document.createElement("div");
                   innerDiv.classList.add("textBoxContainerInner");
                   innerDiv.contentEditable = "true";
                   innerDiv.tabIndex = "-1";
                   innerDiv.style.outline = "0";

                   var removeElem = document.createElement("a");
                   removeElem.href = "#";
                   removeElem.className = "deleteIcon ui-icon-closethick";

                   var handleElem = document.createElement("a");
                   handleElem.href = "#";
                   handleElem.className = "handleIcon ui-icon-handle";

                   imgDiv.appendChild(innerDiv);
                   imgDiv.appendChild(removeElem);
                   imgDiv.appendChild(handleElem);
                   $(".present").get(0).appendChild(imgDiv);

                    resizeAndDragHandler(imgDiv, true, handleElem);
               }

               function initCanvasForDrawing(container, width, height, fillColor) {
                   /* Creating canvas element */
                   var canvas = {};
                   canvas.node = document.createElement('canvas');
                   canvas.node.id = "drawedCanvas";
                   canvas.context = canvas.node.getContext('2d');
                   canvas.node.width = width || 100;
                   canvas.node.height = height || 100;
                   canvas.node.style.top = "0px";
                   canvas.node.style.left = "0px";
                   container.appendChild(canvas.node);
                   /* Creating canvas element - end */

                   var ctx = canvas.context;
                   ctx.fillStyle = fillColor;
                   ctx.fillRect(0, 0, width, height);

                   var inProgress, cp1x, cp1y, cp2x, cp2y, skip1, skip2;
                   /*event bindings*/
                   canvas.node.onmousemove = function(e) {
                       if (!canvas.isDrawing) {
                           return;
                       }

                       var x = e.offsetX;
                       var y = e.offsetY;
                       ctx = canvas.node.getContext("2d");
                       ctx.lineCap = 'round';
                       ctx.lineJoin = 'round';
                       ctx.lineWidth = drawingSize;
                       ctx.strokeStyle = drawingColor;
                       if (!inProgress) {
                           ctx.beginPath();
                           ctx.moveTo(x, y);
                           inProgress = true;
                           skip1 = true;
                           skip2 = false;
                       } else {
                           if (skip1) {
                               cp1x = x;
                               cp1y = y;
                               skip1 = false;
                               skip2 = true;
                           }
                           if (skip2) {
                               cp2x = x;
                               cp2y = y;
                               skip1 = false;
                               skip2 = false;
                           } else {
                               ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
                               skip1 = true;
                               skip2 = false;
                           }
                       }
                       ctx.stroke();
                   };
                   canvas.node.onmousedown = function() {
                       canvas.isDrawing = true;
                   };
                   canvas.node.onmouseup = function() {
                       canvas.isDrawing = false;
                       ctx.save();
                       inProgress = false;
                   };
               }

               function addVideo(event) {
                   event.preventDefault();
                   var videoUrl = $("#addVideoInput").val();
                   var videoURLEmbedded;

                   if (videoUrl === null || videoUrl === "") {
                       return;
                   }else if (videoUrl.indexOf("youtube.com/watch?v=") !== -1) {
                       var videoId = videoUrl.substr(videoUrl.indexOf("watch?v=") + 8);
                       if (videoId.indexOf("&") !== -1) {
                           videoId = videoId.substr(0, videoId.indexOf("&"));
                       }
                       videoURLEmbedded = "http://www.youtube.com/embed/" + videoId + "?modestbranding=1&fs=1&showinfo=0";
                   } else if (videoUrl.indexOf("eba.gov.tr/video/izle/") !== -1) {
                       var videoId = videoUrl.substr(videoUrl.indexOf("izle/") + 5);
                       if (videoId.indexOf("&") !== -1) {
                           videoId = videoId.substr(0, videoId.indexOf("&"));
                       }
                       videoURLEmbedded = "http://www.eba.gov.tr/embed.php?type=v&id=" + videoId;
                   }else{
                       alert("Yalnızca EBA veya Youtube videoları ekleyebilirsiniz.");
                       return;
                   }

                   var videoDiv = document.createElement("div");
                   videoDiv.innerHTML = "<a class=\"videolink\" href=\"" + videoUrl + "\" target=\"_blank\">" + videoUrl + "</a><input type=\"hidden\" value=\"" + videoURLEmbedded + "\"></input>";
                   videoDiv.contentEditable = "false";
                   videoDiv.className = "boxContainer videoContainer";
                   videoDiv.style.width = "450px";
                   videoDiv.style.height = "300px";

                   var video = document.createElement("IFRAME");
                   video.src = videoURLEmbedded;
                   video.className = "videoContainerInner";
                   
                   var removeElem = document.createElement("a");
                   removeElem.href = "#";
                   removeElem.className = "deleteIcon ui-icon-closethick";

                   var handleElem = document.createElement("a");
                   handleElem.href = "#";
                   handleElem.className = "handleIcon ui-icon-handle";
                   
                   videoDiv.appendChild(video);
                   videoDiv.appendChild(removeElem);
                   videoDiv.appendChild(handleElem);

                   $(".present").get(0).appendChild(videoDiv);
                   resizeAndDragHandler(videoDiv, true, handleElem);
                   
                   pushToStack();
               }

               function insertMapImage() {
                   var mapImageURL = "http://maps.googleapis.com/maps/api/staticmap?center=" + map.getCenter().d + "," + map.getCenter().e + "&zoom=" + map.getZoom() + "&size=700x350&sensor=true";
                   for (var i = 0; i < markers.length; i++) {
                       mapImageURL += "&markers=" + markers[i].position.k + "," + markers[i].position.A;
                   }
                   var mapImageBase64 = getImage(null, mapImageURL);
                   addImage(mapImageBase64, "image");
               }

               function initializeMaps() {

                   map = new google.maps.Map(document.getElementById("map-canvas"), {
                       center: new google.maps.LatLng(45, 20),
                       zoom: 5,
                       zoomControl: false,
                       disableDoubleClickZoom: true,
                       streetViewControl: false

                   });

                   var input = document.getElementById('pac-input');
                   map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
                   var searchBox = new google.maps.places.SearchBox((input));

                   google.maps.event.addListener(searchBox, 'places_changed', function() {
                       var places = searchBox.getPlaces();

                       cleanMarkers();

                       var bounds = new google.maps.LatLngBounds();
                       for (var i = 0; i < places.length; i++) {
                           bounds.extend(places[i].geometry.location);
                       }

                       var geocoder = new google.maps.Geocoder();
                       geocoder.geocode({'address': $(input).val()}, function(results, status) {
                           if (status === google.maps.GeocoderStatus.OK) {
                               map.setCenter(results[0].geometry.location);
                               map.fitBounds(results[0].geometry.viewport);
                           }
                       });

                   });

                   google.maps.event.addListener(map, 'bounds_changed', function() {
                       var bounds = map.getBounds();
                       searchBox.setBounds(bounds);
                   });

                   google.maps.event.addListener(map, "dblclick", function(e) {
                       setTimeout(function() {
                           placeMarker(e.latLng);
                       }, 50);
                   });
               }

               function placeMarker(location) {
                   var marker = new google.maps.Marker({
                       position: location,
                       map: map
                   });
                   markers.push(marker);
               }

               function cleanMarkers() {
                   for (var i = 0; i < markers.length; i++) {
                       markers[i].setMap(null);
                   }
                   markers = [];
               }

               $("#dialogAddMaps").dialog({
                   autoOpen: false,
                   width: 745,
                   minHeight: 300,
                   modal: true,
                   resizable: false,
                   open: function() {
                       google.maps.event.trigger(map, 'resize');
                       cleanMarkers();
                   },
                   buttons: [
                       {
                           text: "Tamam",
                           click: function() {
                               insertMapImage();
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

               $("#dialogHyperlink").dialog({
                   autoOpen: false,
                   width: 400,
                   minHeight: 150,
                   modal: true,
                   resizable: false,
                   close: function() {
                       restoreSelection($(this).data("currentSelection"));
                       var functionToExecute = $(this).data("hrefFunction");
                       if (functionToExecute === "CreateLink") {
                           document.execCommand(functionToExecute, false, $("#hyperlinkTextInput").val());
                           $('.present .sectionContent a:not([target])').val($("#hyperlinkTextLabel").val());
                           $(".present .sectionContent a").attr("target", "_blank");
                       } else if (functionToExecute === "unlink") {
                           document.execCommand(functionToExecute, false, getRangeOfSelection("all"));
                       }
                   },
                   buttons: [
                       {
                           text: "Ekle",
                           click: function() {
                               pushToStack();
                               $(this).data("hrefFunction", "CreateLink").dialog("close");
                           }
                       },
                       {
                           text: "Kaldır",
                           click: function() {
                               pushToStack();
                               $(this).data("hrefFunction", "unlink").dialog("close");
                           }
                       }
                   ]
               });
               
               $("#dialogAddVideo").dialog({
                   autoOpen: false,
                   width: 400,
                   minHeight: 150,
                   modal: true,
                   resizable: false,
                   open: function(){
                       setTimeout(function(){$("#addVideoInput").focus();},50);
                   },
                   close: function() {
                       $("#addVideoInput").val("");
                   },
                   buttons: [
                       {
                           text: "Ekle",
                           click: function(event) {
                               addVideo(event);
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

               $(document).on("mouseup", "div .ui-resizable-resizing", function() {
                   $(this).css("position", "inherit");
                   fullscreen = false;
               });

               $(document).on("mousedown", "div .ui-resizable", function() {
                   fullscreen = true;
               });

               $("#selectBrushColor").change(function() {
                   drawingColor = $(this).find("option:selected").val();
               });

               $("#selectBrushSize").change(function() {
                   drawingSize = $(this).find("option:selected").val();
               });
