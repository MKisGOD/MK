;
(function($) {
	$(function() {

		//show购物车
		showcar();
		//删除购物车中的商品
		$(".carlist .del").click(function() {
				var no = $(this).parent().index();
				var $car = getCookie("car");
				$car = JSON.parse($car);
				$car.splice(no, 1);
				console.log($car);
				var d = new Date;
				d.setDate(d.getDate() + 10);
				setCookie("car", JSON.stringify($car), d, "/")
				$('.carlist').empty();
				showcar();
			})
			//从cookie获取购物车
		function showcar() {
			//判断车是否空
			if (!getCookie("car") || getCookie("car") == "[]") {
				console.log("没东西")
				$(".pack").hide();
				$(".mycartitle").hide();
				$(".step-header").hide();
				$(".mycar").hide()
				$(".emptycar").show()
				$(".likebox").show()
			} else {
				console.log("有东西")
				$(".emptycar").hide();
				$(".pack").show();
				$(".likebox").hide()
				$(".search").hide()
					//车非空 
				var $car = getCookie("car");
				$car = JSON.parse($car);
				console.log($car)
				var SUM = 0;
				for (var i = 0; i < $car.length; i++) {
					var $tr = $("<tr/>").addClass("selected").appendTo($(".tb tbody"));
					//td1是图片和名称
					var $td1 = $("<td/>").addClass("goods-detail").appendTo($tr);
					var $divimg = $("<div/>").addClass("img-detail").appendTo($td1);
					$("<input />").attr({
						type: "checkbox",
						name: "checkItem",
						checked: "checked",
						value: ""
					}).appendTo($divimg)
					$("<img/>").attr("src", $car[i].imgurl).appendTo($("<a/>").attr("href", "#").appendTo($divimg))
					var $divword = $("<div></div>").addClass("word-detail").appendTo($td1);
					$("<a/>").attr("href", "#").appendTo($divword).text($car[i].name);
					$("<p></p>").html("<b>配送方式：</b>半日达、门店自提").appendTo($divword);
					//td2是价格
					var $td2 = $("<td/>").addClass("price common-width").appendTo($tr);
					$("<p/>").addClass("price-now").text($car[i].price).appendTo($td2)
						//td3是数量
					var $td3 = $("<td/>").addClass("number common-width").appendTo($tr);
					var $divnum = $("<div></div>").addClass("numberbtn").appendTo($td3);
					$("<a/>").addClass("jianshuliang").attr({
						href: "#"
					}).text("-").appendTo($divnum);
					$("<input />").addClass("quantity-text").attr({
						type: "text",
						name: "shuliang",
						value: $car[i].count
					}).appendTo($divnum);
					$("<a/>").addClass("jiashuliang").attr({
						href: "#"
					}).text("+").appendTo($divnum);
					//td4是总价
					var sum = (parseFloat($car[i].price.substr(1)) * parseInt($car[i].count)).toFixed(2);
					var $td4 = $("<td/>").addClass("money common-width").text("￥" + sum).appendTo($tr);
					SUM += parseFloat(sum);
					//td5是删除
					var $td5 = $("<td/>").addClass("operation common-width").html("<a href='#' id='del_" + i + "'>删除</a>").appendTo($tr);
				}
				//总数
				var COUNT = 0;
				$.each($car, function(index, dat) {
					COUNT = parseInt(COUNT) + parseInt(dat.count)
				});
				$(".price-sum .red").text("￥" + SUM.toFixed(2));
				$(".total-num").text(COUNT);

				//多选框的判定
				//商品多选框
				var $checkbox = $("input[type=checkbox]").not("input[name=checkall],input[name=checkal]");
				//上全选
				$("input[name=checkall]").click(function() {
						$("input[type=checkbox]").prop("checked", $("input[name=checkall]").prop("checked"));
						if($("input[name=checkall]").prop("checked"))
						$(this).parents().parents("tr").nextAll("tr").addClass("selected")
						else
						$(this).parents().parents("tr").nextAll("tr").removeClass("selected")
						var $checked = $checkbox.filter(":checked");
						SUM = 0;
						COUNT = 0;
						for (var i = 0; i < $checked.length; i++) {
							//						console.log($checked.eq(i).parents().parents().siblings(".number").children(".numberbtn").children("input").val());
							COUNT = parseInt(COUNT) + parseInt($checked.eq(i).parents().parents().siblings(".number").children(".numberbtn").children("input[name=shuliang]").val());
							SUM = parseFloat(SUM) + parseFloat($checked.eq(i).parents().parents().siblings(".money").text().substr(1));
						}
						$(".total-num").text(COUNT);
						$(".price-sum .red").text("￥" + SUM.toFixed(2));
					})
					//下全选
				$("input[name=checkal]").click(function() {
						$("input[type=checkbox]").prop("checked", $("input[name=checkal]").prop("checked"));
						if($("input[name=checkall]").prop("checked"))
						$("tbody").children("tr").not(".title,.shop-goods").addClass("selected")
						else
						$("tbody").children("tr").not(".title,.shop-goods").removeClass("selected")
						var $checked = $checkbox.filter(":checked");
						SUM = 0;
						COUNT = 0;
						for (var i = 0; i < $checked.length; i++) {
							//						console.log($checked.eq(i).parents().parents().siblings(".number").children(".numberbtn").children("input").val());
							COUNT = parseInt(COUNT) + parseInt($checked.eq(i).parents().parents().siblings(".number").children(".numberbtn").children("input[name=shuliang]").val());
							SUM = parseFloat(SUM) + parseFloat($checked.eq(i).parents().parents().siblings(".money").text().substr(1));
						}
						$(".total-num").text(COUNT);
						$(".price-sum .red").text("￥" + SUM.toFixed(2));
					})
					//商品多选
				$checkbox.click(function() {
					//判定是否全选
					var $checked = $checkbox.filter(":checked");
					$("input[name=checkall],input[name=checkal]").prop("checked", $checkbox.length == $checked.length);
					//判定是否选中
					if (!$(this).prop("checked"))
						$(this).parents().parents().parents("tr").removeClass("selected")
					else
						$(this).parents().parents().parents("tr").addClass("selected")
					SUM = 0;
					COUNT = 0;
					for (var i = 0; i < $checked.length; i++) {
						//						console.log($checked.eq(i).parents().parents().siblings(".number").children(".numberbtn").children("input").val());
						COUNT = parseInt(COUNT) + parseInt($checked.eq(i).parents().parents().siblings(".number").children(".numberbtn").children("input[name=shuliang]").val());
						SUM = parseFloat(SUM) + parseFloat($checked.eq(i).parents().parents().siblings(".money").text().substr(1));
					}
					$(".total-num").text(COUNT);
					$(".price-sum .red").text("￥" + SUM.toFixed(2));
				})
				//减数量
				$(".jianshuliang").click(function() {
					console.log($(this).parent().parent().siblings(".goods-detail").children(".word-detail").children("a").text())
					var cook = JSON.parse(getCookie("car"))
					for (var i = 0; i < cook.length; i++) {
						if (($(this).parent().parent().siblings(".goods-detail").children(".word-detail").children("a").text() == cook[i].name) && (cook[i].count > 1)) {
							cook[i].count = parseInt(cook[i].count) - 1;
							console.log(cook[i].count)
						}
					}
					var d = new Date;
					d.setDate(d.getDate() + 10);
					setCookie("car", JSON.stringify(cook), d, "/")
					location.reload()
				})
				//加数量
				$(".jiashuliang").click(function() {
					console.log($(this).parent().parent().siblings(".goods-detail").children(".word-detail").children("a").text())
					var cook = JSON.parse(getCookie("car"))
					for (var i = 0; i < cook.length; i++) {
						if (($(this).parent().parent().siblings(".goods-detail").children(".word-detail").children("a").text() == cook[i].name)) {
							cook[i].count = parseInt(cook[i].count) + 1;
							console.log(cook[i].count)
						}
					}
					var d = new Date;
					d.setDate(d.getDate() + 10);
					setCookie("car", JSON.stringify(cook), d, "/")
					location.reload()
				})
				//改数量
				$(".quantity-text").blur(function(){
					var cook = JSON.parse(getCookie("car"))
					for (var i = 0; i < cook.length; i++) {
						if (($(this).parent().parent().siblings(".goods-detail").children(".word-detail").children("a").text() == cook[i].name)&&$(this).val()>0) {
							cook[i].count = parseInt($(this).val());
							console.log(cook[i].count)
						}
					}
					var d = new Date;
					d.setDate(d.getDate() + 10);
					setCookie("car", JSON.stringify(cook), d, "/")
					location.reload()
				})
				//删除
				$(".operation a").click(function(){
					var index = $(this).prop("id").substr(4);
					var cook = JSON.parse(getCookie("car"))
					cook.splice(index,1);
					console.log(cook)
					var d = new Date;
					d.setDate(d.getDate() + 10);
					setCookie("car", JSON.stringify(cook), d, "/")
					location.reload()
				})
				//删除选中
				$(".delselected").click(function(){
					var cook = JSON.parse(getCookie("car"))
					var $checked = $checkbox.filter(":checked");
					for(var i = $checked.length-1 ; i >=0 ;i--){
						console.log(i)
						console.log($checked.eq(i).parents().parents().siblings(".operation").children("a").prop("id"))
						var index = $checked.eq(i).parents().parents().siblings(".operation").children("a").prop("id").substr(4);
						console.log(index)
						cook.splice(index,1);
					}
					var d = new Date;
					d.setDate(d.getDate() + 10);
					setCookie("car", JSON.stringify(cook), d, "/")
					location.reload()
				})
			}
		}
	})
})(jQuery);