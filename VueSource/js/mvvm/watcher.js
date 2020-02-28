function Watcher(vm, exp, cb) {//订阅者
  this.cb = cb;  // callback
  this.vm = vm;
  this.exp = exp;//表达式
  this.depIds = {};  // {0: d0, 1: d1, 2: d2} 包含所有dep的容器对象
  this.value = this.get();//得到表达式初始值保存
}

Watcher.prototype = {
  update: function () {
    this.run();
  },
  run: function () {
    // 得到最新的值
    var value = this.get();
    // 得到旧值
    var oldVal = this.value;
    // 如果不相同
    if (value !== oldVal) {
      this.value = value;
      // 调用回调函数更新对应的界面
      this.cb.call(this.vm, value, oldVal);
    }
  },
  addDep: function (dep) {
    if (!this.depIds.hasOwnProperty(dep.id)) {
      // 将watcher 添加到dep
      dep.addSub(this);
      // 建立watcher到dep的关系
      this.depIds[dep.id] = dep;
    }
  },
  // 获取当前表达式的值,建立dep与watcher的关系
  get: function () {
    Dep.target = this;
    //获取表达式的值 内部调用get（）建立关系
    var value = this.getVMVal();
    //去除dep中指定的watcher
    Dep.target = null;
    return value;
  },
 // 获取当前表达式的值, 内部会导致属性的get()调用
  getVMVal: function () {
    var exp = this.exp.split('.');
    var val = this.vm._data;
    exp.forEach(function (k) {
      val = val[k];
    });
    return val;
  }
};
/*

const obj1 = {id: 1}
const obj12 = {id: 2}
const obj13 = {id: 3}
const obj14 = {id: 4}

const obj2 = {}
const obj22 = {}
const obj23 = {}
// 双向1对1
// obj1.o2 = obj2
// obj2.o1 = obj1

// obj1: 1:n
obj1.o2s = [obj2, obj22, obj23]

// obj2: 1:n
obj2.o1s = {
  1: obj1,
  2: obj12,
  3: obj13
}
*/

