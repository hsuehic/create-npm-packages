import { Linter } from 'eslint';

const config = require<Linter.Config>('./node');

export = config;
