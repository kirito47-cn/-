/**
 * 给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

    示例:

    输入: [-2,1,-3,4,-1,2,1,-5,4],
    输出: 6
    解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。

    来源：力扣（LeetCode）
    链接：https://leetcode-cn.com/problems/maximum-subarray
    著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

 /** 暴力破解法
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
   
        let max = nums[0];
        for(let i = 0;i<nums.length;i++){
            let sum = 0
            for(let j = i;j<nums.length;j++){
                sum+=nums[j]
                max = Math.max(max,sum)
                 
            }
        }
        return max
    };
 /** 贪心算法
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
       let max_coding_here = nums[0];
       let max_so_far  = nums[0];
       for(let i = 1 ;i<nums.length;i++){
           max_coding_here = Math.max(nums[i],max_coding_here+nums[i]);
           max_so_far = Math.max(max_coding_here,max_so_far)
       }
       return max_so_far
}