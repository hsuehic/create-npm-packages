#!/usr/bin/env node
/* eslint-disable cnp/no-console */

import { setPackageJsonField, setPackageJsonFields } from 'cnp-utils';
import { Option, program } from 'commander';
import prompts from 'prompts';
import { cd, chalk, fs } from 'zx';

import { REG_TEMPLATE, TEMPLATES } from './constant.js';
import { downloadArchiveToDirectory, getUserInfo } from './util/git.js';
import { updateReadme } from './util/readme.js';

/**
 * Init Cli Program
 */
function initProgram() {
  program
    .description('Create a npm package using pre-defined templates')
    .addOption(
      new Option(
        '-n, --name <packageName>',
        'Package name in package.json, will used to generate README.md file as well'
      )
    )
    .addOption(
      new Option(
        '-t, --template <template>',
        'Template used to create the package, format: owner/template-repo, e.g. hsuehic/cnp-template-javascript, default: hsuehic/cnp-template-typescript'
      )
    )
    .addOption(
      new Option(
        '--github-username <owner>',
        'Github user name which is used to automatically generate information for package.json, README.md'
      )
    );

  program.parse();
}

/**
 * Inquire Cli  Arguments and Options if not declared in commandlint
 * @returns Cli Options
 */
async function inquire(): Promise<{
  name: string;
  template: string;
  githubUsername: string;
}> {
  const options = program.opts<{
    name: string;
    template: string;
    githubUsername: string;
  }>();

  const promptsObjs: prompts.PromptObject<
    'name' | 'template' | 'githubUsername'
  >[] = [];

  if (options.name === undefined) {
    promptsObjs.push({
      message:
        'Package name in package.json, will used to generate README.md file as well,e.g. `my-package`:',
      type: 'text',
      name: 'name',
      initial: 'my-package',
      validate: async (name: string): Promise<string | boolean> => {
        const reg = /^\w[0-9a-zA-Z-]*\w$/;
        if (!reg.test(name)) {
          return 'Invalid format for package name. Package name can only contain letters, numbers, and "-", and start with letters';
        }
        const exist = await fs.exists(name);
        if (exist) {
          return 'Directory already exists, please use another package name or remove the existing directory';
        }
        return true;
      },
    });
  }

  if (options.template === undefined || !REG_TEMPLATE.test(options.template)) {
    promptsObjs.push({
      message: 'Template used to create the package:',
      type: 'select',
      name: 'template',
      initial: 0,
      choices: TEMPLATES.map(v => ({ title: v, value: v })),
    });
  }

  if (options.githubUsername === undefined) {
    promptsObjs.push({
      message:
        'Github user name which is used to automatically generate information for package.json, README.md',
      type: 'text',
      name: 'githubUsername',
      initial: 'hsuehic',
    });
  }

  const r = await prompts(promptsObjs);

  return { ...options, ...r };
}

const getOwnerRepoFromTemplate = (
  template: string
): { owner: string; repo: string } => {
  const match = REG_TEMPLATE.exec(template);
  if (null === match) {
    throw 'Template name format invalid, valid format is <owner/repo>, e.g. hsuehic/cnp-template-typescript';
  }
  return {
    owner: match[1],
    repo: match[2],
  };
};

const updatePackageJson = async (
  githubUsername: string,
  packageName: string
) => {
  await setPackageJsonField('name', packageName);
  // set author with the information from git config
  const gitUserInfo = await getUserInfo();
  await setPackageJsonFields([
    { key: 'author.name', value: gitUserInfo.name },
    { key: 'author.email', value: gitUserInfo.email },
    { key: 'author.url', value: gitUserInfo.url },
  ]);

  await setPackageJsonFields([
    {
      key: 'respository.type',
      value: 'git',
    },
    {
      key: 'repository.url',
      value: `git+https://github.com/${githubUsername}/${packageName}.git`,
    },
    {
      key: 'homepage',
      value: `https://github.com/${githubUsername}/${packageName}#readme`,
    },
    {
      key: 'bugs.url',
      value: `https://github.com/${githubUsername}/${packageName}/issues`,
    },
  ]);
};

async function init() {
  initProgram();
  const { name, template, githubUsername } = await inquire();

  const { owner, repo } = getOwnerRepoFromTemplate(template);
  await downloadArchiveToDirectory(owner, repo, name);
  cd(name);
  await updatePackageJson(githubUsername, name);
  updateReadme(githubUsername, name);
  console.log(
    chalk.bold(
      chalk.green(`
Created package successfully, now you can open the directory and install dependencies and happy hacking:
${chalk.red(`cd ./${name}
pnpm install`)}`)
    )
  );
}

await init();
