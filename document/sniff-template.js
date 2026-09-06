if (window.__sniffBridgeInited !== true) {

  /**
   * 填充验证码
   * @param {string} code 验证码
   */
  async function fillCaptureCode(code) { }

  /**
   * 嗅探资源
   */
  async function sniffResource() { }

  /**
   * 嗅探分集
   */
  async function sniffEpisode() { }

  /**
   * 嗅探播放链接
   */
  async function sniffPlayUrl() { }

  /**
   * 获取元素
   * @param {string} selector 元素选择器
   * @param {int} maxRetry 最大尝试次数
   * @param {int} intervalMs 尝试间隔
   * @returns 
   */
  function waitForElement(selector, maxRetry = 10, intervalMs = 200) {
    return new Promise(resolve => {
      let count = 0;

      function poll() {
        const el = document.querySelector(selector);
        if (el) {
          resolve(el);
          return
        }
        count++;
        if (count >= maxRetry) {
          resolve(null);
          return
        }
        setTimeout(poll, intervalMs)
      }
      poll()
    })
  }

  /**
   * 获取图片验证码 base64
   * @param {Element} img 元素
   * @returns base64 图片
   */
  async function getVerifyImageBase64(img) {
    if (!img) {
      return null
    }
    if (!img.complete || img.naturalWidth === 0) {
      await new Promise(resolve => {
        img.onload = resolve;
        img.onerror = resolve
      })
    }
    if (!img.complete || img.naturalWidth === 0) {
      return null
    }
    try {
      var canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      return canvas.toDataURL("image/png")
    } catch (e) {
      return null
    }
  }

  /**
   * 获取资源编号
   * @param {string} uri 链接网址
   * @returns 资源编号
   */
  function getId(uri) {
    const url = new URL(uri);
    const path = url.pathname;
    const filename = path.split("/").pop();
    return filename.replace(".html", "")
  }

  /* ======== 以下为 AFAN 自带的函数，修改或者删除可能导致嗅探失败 ======== */
  window.fillCaptureCode = async function (code) {
    sniffLog("开始执行任务：填充验证码");
    await fillCaptureCode(code);
    sniffLog("任务执行完成：填充验证码")
  };
  window.taskSniffResource = async function () {
    sniffLog("开始执行任务：获取资源信息");
    await sniffResource();
    sniffLog("任务执行完成：获取资源信息")
  };
  window.taskSniffEpisode = async function () {
    sniffLog("开始执行任务：获取分集列表");
    await sniffEpisode();
    sniffLog("任务执行完成：获取分集列表")
  };
  window.taskSniffPlayUrl = async function () {
    sniffLog("开始执行任务：嗅探播放地址");
    await sniffPlayUrl();
    sniffLog("任务执行完成：嗅探播放地址")
  };
  function sendToFlutter(msg) {
    if (!window.FlutterBridge) return;
    window.FlutterBridge.postMessage(JSON.stringify(msg))
  }
  function sniffLog(text) {
    sendToFlutter({
      msgType: "log",
      payload: String(text)
    })
  }
  function sendCapture(code) {
    sendToFlutter({
      msgType: "capture",
      payload: String(code)
    })
  }
  function sendFillCapture() {
    sendToFlutter({
      msgType: "fillCapture",
      payload: ""
    })
  }
  function sendResourceList(list) {
    sendToFlutter({
      msgType: "resourceList",
      payload: list
    })
  }
  function sendEpisodeList(list) {
    sendToFlutter({
      msgType: "episodeList",
      payload: list
    })
  }
  function sendSourceMap(map) {
    sendToFlutter({
      msgType: "sourceMap",
      payload: map
    })
  }
  function sendPlayUrl(url) {
    sendToFlutter({
      msgType: "playUrl",
      payload: String(url)
    })
  }

  function sendLoadIframe(url) {
    sendToFlutter({
      msgType: "loadIframe",
      payload: String(url)
    })
  }
} else {
  if (typeof sniffLog !== "undefined") {
    sniffLog("桥接脚本已存在，跳过重复注入")
  }
}
