/// <reference types="react" />
import { SitecopyClient } from "./types";
export declare const SiteCopyContext: import("react").Context<SitecopyClient | undefined>;
export declare const SiteCopyProvider: (props: React.PropsWithChildren<{
    url: string;
    siteID?: string;
    defaultLang?: string | null;
}>) => import("react/jsx-runtime").JSX.Element;
