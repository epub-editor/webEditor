

               /*
                * This method is used for deleting slide section of presentation
                */
               function deleteSection(event) {
                   if ($("section").size() !== 1) {
                       pushToStack();
                       var sectionToDelete = $("section.present");
                       if (sectionToDelete.next().size() === 0) {//last element, navigate left
                           Reveal.navigateLeft();
                           var position = $('.present')[0].id;
                           sectionToDelete.remove();
                           reorderSectionIDs();
                           Reveal.navigateRight();
                           Reveal.slide((position), 0, 0);
                       } else {
                           Reveal.navigateRight();
                           var position = $('.present')[0].id;
                           sectionToDelete.remove();
                           reorderSectionIDs();
                           Reveal.navigateLeft();
                           Reveal.slide((position - 1), 0, 0);
                       }
                   }
                   event.preventDefault();
               }

               /*
                * This method is used for adding a new section to presentation
                * New slide can be added as previous or next slide depends on
                * clicked icon.
                */
               function createNewSection(side) {
                   pushToStack();
                   var sectionTemplate = "<section><div tabindex=\"-1\" contenteditable=\"true\" class=\"sectionContent\" spellcheck=\"false\"></div><div class=\"sectionPageNumber\"></div></section>";
                   if (side === "right") {
                       $(sectionTemplate).insertAfter("section.present");
                       reorderSectionIDs();
                       Reveal.navigateRight();
                   } else if (side === "left") {
                       if ($("section.present").attr("id") === "0") {
                           $(sectionTemplate).insertBefore("section.present");
                           reorderSectionIDs();
                           Reveal.navigateRight();
                           Reveal.navigateLeft();
                       } else {
                           $(sectionTemplate).insertBefore("section.present");
                           Reveal.navigateLeft();
                           reorderSectionIDs();
                           Reveal.navigateRight();
                       }
                   }
                   $(".present > .sectionContent").focus();
               }

               /*
                * This method is used for reordering the section ids after adding
                * or removing a slide
                */
               function reorderSectionIDs() {
                   var sections = $("section");
                   for (var i = 0; i < sections.size(); i++) {
                       sections.eq(i).attr("id", i);
                       sections.eq(i).find(".sectionPageNumber").html(i + 1);
                   }
               }

               /*
                * For fullscreen transition processes
                */
               function fullScreenMode() {
                   //We should set autoslide configuration while playing presentation because it always loop on edit mode too
                   Reveal.configure({autoSlide: parseInt($("#settingsAutoSlide").val())});
                   Reveal.slide(0, 0, 0);
                   $(".sectionContent").removeAttr("contenteditable");
                   $("#newSlideLeftContainer").hide();
                   $("#newSlideRightContainer").hide();
                   $(".reveal").addClass("fullscreen");
                   $("#topPanel").fadeOut();
               }

               /*
                * For returning normal edit mode from fullscreen mode
                */
               function normalScreenMode() {
                   //We should set autoslide configuration while playing presentation because it always loop on edit mode too
                   Reveal.configure({autoSlide: 0});
                   $(".sectionContent").attr("contenteditable", "true");
                   $("#newSlideLeftContainer").show();
                   $("#newSlideRightContainer").show();
                   $(".reveal").removeClass("fullscreen");
                   $("#topPanel").fadeIn();
               }

               /*
                * For fullscreen transition processes
                */
               function toggleFullScreen() {
                   $("#preLoader").fadeIn();
                   if ((document.fullScreenElement && document.fullScreenElement !== null) || // alternative standard method
                           (!document.mozFullScreen && !document.webkitIsFullScreen)) {       // current working methods

                       var element = document.body;
                       // Check which implementation is available
                       var requestMethod = element.requestFullScreen || element.webkitRequestFullscreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
                       if (requestMethod) {
                           requestMethod.apply(element);
                           window.outerHeight = screen.height;
                           window.outerWidth = screen.width;
                       }

                   } else {
                       if (document.cancelFullScreen) {
                           document.cancelFullScreen();
                       }
                       else if (document.mozCancelFullScreen) {
                           document.mozCancelFullScreen();
                       }
                       else if (document.webkitCancelFullScreen) {
                           document.webkitCancelFullScreen();
                       }
                   }

                   $("#preLoader").fadeOut();
               }

               /*
                * This function is for arranging section toggle buttons
                */
               function toggleSectionOrder(previewStarts) {
                   if ($("section").size() < 2) {
                       return;
                   }
                   $(".toggleRightButton").remove();
                   $(".toggleLeftButton").remove();

                   if (previewStarts) {

                       var toggleRightButton = document.createElement("IMG");
                       toggleRightButton.src = "css/eba-sunum-theme/images/right_arrow.png";
                       toggleRightButton.classList.add("toggleRightButton");

                       var toggleLeftButton = document.createElement("IMG");
                       toggleLeftButton.src = "css/eba-sunum-theme/images/left_arrow.png";
                       toggleLeftButton.classList.add("toggleLeftButton");

                       $("section").each(function() {
                           if ($(this).index() === 0) {
                               $(this).append($(toggleRightButton).clone()[0]);
                           } else if ($(this).index() === this.parentNode.children.length - 1) {
                               $(this).append($(toggleLeftButton).clone()[0]);
                           } else {
                               $(this).append($(toggleRightButton).clone()[0]);
                               $(this).append($(toggleLeftButton).clone()[0]);
                           }
                       });

                   } else {
                       $(".sectionContent").attr("contentEditable", true);
                   }
               }

               /*
                * This function is for toggling in overview mode
                */
               function toggleSlide(section1, side) {
                   var ind = $(section1).index();

                   if (side === "RIGHT") {
                       $(section1).before($(section1).next()[0]);
                       Reveal.slide(ind + 1);
                       Reveal.navigateTo(ind + 1, 0);
                       Reveal.navigateTo(ind + 1);
                   } else if (side === "LEFT") {
                       $(section1).after($(section1).prev()[0]);
                       Reveal.slide(ind);
                       Reveal.navigateTo(ind, 0);
                       Reveal.navigateTo(ind);
                   }

                   reorderSectionIDs();
                   toggleSectionOrder(true);
                   pushToStack();
               }

               /*This method is used for saving selected settings*/
               function saveSettings(event) {
                   var properties = $("#dialogPresentationSettings");
                   var fontFamilyVal = properties.find("#selectFontFamilySettings option:selected").val();
                   var transitionVal = properties.find("#selectTransitionSettings option:selected").val();
                   var bgTransitionVal = properties.find("#selectBGTransitionSettings option:selected").val();
                   var autoSlideVal = properties.find("#selectAutoSlideSettings option:selected").val();
                   var loopVal = properties.find("#selectLoopSettings option:selected").val();

                   Reveal.configure({transition: transitionVal, backgroundTransition: bgTransitionVal, loop: loopVal});
                   $("#sectionContainer").css("font-family", fontFamilyVal);
                   settings.fontType = fontFamilyVal;
                   settings.transition = transitionVal;
                   settings.bgTransition = bgTransitionVal;
                   settings.autoSlide = autoSlideVal;
                   settings.slideLoop = loopVal;

                   event.preventDefault();
               }

               $(document).on("click", ".toggleLeftButton", function(event) {
                   var clickedSection = $(event.target).closest("section")[0];
                   toggleSlide(clickedSection, "LEFT");
                   event.stopPropagation();
               });

               $(document).on("click", ".toggleRightButton", function(event) {
                   var clickedSection = $(event.target).closest("section")[0];
                   toggleSlide(clickedSection, "RIGHT");
                   event.stopPropagation();
               });

               $(document).on("click", "div.overview section", function() {
                   Reveal.toggleOverview();
               });

               $("#dialogPresentationSettings").dialog({
                   autoOpen: false,
                   width: 360,
                   minHeight: 440,
                   modal: true,
                   resizable: false,
                   open: function() {
                       var properties = $("#dialogPresentationSettings");
                       properties.find("#selectFontFamilySettings").val(settings.fontType);
                       properties.find("#selectTransitionSettings").val(settings.transition);
                       properties.find("#selectBGTransitionSettings").val(settings.bgTransition);
                       properties.find("#selectAutoSlideSettings").val(settings.autoSlide);
                       properties.find("#selectLoopSettings").val(settings.slideLoop);
                   },
                   buttons: [
                       {
                           text: "Kaydet",
                           click: function(event) {
                               saveSettings(event);
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

               $("#dialogOpenPresentation").dialog({
                   autoOpen: false,
                   width: 400,
                   modal: true,
                   resizable: false,
                   buttons: [
                       {
                           text: "Tamam",
                           click: function() {
                               openPresentation();
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

               $("#dialogShortcuts").dialog({
                   autoOpen: false,
                   width: 700,
                   height: 350,
                   modal: true,
                   resizable: false,
                   buttons: [
                       {
                           text: "Tamam",
                           click: function() {
                               $(this).dialog("close");
                           }
                       }
                   ]
               });

               $("#dialogCutCopyPasteShortcuts").dialog({
                   autoOpen: false,
                   width: 700,
                   height: 300,
                   modal: true,
                   resizable: false,
                   buttons: [
                       {
                           text: "Tamam",
                           click: function() {
                               $(this).dialog("close");
                           }
                       }
                   ]
               });

               $("#newSlideLeftContainer a").click(function(event) {
                   createNewSection("left");
                   event.preventDefault();
               });

               $("#newSlideRightContainer a").click(function(event) {
                   createNewSection("right");
                   event.preventDefault();
               });

               /*
                * Various browser fixes for fullscreen transitions 
                */
               var doit;
               window.onresize = function(e) {
                   //jquery-ui calls window resize event so first if seperate with those events with window.resize event
                   if (e.target === window) {
                       if (navigator.appVersion.indexOf("Mac") !== -1 || true) {
                           clearTimeout(doit);
                           doit = setTimeout(function() {

                               if (window.outerWidth === screen.width && window.outerHeight === screen.height) {
                                   //initial case
                                   if (fullscreen) {
                                       fullScreenMode();
                                   }
                                   else if ((document.fullScreenElement && document.fullScreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
                                       normalScreenMode();
                                   }

                               } else {
                                   if (!fullscreen) {
                                       normalScreenMode();
                                   }
                               }
                               fullscreen = false;

                           }, 500);

                       } else {  //Other operating systems
                           if (window.outerWidth === screen.width && window.outerHeight === screen.height) {
                               if (fullscreen) {
                                   fullScreenMode();
                               }
                               else {
                                   normalScreenMode();
                               }

                           } else {
                               if (!fullscreen) {
                                   normalScreenMode();
                               }
                           }
                           fullscreen = false;
                       }
                   }
               };