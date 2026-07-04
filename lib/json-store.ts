import { mkdir, readFile, writeFile } from "fs/promises";
import { dirname, join } from "path";

export async function readJsonArray<T>(fileName: string): Promise<T[]> {
  try {
    const raw = await readFile(getStorePath(fileName), "utf8");
    const parsed = JSON.parse(raw) as T[];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }

    throw error;
  }
}

export async function appendJsonItem<T>(fileName: string, item: T) {
  const items = await readJsonArray<T>(fileName);
  const nextItems = [...items, item];
  const storePath = getStorePath(fileName);

  await mkdir(dirname(storePath), { recursive: true });
  await writeFile(storePath, `${JSON.stringify(nextItems, null, 2)}\n`, "utf8");

  return nextItems;
}

function getStorePath(fileName: string) {
  return join(process.cwd(), "data", fileName);
}
