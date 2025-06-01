import fs from "node:fs/promises";
import path from "node:path";

export const fileManager = {
  async createDirectory(dirPath: string): Promise<void> {
    await fs.mkdir(dirPath, { recursive: true });
  },

  async writeFile(filePath: string, content: string): Promise<void> {
    await fs.writeFile(filePath, content, "utf-8");
  },

  async readFile(filePath: string): Promise<string> {
    return await fs.readFile(filePath, "utf-8");
  },

  async exists(filePath: string): Promise<boolean> {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  },

  async deleteDirectory(dirPath: string): Promise<void> {
    await fs.rm(dirPath, { recursive: true, force: true });
  },
};
