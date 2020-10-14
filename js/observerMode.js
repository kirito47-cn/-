"use strict";
var subject = /** @class */ (function () {
    function subject(name) {
        this.name = name;
        this.state = '';
        this.observer = [];
    }
    // 收集观察者
    subject.prototype.attact = function (o) {
        this.observer.push(o);
    };
    // 更新被观察者的方法
    subject.prototype.setState = function (newState) {
        var _this = this;
        this.state = newState;
        this.observer.forEach(function (o) { return o.update(_this); });
    };
    return subject;
}());
var observer = /** @class */ (function () {
    function observer(name) {
        this.name = name;
    }
    // 观察者更新的方法
    observer.prototype.update = function (subject) {
        console.log("\u5F53\u524D" + this.name + "\u88AB\u901A\u77E5\u4E86\uFF0C\u5F53\u524D\u88AB\u89C2\u5BDF\u8005" + subject.name + "\u72B6\u6001\u4E3A" + subject.state);
    };
    return observer;
}());
var xm = new subject('小明');
var xh = new subject('小红');
var teacher1 = new observer('王老师');
var teacher2 = new observer('李老师');
xm.attact(teacher1);
xh.attact(teacher1);
xh.attact(teacher2);
xm.setState('开心');
xh.setState('伤心');
