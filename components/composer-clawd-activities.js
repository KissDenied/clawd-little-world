// Source-frame playback; no independent prop tweening. See vendor/clawd-originals/SOURCE.md.
import {clawdOriginalFrames} from './clawd-original-frames.js';
const assets=new URL('../vendor/clawd-originals/',import.meta.url);
const labels={watering:'浇水',soccer:'踢足球',confetti:'撒花',weld:'电焊',sparkler:'烟花棒',chef:'大厨',hero:'超级飞侠',space:'太空漂浮',detective:'小侦探',computer:'玩电脑',wizard:'星星巫师'};
export const clawdActivities=Object.fromEntries(Object.entries(labels).map(([id,label])=>[id,{label,duration:Math.ceil(clawdOriginalFrames[id].frames/clawdOriginalFrames[id].fps*1000)+250,airborne:['hero','space'].includes(id)}]));
function renderSequence(id){
 const s=clawdOriginalFrames[id];
 return `<g class="clawd-pose pose-${id}" data-source-sequence="${id}"><g class="clawd-source-body-scale" transform="translate(18 20) scale(1.333333 1.25) translate(-18 -20)"><svg class="clawd-source-viewport" x="${s.x}" y="${s.y}" width="${s.width}" height="${s.height}" viewBox="0 0 ${s.width} ${s.height}" overflow="hidden"><image class="clawd-source-strip" href="${new URL(id+'.png',assets).href}" width="${s.width*s.frames}" height="${s.height}" preserveAspectRatio="none"/><image class="clawd-source-still" href="${new URL(id+'-still.png',assets).href}" width="${s.width}" height="${s.height}"/></svg></g></g>`;
}
export function renderClawdActivities(){return Object.keys(labels).map(renderSequence).join('');}
