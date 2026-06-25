import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SCENE_PROMPTS, STYLE_NEGATIVE, promptForScene } from "./illustration-prompts.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.join(root, "assets", "illustrations");
const model = process.env.OPENAI_IMAGE_MODEL || "gpt-image-1";
const apiKey = process.env.OPENAI_API_KEY;

async function generateImage(prompt, size = "1024x1024") {
  const body = {
    model,
    prompt,
    size,
    quality: process.env.OPENAI_IMAGE_QUALITY || "medium",
    n: 1
  };

  if (process.env.OPENAI_USE_NEGATIVE_PROMPT === "1") {
    body.prompt = `${prompt}\n\nNegative prompt: ${STYLE_NEGATIVE}`;
  }

  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI image API failed (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const item = data?.data?.[0];
  if (!item) throw new Error("OpenAI returned no image data.");

  if (item.b64_json) {
    return Buffer.from(item.b64_json, "base64");
  }

  if (item.url) {
    const imageResponse = await fetch(item.url);
    if (!imageResponse.ok) {
      throw new Error(`Failed to download generated image (${imageResponse.status}).`);
    }
    return Buffer.from(await imageResponse.arrayBuffer());
  }

  throw new Error("OpenAI image response missing url and b64_json.");
}

async function main() {
  if (!apiKey) {
    console.error("Missing OPENAI_API_KEY. Example:");
    console.error('  $env:OPENAI_API_KEY="sk-..."; node scripts/generate-illustrations.mjs');
    process.exitCode = 1;
    return;
  }

  const requested = process.argv.slice(2).filter((arg) => !arg.startsWith("-"));
  const scenes = requested.length
    ? requested.map((id) => promptForScene(id))
    : SCENE_PROMPTS;

  await fs.mkdir(outputDir, { recursive: true });

  for (const scene of scenes) {
    const target = path.join(outputDir, `${scene.id}.png`);
    process.stdout.write(`Generating ${scene.id} (${scene.size})... `);
    const bytes = await generateImage(scene.prompt, scene.size);
    await fs.writeFile(target, bytes);
    console.log(`saved ${path.relative(root, target)}`);
  }

  console.log("\nDone. Refresh the app to load the new illustrations.");
  console.log("Prompts live in scripts/illustration-prompts.mjs");
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
