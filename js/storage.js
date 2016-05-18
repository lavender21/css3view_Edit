/******************************css代码的导入导出****************************
*                                                                          *
* wid  	 	  弹出框                                                       *
* impt    	  导入按钮                                                     *
* expt   	  导出按钮                                                     *
* close   	  关闭弹出框按钮                                               *
* impt_exe    执行导入函数                                                 *
* saveCanv[]  数组，存放保存的曲线数据                                     *
* txt_code    导入导出的代码文本                                           *
*                                                                          *
***************************************************************************/
	var wid = document.getElementById('wid');   
	var impt = document.getElementById('import'); 
	var expt = document.getElementById('export'); 
	var close = document.getElementById('close');
	var impt_exe = document.getElementById('impt');  
	var txt_code = document.getElementById('txt_code'); 

	var saveCanv = new Array();

	//设初值
	InitValue();

	//绘画已存在的曲线图
	for(var i=0;i<saveCanv.length;i++){
		if(saveCanv[i].name != "cpPoint")  //代表还未添加的图
		{
			drawE_I(canv[i],saveCanv[i].paint,"#000");
			pname[i].innerHTML = saveCanv[i].name;
		}
	}
	//绘画对比块中的曲线图
	DrawSport2(saveCanv[getIndex(temp)].paint);

	//导入
	impt.onclick = function(){

		impt_exe.style.display = "inline-block";
		close.className = "";
		txt_code.value = "";

		wid.children[0].style.display = "block";
		wid.children[1].style.display = "none";
		wid.style.display = "block";

	}
	//导出
	expt.onclick =function(){

		//生成css代码
		txt_code.value = "";
		if(printCSS() == -1)
		{
			alert("you don't chose any curve!please chose one");
			return;
		}

		wid.children[1].style.display = "block";
		wid.children[0].style.display = "none";

		close.className = "close";
		impt_exe.style.display = "none";
		wid.style.display = "block";

	}

	//生成曲线图
	impt_exe.onclick = function(){

		if(txt_code.value != "")
		{
			
			//以json的形式传入
			try
			{
				var val = JSON.parse(txt_code.value)
				getPoint(val);		
			}
			catch(error)
			{
				alert('输入格式错误，请按json格式输入eg:{"name":"bezier"}');
				return;
			}
			
		}
		else
		{
			alert("输入为空!");
		}
		
	}

	//关闭弹出框
	close.onclick = function(){

		wid.style.display = "none";
		wid.children[0].style.display = "none";
		wid.children[1].style.display = "none";

	}

	//初始化数组的值
	function InitValue(){

		saveCanv[0] = {
			name:"ease",
			paint:{
			star:{x:10,y:90},
			end:{x:90,y:10},
			set1:{x:Math.round(85/3.75+10),y:Math.round(318/3.75)},
			set2:{x:Math.round(85/3.75),y:Math.round(50/3.75)}
			},	
			bezier:".25,.1,.25,1"
		};
		saveCanv[1] = {
		    name:"linear",
		    paint:{
			star:{x:10,y:90},
			end:{x:90,y:10},
			set1:{x:10,y:90},
			set2:{x:90,y:10}
			},
			bezier:"0,0,1,1"
		};
		saveCanv[2] = {
		    name:"ease-in",
		    paint:{
			star:{x:10,y:90},
			end:{x:90,y:10},
			set1:{x:Math.round(135/3.75+10),y:Math.round(350/3.75)},
			set2:{x:90,y:10}
			},
			bezier:".42,0,1,1"
		};
		saveCanv[3] = {
		    name:"ease-in-out",
		    paint:{
			star:{x:10,y:90},
			end:{x:90,y:10},
			set1:{x:Math.round(135/3.75+10),y:Math.round(350/3.75)},
			set2:{x:Math.round(182/3.75),y:Math.round(48/3.75)}
			},
			bezier:".42,0,.58,1"

		};
	}

	//生成css代码
	function printCSS(){

		var i = getIndex(temp);
		if(i == -1)
		{
			return -1;
		}
		else
		{
			//生成该元素的css代码	
		txt_code.value = "div{"+
		"-webkit-transition:all 2s cubic-bezier("+saveCanv[i].bezier+"); "
		+"transition:all 2s cubic-bezier("+saveCanv[i].bezier+");}";
		}
		
	}

	//根据贝塞尔值获得坐标点
	function getPoint(json){

		for(var name in json)
		{
			var arr = json[name].split(',');

			parr[0] = Math.round((arr[0]*300+20)/3.75);
			parr[1] = Math.round((350-arr[1]*300)/3.75);
			parr[2] = Math.round((arr[2]*300+20)/3.75);
			parr[3] = Math.round((350-arr[3]*300)/3.75);

			createcanv(json[name],name);

		}
	
 	}