;
(function($) {
	// 给插件添加帐号验证
	jQuery.validator.addMethod("isId", function(value, element) {
		var length = value.length;
		var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
		var email = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
		return this.optional(element) || (length == 11 && mobile.test(value) || email.test(value));
	}, "请正确填写您的手机号码或邮箱");
	// ~密码验证
	jQuery.validator.addMethod("isPwd", function(value, element) {
		var length = value.length;
		var password = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,20}$/;
		return this.optional(element) || (length >= 6 && length <= 20 && password.test(value));
	}, "请正确填写密码");
	//验证用户名是否已注册
	jQuery.validator.addMethod("isReg", function(value, element) {
		return this.optional(element)||(!getCookie(value));
	}, "用户名已注册");
	$(function() {
		//插件调用
		$("#registerform").validate({
				rules: {
					id: {
						required: true,
						isId: true,
						isReg:true
					},
					pwd: {
						required: true,
						isPwd: true
					},
					pwd2: {
						required: true,
						equalTo: "#pwd"
					},
					yzm: {
						required: true
					},
					agree: {
						required: true
					}
				},
				messages: {
					id: {
						required: "请输入帐号"
					},
					pwd: {
						required: "请输入密码"
					},
					pwd2: {
						required: "请输入确认密码",
						equalTo: "两次密码不一致，请重新输入"
					},
					yzm: {
						required: "请输入验证码"
					},
					agree: {
						required: "必须同意"
					}
				}
			})
			//解锁确认密码
		$("#pwd").blur(function() {
				var password = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,20}$/;
				var p = $("#pwd").val();
				if(p.length >= 6 && p.length <= 20 && password.test(p)) {
					//						console.log("密码合格")
					$("#pwd2").prop("disabled", false);
				} else {
					//						console.log("密码no合格")
					$("#pwd2").prop("disabled", "disabled");
				}
			})
			//解锁提交按钮
		$("#agree").blur(function() {
			var r = $("#registerform").validate().form();
			if(r) {
				//						console.log("验证成功")
				$("#registerbtn").prop("disabled", false).attr("style", "background: #E40011");
			} else {
				//						console.log("验证失败")
				$("#registerbtn").prop("disabled", "disabled").attr("style", "background: rgb(221,221,221)");

			}
		})
		//提交按钮函数 添加cookie
		$("#registerbtn").click(function() {
			var d = new Date;
			d.setDate(d.getDate() + 10);
			var ID = $("#id").val();
			var PWD = $("#pwd").val();
			setCookie(ID,PWD, d,"/");
			alert("注册成功");
			
		})
	})
})(jQuery);