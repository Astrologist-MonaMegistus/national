window.onload=function(){veri_code("inp","btn");}
function veri_code(inputClass,buttonClass){
    var mcan=document.querySelector("canvas");
    var ctx=mcan.getContext("2d");
    var mh=mcan.height;var mw=mcan.width;
    var str="zxcvbnmasdfghjklqwertyuiop";
    var r;var g;var b;
    var rot;var newStr="";
    drawYzm();
    mcan.onclick=function(){
        newStr="";
        ctx.clearRect(0,0,mw,mh);
        drawYzm();
    };
    var input=document.getElementsByClassName(inputClass)[0];
    var btn=document.getElementsByClassName(buttonClass)[0];
    btn.onclick=function(){
        if(input.value.toLowerCase()==newStr){
            alert(newStr);
        }else{
            alert("閿欒")
        }
    };
    function getRandom(min,max){
        return min+Math.random()*(max-min+1);
    }
function drawYzm(){
    for(var a=0;a<4;a++){
        ctx.beginPath();
        r=getRandom(80,220);
        g=getRandom(80,220);
        b=getRandom(80,220);
        var aa=str[parseInt(Math.random()*str.length)];
        ctx.fillStyle="rgb("+r+","+g+","+b+")";
        rot=Math.PI/180*(getRandom(-30,30));
        ctx.textBaseline="top";ctx.translate(mw/4*a+10,mh/3);
        ctx.rotate(rot);
        ctx.font=mw/7+"px '寰蒋闆呴粦'";
        ctx.fillText(aa,0,0);ctx.rotate(-rot);
        ctx.translate(-mw/4*a-10,-mh/3);newStr+=aa;
    }
for(var i=0;i<20;i++){
    ctx.beginPath();
    r=getRandom(80,220);
    g=getRandom(80,220);
    b=getRandom(80,220);
    ctx.fillStyle="rgb("+r+","+g+","+b+")";
    var dotW,dotH;if(mw>100){dotW=dotH=3;
    }else{dotW=dotH=1;}
ctx.fillRect(getRandom(0,mw),getRandom(0,mh),3,3)}
for(var j=0;j<5;j++){
    ctx.beginPath();
    r=getRandom(80,220);
    g=getRandom(80,220);
    b=getRandom(80,220);
    ctx.strokeStyle="rgb("+r+","+g+","+b+")";
    var line_width;if(mw>100){line_width=2;
    }else{line_width=1;}
ctx.lineWidth=line_width;
ctx.moveTo(getRandom(5,15),getRandom(0,mh));
ctx.lineTo(getRandom(mw-30,mw-15),getRandom(0,mh));
ctx.stroke();
}
}
}