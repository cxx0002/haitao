/**
 * Created by Lenovo on 2019/2/18.
 */
$(function(){
    //判断购物车是否有商品
    var goodList=$.cookie("username");
    if($.cookie(goodList)>0){
        $(".main_goods").css("display","block");
        $(".main_content").css("display","none");
    }else{
        $(".main_goods").css("display","none");
        $(".main_content").css("display","block");
    }
    //获取cookie商品数量和信息

    var addNum=$.cookie(goodList);

    //动态添加商品
    var str1=``;
    for(var i=0;i<addNum;i++){
    	str1+=`<li>
				<input type='checkbox'>
				<img src='${"img/datail_goods.jpg"}'>
				<p><a href="detail.html">235元/盒 2盒包邮装 【李小冉同款】【粉嫩肌肤 颜值焕发】Vierra 胶原蛋白胜肽口服精华 55毫升*7瓶/盒*2盒</a><i>包邮</i></p>
				<p><b>￥718元</b><span><i>V</i>￥248元</span></p>
				<div><button class='reduce'>-</button><span class="much">1</span><button class='add1'>+</button></div>
				<a class='delete'> <img src="img/垃圾桶1.png" alt=""></a>
				</li>`;
    }
    $("#ul").html(str1);

    //加减购物车
    $(".reduce").on("click",function () {

        if(parseInt($(this).parents("li").find(".much").html())<=1){
            $(this).parents("li").find(".much").html("1");
        }else{
           $(this).parents("li").find(".much").html(parseInt($(this).parents("li").find(".much").html())-1)
        }

    })
    $("#ul li .add1").on("click",function () {
        $(this).parents("li").find(".much").html(parseInt($(this).parents("li").find(".much").html())+1)
    })


    // 算账函数
    function AllMoney(){
        var inAll=0;
        var reAll=0;
        //遍历
        for(var i=0;i<(parseInt($.cookie(goodList))+1);i++){
            if($(oInptCheckLis[i]).prop("checked")){
                inAll+=718*parseInt($("#ul li").eq(i).find(".much").html());
                $("#ul li").eq(i).find(".delete").css("display","none");
                reAll+=248*parseInt($("#ul li").eq(i).find(".much").html());
                $("#sub").prop("disabled",false);
                $(".add1").eq(i).prop("disabled",true);
                $(".reduce").eq(i).prop("disabled",true);

            }else{
                $("#ul li").eq(i).find(".delete").css("display","block");
                $(".add1").eq(i).prop("disabled",false);
                $(".reduce").eq(i).prop("disabled",false);
                 //任意取消就取消全选
                $(".car_top input[type=checkbox]").prop("checked",$(oInptCheckLis[i]).prop("checked"))
            }
        }
        $("#kj").html("省"+reAll+"元");
        $("#zj").html(inAll);
        $("#spzj").html(inAll);
        $(".sq").html("省"+reAll+"元");
    }
    //点击  商品全选
    $(".car_top input[type=checkbox]").on("click", function () {
        $("#ul li input[type=checkbox]").prop("checked",$(".car_top input[type=checkbox]").prop("checked"));
        AllMoney();
    })



    // 点击算账
       $("#sub").click(function () {
           if(parseInt($("#zj").html())==0){
               $(".addCar").fadeIn(500).fadeOut(1000);
           }else {
                alert("恭喜您成为幸运用户,此次消费免单...");
           }
       })

    // 追加点击事件 判断是否选中 被选中所有的父级li加和
    var oInptCheckLis=document.querySelectorAll("#ul>li input[type=checkbox]");
    $("#ul li input[type=checkbox]").on("click",function () {
        AllMoney();
    });

    $("#ul li .delete").on("click",function () {
        addNum--;
        $.cookie(goodList, addNum,{expires: 7});
        $(this).parents("li").remove();
        var data={
            utel:addNum,
            uname:goodList
        }
        $.ajax({
            url : "./../server/updataNum.php",
            type : "post",
            data : data
        })
        $(".right>a>span").html(addNum);
        if(addNum==0){
            location.reload()
        }
    })

})

