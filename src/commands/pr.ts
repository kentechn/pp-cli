import { Command } from "commander";
import { createPullRequest } from "../services/githubService";
import { logger } from "../utils/logger";

export const prCommand = new Command()
  .name("pr")
  .description("プルリクエストを作成します")
  .action(async () => {
    try {
      await createPullRequest();
      logger.success("プルリクエストを作成しました");
    } catch (error) {
      logger.error("プルリクエストの作成に失敗しました", error);
      process.exit(1);
    }
  });
