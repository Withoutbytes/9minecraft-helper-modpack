import axios from "axios";
import { IModItem } from "../../types";

export const LoadIframe = async (url: string): Promise<JQuery<HTMLElement>> => {
    return new Promise(async (res, rej) => {
        const rawHtml = await axios.get(url);

        const iframe = $("<iframe src='about:blank'/>");
        iframe.on("load", () => {
            console.log('loadedd');
            (iframe.contents().get(0) as HTMLDocument).write(rawHtml.data);
            res(iframe);
        });
        $("body").append(iframe);
    });
}

export const GetDocumentInfo = (doc: JQuery<Document>): IModItem => {
    const name = doc.find("#content > article > div.postTitle_content > h1")?.text();
    const dependencies = doc.find('h3:contains("Requires:") + blockquote')
        .children().toArray().map(m => {
            const firstChild = m.firstElementChild;
            if (!firstChild) throw "Child not found";
            const title = firstChild.getAttribute("title");
            if (!title) throw "Title not found";
            const link = firstChild.getAttribute("href");
            if (!link) throw "Link not found";
            return {
                name: m.innerText,
                title,
                link
            };
        });

    const downloads = doc.find("h2:contains('Download Links:')").nextAll("p").toArray().map(el => ({
        name: $(el).text(),
        links: $(el).next().children().last().children().toArray().map((ell) => (ell as HTMLAnchorElement).href)
    }));

    return {
        name,
        title: doc.get(0).title,
        dependencies,
        downloads,
        link: doc.get(0).location.href
    }
}

export const ModInfoProcessDependencies = (modInfo: IModItem) => {
    if (!modInfo.dependencies) throw "Not found dependencies";
    return Promise.all(modInfo.dependencies.map(async d => {
        if (!d.dependencies || !d.downloads) {
            let f = await LoadIframe(d.link);
            let depDocInfo = GetDocumentInfo(f.contents().last() as JQuery<Document>);
            depDocInfo.dependencies = await ModInfoProcessDependencies(depDocInfo);
            depDocInfo.link = d.link;
            return depDocInfo;
        }
        return d;
    }));
}