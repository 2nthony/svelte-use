export interface ConfigurableWindow {
    window?: Window;
}
export interface ConfigurableDocument {
    document?: Document;
}
export interface ConfigurableNavigator {
    navigator?: Navigator;
}
export interface ConfigurableLocation {
    location?: Location;
}
export declare const defaultWindow: (Window & typeof globalThis) | undefined;
export declare const defaultDocument: Document | undefined;
export declare const defaultNavigator: Navigator | undefined;
export declare const defaultLocation: Location | undefined;
