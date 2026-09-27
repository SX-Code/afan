import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  base: '/',
  title: 'AFAN',
  description: 'AFAN 官网',

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
