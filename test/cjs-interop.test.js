import { test, expect } from 'bun:test'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)

test('CJS: plain require returns the function directly', () => {
  const fn = require('../dist/index.cjs')
  expect(typeof fn).toBe('function')
})

test('CJS: .default is also the function (bundler interop)', () => {
  const fn = require('../dist/index.cjs')
  expect(typeof fn.default).toBe('function')
  expect(fn.default).toBe(fn)
})
