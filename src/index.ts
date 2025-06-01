#!/usr/bin/env node

import { Command } from "commander";
import { version } from "../package.json";
import { deleteCommand } from "./commands/delete";
import { initCommand } from "./commands/init";
import { prCommand } from "./commands/pr";
import { updateCommand } from "./commands/update";

const program = new Command();

program
  .name("pp")
  .description("GitHubリポジトリでブログ記事を効率的に管理するCLIツール")
  .version(version);

program.addCommand(initCommand);
program.addCommand(updateCommand);
program.addCommand(prCommand);
program.addCommand(deleteCommand);

program.parse();
