#!/usr/bin/env node
/*
  Encrypt a client's dashboard payload so it can be deployed publicly.

    node lock_report.js Tribos              # generates a passcode
    node lock_report.js Tribos ABCD-EFGH    # or use one you already gave out

  Reads  data/<Client>.json   (plaintext, gitignored, never deployed)
  Writes data/<Client>.enc.json  (AES-256-GCM, safe to commit and deploy)

  Text the passcode to the client on a different channel than the link.
  Re-run this after any render_report.R run — the plaintext JSON is rewritten
  each time, which leaves the encrypted copy stale.
*/
const fs = require('fs'), path = require('path'), crypto = require('crypto');

const ITERATIONS = 600000;                       // PBKDF2-SHA256, ~0.5s in-browser
const ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";   // no I/L/O/0/1 — these get read aloud

function generate() {                            // 12 chars ≈ 59 bits
  const pick = () => ALPHABET[crypto.randomInt(ALPHABET.length)];
  return [0, 1, 2].map(() => [0, 1, 2, 3].map(pick).join("")).join("-");
}

const client = process.argv[2];
if (!client) {
  console.error("usage: node lock_report.js <Client> [passcode]");
  process.exit(1);
}

const src = path.join(__dirname, "data", client + ".json");
if (!fs.existsSync(src)) {
  console.error(`No such payload: ${src}\nRun render_report.R for this client first.`);
  process.exit(1);
}

// Normalized the same way the unlock screen normalizes what the client types,
// so a passcode read off a text message still works in any case.
const passcode = (process.argv[3] || generate()).trim().toUpperCase();
const salt = crypto.randomBytes(16);
const iv = crypto.randomBytes(12);
const key = crypto.pbkdf2Sync(passcode, salt, ITERATIONS, 32, "sha256");

const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
const body = Buffer.concat([cipher.update(fs.readFileSync(src)), cipher.final()]);
const payload = Buffer.concat([body, cipher.getAuthTag()]);   // WebCrypto wants ct||tag

const out = path.join(__dirname, "data", client + ".enc.json");
fs.writeFileSync(out, JSON.stringify({
  v: 1, cipher: "AES-256-GCM", kdf: "PBKDF2-SHA256", iterations: ITERATIONS,
  salt: salt.toString("base64"), iv: iv.toString("base64"), ct: payload.toString("base64")
}));

console.log(`
  wrote     ${path.relative(process.cwd(), out)}  (${(payload.length / 1024).toFixed(1)} KB)
  link      https://mackinblack.com/reports/?client=${encodeURIComponent(client)}
  passcode  ${passcode}

  Send the link and the passcode on different channels. There is no reset —
  to change it, re-run this script and re-deploy.
`);
