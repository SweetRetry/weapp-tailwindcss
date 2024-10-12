import process from 'node:process'
import semver from 'semver'
import { WEAPP_TW_REQUIRED_NODE_VERSION } from './constants'
import { init } from './init'
import { logger } from './logger'
import { getOptions } from './options'

process.title = 'node (weapp-tailwindcss)'
const args = process.argv.slice(2)

if (semver.lt(process.versions.node, WEAPP_TW_REQUIRED_NODE_VERSION)) {
  logger.error(
    `You are using Node.js ${process.versions.node}. For weapp-tailwindcss, Node.js version >= v${WEAPP_TW_REQUIRED_NODE_VERSION} is required.`,
  )

  process.exit(1)
}
const command = args[0]
if (command === 'patch') {
  const options = getOptions()
  options.patch()
}
else if (command === 'init') {
  init()
}
// 从 weapp-tailwindcss@3.6.0 版本开始移除，原先老的都迁移到 weapp-vite
// https://vite.icebreaker.top/
// else {
//   try {
//     // @ts-ignore
//     import('@weapp-tailwindcss/cli').then(({ createCli }) => {
//       createCli().parse()
//     })
//   }
//   catch (error) {
//     console.warn('请先安装 `@weapp-tailwindcss/cli` , 安装完成后再尝试运行！')
//     throw error
//   }
// }
