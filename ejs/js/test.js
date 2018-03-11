;
(function(win, $) {
	var artTpl = function() {
		
		$.ajax({
			type: "get",
			url: "two.html",
			async: true,
			success: function(res) {
				var data = {
					title: res,
					name: "yqf",
					age: 111111
				};
				var tplHtml = template("testData", data);
				$("#testDiv").html(tplHtml);
			}
		});

		var data2 = {
			title: "<p style='font-size:18px;font-weight:bold;'>2.遍历和使用#转义（默认不转义）</p>",
			// food: ["apple", "banana", "orange"]
			food: [{
				apple: "apples",
				banana: "banana612313131325156"
			}, {
				banana: "banana612313131325156"
			}, {
				orange: "orange"
			}]
		};

		var tplHtml2 = template("testData2", data2);
		$("#testDiv2").html(tplHtml2);

		var data3 = {
			title: "<p style='font-size:18px;font-weight:bold;'>3.条件判断，在表达式里使用js方法</p>",
			flag: Math.random(1)
		};

		var tplHtml3 = template("testData3", data3);
		$("#testDiv3").html(tplHtml3);

		//自定义辅助方法
		var data4 = {
			title: "<p style='font-size:18px;font-weight:bold;'>4.自定义辅助方法,加减乘除</p>",
			a: 9,
			b: 5
		};

		template.helper("plus", function(a, b) {
			return a + b;
		});
		template.helper("multiply", function(a, b) {
			return a * b;
		});

		var tplHtml4 = template("testData4", data4);
		$("#testDiv4").html(tplHtml4);

		//一般不用template.compile(source, options)和 template.render(source, options)
		//直接使用template(id, data)渲染模板
		var source = '<ul>' + '{{each list as value i}}' + '<li>索引 {{i + 1}} ：{{value}}</li>' + '{{/each}}' + '</ul>';
		var options = {
			list: ['摄影', '电影', '民谣', '旅行', '吉他']
		};
		var render = template.compile(source);
		var html = render(options);
		console.log(html);

	};
	$(function() {
		artTpl();
	});
})(window, jQuery);