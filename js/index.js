/**
 * Created by web-01 on 2017/10/16.
 */
$("[name='usubmit']").click(e=>{
    e.preventDefault();
    var uname=$("[name='uname']").val();
    var upwd=$("[name='upwd']").val();

    var unamereg=/^[a-z0-9]{3,12}$/i;
    var upwdreg=/^[a-z0-9]{3,12}$/i;
    if(!unamereg.test(uname)){
        alert("用户名格式不正确: 只能是3〜6 位字母数字");
        return;
    }
    if(!upwdreg.test(upwd)){
        alert("密码格式不正确: 只能是3〜6 位字母数字");
        return;
    }
    alert(uname+":"+upwd);
    $.ajax({
        type:"POST",
        url:"data/01_login.php",
        data:{uname:uname,upwd:upwd},
        success:function(data){
            if(data.code>0){
                alert(data.msg);
                // location.href="main.html";
                location.href="product_list.html";
            }else{
                alert(data.msg);
            }
        },
        error:function () {
            alert("网络出现故障，请检查");
        }
    });
});
