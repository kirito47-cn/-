(function (window) {


    const PENDING = 'pending'
    const RESOLVED = 'resolved'
    const REJECTED = 'rejected'

    /**
     * promise的构造函数
     * @param：一个执行器函数 同步执行
     * @returns：一个实例化的promise对象
     */
    function Promise(excutor) {
        const self = this;
        self.status = PENDING //保存当前状态
        self.data = undefined; //给promise对象制定一个用于存储结果的属性
        self.callbacks = [] //保存回调函数 结构为{onResolved(){},onRejected(){}}
        function resolve(value) {
            if (self.status !== PENDING) {
                return;
            }
            //将状态改为resolved
            self.status = RESOLVED
            //保存value数据
            self.data = value
            //如果有callback函数 立即异步执行onResolved
            if (self.callbacks.length > 0) {
                self.callbacks.forEach(callbacksObj => {
                    setTimeout(() => {
                        callbacksObj.onResolved(value);
                    });
                })
            }
        }

        function reject(value) {
            if (self.status !== PENDING) {
                return;
            }
            //将状态改为rejected
            self.status = REJECTED
            //保存value数据
            self.data = value
            //如果有callback函数 立即异步执行onRejected 将onRejected 放入异步队列
            if (self.callbacks.length > 0) {
                setTimeout(() => {
                    self.callbacks.forEach(callbacksObj => {
                        callbacksObj.onRejected(value);
                    })
                });
            }
        }
        //异常的捕获机制 如果抛出异常则reject
        try {
            excutor(resolve, reject);
        } catch (error) {
            reject(error)
        }

    }
    //静态函数 返回一个promise对象 状态为resolved
    Promise.resolve = function (value) {

    }
    Promise.reject = function (reason) {

    }
    /**
     * 指定成功和失败的回调函数 可能直接调用也可能保存（根据执行器中的调用是否为异步）
     * 返回一个新的promise对象
     */
    Promise.prototype.then = function (onResolved, onRejected) {
        const self = this;
        onResolved = typeof onResolved ==='function' ?onResolved : value=>value//制定默认的失败的回调（实现异常穿透的关键点）

        onRejected = typeof onRejected ==='function' ?onRejected : reason=>{throw reason}//制定默认的失败的回调（实现异常穿透的关键点）
        return new Promise((resolve, reject) => {
            //调用指定函数执行 根据执行结果 改变return的promise的状态
            function handle(callback){
                /**
             *  /**
                 * 1、如果回调函数抛出异常，则返回的promise就会失败 reason为error
                 * 2、如果回调函数返回的不是promise，那么返回的promise就会成功，value为返回的值
                 * 3、如果回调函数返回一个promise，那么返回的promise的结果就是这个promise的结果
                 */
             /* @param {*} callback 
             */
                try {
                    const result = callback(self.data);
                    if (result instanceof Promise) { //如果回调函数返回一个promise，那么返回的promise的结果就是这个promise的结果
                        //    result.then(value=>{
                        //            resolve(value)//当result成功时候 ，那么返回的新的promise也成功
                        //    },reason=>{
                        //             reject(reason)
                        //    })
                        result.then(resolve, reject)
                    } else { //如果回调函数返回的不是promise，那么返回的promise就会成功，value为返回的值
                        resolve(result)
                    }
                } catch (error) { //如果回调函数抛出异常，则返回的promise就会失败 reason为error
                    reject(error)
                }

            }
            if (self.status === PENDING) {
                //当前状态是pending状态，将回调函数保存起来
                self.callbacks.push({
                    onResolved(value){
                       handle(onResolved)
                    },
                    onRejected(reason){
                        handle(onRejected)
                    }
                })
            } else if (self.status === RESOLVED) {//如果当前是resolved 异步执行onresolved冰改变return的promise状态
                setTimeout(() => {
                    handle(onResolved)
                })
            } else {
                setTimeout(() => {//如果当前是rejected异步执行onrejected冰改变return的promise状态
                    handle(onRejected)
                })
            }
        })

    }
    Promise.prototype.catch = function (onRejected) {
            return  this.then(undefined,onRejected)
    }
    // Promise.prototype.all = function(arr:Array<Promise>){

    // }
    // Promise.prototype.race = function(arr:Array<Promise>){

    // }
    window.Promise = Promise;
})(window)