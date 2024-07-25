export namespace models {
	
	export class Image {
	    title: string;
	    image: string;
	
	    static createFrom(source: any = {}) {
	        return new Image(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.title = source["title"];
	        this.image = source["image"];
	    }
	}
	export class ReadingChapter {
	    id: string;
	    name: string;
	
	    static createFrom(source: any = {}) {
	        return new ReadingChapter(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	    }
	}
	export class Assets {
	    title: string;
	    currentChapter: string;
	    chapterListIds: ReadingChapter[];
	    images: Image[];
	
	    static createFrom(source: any = {}) {
	        return new Assets(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.title = source["title"];
	        this.currentChapter = source["currentChapter"];
	        this.chapterListIds = this.convertValues(source["chapterListIds"], ReadingChapter);
	        this.images = this.convertValues(source["images"], Image);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	
	export class LocalManga {
	    id: string;
	    title: string;
	    lastChapter: number;
	    totalChapter: number;
	    lastChapterID: string;
	    image: string;
	
	    static createFrom(source: any = {}) {
	        return new LocalManga(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.title = source["title"];
	        this.lastChapter = source["lastChapter"];
	        this.totalChapter = source["totalChapter"];
	        this.lastChapterID = source["lastChapterID"];
	        this.image = source["image"];
	    }
	}
	export class LastMangaResponse {
	    exists: boolean;
	    lastManga?: LocalManga;
	
	    static createFrom(source: any = {}) {
	        return new LastMangaResponse(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.exists = source["exists"];
	        this.lastManga = this.convertValues(source["lastManga"], LocalManga);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	
	export class ServiceChapter {
	    id: string;
	    path: string;
	    name: string;
	    view: string;
	    createdAt: string;
	
	    static createFrom(source: any = {}) {
	        return new ServiceChapter(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.path = source["path"];
	        this.name = source["name"];
	        this.view = source["view"];
	        this.createdAt = source["createdAt"];
	    }
	}
	export class MetaData {
	    imageUrl: string;
	    name: string;
	    author: string;
	    status: string;
	    updated: string;
	    view: string;
	    genres: string[];
	    chapterList: ServiceChapter[];
	
	    static createFrom(source: any = {}) {
	        return new MetaData(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.imageUrl = source["imageUrl"];
	        this.name = source["name"];
	        this.author = source["author"];
	        this.status = source["status"];
	        this.updated = source["updated"];
	        this.view = source["view"];
	        this.genres = source["genres"];
	        this.chapterList = this.convertValues(source["chapterList"], ServiceChapter);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class ProgressResponse {
	    mangas: LocalManga[];
	    count: number;
	
	    static createFrom(source: any = {}) {
	        return new ProgressResponse(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.mangas = this.convertValues(source["mangas"], LocalManga);
	        this.count = source["count"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	
	export class SearchResult {
	    id: string;
	    image: string;
	    title: string;
	
	    static createFrom(source: any = {}) {
	        return new SearchResult(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.image = source["image"];
	        this.title = source["title"];
	    }
	}
	export class SearchResponse {
	    mangaList: SearchResult[];
	    count: number;
	
	    static createFrom(source: any = {}) {
	        return new SearchResponse(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.mangaList = this.convertValues(source["mangaList"], SearchResult);
	        this.count = source["count"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	

}

