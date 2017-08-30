;
(function($) {
	$(function() {
		//ajax获取分页
		$.ajaxSetup({
			url: "/ajax/goodslist",
			dataType: 'json',
			data: {
				pageNo: 1
			},
			async: false,
			success: function(res) {
				console.log(res);

				var page = Math.ceil(res.total / res.pageCount);
				$('#page').empty();
				for (var i = 1; i <= page; i++) {
					var $span = $('<span/>');

					// 添加当前页高亮效果
					if (i === res.pageNo) {
						$span.addClass('active');
					}

					$span.html(i).appendTo('#page');
				}

				//遍历添加商品
				var $div0 = $("<div/>")
				$.each(res.data, function(index, dat) {
					var $div = $("<div/>").addClass("product-grid").appendTo($div0);
					var $a = $("<a/>").attr({
						href: dat.url
					}).appendTo($div);
					$("<img/>").attr({
						src: dat.imgurl
					}).appendTo($a);
					$("<p/>").addClass("proname").html(dat.title).appendTo($a);
					var $div2 = $("<div/>").addClass("price-group").appendTo($div);
					$("<span/>").html(dat.price).addClass("price").appendTo($div2);
					if (dat.iconsales) {
						$("<del/>").html(dat.del).appendTo($div2);
						$("<span/>").html("特价").addClass("icon-sales").appendTo($div);
					}
					var $div3 = $("<div/>").addClass("add-cart").appendTo($div);
					$("<a/>").html("已有" + dat.discussion + "人评论").addClass("discussion").attr({
						href: "#"
					}).appendTo($div3);
					$("<a/>").addClass("addbt").html("加入购物车").appendTo($div3);
					$(".product-listing").empty();
					$div0.appendTo($(".product-listing"));
				});
				//添加购物车按钮
				$(".addbt").click(function() {
					//加车动画
					var addimg = $(this).parent().siblings("a").children("img");
					var clone = addimg.clone();
					clone.css({
						position: 'absolute',
						left: addimg.offset().left,
						top: addimg.offset().top,
						width: addimg.width(),
						'z-index': 20
					}).appendTo($("body"));
					clone.animate({
							left: $(".carbox").offset().left + ($(".carbox").width() / 2),
							top: $(".carbox").offset().top + ($(".carbox").height() / 2),
							width: 0
						}, function() {
							clone.remove();
						})
						//加车cookie
					var proname = addimg.siblings(".proname").text();
					var proprice = $(this).parent().siblings(".price-group").children(".price").text();
					var proimg = addimg.attr("src");
					var d = new Date;
					d.setDate(d.getDate() + 10);
					if (!getCookie("car")||getCookie("car")=="[]") {
						var cook = [];
						cook.push({name: proname,price: proprice,imgurl: proimg,count: 1});
						console.log("开车"+proname)
					} else {
						var cook = JSON.parse(getCookie("car"));
						for (var i = 0; i < cook.length; i++) {
							console.log(i)
							if (cook[i].name == proname) {
								cook[i].count = parseInt(cook[i].count) + 1;
								console.log("有车有货加车"+proname);
								break;
							} else {
								if(i==cook.length-1)
								{
									cook.push({name: proname,price: proprice,imgurl: proimg,count: 1});
								console.log("有车无货加车"+proname);
								break;
								}
							}
						}
					}
					setCookie("car", JSON.stringify(cook), d, "/");
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
			},
			error: function(res, res1, res2) {
				console.log(res);
				console.log(res1), console.log(res2);
			}
		})
		$.ajax();
		//翻页按钮
		$('#page').on('click', 'span', function() {
			// console.log($(this).text());
			$.ajax({
				data: {
					pageNo: $(this).text()
				}
			});
		});
	})
})(jQuery);