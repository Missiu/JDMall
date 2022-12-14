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