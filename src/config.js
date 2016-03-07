require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'CIQ Layout Composer',
    description: 'A tool to edit and view Connect IQ layout elements on the fly',
    head: {
      titleTemplate: 'CIQ Layout Composer: %s',
      meta: [
        {name: 'description', content: 'A tool to edit and view Connect IQ layout elements on the fly.'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'CIQ Layout Composer'},
        {property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: 'CIQ Layout Composer'},
        {property: 'og:description', content: 'A tool to edit and view Connect IQ layout elements on the fly.'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@hakonrossebo'},
        {property: 'og:creator', content: '@hakonrossebo'},
        {property: 'og:title', content: 'CIQ Layout Composer'},
        {property: 'og:description', content: 'A tool to edit and view Connect IQ layout elements on the fly.'},
        {property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    }
  },

}, environment);
