import fs from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const outputDir = path.join(projectRoot, "marketing", "exports");
const kitPath = path.join(projectRoot, "marketing", "launch-kit.html");
const require = createRequire(import.meta.url);
const { chromium } = require("/Users/oumdia/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");

const exports = [
  ["logo-main", "homefix-224-logo-principal.png"],
  ["avatar", "homefix-224-photo-profil.png"],
  ["facebook-cover", "homefix-224-banniere-facebook.png"],
  ["ad-plomberie", "homefix-224-pub-plomberie.png"],
  ["ad-electricite-clim", "homefix-224-pub-electricite-clim.png"],
  ["ad-maintenance", "homefix-224-pub-maintenance.png"],
  ["status-urgence", "homefix-224-statut-urgence.png"],
  ["status-services", "homefix-224-statut-services.png"],
  ["flyer-digital", "homefix-224-flyer-digital.png"],
];

await fs.mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  deviceScaleFactor: 1,
  viewport: { width: 1800, height: 2200 },
});

await page.goto(`file://${kitPath}`, { waitUntil: "networkidle" });
await page.fonts?.ready;

for (const [id, filename] of exports) {
  const element = page.locator(`#${id}`);
  await element.screenshot({
    path: path.join(outputDir, filename),
    omitBackground: id === "logo-main",
  });
}

await browser.close();
console.log(`Exported ${exports.length} assets to ${outputDir}`);
