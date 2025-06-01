import {
  ArticleMetadata,
  type CreateArticleOptions,
  type UpdateArticleOptions,
} from "../types";
import { fileManager } from "../utils/fileManager";
import { generateHash } from "../utils/hashGenerator";
import { gitService } from "./gitService";
import { DOCS_DIR, META_FILE_NAME } from "../config/constants";
import path from "path";

export async function createArticle(
  options: CreateArticleOptions,
): Promise<void> {
  // Get user email to determine username
  const email = await gitService.getEmail();
  const username = email.split("@")[0];
  
  // Generate hash for the article
  const hash = generateHash(username);
  
  // Create directory path
  const articleDir = path.join(DOCS_DIR, username, hash);
  
  // Create directory
  await fileManager.createDirectory(articleDir);
  
  // Create metadata
  const metadata: ArticleMetadata = {
    title: options.title || "新しい記事",
    tags: [],
  };
  
  // Write meta.json
  const metaPath = path.join(articleDir, META_FILE_NAME);
  await fileManager.writeFile(metaPath, JSON.stringify(metadata, null, 2));
  
  // Create markdown file
  const markdownPath = path.join(articleDir, `${hash}.md`);
  const markdownContent = `# ${metadata.title}\n\n<!-- 記事の内容をここに書いてください -->\n`;
  await fileManager.writeFile(markdownPath, markdownContent);
  
  // Git add and commit
  await gitService.add([articleDir]);
  await gitService.commit(`記事を作成: ${metadata.title}`);
}

export async function updateArticle(
  options: UpdateArticleOptions,
): Promise<void> {
  // Implementation placeholder
}

export async function deleteArticle(hash: string): Promise<void> {
  // Implementation placeholder
}
