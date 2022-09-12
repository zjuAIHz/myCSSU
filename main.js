var hn = 28
var wn = 60

var width = 10
var distance = 2
var radius = 2
var leftmargin = 10
var topmargin = 10
var divwidth = 718
var divheight = 350
var divradius = 10
var divpadding = 10
var fontsize = 14
var wrapheight = 240
var ceh = 20

var track = ""
var track2 = ""
var track3 = ""
var track4 = ""

var color = 1
var colorSet = ["#ff0000", "#81DAF5", "#ffff66", "#00ff00", "#3366ff", 
				"#ff3399", "#ff9933", "#ffffff", "#808080", "#000000", ""]
var endraw = false
var isFill = false
var downtime = 0
var downarr = new Array(hn*wn)

/*
* {
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
}

body {
	background-color: #81DAF5;
}

/* 文字太近了 *
.styleEditor {
  overflow: auto;
  width: 718px;
  height: 350px;
  border: 1px solid #fff;
  background-color: #fafafa;
  border-radius: 10px;
  font-size: 14px;
  line-height: 1.5;
  padding: 10px;
  margin: 0 auto;
  margin-top: 20px;
}

/* 这些代码颜色都一样。加点儿高亮区别来 *
.token.selector{ color: rgb(240, 150, 66) }
.token.property{ color: rgb(134, 193, 185) }
.token.punctuation{ color: rgb(186, 159, 214) }
.token.number{ color: rgb(240, 150, 66) }
.token.comment{ color: rgb(177,177,177) }

/* 放一个画板 *
.Wrapper {
  width: 738px;
  height: 354px;
  position: relative;
  border: 1px solid;
  border-radius: 10px;
  background-color: #000000;
  margin: 0 auto;
}

.block{
  width: 10px;
  height: 10px;
  border-radius: 2px;
  position: absolute;
  background-color: #7A7A7A;
}

.Xpos1{
	left: 12px;
}
.Ypos1{
	top: 12px;
}
.block_1_1{
	background-color: #7A7A7A;
}

<div class="block Xpos1 Ypos1 block_1_1"></div>

*/

var ratio = 1
var renewchar = 10
var cer = 2

function SetParameter(x, y) {
	if (x >= divwidth+divpadding+20) {
		ratio = 1
	}
	else {
		ratio = x*0.9 / (divwidth+divpadding)
	}

	width *= ratio
	distance *= ratio
	radius *= ratio
	leftmargin *= ratio
	topmargin *= ratio
	divwidth *= ratio
	divheight *= ratio
	divradius *= ratio
	divpadding *= ratio
	fontsize *= ratio
	ceh = (divwidth+2*divpadding)/((cer+1)*colorSet.length+1)
	wrapheight = (wrapheight > y-70-divheight-ceh*(cer+1))?wrapheight:(y-70-divheight-ceh*(cer+1))
}

function ModifyStyle() {
	let i, j;
	let head = ""

	head += "/*\n* Hello, new zjuers!\n* 欢迎来到浙江大学！\n* 这里是计算机学院学生会。\n* 没什么见面礼可送，\n* 那就。。。浅浅写一段代码吧。\n*/\n\n"
	head += "/*\n* 现在这个网页什么都没有，\n* 我们来给它加点东西。\n*/\n\n"

	head += "/* 先给页面加上过渡效果 */\n"
	head += "* {\n  -webkit-transition: all 0.5s;\n  transition: all 0.5s;\n}\n\n"

	head += "/* 再加上一个背景颜色 */\n"
	head += "body {\n  background-color: #81DAF5;\n}\n\n"

	head += "/* 给这个文本框重新排下版 */\n"
	head += ".styleEditor {\n  overflow: auto;\n  width: "+divwidth.toFixed(1)+"px;\n  height: "+wrapheight.toFixed(1)+"px;\n  border: 1px solid #fff;\n  "+
  		"background-color: #fafafa;\n  border-radius: "+divradius.toFixed(1)+"px;\n  font-size: "+fontsize.toFixed(1)+"px;\n  line-height: 1.5;\n  "+
  		"padding: "+divpadding.toFixed(1)+"px;\n  margin: 0 auto;\n  margin-top: 20px;\n}\n\n"

  	head += "/* 给代码加上些高亮，方便阅读 */\n"
  	head += ".token.selector{ color: rgb(240, 150, 66) }\n.token.property{ color: rgb(134, 193, 185) }\n.token.punctuation{ color: rgb(186, 159, 214) }\n"+
		".token.number{ color: rgb(240, 150, 150) }\n.token.comment{ color: rgb(177,177,177) }\n\n"

	head += "/*\n* 好了，\n* 这样看起来不错了。\n* 接下来干什么呢？\n* 嗯。。。\n* 不如给页面加上一块画板。\n*/\n"
	head += ".Wrapper {\n  background-color: #000000;\n  width: "+(divwidth+2*divpadding).toFixed(1)+"px;\n  height: "+divheight.toFixed(1)+"px;\n  position: relative;\n  "+
  		"border: 1px solid;\n  border-radius: "+divradius.toFixed(1)+"px;\n  margin: 0 auto;\n}\n\n"

  	head += "/* 设置一个像素点 */\n"
	head += ".block{\n  width: "+width.toFixed(1)+"px;\n  height: "+width.toFixed(1)+"px;\n  position: absolute;"+
		"\n  background-color: #7A7A7A;\n  left: "+leftmargin.toFixed(1)+"px;\n  top: "+topmargin.toFixed(1)+
		"px;\n  border-radius: "+radius.toFixed(1)+"px;\n}\n\n"

	track = head

	head = "/* 然后把这个像素点复制满整个画板 */\n\n"
	for (i = 0; i < wn; i++) head += ".Xpos"+i+"{left: "+((width+distance)*i+leftmargin).toFixed(1)+"px;}\n"
	for (j = 0; j < hn; j++) head += ".Ypos"+j+"{top: "+((width+distance)*j+topmargin).toFixed(1)+"px;}\n"

	track2 = head

	head = "\n/*\n* 好了，\n* 我们已经有画板了。\n* 现在我们再给它加上一个拾色器。\n*/\n\n"
	head += ".colorEditor{\n  width:  "+(divwidth+2*divpadding).toFixed(1)+"px;\n  height: "+(ceh*(cer+1.0)).toFixed(1)+"px;\n  "+
		"background-color: #ffffff;\n  border-radius: "+divradius.toFixed(1)+"px;\n  margin: 0 auto;\n  margin-top: 20px;\n}\n\n"

	head += "/* 加上颜色 */\n"
	head += ".colorSelector{\n  display: inline-block;\n  width: "+(ceh*cer).toFixed(1)+"px;\n  height: "+(ceh*cer).toFixed(1)+
		"px;\n  margin-left: "+ceh.toFixed(1)+"px;\n  margin-top: "+(0.5*ceh).toFixed(1)+"px;\n  border-radius: 50%;\n}\n\n"
	head += "/* 加上一个按钮 */\n"
	head += ".button{\n  display: inline-block;\n  width: "+(0.6*ceh*cer).toFixed(1)+"px;\n  height: "+(0.6*ceh*cer).toFixed(1)+
		"px;\n  margin-left: "+ceh.toFixed(1)+"px;\n  margin-top: "+(0.5*ceh).toFixed(1)+"px;\n  border-radius: 25%;\n"+
		"  border: "+(0.2*ceh*cer).toFixed(1)+"px solid; \n  border-color: #81DAF5;\n}\n\n"

	head += "/*\n* 现在，\n* 你可以在上面画画了。\n* \n* 点击拾色器中的色块，\n* 可以切换画笔颜色。\n* \n* 如果你已经画好了，\n* 可以点拾色器最右边的方形按钮确认。\n*/"

	track3 = head
}

function LoadFunction() {
	let a = document.getElementById("PageStyle");
	let b = document.getElementById("Wrapper");
	let c = document.getElementById("Code")
	let d = document.getElementById("styleEditor")
	let e = document.getElementById("Color")
	track4 = a.innerHTML;
	a.innerHTML = ""

	console.log(document.body.clientWidth)
	console.log(document.body.clientHeight)
	console.log(document.documentElement.clientWidth)
	console.log(document.documentElement.clientHeight)

	SetParameter(document.documentElement.clientWidth, document.documentElement.clientHeight)
	ModifyStyle();

	for (i = 0; i < wn; i++) {
		for (j = 0; j < hn; j++) {
			b.innerHTML += "<div class=\"block Xpos"+i+" Ypos"+j+" block_"+i+"_"+j+"\" onmouseover=\"SetColor("+i+", "+j+");\" onswipe=\"SetColor("+i+", "+j+");\"></div>\n"
		}
	}

	for (i = 0; i < colorSet.length-1; i++) 
		e.innerHTML += "<div class=\"colorSelector\" style=\"background-color: "+colorSet[i]+"\"  onclick=\"ChangeColor("+i+");\"  ontouchend=\"ChangeColor("+i+");\"></div>"
	e.innerHTML += "<div class=\"button\" onclick=\"DrawFine();\" ontouchend=\"DrawFine();\"></div>"

	DisplayString(track, 50, function(){
		DisplayString(track2, 150, function(){
			DisplayString(track3, 50, function(){endraw = true;}, false)
		}, true)
	}, false)

}

function SetColor(i, j) {
	if (!endraw) return;
	if (!isFill || downarr[j*wn+i] == downtime) return;

	let a = document.getElementById("PageStyle");
	a.innerHTML += ".block_"+i+"_"+j+"{\n\tbackground-color: "+colorSet[color]+";\n}\n"
	downarr[j*wn+i] = downtime
}

function ChangeColor(i) {
	if (!endraw) return;
	color = i;
	let a = document.getElementById("PageStyle");
	a.innerHTML += "body {\n  background-color: "+colorSet[i]+";\n}\n\n"
	a.innerHTML += ".button {\n  border-color: "+colorSet[i]+";\n}\n\n"
}

function BeginFill() {
	if (!endraw) return;
	downtime += 1
	isFill = true
}

function EndFill() {
	if (!endraw) return;
	isFill = false
}

function DrawFine() {
	if (endraw == true) {
		endraw = false
		DisplayString(track4, 50, function(){}, true)
	}
}

function DisplayString(showstr, timer, endf, speed) {
	let a = document.getElementById("PageStyle");
	let c = document.getElementById("Code")
	let d = document.getElementById("styleEditor")

	let tempstr = ""
	let tempint = 0
	let ts2 = ""

	let comment = false
	let inb = false
	let prop = false
	let inprop = false
	let insele = false
	let tracknum = 0

	styletimer = window.setInterval(function(){
		if(tracknum >= showstr.length) {
			clearInterval(styletimer);
			endf();
			return;
		}
		// tempint = showstr.indexOf('\n', tracknum)
		// tempstr = showstr.slice(tracknum, tempint )
		// tempstr += (tempint==-1)?showstr[showstr.length-1]:showstr[tempint]
		tempstr = showstr

		// a.innerHTML += tempstr // track.substr(tracknum, renewchar)
		
		// c.innerHTML += tempstr // track.substr(tracknum, renewchar)
		let num = tracknum
		do {
			if (!comment && num < tempstr.length-1 && tempstr.substr(num, 2) == "/*") {
				// 如果是注释
				c.innerHTML += "<span class=\"token comment\">/*</span>"
				num += 2
				comment = true
			}
			else if (comment && num < tempstr.length-1 && tempstr.substr(num, 2) == "*/") {
				// 如果是注释的出口
				c.innerHTML = c.innerHTML.slice(0, -7) + "*/</span>"
				num += 2
				comment = false
			}
			else if (!comment && !(tt=/[0-9a-zA-Z\s]/).test(tempstr[num])) {
				// 如果是标点符号
				if (tempstr[num] == "{") {
					inb = true
					prop = true
					inprop = false
					insele = false
					// c.innerHTML += "</span>"
				}
				else if (tempstr[num] == "}") {
					inb = false
					prop = false
					inprop = false
				}
				else if (inb && inprop && tempstr[num] == ":") {
					inprop = false
				}
				if (inb && tempstr[num] == ";") {
					// 换行刷新属性变量
					prop = true
					inprop = false
				}

				if (comment || inprop || insele) {
					c.innerHTML = c.innerHTML.slice(0, -7) + "<span class=\"token punctuation\">" 
						+ tempstr[num] + "</span>" + "</span>"
				}
				else {
					c.innerHTML += "<span class=\"token punctuation\">" + tempstr[num] + "</span>"
				}

				if (!inb && tempstr[num] == ".") {
					c.innerHTML += "<span class=\"token selector\"></span>"
					insele = true
				}

				num += 1

			}
			// 已经在标点符号中处理
			// else if () {
			// 	// 如果是选择器
			// }
			else if (!comment && prop && !(tt=/[\s]/).test(tempstr[num])) {
				// 如果是属性
				prop = false
				inprop = true
				c.innerHTML += "<span class=\"token property\">" + tempstr[num] + "</span>"
				num += 1
			}
			else if (!comment && !inprop && tempstr[num] >= '0' && tempstr[num] <= '9') {
				// 如果是数字

				ts2 = "<span class=\"token number\">"
				for (; tempstr[num] >= '0' && tempstr[num] <= '9' || tempstr[num] == '.' ; num++) {
					ts2 += tempstr[num]
				}
				ts2 += "</span>"
				c.innerHTML += ts2
			}
			else {
				// 其他
				if (inb && tempstr[num] == "\n") {
					// 换行刷新属性变量
					prop = true
					inprop = false
				}

				if (comment || inprop || insele) {
					c.innerHTML = c.innerHTML.slice(0, -7) + tempstr[num] + "</span>"
				}
				else {
					c.innerHTML += tempstr[num]
				}
				num += 1
			}
		}while(speed && !comment && num < tempstr.length && tempstr[num-1] != '\n')
		
		a.innerHTML += tempstr.slice(tracknum, num)
		d.scrollTop = d.scrollHeight
		tracknum = num
	}, timer)
}

