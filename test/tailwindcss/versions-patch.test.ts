import { internalPatch } from '@/tailwindcss/patcher'
import { tailwindcssCasePath } from '#test/util'
import { getOptions } from '@/defaults'
import path from 'path'
import type { ILengthUnitsPatchOptions } from '@/types'

const versionsPkgDir = path.resolve(tailwindcssCasePath, 'versions/package.json')

function getTailwindcssVersion(str: string) {
  // eslint-disable-next-line no-useless-escape
  const match = /^tailwindcss([\d\.]*)$/.exec(str)
  if (match === null) {
    // 不是 tailwindcss
    return false
  } else if (match[1] === '') {
    return 'lts'
  } else {
    return match[1]
  }
}

const pkg = require(versionsPkgDir)
const versions = Object.keys(pkg.dependencies)

describe('versions-patch', () => {
  it.each(versions)('patch %s', (version) => {
    const v = getTailwindcssVersion(version)
    const options = getOptions()
    const opt = options.supportCustomLengthUnitsPatch as Required<ILengthUnitsPatchOptions>
    opt.dangerousOptions.overwrite = false
    const res = internalPatch(path.resolve(tailwindcssCasePath, `versions/${v}/package.json`), opt, false)
    expect(res).toMatchSnapshot()
  })
})
