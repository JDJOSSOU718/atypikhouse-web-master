// Import necessary dependencies

import { Nuxt, Builder } from 'nuxt';
//import puppeteer from 'puppeteer';
import Login from '../pages/login.vue';

let nuxt = null;

// Create an instance of Nuxt before running the tests
beforeAll(async () => {
  const config = require('../nuxt.config.js');
  nuxt = new Nuxt(config);
  await new Builder(nuxt).build();
  await nuxt.listen(4000);
},); // Reduce the global timeout to 60 seconds

// Close the server and Puppeteer browser after the tests
afterAll(async () => {
  if (nuxt) {
    await nuxt.close();
  }
});

// Describe the combined test suite
describe('Login Functionality', () => {
  // Test case for the login method
  it('should successfully log in with valid credentials', async () => {
    // Mock the necessary dependencies, such as store and axios
    const mockStore = {
      dispatch: jest.fn(() => Promise.resolve({ grade: 'user' })),
      state: { authUser: null },
    };

    // Mount the component with the mocked store
    const wrapper = mount(Login, {
      mocks: {
        $store: mockStore,
        $router: { push: jest.fn() },
      },
    });

    // Set form input values
    wrapper.setData({ formEmail: 'admin@admin.com', formPassword: 'KSD&Ap?DAWAc' });

    // Call the login method
    await wrapper.vm.login();

    // Assert that the store dispatch was called with the correct parameters
    expect(mockStore.dispatch).toHaveBeenCalledWith('login', {
      email: 'admin@admin.com',
      password: 'KSD&Ap?DAWAc',
    });

    // Assert any other expected behavior based on the component's logic
    // For example, check if the router push method was called with the correct route
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith('/dashboard');
  });
/*
  // Test the scenario where the user provides incorrect credentials using Puppeteer
  it('handles invalid credentials on the login page', async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Load the login page
    await page.goto('http://localhost:4000/login/');

    // Replace the data below with your API's actual response
    const apiResponse = {
      success: false,
      message: 'Bad credential',
      email: 'invalid@example.com',
      password: 'invalidPassword',
    };

    // Wait for the form to be visible before filling in the fields
    await page.waitForSelector('form.login');

    // Fill the form with incorrect credentials
    await page.type('input[name=email]', apiResponse.email);
    await page.type('input[name=password]', apiResponse.password);
    await page.click('button[type=submit]');

    // Wait for the page to load after form submission
    await page.waitForNavigation({ waitUntil: 'domcontentloaded' });

    // Check that the appropriate error message is displayed on the page
    const errorMessage = await page.$eval('.error-message', (el) => el.textContent.trim());
    expect(errorMessage).toBe(apiResponse.message);

    await browser.close();
  });*/

});