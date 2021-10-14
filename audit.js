const httpServer = require('http-server');
const fp = require('find-free-port');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

const cms = require('./cms');

const TRESHOLDS = {
  performance: 90,
  accessibility: 90,
  'best-practices': 90,
  seo: 90,
};

const server = httpServer.createServer({
  root: 'build',
});

const genesis = cms.get();

const posts = genesis.children
  .filter((page) => page.template === 'category')
  .reduce(
    (acc, category) => [
      ...acc,
      ...category.children.filter((page) => page.visible),
    ],
    [],
  )
  .reduce((acc, page) => [...acc, page.url], [genesis.url]);

try {
  (async () => {
    const host = '127.0.0.1';
    const [port] = await fp(3000);
    const base = `http://${host}:${port}`;

    server.listen(port, host, async () => {
      const chrome = await chromeLauncher.launch({
        chromeFlags: [
          '--disable-gpu',
          '--headless',
          '--no-zygote',
          '--no-sandbox',
        ],
      });

      const flags = {
        port: chrome.port,
        output: 'json',
      };

      for (const post of posts) {
        console.log(`Checking "${post}"`); // eslint-disable-line no-console

        const result = await lighthouse(`${base}${post}`, flags, null);
        const report = Object.entries(result.lhr.categories).reduce(
          (acc, [categoryName, category]) => ({
            ...acc,
            [categoryName]: Math.round(category.score * 100),
          }),
          {},
        );

        Object.entries(TRESHOLDS).forEach(([prop, treshold]) => {
          if (report[prop] >= treshold) {
            console.log(`- "${prop}" is ${report[prop]} (>= ${treshold})`); // eslint-disable-line no-console
          } else {
            // eslint-disable-next-line no-console
            console.error(
              `- "${prop}" is ${report[prop]} but should be >= ${treshold}`,
            );
            process.exit(1);
          }
        });

        console.log(); // eslint-disable-line no-console
      }

      await chrome.kill();
      await server.close();
    });
  })();
} catch (e) {
  console.error(e); // eslint-disable-line no-console
  process.exit(1);
}
