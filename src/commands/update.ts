import { Command } from "commander";
import { updateArticle } from "../services/articleService";
import { logger } from "../utils/logger";

export const updateCommand = new Command()
  .name("update")
  .description("記事のメタデータを更新します")
  .option("--title <title>", "新しいタイトル")
  .option("--tags <tags...>", "タグのリスト")
  .action(async (options) => {
    try {
      await updateArticle(options);
      logger.success("記事を更新しました");
    } catch (error) {
      logger.error("記事の更新に失敗しました", error);
      process.exit(1);
    }
  });
