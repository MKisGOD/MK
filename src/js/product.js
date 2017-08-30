;
(function($) {
	$(function() {
		//鼠标划过小图切换大图
		$(".preview .spec-scroll .items li").mouseover(function() {
			$(this).addClass("on").siblings("li").removeClass("on");
			var num = $(this).index() * 1.0;
			$(".jqzoom img").attr({
				src: "../img/b" + parseInt(num + 1) + ".jpg",
				'data-big': "../img/b" + parseInt(num + 1) + ".jpg"
			})
		})
		//放大镜插件的调用
		$(".jqzoom").xzoom({
			width: 400,
			height: 400,
			gap: 10
		});
		//停止搜索栏吸顶，详情栏吸顶
		var $searchtop = $(".search").offset().top;
		var $navtop = $(".product-nav").offset().top;
		$(window).scroll(function() {
			if($("body").scrollTop() > $searchtop) {
				$("#head").css({
					position: 'relative',
					top: 0,
					padding: 0,
					height: 'auto'
				})
				$(".topxs").css({
					margin: 'auto',
					'min - width': '1190px',
					width: '100%',
					height: '92px',
					position: 'relative',
					top: 0,
					left: 0,
				})
				$(".topyc").show();
			}
			if($("body").scrollTop() > $navtop) {
				$(".product-nav").css({
					position: "fixed",
					top: 0,
					width: "100%",
					background: "white",
					left: 0,
					'padding-left':'240px'
				})
			} else {
				$(".product-nav").css({
					float: 'left',
					width: '978px',
					position:'relative',
					padding:0
				})
			}
		})
		//数量加减的控制
		$(".jiashuliang").click(function(){
			var sl = parseInt($("#shuliang").val());
			$("#shuliang").val(sl+1);
		})
		$(".jianshuliang").click(function(){
			var sl = parseInt($("#shuliang").val());
			if($("#shuliang").val()>=2)
			$("#shuliang").val(sl-1);
		})
		//加车按钮的效果
		$(".addcar img").click(function() {
			var addimg = $(".jqzoom").children("img");
			var clone = addimg.clone();
			clone.css({
				position:'absolute',
				left:addimg.offset().left,
				top:addimg.offset().top,
				width:addimg.width(),
				'z-index':20
			}).appendTo($("body"));
			clone.animate({
				left:$(".carbox").offset().left+($(".carbox").width()/2),
				top:$(".carbox").offset().top+($(".carbox").height()/2),
				width:0
			},function(){
					clone.remove();
			})
			var proname = $(".p-name").children("h1").text();
			var proprice = $("#jiage").text();
			var proimg = addimg.attr("src");
			var no = $("#shuliang").val();
			var d = new Date;
			d.setDate(d.getDate() + 10);
			if(!getCookie("car")||getCookie("car")=="[]")
			{
				var cook = [];
			cook.push({name:proname,price:proprice,imgurl:proimg,count:0});
			console.log("空车加车"+no);
			}
			else 
			var cook = JSON.parse(getCookie("car"));
			//根据数量添加
			for(var i = 0;i<cook.length;i++)
			{
				if(cook[i].name==proname)
				{
					cook[i].count=parseInt(cook[i].count)+parseInt(no);
					console.log("有车有货加车"+no);
					break;
				}
				else
				{
				if(i==cook.length-1)
					{	
					cook.push({name:proname,price:proprice,imgurl:proimg,count:no});
					console.log("有车无货加车"+no);
					break;
					}
				}
			}
			setCookie("car",JSON.stringify(cook),d,"/");
			if(!getCookie("car"))
			{var cook = [];}
			else 
			{var cook = JSON.parse(getCookie("car"));}
			var COUNT = 0;
			$.each(cook, function(index,dat) {
				COUNT = parseInt(COUNT)+parseInt(dat.count)
			});
			$(".carsum").text(COUNT);
		})
	})
})(jQuery);