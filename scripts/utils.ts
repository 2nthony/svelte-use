import { resolve, join, relative } from 'path'
import fs from 'fs-extra'
import matter from 'gray-matter'
import fg from 'fast-glob'
import parser from 'prettier/parser-typescript'
import prettier from 'prettier'
import YAML from 'js-yaml'
import { activePackages, packages } from '../meta/packages'
import { PackageIndexes, SvelteUseFunction, SvelteUsePackage } from '../meta/types'

const DOCS_URL = 'https://svelte-use.vercel.app'
const GITHUB_BLOB_URL =
  'https://github.com/evillt/svelte-use/blob/main/packages'

const DIR_ROOT = resolve(__dirname, '..')
const DIR_SRC = resolve(__dirname, '../packages')
const DIR_TYPES = resolve(__dirname, '../types/packages')

export async function getTypeDefinition(
  pkg: string,
  name: string,
): Promise<string | undefined> {
  const typingFilepath = join(DIR_TYPES, `${pkg}/${name}/index.d.ts`)

  if (!fs.existsSync(typingFilepath)) return

  let types = await fs.readFile(typingFilepath, 'utf-8')

  if (!types) return

  // clean up types
  types = types
    .replace(/import\(.*?\)\./g, '')
    .replace(/import[\s\S]+?from ?["'][\s\S]+?["']/g, '')

  return prettier
    .format(types, {
      semi: false,
      parser: 'typescript',
      plugins: [parser],
    })
    .trim()
}

export function hasDemo(pkg: string, name: string) {
  return fs.existsSync(join(DIR_SRC, pkg, name, 'demo.svelte'))
}

export async function getFunctionFooter(pkg: string, name: string) {
  const URL = `${GITHUB_BLOB_URL}/${pkg}/${name}`

  const hasDemo = fs.existsSync(join(DIR_SRC, pkg, name, 'demo.svelte'))

  const types = await getTypeDefinition(pkg, name)

  const typingSection =
    types && `## Type Declarations\n\n\`\`\`typescript\n${types.trim()}\n\`\`\``

  const links = [
    ['Source', `${URL}/index.ts`],
    hasDemo ? ['Demo', `${URL}/demo.svelte`] : undefined,
    ['Docs', `${URL}/index.md`],
  ]
    .filter((i) => i)
    .map((i) => `[${i![0]}](${i![1]})`)
    .join(' • ')

  const sourceSection = `## Source\n\n${links}\n`

  return `${typingSection || ''}\n\n${sourceSection}\n`
}

export async function listFunctions(dir: string, ignore: string[] = []) {
  const files = await fg('*', {
    onlyDirectories: true,
    cwd: dir,
    ignore: ['_*', 'dist', 'node_modules', ...ignore],
  })
  files.sort()
  return files
}

export async function readIndexes() {
  const indexes: PackageIndexes = {
    packages: {},
    categories: [],
    functions: [],
  }

  for (const info of packages) {
    const dir = join(DIR_SRC, info.name)

    const functions = await listFunctions(dir)

    const pkg: SvelteUsePackage = {
      ...info,
      dir: relative(DIR_ROOT, dir),
      docs: info.addon ? `${DOCS_URL}/${info.name}/README.html` : undefined,
    }

    indexes.packages[info.name] = pkg

    for (const fnName of functions) {
      const mdPath = join(dir, fnName, 'index.md')

      const fn: SvelteUseFunction = {
        name: fnName,
        package: pkg.name,
      }

      if (fs.existsSync(join(dir, fnName, 'component.ts'))) fn.component = true
      if (fs.existsSync(join(dir, fnName, 'directive.ts'))) fn.directive = true

      if (!fs.existsSync(mdPath)) {
        fn.internal = true
        indexes.functions.push(fn)
        continue
      }

      fn.docs = `${DOCS_URL}/${pkg.name}/${fnName}/`

      const mdRaw = await fs.readFile(join(dir, fnName, 'index.md'), 'utf-8')

      const { content: md, data: frontmatter } = matter(mdRaw)
      const category = frontmatter.category

      let description =
        (md
          .replace(/\r\n/g, '\n')
          .match(/# \w+[\s\n]+(.+?)(?:, |\. |\n|\.\n)/m) || [])[1] || ''

      description = description.trim()
      description = description.charAt(0).toLowerCase() + description.slice(1)

      fn.category = ['core', 'shared'].includes(pkg.name)
        ? category
        : `@${pkg.display}`
      fn.description = description

      if (description.includes('DEPRECATED')) fn.depreacted = true

      indexes.functions.push(fn)
    }
  }

  indexes.categories = getCategories(indexes.functions)

  return indexes
}

export function getCategories(functions: SvelteUseFunction[]): string[] {
  return uniq(
    functions
      .filter((i) => !i.internal)
      .map((i) => i.category)
      .filter(Boolean),
  ).sort()
}

export async function updateImport({ packages, functions }: PackageIndexes) {
  for (const { name, dir, manualImport } of Object.values(packages)) {
    if (manualImport) continue

    let content: string
    if (name === 'components') {
      content = functions
        .sort((a, b) => a.name.localeCompare(b.name))
        .flatMap((fn) => {
          const arr = []
          if (fn.component)
            arr.push(`export * from '../${fn.package}/${fn.name}/component'`)
          if (fn.directive)
            arr.push(`export * from '../${fn.package}/${fn.name}/directive'`)
          return arr
        })
        .join('\n')
    } else {
      content = functions
        .filter((i) => i.package === name)
        .map((f) => f.name)
        .sort()
        .map((name) => `export * from './${name}'`)
        .join('\n')
    }

    if (name === 'core') content += "\nexport * from '@svelte-use/shared'"

    content += '\n'

    await fs.writeFile(join(dir, 'index.ts'), content)
  }
}

export function uniq<T extends any[]>(a: T) {
  return Array.from(new Set(a))
}

export function stringifyFunctions(
  functions: SvelteUseFunction[],
  options?: { title?: boolean; description?: boolean, list?: boolean },
) {
  let list = ''
  options = {
    title: true,
    description: true,
    ...options,
  }

  const categories = getCategories(functions)

  for (const category of categories) {
    if (category.startsWith('_')) continue

    if (options.title) list += `### ${category}\n`
    if (options.list) list += `- ${category}\n`

    const categoryFunctions = functions
      .filter((i) => i.category === category)
      .sort((a, b) => a.name.localeCompare(b.name))

    for (const { name, docs, description, depreacted } of categoryFunctions) {
      if (depreacted) continue

      const desc = description && options.description ? ` — ${description}` : ''
      const label = options.list ? name : `\`${name}\``
      list += `  - [${label}](${docs})${desc}\n`
    }
    list += '\n'
  }
  return list
}

export function replacer(
  code: string,
  value: string,
  key: string,
  insert: 'head' | 'tail' | 'none' = 'none',
) {
  const START = `<!--${key}_STARTS-->`
  const END = `<!--${key}_ENDS-->`
  const regex = new RegExp(`${START}[\\s\\S]*?${END}`, 'im')

  const target = value ? `${START}\n${value}\n${END}` : `${START}${END}`

  if (!code.match(regex)) {
    if (insert === 'none') return code
    else if (insert === 'head') return `${target}\n\n${code}`
    else return `${code}\n\n${target}`
  }

  return code.replace(regex, target)
}

export async function updatePackageREADME({
  packages,
  functions,
}: PackageIndexes) {
  for (const { name, dir } of Object.values(packages)) {
    const readmePath = join(dir, 'README.md')

    if (!fs.existsSync(readmePath)) continue

    const functionMD = stringifyFunctions(
      functions.filter((i) => i.package === name),
      { title: false },
    )
    let readme = await fs.readFile(readmePath, 'utf-8')
    readme = replacer(readme, functionMD, 'FUNCTIONS_LIST')

    await fs.writeFile(readmePath, `${readme.trim()}\n`, 'utf-8')
  }
}

export async function updateIndexREADME({
  packages,
  functions,
}: PackageIndexes) {
  let readme = await fs.readFile('README.md', 'utf-8')

  const functionsCount = functions.filter((i) => !i.internal).length

  readme = readme.replace(
    /img\.shields\.io\/badge\/-(.+?)%20functions/,
    `img.shields.io/badge/-${functionsCount}%20functions`,
  )

  await fs.writeFile('README.md', `${readme.trim()}\n`, 'utf-8')
}

export async function updateSidebarMD({ functions }: PackageIndexes) {
  let mdSidebar = await fs.readFile('packages/_sidebar.md', 'utf-8')

  const coreFunctions = functions.filter((i) =>
    ['core', 'shared'].includes(i.package),
  )
  const functionListMD = stringifyFunctions(coreFunctions, {
    title: false,
    list: true,
    description: false,
  })

  mdSidebar = replacer(mdSidebar, functionListMD, 'FUNCTIONS_LIST')
  await fs.writeFile('packages/_sidebar.md', mdSidebar, 'utf-8')
}

export async function updateFunctionsMD({
  packages,
  functions,
}: PackageIndexes) {
  let mdFn = await fs.readFile('packages/functions.md', 'utf-8')

  const coreFunctions = functions.filter((i) =>
    ['core', 'shared'].includes(i.package),
  )
  const functionListMD = stringifyFunctions(coreFunctions)

  mdFn = replacer(mdFn, functionListMD, 'FUNCTIONS_LIST')
  await fs.writeFile('packages/functions.md', mdFn, 'utf-8')
}

export async function updateFunctionREADME(indexes: PackageIndexes) {
  const hasTypes = fs.existsSync(DIR_TYPES)

  if (!hasTypes)
    console.warn('No types dist found, run `npm run build:types` first.')

  for (const fn of indexes.functions) {
    const mdPath = `packages/${fn.package}/${fn.name}/index.md`
    if (!fs.existsSync(mdPath)) continue

    let readme = await fs.readFile(mdPath, 'utf-8')

    const { content, data = {} } = matter(readme)

    data.category = fn.category || 'Unknown'

    readme = `---\n${YAML.dump(data)}---\n\n${content.trim()}`

    await fs.writeFile(mdPath, `${readme.trim()}\n`, 'utf-8')
  }
}

export async function updatePackageJSON(indexes: PackageIndexes) {
  const { version } = await fs.readJSON('package.json')

  for (const {
    name,
    description,
    author,
    submodules,
  } of activePackages) {
    const packageDir = join(DIR_SRC, name)
    const packageJSONPath = join(packageDir, 'package.json')
    const packageJSON = await fs.readJSON(packageJSONPath)

    packageJSON.version = version
    packageJSON.description = description || packageJSON.description
    packageJSON.author = author || '2nthony <https://github.com/evillt>'
    packageJSON.bugs = {
      url: 'https://github.com/evillt/svelte-use/issues',
    }
    packageJSON.homepage =
      name === 'core'
        ? 'https://github.com/evillt/svelte-use#readme'
        : `https://github.com/evillt/svelte-use/tree/main/packages/${name}#readme`
    packageJSON.main = './index.cjs'
    packageJSON.types = './index.d.ts'
    packageJSON.module = './index.mjs'
    packageJSON.exports = {
      '.': {
        import: './index.mjs',
        require: './index.cjs',
      },
      './*': './*',
    }

    if (submodules) {
      indexes.functions
        .filter((i) => i.package === name)
        .forEach((i) => {
          packageJSON.exports[`./${i.name}`] = {
            import: `./${i.name}.mjs`,
            require: `./${i.name}.cjs`,
          }
        })
    }

    for (const key of Object.keys(packageJSON.dependencies || {})) {
      if (key.startsWith('@svelte-use/'))
        packageJSON.dependencies[key] = version
    }

    await fs.writeJSON(packageJSONPath, packageJSON, { spaces: 2 })
  }
}
