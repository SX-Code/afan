---
title: 安装问题
---

# 安装问题

## Andorid

手机直接打开 `apk` 安装包即可，如果出现风险安装、报毒等，请仔细检查安装包来源。如果是从官方渠道下载，可放心安装；如果是其他渠道需仔细辨别，以免造成信息泄漏、财产损失等。

## IOS

只提供了未签名的 `ipa` 安装包，需要自行侧载安装，主流的方案：
- [Iloader](https://github.com/nab138/iloader/releases/latest)：LiveContainer + SideStore 组合方案，支持自动续签，不用频繁重签。
- [Sideloadly](https://sideloadly.io/#download) ：Windows/macOS 简易侧载工具，使用 Apple ID 签名，证书有效期 7 天，到期需重新签名。

> 具体安装方法，可以使用 [豆包](https://www.doubao.com/chat/) 或者 [DeepSeek](https://chat.deepseek.com) 等AI工具，引导完成。


## HarmonyOS

只提供了 `hap` 安装包，需要自行侧载安装，主流的方案：
- HDC 侧载安装（原生 HAP）开启开发者调试，电脑 HDC 推送 hap 包鸿蒙原生，性能好；需要开启调试模式
- 安卓 APK 兼容包安装直接安装安卓 APK 安装包无需 开发者模式；依赖安卓兼容层，纯血鸿蒙 NEXT 不支持

## Windows

双击运行下载的 `exe` 安装包，跟随引导完成安装。

## MacOS

双击运行下载的 `dmg` 安装包，跟随引导完成安装。注意新版本已经移除了对 x86 的支持，只能运行在 M 系列的芯片上。

## Linux

只提供了 `deb` 安装包，仅支持 amd64 架构，可双击启动可视化包管理器完成安装。

或者，使用下面的命令安装：

```bash
sudo apt install ./afan-linux-amd64-vx.x.x.deb
```

## TV 

提供 arm64-v8a 和 armeabi-v7a 的 `apk` 安装包，可通过 U 盘等工具传输到电视进行安装。