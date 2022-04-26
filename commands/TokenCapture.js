const puppeteer = require('puppeteer')
const { Logger } = require('./BaseCommand')
const { writeFileSync } = require('fs')
const path = require('path')

module.exports = class TokenCapture {
  browser
  user = {
    name: '',
    password: '',
  }

  constructor(name, password) {
    this.user.name = name,
    this.user.password = password
  }

  async run() {
    Logger.info("Conectando ao Puppeeter");
    await this.run_puppeeter({ name: this.user.name, password: this.user.password });
  }

  async run_puppeeter({ name, password }) {
    const page = await this.join_website();

    await this.join_account(page, { name, password });
    await this.join_double(page);
  }

  async join_website() {
    this.browser = await puppeteer.launch({ headless: true });
    const page = await this.browser.newPage();
    page.setDefaultNavigationTimeout(50000);
    await page.goto("https://www.smashup.com/#!");
    return page;
  }

  async join_account(page, user) {
    Logger.info("Logando na double");
    await page.click('[href="#login-registration"]');

    await page.focus('[name="login"]');
    await this.sleep(1000);
    await page.keyboard.type(user.name);
    await this.sleep(1000);
    await page.focus('input[type="password"]');
    await this.sleep(1000);
    await page.keyboard.type(user.password);
    await page.click('[type="submit"]');
    Logger.info("Entrando na conta");
  }

  async join_double(page) {
    Logger.info("Entrando na pagina Double");
    await this.sleep(1000);
    await page.click('[src="includes/images/icon/side-icons/double-icon.png"]');
    await this.sleep(1000);

    await page.setRequestInterception(true);

    Logger.info("Iniciando sistema de captura de Token");
    await this.write_token(page).then(() => {
      return 
    })
  }

  async write_token(page) {
    page.on("request", async (request) => {
      if (
        request.url().includes("https://br-game.t1tcp.com/mini/double?token=")
      ) {
        const token = request
          .url()
          .replace("=", " ")
          .replace("&", " ")
          .split(" ")[1];

        Logger.info(`Token encontrado: ${token}. salvando..`);
        writeFileSync(`${path.resolve('./token.txt')}`, token)
        await this.browser.close();
        return token
      }

      await request.continue();
    });
  }

  sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
}
