import { exec } from "../utils/exec";
import { gitService } from "./gitService";
import { PR_BRANCH_PREFIX, DEFAULT_BRANCH } from "../config/constants";
import { logger } from "../utils/logger";

export async function createPullRequest(): Promise<void> {
  // Check if there are any changes
  const hasChanges = await gitService.hasChanges();
  if (hasChanges) {
    logger.warning("未コミットの変更があります。先にコミットしてください。");
    process.exit(1);
  }

  // Get current branch
  const currentBranch = await gitService.getCurrentBranch();
  
  // Create PR branch if on main/master
  let prBranch = currentBranch;
  if (currentBranch === DEFAULT_BRANCH || currentBranch === "master") {
    // Create new branch with timestamp
    const timestamp = Date.now();
    prBranch = `${PR_BRANCH_PREFIX}-${timestamp}`;
    
    logger.info(`新しいブランチを作成します: ${prBranch}`);
    await gitService.createBranch(prBranch);
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
