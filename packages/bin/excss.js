export const cssStr = `.veo-container {
  position: relative;
  background-color: #000;
  --veo-color-primary: #fff;
}
.veo-container .veo-video {
  width: 100%;
  height: 100%;
  cursor: pointer;
  position: absolute;
  z-index: 2;
}
.veo-container .veo-video video {
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  pointer-events: none;
}
.veo-container .veo-poster {
  width: 100%;
  height: 100%;
  position: absolute;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
}
.veo-container .veo-poster .veo-poster-bg {
  position: absolute;
  inset: 0;
  z-index: -1;
  transform: scale(1.2);
}
.veo-container .veo-poster .veo-poster-bg .veo-poster-img {
  width: 100%;
  height: 100%;
  filter: blur(60px);
}
.veo-container .veo-error {
  display: none;
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  align-items: center;
  justify-items: center;
}
.veo-container .veo-error span {
  margin-left: 4px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
}
.veo-container .veo-loading {
  display: none;
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 3;
  transform: translate(-50%, -50%);
  pointer-events: none;
}
.veo-container .veo-control {
  width: 100%;
  position: absolute;
  bottom: 0;
  background: rgba(0, 0, 0, 0.431372549);
  z-index: 2;
  opacity: 0;
  transition: opacity 0.1s cubic-bezier(0.4, 0, 1, 1);
}
.veo-container .veo-control .veo-process-con {
  position: relative;
  width: 100%;
  height: 4px;
  cursor: pointer;
}
.veo-container .veo-control .veo-process-con:hover .veo-process-sub {
  opacity: 1;
}
.veo-container .veo-control .veo-process-con:hover .veo-process-sub::before {
  opacity: 1;
  transform: scale(1);
}
.veo-container .veo-control .veo-process-con .veo-process-out {
  width: 100%;
  height: 100%;
  background: rgba(189, 189, 189, 0.705);
}
.veo-container .veo-control .veo-process-con .veo-process-ing {
  position: absolute;
  top: 0;
  height: 100%;
  background: linear-gradient(267deg, #4bb8ff 20.12%, #4aff00 46.25%, #ff9012 100.48%);
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  z-index: 1;
  pointer-events: none;
}
.veo-container .veo-control .veo-process-con .veo-process-buff {
  position: absolute;
  top: 0;
  height: 100%;
  background: rgba(255, 255, 255, 0.38);
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  pointer-events: none;
}
.veo-container .veo-control .veo-process-con .veo-process-sub {
  opacity: 0;
  transition: opacity 0.25s;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: -0.5%;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.319);
  z-index: 1;
}
.veo-container .veo-control .veo-process-con .veo-process-sub::before {
  opacity: 0;
  transition: opacity 0.25s;
  content: " ";
  position: absolute;
  transform: scale(0.5);
  left: 50%;
  top: 50%;
  margin-left: -5px;
  margin-top: -5px;
  width: 10px;
  height: 10px;
  background: #fff;
  border-radius: 50%;
}
.veo-container .veo-control .veo-process-con .veo-process-sub[data-color]::before {
  background: var(--veo-process-color);
}
.veo-container .veo-control .veo-process-con .veo-process-time-slide {
  display: none;
  position: absolute;
  top: -40px;
  background: rgba(0, 0, 0, 0.8);
  padding: 0 12px;
  line-height: 26px;
  border-radius: 30px;
  font-size: 12px;
  color: #fff;
}
.veo-container .veo-control .veo-player-con {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  margin: 0 auto;
  user-select: none;
}
.veo-container .veo-control .veo-player-con .veo-left-control {
  display: flex;
  align-items: center;
  margin-left: 15px;
}
.veo-container .veo-control .veo-player-con .veo-left-control .veo-play-pause {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 20px;
  height: 20px;
}
.veo-container .veo-control .veo-player-con .veo-left-control .veo-play-pause svg {
  pointer-events: none;
}
.veo-container .veo-control .veo-player-con .veo-left-control .veo-play-pause svg path {
  transition: 0.3s all;
}
.veo-container .veo-control .veo-player-con .veo-left-control .veo-play-pause:hover svg path {
  fill: var(--veo-color-primary);
}
.veo-container .veo-control .veo-player-con .veo-left-control .veo-play-pause::after {
  content: attr(label);
  display: block;
  position: absolute;
  top: 0px;
  left: 0px;
  background: rgba(0, 0, 0, 0.8);
  padding: 0 14px;
  line-height: 27px;
  border-radius: 26px;
  font-size: 12px;
  white-space: nowrap;
  color: #fff;
  opacity: 0;
  transition: all 0.18s ease-out 0.18s;
  z-index: 3;
  pointer-events: none;
}
.veo-container .veo-control .veo-player-con .veo-left-control .veo-play-pause:hover::after {
  opacity: 1;
  top: -26px;
}
.veo-container .veo-control .veo-player-con .veo-left-control .veo-play-pause svg path {
  fill: #ffffff;
}
.veo-container .veo-control .veo-player-con .veo-left-control .veo-play-pause svg:last-child {
  display: none;
}
.veo-container .veo-control .veo-player-con .veo-left-control .veo-time {
  display: flex;
  align-items: center;
  margin-left: 15px;
}
.veo-container .veo-control .veo-player-con .veo-left-control .veo-time .veo-time-ing {
  font-size: 12px;
  color: rgb(255, 255, 255);
}
.veo-container .veo-control .veo-player-con .veo-left-control .veo-time .veo-slash {
  margin: 0 3px;
}
.veo-container .veo-control .veo-player-con .veo-left-control .veo-time .veo-slash,
.veo-container .veo-control .veo-player-con .veo-left-control .veo-time .veo-time-total {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
}
.veo-container .veo-control .veo-player-con .veo-left-control .veo-time .veo-time-total {
  display: flex;
  align-items: center;
  margin-top: 3px;
}
.veo-container .veo-control .veo-player-con .veo-left-control .veo-time .veo-time-total svg path {
  fill: rgba(255, 255, 255, 0.65);
}
.veo-container .veo-control .veo-player-con .veo-left-control .veo-time .veo-time-total svg:nth-child(2) {
  display: none;
}
.veo-container .veo-control .veo-player-con .veo-left-control .veo-time .veo-time-total span {
  margin-top: -1px;
}
.veo-container .veo-control .veo-player-con .veo-center-control {
  flex: 1;
}
.veo-container .veo-control .veo-player-con .veo-right-control {
  display: flex;
  align-items: center;
  margin-right: 15px;
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-setting,
.veo-container .veo-control .veo-player-con .veo-right-control .veo-volume {
  width: 20px;
  height: 20px;
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-speed {
  position: relative;
  cursor: pointer;
  margin-left: 15px;
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-speed span {
  color: rgba(255, 255, 255, 0.7215686275);
  font-size: 15px;
  transition: 0.3s;
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-speed span:hover {
  color: #fff;
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-speed .veo-speed-outcon {
  display: none;
  position: absolute;
  z-index: 2;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding-bottom: 20px;
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-speed .veo-speed-outcon .veo-speed-incon {
  padding: 10px 14px;
  background: rgba(17, 17, 17, 0.7);
  border-radius: 8px;
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-speed .veo-speed-outcon .veo-speed-incon .veo-speed-item {
  display: flex;
  align-items: center;
  margin: 5px 0;
  border-radius: 40px;
  padding: 6px 30px 7px 6px;
  transition: all 0.3s;
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-speed .veo-speed-outcon .veo-speed-incon .veo-speed-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-speed .veo-speed-outcon .veo-speed-incon .veo-speed-item svg {
  width: 14px;
  height: 14px;
  opacity: 0;
  pointer-events: none;
  fill: #ffffff;
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-speed .veo-speed-outcon .veo-speed-incon .veo-speed-item span {
  margin-left: 10px;
  color: #fff;
  font-size: 13px;
  pointer-events: none;
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-speed .veo-speed-outcon .veo-speed-incon .veo-speed-active {
  background-color: rgba(255, 255, 255, 0.15);
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-speed .veo-speed-outcon .veo-speed-incon .veo-speed-active svg {
  opacity: 1;
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-download {
  width: 24px;
  height: 24px;
  position: relative;
  cursor: pointer;
  margin-left: 15px;
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-download svg {
  width: 100%;
  height: 100%;
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-download svg path {
  fill: #fff;
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-download svg {
  pointer-events: none;
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-download svg path {
  transition: 0.3s all;
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-download:hover svg path {
  fill: var(--veo-color-primary);
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-download::after {
  content: attr(label);
  display: block;
  position: absolute;
  top: -32px;
  left: 50%;
  background: rgba(0, 0, 0, 0.8);
  transform: translateX(-50%);
  padding: 0 14px;
  line-height: 27px;
  border-radius: 26px;
  font-size: 12px;
  white-space: nowrap;
  color: #fff;
  opacity: 0;
  transition: all 0.18s ease-out 0.18s;
  z-index: 3;
  pointer-events: none;
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-download:hover::after {
  opacity: 1;
  top: -42px;
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-setting {
  position: relative;
  cursor: pointer;
  margin-left: 15px;
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-setting svg {
  pointer-events: none;
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-setting svg path {
  transition: 0.3s all;
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-setting:hover svg path {
  fill: var(--veo-color-primary);
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-setting svg {
  width: 100%;
  height: 100%;
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-setting svg path {
  fill: #fff;
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-setting .veo-setting-outcon {
  display: none;
  position: absolute;
  z-index: 2;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding-bottom: 20px;
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-setting .veo-setting-outcon .veo-setting-incon {
  width: 120px;
  padding: 16px 10px;
  background: rgba(17, 17, 17, 0.7);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-setting .veo-setting-outcon .veo-setting-incon .veo-setting-item {
  display: flex;
  align-items: center;
  margin-bottom: 14px;
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-setting .veo-setting-outcon .veo-setting-incon .veo-setting-item:last-child {
  margin-bottom: 0;
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-setting .veo-setting-outcon .veo-setting-incon .veo-setting-item span {
  max-width: 60px;
  min-width: 60px;
  color: #fff;
  font-size: 12px;
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-setting .veo-setting-outcon .veo-setting-incon .veo-setting-item .veo-switch {
  display: flex;
  align-items: center;
  margin-left: 16px;
  width: 36px;
  height: 16px;
  border-radius: 18px;
  border: 1px solid #fff;
  cursor: pointer;
  padding: 2px 2px;
  transition: border-color 0.3s, background-color 0.3s;
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-setting .veo-setting-outcon .veo-setting-incon .veo-setting-item .veo-switch .veo-switch-bar {
  width: 14px;
  height: 14px;
  background: #fff;
  border-radius: 50%;
  transition: transform 0.3s;
  pointer-events: none;
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-setting .veo-setting-outcon .veo-setting-incon .veo-setting-item .veo-switch-active {
  border: 1px solid var(--veo-color-primary);
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-setting .veo-setting-outcon .veo-setting-incon .veo-setting-item .veo-switch-active .veo-switch-bar {
  transform: translateX(20px);
  background: var(--veo-color-primary);
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-capture {
  width: 22px;
  height: 22px;
  position: relative;
  cursor: pointer;
  margin-left: 15px;
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-capture svg {
  width: 100%;
  height: 100%;
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-capture svg path {
  fill: #fff;
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-capture svg {
  pointer-events: none;
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-capture svg path {
  transition: 0.3s all;
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-capture:hover svg path {
  fill: var(--veo-color-primary);
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-capture::after {
  content: attr(label);
  display: block;
  position: absolute;
  top: -32px;
  left: 50%;
  background: rgba(0, 0, 0, 0.8);
  transform: translateX(-50%);
  padding: 0 14px;
  line-height: 27px;
  border-radius: 26px;
  font-size: 12px;
  white-space: nowrap;
  color: #fff;
  opacity: 0;
  transition: all 0.18s ease-out 0.18s;
  z-index: 3;
  pointer-events: none;
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-capture:hover::after {
  opacity: 1;
  top: -42px;
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-volume {
  position: relative;
  cursor: pointer;
  margin-left: 15px;
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-volume svg {
  width: 100%;
  height: 100%;
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-volume svg g {
  transition: 0.3s;
  stroke: #fff;
  pointer-events: none;
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-volume:hover svg g {
  stroke: var(--veo-color-primary);
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-volume .veo-volume-outcon {
  opacity: 0;
  visibility: hidden;
  position: absolute;
  z-index: 2;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding-bottom: 20px;
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-volume .veo-volume-outcon .veo-volume-incon {
  padding: 10px 10px;
  background: rgba(17, 17, 17, 0.7);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-volume .veo-volume-outcon .veo-volume-incon .veo-volume-pertxt {
  width: 40px;
  text-align: center;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-volume .veo-volume-outcon .veo-volume-incon .veo-volume-progress-con {
  position: relative;
  height: 95px;
  width: 100%;
  margin-top: 6px;
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-volume .veo-volume-outcon .veo-volume-incon .veo-volume-progress-con .veo-volume-progress {
  position: relative;
  width: 100%;
  height: 90px;
  overflow: hidden;
  display: flex;
  justify-content: center;
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-volume .veo-volume-outcon .veo-volume-incon .veo-volume-progress-con .veo-volume-progress .veo-volume-progress-line {
  position: absolute;
  width: 3px;
  height: 90px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 3px;
  pointer-events: none;
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-volume .veo-volume-outcon .veo-volume-incon .veo-volume-progress-con .veo-volume-progress .veo-volume-progress-ing {
  position: absolute;
  width: 3.6px;
  height: 50%;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  border-radius: 3px;
  background: var(--veo-color-primary);
  z-index: 1;
  pointer-events: none;
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-volume .veo-volume-outcon .veo-volume-incon .veo-volume-progress-con .veo-volume-progress-bar {
  position: absolute;
  bottom: 45%;
  left: 50%;
  transform: translateX(-50%);
  width: 12px;
  height: 12px;
  background-color: #fff;
  border-radius: 100%;
  cursor: pointer;
  z-index: 2;
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-volume .veo-volume-outcon .veo-volume-incon .veo-volume-progress-con .veo-volume-progress-bar::after {
  position: absolute;
  display: block;
  content: "";
  width: 10px;
  height: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 4px solid var(--veo-color-primary);
  opacity: 0.25;
  border-radius: 50%;
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-screen {
  width: 18px;
  height: 18px;
  position: relative;
  cursor: pointer;
  margin-left: 15px;
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-screen:hover svg path {
  fill: var(--veo-color-primary);
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-screen svg {
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-screen svg path {
  fill: #ffffff;
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-screen[data-index="0"] svg:first-child {
  display: none !important;
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-screen[data-index="0"] svg:last-child {
  display: block !important;
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-screen[data-index="1"] svg:first-child {
  display: block !important;
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-screen[data-index="1"] svg:last-child {
  display: none !important;
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-screen::after {
  content: attr(label);
  display: block;
  position: absolute;
  top: -32px;
  left: -20px;
  background: rgba(0, 0, 0, 0.8);
  padding: 0 14px;
  line-height: 27px;
  border-radius: 26px;
  font-size: 12px;
  white-space: nowrap;
  color: #fff;
  opacity: 0;
  transition: all 0.18s ease-out 0.18s;
  z-index: 3;
  pointer-events: none;
}
.veo-container .veo-control .veo-player-con .veo-right-control .veo-screen:hover::after {
  opacity: 1;
  top: -42px;
}
.veo-container .veo-mutual {
  width: 100%;
  height: 100%;
}
.veo-container .veo-mutual-play, .veo-container .veo-mutual-pause {
  display: none;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: scale(1);
  margin-left: -26px;
  margin-top: -26px;
  background: rgba(0, 0, 0, 0.5);
  width: 54px;
  height: 54px;
  border-radius: 30px;
  animation: scaleFadeout 0.52s linear 1 normal forwards;
  pointer-events: none;
  z-index: 2;
}
.veo-container .veo-mutual-play svg, .veo-container .veo-mutual-pause svg {
  fill: rgba(255, 255, 255, 0.685);
}

.veo-control-isshow .veo-control {
  opacity: 1 !important;
  transition: opacity 0.25s cubic-bezier(0.4, 0, 1, 1) !important;
}

.veo-process-time-slide[data-slideFade=in] {
  animation-name: fadeInUp;
  animation-duration: 0.2s;
  animation-iteration-count: 1;
}

.veo-process-time-slide[data-slideFade=out] {
  display: none;
}

@keyframes scaleFadeout {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: scale(2);
  }
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 50%, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
@keyframes labelFade {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
.labelFadeAnimation {
  animation: labelFade 0.5s;
}

@keyframes anOpacity {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
.controlOpa {
  animation-name: anOpacity;
  animation-duration: 0.3s;
  animation-iteration-count: 1;
}

/*# sourceMappingURL=style.css.map */
`