import process from "child_process";
import ora from "ora";
import chalk from "chalk";

const spinner = ora({
    text: "iwalle-cli 更新中...",
    spinner: {
        frames: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"],
        interval: 100
    }
});

export function update() {
    spinner.start();
    process.exec("npm install -g iwalle-cli@latest", (error, stdout, stderr) => {
        spinner.stop();
        if(!error) {
            console.log(chalk.green(`iwalle-cli 更新成功`))
        } else {
            console.log(chalk.red(`iwalle-cli 更新失败`))
        }
    });
}