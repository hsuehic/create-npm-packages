#!/usr/bin/env node
/* eslint-disable cnp/no-console */

import { Option, program } from 'commander';
import prompts from 'prompts';
import { $, cd, fs } from 'zx';

import { REG_TEMPLATE, TEMPLATES } from './constant.js';
import { downloadArchiveToDirectory, getUserInfo } from './util/git.js';
import { setPackageJsonField, setPackageJsonFields } from './util/npm.js';

/**
 * Init Cli Program
 */
function initProgram() {
  program
    .description('Create a npm package using pre-defined templates')
    .argument('[name]', 'Package name')
    .addOption(
      new Option(
        '-t, --template <template>',
        'Select template used to create the package, format: owner/template-repo, e.g. hsuehic/cnp-template-javascript, default: hsuehic/cnp-template-typescript'
      )
    )
    .addOption(
      new Option(
        '--github-username <owner>',
        'Set update github user name which is used to automatically generate information for package.json, if not set, will leave it as default'
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
}> {
  const promptsObjs: prompts.PromptObject<'name' | 'template'>[] = [];

  promptsObjs.push({
    message: 'Please input package name,e.g. `my-package`:',
    type: 'text',
    name: 'name',
    validate: async (name: string): Promise<string | boolean> => {
      const exist = await fs.exists(name);
      if (exist) {
        return 'Directory already exists, please use another package name or remove the existing directory';
      }
      return true;
    },
  });

  const options = program.opts<{
    template: string;
    githubUsername: string;
  }>();

  if (options.template === undefined || REG_TEMPLATE.test(options.template)) {
    promptsObjs.push({
      message: 'Please select the template to use:',
      type: 'select',
      name: 'template',
      choices: TEMPLATES.map(v => ({ title: v, value: v })),
    });
  }

  const r = await prompts(promptsObjs);

  return r;
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

const updatePackageJson = async (packageName: string) => {
  await setPackageJsonField('name', packageName);
  // set author with the information from git config
  const gitUserInfo = await getUserInfo();
  await setPackageJsonFields([
    { key: 'author.name', value: gitUserInfo.name },
    { key: 'author.email', value: gitUserInfo.email },
    { key: 'author.url', value: gitUserInfo.url },
  ]);

  // set repository, bugs, homepage if githubUsername is provided
  const { githubUsername } = program.opts<{
    githubUsername?: string;
  }>();
  if (githubUsername) {
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
        value: `https://github.com/${githubUsername}/${packageName}#readme`,
      },
    ]);
  }
};

const updateReadme = async (packageName: string) => {
  await $`echo update ${packageName}/README.md`;
};

async function init() {
  initProgram();
  const opts = await inquire();
  const packageName = opts.name || program.args[0];
  const { template } = opts;
  const { owner, repo } = getOwnerRepoFromTemplate(template);
  await downloadArchiveToDirectory(owner, repo, packageName);
  cd(packageName);
  await updatePackageJson(packageName);
  await updateReadme(packageName);
}

await init();
