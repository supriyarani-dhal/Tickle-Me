if(!self.define){let s,e={};const a=(a,n)=>(a=new URL(a+".js",n).href,e[a]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=a,s.onload=e,document.head.appendChild(s)}else s=a,importScripts(a),e()})).then((()=>{let s=e[a];if(!s)throw new Error(`Module ${a} didn’t register its module`);return s})));self.define=(n,t)=>{const i=s||("document"in self?document.currentScript.src:"")||location.href;if(e[i])return;let c={};const r=s=>a(s,i),d={module:{uri:i},exports:c,require:r};e[i]=Promise.all(n.map((s=>d[s]||r(s)))).then((s=>(t(...s),c)))}}define(["./workbox-4754cb34"],(function(s){"use strict";importScripts(),self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"3228cab66087fb3d7732a889cb3dbc0d"},{url:"/_next/static/S1QJTdOsskbU4QsrXKBmV/_buildManifest.js",revision:"c155cce658e53418dec34664328b51ac"},{url:"/_next/static/S1QJTdOsskbU4QsrXKBmV/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/0e5ce63c-e203177d1980c1f3.js",revision:"S1QJTdOsskbU4QsrXKBmV"},{url:"/_next/static/chunks/117-fb53f16b24601432.js",revision:"S1QJTdOsskbU4QsrXKBmV"},{url:"/_next/static/chunks/210-ae764a52d7e83403.js",revision:"S1QJTdOsskbU4QsrXKBmV"},{url:"/_next/static/chunks/254-9e7a0ab675527e77.js",revision:"S1QJTdOsskbU4QsrXKBmV"},{url:"/_next/static/chunks/318-536de5dbf5ab28bf.js",revision:"S1QJTdOsskbU4QsrXKBmV"},{url:"/_next/static/chunks/341-6ffb2624a6379ff5.js",revision:"S1QJTdOsskbU4QsrXKBmV"},{url:"/_next/static/chunks/37-8f5778c8f6f9626c.js",revision:"S1QJTdOsskbU4QsrXKBmV"},{url:"/_next/static/chunks/464-2317f897a04bdd28.js",revision:"S1QJTdOsskbU4QsrXKBmV"},{url:"/_next/static/chunks/605-9ed7caa84aa00910.js",revision:"S1QJTdOsskbU4QsrXKBmV"},{url:"/_next/static/chunks/648-c678f5bdb039c753.js",revision:"S1QJTdOsskbU4QsrXKBmV"},{url:"/_next/static/chunks/823-4029e1988641f4d9.js",revision:"S1QJTdOsskbU4QsrXKBmV"},{url:"/_next/static/chunks/83-46544245418e377f.js",revision:"S1QJTdOsskbU4QsrXKBmV"},{url:"/_next/static/chunks/app/(app)/dashboard/page-2ddd9173b261ebac.js",revision:"S1QJTdOsskbU4QsrXKBmV"},{url:"/_next/static/chunks/app/(app)/layout-58bb3ad2e0bd877a.js",revision:"S1QJTdOsskbU4QsrXKBmV"},{url:"/_next/static/chunks/app/(app)/page-4db046fa07e5a70a.js",revision:"S1QJTdOsskbU4QsrXKBmV"},{url:"/_next/static/chunks/app/(auth)/layout-4a6b34806f5ea00a.js",revision:"S1QJTdOsskbU4QsrXKBmV"},{url:"/_next/static/chunks/app/(auth)/sign-in/page-d7b0562a90212cb5.js",revision:"S1QJTdOsskbU4QsrXKBmV"},{url:"/_next/static/chunks/app/(auth)/sign-up/page-9a2efec822c79315.js",revision:"S1QJTdOsskbU4QsrXKBmV"},{url:"/_next/static/chunks/app/(auth)/verify/%5BuserName%5D/page-f365f624d885ffb2.js",revision:"S1QJTdOsskbU4QsrXKBmV"},{url:"/_next/static/chunks/app/_not-found/page-d7275e0225f4f695.js",revision:"S1QJTdOsskbU4QsrXKBmV"},{url:"/_next/static/chunks/app/layout-f7cf95ca0effab62.js",revision:"S1QJTdOsskbU4QsrXKBmV"},{url:"/_next/static/chunks/app/u/%5BuserName%5D/page-6839c920f910800f.js",revision:"S1QJTdOsskbU4QsrXKBmV"},{url:"/_next/static/chunks/fd9d1056-0472443d2764895f.js",revision:"S1QJTdOsskbU4QsrXKBmV"},{url:"/_next/static/chunks/framework-f66176bb897dc684.js",revision:"S1QJTdOsskbU4QsrXKBmV"},{url:"/_next/static/chunks/main-75cd325784abcba4.js",revision:"S1QJTdOsskbU4QsrXKBmV"},{url:"/_next/static/chunks/main-app-13be3960383f6292.js",revision:"S1QJTdOsskbU4QsrXKBmV"},{url:"/_next/static/chunks/pages/_app-72b849fbd24ac258.js",revision:"S1QJTdOsskbU4QsrXKBmV"},{url:"/_next/static/chunks/pages/_error-7ba65e1336b92748.js",revision:"S1QJTdOsskbU4QsrXKBmV"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-31b300f5d87cbea8.js",revision:"S1QJTdOsskbU4QsrXKBmV"},{url:"/_next/static/css/1ccfd805ed9d3a33.css",revision:"1ccfd805ed9d3a33"},{url:"/_next/static/css/48340cfe5c3cfec7.css",revision:"48340cfe5c3cfec7"},{url:"/_next/static/media/26a46d62cd723877-s.woff2",revision:"befd9c0fdfa3d8a645d5f95717ed6420"},{url:"/_next/static/media/55c55f0601d81cf3-s.woff2",revision:"43828e14271c77b87e3ed582dbff9f74"},{url:"/_next/static/media/581909926a08bbc8-s.woff2",revision:"f0b86e7c24f455280b8df606b89af891"},{url:"/_next/static/media/6d93bde91c0c2823-s.woff2",revision:"621a07228c8ccbfd647918f1021b4868"},{url:"/_next/static/media/97e0cb1ae144a2a9-s.woff2",revision:"e360c61c5bd8d90639fd4503c829c2dc"},{url:"/_next/static/media/a34f9d1faa5f3315-s.p.woff2",revision:"d4fe31e6a2aebc06b8d6e558c9141119"},{url:"/_next/static/media/df0a9ae256c0569c-s.woff2",revision:"d54db44de5ccb18886ece2fda72bdfe0"},{url:"/manifest.json",revision:"f46ea843103db9a37efae78efd89befb"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/service-worker.js",revision:"ee8d5ae5aa93826a849c3108afcd4c3e"},{url:"/tickle-me.png",revision:"59a0a9bf79ec78b375c8bde1096abfbc"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),s.cleanupOutdatedCaches(),s.registerRoute("/",new s.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:s,response:e,event:a,state:n})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new s.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new s.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),s.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new s.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),s.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new s.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\/_next\/image\?url=.+$/i,new s.StaleWhileRevalidate({cacheName:"next-image",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:mp3|wav|ogg)$/i,new s.CacheFirst({cacheName:"static-audio-assets",plugins:[new s.RangeRequestsPlugin,new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:mp4)$/i,new s.CacheFirst({cacheName:"static-video-assets",plugins:[new s.RangeRequestsPlugin,new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:js)$/i,new s.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:css|less)$/i,new s.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new s.StaleWhileRevalidate({cacheName:"next-data",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:json|xml|csv)$/i,new s.NetworkFirst({cacheName:"static-data-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>{if(!(self.origin===s.origin))return!1;const e=s.pathname;return!e.startsWith("/api/auth/")&&!!e.startsWith("/api/")}),new s.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>{if(!(self.origin===s.origin))return!1;return!s.pathname.startsWith("/api/")}),new s.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>!(self.origin===s.origin)),new s.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
