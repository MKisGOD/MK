;(function($){
	$(function(){
		
		//主页图片轮播
		var lunboindex = 0;
		var $firstImg = $("#indlb .imgbox").find('img').eq(0);
		var Imgwidth = $firstImg.width(); 
		var lunbo1timer = setInterval(function() {
			move1();
		}, 2000)
		//滚动函数
		function move1() {
			lunboindex++;
			//谷歌里Imgwidth变量会为0 要重新获取
			panduan1();
			//判断放在移动之前实现无缝轮播
			var Imgwidth = $firstImg.width(); 
			$("#indlb .imgbox").stop().animate({
				left: lunboindex * -Imgwidth
			})
			btn1();
			
		}
		//页码滚动函数
		function btn1(){
			if(lunboindex<3)
			$("#indlb .btn a").eq(lunboindex).addClass("active").siblings("a").removeClass("active")
			else
			$("#indlb .btn a").eq(0).addClass("active").siblings("a").removeClass("active")
		}
		//判断函数
		function panduan1() {
			if(lunboindex >= 4) {
				lunboindex = 1;
				//这里是等于1，滚动到第二张图
				$("#indlb .imgbox").stop()
				$("#indlb .imgbox").css({left: 0})
			}
		}
		//页码点击滚动函数
		$("#indlb .btn a").click(function(){
			lunboindex = $(this).index()-1;
			clearInterval(lunbo1timer);
			move1();
			lunbo1timer = setInterval(function() {
			move1();
		}, 2000)
			
		})
		//内容区页码点击翻页
		$(".banner_page a").click(function(){
			$index = $(this).index();
			console.log($index)
			$(this).addClass("on").siblings("a").removeClass("on");
			$(this).parent().parent().children(".items").eq($index).show().siblings(".items").hide();
		})
		//同是翻页
		$(".fresh-center-page a").click(function(){
			$index = $(this).index();
			$(this).addClass("checked").siblings("a").removeClass("checked");
			$(this).parent().parent().children(".items").eq($index).show().siblings(".items").hide();
		})
	})
})(jQuery);

