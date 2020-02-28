/**
 * 判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。

        示例 1:

        输入: 121
        输出: true
        示例 2:

        输入: -121
        输出: false
        解释: 从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。
        示例 3:

        输入: 10
        输出: false
        解释: 从右向左读, 为 01 。因此它不是一个回文数。


 */
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    return x == parseInt(x.toString().split('').reverse().join(''))
};
/** 不转为字符串
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    let tempx = x;
    if(x==0) return true;
    if(x<0||x%10==0) return false;
    //得到x的各个位数上的数字
    let temp = 0
    while(x>0){
        temp =temp*10+ x%10;
        x = Math.floor(x/10);
    }
    return tempx== temp
};
console.log(isPalindrome(121))
