// JavaScript Document
$(function() {
	//搜索切换
	(function() {
		var aLi = $(".menu li");
		var oText = $('#search').find('.form .text');
		var arrText = ['例如：荷塘鱼作坊烧鱼或樱花日本料理',
		               '例如：路北区万达广场3楼12号',
					   '例如：万达影院双人情侣座',
					   '例如：东莞出大事，老虎是谁',
					   '例如：北京初春大雪，天气变幻莫测'
					   ];
		var iNow = 0;
		oText.val(arrText[iNow]);			   
		aLi .each(function(index) {
            $(this).click(function() {
				aLi.attr('class','gradient');
				$(this).attr('class','active');
				
				iNow = index;
				oText.val(arrText[iNow]);
			});
        });
		
		oText.focus(function() {
			//console.log(arrText[iNow])
			if($(this).val() == arrText[iNow]) {
				$(this).val('')
			}
		});
		oText.blur(function(){
			if($(this).val()==''){
				oText.val(arrText[iNow]);
			}
		});
	})();
	//update文字滚动
	(function() {
		var oDiv = $('.update')
		var oUl = oDiv.find('ul');
		var arrDate = [
						{'name':'天涯明月','time':1,'title':'那些年天涯的炮嘴...','url':'http://www.diema520.com'},
					 {'name':'天涯明月','time':2,'title':'那些年天涯的炮嘴...','url':'http://www.diema520.com'},
					 {'name':'天涯明月','time':3,'title':'那些年天涯的炮嘴。','url':'http://www.diema520.com'},
					 {'name':'天涯明月','time':4,'title':'那些年天涯的炮嘴。','url':'http://www.diema520.com'},
					 {'name':'天涯明月','time':5,'title':'那些年天涯的炮嘴。','url':'http://www.diema520.com'},
					 {'name':'天涯明月','time':6,'title':'那些年天涯的炮嘴。','url':'http://www.diema520.com'},
					 {'name':'天涯明月','time':7,'title':'那些年天涯的炮嘴。','url':'http://www.diema520.com'},
					 {'name':'天涯明月','time':8,'title':'那些年天涯的炮嘴。','url':'http://www.diema520.com'},
					 {'name':'天涯明月','time':9,'title':'那些年天涯的炮嘴。','url':'http://www.diema520.com'},
					 {'name':'天涯明月','time':10,'title':'那些年天涯的炮嘴。','url':'http://www.diema520.com'},
					 {'name':'天涯明月','time':11,'title':'那些年天涯的炮嘴。','url':'http://www.diema520.com'}
					 ];
		var str = "";
		var oBtnUp = $('#updateUpBtn');
		var oBtnDown = $('#updateDownBtn');
		var iNow = 0;
		var timer = null;
		
		for( var i=0; i<arrDate.length; i++){
			str += '<li><a href='+arrDate[i].url+'><strong>'+arrDate[i].name+'</strong><span>'+arrDate[i].time+'分钟前</span>写了一篇新文章：'+arrDate[i].title+'...</a></li>'}
			
		oUl.html(str);
		
		var iH = oUl.find('li').height();
		
		oBtnUp.click(function(){
			doMove(-1);
		});
		oBtnDown.click(function(){
			doMove(1);
		});
		
		oDiv.hover(function(){
			clearInterval(timer);
		},function(){autoPlay()});
		
		function autoPlay(){
			timer = setInterval(function(){
				doMove(-1);
			},1500);
		};
		autoPlay();
		
		function doMove(num) {
			iNow += num;
			if(Math.abs(iNow)>arrDate.length-1){
				iNow = 0;
			}
			if(iNow>0){
				iNow = -(arrDate.length-1);
			}
			oUl.stop().animate({'top':iH*iNow},1500);
		}
		//console.log(iH)
		
		

	})();


	//option1选项卡切换
	(function(){
		fnTab($('.tabNav1'),$('.tabCon1'));
		fnTab($('.tabNav2'),$('.tabCon2'));
		fnTab($('.tabNav3'),$('.tabCon3'));
		fnTab($('.tabNav4'),$('.tabCon4'));
		function fnTab(oNav,aCon){
			var aElem = oNav.children();
			aCon.hide().eq(0).show();
			
			aElem.each(function(index){
				$(this).click(function(){
					aElem.removeClass('active').addClass('gradient');
					$(this).removeClass('gradient').addClass('active');
					aElem.find('a').attr('class','triangle_down_gray');
					$(this).find('a').attr('class','triangle_down_red');
					
					aCon.hide().eq(index).show();
				});
			});
			
		};
	})();
	//自动播放的焦点图
	(function(){
		var oDiv = $('#fade');
		var aUlLi = oDiv.find('ul li');
		var aOlLi = oDiv.find('ol li');
		var oP = oDiv.find('p');
		var arr = ['爸爸去哪儿啦','人像摄影中的光影感','娇柔妩媚，美艳大方']
		var iNow = 1;
		var timer = null;
		
		fnFade();
		
		aOlLi.click(function(){
			iNow = $(this).index();
			fnFade();
		});
		
		oDiv.hover(function(){
			clearInterval(timer);
		},function(){autoPlay()})
		
		
		function autoPlay(){
			timer = setInterval(function(){
				iNow++;
				iNow %= arr.length;
				fnFade();
			},1500);
		};
		
		autoPlay();
		
		
		
		function fnFade(){
			aUlLi.each(function(i){
				if(i != iNow){
					aUlLi.eq(i).fadeOut().css('zIndex',1);
					aOlLi.eq(i).removeClass('active');
				}else{
					aUlLi.eq(i).fadeIn().css('zIndex',2);
					aOlLi.eq(i).addClass('active');
				}
				oP.text(arr[iNow]);
			});
		};
		
	})();
	
	//日历提示说明
	(function(){
		var aSpan = $('.calender h3 span');
		var aImg = $('.calender .today');
		var oPrompt = $('.today_info');
		var oImg = oPrompt.find('.img');
		var oStrong = oPrompt.find('strong');
		var oP = oPrompt.find('p');
		
		aImg.hover(function(){
			var iTop = $(this).parent().position().top-30;
			var iLeft = $(this).parent().position().left+50;
			var index = $(this).parent().index()%aSpan.size();
			//alert(aSpan.size());
			oPrompt.show().css({'left':iLeft,'top':iTop});
			oP.text($(this).attr('info'));
			oImg.attr('src',$(this).attr('src'));
			oStrong.text(aSpan.eq(index).text());
			
		},function(){
			oPrompt.hide();
		});
		
	})();
	
	//bbs高亮显示
	(function(){
		$('.bbs li').mouseover(function(){
			$('.bbs li').removeClass('active').eq($(this).index()).addClass('active');
		});
	})();
	
	//热点hotarea提示
	(function(){
		
		var arr = [  '',
					'用户名：0<br/>人 气：12345',
					'用户名：性感宝贝<br/>地 区 ：朝阳CBD<br/>人 气：12345',
					'用户名：1<br/>人 气：45',
					'用户名：2<br/>人 气：45',
					'用户名：3<br/>人 气：45',
					'用户名：4<br/>人 气：45',
					'用户名：5<br/>人 气：45',
					'用户名：6<br/>人 气：45',
					'用户名：7<br/>人 气：45',
					'用户名：8<br/>人 气：45',
					];
		
		$('.hot_area li').mouseover(function(){
			
			var iWidth = $(this).width()-10;
			var iHeight = $(this).height()-10;
			
			if($(this).index() == 0) return;
			$('.hot_area li p').remove();
			
			//console.log(iWidth);
			
			$(this).append('<p style="width:iWidth;; height:iHeight">'+arr[$(this).index()]+'</p>');
		});
			
	})();




	
})//结束