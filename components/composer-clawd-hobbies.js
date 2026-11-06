// Local fan-art extensions; shared anatomy/clothes come from the composer.
// These are not exports from Anthropic's videos. See composer-clawd-SOURCE.md.
import {clawdActivities,renderClawdActivities} from './composer-clawd-activities.js';
import {renderClawdStories} from './composer-clawd-stories.js';
export const clawdHobbies={guitar:5600,broom:6200,read:8000,tea:6000,dance:4200,dj:8000,paperplane:8400,snowman:10800,...Object.fromEntries(Object.entries(clawdActivities).map(([id,value])=>[id,value.duration]))};
export function renderClawdHobbies({body,eyes,feet,hand}){
 const actor=body+feet(4)+eyes;
 const headphones=`<path d="M5 3V0h3v-2h4v-1h12v1h4v2h3v3h-1V1h-3v-2h-3v-1H12v1H9v2H6v2Z" fill="#c6d4cf"/><path d="M3 3h3v7H3ZM30 3h3v7h-3Z" fill="#dce7dd"/><path d="M2 4h1v5H2ZM33 4h1v5h-1Z" fill="#a5bdb4"/>`;
 return `<g class="clawd-pose pose-dj">
 <g class="dj-performer">${actor}
 <g class="dj-headphones">${headphones}</g>
 </g>
 <g class="dj-deck"><path d="M10 14h26v2H10ZM11 16h2v6h-2ZM33 16h2v6h-2Z" fill="#aeb4ad"/><path d="M10 14h26v1H10Z" fill="#dce1d6"/><path d="M13 14h6v1h-6ZM27 14h6v1h-6Z" fill="#444b4b"/><g class="dj-record-marks" fill="#aebfbd"><path d="M15 14h2v1h-2ZM29 14h2v1h-2Z"/></g><g class="dj-mixer-lights"><path d="M21 13h1v2h-1ZM24 13h1v2h-1Z" fill="#d1b37e"/></g></g>
 <g class="dj-hands"><g class="dj-hand-left"><path class="dj-hand-edge" d="M1 8h1v5h5V8H6v4H2V8Z" fill="#97513c"/>${hand('left',8)}<path class="dj-hand-edge" d="M2 11h4v1H2Z" fill="#f0aa7c"/></g><g class="dj-hand-right"><path class="dj-hand-edge" d="M29 8h1v5h5V8h-1v4h-4V8Z" fill="#97513c"/>${hand('right',8)}<path class="dj-hand-edge" d="M30 11h4v1h-4Z" fill="#f0aa7c"/></g></g>
 </g><g class="clawd-pose pose-guitar"><g class="guitar-rocker">${actor}
  <path d="m8 0 19 15h-2L7 2Z" fill="#67576e"/>
  <g transform="rotate(-28 20 15)"><path d="M10 10h5v3h5v-3h5v3h3v7h-3v2H13v-2h-3Z" fill="#a55c86"/><path d="M15 14h9v5h-9Z" fill="#e5bbd3"/><path d="M24 14h14v3H24Z" fill="#c39b68"/><path d="M36 12h5v6h-5Z" fill="#8c6c53"/><path d="M16 15h23v1H16Z" fill="#fff0d5"/><path d="M17 14h2v6h-2Z" fill="#665468"/>
  <g class="guitar-fret" data-guitar-arm="fretting"><path d="M28 13h7v4h-4v-1h-3Z" fill="#D97757"/><path d="M32 13h1v3h-1Z" fill="#B45E40"/></g></g>
  <g class="guitar-strum" data-guitar-arm="strumming"><path d="M2 8h4v3h7v2h8v4h-4v-2H9v-2H2Z" fill="#D97757"/><path d="M17 16h4v1h-4Z" fill="#B45E40"/></g></g>
  <g class="hobby-notes" fill="#b58dc4"><path d="M0-8h1v6h-3v-2h2ZM34-12h1v5h-3v-2h2ZM35-12h3v2h-3Z"/></g></g>
 <g class="clawd-pose pose-broom"><g class="broom-rider">${actor+hand('left',7)+hand('right',7)}<g transform="translate(0 4)">
  <path d="M-3 16h44v2H-3Z" fill="#986b4c"/><path d="M-5 13h7v8h-7v2h-6V11h6Z" fill="#d9b978"/><path d="M-9 14h7v1h-7ZM-9 18h7v1h-7Z" fill="#ad8856"/><path d="M0 13h2v8H0Z" fill="#b88aa8"/>
  </g></g>
  <g class="broom-sparkles" fill="#e3c783"><path d="M-9 3h2v2h-2ZM-15 12h3v1h-3ZM-5-5h1v4h-1ZM-7-4h5v1h-5Z"/></g></g>
 <g class="clawd-pose pose-read">${actor}
  <path d="M7 10h8l3 2 3-2h8v11h-8l-3 2-3-2H7Z" fill="#8f789f"/><path d="M8 10h7l3 2 3-2h7v9h-7l-3 2-3-2H8Z" fill="#f4e8cb"/><path d="M18 12h1v9h-1ZM10 13h5v1h-5ZM10 16h5v1h-5ZM22 13h4v1h-4ZM22 16h4v1h-4Z" fill="#c7b697"/>
  <g class="book-page"><path d="M19 12h8v7h-6l-2 2Z" fill="#fff6df"/></g>${hand('left',12)+hand('right',12)}</g>
 <g class="clawd-pose pose-tea">${actor+hand('left',8)}<g class="tea-lift">
  <path d="M27 9h8v9h-8ZM35 10h3v6h-3Z" fill="#73716c"/><path d="M35 12h1v2h-1Z" fill="#aaa49b"/><path d="M28 10h6v2h-6Z" fill="#9d775e"/>${hand('right',14)}
  <g class="tea-steam" fill="#e2ccd9"><path d="M29 3h1v4h-1ZM32 1h1v4h-1Z"/></g></g></g>
 <g class="clawd-pose pose-dance"><g class="dance-body">${actor}<g class="pose-arms-a">${hand('left',-3)+hand('right',9)}</g><g class="pose-arms-b">${hand('left',9)+hand('right',-3)}</g></g><g class="hobby-notes" fill="#b58dc4"><path d="M0-8h1v6h-3v-2h2ZM34-9h1v5h-3v-2h2Z"/></g></g>${renderClawdStories({body,eyes,feet,hand})}${renderClawdActivities({body,eyes,feet,hand})}`;
}
