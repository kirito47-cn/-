class MyVue {
    constructor(options) {
        this.$options = options;
        var data = this._data = this.$options.data;
        var me = this;
        Object.keys(data).forEach(key => {
            this._proxy(key)
        })
        this.$compile = new  Compile(this.$options.el,me)
    }
    _proxy(key) {
        // var me = this

        // debugger;
        Object.defineProperty(this, key, {
            
            configurable: false,
            enumerable: true,
            get() {
                console.log(`检测到读取`)
                return this._data[key]
            },
            set(newVal) {
                console.log(`发生了变化！`)
                this._data[key] = newVal
            }
        })
    }
}