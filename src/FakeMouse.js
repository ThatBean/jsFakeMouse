//Bean's Fake Mouse for Good JS
	//var location="";
	function FM_func_getPageSize() {
		var xScroll,yScroll;
		if (window.innerHeight && window.scrollMaxY) {
			xScroll = document.body.scrollWidth;
			yScroll = window.innerHeight + window.scrollMaxY;
		} else if (document.body.scrollHeight > document.body.offsetHeight) {
			xScroll = document.body.scrollWidth;
			yScroll = document.body.scrollHeight;
		} else {
			xScroll = document.body.offsetWidth;
			yScroll = document.body.offsetHeight;
		}

		var windowWidth,windowHeight;
		if (self.innerHeight) {
			windowWidth = self.innerWidth;
			windowHeight = self.innerHeight;
		} else if (document.documentElement && document.documentElement.clientHeight) {
			windowWidth = document.documentElement.clientWidth;
			windowHeight = document.documentElement.clientHeight;
		} else if (document.body) {
			windowWidth = document.body.clientWidth;
			windowHeight = document.body.clientHeight;
		}

		var pageWidth,pageHeight
		pageHeight = ( (yScroll < windowHeight) ? windowHeight : yScroll );
		pageWidth = ( (xScroll < windowWidth) ? windowWidth : xScroll );

		return {"pageX":pageWidth,"pageY":pageHeight,"winX":windowWidth,"winY":windowHeight};
	}
	
	function FM_func_setDegree(obj,deg){  
		obj.style.webkitTransform="rotate("+deg+"deg)";
		obj.style.MozTransform="rotate("+deg+"deg)";
		obj.style.msTransform="rotate("+deg+"deg)";
		obj.style.OTransform="rotate("+deg+"deg)";
		obj.style.transform="rotate("+deg+"deg)";
	}
	
	function FM_func_setSizePX(obj,sizeX,sizeY){
		obj.width=obj.style.minWidth=obj.style.maxWidth=sizeX+"px";
		obj.height=obj.style.minHeight=obj.style.maxHeight=sizeY+"px";
	}
	
	function FM_func_fakeMouseEvent(FM_contentWin,iClientX,iClientY,mouseEvent){
		//if in iframes
		//var FM_contentWin = window.frames["contentFrame"];
		var getObject=FM_contentWin.document.elementFromPoint(iClientX, iClientY);
		//alert("Clicked at: "+getObject.tagName);
		if (getObject.tagName.toUpperCase().search(/FRAME/)!=-1) {	//deal with frames...
			//for (int i=0;i<window.frames.length;i++) {
				//if (window.self!=window.frames[i]) FM_func_fakeMouseEvent(window.frames[i],iClientX-getObject.offset,iClientY,mouseEvent);
			//}
			alert("Frames are tricky...Still Dealing with it...");
			return;
		}
		//same window frame
		//var getObject=document.elementFromPoint(iClientX, iClientY);
		if (!getObject) return;
		//if (mouseEvent=="click") alert("[FM_func_fakeMouseEvent] GET:"+iClientX+"|"+iClientY+"|"+mouseEvent);
		if (document.createEventObject) { //For IE
			oEvent = document.createEventObject();
			oEvent.clientX = iClientX;
			oEvent.clientY = iClientY;
			getObject.fireEvent("on"+mouseEvent, oEvent);    
		} else {
			oEvent = document.createEvent("MouseEvents");
			oEvent.initMouseEvent(mouseEvent, true, true, document.defaultView, 0, 0, 0, iClientX, iClientY, false, false, false, false, 0, null); 
			getObject.dispatchEvent(oEvent);
		}
	}
	
	
	//creator func
	function FM_func_insertCss(cssElement,cssCode) {
		var newStyle = document.createElement('style');
		newStyle.type = 'text/css';
		if (newStyle.styleSheet) {	// IE
			newStyle.styleSheet.cssText = cssCode;
		} 
		else {	// Other browsers
			newStyle.innerHTML = cssCode;
		}
		cssElement.appendChild(newStyle);
		//document.getElementsByTagName("head")[0].appendChild( style );
	}
	
	function FM_func_createEleNode(eleParent,eleType,eleId,eleText) {
		var newEleNode = document.createElement(eleType);
		if (eleText) {
			var newEleText = document.createTextNode(eleText);
			newEleNode.appendChild(newEleText);
		}
		newEleNode.id = eleId;
		eleParent.appendChild(newEleNode);
	}
	
	
	function FM_func_createCssText(FM_size, FM_color) {
		var FM_thatCss= ""
		+"#FM_Cursor {"
		+"	position:fixed;"
		+"	right:"+FM_size.CursorMargin+"px;"
		+"	bottom:"+FM_size.CursorMargin+"px;"
		+"	z-index:2090;"
		
		+"	margin:0;"
		+"	padding:0;"
		
		+"	font-size:"+FM_size.CursorFont+"px;"
		+"	line-height:"+FM_size.Cursor+"px;"
		+"	font-weight:bold;"
		+"	text-align: center;"
		+"	color: #FFF;"
		
		+"	width:"+FM_size.Cursor+"px;"
		+"	height:"+FM_size.Cursor+"px;"
		//+"	border:5px solid;"
		+"	border-radius:"+FM_size.Cursor+"px;"
		+"	border-style: none;"
		
		+"	border: #427AC7;"
		+"	background-color: #5091E9;"
		+"}"
		
		+"#FM_Cursor:hover {"
		+"	cursor:pointer;"
		+"	border:#427AC7;"
		+"	background-color:#436EEE;"
		+"}"
		
		+"#FM_Cursor_bg {"
		+"	position:fixed;"
		+"	right:"+(FM_size.CursorMargin-(FM_size.CursorBg-FM_size.Cursor)/2)+"px;"
		+"	bottom:"+(FM_size.CursorMargin-(FM_size.CursorBg-FM_size.Cursor)/2)+"px;"
		+"	z-index:2080;"
		
		+"	margin:0;"
		+"	padding:0;"
		
		+"	font-size:"+FM_size.CursorBgFont+"px;"
		+"	line-height:"+FM_size.CursorBg+"px;"
		+"	font-weight:bold;"
		+"	text-align: center;"
		+"	color: #FFF;"
		
		+"	width:"+FM_size.CursorBg+"px;"
		+"	height:"+FM_size.CursorBg+"px;"
		+"	border-radius: "+FM_size.CursorBg+"px "+FM_size.CursorBg+"px "
		+FM_size.CursorBgRadR/*right corner*/+"px "+FM_size.CursorBgRadL/*left corner*/+"px;"
		+"	border-style: none;"
		
		+"	background-color: #505050;"
		+"}"
		
		+"#FM_Cursor_Marker {"
		+"	position:fixed;"
		+"	display:none;"
		+"	z-index:2100;"
		+"	margin:0;"
		+"	padding:0;"
		+"	width:"+FM_size.Marker+"px;"
		+"	height:"+FM_size.Marker+"px;"
		+"	border-radius:"+FM_size.Marker+"px;"
		+((FM_size.MarkerBorder!=0)?("	border:"+FM_size.MarkerBorder+"px solid "+FM_color.MarkerColor+";"):("	border-style: none;"+"	background-color: "+FM_color.MarkerColor+";"))
		+"}"
		
		+"#FM_Menu {"
		+"	position:fixed;"
		+"	display:none;"
		+"	z-index:2080;"
		+"	padding:0;"
		
		
		+"	font-size:"+FM_size.MenuFont+"px;"
		+"	line-height:"+FM_size.MenuFontHeight+"px;"
		//+"	font-weight:bold;"
		+"	text-align: center;"
		+"	color: #FFF;"
		
		+"	left:50%;"
		+"	top:50%;"
		
		+"	filter:alpha(opacity=80);"
		+"	opacity:0.8;"
		
		+"	width:"+FM_size.MenuX+"px;"
		+"	height:"+FM_size.MenuY+"px;"
		+"	margin-left:-"+FM_size.MenuX/2+"px;"
		+"	margin-top:-"+FM_size.MenuY/2+"px;"
		
		+"	border-radius:"+FM_size.MenuRad+"px;"
		+"	border:"+FM_size.MenuBorder+"px solid "+FM_color.MenuBorderColor+";"
		+"	background-color: "+FM_color.MenuBgColor+";"
		+"}";
		
		return FM_thatCss;
	}
	
	
	window.addEventListener('load',function(){
		//create CSS
		var FM_size, FM_color;
		if (window.devicePixelRatio>1) { //DPR=2/1.5
			FM_size = {
			"Cursor":160,
			"CursorFont":40,
			"CursorMargin":25,
			
			"CursorBg":200,
			"CursorBgFont":35,
			"CursorBgRadL":200,
			"CursorBgRadR":50,
			
			"CursorOffset":30,
			
			"Marker":10,
			"MarkerOffset":20,
			"MarkerBorder":5,
			
			"MoveDet":40,
			
			"MenuX":500,
			"MenuY":500,
			"MenuRad":40,
			"MenuBorder":5,
			"MenuFont":25,
			"MenuFontHeight":30
			};
		}
		else {	//DPR=1
			FM_size = {
			"Cursor":80,
			"CursorFont":20,
			"CursorMargin":15,
			
			"CursorBg":100,
			"CursorBgFont":18,
			"CursorBgRadL":100,
			"CursorBgRadR":30,
			
			"CursorOffset":10,
			
			"Marker":6,
			"MarkerOffset":5,
			"MarkerBorder":3,
			
			"MoveDet":20,
			
			"MenuX":500,
			"MenuY":500,
			"MenuRad":10,
			"MenuBorder":5,
			"MenuFont":20,
			"MenuFontHeight":30
			};
		}
		FM_color = {
			"MarkerColor":"#FF0000",
			"MenuBorderColor":"#436EEE",
			"MenuBgColor":"#222222"
			};
			
		FM_func_insertCss(document.body,FM_func_createCssText(FM_size,FM_color));
		//create Cursor Element
		FM_func_createEleNode(document.body,"div","FM_Cursor","MENU");
		FM_func_createEleNode(document.body,"div","FM_Cursor_bg","Bean's");
		FM_func_createEleNode(document.body,"div","FM_Cursor_Marker");
		//create Menu Element 
		FM_func_createEleNode(document.body,"div","FM_Menu");
		
		//the cursor offset
		var FM_cursor = document.getElementById('FM_Cursor');
		var FM_marker = document.getElementById('FM_Cursor_Marker');
		
		var FM_menu = document.getElementById('FM_Menu');
		
		FM_menu.innerHTML="<br /><b>Bean's Fake Mouse for Good</b>"
		+"<br />"
		+"<br />[To Click]<br />Drag&Release"
		+"<br />[To Cancel]<br />Drag&Drag Back&Release"
		+"<br />[To Menu]<br />Just Click(You know)"
		+"<br />"
		+"<br /><button>Exit</button>"
		+"<br />"
		+"<br />Mostly for Idea Showing<br />ver 6.0"
		+"<br /><b>ThatBean.com</b>";
		
		var FM_contentWin = window;	//.frames["contentFrame"];
		
		var triggered=false;
		
		FM_marker.style.display="block";
		var FM_cursor_Hwidth=FM_cursor.offsetWidth/2;
		var FM_marker_Hwidth=FM_marker.offsetWidth/2;
		FM_marker.style.display="none";
		
		var pageinfo = FM_func_getPageSize();
																				//document.getElementById("pageinfo_1").innerHTML="page:"+pageinfo.pageX+"x"+pageinfo.pageY+" | win:"+pageinfo.winX+"x"+pageinfo.winY+" | DPR:"+window.devicePixelRatio+" | devDPI:"+screen.deviceXDPI+"/"+screen.deviceYDPI+" | logDPI:"+screen.logicalXDPI+"/"+screen.logicalYDPI;
																				//document.getElementById("pageinfo_2").innerHTML=navigator.userAgent;
		var FM_cur_max_deg=0.1;
		var FM_cur_max_X=FM_cursor.offsetLeft+FM_cursor.offsetWidth-2*FM_cursor_Hwidth;
		var FM_cur_min_X=pageinfo.winX-FM_cur_max_X-2*FM_cursor_Hwidth;
		var FM_cur_max_Y=FM_cursor.offsetTop+FM_cursor.offsetWidth-2*FM_cursor_Hwidth;
		var FM_cur_min_Y=pageinfo.winY-FM_cur_max_Y-2*FM_cursor_Hwidth;
																				//document.getElementById("pageinfo_1").innerHTML+="|MX/MY:"+FM_cur_max_X+"-"+FM_cur_min_X+"|"+FM_cur_max_Y+"-"+FM_cur_min_Y+"|"+FM_cursor_Hwidth;
		var R_offset=FM_size.CursorOffset;
		var R_offset_M=FM_cursor_Hwidth*Math.SQRT2+FM_marker_Hwidth+FM_size.MarkerOffset;
			
		var X_org=FM_cursor.offsetLeft+FM_cursor.offsetWidth/2;
		var Y_org=FM_cursor.offsetTop+FM_cursor.offsetHeight/2;
																				//document.getElementById("pageinfo_2").innerHTML+="|x/y org="+X_org+"|"+Y_org;
		function win_resize(){
			//get page size info
			pageinfo = FM_func_getPageSize();
			FM_cur_max_X=FM_cursor.offsetLeft+FM_cursor.offsetWidth-2*FM_cursor_Hwidth;
			FM_cur_min_X=pageinfo.winX-FM_cur_max_X-2*FM_cursor_Hwidth;
			FM_cur_max_Y=FM_cursor.offsetTop+FM_cursor.offsetWidth-2*FM_cursor_Hwidth;
			FM_cur_min_Y=pageinfo.winY-FM_cur_max_Y-2*FM_cursor_Hwidth;
			X_org=FM_cursor.offsetLeft+FM_cursor.offsetWidth/2;
			Y_org=FM_cursor.offsetTop+FM_cursor.offsetHeight/2;
		}
		
		//win_resize();
		//window.addEventListener('resize',win_resize,false);
		//window.addEventListener('orientationchange',win_resize,false);
	
		function cur_update(coors,mouseEvent){
			var tempA=Math.atan2((coors.y-Y_org),(coors.x-X_org));
			var R_offsetX=Math.min(Math.cos(tempA),FM_cur_max_deg);
			var R_offsetY=Math.min(Math.sin(tempA),FM_cur_max_deg);
			
			FM_cursor.style.left=Math.min(Math.max(coors.x-FM_cursor_Hwidth+R_offset*R_offsetX,FM_cur_min_X),FM_cur_max_X)+"px";
			FM_cursor.style.top=Math.min(Math.max(coors.y-FM_cursor_Hwidth+R_offset*R_offsetY,FM_cur_min_Y),FM_cur_max_Y)+"px";
			
			//FM_marker
			FM_marker.style.left=parseInt(FM_cursor.style.left)+FM_cursor_Hwidth-FM_marker_Hwidth+R_offset_M*Math.cos(tempA)+"px";
			FM_marker.style.top=parseInt(FM_cursor.style.top)+FM_cursor_Hwidth-FM_marker_Hwidth+R_offset_M*Math.sin(tempA)+"px";
			
			if (mouseEvent!="") FM_func_fakeMouseEvent(FM_contentWin,parseInt(FM_marker.style.left)+FM_marker_Hwidth,parseInt(FM_marker.style.top)+FM_marker_Hwidth,mouseEvent);
			
			FM_func_setDegree(FM_cursor,(tempA*180/Math.PI+135));
																				//document.getElementById("xycoordinates").innerHTML="RealCur: (" + coors.x + "," + coors.y + ")"+"|A:"+tempA.toFixed(3)+"|"+(tempA*180/Math.PI).toFixed(3)+"|Cur:"+parseInt(FM_cursor.style.left)+"|"+parseInt(FM_cursor.style.top);
		}
		
		var touch_orgX, touch_orgY;
		var away;
		function cur_draw(coors){
			event.preventDefault();
			event.stopPropagation();
			
			if (!triggered) {
				//set reigger
				triggered=true;
				//show && move
				win_resize();
				touch_orgX=coors.x;
				touch_orgY=coors.y;
				away=0;
			}
			//cur_update(coors,"");
			//cur_update(coors,"mouseover");
		}
		
		function cur_redraw(coors){
			//check "swipe"
			if (!triggered) return;
			event.preventDefault();
			event.stopPropagation();
			if ((touch_orgX-coors.x)<FM_size.MoveDet && (touch_orgY-coors.y)<FM_size.MoveDet) {
				FM_marker.style.display="none";
				FM_cursor.style.left="";//FM_cursor_org_left;
				FM_cursor.style.top="";//FM_cursor_org_top;
				FM_cursor.innerHTML=(away==1?"Cancel":"MENU");
				return;
			}
			else {
				away=1;
				FM_cursor.innerHTML="Click";
			}
			//show && move
			FM_marker.style.display="block";
			cur_update(coors,"");
			//cur_update(coors,"mouseover");
		}
		
		function cur_hide(coors){
			//clear trigger
			if (triggered) {
				event.preventDefault();
				event.stopPropagation();
				triggered=false;
				//clear
				//FM_cursor.style.display="none";
				FM_marker.style.display="none";
				
				if (away==0) {
					//alert("Menu, please!");
					FM_menu.style.display="block";
				}
				else {
					if ((touch_orgX-coors.x)<FM_size.MoveDet && (touch_orgY-coors.y)<FM_size.MoveDet) {
						//do nothing
					}
					else {
						cur_update(coors,"click");
					}
				}
				//reset Cursor
				FM_cursor.style.left="";//FM_cursor_org_left;
				FM_cursor.style.top="";//FM_cursor_org_top;
				FM_func_setDegree(FM_cursor,0);
				FM_cursor.innerHTML="MENU";
																				//document.getElementById("xycoordinates").innerHTML="try swipe/drag from the \"Cursor\" button";
			}
		}
		
		// create a drawer which tracks touch movements
		var FM_cursorEventDispenser = {
			touchstart: cur_draw,
			mousedown: cur_draw,
			touchmove: cur_redraw,
			mousemove: cur_redraw,
			touchend: cur_hide,
			touchcancel: cur_hide,
			//mouseout: cur_hide,	//cause error...
			mouseup: cur_hide
		};
		// create a function to pass touch events and coordinates to drawer
		var lastX, lastY;
		function FM_func_cursorEvent(event){
			// get the touch coordinates
																				//document.getElementById("pageinfo_2").innerHTML=event.type;
			var coors;
			if (event.type=="touchend" || event.type=="mouseup") {
				coors = {
					x: lastX,
					y: lastY
				}
			}
			else if (event.targetTouches) {
				coors = {
					x: event.targetTouches[0].clientX,
					y: event.targetTouches[0].clientY
				}
			}
			else {
				coors = {
					x: event.clientX,
					y: event.clientY
				}
			}
			// pass the coordinates to the appropriate handler
			lastX=coors.x;
			lastY=coors.y;
			if(!lastX && !lastX) ;//alert(event.type+" coor error "+event.target+"|"+event.currentTarget);
			else FM_cursorEventDispenser[event.type](coors);
		}
		
		function FM_func_menuEvent(event){
			event.preventDefault();
			event.stopPropagation();
			FM_menu.style.display="none";
		}
		
		// attach the touchstart, touchmove, touchend event listeners.
	    FM_cursor.addEventListener('touchstart',FM_func_cursorEvent, false);
	    document.body.addEventListener('touchmove',FM_func_cursorEvent, false);
	    document.body.addEventListener('touchend',FM_func_cursorEvent, false);
	    document.body.addEventListener('touchcancel',FM_func_cursorEvent, false);
		
	    FM_cursor.addEventListener('mousedown',FM_func_cursorEvent, false);
		document.body.addEventListener('mousemove',FM_func_cursorEvent, false);
	    document.body.addEventListener('mouseup',FM_func_cursorEvent, false);
		//document.body.addEventListener('mouseout',FM_func_cursorEvent, false);	//cause error...
		
		FM_menu.addEventListener('click',FM_func_menuEvent, false);
		FM_menu.addEventListener('touchend',FM_func_menuEvent, false);
		FM_menu.addEventListener('mouseup',FM_func_menuEvent, false);
	},false);	// end window.onLoad
	
	//test if multiple onload can be processed()stupid huh?
	//window.addEventListener('load',function(){alert("Bean's Fake Mouse for Good loaded")},false);