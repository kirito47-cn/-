/**
 * 面试题22. 链表中倒数第k个节点
输入一个链表，输出该链表中倒数第k个节点。为了符合大多数人的习惯，本题从1开始计数，即链表的尾节点是倒数第1个节点。例如，一个链表有6个节点，从头节点开始，它们的值依次是1、2、3、4、5、6。这个链表的倒数第3个节点是值为4的节点。

 

示例：

给定一个链表: 1->2->3->4->5, 和 k = 2.

返回链表 4->5.
 */

  
 function ListNode(val) {
     this.val = val;
     this.next = null;
 }
 let p1 = new ListNode(1)
 p1.next = new ListNode(2)

/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var getKthFromEnd = function(head, k) {
    //倒数第k个是正数第长度-k+1个
    let len = 1;
    let p = head;
    while(p.next){
        len++;
        p = p.next
    }
    // console.log(len)
    let q = head;
   for (let i = 0; i < len-k; i++) {
        q = q.next
       
   }
    return q;
};
console.log(getKthFromEnd(p1,1))