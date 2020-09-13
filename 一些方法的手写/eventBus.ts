interface IEvents {
    [key:string] : ((payload?:any) => any)[]
}
class eventEmitter{
    events:IEvents
    constructor(){
        this.events = {}
    }
    on(eventName:string,cb:(payload?:any)=>any){
        // 一个时间名称可以保存多个cb
        if(!this.events[eventName]){
            this.events[eventName] = [cb]
        }else {
            this.events[eventName].push(cb)
        }
    }
    emit(eventName:string,payload?:any) {
        this.events[eventName] && this.events[eventName].forEach(cb => cb(payload) )
    }
}
const em = new eventEmitter()
em.on('click',d=>{
    console.log(`click${d}`)
})
em.emit('click',3)