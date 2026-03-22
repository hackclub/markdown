#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'fs'

const path = new URL('../dist/index.cjs', import.meta.url).pathname
const src = readFileSync(path, 'utf8')
const patch = `\nconst _fn = module.exports.default;\nmodule.exports = _fn;\nmodule.exports.default = _fn;\n`
writeFileSync(path, src + patch)
