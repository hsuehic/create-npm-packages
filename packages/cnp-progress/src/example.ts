'use strict';

import { Progress } from './progress';

const items = 10;
const interval = 100;

function withDefaultSettings() {
  const progress = Progress.create({ total: items });
  run(progress, withDone);
}

function withPattern() {
  const progress = Progress.create({
    total: items,
    pattern:
      'Progress: {bar} | Elapsed: {elapsed} | Remaining: {remaining} | {percent} | {current}/{total}',
  });
  run(progress, withPatternAndColors);
}

function withDone() {
  const progress = Progress.create({ total: items });
  progress.done();
  console.log();
  withUpdate();
}

function withUpdate() {
  const progress = Progress.create({ total: items });
  let count = 0;
  const iv = setInterval(() => {
    count++;
    progress.update();
    if (count == items * 2) {
      clearInterval(iv);
      console.log();
      withPattern();
    }
  }, interval);
}

function withPatternAndColors() {
  const progress = Progress.create({
    total: items,
    pattern:
      'Progress: {bar.white.cyan.25} | Elapsed: {elapsed.green} | Remaining: {remaining.blue} | {percent.magenta} | {current.red}/{total.yellow}',
  });
  run(progress, withTilte);
}

function withTilte() {
  const progress = Progress.create({
    total: items,
    pattern:
      'Progress: {bar.white.cyan.25} | Elapsed: {elapsed.green} | Remaining: {remaining.blue} | {percent.magenta} | {current.red}/{total.yellow}',
    title: 'Doing some work',
  });
  run(progress, withMessage);
}

function withMessage() {
  const total = 20;
  const process = Progress.create({
    total,
    pattern:
      'Progress: {bar.white.cyan.25} | Elapsed: {elapsed.green} | Remaining: {remaining.blue} | {percent.magenta} | {current.red}/{total.yellow} | {message.green}',
  });
  let current = 0;
  const timer = setInterval(() => {
    current += Math.floor((Math.random() * total) / 3);
    current = current >= total ? total : current;
    process.update(current, `Finished ${current}`);

    if (current >= total) {
      clearInterval(timer);
    }
  }, 100);
}
function run(progress: Progress, continueWith?: () => void) {
  let count = 0;
  const iv = setInterval(() => {
    count++;
    progress.update();
    if (count >= items) {
      clearInterval(iv);
      console.log();
      if (continueWith) continueWith();
    }
  }, interval);
}
withDefaultSettings();
