(function($){
	$.fn.ShowDialog = function(options) {
	var opts = $.extend({},$.fn.ShowDialog.defaults,options);
	$(this).click(function(){
								if(opts.mask) {
									var iWidth = document.documentElement.clientWidth; 
									var iHeight = document.documentElement.clientHeight; 
									var bgObj = document.createElement("div"); 
									bgObj.id = "BgDiv"; 
									bgObj.style.cssText = "position:absolute;left:0px;top:0px;width:"+iWidth+"px;height:"+Math.max(document.body.clientHeight, iHeight)+"px;filter:Alpha(Opacity=80);opacity:0.3;background-color:#000000;z-index:100;"; 
									document.body.appendChild(bgObj);
								}
						   		var skinurl="",yanse="";
								switch(opts.skin)
								{
									case "blue":
									skinurl="images/blue/close_1.gif";	
									skinurl2="images/blue/close_2.gif";	
									yanse="blue";
									break;
									case "red":
									skinurl="images/red/close_1.gif";	
									skinurl2="images/blue/close_2.gif";	
									yanse="red";
									break;
									case "green":
									skinurl="images/green/close_1.gif";	
									skinurl2="images/blue/close_2.gif";	
									yanse="green";
									break;
								}	
								$("#showdialogcss").attr("href","images/"+yanse+"/css.css");

									if(!$("#diawindow").length>0)
									{
									 var maktemp='<div id="markdiag" style="background:#666;width:'+$(document).width()+'; height:'+($(document).height())+'px; position:absolute; top:0px; left:0px; z-index:80;"></div>';
									 var tempstr ='<div class="showdiv" id="diawindow"><div class="top"><div class="topleft"></div><div class="topmiddle" id="topmiddle"> <span style="float:left; color:#FFF; font-weight:bold; line-height:26px; font-size:12px;">&nbsp;'+opts.Title+'</span><span style="float:right"><a href="javascript:"><img border="0" src="'+skinurl+'" width="26" height="20" id="diagclose" /></a></span></div><div class="topright"></div></div><div class="clear"></div><div class="middle"><div class="middleleft" id="middleleft"></div><div class="middlemiddle"  id="middlemiddle"><div style="padding:1px;background:#fff;" id="middlecontent"><iframe src="'+opts.FrameURL+'" style="height:100%; width:100%; OVERFLOW: scroll; scrollbar-face-color: #DBEBFE;" frameborder="0"></iframe></div></div><div class="middleright" id="middleright"></div></div><div class="clear"></div><div class="end"><div class="endleft"></div><div class="endmiddle" id="endmiddle"></div><div class="endright"></div></div><div class="clear"></div></div>';
									 if(opts.ContentFlag==1)
									{
										tempstr ='<div class="showdiv" id="diawindow"><div class="top"><div class="topleft"></div><div class="topmiddle" id="topmiddle"> <span style="float:left; color:#FFF; font-weight:bold; line-height:26px; font-size:12px;">&nbsp;'+opts.Title+'</span><span style="float:right"><a href="javascript:"><img border="0" src="'+skinurl+'" width="26" height="20" id="diagclose" /></a></span></div><div class="topright"></div></div><div class="clear"></div><div class="middle"><div class="middleleft" id="middleleft"></div><div class="middlemiddle"  id="middlemiddle"><div style="padding:1px;background:#fff;" id="middlecontent">'+opts.Contents+'</div></div><div class="middleright" id="middleright"></div></div><div class="clear"></div><div class="end"><div class="endleft"></div><div class="endmiddle" id="endmiddle"></div><div class="endright"></div></div><div class="clear"></div></div>';
									}
									 $("body").append(maktemp);
									 $("body").append(tempstr);									  
									}
									else
									{
										$("#markdiag").show();
										$("#markdiag").show();
									}
											var css={}
											   if(window.navigator.userAgent.indexOf('MSIE')>=1)
											   {
												   css.filter= 'progid:DXImageTransform.Microsoft.Alpha(opacity='+opts.Intopacity*100+')';
											   }
											   else
											   {
												   css.opacity= opts.Intopacity;
											    }
											$("#markdiag").css(css);
											var w,h,de;
											de = document.documentElement;
											w = self.innerWidth || (de&&de.clientWidth) || document.body.clientWidth;
											h = self.innerHeight || (de&&de.clientHeight)|| document.body.clientHeight;
											var diagtop = h/2-(opts.Height/2)+eval($(document).scrollTop());
											var diagleft = w/2-(opts.Width/2)+eval($(document).scrollLeft());	
											$("#diawindow").css({"top" : diagtop,"left":diagleft,"width":opts.Width,"height":opts.Height});
											$("#topmiddle").css({"width":opts.Width-20});
											$("#middlemiddle").css({"width":opts.Width-8,"height":opts.Height-34});
											$("#middleleft").css({"height":opts.Height-34});
											$("#middleright").css({"height":opts.Height-34});
											$("#middlecontent").css({"height":opts.Height-32});								
											$("#endmiddle").css({"width":opts.Width-20});
											$(window).scroll(function(){
											 var diagtop = h/2-(opts.Height/2)+eval($(document).scrollTop());
											 var diagleft = w/2-(opts.Width/2)+eval($(document).scrollLeft());
											 $("#diawindow").css({"top" : diagtop,"left":diagleft });
											 });
											//关闭按钮事件
											$("#diagclose").mousemove(
																	  function(){
																		  $(this).attr("src",skinurl2);
																	  }
																	  ).mouseout(
																	  function(){
																		  $(this).attr("src",skinurl);
																	  }
																	  ).click(function(){
												if(opts.mask) {
													document.body.removeChild(bgObj);
												}
												if($("#diawindow").length>0)
												{
													$("#diawindow").remove();
												}
												if($("#markdiag").length>0)
												{
													$("#markdiag").remove();
												}
												document.onselectstart = function(){return true;}; 
								   			})
											//拖动
											var moveFlag = false;
											var mouseStartLeft = mouseStartTop = 0;
											var divStartLeft = divStartTop = 0;
											$("#diawindow").mousedown(function(e){
													moveFlag = true;
													$("#diawindow").css({"cursor":"move"});
													mouseStartLeft = (typeof(event)!='undefined') ? event.x : e.pageX;
													mouseStartTop = (typeof(event)!='undefined') ? event.y : e.pageY;
													divStartLeft = $("#diawindow").offset().left;
													divStartTop = $("#diawindow").offset().top;
											}).mouseup(function () {
													moveFlag = false;
													$("#diawindow").css({"cursor":"default"});
													mouseStartLeft = mouseStartTop = 0;
													divStartLeft = divStartTop = 0;
											});
		$(document).mousemove(function (e) {		 
		if (!moveFlag) return;
		document.onselectstart = function(){return false;}; 
		var mouseLeft = (typeof(event)!='undefined') ? event.x : e.pageX;
		var mouseTop = (typeof(event)!='undefined') ? event.y : e.pageY;
		var addLeft = mouseLeft - mouseStartLeft;
		var addTop = mouseTop - mouseStartTop;
		$("#diawindow").css({"left":divStartLeft+addLeft, "top":divStartTop+addTop});
	});
											
						   })
	
	
    };	
	$.fn.ShowDialog.defaults={
		Width:"300",
		Height:"300",
		Title:"对话框",
		Intopacity:"0.2",
		ContentFlag:"0",
		skin:"blue",
		FrameURL:"",
		Contents:"",
		mask:false
	};
})(jQuery);