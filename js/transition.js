/*********************************控制页面css3运动效果**********************
*                                                                          *
* go 	 点击运动按钮                                                      *
* range  滚动条                                                            *
* sec    滚动条滚动数值显示                                                *
*                                                                          *
***************************************************************************/


	//设置运动
	var go = document.getElementById('go');
	go.onclick = Gosport;

	//设置滚动条
	var range = document.getElementById('rag');
	range.onchange = function(){
		var sec = document.getElementById('secd');
		sec.innerHTML = range.value;
	}


	//测试运动函数
	function Gosport(){
		//获取两个运动滑块
		var mod = document.getElementById('mod');
		var mod2 = document.getElementById('mod_two');

		//设置运动状态
		mod.style.transition = "all "+range.value+"s cubic-bezier("+
			bezier.toString()+")";
		
		mod2.style.transition = "all "+range.value+"s cubic-bezier("+
			saveCanv[getIndex(temp)].bezier.toString()+")";

		//判断运动位置
		if(mod.offsetLeft == "0" && mod2.offsetLeft == "0")
		{
			mod.style.left = 400+'px';
			mod2.style.left = 400+'px';
		}
		else if(mod.offsetLeft == "400" && mod2.offsetLeft == "400")
		{
			mod.style.left = 0+'px';
			mod2.style.left = 0+'px';
		}
	}


	
		

