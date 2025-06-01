import chalk from "chalk";

export const logger = {
  success(message: string): void {
    console.log(chalk.green("✓"), message);
  },

  error(message: string, error?: unknown): void {
    console.error(chalk.red("✗"), message);
    if (error instanceof Error) {
      console.error(chalk.gray(error.message));
    }
  },

  info(message: string): void {
    console.log(chalk.blue("ℹ"), message);
  },

  warning(message: string): void {
    console.log(chalk.yellow("⚠"), message);
  },
};
