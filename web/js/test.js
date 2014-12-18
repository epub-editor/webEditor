//
//               /******************************************************************************
//                ******************************* BRING TO FRONT *******************************
//                ******************************************************************************/
//               var bringtofrontbutton = "<input type='button' id='buttonImageFront' value='image to front' />";
//               $(bringtofrontbutton).insertAfter("#topPanel");
//               $("#buttonImageFront")
//                       .button({})
//                       .click(function() {
//                           detectCollision("front");
//                       });
//               /*
//                *  - Click edilen element (selectedElement) alınır (şimdilik sadece resimler yada container)
//                *  - $('.present') içerisindeki elementlerin (presentSectionElement) genişlik, yükseklik ve position'lari alınır
//                *  - "presentSectionElement" ile "selectedElement" collision karşılaştırılır
//                *  - collision VARSA
//                *      - collision olan element'ler arasında z-index'i en fazla olan değer bulunur (max-z-index)
//                *      - "max-z-index", "selectedElement" in z-index'ine set edilir
//                *  - collision YOKSA
//                *      - aynen bırakılır
//                * 
//                */
//
//               /*
//                *  - Function that return points [ [ A(x) , B(x) ] , [ A(y) , C(y) ] ]
//                *   A-----------B
//                *   |...........|
//                *   |...........|      
//                *   |...........|
//                *   |...........|
//                *   C-----------D
//                *   A(x,y)
//                *   B(x,y)
//                *   C(x,y)
//                *   D(x,y)
//                */
//               function getElementPositions(elem) {
//                   var pos, width, height;
//                   pos = $(elem).position();
//                   width = $(elem).width();
//                   height = $(elem).height();
//                   return [[pos.left, pos.left + width], [pos.top, pos.top + height]];
//               }
//
//               /*
//                *  - Function that compare to point in same region
//                */
//               function comparePositions(p1, p2) {
//                   var r1, r2;
//                   r1 = p1[0] < p2[0] ? p1 : p2;
//                   r2 = p1[0] < p2[0] ? p2 : p1;
//                   return r1[1] > r2[0] || r1[0] === r2[0];
//               }
//
//
//               /*
//                *  - Function that set z-index of given element
//                */
//               function setElementZindex(element, zIndex) {
//                   $(element).css('z-index', zIndex);
//               }
//
//
//               /*
//                *  - Function that compare two elements in collision
//                */
//               function isCollisionExist(elem1, elem2) {
//                   var pos1 = getElementPositions(elem1);
//                   var pos2 = getElementPositions(elem2);
//                   return comparePositions(pos1[0], pos2[0]) && comparePositions(pos1[1], pos2[1]);
//               }
//
//
//               /*
//                *  - Function that set selected element position to front -- detectCollision("front")
//                *  
//                *      "div'lerin pozisyonları z-index'ine göre,
//                *          z-index'leri aynı ise kacıncı child olduguna göre değişir"
//                */
//               function detectCollision(positionCase) {
//
//                   // "frontElem" selected element'e önunde ve ona en yakın olan element'tir
//                   var secondFrontElem; // "secondFrontElem" element is front of "frontElem"
//                   var frontElem;
//                   var selectedElement = window.getSelection().getRangeAt(0).startContainer;
//                   var selectedElementIndex = $(selectedElement).css('z-index') === "auto" ? 0 : parseInt($(selectedElement).css('z-index'));
//
//                   var sectionElements = $('.present .boxContainer');
//                   for (var i = 0; i < sectionElements.length; i++) {
//                       if (sectionElements[i] != selectedElement) {
//                           if (isCollisionExist(selectedElement, sectionElements[i])) {
//                               var zIndex = $(sectionElements[i]).css('z-index') === "auto" ? 0 : parseInt($(sectionElements[i]).css('z-index'));
//
//                               if (zIndex >= selectedElementIndex && (zIndex == selectedElementIndex ? $(selectedElement).index() < $(sectionElements[i]).index() : true)) { // gelen element selectedElement'in önunde oldugu kesin ise
//                                   // sectionElements[i] BU NOKTADAN SONRA SELECTED ELEMENT'IN ONUNDE OLDUGU KESIN OLMALIDIR
//
//                                   if (frontElem == null) { //frontElem null ise zIndexElement'i ona set e
//                                       if (zIndex == selectedElementIndex) { //aynı seviyede ise kacıncı child olduklarına bakılır
//                                           if ($(sectionElements[i]).index() > $(selectedElement).index()) { // eger index buyuk ise bu element'in front pozisyonda oldugu anlasilir
//                                               frontElem = sectionElements[i];
//                                           }
//                                       } else {  // zIndex > selectedElementIndex
//                                           frontElem = sectionElements[i];
//                                       }
//                                   }
//                                   else if (frontElem != null) { // frontElem null değil
//                                       // gelen element'in z-index'i daha kucuktur bunun anlamı gelen element "selectedElement" ile "frontElem" arasındadır
//                                       if (($(frontElem).css('z-index') === "auto" ? 0 : parseInt($(frontElem).css('z-index'))) > zIndex) { // frontElem daha önde oldugu kesin ise 
//                                           secondFrontElem = frontElem;
//                                           frontElem = sectionElements[i];
//                                       }
//
//                                       else if (($(frontElem).css('z-index') === "auto" ? 0 : parseInt($(frontElem).css('z-index'))) == zIndex) { // frontElem ile aynı seviyedeyse 
//                                           if ($(frontElem).index() > $(sectionElements[i]).index()) { // sectionElements[i] frontElem'in arkasında ise  
//                                               secondFrontElem = frontElem;
//                                               frontElem = sectionElements[i];
//                                           } else { // sectionElements[i] frontElem'in önunde ise  
//                                               if (secondFrontElem == null) {
//                                                   secondFrontElem = sectionElements[i];
//                                               }
//                                               else if (secondFrontElem != null) {
//                                                   if (($(secondFrontElem).css('z-index') === "auto" ? 0 : parseInt($(secondFrontElem).css('z-index'))) == zIndex) {
//                                                       if ($(secondFrontElem).index() > $(sectionElements[i]).index()) {
//                                                           secondFrontElem = sectionElements[i];
//                                                       }
//                                                   } else if (($(secondFrontElem).css('z-index') === "auto" ? 0 : parseInt($(secondFrontElem).css('z-index'))) > zIndex) {
//                                                       secondFrontElem = sectionElements[i];
//                                                   }
//                                               }
//                                           }
//                                       }
//
//                                       else if (($(frontElem).css('z-index') === "auto" ? 0 : parseInt($(frontElem).css('z-index'))) < zIndex) { // frontElem daha arkada oldugu kesin ise 
//                                           if (secondFrontElem == null) {
//                                               secondFrontElem = sectionElements[i];
//                                           }
//                                           if (secondFrontElem != null) {
//                                               if (($(secondFrontElem).css('z-index') === "auto" ? 0 : parseInt($(secondFrontElem).css('z-index'))) == zIndex) {
//                                                   if ($(secondFrontElem).index() > $(sectionElements[i]).index()) {
//                                                       secondFrontElem = sectionElements[i];
//                                                   }
//                                               } else if (($(secondFrontElem).css('z-index') === "auto" ? 0 : parseInt($(secondFrontElem).css('z-index'))) > zIndex) {
//                                                   secondFrontElem = sectionElements[i];
//                                               }
//                                           }
//                                       }
//
//                                   }
//                               }
//
//                           }
//                       }
//                   }
//
//                   if (positionCase === "front" && frontElem != null) {
//                       if (secondFrontElem != null) {
//                           if ((($(frontElem).css('z-index') === "auto" ? 0 : parseInt($(frontElem).css('z-index'))) + 1) >= ($(secondFrontElem).css('z-index') === "auto" ? 0 : parseInt($(secondFrontElem).css('z-index')))) {
//                               $(selectedElement).css('z-index', ($(secondFrontElem).css('z-index') === "auto" ? 0 : parseInt($(secondFrontElem).css('z-index'))));
//                               $(selectedElement).insertBefore($(secondFrontElem));
//                           } else {
//                               $(selectedElement).css('z-index', ($(frontElem).css('z-index') === "auto" ? 0 : parseInt($(frontElem).css('z-index'))) + 1);
//                           }
//                       } else { // bu durumda önunde sadece bir tane element vardır. Index artırma yeterlidir
//                           $(selectedElement).css('z-index', ($(frontElem).css('z-index') === "auto" ? 0 : parseInt($(frontElem).css('z-index'))) + 1);
//                       }
//
//                   }
//
//                   selectText(selectedElement);
//
//               }
//
//
//               /*
//                *  - Function that changes position of two sections
//                */
//               function changeOverviewPosition(section1, section2) {
//
//                   var attr1 = $(section1).clone()[0].attributes;
//                   var attr2 = $(section2).clone()[0].attributes;
//                   var index1 = $(section1).index();
//                   var index2 = $(section2).index();
//
//                   for (var i = 0; i < attr1.length; i++) {
//                       $(section2).attr(attr1[i].name, attr1[i].value);
//                   }
//
//                   for (var i = 0; i < attr2.length; i++) {
//                       $(section1).attr(attr2[i].name, attr2[i].value);
//                   }
//
//                   //Kullanici, <section>'ların index'leri değişimi bitene kadar beklemelidir
//                   //Timeout kullanılmasının sebebi ise geçiş animasyonunun bitmesinin beklenmesidir
//                   Reveal.configure({keyboard: false});
//                   window.setTimeout(function() {
//                       if (index1 > index2) {
//                           $(section1).insertBefore(section2);
//                       } else {
//                           $(section2).insertBefore(section1);
//                       }
//                       Reveal.configure({keyboard: true});
//                   }, 1000);
//
//               }
//
//
////               var prevXPos, prevYPos;
////               var diffX, diffY;
////               function draggableSectionActivate() {
////
////                   $("#sectionContainer").sortable({
////                       revert: true
////                   });
////
////                   $('section').draggable({
////                       revert: true,
////                       start: function(event, ui) {
////                           console.log("START");
////                           console.log($(this).position());
////                       },
////                       stop: function() {
////                           console.log("STOP");
////                           console.log($(this).position());
////                       },
////                       drag: function(event, ui)
////                       {
////
////                           var zoom = $('#sectionContainer').css('zoom');
////
////                           //öncelikle işlem yapılacak olan yani $(this) objesinin clone'u alınır 
////                           var clonedSection = $(this).clone();
////
////                           if (prevXPos != null && prevYPos != null) {
////                               diffX = prevXPos - event.clientX;
////                               diffY = prevYPos - event.clientY;
////                           }
////
////                           prevXPos = event.clientX;
////                           prevYPos = event.clientY;
////
////                           if (diffX != null && diffY != null) {
////                               $(this).css('left', $(this).position().left + diffX);
//////                ui.position.left = ui.position.left + diffX;
////                           }
////
////                           ui.position.left = Math.round(ui.position.left / zoom) //+ $(this).position().left ;
////                           ui.position.top = Math.round(ui.position.top / zoom) //+ $(this).position().top;
////
////                       },
////                       cursorAt: {
////                           top: -35,
////                           left: -35
////                       }
////                   }).sortable({
////                       revert: true
////                   });
////                   ;
////
////               }
//
//
//
//
//
//
//               /******************************************************************************
//                ************************** UTIL FUNCTIONS (JQUERY) ***************************
//                ******************************************************************************/
//
//               /*
//                * Return text width of element -- $('#element').textWidth() --
//                */
//               $.fn.textWidth = function() {
//                   var html_org = $(this).html();
//                   $(this).html('<span>' + html_org + '</span>');
//                   var width = $(this).find('span:first').width();
//                   $(this).html(html_org);
//                   return width;
//               };
//
//
//               /******************************************************************************
//                ******************************* TABLE OPERATIONS *****************************
//                ******************************************************************************/
//               var createTableButton = '<input type="button" id="buttonInsertTable" value="Insert Table"/>';
//               $(createTableButton).insertAfter("#topPanel");
//               $("#buttonInsertTable")
//                       .button({})
//                       .click(function(event) {
//                           $("#dialogTableProperties").dialog("open");
//                       });
//
//
//               $("#dialogTableProperties").dialog({
//                   autoOpen: false,
//                   width: 200,
//                   height: 200,
//                   modal: true,
//                   resizable: true,
//                   show: {
//                       effect: "blind",
//                       duration: 100
//                   },
//                   hide: {
//                       effect: "blind",
//                       duration: 100
//                   },
//                   buttons: [
//                       {
//                           text: "Tamam",
//                           click: function(event) {
//
//                               var row = $('#dialogTablePropertiesROW').val();
//                               var column = $('#dialogTablePropertiesCOLUMN').val();
//
//                               // if numbers are valid
//                               if ((!isNaN(parseFloat(row)) && isFinite(row)) && (!isNaN(parseFloat(column)) && isFinite(column))) {
//
//                                   $(this).dialog("close");
//
//                                   var newTable = createTable(row, column);
//                                   tableAddRow($(newTable).find('thead')[0], $($(newTable).find('tbody')[0]).find('tr:first-child td').length);
//
//                                   var imgDiv = document.createElement("div");
//                                   imgDiv.contentEditable = "false";
//                                   imgDiv.classList.add("boxContainer");
//
//                                   var removeElem = document.createElement("a");
//                                   removeElem.href = "#";
//                                   removeElem.className = "deleteIcon ui-icon-closethick";
//
//                                   imgDiv.appendChild(newTable);
//                                   imgDiv.appendChild(removeElem);
//                                   $(".present").get(0).appendChild(imgDiv);
//
//                                   $(imgDiv).draggable({
//                                       opacity: 0.5,
//                                       containment: $(".present").get(0),
//                                       handle: '.tableDragger',
//                                       stop: function() {
//                                           pushToStack();
//                                       }
//                                   });
//                                   $(imgDiv).resizable({
//                                       containment: $(".present").get(0),
//                                       stop: function(event, ui) {
//                                           $(imgDiv).css("position", "inherit");
//                                           pushToStack();
//                                       }
//                                   });
//
//
//                               } else {
//                                   alert("Girdiğiniz değerler sayı olmalıdır !!!");
//                               }
//                           }
//                       },
//                       {
//                           text: "Cancel",
//                           click: function() {
//                               $(this).dialog("close");
//                           }
//                       }
//                   ],
//                   open: function() {
//                   },
//                   close: function() {
//                   }
//               });
//
//
//               /*
//                *  - FUNCTION EVENTS
//                */
//               $(document).ready(function() {
//
//
//                   //Column selection
//                   $(document).on('click', 'table thead tr td', function() {
//                       removeSelectionOfRowORColumn($(getSelectedTable(this)).find('tbody')[0]);
//                       var selectedColumn = $(this).index();
//                       if (selectedColumn != 0) {
//                           // tüm rowlardaki ilgili column'a class eklenir
//                           var tableRows = $(getSelectedTable(this)).find('tbody tr');
//                           for (var i = 0; i < tableRows.length; i++) {
//                               $($(tableRows[i]).find('td')[selectedColumn]).addClass('selectedColumn');
//                           }
//                       }
//
//                   });
//
//                   //Row selection
//                   $(document).on('click', 'tbody tr td:first-child', function() {
//                       var keyPressed = false;
//                       // doesn't work for now
//                       //Multiple Row Selection
////                                $(window).keydown(function (e) {
////                                    var code = (e.keyCode ? e.keyCode : e.which);
////                                    if (code === 91 ) {                                          
////                                        $(this).parent('tr').addClass('selectedRow');
////                                        keyPressed = true;
////                                        return keyPressed;
////                                    }else
////                                        return keyPressed;
////                                });
//
//                       if (!keyPressed) {
//                           removeSelectionOfRowORColumn($(getSelectedTable(this)).find('tbody')[0]);
//                           $(this).parent('tr').addClass('selectedRow');
//                       }
//
//                   });
//
//                   //Last Cell - if user working on last cell of table
//                   $(document).on('focus', 'table tbody tr:last-child td:last-child div', function(event) {
//                       var tbody = getSelectedTableBody(this);
//                       $(window).keydown(function(e) {
//                           var code = (e.keyCode ? e.keyCode : e.which);
//                           if (code === 9 && $(tbody).find('tr:last-child td:last-child div').is(':focus')) {
//                               tableAddRow(tbody, ($(tbody).find('tr:last-child td').length - 1));
//                           }
//                       });
//                   });
//
//                   //Div Selection
//                   $(document).on('focus', 'table tbody tr td div', function(event) {
//                       if (isDraggableMode(this))
//                           setDraggableMode(this, 'disable');
//
//                       removeSelectionOfRowORColumn($(getSelectedTable(this)).find('tbody')[0]);
//                       //$($(this).parentsUntil("section").andSelf().filter("tbody tr")[0]).addClass('selectedRow');
//                   });
//
////                           $('table').sortable({
////                               items : 'tr',
////                               update : function(event, ui)
////                               {                        
////                                   var tbodyElement = $(this).parent().find('tbody')[0];
////                                   $(this).find('tbody tr').siblings().removeClass('rowBackgroundColor1');
////                                   $(this).find('tbody tr').siblings().removeClass('rowBackgroundColor2');                  
////                                   setRowBackground(tbodyElement);
////                               }
////                           });
//
//               });
//
//
//               /*
//                *  - Function that creates column cells for table
//                */
//               function createCell(addElem) {
//                   var newColumn = document.createElement('TD');
//                   if (addElem === "DIV") {
//                       var divInside = document.createElement('DIV');
//                       $(divInside).attr('contenteditable', 'true');
//                       $(divInside).css('width', '100%');
//                       $(divInside).html('');
//                       $(newColumn).append(divInside);
//                   }
//                   return newColumn;
//               }
//
//               /*
//                *  - Function that add new column 
//                */
//               function tableAddColumn(tableBodyElement) {
//                   for (var i = 0; i < $(tableBodyElement).find('tr').length; i++) {
//                       $(createCell('DIV')).insertAfter($(tableBodyElement).find('tr td:last-child')[i]);
//                   }
//               }
//
//               /*
//                *  - Function that add new row 
//                */
//               function tableAddRow(tableBodyElement, column) {
//
//                   // main row
//                   var newRow = document.createElement('TR');
//
//                   // selective cell (leftmost cell)
//                   if ($(tableBodyElement).is('tbody')) {
//                       $(newRow).append($(document.createElement('TD')).addClass('rowSelector').css('width', '20px')[0]);
//                   }
//
//                   // other cells 
//                   for (var j = 0; j < column; j++) {
//                       ($(tableBodyElement).is('tbody') ? $(newRow).append(createCell('DIV')) : $(newRow).append(createCell()));
//                   }
//                   $(tableBodyElement).append(newRow);
//
//                   // coloring
//                   if ($(tableBodyElement).is('tbody')) {
//                       if ($(newRow).index() % 2 === 0)
//                           $(newRow).addClass('rowBackgroundColor1');
//                       else
//                           $(newRow).addClass('rowBackgroundColor2');
//                   } else if ($(tableBodyElement).is('thead')) {
//                       $(newRow).addClass('columnSelector');
//                   }
//               }
//
//
//               /*
//                *  - Function that create new table
//                */
//               function createTable(row, column) {
//
//                   var mainTableDIV = document.createElement('DIV');
//                   var newTable = document.createElement('TABLE');
//                   var newTableHead = document.createElement('THEAD');
//                   var newTableFoot = document.createElement('TFOOT');
//                   var newTableBody = document.createElement('TBODY');
//                   var draggableDIV = document.createElement('DIV');
//                   $(draggableDIV).addClass('tableDragger');
//                   $(draggableDIV).css('background-color', '#357ebd');
//                   $(draggableDIV).css('height', '25');
//                   $(draggableDIV).css('width', '100%');
//
//                   $(newTable).addClass('sectionTable');
//                   $(newTable).css('width', '100%');
//                   $(newTable).css('border-width', '0px');
//
//                   // adding rows&columns
//                   for (var i = 0; i < row; i++) {
//                       tableAddRow(newTableBody, column);
//                   }
//
//                   $(newTable).append(newTableHead);
//                   $(newTable).append(newTableFoot);
//                   $(newTable).append(newTableBody);
//
//                   $(mainTableDIV).append(draggableDIV);
//                   $(mainTableDIV).append(newTable);
//
//                   return mainTableDIV;
//               }
//
//
//               /*
//                *  - Function that coloring background of rows
//                */
//               function setRowBackground(tableBodyElement) {
//                   for (var i = 0; i < $(tableBodyElement).find('tr').length; i++) {
//                       if ($($(tableBodyElement).find('tr')[i]).index() % 2 === 0)
//                           $($(tableBodyElement).find('tr')[i]).addClass('rowBackgroundColor1');
//                       else
//                           $($(tableBodyElement).find('tr')[i]).addClass('rowBackgroundColor2');
//
//                   }
//               }
//
//               /*
//                *  - Function that clean selected row&column
//                */
//               function removeSelectionOfRowORColumn(tableBodyElement) {
//                   $(tableBodyElement).find('tr').removeClass('selectedRow');
//                   $(tableBodyElement).find('tr td').removeClass('selectedColumn');
//               }
//
//               function organizeThead(element) {
//                   var thead = getSelectedTableHead(element);
//                   var tbody = getSelectedTableBody(element);
//                   $(thead).children().remove();
//                   tableAddRow(thead, $(tbody).find('tr:first-child td').length);
//               }
//
//               function getSelectedTableColumn(element) {
//                   return $(element).parentsUntil('section').andSelf().filter('td')[0];
//               }
//               function getSelectedTableRow(element) {
//                   return $(element).parentsUntil('section').andSelf().filter('tr')[0];
//               }
//               function getSelectedTable(element) {
//                   return $(element).parentsUntil('section').andSelf().find('table')[0];
//               }
//               function getSelectedTableBody(element) {
//                   return $(getSelectedTable(element)).find('tbody')[0];
//               }
//               function getSelectedTableHead(element) {
//                   return $(getSelectedTable(element)).find('thead')[0];
//               }
//
//               function setDraggableMode(element, enableORDisable) {
//                   //    $($(element).parentsUntil("section").andSelf().filter(".tableContainer")[0]).draggable(enableORDisable);   
//
//                   // if draggable enable then
//                   if ($(getSelectedTableHead(element)).children().length === 0 && enableORDisable === 'disable') {
//                       tableAddRow(getSelectedTableHead(element), $(getSelectedTableBody(element)).find('tr:first-child td').length);
//                       // if draggable disable then remove thead
//                   } else if (enableORDisable === 'enable') {
//                       $(getSelectedTableHead(element)).children().remove();
//                   }
//               }
//
//               function isDraggableMode(element) {
//                   return !$($(element).parentsUntil("section").andSelf().filter(".tableContainer")[0]).hasClass('ui-draggable-disabled');
//               }
//
//
//               /******************************************************************************
//                ******************************* CONTEXT MENU **********************************
//                ******************************************************************************/
//               /* http://medialize.github.io/jQuery-contextMenu/demo.html */
//
//               /**********************************************************************
//                ******************************* TABLE MENU ****************************
//                ***********************************************************************/
//
//               var tableRowClone;
//               var tableColumnClone;
//
//               function contextMenuTableEvents(key, element) {
//
//                   var table = getSelectedTable(element);
//                   var tbodyElement = getSelectedTableBody(element);
//
//                   switch (key)
//                   {
//                       case "addNewRow":
//                           tableAddRow($(table).find('tbody')[0], ($(table).find('tbody tr:last-child td').length - 1));
//                           removeSelectionOfRowORColumn($(getSelectedTable(element)).find('tbody')[0]);
//                           break;
//                       case "addNewColumn":
//                           tableAddColumn(getSelectedTableBody(element));
//                           organizeThead(element);
//                           break;
//
//
//                       case "copySelectedRow":
//                           tableColumnClone = null;
//                           tableRowClone = $($($(tbodyElement).find('.selectedRow')[0]).clone())[0];
//                           $(tableRowClone).removeClass('selectedRow');
//                           break;
//                       case "cutSelectedRow":
//                           tableColumnClone = null;
//                           tableRowClone = $($($(tbodyElement).find('.selectedRow')[0]).clone())[0];
//                           $(tableRowClone).removeClass('selectedRow');
//                           $(tbodyElement).find('.selectedRow').remove();
//
//                           $(tbodyElement).find('tr').removeClass('rowBackgroundColor1');
//                           $(tbodyElement).find('tr').removeClass('rowBackgroundColor2');
//                           setRowBackground(tbodyElement);
//                           break;
//                       case "pasteSelectedRow":
//                           if (tableRowClone) {
//                               var selTr = getSelectedTableRow(element);
//                               $(tableRowClone).clone().insertAfter(selTr);
//
//                               $(tbodyElement).find('tr').removeClass('rowBackgroundColor1');
//                               $(tbodyElement).find('tr').removeClass('rowBackgroundColor2');
//                               setRowBackground(tbodyElement);
//
//                           } else {
//                               alert("Paste yapılamaz cunku kesme yada kopyalama tutulmuyor");
//                           }
//
//                           break;
//                       case "deleteSelectedRow":
//                           $(tbodyElement).find('tr').removeClass('rowBackgroundColor1');
//                           $(tbodyElement).find('tr').removeClass('rowBackgroundColor2');
//                           $(tbodyElement).find('.selectedRow').remove();
//
//                           setRowBackground(tbodyElement);
//                           break;
//
//
//                       case "copySelectedColumn":
//                           // clone işlemi yap
//                           tableRowClone = null;
//                           tableColumnClone = $($(tbodyElement).find('.selectedColumn')).clone();
//                           $(tableColumnClone).removeClass('selectedColumn');
//                           break;
//                       case "cutSelectedColumn":
//                           // clone yap
//                           tableRowClone = null;
//                           tableColumnClone = $($(tbodyElement).find('.selectedColumn')).clone();
//                           $(tableColumnClone).removeClass('selectedColumn');
//
//                           // arkasından silme işlemi yap
//                           $(tbodyElement).find('tr').removeClass('rowBackgroundColor1');
//                           $(tbodyElement).find('tr').removeClass('rowBackgroundColor2');
//                           $(tbodyElement).find('.selectedColumn').remove();
//
//                           organizeThead(element);
//                           setRowBackground(tbodyElement);
//                           break;
//                       case "pasteSelectedColumn":
//                           if (tableColumnClone) {
//                               var selCol = getSelectedTableColumn(element);
//                               var rows = $(tbodyElement).find('tr');
//                               var targetColumn = $(selCol).index();
//
//                               for (var i = 0; i < rows.length; i++) {
//                                   if (tableColumnClone[i]) {    // sonradan satır eklenmediyse
//                                       $(tableColumnClone[i]).clone().insertAfter($(rows[i]).children().get(targetColumn));
//                                   } else {                      // sonradan satır eklendiyse son hucre boş olur                                                    
//                                       $(createCell('DIV')).insertAfter($(rows[i]).children().get(targetColumn));
//                                   }
//                               }
//                               organizeThead(element);
//
//                           } else {
//                               alert("Paste yapılamaz cunku kesme yada kopyalama tutulmuyor");
//                           }
//                           break;
//                       case "deleteSelectedColumn":
//                           $(tbodyElement).find('tr').removeClass('rowBackgroundColor1');
//                           $(tbodyElement).find('tr').removeClass('rowBackgroundColor2');
//                           $(tbodyElement).find('.selectedColumn').remove();
//
//                           organizeThead(element);
//                           setRowBackground(tbodyElement);
//                           break;
//
//                       default:
//
//                           break;
//                   }
//               }
//
//               $(function() {
//
//                   $('#revealMainContainer').contextMenu({
//                       selector: 'table', //activate contextMenu for selector
//                       trigger: 'right', //activate left-OR-right mouse button ( right , left , hover )
//                       delay: 0, //set delay for contextMenu
//                       autoHide: true, //
//                       callback: function(key, options) {
//                           contextMenuTableEvents(key, this);
//                       },
//                       items: {
//                           "addNewRow": {name: "Satır ekle", icon: "edit"},
//                           "addNewColumn": {name: "Sütun ekle", icon: "edit"},
//                       }
//                   });
//
//                   $('#revealMainContainer').contextMenu({
//                       selector: 'table tbody tr td:first-child',
//                       trigger: 'right',
//                       autoHide: true,
//                       callback: function(key, options) {
//                           contextMenuTableEvents(key, this);
//                       },
//                       items: {
//                           "addNewRow": {name: "Satır ekle", icon: "edit"},
//                           "addNewColumn": {name: "Sütun ekle", icon: "edit"},
//                           "copySelectedRow": {name: "Satırı kopyala", icon: "edit"},
//                           "cutSelectedRow": {name: "Satırı kes", icon: "cut"},
//                           "pasteSelectedRow": {name: "Satırı yapıştır", icon: "paste"},
//                           "deleteSelectedRow": {name: "Satırı sil", icon: "delete"},
//                       }
//                   });
//
//                   $('#revealMainContainer').contextMenu({
//                       selector: 'table thead tr td',
//                       trigger: 'right',
//                       autoHide: true,
//                       callback: function(key, options) {
//                           contextMenuTableEvents(key, this);
//                       },
//                       items: {
//                           "addNewRow": {name: "Satır ekle", icon: "edit"},
//                           "addNewColumn": {name: "Sütun ekle", icon: "edit"},
//                           "copySelectedColumn": {name: "Sütunu kopyala", icon: "edit"},
//                           "cutSelectedColumn": {name: "Sütunu kes", icon: "cut"},
//                           "pasteSelectedColumn": {name: "Sütunu yapıştır", icon: "paste"},
//                           "deleteSelectedColumn": {name: "Sütunu sil", icon: "delete"},
//                       }
//                   });
//
//
//               });
                                                                
                
                activateDraggableEvent();                
                
                                
                                
                $(document).on('click' , '#uplader' , function(){
                            $('section.present').children().appendTo($('#myEditableDiv'))
                });      
                                                                                
    
                /******************************************************************************
                *********************************** CLICK *************************************
                ******************************************************************************/
                // Bu section amacı tıklanılan element'e div eklenerek istediğimiz hale getirmektir.
                $(document).on('click' , '.present' , function( event ) {                                        

                            if(event.target.nodeName=='IMG' && !formatChecker(event.target)){

                                addGenericContainer( event.target );

                            }else if(event.target.nodeName=='P' && !formatChecker(event.target)){

                                $(event.target).attr('contenteditable' , 'true');
                                addGenericContainerText( event.target );

                            }else if(event.target.nodeName=='H1' && !formatChecker(event.target)){                        

                                $(event.target).attr('contenteditable' , 'true');
                                addGenericContainerText( event.target );


                            }else{

                                console.log("Clicked element " + event.target.nodeName);                    
                                console.log(event.target);

                            }   


                });       
                
                
            
                $(document).on('click' , '.pageOverview_addPage' , function( event ){                                        


                            workedPageNum = $('section.present').attr('pagenum');
                            
                            // edit edilen sayfanin overview'i bulunuyor ise ilgili yere ekle
                            if($('.draggableIframeDIV[pagenum="' + workedPageNum + '"]').size()==1){
                                                                
                                $('.draggableIframeDIV[pagenum="' + workedPageNum + '"]').empty();
                                edittedPage = $('section.present')
                                edittedPage.removeClass('present').addClass('past');
                                edittedPage.appendTo($('.draggableIframeDIV[pagenum="' + workedPageNum + '"]'));
                                
                            }

                            
                            newPage = createMainSection();
                            $(newPage).appendTo($('#zbookPageContainer'));

                            newPageOverview = $(newPage).clone();
                            newPageOverview.removeClass('present').addClass('past');
                            
                            if($(this).attr('addtype') == 'next'){
                                createOverviewPageDiv(newPageOverview , $(this).before().get(0))                                                                                                
                            }else if( $(this).attr('addtype') == 'prev' ){                                                                
                                createOverviewPageDiv(newPageOverview , $(this).parent().get(0))                               
                            }

                            activateDraggableEvent();
                     
                });                                
                                         
                                         
                                         
                /******************************************************************************
                *********************************** DRAG-DROP *********************************
                ******************************************************************************/ 
                function activateDraggableEvent(){
                    $('.operationDiv , .draggableIframeDIV , .draggableMainDIV').draggable({                     
                                revert: function(event, ui) {                                                    

                                        // "http://devilmaycode.altervista.org/revert-a-jquery-draggable-object-back-to-its-original-container-on-out-event-of-d/" 
                                        // $(this).data("draggable")
                                        $(this).data('uiDraggable').originalPosition = {
                                            top : 0,
                                            left : 0
                                        };                            
                                        return true;
                                    },
                    });
                }
                                                 
                        
                
                $('#zbookPageContainer').droppable({                    
                            drop: function( event, ui ) {                                                                                                                     

                                if(ui.draggable.attr('id')==='addTextBox'){

                                    //$(this).get(0).appendChild(addTextBox());                            
                                    addTextBox(event);

                                }else if(ui.draggable.attr('id')==='addImageBox'){

                                    imageAddingLocation = 'front';
                                    $('#dialogAddImage').dialog('open');

                                }else if(ui.draggable.attr('id')==='addVideoBox'){

                                    $('#dialogAddVideo').dialog('open');

                                }else if(ui.draggable.attr('id')==='addFigureBox'){

                                    $('#dialogAddFigure').dialog('open');                                                        

                                }else if(ui.draggable.attr('id')==='addDrawBox'){

                                    $('#dialogAddCanvastoDraw').dialog('open');                             

                                }else if(ui.draggable.attr('pagetype')=='origin'){                                                                        
                                    
                                    workedPageNum = $('section.present').attr('pagenum');
                            
                                    // edit edilen sayfanin overview'i bulunuyor ise ilgili yere ekle
                                    if($('.draggableIframeDIV[pagenum="' + workedPageNum + '"]').size()==1){
                                        $('section.present').appendTo($('.draggableIframeDIV[pagenum="' + workedPageNum + '"]'));
                                        $('section.present').removeClass('present').addClass('past');
                                    }else{                                                                
                                        createOverviewPageDiv($('section.present').removeClass('present').addClass('past').get(0));                               
                                    }
                                    activateDraggableEvent();
                                    
                                                                                                            
                                    $(ui.draggable.children().get(0)).removeClass('past').addClass('present');                                    
                                    ui.draggable.children().appendTo($('#zbookPageContainer'));
                                                                        
                                    
                                }else if(ui.draggable.hasClass('draggableIframeDIV')){

                                    // iframe clone 'u alınır    
                                    iframeClone = ui.draggable.find('iframe').get(0);  
                                    loadIframeContentMode_1(iframeClone);

                                }

                            }
                });
                                                         
                
                
                
                
                /******************************************************************************
                ******************************* UTIL FUNCTIONS ********************************
                ******************************************************************************/               
                function createMainSection(){
                            var newSection = document.createElement('section');
                            newSection.className = 'present';                            
                            $(newSection).css({ 
                                'height' : '100%' , 
                                'width' : '100%',
                                'background' : '#EEE',
                                'overflow' : 'auto'                                
                            });                            
                            $(newSection).attr('pagenum' , new Date().getTime());                            

                            return newSection;
                }
               
                function createOverviewPageDiv(elementToPutIn , pageLocation){                                                        
                    
                            var newPageOverviewMain = document.createElement('div');
                            newPageOverviewMain.className = 'pageOverviewContainer'
                                                                                    
                            var newPageOverview_addPage = document.createElement('div');
                            newPageOverview_addPage.className = 'pageOverview_addPage';
                            $(newPageOverview_addPage).attr('addtype','prev');                                                        
                        
                            var newPageOverview = document.createElement('div');
                            newPageOverview.className = 'draggableIframeDIV pageOverview';                            
                            $(newPageOverview).attr('pagenum' , $(elementToPutIn).attr('pagenum'));
                            $(newPageOverview).attr('pagetype' , 'origin');
                            $(elementToPutIn).appendTo(newPageOverview); 
                            
                            $(newPageOverview_addPage).appendTo(newPageOverviewMain);                            
                            $(newPageOverview).appendTo(newPageOverviewMain);
                                                        
                            $(newPageOverviewMain).insertBefore(pageLocation);
                }      
               
               
                function addGenericContainer( elementToPutIn ) {                                                                        
                
                        // -- Element Create Operations -- 
                            var genDiv = document.createElement('div');
                            genDiv.contentEditable = 'false';
                            genDiv.className = 'genericContainer';
                            genDiv.tabIndex = "-1";                                        
                            genDiv.width = $(elementToPutIn).width();
                            genDiv.height = $(elementToPutIn).height();                                                              

                            var removeElem = document.createElement("a");
                            removeElem.href = "#";
                            removeElem.className = "deleteIcon ui-icon-closethick";
                            genDiv.appendChild(removeElem);                                        

                        // -- Generic div actions --
                            $(genDiv).on('click', function(event) {
                                selectText(event.target);                                          
                            });                    
                            $(genDiv).on('mouseover' , function(event){                                
                                console.log('genericDiv mouseover event');
                            });  
                            $(genDiv).on('mouseleave' , function(event){                                
                                console.log('genericDiv mouseleave event');
                            });   

                        //  -- Append Operations --
                            $(genDiv).insertAfter(elementToPutIn);                                                                                     
                            $(elementToPutIn).appendTo(genDiv);                                 

                            resizeAndDragHandler(genDiv, true);
                }
                
                
                function addGenericContainerText( elementToPutIn ) {
                        // -- Element Create Operations -- 
                            var genDiv = document.createElement('div');
                            genDiv.contentEditable = 'false';
                            genDiv.className = 'genericContainer';
                            genDiv.tabIndex = "-1";
                            genDiv.width = $(elementToPutIn).width();
                            genDiv.height = $(elementToPutIn).height();                                
                            $(genDiv).attr('isPlaceHolderNeed' , 'true');

                            var innerDiv = document.createElement('div');
                            innerDiv.classList.add("textBoxContainerInner");
                            //innerDiv.contentEditable = "true";
                            innerDiv.tabIndex = "-1";
                            innerDiv.style.outline = "0";                    
                            genDiv.appendChild(innerDiv);

                            var removeElem = document.createElement("a");
                            removeElem.href = "#";
                            removeElem.className = "deleteIcon ui-icon-closethick";
                            genDiv.appendChild(removeElem);

                            var handleElem = document.createElement("a");
                            handleElem.href = "#";
                            handleElem.className = "handleIcon ui-icon-handle";
                            genDiv.appendChild(handleElem);       

                            $(genDiv).insertAfter(elementToPutIn);                  
                            innerDiv.appendChild(elementToPutIn);


                            if (!handleElem) {                            
                                $(genDiv).draggable({
                                    opacity: 0.5,
                                    containment: $('#zbookPageContainer > section').get(0),
                                    stop: function() {
                                        console.log("resizeAndDragHandler --> new object ! .handle");                                    
                                    }
                                });
                            }
                            else {
                                $(genDiv).draggable({
                                    opacity: 0.5,
                                    handle: handleElem,
                                    containment: $('#zbookPageContainer > section').get(0),
                                    start: function(){

                                    },
                                    stop: function() {
                                        console.log("resizeAndDragHandler --> new object .handle");                                    
                                    }
                                });
                            }    

                            $(genDiv).resizable({                            
                                containment: $('#zbookPageContainer > section').get(0),
                                start: function(){                                                         

                                },
                                stop: function() {                              
                                    $(genDiv).css("position", "absolute");                                
                                }
                            });


                            $(genDiv).css({
                                'top': 0, 
                                'left': 0,                        
                                'width': outerW+'px', 
                                'height': outerH+'px', 
                                'position': 'relative',
        //                        'background-color': '#F00',
        //                        'z-index': '10',
                            });
                            $(elementToPutIn).css({                        
                                'top': '0px', 
                                'left': '0px',  
        //                        'position': 'relative',
                            });                     
                    
                }
                
                
                
                function addGenericContainerTextX( elementToPutIn ) {                
                        // -- Element Create Operations -- 
                            var genDiv = document.createElement('div');
                            genDiv.contentEditable = 'false';
                            genDiv.className = 'boxContainerX genericContainer';
                            genDiv.tabIndex = "-1";
                            genDiv.width = $(elementToPutIn).width();
                            genDiv.height = $(elementToPutIn).height();                                
                            $(genDiv).attr('isPlaceHolderNeed' , 'true');

                            topP = $(elementToPutIn).position().top;
                            leftP = $(elementToPutIn).position().left;
                            topOff = $(elementToPutIn).offset().top;
                            leftOff = $(elementToPutIn).offset().left;
                            outerH = $(elementToPutIn).outerHeight(true);
                            outerW = $(elementToPutIn).outerWidth(true);                    

                            var innerDiv = document.createElement('div');
                            innerDiv.classList.add("textBoxContainerInner");
                            //innerDiv.contentEditable = "true";
                            innerDiv.tabIndex = "-1";
                            innerDiv.style.outline = "0";                    
                            genDiv.appendChild(innerDiv);

                            var removeElem = document.createElement("a");
                            removeElem.href = "#";
                            removeElem.className = "deleteIcon ui-icon-closethick";
                            genDiv.appendChild(removeElem);

                            var handleElem = document.createElement("a");
                            handleElem.href = "#";
                            handleElem.className = "handleIcon ui-icon-handle";
                            genDiv.appendChild(handleElem);                     


                        // -- Placeholders --     
                            if(false){

                                var placeHolderDiv = document.createElement('div');
                                placeHolderDiv.className = 'placeHolder';
                                $(placeHolderDiv).css({
                                    'width': outerW, 
                                    'height': outerH,
                                    'position' : 'relative',
                                    'background-color' : '#0F0', 
                                });
                                $(placeHolderDiv).insertBefore(elementToPutIn);

                            }

                        // -- Generic div actions --           
                            $(genDiv).on('click', function(event) {
        //                        selectText(event.target);                                          
                            });        

                        //  -- Append Operations --                    
                            $(genDiv).insertAfter(elementToPutIn);                  
                            innerDiv.appendChild(elementToPutIn);                   

                        //  -- Location Operations --
                            // Location of element is (topOff,leftOff)
                            // Location of section is ()



                        //  -- Additional Changes --  
                            console.log($(elementToPutIn).offset())
                            console.log($(elementToPutIn).position())
                            console.log('Position values of genDiv are :: ');
                            console.log($(genDiv).offset())
                            console.log($(genDiv).position())
                            $(genDiv).css({
        //                        'top': topP+'px', 
        //                        'left': leftP+'px',                        
        //                        'width': outerW+'px', 
        //                        'height': outerH+'px', 
        //                        'position': 'relative',
        //                        'background-color': '#F00',
        //                        'z-index': '10',
                            });
                            $(elementToPutIn).css({                        
        //                        'top': '0px', 
        //                        'left': '0px',  
        //                        'position': 'relative',
                            });  


                            genericResizeAndDragHandler(genDiv, true , handleElem);

                }
                
                /*
                *  image'lerin kaybolan resize & draggable eventleri tekrar aktif eder
                */
                function genericResizeAndDragHandler(imgDiv, newCreated, handleElem) {
                            //image yeni upload edildi ise
                            if (newCreated) {                                               

                                if (!handleElem) {                            
                                    $(imgDiv).draggable({
                                        opacity: 0.5,
                                        containment: $('#zbookPageContainer > section').get(0),
                                        stop: function() {
                                            console.log("resizeAndDragHandler --> new object ! .handle");                                    
                                        }
                                    });
                                }
                                else {
                                    $(imgDiv).draggable({
                                        opacity: 0.5,
                                        handle: handleElem,
                                        containment: $('#zbookPageContainer > section').get(0),
                                        start: function(){

                                        },
                                        stop: function() {
                                            console.log("resizeAndDragHandler --> new object .handle");                                    
                                        }
                                    });
                                }            

                                $(imgDiv).resizable({                            
                                    containment: $('#zbookPageContainer > section').get(0),
                                    start: function(){

                                        // -placeHolder process- ( - IPTAL SUAN ICIN - )
                                        /* 
                                         * buradaki işlemin amacı, secilen element'e genericContainer verilmesi durumunda
                                         * ve element yani genericContaiber resize edilmesi durumunda, source element'in
                                         * kendi alanını kaybetmesini engellemek için aynı alana placeHolder adında başka
                                         * bir element'in konulmasıdır.
                                         * 
                                         * Bu işlem her resize edildiğinde tekrarlanmaması için resize element'in attribute
                                         * olan 'isPlaceHolderNeed' false durumuna çekilir.
                                         * 
                                         */         

                                        if($(this).attr('isPlaceHolderNeed')=='true'){   

                                            var placeHolderDiv = document.createElement('div');
                                            placeHolderDiv.className = 'placeHolder';
                                            $(placeHolderDiv).css({
                                                'width': outerW, 
                                                'height': outerH,
                                                'position' : 'relative',
                                                'background-color' : '#0F0', 
                                            });
                                            $(placeHolderDiv).insertBefore(this);     

                                            $(this).attr('isPlaceHolderNeed' , 'false');
                                        }
                                        // -**endof** placeHolder process-                                

                                    },
                                    stop: function() {                              
                                        $(imgDiv).css("position", "absolute");                                
                                    }
                                });

                            } else {                                              

                                console.log("resizeAndDragHandler --> existed object called");

                                //burada tüm image'lerin section parent'ları bulunur ve her biri tekrardan draggable hale getirilir
                                imgDiv = $(".boxContainer");
                                //image resize edildi ise
                                $($(".boxContainer > .ui-resizable-handle")).remove();
                                for (var n = 0; n < imgDiv.length; n++) {

                                    // her image'in kendi section'ları bulunur
                                    var imgSection = $(imgDiv[n]).parentsUntil("#sectionContainer")[0];

                                    //image resize event reload
                                    $(imgDiv[n]).resizable({
                                        containment: imgSection,
                                        stop: function() {
                                            $(imgDiv[n]).css("position", "inherit");
                                            pushToStack();
                                        }
                                    });

                                    //image drag event reload
                                    if ($(imgDiv[n]).find(".handleIcon").size() > 0) {//handle ikonu varsa
                                        $(imgDiv[n]).draggable({
                                            opacity: 0.5,
                                            handle: $(imgDiv[n]).find(".handleIcon")[0],
                                            containment: imgSection,
                                            stop: function() {
                                                console.log("resizeAndDragHandler --> existed object .handle")
                                                pushToStack();
                                            }
                                        });
                                    } else {
                                        $(imgDiv[n]).draggable({
                                            opacity: 0.5,
                                            containment: imgSection,
                                            stop: function() {
                                                console.log("resizeAndDragHandler --> existed object not .handle")
                                                pushToStack();
                                            }
                                        });
                                        $(imgDiv[n]).on("click", function(event) {
                                            selectText(event.target);
                                        });
                                    }
                                }
                            }
                }
                
                
                
                
                
                /******************************************************************************
                ****************************** CHECKER FUNCTIONS *****************************
                ******************************************************************************/
                
                /**
                 * @description This function will be used after one element selected for editting.
                 *              Before start editting , function will check selected OR clicked element
                 *              ready for action. 
                 *              
                 *              For example, if <img> selected then its parent have to include ".genericDiv"
                 *              class.If ".generic" class exist then nothing will be done for preperation because
                 *              selected <img> element already ready for action.
                 *              
                 * @returns {undefined}
                 */
                function formatChecker(selectedElement){                                                                                                                       
                    
                    // şimdilik sadece boxContainer bulunuyormu diye kontrol etmekte
                    return $(selectedElement).parents('.genericContainer').length > 0 ? true : false;
                    
                }
                                   
                                   
                                   
                                   
                                   
                                   
                                   
                /******************************************************************************
                *********************************** IFRAME ************************************
                ******************************************************************************/
                // ---
                // aşağıda comment alınmış alan document'in kendi iframe 'leri için geçerlidir. Edit edilebilir alana taşınması durumu için geçerli değildir.
                // ---
                 
                $('iframe').contents().find('html').on('mouseover', function(event) {                            
                        console.log(event.target);
                        console.log('iframe html hover');
                    });
                                        
                    
                $('iframe').load(function(){  
                                        
                    /**
                     * Iframe load edilme "zbookPageContainer" içerisinde ise loadIframeContentMode_1() kullanılır
                     */
                    
                    // if iframe loaded to '#zbookPageContainer' child then load script and css to iframe 
                    console.log($('#zbookPageContainer').find(this).length);
                    
                    if($('#zbookPageContainer').find(this).length){
                        //console.log($(this).contents().find('html').get(0))
                        loadIframeContentMode_1(this);
                    }
                    
        
                    $(this).contents().find('html').on('mouseover', function(event) {
                            
                        console.log(event.target);
                        console.log('iframe html hover');
                        
                    });                            
                    
                    /**
                     * Events 
                     */
                    $(this).contents().find('html').on('click', function(event) {                                                
                        
                        if(event.target.nodeName=='p' || event.target.nodeName=='P'){  
                            
                            $(event.target).attr('contenteditable' , 'true');
                            
                        }else if(event.target.nodeName=='IMG' || event.target.nodeName=='img'){
                            console.log(' iframe --> image clicked ');
                            
                            console.log(event.target);
                            console.log(event.target.src);                                                                                                                            
                            
                            addGenericDIV(event.target);
           
                        }else if(event.target.nodeName=='DIV' || event.target.nodeName=='div'){
                            console.log("div elemen t clicked");
                        }
                        
                    });
                    
                });  



                function loadIframeContentMode_1(iframeElement){                    
                    alert("start loading content <br>step-1 : clone iframe content <br>step-2 : set url's (image and libraries) <br>step-3 : load&&append libraries <br>step-4 : load&&append body to section ");                                        
                    
                    // STEP-1
                    iframeCloneHtml = loadIframeContent_cloning(iframeElement);
                    // STEP-2
                    iframeCloneHtml = loadIframeContent_setUrls(iframeCloneHtml);
                    

                    // STEP-3

                    // STEP-4
                    $(loadIframeContent_getBodyChildren(iframeCloneHtml)).appendTo('.present');                                        
                    
                }
                
                function loadIframeContent_cloning(iframeElement){
                    return $(iframeElement).contents().find('html').clone(true).get(0);
                }
                function loadIframeContent_setUrls(iframeHtmlElement){
                    
                    // css ve scriptlerin direk .opf üzerinden load edilebilirliği araştırılacak
                    console.log("Step-2 called && Input element is ...");
                    console.log(iframeHtmlElement);
                                        
                    localDirectory = 'http://localhost:8080/';
                    packageOpfDirectort = 'epubTemp/OPS/';  
                    baseDirectory = localDirectory + packageOpfDirectort;                       // bu veri jsp içerisinde java kullanılarak alınacaktır.
                    
                    cssDirectory = baseDirectory + 'css/recollections-of-wartime.css';          // bu veri ise yine java kullanılarak packaage.opf içerisinden alınıp document e implement edilecektir. (load esnasında)                                                            
                    
                    return iframeHtmlElement;
                }
                function loadIframeContent_getBodyChildren(iframeCloneHtmlElement){                    
                    return $(iframeCloneHtmlElement).find('body').children();                    
                }  
                
                
                
                
                
                /******************************************************************************
                *********************************** FOCUS *************************************
                ******************************************************************************/
                function checkFocus() {
                    console.log("Active element is ...");
                    console.log(document.activeElement);
                    if(document.activeElement.tagName == 'IFRAME' || document.activeElement.tagName == 'iframe') {                        
                        console.log('iframe has focus');                        
                    } else {
                        console.log('iframe not focused');
                    }
                }
//                window.setInterval(checkFocus, 1000); 