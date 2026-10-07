<script setup>
import { withBase } from "vitepress";
import { ref, computed, onMounted } from "vue";

// ===== 集中配置：发布新版本只需改 VERSION_TAG 和 releaseDate =====
const MIRROR = "https://gh-proxy.org/"; // GitHub 加速代理前缀，想直连就留空 ""
const VERSION_TAG = "v1.0.8"; // 版本号，唯一需要手动改的版本值
const REPO_URL = "https://github.com/SX-Code/afan";
const dl = (file) =>
  `${MIRROR}${REPO_URL}/releases/download/${VERSION_TAG}/${file}`;

const CONFIG = {
  appName: "AFAN",
  pkgName: "afan",
  repoOwner: "SX-Code",
  version: VERSION_TAG.replace(/^v/, ""),
  versionTag: VERSION_TAG,
  releaseDate: "2026-10-05",
  repoUrl: REPO_URL,
  links: {
    windows: dl(`afan-windows-${VERSION_TAG}-installer.exe`),
    macos: dl(`afan-macos-arm64-${VERSION_TAG}.dmg`),
    linux: dl(`afan-linux-amd64-${VERSION_TAG}.deb`),
    ios: dl(`afan-ios-${VERSION_TAG}.ipa`),
    // Android：对象结构，键名与 variants.key 一一对应
    android: {
      phone: dl(`afan-android-arm64-v8a-${VERSION_TAG}.apk`),
      tv_arm64: dl(`afan-atv-arm64-v8a-${VERSION_TAG}.apk`),
      tv_armeabi: dl(`afan-atv-armeabi-v7a-${VERSION_TAG}.apk`),
    },
    harmony: dl(`afan-harmonyos-${VERSION_TAG}.hap.zip`),
  },
  stores: {
    appStore: "#",
    googlePlay: "#",
    microsoftStore: "#",
  },
};

/* ================================================== */

const PLATFORMS = [
  {
    id: "windows",
    name: "Windows",
    format: "exe",
    size: "约 37.28 MB",
    desc: "Windows 10/11 64 位。安装包经代码签名，支持静默安装。",
    btn: "下载 Windows 版",
    icon: '<svg viewBox="0 0 576 512" fill="currentColor"><path d="M0 93.7l183.6-25.3v177.4H0V93.7zm0 324.6 183.6 25.3V268.4H0v149.9zm203.8 28L448 480V268.4H203.8v177.9zm0-380.6v180.1H448V32L203.8 65.7z"/></svg>',
  },
  {
    id: "macos",
    name: "macOS",
    format: "dmg",
    size: "约 42.5 MB",
    desc: "macOS 12+，适用于 Apple Silicon 安装包。首次打开请在系统设置中允许。",
    btn: "下载 macOS 版",
    icon: '<svg viewBox="0 0 384 512" fill="currentColor"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>',
  },
  {
    id: "linux",
    name: "Linux",
    format: "AppImage",
    size: "约 42.4 MB",
    desc: "提供 deb 安装包，目前仅支持 amd64 架构。",
    btn: "下载 Linux 版",
    icon: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="2.5" y="4" width="19" height="16" rx="3"/><path d="M6.5 9l3 3-3 3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12.5" cy="15" r="0.9"/><path d="M16 15.2h2.2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  },
  {
    id: "ios",
    name: "iOS",
    format: "IPA",
    size: "约 20.9 MB",
    desc: "IPA 为未签名安装包，需要自签或侧载。建议先阅读安装指南。",
    btn: "下载 IPA",
    icon: '<svg viewBox="0 0 384 512" fill="currentColor"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>',
  },
  {
    id: "android",
    name: "Android",
    format: "APK",
    size: "约 56.8 MB",
    desc: "支持手机、平板与 Android TV，提供 arm64、armeabi等架构，点击后选择具体版本。",
    btn: "下载 Android 版",
    icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.52 15.34a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm-11.05 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm11.4-6.02 2-3.46a.42.42 0 0 0-.72-.42l-2.02 3.5A8.64 8.64 0 0 0 12 7.42a8.64 8.64 0 0 0-5.14 1.52L4.84 5.44a.42.42 0 0 0-.72.42l2 3.46C3.64 11.35 2.24 14.39 2.09 17.48h19.82c-.15-3.1-1.55-6.13-4.03-6.16zM12 22.13a8.77 8.77 0 0 1-7.32-4.17h14.64A8.77 8.77 0 0 1 12 22.13z"/></svg>',
    variants: [
      {
        key: "phone",
        name: "手机 / 平板",
        format: "APK",
        size: "约 56.8 MB",
        desc: "arm64-v8a，适配绝大多数 Android 手机和平板。",
      },
      {
        key: "tv_arm64",
        name: "Android TV · arm64-v8a",
        format: "APK",
        size: "约 40.4 MB",
        desc: "适配 64 位 Android TV / 电视盒子，性能更好。",
      },
      {
        key: "tv_armeabi",
        name: "Android TV · armeabi-v7a",
        format: "APK",
        size: "约 46.7 MB",
        desc: "适配较老的 32 位电视盒子，兼容性更好。",
      },
    ],
  },
  {
    id: "harmony",
    name: "HarmonyOS",
    format: "HAP",
    size: "约 72.3 MB",
    desc: "HAP 为未签名安装包，需要自签或侧载。建议先阅读安装指南。",
    btn: "下载 HAP",
    icon: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
  },
];

const detected = ref("");
const toast = ref("");
let toastTimer = null;

const detectedName = computed(() => {
  const p = PLATFORMS.find((x) => x.id === detected.value);
  return p ? p.name : "";
});

function detectPlatform() {
  const ua = navigator.userAgent.toLowerCase();
  if (/iphone|ipad/.test(ua)) return "ios";
  if (/android/.test(ua)) return "android";
  if (/mac os x|macintosh/.test(ua)) return "macos";
  if (/windows/.test(ua)) return "windows";
  if (/linux/.test(ua)) return "linux";
  return "";
}

function show(msg) {
  toast.value = msg;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.value = "";
  }, 2600);
}

onMounted(() => {
  detected.value = detectPlatform();
});

function go(url, fallback) {
  if (url && url !== "#") {
    window.location.href = url;
    return;
  }
  show(fallback);
}

// 从 CONFIG.links 中安全取 url：字符串直接返回，对象按 variantKey 取子项
function resolveUrl(platformId, variantKey) {
  const entry = CONFIG.links[platformId];
  if (!entry) return "";
  if (typeof entry === "string") return entry;
  return entry[variantKey] || "";
}

// 卡片主按钮：有 variants 就开弹窗，否则直接下载
function onCardAction(p) {
  if (p.variants && p.variants.length) {
    variantDialog.value = { open: true, platform: p };
    return;
  }
  onDownload(p);
}

function onDownload(p) {
  go(
    resolveUrl(p.id),
    "演示页面：请为 " + p.name + " 配置真实下载链接（CONFIG.links）",
  );
}

function onAutoDownload() {
  if (!detected.value) {
    show("未识别到系统，请在下方手动选择平台");
    return;
  }
  const p = PLATFORMS.find((x) => x.id === detected.value);
  if (!p) return;
  if (p.variants && p.variants.length) {
    variantDialog.value = { open: true, platform: p };
    return;
  }
  go(
    CONFIG.links[detected.value],
    "演示页面：请为 " +
      detectedName.value +
      " 配置真实下载链接（CONFIG.links）",
  );
}

function onStore(key, label) {
  go(
    CONFIG.stores[key],
    "演示页面：请配置 " + label + " 链接（CONFIG.stores）",
  );
}

function onRelease() {
  window.open(CONFIG.repoUrl + "/releases", "_blank");
}

// ===== 版本选择弹窗 =====
const variantDialog = ref({ open: false, platform: null });

function closeVariant() {
  variantDialog.value = { open: false, platform: null };
}

function onVariantDownload(v) {
  const p = variantDialog.value.platform;
  const url = resolveUrl(p.id, v.key);
  closeVariant();
  go(url, "演示页面：请为 " + p.name + " / " + v.name + " 配置真实下载链接");
}
</script>

<template>
  <div class="dl-page">
    <!-- Hero -->
    <section class="dl-hero">
      <span class="badge">{{ CONFIG.versionTag }} · 现已发布</span>
      <h1>
        下载 <em>{{ CONFIG.appName }}</em>
      </h1>
      <p class="sub">免费、开源、跨平台。选择你的平台，或自动匹配当前系统。</p>
      <div class="actions">
        <button class="btn btn-primary" @click="onAutoDownload">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M12 3v10.6l3.3-3.3 1.4 1.4L12 17.4l-4.7-4.7 1.4-1.4 3.3 3.3V3z"
            />
            <rect x="5" y="19" width="14" height="2" rx="1" />
          </svg>
          <span>{{
            detected ? "下载 for " + detectedName : "正在检测你的系统…"
          }}</span>
        </button>
        <a class="btn" href="#" @click.prevent="onRelease">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm-1-13h2v6h-2zm0 8h2v2h-2z"
            />
          </svg>
          查看 GitHub Releases
        </a>
      </div>
      <div class="detect">
        <span class="dot"></span
        >{{
          detected
            ? "检测到 " + detectedName + "，已为你推荐"
            : "未检测到系统信息，请手动选择平台"
        }}
      </div>
    </section>

    <!-- 平台卡片 -->
    <section class="dl-section">
      <h2 class="dl-title">选择你的平台</h2>
      <p class="dl-sub">六种平台，一个 APP。下载包均经过签名与校验。</p>
      <div class="grid">
        <div
          v-for="p in PLATFORMS"
          :key="p.id"
          class="card"
          :class="{ active: detected === p.id }"
        >
          <span class="card-tag" v-show="detected === p.id">当前系统</span>
          <div class="card-head">
            <span class="plat-icon" v-html="p.icon"></span>
            <div>
              <h3>{{ p.name }}</h3>
              <div class="ver">
                {{ CONFIG.versionTag }} · {{ p.format }} · {{ p.size }}
              </div>
            </div>
          </div>
          <p class="card-desc">{{ p.desc }}</p>
          <button class="btn" @click="onCardAction(p)">{{ p.btn }}</button>
        </div>
      </div>

      <div class="info-bar">
        <span
          >最新版本 <b>{{ CONFIG.versionTag }}</b></span
        >
        <span class="sep"></span>
        <span
          >更新于 <b>{{ CONFIG.releaseDate }}</b></span
        >
        <span class="sep"></span
        ><a :href="withBase('/changelog.html')">查看更新日志</a>
        <span class="sep"></span>
        <span>SHA-256 校验和见 GitHub Release</span>
      </div>
    </section>

    <!-- 其他获取方式 -->
    <section class="dl-section other" style="display: none">
      <div class="other-grid">
        <div class="panel">
          <h3>从应用商店获取</h3>
          <p>偏好商店渠道？点按下方徽章跳转。</p>
          <div class="store-badges">
            <button class="store-btn" @click="onStore('appStore', 'App Store')">
              <svg viewBox="0 0 384 512" fill="currentColor">
                <path
                  d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
                />
              </svg>
              <span class="store-text"
                ><small>下载于</small><span>App Store</span></span
              >
            </button>
            <button
              class="store-btn"
              @click="onStore('googlePlay', 'Google Play')"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M4.2 2.6 13.6 12 4.2 21.4c-.4-.2-.6-.6-.6-1.2V3.8c0-.6.2-1 .6-1.2zM15 11.2l2.9 2.9-9.2 5.3 6.3-8.2zM17.9 9.9 20 11c.6.3.6 1 0 1.3l-2.1 1.2-2.8-2.7 2.8-2.9zM8.7 4.6l9.2 5.3-2.9 2.9-6.3-8.2z"
                />
              </svg>
              <span class="store-text"
                ><small>GET IT ON</small><span>Google Play</span></span
              >
            </button>
            <button
              class="store-btn"
              @click="onStore('microsoftStore', 'Microsoft Store')"
            >
              <svg viewBox="0 0 576 512" fill="currentColor">
                <path
                  d="M0 93.7l183.6-25.3v177.4H0V93.7zm0 324.6 183.6 25.3V268.4H0v149.9zm203.8 28L448 480V268.4H203.8v177.9zm0-380.6v180.1H448V32L203.8 65.7z"
                />
              </svg>
              <span class="store-text"
                ><small>下载于</small><span>Microsoft Store</span></span
              >
            </button>
          </div>
        </div>
        <div class="panel">
          <h3>开发者 / 命令行安装</h3>
          <p>偏好命令行？复制以下命令到终端执行。</p>
          <div class="code-block">
            <span class="c"># macOS（Homebrew）</span><br />
            <span class="g">$</span> brew install --cask {{ CONFIG.pkgName
            }}<br /><br />
            <span class="c"># Windows（Winget）</span><br />
            <span class="g">$</span> winget install
            <span class="y">{{ CONFIG.repoOwner }}.{{ CONFIG.pkgName }}</span
            ><br /><br />
            <span class="c"># Linux（脚本安装）</span><br />
            <span class="g">$</span> curl -fsSL https://{{
              CONFIG.pkgName
            }}.app/install.sh | sh
          </div>
        </div>
      </div>
    </section>

    <!-- 版本选择弹窗（Android 多架构） -->
    <transition name="fade">
      <div
        v-if="variantDialog.open"
        class="variant-mask"
        @click.self="closeVariant"
      >
        <div class="variant-dialog">
          <div class="variant-head">
            <div class="variant-title">
              <span
                class="plat-icon"
                v-html="variantDialog.platform?.icon"
              ></span>
              <div>
                <h3>选择 {{ variantDialog.platform?.name }} 版本</h3>
                <div class="ver">
                  {{ CONFIG.versionTag }} ·
                  {{ variantDialog.platform?.variants?.length || 0 }} 个可选版本
                </div>
              </div>
            </div>
            <button
              class="variant-close"
              @click="closeVariant"
              aria-label="关闭"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <div class="variant-list">
            <button
              v-for="v in variantDialog.platform?.variants || []"
              :key="v.key"
              class="variant-item"
              @click="onVariantDownload(v)"
            >
              <div class="variant-item-main">
                <div class="variant-item-head">
                  <span class="variant-name">{{ v.name }}</span>
                  <span class="variant-meta"
                    >{{ v.format }} · {{ v.size }}</span
                  >
                </div>
                <p class="variant-desc">{{ v.desc }}</p>
              </div>
              <span class="variant-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M12 3v10.6l3.3-3.3 1.4 1.4L12 17.4l-4.7-4.7 1.4-1.4 3.3 3.3V3z"
                  />
                  <rect x="5" y="19" width="14" height="2" rx="1" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div v-if="toast" class="toast">{{ toast }}</div>
    </transition>
  </div>
</template>

<style scoped>
.dl-page {
  --radius: 10px;
  max-width: 1152px;
  margin: 0 auto;
  padding: 0 24px 48px;
}
.dl-hero {
  position: relative;
  text-align: center;
  padding: 72px 0 40px;
}
.dl-hero::before {
  content: "";
  position: absolute;
  left: 50%;
  top: -100px;
  width: 560px;
  height: 360px;
  transform: translateX(-50%);
  background: radial-gradient(
    closest-side,
    var(--vp-c-brand-soft),
    transparent 70%
  );
  pointer-events: none;
}
.badge {
  display: inline-block;
  font-size: 13px;
  color: var(--vp-c-brand-1);
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 999px;
  padding: 4px 14px;
  background: var(--vp-c-brand-soft);
  position: relative;
  margin-bottom: 24px;
}
.dl-hero h1 {
  font-size: 46px;
  font-weight: 700;
  letter-spacing: -0.5px;
  margin: 0 0 18px;
  color: var(--vp-c-text-1);
  position: relative;
}
.dl-hero h1 em {
  font-style: normal;
  color: var(--vp-c-brand-1);
}
.dl-hero .sub {
  font-size: 17px;
  color: var(--vp-c-text-2);
  max-width: 560px;
  margin: 0 auto;
  position: relative;
}
.actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 32px;
  flex-wrap: wrap;
  position: relative;
}
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: var(--radius);
  font-size: 15px;
  font-weight: 600;
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  text-decoration: none;
  transition:
    border-color 0.2s,
    box-shadow 0.2s,
    transform 0.2s;
}
.btn:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: var(--vp-c-shadow);
  transform: translateY(-1px);
}
.btn svg {
  width: 16px;
  height: 16px;
}
.btn-primary {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: #fff;
}
.btn-primary:hover {
  background: var(--vp-c-brand-2);
  border-color: var(--vp-c-brand-2);
}
.detect {
  margin-top: 18px;
  font-size: 13px;
  color: var(--vp-c-text-3);
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  display: inline-block;
}
.dl-section {
  padding: 32px 0 8px;
}
.dl-title {
  text-align: center;
  font-size: 26px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 6px;
}
.dl-sub {
  text-align: center;
  color: var(--vp-c-text-2);
  font-size: 15px;
  margin-bottom: 36px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.card {
  border: 1px solid var(--vp-c-border);
  border-radius: var(--radius);
  padding: 24px 22px 20px;
  background: var(--vp-c-bg-soft);
  display: flex;
  flex-direction: column;
  gap: 14px;
  position: relative;
  transition:
    border-color 0.2s,
    transform 0.2s,
    box-shadow 0.2s;
}
.card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
  box-shadow: var(--vp-c-shadow);
}
.card.active {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px var(--vp-c-brand-soft);
}
.card-tag {
  position: absolute;
  top: -10px;
  left: 18px;
  font-size: 12px;
  font-weight: 600;
  color: #fff;
  background: var(--vp-c-brand-1);
  border-radius: 6px;
  padding: 2px 10px;
}
.card-head {
  display: flex;
  align-items: center;
  gap: 12px;
}
.plat-icon {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--vp-c-text-1);
  flex-shrink: 0;
}
.plat-icon :deep(svg) {
  width: 22px;
  height: 22px;
}
.card-head h3 {
  font-size: 17px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}
.card-head .ver {
  font-size: 12.5px;
  color: var(--vp-c-text-3);
}
.card-desc {
  font-size: 13.5px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  flex: 1;
}
.card .btn {
  justify-content: center;
  width: 100%;
  padding: 9px 14px;
  font-size: 14px;
}
.info-bar {
  margin: 44px 0 8px;
  padding: 18px 26px;
  border: 1px solid var(--vp-c-border);
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 28px;
  flex-wrap: wrap;
  font-size: 14px;
  color: var(--vp-c-text-2);
}
.info-bar b {
  color: var(--vp-c-text-1);
  font-weight: 600;
}
.info-bar a {
  color: var(--vp-c-brand-1);
}
.sep {
  width: 1px;
  height: 18px;
  background: var(--vp-c-divider);
}
.other {
  padding: 48px 0 16px;
}
.other-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
.panel {
  border: 1px solid var(--vp-c-border);
  border-radius: var(--radius);
  padding: 28px;
  background: var(--vp-c-bg-soft);
}
.panel h3 {
  font-size: 17px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 6px;
}
.panel > p {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin-bottom: 18px;
}
.store-badges {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.store-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--vp-c-text-1);
  color: var(--vp-c-bg);
  border: none;
  border-radius: 10px;
  padding: 10px 18px;
  width: 100%;
  max-width: 260px;
  cursor: pointer;
  transition:
    opacity 0.2s,
    transform 0.2s;
}
.store-btn:hover {
  opacity: 0.88;
  transform: translateY(-1px);
}
.store-btn svg {
  width: 22px;
  height: 22px;
  flex-shrink: 0;
}
.store-text {
  display: flex;
  flex-direction: column;
  text-align: left;
  line-height: 1.25;
}
.store-text small {
  font-size: 11px;
  opacity: 0.72;
}
.store-text span {
  font-size: 14.5px;
  font-weight: 600;
}
.code-block {
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-border);
  border-radius: var(--radius);
  font-family: var(--vp-font-family-mono);
  font-size: 13.5px;
  line-height: 1.8;
  padding: 18px 20px;
  overflow-x: auto;
}
.code-block .c {
  color: var(--vp-c-text-3);
}
.code-block .g {
  color: var(--vp-c-brand-1);
}
.code-block .y {
  color: #e7c86f;
}
.toast {
  position: fixed;
  left: 50%;
  bottom: 32px;
  transform: translateX(-50%);
  background: var(--vp-c-text-1);
  color: var(--vp-c-bg);
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 14px;
  z-index: 99;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ===== 版本选择弹窗 ===== */
.variant-mask {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 100;
}
.variant-dialog {
  width: 100%;
  max-width: 520px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: var(--radius);
  box-shadow: var(--vp-c-shadow);
  padding: 22px 22px 18px;
  max-height: 90vh;
  overflow-y: auto;
}
.variant-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
}
.variant-title {
  display: flex;
  align-items: center;
  gap: 12px;
}
.variant-title h3 {
  font-size: 17px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0;
}
.variant-title .ver {
  font-size: 12.5px;
  color: var(--vp-c-text-3);
  margin-top: 2px;
}
.variant-close {
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  border: 1px solid transparent;
  background: transparent;
  color: var(--vp-c-text-3);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition:
    background 0.2s,
    color 0.2s,
    border-color 0.2s;
}
.variant-close:hover {
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-border);
  color: var(--vp-c-text-1);
}
.variant-close svg {
  width: 16px;
  height: 16px;
}
.variant-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.variant-item {
  display: flex;
  align-items: center;
  gap: 14px;
  text-align: left;
  border: 1px solid var(--vp-c-border);
  border-radius: var(--radius);
  padding: 14px 16px;
  background: var(--vp-c-bg-soft);
  cursor: pointer;
  transition:
    border-color 0.2s,
    transform 0.2s,
    box-shadow 0.2s;
}
.variant-item:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-1px);
  box-shadow: var(--vp-c-shadow);
}
.variant-item-main {
  flex: 1;
  min-width: 0;
}
.variant-item-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 4px;
}
.variant-name {
  font-size: 15px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}
.variant-meta {
  font-size: 12.5px;
  color: var(--vp-c-text-3);
  flex-shrink: 0;
}
.variant-desc {
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.55;
  margin: 0;
}
.variant-arrow {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg);
  color: var(--vp-c-brand-1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition:
    background 0.2s,
    border-color 0.2s,
    color 0.2s;
}
.variant-item:hover .variant-arrow {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: #fff;
}
.variant-arrow svg {
  width: 16px;
  height: 16px;
}

@media (max-width: 900px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .other-grid {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 640px) {
  .dl-hero {
    padding: 52px 0 32px;
  }
  .dl-hero h1 {
    font-size: 32px;
  }
  .grid {
    grid-template-columns: 1fr;
  }
  .card-desc {
    font-size: 14px;
  }
  .card-head .ver {
    font-size: 13.5px;
  }
  .info-bar {
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }
  .sep {
    width: 40px;
    height: 1px;
  }
  .variant-dialog {
    padding: 18px 16px 14px;
  }
  .variant-item {
    padding: 12px 14px;
    gap: 10px;
  }
  .variant-item-head {
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
  }
}
</style>
