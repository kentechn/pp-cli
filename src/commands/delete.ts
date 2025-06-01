import { Command } from "commander";
import { deleteArticle } from "../services/articleService";
import { logger } from "../utils/logger";

export const deleteCommand = new Command()
  .name("delete")
  .description("記事を削除します")
  .argument(
    "<hash>",
    '削除する記事のハッシュ値（または "." で現在のディレクトリ）',
  )
  .action(async (hash: string) => {
    try {
      await deleteArticle(hash);
      logger.success("記事を削除しました");
    } catch (error) {
      logger.error("記事の削除に失敗しました", error);
      process.exit(1);
    }
  });
