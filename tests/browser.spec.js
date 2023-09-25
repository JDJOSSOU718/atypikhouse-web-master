import { createPage, setupTest } from '@nuxt/test-utils'
import {jest} from '@jest/globals'


jest.setTimeout(10000)
describe('browser', () => {
  setupTest({ browser: true })

  it('renvoi la page d\'accueil', async () => {
    const page = await createPage('/')
    const html = await page.innerHTML('body')

    expect(html).toContain('Trouvez votre type de location ici!')
  })

  it('renvoi un message d\'erreur', async () => {
    const page = await createPage('/login')
    await page.fill('input[name="email"]', 'admin@mail.com')
    await page.fill('input[name="password"]', 'sdakldfjsdiuia')
    await page.click('button[type=submit]');
    await expect(page.locator('.error')).toHaveText('Une erreur est survenue, veuillez verifier vos informations puis réessayer!')
  })
})