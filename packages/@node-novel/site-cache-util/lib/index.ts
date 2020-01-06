import path from 'upath2';
import { console, consoleDebug } from 'restful-decorator/lib/util/debug';
import { ITSResolvable } from 'ts-type';
import Bluebird from 'bluebird';
import isCi from './ci';

export { path }
export { console, consoleDebug }

console.enabledColor = true;
consoleDebug.enabledColor = true;

if (isCi())
{
	//consoleDebug.enabled = false;
}

export function lazyImport<T = any>(name: string)
{
	consoleDebug.debug(`lazyImport`, name);
	return import(name).then(v => v.default as T)
}

export function lazyRun<T>(cb: (...argv: any) => ITSResolvable<T>, options?: {
	pkgLabel: string,
})
{
	let { pkgLabel } = options;

	if (!pkgLabel)
	{
		pkgLabel = `[lazyRun]`;
	}

	pkgLabel && consoleDebug.info(pkgLabel, 'start');

	return Bluebird.resolve().then(cb)
		.tap(async (v) => {
			pkgLabel && consoleDebug.info(pkgLabel, 'end');
		})
	;
}
