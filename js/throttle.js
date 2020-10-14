"use strict";
function throttle(fn, time) {
    if (time === void 0) { time = 300; }
    var pre = 0;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var now = new Date().getTime();
        if (now - pre > time) {
            fn.apply(this, args);
            pre = now;
        }
    };
}
function dounce(fn, time) {
    var firstTime = true;
    var timer;
    return function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (firstTime) {
            fn.apply(this, args);
            return (firstTime = false);
        }
        if (timer) {
            clearTimeout(timer);
            timer = null;
            return;
        }
        timer = setTimeout(function () {
            fn.apply(_this, args);
        }, time);
    };
}
