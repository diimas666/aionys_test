const { defineConfig } = require('cypress');
module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8081', // порт твоей Expo web-сборки (может быть 8081/8082)
    video: false,
  },
});
