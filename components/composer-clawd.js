import {mountComposerToys} from './composer-clawd-toys.js';
import {mountClawdWorldOptions} from './clawd-world-options.js';
import {clawdHobbies,renderClawdHobbies} from './composer-clawd-hobbies.js';
import {clawdActivities} from './composer-clawd-activities.js';
// Clawd body, eyes, palette and walking poses adapted from 小船 and Claude's
// xiexie-calendar (PLAIN/body and post-run). See vendor/xiexie-calendar/SOURCE.md
// and composer-clawd-SOURCE.md for attribution and artwork license.
// Flat body palette: mirroring changes direction, never the lighting side.
const colors={O:'#D97757',S:'#D97757',K:'#2A2A30'};
const rect=(x,y,w,h,color)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${colors[color]}"/>`;
const backpack=`<g class="clawd-backpack"><path d="M2 2h4v4H5V3H3v3H2Z" fill="#92769f"/><path d="M0 6h1V4h6v12H1v-2H0Z" fill="#a68bb5"/><path d="M1 4h6v4H1ZM1 11h4v3H1Z" fill="#d5c1dd"/><path d="M0 6h1v8H0ZM1 15h6v1H1Z" fill="#866c96"/><path d="M3 7h1v2H3Z" fill="#f1ddb5"/></g>`;
const backpackStrap='<g class="clawd-backpack-strap"><path d="M7 3h1v9h1v2H7Z" fill="#eedbc0"/><rect x="7" y="11" width="2" height="2" fill="#c4a578"/></g>';
const clothes=`<g class="clawd-outfit outfit-christmas"><path d="M8-3h19v3H8ZM11-6h14v3H11ZM15-9h8v3h-8ZM21-8h6v3h-6ZM25-6h4v6h-4Z" fill="#b94d5e"/><path d="M8-3h19v1H8ZM12-6h3v3h-3Z" fill="#de7b81"/><path d="M6-1h24v3H6ZM27-1h4v4h-4ZM28 3h2v1h-2Z" fill="#fff2df"/></g>`;
// Official ClaudeDevs bar-pushing reference, rendered in the same local pixel style.
export function renderClawdPusher(){
  const frames=Array.from({length:4},(_,i)=>{
    const feet=[8,12,22,26].map((x,n)=>rect(x,16,2,(n+i)%2?2:4,n<2?'S':'O')).join('');
    return `<g class="effort-push-frame push-frame-${i}">${feet}<g transform="translate(0 ${i%2?-1:0})">${backpack+rect(6,0,24,16,'O')+rect(28,0,2,16,'S')+rect(-4,8,10,3,'O')+rect(30,8,4,4,'O')+rect(10,4,2,4,'K')+rect(24,4,2,4,'K')+backpackStrap}</g></g>`;
  }).join('');
  return `<svg class="effort-push-sprite" viewBox="-8 -1 44 22" shape-rendering="crispEdges" aria-hidden="true">${frames}</svg>`;
}
function walkingClawd(){
  const frames=Array.from({length:4},(_,frame)=>{
    const raised=frame%2===1;
    const body=backpack+rect(6,0,24,16,'O')+rect(28,0,2,16,'S')
      +`<g class="walk-hands">${rect(2,8,4,4,'O')+rect(30,8,4,4,'O')}</g><g class="carry-hands">${rect(3,-2,4,4,'O')+rect(29,-2,4,4,'O')}</g>`
      +clothes+rect(10,4,2,4,'K')+rect(24,4,2,4,'K')+backpackStrap;
    let feet;
    if(raised)feet=[8,12,22,26].map((x,i)=>rect(x,15,2,3,i<2?'S':'O')).join('');
    else{
      const straight=frame===0?[8,22]:[12,26],bent=frame===0?[12,26]:[8,22];
      feet=straight.map(x=>rect(x,16,2,4,x<20?'S':'O')).join('')
        +bent.map(x=>rect(x,16,2,2,x<20?'S':'O')+rect(x+1,18,2,1,x<20?'S':'O')).join('');
    }
    return `<g class="composer-clawd-frame frame-${frame}">${feet}<g transform="translate(0 ${raised?-1:0})">${body}</g></g>`;
  }).join('');
  const body=backpack+rect(6,0,24,16,'O')+rect(28,0,2,16,'S')+clothes+backpackStrap;
  const eyes=offset=>rect(10+offset,4,2,4,'K')+rect(24+offset,4,2,4,'K');
  const feet=h=>[8,12,22,26].map((x,i)=>rect(x,16,2,h,i<2?'S':'O')).join('');
  const hand=(side,y)=>rect(side==='left'?2:30,y,4,4,'O');
  const hands=(a,b)=>`<g class="pose-arms-a">${hand('left',a)+hand('right',b)}</g><g class="pose-arms-b">${hand('left',b)+hand('right',a)}</g>`;
  const restEyes=`<g class="rest-eyes-open">${eyes(0)}</g><g class="rest-eyes-shut">${rect(9,6,4,1,'K')+rect(23,6,4,1,'K')}</g>`;
  const poses=`<g class="clawd-pose pose-stand">${body+feet(4)+restEyes+hand('left',8)+hand('right',8)}</g>
    <g class="clawd-pose pose-scene">${Array.from({length:4},(_,i)=>`<g class="scene-pull-step scene-pull-step-${i}">${[8,12,22,26].map((x,n)=>rect(x,16,2,(n+i)%2?2:4,'O')).join('')}<g transform="translate(0 ${i%2?-1:0})">${body+rect(-4,8,10,3,'O')+hand('right',8)}<path d="M-5-4h1v24h-1Z" fill="#c7b6ce"/></g></g>`).join('')}</g>
    <g class="clawd-pose pose-sit"><g transform="translate(0 2)">${body+restEyes+hand('left',8)+hand('right',8)}</g>${[7,12,22,27].map(x=>rect(x,18,3,2,'O')).join('')}</g>
    <g class="clawd-pose pose-sleep"><g transform="translate(0 4)">${body+rect(9,6,4,1,'K')+rect(23,6,4,1,'K')+hand('left',8)+hand('right',8)}</g><g class="clawd-sleep-z" fill="#bca7c6"><path d="M31-5h4v1h-1v1h-1v1h2v1h-4v-1h1v-1h1v-1h-2Z"/></g></g>
    <g class="clawd-pose pose-stretch">${body+feet(4)+restEyes+hand('left',-3)+hand('right',-3)}</g>
    <g class="clawd-pose pose-wave">${body+feet(4)+eyes(0)+hand('left',8)}<g class="pose-arms-a">${hand('right',3)}</g><g class="pose-arms-b">${hand('right',-3)}</g></g>
    <g class="clawd-pose pose-look">${body+feet(4)+hand('left',8)+hand('right',8)}<g class="pose-eyes-left">${eyes(-2)}</g><g class="pose-eyes-right">${eyes(2)}</g><g class="pose-eyes-blink">${rect(9,6,4,1,'K')+rect(23,6,4,1,'K')}</g></g>
    <g class="clawd-pose pose-hop">${body+feet(2)+eyes(0)+hand('left',3)+hand('right',3)}</g>
    <g class="clawd-pose pose-cry">${body+feet(4)+hand('left',6)+hand('right',6)}<path d="M9 5h4v1H9ZM23 5h4v1h-4ZM16 11h4v1h-4Z" fill="#2A2A30"/><g class="clawd-tears" fill="#a5cddc"><path d="M10 7h2v5h-2ZM24 7h2v5h-2Z"/></g></g>
    <g class="clawd-pose pose-fall">${body+feet(2)+eyes(0)+hands(-2,5)}</g>
    <g class="clawd-pose pose-glide">${body+feet(2)+eyes(0)+hand('left',0)+hand('right',0)}</g>
    <g class="clawd-pose pose-open"><path d="M3 10h3v8h8v3H3ZM30 10h3v11H22v-3h8Z" fill="#D97757"/><g transform="translate(0 2)">${body+eyes(0)}</g>${[8,12,22,26].map(x=>rect(x,18,2,2,'O')).join('')}</g>
    <g class="clawd-pose pose-land"><g transform="translate(0 1)">${body+eyes(0)+hand('left',8)+hand('right',8)}</g>${[8,12,22,26].map((x,i)=>rect(x,17,2,3,i<2?'S':'O')).join('')}</g>
    <g class="clawd-dust" fill="#d0b7ce"><rect x="0" y="19" width="2" height="1"/><rect x="-2" y="17" width="1" height="1"/><rect x="34" y="19" width="2" height="1"/><rect x="37" y="17" width="1" height="1"/></g>`;
  const parachute=`<g class="clawd-parachute"><g class="parachute-lines" fill="none" stroke="#f4dfbd" stroke-width="1"><path d="M-2-13 4 3M38-13 32 3M10-14 6 3M26-14 30 3"/></g><g class="parachute-canopy"><path d="M-4-12v-8h4v-5h6v-4h24v4h6v5h4v8h-6v-2h-6v2h-7v-2h-6v2h-7v-2h-6v2Z" fill="#d39eae"/><path d="M0-20h4v-5h6v-2h6v13H8v-2H0ZM22-27h6v2h4v5h4v4h-8v2h-6Z" fill="#f6e8c9"/><path d="M8-28h20v2H8Z" fill="#fff4df"/><path d="M17-26h2v12h-2Z" fill="#e8b8c3"/></g></g>`;
  const basket='<g class="clawd-basket-prop"><path d="M27 10V5h3V2h12v3h3v5h-2V6h-3V4h-8v2h-3v4Z" fill="#af8756"/><path d="M25 10h23v11h-3v3H28v-3h-3Z" fill="#c99d65"/><path d="M25 10h23v2H25ZM28 15h17v1H28ZM29 20h15v1H29Z" fill="#e9c78b"/><path d="M30 12h1v11h-1ZM36 12h1v12h-1ZM42 12h1v11h-1Z" fill="#ad8052"/></g>';
  return `<svg class="composer-clawd-sprite" viewBox="0 -1 36 22" shape-rendering="crispEdges" aria-hidden="true" focusable="false">${frames}${poses}${renderClawdHobbies({body,eyes:restEyes,feet,hand})}${parachute}${basket}</svg>`;
}

function pixelChristmas(){
  const snow=Array.from({length:18},(_,i)=>`<rect x="${28+i*31%93}" y="${29+i*17%75}" width="2" height="2"/>`).join('');
  const lights=Array.from({length:12},(_,i)=>`<rect x="${12+i*26}" y="${14+(i%3)*3}" width="3" height="4" fill="${['#f5d895','#d5888d','#a8bfaa'][i%3]}"/>`).join('');
  return `<svg class="composer-clawd-landscape clawd-christmas-landscape" viewBox="0 0 320 200" preserveAspectRatio="none" shape-rendering="crispEdges" aria-hidden="true">
  <path fill="#62434a" d="M0 0h320v200H0Z"/><path fill="#79535a" d="M8 8h304v140H8Z"/><path fill="#e2b984" d="M8 10h304v2H8Z"/><g class="pixel-room-lights">${lights}</g>
  <path fill="#493c4e" d="M20 26h108v91H20Z"/><path fill="#343d59" d="M25 31h98v81H25Z"/><path fill="#aaaec7" d="M25 93h18v-6h21v8h26v-5h33v22H25Z"/><g class="christmas-window-snow" fill="#fff3e5">${snow}</g><path fill="#dfbca0" d="M71 31h5v81h-5ZM25 70h98v4H25ZM16 115h116v5H16Z"/>
  <path fill="#a77958" d="M0 147h320v53H0Z"/><path fill="#dbb18b" d="M0 147h320v3H0ZM0 185h320v3H0Z"/><path fill="#855d4b" d="M0 188h320v12H0Z"/>
  <path fill="#765749" d="M229 59h63v92h-63Z"/><path fill="#e1b7a2" d="M221 57h79v8h-79ZM227 65h67v5h-67ZM223 146h75v7h-75Z"/><path fill="#342d38" d="M237 91h47v54h-47Z"/><path fill="#a77b68" d="M229 81h63v3h-63ZM229 114h8v3h-8ZM284 114h8v3h-8Z"/>
  <g class="christmas-fire"><path fill="#d97b59" d="M244 139v-15h5v-11h5v10h5v-17h4v12h5v8h7v13Z"/><path fill="#f3c276" d="M250 139v-10h5v-6h5v7h5v-4h5v13Z"/><path fill="#fff0bc" d="M257 139v-8h6v8Z"/></g><path fill="#765748" d="M241 140h38v4h-38Z"/>
  <path fill="#bc5869" d="M238 65h8v12h-3v4h-9v-5h4ZM273 65h8v12h-3v4h-9v-5h4Z"/><path fill="#fff0db" d="M237 65h10v3h-10ZM272 65h10v3h-10Z"/>
  <path fill="#75543f" d="M170 129h10v31h-10Z"/><path fill="#3e695c" d="M170 40h10v12h8v14h9v16h10v16h9v18h10v18H125v-18h10V98h9V82h10V66h8V52h8Z"/><path fill="#58806a" d="M171 50h8v18h9v16h10v15h9v16h10v10h-16v-16h-10V94h-10V78h-10Z"/>
  <path fill="#f0d194" d="M172 29h6v6h6v6h-6v6h-6v-6h-6v-6h6Z"/><path fill="#e0c395" d="M158 72h9v3h13v3h12v3h-15v-3h-12v-3h-7ZM144 100h10v3h16v3h19v3h19v3h-21v-3h-18v-3h-16v-3h-9Z"/>
  <g fill="#d48993"><path d="M165 62h5v5h-5ZM187 86h5v5h-5ZM148 115h5v5h-5ZM180 120h5v5h-5Z"/></g><g fill="#f5dfad"><path d="M177 85h4v4h-4ZM160 97h4v4h-4ZM204 123h4v4h-4Z"/></g>
  <path fill="#ba6777" d="M124 149h28v23h-28Z"/><path fill="#e9cf9f" d="M135 149h5v23h-5ZM122 148h32v5h-32Z"/><path fill="#7c9590" d="M184 145h26v27h-26Z"/><path fill="#f5dfb8" d="M194 145h5v27h-5ZM182 144h30v5h-30Z"/><path fill="#d7b07e" d="M158 157h24v17h-24Z"/><path fill="#b66a78" d="M167 157h4v17h-4Z"/>
  <path fill="#c38f91" d="M20 163h90v15H20Z"/><path fill="#e8c7b3" d="M24 167h82v2H24ZM24 173h82v2H24Z"/>
  </svg>`;
}
function pixelRoom(){
  return `<svg class="composer-clawd-landscape" viewBox="0 0 320 200" preserveAspectRatio="none" shape-rendering="crispEdges" aria-hidden="true">
    <path d="M0 0h320v200H0Z" fill="#49352e"/><path d="M8 10h304v2H8Z" fill="#2e2423"/>
    <g class="pixel-room-lights" fill="#f6d899"><path d="M12 10h3v5h-3ZM52 10h3v5h-3ZM92 10h3v5h-3ZM132 10h3v5h-3ZM172 10h3v5h-3ZM212 10h3v5h-3ZM252 10h3v5h-3ZM292 10h3v5h-3Z"/></g>
    <path d="M20 24h150v108H20Z" fill="#2c2327"/><path d="M25 29h140v98H25Z" fill="#35334f"/>
    <path d="M25 51h140v20H25Z" fill="#69516d"/><path d="M25 71h140v20H25Z" fill="#b7747b"/><path d="M25 91h140v36H25Z" fill="#e9a778"/>
    <path d="M141 36h9v3h-5v8h4v3h-8v-3h-3v-8h3Z" fill="#f6e5b8"/>
    <path d="M37 44h2v2h-2ZM71 35h2v2h-2ZM120 53h2v2h-2Z" fill="#eee0c1"/>
    <path d="M25 118h12v-12h18v8h17v-17h18v21h14v-10h20v10h18v-9h23v18H25Z" fill="#343148"/>
    <path d="M42 111h2v3h-2ZM78 103h2v3h-2ZM84 112h2v3h-2ZM114 114h2v3h-2Z" fill="#e6cb82"/>
    <path d="M90 29h4v98h-4ZM25 70h140v4H25Z" fill="#362a2a"/><path d="M16 131h158v5H16Z" fill="#9a6b48"/>
    <path d="M148 123h10v8h-10ZM145 125h16v4h-16Z" fill="#d98949"/><path d="M152 120h2v4h-2Z" fill="#9b9a68"/>
    <path d="M255 28h36v43h-36Z" fill="#e9dcc0"/><path d="M255 28h36v7h-36Z" fill="#bf6f52"/>
    <path d="M262 42h3v2h-3ZM270 42h3v2h-3ZM278 42h3v2h-3ZM262 49h3v2h-3ZM270 49h3v2h-3ZM278 49h3v2h-3ZM262 56h3v2h-3ZM270 56h3v2h-3Z" fill="#b7aa96"/>
    <path d="M0 147h320v53H0Z" fill="#ab7b52"/><path d="M0 147h320v3H0Z" fill="#d1a372"/><path d="M0 185h320v3H0Z" fill="#d4a574"/><path d="M0 188h320v12H0Z" fill="#845a3e"/>
    <path d="M27 142h53v38H27Z" fill="#3d3c36"/><path d="M31 146h45v29H31Z" fill="#272d2c"/><path d="m37 153 3 3-3 3h2l3-3-3-3Z" fill="#c88461"/><path d="M37 165h23v2H37ZM37 169h17v1H37Z" fill="#4f5950"/><path d="M22 180h64v4H22Z" fill="#4b4a40"/>
    <path d="m266 115-22 65h66l-25-65Z" fill="#d5ad7426"/><path d="M276 112h3v66h-3Z" fill="#51473a"/>
    <path d="M258 101h39v6h4v10h-47v-10h4Z" fill="#f1dfb8"/><path d="M268 117h18v3h-18Z" fill="#d8bb7b"/>
    <path d="M259 178h37v4h-37Z" fill="#cbad83"/><path d="M252 172h43v5h-43Z" fill="#597c96"/><path d="M257 167h32v5h-32Z" fill="#e8d8b5"/>
  </svg>`;
}

const clawdPreviewCache=new Map();
export function renderClawdActionPreview(name){
  if(clawdPreviewCache.has(name))return clawdPreviewCache.get(name);
  const template=document.createElement('template');template.innerHTML=walkingClawd();
  const pose=template.content.querySelector('.pose-'+(name==='basket'?'stand':name));
  const basket=name==='basket'?template.content.querySelector('.clawd-basket-prop')?.outerHTML||'':'';
  // Fixed body scale and foot baseline; never fit the character to prop bounds.
  const viewBox=name==='broom'?'-14 -34 70 64':'-8 -24 56 46';
  const html=`<span class="clawd-action-sample" data-preview-action="${name}" aria-hidden="true"><svg class="composer-clawd-sprite" viewBox="${viewBox}" shape-rendering="crispEdges">${pose?.outerHTML||''}${basket}</svg></span>`;
  clawdPreviewCache.set(name,html);return html;
}

function pixelGarden(night=false){
  const sky=night?'#333149':'#faf3ed',far=night?'#595474':'#e9e0ee',near=night?'#73768c':'#e3e5d9',floor=night?'#777184':'#ede4d9';
  return `<svg class="composer-clawd-landscape" viewBox="0 0 320 200" preserveAspectRatio="none" shape-rendering="crispEdges" aria-hidden="true"><path d="M0 0h320v200H0Z" fill="${sky}"/>
  <path d="M16 35h8v-5h18v5h12v6H16ZM118 58h9v-5h15v5h9v5h-33Z" fill="${night?'#696078':'#fffdf8'}"/>
  ${night?'<path d="M264 24h17v4h-8v15h8v4h-17v-5h-4V29h4Z" fill="#efdfb9"/><path d="M70 23h2v2h-2ZM181 33h3v3h-3ZM226 64h2v2h-2Z" fill="#e9d7bd"/>':'<path d="M264 31h16v4h5v15h-5v5h-16v-5h-5V35h5Z" fill="#f5d8b4"/>'}
  <path d="M0 132h18v-9h24v-9h26v-8h32v8h25v11h26v9h22v-8h28v-10h29v-8h27v9h29v10h34v73H0Z" fill="${far}"/>
  <path d="M0 157h28v-8h36v-8h39v8h34v11h24v-5h35v-14h30v-9h34v10h32v10h28v48H0Z" fill="${near}"/>
  ${night?'<path d="M0 160h320v3H0ZM15 160h3v25h-3ZM65 160h3v25h-3ZM254 160h3v25h-3ZM304 160h3v25h-3Z" fill="#a79caf"/>':'<path d="M20 147h4v38h-4ZM294 152h4v33h-4Z" fill="#c6b2a3"/><path d="M10 126h24v7h7v20h-7v8H10v-8H3v-20h7ZM283 137h27v7h7v17h-7v7h-27v-7h-7v-17h7Z" fill="#ccbfda"/>'}
  <path d="M0 185h320v15H0Z" fill="${floor}"/><path d="M51 173h3v12h-3ZM267 169h3v16h-3Z" fill="#a9b69d"/><path d="M48 162h8v3h4v7h-4v3h-8v-3h-4v-7h4ZM264 158h8v3h4v7h-4v3h-8v-3h-4v-7h4Z" fill="#fff1d2"/><path d="M49 166h6v5h-6ZM265 162h6v5h-6Z" fill="#ddbb85"/></svg>`;
}

export function mountComposerClawd(field,{owner='local',controls}={}){
  if(!field||field.querySelector('.composer-clawd-scene'))return ()=>{};
  const scene=document.createElement('div');scene.className='composer-clawd-scene';scene.setAttribute('aria-hidden','true');
  scene.innerHTML=`${pixelRoom()}<div class="composer-clawd-ground"></div><div class="composer-clawd-glass"></div>`;
  const path=document.createElement('div');path.className='composer-clawd-path';path.setAttribute('aria-hidden','true');
  path.innerHTML=`<button type="button" class="composer-clawd-walker" aria-label="和 Clawd 打个招呼" title="点我打个招呼"><span class="composer-clawd-facing">${walkingClawd()}</span></button>`;
  const walker=path.querySelector('button'),motion=matchMedia('(prefers-reduced-motion: reduce)');
  // The sheet pull has one explicitly selected frame, independent of the
  // walking SVG's staggered visibility animations and paused idle timelines.
  const pullSprite=document.createElementNS('http://www.w3.org/2000/svg','svg');
  pullSprite.setAttribute('class','composer-clawd-pull-sprite');pullSprite.setAttribute('viewBox','0 -1 36 22');pullSprite.setAttribute('shape-rendering','crispEdges');pullSprite.setAttribute('aria-hidden','true');
  pullSprite.innerHTML=walker.querySelector('.pose-scene').innerHTML;walker.append(pullSprite);walker.dataset.pullFrame='0';
  const rim=document.createElement('button');rim.type='button';rim.className='composer-clawd-rim';
  rim.setAttribute('aria-label','Clawd 小世界上边框，向上拖动放大，向下拖动收起');
  rim.setAttribute('aria-expanded','false');rim.title='按住上边框向上拖动';rim.innerHTML='<span></span>';
  field.classList.add('composer-clawd');field.prepend(scene,path,rim);
  let height=0,drag=null,dragged=false,closed=false,entryTimer,actionTimer,gestureTimer,toys,options,previousAction='',openRAF=0,lastAutoOpen=-Infinity,caughtBasket=false,petDrag=null,suppressPetClick=false,sceneRAF=0,scenePull=null,lastSceneChange=-Infinity,manualAction='';
  const input=field.querySelector('textarea');
  const busyInput=()=>Boolean(input?.value)||document.activeElement?.matches('textarea,input,[contenteditable="true"]');
  const stopOpening=()=>{cancelAnimationFrame(openRAF);field.classList.remove('clawd-opening');};
  const phaseTimers=new Set();
  const phase=(fn,ms)=>{const timer=setTimeout(()=>{phaseTimers.delete(timer);if(!closed)fn();},ms);phaseTimers.add(timer);};
  const clearPhases=()=>{
    clearTimeout(entryTimer);for(const timer of phaseTimers)clearTimeout(timer);phaseTimers.clear();
    field.classList.remove('clawd-tipping','clawd-falling','clawd-parachuting','clawd-landing','clawd-drop-held');field.style.removeProperty('--clawd-drop-duration');walker.disabled=false;
  };
  const stopScenePull=()=>{
    cancelAnimationFrame(sceneRAF);if(!scenePull)return;
    const held={left:walker.getBoundingClientRect().left-path.getBoundingClientRect().left,facing:1};scenePull.cancel();scenePull=null;field.classList.remove('clawd-scene-approaching','clawd-scene-changing');resumeAt(held);walker.style.removeProperty('left');
  };
  const clearGesture=()=>{manualAction='';stopScenePull();clearTimeout(actionTimer);clearTimeout(gestureTimer);delete field.dataset.clawdAction;toys?.stop(false);};
  const scheduleAction=()=>{
    clearTimeout(actionTimer);
    if(closed||document.hidden||motion.matches||options?.isOpen()||manualAction||field.dataset.clawdAction||scenePull)return;
    actionTimer=setTimeout(()=>{
      let choices=['stand','sit','sleep','stretch','wave','look','hop'];
      choices.push(...Object.keys(clawdHobbies).filter(name=>!(name==='broom'||clawdActivities[name]?.airborne)||height>130));
      if(height>90&&!busyInput())choices.push('basket','basket','basket');
      if(height>140&&!busyInput()&&performance.now()-lastSceneChange>120000)choices.push('scene');
      if(height<=35&&!busyInput()&&performance.now()-lastAutoOpen>120000)choices.push('open');
      choices=choices.filter(name=>name!==previousAction);const name=choices[Math.floor(Math.random()*choices.length)];previousAction=name;gesture(name);
    },3500+Math.random()*3000);
  };
  const gesture=(name,manual=false)=>{
    if(closed||drag||document.hidden||(!manual&&(motion.matches||manualAction))||walker.disabled||(!manual&&options?.isOpen())||field.classList.contains('clawd-grabbed')){scheduleAction();return;}
    clearGesture();
    if(manual)manualAction=name;
    if(name==='carry'){if(!toys.play()){manualAction='';scheduleAction();}return;}
    if(name==='basket'){if(!toys.playBasket()){manualAction='';scheduleAction();}return;}
    if(name==='open'){openAtCenter();return;}
    if(name==='scene'){pullScene(manual);return;}
    field.dataset.clawdAction=name;
    walker.querySelector('.pose-'+name)?.getAnimations({subtree:true}).forEach(animation=>{animation.currentTime=0;});
    gestureTimer=setTimeout(()=>{manualAction='';delete field.dataset.clawdAction;scheduleAction();},({...clawdHobbies,cry:1800,stand:5000,sit:8000,sleep:11000,stretch:1800,look:1500,wave:1100,hop:650})[name]||1100);
  };
  toys=mountComposerToys(field,walker,{controls,canPlay:()=>height>90&&field.classList.contains('clawd-inside')&&!walker.disabled&&!drag&&!motion.matches&&!document.hidden&&!busyInput()&&(!options?.isOpen()||field.classList.contains('clawd-previewing'))&&!field.classList.contains('clawd-grabbed'),onFinish(){manualAction='';scheduleAction();}});
  const resumeAt=held=>{
    const span=Math.max(1,path.clientWidth-walker.offsetWidth),ratio=Math.max(0,Math.min(1,held.left/span));
    const progress=held.facing<0?.25+(1-ratio)*.5:(.75+ratio*.5)%1;
    field.classList.remove('clawd-picked-up');
    if(motion.matches){walker.style.left=(ratio*span)+'px';return;}
    walker.style.removeProperty('left');
    for(const el of [walker,walker.firstElementChild])for(const animation of el.getAnimations())animation.currentTime=progress*18000;
  };
  const pullScene=manual=>{
    if(height<=140||busyInput()){manualAction='';scheduleAction();return;}
    scenePull=options.beginBackgroundPeel();if(!scenePull){manualAction='';scheduleAction();return;}
    lastSceneChange=performance.now();
    if(motion.matches){scenePull.finish();scenePull=null;manualAction='';scheduleAction();return;}
    const started=performance.now(),start=8-path.offsetLeft,from=walker.getBoundingClientRect().left-path.getBoundingClientRect().left,approach=Math.max(250,Math.min(900,Math.abs(from-start)*7));
    field.classList.add('clawd-scene-approaching');
    const tick=now=>{
      if(closed||height<=140||drag||document.hidden||busyInput()){clearGesture();scheduleAction();return;}
      const elapsed=now-started;
      if(elapsed<approach){walker.style.left=(from+(start-from)*elapsed/approach)+'px';sceneRAF=requestAnimationFrame(tick);return;}
      walker.dataset.pullFrame=String(Math.floor((elapsed-approach)/180)%4);
      field.classList.remove('clawd-scene-approaching');field.classList.add('clawd-scene-changing');field.dataset.clawdAction='scene';
      const t=Math.min(1,(elapsed-approach)/2800),limit=field.clientWidth-path.offsetLeft-walker.offsetWidth-8;
      scenePull.progress(t);walker.style.left=Math.min(limit,start+t*field.clientWidth)+'px';
      // Let go at the inside edge while the sheet slides the last few pixels out.
      if(start+t*field.clientWidth>limit)field.dataset.clawdAction='wave';
      if(t<1)sceneRAF=requestAnimationFrame(tick);else{scenePull.finish();scenePull=null;manualAction='';field.classList.remove('clawd-scene-changing');delete field.dataset.clawdAction;resumeAt({left:path.clientWidth-walker.offsetWidth,facing:-1});scheduleAction();}
    };walker.style.left=from+'px';sceneRAF=requestAnimationFrame(tick);
  };
  const dropHeld=held=>{
    const floor=Math.min(60,7+height*.25),gap=held.bottom-floor;
    if(height<=35||gap<12||motion.matches){walker.style.removeProperty('bottom');resumeAt(held);scheduleAction();return;}
    const duration=Math.max(400,Math.min(1660,gap*6));
    field.classList.add('clawd-inside','clawd-falling','clawd-drop-held');field.style.setProperty('--clawd-drop-duration',duration+'ms');walker.disabled=true;
    resumeAt(held);void walker.offsetHeight;walker.style.removeProperty('bottom');
    if(gap>80)phase(()=>field.classList.add('clawd-parachuting'),100);
    phase(()=>{field.classList.remove('clawd-falling','clawd-parachuting');field.classList.add('clawd-landing');phase(()=>{clearPhases();scheduleAction();},460);},duration);
  };
  walker.onpointerdown=e=>{
    if(e.button>0||walker.disabled||drag||petDrag)return;caughtBasket=toys.basketActive();stopOpening();clearGesture();field.classList.add('clawd-grabbed');
    const actor=walker.getBoundingClientRect(),box=path.getBoundingClientRect(),matrix=getComputedStyle(walker.firstElementChild).transform;
    petDrag={id:e.pointerId,x:e.clientX,y:e.clientY,left:actor.left-box.left,bottom:box.bottom-actor.bottom,startLeft:actor.left-box.left,startBottom:box.bottom-actor.bottom,facing:matrix.startsWith('matrix(-')?-1:1,moved:false};
    walker.setPointerCapture(e.pointerId);
  };
  walker.onpointermove=e=>{
    if(petDrag?.id!==e.pointerId)return;
    const dx=e.clientX-petDrag.x,dy=e.clientY-petDrag.y;
    if(!petDrag.moved&&Math.hypot(dx,dy)<5)return;
    petDrag.moved=true;e.preventDefault();const box=path.getBoundingClientRect();
    petDrag.left=Math.max(0,Math.min(box.width-walker.offsetWidth,petDrag.startLeft+dx));
    petDrag.bottom=height>35?Math.max(Math.min(60,7+height*.25),Math.min(box.height-walker.offsetHeight-12,petDrag.startBottom-dy)):box.height-3;
    if(Math.abs(dx)>4)petDrag.facing=dx<0?-1:1;
    walker.style.left=petDrag.left+'px';walker.style.bottom=petDrag.bottom+'px';field.style.setProperty('--clawd-held-facing',String(petDrag.facing));field.classList.add('clawd-picked-up');
  };
  const letGo=e=>{
    if(petDrag?.id!==e.pointerId)return;
    const held=petDrag;petDrag=null;field.classList.remove('clawd-grabbed');if(walker.hasPointerCapture(e.pointerId))walker.releasePointerCapture(e.pointerId);
    if(held.moved){caughtBasket=false;suppressPetClick=e.type==='pointerup';dropHeld(held);}
    else if(height>35&&!field.classList.contains('clawd-inside'))enterWorld();else scheduleAction();
  };
  walker.onpointerup=letGo;walker.onpointercancel=letGo;walker.onlostpointercapture=e=>{if(petDrag?.id===e.pointerId)letGo(e);};
  walker.onclick=e=>{if(suppressPetClick&&e.detail!==0){suppressPetClick=false;return;}suppressPetClick=false;const cry=caughtBasket||toys.basketActive();caughtBasket=false;gesture(cry?'cry':'wave');};
  const maxHeight=()=>Math.max(0,Math.min(360,(window.visualViewport?.height||window.innerHeight)*.55-72));
  const setHeight=value=>{
    const wasExpanded=height>35;
    height=Math.max(0,Math.min(maxHeight(),value));
    field.style.setProperty('--clawd-expand',`${height}px`);
    field.classList.toggle('clawd-expanded',height>35);
    options?.expanded(height);
    rim.setAttribute('aria-expanded',String(height>35));
    if(height<=35){
      toys.stop(false);if(wasExpanded)lastAutoOpen=performance.now();
      clearPhases();field.classList.remove('clawd-inside');
    }
  };
  const openAtCenter=()=>{
    const waitingSince=performance.now();
    const wait=()=>{
      if(closed||height>35||drag||document.hidden||motion.matches||busyInput()||options?.isOpen()||field.classList.contains('clawd-grabbed')){scheduleAction();return;}
      const actor=walker.getBoundingClientRect(),box=rim.getBoundingClientRect();
      if(Math.abs(actor.x+actor.width/2-box.x-box.width/2)>7){if(performance.now()-waitingSince>20000){scheduleAction();return;}openRAF=requestAnimationFrame(wait);return;}
      clearGesture();field.classList.add('clawd-opening');lastAutoOpen=performance.now();
      const started=performance.now(),target=Math.min(180,maxHeight());
      const pull=now=>{
        if(closed||drag||busyInput()||document.hidden||options?.isOpen()){stopOpening();if(height>35)enterWorld();else scheduleAction();return;}
        const t=Math.min(1,(now-started)/1000);setHeight(target*(1-(1-t)**3));
        if(t<1)openRAF=requestAnimationFrame(pull);else{stopOpening();enterWorld(180);}
      };openRAF=requestAnimationFrame(pull);
    };openRAF=requestAnimationFrame(wait);
  };
  const enterWorld=(delay=0)=>{
    if(height<=35||walker.disabled||field.classList.contains('clawd-inside'))return;
    clearTimeout(entryTimer);
    entryTimer=setTimeout(()=>{
      if(closed||height<=35)return;
      clearGesture();
      if(motion.matches){field.classList.add('clawd-inside');return;}
      walker.disabled=true;field.classList.add('clawd-tipping');
      phase(()=>{
        field.classList.remove('clawd-tipping');field.classList.add('clawd-inside','clawd-falling');
        phase(()=>field.classList.add('clawd-parachuting'),120);
        phase(()=>{
          field.classList.remove('clawd-falling','clawd-parachuting');field.classList.add('clawd-landing');
          phase(()=>{field.classList.remove('clawd-landing');walker.disabled=false;scheduleAction();},460);
        },1660);
      },280);
    },delay);
  };
  const updateVisibility=()=>{field.classList.toggle('clawd-paused',document.hidden);if(document.hidden){stopOpening();clearGesture();}else scheduleAction();};
  const motionChanged=()=>{stopOpening();clearPhases();clearGesture();if(height>35)field.classList.add('clawd-inside');scheduleAction();};
  rim.onpointerdown=e=>{
    if(e.button>0||petDrag)return;
    stopOpening();clearGesture();clearPhases();
    drag={id:e.pointerId,y:e.clientY,height};dragged=false;
    field.classList.add('clawd-dragging');rim.setPointerCapture(e.pointerId);e.preventDefault();
  };
  rim.onpointermove=e=>{
    if(drag?.id!==e.pointerId)return;
    const delta=drag.y-e.clientY;if(Math.abs(delta)>4)dragged=true;setHeight(drag.height+delta);
  };
  const finish=e=>{
    if(drag?.id!==e.pointerId)return;
    drag=null;field.classList.remove('clawd-dragging');
    if(rim.hasPointerCapture(e.pointerId))rim.releasePointerCapture(e.pointerId);
    enterWorld();
    scheduleAction();
  };
  rim.onpointerup=finish;rim.onpointercancel=finish;rim.onlostpointercapture=finish;
  rim.onclick=()=>{stopOpening();if(!dragged){setHeight(height>35?0:240);enterWorld(300);if(height<=35)scheduleAction();}dragged=false;};
  rim.onkeydown=e=>{
    if(['ArrowUp','ArrowDown','Home','End','Escape'].includes(e.key)){
      stopOpening();clearGesture();
      e.preventDefault();setHeight(e.key==='Home'||e.key==='Escape'?0:e.key==='End'?maxHeight():height+(e.key==='ArrowUp'?30:-30));enterWorld(300);if(height<=35)scheduleAction();
    }
  };
  const resize=()=>{if(toys.active())toys.stop();setHeight(height);};
  const interruptForInput=()=>{stopOpening();clearGesture();scheduleAction();};
  input?.addEventListener('input',interruptForInput);
  options=mountClawdWorldOptions(field,scene,{owner,actions:clawdActionCatalog,renderAction:renderClawdActionPreview,onAction:name=>{field.classList.add('clawd-previewing');gesture(name,true);},backgrounds:{room:pixelRoom,garden:()=>pixelGarden(),night:()=>pixelGarden(true),christmas:pixelChristmas},onOpen(){field.classList.remove('clawd-previewing');stopOpening();clearGesture();},onClose(){field.classList.remove('clawd-previewing');if(closed)return;if(height>35&&!field.classList.contains('clawd-inside'))enterWorld();else scheduleAction();}});
  window.addEventListener('resize',resize);window.visualViewport?.addEventListener('resize',resize);
  document.addEventListener('visibilitychange',updateVisibility);motion.addEventListener('change',motionChanged);updateVisibility();
  return ()=>{
    if(closed)return;closed=true;
    window.removeEventListener('resize',resize);window.visualViewport?.removeEventListener('resize',resize);
    input?.removeEventListener('input',interruptForInput);
    stopOpening();clearPhases();clearGesture();toys.close();options.close();document.removeEventListener('visibilitychange',updateVisibility);motion.removeEventListener('change',motionChanged);
    scene.remove();path.remove();rim.remove();
    petDrag=null;walker.onpointerdown=walker.onpointermove=walker.onpointerup=walker.onpointercancel=walker.onlostpointercapture=walker.onclick=null;
    field.classList.remove('clawd-picked-up','clawd-drop-held','clawd-previewing','composer-clawd','clawd-expanded','clawd-dragging','clawd-tipping','clawd-falling','clawd-parachuting','clawd-landing','clawd-inside','clawd-paused','clawd-grabbed','clawd-carrying');
    field.style.removeProperty('--clawd-held-facing');
    field.style.removeProperty('--clawd-expand');
  };
}

export const clawdActionCatalog=[['stand','发呆'],['sit','坐一会'],['sleep','打瞌睡'],['stretch','伸懒腰'],['wave','挥手'],['look','左顾右盼'],['hop','蹦一下'],['guitar','电吉他'],['broom','踩扫把飞'],['read','翻书'],['tea','端茶杯'],['dance','跳舞'],['dj','戴耳机打碟'],['paperplane','纸飞机'],['snowman','堆雪人'],...Object.entries(clawdActivities).map(([id,v])=>[id,v.label]),['basket','捡图标'],['cry','哭哭'],['scene','拉走背景']];
