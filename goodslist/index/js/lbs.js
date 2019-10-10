let imgObj=document.querySelector(".lbs img");
let t;
let i=1;
function imgChange()
{
    t=setInterval(function(){
        i++;
        if(i==6) i=1;
        imgObj.setAttribute("src","./goodslist/index/img/"+i+".jpg")
    },1500)
}
imgChange();

let liOBjs=document.querySelectorAll(".lbs li");
liOBjs.forEach(function(item,index){
    item.onmouseover=function(){
        clearInterval(t)
        imgObj.setAttribute("src","./goodslist/index/img/"+(index+1)+".jpg")
    }
    item.onmouseout=function(){
        imgChange();
        i=index+1
    }
})

let leftObj=document.querySelector(".left")
let rightObj=document.querySelector(".right")

leftObj.onmouseover=function(){
    clearInterval(t);
    leftObj.onclick=function(){
        i--;
        if(i==0) i=5
        imgObj.setAttribute("src","./goodslist/index/img/"+i+".jpg")
    }
}
leftObj.onmouseout=function(){
    imgChange();
}

rightObj.onmouseover=function(){
    clearInterval(t);
    rightObj.onclick=function(){
        i++;
        if(i==6) i=1
        imgObj.setAttribute("src","./goodslist/index/img/"+i+".jpg")
    }
}
rightObj.onmouseout=function(){
    imgChange();
}
