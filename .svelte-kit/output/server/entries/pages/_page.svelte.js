import { f as fallback, a as attr_class, b as attr, c as bind_props, h as head, e as escape_html, d as ensure_array_like, i as derived } from "../../chunks/root.js";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../chunks/state.svelte.js";
function VinylLoader($$renderer, $$props) {
  let active = fallback($$props["active"], false);
  let size = fallback($$props["size"], 64);
  $$renderer.push(`<svg${attr_class("record-loader svelte-lkbe4r", void 0, { "active": active })}${attr("width", size)}${attr("height", size)} viewBox="0 0 100 100" aria-hidden="true"><circle class="record svelte-lkbe4r" cx="50" cy="50" r="48"></circle><circle class="groove groove-a svelte-lkbe4r" cx="50" cy="50" r="34"></circle><circle class="groove groove-b svelte-lkbe4r" cx="50" cy="50" r="26"></circle><circle class="groove groove-c svelte-lkbe4r" cx="50" cy="50" r="18"></circle><circle class="label svelte-lkbe4r" cx="50" cy="50" r="17"></circle><circle class="accent svelte-lkbe4r" cx="50" cy="50" r="7"></circle><circle class="hole svelte-lkbe4r" cx="50" cy="50" r="2.4"></circle></svg>`);
  bind_props($$props, { active, size });
}
function createRandomizerState() {
  return {
    remainingIds: [],
    lastPickedId: null,
    recentHistory: []
  };
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    let stashes = [];
    let activeState = { status: "idle" };
    let highlightedStashId = null;
    let randomizerState = createRandomizerState();
    let stashName = "";
    const recentHistory = derived(() => randomizerState.recentHistory);
    head("1uha8ag", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Grateful-Stash</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Load a public stash, roll a random album, and keep the music moving."/> <meta property="og:title" content="Grateful-Stash"/> <meta property="og:description" content="Load a public stash, roll a random album, and keep the music moving."/>`);
    });
    $$renderer2.push(`<div class="page svelte-1uha8ag"><div class="grain svelte-1uha8ag"></div> <main class="shell svelte-1uha8ag"><section class="hero svelte-1uha8ag"><div class="shop-sign panel svelte-1uha8ag"><div class="marquee-copy svelte-1uha8ag"><p class="eyebrow svelte-1uha8ag">Public Listening Room</p> <h1 class="svelte-1uha8ag">Grateful-Stash</h1></div></div></section> <section class="grid svelte-1uha8ag"><section class="panel player-panel turntable-panel svelte-1uha8ag"><div class="panel-header svelte-1uha8ag"><div><p class="eyebrow svelte-1uha8ag">Listening Deck</p> <h2 class="svelte-1uha8ag">${escape_html("Turntable Waiting")}</h2></div> `);
    {
      $$renderer2.push("<!--[0-->");
      VinylLoader($$renderer2, { size: 42 });
    }
    $$renderer2.push(`<!--]--></div> <article class="album-card svelte-1uha8ag"><div class="album-display svelte-1uha8ag"><div class="album-stage svelte-1uha8ag"><div class="album-stage-glow svelte-1uha8ag"></div> <div class="art-slot svelte-1uha8ag">`);
    {
      $$renderer2.push("<!--[-1-->");
      VinylLoader($$renderer2, { size: 184 });
    }
    $$renderer2.push(`<!--]--></div></div></div> <div class="album-copy lcd-copy svelte-1uha8ag">`);
    {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<p class="eyebrow svelte-1uha8ag">Ready To Roll</p> <h3 class="svelte-1uha8ag">No stash loaded</h3> <p class="artist svelte-1uha8ag">Pick one from the right-side crate to wake the platter.</p>`);
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div></article></section> <aside class="panel queue-panel svelte-1uha8ag"><div class="panel-header svelte-1uha8ag"><div><p class="eyebrow svelte-1uha8ag">Crate Queue</p> <h2 class="svelte-1uha8ag">Stash List &amp; History</h2></div></div> `);
    {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<p class="status-error svelte-1uha8ag">Database connection is not configured yet. Set \`DATABASE_URL\` and \`DATABASE_URL_UNPOOLED\`
            to enable the public stash feed.</p>`);
    }
    $$renderer2.push(`<!--]--> <section class="crate-panel queue-section svelte-1uha8ag"><div class="queue-section-header svelte-1uha8ag"><h3 class="svelte-1uha8ag">Available Stashes</h3> <span class="svelte-1uha8ag">${escape_html(stashes.length)} loaded into the room</span></div> `);
    if (stashes.length === 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="empty-state svelte-1uha8ag"><h3 class="svelte-1uha8ag">No public stashes yet</h3> <p>Drop the first stack below and this queue will light up.</p></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<div class="crate-feed svelte-1uha8ag"><div class="crate-lip svelte-1uha8ag" aria-hidden="true"></div> <!--[-->`);
      const each_array = ensure_array_like(stashes);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let stash = each_array[$$index];
        $$renderer2.push(`<article${attr_class("stash-card record-card svelte-1uha8ag", void 0, { "highlighted": highlightedStashId === stash.id })}><div class="stash-tab svelte-1uha8ag">${escape_html(stash.albumCount)} LPs</div> <div class="stash-card-top svelte-1uha8ag"><div><h3 class="svelte-1uha8ag">${escape_html(stash.name)}</h3> <p class="svelte-1uha8ag">${escape_html(stash.albumCount)} albums · ${escape_html(new Date(stash.createdAt).toLocaleString())}</p></div> <button class="svelte-1uha8ag">Load</button></div></article>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></section> <section class="history queue-section svelte-1uha8ag"><div class="queue-section-header svelte-1uha8ag"><h3 class="svelte-1uha8ag">Recent Picks</h3> <span class="svelte-1uha8ag">${escape_html(recentHistory().length)} in rotation</span></div> `);
    if (recentHistory().length === 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<p class="status-note svelte-1uha8ag">Completed picks will stack up here.</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<div class="history-list svelte-1uha8ag"><!--[-->`);
      const each_array_1 = ensure_array_like(recentHistory());
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let album = each_array_1[$$index_1];
        $$renderer2.push(`<div class="history-item svelte-1uha8ag"><strong>${escape_html(album.title)}</strong> <span class="svelte-1uha8ag">${escape_html(album.artist)}</span></div>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></section> <button class="random-button svelte-1uha8ag"${attr("disabled", activeState.status !== "loaded", true)}>Random</button></aside></section> <section class="bottom-strip panel svelte-1uha8ag"><section class="bottom-panel utility-panel wide-knob-panel svelte-1uha8ag"><div class="utility-cluster svelte-1uha8ag"><div class="knob svelte-1uha8ag"></div> <span class="svelte-1uha8ag">Volume</span></div> <div class="utility-cluster svelte-1uha8ag"><div class="knob svelte-1uha8ag"></div> <span class="svelte-1uha8ag">Treble</span></div> <div class="utility-cluster svelte-1uha8ag"><div class="knob svelte-1uha8ag"></div> <span class="svelte-1uha8ag">Bass</span></div></section> <section class="bottom-panel source-panel svelte-1uha8ag"><div class="source-head svelte-1uha8ag"><p class="eyebrow svelte-1uha8ag">Source Cabinet</p> <p class="source-count svelte-1uha8ag">${escape_html(0)} albums</p></div> <div class="source-actions svelte-1uha8ag"><button class="secondary svelte-1uha8ag"${attr("disabled", true, true)}>Copy Pick</button> <button class="secondary svelte-1uha8ag"${attr("disabled", recentHistory().length < 2, true)}>Share Picks</button></div> <form class="upload-form compact-upload svelte-1uha8ag"><label class="svelte-1uha8ag"><span class="svelte-1uha8ag">Stash Name</span> <input${attr("value", stashName)} maxlength="100" placeholder="Friday Night Finds" class="svelte-1uha8ag"/></label> <label class="svelte-1uha8ag"><span class="svelte-1uha8ag">CSV File</span> <input id="stash-file" type="file" accept=".csv,text/csv" class="svelte-1uha8ag"/></label> <div class="source-status">`);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="source-actions svelte-1uha8ag"><button type="submit"${attr("disabled", true, true)} class="svelte-1uha8ag">${escape_html("Upload Stash")}</button> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div></form></section> <section class="bottom-panel filter-panel svelte-1uha8ag"><div class="filters-head svelte-1uha8ag"><div><p class="eyebrow svelte-1uha8ag">Filters</p> <h3 class="svelte-1uha8ag">Quick Filters</h3></div> <button class="text-button svelte-1uha8ag">Clear</button></div> `);
    {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<p class="status-note svelte-1uha8ag">Load a stash to activate quick genre and decade filters.</p>`);
    }
    $$renderer2.push(`<!--]--></section></section></main></div>`);
  });
}
export {
  _page as default
};
