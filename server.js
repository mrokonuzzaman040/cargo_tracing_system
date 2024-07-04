const { createServer } = require("https");
const { parse } = require("url");
const next = require("next").default;
const fs = require("fs");
const cors = require("cors");
const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

let httpsOptions = {};
if (dev) {
  // Load local SSL certificates for development
  httpsOptions = {
    key: fs.readFileSync(process.env.SSL_KEY_PATH_DEV ?? ""),
    cert: fs.readFileSync(process.env.SSL_CERT_PATH_DEV ?? ""),
  };
} else {
  // Load production SSL certificates dynamically
  httpsOptions = {
    key: fs.readFileSync(process.env.SSL_KEY_PATH ?? ""),
    cert: fs.readFileSync(process.env.SSL_CERT_PATH ?? ""),
  };
}
app.prepare().then(() => {
  const server = createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url ?? "", true);
    handle(req, res, parsedUrl);
  });
  server.on(
    "request",
    cors({
      origin: process.env.CORS_ORIGIN, // Set allowed origin in environment variables
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    })
  );
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(
      `Ready - started server on url: https://${
        dev ? "localhost" : process.env.NEXT_PUBLIC_BASE_URL
      }:${port}`
    );
  });
});
