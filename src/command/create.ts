import { input, select } from "@inquirer/prompts";
import fs from "fs-extra";
import { clone } from "../utils/clone";
import chalk from "chalk";
import path from "path";

interface ITemplateInfo {
  name: string;
  description: string;
  downloadUrl: string;
  branch: string;
}

export const templates: Map<string, ITemplateInfo> = new Map([
  [
    "vue-ts",
    {
      name: "vue-ts",
      description: "vue3后台管理模版",
      downloadUrl: "git@gitee.com:i-wall-e/admin-vue3.git",
      branch: "master",
    },
  ],
  [
    "vue-ts2",
    {
      name: "vue-ts2",
      description: "vue3后台管理模版2",
      downloadUrl: "git@gitee.com:i-wall-e/admin-vue3.git",
      branch: "master",
    },
  ],
]);

// 处理文件夹存在的情况
export async function isOverWrite(filePath: string) {
  console.log(chalk.redBright(`${filePath} 文件已存在`));
  return await select({
    message: "是否覆盖？",
    choices: [
      {
        name: "覆盖",
        value: true,
      },
      {
        name: "取消",
        value: false,
      },
    ],
  });
}

export async function create(projectName: string) {
  // 初始化模版列表
  const templateList = Array.from(templates).map(
    (item: [string, ITemplateInfo]) => {
      const [name, info] = item;
      return {
        name,
        value: name,
        description: info.description,
      };
    }
  );

  if (!projectName) {
    projectName = await input({ message: "请输入项目名称" });
  }

  const filePath = path.resolve(process.cwd(), projectName);
  if (fs.existsSync(filePath)) {
    const isNext = await isOverWrite(filePath);
    if (isNext) {
      fs.removeSync(filePath);
    } else {
      return;
    }
  }

  const templateName = await select({
    message: "请选择模版",
    choices: templateList,
  });

  const info = templates.get(templateName);

  console.log(chalk.blue("Hello world!"));
  if (info) {
    // clone(info.downloadUrl, projectName, ["-b", info.branch]);
  }

  console.log(projectName, templateName, info);
}
