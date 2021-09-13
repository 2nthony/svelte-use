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
  {
    name: 'store',
    display: 'Store',
    description: 'Enhancement for svelte/store',
  }
]

export const activePackages = packages.filter((i) => !i.deprecated)
