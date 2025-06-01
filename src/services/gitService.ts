import { exec } from "../utils/exec";

export const gitService = {
  async getEmail(): Promise<string> {
    const { stdout } = await exec("git config user.email");
    return stdout.trim();
  },

  async add(files: string[]): Promise<void> {
    await exec(`git add ${files.join(" ")}`);
  },

  async commit(message: string): Promise<void> {
    await exec(`git commit -m "${message}"`);
  },

  async push(branch?: string): Promise<void> {
    if (branch) {
      await exec(`git push -u origin ${branch}`);
    } else {
      await exec("git push");
    }
  },

  async createBranch(branchName: string): Promise<void> {
    await exec(`git checkout -b ${branchName}`);
  },

  async checkout(branch: string): Promise<void> {
    await exec(`git checkout ${branch}`);
  },

  async hasChanges(): Promise<boolean> {
    const { stdout } = await exec("git status --porcelain");
    return stdout.trim().length > 0;
  },

  async getCurrentBranch(): Promise<string> {
    const { stdout } = await exec("git branch --show-current");
    return stdout.trim();
  },
};
