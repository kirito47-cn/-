class Promise{
     constructor(excutor) {
        const self = this;
       
        const PENDING = 'pending'
        const RESOLVED = 'resolved'
        const REJECTED = 'rejected'
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
    then(onResolved, onRejected) {
        const self = this;
        onResolved = typeof onResolved ==='function' ?onResolved : value=>value//制定默认的失败的回调（实现异常穿透的关键点）

        onRejected = typeof onRejected ==='function' ?onRejected : reason=>{throw reason}//制定默认的失败的回调（实现异常穿透的关键点）
        //返回一个新的promise 
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
    catch(onRejected) {
            return  this.then(undefined,onRejected)
    }
    static resolve(value) {
        return new Promise((resolve,reject)=>{
            // 1、value是promise
            if(value instanceof Promise){//使用value的结果作为promise的结果
                value.then(resolve,reject)
            }else{  //2、value不是promise
                resolve(value)
            }
        })
    }
    //静态函数 返回一个promise对象 状态为rejected
    static reject(reason) {
        //返回一个失败的promise
            return new Promise((resolve,reject)=>{
                reject(reason)
            })
    }
    /**
     * 返回一个新的promise
     * @param:promise对象数组或者数组中不是promise对象
     * @returns：新的promise 当参数中所有的promise成功时返回新的promise结果的数组 有一个失败就失败
     */
    static all(promises){//难点1、知道什么时候全部成功 用一个计数器 2、返回的数组的顺序与放入时候的顺序保持相同
        //用来保存所有成功数据的数组 长度为参数的长度
        const values = new Array(promises.length)
        //用来保存成功promise的数量
        let resolvedCount = 0
        return new Promise((resolve,reject)=>{
            //遍历获取每个promise的结果
            promises.forEach((p,index)=>{
                Promise.resolve(p).then( //数组中的值可能不是promise对象将其包装为promise对象
                    value=>{
                        resolvedCount++;
                        //p成功将成功的值保存到values
                        values[index] = value //顺序应该保持相同
                        //如果全部成功了将return的promise改为成功
                        if(resolvedCount===promises.length){
                            resolve(values)
                        }
                    },
                    reason=>{//只要一个失败 那么return的promise失败
                        reject(reason)
                    }
                )
            })
        })
    }
    /**
     * @param:promise对象数组
     * @returns 新的promise 结果状态由第一个完成的promise来决定
     */
    static race(promises){
        return new Promise((resolve,reject)=>{
            //遍历获取每个promise的结果
            promises.forEach((p,index)=>{
                Promise.resolve(p).then(
                    value=>{ //一旦成功了 将return的promise状态变为成功
                        resolve(value)
                    },
                    reason=>{//一旦成功了 将return的promise状态变为成功
                        reject(reason)
                    }
                )
            })
        })
    }
      /**
     * 自定义方法 Promise.resolveDelay()延迟时间resolve
     * 返回一个promise对象 在指定时间后才确定结果可成功可失败
     */
    static resolveDelay (value, time) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // 1、value是promise
                if (value instanceof Promise) {//使用value的结果作为promise的结果
                    value.then(resolve, reject)
                } else {  //2、value不是promise
                    resolve(value)
                }
            }, time);
        })
    }
     /**
     * 自定义方法 Promise.rejectDelay()延迟时间resolve
     * 返回一个promise对象 在指定时间后才失败
     */
    static rejectDelay (reason,time){
        return new Promise((resolve,reject)=>{
            setTimeout(() => {
                reject(reason)
            }, time);
        })
    }
}
// export default Promise
