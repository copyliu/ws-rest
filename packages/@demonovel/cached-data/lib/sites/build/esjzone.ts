/**
 * Created by user on 2020/3/3.
 */

import { ISitesSourceType, ICachedJSONRowInput } from '../types';
import { newTitle, newEntry } from './util';
import { createMomentBySeconds } from '../../util/moment';
import { EnumSiteID } from '@demonovel/cached-data-types';

export function buildEsjzone<K extends EnumSiteID.esjzone>(siteID: K, id: string, data: ISitesSourceType[K])
{
	let item: ICachedJSONRowInput = {} as any;

	item.id = id;
	item.novelID = id;

	item.title = data.name;

	if (data.titles?.length)
	{
		item.titles = [item.title].concat(data.titles)
	}

	item.authors = [data.authors];

	item.chapters_num = data.chapters && data.chapters.reduce((i, v) =>
	{

		i += v.chapters.length;

		return i
	}, 0);

	item.content = data.desc;
	item.updated = data.last_update_time && createMomentBySeconds(data.last_update_time).valueOf() || 0;
	item.tags = data.tags;
	item.cover = data.cover;

	if (data.chapters && data.chapters.length)
	{
		let vol = data.chapters[data.chapters.length - 1];

		let ch = vol.chapters[vol.chapters.length - 1];

		item.last_update_name = newTitle(ch && ch.chapter_name, vol.volume_name);
	}

	return newEntry(siteID, item)
}

export default buildEsjzone
