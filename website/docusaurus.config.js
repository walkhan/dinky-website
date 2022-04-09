// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Dinky',
  tagline: 'Dinky 为 Apache Flink 而生，让 Flink SQL 纵享丝滑',
  url: 'http://www.dlink.top/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/side_dinky.svg',
  organizationName: 'DataLinkDC', // Usually your GitHub org/user name.
  projectName: 'dinky', // Usually your repo name.
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en-US'],
    localeConfigs: {
     zh: {
       label: "简体中文",
       direction: 'ltr',
     },
     'en-US': {
       label: "English",
       direction: 'ltr',
     },
    },
  },
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
     announcementBar: {
            id: 'announcementBar-2', // Increment on change
            content: `⭐️ &nbsp; If you like Dinky , give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/DataLinkDC/dlink">GitHub</a>`,
            backgroundColor: "#BBDFFF",
          },
      navbar: {
        title: 'Dinky',
        logo: {
          alt: 'Dinky',
          src: 'img/side_dinky.svg',
        },
       items: [
          {
            to: '/',
            position: 'right',
            label: 'HOME',
            activeBaseRegex: `^/$`,
          },
          {
            position: 'right',
            label: 'DOCS',
            to: "/docs/introduction",
            items: [
              {
                label: "Next",
                to: "/docs/next/introduction",
              },
              {
                label: "1.0.0",
                to: "/docs/introduction",
              },
              {
                label: "0.12.0",
                to: "/docs/0.12.0/introduction",
              },
              {
                label: "0.11.0",
                to: "/docs/0.11.0/user_guide/quick_start",
              },
              {
                label: "All versions",
                to: "/versions/",
              },
            ],
          },
          {
            to: '/download/main',
            position: 'right',
            label: 'DOWNLOAD',
            activeBaseRegex: `/download/`,
          },
          {
            to: '/community/how-to-contribute',
            position: 'right',
            label: 'DEVELOP',
            activeBaseRegex: `/community/`,
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            href: 'https://github.com/DataLinkDC/dlink',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
//          {
//            title: 'Docs',
//            items: [
//              {
//                label: 'Tutorial',
//                to: '/docs/intro',
//              },
//            ],
//          },
//          {
//            title: 'Community',
//            items: [
//              {
//                label: 'Stack Overflow',
//                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
//              },
//              {
//                label: 'Discord',
//                href: 'https://discordapp.com/invite/docusaurus',
//              },
//              {
//                label: 'Twitter',
//                href: 'https://twitter.com/docusaurus',
//              },
//            ],
//          },
//          {
//            title: 'More',
//            items: [
//              {
//                label: 'Blog',
//                to: '/blog',
//              },
//              {
//                label: 'GitHub',
//                href: 'https://github.com/facebook/docusaurus',
//              },
//            ],
//          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with DataLink Community.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
   plugins: [
     'docusaurus-plugin-less',
     [
       '@docusaurus/plugin-content-docs',
       {
         id: 'download',
         path: 'download',
         routeBasePath: 'download',
         editUrl: ({locale, versionDocsDirPath, docPath}) => {
           if (locale !== 'zh') {
             return `https://github.com/apache/incubator-inlong-website/edit/master/i18n/${locale}/${docPath}`;
           }
           return `https://github.com/apache/incubator-inlong-website/edit/master/${versionDocsDirPath}/${docPath}`;
         },
         sidebarPath: require.resolve('./sidebarsDevelopment.js'),
       },
     ],
   ]
};

module.exports = config;