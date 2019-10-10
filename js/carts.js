//======增加==============================================
    $("body").on("click",".plus",function () {
        var id =$(this).attr("name")
        var n = $(this).prev().val();
         //判断是否超出库存
         var goodsKc = parseInt($(this).attr("kc"))
        //  console.log(goodsKc)
        if(n < goodsKc){ 
            var num = parseInt(n)+1;
        }else{
            var num=10
        }
        $(this).prev().val(num);
        //计算金额
        var sum=parseInt($(this).prev().val())
        var allmoney=sum*parseInt($(this).parents('.order_lists').find('.price').text())
        // console.log(allmoney) //打印金额  将金额追加到页面
            $(this).parents('.order_lists').find('.sum_price').text(`￥${allmoney}`)
        //发送请求写入数据库
        $.ajax({
            type:'get',
            url:'http://127.0.0.1:3003/add.js',
            dataType:'json',
            data:'id='+id+'&num='+num,
            success:function(res){
            }
        })
        // totalMoney();

        ////判断库存
        var num=$(this).parents('.order_lists').find('.sum').val();
        var goodsId=parseInt($(this).parents('.order_lists').find('.reduce').attr('name'))
        // console.log(goodsId)
        $.ajax({
            type:'get',
            url:'http://127.0.0.1:3033',
            dataType:'json',
            data:{goodsId},
            success(res){ 
                //  获取库存数量

                var goodsNum=parseInt(res.data[0].goods_num);
                // console.log(goodsNum)
            //    $(this).parents('.cartBox').attr('goodsNum', goodsNum)
                
                if(goodsNum-1 < num){
                    $("#"+goodsId+"").val(goodsNum)
                    // alert( $("#"+goodsId+"").val(goodsNum))
                    alert('超出库存')
                }
            },
            error(err){
                console.log(err)
            }
        })
    });

    ///--------------减-----

    $("body").on("click",".reduce",function () {
        var id =$(this).attr("name");
        var n = $(this).next().val();
        if(n >1 ){ 
            var num = parseInt(n)-1;
        }else{
            var num=1
        }
        $(this).next().val(num);
        var sum=parseInt($(this).next().val())
        var allmoney=sum*parseInt($(this).parents('.order_lists').find('.price').text())
        $(this).parents('.order_lists').find('.sum_price').text(`￥${allmoney}`)
        $.ajax({
            type:'get',
            url:'http://127.0.0.1:3003/dim.js',
            dataType:'json',
            data:'id='+id+'&num='+num,
            success:function(res){
            }
        })
        if(num < 0){
            return;
        }
        $(this).next().val(num)
        // totalMoney();
    });

// ///////////////////////
// 全选
$("body").on("click",'.whole_check',function(){
    var $cartBox = $('.cartBox');
    var $checkboxs = $cartBox.find('input[type="checkbox"]');
    if ($(this).is(':checked')) {
        $checkboxs.prop("checked", true);
        $checkboxs.next('label').addClass('mark');
    } else {
        $checkboxs.prop("checked", false);
        $checkboxs.next('label').removeClass('mark');
    }
});

/////////////单选

// $("body").on("click",".son_check",function(e){
//     console.log(e.target)
//    if($(e.target).next('label').hasClass('mark')){
    
//     $(e.target).next('label').removeClass('mark');
//    } else {
//     $(e.target).next('label').addClass('mark');
    
//    }
// });
 //事件委托，键盘松开请求接口
$('body').on('keyup','.sum',function(){
    var t;
    // alert(11)
    var id =$(this).attr("name")
    var num = $(this).val().replace(/[^0-9]/g,'');
    if(num < 10){ 
        var num = parseInt(num);
        
    }else{
        var num=10
    }
    $(this).val(num);
    console.log(num)
    var allmoney=num*parseInt($(this).parents('.order_lists').find('.price').text())
    $(this).parents('.order_lists').find('.sum_price').text(`￥${allmoney}`)
    //请求接口
    clearTimeout(t)
    t = setTimeout(function(){
        $.ajax({
        type:'get',
        url:'http://127.0.0.1:3003/add.js',
        dataType:'json',
        data:'id='+id+'&num='+num,
        success:function(res){
        }
    })
    },1000) 
})


// //////删除
$("body").on("click",".delBtn",function(){
    var id = $(this).attr("name")
    console.log(id)
    alert('是否删除该商品')
    $(this).closest(".cartBox").remove();
    $.ajax({
        type:'get',
        url:'http://127.0.0.1:3003/del.js',
        dataType:'json',
        data:'id='+id,
        success:function(res){
        }
    }) 
})
////////计价



    
    




// var $allCheckbox = $('input[type="checkbox"]'),    
//         $wholeChexbox = $('.whole_check'),
//         $cartBox = $('.cartBox'),                      
//         $shopCheckbox = $('.shopChoice'),              
//         $sonCheckBox = $('.son_check');
// $cartBox.each(function () {
//     var $this = $(this);
//     var $sonChecks = $this.find('.son_check');
//     $sonChecks.each(function () {
//         $(this).click(function () {
//         // $("body").on("click",".whole_check",function(){
//             if ($(this).is(':checked')) {
                
//                 var len = $sonChecks.length;
//                 var num = 0;
//                 $sonChecks.each(function () {
//                     if ($(this).is(':checked')) {
//                         num++;
//                     }
//                 });
//                 if (num == len) {
//                     $(this).parents('.cartBox').find('.shopChoice').prop("checked", true);
//                     $(this).parents('.cartBox').find('.shopChoice').next('label').addClass('mark');
//                 }

//             } else {
                
//                 $(this).parents('.cartBox').find('.shopChoice').prop("checked", false);
//                 $(this).parents('.cartBox').find('.shopChoice').next('label').removeClass('mark');
//             }
//             // totalMoney();
//         });
//     });
// });







///计算总价
// function totalMoney() {
//     var total_money = 0;
//     var total_count = 0;
//     var calBtn = $('.calBtn a');
//     $sonCheckBox.each(function () {
//         if ($(this).is(':checked')) {
//             var goods = parseInt($(this).parents('.order_lists').find('.sum_price').html().substring(1));
//             var num =  parseInt($(this).parents('.order_lists').find('.sum').val());
//             total_money += goods;
//             total_count += num;
//         }
//     });
//     $('.total_text').html('￥'+total_money);
//     $('.piece_num').html(total_count);

//     // console.log(total_money,total_count);

//     if(total_money!=0 && total_count!=0){
//         if(!calBtn.hasClass('btn_sty')){
//             calBtn.addClass('btn_sty');
//         }
//     }else{
//         if(calBtn.hasClass('btn_sty')){
//             calBtn.removeClass('btn_sty');
//         }
//     }
// }