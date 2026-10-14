// Arrow Zen: level generator, line of sight and solvability. Derived from robmat/arrows_game (GPL-3.0).
const K={LIVES:3,FLASH_MS:3000,PULSE:250,PULSE_MIN:.2,REM:{High:300,Medium:600,Low:900},FRAME:16,ENTRY:450,STAGGER:50,MAXSTAG:1500,
MINS:.2,MAXS:6,DEFS:.94,TOL:1.3,TAPOFF:.3,STRAIGHT:.9,STROKE:.15,CORNER:.3,ARROW:.2,ARROWSTROKE:.3,MOVE:1.2,TAIL1:.2,GUIDE_A:.4,GUIDE_MS:500,NODECAP:500,FIRST:100,MAXFILL:35,COLOR_T:128,SHAPE_MIN:20,SHAPE_ALWAYS:100,SHAPE_BASE:.5,GEN_UNLOCK:20,GEN_MIN:20,GEN_MAX:100,FILL_MS:8000};
let rnd=Math.random;
function setSeed(s){if(s==null){rnd=Math.random;return}let a=s>>>0;rnd=()=>{a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const DIRS=[{dx:0,dy:-1,a:270},{dx:0,dy:1,a:90},{dx:-1,dy:0,a:180},{dx:1,dy:0,a:0}];
const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=rnd()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
// ---- difficulty tiers: every level belongs to a sliding window of TWO adjacent tiers, picked pseudo-randomly (but always the same for a given level)
const DIFF_WIN=[1,16,36,61,91,131,181,251];
const TIER_CFG=[{s:[5,8],l:[4,7],lives:3},{s:[7,12],l:[6,10],lives:3},{s:[10,16],l:[9,16],lives:2},{s:[14,22],l:[14,24],lives:2},{s:[18,28],l:[20,34],lives:1},{s:[24,34],l:[28,45],lives:1},{s:[30,40],l:[40,60],lives:1},{s:[36,40],l:[50,60],lives:1}];
function h01(n,salt=0){let a=(Math.imul(n+1,2654435761)^Math.imul(salt+7,40503))>>>0;a=Math.imul(a^(a>>>15),2246822519)>>>0;a=Math.imul(a^(a>>>13),3266489917)>>>0;return((a^(a>>>16))>>>0)/4294967296}
function levelTier(n){n=Math.max(1,n|0);let k=0;while(k<DIFF_WIN.length-1&&n>=DIFF_WIN[k+1])k++;if(k>=DIFF_WIN.length-1)return DIFF_WIN.length-1;if(n===1)return 0;
 const prog=(n-DIFF_WIN[k])/(DIFF_WIN[k+1]-DIFF_WIN[k]);return h01(n)<.25+.55*prog?k+1:k}
function levelConfig(n,fw,fh){const t=levelTier(n),c=TIER_CFG[t],a=DIFF_WIN[Math.max(0,t-1)],b=t>=DIFF_WIN.length-1?a+200:DIFF_WIN[Math.min(DIFF_WIN.length-1,t+1)],f=Math.min(1,Math.max(0,(n-a)/(b-a))),cl=(v,lo,hi)=>Math.max(lo,Math.min(hi,v));
 const sz=cl(Math.round(c.s[0]+(c.s[1]-c.s[0])*f+(h01(n,3)-.5)*2),c.s[0],c.s[1]),dh=h01(n,5)<.35?-1:h01(n,5)>.7?1:0;
 return{w:fw||Math.min(40,sz),h:fh||Math.min(40,cl(sz+dh,c.s[0]-1,c.s[1])),maxLen:Math.min(60,cl(Math.round(c.l[0]+(c.l[1]-c.l[0])*f+(h01(n,6)-.5)*2),c.l[0],c.l[1])),lives:c.lives,tier:t}}
function generate(w,h,maxLen,walls,fill,onProg){
 const given=walls||null;walls=walls||Array.from({length:w},()=>new Array(h).fill(false));
 const occ=Array.from({length:w},()=>new Array(h).fill(false)),snakes=[],front=new Map();let ids=0,filled=0,valid=0;
 walls.forEach(c=>c.forEach(v=>{if(!v)valid++}));
 const inside=(x,y)=>x>=0&&y>=0&&x<w&&y<h, free=(x,y)=>inside(x,y)&&!occ[x][y]&&!walls[x][y];
 const clear=(x,y,d)=>{let cx=x+d.dx,cy=y+d.dy;while(inside(cx,cy)){if(occ[cx][cy])return false;cx+=d.dx;cy+=d.dy}return true};
 const nextTo=(x,y,body)=>{for(let dx=-1;dx<=1;dx++)for(let dy=-1;dy<=1;dy++){if(!dx&&!dy)continue;const nx=x+dx,ny=y+dy;
  if(inside(nx,ny)&&occ[nx][ny])return true;
  for(let i=0;i<body.length-1;i++)if(body[i].x===nx&&body[i].y===ny)return true}return false};
 function build(head,dir,useCrit){
  const forb=new Set();let cx=head.x+dir.dx,cy=head.y+dir.dy;while(inside(cx,cy)){forb.add(cx+','+cy);cx+=dir.dx;cy+=dir.dy}
  const body=[head],bset=new Set([head.x+','+head.y]);let nodes=0;
  const can=(x,y)=>inside(x,y)&&!forb.has(x+','+y)&&!bset.has(x+','+y)&&!walls[x][y]&&!occ[x][y]&&(!useCrit||nextTo(x,y,body));
  function rec(prev){
   if(body.length>=maxLen||++nodes>K.NODECAP)return body.slice();
   const t=body[body.length-1],poss=shuffle(DIRS.slice()).filter(d=>can(t.x+d.dx,t.y+d.dy));
   if(!poss.length)return body.slice();
   const ord=prev&&poss.includes(prev)&&rnd()<K.STRAIGHT?[prev,...poss.filter(d=>d!==prev)]:poss;
   let best=body.slice();
   for(const d of ord){const p={x:t.x+d.dx,y:t.y+d.dy},k=p.x+','+p.y;body.push(p);bset.add(k);
    const c=rec(d);body.pop();bset.delete(k);if(c.length>=maxLen)return c;if(c.length>best.length)best=c}
   return best}
  return{id:++ids,body:rec(null),dir}}
 const prog=()=>onProg&&onProg(valid?Math.min(1,filled/valid):1);
 function add(s,noFront){snakes.push(s);filled+=s.body.length;s.body.forEach(p=>{occ[p.x][p.y]=true;DIRS.forEach((_,i)=>front.delete(p.x+','+p.y+','+i))});
  if(!noFront)s.body.forEach(seg=>DIRS.forEach(d=>{const nx=seg.x+d.dx,ny=seg.y+d.dy;if(free(nx,ny))DIRS.forEach((hd,i)=>{if(clear(nx,ny,hd))front.set(nx+','+ny+','+i,{x:nx,y:ny,dir:hd})})}));prog()}
 function next(){let best=null;
  for(const c of shuffle([...front.values()])){if(!free(c.x,c.y)||!clear(c.x,c.y,c.dir))continue;
   const s=build({x:c.x,y:c.y},c.dir,true);if(s.body.length>=maxLen)return s;if(!best||s.body.length>best.body.length)best=s}
  return best}
 function buildLast(deadline){
  let best=null;
  for(let x=0;x<w;x++)for(let y=0;y<h;y++){if(occ[x][y]||walls[x][y]||!nextTo(x,y,[]))continue;
   for(const d of DIRS){if(Date.now()>deadline)return best;
    const s=build({x,y},d,true);if(!isResolvable({w,h,snakes:snakes.concat(s)}))continue;
    if(s.body.length>=maxLen)return s;if(!best||s.body.length>best.body.length)best=s}}
  return best}
 let hd,att=0;do{if(att++>K.FIRST)return{w,h,snakes,walls:given};hd={x:rnd()*w|0,y:rnd()*h|0}}while(walls[hd.x][hd.y]);
 let s=build(hd,DIRS[rnd()*4|0],false);
 while(s){add(s);s=next()}
 if(fill){const dl=Date.now()+K.FILL_MS;s=buildLast(dl);while(s){add(s,true);s=buildLast(dl)}}
 return{w,h,snakes,walls:given}}
class LineOfSight{constructor(l,ign=new Set()){this.l=l;this.o=new Uint8Array(l.w*l.h);
  l.snakes.filter(s=>!ign.has(s.id)).forEach(s=>s.body.forEach(p=>{if(this.in(p.x,p.y))this.o[p.y*l.w+p.x]=1}))}
 in(x,y){return x>=0&&y>=0&&x<this.l.w&&y<this.l.h}
 blocked(s){let x=s.body[0].x+s.dir.dx,y=s.body[0].y+s.dir.dy;while(this.in(x,y)){if(this.o[y*this.l.w+x])return true;x+=s.dir.dx;y+=s.dir.dy}return false}}
function cleanLoS(l,s,grid){let x=s.body[0].x+s.dir.dx,y=s.body[0].y+s.dir.dy;
 while(x>=0&&y>=0&&x<l.w&&y<l.h){const v=grid[x][y];if(v&&v!==s.id)return false;x+=s.dir.dx;y+=s.dir.dy}return true}
function grid(l){const g=Array.from({length:l.w},()=>new Array(l.h).fill(0));l.snakes.forEach(s=>s.body.forEach(p=>g[p.x][p.y]=s.id));return g}
function findRemovable(l){const g=grid(l);const s=l.snakes.find(s=>cleanLoS(l,s,g));return s?s.id:null}
function isResolvable(l){const g=grid(l),rem=new Set(l.snakes);let guard=l.snakes.length+10;
 while(rem.size&&guard--){const s=[...rem].find(s=>cleanLoS(l,s,g));if(!s)return false;s.body.forEach(p=>g[p.x][p.y]=0);rem.delete(s)}return !rem.size}
const SHAPES=["anchor","apple","arrow","balloon","bear","bell","bird","bone","bulb","butterfly","cactus","car","carrot","castle","cat","check","cheese","cherry","circle","cloud","cog","cottage","crown","cupcake","diamond","droplet","duck","dumbbell","envelope","eye","fish","flag","flower","gem","ghost","goblet","hammer","heart","hexagon","hourglass","icecream","kite","leaf","moon","mountain","mug","mushroom","note","octagon","owl","padlock","paw","pawn","pine","plane","plus","puzzle","rabbit","ring","rocket","sailboat","shield","skull","smiley","snail","snowflake","sparkle","star5","sun","sword","teapot","tent","triangle","tulip","turtle","umbrella","whale","windmill","wrench","zap","banana","bee","book","bubble","burger","camera","clock","donut","frog","gamepad","ladybug","lighthouse","magnifier","pencil","pin","pizza","planet","pumpkin","strawberry","ufo"];
function shouldApplyShape(c,r){const s=Math.max(c.w,c.h);const p=s<K.SHAPE_MIN?0:s>=K.SHAPE_ALWAYS?1:K.SHAPE_BASE+(1-K.SHAPE_BASE)*((s-K.SHAPE_MIN)/(K.SHAPE_ALWAYS-K.SHAPE_MIN));return r<p}
if(typeof module!=='undefined')module.exports={K,DIFF_WIN,TIER_CFG,levelTier,setSeed,generate,levelConfig,LineOfSight,isResolvable,findRemovable,shouldApplyShape,SHAPES};
