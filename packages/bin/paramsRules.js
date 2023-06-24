export class paramsRules {
    constructor(arg) {
        const { style } = arg
        this.style = style
        this.rulusStyle()
    }
    rulusStyle(){
        if(!this.style){
            return []
        }
        if(Object.prototype.toString.call(this.style) === '[object Object]'){
            let arr = []
            Object.keys(this.style).map((v,i)=>{
                let value = Object.values(this.style)[i]
                if(typeof value != 'string'){
                    throw new Error(`${v}数据类型错误，期待数据类型值[string]`)
                }
                arr.push({key:v,value})
            })
           return arr
           
        }else{
            throw new Error(`[style]数据类型错误，期待数据类型值[object]`)
        }
    }
}