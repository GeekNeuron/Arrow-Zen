// Arrow Zen: level generator, line of sight and solvability. Derived from robmat/arrows_game (GPL-3.0).
const K={LIVES:3,FLASH_MS:3000,PULSE:250,PULSE_MIN:.2,REM:{High:300,Medium:600,Low:900},FRAME:16,ENTRY:450,STAGGER:50,MAXSTAG:1500,
MINS:.2,MAXS:6,DEFS:.94,TOL:1.3,TAPOFF:.3,STRAIGHT:.9,STROKE:.15,CORNER:.3,ARROW:.2,ARROWSTROKE:.3,MOVE:1.2,TAIL1:.2,GUIDE_A:.4,GUIDE_MS:500,NODECAP:500,FIRST:100,MAXFILL:35,COLOR_T:128,SHAPE_MIN:8,SHAPE_ALWAYS:60,SHAPE_BASE:.5,GEN_UNLOCK:20,GEN_MIN:20,GEN_MAX:100,FILL_MS:8000};
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
const SHAPES=["mi_bed","mi_bathtub","mi_blender","mi_book","mi_bookmark","mi_brightness_2","mi_brightness_3","mi_brightness_4","mi_brightness_7","mi_bug_report","mi_castle","mi_chair_alt","mi_cloud","mi_coffee","mi_cookie","mi_desk","mi_egg","mi_egg_alt","mi_extension","mi_factory","mi_favorite","mi_fence","mi_fire_truck","mi_flash_on","mi_fort","mi_garage","mi_grade","mi_headphones","mi_hexagon","mi_home","mi_hourglass_full","mi_hot_tub","mi_icecream","mi_iron","mi_key","mi_king_bed","mi_landscape","mi_language","mi_laptop","mi_lightbulb","mi_local_drink","mi_local_fire_department","mi_local_gas_station","mi_local_hospital","mi_local_laundry_service","mi_local_library","mi_local_mall","mi_local_movies","mi_local_pharmacy","mi_local_pizza","mi_local_police","mi_local_shipping","mi_local_taxi","mi_luggage","mi_medical_services","mi_microwave","mi_museum","mi_music_note","mi_nature","mi_notifications","mi_opacity","mi_palette","mi_park","mi_pedal_bike","mi_pentagon","mi_piano","mi_psychology","mi_radio","mi_rice_bowl","mi_savings","mi_science","mi_shopping_bag","mi_shopping_basket","mi_shower","mi_single_bed","mi_smart_toy","mi_snowmobile","mi_soap","mi_speaker","mi_sports_esports","mi_sports_football","mi_stadium","mi_store","mi_table_restaurant","mi_thumb_up","mi_thunderstorm","mi_timer","mi_toys","mi_traffic","mi_tram","mi_two_wheeler","mi_umbrella","mi_volcano","mi_wallet","mi_warehouse","mi_water_drop","mi_whatshot","mi_woman","mi_man","mi_boy","mi_girl","mi_cabin","mi_cottage","mi_bungalow","mi_apartment","mi_business","mi_airport_shuttle","mi_directions_boat","mi_directions_bus_filled","mi_directions_car_filled","mi_directions_railway_filled","mi_directions_subway_filled","mi_directions_walk","mi_electric_rickshaw","mi_emoji_events","mi_emoji_objects","mi_emoji_food_beverage","mi_emoji_emotions","mi_festival","mi_free_breakfast","mi_ice_skating","mi_pest_control","mi_pest_control_rodent","mi_cruelty_free","mi_set_meal","mi_breakfast_dining","mi_delivery_dining","mi_backpack","mi_auto_stories","mi_camera_alt","e_1f400","e_1f401","e_1f402","e_1f403","e_1f404","e_1f405","e_1f406","e_1f407","e_1f408","e_1f409","e_1f40a","e_1f40b","e_1f40c","e_1f40d","e_1f40e","e_1f40f","e_1f410","e_1f411","e_1f412","e_1f413","e_1f414","e_1f415","e_1f417","e_1f418","e_1f419","e_1f41a","e_1f41b","e_1f41c","e_1f41d","e_1f41e","e_1f41f","e_1f420","e_1f421","e_1f422","e_1f423","e_1f424","e_1f425","e_1f426","e_1f427","e_1f428","e_1f429","e_1f42a","e_1f42b","e_1f42c","e_1f42d","e_1f42e","e_1f42f","e_1f430","e_1f431","e_1f432","e_1f433","e_1f434","e_1f439","e_1f43a","e_1f43f","e_1f980","e_1f981","e_1f982","e_1f983","e_1f984","e_1f985","e_1f986","e_1f987","e_1f988","e_1f989","e_1f98a","e_1f98b","e_1f98c","e_1f98d","e_1f98e","e_1f98f","e_1f990","e_1f991","e_1f992","e_1f993","e_1f994","e_1f995","e_1f996","e_1f997","e_1f998","e_1f999","e_1f99a","e_1f99b","e_1f99c","e_1f99d","e_1f99e","e_1f9a1","e_1f9a2","e_1f9a3","e_1f9a4","e_1f9a5","e_1f9a6","e_1f9a7","e_1f9a8","e_1f9a9","e_1f9aa","e_1f9ab","e_1f9ac","e_1f9ad","e_1f9ae","e_1f9c0","e_1f9c1","e_1f9c2","e_1f9c3","e_1f9c4","e_1f9c5","e_1f9c7","e_1f9c8","e_1f9c9","e_1f9ca","e_1f9cb","e_1f331","e_1f332","e_1f333","e_1f334","e_1f335","e_1f336","e_1f337","e_1f338","e_1f339","e_1f33a","e_1f33b","e_1f33c","e_1f33d","e_1f33e","e_1f33f","e_1f340","e_1f341","e_1f344","e_1f346","e_1f347","e_1f348","e_1f349","e_1f34b","e_1f34c","e_1f34d","e_1f34e","e_1f350","e_1f352","e_1f354","e_1f355","e_1f356","e_1f357","e_1f35c","e_1f35d","e_1f35f","e_1f360","e_1f362","e_1f363","e_1f364","e_1f365","e_1f366","e_1f367","e_1f368","e_1f36b","e_1f36c","e_1f36d","e_1f36f","e_1f370","e_1f371","e_1f372","e_1f375","e_1f37c","e_1f37f","e_1f380","e_1f382","e_1f384","e_1f388","e_1f392","e_1f393","e_1f399","e_1f3a5","e_1f3a7","e_1f3a8","e_1f3a9","e_1f3ac","e_1f3ae","e_1f3b2","e_1f3b3","e_1f3b7","e_1f3ba","e_1f3bb","e_1f3bc","e_1f3be","e_1f3bf","e_1f3c1","e_1f3c2","e_1f3c4","e_1f3c5","e_1f3c6","e_1f3c7","e_1f3c8","e_1f3ca","e_1f3cc","e_1f3cd","e_1f3ce","e_1f3d3","e_1f3d4","e_1f3d5","e_1f3d7","e_1f3d8","e_1f3d9","e_1f3da","e_1f3db","e_1f3dd","e_1f3df","e_1f3e1","e_1f3e2","e_1f3e4","e_1f3e5","e_1f3ea","e_1f3eb","e_1f3ef","e_1f3f0","e_1f3f7","e_1f44b","e_1f44d","e_1f44e","e_1f44f","e_1f451","e_1f453","e_1f455","e_1f457","e_1f45b","e_1f460","e_1f464","e_1f465","e_1f466","e_1f467","e_1f46a","e_1f46b","e_1f46f","e_1f476","e_1f478","e_1f47b","e_1f47c","e_1f47e","e_1f481","e_1f483","e_1f484","e_1f48a","e_1f48d","e_1f48e","e_1f490","e_1f493","e_1f4a1","e_1f4a7","e_1f4aa","e_1f4b0","e_1f4cc","e_1f4ce","e_1f4d0","e_1f4da","e_1f4fa","e_1f508","e_1f50c","e_1f50d","e_1f511","e_1f514","e_1f516","e_1f525","e_1f529","e_1f52c","e_1f54a","e_1f56f","e_1f577","e_1f578","e_1f579","e_1f5a5","e_1f5de","e_1f5fa","e_1f5fb","e_1f5fd","e_1f680","e_1f681","e_1f682","e_1f684","e_1f686","e_1f68a","e_1f68c","e_1f695","e_1f697","e_1f69a","e_1f69c","e_1f6a2","e_1f6a3","e_1f6a4","e_1f6b2","e_1f6c1","e_2601","e_2602","e_2603","e_2604","e_2615","e_2618","e_2640","e_2642","e_265f","e_2660","e_2668","e_2692","e_2693","e_2696","e_2699","e_26c5","e_26c8","e_26f2","e_26f5","e_26f7","e_26f8","e_26f9","e_26fd","e_2708","e_270c","e_270f","e_2712","e_2744","e_1f30b","e_1f31f","e_1f32d","e_1f32e","e_1f32f","e_1f9e0","e_1f9e2","e_1f9e3","e_1f9e5","e_1f9e9","e_1f9ea","e_1f9ed","e_1f9f3","e_1f9f6","e_1f9f8","e_1f9fa","e_1f9fc","e_1fa73","e_1fa81","e_1fa83","e_1fa85","e_1fa86","e_1fa87","e_1fa90","e_1fa91","e_1faa2","e_1fab0","e_1fab1","e_1fab2","e_1fab3","e_1fab4","e_1fab5","e_1fab6","e_1fab8","e_1faba","e_1fabc","e_1fabd","e_1fabf","e_1fac0","e_1fac1","e_1face","e_1facf","e_1fad0","e_1fad1","e_1fad2","e_1fad4","e_1fad5","e_1fad6","e_1fad7","e_1fad8","e_1fada","e_1fadb","e_1fae7"];
function shouldApplyShape(c,r){const s=Math.max(c.w,c.h);const p=s<K.SHAPE_MIN?0:s>=K.SHAPE_ALWAYS?1:K.SHAPE_BASE+(1-K.SHAPE_BASE)*((s-K.SHAPE_MIN)/(K.SHAPE_ALWAYS-K.SHAPE_MIN));return r<p}
if(typeof module!=='undefined')module.exports={K,DIFF_WIN,TIER_CFG,levelTier,setSeed,generate,levelConfig,LineOfSight,isResolvable,findRemovable,shouldApplyShape,SHAPES};
