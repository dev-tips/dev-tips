const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');
const chromeLauncher = require('chrome-launcher');
const axios = require('axios');
const pug = require('pug');

const cms = require('./cms');

const genesis = cms.get();
const template = path.resolve(__dirname, 'src', 'share.pug');

const posts = genesis.children
  .filter(page => page.template === 'category')
  .reduce(
    (acc, category) => [
      ...acc,
      ...category.children.filter(page => page.visible),
    ],
    [],
  );

try {
  (async () => {
    const chrome = await chromeLauncher.launch({
      chromeFlags: [
        '--disable-gpu',
        '--headless',
        '--no-zygote',
        '--no-sandbox',
      ],
    });

    const response = await axios.get(
      `http://localhost:${chrome.port}/json/version`,
    );

    const browser = await puppeteer.connect({
      browserWSEndpoint: response.data.webSocketDebuggerUrl,
    });

    for (const post of posts) {
      console.log(`Generating share thumbnail for "${post.url}"`); // eslint-disable-line no-console

      const page = await browser.newPage();

      await page.setViewport({
        width: 1920,
        height: 1080,
      });

      await page.setContent(
        pug.renderFile(template, {
          title: post.title,
          category: `data:image/svg+xml;base64,${fs
            .readFileSync(
              post.parent.images.find(image => image.url.endsWith('icon.svg'))
                .file,
            )
            .toString('base64')}`,
        }),
        {
          waitUntil: 'networkidle2',
        },
      );

      await page.screenshot({
        path: path.resolve(path.dirname(post.file), 'share.png'),
      });

      console.log(); // eslint-disable-line no-console
    }

    await browser.close();
    await chrome.kill();
  })();
} catch (e) {
  console.error(e); // eslint-disable-line no-console
  process.exit(1);
}
