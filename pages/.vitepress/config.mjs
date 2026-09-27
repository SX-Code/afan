import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'afan',
  description: 'afan 的官网与文档',
  base: '/afan/',

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '下载', link: '/download' },
      { text: '文档', link: '/guide/' },
      { text: '更新日志', link: '/changelog' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '快速开始', link: '/guide/' },
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
  },
})
