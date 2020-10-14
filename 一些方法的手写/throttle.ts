function throttle(fn:(...any:any[]) =>any,time:number = 300) {
    let pre = 0
     return function (this: any, ...args:any[]) {
        let now = new Date().getTime()
        if(now - pre > time) {
            fn.apply(this,args)
            pre = now
        }
    }
}
function dounce(fn:(...any:any[]) => any,time:number) {
    let firstTime = true
  let timer:number | null
  return function(this:any,...args:any[]) {
      if(firstTime) {
          fn.apply(this,args)
          return (firstTime = false)
      }
      if(timer) {
          clearTimeout(timer)
          timer = null
          return
      }
      timer = setTimeout(() => {
          fn.apply(this,args)
      }, time);
  }

}