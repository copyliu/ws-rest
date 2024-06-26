/**
 * Created by user on 2019/7/7.
 */
import { lazyImport, lazyRun } from '@node-novel/site-cache-util/lib/index';
import { pkgLabel } from './util/main';

export default lazyRun(async () => {

	await lazyImport('./build/get-recent-update', require);

	await lazyImport('./build/get-novel-all', require);

	await lazyImport('./build/build-cache', require);

}, {
	pkgLabel,
});
