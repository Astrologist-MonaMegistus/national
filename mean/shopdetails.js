$('.thumb_3').mouseover(
    function(e){
        //创建一个方块
        let div=`<div class='enlar'></div>`;
        div=$(div).css({
            width:'200px',
            height:'200px',
            pointerEvents:'none',
            opacity:'0.5',
            position: 'absolute',
            background:'#fff',
            display:'none'
        });
        $('.etalage_thumb_active').append(div);
        let divb=`<div class='bigenlar'></div>`;
       
        bgi=$('.thumb_3img').attr('src');
        console.log(bgi);
        divb=$(divb).css({
            width:'300px',
            height:'400px',
            position: 'absolute',
            background:'url("'+bgi+'")',
            "background-size":"150% 150%",//390 520
            left:'313px',
            top:0,
            // display:'none'
        });
        $('.etalage_thumb_active').append(divb)
    }
);
$('.thumb_3').mouseout(
    function(){
        $('.enlar').remove();
        $('.bigenlar').remove()
    }
);
$('.thumb_3').css('position','relative');

$('.thumb_3').mousemove(
    //放大镜效果
    function(e){
        let top=e.offsetY-parseInt($('.enlar').css('height'))/2;
        let left=e.offsetX-parseInt($('.enlar').css('width'))/2;
        if(top<=0){
            $('.enlar').css('top',0);
            top=0
        }else if(top>=parseInt($('.thumb_3').css('height'))-parseInt($('.enlar').css('height'))){
            // $('.enlar').css('top',parseInt($('.thumb_3').css('height'))-parseInt($('.enlar').css('height')))
            $('.enlar').css('top',214);
            top=214;
        }else{
            $('.enlar').css('top',top)
        }
        if(left<=0){
            $('.enlar').css('left',0);
            left=0
        }else if(left+parseInt($('.enlar').css('width'))>=parseInt($('.thumb_3').css('width'))){
            // $('.enlar').css('left',parseInt($('.thumb_3').css('width'))-parseInt($('.enlar').css('width')))
            $('.enlar').css('left',114);
            left=114
        }else{
            $('.enlar').css('left',left)
        }
        $('.enlar').css('display','block');


        //大图跟随改变
        //遮罩层:图片  ==   放大div :背景图大小

        var w= top * 1.5;
        var h= left * 1.5;
        $('.bigenlar').css('background-position','-'+h+'px '+'-'+w+'px')



    }
);
$('.etalage_small_thumbs').click(
    function(e){
        //点击切换大图   
        console.log(e.target)
        // etalage_smallthumb_first  1
        if($(e.target).parent().attr('class')=='etalage_smallthumb_first'){
           //全部前移
            let arr=$('.etalage_smallthumb_first').siblings();
            let classarr=[]
        //    1 2 3 4 5 6 7 8 9
           for(var i=0;i<arr.length;i++){
               classarr.push($(arr[i]).attr('class'));
               console.log($(arr[i]).attr('class'))
           }
            console.log(classarr)
        }



        
        // etalage_smallthumb_active  2
        if($(e.target).parent().attr('class')=='etalage_smallthumb_active'){
            //不变

        }
        // etalage_smallthumb_last  3   
        if($(e.target).parent().attr('class')=='etalage_smallthumb_last'){
            //全部后移
            let arr=$('.etalage_smallthumb_first').siblings()
        }
    } 
);
$('.addshopping').click(
    function(){
        //点击添加购物车
        //发送 id 请求
    }
);

$('.loginbtn').click(
    function(){
        //跳转登陆页面
        // document.location.href='http://127.0.0.1:3000/home.html'
        return false
    }
);
$('.joinbtn').click(
    function(){
        //跳转注册页面
        // document.location.href='http://127.0.0.1:3000/home.html'
        return false
    }
);
$('.lookmore').click(
    function(){
        //跳转查看更多
        // document.location.href='http://127.0.0.1:3000/home.html'
        return false
    }
);
$('.product-info-cust').click(
    function(){
        //跳转查看细节
        // document.location.href='http://127.0.0.1:3000/home.html'
        return false
    }
);