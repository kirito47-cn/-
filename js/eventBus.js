"use strict";
var eventEmitter = /** @class */ (function () {
    function eventEmitter() {
        this.events = {};
    }
    eventEmitter.prototype.on = function (eventName, cb) {
        // 一个时间名称可以保存多个cb
        if (!this.events[eventName]) {
            this.events[eventName] = [cb];
        }
        else {
            this.events[eventName].push(cb);
        }
    };
    eventEmitter.prototype.emit = function (eventName, payload) {
        this.events[eventName] && this.events[eventName].forEach(function (cb) { return cb(payload); });
    };
    return eventEmitter;
}());
var em = new eventEmitter();
em.on('click', function (d) {
    console.log("click" + d);
});
em.emit('click', 3);
