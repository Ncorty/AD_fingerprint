export interface Brand {
    brand: string;
    version: string;
}

export interface UAHighEntropyValues{
    platform: string;
    platformVersion: string;
    architecture: string;
    model: string;
    uaFullVersion: string;
    bitness: string;
    fullVersionList: Brand[];
}

export interface NavigatorUAData {
    brands: Brand[];
    mobile: boolean;
    platform: string;
    getHighEntropyValues(hints: string[]): Promise<UAHighEntropyValues>;
}

export function UserAgentDataTypeGuard(nav: Navigator): nav is Navigator & { userAgentData: NavigatorUAData } {
    return 'userAgentData' in nav && nav.userAgentData !== undefined;
}