'use strict';

(function (Global) {
	$.extend({
		survey: function survey(ops) {
			var title = ops.ele;
			var id = ops.submit;
			var name = ops.name;
			// let form = ops.form;

			var html = '<div class="questions">';
			html += '<div class="choose">';
			html += '	<button type="button" data-type = "1" class="check">单选</button>';
			html += '	<button type="button" data-type = "2" >多选</button>';
			html += '</div>';
			html += '<input type="text" style="display: none;" name="choose" value="1" class="chooseValue"/>';
			html += '<div style="display: flex;justify-content: space-between;"><input type="text" name="title" placeholder="问题内容" /><button type="button" class="delTitle">删除</button></div>';
			html += '<div class="content">';
			html += '<div><b class="leg-question-num">A:</b><div style="display: flex;justify-content: space-between;"><input type="text" name="content" placeholder="选项内容" /><button type="button" class="delContent">删除</button></div></div>';
			html += '</div>';
			html += '<div class="question">';
			html += '<button type="button" class="addQuestion">添加问题</button>';
			html += '<button type="button" class="addContent">添加选项</button>';
			html += '</div>';
			html += '</div>';

			function AZ() {
				var arr = [];
				for (var i = 65; i < 91; i++) {
					if (i > 90 && i < 97) {
						continue;
					}
					// 接受一个指定的 Unicode 值，然后返回一个字符串
					arr.push(String.fromCharCode(i));
				}
				return arr;
			}
			var arr = AZ();

			$(title).on("click", ".choose button", function () {
				// let arr = $(this).parent().find('button');
				// arr[0].className = "";
				// arr[1].className = "";
				// $(this)[0].className = "check";
				$(this).addClass("check").siblings().removeClass("check");
				$(this).parent().parent().find(".chooseValue").val($(this).attr("data-type"));
			});
			$(html).appendTo($(title));

			var num = 0;
			$(title).on("click", ".addQuestion", function () {
				$(html).appendTo($(this).parent().parent().parent());
			});

			//删除选项  无需判断是否为最后一条  排序 A B C
			$(title).on("click", ".delContent", function () {
				var temp = $(this).parents(".questions");
				$(this).parent().parent().remove();
				temp = $(temp).find(".leg-question-num");
				for (var i = 0; i < temp.length; i++) {
					$(temp[i]).html(arr[i] + ":");
				}
			});

			//删除题目  需判断是否为最后一条
			$(title).on("click", ".delTitle", function () {
				if ($(this).parent().parent().parent().children("div").length > 1) {
					$(this).parent().parent().remove();
				}
			});

			$(title).on("click", ".addContent", function () {
				var num = $(this).parent().prev().find("input").length;
				$('<div><b class="leg-question-num">' + arr[num] + ':</b><div style="display: flex;justify-content: space-between;"><input type="text" name="content" placeholder="选项内容" /><button type="button" class="delContent">删除</button></div></div>').appendTo($(this).parent().parent().find(".content"));
			});

			$(id).on("click", function () {
				$("." + name + 1).remove(); //需先删除

				var result = $($(title).parent('form')).serializeArray();
				var x = 0;
				var params = [];
				var temp = []; //children数据
				for (var i = 0; i < result.length; i++) {
					if (result[i].name == "title") {
						x++;
						var _title = {};
						_title.title = result[i].value;
						_title.num = result[i - 1].value;
						_title.children = [];
						params.push(_title);
						temp = [];
					} else if (x > 0) {
						params[x - 1].children.push(result[i].value);
					}
				}
				$(title).append('<input type="hidden" class="' + name + 1 + '" name="' + name + '"/>');
				$("." + name + 1).val(JSON.stringify(params));
				var MyData = $($(title).parent('form')).serializeArray();
				var x = 0; //判断有多好个name是有值的
				for (var i = 0; i < MyData.length; i++) {
					if (MyData[i].name == 'title') {
						delete MyData[i];
						MyData.length - 1;
					} else if (MyData[i].name == 'choose') {
						delete MyData[i];
						MyData.length - 1;
					} else if (MyData[i].name == 'content') {
						delete MyData[i];
						MyData.length - 1;
					} else {
						x++;
					}
				}
				MyData.sort();
				MyData.length = x;
				ops.getData(MyData);
			});
		},
		result: function result() {}
	});

	Global.leg = Global.$ = $;
})(window);
