               
               
               /*
                * Gets the parent element of the selection
                */
               function getSelectedElement() {
                   if (window.getSelection) {
                       var selection = window.getSelection();
                       if (selection.rangeCount > 0) {
                           if (selection.getRangeAt) {
                               return selection.getRangeAt(0).startContainer.parentNode;
                           }
                       }
                   }
               }

               /*
                * Saves the current selection for a future restore
                */
               function saveSelection() {
                   if (window.getSelection) {
                       sel = window.getSelection();
                       if (sel.getRangeAt && sel.rangeCount) {
                           return sel.getRangeAt(0);
                       }
                   } else if (document.selection && document.selection.createRange) {
                       return document.selection.createRange();
                   }
                   return null;
               }

               /*
                * Restores the saved selection
                */
               function restoreSelection(range) {
                   if (range) {
                       if (window.getSelection) {
                           sel = window.getSelection();
                           sel.removeAllRanges();
                           sel.addRange(range);
                       } else if (document.selection && range.select) {
                           range.select();
                       }
                   }
               }

               /*
                * Selects the text content inside given element
                */
               function selectText(element) {

                   if (document.body.createTextRange) {
                       var range = document.body.createTextRange();
                       range.moveToElementText(element);
                       range.select();
                   } else if (window.getSelection) {
                       var selection = window.getSelection();
                       var range = document.createRange();
                       range.selectNode(element);
                       selection.removeAllRanges();
                       selection.addRange(range);
                   }
               }

               /*
                * Function that get startOffset of selected text
                */
               function getStartOffSet() {
                   var selObj = window.getSelection();
                   var selRange = selObj.getRangeAt(0);
                   return selRange['startOffset'];
               }

               /*
                * Function that get startOffset of selected text
                */
               function getEndOffSet() {
                   var selObj = window.getSelection();
                   var selRange = selObj.getRangeAt(0);
                   return selRange['endOffset'];
               }

               /*
                * this function return range of selected elements
                * Example : AAABBBCCC is an innerHTML of element and BBB is choosen
                *  if we want to select AAA then  getRangeOfSelection("before")    || getRangeOfSelection(1)
                *  if we want to select BBB then  getRangeOfSelection("itself")    || getRangeOfSelection(2)
                *  if we want to select CCC then  getRangeOfSelection("after")     || getRangeOfSelection(3)
                *  if we want to select AAABBBCCC then  getRangeOfSelection("all") || getRangeOfSelection(4)
                *  if we want to select ABBBC then  getRangeOfSelection("all")     || getRangeOfSelection(0 , 2 , 7)
                *  
                *  EXAMPLE : 
                *      - firstRange  ... getRangeOfSelection(0 , 0 , startOffset);
                *      - middleRange ... getRangeOfSelection(0 , startOffset , endOffset);
                *      - lastRange   ... getRangeOfSelection(0 , endOffset );
                *      - allRanges   ... getRangeOfSelection(0 , 0 );
                *     
                *  IMPORTANT : ( SİLİNMESİ DURUMUNDA ÖNEMLİ )
                *      -   document.execCommand('formatBlock', false, 'blockquote,div, ... gibi
                *          bazı tag'ların yeni oluşturulması durumlarında yukarıdaki örnekte
                *          AAABBBCCC'nin tamamını almaktadır. Sadece seçili range alınamadığı 
                *          için bu fonksiyon yazılmıştır. 
                */
               function getRangeOfSelection(selectedRange, startOffSet, endOffSet) {
                   var selObj = window.getSelection();
                   var selRange = selObj.getRangeAt(0);
                   var beforeRange, afterRange, rangeItself, allRanges, speRange;
                   if (document.createRange) {     // all browsers, except IE before version 9
                       var textNode = window.getSelection().getRangeAt(0).startContainer;
                       beforeRange = document.createRange();
                       afterRange = document.createRange();
                       rangeItself = document.createRange();
                       allRanges = document.createRange();
                       speRange = document.createRange();

                       if (textNode.length > 1) {
                           if (selectedRange === "before" || selectedRange == 1) {
                               beforeRange.setStart(textNode, 0);
                               beforeRange.setEnd(textNode, selRange['startOffset']);
                               selObj.removeAllRanges();
                               selObj.addRange(beforeRange);
                               return selObj;
                           } else if (selectedRange === "itself" || selectedRange == 2) {
                               rangeItself.setStart(textNode, selRange['startOffset']);
                               rangeItself.setEnd(textNode, selRange['endOffset']);
                               selObj.removeAllRanges();
                               selObj.addRange(rangeItself);
                               return selObj;
                           } else if (selectedRange === "after" || selectedRange == 3) {
                               afterRange.setStart(textNode, selRange['endOffset']);
                               afterRange.setEnd(textNode, textNode.length);
                               selObj.removeAllRanges();
                               selObj.addRange(afterRange);
                               return selObj;
                           } else if (selectedRange === "all" || selectedRange == 4) {
                               selObj.removeAllRanges();
                               allRanges.setStart(textNode, 0);
                               allRanges.setEnd(textNode, textNode.length);
                               selObj.addRange(allRanges);
                               return selObj;
                           } else if (selectedRange == 0) {
                               selObj.removeAllRanges();
                               speRange.setStart(textNode, startOffSet);
                               if (endOffSet) {
                                   speRange.setEnd(textNode, endOffSet);
                               } else {
                                   speRange.setEnd(textNode, textNode.length);
                               }

                               selObj.addRange(speRange);
                               return selObj;
                           }
                           else if (selectedRange === "caretToLast") {
                               selObj.removeAllRanges();
                               speRange.setStart(textNode, endOffSet);
                               speRange.setEnd(textNode, endOffSet);
                               selObj.addRange(speRange);
                               return selObj;
                           }
                           else if (selectedRange === "caretToFirst") {
                               selObj.removeAllRanges();
                               speRange.setStart(textNode, startOffSet);
                               speRange.setEnd(textNode, startOffSet);
                               selObj.addRange(speRange);
                               return selObj;
                           }
                       } else {
                           if (selectedRange === "caretToLast") {
                               selObj.removeAllRanges();
                               speRange.setStart(textNode, endOffSet);
                               speRange.setEnd(textNode, endOffSet);
                               selObj.addRange(speRange);
                               return selObj;
                           } else if (selectedRange === "caretToFirst") {
                               selObj.removeAllRanges();
                               speRange.setStart(textNode, startOffSet);
                               speRange.setEnd(textNode, startOffSet);
                               selObj.addRange(speRange);
                               return selObj;
                           }
                       }
                   }

                   return selObj;
               }