// Arrow Zen: level generator, line of sight and solvability. Derived from robmat/arrows_game (GPL-3.0).
const K={LIVES:3,FLASH_MS:3000,PULSE:250,PULSE_MIN:.2,REM:{High:300,Medium:600,Low:900},FRAME:16,ENTRY:450,STAGGER:50,MAXSTAG:1500,
MINS:.2,MAXS:6,DEFS:.94,TOL:1.3,TAPOFF:.3,STRAIGHT:.9,STROKE:.15,CORNER:.3,ARROW:.2,ARROWSTROKE:.3,MOVE:1.2,TAIL1:.2,GUIDE_A:.4,GUIDE_MS:500,NODECAP:500,FIRST:100,MAXFILL:35,COLOR_T:128,SHAPE_MIN:20,SHAPE_ALWAYS:100,SHAPE_BASE:.5,GEN_UNLOCK:20,GEN_MIN:20,GEN_MAX:100,FILL_MS:8000};
let rnd=Math.random;
function setSeed(s){if(s==null){rnd=Math.random;return}let a=s>>>0;rnd=()=>{a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const DIRS=[{dx:0,dy:-1,a:270},{dx:0,dy:1,a:90},{dx:-1,dy:0,a:180},{dx:1,dy:0,a:0}];
const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=rnd()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
// ---- difficulty tiers: every level belongs to a sliding window of TWO adjacent tiers, picked pseudo-randomly (but always the same for a given level)
const DIFF_WIN=[1,16,36,61,91,131,181,251];
const TIER_CFG=[{s:[6,9],n:[4,9],lives:3},{s:[8,12],n:[10,20],lives:3},{s:[12,16],n:[20,40],lives:2},{s:[16,22],n:[40,75],lives:2},{s:[22,28],n:[75,120],lives:1},{s:[26,34],n:[120,180],lives:1},{s:[32,38],n:[170,235],lives:1},{s:[36,40],n:[290,440],lives:1}]; // s = board size range, n = target arrow count range
function h01(n,salt=0){let a=(Math.imul(n+1,2654435761)^Math.imul(salt+7,40503))>>>0;a=Math.imul(a^(a>>>15),2246822519)>>>0;a=Math.imul(a^(a>>>13),3266489917)>>>0;return((a^(a>>>16))>>>0)/4294967296}
function levelTier(n){n=Math.max(1,n|0);let k=0;while(k<DIFF_WIN.length-1&&n>=DIFF_WIN[k+1])k++;if(k>=DIFF_WIN.length-1)return DIFF_WIN.length-1;if(n===1)return 0;
 const prog=(n-DIFF_WIN[k])/(DIFF_WIN[k+1]-DIFF_WIN[k]);return h01(n)<.25+.55*prog?k+1:k}
function levelConfig(n,fw,fh){const t=levelTier(n),c=TIER_CFG[t],last=t>=DIFF_WIN.length-1,cl=(v,lo,hi)=>Math.max(lo,Math.min(hi,v));
 const a=DIFF_WIN[Math.max(0,t-1)],b=DIFF_WIN[Math.min(DIFF_WIN.length-1,t+1)],f=last?cl((n-DIFF_WIN[t])/1000,0,1):cl((n-a)/(b-a),0,1);
 const sz=cl(Math.round(c.s[0]+(c.s[1]-c.s[0])*f+(h01(n,3)-.5)*2),c.s[0],c.s[1]),dh=h01(n,5)<.35?-1:h01(n,5)>.7?1:0,w=fw||Math.min(40,sz),h=fh||Math.min(40,cl(sz+dh,c.s[0]-1,c.s[1]));
 const target=(c.n[0]+(c.n[1]-c.n[0])*f)*(.88+.24*h01(n,6));
 return{w,h,maxLen:cl(Math.round((1.04-.0125*Math.max(0,(w+h)/2-22))*w*h/target),3,60),lives:c.lives,tier:t}}
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
const SHAPES=["anchor","apple","arrow","balloon","bear","bell","bird","bone","bulb","butterfly","cactus","car","carrot","castle","cat","check","cheese","cherry","circle","cloud","cog","cottage","crown","cupcake","diamond","droplet","duck","dumbbell","envelope","eye","fish","flag","flower","gem","ghost","goblet","hammer","heart","hexagon","hourglass","icecream","kite","leaf","moon","mountain","mug","mushroom","note","octagon","owl","padlock","paw","pawn","pine","plane","plus","puzzle","rabbit","ring","rocket","sailboat","shield","skull","smiley","snail","snowflake","sparkle","star5","sun","sword","teapot","tent","triangle","tulip","turtle","umbrella","whale","windmill","wrench","zap","banana","bee","book","bubble","burger","camera","clock","donut","frog","gamepad","ladybug","lighthouse","magnifier","pencil","pin","pizza","planet","pumpkin","strawberry","ufo","ngon5","star5b","star6b","star7b","star8b","star9b","star10b","star11b","star12b","star13b","star14b","bloom3a","bloom3b","bloom4a","bloom5a","bloom6a","bloom6b","bloom7a","bloom8a","bloom10a","gear6","gear7","gear8","gear9","gear10","gear12","gear14","aster3","aster5","aster6","aster7","aster8","plus1","arrow_right","arrow_down","arrow_left","arrow_ne","arrow_se","letter_a","letter_b","letter_c","letter_d","letter_e","letter_f","letter_g","letter_h","letter_j","letter_k","letter_l","letter_m","letter_n","letter_o","letter_p","letter_q","letter_r","letter_s","letter_t","letter_u","letter_v","letter_w","letter_x","letter_y","letter_z","digit_1","digit_2","digit_3","digit_4","digit_5","digit_6","digit_7","digit_8","digit_9","fa_he","fa_dal","fa_re","fa_sin","fa_sad","fa_ta","fa_ein","fa_gaf","fa_mim","fa_vav","fa_he2","fa_ye","sym_2663","sym_2618","sym_2712","sym_2716","sym_273f","sym_2743","sym_274b","sym_2302","sym_2318","sym_25e2","sym_25bc","sym_25c0","sym_25b6","sym_2742","sym_2745","sym_273b","sym_2692","sym_2640","sym_265a","sym_265c","sym_265d","sym_265e","sym_2767","sym_2619","sym_25e3","sym_25e4","sym_25e5","ring_c","tomb","quarter","pie34","pie13","leaf2","bowtie","hourg2","house2","trap","para","stairs3","stairs4","stairs5","blk_L","blk_T","blk_U","blk_Z","blk_H","blk_E","blk_Y","blk_W","blk_C","blk_S","frame","hexring","heart2","shield2","badge","astroid_f","omino4_00","omino4_01","omino4_02","omino4_04","omino5_02","omino5_03","omino5_05","omino5_06","omino5_07","omino5_08","omino5_09","omino5_10","omino6_01","omino6_02","omino6_04","omino6_05","omino6_06","omino6_07","omino6_08","omino6_09","omino6_10","omino6_12","omino6_13","omino6_14","omino6_15","omino6_16","omino6_17","omino6_18","omino6_20","omino6_21","omino6_22","omino6_23","omino6_24","omino6_25","omino6_26","omino6_27","omino6_28","omino6_29","omino6_30","omino6_31","omino6_32","omino6_33","omino6_34","form000","form001","form010","form019","form022","form024","form029","form041","form045","form051","form052","form054","form056","form074","form078","form085","form088","form109","form110","form112","form118","form124","form125","form128","form136","form137","form147","form152","form171","form184","form191","form235","form245","form255","form302","form310","form311","form326","form332","form337","form361","form369","form405","form433","form435","form444","form459","form468","form473","form494","form501","form503","form506","form580","form582","form583","form628","form693","form719","form746","form761","form766","form772","form775","form824","form826","form833","form850","form881","form889","island000","island001","rock000","island002","island003","rock001","island004","island005","rock002","island006","island007","rock003","island008","island009","rock004","island010","island011","rock005","island012","island013","rock006","island014","island015","rock007","island016","island017","rock008","island018","island019","rock009","island020","island021","rock010","island022","island023","rock011","island024","island025","rock012","island026","island027","rock013","island028","island029","rock014","island030","island031","rock015","island032","rock016","island033","island034","rock017","island035","island036","rock018","island037","island038","rock019","island039","island040","rock020","island041","island042","rock021","island043","island044","rock022","island045","island046","rock023","island047","island048","rock024","island049","island050","rock025","island051","island052","rock026","island053","island054","rock027","island055","island056","rock028","island057","island058","rock029","island059","island060","rock030","island061","island062","rock031","island063","island064","rock032","island065","island066","rock033","island067","island068","rock034","island069","island070","rock035","island071","island072","rock036","island073","island074","rock037","island075","island076","rock038","island077","island078","rock039","island079","island080","rock040","island081","island082","rock041","island083","island084","rock042","island085","island086","rock043","island087","island088","rock044","island089","island090","rock045","island091","island092","rock046","island093","island094","rock047","island095","island096","rock048"];
function shouldApplyShape(c,r){const s=Math.max(c.w,c.h);const p=s<K.SHAPE_MIN?0:s>=K.SHAPE_ALWAYS?1:K.SHAPE_BASE+(1-K.SHAPE_BASE)*((s-K.SHAPE_MIN)/(K.SHAPE_ALWAYS-K.SHAPE_MIN));return r<p}
if(typeof module!=='undefined')module.exports={K,DIFF_WIN,TIER_CFG,levelTier,setSeed,generate,levelConfig,LineOfSight,isResolvable,findRemovable,shouldApplyShape,SHAPES};
