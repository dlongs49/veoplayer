import { CreateVeoNode } from "./createVeoNode.js";
import { formatTime } from "../utils/format.js";
import './appendcss.js'
export class VeoPlayer extends CreateVeoNode {
    durationTime = 1
    PERCENTILE = 100 // 百分比
    SLIDE_OFFSET = 0.8 // 提示滑块偏移量
    VOLUME_LEN = 100 // 音量总长
    constructor(arg) {
        let { id, poster, volume, style, url, width, height, speed, autoplay, setting } = arg
        if (!document.getElementById(id)) {
            throw new Error(id + " 元素不存在")
        }

        super({ id, style, url, width, height, speed, autoplay, setting })
        this.id = id;
        this.poster = poster || null
        this.url = url
        this.width = width
        this.height = height
        this.speed = speed
        this.autoplay = autoplay
        this.volume = volume || 70
        this.#initNode()
        this.#initPlayer()
    }
    #initNode() {

        let veoContainer = document.getElementById(this.id);
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
        let { veo, veoSpeed, veoSpeedCon, veoSetting, veoSettingOutcon, veoVolume, veoVolumeOutcon } = this.#initNode()
        veo.volume = this.volume / 100
        this.#veoLoaded();
        this.#veoPoster();
        this.#containerMouse()
        this.#veoWaiting();
        this.#veoError();
        this.#veoPlaying();
        this.#veoMouseTime();
        this.#veoPlayPause();
        this.#veoConPlay();
        this.#veoPlayEnded();
        this.#veoScreen()
        this.#veoKeyCode();
        this.#veoSpeedNode()
        this.#voeDownLoad()
        this.#handleVeoSetting()
        this.#veoCapture();
        this.#veoVolume()
        this.#mouseInout(veoSpeed, veoSpeedCon)
        this.#mouseInout(veoSetting, veoSettingOutcon)
        this.#mouseInout(veoVolume, veoVolumeOutcon, "opacity")
    }
    /**
     * 视频预加载
     */
    #veoLoaded() {
        let { veo, veoCon, veoSpeed, veoDownload, veoSetting, veoTimeTotal, veoControl, veoSlash, veoLoading } = this.#initNode()
        veo.addEventListener('loadstart', (e) => {
            veoLoading.style.display = 'block'
            this.#voeInitVolume('init')
        })
        veo.addEventListener('loadedmetadata', (e) => {
            let spanNode = veoTimeTotal.querySelector("span")
            let svgNode = veoTimeTotal.querySelectorAll("svg")
            let duration = e.target.duration
            this.durationTime = duration
            // Infinity 超出无穷大 或为 视频实时
            if (duration != Infinity) {
                let time = formatTime(duration)
                svgNode[0].style.display = veoLoading.style.display = 'none';
                spanNode.innerHTML = time
                this.#veoProgressBuffer()
                this.#veoProcessOffset()
                if (this.autoplay) {
                    this.#veoPlayPauseNode("play")
                } else {
                    this.#veoPlayPauseNode("pause")
                }
            } else {
                this.#veoPlayPauseNode("play")
                const domList = [veoSlash, veoTimeTotal, veoCon, veoSpeed, veoDownload, veoSetting,]
                veoControl.style.background = "#00000021"
                for (let i = 0; i < domList.length; i++) {
                    domList[i].innerHTML = ""
                }
            }
            this.#veoCurrentUpdate()


        })

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
     * 视频封面背景
     */
    #veoPoster() {
        const { veoPoster, veoPosterImg } = this.#initNode()
        if (this.poster) {
            veoPosterImg.src = "https://p9-pc-sign.douyinpic.com/tos-cn-p-0015/6b8ab94dfbde4b68a5a3daa3073508ff_1643286024~tplv-dy-360p.jpeg?biz_tag=pcweb_cover&from=3213915784&s=PackSourceEnum_FAVORITE&sc=origin_cover&se=false&x-expires=1688702400&x-signature=Dh7RoLuGO8Mwl%2FvOCHcNaLtMnFI%3D"
        } else {
            veoPoster.innerHTML = ""
        }
    }
    /**
     * 视频加载错误
     */
    #veoError() {
        let { veoError, veo, veoErrorMsg, veoTimeSvgs, veoLoading } = this.#initNode()
        veo.addEventListener("error", (e) => {
            veoTimeSvgs[0].style.display = veoLoading.style.display = 'none';
            veoTimeSvgs[1].style.display = 'block'
            veoError.style.display = 'flex'
            let { message } = e.target.error
            veoErrorMsg.innerHTML = message
        })
    }
    /**
     * 视频加载等待中
     */
    #veoWaiting() {
        let { veoLoading, veo } = this.#initNode()
        veo.addEventListener('waiting', function (e) {
            veoLoading.style.display = 'block'
        })
    }
    /**
     * 视频播放中
     */
    #veoPlaying() {
        let { veo, veoLoading } = this.#initNode()
        veo.addEventListener('playing', function (e) {
            veoLoading.style.display = 'none'
        })
    }
    /**
     * 进度条缓冲条
     */
    #veoProgressBuffer() {
        let { veoContainer, veo, veoBuff } = this.#initNode()
        veo.addEventListener("progress", (e) => {
            let hc = e.target.buffered.end(0)
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
    #veoCurrentUpdate() {
        const { veo, veoCon, veoIng, veoSub, veoTimeIng } = this.#initNode()

        veo.addEventListener("timeupdate", () => {
            let currentTime = veo.currentTime
            let veoConWidth = veoCon.offsetWidth
            let duration = veo.duration
            const ingWidth = ((veoConWidth * currentTime) / duration) / veoConWidth

            if (veoIng) {
                veoIng.style.width = (ingWidth * 100) + '%'
                veoSub.style.left = ((ingWidth * 100) - 0.5) + '%'
            }
            let time = formatTime(currentTime)
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
    #veoPlayEnded() {
        const { veo } = this.#initNode()
        veo.addEventListener("ended", (e) => {
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
                node.style.opacity = 0
                node.style.visibility = "hidden"
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
            canvas.width = this.width
            canvas.height = this.height
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

        const { veo, veoVolumeProgressPertxt, veoVolumeProgress, veoVolumeProgressIng, veoVolumeProgressBar } = this.#initNode()

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
            const y = e.clientY
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


        veoVolumeProgressBar.addEventListener("mousedown", (e) => {
            barY = e.clientY
            barBottom = e.target.offsetTop
            window.addEventListener("mousemove", elemMove)
        })
        window.addEventListener('mouseup', (e) => {
            window.removeEventListener("mousemove", elemMove)
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

            } else {
                document.exitFullscreen()
                veoScreen.dataset.index = 1
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