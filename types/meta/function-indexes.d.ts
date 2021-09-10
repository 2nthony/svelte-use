import { PackageIndexes } from './types';
declare const indexes: PackageIndexes;
export default indexes;
export declare const functions: import("./types").SvelteUseFunction[];
export declare const functionNames: string[];
export declare const getFunction: (name: string) => import("./types").SvelteUseFunction | undefined;
export declare const categories: string[];
export declare const packages: Record<string, import("./types").SvelteUsePackage>;
