<?php
// 1. 接受数据
    // 规则：获取数据元素  $数组[键]
    // 规则：键 - 就是表单的name属性值
$uname = $_POST['uname'];
$pwd = $_POST['pwd'];
$isRemember = @$_POST['isRemember']; // @错误抑制符
// var_dump($uname);
// var_dump($pwd);
// var_dump($isRemember);
// 2. 逻辑去数据库判断账号是否存在，密码是否正确（略）
// 3. 判断是否记住密码（保存cookie）
    //   勾记住密码 - 7天
    // 不勾记住密码 - 也要存cookie 浏览器关闭销毁
if ($isRemember) {
    // 保存7天 = 当前时间戳+7天时间戳
    //           time()    3600*24*7
    setcookie('uname', $uname, time()+3600*24*7);
    setcookie('token', md5($uname), time()+3600*24*7);
} else {
    setcookie('uname', $uname);
    setcookie('token', md5($uname));
}
// 4. 跳转到index.html
echo "
    <script>
        alert('登录成功');
        location.href = './index.html'
    </script>
";
?>
