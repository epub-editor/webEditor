

               /*
                * Bold, italic, underline functions
                */
               function formatText(func, event) {
                   pushToStack();
                   document.execCommand(func, false);
                   event.preventDefault();
               }

               function changeFontSize(combobox, event) {
                   pushToStack();
                   var selectedVal = $(combobox).find("option:selected").val();
                   if (selectedVal !== "-1") {
                       document.execCommand('fontSize', false, selectedVal);
                       if (document.getSelection().type === "Caret") {//if there is no selection
                           $(document).on("click keydown", function() {
                               replaceFontSize();
                           });
                       } else {
                           replaceFontSize();
                       }
                   }
                   combobox.val("-1");
                   $(".present > .sectionContent").focus();
                   event.preventDefault();
               }

               function makeList(listingElement, event) {
                   pushToStack();

                   var command = "insert" + listingElement.attr("id") + "list";
                   document.execCommand(command, false);

                   if (listingElement.hasClass("ui-state-active")) {
                       listingElement.removeClass("ui-state-active");
                   } else {
                       $("#divListing a").removeClass("ui-state-active");
                       listingElement.addClass("ui-state-active");
                   }

                   event.preventDefault();
               }

               function changeFontColor(button, event) {
                   fontColorDialog.dialog("open").parent().position({my: "left top", at: "left bottom+6", of: button});
                   window.setTimeout(function() {
                       $(document).one("click", function(e) {
                           if (!$(e.target).hasClass("ebaui-icon-fontcolor")) {
                               fontColorDialog.dialog("close");
                               $("#buttonFontColor").removeClass("ui-state-focus");
                           }
                       });
                   }, 20);

                   event.preventDefault();
               }

               function changeBackgroundColor(button, event) {
                   backgroundColorDialog.dialog("open").parent().position({my: "left top", at: "left bottom+6", of: button});
                   window.setTimeout(function() {
                       $(document).one("click", function(e) {
                           if (!$(e.target).hasClass("ebaui-icon-backcolor")) {
                               backgroundColorDialog.dialog("close");
                           }
                           $("#buttonBackgroundColor").removeClass("ui-state-focus");
                       });
                   }, 20);

                   event.preventDefault();
               }

               function align(alignElement, event) {
                   pushToStack();

                   var command = "justify" + alignElement.attr("id");
                   document.execCommand(command);

                   $("#divAlignment a").removeClass("ui-state-active");
                   alignElement.addClass("ui-state-active");

                   event.preventDefault();
               }

               function setHeading(event) {
                   pushToStack();

                   var selectedVal = $("#selectHeading").find("option:selected").val();
                   var parentsAndSelf = $(getSelectedElement()).parentsUntil("section").andSelf();
                   document.execCommand('formatBlock', false, "h1");

                   var newTitle;
                   if (parentsAndSelf.is("h1")) {
                       newTitle = parentsAndSelf.filter("h1").removeClass().addClass(selectedVal);
                   } else {
                       newTitle = $("h1:not([class])").addClass(selectedVal);
                   }

                   newTitle.find("*").each(function() {//To clear the tags inside new <h1>
                       $(this).contents().unwrap();
                   });

                   event.preventDefault();
               }

               /*
                * This method is used for fixing execCommand bugs for font size
                * Each browser behaves differently after executing execCommand and
                * this function replaces unnecessary elements with usable ones
                */
               function replaceFontSize() {
                   var spans = $("section span").filter("[style*='font-size']");
                   for (var i = 0; i < spans.size(); i++) {
                       var spanI = spans[i];
                       if (isNaN(spanI.style.fontSize.charAt(0))) {
                           var currentFontSize = spanI.style.fontSize;
                           var fontSize = currentFontSize === "small" ? "16px" : currentFontSize === "medium" ? "24px" : currentFontSize === "large" ? "32px" : currentFontSize === "x-large" ? "48px" : currentFontSize === "xx-large" ? "64px" : currentFontSize === "-webkit-xxx-large" ? "96px" : "32px";
                           spanI.style.fontSize = fontSize;
                       }
                   }

                   /*Firefox Fix (Firefox creates <font> element instead of <span> after changing font size, and gives size attribute as html 1-7*/
                   var fonts = $("section font[size]");
                   for (var i = 0; i < fonts.size(); i++) {
                       var fontI = fonts[i];
                       var currentFontSize = fontI.size;
                       var fontSize = currentFontSize === "2" ? "16px" : currentFontSize === "3" ? "24px" : currentFontSize === "4" ? "32px" : currentFontSize === "5" ? "48px" : currentFontSize === "6" ? "64px" : currentFontSize === "7" ? "96px" : "32px";

                       $(fontI).removeAttr("size").css("font-size", fontSize);
                   }
               }

               fontColorDialog = $("#dialogFontColor").dialog({
                   autoOpen: false,
                   width: 182,
                   height: 198,
                   resizable: false
               });

               backgroundColorDialog = $("#dialogBackgroundColor").dialog({
                   autoOpen: false,
                   width: 182,
                   height: 250,
                   resizable: false
               });