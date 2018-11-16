//jshint strict: false
module.exports = function(config) {
  config.set({
    basePath: './src',

    files: [
      '../bower_components/angular/angular.js',
      '../bower_components/angular-ui-router/release/angular-ui-route.min.js',
      '../node_modules/angular-mocks/angular-mocks.js',
      'app/**/*.js',
      'app/**/**/*.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome'],

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine'
    ]
  });
};
