const http = require("http");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const PORT = process.env.OFFLINEWIKI_CONTROL_PORT || 4174;
const BIND = process.env.OFFLINEWIKI_BIND || "127.0.0.1";
const TOKEN_FILE = path.join(__dirname, "control-token.txt");

const readToken = () => {
  if (process.env.OFFLINEWIKI_TOKEN) return process.env.OFFLINEWIKI_TOKEN.trim();
  try {
    return fs.readFileSync(TOKEN_FILE, "utf8").trim();
  } catch (err) {
    return "";
  }
};

const token = readToken();

const send = (res, code, payload) => {
  res.writeHead(code, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, X-OfflineWiki-Token"
  });
  res.end(JSON.stringify(payload));
};

const authorized = (req) => {
  if (!token) return false;
  const header = req.headers["x-offlinewiki-token"];
  if (header && header === token) return true;
  const url = new URL(req.url, `http://${req.headers.host}`);
  return url.searchParams.get("token") === token;
};

const runCommand = (cmd, res) => {
  exec(cmd, { cwd: "/Volumes/MK/kiwix", timeout: 30000 }, (err, stdout, stderr) => {
    if (err) {
      send(res, 500, { ok: false, error: stderr || err.message });
      return;
    }
    send(res, 200, { ok: true, output: stdout.trim() });
  });
};

const server = http.createServer((req, res) => {
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, X-OfflineWiki-Token",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
    });
    res.end();
    return;
  }

  if (req.url.startsWith("/status")) {
    send(res, 200, { ok: true, tokenConfigured: !!token });
    return;
  }

  if (!authorized(req)) {
    send(res, 403, { ok: false, error: "unauthorized" });
    return;
  }

  if (req.url.startsWith("/restart")) {
    runCommand("docker compose restart", res);
    return;
  }

  if (req.url.startsWith("/down")) {
    runCommand("docker compose down", res);
    return;
  }

  send(res, 404, { ok: false, error: "not_found" });
});

server.listen(PORT, BIND, () => {
  console.log(`OfflineWiki control server on ${BIND}:${PORT}`);
});
