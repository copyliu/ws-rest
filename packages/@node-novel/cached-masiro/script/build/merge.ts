import fs, { readJSON, writeJSON } from 'fs-extra';
import cacheFilePaths, { cacheFileInfoPath } from '../util/files';
import { IESJzoneRecentUpdateCache, IESJzoneRecentUpdateRowBook } from 'esjzone-api/lib/types';
import Bluebird from 'bluebird';
import { consoleDebug, __root } from '../util';
import FastGlob, { Options, EntryItem } from '@bluelovers/fast-glob/bluebird';
import path from 'upath2';
import { zhDictCompare, getCjkName } from '@novel-segment/util';
import sortObject from'sort-object-keys2';

import { lazyRun } from '@node-novel/site-cache-util/lib/index';

export default lazyRun(async () => {

	let data = await FastGlob
		.async<string>([
			'*.json',
		], {
			cwd: cacheFilePaths.dirFid,
			absolute: true,
		})
		.reduce(async (a, file) => {

			let info = await readJSON(file);

			a[info.fid] = info;

			return a;
		}, {} as Record<string, any>)
	;

	await writeJSON(cacheFilePaths.infoPack, data);

}, {
	pkgLabel: __filename
});
