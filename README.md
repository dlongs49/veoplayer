<p align="center">
<img src="https://gitee.com/dlongs49/veoplayer/raw/master/static/veoplayer_logo.png" style="width:80px;height:80px;"/>
</p>


<h1 align="center">VeoPlayer</h1>

#### 示例图

<p align="center">
<img src="https://gitee.com/dlongs49/veoplayer/raw/master/static/202306252121.png" />
</p>
使用js开发的html视频播放器，支持直播流，.m3u8，普通视频播放，仅支持高版本浏览器

#### 说明

[文档地址](https://veoplaydoc.netlify.app/)

#### 开始

1. 安装

   ```bash
   pnpm i veoplayer -S
   ```

2. 占位

   ```html
   <div id="veo"></div>
   ```

3. 实例化

```javascript
import VeoPlayer from "veoplayer"

let player = new VeoPlayer({
	id:"veo",
	url:"xxx.mp4",
	style:{
        themeColor: "#91CB40", // 主题色
        processColor: "#91CB40", // 进度条主题
        animation: "yes" // 开启控件交互
    }
})
```

