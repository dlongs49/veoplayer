/**
 * Time: 2023-06-23 01:00 PM
 * Author: dinglong
 */



/**
 * 格式化视频时长
 * @param {string} 视频时长 
 * @returns timestr
 * @example 1:20:12
 */
export const formatTime = (params) => {
    const hour = Math.floor(params / 3600)
    const minutes = Math.floor(params / 60 % 60)
    const seconds = Math.floor(params % 60)

    const hourStr = hour > 0 ? hour + ":" : ''
    const minutesStr = minutes > 9 ? minutes : '0' + minutes
    const secondsStr = seconds > 9 ? seconds : '0' + seconds
    const timeStr = `${hourStr}${minutesStr}:${secondsStr}`
    return timeStr;
}
/**
 * 根据视频地址得到视频后缀名
 * @param {string} 视频地址链接 
 * @returns str
 * @example .mp4
 */
export const formatVideo = (params) => {
    let idx = params.lastIndexOf(".")
    if (idx != -1){
        let str = params.slice(idx)
        return str
    }
}