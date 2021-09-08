import { PackageIndexes } from './types';
declare const indexes: PackageIndexes;
export default indexes;
export declare const functions: import("./types").VueUseFunction[];
export declare const functionNames: string[];
export declare const getFunction: (name: string) => import("./types").VueUseFunction | undefined;
export declare const categories: string[];
export declare const packages: Record<string, import("./types").VueUsePackage>;
