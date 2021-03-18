const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV.trim() !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res, parse(req.url, true));
  }).listen(80, (err) => {
    if (err) throw err;
    // eslint-disable-next-line no-console
    console.info("> Ready");
  });
});
