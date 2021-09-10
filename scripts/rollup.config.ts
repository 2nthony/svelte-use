import { resolve } from 'path'
import typescript from 'rollup-plugin-typescript2'
import dts from 'rollup-plugin-dts'
import { OutputOptions, RollupOptions } from 'rollup'
import fg from 'fast-glob'
import { activePackages } from '../meta/packages'

const configs: RollupOptions[] = []

for (const { name, external, submodules } of activePackages) {
  const functionNames = ['index']

  if (submodules)
    functionNames.push(...fg.sync('*/index.ts', { cwd: resolve(`packages/${name}`) }).map(i => i.split('/')[0]))

  for (const fn of functionNames) {
    const input = fn === 'index' ? `packages/${name}/index.ts` : `packages/${name}/${fn}/index.ts`

    const output: OutputOptions[] = [
      {
        file: `packages/${name}/dist/${fn}.cjs`,
        format: 'cjs',
      },
      {
        file: `packages/${name}/dist/${fn}.mjs`,
        format: 'es',
      },
    ]

    configs.push({
      input,
      output,
      plugins: [
        typescript({
          tsconfigOverride: {
            compilerOptions: {
              declaration: false,
            },
          },
        }),
      ],
      external: [
        '@svelte-use/shared',
        ...(external || []),
      ],
    })

    configs.push({
      input,
      output: {
        file: `packages/${name}/dist/${fn}.d.ts`,
        format: 'es',
      },
      plugins: [
        dts(),
      ],
      external: [
        '@svelte-use/shared',
        ...(external || []),
      ],
    })
  }
}

export default configs
