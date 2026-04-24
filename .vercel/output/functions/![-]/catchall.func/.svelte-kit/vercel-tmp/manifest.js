export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		client: {start:"_app/immutable/entry/start.CU-icPuL.js",app:"_app/immutable/entry/app.zMHP5Y_Z.js",imports:["_app/immutable/entry/start.CU-icPuL.js","_app/immutable/chunks/BQ3mMVq_.js","_app/immutable/chunks/CP2-98jT.js","_app/immutable/chunks/B0mV96LK.js","_app/immutable/entry/app.zMHP5Y_Z.js","_app/immutable/chunks/CP2-98jT.js","_app/immutable/chunks/B7QHZRtx.js","_app/immutable/chunks/DL8UNNFl.js","_app/immutable/chunks/B0mV96LK.js","_app/immutable/chunks/zW3aCXaJ.js","_app/immutable/chunks/D900Fb9q.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/2.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/stashes",
				pattern: /^\/api\/stashes\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/stashes/_server.ts.js'))
			},
			{
				id: "/api/stashes/[id]",
				pattern: /^\/api\/stashes\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/stashes/_id_/_server.ts.js'))
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
