$(function () {
    $('#reg_link,#login_link').on('click', function () {

        $(this).parents('form').hide().siblings('form').show();
    });

    // 注册按钮绑定事件
    // 表单验证事件
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            var pwd = $('#reg_form [name=password]').val();
            if (pwd !== value) {
                console.log(pwd);
                return '两次密码不一致'
            }
        }

    });
    // 注册按钮事件
    $('#reg_form').on('submit', function (e) {
        e.preventDefault();
        var username = $('#reg_form [name=username]').val();
        var password = $('#reg_form [name=password]').val();
        $.ajax({
            type: 'post',
            url: '/api/reguser',
            data: {
                username: username,
                password: password,
            },
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                };
                layer.msg(res.message);
                // 跳转至登录界面 触发一个点击事件
                $('#login_link').click();
            },
        })
    })
    // 登录事件
$('#login_form').submit(function(e){
    e.preventDefault();
    $.ajax({
        type:'post',
        url:'/api/login',
        data:$('#login_form').serialize(),
        success:function(res){
            // console.log(res);
            if(res.status!==0){
                return layer.msg(res.message);
            };
            layer.msg(res.message);
            localStorage.setItem('token',res.token);
            location.href='/index.html';
        }
    })
})
})