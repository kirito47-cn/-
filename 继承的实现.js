//继承的实现方式
//1.构造函数绑定 call/apply
/**
 * 在子类内部调用父类，通过call改变父类中this的指向
 * 复制父类的实例属性给子类
 * 可以实现多继承 可以继承父类的属性但无法继承原型中的方法
 * 子类产生的实例不是父类的实例
 */
function Animal(){
    this.species = '动物'
}
function Cat(name,color){
    Animal.call(this,arguments)
    this.name = name;
    this.color = color;
}
let cat1 = new Cat('打毛','yellow')
console.log(cat1 instanceof Animal);
/**
 * 2\原型链继承
 * 子类的实例是父类的实例
 * 可以继承父类的方法但是属性不继承
 * 
 */
function Person(name,age){
    this.name = name;
    this.age = age;
}
Person.prototype.sayName = function(){
    console.log(`hello i am ${this.name}`);
}
function Student(){
    this.score = 100;
}
Student.prototype = new Person();
Student.prototype.constructor = Student;
let s = new Student();

/**
 * 3\组合继承将上面两种继承方式组合起来
 */
function Person(name,age){
    this.name = name;
    this.age = age;
}
Person.prototype.sayName = function(){
    console.log(`hello i am ${this.name}`);
}
function Student(){
    Person.call(this,...arguments)
    this.score = 100;
}
Student.prototype = new Person();
Student.prototype.constructor = Student;
let s1 = new Student('xiaoming',16);
console.log(s1.name);
console.log(s1 instanceof Person);