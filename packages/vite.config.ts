import { UserConfig, Plugin } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { resolve, join } from 'path'
import sveltePreprocess from 'svelte-preprocess'
import fs from 'fs-extra'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import WindiCSS from 'vite-plugin-windicss'
import { functionNames, getFunction } from '../meta/function-indexes'
import { getFunctionFooter, replacer } from '../scripts/utils'

// https://vitejs.dev/config/
const config: UserConfig = {
  resolve: {
    alias: {
      '@svelte-use/core': resolve(__dirname, 'core/index.ts'),
      '@svelte-use/shared': resolve(__dirname, 'shared/index.ts'),
    },
  },
  plugins: [
    svelte({
      preprocess: sveltePreprocess(),
    }),
    Icons({
      compiler: 'vue3',
    }),
    MarkdownTransform(),
    Components({
      dirs: ['.vitepress/theme/components'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        IconsResolver({
          componentPrefix: '',
        }),
      ],
      transformer: 'vue3',
    }),
    WindiCSS({
      preflight: false,
    }),
  ],
}

function MarkdownTransform(): Plugin {
  const DIR_TYPES = resolve(__dirname, '../types/packages')
  const DIR_SRC = resolve(__dirname, '../packages')

  const hasTypes = fs.existsSync(DIR_TYPES)

  if (!hasTypes)
    console.warn('No types dist found, run `npm run build:types` first.')

  return {
    name: 'vueuse-md-transform',
    enforce: 'pre',
    async transform(code, id) {
      if (!id.endsWith('.md')) return null

      // linkify function names
      code = code.replace(
        new RegExp(`\`({${functionNames.join('|')}})\`(.)`, 'g'),
        (_, name, ending) => {
          if (ending === ']')
            // already a link
            return _
          const fn = getFunction(name)!
          return `[\`${fn.name}\`](${fn.docs})`
        },
      )
      // convert links to relative
      code = code.replace(/https?:\/\/vueuse\.org\//g, '/')

      const [pkg, name, i] = id.split('/').slice(-3)

      if (functionNames.includes(name) && i === 'index.md') {
        const hasDemo = fs.existsSync(join(DIR_SRC, pkg, name, 'demo.svelte'))

        if (hasTypes)
          code = replacer(
            code,
            await getFunctionFooter(pkg, name),
            'FOOTER',
            'tail',
          )

        const frontmatterEnds = code.indexOf('---\n\n') + 4
        let header = ''
        if (hasDemo) {
          header =
            '\n<script setup>\nimport Demo from \'./demo.svelte\'\n</script>\n<DemoContainer :svelteComponent="Demo"></DemoContainer>\n\n'
        }

        if (header)
          code =
            code.slice(0, frontmatterEnds) +
            header +
            code.slice(frontmatterEnds)
      }

      return code
    },
  }
}

export default config
