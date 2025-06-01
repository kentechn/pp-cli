import { exec } from "../utils/exec";
import { gitService } from "./gitService";
import { PR_BRANCH_PREFIX, DEFAULT_BRANCH, DOCS_DIR } from "../config/constants";
import { logger } from "../utils/logger";
import { fileManager } from "../utils/fileManager";
import path from "path";
import fs from "fs/promises";

async function getLatestArticleHash(): Promise<string | null> {
  try {
    // Get user email to determine username
    const email = await gitService.getEmail();
    const username = email.split("@")[0];
    const userDir = path.join(DOCS_DIR, username);
    
    // Check if user directory exists
    if (!await fileManager.exists(userDir)) {
      return null;
    }
    
    // Get all directories in user folder
    const entries = await fs.readdir(userDir, { withFileTypes: true });
    const dirs = entries.filter(entry => entry.isDirectory()).map(dir => dir.name);
    
    if (dirs.length === 0) {
      return null;
    }
    
    // Get the most recent directory by checking modification time
    let latestDir = dirs[0];
    let latestTime = 0;
    
    for (const dir of dirs) {
      const dirPath = path.join(userDir, dir);
      const stat = await fs.stat(dirPath);
      if (stat.mtimeMs > latestTime) {
        latestTime = stat.mtimeMs;
        latestDir = dir;
      }
    }
    
    return latestDir;
  } catch (error) {
    logger.error("最新の記事ハッシュの取得に失敗しました", error);
    return null;
  }
}

export async function createPullRequest(): Promise<void> {
  // Get current branch first
  const currentBranch = await gitService.getCurrentBranch();
  
  // Create PR branch if on main/master BEFORE committing
  let prBranch = currentBranch;
  if (currentBranch === DEFAULT_BRANCH || currentBranch === "master") {
    // Try to get the latest article hash for branch name
    const articleHash = await getLatestArticleHash();
    
    if (articleHash) {
      // Use article hash as branch name
      prBranch = `${PR_BRANCH_PREFIX}/${articleHash}`;
    } else {
      // Fallback to timestamp if no article found
      const timestamp = Date.now();
      prBranch = `${PR_BRANCH_PREFIX}-${timestamp}`;
    }
    
    logger.info(`新しいブランチを作成します: ${prBranch}`);
    await gitService.createBranch(prBranch);
  }

  // Now check if there are any changes and commit them
  const hasChanges = await gitService.hasChanges();
  if (hasChanges) {
    logger.info("変更を確認しています...");
    
    // Get status to show what will be committed
    const { stdout: statusOutput } = await exec("git status --porcelain");
    const changedFiles = statusOutput.trim().split('\n').filter(line => line.length > 0);
    
    logger.info("以下のファイルをコミットします:");
    changedFiles.forEach(file => {
      console.log(`  ${file}`);
    });
    
    // Add only posts directory changes
    logger.info("変更をステージングしています...");
    await gitService.add([DOCS_DIR]); // postsディレクトリのみをステージ
    
    // Commit with a descriptive message
    logger.info("変更をコミットしています...");
    await gitService.commit("記事の更新");
  }

  // Push the branch
  logger.info("ブランチをプッシュしています...");
  await gitService.push(prBranch);

  // Create PR using GitHub CLI
  logger.info("プルリクエストを作成しています...");
  try {
    const { stdout } = await exec(`gh pr create --base ${DEFAULT_BRANCH} --head ${prBranch} --title "記事の更新" --body "PP CLIによる記事の更新"`);
    logger.success("プルリクエストを作成しました:");
    console.log(stdout.trim());
  } catch (error) {
    // Check if gh is installed
    if (error instanceof Error && error.message.includes("gh: command not found")) {
      logger.error("GitHub CLIがインストールされていません。");
      logger.info("以下のコマンドでインストールしてください:");
      logger.info("https://cli.github.com/");
      logger.info("\nまたは、手動でプルリクエストを作成してください。");
    } else {
      throw error;
    }
  }
}
