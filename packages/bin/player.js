import {CreateVeoNode} from "./createVeoNode.js";
import {formatTime, formatVideo, isDom, isPc} from "../utils/format.js";

export class VeoPlayer extends CreateVeoNode {
    #SLIDE_OFFSET = 0.8 // 提示滑块偏移量
    #VOLUME_LEN = 100 // 音量总长
    #CONTROL_HIME_TIME = 2800 // 在全屏状态下 控制栏消失倒计时
    #timer = null;
    durationTime = 1
    isNode = true;
    isError = false
    errorText = ""
    durationFormatTime = null
    isFullScreen = 1
    play_type = "pause"

    constructor(arg) {
        let {
            id,
            poster,
            volume,
            style,
            muted,
            anonymous,
            playTime,
            bokeh,
            plugins,
            log,
            islive,
            url,
            width,
            height,
            speed,
            autoplay,
            setting
        } = arg
        let w = width || 665
        let h = height || 440
        let defaultSpeed = speed || [2, 1.5, 1, 0.75, 0.5]
        super({...arg, width: w, height: h, speed: defaultSpeed})
        this.height = h
        this.width = w
        this.id = id;
        this.isNode = isDom(id)
        this.poster = poster || null
        this.url = url
        this.islive = islive || false
        this.muted = muted || false
        this.bokeh = bokeh
        this.speed = speed || defaultSpeed
        this.autoplay = autoplay || false
        this.volume = volume || 70
        this.playTime = playTime
        this.initNode()
        this.initPlayer()
    }

    initNode() {
        let veoContainer = this.isNode ? document.getElementById(this.id) : this.id;
        let veo = veoContainer.querySelector("video");
        let veoPoster = veoContainer.querySelector(".veo-poster");
        let veoPosterImg = veoContainer.querySelector(".veo-poster-img");
        let veoControl = veoContainer.querySelector(".veo-control")
        let veoCon = veoContainer.querySelector(".veo-process-con")
        let veoIng = veoContainer.querySelector(".veo-process-ing")
        let veoOut = veoContainer.querySelector(".veo-process-out")
        let veoSub = veoContainer.querySelector(".veo-process-sub")
        let veoBuff = veoContainer.querySelector(".veo-process-buff")
        let veoTimeSlide = veoContainer.querySelector(".veo-process-time-slide")
        let veoTimeTotal = veoContainer.querySelector(".veo-time-total")
        let veoTimeSvgs = veoContainer.querySelectorAll(".veo-time-total svg")
        let veoErrorMsg = veoContainer.querySelector(".veo-error-msg")
        let veoRefreshOn = veoContainer.querySelector(".veo-refresh-on")
        let veoErrorEl = veoContainer.querySelector(".veo-error")
        let veoVideo = veoContainer.querySelector(".veo-video")
        let veoLoading = veoContainer.querySelector(".veo-loading")
        let veoTimeIng = veoContainer.querySelector(".veo-time-ing")
        let veoSlash = veoContainer.querySelector(".veo-slash")
        let veoPlayPause = veoContainer.querySelector(".veo-play-pause")
        let veoScreen = veoContainer.querySelector(".veo-screen")
        let veoCapture = veoContainer.querySelector(".veo-capture")
        let veoSpeed = veoContainer.querySelector(".veo-speed")
        let veoSpeedCon = veoContainer.querySelector(".veo-speed-outcon")
        let veoVolume = veoContainer.querySelector(".veo-volume")

        let veoVolumeProgress = veoContainer.querySelector(".veo-volume-progress")
        let veoVolumeProgressPertxt = veoContainer.querySelector(".veo-volume-pertxt")
        let veoVolumeProgressLine = veoContainer.querySelector(".veo-volume-progress-line")
        let veoVolumeProgressIng = veoContainer.querySelector(".veo-volume-progress-ing")
        let veoVolumeProgressBar = veoContainer.querySelector(".veo-volume-progress-bar")
        let veoVolumeOutcon = veoContainer.querySelector(".veo-volume-outcon")
        let veoSetting = veoContainer.querySelector(".veo-setting")
        let veoSettingOutcon = veoContainer.querySelector(".veo-setting-outcon")
        let veoDownload = veoContainer.querySelector(".veo-download")
        let veoSpeedItemNode = veoContainer.querySelectorAll(".veo-speed-item")
        let veoSwitch = veoContainer.querySelectorAll(".veo-switch")
        let veoMutualPlay = veoContainer.querySelector(".veo-mutual-play");
        let veoMutualPause = veoContainer.querySelector(".veo-mutual-pause");
        return {
            veoContainer,
            veo,
            veoControl,
            veoPoster,
            veoPosterImg,
            veoCon,
            veoIng,
            veoSlash,
            veoOut,
            veoSub,
            veoVideo,
            veoBuff,
            veoTimeSlide,
            veoTimeTotal,
            veoTimeSvgs,
            veoErrorMsg,
            veoRefreshOn,
            veoErrorEl,
            veoLoading,
            veoTimeIng,
            veoPlayPause,
            veoScreen,
            veoCapture,
            veoSpeed,
            veoSpeedCon,
            veoVolume,
            veoVolumeOutcon,
            veoVolumeProgress,
            veoVolumeProgressPertxt,
            veoVolumeProgressLine,
            veoVolumeProgressIng,
            veoVolumeProgressBar,
            veoSetting,
            veoSettingOutcon,
            veoDownload,
            veoSpeedItemNode,
            veoSwitch,
            veoMutualPlay,
            veoMutualPause
        }
    }

    initPlayer() {
        let {
            veo,
            veoSpeed,
            veoDownload,
            veoCapture,
            veoSpeedCon,
            veoScreen,
            veoSetting,
            veoSettingOutcon,
            veoVolume,
            veoVolumeOutcon
        } = this.initNode()
        // 如果是PC端则动态设置音量，移动端音量直接拉满
        if (isPc()) {
            veo.volume = this.volume / 100
        } else {
            veo.volume = 1
        }
        this.veoLoadStart();
        this.veoLoaded();
        this.containerMouse()
        this.veoWaiting();
        this.veoError();
        this.veoPlaying();


        if (this.islive != true) {
            this.veoMouseTime();
            if (veoSpeed != null) {
                this.veoSpeedNode()
                this.mouseInout(veoSpeed, veoSpeedCon, "opacity")
            }
            if (veoDownload != null) {
                if (this.isAnimation) {
                    this.mouseHover(veoDownload)
                }
                this.voeDownLoad()
            }
            if (veoSetting != null) {
                this.handleVeoSetting()
                this.mouseInout(veoSetting, veoSettingOutcon, "opacity")
            }
            if (veoCapture != null) {
                if (this.isAnimation) {
                    this.mouseHover(veoCapture)
                }
                this.veoCapture();
            }
        }
        this.veoPlayPause();
        this.veoConPlay();
        this.veoPlayEnded();
        this.veoScreen()
        this.veoKeyCode();
        if (this.isAnimation) {
            this.mouseHover(veoScreen)
        }
        if (isPc()) {
            if (this.isAnimation) {
                this.mouseHover(veoVolume.querySelectorAll("svg")[0])
                this.mouseHover(veoVolume.querySelectorAll("svg")[1])
            }
            this.veoVolume()
            this.voeInitVolume('init')
            this.mouseInout(veoVolume, veoVolumeOutcon, "opacity")
        }
        this.veoRefresh()
    }

    /**
     * method
     * 视频预加载
     */
    veoLoadStart(callback) {
        let {
            veo
        } = this.initNode()

        veo.addEventListener('loadstart', (e) => {
            this.networkState = veo.networkState
            this.readyState = veo.readyState
            if (callback) {
                e.networkState = veo.networkState
                e.readyState = veo.readyState
                callback(e)
            }
        })
    }

    /**
     * method
     * 视频预加载
     */
    veoLoaded(callback) {
        let {
            veo,
            veoTimeTotal,
            veoLoading
        } = this.initNode()
        this.loadAndError()
        veo.addEventListener('loadedmetadata', (e) => {
            if (callback) {
                callback(e)
            }
            this.networkState = veo.networkState
            this.readyState = veo.readyState
            let duration = e.target.duration
            // Infinity 超出无穷大 或为 视频实时
            if (this.islive === false && duration !== Infinity) {
                let spanNode = veoTimeTotal.querySelector("span")
                let svgNode = veoTimeTotal.querySelectorAll("svg")
                this.durationTime = duration
                let time = formatTime(duration)
                this.durationFormatTime = time
                svgNode[0].style.display = svgNode[1].style.display = veoLoading.style.display = 'none';
                spanNode.innerHTML = time
                this.veoProgressBuffer()
                this.veoProcessOffset()

            } else {
                veoLoading.style.display = 'none';
            }
            if (this.autoplay) {
                this.veoPlayPauseNode("play")
            } else {
                this.veoPlayPauseNode("pause")
            }
            this.veoSetCurrentTime()
            this.veoTimeUpdate()
            this.veoPoster()
            this.veoBgPicture()
        })

    }

    /**
     * 背景虚化图
     */
    veoBgPicture() {
        const {veo, veoPosterImg} = this.initNode()
        let isObj = this.isObject(this.bokeh)
        let isStr = this.isString(this.bokeh)
        this.#timer = null
        if (isObj) {
            let seconds = this.isNumber(this.bokeh.seconds)
            // 截取第一帧作为封面
            this.#timer = setTimeout(() => {
                let canvas = document.createElement('canvas')
                let width = veo.videoWidth
                let height = veo.videoWidth
                canvas.width = width
                canvas.height = height
                canvas.getContext('2d').drawImage(veo, 0, 0, width, height)
                let dataURL = canvas.toDataURL('image/png')
                veoPosterImg.src = dataURL
            }, seconds ? this.bokeh.seconds * 1000 : 2000);
        }
        if (isStr) {
            veoPosterImg.src = this.bokeh
        }
    }

    /**
     * 容器的滑入滑出
     */
    containerMouse() {
        let {veoControl, veoScreen, veoContainer, veoVideo} = this.initNode()
        let timer = null
        veoContainer.addEventListener("mouseenter", (e) => {
            veoContainer.classList.add("veo-control-isshow")
        })
        veoContainer.addEventListener("mouseleave", (e) => {
            if (veoVideo.dataset.type === "play") {
                return
            }
            veoContainer.classList.remove("veo-control-isshow")
        })
        veoControl.addEventListener("mousemove", (e) => {
            clearTimeout(timer)
            veoContainer.classList.add("veo-control-isshow")
            this.isMouse = false
            let index = veoScreen.dataset.index
            if (index === "1" || this.isMouse === false) {
                return
            }
            isMouseFunc("控制区")
        })
        veoVideo.addEventListener("mousemove", (e) => {
            veoContainer.classList.add("veo-control-isshow")
            let index = veoScreen.dataset.index
            if (index === "1") {
                return
            }
            this.isMouse = true
            isMouseFunc("视频区")

        })
        /**
         * 在全屏状态下鼠标移动在视频区 2 秒后控制区消失
         * 鼠标移动在控制区则保持不消失
         */
        const isMouseFunc = (t) => {
            let index = veoScreen.dataset.index
            clearTimeout(timer)
            if (index === '0' && this.isMouse === true && this.play_type === "play") {
                timer = setTimeout(()=> {
                    this.isMouse = false
                    veoContainer.classList.remove("veo-control-isshow")
                }, this.#CONTROL_HIME_TIME);
            }
        }
    }

    /**
     * 加载交互
     */
    loadAndError(data) {
        let {veoErrorEl, veo, veoErrorMsg, veoTimeSvgs, veoLoading} = this.initNode()
        if (data) {
            veoTimeSvgs[0].style.display = veoLoading.style.display = 'none';
            veoTimeSvgs[1].style.display = veoErrorEl.style.display = 'flex'
            veoErrorMsg.innerHTML = this.errorText = data
            this.isError = true
        } else {
            veoTimeSvgs[0].style.display = veoLoading.style.display = 'flex';
            veoTimeSvgs[1].style.display = veoErrorEl.style.display = 'none'
            this.isError = false
        }
    }

    /**
     * 控件加载交互
     */
    mouseHover(el) {
        el.addEventListener("mouseenter", (e) => {
            el.classList.add('labelFadeAnimation')
        })
        el.addEventListener("mouseleave", (e) => {
            el.classList.remove('labelFadeAnimation')
        })
    }

    /**
     * 视频封面
     */
    veoPoster() {
        const {veo} = this.initNode()
        if (this.poster) {
            veo.poster = this.poster
        } else {
        }
    }

    /**
     * function
     * 视频加载错误
     */
    async veoError(callback) {
        let {veo} = this.initNode()
        const suffix = formatVideo(this.url)
        if (suffix === ".m3u8") {
            const res = await this.loadM3u8();
            this.networkState = veo.networkState
            this.readyState = veo.readyState
            if (callback) {
                if (res.status != 200) {
                    callback(res)
                }
            }
            return
        }
        veo.addEventListener("error", (e) => {
            this.readyState = veo.readyState
            this.networkState = veo.networkState
            if (callback) {
                e.video_type = "video"
                callback(e)
            }
            let msg = e.target.error ? e.target.error.message : "视频加载异常"
            this.loadAndError(`[${msg}]`)
        })
        let veosource = veo.querySelector("source")
        if (veosource) {
            veosource.addEventListener("error", (event) => {
                this.readyState = veo.readyState
                this.networkState = veo.networkState
                if (callback) {
                    event.video_type = "source"
                    callback(event)
                }
                this.loadAndError("[视频加载失败]")
            })
        }


    }

    fetchPromise(url) {
        return new Promise((resolve) => {
            fetch(url).then(res => {
                resolve(res)
            }).catch((err) => {
                resolve(err)
            })
        })
    }

    /**
     * 加载失败 重新请求 m3u8 文件
     * @returns {Promise<boolean>}
     */
    async loadM3u8() {
        this.veoLoaded()
        const res = await this.fetchPromise(this.url)

        if (res.ok !== true) {
            this.loadAndError(`[${res.status}：${res.statusText}]`)
        }
        return res
    }

    /**
     * 重新加载
     */
    veoRefresh(callback) {
        let {veoRefreshOn, veo} = this.initNode()

        const refreshOnM = async (e) => {

            const suffix = formatVideo(this.url)
            if (suffix === ".m3u8") {
                const res = await this.loadM3u8()
                if (callback) {
                    callback(res)
                }
                return
            }

            if (callback) {
                callback(e)
            }
            veo.load()
            this.veoLoaded()
        }
        veoRefreshOn.addEventListener("click", refreshOnM)
    }

    /**
     * method
     * 视频加载等待中
     */
    veoWaiting(callback) {
        let {veoLoading, veo} = this.initNode()
        veo.addEventListener('waiting', function (e) {
            if (callback) {
                callback(e)
            }
            veoLoading.style.display = 'block'
        })
    }

    /**
     * method
     * 视频播放中
     */
    veoPlaying(callback) {
        let {veo, veoLoading} = this.initNode()
        veo.addEventListener('playing', function (e) {
            if (callback) {
                callback(e)
            }
            this.play_type = "play"
            veoLoading.style.display = 'none'
        })
    }

    /**
     * method
     * 进度条缓冲条
     */
    veoProgressBuffer(callback) {
        let {veoContainer, veo, veoBuff} = this.initNode()
        veo.addEventListener("progress", (e) => {
            let w = veoContainer.offsetWidth
            let len = e.target.buffered.length
            for (let i = 0; i < len; i++) {
                if (e.target.buffered.start(len - 1 - i) < veo.currentTime) {
                    let hc = e.target.buffered.end(len - 1 - i)
                    let buffWidth = (hc * w) / veo.duration
                    veoBuff.style.width = ((buffWidth / w) * 100) + "%"
                    break
                }
            }
            if (callback) {
                callback(e)
            }

        })
    }

    /**
     * 进度条时长提示
     */
    veoMouseTime() {
        const {veoOut, veo, veoCon, veoTimeSlide} = this.initNode()
        // 滑块移入
        veoOut.addEventListener("mousemove", (e) => {
            let x = e.offsetX
            let veoConWidth = veoCon.offsetWidth
            let duration = veo.duration || 0
            let count = (x * duration) / veoConWidth
            const timeStr = formatTime(count)
            veoTimeSlide.style.display = 'block'
            veoTimeSlide.setAttribute('data-slideFade', 'in')
            let veoSlideWidthHalf = veoTimeSlide.offsetWidth / 2  // 时长提示块取半
            let left = (100 * (x - veoSlideWidthHalf)) / veoConWidth
            veoTimeSlide.innerHTML = timeStr
            // 判断时长提示块边界可用
            if ((x - veoSlideWidthHalf) > 0 && (x + veoSlideWidthHalf) < veoConWidth) {
                veoTimeSlide.style.left = left + '%'
            }
            // 小于0
            if (x - veoSlideWidthHalf < 0) {
                veoTimeSlide.style.left = '0%'
            }
            // 超出最大盒子限制
            if ((x + veoSlideWidthHalf) > veoConWidth) {
                let left = (veoConWidth * this.PERCENT) / (veoConWidth + veoTimeSlide.offsetWidth) - this.#SLIDE_OFFSET
                veoTimeSlide.style.left = left + '%'
            }
        })
        // 滑块移出
        veoOut.addEventListener("mouseout", (e) => {
            veoTimeSlide.setAttribute('data-slideFade', 'out')
            veoTimeSlide.style.display = 'none'
            veoTimeSlide.style.left = ''
        })
    }

    /**
     * 更改进度条位置
     */
    veoProcessOffset() {
        const {veo, veoIng, veoCon, veoSub, veoTimeIng, veoContainer} = this.initNode()


        let barX = 0
        let barLeft = 0
        let duration = veo.duration
        // 计算进度条值
        const compute = (x) => {
            const veoConWidth = veoContainer.offsetWidth
            const veoSubWidth = veoSub.offsetWidth
            let currentTime = (duration * x) / veoConWidth
            // 进度条 width 值
            const ingWidth = x / veoConWidth
            //滑块 left 值
            const subWidth = (x - (veoSubWidth / 2)) / veoConWidth
            veoIng.style.width = (ingWidth * 100) + '%'
            veoSub.style.left = (subWidth * 100) + '%'
            veoTimeIng.innerHTML = formatTime(currentTime).toString()
            veo.currentTime = currentTime
            this.veoPlayPauseNode("play")
        }
        // 拖动进度条
        const elemMove = (e) => {
            let veoConWidth = veoContainer.offsetWidth
            const cx = e.clientX
            let x = cx - barX + barLeft
            let offset = x / veoConWidth
            if (offset > -1 && offset <= 1) {
                compute(x)
            }
        }

        let flag = false
        veoSub.addEventListener("mousedown", (e) => {
            flag = true
            barX = e.clientX
            barLeft = e.target.offsetLeft
            window.addEventListener("mousemove", elemMove)
        })

        //点击进度条滑块
        veoCon.addEventListener("click", (e) => {
            if (flag) return
            let x = e.offsetX
            flag = false
            compute(x)
        })
        window.addEventListener('mouseup', (e) => {
            flag = false
            window.removeEventListener("mousemove", elemMove)
        })
    }

    /**
     * 播放时长更改
     */
    veoTimeUpdate(callback) {
        const {veo} = this.initNode()
        veo.addEventListener("timeupdate", (e) => {
            let currentTime = veo.currentTime
            e.veoFormatTime = formatTime(currentTime)
            // 外部调用
            if (callback) {
                callback(e)
            }
            this.computedPorcess(currentTime)
        })
    }

    /**
     * 根据时长计算 进度条的 [宽  left] 值
     */
    computedPorcess(data) {
        const {veo, veoCon, veoIng, veoSub, veoTimeIng} = this.initNode()
        let veoSubWidth = veoSub.offsetWidth
        if (veoCon != null) {
            let veoConWidth = veoCon.offsetWidth
            let duration = veo.duration
            const ingWidth = ((veoConWidth * data) / duration) / veoConWidth
            const subWidth = (((veoConWidth * data) / duration) - (veoSubWidth / 2)) / veoConWidth
            if (veoIng) {
                veoIng.style.width = (ingWidth * 100) + '%'
                veoSub.style.left = (subWidth * 100) + '%'
            }
            veoTimeIng.innerHTML = formatTime(data).toString()
        }
    }

    /**
     * 设置记忆时长播放
     */
    veoSetCurrentTime() {
        const {veo} = this.initNode()
        if (this.playTime === null || this.playTime === undefined) return
        if (!this.isNumber(this.playTime)) {
            throw  new Error("[playTime]数据类型异常，期待数据类型为[number]")
        }
        if (this.playTime) {
            this.computedPorcess(this.playTime)
            veo.currentTime = this.playTime
        }
    }

    /**
     * 播放 暂停 Node操作
     */
    veoPlayPauseNode(type) {
        const {veo, veoPlayPause, veoVideo} = this.initNode()
        const nodeList = veoPlayPause.getElementsByTagName("svg")
        this.play_type = type
        if (type === 'play') {
            veo.play()
            veoPlayPause.setAttribute("data-type", "pause")
            veoVideo.setAttribute("data-type", "pause")
            veoPlayPause.setAttribute("label", "暂停")
            nodeList[0].style.setProperty("display", "none")
            nodeList[1].style.setProperty("display", "block")
        } else {
            veo.pause()
            veoPlayPause.setAttribute("data-type", "play")
            veoVideo.setAttribute("data-type", "play")
            veoPlayPause.setAttribute("label", "播放")
            nodeList[0].style.setProperty("display", "block")
            nodeList[1].style.setProperty("display", "none")
        }
    }

    /**
     * 播放 暂停操作
     */
    veoPlayPause() {
        const {veoPlayPause} = this.initNode()
        veoPlayPause.addEventListener("click", (e) => {
            let {type} = e.target.dataset
            this.veoPlayPauseNode(type)
        })
    }

    /**
     * method
     * 播放
     */
    veoPlay() {
        this.veoPlayPauseNode("play")
    }

    /**
     * method
     * 暂停
     */
    veoPause() {
        this.veoPlayPauseNode("pause")
    }

    /**
     * 容器播放
     */
    veoConPlay() {
        const {veoVideo, veoMutualPlay, veoMutualPause} = this.initNode()
        veoVideo.addEventListener("click", (e) => {
            let {type} = e.target.dataset
            if (type === "play") {
                veoMutualPause.style.display = "block"
                setTimeout(() => {
                    veoMutualPause.style.display = "none"
                }, 1500)
            }
            if (type === "pause") {
                veoMutualPlay.style.display = "block"
                setTimeout(() => {
                    veoMutualPlay.style.display = "none"
                }, 1500)
            }
            this.veoPlayPauseNode(type)
        })
    }

    /**
     * 播放结束
     */
    veoPlayEnded(callback) {
        const {veo, veoContainer} = this.initNode()
        veo.addEventListener("ended", (e) => {
            if (callback) {
                callback(e)
            }
            veoContainer.classList.add("veo-control-isshow")
            this.veoPlayPauseNode('pause')
        })
    }

    /**
     * 播放速度
     */
    veoSpeedNode() {
        const {veo, veoSpeedItemNode} = this.initNode()
        for (let i = 0; i < veoSpeedItemNode.length; i++) {
            veoSpeedItemNode[i].addEventListener("click", (e) => {
                for (let idx in veoSpeedItemNode) {
                    // 判断是否为DOM元素
                    if (typeof veoSpeedItemNode[idx] === 'object' && veoSpeedItemNode[idx] instanceof HTMLElement) {
                        veoSpeedItemNode[idx].classList.remove("veo-speed-active")
                    }
                }
                e.target.classList.add("veo-speed-active")
                veo.playbackRate = this.speed[i]
            })
        }
    }

    /**
     * 播放速度发生改变
     */
    veoSpeedChange(callback) {
        const {veo} = this.initNode()
        veo.addEventListener("ratechange", (e) => {
            if (callback) {
                callback(e)
            }
        })
    }

    /**
     * 视频下载
     */
    voeDownLoad() {
        const {veoDownload, veo} = this.initNode()
        veoDownload.addEventListener("click", (e) => {
            fetch(this.url)
                .then(res => res.blob())
                .then(blob => {
                    const a = document.createElement("a");
                    const blobUrl = window.URL.createObjectURL(blob);
                    a.download = new Date().getTime();
                    a.href = blobUrl;
                    a.click();
                    window.URL.revokeObjectURL(blobUrl);
                    a.remove();
                })
        })
    }

    /**
     * 设置开关
     */
    handleVeoSetting() {
        const {veoSwitch, veo, veoSetting} = this.initNode()

        for (let i = 0; i < veoSwitch.length; i++) {
            veoSwitch[i].addEventListener("click", (e) => {
                if (veoSwitch[i].classList.length === 1) {
                    veoSwitch[i].classList.add("veo-switch-active")
                } else {
                    veoSwitch[i].classList.remove("veo-switch-active")
                }
                let {name, state} = e.target.dataset
                if (!name) {
                    throw new Error("切换name必传")
                }
                veoSwitch[i].toggleAttribute("data-state")
                if (name === 'pip') {
                    // 切换画中画显示
                    state === '' ? veo.requestPictureInPicture() : document.exitPictureInPicture()
                }
                if (name === 'loop') {
                    // 循环播放切换
                    state === '' ? veo.loop = true : veo.loop = false
                }
            })
        }
    }

    /**
     * 移入移出
     */
    mouseInout(el, node, type = "display") {
        el.addEventListener("mouseenter", () => {
            if (type === "display") {
                node.style.display = "block"
            } else {
                node.style.opacity = 1
                node.style.visibility = "visible"
            }
        })
        el.addEventListener("mouseleave", () => {
            if (type === "display") {
                node.style.display = "none"
            } else {
                node.setAttribute("style", "")
            }
        })
    }

    /**
     * 截图
     */
    veoCapture() {
        const {veo, veoCapture} = this.initNode()
        const canvas = document.createElement('canvas');
        veoCapture.addEventListener("click", (e) => {
            const w = veo.videoWidth // 视频的真实宽度 即帧宽度
            const h = veo.videoHeight// 视频的真实高度 即帧高度
            canvas.width = w
            canvas.height = h
            const ctx = canvas.getContext('2d')
            ctx.drawImage(veo, 0, 0);
            let url = canvas.toDataURL('image/png');
            let a = document.createElement("a")
            const mouse = new MouseEvent("click")
            a.href = url
            a.download = "capture-" + new Date().getTime()
            a.dispatchEvent(mouse)
        })
    }

    /**
     * 音量
     */
    veoVolume() {
        const {veoVolume} = this.initNode()
        const volumeList = veoVolume.getElementsByTagName("svg")
        this.veoHandleVolume()
        for (let i = 0; i < volumeList.length; i++) {
            volumeList[i].addEventListener("click", (e) => {
                const {val} = e.target.dataset
                if (val === "volume") {
                    this.veoIsMuted(true)
                    this.computedVolume("volume_params", null, 0)
                } else {
                    this.veoIsMuted(false)
                    this.computedVolume("volume_params", null, this.volume)
                }
            })
        }
    }

    /**
     * 设置静音
     */
    veoIsMuted(isMuted) {
        const {veo, veoVolume} = this.initNode()
        const volumeList = veoVolume.getElementsByTagName("svg")
        veo.muted = this.muted = isMuted
        if (isMuted) {
            volumeList[0].style.display = "none"
            volumeList[1].style.display = "block"
        } else {
            volumeList[0].style.display = "block"
            volumeList[1].style.display = "none"
        }
    }

    /**
     * 初始化音量
     */
    voeInitVolume(type = 'init', eY) {
        if (type === 'init') {
            this.computedVolume("volume_params", null, this.volume)
            return
        }
        this.computedVolume(null, eY, this.volume)
    }

    // 计算音量返回值及交互高度
    computedVolume(type, offsetY = 0, volume = 0) {
        const {
            veo,
            veoVolumeProgressPertxt,
            veoVolumeProgress,
            veoVolumeProgressIng,
            veoVolumeProgressBar
        } = this.initNode()
        const volumeHeight = veoVolumeProgress.offsetHeight
        let height = 0
        let volumeNum = 0
        // 根据音量计算
        if (type === "volume_params") {
            volumeNum = volume / this.#VOLUME_LEN
            height = !this.muted ? ((volumeHeight * volume) / this.#VOLUME_LEN) / volumeHeight * 100 : 0
        } else {
            // 根据拖拽音量条计算
            const y = volumeHeight - offsetY
            volumeNum = ((this.#VOLUME_LEN * y) / volumeHeight) / 100
            height = (y / volumeHeight) * 100
            this.volume = Math.floor(volumeNum * 100)
        }
        veo.volume = this.muted ? 0 : volumeNum
        veoVolumeProgressIng.style.height = height + '%';
        veoVolumeProgressBar.style.bottom = (height - 8) + '%';
        veoVolumeProgressPertxt.innerHTML = (Math.floor(height)) + '%';
    }

    /**
     * 音量改变时
     */
    veoVolumeChange(callback) {
        const {
            veo
        } = this.initNode()
        veo.addEventListener("volumechange", (e) => {
            if (callback) {
                callback(e)
            }
        })
    }

    /**
     * 音量设置
     */
    veoHandleVolume() {
        const {veoVolumeProgress, veoVolume, veoVolumeProgressBar} = this.initNode()
        const volumeList = veoVolume.getElementsByTagName("svg")

        veoVolumeProgress.addEventListener("click", (e) => {
            let y = e.offsetY
            this.voeInitVolume(null, y)
        })
        this.veoIsMuted(this.muted)
        let barY = 0
        let barBottom = 0
        const proHeight = veoVolumeProgress.offsetHeight
        const elemMove = (e) => {
            const y = e.clientY
            let offset = (proHeight - (y - barY + barBottom))
            let by = (100 * offset) / proHeight
            if (by > -1 && by <= 100) {
                this.voeInitVolume(null, proHeight - offset)
                this.veoIsMuted(false)
            }

            if (by <= 0) {
                this.veoIsMuted(true)
            }
        }

        veoVolumeProgressBar.addEventListener("mousedown", (e) => {
            barY = e.clientY
            barBottom = e.target.offsetTop
            window.addEventListener("mousemove", elemMove)
        })
        window.addEventListener("mouseup", (e) => {
            window.removeEventListener("mousemove", elemMove)
        })

    }

    /**
     * 全屏
     */
    veoScreen(params) {
        const {veoContainer, veoScreen} = this.initNode()
        const screenFunc = (data) => {
            if (data) {
                veoContainer.requestFullscreen()
                // setTimeout(() => {
                //     veoContainer.classList.remove("veo-control-isshow")
                // }, 2000);
                veoScreen.dataset.index = this.isFullScreen = 0
                veoScreen.setAttribute("label", "退出")
            } else {
                document.exitFullscreen()
                veoScreen.dataset.index = this.isFullScreen = 1
                veoScreen.setAttribute("label", "全屏")
            }
        }
        if (params != null && params !== undefined) {
            screenFunc(params)
        }
        veoScreen.addEventListener("click", (e) => {
            let isfull = document.fullscreenElement
            screenFunc(!isfull)
        })
        veoContainer.addEventListener("dblclick", (e) => {
            let isfull = document.fullscreenElement
            screenFunc(!isfull)
            this.veoPlayPauseNode("play")
        })
    }

    /**
     * 键盘控制
     */
    veoKeyCode() {
        const {veoPlayPause} = this.initNode()

        document.addEventListener("keyup", (e) => {
            let {key} = e
            if (key === " ") {
                let type = veoPlayPause.dataset.type
                this.veoPlayPauseNode(type)
            }
        })
    }

    /**
     * 销毁
     */
    veoDestroy(params) {
        const {veoContainer} = this.initNode()
        if (params) {
            veoContainer.remove()
        } else {
            veoContainer.innerHTML = null
            veoContainer.removeAttribute("style")
            veoContainer.removeAttribute("class")
        }

    }
}
