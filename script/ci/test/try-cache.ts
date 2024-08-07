import { assert, expect } from 'chai';
import FastGlob from '@bluelovers/fast-glob/bluebird';
import { lazyRun, path, console } from '@node-novel/site-cache-util/lib/index';
import { __rootWs } from '../../project-root';
import { ensureFile } from 'fs-extra';

export default lazyRun(async () => {

	let __root = __rootWs;

	await ensureFile(path.join(__root, 'packages/@node-novel', 'cached-dmzj', 'test/temp', 'cache.ensure.txt'));

}, {
	pkgLabel: __filename,
});
