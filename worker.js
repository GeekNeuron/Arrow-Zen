importScripts('generator.js');
onmessage=e=>{const a=e.data;let t=0;if(a.seed!=null)setSeed(a.seed);const l=generate(a.w,a.h,a.maxLen,a.walls,a.fill,p=>{const n=Date.now();if(n-t>50){t=n;postMessage({p})}});postMessage({level:l})};
