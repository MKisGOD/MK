;
(function($) {
	$(function() {
		//判断是否有记住用户名
		var oid = getCookie("oid");
		if (oid) {
			$("#ID").val(oid);
		} else {
			console.log("空coo")
		}
		//提交按钮
		$("#lgbtn").click(function() {
			var id = $("#ID").val();
			var pwd = $("#PWD").val();
			var opwd = getCookie(id);
			if (opwd == "") {
				//					location.href="../../index.html";
				alert("请输入正确帐号")
				location.reload()

			} else {
				if (opwd == pwd) {
					var d = new Date;
					d.setDate(d.getDate() + 7);
					setCookie("username", id, d, "/");
					//记住用户名
					if ($("#rmb").is(':checked')) {
						var d = new Date;
						d.setDate(d.getDate() + 7);
						setCookie("oid", id, d);
					}
					alert("登录成功");
					location.href = "../index.html";
				} else
					{
						alert("密码错误");
						location.reload()
					}
			}
		})
	})
})(jQuery);