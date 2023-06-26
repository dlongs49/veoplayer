export class paramsRules {
    constructor(arg) {
        const { url,style } = arg
        this.style = style
        this.url  = url
        this.styleRulus()
        this.urlRules()
    }
    styleRulus(){
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
    urlRules(){
        if(this.url === null || this.url === undefined || this.url === ""){
            throw new Error("url为必传项")
            return
        }
        if(Object.prototype.toString.call(this.url) === '[object String]' || Object.prototype.toString.call(this.url) === '[object array]'){
            return true
        }else{
            throw new Error("url参数不合法")
        }
    }
}