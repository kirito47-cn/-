/**
 * 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“Start” ）。

机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。

问总共有多少条不同的路径？

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/unique-paths
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
    if (m < 0 || n < 0) return;
    let dp = new Array(n);
    for (let i = 0; i < n; i++) {
        dp[i] = new Array(m)
        dp[i][0] = 1;
    }
    for (let j = 0; j < m; j++) {
        dp[0][j] = 1
    }
    for(let k = 1;k<n;k++){
        for(let z = 1;z<m;z++){
            dp[k][z] = dp[k-1][z] + dp[k][z-1];
        }
    }
    return dp[n-1][m-1]
};
console.log( uniquePaths(7,3) )
