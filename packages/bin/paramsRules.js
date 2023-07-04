export class paramsRules {
    constructor(arg) {
        const { style, islive, url } = arg
        this.style = style
        this.islive = islive || false
        this.url = url
        this.styleRulus()
    }
    styleRulus() {
        if (!this.style) {
            return []
        }
        if (Object.prototype.toString.call(this.style) === '[object Object]') {
            let arr = []
            Object.keys(this.style).map((v, i) => {
                let value = Object.values(this.style)[i]
                arr.push({ key: v, value })
            })
            return arr

        } else {
            throw new Error(`[style]数据类型错误，期待数据类型值[object]`)
        }
    }

    isBool(params) {
        if (typeof params === 'boolean') {
            return true
        } else {
            return false
        }
    }
    isString(params) {
        return typeof params === 'string' && Object.prototype.toString.call(params) === '[object String]' ? true : false
    }
    isNumber(params) {
        return Number.isInteger(params)
    }
    isObject(params) {
       return Object.prototype.toString.call(params) === '[object Object]' ? true : false
    }
    urlRules() {
        let is = Object.prototype.toString.call(this.url)
        if (is === '[object String]' || is === "[object Array]") {
            return is
        } else {
            throw new Error(`[url]数据类型错误，期待数据类型值[String or Array]`)
        }
    }
}
