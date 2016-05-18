/*********************************生成css代码*******************************
*                                                                          *
* content  	 存放生成曲线的块                                              *
* canv    	 曲线块                                                        *
* del   	 删除按钮集合                                                  *
* pname   	 曲线名称集合                                                  *
* add     	 保存按钮                                                      *
* speed  	 运动速度                                                      *
* temp 		 存放当前选中的对象                                            *
*                                                                          *
***************************************************************************/
	var content = document.getElementsByClassName('content')[0];
	var canv = content.getElementsByClassName('paint'); 
	var del = content.getElementsByClassName('del');  
	var pname = content.getElementsByClassName('pname'); 
	var add = document.getElementById('save');  
	var speed = document.getElementById('secd');


	//初始状态下默认第一个是激活的
	var temp=canv[0];  //存放激活的块
	canv[0].style.background = "rgba(0,170,188,1)";


	//保存
	add.onclick = save;

	//事件委托
	content.onmouseover = function(e){
		var ev = e||event;
		var target = ev.target || ev.srcElement;
		if(target.className.toLowerCase() == "paint")
		{
			fade(target);
		}
		else if(target.className.toLowerCase() == "del")
		{
			fadeIn(target);
		}
		else
		{
			fadeOut2();
		}
	}

	content.onmouseout = function(e){
		var ev = e||event;
		var target = ev.target || ev.srcElement;
		if(target.className.toLowerCase() == "del")
		{
			fadeOut(target);
		}
	}

	content.onclick = function(e){
		var ev = e||event;
		var target = ev.target || ev.srcElement;
		if(target.className.toLowerCase() == "paint")
		{
			select(target);
		}
		else if(target.className.toLowerCase() == "del")
		{
			Delete(target);
		}
		else
		{
			target.children[getIndex(temp)].children[0].style.display = "none";
			return false;
		}
		//return false;
	}



	//淡入淡出函数
	function fade(obj){
		
		if(obj!=temp)
		{
			//设置当前hover块的样式
			obj.style.background = "rgba(0,170,188,0.4)";
			obj.style.cursor = "pointer";
			obj.parentNode.children[0].style.display = "block";
			obj.title = saveCanv[getIndex(obj)].name;
		}
	}
	function fadeOut2(){
		for(var i=0;i<canv.length;i++){
			if(canv[i] != temp)
			{
				canv[i].style.background = "rgba(210,210,210,0.6)";
				canv[i].parentNode.children[0].style.display = "none";
			}
		}
	}

	//淡入淡出函数
	function fadeIn(obj){

		obj.style.background = "rgba(255,102,153,1)";
		obj.style.cursor = "pointer";
	}
	function fadeOut(obj){

		obj.style.background = "rgba(0,0,0,1)";
		obj.style.cursor = "default";
	}

	//点击函数
	function select(obj){
		//将其他块的样式恢复
		for(var i=0;i<canv.length;i++)
		{
			canv[i].style.background = "rgba(210,210,210,0.6)";
			del[i].style.display = "none";
		}
		//设置当前选中块样式
		obj.style.background = "rgba(0,170,188,1)";
		obj.parentNode.children[0].style.display = "block";

		//绘画对比滑块
		DrawSport2(saveCanv[getIndex(obj)].paint);
		temp = obj;
	}

	//删除函数
	function Delete(obj){

		if(confirm("确认要删除吗？"))
		{
			var i = getIndex(obj.parentNode.children[1]);
			if(i == -1)
			{
				alert("删除失败!");
			}
			else
			{
				saveCanv.splice(i,1);

				//如果当前块是选中块删除过后默认第一个为选中块
				if(temp == obj.parentNode.children[1])
				{
					temp=canv[0];  //存放激活的块
					canv[0].style.background = "rgba(0,170,188,1)";
				}

				content.removeChild(obj.parentNode);
			}
			
		}

	}

	//保存
	function save(){

		var name =
		prompt("If you want,you can give it a short name:",
			bezier);
		if(name != null)
		{
			createcanv(bezier,name);
		}
		
	}

	//新增结点
	function createcanv(val,Name){

		var oSpan = document.createElement('span');
		var oSpan2 = document.createElement('span');
		var oDiv = document.createElement('div');
		var oCanv = document.createElement('canvas');

		oDiv.appendChild(oSpan);
		oDiv.appendChild(oCanv);
		oDiv.appendChild(oSpan2);
		content.appendChild(oDiv);

		oSpan.className = "del";
		oSpan2.className = "pname";
		oDiv.className = "canv";
		oCanv.className = "paint";
		oCanv.width = 100;
		oCanv.height = 100;
		oSpan.innerHTML = "x";
		oSpan2.innerHTML = Name;

		var newPoint = creatPoint(val,Name);
		saveCanv.push(newPoint);
		drawE_I(oCanv,newPoint.paint,"#000");
		
	}

	//绘画导出导入的贝塞尔曲线图
	function drawE_I(obj,cpPoint,color){
		//var scal = 2;  //用于倍率换算
		var ctxt_demo = obj.getContext('2d');
		ctxt_demo.clearRect(0,0,100,100);

		//画辅助线
		ctxt_demo.beginPath();
		ctxt_demo.moveTo(cpPoint.star.x,cpPoint.star.y);
		ctxt_demo.lineTo(cpPoint.set1.x,cpPoint.set1.y);
		ctxt_demo.moveTo(cpPoint.end.x,cpPoint.end.y);
		ctxt_demo.lineTo(cpPoint.set2.x,cpPoint.set2.y);

		ctxt_demo.strokeStyle = "rgba(0,0,0,1)";
		ctxt_demo.lineWidth = 1;
		ctxt_demo.stroke();

		//画贝塞尔曲线
		ctxt_demo.beginPath();
		ctxt_demo.moveTo(cpPoint.star.x,cpPoint.star.y);
		ctxt_demo.bezierCurveTo(cpPoint.set1.x,cpPoint.set1.y,cpPoint.set2.x,
			cpPoint.set2.y,cpPoint.end.x,cpPoint.end.y);

		ctxt_demo.strokStyle = color;
		ctxt_demo.lineWidth = 3;
		ctxt_demo.stroke();

		//画点
		for(var p in cpPoint)
		{	
			ctxt_demo.strokStyle = color;
			ctxt_demo.fillstyle = color;
			ctxt_demo.lineWidth = 2;
			ctxt_demo.beginPath();
			ctxt_demo.arc(cpPoint[p].x,cpPoint[p].y,2,
				style.spPoint.arc1,style.spPoint.arc2,true);

			ctxt.fill();
			ctxt.stroke();
		}
	}

	//创建新图结点
	function creatPoint(val,Name){
		
		return {
			name:Name,
			paint:{   
			star:{x:10,y:90},
			end:{x:90,y:10},
			set1:{x:parr[0],y:parr[1]},
			set2:{x:parr[2],y:parr[3]}
			},
			bezier:val.toString()
		};
	}

	//得到当前选中元素的序号
	function getIndex(obj){
		//查找当前选中的元素
		for(var i=0;i<canv.length;i++)
		{
			if(obj == canv[i])
			{	
				return i;
			}
		}
		return -1;
	}