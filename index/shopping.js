

window.addEventListener("load", function () {
  var info_1_img = document.querySelector(".info_1_img");
  var mask = document.querySelector(".mask");
  var big = document.querySelector(".big");
  // 1. 当我们鼠标经过 info_1_img 就显示和隐藏 mask 遮挡层 和 big 大盒子
  info_1_img.addEventListener("mouseover", function () {
    mask.style.display = "block";
    big.style.display = "block";
  });
  info_1_img.addEventListener("mouseout", function () {
    mask.style.display = "none";
    big.style.display = "none";
  });
  // 2. 鼠标移动的时候，让黄色的盒子跟着鼠标来走
  info_1_img.addEventListener("mousemove", function (e) {
    // (1). 先计算出鼠标在盒子内的坐标
    var x = e.pageX - this.offsetLeft;
    var y = e.pageY - this.offsetTop;
    // console.log(x, y);
    // (2) 减去盒子高度 300的一半 是 150 就是我们mask 的最终 left 和top值了
    // (3) 我们mask 移动的距离
    var maskX = x - mask.offsetWidth / 2;
    var maskY = y - mask.offsetHeight / 2;
    // (4) 如果x 坐标小于了0 就让他停在0 的位置
    // 遮挡层的最大移动距离
    var maskMax = info_1_img.offsetWidth - mask.offsetWidth;
    if (maskX <= 0) {
      maskX = 0;
    } else if (maskX >= maskMax) {
      maskX = maskMax;
    }
    if (maskY <= 0) {
      maskY = 0;
    } else if (maskY >= maskMax) {
      maskY = maskMax;
    }
    mask.style.left = maskX + "px";
    mask.style.top = maskY + "px";
    // 3. 大图片的移动距离 = 遮挡层移动距离 * 大图片最大移动距离 / 遮挡层的最大移动距离
    // 大图
    var bigIMg = document.querySelector(".bigImg");
    // 大图片最大移动距离
    var bigMax = bigIMg.offsetWidth - big.offsetWidth;
    // 大图片的移动距离 X Y
    var bigX = (maskX * bigMax) / maskMax;
    var bigY = (maskY * bigMax) / maskMax;
    bigIMg.style.left = -bigX + "px";
    bigIMg.style.top = -bigY + "px";
  });
});


// 商品切换
window.addEventListener("load", function () {
  var li = document.querySelectorAll(".info_1_suo li");
  var img = document.querySelector(".information_img");
  var bigimg = document.querySelector(".bigImg");
  
  for (let i = 1; i < li.length-1; i++) {
    li[i].addEventListener("mouseover", function () {
      img.setAttribute("src", "/img/object" + [i] + ".jpg");
      for(let j = 1; j < li.length; j++){
        if(li[j].getAttribute('class') != li[i].getAttribute('class')){
          li[j].setAttribute('class','')
        }
      }
      li[i].setAttribute("class", "info_1_suo_li");
      bigimg.setAttribute("src", "/img/big" + [i] + ".jpg");
    });
  }
});


// 价格切换
window.addEventListener("load",function(){
  var change = document.querySelectorAll(".xuan_right_b img");
  var textChange = document.querySelector(".textChange"); 
})
