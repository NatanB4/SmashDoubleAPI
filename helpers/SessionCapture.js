const puppeteer = require('puppeteer')
const { Logger } = require('./BaseCommand')
const path = require('path')
const { writeFile } = require('fs/promises')

module.exports = class SessionCapture {
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
    this.browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'], });
    const page = await this.browser.newPage();
    page.setDefaultNavigationTimeout(50000);
    await page.goto("https://www.smashup.com/#!");


    Logger.info("Logando na double");
    await page.click('[href="#login-registration"]');

    await page.focus('[name="login"]');
    await this.sleep(1000);
    await page.keyboard.type(this.user.name);
    await this.sleep(1000);
    await page.focus('input[type="password"]');
    await this.sleep(1000);
    await page.keyboard.type(this.user.password);
    await page.click('[type="submit"]');
    Logger.info("Entrando na conta");

    Logger.info("Iniciando sistema de captura de Token");
    await page.setRequestInterception(true);

    let data = {
      cookie: undefined,
      token: undefined,
    };

    await page.on("request", async (request) => {
      if (
        request.url().includes("https://br-game.t1tcp.com/mini/double?token=")
      ) {
        data.token = request
          .url()
          .replace("=", " ")
          .replace("&", " ")
          .split(" ")[1];

        Logger.info(`Token encontrado: ${data.token}. salvando..`);
        await writeFile(`${path.resolve('./Session.json')}`, `${JSON.stringify(data)} \n`).then(async () => await this.browser.close())
      }
      if (
        request.url().includes("https://player.smashup.com/async/available_subwallet_list") && data.cookie == undefined
      ) {
        data.cookie = request.headers().cookie.split(" ")[1].replace("=", " ").replace(";", " ").split(" ")[1]
        Logger.info(`Cookie encontrado: ${data.cookie}. salvando..`);
      }

      await request.continue();
    });

    Logger.info("Entrando na pagina Double");
    await this.sleep(1000);
    await page.click('[src="includes/images/icon/side-icons/double-icon.png"]');
    await this.sleep(7000);
  }

  sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
}
