
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="tr" xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta charset="utf-8">
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
            <meta http-equiv="content-type" content="text/html; charset=windows-1254"/>
            <meta http-equiv="content-type" content="text/html; charset=iso-8859-9" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
            
            <title>EBA Sunum</title>
            
            <!-- Burada iframe'in css'leri import edilir. Import edilme işlemi -->
            <style>                
                
                @import url('http://localhost:8080/epubTemp/OPS/css/recollections-of-wartime.css');
                @import url('http://localhost:8080/epubTemp/OPS/fonts/URWClassico-Bol.woff');
                @import url('http://localhost:8080/epubTemp/OPS/fonts/URWClassico-BolIta.woff');
                @import url('http://localhost:8080/epubTemp/OPS/fonts/URWClassico-Ita.woff');
                @import url('http://localhost:8080/epubTemp/OPS/fonts/URWClassico-Reg.woff');
                @import url('http://localhost:8080/epubTemp/OPS/fonts/URWPalladioL-Bold.woff');
                @import url('http://localhost:8080/epubTemp/OPS/fonts/URWPalladioL-BoldItal.woff');
                @import url('http://localhost:8080/epubTemp/OPS/fonts/URWPalladioL-Ital.woff');
                @import url('http://localhost:8080/epubTemp/OPS/fonts/URWPalladioL-Roma.woff');                
                
            </style>
            
            <link href="css/eba-sunum-theme/images/favicon.ico" rel="shortcut icon" type="image/x-icon" />            
            <link rel="stylesheet" href="css/theme/default.css" id="theme"/>
            <link rel="stylesheet" type="text/css" href="css/style.css"/>
            <link href="css/eba-sunum-theme/jquery-ui-1.10.3.custom.css" rel="stylesheet"/>
            <link href="spectrum/spectrum.css" rel="stylesheet"/>
            <link href="css/eba-sunum.css" rel="stylesheet"/>
            <link href="js/contextMenu/jquery.contextMenu.css" type="text/css" rel="stylesheet"/>
            <link rel="stylesheet" href="css/paper.css" type="text/css">
            <link rel="stylesheet" href="css/test.css" type="text/css">
            <noscript><style>div{display:none;} .esNoJS {display:block;}</style></noscript>
            <!--[if lt IE 9]><script src="lib/js/html5shiv.js"></script><![endif]-->
            
            <!--<link rel="stylesheet" href="css/reveal.css"/>-->
            
        <style>            
            .edittablePage{
                position:fixed;
                top: 25%;                    
                left: 25%;
                width:800px;
                height:600px;
                margin-top: -9em; /*set to a negative number 1/2 of your height*/
                margin-left: -15em; /*set to a negative number 1/2 of your width*/
                border: 1px solid #ccc;
                background-color: #f3f3f3;
            }

            .operationDiv{
                height: 100px;
                width: 100px;
                background: #1c94c4;
                margin: 5px;
            }

            .operationArea{ 
                top: 10%;
                left: 10%;
                width:800px;
                height:600px;                                 
                background-color: #f3f3f3;                
            }
                        
        </style>             
                        
    </head>

    <body>
        <!-- custom alert box -->
        <div hidden id="alertDialog" title="UyarÄ±"></div>
        <div id="preLoader" class="esLoader" style="height: 100%; width: 100%;"></div>
        
        
        <div class="esNoJS">
            LÃ¼tfen tarayÄ±cÄ±nÄ±zÄ±n Javascript ayarlarÄ±nÄ± aktif hale getiriniz
        </div>


        <div id="topPanel">
            <!--Blue Top Bar-->
            <div class="esTopBar">
                <div class="esTopBarContent">
                    <div class="esReturnMain">
                        <a href="https://dosya.eba.gov.tr" class="edLogoBack" title="EBA Dosya'ya DÃ¶n"><i></i></a>
                    </div>
                    <div class="esMenubar">
                        <ul class="esMenuBarList">
                            <li><a href="#" id="buttonMenubarMainMenu" title="MenÃ¼"><i></i></a></li>
                            <li><button id="buttonPreview">Ãnizle</button></li>
                            <li><button id="buttonPlayPresentation">Sunumu Oynat</button></li>
                        </ul>
                    </div>
                    <div class="esLogin">
                        <span id="dispUserName"><%=request.getSession().getAttribute("username")%></span>
                        <a>Oturumu Kapat</a>
                    </div>
                </div>
            </div>

            <!--Buttons Bar-->
            <div class="esButtonsBar">
                <div class="esHeader">
                    <form id="formButtons">
                        <div class="esCenterTools">                                                        

                            <button id="buttonSave">Kaydet</button>                     
                            <button id="buttonPrint">YazdÄ±r</button>                        
                            <button id="buttonDeleteSlide">SlaytÄ± Sil</button>                        
                            <button id="buttonUndo">Geri Al</button>                        
                            <button id="buttonRedo">Ä°leri Al</button>                        

                            <div class="esDivider"></div>

                            <div style="width:60px;" class="selectDivContainer">
                                <select id="selectFontSize">
                                    <option value="-1">Boyut</option>
                                    <option value="2">16px</option>
                                    <option value="3">24px</option>
                                    <option value="4">32px</option>
                                    <option value="5">48px</option>
                                    <option value="6">64px</option>
                                    <option value="7">96px</option>
                                </select>
                            </div>
                            <div style="width:130px;" class="selectDivContainer">
                                <select id="selectHeading" >
                                    <option value="h0">Normal</option>
                                    <option value="gray-shadow">Gri GÃ¶lgeli</option>
                                    <option value="white-3d">Beyaz 3D</option>
                                    <option value="blue-tones-upper">Mavi Tonlar</option>
                                    <option value="black-underlined">Siyah Alt Ãizgili</option>
                                    <option value="red-bg-glow">Parlayan KÄ±rmÄ±zÄ±</option>
                                    <option value="green-bg-soft">Hafif YeÅil</option>
                                </select>
                            </div>

                            <div class="esDivider"></div>

                            <div id="divFormat" class="esButtonBarDiv ui-buttonset">
                                <a id="bold" class="ui-button ui-widget ui-state-default ui-button-icon-only ui-corner-left" role="button" title="B"><span class="ui-button-icon-primary ui-icon ebaui-icon-fontbold"></span></a>
                                <a id="italic" class="ui-button ui-widget ui-state-default ui-button-icon-only" role="button" title="I"><span class="ui-button-icon-primary ui-icon ebaui-icon-fontitalic"></span></a>
                                <a id="underline" class="ui-button ui-widget ui-state-default ui-button-icon-only ui-corner-right" role="button" title="U"><span class="ui-button-icon-primary ui-icon ebaui-icon-fontunderlined"></span></a>                        
                            </div>

                            <button id="buttonFontColor">YazÄ± Rengi</button>
                            <button id="buttonBackgroundColor">Arkaplan Rengi</button>

                            <div class="esDivider"></div>

                            <div id="divAlignment" class="esButtonBarDiv ui-buttonset">
                                <a id="left" class="ui-button ui-widget ui-state-default ui-button-icon-only ui-corner-left ui-state-active" role="button" title="Sola Hizala"><span class="ui-button-icon-primary ui-icon ebaui-icon-alignleft"></span></a>
                                <a id="center" class="ui-button ui-widget ui-state-default ui-button-icon-only" role="button" title="Ortala"><span class="ui-button-icon-primary ui-icon ebaui-icon-aligncenter"></span></a>
                                <a id="right" class="ui-button ui-widget ui-state-default ui-button-icon-only ui-corner-right" role="button" title="SaÄa Hizala"><span class="ui-button-icon-primary ui-icon ebaui-icon-alignright"></span></a>
                            </div>

                            <div class="esDivider"></div>

                            <div id="divListing" class="esButtonBarDiv">
                                <a id="ordered" class="ui-button ui-widget ui-state-default ui-button-icon-only" role="button" title="SÄ±ralÄ± Liste"><span class="ui-button-icon-primary ui-icon ebaui-icon-listordered"></span></a>
                                <a id="unordered" class="ui-button ui-widget ui-state-default ui-button-icon-only" role="button" title="Madde Ä°Åaretli Liste"><span class="ui-button-icon-primary ui-icon ebaui-icon-listunordered"></span></a>
                            </div>
                            <button id="buttonAddImage">Resim Ekle</button>
                            <button id="buttonLink">BaÄlantÄ± Ekle/KaldÄ±r</button>




                            <!--Dialogs-->
                            <div id="dialogPresentationSettings" title="Sunum AyarlarÄ±">
                                <span class="popupTitle">Sunum AyarlarÄ±</span>
                                <div id="settingsLeft">
                                    <span class="popupSubtitle">YazÄ± Tipi</span>
                                    <div class="selectDivContainer">
                                        <select id="selectFontFamilySettings">
                                           
                                        </select>
                                    </div>
                                    <span class="popupSubtitle">Slayt GeÃ§iÅ Efekti</span>    
                                    <div class="selectDivContainer">
                                        <select id="selectTransitionSettings">
                                            <option value='default'>Standart</option>
                                            <option value='none'>Efekt Yok</option>
                                            <option value='linear'>DoÄrusal</option>
                                            <option value='concave'>Ä°Ã§bÃ¼key</option>
                                            <option value='cube'>KÃ¼bik</option>
                                            <option value='page'>Sayfa</option>
                                            <option value='fade'>Soldurma</option>
                                            <option value='zoom'>YakÄ±nlaÅtÄ±rma</option>
                                        </select>
                                    </div>    
                                    <span class="popupSubtitle">Otomatik Slayt GeÃ§iÅi</span> 
                                    <div class="selectDivContainer">
                                        <select id="selectAutoSlideSettings">
                                            <option value='0'>Yok</option>
                                            <option value='1000'>1 Saniye</option>
                                            <option value='2000'>2 Saniye</option>
                                            <option value='5000'>5 Saniye</option>
                                            <option value='10000'>10 Saniye</option>
                                            <option value='30000'>30 Saniye</option>
                                        </select>
                                    </div>
                                </div>
                                <div id="settingsRight">  
                                    <span class="popupSubtitle">Arkaplan GeÃ§iÅ Efekti</span>
                                    <div class="selectDivContainer">
                                        <select id="selectBGTransitionSettings">
                                            <option value='default'>Standart</option>
                                            <option value='none'>Efekt Yok</option>
                                            <option value='linear'>DoÄrusal</option>
                                            <option value='concave'>Ä°Ã§bÃ¼key</option>
                                            <option value='cube'>KÃ¼bik</option>
                                            <option value='page'>Sayfa</option>
                                            <option value='fade'>Soldurma</option>
                                            <option value='zoom'>YakÄ±nlaÅtÄ±rma</option>
                                        </select>
                                    </div>
                                    <span class="popupSubtitle">Sonsuz DÃ¶ngÃ¼</span>
                                    <div class="selectDivContainer">
                                        <select id="selectLoopSettings">
                                            <option value='false'>Yok</option>
                                            <option value='true'>Var</option>
                                        </select>
                                    </div>
                                </div>
                                <div style="clear:both;"></div>
                            </div>
                            
                            <div id="dialogAddImage" title="Resim Ekle">
                                <div id="tabsImage">
                                    <ul>
                                        <li id="liFromComputer"><a href="#fromComputer">BilgisayarÄ±m</a></li>
                                        <li id="liFromEbaDosya"><a href="#fromEbaDosya">EBA Dosya Resimlerim</a></li>
                                    </ul>
                                    <div id="fromComputer">
                                        <input type="file" id="buttonImageUpload" accept=".png, .jpg, .jpeg, .gif"/>   
                                        <div class="thumbnailContainer"></div> 
                                    </div>
                                    <div id="fromEbaDosya">
                                        <div class="thumbnailContainer"></div>  
                                        <div class="esLoader" style="height: 120px; width: 642px;"></div>
                                    </div>
                                </div>
                            </div>
                            
                            <div id="dialogAddFigure" title="Åekil Ekle">
                                <div id="tabsFigures">
                                    <ul>
                                        <li id="liFigures"><a href="#divShapes">Åekiller</a></li>
                                        <li id="liArrows"><a href="#divArrows">Oklar</a></li>
                                    </ul>
                                    <div id="divShapes">
                                        <div class="thumbnailContainer">
                                            <%for(int i=1; i<13; i++){%>
                                                <div class="img-thumb img-image"> 
                                                    <img src="images/shape<%=i%>.png" />
                                                </div>
                                            <%}%>
                                        </div>
                                    </div>
                                    <div id="divArrows">
                                        <div class="thumbnailContainer">
                                            <%for(int i=1; i<5; i++){%>
                                                <div class="img-thumb img-image"> 
                                                    <img src="images/arrow<%=i%>.png" />
                                                </div>
                                            <%}%>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div id="dialogOpenPresentation" title="Sunum AÃ§">
                                <div>LÃ¼tfen yÃ¼klemek istediÄiniz sunumu seÃ§iniz</div>
                                <br/>
                                <div id="selectPresentationContainer"></div>
                            </div>
                            
                            <div id="dialogTableProperties" title="Tablo Ãzellikleri" style="display: none;">
                                <div>Tablo satÄ±r ve sÃ¼tun sayÄ±sÄ±nÄ± giriniz</div>
                                <input type="text" id="dialogTablePropertiesROW" name="tableRow"/>
                                <input type="text" id="dialogTablePropertiesCOLUMN" name="tableColumn"/>
                            </div>
                                
                            <div id="dialogShortcuts" title="KÄ±sayollar">
                                <span class="dialogCustomTitle">BazÄ± KullanÄ±ÅlÄ± Klavye KÄ±sayollarÄ±</span>
                                <table class="helpShortcutTable">
                                    <tr>
                                        <td><span class="helpTopic helpWin">CTRL+C</span><span class="helpTopic helpMac">â+C</span><br/><span class="helpDesc">Kopyala</span></td>
                                        <td><span class="helpTopic helpWin">CTRL+X</span><span class="helpTopic helpMac">â+X</span><br/><span class="helpDesc">Kes</span></td>
                                        <td><span class="helpTopic helpWin">CTRL+V</span><span class="helpTopic helpMac">â+V</span><br/><span class="helpDesc">YapÄ±ÅtÄ±r</span></td>
                                        <td><span class="helpTopic helpWin">CTRL+Z</span><span class="helpTopic helpMac">â+Z</span><br/><span class="helpDesc">Geri Al</span></td>
                                        <td><span class="helpTopic helpWin">CTRL+Y</span><span class="helpTopic helpMac">â+SHIFT+Z</span><br/><span class="helpDesc">Yinele</span></td>
                                        <td><span class="helpTopic helpWin">CTRL+P</span><span class="helpTopic helpMac">â+P</span><br/><span class="helpDesc">YazdÄ±r</span></td>
                                    </tr>
                                    <tr>
                                        <td><span class="helpTopic helpWin">CTRL+S</span><span class="helpTopic helpMac">â+S</span><br/><span class="helpDesc">Kaydet</span></td>
                                        <td><span class="helpTopic">O</span><br/><span class="helpDesc">Ãnizleme</span></td>
                                        <td><span class="helpTopic">F</span><br/><span class="helpDesc">Sunumu Oynat</span></td>
                                        <td><span class="helpTopic">B</span><br/><span class="helpDesc">EkranÄ± Karart</span></td>
                                        <td><span class="helpTopic">ESC</span><br/><span class="helpDesc">Ãnizleme<br/>&<br/>Sunumdan ÃÄ±kÄ±Å</span></td>
                                        <td><span class="helpTopic">â</span><br/><span class="helpDesc">Bir Sonraki Slayt</span><br/><span class="helpTopic">â</span><br/><span class="helpDesc">Bir Ãnceki Slayt</span></td>
                                    </tr>
                                </table>
                            </div>
                                        
                            <div id="dialogCutCopyPasteShortcuts" title="Modifikasyon KÄ±sayollarÄ±">
                                <span class="dialogCustomTitle">LÃ¼tfen iÅlemleriniz iÃ§in aÅaÄÄ±daki klavye kÄ±sayollarÄ±nÄ± kullanÄ±nÄ±z</span>
                                <table class="helpShortcutTable" style="margin-top:40px;">
                                    <tr>
                                        <td><span class="helpTopic helpWin">CTRL+C</span><span class="helpTopic helpMac">â+C</span><br/><span class="helpDesc">Kopyala</span></td>
                                        <td><span class="helpTopic helpWin">CTRL+X</span><span class="helpTopic helpMac">â+X</span><br/><span class="helpDesc">Kes</span></td>
                                        <td><span class="helpTopic helpWin">CTRL+V</span><span class="helpTopic helpMac">â+V</span><br/><span class="helpDesc">YapÄ±ÅtÄ±r</span></td>
                                    </tr>
                                </table>
                            </div>
                            
                            <div id="dialogFontColor" title="YazÄ± Rengi" class="esColorPicker">
                                <iframe id="iframeFontColor" src="colorpicker_font.html" frameborder="0" style="height:205px;"></iframe>
                            </div>
                            
                            <div id="dialogBackgroundColor" title="Arkaplan Rengi" class="esColorPicker">
                                <iframe id="iframeFontColor" src="colorpicker_bg.html" frameborder="0" style="height: 250px;"></iframe>
                            </div>                                                                     
                                        
                            <div id="dialogAddCanvasToDraw" title="Serbest Çizim">
                                <div id="addCanvasHeaderDiv">
                                    <span>Yazı Boyutu</span>
                                    <div style="width:60px;" class="selectDivContainer">
                                        <select id="selectBrushSize">
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                        </select>
                                    </div>
                                    <span>Yazı Rengi</span>
                                    <div style="width:60px;" class="selectDivContainer">
                                        <select id="selectBrushColor">
                                            <option value="BLACK">Siyah</option>
                                            <option value="RED">Kırmızı</option>
                                            <option value="BLUE">Mavi</option>
                                            <option value="YELLOW">Sarı±</option>
                                            <option value="GREEN">Yeşil</option>
                                            <option value="PINK">Pembe</option>
                                            <option value="GRAY">Gri</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div id="canvasArea"></div>                               
                            </div>                                        
                                        
                            <div id="dialogHyperlink" title="BaÄlantÄ± Ekle/KaldÄ±r">
                                <div class="esFormContainer">
                                    <div class="esInputLabel">Metin</div>
                                    <input type="text" id="hyperlinkTextLabel"/>
                                    <br/><br/><br/>
                                    <div class="esInputLabel">BaÄlantÄ± Adresi</div>
                                    <input type="text" id="hyperlinkTextInput"/>
                                </div>
                            </div>
                                        
                            <div id="dialogAddVideo" title="Video Ekle">
                                <span class="dialogCustomTitle">YouTube ya da EBA Video'su Ekleyebilirsiniz</span>
                                <div class="esFormContainer">
                                    <div class="esInputLabel">Video URL</div>
                                    <input type="text" id="addVideoInput"/>
                                </div>
                            </div>
                                        
                            <div id="dialogAddMaps" title="Harita Ekle">
                                <input id="pac-input" class="controls" type="text" placeholder="Ara...">
                                <div id="map-canvas"></div>
                            </div>
                            



                            <!--Menus-->
                            <ul id="ulMainMenu">
                                <li>
                                    <a href="#">Dosya</a>
                                    <ul>
                                        <li class="ui-sub-menu-item">
                                            <a href="#" id="menuNewPresentation">
                                                <span class="ui-icon ebaui-icon-newitem sub-menu-icon new-icon"></span>
                                                <span class="ui-menu-item-text">Yeni Sunum</span>
                                                <span class="sub-menu-sc helpWin"></span><span class="sub-menu-sc helpMac"</span>
                                            </a>
                                        </li>
                                        <li class="ui-sub-menu-item">
                                            <a href="#" id="menuOpen">
                                                <span class="ui-icon ebaui-icon-save sub-menu-icon new-icon"></span>
                                                <span class="ui-menu-item-text">Sunum AÃ§...</span>
                                                <span class="sub-menu-sc helpWin"></span><span class="sub-menu-sc helpMac"</span>
                                            </a>
                                        </li>
                                        <li>-</li>
                                        <li class="ui-sub-menu-item">
                                            <a href="#" id="menuSave">
                                                <span class="ui-icon ui-icon-disk sub-menu-icon new-icon"></span>
                                                <span class="ui-menu-item-text">Kaydet</span>
                                                <span class="sub-menu-sc helpWin">CTRL+S</span><span class="sub-menu-sc helpMac">â+S</span>
                                            </a>
                                        </li>
                                        <li class="ui-sub-menu-item">
                                            <a href="#" id="menuPdf">
                                                <span class="sub-menu-icon"></span>
                                                <span class="ui-menu-item-text">Pdf OluÅtur</span>
                                                <span class="sub-menu-sc helpWin"></span><span class="sub-menu-sc helpMac"</span>
                                            </a>
                                        </li>
                                        <li class="ui-sub-menu-item">
                                            <a href="#" id="menuPrint">
                                                <span class="ui-icon ebaui-icon-print sub-menu-icon new-icon"></span>
                                                <span class="ui-menu-item-text">YazdÄ±r</span>
                                                <span class="sub-menu-sc helpWin">CTRL+P</span><span class="sub-menu-sc helpMac">â+P</span>
                                            </a>
                                        </li>
                                        <li>-</li>
                                        <li class="ui-sub-menu-item">
                                            <a href="#" id="menuSettings">
                                                <span class="ui-icon ebaui-icon-settings sub-menu-icon new-icon"></span>
                                                <span class="ui-menu-item-text">Sunum AyarlarÄ±</span>
                                                <span class="sub-menu-sc helpWin"></span><span class="sub-menu-sc helpMac"></span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                
                                <li id="ulEditMenu" >
                                    <a href="#">DÃ¼zenle</a>
                                    <ul>
                                        <li class="ui-sub-menu-item">
                                            <a href="#" id="menuUndo">
                                                <span class="ui-icon ebaui-icon-undo sub-menu-icon new-icon"></span>
                                                <span class="ui-menu-item-text">Geri Al</span>
                                                <span class="sub-menu-sc helpWin">CTRL+Z</span><span class="sub-menu-sc helpMac">â+Z</span>
                                            </a>
                                        </li>
                                        <li class="ui-sub-menu-item">
                                            <a href="#" id="menuRedo">
                                                <span class="ui-icon ebaui-icon-redo sub-menu-icon new-icon"></span>
                                                <span class="ui-menu-item-text">Yinele</span>
                                                <span class="sub-menu-sc helpWin">CTRL+Y</span><span class="sub-menu-sc helpMac">â+SHIFT+Z</span>
                                            </a>
                                        </li>
                                        <li>-</li>
                                        <li class="ui-sub-menu-item">
                                            <a href="#" id="menuCut">
                                                <span class="ui-icon ebaui-icon-cut sub-menu-icon new-icon"></span>
                                                <span class="ui-menu-item-text">Kes</span>
                                                <span class="sub-menu-sc helpWin">CTRL+X</span><span class="sub-menu-sc helpMac">â+X</span>
                                            </a>
                                        </li>
                                        <li class="ui-sub-menu-item">
                                            <a href="#" id="menuCopy">
                                                <span class="ui-icon ebaui-icon-copy sub-menu-icon new-icon"></span>
                                                <span class="ui-menu-item-text">Kopyala</span>
                                                <span class="sub-menu-sc helpWin">CTRL+C</span><span class="sub-menu-sc helpMac">â+C</span>
                                            </a>
                                        </li>
                                        <li class="ui-sub-menu-item">
                                            <a href="#" id="menuPaste">
                                                <span class="ui-icon ebaui-icon-paste sub-menu-icon new-icon"></span>
                                                <span class="ui-menu-item-text">YapÄ±ÅtÄ±r</span>
                                                <span class="sub-menu-sc helpWin">CTRL+V</span><span class="sub-menu-sc helpMac">â+V</span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li id="ulInsertMenu" >
                                    <a href="#">Ekle</a>
                                    <ul>
                                        <li class="ui-sub-menu-item">
                                            <a href="#" id="menuAddImage">
                                                <span class="ui-icon ui-icon-image sub-menu-icon new-icon"></span>
                                                <span class="ui-menu-item-text">Resim</span>
                                                <span class="sub-menu-sc helpWin"></span><span class="sub-menu-sc helpMac"</span>
                                            </a>
                                        </li>
                                        <li class="ui-sub-menu-item">
                                            <a href="#" id="menuAddVideo">
                                                <span class="sub-menu-icon"></span>
                                                <span class="ui-menu-item-text">Video</span>
                                                <span class="sub-menu-sc helpWin"></span><span class="sub-menu-sc helpMac"</span>
                                            </a>
                                        </li>
                                        <li class="ui-sub-menu-item">
                                            <a href="#" id="menuAddLink">
                                                <span class="ui-icon ebaui-icon-link sub-menu-icon new-icon"></span>
                                                <span class="ui-menu-item-text">BaÄlantÄ±</span>
                                                <span class="sub-menu-sc helpWin"></span><span class="sub-menu-sc helpMac"</span>
                                            </a>
                                        </li>
                                        <li class="ui-sub-menu-item">
                                            <a href="#" id="menuAddFigure">
                                                <span class="sub-menu-icon"></span>
                                                <span class="ui-menu-item-text">Åekil</span>
                                                <span class="sub-menu-sc helpWin"></span><span class="sub-menu-sc helpMac"</span>
                                            </a>
                                        </li>
                                        <li class="ui-sub-menu-item">
                                            <a href="#" id="menuAddCanvasToDraw">
                                                <span class="sub-menu-icon"></span>
                                                <span class="ui-menu-item-text">Serbest Ãizim</span>
                                                <span class="sub-menu-sc helpWin"></span><span class="sub-menu-sc helpMac"</span>
                                            </a>
                                        </li>
                                        <li class="ui-sub-menu-item">
                                            <a href="#" id="menuAddMaps">
                                                <span class="sub-menu-icon"></span>
                                                <span class="ui-menu-item-text">Harita</span>
                                                <span class="sub-menu-sc helpWin"></span><span class="sub-menu-sc helpMac"</span>
                                            </a>
                                        </li>
                                        <li class="ui-sub-menu-item">
                                            <a href="#" id="menuAddBackgroundImage">
                                                <span class="sub-menu-icon"></span>
                                                <span class="ui-menu-item-text">Arkaplan Resmi</span>
                                                <span class="sub-menu-sc helpWin"></span><span class="sub-menu-sc helpMac"</span>
                                            </a>
                                        </li>
                                        <li>-</li>
                                        <li class="ui-sub-menu-item">
                                            <a href="#" id="menuAddTextBox">
                                                <span class="ui-icon ebaui-icon-textbox sub-menu-icon new-icon"></span>
                                                <span class="ui-menu-item-text">Metin Kutusu</span>
                                                <span class="sub-menu-sc helpWin"></span><span class="sub-menu-sc helpMac"</span>
                                            </a>
                                        </li>
                                        <li class="ui-sub-menu-item">
                                            <a href="#" id="menuAddBlockquote">
                                                <span class="sub-menu-icon"></span>
                                                <span class="ui-menu-item-text">AlÄ±ntÄ±</span>
                                                <span class="sub-menu-sc helpWin"></span><span class="sub-menu-sc helpMac"</span>
                                            </a>
                                        </li>
                                        <li>-</li>
                                        <li class="ui-sub-menu-item">
                                            <a href="#" id="menuAddHR">
                                                <span class="sub-menu-icon"></span>
                                                <span class="ui-menu-item-text">Yatay Ãizgi</span>
                                                <span class="sub-menu-sc helpWin"></span><span class="sub-menu-sc helpMac"</span>
                                            </a>
                                        </li>
                                        <li class="ui-sub-menu-item">
                                            <a href="#" id="menuAddPageNumber">
                                                <span class="sub-menu-icon"></span>
                                                <span class="ui-menu-item-text">Sayfa NumarasÄ±</span>
                                                <span class="sub-menu-sc helpWin"></span><span class="sub-menu-sc helpMac"</span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li id="ulStyleMenu">
                                    <a href="#">BiÃ§im</a>
                                    <ul id="ulTextStyle">
                                        <li class="ui-sub-menu-item">
                                            <a href="#" id="menubold">
                                                <span class="ui-icon ebaui-icon-fontbold sub-menu-icon new-icon"></span>
                                                <span class="ui-menu-item-text">KalÄ±n</span>
                                                <span class="sub-menu-sc helpWin">CTRL+B</span><span class="sub-menu-sc helpMac">â+B</span>
                                            </a>
                                        </li>
                                        <li class="ui-sub-menu-item">
                                            <a href="#" id="menuitalic">
                                                <span class="ui-icon ebaui-icon-fontitalic sub-menu-icon new-icon"></span>
                                                <span class="ui-menu-item-text">Ä°talik</span>
                                                <span class="sub-menu-sc helpWin">CTRL+Ä°</span><span class="sub-menu-sc helpMac">â+Ä°</span>
                                            </a>
                                        </li>
                                        <li class="ui-sub-menu-item">
                                            <a href="#" id="menuunderline">
                                                <span class="ui-icon ebaui-icon-fontunderlined sub-menu-icon new-icon"></span>
                                                <span class="ui-menu-item-text">AltÄ± Ãizgili</span>
                                                <span class="sub-menu-sc helpWin">CTRL+U</span><span class="sub-menu-sc helpMac">â+U</span>
                                            </a>
                                        </li>
                                        <li class="ui-sub-menu-item">
                                            <a href="#" id="menustrikeThrough">
                                                <span class="ui-icon ebaui-icon-fontoverlined sub-menu-icon new-icon"></span>
                                                <span class="ui-menu-item-text">Ãzeri Ãizgili</span>
                                                <span class="sub-menu-sc helpWin"></span><span class="sub-menu-sc helpMac"</span>
                                            </a>
                                        </li>
                                        <li>-</li>
                                        <li class="ui-sub-menu-item">
                                            <a href="#" id="alignleft">
                                                <span class="sub-menu-icon"></span>
                                                <span class="ui-menu-item-text">Hizala</span>
                                                <span class="sub-menu-sc helpWin"></span><span class="sub-menu-sc helpMac"</span>
                                            </a>
                                            <ul id="ulAlignment">
                                                <li class="ui-sub-menu-item">
                                                    <a href="#" id="alignleft">
                                                        <span class="ui-icon ebaui-icon-alignleft sub-menu-icon new-icon"></span>
                                                        <span class="ui-menu-item-text">Sola</span>
                                                        <span class="sub-menu-sc helpWin"></span><span class="sub-menu-sc helpMac"</span>
                                                    </a>
                                                </li>
                                                <li class="ui-sub-menu-item">
                                                    <a href="#" id="aligncenter">
                                                        <span class="ui-icon ebaui-icon-aligncenter sub-menu-icon new-icon"></span>
                                                        <span class="ui-menu-item-text">Ortala</span>
                                                        <span class="sub-menu-sc helpWin"></span><span class="sub-menu-sc helpMac"</span>
                                                    </a>
                                                </li>
                                                <li class="ui-sub-menu-item">
                                                    <a href="#" id="alignright">
                                                        <span class="ui-icon ebaui-icon-alignright sub-menu-icon new-icon"></span>
                                                        <span class="ui-menu-item-text">SaÄa</span>
                                                        <span class="sub-menu-sc helpWin"></span><span class="sub-menu-sc helpMac"</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li class="ui-sub-menu-item">
                                            <a href="#" id="menuNumberedList">
                                                <span class="ui-icon ebaui-icon-listordered sub-menu-icon new-icon"></span>
                                                <span class="ui-menu-item-text">NumaralÄ± Liste</span>
                                                <span class="sub-menu-sc helpWin"></span><span class="sub-menu-sc helpMac"</span>
                                            </a>
                                        </li>
                                        <li class="ui-sub-menu-item">
                                            <a href="#" id="menuUnorderedList">
                                                <span class="ui-icon ebaui-icon-listunordered sub-menu-icon new-icon"></span>
                                                <span class="ui-menu-item-text">Madde Ä°Åaretli Liste</span>
                                                <span class="sub-menu-sc helpWin"></span><span class="sub-menu-sc helpMac"</span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li id="ulHelpMenu" >
                                    <a href="#">Yardım</a>
                                    <ul>
                                        <li class="ui-sub-menu-item">
                                            <a href="#" id="menuShortcutInfo">
                                                <span class="ui-icon ebaui-icon-shortcuts sub-menu-icon new-icon"></span>
                                                <span class="ui-menu-item-text">KÄ±sayollar</span>
                                                <span class="sub-menu-sc helpWin"></span><span class="sub-menu-sc helpMac"</span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </form>
                </div>
            </div>
        </div>                                        
                
        <div id="zbookMainContainer">                      
            
            <div>
                <div style="float:center;">
                    <div id="zbookMenuContainer" style="float:left; width:20%; height: 500px; background: #00ffff;">
                        
                        <div id="pageOperations"> 

                            <!-- operationDiv tutup çekilen divleri temsil etmektedir. -->
                            <div id="addTextBox" class="operationDiv"> Add text box</div>
                            <div id="addImageBox" class="operationDiv"> Add Image Box</div>
                            <div id="addVideoBox" class="operationDiv"> Add Video Box</div>
                            <div id="addFigureBox" class="operationDiv"> Add Figure Box</div>
                            <div id="addDrawBox" class="operationDiv"> Add Canvas Box</div>
                            
                        </div>
                    </div>

                    <div id="zbookPageContainer" class="edittablePagex" style="float:right; height: 500px; width: 80%; background: #EEE">

                        <section class="present" style="height: 100%; width: 100%; background: #EEE; overflow: auto;">                                                        
                                
                        </section>

                    </div>
                </div>
                
                <div id="zbookBookContainer">
                    
                    <div class="draggableIframeDIV" style="padding: 15px; margin: 15px; background: salmon; width: 400px; height: 200px; overflow: auto; "><iframe style="height: 100% !important; width: 100% !important;" src="epubTemp/OPS/s001-Other-01.xhtml"></iframe></div>
                    <iframe src="epubTemp/OPS/s002-Frontispiece-01.xhtml"></iframe>
                    <iframe src="epubTemp/OPS/s003-BookTitlePage-01.xhtml"></iframe>               

                </div>
                
            </div>
            
            
            
            
            <div style="display:none;" id="newSlideLeftContainer"><a href="#" class="newSlideButton"><i></i></a></div>
            <div style="display:none;" id="newSlideRightContainer"><a href="#" class="newSlideButton"><i></i></a></div>             
        </div>
           
                                        
                                        
        <script type="text/javascript">
            //es globals
            var settings                = {"fontType":"Arial", "transition":"default", "bgTransition":"default", "autoSlide":"0", "slideLoop":"false"};
            var currentPresentationId   = '<%=(String) request.getSession().getAttribute("currentPresentationId")%>';
            var fullscreen              = false;
            var stackSize               = 20;
            var stackPosition           = 0;
            var stack                   = new Array();
            var imageToUpload;
            var lastSavedContent;
            var fontColorDialog;
            var canvasImages            = [];
            var maxImageSize            = 1024 * 1024 * 3; //3MB
            var imageAddingLocation;
            var drawingColor            = 'BLACK';
            var drawingSize             = 1;
            var map;
            var markers                 = [];
        </script>      
            
        <script src="js/jquery-1.9.1.js" type="text/javascript"></script>       
        <script src="js/jquery-migrate-1.2.1.min.js" type="text/javascript"></script>
        <script src="js/jquery-ui-1.10.3.custom.js" type="text/javascript"></script>                        
        <script src="js/jwerty.js" type="text/javascript"></script>
        <script src="spectrum/spectrum.js" type="text/javascript"></script>               
        <script src="js/contextMenu/jquery.contextMenu.js" type="text/javascript"></script>
        <script src="js/contextMenu/jquery.ui.position.js" type="text/javascript"></script>                
        <script src="js/es-undoRedo.js" type="text/javascript"></script>                   
        <script src="js/es-selection.js" type="text/javascript"></script>               
        <script src="https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyAQkZ0hPQiLT4_efvb4IuskAk1neh3r8Fk&sensor=true&libraries=places" type="text/javascript"></script>                    
        <script src="js/es-init.js" type="text/javascript"></script>          
        <script src="js/es-server.js" type="text/javascript"></script> 
        <script src="js/es-text-modifications.js" type="text/javascript"></script> 
        <script src="js/es-presentation.js" type="text/javascript"></script> 
        <script src="js/es-image.js" type="text/javascript"></script> 
        <script src="js/es-elements.js" type="text/javascript"></script> 
        <script src="js/es-print.js" type="text/javascript"></script>        
        <script src="lib/js/head.min.js" type="text/javascript"></script>	        
        <script src="js/html2canvas.js" type="text/javascript"></script>
        
        <script src="js/test.js" type="text/javascript"></script>
            

    </body>
</html>