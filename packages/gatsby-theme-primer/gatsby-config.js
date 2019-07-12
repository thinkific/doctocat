const path = require('path')

module.exports = themeOptions => {
  return {
    plugins: [
      'gatsby-plugin-styled-components',
      'gatsby-plugin-react-helmet',
      'gatsby-transformer-yaml',
      {
        resolve: 'gatsby-mdx',
        options: {
          defaultLayouts: {
            default: require.resolve('./src/components/layout.js'),
          },
        },
      },
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          name: 'pages',
          path: path.resolve('./src/pages'),
        },
      },
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          name: 'nav',
          path: path.resolve('./src/data/nav.yml'),
        },
      },
      {
        resolve: 'gatsby-plugin-manifest',
        options: {
          icon: themeOptions.icon
            ? path.resolve(themeOptions.icon)
            : require.resolve('./src/images/favicon.png'),
        },
      },
    ],
  }
}
