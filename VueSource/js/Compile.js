function Compile(el, vm) {
  // 保存vm
  this.$vm = vm;
  // 保存el元素
  this.$el = this.isElementNode(el) ? el : document.querySelector(el);
  // 如果el元素存在
  if (this.$el) {
    // 1. 取出el中所有子节点, 封装在一个framgment对象中
    this.$fragment = this.node2Fragment(this.$el);
    // 2. 编译fragment中所有层次子节点
    this.init();
    // 3. 将fragment添加到el中
    this.$el.appendChild(this.$fragment);
  }
}
// @ts-ignore
Compile.prototype = {
    node2Fragment(el){
         var fragment = document.createDocumentFragment(),
         child;
         while(child = el.firstChild){
             fragment.appendChild(child);
         }
         return fragment;
    },
    init(){
         this.compileElement(this.$fragment)
    },
    compileElement:function(el){
        var childNodes = el.childNodes,
             me = this;
         [].slice.call(childNodes).forEach(node=>{
             // @ts-ignore
             var text = node.textContent;
             // @ts-ignore
             var reg = /\{\{(.*)\}\}/;
             if(me.isElementNode(node)){
                 me.compile(node)
             }else if(me.isTextNode(node)&&reg.test(text)){
                 me.compileText(node,RegExp.$1);
             }
             if(node.childNodes && node.childNodes.length){
                 me.compileElement(node)
             }
         })
    },
    compile: function (node) {
             // 得到所有标签属性节点
             var nodeAttrs = node.attributes,
             me = this;
             // 遍历所有属性
             [].slice.call(nodeAttrs).forEach(function (attr) {
             // 得到属性名: v-on:click
             var attrName = attr.name;
             // 判断是否是指令属性
             if (me.isDirective(attrName)) {
                 // 得到表达式(属性值): test
                 var exp = attr.value;
                 // 得到指令名: on:click
                 var dir = attrName.substring(2);
                 // 事件指令
                 if (me.isEventDirective(dir)) {
                 // 解析事件指令
                 compileUtil.eventHandler(node, me.$vm, exp, dir);
                 // 普通指令
                 } else {
                 // 解析普通指令
                 compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
                 }

                 // 移除指令属性
                 node.removeAttribute(attrName);
             }
             });
         },
    compileText(node,exp){
         compileUtil.text(node,this.$vm,exp)
    },
    isElementNode(node){
        return node.nodeType  === 1;
    },
    isTextNode(node){
        return node.nodeType === 3;
    },
    isDirective(attrName){
        return attrName.indexOf('v-') == 0;
    },
    isEventDirective: function (dir) {
        return dir.indexOf('on') === 0;
    }
}
// @ts-ignore
var  compileUtil = {
     text:function(node,vm,exp){
         this.bind(node,vm,exp,'text')
     },
     html:function(node,vm,exp){
        this.bind(node,vm,exp,'html')
     },
     class:function(node,vm,exp){
         this.bind(node,vm,exp,'class')
     },
     bind:function(node,vm,exp,dir){
         var updateFn = updater[dir+'Updater']
         updateFn && updateFn(node,this._getVMVal(vm,exp))
     },
     eventHandler(node,vm,exp,dir){
        var eventType = dir.split(':')[1],
            fn = vm.$options.methods&&vm.$options.methods[exp];
        if(eventType && fn){
            node.addEventListener(eventType,fn.bind(vm),false)
        }

     },
     _getVMVal:function(vm,exp){
         var val = vm._data;
         exp = exp.split('.');
         exp.forEach(k=>{
             val = val[k]
         })
         return val;
     }

}
// @ts-ignore
var updater = {
         // 更新节点的textContent
         textUpdater: function (node, value) {
             node.textContent = typeof value == 'undefined' ? '' : value;
         },
         htmlUpdater:function (node,value){
             node.innerHTML = typeof value == 'undefined' ? '' : value;
         },
         classUpdater:function(node,value){
            var className = node.className;
            node.className = className +(className?' ':'')+value
         }
     }
 