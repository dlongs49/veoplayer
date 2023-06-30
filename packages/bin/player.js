import { CreateVeoNode } from "./createVeoNode.js";
import { formatTime, isDom, isPc } from "../utils/format.js";

export class VeoPlayer extends CreateVeoNode {
    durationTime = 1
    PERCENTILE = 100 // 百分比
    SLIDE_OFFSET = 0.8 // 提示滑块偏移量
    VOLUME_LEN = 100 // 音量总长
    isNode = true;
    timer = null;
    constructor(arg) {
        let { id, poster, volume, style, bokeh, plugins, islive, url, width, height, speed, autoplay, setting } = arg
        let w = width || 665
        let h = height || 440
        super({ ...arg, width: w, height: h })
        this.height = h
        this.width = w
        this.id = id;
        this.isNode = isDom(id)
        this.poster = poster || null
        this.url = url
        this.islive = islive
        this.bokeh = bokeh
        this.speed = speed
        this.autoplay = autoplay
        this.volume = volume || 70
        this.#initNode()
        this.#initPlayer()
    }

    #initNode() {
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
        let veoError = veoContainer.querySelector(".veo-error")
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
            veoError,
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

    #initPlayer() {
        let { veo, veoSpeed, veoDownload, veoCapture, veoSpeedCon, veoSetting, veoSettingOutcon, veoVolume, veoVolumeOutcon } = this.#initNode()
        veo.volume = this.volume / 100
        this.veoLoadStart();
        this.veoLoaded();
        this.#containerMouse()
        this.veoWaiting();
        this.veoError();
        this.veoPlaying();
        if (!this.isBool(this.islive)) {
            this.#veoMouseTime();
            if (veoSpeed != null) {
                this.#veoSpeedNode()
                this.#mouseInout(veoSpeed, veoSpeedCon, "opacity")
            }
            if (veoDownload != null) {
                this.#voeDownLoad()
            }
            if (veoSetting != null) {
                this.#mouseInout(veoSetting, veoSettingOutcon, "opacity")
                this.#handleVeoSetting()
            }
            if (veoCapture != null) {
                this.#veoCapture();
            }
        }
        this.#veoPlayPause();
        this.#veoConPlay();
        this.veoPlayEnded();
        this.#veoScreen()
        this.#veoKeyCode();

        this.#veoVolume()

        this.#mouseInout(veoVolume, veoVolumeOutcon, "opacity")
    }
    /**
     * method
     * 视频预加载
     */
    veoLoadStart(callback) {
        let {
            veo,
            veoLoading
        } = this.#initNode()
        veo.addEventListener('loadstart', (e) => {
            if (callback) {
                callback(e)
            }
            veoLoading.style.display = 'block'
            this.#voeInitVolume('init')
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
        } = this.#initNode()

        veo.addEventListener('loadedmetadata', (e) => {
            if (callback) {
                callback(e)
            }

            let duration = e.target.duration
            // Infinity 超出无穷大 或为 视频实时
            if (this.isBool(this.islive) === false && duration != Infinity) {
                let spanNode = veoTimeTotal.querySelector("span")
                let svgNode = veoTimeTotal.querySelectorAll("svg")
                this.durationTime = duration
                let time = formatTime(duration)
                svgNode[0].style.display = svgNode[1].style.display = veoLoading.style.display = 'none';
                spanNode.innerHTML = time
                this.veoProgressBuffer()
                this.#veoProcessOffset()

            } else {
                veoLoading.style.display = 'none';
            }
            if (this.autoplay) {
                this.#veoPlayPauseNode("play")
            } else {
                this.#veoPlayPauseNode("pause")
            }
            this.veoTimeUpdate()
            this.#veoPoster()
            this.#veoBgPicture()
        })
    }
    /**
     * 背景虚化图
     */
    #veoBgPicture() {
        const { veo, veoPosterImg } = this.#initNode()
        let isObj = this.isObject(this.bokeh)
        let isStr = this.isString(this.bokeh)
        this.timer = null
        if (isObj) {
            let seconds = this.isNumber(this.bokeh.seconds)
            // 截取第一帧作为封面
            this.timer = setTimeout(() => {
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
    #containerMouse() {
        let { veoControl, veoScreen, veoContainer, veoVideo } = this.#initNode()
        veoContainer.addEventListener("mouseenter", (e) => {
            veoContainer.classList.add("veo-control-isshow")
        })
        veoControl.addEventListener("mouseenter", (e) => {
            veoContainer.classList.add("veo-control-isshow")
        })
        veoContainer.addEventListener("mouseleave", (e) => {
            if (veoVideo.dataset.type === "play") {
                return
            }
            veoContainer.classList.remove("veo-control-isshow")
        })
        // let index = veoScreen.dataset.index
        // veoVideo.addEventListener("mousemove", (e) => {
        //     veoContainer.classList.add("veo-control-isshow")
        //     if (index === '1' && this.isMouse) {
        //         setTimeout(() => {
        //             veoContainer.classList.remove("veo-control-isshow")
        //         }, 2000);
        //     }

        // })

    }

    /**
     * 视频封面
     */
    #veoPoster() {
        const { veo } = this.#initNode()
        if (this.poster) {
            veo.poster = this.poster
        } else {
        }
    }

    /**
     * function
     * 视频加载错误
     */
    veoError(callback) {
        let { veoError, veo, veoErrorMsg, veoTimeSvgs, veoLoading } = this.#initNode()
        veo.addEventListener("error", (e) => {
            if (callback) {
                e.video_type = "video"
                callback(e)
            }
            veoTimeSvgs[0].style.display = veoLoading.style.display = 'none';
            veoTimeSvgs[1].style.display = 'block'
            veoError.style.display = 'flex'
            let msg = e.target.error ? e.target.error.message : "视频加载异常"
            veoErrorMsg.innerHTML = `[${msg}]`
        })
        let veosource = veo.querySelector("source")
        if (veosource) {
            veosource.addEventListener("error", (event) => {
                if (callback) {
                    event.video_type = "source"
                    callback(event)
                }
                veoTimeSvgs[0].style.display = veoLoading.style.display = 'none';
                veoTimeSvgs[1].style.display = 'block'
                veoError.style.display = 'flex'
                veoErrorMsg.innerHTML = "[视频加载失败]"
            })
        }

    }

    /**
     * method
     * 视频加载等待中
     */
    veoWaiting(callback) {
        let { veoLoading, veo } = this.#initNode()
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
        let { veo, veoLoading } = this.#initNode()
        veo.addEventListener('playing', function (e) {
            if (callback) {
                callback(e)
            }
            veoLoading.style.display = 'none'
        })
    }

    /**
     * method
     * 进度条缓冲条
     */
    veoProgressBuffer(callback) {
        let { veoContainer, veo, veoBuff } = this.#initNode()
        veo.addEventListener("progress", (e) => {
            let hc = e.target.buffered.end(0)
            if (callback) {
                callback(e)
            }
            let w = veoContainer.offsetWidth
            let buffWidth = (hc * w) / veo.duration
            veoBuff.style.width = ((buffWidth / w) * 100) + "%"
        })
    }

    /**
     * 进度条时长提示
     */
    #veoMouseTime() {
        const { veoOut, veo, veoCon, veoTimeSlide } = this.#initNode()
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
                let left = (veoConWidth * this.PERCENT) / (veoConWidth + veoTimeSlide.offsetWidth) - this.SLIDE_OFFSET
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
    #veoProcessOffset() {
        const { veo, veoIng, veoCon, veoSub, veoTimeIng, veoContainer } = this.#initNode()


        let barX = 0
        let barLeft = 0
        let veoConWidth = veoContainer.offsetWidth
        let duration = veo.duration
        const elemMove = (e) => {
            const cx = e.clientX
            let x = (cx - barX + barLeft)
            let offset = x / veoConWidth
            if (offset > -1 && offset <= 1) {
                let currentTime = (duration * x) / veoConWidth
                const ingWidth = x / veoConWidth
                veoIng.style.width = (ingWidth * 100) + '%'
                veoSub.style.left = ((ingWidth * 100) - 0.5) + '%'
                let time = formatTime(currentTime)
                veoTimeIng.innerHTML = time
                veo.currentTime = currentTime
                this.#veoPlayPauseNode("play")
            }
        }

        let flag = false
        veoSub.addEventListener("mousedown", (e) => {
            flag = true
            barX = e.clientX
            barLeft = e.target.offsetLeft
            window.addEventListener("mousemove", elemMove)
        })
        window.addEventListener('mouseup', (e) => {
            window.removeEventListener("mousemove", elemMove)
        })
        veoSub.addEventListener("mouseup", (e) => {
            flag = true
        })


        veoCon.addEventListener("click", (e) => {
            if (flag) return
            let veoConWidth = veoContainer.offsetWidth
            let duration = veo.duration
            let x = e.offsetX
            let currentTime = (duration * x) / veoConWidth
            const ingWidth = x / veoConWidth
            veoIng.style.width = (ingWidth * 100) + '%'
            veoSub.style.left = ((ingWidth * 100) - 0.5) + '%'
            let time = formatTime(currentTime)
            veoTimeIng.innerHTML = time
            veo.currentTime = currentTime
            this.#veoPlayPauseNode("play")
        })
    }

    /**
     * 播放时长更改
     */
    veoTimeUpdate(callback) {
        const { veo, veoCon, veoIng, veoSub, veoTimeIng } = this.#initNode()

        veo.addEventListener("timeupdate", (e) => {
            let currentTime = veo.currentTime
            if (veoCon != null) {
                let veoConWidth = veoCon.offsetWidth
                let duration = veo.duration
                const ingWidth = ((veoConWidth * currentTime) / duration) / veoConWidth

                if (veoIng) {
                    veoIng.style.width = (ingWidth * 100) + '%'
                    veoSub.style.left = ((ingWidth * 100) - 0.5) + '%'
                }
            }

            let time = formatTime(currentTime)
            e.veoFormatTime = time
            // 外部调用
            if (callback) {
                callback(e)
            }
            veoTimeIng.innerHTML = time
        })
    }

    /**
     * 播放 暂停 Node操作
     */
    #veoPlayPauseNode(type) {
        const { veo, veoPlayPause, veoVideo } = this.#initNode()
        const nodeList = veoPlayPause.getElementsByTagName("svg")
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
    #veoPlayPause() {
        const { veoPlayPause } = this.#initNode()
        veoPlayPause.addEventListener("click", (e) => {
            let { type } = e.target.dataset
            this.#veoPlayPauseNode(type)
        })
        this.veoPlay()
        this.veoPause()
    }

    /**
     * method
     * 播放
     */
    veoPlay(callback) {
        const { veo } = this.#initNode()
        veo.addEventListener("play", (e) => {
            if (callback) {
                callback(e)
            }
        })
    }
    /**
     * method
     * 暂停
    */
    veoPause(callback) {
        const { veo } = this.#initNode()
        veo.addEventListener("pause", (e) => {
            if (callback) {
                callback(e)
            }
        })
    }
    /**
     * 容器播放
     */
    #veoConPlay() {
        const { veoVideo, veoMutualPlay, veoMutualPause } = this.#initNode()
        veoVideo.addEventListener("click", (e) => {
            let { type } = e.target.dataset
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
            this.#veoPlayPauseNode(type)
        })
    }

    /**
     * 播放结束
     */
    veoPlayEnded(callback) {
        const { veo, veoContainer } = this.#initNode()
        veo.addEventListener("ended", (e) => {
            if (callback) {
                callback(e)
            }
            veoContainer.classList.add("veo-control-isshow")
            this.#veoPlayPauseNode('pause')
        })
    }

    /**
     * 播放速度
     */
    #veoSpeedNode() {
        const { veo, veoSpeedItemNode } = this.#initNode()
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
     * 视频下载
     */
    #voeDownLoad() {
        const { veoDownload, veo } = this.#initNode()
        veoDownload.addEventListener("click", (e) => {

        })
    }

    /**
     * 设置开关
     */
    #handleVeoSetting() {
        const { veoSwitch, veo } = this.#initNode()
        for (let i = 0; i < veoSwitch.length; i++) {
            veoSwitch[i].addEventListener("click", (e) => {
                if (veoSwitch[i].classList.length === 1) {
                    veoSwitch[i].classList.add("veo-switch-active")
                } else {
                    veoSwitch[i].classList.remove("veo-switch-active")
                }
                let { name, state } = e.target.dataset
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
    #mouseInout(el, node, type = "display") {
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
    #veoCapture() {
        const { veo, veoCapture } = this.#initNode()
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
    #veoVolume() {
        const { veoVolume } = this.#initNode()
        const volumeList = veoVolume.getElementsByTagName("svg")
        this.#veoHandleVolume()
        for (let i = 0; i < volumeList.length; i++) {
            volumeList[i].addEventListener("click", (e) => {
                const { val } = e.target.dataset
                if (val === "volume") {
                    volumeList[0].style.display = "none"
                    volumeList[1].style.display = "block"
                    this.#veoIsMuted(true)
                } else {
                    volumeList[0].style.display = "block"
                    volumeList[1].style.display = "none"
                    this.#veoIsMuted(false)
                }
            })
        }
    }

    /**
     * 设置静音
     */
    #veoIsMuted(isMuted) {
        const { veo } = this.#initNode()
        veo.muted = isMuted
    }

    /**
     * 初始化音量
     */
    #voeInitVolume(type = 'init', eY) {

        const {
            veo,
            veoVolumeProgressPertxt,
            veoVolumeProgress,
            veoVolumeProgressIng,
            veoVolumeProgressBar
        } = this.#initNode()

        const volumeHeight = veoVolumeProgress.offsetHeight
        let height = 0
        let volumeNum = 0
        if (type == 'init') {
            volumeNum = this.volume / this.VOLUME_LEN
            height = ((volumeHeight * this.volume) / this.VOLUME_LEN) / volumeHeight * 100
        } else {
            const y = volumeHeight - eY
            volumeNum = ((this.VOLUME_LEN * y) / volumeHeight) / 100
            height = (y / volumeHeight) * 100
        }
        veo.volume = volumeNum
        veoVolumeProgressIng.style.height = height + '%';
        veoVolumeProgressBar.style.bottom = (height - 8) + '%';
        veoVolumeProgressPertxt.innerHTML = (Math.floor(height)) + '%';
    }

    /**
     * 音量设置
     */
    #veoHandleVolume() {
        const { veoVolumeProgress, veoVolume, veoVolumeProgressBar } = this.#initNode()
        const volumeList = veoVolume.getElementsByTagName("svg")

        veoVolumeProgress.addEventListener("click", (e) => {
            let y = e.offsetY
            this.#voeInitVolume(null, y)
        })

        let barY = 0
        let barBottom = 0
        const proHeight = veoVolumeProgress.offsetHeight
        const elemMove = (e) => {
            const y = isPc() ? e.clientY : e.touches[0].clientY
            let offset = (proHeight - (y - barY + barBottom))
            let by = (100 * offset) / proHeight
            if (by > -1 && by <= 100) {
                this.#voeInitVolume(null, proHeight - offset)
                this.#veoIsMuted(false)
                volumeList[1].style.display = "none"
                volumeList[0].style.display = "block"
            }

            if (by <= 0) {
                this.#veoIsMuted(true)
                volumeList[0].style.display = "none"
                volumeList[1].style.display = "block"
            }
        }

        veoVolumeProgressBar.addEventListener(isPc() ? "mousedown" : "touchstart", (e) => {
            console.log(e);
            barY = isPc() ? e.clientY : e.touches[0].clientY
            barBottom = e.target.offsetTop
            window.addEventListener(isPc() ? "mousemove" : "touchmove", elemMove)
        })
        window.addEventListener(isPc() ? "mouseup" : "touchend", (e) => {
            window.removeEventListener(isPc() ? "mousemove" : "touchmove", elemMove)
        })

    }

    /**
     * 全屏
     */
    #veoScreen() {
        const { veoContainer, veoScreen } = this.#initNode()
        const screenFunc = (e) => {
            let isFullScreen = document.fullscreenElement
            if (!isFullScreen) {
                veoContainer.requestFullscreen()
                // setTimeout(() => {
                //     veoContainer.classList.remove("veo-control-isshow")
                // }, 2000);
                veoScreen.dataset.index = 0
                veoScreen.setAttribute("label", "退出")
            } else {
                document.exitFullscreen()
                veoScreen.dataset.index = 1
                veoScreen.setAttribute("label", "全屏")
            }
        }
        veoScreen.addEventListener("click", (e) => {
            screenFunc(e)
        })
        veoContainer.addEventListener("dblclick", (e) => {
            screenFunc(veoScreen)
            this.#veoPlayPauseNode("play")
        })
    }

    /**
     * 键盘控制
     */
    #veoKeyCode() {
        const { veoPlayPause } = this.#initNode()

        document.addEventListener("keyup", (e) => {
            let { key } = e
            if (key === " ") {
                let type = veoPlayPause.dataset.type
                this.#veoPlayPauseNode(type)
            }
        })
    }
}
