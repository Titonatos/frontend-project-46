#!/usr/bin/env node
import { program } from 'commander';
import getData from '../src/parse.js';

program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.');

program
  .option('-f, --format <type>', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    // console.log(JSON.parse(readFile(filepath1)));
    // console.log(JSON.parse(readFile(filepath2)));
    console.log(getData('host', filepath1));
  });

program.parse(process.argv);
