import * as server from '../entries/pages/_page.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.ts";
export const imports = ["_app/immutable/nodes/2.BHHkj42h.js","_app/immutable/chunks/DL8UNNFl.js","_app/immutable/chunks/CP2-98jT.js","_app/immutable/chunks/B0mV96LK.js","_app/immutable/chunks/B7QHZRtx.js","_app/immutable/chunks/zW3aCXaJ.js","_app/immutable/chunks/D900Fb9q.js","_app/immutable/chunks/BQ3mMVq_.js"];
export const stylesheets = ["_app/immutable/assets/2.YFiIWV6Q.css"];
export const fonts = [];
