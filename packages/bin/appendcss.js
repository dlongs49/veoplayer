import { cssStr } from './excss.js'

(() => {
    let style = document.createElement("style")
    style.setAttribute("veo-css-type", "veoplayer")
    style.setAttribute("type", "text/css")
    style.innerHTML = cssStr
    document.head.appendChild(style)
}
)()