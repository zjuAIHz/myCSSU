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
var wrapheight = 350

var track = ""
var tracknum = 0

/*
* {
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
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
	wrapheight = (wrapheight > y-50-divheight)?wrapheight:(y-50-divheight)
}

function ModifyStyle() {
	let i, j;
	let head = ""

	head += "* {\n  -webkit-transition: all 0.5s;\n  transition: all 0.5s;\n}\n\n"
	head += ".styleEditor {\n  overflow: auto;\n  width: "+divwidth.toFixed(1)+"px;\n  height: "+wrapheight.toFixed(1)+"px;\n  border: 1px solid #fff;\n  "+
  		"background-color: #fafafa;\n  border-radius: "+divradius.toFixed(1)+"px;\n  font-size: "+fontsize.toFixed(1)+"px;\n  line-height: 1.5;\n  "+
  		"padding: "+divpadding.toFixed(1)+"px;\n  margin: 0 auto;\n  margin-top: 20px;\n}\n\n"
  	head += ".token.selector{ color: rgb(240, 150, 66) }\n.token.property{ color: rgb(134, 193, 185) }\n.token.punctuation{ color: rgb(186, 159, 214) }\n"+
		".token.number{ color: rgb(240, 150, 66) }\n.token.comment{ color: rgb(177,177,177) }\n\n"
	head += ".Wrapper {\n  background-color: #000000;\n  width: "+(divwidth+2*divpadding).toFixed(1)+"px;\n  height: "+divheight.toFixed(1)+"px;\n  position: relative;\n  "+
  		"border: 1px solid;\n  border-radius: "+divradius.toFixed(1)+"px;\n  margin: 0 auto;\n}\n\n"

	head += ".block{\n  width: "+width.toFixed(1)+"px;\n  height: "+width.toFixed(1)+"px;\n  left: "+leftmargin.toFixed(1)+"px;\n  top: "+topmargin.toFixed(1)+
		"px;\n  border-radius: "+radius.toFixed(1)+"px;\n  position: absolute;\n  background-color: #7A7A7A;\n}\n\n"
	for (i = 0; i < wn; i++) head += ".Xpos"+i+"{left: "+((width+distance)*i+leftmargin).toFixed(1)+"px;}\n"
	for (j = 0; j < hn; j++) head += ".Ypos"+j+"{top: "+((width+distance)*j+topmargin).toFixed(1)+"px;}\n"

	track = head+track
}

function LoadFunction() {
	let a = document.getElementById("PageStyle");
	let b = document.getElementById("Wrapper");
	let c = document.getElementById("Code")
	let d = document.getElementById("styleEditor")
	track = a.innerHTML;
	a.innerHTML = ""

	console.log(document.body.clientWidth)
	console.log(document.body.clientHeight)
	console.log(document.documentElement.clientWidth)
	console.log(document.documentElement.clientHeight)

	SetParameter(document.documentElement.clientWidth, document.documentElement.clientHeight)
	ModifyStyle();

	for (i = 0; i < wn; i++) {
		for (j = 0; j < hn; j++) {
			b.innerHTML += "<div class=\"block Xpos"+i+" Ypos"+j+" block_"+i+"_"+j+"\"></div>\n"
		}
	}

	let tempstr = ""
	let tempint = 0

	let comment = false
	let inb = false

	styletimer = window.setInterval(function(){
		if(tracknum >= track.length) {
			clearInterval(styletimer);
			return;
		}
		tempint = track.indexOf('\n', tracknum)
		tempstr = track.slice(tracknum, tempint )
		tempstr += (tempint==-1)?track[track.length-1]:track[tempint]

		a.innerHTML += tempstr // track.substr(tracknum, renewchar)
		
		 c.innerHTML += tempstr // track.substr(tracknum, renewchar)

		d.scrollTop = d.scrollHeight
		tracknum += tempstr.length
	}, 10)
}

