import { input, select } from "@inquirer/prompts";
import fs from "fs-extra";
import { clone } from "../utils/clone";
import { gt } from "lodash";
import chalk from "chalk";
import path from "path";
import axios, { AxiosResponse } from "axios";
import { name, version } from "../../package.json";

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

export async function getNpmInfo(name: string) {
  const npmUrl = `https://registry.npmjs.org/${name}`;
  let res = {};
  try {
    res = await axios.get(npmUrl);
  } catch (error) {
    console.log(chalk.redBright(error));
  }
  const { data } = res as AxiosResponse;
  return data;
}

export async function getNpmLatestVersion(name: string) {
  const npmData = await getNpmInfo(name);
  return npmData["dist-tags"].latest;
}

export async function checkVersion(name: string, version: string) {
  const latestVersion = await getNpmLatestVersion(name);
  const need = gt(latestVersion, version);
  if (need) {
    console.log(
      `检测到iwalle-cli最新版本：${chalk.redBright(
        latestVersion
      )}, 当前版本：${chalk.redBright(version)}`
    );
    console.log(
      `可执行 ${chalk.yellow(
        "npm install -g iwalle-cli@latest"
      )} 或者 ${chalk.yellow("iwalle update")} 更新`
    );
  }
  return need;
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

  // 检查版本
  await checkVersion(name, version);

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
  if (info) {
    clone(info.downloadUrl, projectName, ["-b", info.branch]);
  }

  console.log(projectName, templateName, info);
}
