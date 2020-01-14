((Global)=>{
	
	$.extend({
		leg_select : function(ops){
			
			var html = `<input id="leg_select" name="${ops.name}" type="hidden" />
						<div id="leg-select">
							<div class="leg-select-head">
								<span class="leg-back"><a><</a></span>
								<span>选择</span>
								<span class="leg-close">x</span>
							</div>
						<ul class="leg-souce"> </ul>
						</div>`;
					
					
	
			console.log(ops)
			var data = ops.data;
			var id = ops.id;
			$(id).after(html);
			$.each(data,function(i,list1){
				$(".leg-souce").append('<li class="leg-ellipsis">'
					+'<a value="'+list1.value+'">'+list1.text+'</a>'
					+'<ul class="leg-souce-children '+list1.value+'">'
					+'</ul>'
				+'</li>');
				if(list1.children.length!=0){
					$.each(list1.children,function(i,list2){
						$("."+list1.value).append('<li class="leg-ellipsis">'
							+'<a value="'+list2.value+'">'+list2.text+'</a>'
						+'</li>');
					});
				}else{
					$("."+list1.value).append('<li>'
							+'<a value="">无内容</a>'
						+'</li>');
				}
			});
			//结果一样
			/*$.each(data,function(i,list){
				console.log(1)
				$(".leg-souce").append('<li>'
					+'<a value="'+data[i].value+'">'+data[i].text+'</a>'
					+'<ul class="leg-souce-children">'
					+'</ul>'
				+'</li>')
				if(data[i].children.length>2){
					$.each(data[i].children,function(j,list){
						$(".leg-souce-children").append('<li>'
							+'<a value="'+data[i].children[j].value+'">'+data[i].children[j].text+'</a>'
						+'</li>')
					})
				}
			})*/
			
			$(id).on("click",function(){
				$("#leg-select").show();
				$(".leg-back a").hide();
				$("#leg-select ul li ul").hide();
				$("body").append("<div class='leg-shade'></div>")
			});
	
			$(".leg-back").on("click",function(){
				$(".leg-back a").hide();
				$("#leg-select").show();
				$("#leg-select ul li ul").hide();
			});
			
			$(".leg-close").on("click",function(){
				$("#leg-select").hide();
				$(".leg-shade").remove();
			});
			
			$(".leg-souce").on("click","li",function(e){
				var id1 = $(this).children('a').attr("value");
				var souce1 = $(this).children('a').html();
				
				$(this).children("ul").show();
				$(".leg-back a").show();
				$(this).parent().scrollTop(0);
				e.stopPropagation();
				$(".leg-souce-children").on("click","li",function(e){
					var id2 = $(this).children('a').attr("value");
					var souce2 = $(this).children('a').html();
					$(id).val(souce1+"-"+souce2)
					$("#leg_select").val(id1+","+id2)
					$("#leg-select").hide();
					$(".leg-shade").remove();
					e.stopPropagation();
				});
			});
		}
	});
	
	Global.leg = Global.$ = $
})(window)
