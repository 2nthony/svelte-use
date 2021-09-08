import { PackageManifest } from './types'

export const packages: PackageManifest[] = [
  {
    name: 'shared',
    display: 'Shared utilities',
  },
  {
    name: 'core',
    display: 'SvelteUse',
    description: 'Collection of essential Svelte Utilities',
  },
]

export const activePackages = packages.filter((i) => !i.deprecated)
