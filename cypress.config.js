import { defineConfig } from "cypress"
export default defineConfig({
  e2e: {
    video: true,
    defaultCommandTimeout: 10000,
    specPattern: 'tests/e2e/**/*.spec.js',
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    supportFile: false,
    setupNodeEvents(on, config) {
      return config;
    },
  },
});
