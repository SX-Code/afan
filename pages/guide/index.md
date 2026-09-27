---
title: 使用 AFAN
---

# AFAN 是什么？

AFAN 是一款使用 Flutter 开发，集成切片、嗅探等多种自定义播放源的追番应用。支持番剧搜索查找、追番提醒、视频超分等实用功能，界面简洁清爽，为番剧爱好者提供便捷的追番观影体验。

## 快速开始

1. 下载 [AFAN.app](/download.html)，选择适合设备的版本。iOS 和 HarmonyOS 用户需侧载安装。
2. 注册并登录账号，AFAN 需要账号来多平台同步您的追番、播放、采集源等数据。
3. 探索或搜索番剧，等待播放数据加载完成，开始观看。

遇到[安装](/guide/question-install.html)或[播放](/guide/question-play.html)问题时，可以先查看指南寻找解决方案。

## 添加播放源

应用番剧播放数据依赖采集源，主要有以下两种类型：

- 切片源：为通用的资源采集站采集接口，要求其返回数据类型为JSON。
- 嗅探源：使用 JavaScript 脚本从番剧网站获取播放数据，可按照规则返回数据。

应用内置[采集源仓库](/guide/source-repo.html)可自由添加，同时支持自定义开发[切片源](/guide/source-m3u8.html)和[嗅探源](/guide/source-sniff.html)采集规则。

## 常见问题

应用处于持续开发中，在使用过程中出现[安装问题](/guide/question-install.html)、[播放问题](/guide/question-play.html)或者[其他问题](/guide/question-other.html)可现在指南中寻找解决方案。

此外，还可在仓库中提 Issues:
- [BUG反馈](https://github.com/SX-Code/afan/issues/new?template=bug-反馈.md): 反馈 APP 使用中遇到的问题。
- [资源反馈](https://github.com/SX-Code/afan/issues/new?template=资源反馈.md)：反馈采集源失效、版权侵权、违规内容等问题。
- [功能建议](https://github.com/SX-Code/afan/issues/new?template=功能建议.md)：提出你的想法，帮助改进应用。


## 应用声明

1. 本项目仅为技术学习与交流使用，所有影视资源均收集自互联网公开渠道，非商用、非盈利。
2. 项目开发者不对任何资源的版权、真实性、完整性、安全性负责，资源版权均归原作者或权利人所有。
3. 若您认为本项目中某些内容侵犯了您的合法权益，请通过 Issues 或邮箱联系，我将在核实后立即删除相关内容。
4. 使用者在下载、观看、传播相关内容时，请自行遵守当地法律法规，由此产生的任何法律责任由使用者自行承担，与本项目及开发者无关。
5. 本项目仅提供资源检索，不提供存储、上传、分发服务，用户使用自定义采集源产生的影响及后果，与项目及开发者无关。

## 隐私政策

本应用在未登录状态下不会收集任何用户信息。登录后仅为实现身份验证收集设备 ID，并记录您的播放进度等个人使用数据，所有信息仅用于提供对应账号服务，不会向第三方共享或用于其他用途。

## 致谢

- 感谢 [LongZhuTi](https://github.com/maoken-fonts/LongZhuTi) 为本项目提供默认字体。
- 感谢 [WebView All](https://abandoft.github.io/webview_all/zh/) 为本项目提供嗅探基础。
- 感谢 [Dart](https://dart.dev/) 与 [Flutter](https://flutter.dev/) 为本项目提供坚实的技术基石。
- 感谢 [Dio](https://github.com/cfug/dio/blob/main/dio) 提供高效可靠的网络请求支持。
- 感谢 [media-kit](https://github.com/media-kit/media-kit) 提供强大的视频播放能力。
- 感谢 [canvas_danmaku](https://github.com/Predidit/canvas_danmaku) 提供流畅的弹幕渲染支持。
- 感谢 [cached_network_image](https://github.com/Baseflow/flutter_cached_network_image) 提供高效的图片缓存与加载支持。
- 感谢 [Anime4K](https://github.com/bloc97/Anime4K) 与 [mpv_PlayKit](https://github.com/hooke007/mpv_PlayKit) 两个优秀开源项目，为本应用提供了视频超分能力支持，使影视播放画质与体验得以大幅提升。


## 交流

获取最新开发进度、体验测试功能、反馈问题可加群：
<table cellpadding="8" cellspacing="0" width="100%">
  <tr>
    <td align='center'><img src="https://cdn.jsdelivr.net/gh/SX-Code/afan@main/document/afan.qq.png" width="250px" height="250px" /></td>
    <td align='center'><img src="https://cdn.jsdelivr.net/gh/SX-Code/afan@main/document/afan.tg.png" width="250px" height="250px" /></td>
  </tr>
</table>