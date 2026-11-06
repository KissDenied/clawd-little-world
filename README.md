# Clawd 输入框小世界

**参考了 [xiaochuan 老师（@xiaochuan_0196）](https://x.com/xiaochuan_0196) 的 [《蟹蟹日历》](https://github.com/tanlu9410-beep/xiexie-calendar)。感谢老师分享 Clawd 的像素画法、四帧动画和制作规范。**

一只在输入框上散步的小 Clawd。拉高边框，它会掉进像素小房间；可以抓起来拖动、撑降落伞落地、捡走输入框图标，或者自己拉走背景换个场景。

非官方同人项目。Clawd 角色及 Anthropic / Claude 商标属于各自权利人。

## 功能

- 折叠时在输入框边缘散步；拖住上沿展开像素房间。
- 支持鼠标、触摸拖动 Clawd，落下时展开降落伞。
- 暖木书桌、小庭院、月光露台、圣诞小屋；晴、多云、雨、雪。
- 衣服选项仅原皮、圣诞帽；小书包可独立选择显示。
- 29 个动作：既有普通待机，也有吉他、扫把、浇花、捡图标、纸飞机和堆雪人和戴耳机打碟。
- 动作面板为会动的缩略图，最多显示两行。手动选动作后关掉面板仍会播完，之后再恢复随机待机。
- 按用户标识保存场景、天气和服装；支持系统“减少动态效果”。

演示页的图标位是空白按钮，可以自行增减，0 个也可以。所有占位仅在本机演示，没有聊天服务、账号、联网搜索或上传功能。`gallery.html` 可单独查看此组件全部 29 个动作；不代表搬运了原作者的 31 个职业。

## 接入现有输入框

引入 `styles/` 中的四个 CSS 文件，加载模块：

```js
import {mountComposerClawd} from './components/composer-clawd.js';
const dispose = mountComposerClawd(document.querySelector('.composer-field'), {
  owner: 'your-local-user-id',
  controls: () => document.querySelectorAll('[data-clawd-control]')
});
// 页面卸载或切换联系人时调用 dispose()。
```

参照 `index.html` 的结构，在 `.composer-field` 内放 `textarea`。图标位使用空白按钮，填什么图标、放哪里完全由接入方决定；给希望被拿走的按钮加 `data-clawd-control` 即可。**数量不固定**，支持 0、1、2 或更多；空数组会跳过捡图标。

`controls` 接受 HTMLElement 数组、NodeList，或返回这些元素的函数。推荐函数形式，运行时新增/删除按钮也能在下次动作中获取。位置来自按钮当前的实际边界，不依赖四个固定坐标；原按钮的事件、禁用状态和样式会保留，归位时恢复。

```js
const dispose = mountComposerClawd(field, {
  controls: () => [myUploadButton, myStickerButton].filter(Boolean)
});
// controls: [] 表示不提供可拾取按钮。
```

组件外层使用 `.hubby-page`，页面根元素设置 `data-theme="liquid-glass"`，或自行调整 CSS 中的宿主选择器。输入框需要 `display:flex`，textarea 需要 `min-width:0; flex:1`。完整最小布局见 `demo.css`。

保留 `components/`、`styles/`、`vendor/` 的相对目录关系，资源已适配子路径托管。没有构建步骤或运行时依赖。设置存于浏览器 localStorage，键前缀为 `kiss.composer-clawd.options.v1.`。

## 来源与许可

- **基础像素画法、配色、身体和走路参考：xiaochuan 老师与 Claude 的《蟹蟹日历》**。原仓库署名为“画：Claude · 审稿与验收：小船”。原许可完整保留在 [LICENSES/xiexie-calendar-LICENSE.txt](LICENSES/xiexie-calendar-LICENSE.txt)。参考版本：`c14b212ec10688e7e06f825ddf7355de0941f74b`。
- 一部分动作逐帧素材来自官方公开 GIF 与 [The Clawd Museum](https://github.com/Jamieyw/The-Clawd-Museum) 保存的 claude.dev 导出；另有单独注明的本地参考重绘。详见 [素材说明](vendor/clawd-originals/SOURCE.md)。不把这些第三方角色素材声明为本项目原创或 MIT 授权。
- 房间、背包、圣诞场景、纸飞机和堆雪人等是本地新增同人绘制；集成代码及更细的改动说明见 [ATTRIBUTION.md](ATTRIBUTION.md)。

**代码与美术许可分开**：代码 MIT；本地新增/改编美术按 CC BY-NC 4.0 分享。第三方原素材保持各自权利归属，本项目不授予 Clawd 角色或商标权利，不把整个素材包统一再许可为 MIT。请保留作者署名、来源和许可说明。

## 测试范围

开发时验证过 Chromium 和 WebKit 的手机尺寸布局、拖动、换景、关闭动作栏后的完整播放，以及阶段画面。浏览器模拟不能覆盖所有真实 iOS 设备；发现兼容问题欢迎提供浏览器版本、触发动作和截图。
