// Arrow Zen. Derived from robmat/arrows_game (GPL-3.0). The generator lives in generator.js (also used by worker.js).
(()=>{'use strict';
const $=id=>document.getElementById(id);
const MAXCS=96,HINTS=3,UNDOS=3,TA_START=90,TA_BONUS=8,TA_PEN=5;
const THEMES={
 Night:{dot:'#383D53',bg:'#1E202D',snake:'#ABB6F4',acc:'#5B72FF',btn:'#40466A',btnfg:'#AFB6E2',fg:'#D7DCF0',card:'#282D40',track:'#282D40',prog:'#5B72FF',heart:'#FF4B5E',bad:'#FF2A2A',pfg:'#fff',title:'#D7DCF0',inv:'invert(1)',good:'#2BD17E',goodfg:'#04210F',gold:'#FFC53D',flame:'#FF9F43'},
 Day:{dot:'#D9DCED',bg:'#FFFFFF',snake:'#111433',acc:'#5B72FF',btn:'#CCD3F3',btnfg:'#2F3768',fg:'#313A73',card:'#EEF0F9',track:'#EEF0F9',prog:'#5B72FF',heart:'#FF4B5E',bad:'#FF2A2A',pfg:'#fff',title:'#313A73',inv:'none',good:'#12864A',goodfg:'#FFFFFF',gold:'#B07400',flame:'#E0670A'},
 Dark:{dot:'#25504D',bg:'#13302F',snake:'#E8D9B5',acc:'#3FA9A0',btn:'#2D5957',btnfg:'#C6E3DF',fg:'#F2F6F4',card:'#1D4140',track:'#1D4140',prog:'#3FA9A0',heart:'#FF4B5E',bad:'#FF2A2A',pfg:'#0B0F1A',title:'#F2F6F4',inv:'invert(1)',good:'#2BD17E',goodfg:'#04210F',gold:'#FFC53D',flame:'#FF9F43'},
 Midnight:{dot:'#182039',bg:'#05070F',snake:'#9FB4FF',acc:'#4663F5',btn:'#212D4D',btnfg:'#B4C2F5',fg:'#E6ECFF',card:'#121A2D',track:'#121A2D',prog:'#4663F5',heart:'#FF4B5E',bad:'#FF2A2A',pfg:'#fff',title:'#E6ECFF',inv:'invert(1)',good:'#2BD17E',goodfg:'#04210F',gold:'#FFC53D',flame:'#FF9F43'},
 'Black and White':{dot:'#2B2B2B',bg:'#000000',snake:'#E6E6E6',acc:'#FFFFFF',btn:'#303030',btnfg:'#DADADA',fg:'#FFFFFF',card:'#171717',track:'#171717',prog:'#FFFFFF',heart:'#FF5A5A',bad:'#FF2A2A',pfg:'#000000',title:'#FFFFFF',inv:'invert(1)',good:'#2BD17E',goodfg:'#04210F',gold:'#FFC53D',flame:'#FF9F43'},
 Ocean:{dot:'#173A59',bg:'#0B1B2B',snake:'#9BDCFF',acc:'#2F9BFF',btn:'#1D4A6E',btnfg:'#A9D4F2',fg:'#E3F3FF',card:'#12304A',track:'#12304A',prog:'#2F9BFF',heart:'#FF4B5E',bad:'#FF2A2A',pfg:'#0B0F1A',title:'#E3F3FF',inv:'invert(1)',good:'#2BD17E',goodfg:'#04210F',gold:'#FFC53D',flame:'#FF9F43'},
 Nord:{dot:'#434C5E',bg:'#2E3440',snake:'#88C0D0',acc:'#88C0D0',btn:'#4C566A',btnfg:'#D8DEE9',fg:'#ECEFF4',card:'#3B4252',track:'#3B4252',prog:'#88C0D0',heart:'#BF616A',bad:'#FF2A2A',pfg:'#2E3440',title:'#ECEFF4',inv:'invert(1)',good:'#2BD17E',goodfg:'#04210F',gold:'#FFC53D',flame:'#FF9F43'},
 Purple:{dot:'#33254D',bg:'#1A1226',snake:'#D2B8FF',acc:'#9B6BFF',btn:'#3B2A58',btnfg:'#CDB9F2',fg:'#F0E8FF',card:'#271B3B',track:'#271B3B',prog:'#9B6BFF',heart:'#FF4B5E',bad:'#FF2A2A',pfg:'#0B0F1A',title:'#F0E8FF',inv:'invert(1)',good:'#2BD17E',goodfg:'#04210F',gold:'#FFC53D',flame:'#FF9F43'},
 Dracula:{dot:'#3D4054',bg:'#282A36',snake:'#CBA8FF',acc:'#FF79C6',btn:'#4A4E66',btnfg:'#D6D8EC',fg:'#F8F8F2',card:'#343746',track:'#343746',prog:'#FF79C6',heart:'#FF4B5E',bad:'#FF2A2A',pfg:'#282A36',title:'#F8F8F2',inv:'invert(1)',good:'#2BD17E',goodfg:'#04210F',gold:'#FFC53D',flame:'#FF9F43'},
 Rose:{dot:'#4A2236',bg:'#26121C',snake:'#FFB3D1',acc:'#F0508F',btn:'#57283F',btnfg:'#F6BFD6',fg:'#FFE6F0',card:'#391A2A',track:'#391A2A',prog:'#F0508F',heart:'#FF4B5E',bad:'#FF2A2A',pfg:'#0B0F1A',title:'#FFE6F0',inv:'invert(1)',good:'#2BD17E',goodfg:'#04210F',gold:'#FFC53D',flame:'#FF9F43'},
 Sunset:{dot:'#4A3050',bg:'#2A1B2E',snake:'#FFB38A',acc:'#FF5E7E',btn:'#54335C',btnfg:'#F5C9D6',fg:'#FFE9E0',card:'#3A2541',track:'#3A2541',prog:'#FF5E7E',heart:'#FF4B5E',bad:'#FF2A2A',pfg:'#0B0F1A',title:'#FFE9E0',inv:'invert(1)',good:'#2BD17E',goodfg:'#04210F',gold:'#FFC53D',flame:'#FF9F43'},
 Red:{dot:'#4A2C2C',bg:'#2E1B1B',snake:'#FFB8B3',acc:'#FF4F8B',btn:'#5F3636',btnfg:'#F2C3C0',fg:'#FFECEA',card:'#432727',track:'#432727',prog:'#FF4F8B',heart:'#FF4B5E',bad:'#FF2A2A',pfg:'#0B0F1A',title:'#FFECEA',inv:'invert(1)',good:'#2BD17E',goodfg:'#04210F',gold:'#FFC53D',flame:'#FF9F43'},
 Orange:{dot:'#4A3A2C',bg:'#2E241B',snake:'#FFCC80',acc:'#FF9800',btn:'#5D4838',btnfg:'#EBCFA8',fg:'#FFF1E0',card:'#42332A',track:'#42332A',prog:'#FF9800',heart:'#FF4B5E',bad:'#FF2A2A',pfg:'#0B0F1A',title:'#FFF1E0',inv:'invert(1)',good:'#2BD17E',goodfg:'#04210F',gold:'#FFC53D',flame:'#FF9F43'},
 Yellow:{dot:'#4A4A2C',bg:'#2E2E1B',snake:'#FFF176',acc:'#FFEB3B',btn:'#5C5C38',btnfg:'#E8E49A',fg:'#FFFDE0',card:'#42422A',track:'#42422A',prog:'#FFEB3B',heart:'#FF4B5E',bad:'#FF2A2A',pfg:'#0B0F1A',title:'#FFFDE0',inv:'invert(1)',good:'#2BD17E',goodfg:'#04210F',gold:'#FFC53D',flame:'#FF9F43'},
 Green:{dot:'#2C4A2C',bg:'#1B2E1B',snake:'#A8E6CF',acc:'#4CAF50',btn:'#385C38',btnfg:'#BDE3BD',fg:'#EAFBEA',card:'#274227',track:'#274227',prog:'#4CAF50',heart:'#FF4B5E',bad:'#FF2A2A',pfg:'#0B0F1A',title:'#EAFBEA',inv:'invert(1)',good:'#2BD17E',goodfg:'#04210F',gold:'#FFC53D',flame:'#FF9F43'},
 Mocha:{dot:'#3B2A20',bg:'#1F1612',snake:'#EBCBA0',acc:'#D08A4E',btn:'#4A3326',btnfg:'#E0C4A5',fg:'#F6E9DA',card:'#312119',track:'#312119',prog:'#D08A4E',heart:'#FF4B5E',bad:'#FF2A2A',pfg:'#0B0F1A',title:'#F6E9DA',inv:'invert(1)',good:'#2BD17E',goodfg:'#04210F',gold:'#FFC53D',flame:'#FF9F43'},
 Cyber:{dot:'#20203F',bg:'#0A0A14',snake:'#00F5D4',acc:'#F72585',btn:'#2B2B5A',btnfg:'#A9F0FF',fg:'#E8F8FF',card:'#17172F',track:'#17172F',prog:'#F72585',heart:'#FF4B5E',bad:'#FF2A2A',pfg:'#0B0F1A',title:'#E8F8FF',inv:'invert(1)',good:'#2BD17E',goodfg:'#04210F',gold:'#FFC53D',flame:'#FF9F43'},
 Paper:{dot:'#E6DAC0',bg:'#FBF6EC',snake:'#3B2F1E',acc:'#B5561D',btn:'#DBCBA6',btnfg:'#51402A',fg:'#3B2F1E',card:'#F0E6D0',track:'#F0E6D0',prog:'#B5561D',heart:'#FF4B5E',bad:'#FF2A2A',pfg:'#FFFFFF',title:'#3B2F1E',inv:'none',good:'#12864A',goodfg:'#FFFFFF',gold:'#B07400',flame:'#E0670A'},
 Mint:{dot:'#CFE6D9',bg:'#F2FBF6',snake:'#103D2A',acc:'#16875A',btn:'#AEDABE',btnfg:'#1D4A36',fg:'#123324',card:'#D9EFE2',track:'#D9EFE2',prog:'#16875A',heart:'#FF4B5E',bad:'#FF2A2A',pfg:'#FFFFFF',title:'#123324',inv:'none',good:'#12864A',goodfg:'#FFFFFF',gold:'#B07400',flame:'#E0670A'},
 Sky:{dot:'#CFE2F0',bg:'#F2F9FE',snake:'#0B3556',acc:'#1B72C4',btn:'#B0D3F0',btnfg:'#16405F',fg:'#0E2C47',card:'#DCEDFA',track:'#DCEDFA',prog:'#1B72C4',heart:'#FF4B5E',bad:'#FF2A2A',pfg:'#FFFFFF',title:'#0E2C47',inv:'none',good:'#12864A',goodfg:'#FFFFFF',gold:'#B07400',flame:'#E0670A'},
 Lavender:{dot:'#DDD4F2',bg:'#F7F4FE',snake:'#2E1F5C',acc:'#7040D8',btn:'#D0C4F0',btnfg:'#3B2A70',fg:'#2A1B52',card:'#EBE5FA',track:'#EBE5FA',prog:'#7040D8',heart:'#FF4B5E',bad:'#FF2A2A',pfg:'#FFFFFF',title:'#2A1B52',inv:'none',good:'#12864A',goodfg:'#FFFFFF',gold:'#B07400',flame:'#E0670A'},
 Peach:{dot:'#F2D9CB',bg:'#FFF6F1',snake:'#4A2316',acc:'#C8401F',btn:'#F3C4AB',btnfg:'#5E2E1B',fg:'#43200F',card:'#FCE3D4',track:'#FCE3D4',prog:'#C8401F',heart:'#FF4B5E',bad:'#FF2A2A',pfg:'#FFFFFF',title:'#43200F',inv:'none',good:'#12864A',goodfg:'#FFFFFF',gold:'#B07400',flame:'#E0670A'}};
const dark=matchMedia('(prefers-color-scheme: dark)').matches;
let P=Object.assign({level:1,theme:dark?'Night':'Day',speed:'Medium',fill:false,lang:(navigator.language||'').slice(0,2)==='fa'?'fa':'en',streak:0,lastDay:'',xp:0,daily:{},shapes:{},stars:{},ach:{},cb:false,hc:false,stats:{}},JSON.parse(localStorage.getItem('arrow-zen')||'{}'));
if(!THEMES[P.theme])P.theme='Night';
P.shapes=Object.fromEntries(Object.keys(P.shapes||{}).filter(k=>SHAPES.includes(k)).map(k=>[k,1]));
P.stats=Object.assign({cleared:0,perfect:0,pure:0,close:0,big:0,hints:0,undos:0,bestStreak:0,months:0,taBest:0,endBest:0},P.stats);
const save=()=>localStorage.setItem('arrow-zen',JSON.stringify(P));
const isLight=()=>THEMES[P.theme].inv==='none';
const dcol=c=>isLight()?mixc(c,'#000000',.4):c;
function theme(){const t=THEMES[P.theme],s=document.documentElement.style,lum=h=>{const c=rgb(h);return(c[0]*299+c[1]*587+c[2]*114)/1000},dk=lum(t.bg)<128,hcFg=dk?'#FFFFFF':'#000000',snake=P.hc?hcFg:t.snake;
 for(const k of['bg','acc','btn','btnfg','fg','card','track','prog','heart','pfg','title','good','goodfg','gold','flame'])s.setProperty('--'+k,t[k]);
 if(P.hc){s.setProperty('--fg',hcFg);s.setProperty('--btnfg',hcFg);s.setProperty('--title',hcFg)}
 s.setProperty('--shapeinv',t.inv);const cl=document.documentElement.classList;cl.toggle('hc',!!P.hc);cl.toggle('cbm',!!P.cb);
 document.querySelector('meta[name=theme-color]').content=t.bg;
 const dist=(a,b)=>{const x=rgb(a),y=rgb(b);return Math.hypot(x[0]-y[0],x[1]-y[1],x[2]-y[2])},bad=P.cb?(dist('#FF8A00',snake)>130?'#FF8A00':'#1FA2FF'):t.bad;
 return{bg:t.bg,acc:t.acc,snake,bad,gold:t.gold,dot:P.hc?mixc(t.bg,snake,.4):(t.dot||mixc(t.bg,t.snake,.18))}}

let dotT=new Map(),winInfo=null,custom=null,curShape=null,prevLives=null,hintsLeft=HINTS,undosLeft=UNDOS,undoStack=[],run=null,runTimer=null,runLast=0,kSel=null,kbdMode=false,lastWin=null,lvl,initial,lives,maxLives,total,won=false,loading=true,flashId=null,flashStart=0,flashT=0,removal=new Map(),bumps=new Map(),freedC=new Set(),entry=new Map(),entering=false,entryTimer=null,
 sc=K.DEFS,ox=0,oy=0,guide=false,guideA=0,guideT=0,guideFrom=0,guideTo=0,win=null,W=0,H=0,dpr=1;
const cv=$('cv'),ctx=cv.getContext('2d');
function resize(){const r=cv.parentElement.getBoundingClientRect(),res=parseFloat(getComputedStyle(cv.parentElement).getPropertyValue('--reserve'))||0;dpr=devicePixelRatio||1;W=r.width;H=Math.max(40,r.height-res);cv.width=W*dpr;cv.height=H*dpr;cv.style.width=W+'px';cv.style.height=H+'px'}
const HEART='M12 21.2c-.4 0-.8-.1-1.1-.4C6.2 16.6 3 13.6 3 9.9 3 7.2 5.1 5 7.8 5c1.7 0 3.3.9 4.2 2.2C12.9 5.9 14.5 5 16.2 5 18.9 5 21 7.2 21 9.9c0 3.7-3.2 6.7-7.9 10.9-.3.3-.7.4-1.1.4z';
const heartSvg=(on,pop)=>`<svg class="hrt ${on?'on':'off'}${pop?' pop':''}" viewBox="0 0 24 24"><path d="${HEART}"${on?' fill="url(#hg)"':''}/>${on?'<path class="gl" d="M7.2 8.4c.5-1.1 1.4-1.7 2.5-1.7"/>':''}</svg>`;
const DIFF=[['easy','#34C77B'],['normal','#5B72FF'],['hard','#FF9F43'],['expert','#FF5B5B'],['super','#E5389B'],['nightmare','#9B5CFF'],['legendary','#FFC83D'],['mythic','#2FE0D0']];
const levelDiff=n=>{const t=levelTier(n),d=DIFF[t];return{k:d[0],c:d[1],t}};
const dg=s=>P.lang==='fa'?String(s).replace(/\d/g,c=>'۰۱۲۳۴۵۶۷۸۹'[c]):String(s);
const fmtT=t=>{const s=Math.ceil(t);return dg(Math.floor(s/60)+':'+String(s%60).padStart(2,'0'))};
function setDiff(){const e=$('diff');
 if(custom&&custom.mode){e.textContent=tt(custom.mode==='ta'?'mode_ta':'mode_end')+' · '+nf(run?run.score:0);e.style.color=dcol('#FF9F43')}
 else if(custom&&custom.daily){e.textContent=tt('diff_daily');e.style.color=dcol('#FF9F43')}
 else if(custom&&custom.replay){const d=levelDiff(custom.replay);e.textContent=tt('level')+' '+nf(custom.replay)+' · '+tt('diff_'+d.k);e.style.color=dcol(d.c)}
 else if(custom){e.textContent=tt('diff_custom');e.style.color='var(--acc)'}
 else{const d=levelDiff(P.level);e.textContent=tt('diff_'+d.k);e.style.color=dcol(d.c)}}
function hud(){if(!lvl)return;
 if(run&&run.type==='ta')$('lives').innerHTML=`<b class="tm">${fmtT(run.time)}</b>`;
 else{const pop=prevLives!=null&&lives<prevLives?lives:-1;prevLives=lives;$('lives').innerHTML=Array.from({length:maxLives},(_,i)=>heartSvg(i<lives,i===pop)).join('')}
 $('prog').style.width=(total?(total-lvl.snakes.length)/total*100:0)+'%';setDiff();
 $('hintCnt').textContent=nf(hintsLeft);$('hintBtn').disabled=hintsLeft<=0;$('undoCnt').textContent=nf(undosLeft);$('undoBtn').disabled=undosLeft<=0||!undoStack.length}
// ---- save / resume ----
const SAVE='arrow-zen-save';
function persist(){if(!lvl||loading||run)return;try{localStorage.setItem(SAVE,JSON.stringify({n:P.level,custom,shape:curShape,initial,cur:lvl,lives,maxLives,hints:hintsLeft,undos:undosLeft,stack:undoStack}))}catch{}}
function clearSave(){localStorage.removeItem(SAVE)}
function readSave(){try{const s=JSON.parse(localStorage.getItem(SAVE));return s&&s.cur&&s.initial&&s.n===P.level?s:null}catch{return null}}
function startEntry(){clearInterval(entryTimer);entry=new Map();entering=false;const sn=lvl.snakes;if(!sn.length)return;
 const cx=lvl.w/2,cy=lvl.h/2,order=sn.map(s=>{const mx=s.body.reduce((a,p)=>a+p.x,0)/s.body.length,my=s.body.reduce((a,p)=>a+p.y,0)/s.body.length;return[s.id,(mx-cx)**2+(my-cy)**2]}).sort((a,b)=>a[1]-b[1]).map(a=>a[0]);
 const st=Math.min(K.STAGGER,K.MAXSTAG/Math.max(1,order.length-1));entering=true;const t0=performance.now();let ft=0;
 const tick=()=>{const el=Math.max(ft,performance.now()-t0),m=new Map();
  order.forEach((id,i)=>{const l=Math.min(1,Math.max(0,(el-st*i)/K.ENTRY));if(l<1)m.set(id,1-Math.pow(1-l,3))});
  entry=m;if(!m.size){clearInterval(entryTimer);entering=false}ft+=K.FRAME};
 tick();entryTimer=setInterval(tick,K.FRAME)}
function resetView(){sc=K.DEFS;ox=oy=0}
function setLevel(l,ml,cur,ln,x){x=x||{};initial={w:l.w,h:l.h,snakes:l.snakes.slice(),walls:l.walls||null};lvl=cur||{w:l.w,h:l.h,snakes:l.snakes.slice(),walls:l.walls||null};prevLives=null;
 $('regenBtn').hidden=!(custom&&custom.w);$('restartBtn').hidden=!!(custom&&custom.mode);total=l.snakes.length;won=false;maxLives=ml;lives=ln==null?ml:ln;hintsLeft=x.hints==null?HINTS:x.hints;undosLeft=x.undos==null?UNDOS:x.undos;undoStack=x.stack||[];kSel=null;
 flashId=null;removal=new Map();bumps.clear();freedC.clear();resetView();loading=false;$('loadOv').hidden=true;if(document.activeElement&&document.activeElement.blur)document.activeElement.blur();hud();startEntry();win=null;dotT.clear();persist()}
function setProg(p){$('loadBar').style.width=(p*100)+'%'}
function runGen(c,walls,fill,seed,cb){const inline=()=>setTimeout(()=>{setSeed(seed);const l=generate(c.w,c.h,c.maxLen,walls,fill,setProg);setSeed(null);cb(l)},30);let wk;
 try{wk=new Worker('worker.js')}catch{return inline()}
 wk.onmessage=e=>{if(e.data.p!=null)setProg(e.data.p);else{wk.terminate();cb(e.data.level)}};wk.onerror=()=>{wk.terminate();inline()};
 wk.postMessage({w:c.w,h:c.h,maxLen:c.maxLen,walls,fill,seed})}
function loadShape(n){return new Promise(r=>{const im=new Image();im.onload=()=>r(im);im.onerror=()=>r(null);im.src='assets/shapes/'+n+'.png'})}
function wallsFromImage(im,w,h){const c=document.createElement('canvas'),SW=c.width=im.naturalWidth,SH=c.height=im.naturalHeight,x=c.getContext('2d',{willReadFrequently:true});x.drawImage(im,0,0);
 const d=x.getImageData(0,0,SW,SH).data,blk=i=>d[i+3]>K.COLOR_T&&d[i]<K.COLOR_T&&d[i+1]<K.COLOR_T&&d[i+2]<K.COLOR_T;
 let a=SW,b=SH,e=0,f=0,ok=false;for(let yy=0;yy<SH;yy++)for(let xx=0;xx<SW;xx++)if(blk((yy*SW+xx)*4)){ok=true;a=Math.min(a,xx);e=Math.max(e,xx);b=Math.min(b,yy);f=Math.max(f,yy)}
 if(!ok){a=b=0;e=SW-1;f=SH-1}const cw=e-a+1,ch=f-b+1;
 return Array.from({length:w},(_,X)=>Array.from({length:h},(_,Y)=>!blk(((b+Math.min(ch-1,Math.floor(Y*ch/h)))*SW+a+Math.min(cw-1,Math.floor(X*cw/w)))*4)))}
function dailyCfg(day){const seed=parseInt(day.replace(/-/g,''),10);setSeed(seed);const w=16+(rnd()*9|0),h=16+(rnd()*9|0),maxLen=6+(rnd()*7|0),shape=rnd()<.5?SHAPES[rnd()*SHAPES.length|0]:null;setSeed(null);return{seed,w,h,maxLen,shape}}
const campaignSeed=n=>1000003*n+17;
async function newLevel(c){custom=c||null;clearSave();hidePages();$('game').hidden=false;$('winOv').hidden=$('overOv').hidden=true;$('overSub').hidden=true;resize();
 loading=true;lvl=null;setProg(0);$('loadOv').hidden=false;
 let cfg,shape=null,seed=null,fill=P.fill;
 if(custom&&custom.daily){const d=dailyCfg(custom.day);cfg={w:d.w,h:d.h,maxLen:d.maxLen,lives:K.LIVES};shape=d.shape;seed=d.seed;fill=false}
 else if(custom&&custom.mode){cfg=levelConfig(custom.lv);cfg.lives=3;fill=false}
 else if(custom&&custom.w){cfg=levelConfig(P.level,custom.w,custom.h);shape=custom.shape;if(fill){cfg.w=Math.min(cfg.w,K.MAXFILL);cfg.h=Math.min(cfg.h,K.MAXFILL)}}
 else{const n=custom&&custom.replay?custom.replay:P.level;cfg=levelConfig(n);seed=campaignSeed(n);setSeed(seed);shape=shouldApplyShape(cfg,rnd())?SHAPES[rnd()*SHAPES.length|0]:null;setSeed(null);if(fill){cfg.w=Math.min(cfg.w,K.MAXFILL);cfg.h=Math.min(cfg.h,K.MAXFILL)}}
 curShape=shape;let walls=null;if(shape){const im=await loadShape(shape);if(im)walls=wallsFromImage(im,cfg.w,cfg.h)}
 runGen(cfg,walls,fill,seed,l=>setLevel(l,cfg.lives,null,custom&&custom.mode==='endless'&&run?run.lives:null))}
function play(){const s=readSave();if(!s)return newLevel();custom=s.custom;curShape=s.shape||null;hidePages();$('game').hidden=false;$('winOv').hidden=$('overOv').hidden=true;$('overSub').hidden=true;resize();
 setLevel(s.initial,s.maxLives,s.cur,s.lives,{hints:s.hints,undos:s.undos,stack:s.stack});if(lives<=0)over()}
function restart(){if(!initial||loading||run)return;clearInterval(entryTimer);dotT.clear();lvl={w:initial.w,h:initial.h,snakes:initial.snakes.slice(),walls:initial.walls||null};total=lvl.snakes.length;won=false;lives=maxLives;hintsLeft=HINTS;undosLeft=UNDOS;undoStack=[];prevLives=null;flashId=null;removal=new Map();bumps.clear();freedC.clear();resetView();$('overOv').hidden=$('winOv').hidden=true;hud();startEntry();persist()}
function flash(id){flashId=id;flashStart=performance.now();clearTimeout(flashT);setTimeout(()=>{if(flashId===id)flashId=null},K.FLASH_MS)}
function hint(){if(hintsLeft<=0||loading||won||lives<=0||entering||$('game').hidden)return;resetView();const id=findRemovable(lvl);if(id==null)return;flash(id);hintsLeft--;P.stats.hints++;save();hud();persist()}
function fadeIn(id){entry.set(id,0);let el=0;const h=setInterval(()=>{el+=K.FRAME;const l=Math.min(1,el/260);entry.set(id,1-Math.pow(1-l,3));if(l>=1){clearInterval(h);entry.delete(id)}},K.FRAME)}
function undo(){if(undosLeft<=0||!undoStack.length||loading||won||lives<=0||entering||removal.size||$('game').hidden)return;const s=undoStack.pop();s.body.forEach(p=>dotT.delete(p.y*lvl.w+p.x));lvl={...lvl,snakes:[...lvl.snakes,s]};undosLeft--;P.stats.undos++;save();flashId=null;fadeIn(s.id);hud();persist()}
// ---- timed / endless runs
function startRun(type){const sv=readSave();if(sv&&!confirm(tt('confirm_discard')))return;clearSave();run={type,score:0,time:TA_START,lives:3,over:false};startTimer();nextBoard()}
function nextBoard(){newLevel({mode:run.type,lv:run.type==='ta'?2+(run.score>>1):1+run.score})}
function startTimer(){clearInterval(runTimer);if(run.type!=='ta')return;runLast=performance.now();
 runTimer=setInterval(()=>{const n=performance.now(),d=(n-runLast)/1000;runLast=n;if(!run||run.over||loading||!$('winOv').hidden||$('game').hidden)return;run.time-=d;if(run.time<=0){run.time=0;lives=0;hud();endRun()}else hud()},250)}
function stopRun(){clearInterval(runTimer);runTimer=null;run=null}
function endRun(){if(!run||run.over)return;run.over=true;clearInterval(runTimer);lives=0;const key=run.type==='ta'?'taBest':'endBest',rec=run.score>P.stats[key];if(rec)P.stats[key]=run.score;
 touchStreak();const un=checkAch();save();hud();$('overMsg').textContent=tt(run.type==='ta'?'run_ta':'run_end');$('overSub').textContent=tt('run_score',{n:nf(run.score),b:nf(P.stats[key])})+(rec&&run.score>0?' · '+tt('run_new'):'');$('overSub').hidden=false;$('retryBtn').textContent=tt('again');$('overOv').hidden=false;un.forEach(i=>toast(tt('ach_unlocked',{n:tt('ach_'+i)}),2600))}
function boardDone(){run.score++;P.xp=(P.xp||0)+5;touchStreak();if(curShape&&SHAPES.includes(curShape))P.shapes[curShape]=1;
 if(run.type==='ta'){run.time+=TA_BONUS;toast(tt('time_plus',{n:nf(TA_BONUS)}),900)}else if(run.score%3===0&&run.lives<3)run.lives++;
 save();hud();setTimeout(()=>{if(run&&!run.over)nextBoard()},500)}
function over(){if(run){endRun();return}$('overMsg').textContent=tt('lost');$('overSub').hidden=true;$('retryBtn').textContent=tt('retry');$('overOv').hidden=false}
function animateRemoval(id){const dur=K.REM[P.speed]||600,sn=lvl.snakes.find(s=>s.id===id),n=sn?sn.body.length:0,anim=!!sn&&!reduced();let fi=n-1,hd=false;removal.set(id,0);let el=0;
 const h=setInterval(()=>{el+=K.FRAME;const lp=Math.min(1,el/dur),r=lp*lp*lp;removal.set(id,r);
  if(anim){const tp=(n-1)*(1-r),now=performance.now(),free=i=>{const ci=sn.body[i].y*lvl.w+sn.body[i].x;if(!freedC.has(ci)){freedC.add(ci);dotT.set(ci,now)}};
   while(fi>=1&&fi>tp+.25){free(fi);fi--}if(!hd&&r>.12){hd=true;free(0)}}
  if(el>=dur){clearInterval(h);removal.set(id,1);removed(id);removal.delete(id)}},K.FRAME)}
function removed(id){const sn=lvl.snakes.find(s=>s.id===id);if(sn){undoStack.push(sn);const now=performance.now();sn.body.forEach(p=>{const ci=p.y*lvl.w+p.x;freedC.delete(ci);if(!reduced()&&!dotT.has(ci))dotT.set(ci,now)})}lvl={...lvl,snakes:lvl.snakes.filter(s=>s.id!==id)};hud();
 if(!lvl.snakes.length){won=true;clearSave();if(run)boardDone();else{onWin();startWin(sn);setTimeout(showWin,reduced()?200:1100)}}
 else persist()}
function toGrid(x,y){const cx=W/2,cy=H/2,tx=(x-ox-cx)/sc+cx,ty=(y-oy-cy)/sc+cy,cs=Math.min(W/lvl.w,H/lvl.h,MAXCS);
 return[(tx-(W-cs*lvl.w)/2)/cs,(ty-(H-cs*lvl.h)/2)/cs]}
// distance (in cells) the head can travel before its tip actually touches the first obstacle ahead.
// Obstacle snakes are approximated by the same stroked path + arrow outline the renderer draws (cell units).
function snakePts(q,out){const b=q.body,n=b.length,d=q.dir,R=K.CORNER,ah=K.ARROW,c=v=>v+.5,S=Math.sign,rs=K.STROKE/2+.03;
 const seg=(x0,y0,x1,y1,r)=>{const L=Math.hypot(x1-x0,y1-y0),m=Math.max(1,Math.ceil(L/.04));for(let i=0;i<=m;i++)out.push([x0+(x1-x0)*i/m,y0+(y1-y0)*i/m,r])};
 const quad=(x0,y0,cx,cy,x1,y1)=>{for(let i=0;i<=8;i++){const t=i/8,u=1-t;out.push([u*u*x0+2*u*t*cx+t*t*x1,u*u*y0+2*u*t*cy+t*t*y1,rs])}};
 const hx=c(b[0].x),hy=c(b[0].y);let cx,cy;
 if(n===1){seg(hx-d.dx*K.TAIL1,hy-d.dy*K.TAIL1,hx+d.dx*R,hy+d.dy*R,rs)}
 else{cx=c(b[n-1].x);cy=c(b[n-1].y);
  for(let i=n-2;i>=1;i--){const pv=b[i+1],cu=b[i],nx=b[i-1],X=c(cu.x),Y=c(cu.y),x1=X+S(pv.x-cu.x)*R,y1=Y+S(pv.y-cu.y)*R;seg(cx,cy,x1,y1,rs);cx=X+S(nx.x-cu.x)*R;cy=Y+S(nx.y-cu.y)*R;quad(x1,y1,X,Y,cx,cy)}
  const x1=hx+S(b[1].x-b[0].x)*R,y1=hy+S(b[1].y-b[0].y)*R;seg(cx,cy,x1,y1,rs);quad(x1,y1,hx,hy,hx+d.dx*R,hy+d.dy*R)}
 const tx=hx+d.dx*(R+ah*.5),ty=hy+d.dy*(R+ah*.5),a=d.a*Math.PI/180,v=[0,2.094,-2.094].map(o=>[tx+ah*Math.cos(a+o),ty+ah*Math.sin(a+o)]);
 for(let i=0;i<3;i++){const p=v[i],q2=v[(i+1)%3];seg(p[0],p[1],q2[0],q2[1],K.ARROWSTROKE*ah/2+.03)}}
function bumpDist(s){const h=s.body[0],d=s.dir,hx=h.x+.5,hy=h.y+.5,hz=d.dx!==0,pts=[];
 lvl.snakes.forEach(q=>{if(q===s||removal.has(q.id))return;
  if(q.body.some(p=>hz?(Math.abs(p.y-h.y)<=1&&(p.x-h.x)*d.dx>0):(Math.abs(p.x-h.x)<=1&&(p.y-h.y)*d.dy>0)))snakePts(q,pts)});
 const tip=K.CORNER+K.ARROW*1.5+K.ARROWSTROKE*K.ARROW/2;let best=Infinity;
 pts.forEach(([x,y,r])=>{const lat=hz?Math.abs(y-hy):Math.abs(x-hx);if(lat>=r)return;const along=hz?(x-hx)*d.dx:(y-hy)*d.dy;if(along<=0)return;const t=along-Math.sqrt(r*r-lat*lat)-tip;if(t<best)best=t});
 return isFinite(best)?Math.max(.1,best):0}
function startBump(s){const D=reduced()?0:bumpDist(s),h=s.body[0];
 bumps.set(s.id,{t0:performance.now(),D,hx:h.x,hy:h.y,dx:s.dir.dx,dy:s.dir.dy,tf:D?Math.min(360,120+24*D):1,th:D?50:130,tb:D?Math.min(520,190+22*D):1,tr:420})}
function bumpState(b,now){const t=now-b.t0,red=Math.min(1,t/70);
 if(t<b.tf){const u=t/b.tf;return{d:b.D*u*u,red}}
 if(t<b.tf+b.th)return{d:b.D,red:1,hit:t-b.tf};
 const t2=t-b.tf-b.th;if(t2<b.tb){const u=t2/b.tb;return{d:b.D*Math.pow(1-u,3),red:1}}
 const f=(t2-b.tb)/b.tr;return f<1?{d:0,red:1-f}:null}
function activate(s,ob){
 if(ob){if(bumps.has(s.id))return;if(run&&run.type==='ta'){run.time=Math.max(0,run.time-TA_PEN);hud()}
  else if(lives>0){lives--;if(run)run.lives=lives;hud();persist();if(lives<=0)setTimeout(over,700)}startBump(s)}
 else if(!removal.has(s.id))animateRemoval(s.id)}
function onTap(x,y){
 if(loading||lives<=0||entering||won)return;
 const[gx,gy]=toGrid(x,y),los=new LineOfSight(lvl,new Set(removal.keys()));
 const cand=lvl.snakes.map(s=>{const h=s.body[0],dx=h.x+.5+s.dir.dx*K.TAPOFF-gx,dy=h.y+.5+s.dir.dy*K.TAPOFF-gy;return[s,dx*dx+dy*dy]})
  .filter(c=>c[1]<=K.TOL*K.TOL).map(c=>[c[0],c[1],los.blocked(c[0])]).sort((a,b)=>(a[2]-b[2])||(a[1]-b[1]))[0];
 if(cand)activate(cand[0],cand[2])}
function kbdMove(d){if(!lvl||!lvl.snakes.length||loading||entering)return;const o=lvl.snakes.slice().sort((a,b)=>a.body[0].y-b.body[0].y||a.body[0].x-b.body[0].x);let i=o.findIndex(s=>s.id===kSel);i=i<0?(d>0?0:o.length-1):(i+d+o.length)%o.length;kSel=o[i].id;kbdMode=true}
function drawKbd(cs,col){if(!kbdMode||kSel==null)return;const s=lvl.snakes.find(q=>q.id===kSel);if(!s){kSel=null;return}const h=s.body[0],px=(h.x+.5+s.dir.dx*K.TAPOFF)*cs,py=(h.y+.5+s.dir.dy*K.TAPOFF)*cs;
 ctx.save();ctx.globalAlpha=1;ctx.strokeStyle=col.acc;ctx.lineWidth=Math.max(2,cs*.1);ctx.setLineDash([cs*.18,cs*.12]);ctx.beginPath();ctx.arc(px,py,cs*.62,0,6.2832);ctx.stroke();ctx.restore()}
const GOLD='#FFD76A',reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
function startWin(sn){if(reduced()){win=null;return}const h={x:lvl.w/2-.5,y:lvl.h/2-.5},R=Math.max(lvl.w,lvl.h),arrows=[];
 for(let w=0;w<3;w++){const n=w===1?16:12;for(let i=0;i<n;i++)arrows.push({a:i/n*Math.PI*2+w*Math.PI/n+(Math.random()-.5)*.08,delay:w*.16+(i%3)*.025,dist:R*(.5+.18*w+Math.random()*.12),len:1.5+w*.4,c:(i+w)%3})}
 win={t0:performance.now(),x:h.x+.5,y:h.y+.5,arrows}}
function drawWin(now,cs,col){if(!win)return;const GOLD=col.gold;const t=(now-win.t0)/1000;if(t>2.5){win=null;return}
 const ease=u=>1-Math.pow(1-Math.min(1,Math.max(0,u)),3),maxD=Math.hypot(Math.max(win.x,lvl.w-win.x),Math.max(win.y,lvl.h-win.y))+3,f1=ease(t/1.3)*maxD,fade=Math.min(1,Math.max(0,1-(t-1.4)/1.0));
 if(cs*sc>7){const a=occ(),w=lvl.w,h=lvl.h,wl=lvl.walls,r=cs*.12;
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){if(a[y*w+x]||(wl&&wl[x][y]))continue;const d=Math.hypot(x+.5-win.x,y+.5-win.y);
   let m=Math.exp(-((d-f1)*(d-f1))/(2*1.4*1.4));if(d<f1)m=Math.max(m,.4*Math.exp(-(f1-d)/3));m*=fade;if(m<.03)continue;
   ctx.fillStyle=mixc(col.bg,m>.65?GOLD:col.acc,Math.min(1,.2+m));ctx.beginPath();ctx.arc((x+.5)*cs,(y+.5)*cs,r*(1+1.6*m),0,6.2832);ctx.fill()}}
 ctx.save();ctx.lineCap='round';ctx.lineJoin='round';
 if(f1>.2){ctx.globalAlpha=.5*fade;ctx.strokeStyle=GOLD;ctx.lineWidth=Math.max(1.5,cs*.08);ctx.beginPath();ctx.arc(win.x*cs,win.y*cs,f1*cs,0,6.2832);ctx.stroke()}
 const cols=[GOLD,col.acc,col.snake],lw=Math.max(2/sc,cs*.17),hs=Math.max(4/sc,cs*.34);
 win.arrows.forEach(ar=>{const u=(t-ar.delay)/1.05;if(u<=0||u>=1)return;const e=ease(u),dx=Math.cos(ar.a),dy=Math.sin(ar.a),px=(win.x+dx*ar.dist*e)*cs,py=(win.y+dy*ar.dist*e)*cs,L=ar.len*cs*(1-.45*u),al=u<.65?1:(1-u)/.35,c=cols[ar.c];
  ctx.strokeStyle=c;ctx.fillStyle=c;ctx.shadowColor=ar.c===0?GOLD:'transparent';ctx.shadowBlur=ar.c===0?cs*.6:0;
  ctx.globalAlpha=.3*al;ctx.lineWidth=lw*.7;ctx.beginPath();ctx.moveTo(px-dx*L*2.2,py-dy*L*2.2);ctx.lineTo(px-dx*hs,py-dy*hs);ctx.stroke();
  ctx.globalAlpha=al;ctx.lineWidth=lw;ctx.beginPath();ctx.moveTo(px-dx*L,py-dy*L);ctx.lineTo(px-dx*hs,py-dy*hs);ctx.stroke();
  ctx.beginPath();ctx.moveTo(px,py);ctx.lineTo(px-dx*hs*1.5+dy*hs*.85,py-dy*hs*1.5-dx*hs*.85);ctx.lineTo(px-dx*hs*1.5-dy*hs*.85,py-dy*hs*1.5+dx*hs*.85);ctx.closePath();ctx.fill()});
 ctx.restore()}
function showWin(){$('winOv').hidden=false;const w=winInfo;if(!w||!w.xp||reduced())return;const el=$('winXp'),t0=performance.now()+900,dur=650;
 const tick=n=>{const u=Math.min(1,Math.max(0,(n-t0)/dur));el.textContent=tt('xp_gain',{n:nf(Math.round(w.xp*u))})+w.promo;if(u<1&&!$('winOv').hidden)requestAnimationFrame(tick)};requestAnimationFrame(tick)}
// ---- rendering ----
const sg=Math.sign;
let occC={l:null,g:null};
function occ(){if(occC.l!==lvl){const a=new Uint8Array(lvl.w*lvl.h);lvl.snakes.forEach(s=>s.body.forEach(p=>a[p.y*lvl.w+p.x]=1));occC={l:lvl,g:a}}return occC.g}
const POP_MS=440,POP_PEAK=2.1;
function drawDots(cs,col,now){const a=occ(),w=lvl.w,h=lvl.h,wl=lvl.walls,r=cs*.12,e=v=>v*v*(3-2*v),pops=[];ctx.globalAlpha=1;ctx.fillStyle=col.dot;ctx.beginPath();
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){const i=y*w+x;if((a[i]&&!freedC.has(i))||(wl&&wl[x][y]))continue;const t0=dotT.get(i);let k=1;
  if(t0!==undefined){const u=(now-t0)/POP_MS;if(u<0)continue;if(u>=1)dotT.delete(i);else{k=u<.4?e(u/.4)*POP_PEAK:POP_PEAK-(POP_PEAK-1)*e((u-.4)/.6);if(k>1.02)pops.push([x,y,k])}}
  const cx=(x+.5)*cs,cy=(y+.5)*cs;ctx.moveTo(cx+r*k,cy);ctx.arc(cx,cy,r*k,0,6.2832)}ctx.fill();
 if(pops.length){ctx.fillStyle=col.acc;pops.forEach(([x,y,k])=>{ctx.globalAlpha=Math.min(.85,(k-1)/(POP_PEAK-1)*.85);ctx.beginPath();ctx.arc((x+.5)*cs,(y+.5)*cs,r*k,0,6.2832);ctx.fill()});ctx.globalAlpha=1}}
function draw(now){requestAnimationFrame(draw);ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,W,H);
 if(guideT){const k=Math.min(1,(now-guideT)/K.GUIDE_MS);guideA=guideFrom+(guideTo-guideFrom)*k;if(k>=1)guideT=0}
 if(lvl&&!loading){const col=theme(),cs=Math.min(W/lvl.w,H/lvl.h,MAXCS),bw=cs*lvl.w,bh=cs*lvl.h,L=(W-bw)/2,T=(H-bh)/2;
  const m={cs,sw:cs*K.STROKE*(P.hc?1.35:1),R:cs*K.CORNER,ah:cs*K.ARROW,move:Math.max(W,H)*K.MOVE};
  ctx.save();ctx.translate(W/2+ox,H/2+oy);const bump=win?1+.028*Math.sin(Math.min(1,(now-win.t0)/450)*Math.PI):1;ctx.scale(sc*bump,sc*bump);ctx.translate(-W/2,-H/2);ctx.translate(L,T);
  if(!entering&&cs*sc>7)drawDots(cs,col,now);
  drawWin(now,cs,col);
  if(guideA>0)lvl.snakes.forEach(s=>{if(removal.has(s.id)||entry.has(s.id))return;const h=s.body[0],hx=(h.x+.5)*cs,hy=(h.y+.5)*cs;
   const ex=s.dir.dx>0?W-L:s.dir.dx<0?-L:hx,ey=s.dir.dy>0?H-T:s.dir.dy<0?-T:hy;
   ctx.globalAlpha=K.GUIDE_A*guideA;ctx.strokeStyle=col.acc;ctx.lineWidth=2;ctx.lineCap='round';ctx.setLineDash([10,10]);
   ctx.beginPath();ctx.moveTo(hx,hy);ctx.lineTo(hx+(ex-hx)*guideA,hy+(ey-hy)*guideA);ctx.stroke();ctx.setLineDash([])});
  const pulse=flashId!=null?(()=>{const t=(now-flashStart)%(K.PULSE*2),tr=t<K.PULSE?t/K.PULSE:(K.PULSE*2-t)/K.PULSE;return 1-(1-K.PULSE_MIN)*tr})():1;
  const bs=new Map();bumps.forEach((b,id)=>{const st=bumpState(b,now);if(st)bs.set(id,st);else bumps.delete(id)});
  lvl.snakes.forEach(s=>drawSnake(s,m,col,pulse,bs.get(s.id)));
  bs.forEach((st,id)=>{if(st.hit==null||st.hit>340)return;const b=bumps.get(id),u=st.hit/340;ctx.save();ctx.globalAlpha=.75*(1-u);ctx.strokeStyle=col.bad;ctx.lineWidth=Math.max(1.5,cs*.07);
   ctx.beginPath();ctx.arc((b.hx+.5+b.dx*(b.D+.68))*cs,(b.hy+.5+b.dy*(b.D+.68))*cs,cs*(.12+.6*u),0,6.2832);ctx.stroke();ctx.restore()});
  drawKbd(cs,col);ctx.restore()}
 ctx.globalAlpha=1}
const rgb=h=>[1,3,5].map(i=>parseInt(h.substr(i,2),16));
function mixc(bg,fg,t){const a=rgb(bg),b=rgb(fg);return`rgb(${a.map((v,i)=>Math.round(v+(b[i]-v)*t)).join()})`}
const lerph=(a,b,t)=>{const x=rgb(a),y=rgb(b);return'#'+x.map((v,i)=>Math.round(v+(y[i]-v)*t).toString(16).padStart(2,'0')).join('')};
function drawSnake(s,m,col,pulse,bp){
 const ep=entry.get(s.id);let p,shift,al;
 if(ep!=null){p=1-Math.min(1,Math.max(0,ep));shift=0;al=Math.min(ep*2.5,1)}else{const r=Math.min(1,Math.max(0,removal.get(s.id)||0));p=r;shift=m.move*r;al=1-r}
 let ext=0;if(bp&&ep==null&&!removal.has(s.id)){const nn=s.body.length;shift=bp.d*m.cs;p=nn>1?Math.min(1,bp.d/(nn-1)):0;ext=nn>1?Math.max(0,bp.d-(nn-1)):0}
 const fl=s.id===flashId,ex=!fl&&ep==null&&removal.has(s.id);ctx.globalAlpha=1;const base=bp&&ep==null?lerph(col.snake,col.bad,bp.red):col.snake,colr=mixc(col.bg,fl?col.bad:ex?(P.cb?'#2EC4D6':'#FF9F43'):base,Math.min(1,Math.max(0,fl?al*pulse:al)));
 const b=s.body,n=b.length,d=s.dir,cs=m.cs,R=m.R,c=q=>(q+.5)*cs;
 const hx0=c(b[0].x),hy0=c(b[0].y),bx0=hx0+d.dx*R,by0=hy0+d.dy*R,lx=hx0+d.dx*shift+d.dx*R,ly=hy0+d.dy*shift+d.dy*R;
 ctx.strokeStyle=ctx.fillStyle=colr;ctx.lineWidth=m.sw;ctx.lineCap=ctx.lineJoin='round';
 if(n>1&&ext>0){ctx.beginPath();ctx.moveTo(hx0+d.dx*ext*cs,hy0+d.dy*ext*cs);ctx.lineTo(lx,ly);ctx.stroke()}
 else if(n>1){const tp=(n-1)*(1-p),tf=Math.min(n-1,Math.max(0,Math.floor(tp))),fr=tp-tf;ctx.beginPath();
  if(fr<.001||tf>=n-1)ctx.moveTo(c(b[tf].x),c(b[tf].y));else ctx.moveTo(c(b[tf].x)+(c(b[tf+1].x)-c(b[tf].x))*fr,c(b[tf].y)+(c(b[tf+1].y)-c(b[tf].y))*fr);
  const ls=fr>.001&&tf>=1&&tf<n-1?tf:tf-1;
  for(let i=ls;i>=1;i--){const pv=b[i+1],cu=b[i],nx=b[i-1],X=c(cu.x),Y=c(cu.y);
   ctx.lineTo(X+sg(pv.x-cu.x)*R,Y+sg(pv.y-cu.y)*R);ctx.quadraticCurveTo(X,Y,X+sg(nx.x-cu.x)*R,Y+sg(nx.y-cu.y)*R)}
  ctx.lineTo(hx0+sg(b[1].x-b[0].x)*R,hy0+sg(b[1].y-b[0].y)*R);ctx.quadraticCurveTo(hx0,hy0,bx0,by0);
  if(lx!==bx0||ly!==by0)ctx.lineTo(lx,ly);ctx.stroke()}
 else{const tl=cs*K.TAIL1;ctx.beginPath();ctx.moveTo(lx-d.dx*(tl+R),ly-d.dy*(tl+R));ctx.lineTo(lx,ly);ctx.stroke()}
 if(ep==null){const cx=lx+d.dx*m.ah*.5,cy=ly+d.dy*m.ah*.5,a=d.a*Math.PI/180,r=m.ah;ctx.beginPath();
  ctx.moveTo(cx+r*Math.cos(a),cy+r*Math.sin(a));ctx.lineTo(cx+r*Math.cos(a+2.094),cy+r*Math.sin(a+2.094));ctx.lineTo(cx+r*Math.cos(a-2.094),cy+r*Math.sin(a-2.094));ctx.closePath();
  ctx.fill();ctx.lineWidth=r*K.ARROWSTROKE;ctx.stroke()}}
// ---- input: tap / pan / pinch ----
const ptr=new Map();let moved=false,downAt=null;
cv.addEventListener('pointerdown',e=>{cv.setPointerCapture(e.pointerId);ptr.set(e.pointerId,{x:e.offsetX,y:e.offsetY});if(ptr.size===1){moved=false;downAt={x:e.offsetX,y:e.offsetY}}else moved=true});
cv.addEventListener('pointermove',e=>{const o=ptr.get(e.pointerId);if(!o)return;const n={x:e.offsetX,y:e.offsetY};
 if(ptr.size===1){if(!moved&&Math.hypot(n.x-downAt.x,n.y-downAt.y)<8)return;moved=true;ox+=n.x-o.x;oy+=n.y-o.y}
 else if(ptr.size===2){const[a,b]=[...ptr.entries()].map(([id,v])=>id===e.pointerId?n:v),[a0,b0]=[...ptr.entries()].map(([,v])=>v);
  const d0=Math.hypot(a0.x-b0.x,a0.y-b0.y),d1=Math.hypot(a.x-b.x,a.y-b.y);
  if(d0>0)sc=Math.min(K.MAXS,Math.max(K.MINS,sc*d1/d0));ox+=(a.x+b.x-a0.x-b0.x)/2;oy+=(a.y+b.y-a0.y-b0.y)/2}
 ptr.set(e.pointerId,n)});
const up=e=>{if(ptr.has(e.pointerId)){const wasTap=!moved&&ptr.size===1&&e.type==='pointerup';ptr.delete(e.pointerId);if(wasTap)onTap(e.offsetX,e.offsetY)}};
cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up);
cv.addEventListener('wheel',e=>{e.preventDefault();sc=Math.min(K.MAXS,Math.max(K.MINS,sc*(e.deltaY<0?1.1:1/1.1)))},{passive:false});
// ================= i18n, pages and meta-game features =================
const nf=n=>P.lang==='fa'?Number(n).toLocaleString('fa-IR',{useGrouping:false}):String(n);
const tt=(k,v)=>{let s=(I18N[P.lang]&&I18N[P.lang][k])||I18N.en[k]||k;if(v)for(const x in v)s=s.replace('{'+x+'}',v[x]);return s};
const loc=()=>P.lang==='fa'?'fa-IR':'en-US';
const noon=(d=new Date())=>new Date(d.getFullYear(),d.getMonth(),d.getDate(),12);
const dayKey=(d=new Date())=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
const fromKey=k=>{const [y,m,d]=k.split('-').map(Number);return new Date(y,m-1,d,12)};
const yest=()=>{const d=new Date();d.setDate(d.getDate()-1);return dayKey(d)};
if(!P.installed){P.installed=dayKey();save()}
const CAL=()=>P.lang==='fa'?'persian':'gregory';
const calLoc=()=>loc()+'-u-ca-'+CAL();
const cparts=d=>{const o={};new Intl.DateTimeFormat('en-US-u-ca-'+CAL()+'-nu-latn',{year:'numeric',month:'numeric',day:'numeric'}).formatToParts(d).forEach(p=>{if(p.type==='month'||p.type==='day')o[p.type]=parseInt(p.value,10)});return o};
function monthStart(d){const x=noon(d);while(cparts(x).day>1)x.setDate(x.getDate()-1);return x}
function monthDays(s){const m=cparts(s).month,out=[],x=new Date(s);while(cparts(x).month===m){out.push(new Date(x));x.setDate(x.getDate()+1)}return out}
function addMonth(s,n){const x=new Date(s);x.setDate(x.getDate()+(n>0?32:-1));return monthStart(x)}
let chView=null,chSel=null;
const streakNow=()=>(P.lastDay===dayKey()||P.lastDay===yest())?(P.streak||0):0;
function touchStreak(){const k=dayKey();if(P.lastDay===k)return;P.streak=P.lastDay===yest()?(P.streak||0)+1:1;P.lastDay=k;P.stats.bestStreak=Math.max(P.stats.bestStreak||0,P.streak)}
const TIERS=[{id:'bronze',xp:0},{id:'silver',xp:200},{id:'gold',xp:600},{id:'platinum',xp:1400},{id:'diamond',xp:3000}];
function tierOf(xp){let i=0;TIERS.forEach((x,k)=>{if(xp>=x.xp)i=k});return{...TIERS[i],i,next:TIERS[i+1]||null}}
const IC={home:'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',cal:'M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM7 12h5v5H7z',
 stars:'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z',gen:'M3 3h8v8H3zm10 0h8v8h-8zM3 13h8v8H3zm13 0h2v3h3v2h-3v3h-2v-3h-3v-2h3z',
 gear:'M19.14 12.94a7.07 7.07 0 000-1.88l2.03-1.58-1.92-3.32-2.39.96a7 7 0 00-1.62-.94L14.9 3h-3.84l-.36 2.55c-.58.23-1.12.54-1.62.94l-2.39-.96-1.92 3.32 2.03 1.58a7.07 7.07 0 000 1.88l-2.03 1.58 1.92 3.32 2.39-.96c.5.4 1.04.71 1.62.94l.36 2.55h3.84l.36-2.55c.58-.23 1.12-.54 1.62-.94l2.39.96 1.92-3.32zM13 15.5A3.5 3.5 0 1113 8.5a3.5 3.5 0 010 7z',
 flame:'M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z',
 back:'M16 5v14L6 12z',restart:'M17.65 6.35A7.96 7.96 0 0012 4a8 8 0 108 8h-2a6 6 0 11-1.76-4.24L13 11h7V4z',
 shuffle:'M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z',
 bulb:'M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z',
 fit:'M5 15H3v4c0 1.1.9 2 2 2h4v-2H5v-4zM5 5h4V3H5c-1.1 0-2 .9-2 2v4h2V5zm14-2h-4v2h4v4h2V5c0-1.1-.9-2-2-2zm0 16h-4v2h4c1.1 0 2-.9 2-2v-4h-2v4z',
 hash:'M20 10V8h-4V4h-2v4h-4V4H8v4H4v2h4v4H4v2h4v4h2v-4h4v4h2v-4h4v-2h-4v-4h4zm-6 4h-4v-4h4v4z',check:'M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z',
 lock:'M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6z'};
const ic=d=>`<svg class="ic" viewBox="0 0 24 24"><path d="${d}"/></svg>`;
const shield=(id,lk)=>`<svg viewBox="0 0 24 24"${lk?' style="filter:grayscale(1);opacity:.4"':''}><path d="M12 2.2l8 3v6.1c0 5-3.3 9.2-8 10.6-4.7-1.4-8-5.6-8-10.6V5.2z" fill="url(#sh-${id})"/><path d="M12 4.4l5.8 2.2v4.7c0 3.7-2.3 6.8-5.8 8-3.5-1.2-5.8-4.3-5.8-8V6.6z" fill="#fff" fill-opacity=".2"/></svg>`;
const cup=on=>`<svg viewBox="0 0 24 24" style="color:${on?'var(--gold)':'var(--btnfg)'};opacity:${on?1:.45}"><path fill="currentColor" d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/></svg>`;
IC.fwd='M8 5v14l10-7z';
Object.assign(IC,{dots:'M4 4h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 10h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 16h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z',undo:'M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z',timer:'M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42C16.07 4.74 14.12 4 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z',inf:'M18.6 6.62c-1.44 0-2.8.56-3.77 1.53L12 10.66 10.48 12h.01L7.8 14.39c-.64.64-1.49.99-2.4.99-1.87 0-3.39-1.51-3.39-3.38S3.53 8.62 5.4 8.62c.91 0 1.76.35 2.44 1.03l1.13 1 1.51-1.34L9.22 8.2C8.2 7.18 6.84 6.62 5.4 6.62 2.42 6.62 0 9.04 0 12s2.42 5.38 5.4 5.38c1.44 0 2.8-.56 3.77-1.53l2.83-2.5.01.01L13.52 12h-.01l2.69-2.39c.64-.64 1.49-.99 2.4-.99 1.87 0 3.39 1.51 3.39 3.38s-1.52 3.38-3.39 3.38c-.9 0-1.76-.35-2.44-1.03l-1.14-1.01-1.51 1.34 1.27 1.12c1.02 1.01 2.37 1.57 3.82 1.57 2.98 0 5.4-2.41 5.4-5.38s-2.42-5.37-5.4-5.37z'});
const starSvg=on=>`<svg viewBox="0 0 24 24" class="st${on?' on':''}"><path d="${IC.stars}"/></svg>`;
const starsHtml=n=>[1,2,3].map(i=>starSvg(i<=n)).join('');
document.querySelectorAll('[data-ic]').forEach(e=>e.outerHTML=ic(IC[e.dataset.ic]));
// ---- toast, achievements, share
let toastT=0;function toast(m,ms=1800){const e=$('toast');e.textContent=m;e.hidden=false;clearTimeout(toastT);toastT=setTimeout(()=>e.hidden=true,ms)}
const ACH=[['first',s=>s.cleared>=1],['ten',s=>s.cleared>=10],['fifty',s=>s.cleared>=50],['flawless',s=>s.perfect>=1],['perfect10',s=>s.perfect>=10],['pure',s=>s.pure>=1],['close',s=>s.close>=1],['streak3',s=>s.bestStreak>=3],['streak7',s=>s.bestStreak>=7],['streak30',s=>s.bestStreak>=30],
 ['daily10',()=>Object.keys(P.daily).length>=10],['month',s=>s.months>=1],['shapes5',()=>Object.keys(P.shapes).length>=5],['shapes25',()=>Object.keys(P.shapes).length>=25],['shapes19',()=>Object.keys(P.shapes).length>=50],['gold',()=>(P.xp||0)>=600],['diamond',()=>(P.xp||0)>=3000],['big',s=>s.big>=1],['ta10',s=>s.taBest>=10],['end15',s=>s.endBest>=15]];
function checkAch(){const out=[];ACH.forEach(([id,f])=>{if(!P.ach[id]&&f(P.stats)){P.ach[id]=Date.now();out.push(id)}});return out}
function shareText(){const w=lastWin;if(!w)return'';const url=/^https?:/.test(location.protocol)?'\n'+location.origin+location.pathname:'';
 const head=w.kind==='daily'?tt('sh_day',{d:fromKey(w.day).toLocaleDateString(calLoc(),{month:'long',day:'numeric'})}):tt('sh_level',{n:nf(w.n)});
 return'Arrow Zen · '+head+'\n'+'★'.repeat(w.stars)+'☆'.repeat(3-w.stars)+' '+'♥'.repeat(w.lives)+'♡'.repeat(w.maxLives-w.lives)+url}
async function shareOut(text){if(!text)return;try{if(navigator.share){await navigator.share({text});return}}catch(e){if(e&&e.name==='AbortError')return}
 try{await navigator.clipboard.writeText(text);toast(tt('copied'))}catch{toast(text,3500)}}
// ---- win bookkeeping
function onWin(){const before=tierOf(P.xp||0),lost=maxLives-lives,stars=lost<=0?3:lost===1?2:1,S=P.stats,camp=!custom||!!custom.replay,n=custom&&custom.replay?custom.replay:P.level;let xp=0;
 S.cleared++;if(camp&&stars===3&&(P.stars[n]||0)<3)S.perfect++;if(HINTS-hintsLeft===0&&UNDOS-undosLeft===0)S.pure++;if(lives===1&&maxLives>=3)S.close++;if(custom&&custom.w&&(custom.w>=50||custom.h>=50))S.big++;
 if(camp)P.stars[n]=Math.max(P.stars[n]||0,stars);
 if(custom&&custom.daily){if(!P.daily[custom.day]){P.daily[custom.day]=1;xp=25;const ms=monthStart(fromKey(custom.day));if(monthDays(ms).every(d=>P.daily[dayKey(d)]))S.months++}}
 else if(!custom){P.level++;xp=10}
 P.xp=(P.xp||0)+xp;touchStreak();if(curShape&&SHAPES.includes(curShape))P.shapes[curShape]=1;const un=checkAch();save();
 lastWin={kind:custom&&custom.daily?'daily':camp?'level':'custom',n,day:custom&&custom.day,stars,lives,maxLives};
 const after=tierOf(P.xp),el=$('winXp');const promo=after.i>before.i?(xp?'  ·  ':'')+tt('promoted',{t:tt('tier_'+after.id)}):'';winInfo={xp,promo};el.textContent=(xp?tt('xp_gain',{n:nf(xp)}):'')+promo;el.hidden=!el.textContent;
 $('winStars').innerHTML=starsHtml(stars);$('winAch').innerHTML=un.length?`<div class="achh">${tt('ach_new')}</div>`+un.map(i=>`<div>★ ${tt('ach_'+i)}</div>`).join(''):'';$('shareBtn').hidden=lastWin.kind==='custom';chDot()}
const chDot=()=>{$('chDot').hidden=!!P.daily[dayKey()]};
const unlockedMonths=()=>{const a=monthStart(fromKey(P.installed)),b=monthStart(noon());return[a,b]};
// ---- pages
const PAGES=['home','league','levels','challenge','collection','custom','settings'];let coView='shapes';let curPage='home';
function hidePages(){PAGES.forEach(x=>$(x).hidden=true);$('nav').hidden=true}
function show(p,keep){if(run)stopRun();curPage=p;if(p==='challenge'&&!keep){chView=monthStart(noon());chSel=dayKey()}$('game').hidden=true;PAGES.forEach(x=>$(x).hidden=x!==p);$('nav').hidden=false;
 [...$('nav').children].forEach(b=>b.classList.toggle('on',b.dataset.p===(p==='league'||p==='levels'?'home':p)));theme();chDot();(RENDER[p]||(()=>{}))()}
const RENDER={
 home(){const s=streakNow(),tr=tierOf(P.xp||0),done=!!P.daily[dayKey()],d=levelDiff(P.level);$('streakN').textContent=nf(s);$('streakChip').classList.toggle('on',s>0);
  $('lvTxt').textContent=nf(P.level);$('homeDiff').textContent=tt('diff_'+d.k);$('homeDiff').style.color=dcol(d.c);$('playBtn').textContent=readSave()?tt('cont'):tt('play');
  $('leagueIc').innerHTML=shield(tr.id);$('leagueName').textContent=tt('tier_'+tr.id);
  $('chDate').textContent=new Date().toLocaleDateString(calLoc(),{month:'long',day:'numeric'});$('chIc').innerHTML=cup(done);$('chBtn').textContent=done?tt('done'):tt('play');$('chCard').classList.toggle('done',done);$('taBest').textContent=tt('mode_best',{n:nf(P.stats.taBest)});$('endBest').textContent=tt('mode_best',{n:nf(P.stats.endBest)})},
 levels(){const top=P.level,tot=Object.values(P.stars).reduce((a,b)=>a+b,0);$('lvSum').textContent=tt('lv_sum',{a:nf(tot),b:nf((top-1)*3)});
  $('lvTiers').innerHTML=DIFF_WIN.slice(0,-1).map((lo,k)=>{const hi=DIFF_WIN[k+1]-1,a=DIFF[k],b=DIFF[k+1];return`<span class="tier${P.level>=lo&&P.level<=hi?' cur':''}"><i style="background:${a[1]}"></i><i style="background:${b[1]}"></i>${nf(lo)}–${nf(hi)} · ${tt('diff_'+a[0])} / ${tt('diff_'+b[0])}</span>`}).join('')+`<span class="tier${P.level>=DIFF_WIN[7]?' cur':''}"><i style="background:${DIFF[7][1]}"></i>${nf(DIFF_WIN[7])}+ · ${tt('diff_mythic')}</span>`;
  $('lvGrid').innerHTML=Array.from({length:top+3},(_,i)=>{const n=i+1,lk=n>top;return`<button class="lv${n===top?' cur':''}${lk?' lk':''}" style="--c:${levelDiff(n).c}" data-n="${n}"${lk?' disabled':''}><b>${nf(n)}</b><span>${lk?ic(IC.lock).replace('class="ic"','class="ic lk"'):starsHtml(P.stars[n]||0)}</span></button>`}).join('')},
 league(){const xp=P.xp||0,tr=tierOf(xp);$('lgIc').innerHTML=shield(tr.id);$('lgName').textContent=tt('tier_'+tr.id);$('lgTotal').textContent=tt('lg_total',{n:nf(xp)});
  const nx=tr.next;$('lgBar').style.width=(nx?(xp-tr.xp)/(nx.xp-tr.xp)*100:100)+'%';$('lgXp').textContent=nx?tt('lg_xp',{a:nf(xp-tr.xp),b:nf(nx.xp-tr.xp)}):tt('lg_max');
  $('ladder').innerHTML=TIERS.map((x,i)=>`<div class="row${i===tr.i?' cur':''}${i>tr.i?' lk':''}">${shield(x.id)}<b>${tt('tier_'+x.id)}</b><span class="note">${nf(x.xp)} ${P.lang==='fa'?'امتیاز':'XP'}</span></div>`).join('')},
 challenge(){if(!chView){chView=monthStart(noon());chSel=dayKey()}
  const today=noon(),tk=dayKey(today),days=monthDays(chView),[lo,hi]=unlockedMonths(),done=days.filter(d=>P.daily[dayKey(d)]).length,total=days.length;
  $('mTitle').textContent=chView.toLocaleDateString(calLoc(),{month:'long',year:'numeric'});$('mDone').textContent=nf(done);$('mTotal').textContent=nf(total);
  $('mFill').style.width='calc(36px + (100% - 36px) * '+(done/total)+')';$('mDone').style.left='calc((100% - 36px) * '+(done/total)+')';$('chBigIc').innerHTML=cup(done===total);
  $('mPrev').disabled=chView.getTime()<=lo.getTime();$('mNext').disabled=chView.getTime()>=hi.getTime();
  const ws=P.lang==='fa'?6:1,hdr=Array.from({length:7},(_,i)=>{const s=new Date(2024,0,7+((ws+i)%7),12).toLocaleDateString(loc(),{weekday:P.lang==='fa'?'narrow':'short'});return`<div class="wd">${P.lang==='fa'?s:s.slice(0,2)}</div>`}).join('');
  const lead=(days[0].getDay()-ws+7)%7;
  $('cal').innerHTML=hdr+'<i></i>'.repeat(lead)+days.map(d=>{const k=dayKey(d),dn=!!P.daily[k],fut=k>tk,isT=k===tk;
   return`<button class="day${dn?' done':''}${isT&&!dn?' tdy':''}${!dn&&!isT&&!fut?' past':''}${fut?' fut':''}${k===chSel?' sel':''}" data-k="${k}"${fut?' disabled':''}>${nf(cparts(d).day)}</button>`}).join('');
  const sd=fromKey(chSel);$('chPlay').textContent=P.daily[chSel]?tt('again'):tt('play');
  $('chStats').textContent=tt('ch_sel',{d:sd.toLocaleDateString(calLoc(),{month:'long',day:'numeric'})})+' · '+tt('ch_streak',{n:nf(streakNow())})},
 collection(){[...$('coTabs').children].forEach(b=>b.classList.toggle('on',b.dataset.v===coView));$('coShapes').hidden=coView!=='shapes';$('coAch').hidden=coView!=='ach';
  const got=SHAPES.filter(n=>P.shapes[n]).length;$('coCount').textContent=tt('co_count',{a:nf(got),b:nf(SHAPES.length)});
  $('grid').innerHTML=SHAPES.map(n=>`<div class="tile${P.shapes[n]?'':' lock'}"><img src="assets/shapes/${n}.png" alt="${n}">${P.shapes[n]?'':ic(IC.lock).replace('class="ic"','class="ic lk"')}</div>`).join('');
  $('coTroph').textContent=tt('co_trophies',{n:nf(Object.keys(P.daily).length)});
  $('achCount').textContent=tt('ach_count',{a:nf(ACH.filter(a=>P.ach[a[0]]).length),b:nf(ACH.length)});
  $('achList').innerHTML=ACH.map(([id])=>{const on=!!P.ach[id];return`<div class="row${on?'':' lk'}">${cup(on)}<b style="text-align:start"><span>${tt('ach_'+id)}</span><small>${tt('acd_'+id)}</small></b></div>`}).join('')},
 custom(){const lk=P.level<K.GEN_UNLOCK;$('lockNote').hidden=!lk;$('genBtn').disabled=lk;syncSliders()},
 settings(){syncSet()}};
// ---- settings
const renderTheme=()=>{$('themeRow').innerHTML=Object.keys(THEMES).map(k=>{const t=THEMES[k],dot=t.dot||mixc(t.bg,t.snake,.18);
 const dots=[0,1,2].map(r=>[0,1,2,3,4].map(c=>`<circle cx="${12+c*17}" cy="${14+r*16}" r="2.6" fill="${dot}"/>`).join('')).join('');
 const svg=`<svg viewBox="0 0 120 76" aria-hidden="true"><rect x=".5" y=".5" width="119" height="75" rx="10" fill="${t.bg}" stroke="${t.fg}" stroke-opacity=".22"/>${dots}<path d="M14 60H58a11 11 0 0 0 11-11V32" fill="none" stroke="${t.snake}" stroke-width="7" stroke-linecap="round"/><path d="M69 17l10 15H59z" fill="${t.snake}" stroke="${t.snake}" stroke-width="3" stroke-linejoin="round"/><rect x="78" y="42" width="34" height="26" rx="7" fill="${t.card}"/><rect x="82" y="47" width="26" height="7" rx="3.5" fill="${t.btn}"/><rect x="82" y="58" width="26" height="7" rx="3.5" fill="${t.acc}"/></svg>`;
 return`<button class="thm" data-t="${k}" aria-label="${tt('th_'+k)}">${svg}<span>${tt('th_'+k)}</span><i class="ck">${ic(IC.check)}</i></button>`}).join('')};
const syncSet=()=>{[...$('themeRow').children].forEach(b=>b.classList.toggle('on',b.dataset.t===P.theme));[...$('speedSel').children].forEach(b=>b.classList.toggle('on',b.dataset.v===P.speed));[...$('langSel').children].forEach(b=>b.classList.toggle('on',b.dataset.v===P.lang))};
function applyLang(){const d=document.documentElement;d.lang=P.lang;d.dir=P.lang==='fa'?'rtl':'ltr';document.title=tt('title');
 document.querySelectorAll('[data-i]').forEach(e=>e.textContent=tt(e.dataset.i));document.querySelectorAll('[data-ia]').forEach(e=>{e.title=tt(e.dataset.ia);e.setAttribute('aria-label',tt(e.dataset.ia))});
 renderTheme();syncSet();syncSliders();if(lvl&&!$('game').hidden)hud();if($('game').hidden)(RENDER[curPage]||(()=>{}))()}
$('themeRow').onclick=e=>{const b=e.target.closest('button');if(!b)return;P.theme=b.dataset.t;save();theme();syncSet()};
$('speedSel').onclick=e=>{const b=e.target.closest('button');if(!b)return;P.speed=b.dataset.v;save();syncSet()};
$('langSel').onclick=e=>{const b=e.target.closest('button');if(!b)return;P.lang=b.dataset.v;save();applyLang()};
$('fillChk').checked=P.fill;$('cbChk').checked=P.cb;$('hcChk').checked=P.hc;
$('cbChk').onchange=e=>{P.cb=e.target.checked;save();theme()};$('hcChk').onchange=e=>{P.hc=e.target.checked;save();theme()};
$('fillChk').onchange=e=>{P.fill=e.target.checked;save();syncSliders()};
$('nav').onclick=e=>{const b=e.target.closest('button');if(b)show(b.dataset.p)};
// ---- generator page
let cShape=null;
function syncSliders(){const mx=P.fill?K.MAXFILL:K.GEN_MAX;['cw','ch'].forEach(id=>{const e=$(id);e.min=K.GEN_MIN;e.max=mx;if(+e.value>mx)e.value=mx;$(id+'V').textContent=nf(e.value)});$('genCells').textContent=tt('gen_cells',{n:nf($('cw').value*$('ch').value)})}
$('shapes').innerHTML=['',...SHAPES].map(n=>`<button data-s="${n}" class="${n?'':'on'}">${n?`<img src="assets/shapes/${n}.png" alt="${n}">`:'▭'}</button>`).join('');
$('shapes').onclick=e=>{const b=e.target.closest('button');if(!b)return;cShape=b.dataset.s||null;[...$('shapes').children].forEach(x=>x.classList.toggle('on',x===b))};
['cw','ch'].forEach(id=>$(id).oninput=syncSliders);
$('genBtn').onclick=()=>{if(readSave()&&!confirm(tt('confirm_discard')))return;newLevel({w:+$('cw').value,h:+$('ch').value,shape:cShape})};
// ---- daily / league / game buttons
function startDaily(k){k=k||dayKey();const sv=readSave();if(sv&&sv.custom&&sv.custom.daily&&sv.custom.day===k)return play();if(sv&&!confirm(tt('confirm_discard')))return;newLevel({daily:true,day:k})}
$('chBtn').onclick=()=>P.daily[dayKey()]?show('challenge'):startDaily(dayKey());$('chPlay').onclick=()=>startDaily(chSel);
$('cal').onclick=e=>{const b=e.target.closest('button.day');if(!b||b.disabled)return;chSel=b.dataset.k;RENDER.challenge()};
const moveMonth=n=>{chView=addMonth(chView,n);const hi=unlockedMonths()[1],tk=dayKey(noon());chSel=chView.getTime()===hi.getTime()?tk:dayKey(monthDays(chView).slice(-1)[0]);RENDER.challenge()};
$('mPrev').onclick=()=>moveMonth(-1);$('mNext').onclick=()=>moveMonth(1);$('leagueBtn').onclick=()=>show('league');
$('playBtn').onclick=play;$('backBtn').onclick=()=>show('home');$('restartBtn').onclick=restart;$('regenBtn').onclick=()=>newLevel(custom);$('hintBtn').onclick=hint;$('undoBtn').onclick=undo;$('retryBtn').onclick=()=>run?startRun(run.type):restart();
$('lvlBtn').onclick=()=>show('levels');$('taBtn').onclick=()=>startRun('ta');$('endBtn').onclick=()=>startRun('endless');
$('coTabs').onclick=e=>{const b=e.target.closest('button');if(!b)return;coView=b.dataset.v;RENDER.collection()};
$('shareBtn').onclick=()=>shareOut(shareText());
$('lvGrid').onclick=e=>{const b=e.target.closest('button.lv');if(!b||b.disabled)return;const n=+b.dataset.n,sv=readSave();
 if(n===P.level){if(sv&&!sv.custom)return play();if(sv&&!confirm(tt('confirm_discard')))return;return newLevel()}
 if(sv&&!confirm(tt('confirm_discard')))return;newLevel({replay:n})};
let deferredInstall=null;addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredInstall=e;$('instRow').hidden=false});addEventListener('appinstalled',()=>$('instRow').hidden=true);
$('instBtn').onclick=async()=>{if(!deferredInstall)return;deferredInstall.prompt();try{await deferredInstall.userChoice}catch{}deferredInstall=null;$('instRow').hidden=true};
$('nextBtn').onclick=()=>{$('winOv').hidden=true;custom?(custom.daily?show('challenge',true):custom.replay?show('levels'):show('home')):newLevel()};
$('resetBtn').onclick=resetView;$('guideBtn').onclick=()=>{guide=!guide;guideFrom=guideA;guideTo=guide?1:0;guideT=performance.now()};
addEventListener('resize',resize);addEventListener('keydown',e=>{if(e.key==='Tab')document.documentElement.classList.add('kbd');if($('game').hidden)return;const k=e.key.toLowerCase();
 if(k==='h')hint();else if(k==='u')undo();else if(k==='r')restart();else if(k==='escape')show('home');
 else if(k.startsWith('arrow')){e.preventDefault();kbdMove(k==='arrowleft'||k==='arrowup'?-1:1)}
 else if((k==='enter'||k===' ')&&kbdMode&&kSel!=null&&(!document.activeElement||document.activeElement===document.body)){e.preventDefault();const s=lvl.snakes.find(q=>q.id===kSel);if(s&&!loading&&lives>0&&!entering&&!won)activate(s,new LineOfSight(lvl,new Set(removal.keys())).blocked(s))}});
addEventListener('pointerdown',()=>{document.documentElement.classList.remove('kbd');kbdMode=false},true);
theme();applyLang();show('home');resize();requestAnimationFrame(draw);
if('serviceWorker' in navigator&&/^https?:/.test(location.protocol))addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
})();
