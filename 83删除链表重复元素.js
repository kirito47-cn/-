/**
 * 给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次。

    示例 1:

    输入: 1->1->2
    输出: 1->2
    示例 2:

    输入: 1->1->2->3->3
    输出: 1->2->3

    来源：力扣（LeetCode）
    链接：https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list
    著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

  
  function ListNode(val) {
      this.val = val;
      this.next = null;
  }

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function(head) {
    let p = head;
     if(head == null){
         return null;
     }
     if(!head.next){
         return head;
     }
     while(p.next){
         if(p.val == p.next.val){
             p.next = p.next.next
         }else{
             p = p.next
         }
     }
     return head
};