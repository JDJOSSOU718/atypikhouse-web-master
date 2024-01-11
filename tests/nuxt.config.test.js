// nuxt.config.test.js

import config from '../nuxt.config.js';

describe('Nuxt Config', () => {
  test('it should have the correct plugins', () => {
    const expectedPlugins = [
      { src: '~/plugins/vue-carousel', ssr: false },
      // ... ajoutez d'autres plugins ici
    ];

    expect(config.plugins).toEqual(expect.arrayContaining(expectedPlugins));
  });

  test('it should have the correct build modules', () => {
    const expectedBuildModules = ['@nuxtjs/pwa'];

    expect(config.buildModules).toEqual(expect.arrayContaining(expectedBuildModules));
  });

  test('it should have the correct CSS styles', () => {
    const expectedStyles = [
      './assets/scss/styles/animate.min.css',
      // ... ajoutez d'autres styles ici
    ];

    expect(config.css).toEqual(expect.arrayContaining(expectedStyles));
  });

  // ... ajoutez d'autres tests pour les modules, le moment, axios, etc.

  test('it should have the correct server configuration', () => {
    const expectedPort = 8080;

    expect(config.server.port).toBe(expectedPort);
  });
});
