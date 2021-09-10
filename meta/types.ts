export interface PackageManifest {
  name: string
  display: string
  addon?: boolean
  author?: string
  description?: string
  external?: string[]
  manualImport?: boolean
  deprecated?: boolean
  submodules?: boolean
}

export interface SvelteUseFunction {
  name: string
  package: string
  category?: string
  description?: string
  docs?: string
  depreacted?: boolean
  internal?: boolean
  component?: boolean
  directive?: boolean
}

export interface SvelteUsePackage extends PackageManifest {
  dir: string
  docs?: string
}

export interface PackageIndexes {
  packages: Record<string, SvelteUsePackage>
  categories: string[]
  functions: SvelteUseFunction[]
}
