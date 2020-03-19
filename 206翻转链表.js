/**
 * 面试题24. 反转链表
定义一个函数，输入一个链表的头节点，反转该链表并输出反转后链表的头节点。

 

示例:

输入: 1->2->3->4->5->NULL
输出: 5->4->3->2->1->NULL
 

限制：

0 <= 节点个数 <= 5000
 */


 
  function ListNode(val) {
      this.val = val;
      this.next = null;
 }
 let p1 = new ListNode(1)
 let p2 = new ListNode(2)
 let p3 = new ListNode(3)
 let p4 = new ListNode(4)
 let p5 = new ListNode(5)
p1.next = p2
p2.next = p3
p3.next = p4;
p4.next = p5
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    let p = head;
    if(!p.next) return p;
    let pre = null;
    let newHead = null;
    while(p){
       newHead = p.next;
       p.next = pre;
       pre = p;
       p = newHead;
    }
    return pre
   
};
console.log(reverseList(p1))