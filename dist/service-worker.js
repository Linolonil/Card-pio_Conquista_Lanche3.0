if(!self.define){let e,n={};const i=(i,r)=>(i=new URL(i+".js",r).href,n[i]||new Promise((n=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=n,document.head.appendChild(e)}else e=i,importScripts(i),n()})).then((()=>{let e=n[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(r,s)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(n[t])return;let o={};const l=e=>i(e,t),u={module:{uri:t},exports:o,require:l};n[t]=Promise.all(r.map((e=>u[e]||l(e)))).then((e=>(s(...e),o)))}}define(["./workbox-2b403519"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"839fcf5190b4a0a89ef6.png",revision:null},{url:"bundle.js",revision:"871ddca24bb281bee554913959baa365"},{url:"bundle.js.LICENSE.txt",revision:"e1f5f2889a076c6c0892b0758c5067c7"},{url:"f527c92283eb84d2e4df.jfif",revision:null}],{})}));