import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  base: '/',
  title: 'AFAN',
  description: 'AFAN 是一款使用 Flutter 开发，集成切片、嗅探等多种自定义播放源的追番应用。支持番剧搜索查找、追番提醒、视频超分等实用功能，界面简洁清爽，为番剧爱好者提供便捷的追番观影体验。',
  titleTemplate: ":title | AFAN 官网",
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico?v=1' }],
    // 搜索引擎meta
    ['meta', { name: 'keywords', content: '追番,自定义规则' }],
    ['meta', { name: 'author', content: 'SX-Code' }],
    ['meta', { name: 'robots', content: 'index, follow' }],
    // Open Graph（社交分享，微信/推特/Facebook预览图）
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'AFAN 官网' }],
    ['meta', { property: 'og:image', content: '/og-preview.png' }],
    ['meta', { property: 'og:url', content: 'https://afan.sxcode.vip' }],
    //  canonical 规范链接，防止重复内容（重要）
    ['link', { rel: 'canonical', href: 'https://afan.sxcode.vip' }],
  ],
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: '首页', link: '/' },
      { text: '下载', link: '/download' },
      { text: '文档', link: '/guide/' },
      { text: '更新日志', link: '/changelog' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '开始使用',
          items: [
            { text: '使用应用', link: '/guide/' },
            { text: '界面赏析', link: '/guide/screens' },
          ],
        },
        {
          text: '开发采集源',
          items: [
            { text: '添加仓库源', link: '/guide/source-repo' },
            { text: '开发切片源', link: '/guide/source-m3u8' },
            { text: '开发嗅探源', link: '/guide/source-sniff' },
          ],
        },
        {
          text: '常见问题',
          items: [
            { text: '安装问题', link: '/guide/question-install' },
            { text: '播放问题', link: '/guide/question-play' },
            { text: '其他问题', link: '/guide/question-other' },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/SX-Code/afan' },
    ],
    footer: {
      message: '以 MIT 协议开源',
      copyright: '© 2026 SX-Code',
    },
    sitemap: {
      hostname: 'https://afan.sxcode.vip',
    },
    // 右侧目录标题（对应 "On this page"）
    outline: { label: '本页目录' },
    // 页脚翻页
    docFooter: { prev: '上一页', next: '下一页' },
    // 最后更新时间
    lastUpdated: { text: '最后更新于' },
    // 移动端菜单 / 主题切换
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    // 返回顶部
    returnToTopLabel: '返回顶部',
    langMenuLabel: '切换语言',
  },
})
