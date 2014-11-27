

               function Stack(content, slidePosition) {
                   this.content = content;
                   this.slidePosition = slidePosition;
               }

               function undo(event) {

                    console.log("Undo action called");

                   if (stackPosition === 0 && stack.length > 1) {
                       alert("Geri alınamaz");
                   }
                   if (stackPosition === stack.length - 1 && stack[stackPosition]['content'][0].innerHTML !== $("#sectionContainer").html()) {
                       pushToStack();
                   }
                   if (stack.length !== 1 || stackPosition !== 0) {/*not initial state*/
                       if (stackPosition > 0 && stackPosition < stack.length) {
                           stackPosition--;
                           $('#sectionContainer').replaceWith($(stack[stackPosition]['content'][0]).clone()[0]);
                           Reveal.slide(stack[stackPosition]['slidePosition'][0], 0, 0);
                           resizeAndDragHandler($(".boxContainer"), false);
                       }
                   }

                   event.preventDefault();
               }

               function redo(event) {
                   
                   console.log("Redo action called");

                   if (stackPosition === stack.length - 1) {
                       alert("İleri alınamaz");
                   }
                   if (stackPosition > -1 && stackPosition < stack.length - 1) {
                       stackPosition++;
                       $('#sectionContainer').replaceWith($(stack[stackPosition]['content'][0]).clone()[0]);
                       Reveal.slide(stack[stackPosition]['slidePosition'][0], 0, 0);
                       resizeAndDragHandler($(".boxContainer"), false);
                   }
                   event.preventDefault();

               }

               /*
                * push yapılırken push edilecek DOM element'i clone edilmesi gerekir 
                * aksi halde stack'e atılan tüm element'ler aynı adresi gösterirler. 
                */
               function pushToStack(selection) {                                      
                   
                   switch (selection) {

                       case 'reset':
                           stack = new Array();
                           stack.push(new Stack($("#sectionContainer").clone(), $('.present').attr("id")));
                           stackPosition = 0;
                           break;

                       default:
                           
                           console.log("pushToStack --> default case");                           
                           
                           if (stackPosition === stack.length - 1) {
                               if (stack.length === stackSize) {
                                   stack.splice(0, 1);
                                   stackPosition--;
                               }

                               var stackObj = new Stack($("#sectionContainer").clone(), $('.present').attr("id"));
                               stack.push(stackObj);
                               stackPosition++;                                                              

                           } else {//if stackPosition is not at the end
                               while (stackPosition < stack.length - 1) {
                                   stack.pop();
                               }
                               stackPosition = stack.length - 1;
                           }
                           break;
                   }
               }

               /*
                *  image'lerin kaybolan resize & draggable eventleri tekrar aktif eder
                */
               function resizeAndDragHandler(imgDiv, newCreated, handleElem) {
                    
                   //image yeni upload edildi ise
                   if (newCreated) {
                       
                       console.log("resizeAndDragHandler --> new object called");
                       
                       if (!handleElem) {
                           $(imgDiv).draggable({
                               opacity: 0.5,
                               containment: $(".present").get(0),
                               stop: function() {
                                   console.log("resizeAndDragHandler --> new object ! .handle");
                                   pushToStack();
                               }
                           });
                       }
                       else {
                           $(imgDiv).draggable({
                               opacity: 0.5,
                               handle: handleElem,
                               containment: $(".present").get(0),
                               stop: function() {
                                   console.log("resizeAndDragHandler --> new object .handle");
                                   pushToStack();
                               }
                           });
                       }            
                       
                       $(imgDiv).resizable({
                           containment: $(".present").get(0),
                           start: function(){
                               console.log("resizeAndDragHandler --> Resize start event called");
                           },
                           stop: function() {                              
                               $(imgDiv).css("position", "absolute");
                               pushToStack();
                           }
                       });
                       
                       pushToStack();
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