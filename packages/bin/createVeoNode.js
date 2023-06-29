import { error_close, error_time } from '../svg_js/error_close.js'
import { veo_loading, time_loading } from '../svg_js/loading.js'
import { play, pause, play_mutual, pause_mutual } from '../svg_js/play_pause.js'
import { strike } from '../svg_js/strike.js'
import { download } from '../svg_js/download.js'
import { setting } from '../svg_js/setting.js'
import { capture } from '../svg_js/capture.js'
import { volume, volume_mute } from '../svg_js/volume.js'
import { full_screen, exit_full_screen } from '../svg_js/screen.js'
import { formatVideo,isDom } from '../utils/format.js'
import { paramsRules } from './paramsRules.js'
// import "../style/style.css"
export class CreateVeoNode extends paramsRules {
    #PLAY_LABEL = "播放"
    #PAUSE_LABEL = "暂停"
    #SPEED_LABEL = "倍速"
    #DOWNLOAD_LABEL = "下载"
    #SETTING_LABEL = "设置"
    #LOOP_LABEL = "循环播放"
    #PIP_LABEL = "画中画"
    #CAPTURE_LABEL = "截图"
    #FULL_SCREEN_LABEL = "全屏"
    #EXIT_FULL_SCREEN_LABEL = "退出全屏"
    #VOLUME_LABEL = "音量"
    #VOLUME_MUTE_LABEL = "静音"
    #VIDEO_FORMAT_LIST = [".m3u8", ".mp4", ".webm"]
    constructor(arg) {
        let { id, style, url, width,plugins, islive, height, speed, autoplay, setting: settings } = arg
        super(arg)
        this.idNode = id
        this.style = style
        this.url = url
        this.plugins = plugins || []
        this.islive = islive
        this.width = width || 665
        this.height = height || 440
        this.speed = speed || [2, 1.5, 1, 0.75, 0.5]
        this.autoplay = autoplay
        this.settings = settings || ["loop"]
        this.#createParentNode()
    }
    /**
     * 返回根元素
     * @returns ElementNode
     */
    getParentNode() {
        let isNode = isDom(this.idNode)
        return isNode ? document.getElementById(this.idNode) : this.idNode
    }

    /**
     * 创建根节点
     */
    #createParentNode() {
        const parentNode = this.getParentNode()
        this.styleArr = this.styleRulus()
        this.styleArr.map(v => {
            if (v.key === "themeColor") {
                parentNode.style.setProperty("--veo-color-primary", v.value || '#fff')
            }
            if (v.key === "processColor") {
                parentNode.style.setProperty("--veo-process-color", v.value)
            }
        })
        parentNode.setAttribute("class", "veo-container veo-control-isshow")
        parentNode.style.setProperty("width", this.width + "px")
        parentNode.style.setProperty("height", this.height + "px")
        const veoVideo = document.createElement("div")
        veoVideo.setAttribute("class", "veo-video")
        veoVideo.setAttribute("data-type", "play")
        parentNode.appendChild(veoVideo)
        this.#createVideoNode(veoVideo)

        this.#createPoster()
        this.#createErrorNode()
        this.#createLoadingNode()
        this.#createControlNode()

    }
    /**
     * 创建【视频】节点
     */
    #createVideoNode(veoVideo) {
        const video = document.createElement("video")
        const urlR = this.urlRules()
        if (!urlR) return
        const suffix = formatVideo(this.url)
        const sourceaAdd = (i) => {
            const source = document.createElement("source")
            source.setAttribute("type", "video/mp4")
            video.autoplay = this.autoplay
            source.src = i === "string" ? this.url : this.url[i]
            video.appendChild(source)
        }

        if (urlR === "[object String]") {
            if (suffix.includes(".m3u8")) {
                let hls = new Hls();
                hls.loadSource(this.url)
                hls.attachMedia(video)

            } else {
                sourceaAdd("string")
            }
        } else if (urlR === "[object Array]") {
            for (let i = 0; i < this.url.length; i++) {
                sourceaAdd(i)
            }
        }



        video.setAttribute("crossorigin", "anonymous")
        veoVideo.appendChild(video)
    }
    /**
     * 创建 【封面】 节点
     */
    #createPoster() {
        const parentNode = this.getParentNode()
        const veoPoster = document.createElement("div")
        veoPoster.setAttribute("class", "veo-poster")
        const veoPosterBg = document.createElement("div")
        veoPosterBg.setAttribute("class", "veo-poster-bg")
        const veoPosterImg = document.createElement("img")
        veoPosterImg.setAttribute("class", "veo-poster-img")
        veoPosterBg.appendChild(veoPosterImg)
        veoPoster.appendChild(veoPosterBg)
        parentNode.appendChild(veoPoster)
    }
    /**
     * 创建 【错误】节点
     */
    #createErrorNode() {
        const parentNode = this.getParentNode()
        const veoError = document.createElement("div")
        veoError.setAttribute("class", "veo-error")
        parentNode.appendChild(veoError)
        veoError.innerHTML = error_close
        const veoErrorMsg = document.createElement("span")
        veoErrorMsg.setAttribute("class", "veo-error-msg")
        veoError.appendChild(veoErrorMsg)
    }
    /**
     * 创建 【加载】 节点
     */
    #createLoadingNode() {
        const parentNode = this.getParentNode()
        const veoLoading = document.createElement("div")
        veoLoading.setAttribute("class", "veo-loading")
        veoLoading.innerHTML = veo_loading
        parentNode.appendChild(veoLoading)
        this.#createIsPlay()
    }
    /**
     * 创建容器播放交互 节点
     */
    #createIsPlay() {
        const parentNode = this.getParentNode()
        const veoMutual = document.createElement("div")
        veoMutual.setAttribute("class", "veo-mutual")
        const veoMplay = document.createElement("div")
        veoMutual.appendChild(veoMplay)
        veoMplay.setAttribute("class", "veo-mutual-play")
        veoMplay.innerHTML = play_mutual
        const veoMpause = document.createElement("div")
        veoMutual.appendChild(veoMpause)
        veoMpause.setAttribute("class", "veo-mutual-pause")
        veoMpause.innerHTML = pause_mutual
        parentNode.appendChild(veoMutual)
    }
    /**
     * 创建 【底部控制区】 节点
     * @returns {ElementNode} VEO_PROCESS_CON_NODE, VEO_PLAYER_CON_NODE
     */
    #createControlNode() {
        const parentNode = this.getParentNode()
        const veoControl = document.createElement("div")
        parentNode.appendChild(veoControl)
        veoControl.setAttribute("class", "veo-control")
        if (!this.isBool()) {
            const veoProcessCon = document.createElement("div")
            veoProcessCon.setAttribute("class", "veo-process-con")
            veoControl.appendChild(veoProcessCon)
            this.#createProgressNode()
        }
        const veoPlayerCon = document.createElement("div")
        veoPlayerCon.setAttribute("class", "veo-player-con")
        veoControl.appendChild(veoPlayerCon)
        /*-------------*/
        this.#getControlNode()
        this.#createPlayerNode()

    }
    /**
     * @returns {Object} 返回底部控制区域
     */
    #getControlNode() {
        const parentNode = this.getParentNode()
        return {
            VEO_PROCESS_CON_NODE: parentNode.getElementsByClassName("veo-process-con")[0],
            VEO_PLAYER_CON_NODE: parentNode.getElementsByClassName("veo-player-con")[0]
        }
    }
    /**
     * 创建 【进度条】区域
     */
    #createProgressNode() {
        const { VEO_PROCESS_CON_NODE } = this.#getControlNode()
        const VEO_PROCESS_LIST = [
            "veo-process-out",
            "veo-process-ing",
            "veo-process-buff",
            "veo-process-sub",
            "veo-process-time-slide"]
        for (let i = 0; i < VEO_PROCESS_LIST.length; i++) {
            const veoProcess = document.createElement("div")
            veoProcess.setAttribute("class", VEO_PROCESS_LIST[i])
            VEO_PROCESS_CON_NODE.appendChild(veoProcess)
            let pro = this.styleArr.find(v => v.key === "processColor")
            if (pro) {
                if (i === 1 || i === 3) {
                    veoProcess.style.setProperty("background", pro.value)
                    veoProcess.setAttribute("data-color", pro.value)
                }
            }
        }
    }
    /**
     * 创建 【播放区域】节点
     */
    #createPlayerNode() {
        const { VEO_PLAYER_CON_NODE } = this.#getControlNode()
        const VEO_PLAYER_LIST = [
            "veo-left-control",
            "veo-center-control",
            "veo-right-control",
        ]
        for (let i = 0; i < VEO_PLAYER_LIST.length; i++) {
            const veoPlayer = document.createElement("div")
            veoPlayer.setAttribute("class", VEO_PLAYER_LIST[i])
            VEO_PLAYER_CON_NODE.appendChild(veoPlayer)
        }
        this.#createPlayPauseNode();
        if (!this.isBool()) {
            for (let i = 0; i < this.plugins.length; i++) {
                let item = this.plugins[i]
                if(item === "speed") {
                    this.#createSpeedNode();
                }
                if(item === "download") {
                    this.#createDownloadNode();
                }
                if(item === "setting"){
                    this.#createSettingNode()
                }
                if(item === "capture"){
                    this.#createCameraNode()
                }
            }
        }
        this.#createVolumeNode();
        this.#createFullScreenNode()
    }
    /**
     * @returns {Object} 返回底部左中右区域
     */
    #getLeftCnterRightNode() {
        const parentNode = this.getParentNode()
        return {
            VEO_LEFT_CONTROL_NODE: parentNode.getElementsByClassName("veo-left-control")[0],
            VEO_CENTER_CONTROL_NODE: parentNode.getElementsByClassName("veo-center-control")[0],
            VEO_RIGHT_CONTROL_NODE: parentNode.getElementsByClassName("veo-right-control")[0]
        }
    }
    /**
     * 创建 【播放 & 暂停 & 时长】节点
     */
    #createPlayPauseNode() {
        const { VEO_LEFT_CONTROL_NODE } = this.#getLeftCnterRightNode()
        const veoPlayPause = document.createElement("div")
        veoPlayPause.setAttribute("class", "veo-play-pause")
        veoPlayPause.setAttribute("label", this.#PAUSE_LABEL)
        veoPlayPause.setAttribute("data-type", "play")
        veoPlayPause.innerHTML = play + pause
        VEO_LEFT_CONTROL_NODE.appendChild(veoPlayPause)
        this.#createDurationNode()
    }
    /**
     * 创建 【时长】节点
     */
    #createDurationNode() {
        const { VEO_LEFT_CONTROL_NODE } = this.#getLeftCnterRightNode()
        const veoTime = document.createElement("div")
        veoTime.setAttribute("class", "veo-time")
        VEO_LEFT_CONTROL_NODE.appendChild(veoTime)
        let VEO_TIME_LIST = [
            "veo-time-ing",
            "veo-slash",
            "veo-time-total",
        ]
        if (this.isBool()) {
            VEO_TIME_LIST.splice(1, 2)
        }
        for (let i = 0; i < VEO_TIME_LIST.length; i++) {
            const veoTimeNode = document.createElement("div")
            veoTimeNode.setAttribute("class", VEO_TIME_LIST[i])
            veoTime.appendChild(veoTimeNode)
            if (i === 0) {
                veoTimeNode.innerHTML = "00:00"
            }
            if (i === 1) {
                veoTimeNode.innerHTML = "/"
            }
            if (i === 2) {
                const span = document.createElement("span")
                veoTimeNode.innerHTML = time_loading + error_time
                veoTimeNode.appendChild(span)
            }
        }
    }
    /**
    * 待定
    */
    #createCenterNode() { }
    /**
     * 创建 【倍速播放】节点 
     */
    #createSpeedNode() {
        const { VEO_RIGHT_CONTROL_NODE } = this.#getLeftCnterRightNode()
        const veoSpeed = document.createElement("div")
        veoSpeed.setAttribute("class", "veo-speed")
        veoSpeed.setAttribute("label", this.#SPEED_LABEL)
        VEO_RIGHT_CONTROL_NODE.appendChild(veoSpeed)
        const veoSpeedSpan = document.createElement("span")
        veoSpeedSpan.innerHTML = this.#SPEED_LABEL
        veoSpeed.appendChild(veoSpeedSpan)
        const veoSpeedOutcon = document.createElement("div")
        veoSpeedOutcon.setAttribute("class", "veo-speed-outcon")
        veoSpeed.appendChild(veoSpeedOutcon)
        const veoSpeedIncon = document.createElement("div")
        veoSpeedIncon.setAttribute("class", "veo-speed-incon")
        veoSpeedOutcon.appendChild(veoSpeedIncon)
        const SPEED_TOTAL = this.speed
        for (let i = 0; i < SPEED_TOTAL.length; i++) {
            const veoSpeedItem = document.createElement("div")
            const itemSpan = document.createElement("span")
            veoSpeedItem.setAttribute("class", "veo-speed-item")
            veoSpeedIncon.appendChild(veoSpeedItem)
            veoSpeedItem.appendChild(itemSpan)
            itemSpan.innerHTML = SPEED_TOTAL[i] + 'x'
            veoSpeedItem.innerHTML = strike + itemSpan.outerHTML
            if (SPEED_TOTAL[i] === 1) {
                veoSpeedItem.setAttribute("class", "veo-speed-item veo-speed-active")
            }
        }
    }
    /**
     * 创建 【下载】节点
     */
    #createDownloadNode() {
        const { VEO_RIGHT_CONTROL_NODE } = this.#getLeftCnterRightNode()
        const veoDownload = document.createElement("div")
        veoDownload.setAttribute("class", "veo-download")
        veoDownload.setAttribute("label", this.#DOWNLOAD_LABEL)
        veoDownload.innerHTML = download
        VEO_RIGHT_CONTROL_NODE.appendChild(veoDownload)
    }
    /**
     * 创建 【设置】节点
     */
    #createSettingNode() {
        const { VEO_RIGHT_CONTROL_NODE } = this.#getLeftCnterRightNode()
        const veoSetting = document.createElement("div")
        veoSetting.setAttribute("class", "veo-setting")
        veoSetting.setAttribute("label", this.#SETTING_LABEL)
        veoSetting.innerHTML = setting
        const veoSettingOutcon = document.createElement("div")
        veoSettingOutcon.setAttribute("class", "veo-setting-outcon")
        const veoSettingIncon = document.createElement("div")
        veoSettingIncon.setAttribute("class", "veo-setting-incon")
        veoSettingOutcon.appendChild(veoSettingIncon)
        veoSetting.appendChild(veoSettingOutcon)
        const VEO_SETT_LIST = this.settings
        for (let i = 0; i < VEO_SETT_LIST.length; i++) {
            const veoSettingItem = document.createElement("div")
            const itemSpan = document.createElement("span")
            veoSettingItem.setAttribute("class", "veo-setting-item")
            veoSettingIncon.appendChild(veoSettingItem)
            veoSettingItem.appendChild(itemSpan)
            // 开关
            const veoSwitch = document.createElement("div")
            veoSwitch.setAttribute("class", "veo-switch")
            veoSwitch.setAttribute("data-name", VEO_SETT_LIST[i])
            veoSwitch.setAttribute("data-state", '')
            veoSettingItem.appendChild(veoSwitch)
            const veoSwitchBar = document.createElement("div")
            veoSwitchBar.setAttribute("class", "veo-switch-bar")
            veoSwitch.appendChild(veoSwitchBar)
            if (VEO_SETT_LIST[i] === "loop") {
                itemSpan.innerHTML = this.#LOOP_LABEL
            }
            if (VEO_SETT_LIST[i] === "pip") {
                itemSpan.innerHTML = this.#PIP_LABEL
            }
        }
        VEO_RIGHT_CONTROL_NODE.appendChild(veoSetting)
    }
    /**
     * 创建 【截图】节点
     */
    #createCameraNode() {
        const { VEO_RIGHT_CONTROL_NODE } = this.#getLeftCnterRightNode()
        const veoCapture = document.createElement("div")
        veoCapture.setAttribute("class", "veo-capture")
        veoCapture.setAttribute("label", this.#CAPTURE_LABEL)
        veoCapture.innerHTML = capture
        VEO_RIGHT_CONTROL_NODE.appendChild(veoCapture)
    }
    /**
     * 创建 【音量】节点
     */
    #createVolumeNode() {
        const { VEO_RIGHT_CONTROL_NODE } = this.#getLeftCnterRightNode()
        const veoVolume = document.createElement("div")
        veoVolume.setAttribute("class", "veo-volume")
        veoVolume.setAttribute("label", this.#VOLUME_LABEL)
        veoVolume.innerHTML = volume + volume_mute

        const veoVolumeOutcon = document.createElement("div")
        veoVolumeOutcon.setAttribute("class", "veo-volume-outcon")
        const veoVolumeIncon = document.createElement("div")
        veoVolumeIncon.setAttribute("class", "veo-volume-incon")
        veoVolumeOutcon.appendChild(veoVolumeIncon)
        const veoVolumePertxt = document.createElement("div")
        veoVolumePertxt.setAttribute("class", "veo-volume-pertxt")
        veoVolumePertxt.innerHTML = "100%"
        veoVolumeIncon.appendChild(veoVolumePertxt)
        const veoVolumeProgressCon = document.createElement("div")
        veoVolumeProgressCon.setAttribute("class", "veo-volume-progress-con")
        veoVolumeIncon.appendChild(veoVolumeProgressCon)
        const veoVolumeProgress = document.createElement("div")
        veoVolumeProgress.setAttribute("class", "veo-volume-progress")
        veoVolumeProgressCon.appendChild(veoVolumeProgress)
        const veoVolumeProgressLine = document.createElement("div")
        veoVolumeProgressLine.setAttribute("class", "veo-volume-progress-line")
        veoVolumeProgress.appendChild(veoVolumeProgressLine)
        const veoVolumeProgressIng = document.createElement("div")
        veoVolumeProgressIng.setAttribute("class", "veo-volume-progress-ing")
        veoVolumeProgress.appendChild(veoVolumeProgressIng)
        const veoVolumeProgressBar = document.createElement("div")
        veoVolumeProgressBar.setAttribute("class", "veo-volume-progress-bar")
        veoVolumeProgressCon.appendChild(veoVolumeProgressBar)
        veoVolume.appendChild(veoVolumeOutcon)
        VEO_RIGHT_CONTROL_NODE.appendChild(veoVolume)
        let v = veoVolume.getElementsByTagName("svg")
        v[0].setAttribute("data-val", "volume")
        v[1].setAttribute("data-val", "volume-mute")

    }
    /**
     * 创建 【全屏 & 退出全屏】节点
     */
    #createFullScreenNode() {
        const { VEO_RIGHT_CONTROL_NODE } = this.#getLeftCnterRightNode()
        const veoScreen = document.createElement("div")
        veoScreen.setAttribute("class", "veo-screen")
        veoScreen.setAttribute("label", this.#FULL_SCREEN_LABEL)
        veoScreen.setAttribute("data-index", "1")
        veoScreen.innerHTML = full_screen + exit_full_screen
        VEO_RIGHT_CONTROL_NODE.appendChild(veoScreen)
    }
};