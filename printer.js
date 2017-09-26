(function(root, factory){
	if(typeof define === 'function' && define.amd){
		define([], factory);
	}else{
		root.Printer = factory(root);
	}
}(this, function(root){
	var Printer = {};
	Printer.printer = {"version": "0.0.1"};
	var init_options = {
		"speed" : 50,		//文字的速度
		"selector" : 'canvas',		//要打印到的标签的ID			
		"startIndex" : 0,		//从第几个字符开始打印
		"endIndex" : 0,		//打印到第几个字符结束
		"hasCur" : false,		//是否有光标
		"curId" : 'cur',		//光标的ID
		"curStr" : '_',		//光标字符
		"curStyle" : 'font-weight: bold;',	//光标的样式（CSS样式）
		"curSpeed" : 100,		//光标的速度（ms）
		"lnStr": ""
	};



	var str = "", options = init_options;
	var flwCurTimer, dom, curObj, reStr='', curSwitch,index=0;
	var time;
	Printer.init = function(arg_str, arg_options){
		str = arg_str;
//		console.log(arg_str)
		for( var option in arg_options ){
			options[option] = arg_options[option];
		}
		dom = document.getElementById(options.selector);
		dom.innerHTML='';
		index = options.startIndex;
		options.endIndex = options.endIndex == 0 ? str.length : options.endIndex
		options.hasCur && flwCur();
		return this;
	}

	var interval;
	Printer.print = function(){	//打印函数
		reStr='';
		var i = 0;
		interval = setInterval(function(){
			console.log(22)
			if(i<str.length){
				(function(index){
					if (str.charAt(index) === '\n'){
						reStr += '<br>' + options.lnStr;
					} else {
						reStr += str.charAt(index);
					}
					dom.innerHTML= options.lnStr + reStr;
			})(i);			
				i++;
			}else{
				clearInterval(interval);
				$(".xin").addClass("active");
			if($(".xin").hasClass("review")){
				$(".xin").removeClass("review");
				$(".close1").hide();
			}
			setTimeout(function(){$(".text-cont").css("opacity","0.6");$(".close").fadeIn(); $(".close").css("animation","down 1s infinite linear");},500);
			var num = $(".tu").attr("src");
			var $a = "http://n.sinaimg.cn/gd/9909e146/20170914/";
			var cNum = num.replace(new RegExp($a), "");
			var ccN = cNum.replace(/[^0-9]/ig, "");
//			console.log(ccN);
			if(ccN == 0 || ccN == 5){
				$(".up").show();
				$(".up").addClass("active1");
				setTimeout(function(){
					$(".up").fadeOut();
					$(".up").removeClass("active1");
				},5000)
			}
			}
		},options.speed * (index + 1))
//		for(var i=0; i<str.length; i++) {
//			(function(index){
//				setTimeout(function(){	
//					if (str.charAt(index) === '\n'){
//						reStr += '<br>' + options.lnStr;
//					} else {
//						reStr += str.charAt(index);
//					}
//					dom.innerHTML= options.lnStr + reStr
//				}, options.speed * (index + 1))
//			})(i);
//		}
		time = options.speed * str.length;
//		setTimeout(function(){
//			$(".xin").addClass("active");
//			if($(".xin").hasClass("review")){
//				$(".xin").removeClass("review");
//				$(".close1").hide();
//			}
//			setTimeout(function(){$(".text-cont").css("opacity","0.6");$(".close").fadeIn(); $(".close").css("animation","down 1s infinite linear");},500);
//			var num = $(".tu").attr("src");
//			var $a = "http://n.sinaimg.cn/gd/9909e146/20170914/";
//			var cNum = num.replace(new RegExp($a), "");
//			var ccN = cNum.replace(/[^0-9]/ig, "");
//			if(ccN == 0 || ccN == 5){
//				$(".up").show();
//				$(".up").addClass("active1");
//				setTimeout(function(){
//					$(".up").fadeOut();
//					$(".up").removeClass("active1");
//				},5000)
//			}
//		},time)
		setTimeout(function(){
			if(options.hasCur){
				var element = document.createElement("span");
				element.id = options.curId
				dom.appendChild(element);

				curObj = document.getElementById(options.curId);
				clearTimeout(flwCurTimer);
				setInterval(chCur, options.curSpeed);
			}
		}, options.speed * str.length)
	}
	Printer.stop = function(){
		clearInterval(interval);
		dom.innerHTML= "";
		console.log(1111111)
	}
	function flwCur(){	//跟随光标
		dom.innerHTML += '<span id="'+options.curId+'" style="'+options.curStyle+'">'+options.curStr+'</span>';
		flwCurTimer = setTimeout(flwCur, 1.5 * options.speed);
	}

	function chCur(){	//闪烁光标
		curObj.innerHTML = curSwitch ? options.curStr : "";
		curSwitch = !curSwitch
	}

	return Printer;
}));


