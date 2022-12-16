// 实现模糊查询

let keyword = document.querySelector(".keyword");
//获取输入框

let searchHelper = document.querySelector(".search-helper");
//获取收索下拉列表
// alert("aaaa");
//定义一个数组,存搜索内容
let searchArr = ["小米手机", "华为手机", "苹果手机", '小米电视', '小米平板', '苹果12', '苹果13'];

//输入框绑定内容改变事件
keyword.oninput = function () {
    // 先清掉旧的
    searchHelper.innerHTML="";
    for (let i = 0; i < searchArr.length; i++) {
        if (searchArr[i].indexOf(keyword.value) != -1) {
            // 用indexof find the user input value,if value 不等于 -有输入值
            searchHelper.innerHTML += "<p>" + searchArr[i] + '<p>';
            searchHelper.style.display = "block";
        }
    }
}
keyword.onblur=function(){
    searchHelper.style.display = "none";
}

/*轮播*/
//轮播图
let img = document.getElementById('img');
let prev = document.querySelector('.prev');
let next = document.querySelector('.next');
let lis = document.querySelectorAll('.banner-btn>li');
let slideBanner = document.querySelector('.slide-banner');
let imgArr = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg'];
let i = 0;

//封装切换的函数
function banner() {
    //清空样式
    for (let k = 0; k < lis.length; k++) {
        lis[k].className = '';
    }
    //设置图片的路径
    img.src = '/css/images' + imgArr[i];
    //设置点的样式
    lis[i].className = 'btn-active';
}

//封装自动切换的函数
function autoBanner() {
    i++;
    if (i > imgArr.length - 1) {
        i = 0;
    }
    banner();
}

let timer = setInterval(autoBanner, 3000);
//鼠标移入停止定时器
slideBanner.onmouseover = function () {
    clearInterval(timer);
}
//鼠标离开开启定时器
slideBanner.onmouseout = function () {
    timer = setInterval(autoBanner, 3000);
}

//下一张
next.onclick = function () {
    i++;
    if (i > imgArr.length - 1) {
        i = 0;
    }
    //设置图片路径
    banner();
}
//上一张
prev.onclick = function () {
    i--;
    if (i < 0) {
        i = imgArr.length - 1;
    }
    //设置图片路径
    banner();
}

//点击点
//拿到所有点
for (let j = 0; j < lis.length; j++) {
    //绑定点击事件
    lis[j].onmouseover = function () {
        //设置图片路径
        i = j;
        banner();
    }
}

//楼层效果
let elevator = document.querySelector('.elevator');
let header = document.querySelector('.header');
let items = document.querySelectorAll('.items');
let eleA = document.querySelectorAll('.elevator>a');

//header+banner的高度
let to = header.offsetHeight + slideBanner.offsetHeight + 40;//基础的距离

//声明一个数组，存储四个div距上面的距离
let floor = [];
//拿到四个div
for (let i = 0; i < items.length; i++) {
    to = to + items[i].offsetHeight
    floor.push(to);
}
console.log(floor);

//封装去掉a样式的函数
function clear() {
    for (let i = 0; i < eleA.length; i++) {
        eleA[i].className = '';
    }
}


