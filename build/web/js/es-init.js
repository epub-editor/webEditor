                  
            $(document).ready(function() {
                                
                /******************************************************************************
                 ******************************* INIT FUNCTIONS *******************************
                 ******************************************************************************/
                $(window).load(function() {                    
                    $("#preLoader").fadeOut();                    
                });
                
                $(".present > .sectionContent").focus();

                window.onbeforeunload = function() {
                    if ($("#sectionContainer").html() !== lastSavedContent) {
                        return 'Kaydedilmemiş bilgileriniz silinecektir!';
                    }
                };                

                if (navigator.appVersion.indexOf("Mac") === -1) {
                    $(".helpMac").remove();
                } else {
                    $(".helpWin").remove();
                }

                stack.push(new Stack($("#sectionContainer").clone(), $('.present').attr("id")));

                google.maps.event.addDomListener(window, 'load', initializeMaps);






                /******************************************************************************
                 ********************************* FIX SECTION ********************************
                 ******************************************************************************/

                /*
                 * StyleWithCSS internet explorer fix 
                 */
                try {
                    document.execCommand("styleWithCSS", 0, true);
                } catch (e) {
                    try {
                        document.execCommand("useCSS", 0, false);
                    } catch (e) {
                        try {
                            document.execCommand('styleWithCSS', false, true);
                        }
                        catch (e) {
                        }
                    }
                }







                /******************************************************************************
                 ***************************** TOOLBAR FUNCTIONS ******************************
                 ******************************************************************************/

                $("#buttonSave")
                        .button({icons: {primary: "ui-icon-disk"}, text: false})
                        .click(function(event) {
                            savePresentation(event);
                        });

                $("#buttonPrint")
                        .button({icons: {primary: "ebaui-icon-print"}, text: false})
                        .click(function(event) {
                            createCanvas("print", event);
                        });

                $("#buttonDeleteSlide")
                        .button({icons: {primary: "ui-icon-trash"}, text: false})
                        .click(function(event) {
                            deleteSection(event);
                        });

                $("#buttonUndo")
                        .button({icons: {primary: "ebaui-icon-undo"}, text: false})
                        .click(function(event) {
                            undo(event);
                        });

                $("#buttonRedo")
                        .button({icons: {primary: "ebaui-icon-redo"}, text: false})
                        .click(function(event) {
                            redo(event);
                        });

                $("#selectFontSize").change(function(event) {
                    changeFontSize($(this), event);
                });

                $("#selectHeading").change(function(event) {
                    setHeading(event);
                });

                $("#divFormat a").mousedown(function(event) {
                    formatText($(this).attr("id"), event);
                    if ($(this).hasClass('ui-state-active')) {
                        $(this).removeClass('ui-state-active');
                    } else {
                        $(this).addClass('ui-state-active');
                    }
                });

                $("#buttonFontColor")
                        .button({icons: {primary: "ebaui-icon-fontcolor"}, text: false})
                        .click(function(event) {
                            changeFontColor(this, event);
                        });

                $("#buttonBackgroundColor")
                        .button({icons: {primary: "ebaui-icon-backcolor"}, text: false})
                        .click(function(event) {
                            changeBackgroundColor(this, event);
                        });

                $("#divAlignment a").mousedown(function(event) {
                    align($(this), event);
                });

                $("#divListing a").mousedown(function(event) {
                    makeList($(this), event);
                });

                $("#buttonAddImage")
                        .button({icons: {primary: "ui-icon-image"}, text: false})
                        .click(function(event) {
                            imageAddingLocation = "front";
                            $("#dialogAddImage").dialog("open");
                            event.preventDefault();
                        });

                $("#buttonLink")
                        .button({icons: {primary: "ebaui-icon-link"}, text: false})
                        .click(function(event) {
                            var currentSelection = saveSelection();
                            setLinkAddressToTextInput();
                            $("#dialogHyperlink").data("currentSelection", currentSelection).dialog("open");
                            event.preventDefault();
                        });







                /******************************************************************************
                 ******************************* MENU FUNCTIONS *******************************
                 ******************************************************************************/

                var menuFile = $("#ulMainMenu").menu().hide();

                $("#buttonMenubarMainMenu").button({icons: {primary: "ebaui-icon-mainmenu"}, text: false}).click(function(event) {
                    event.preventDefault();
                    menuFile.show().position({my: "left top", at: "left bottom", of: this});
                    $(document).one("click", function() {
                        menuFile.hide();
                    });
                    return false;
                });

                $("#buttonPreview")
                        .button({icons: {primary: "ui-icon-triangle-1-e"}, text: true})
                        .click(function(event) {
                            Reveal.toggleOverview();
                            event.preventDefault();
                        });

                $("#buttonPlayPresentation")
                        .button({icons: {primary: "ui-icon-circle-triangle-e"}, text: true})
                        .click(function(event) {
                            fullscreen = true;
                            toggleFullScreen();
                            event.preventDefault();
                        });

                $("#ulMainMenu #menuNewPresentation").click(function() {
                    if (confirm("Mevcut sunumunuzdaki kaydedilmemiş bilgileriniz silinecektir!\n\n Emin misiniz?")) {
                        currentPresentationId = null;
                        settings = {"fontType": "Arial", "transition": "default", "bgTransition": "default", "autoSlide": "0", "slideLoop": "false"};
                        Reveal.configure({transition: settings.transition, backgroundTransition: settings.bgTransition, loop: settings.slideLoop});
                        $("#sectionContainer").empty().html("<section id=\"0\" class=\"present\"><div tabindex=\"-1\" contenteditable=\"true\" class=\"sectionContent\" spellcheck=\"false\"></div><div class=\"sectionPageNumber\">1</div></section>");
                        Reveal.sync();
                    }
                });

                $("#ulMainMenu #menuOpen").click(function(event) {
                    if (confirm("Mevcut sunumunuzdaki kaydedilmemiş bilgileriniz silinecektir!\n\n Emin misiniz?")) {
                        getPresentations(event);
                    }
                });

                $("#ulMainMenu #menuSave").click(function(event) {
                    savePresentation(event);
                });

                $("#ulMainMenu #menuPdf").click(function(event) {
                    createCanvas("pdf", event);
                });

                $("#ulMainMenu #menuPrint").click(function(event) {
                    createCanvas("print", event);
                });

                $("#ulMainMenu #menuSettings").click(function(event) {
                    $("#dialogPresentationSettings").dialog("open");
                    event.preventDefault();
                });

                $("#ulEditMenu #menuUndo").click(function(event) {
                    undo(event);
                });

                $("#ulEditMenu #menuRedo").click(function(event) {
                    redo(event);
                });

                $("#ulEditMenu #menuCut").click(function() {
                    $("#dialogCutCopyPasteShortcuts").dialog("open");
                });

                $("#ulEditMenu #menuCopy").click(function() {
                    $("#dialogCutCopyPasteShortcuts").dialog("open");
                });

                $("#ulEditMenu #menuPaste").click(function() {
                    $("#dialogCutCopyPasteShortcuts").dialog("open");
                });

                $("#ulInsertMenu #menuAddImage").click(function(event) {
                    imageAddingLocation = "front";
                    $("#dialogAddImage").dialog("open");
                    event.preventDefault();
                });

                $("#ulInsertMenu #menuAddVideo").click(function(event) {
                    $("#dialogAddVideo").dialog("open");
                });

                $("#ulInsertMenu #menuAddLink").click(function(event) {
                    var currentSelection = saveSelection();
                    setLinkAddressToTextInput();
                    $("#dialogHyperlink").data("currentSelection", currentSelection).dialog("open");
                    event.preventDefault();
                });

                $("#ulInsertMenu #menuAddFigure").click(function(event) {
                    $("#dialogAddFigure").dialog("open");
                    event.preventDefault();
                });

                $("#ulInsertMenu #menuAddCanvasToDraw").click(function(event) {
                    $("#dialogAddCanvasToDraw").dialog("open");
                    event.preventDefault();
                });

                $("#ulInsertMenu #menuAddMaps").click(function(event) {
                    $("#dialogAddMaps").dialog("open");
                    event.preventDefault();
                });

                $("#ulInsertMenu #menuAddBackgroundImage").click(function(event) {
                    imageAddingLocation = "back";
                    $("#dialogAddImage").dialog("open");
                    event.preventDefault();
                });

                $("#ulInsertMenu #menuAddTextBox").click(function(event) {
                    addTextBox(event);
                });

                $("#ulInsertMenu #menuAddBlockquote").click(function(event) {
                    createBlockQuote(event);
                });

                $("#ulInsertMenu #menuAddHR").click(function() {
                    insertHR(event);
                });

                $("#ulInsertMenu #menuAddPageNumber").click(function(event) {
                    insertPageNumber(event);
                });

                $("#ulStyleMenu #ulTextStyle a").click(function(event) {
                    var func = $(this).attr("id").substring(4, $(this).attr("id").length);
                    formatText(func, event);
                    if ($("#" + func).hasClass('ui-state-active')) {
                        $("#" + func).removeClass('ui-state-active');
                    } else {
                        $("#" + func).addClass('ui-state-active');
                    }
                });

                $("#ulStyleMenu #ulAlignment a").click(function(event) {
                    var alignElement = $(this).attr("id").substring(5, $(this).attr("id").length);
                    align($("#" + alignElement), event);
                });

                $("#ulStyleMenu #menuNumberedList").click(function(event) {
                    makeList($("#ordered"), event);
                });

                $("#ulStyleMenu #menuUnorderedList").click(function(event) {
                    makeList($("#unordered"), event);
                });

                $("#ulHelpMenu #menuShortcutInfo").click(function() {
                    $("#dialogShortcuts").dialog("open");
                });

            });







            /******************************************************************************
             *********************************** BINDINGS *********************************
             ******************************************************************************/

            /*
             * Necessary functions for organizing state of toolbar 
             * items after clicking mouse or pressing a key
             */
            $(document).on('click keyup', '.present', function(event) {
                                
                if (jwerty.is('enter', event)) {
                    //to push line breaks into undo-redo stack
                    pushToStack();
                } else {

                    var parentsAndSelf = $(getSelectedElement()).is("section") ? $(getSelectedElement()) : $(getSelectedElement()).parentsUntil("section").andSelf();
                    var textAlign = parentsAndSelf.filter("div[style*='text-align']");

                    if (parentsAndSelf.is("span")) {
                        var fontBold = parentsAndSelf.filter("[style*='font-weight']");
                        var fontItalic = parentsAndSelf.filter("[style*='font-style']");
                        var fontUnderline = parentsAndSelf.filter("[style*='text-decoration']");
                        var fontColor = parentsAndSelf.filter("span[style*='color']");

                        if (fontBold.size() > 0 && (fontBold.css("font-weight") === "bold" || fontBold.css("font-weight") !== 400/*Firefox fix*/)) {
                            $("#bold").addClass("ui-state-active");
                        } else {
                            $("#bold").removeClass("ui-state-active");
                        }
                        if (fontItalic.css("font-style") === "italic") {
                            $("#italic").addClass("ui-state-active");
                        } else {
                            $("#italic").removeClass("ui-state-active");
                        }
                        if (fontUnderline.css("text-decoration")) {
                            if (fontUnderline.css("text-decoration").indexOf("underline") !== -1) {
                                $("#underline").addClass("ui-state-active");
                            } else {
                                $("#underline").removeClass("ui-state-active");
                            }
                        }
                        if (fontColor.size() > 0) {
                            if (getSelection().type === "Caret") {
                                $("#iframeFontColor")[0].contentWindow.fontcolorSpectrum.spectrum("set", fontColor.css("color"));
                            } else {
                                $("#iframeFontColor")[0].contentWindow.fontcolorSpectrum.spectrum("set", "");
                            }
                        }

                    } else {
                        $("#divFormat a").removeClass("ui-state-active");
                        $("select#selectFontSize option").removeAttr("selected");
                        $("select#selectFontSize").val("Boyut");
                        $("#iframeFontColor")[0].contentWindow.fontcolorSpectrum.spectrum("set", "#000");
                    }

                    if (parentsAndSelf.is("ol")) {
                        $("#ordered").addClass("ui-state-active");
                    } else {
                        $("#ordered").removeClass("ui-state-active");
                    }

                    if (parentsAndSelf.is("ul")) {
                        $("#unordered").addClass("ui-state-active");
                    } else {
                        $("#unordered").removeClass("ui-state-active");
                    }

                    if (parentsAndSelf.is("h1")) {
                        var optVal = parentsAndSelf.filter("h1").attr("class");
                        $("select#selectHeading option").removeAttr("selected");
                        $("select#selectHeading option[value=" + optVal + "]").attr("selected", "selected");
                    } else {
                        $("select#selectHeading option").removeAttr("selected");
                        $("select#selectHeading option:first").attr("selected", "selected");
                    }

                    if (textAlign.size() > 0) {
                        var textAlignParam = $(textAlign[0]).css("text-align");
                        $("#divAlignment a").removeClass("ui-state-active");
                        $("#" + textAlignParam).addClass("ui-state-active");
                    } else {
                        $("#divAlignment a").removeClass("ui-state-active");
                        $("#left").addClass("ui-state-active");
                    }

                    if (parentsAndSelf.is("blockquote")) {
                        // This is for deleting blockquote with backspace button
                        if (jwerty.is('backspace', event) && getStartOffSet() === 0) {
                            var blockquoteDIV = $(parentsAndSelf).find("blockquote");
                            $(blockquoteDIV).before("<div>" + $(blockquoteDIV).text() + "</div>");
                            $(blockquoteDIV).remove();
                        }

                        // This is for deleting stange span when appending text that is after blockquote
                        var spanElement = $(parentsAndSelf).find("blockquote span");
                        spanElement.before(spanElement.text());
                        spanElement.remove();
                        if ($('.present .sectionContent').children('div').length === 0) {
                            var newDIV = document.createElement('DIV');
                            $(newDIV).html("<br>");
                            $('.present .sectionContent').append(newDIV);
                        }
                    }

                }

            });            

            /*
             * Background change effect on hover for shortcut help boxes
             */
            $(".helpShortcutTable td").hover(function() {
                $(this).css("background-color", "#f6f6f6");
            }, function() {
                $(this).css("background-color", "#fff");
            });

            /*
             * Overrides default alert box with fancy styled one
             */
            function alert(message) {
                $("#alertDialog").html(message);
                $("#alertDialog").dialog({
                    modal: true,
                    resizable: false,
                    width: 400,
                    minHeight: 150,
                    show: {
                        duration: 100
                    },
                    hide: {
                        duration: 100
                    },
                    buttons: {
                        Ok: function() {
                            $(this).dialog("close");
                        }
                    }
                });
            }

            /*
             * Key event bindings 
             */
            jwerty.key('ctrl+z', function(event) {
                undo(event);
            });
            jwerty.key('⌘+z', function(event) {
                undo(event);
            });
            jwerty.key('ctrl+y', function(event) {
                redo(event);
            });
            jwerty.key('⌘+shift+z', function(event) {
                redo(event);
            });
            jwerty.key('ctrl+p', function(event) {
                createCanvas("print", event);
            });
            jwerty.key('⌘+p', function(event) {
                createCanvas("print", event);
            });
            jwerty.key('ctrl+s', false);
            jwerty.key('⌘+s', false);
            jwerty.key('ctrl+s', function(event) {
                savePresentation(event);
            });
            jwerty.key('⌘+s', function(event) {
                savePresentation(event);
            });







               /******************************************************************************
                ********************************** OVERRIDES *********************************
                ******************************************************************************/

               /*
                * Manual button hover override
                */
               $("div.esButtonBarDiv a").hover(
                       function() {
                           $(this).addClass("ui-state-hover");
                       },
                       function() {
                           $(this).removeClass("ui-state-hover");
                       }
               );

               /*
                * Manual selection hover override
                */
               $(document).on("mouseenter", ".selectDivContainer", function() {
                   $(this).css("border-color", "#ffa300").css("background-color", "#fff5e2");
               });

               /*
                * Manual selection hover override
                */
               $(document).on("mouseleave", ".selectDivContainer", function() {
                   $(this).css("border-color", "").css("background-color", "");
               });
