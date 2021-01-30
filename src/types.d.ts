export interface IDownloadItem {
    name: string;
    links: string[];
}

export interface IModItem {
    title: string;
    name?: string;
    link: string;
    downloads?: IDownloadItem[];
    dependencies?: IModItem[];
}

export interface IStorage {
    mods: IModItem[];
}