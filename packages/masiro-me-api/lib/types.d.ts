import { ICachedJSONRow } from '@demonovel/cached-data-types';
import { ICachedJSONRowPlus } from '@demonovel/cached-data-types/index';
import { ITSResolvable } from 'ts-type/lib/generic';
import { ITSPartialPick } from 'ts-type/lib/type/record';
export interface IMasiroMeBookMini extends Omit<ICachedJSONRow, 'siteID' | 'novelID' | 'uuid' | 'updated' | 'content'> {
    translator?: string[];
}
export interface IMasiroMeBook extends IMasiroMeBookMini, Pick<ICachedJSONRow, 'updated' | 'content'>, ITSPartialPick<ICachedJSONRowPlus, 'status'> {
    status_text?: string;
}
export interface IMasiroMeChaptersParent {
    volume_name: string;
    volume_order: number;
    chapters: IMasiroMeChaptersChild[];
}
export interface IMasiroMeChaptersChild {
    chapter_id: string;
    chapter_name: string;
    chapter_order: number;
    chapter_updated: number;
}
export interface IMasiroMeBookWithChapters extends IMasiroMeBook {
    chapters: IMasiroMeChaptersParent[];
}
export interface IMasiroMeChapter {
    chapter_id: string;
    imgs: string[];
    text: string;
    html?: string;
    chapter_name?: string;
    author?: string;
    dateline?: number;
    extra_info?: any;
}
export interface IRawMasiroMeLoadMoreNovels {
    code: number | 1;
    html: string;
    page: string;
    pages: number;
    total: number;
}
interface IMasiroMeRecentUpdateBase {
    pages: number;
    total: number;
    list: IMasiroMeBookMini[];
    extra: IMasiroMeRecentUpdateOptions;
}
export interface IMasiroMeRecentUpdate extends IMasiroMeRecentUpdateBase {
    page: number;
}
export interface IMasiroMeRecentUpdateAll extends IMasiroMeRecentUpdateBase {
    start: number;
    end: number;
}
export interface IMasiroMeRecentUpdateOptions {
    order?: number | 1 | 2;
    tag?: string;
    status?: 0 | 1;
}
export interface IMasiroMeRecentUpdateAllOptions {
    start?: number;
    end?: number;
    filter?(curPageData: IMasiroMeRecentUpdate, allDataList: IMasiroMeBookMini[]): ITSResolvable<boolean>;
}
export {};
