---
title: 开发嗅探源
---

# 开发嗅探源

嗅探源，基于 WebView 加载网页，注入 JS 脚本执行页面代码，监听网络请求与页面 DOM，实时提取视频 M3U8/MP4 播放地址。无需预先维护资源库，实时解析网页；缺点是解析慢，网页加密、页面改版容易导致解析失效。

## 脚本模版

> 完整模版：[Sniff Template](https://cdn.jsdelivr.net/gh/SX-Code/afan@main/document/sniff-template.js)，可在仓库中获取。

```javascript
/**
 * 填充验证码
 * @param {string} code 验证码
 */
async function fillCaptureCode(code) {}

/**
 * 嗅探资源
 */
async function sniffResource() {}

/**
 * 嗅探分集
 */
async function sniffEpisode() {}

/**
 * 嗅探播放链接
 */
async function sniffPlayUrl() {}
```

## 搜索资源

Webview 会使用搜索关键字 `keywords` 替换接口 `https://dmbus.cc/s----------.html?wd={wd}` 中的`{wd}`，并访问该链接。

加载完成后会调用 `window.taskSniffResource(keywords)` 方法，只需要实现 `sniffResource(keywords)` 即可：

```javascript
async function sniffResource(keywords) {
  var list = document.querySelectorAll(".lpic li");
  if (!list || 0 == list.length) {
    sendResourceList([]);
    return;
  }
  const resourceList = [];
  for (const item of list) {
    var aTitle = item.querySelector("h2 a");
    if (!aTitle) continue;
    var url = aTitle.href;
    var img = item.querySelector("img");
    var p = item.querySelector("p");
    resourceList.push({
      id: getId(url),
      name: aTitle.innerText,
      url: url,
      img: img.getAttribute("src"),
      blurb: p.innerText,
    });
  }
  sendResourceList(resourceList);
}
```

## 解析资源

搜索结果如果只有一个，则会访问该资源的详情页面；如果是多条，应用会弹出资源选择窗口，页面会访问指定的资源详情页面。

加载完成会调用 `window.taskSniffEpisode()` 方法，只需实现 `sniffEpisode()` 即可：

```javascript
async function sniffEpisode() {
  const root = Array.from(document.querySelectorAll(".tabs")).find((el) => {
    return el.querySelector(".menu0 li")?.textContent.includes("播放Ⅰ");
  });
  if (!root) {
    sendEpisodeList([]);
    return;
  }
  var menuList = root.querySelectorAll("#menu0 li");
  var sourceList = root.querySelectorAll("#main0 .movurl");
  if (!sourceList || 0 == sourceList.length) {
    sendEpisodeList([]);
    return;
  }
  var sourceMap = {};
  for (var i = 0; i < sourceList.length; i++) {
    var episodeList = sourceList[i].getElementsByTagName("a");
    if (0 == episodeList.length) continue;
    sourceMap[menuList[i].innerText] = Array.from(episodeList).map((item) => ({
      name: item.innerText,
      url: item.href,
    }));
  }
  sendSourceMap(sourceMap);
}
```

## 嗅探链接

资源会解析出多个源，每个源都有对应的播放链接。在用户选择指定集播放后，WebView 会访问播放地址页面。

加载完成会调用 `window.taskSniffPlayUrl()` 方法，只需实现 `sniffPlayUrl()` 即可：

> 如果请求中有 xxx.m3u8 切片，`sniffPlayUrl()` 保持空实现即可，应用内置嗅探方法。

```javascript
async function sniffPlayUrl() {
  const iframe = document.getElementById("hm_playfram");
  if (!iframe) {
    sendPlayUrl("");
    return;
  }
  const srcUrl = iframe.getAttribute("src");
  if (0 == srcUrl.length) {
    sendPlayUrl("");
    return;
  }
  const realM3u8 = getQueryFromRelativeUrl(srcUrl, "url");
  if (0 == srcUrl.length) {
    sendPlayUrl("");
    return;
  }
  sendPlayUrl(realM3u8);
}
```

## 注意事项

番剧网站一般都会启用防爬技术，上述案例只是简单的演示整个嗅探的流程，实际开发时会面临各种问题。如果你有开发兴趣，可以联系作者获取详细的嗅探案例。