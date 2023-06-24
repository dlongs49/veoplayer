window.onload = () => {

    let veoContainer = document.getElementById("test")
    let veo = document.querySelector("video")
    let veoCon = document.querySelector(".veo-process-con")
    let veoIng = document.querySelector(".veo-process-ing")
    let veoOut = document.querySelector(".veo-process-out")
    let veoSub = document.querySelector(".veo-process-sub")
    let veoTimeSlide = document.querySelector(".veo-process-timeSlide")
    veo.volume = 0.2
    let veoTimeTotal = document.querySelector(".veo-time-total")
    let videoWidth = 0
    let videoHeight = 0
    const veoErrorMsg = document.querySelector(".veo-error-msg")
    let veoError = document.querySelector(".veo-error")
    veo.addEventListener("error", (e) => {
        veoError.style.display = 'flex'
        let { message } = e.target.error
        veoErrorMsg.innerHTML = message
        console.log(e.target.error)
    })
    let durationTime = 1;
    veo.addEventListener('loadedmetadata', (e) => {
        videoWidth = e.target.offsetWidth
        videoHeight = e.target.offsetHeight
        let duration = e.target.duration
        let time = formatDurction(duration)
        durationTime = duration
        veoTimeTotal.innerHTML = time
    })
    let veoLoading = document.querySelector(".veo-loading")
    veo.addEventListener('waiting', function (e) {
        veoLoading.style.display = 'block'
    })
    veo.addEventListener('playing', function (e) {
        veoLoading.style.display = 'none'
    })

    veo.onprogress = (e) => {
        let buff = document.querySelector(".veo-process-buff")
        let hc = e.target.buffered.end(0)
        let w = veoCon.offsetWidth
        let buffWidth = (hc * w) / veo.duration
        buff.style.width = ((buffWidth / w) * 100) + "%"
    }
    let veoTimeIng = document.querySelector(".veo-time-ing")
    veo.addEventListener("timeupdate", () => {
        let currentTime = veo.currentTime
        let veoConWidth = veoCon.offsetWidth
        let duration = veo.duration
        const ingWidth = ((veoConWidth * currentTime) / duration) / veoConWidth
        veoIng.style.width = (ingWidth * 100) + '%'
        veoSub.style.left = ((ingWidth * 100) - 0.5) + '%'
        let time = formatDurction(currentTime)
        veoTimeIng.innerHTML = time
    })
    // 点击更改进度条
    veoCon.addEventListener("click", (e) => {
        let veoConWidth = veoContainer.offsetWidth
        let x = e.pageX
        let currentTime = (durationTime * x) / veoConWidth

        let duration = veo.duration
        const ingWidth = ((veoConWidth * currentTime) / duration) / veoConWidth
        veoIng.style.width = (ingWidth * 100) + '%'
        veoSub.style.left = ((ingWidth * 100) - 0.5) + '%'
        let time = formatDurction(currentTime)
        veoTimeIng.innerHTML = time
        veo.currentTime = currentTime
        veo.play()
    })
    const PERCENT = 100; // 百分比
    const SLIDE_OFFSET = 0.8; // 提示滑块偏移量
    veoOut.addEventListener("mousemove", (e) => {
        let x = e.offsetX
        let veoConWidth = veoCon.offsetWidth
        let duration = veo.duration
        let count = (x * duration) / veoConWidth
        let minutes = Math.floor(count / 60) // 分
        let seconds = count % 60
        let s = seconds > 10 ? Math.floor(seconds) : `0${Math.floor(seconds)}`
        let m = minutes > 10 ? Math.floor(minutes) : `0${Math.floor(minutes)}`
        let proTime = `${m}:${s}`
        veoTimeSlide.style.display = 'block'
        veoTimeSlide.setAttribute('data-slideFade', 'in')
        let veoSlideWidthHalf = veoTimeSlide.offsetWidth / 2  // 时长提示块取半
        let left = (100 * (x - veoSlideWidthHalf)) / veoConWidth
        veoTimeSlide.innerHTML = proTime
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
            let left = (veoConWidth * PERCENT) / (veoConWidth + veoTimeSlide.offsetWidth) - SLIDE_OFFSET
            veoTimeSlide.style.left = left + '%'
        }
    })
    veoOut.addEventListener("mouseout", (e) => {
        veoTimeSlide.setAttribute('data-slideFade', 'out')
        veoTimeSlide.style.display = 'none'
        veoTimeSlide.style.left = ''
    })

    let veoPlayPause = document.querySelector(".veo-play-pause")
    let pNode = veoPlayPause.querySelectorAll("svg")
    veoPlayPause.addEventListener("click", (e) => {
        let pType = e.target.dataset.type
        if (!pType) {
            return
        }
        if (pType === "play") {
            veo.play()
            veoPlayPause.setAttribute("data-type", "pause")
            veoPlayPause.setAttribute("label", "暂停")
            pNode[0].style.setProperty("display", "none")
            pNode[1].style.setProperty("display", "block")
        } else {
            veo.pause()
            veoPlayPause.setAttribute("data-type", "play")
            veoPlayPause.setAttribute("label", "播放")
            pNode[0].style.setProperty("display", "block")
            pNode[1].style.setProperty("display", "none")
        }
    })
    veo.addEventListener("ended", (e) => {
        veoPlayPause.setAttribute("data-type", "play")
        veoPlayPause.setAttribute("label", "播放")
        pNode[0].style.setProperty("display", "block")
        pNode[1].style.setProperty("display", "none")
    })
    let veoScreen = document.querySelector(".veo-screen")


    // 截图
    let veoCapture = document.querySelector(".veo-capture")
    const canvas = document.createElement('canvas');
    veoCapture.addEventListener("click", (e) => {
        canvas.width = videoWidth
        canvas.height = videoHeight
        const ctx = canvas.getContext('2d')
        ctx.drawImage(veo, 0, 0);
        let url = canvas.toDataURL('image/png');
        let a = document.createElement("a")
        const mouse = new MouseEvent("click")
        a.href = url
        a.download = "screen-" + new Date().getTime()
        a.dispatchEvent(mouse)
    })
    mouseHover(veoCapture)


    // 格式化时长
    function formatDurction(params) {
        let minutes = Math.floor(params / 60) // 分
        let seconds = params % 60
        let s = seconds > 10 ? Math.floor(seconds) : `0${Math.floor(seconds)}`
        let m = minutes > 10 ? Math.floor(minutes) : `0${Math.floor(minutes)}`
        let proTime = `${m}:${s}`
        return proTime
    }


    // 操作动画
    function mouseHover(el) {
        el.addEventListener("mouseenter", (e) => {
            el.classList.add('class', 'labelFadeAnimation')
        })
        el.addEventListener("mouseleave", (e) => {
            el.classList.remove('class', 'labelFadeAnimation')
        })
    }

    let veoSpeed = document.querySelector(".veo-speed")
    let veoSpeedCon = document.querySelector(".veo-speed-outcon")
    mouseHover(veoScreen)

    let intTimer = null
    let inTimerFlag = false

    function fadeIn(el) {
        clearInterval(intTimer)
        let speedNum = 1
        intTimer = setInterval(() => {
            speedNum += 1
            inTimerFlag = false
            el.style.opacity = speedNum / 100
            el.style.display = 'block'
            if (speedNum >= 100) {
                clearInterval(intTimer)
                inTimerFlag = true
            }
        }, 2)
    }

    let outTimer = null
    let outTimerFlag = false

    function fadeOut(el) {
        clearInterval(outTimer)
        let speedNum = 100
        outTimer = setInterval(() => {
            speedNum -= 1
            outTimerFlag = false
            el.style.opacity = speedNum / 100
            if (speedNum <= 0) {
                el.style.display = 'none'
                clearInterval(outTimer)
                outTimerFlag = true
            }
        }, 0.8)

    }

    function controlMouse(el, node) {
        el.addEventListener("mouseenter", () => {
            fadeIn(node)
        })
        el.addEventListener("mouseleave", () => {
            fadeOut(node)
        })
    }

    controlMouse(veoSpeed, veoSpeedCon)
    let veoVolume = document.querySelector(".veo-volume")
    let veoVolumeOutcon = document.querySelector(".veo-volume-outcon")
    controlMouse(veoVolume, veoVolumeOutcon)
    mouseHover(veoVolume)
    let veoSetting = document.querySelector(".veo-setting")
    let veoSettingOutcon = document.querySelector(".veo-setting-outcon")
    mouseHover(veoSetting)
    controlMouse(veoSetting, veoSettingOutcon)
    let veoDownload = document.querySelector(".veo-download")
    mouseHover(veoDownload)

    // 倍速播放
    let veoSpeedItemNode = document.querySelectorAll(".veo-speed-item")
    for (let i = 0; i < veoSpeedItemNode.length; i++) {
        veoSpeedItemNode[i].onclick = (e) => {
            for (let idx in veoSpeedItemNode) {
                // 判断是否为DOM元素
                if (typeof veoSpeedItemNode[idx] === 'object' && veoSpeedItemNode[idx] instanceof HTMLElement) {
                    veoSpeedItemNode[idx].classList.remove(VEO_SPEED_ACTIVE)
                }
            }
            e.target.classList.add(VEO_SPEED_ACTIVE)
            veo.playbackRate = speedList[i]
        }
    }

    // 设置，循环播放 开关
    let veoSwitch = document.querySelectorAll(".veo-switch")
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

    // 全屏
    veoScreen.onclick = (e) => {
        let { index } = e.target.dataset
        veoContainer.toggleAttribute("fullscreen")
        if (Number(index)) {
            e.target.dataset.index = 0
            document.exitFullscreen()
        } else {
            e.target.dataset.index = 1
            document.documentElement.requestFullscreen()
        }
    }

    // 键盘事件
    document.addEventListener("keyup", (e) => {
        let { keyCode } = e
        if (keyCode === 32) {
            let pType = veoPlayPause.dataset.type
            if (pType === "play") {
                veo.play()
                veoPlayPause.setAttribute("data-type", "pause")
                veoPlayPause.setAttribute("label", "暂停")
                pNode[0].style.setProperty("display", "none")
                pNode[1].style.setProperty("display", "block")
            } else {
                veo.pause()
                veoPlayPause.setAttribute("data-type", "play")
                veoPlayPause.setAttribute("label", "播放")
                pNode[0].style.setProperty("display", "block")
                pNode[1].style.setProperty("display", "none")
            }
        }
    })

}
