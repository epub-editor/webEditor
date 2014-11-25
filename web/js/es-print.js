

               function createCanvas(typeOfProgress, event) {
                   $("#preLoader").fadeIn(function() {
                       $("#sectionContainer").children().removeClass("past").removeClass("future").addClass("present").css("display", "block");
                       $("#sectionContainer").children().removeAttr("hidden");
                       $("#sectionContainer").css("transform", "translate(-50%, -50%) scale(1) translate(50%, 50%)");
                       $("#sectionContainer section").css("top", "0px");
                       $("#sectionContainer section").css("left", "0px");
                       
                       //video removal.
                       $("#sectionContainer .videoContainerInner").css("display", "none");
                       $("#sectionContainer .videolink").css("display", "block");

                       $(".slides ul li").each(function() {
                           $(this).html("<lid>&#8226;</lid>" + $(this).html());
                       });
                       var count = 1;
                       $("ol li").each(function() {
                           $(this).html("<lid>" + count + ".</lid>" + $(this).html());
                           count++;
                       });

                       setTimeout(function() {
                           canvasImages = [];
                           var elements = $("#sectionContainer").children();
                           startRender(typeOfProgress, elements, 0);
                       }, 1000);
                   });

                   event.preventDefault();
               }

               function startRender(typeOfProgress, elements, i) {
                   html2canvas(elements[i], {
                       onrendered: function(canvas) {
                           canvasImages[canvasImages.length] = canvas.toDataURL("image/png");
                           if (canvasImages.length === elements.size()) {

                               if (typeOfProgress === "print") {

                                   var newDIVElem = document.createElement("DIV");
                                   $(newDIVElem).css("width", "100%");
                                   $(newDIVElem).attr("id", "printerDIV");
                                   $('body').append(newDIVElem);
                                   for (var m = 0; m < canvasImages.length && true; m++) {
                                       $(newDIVElem).append("<img src='" + canvasImages[m] + "' class='printIMG' style='width:45%; height:45%;' >");
                                   }

                                   window.print();
                                   $('#printerDIV').remove();

                               } else if (typeOfProgress === "pdf") {

                                   savePresentationAsPdf(canvasImages);

                               }
                               //re-enabling videos
                               $("#sectionContainer .videoContainerInner").css("display", "block");
                               $("#sectionContainer .videolink").css("display", "none");
                               
                               //lists
                               $("lid").remove();
                               $("#sectionContainer section").css("left", "");
                               var indices = Reveal.getIndices();
                               Reveal.navigateTo(indices.h, indices.v);
                               $("#preLoader").fadeOut();
                               return true;

                           } else {
                               startRender(typeOfProgress, elements, i + 1);
                           }
                       },
                       height: 4800,
                       width: 4800
                   });
               }

               $(document).ready(function() {
                   window.onbeforeprint = function(event) {
                       createCanvas("print", event);

                       var defer = $.Deferred(),
                               filtered = defer.then(function() {
                                   return true;
                               });
                       defer.resolve();

                       filtered.done(function() {
                       });
                   };
                   window.onafterprint = function() {
                   };/*Functionality to run after printing*/
               });

