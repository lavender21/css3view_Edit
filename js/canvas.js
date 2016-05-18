/*****************************canvas绘图************************************
*                                                                          *
* canvas  	 绘制贝塞尔曲线的画布                                          *
* ctxt    	 画布对象                                                      *
* point   	 点对象，存放绘制贝塞尔曲线的四个点，起点终点，两个控制点      *
* style   	 样式对象，存放贝塞尔曲线的样式，点的颜色宽度，线的颜色宽度    *
* drag      标志位，存放当前拖动的点。                                     *
* dPoint  	 中转值，暂时存放鼠标上一个位置坐标                            *
* bezier[]  数组，存放贝塞尔曲线的四个值                                   *
* parr[]    数组，存放缩小后的坐标值                                       *
*                                                                          *
***************************************************************************/

	//初始化绘图
	var canvas = document.getElementById('canvas');

	var ctxt = canvas.getContext("2d");
	var point,style,drag=null,dPoint;
	var bezier = new Array(4);
	var parr = new Array(4);

	//绘图
	setStyle();


	//初始化曲线的样式,设置起点终点
	function setStyle(){
		//设置起点终点，调整点
		point = {
			strp:{x:10,y:350}, 
			endp:{x:310,y:50},  
			setp1:{x:60,y:200}, 
			setp2:{x:280,y:200} 
		}

		//设置曲线，控制线，点的默认样式
		style = { 
			curves:{width:6,color:"#000"},  
			line:{width:2,color:"#333"},
			point:{radius:10,width:2,color:"#f0f",fill:"#ff6699",arc1:0,arc2:2*Math.PI},
			spCur:{width:2,color:"#fff"},
			spLine:{width:1,color:"rgba(255,255,255,1)"},
			spPoint:{radius:2,width:1,color:"#ccc",fill:"rgba(255,255,255,1)",arc1:0,arc2:2*Math.PI}
		}

		//设置线条默认样式
		ctxt.lineCap = "round";
		ctxt.lineJoin = "round";

		//拖动效果
		canvas.onmousedown = Startmove; 
		canvas.onmousemove = Move;
		canvas.onmouseup = Endmove;

		DrawCanvas();
	}

	//画图(贝塞尔曲线)
	function DrawCanvas(){

		ctxt.clearRect(0,0,800,600);
		//划辅助线
		ctxt.beginPath();
		ctxt.moveTo(point.setp1.x,point.setp1.y);
		ctxt.lineTo(point.strp.x,point.strp.y);
		ctxt.lineTo(point.endp.x,point.endp.y);
		ctxt.lineTo(point.setp2.x,point.setp2.y);

		ctxt.lineWidth = style.line.width;
		ctxt.strokeStyle = style.line.color;
		ctxt.stroke();

		ctxt.beginPath();
		ctxt.moveTo(point.strp.x,50);
		ctxt.lineTo(point.strp.x,point.strp.y);
		ctxt.lineTo(310,point.strp.y);

		ctxt.lineWidth = 1;
		ctxt.strokStyle = "#000";
		ctxt.stroke();

		//画曲线
		ctxt.beginPath();
		ctxt.moveTo(point.strp.x,point.strp.y);
		ctxt.bezierCurveTo(point.setp1.x,point.setp1.y,point.setp2.x,point.setp2.y,point.endp.x,point.endp.y);

		ctxt.lineWidth = style.curves.width;
		ctxt.strokeStyle = style.curves.color;
		ctxt.stroke();

		//画点
		for (var item in point){
			ctxt.lineWidth = style.point.width;
			ctxt.strokStyle = style.point.color;
			ctxt.fillStyle = style.point.fill;
			ctxt.beginPath();
			ctxt.arc(point[item].x,point[item].y,style.point.radius,style.point.arc1,style.point.arc2,true);

			ctxt.fill();
			ctxt.stroke();
		}

		//改变贝塞尔曲线设置值
		changeCode();
		//绘画红色滑块中的曲线
		DrawSport();
	}

	//绘画滑块中的贝塞尔曲线
	function DrawSport(){
		var scal = 7.5;  //用于倍率换算
		var canSport1 = document.getElementById('sport1');
		var ctxt_sp1 = canSport1.getContext('2d');
		ctxt_sp1.clearRect(0,0,50,50);

		//画辅助线
		ctxt_sp1.beginPath();
		ctxt_sp1.moveTo(point.setp1.x/scal,point.setp1.y/scal);
		ctxt_sp1.lineTo(point.strp.x/scal,point.strp.y/scal);
		ctxt_sp1.moveTo(point.endp.x/scal,point.endp.y/scal);
		ctxt_sp1.lineTo(point.setp2.x/scal,point.setp2.y/scal);

		ctxt_sp1.strokeStyle = style.spLine.color;
		ctxt_sp1.lineWidth = style.spLine.width;
		ctxt_sp1.stroke();

		//画贝塞尔曲线
		ctxt_sp1.beginPath();
		ctxt_sp1.moveTo(point.strp.x/scal,point.strp.y/scal);
		ctxt_sp1.bezierCurveTo(point.setp1.x/scal,point.setp1.y/scal,point.setp2.x/scal,
			point.setp2.y/scal,point.endp.x/scal,point.endp.y/scal);

		ctxt_sp1.strokStyle = style.spCur.color;
		ctxt_sp1.lineWidth = style.spCur.width;
		ctxt_sp1.stroke();

		//画点
		for(var p in point)
		{	
			ctxt_sp1.strokStyle = style.spPoint.color;
			ctxt_sp1.fillstyle = style.spPoint.fill;
			ctxt_sp1.lineWidth = style.spPoint.width;
			ctxt_sp1.beginPath();
			ctxt_sp1.arc(point[p].x/scal,point[p].y/scal,style.spPoint.radius,
				style.spPoint.arc1,style.spPoint.arc2,true);

			ctxt.fill();
			ctxt.stroke();
		}
	}

	//绘画对比的滑块贝塞尔曲线
	function DrawSport2(point){
		var scal = 2;  //用于倍率换算
		var canSport1 = document.getElementById('sport2');
		var ctxt_sp1 = canSport1.getContext('2d');
		ctxt_sp1.clearRect(0,0,50,50);

		//画辅助线
		ctxt_sp1.beginPath();
		ctxt_sp1.moveTo(point.set1.x/scal,point.set1.y/scal);
		ctxt_sp1.lineTo(point.star.x/scal,point.star.y/scal);
		ctxt_sp1.moveTo(point.end.x/scal,point.end.y/scal);
		ctxt_sp1.lineTo(point.set2.x/scal,point.set2.y/scal);

		ctxt_sp1.strokeStyle = style.spLine.color;
		ctxt_sp1.lineWidth = style.spLine.width;
		ctxt_sp1.stroke();

		//画贝塞尔曲线
		ctxt_sp1.beginPath();
		ctxt_sp1.moveTo(point.star.x/scal,point.star.y/scal);
		ctxt_sp1.bezierCurveTo(point.set1.x/scal,point.set1.y/scal,point.set2.x/scal,
			point.set2.y/scal,point.end.x/scal,point.end.y/scal);

		ctxt_sp1.strokStyle = style.spCur.color;
		ctxt_sp1.lineWidth = style.spCur.width;
		ctxt_sp1.stroke();

		//画点
		for(var p in point)
		{	
			ctxt_sp1.strokStyle = style.spPoint.color;
			ctxt_sp1.fillstyle = style.spPoint.fill;
			ctxt_sp1.lineWidth = style.spPoint.width;
			ctxt_sp1.beginPath();
			ctxt_sp1.arc(point[p].x/scal,point[p].y/scal,style.spPoint.radius,
				style.spPoint.arc1,style.spPoint.arc2,true);

			ctxt.fill();
			ctxt.stroke();
		}
	}

	// 选中拖动点
	function Startmove(e) {
		e = MousePos(e);  //获取鼠标位置
		var dx,dy;   //计算鼠标与拖动点圆心位置

		//设置鼠标为手型
		canvas.style.cursor = "pointer";

		//遍历一遍四个点，找出当前选中的拖动点
		for(var p in point)
		{
			//只拖动两个拖动点，不动起始点
			if(p == "setp1" || p == "setp2")
			{
				dx = Math.abs(point[p].x - e.x);
				dy = Math.abs(point[p].y - e.y);

				//如果鼠标位置在拖动点的范围内，就拖动该点
				if(dx < style.point.radius && dy < style.point.radius)
				{
					drag = p;  //drag存放当前拖动点
					dPoint = e;  //存取鼠标的位置,作为拖动的起始点
					return;
				}
			}
		}
	}
	
	// 拖动
	function Move(e) {

		//如果当前选中拖动点则该点根据鼠标移动
		if(drag)
		{
			e = MousePos(e);
			point[drag].x += e.x - dPoint.x;
			point[drag].y += e.y - dPoint.y;
			dPoint = e;
			DrawCanvas();
		}
		
	}
	
	// 鼠标松开
	function Endmove(e) {
		drag = null;
		DrawCanvas();

		canvas.style.cursor = "default";
	}

	// 获取鼠标位置坐标
	function MousePos(e) {
		var event = e||event;
		return {
			x: event.clientX - canvas.offsetLeft,
			y: event.clientY - canvas.offsetTop
		}
	}

	//改变贝塞尔曲线设置值
	function changeCode(){
		var oSpan = document.getElementsByClassName('val');
		setCode();
		//将数值转换为0~1范围并保留两位小数
		for(var i=0;i<4;i++)
		{
			oSpan[i].innerHTML = bezier[i];
		}
	}

	//获取贝塞尔曲线的值以及设置贝塞尔曲线点的坐标用于存储与绘画
	function setCode(){

		//将坐标值转换为贝塞尔值
		bezier[0] = ((point.setp1.x-10)/300).toFixed(2);
		bezier[1] = (Math.abs(point.setp1.y-350)/300).toFixed(2);
		bezier[2] = ((point.setp2.x-10)/300).toFixed(2);
		bezier[3] = (Math.abs(point.setp2.y-350)/300).toFixed(2);

		//将坐标值缩小一定倍数存放在数组parr中
		parr[0] = Math.round(point.setp1.x/3.75);
		parr[1] = Math.round(point.setp1.y/3.75);
		parr[2] = Math.round(point.setp2.x/3.75);
		parr[3] = Math.round(point.setp2.y/3.75);

	}