window.onload = function () {
    function $(id){
        return document.getElementById(id);
    }
    function getStyle(ele, attr){
        var styles = null;
        if(ele.currentStyle){
            styles = ele.currentStyle[attr];
        }
        else{
            styles = window.getComputedStyle(ele, null)[attr];
        }
        return parseFloat(styles);
    }

    var game = $('game')
        //游戏开始的界面
        , gameStart = $('game-start')
        //进入游戏的界面
        , gameEnter = $('game-enter')
        , myPlane = $('my-plane')
        , bulletP = $('bullet')
        , enemyP = $('enemy');
    // alert(game.offsetTop +', ' +game.offsetLeft);

    //获取需要使用的元素样式
    //1 游戏div的高宽
    var gameHeight = getStyle(game, "height")
        , gameWidth = getStyle(game, "width");
    //2 游戏div的左上外边距
    var gameMarLeft = getStyle(game, "margin-left")
        , gameMarTop = getStyle(game, "margin-top");
    //3获取自己飞机的宽高
    var myHeight = getStyle(myPlane, "height")
        , myWidth = getStyle(myPlane, "width");
    //子弹的高宽
    var bulletW = getStyle(bulletP,'width')
        , bulletH = getStyle(bulletP,'height');

    var gameStatus = false // 当前的游戏状态
    , timer = null; //初始时候的定时器


    gameStart.firstElementChild.onclick = function(){
        gameStart.style.display = 'none';
        gameEnter.style.display = 'block';

        document.onkeyup = function (ev) {
            var oEvent = ev || window.event;
            var keyVal = oEvent.keyCode;

            if(keyVal == 32){
                if(!gameStatus){
                    this.onmousemove = myPlaneMove;
                    shot();
                }
                else{
                    this.onmousemove = null;
                }
                gameStatus = !gameStatus;
            }
        }
    }

    function myPlaneMove(ev){
        var oEvent = ev || window.event;
        //获取鼠标的位置坐标
        var mouse_x = oEvent.x || oEvent.clientX;
        var mouse_y = oEvent.y || oEvent.clientY;

        //计算得到鼠标移动时自己飞机的左上边距
        var final_myPlane_left = mouse_x - gameMarLeft - myWidth/2
        ,  final_myPlane_top = mouse_y - gameMarTop - myHeight/2;

        if(final_myPlane_left <= 0){
            myPlane.style.left = '0';
        }
        else if(final_myPlane_top <= 0){
            myPlane.style.top = '0';
        }
        else if(final_myPlane_left >= gameWidth - myWidth){
            myPlane.style.left = gameWidth - myWidth + 'px';
        }
        else if(final_myPlane_top >= gameHeight - myHeight) {
            myPlane.style.top = gameHeight - myHeight + 'px';
        }
        else{
                myPlane.style.left = final_myPlane_left + 'px';
                myPlane.style.top = final_myPlane_top + 'px';
        }

    }

    function shot(){
        timer = setInterval(function(){
                createBullet()
            }
        ,30);

        //创建子弹
        function createBullet() {
            var bullet = new Image();
            bullet.src = 'image/bullet1.png';
            bullet.className = 'b';
            //确定子弹出现的位置
            //创建每一刻子弹，都要获取自己的飞机的位置
            var myLeft = getStyle(myPlane, 'left');
            var myTop = getStyle(myPlane, 'top');

            var bulletL = myLeft + 33 - 3
                , bulletT = myTop - 14;

            bullet.style.left = bulletL + 'px';
            bullet.style.top = bulletT + 'px';

            bulletP.appendChild(bullet);

        }
    }

}