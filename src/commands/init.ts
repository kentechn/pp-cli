import { Command } from "commander";
import { createArticle } from "../services/articleService";
import { logger } from "../utils/logger";

export const initCommand = new Command()
  .name("init")
  .description("新しい記事を作成します")
  .option("-t, --title <title>", "記事のタイトル")
  .action(async (options) => {
    try {
      await createArticle(options);
      logger.success("記事を作成しました");
    } catch (error) {
      logger.error("記事の作成に失敗しました", error);
      process.exit(1);
    }
  });
