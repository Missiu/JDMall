window.onload = function () {
  setInterval("show()", 1000);
  var prev = document.getElementById("prev");
  var next = document.getElementById("next");
  var imgList = document.getElementById("imgList");
  var img = document.getElementsByTagName("img")[2];
  var imgArr = [
    "./img/01.jpg",
    "./img/02.jpg",
    "./img/03.jpg",
    "./img/04.jpg",
    "./img/05.jpg",
    "./img/06.jpg",
    "./img/07.jpg",
    "./img/08.jpg",
    "./img/01.jpg",
  ];
  imgList.style.width = 610 * imgArr.length + "px";
  var index = 0;
  var allA = document.getElementsByClassName("navs");
  allA[index].style.backgroundColor = "#FFF";
  for (var i = 0; i < allA.length; i++) {
    allA[i].num = i;

    allA[i].onclick = function () {
      clearInterval(timer);
      index = this.num;
      //切换图片
      imgList.style.left = -610 * index + "px";
      setA();
      move(imgList, "left", -610 * index, 40, function () {
        //动画执行完毕，开启自动切换
        autoChange();
      });
    };
  }
  autoChange();
  function setA() {
    if (index >= imgArr.length - 1) {
      index = 0;
      imgList.style.left = 0;
    }
    for (var i = 0; i < allA.length; i++) {
      allA[i].style.backgroundColor = "";
    }
    allA[index].style.backgroundColor = "#FFF";
  }
  var timer;
  function autoChange() {
    timer = setInterval(function () {
      index++;
      index %= imgArr.length;
      move(imgList, "left", -610 * index, 20, function () {
        setA();
      });
    }, 2000);
  }
  prev.onclick = function () {
    clearInterval(timer);
    index--;
    if (index < 0) {
      index = imgArr.length - 1;
    }
    img.src = imgArr[index];
    setA();
    move(imgList, "left", -610 * index, 40, function () {
      autoChange();
    });
  };
  next.onclick = function () {
    clearInterval(timer);
    index++;
    if (index > imgArr.length - 1) {
      index = 0;
    }

    img.src = imgArr[index];
    setA();
    move(imgList, "left", -610 * index, 40, function () {
      autoChange();
    });
  };
};
function show() {
  var s1 = "2022-03-26 16:00:00";
  s1 = new Date(s1.replace(/-/g, "/"));
  s2 = new Date();
  //获取得出时间差
  var day = s1.getTime() - s2.getTime();
  var hour = parseInt((day % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minute = parseInt((day % (1000 * 60 * 60)) / (1000 * 60));
  var second = parseInt((day / 1000) % 60);
  document.getElementById("time1").innerHTML = hour;
  document.getElementById("time2").innerHTML = minute;
  document.getElementById("time3").innerHTML = second;
}


//尝试创建一个可以执行简单动画的函数
/*
 * 参数：
 * 	obj:要执行动画的对象
 * 	attr:要执行动画的样式，比如：left top width height
 * 	target:执行动画的目标位置
 * 	speed:移动的速度(正数向右移动，负数向左移动)
 *  callback:回调函数，这个函数将会在动画执行完毕以后执行
 */
function move(obj, attr, target, speed, callback) {
	//关闭上一个定时器
	clearInterval(obj.timer);

	//获取元素目前的位置
	var current = parseInt(getStyle(obj, attr));

	//判断速度的正负值
	//如果从0 向 800移动，则speed为正
	//如果从800向0移动，则speed为负
	if(current > target) {
		//此时速度应为负值
		speed = -speed;
	}

	//开启一个定时器，用来执行动画效果
	//向执行动画的对象中添加一个timer属性，用来保存它自己的定时器的标识
	obj.timer = setInterval(function() {

		//获取box1的原来的left值
		var oldValue = parseInt(getStyle(obj, attr));

		//在旧值的基础上增加
		var newValue = oldValue + speed;

		//判断newValue是否大于800
		//从800 向 0移动
		//向左移动时，需要判断newValue是否小于target
		//向右移动时，需要判断newValue是否大于target
		if((speed < 0 && newValue < target) || (speed > 0 && newValue > target)) {
			newValue = target;
		}

		//将新值设置给box1
		obj.style[attr] = newValue + "px";

		//当元素移动到0px时，使其停止执行动画
		if(newValue == target) {
			//达到目标，关闭定时器
			clearInterval(obj.timer);
			//动画执行完毕，调用回调函数
			callback && callback();
		}

	}, 30);
}

/*
 * 定义一个函数，用来获取指定元素的当前的样式
 * 参数：
 * 		obj 要获取样式的元素
 * 		name 要获取的样式名
 */
function getStyle(obj, name) {

	if(window.getComputedStyle) {
		//正常浏览器的方式，具有getComputedStyle()方法
		return getComputedStyle(obj, null)[name];
	} else {
		//IE8的方式，没有getComputedStyle()方法
		return obj.currentStyle[name];
	}

}

//定义一个函数，用来向一个元素中添加指定的class属性值
/*
 * 参数:
 * 	obj 要添加class属性的元素
 *  cn 要添加的class值
 * 	
 */
function addClass(obj, cn) {

	//检查obj中是否含有cn
	if(!hasClass(obj, cn)) {
		obj.className += " " + cn;
	}

}

/*
 * 判断一个元素中是否含有指定的class属性值
 * 	如果有该class，则返回true，没有则返回false
 * 	
 */
function hasClass(obj, cn) {

	//判断obj中有没有cn class
	//创建一个正则表达式
	//var reg = /\bb2\b/;
	var reg = new RegExp("\\b" + cn + "\\b");

	return reg.test(obj.className);

}

/*
 * 删除一个元素中的指定的class属性
 */
function removeClass(obj, cn) {
	//创建一个正则表达式
	var reg = new RegExp("\\b" + cn + "\\b");

	//删除class
	obj.className = obj.className.replace(reg, "");

}

/*
 * toggleClass可以用来切换一个类
 * 	如果元素中具有该类，则删除
 * 	如果元素中没有该类，则添加
 */
function toggleClass(obj, cn) {

	//判断obj中是否含有cn
	if(hasClass(obj, cn)) {
		//有，则删除
		removeClass(obj, cn);
	} else {
		//没有，则添加
		addClass(obj, cn);
	}

}

