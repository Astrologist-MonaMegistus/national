   var $allCheckbox = $('input[type="checkbox"]'),     //鍏ㄥ眬鐨勫叏閮╟heckbox
        $wholeChexbox = $('.whole_check'),
        $cartBox = $('.cartBox'),                       //姣忎釜鍟嗛摵鐩掑瓙
        $shopCheckbox = $('.shopChoice'),               //姣忎釜鍟嗛摵鐨刢heckbox
        $sonCheckBox = $('.son_check');                 //姣忎釜鍟嗛摵涓嬬殑鍟嗗搧鐨刢heckbox
    $allCheckbox.click(function () {
        if ($(this).is(':checked')) {
            $(this).next('label').addClass('mark');
        } else {
            $(this).next('label').removeClass('mark')
        }
    });

    //===============================================鍏ㄥ眬鍏ㄩ€変笌鍗曚釜鍟嗗搧鐨勫叧绯�================================
    $wholeChexbox.click(function () {
        // $("body").on("click",$wholeChexbox,function () {

        var $checkboxs = $cartBox.find('input[type="checkbox"]');
        if ($(this).is(':checked')) {
            $checkboxs.prop("checked", true);
            $checkboxs.next('label').addClass('mark');
        } else {
            $checkboxs.prop("checked", false);
            $checkboxs.next('label').removeClass('mark');
        }
        totalMoney();
    });


    $sonCheckBox.each(function () {
        $(this).click(function () {
            if ($(this).is(':checked')) {
                //鍒ゆ柇锛氭墍鏈夊崟涓晢鍝佹槸鍚﹀嬀閫�
                var len = $sonCheckBox.length;
                var num = 0;
                $sonCheckBox.each(function () {
                    if ($(this).is(':checked')) {
                        num++;
                    }
                });
                if (num == len) {
                    $wholeChexbox.prop("checked", true);
                    $wholeChexbox.next('label').addClass('mark');
                }
            } else {
                //鍗曚釜鍟嗗搧鍙栨秷鍕鹃€夛紝鍏ㄥ眬鍏ㄩ€夊彇娑堝嬀閫�
                $wholeChexbox.prop("checked", false);
                $wholeChexbox.next('label').removeClass('mark');
            }
        })
    })

    //=======================================姣忎釜搴楅摵checkbox涓庡叏閫塩heckbox鐨勫叧绯�/姣忎釜搴楅摵涓庡叾涓嬪晢鍝佹牱寮忕殑鍙樺寲===================================================

    //搴楅摵鏈変竴涓湭閫変腑锛屽叏灞€鍏ㄩ€夋寜閽彇娑堝鍕撅紝鑻ュ簵閾哄叏閫変腑锛屽垯鍏ㄥ眬鍏ㄩ€夋寜閽墦瀵瑰嬀銆�
    $shopCheckbox.each(function () {
        $(this).click(function () {
            if ($(this).is(':checked')) {
                //鍒ゆ柇锛氬簵閾哄叏閫変腑锛屽垯鍏ㄥ眬鍏ㄩ€夋寜閽墦瀵瑰嬀銆�
                var len = $shopCheckbox.length;
                var num = 0;
                $shopCheckbox.each(function () {
                    if ($(this).is(':checked')) {
                        num++;
                    }
                });
                if (num == len) {
                    $wholeChexbox.prop("checked", true);
                    $wholeChexbox.next('label').addClass('mark');
                }

                //搴楅摵涓嬬殑checkbox閫変腑鐘舵€�
                $(this).parents('.cartBox').find('.son_check').prop("checked", true);
                $(this).parents('.cartBox').find('.son_check').next('label').addClass('mark');
            } else {
                //鍚﹀垯锛屽叏灞€鍏ㄩ€夋寜閽彇娑堝鍕�
                $wholeChexbox.prop("checked", false);
                $wholeChexbox.next('label').removeClass('mark');

                //搴楅摵涓嬬殑checkbox閫変腑鐘舵€�
                $(this).parents('.cartBox').find('.son_check').prop("checked", false);
                $(this).parents('.cartBox').find('.son_check').next('label').removeClass('mark');
            }
            totalMoney();
        });
    });


    //========================================姣忎釜搴楅摵checkbox涓庡叾涓嬪晢鍝佺殑checkbox鐨勫叧绯�======================================================

    //搴楅摵$sonChecks鏈変竴涓湭閫変腑锛屽簵閾哄叏閫夋寜閽彇娑堥€変腑锛岃嫢鍏ㄩ兘閫変腑锛屽垯鍏ㄩ€夋墦瀵瑰嬀
    $cartBox.each(function () {
        var $this = $(this);
        var $sonChecks = $this.find('.son_check');
        $sonChecks.each(function () {
            $(this).click(function () {
                if ($(this).is(':checked')) {
                    //鍒ゆ柇锛氬鏋滄墍鏈夌殑$sonChecks閮介€変腑鍒欏簵閾哄叏閫夋墦瀵瑰嬀锛�
                    var len = $sonChecks.length;
                    var num = 0;
                    $sonChecks.each(function () {
                        if ($(this).is(':checked')) {
                            num++;
                        }
                    });
                    if (num == len) {
                        $(this).parents('.cartBox').find('.shopChoice').prop("checked", true);
                        $(this).parents('.cartBox').find('.shopChoice').next('label').addClass('mark');
                    }

                } else {
                    //鍚﹀垯锛屽簵閾哄叏閫夊彇娑�
                    $(this).parents('.cartBox').find('.shopChoice').prop("checked", false);
                    $(this).parents('.cartBox').find('.shopChoice').next('label').removeClass('mark');
                }
                totalMoney();
            });
        });
    });


    //======增加==============================================
    var $plus = $('.plus'),
        $reduce = $('.reduce'),
        $all_sum = $('.sum');
    // $().click(function () {
    $("body").on("click",".plus",function () {
        var $inputVal = $(this).prev('input'),
            $count = parseInt($inputVal.val()),
            $obj = $(this).parents('.amount_box').find('.reduce'),
            $priceTotalObj = $(this).parents('.order_lists').find('.sum_price'),
            $price = $(this).parents('.order_lists').find('.price').html(),  //鍗曚环
            $priceTotal = $count*parseInt($price.substring(1));
        $inputVal.val($count);
        $priceTotalObj.html('￥'+$priceTotal);
        if($inputVal.val()>1 && $obj.hasClass('reSty')){
            $obj.removeClass('reSty');
        }

///////////////////////////
        var id =$(this).attr("name")
        console.log(id)
        var n = $(this).prev().val();
        
        var num = parseInt(n)+1;
        $.ajax({
            type:'get',
            url:'http://127.0.0.1:3003/add.js',
            dataType:'json',
            data:'id='+id+'&num='+num,
            success:function(res){

            }
        })
        if(num == 99){
            return;
        }
        $(this).prev().val(num)
        
        totalMoney();
    });
    ///减
    // $reduce.click(function () {
        $("body").on("click",".reduce",function () {
        var $inputVal = $(this).next('input'),
            $count = parseInt($inputVal.val()),
            $priceTotalObj = $(this).parents('.order_lists').find('.sum_price'),
            $price = $(this).parents('.order_lists').find('.price').html(),  //鍗曚环
            $priceTotal = $count*parseInt($price.substring(1));
        if($inputVal.val()>1){
            $inputVal.val($count);
            $priceTotalObj.html('￥'+$priceTotal);
        }
        if($inputVal.val()==1 && !$(this).hasClass('reSty')){
            $(this).addClass('reSty');
        }
////////////////////////////////
        var id =$(this).attr("name")
        var n = $(this).prev().val();
        var num = parseInt(n)-1;
        $.ajax({
            type:'get',
            url:'http://127.0.0.1:3003/dim.js',
            dataType:'json',
            data:'id='+id+'&num='+num,
            success:function(res){

            }
        })
        if(num == 0){
            return;
        }
        $(this).next().val(num)


        totalMoney();
    });

    $all_sum.keyup(function () {
        var $count = 0,
            $priceTotalObj = $(this).parents('.order_lists').find('.sum_price'),
            $price = $(this).parents('.order_lists').find('.price').html(),  //鍗曚环
            $priceTotal = 0;
        if($(this).val()==''){
            $(this).val('1');
        }
        $(this).val($(this).val().replace(/\D|^0/g,''));
        $count = $(this).val();
        $priceTotal = $count*parseInt($price.substring(1));
        $(this).attr('value',$count);
        $priceTotalObj.html('￥'+$priceTotal);
        totalMoney();
    })

    //======================================绉婚櫎鍟嗗搧========================================

    var $order_lists = null;
    var $order_content = '';
    $('.delBtn').click(function () {
        $order_lists = $(this).parents('.order_lists');
        $order_content = $order_lists.parents('.order_content');
        $('.model_bg').fadeIn(300);
        $('.my_model').fadeIn(300);
    });

    //鍏抽棴妯℃€佹
    $('.closeModel').click(function () {
        closeM();
    });
    $('.dialog-close').click(function () {
        closeM();
    });
    function closeM() {
        $('.model_bg').fadeOut(300);
        $('.my_model').fadeOut(300);
    }
    //纭畾鎸夐挳锛岀Щ闄ゅ晢鍝�
    $('.dialog-sure').click(function () {
        $order_lists.remove();
        if($order_content.html().trim() == null || $order_content.html().trim().length == 0){
            $order_content.parents('.cartBox').remove();
        }
        closeM();
        $sonCheckBox = $('.son_check');
        totalMoney();
    })

    //======================================鎬昏==========================================

    function totalMoney() {
        var total_money = 0;
        var total_count = 0;
        var calBtn = $('.calBtn a');
        $sonCheckBox.each(function () {
            if ($(this).is(':checked')) {
                var goods = parseInt($(this).parents('.order_lists').find('.sum_price').html().substring(1));
                var num =  parseInt($(this).parents('.order_lists').find('.sum').val());
                total_money += goods;
                total_count += num;
            }
        });
        $('.total_text').html('￥'+total_money);
        $('.piece_num').html(total_count);

        // console.log(total_money,total_count);

        if(total_money!=0 && total_count!=0){
            if(!calBtn.hasClass('btn_sty')){
                calBtn.addClass('btn_sty');
            }
        }else{
            if(calBtn.hasClass('btn_sty')){
            calBtn.removeClass('btn_sty');
            }
        }
    }



///////////////////////
//全选
$(".pppp").on("click",".ppppppp",function(){
   var fxk = $(".pppppp")
   var qx = $(".ppppp")
   qx.toggleClass("llllll")
   if($(this).find(".ppppppp").is(".pppp")){
       fxk.addClass("pppppp")
   } else{
       fxk.removeClass("pppppp")
   }
})


//////删除
$(".ppppp").on("click",".pppppp",function(){
    var id = $(this).attr("name")
    $(this).closest(",ppppppp[").remove();
    $.ajax({
        type:'get',
        url:'http://127.0.0.1:3003/del.js',
        dataType:'json',
        data:'id='+id,
        success:function(res){

        }

    })
    
})