import { cp, mkdir, readdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const workerDirectory = resolve("dist/server");
const workerPath = resolve(workerDirectory, "index.js");
const clientDirectory = resolve("dist/client");

await mkdir(clientDirectory, { recursive: true });

for (const entry of await readdir("dist")) {
  if (entry === "client" || entry === "server") continue;
  await cp(resolve("dist", entry), resolve(clientDirectory, entry), {
    recursive: true,
  });
}

const worker = `export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (!url.pathname.endsWith("/") && !url.pathname.includes(".")) {
      url.pathname += "/";
      return Response.redirect(url.toString(), 308);
    }

    if (url.pathname.endsWith("/")) {
      url.pathname += "index.html";
    }

    return env.ASSETS.fetch(new Request(url, request));
  },
};
`;

await mkdir(workerDirectory, { recursive: true });
await writeFile(workerPath, worker);
