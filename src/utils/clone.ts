import { simpleGit, SimpleGitOptions } from "simple-git";
import createLogger from "progress-estimator";
import chalk from "chalk";

const gitOptions: Partial<SimpleGitOptions> = {
  baseDir: process.cwd(), // 当前工作目录
  binary: "git", // git 二进制文件路径
  maxConcurrentProcesses: 3, // 最大并发进程数
};

const logger = createLogger({
  spinner: {
    frames: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"],
    interval: 80,
  },
});
export async function clone(
  url: string,
  projectName: string,
  options: string[]
) {
  try {
    const git = simpleGit(gitOptions);
    await logger(git.clone(url, projectName, options), "正在下载中...", {
      estimate: 7000,
    });

    console.log(chalk.blueBright("==============================="));
    console.log(chalk.blueBright("== 欢迎使用 walle-cli 脚手架 =="));
    console.log(chalk.blueBright("==============================="));

    console.log();
    console.log();
    console.log();
    console.log(`clone ${projectName}`);
  } catch (error) {
    console.log("下载失败");
    console.log(error);
  }
}
