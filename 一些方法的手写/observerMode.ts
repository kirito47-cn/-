class subject {
    name:string
    state: string
    observer: observer[]
    constructor(name:string) {
        this.name = name
        this.state = ''
        this.observer = []        
    }
    // 收集观察者
    attact(o:observer) {
        this.observer.push(o)
    }
    // 更新被观察者的方法
    setState(newState:string) {
        this.state = newState
        this.observer.forEach(o=>o.update(this))
    }
}   
class observer{
    name: string
    constructor(name:string) {
        this.name = name
    }
    // 观察者更新的方法
    update(subject: subject){
        console.log(`当前${this.name}被通知了，当前被观察者${subject.name}状态为${subject.state}`)
    }
}
const xm = new subject('小明')
const xh = new subject('小红')
const teacher1 = new observer('王老师')
const teacher2 = new observer('李老师')
xm.attact(teacher1)
xh.attact(teacher1)

xh.attact(teacher2)

xm.setState('开心')
xh.setState('伤心')


