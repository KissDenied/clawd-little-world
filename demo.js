import {mountComposerClawd} from './components/composer-clawd.js';
const form=document.querySelector('.demo-composer'),field=form.querySelector('.composer-field'),input=form.elements.message,slots=form.querySelector('.demo-controls'),count=document.querySelector('#control-count');
let dispose=()=>{};
function configure(){
 dispose();slots.replaceChildren();
 for(let i=0;i<Math.max(0,Math.min(20,Number(count.value)||0));i++){const button=document.createElement('button');button.type='button';button.dataset.clawdControl='';button.setAttribute('aria-label','空白图标占位 '+(i+1));slots.append(button);}
 dispose=mountComposerClawd(field,{owner:'public-demo',controls:()=>slots.querySelectorAll('[data-clawd-control]')});
}
count.addEventListener('change',configure);configure();
form.addEventListener('submit',event=>{event.preventDefault();const value=input.value.trim();if(!value)return;const bubble=document.createElement('p');bubble.className='demo-message-own';bubble.textContent=value;document.querySelector('.demo-messages').append(bubble);input.value='';input.dispatchEvent(new Event('input',{bubbles:true}));});
input.addEventListener('keydown',event=>{if(event.key==='Enter'&&!event.shiftKey&&!event.isComposing){event.preventDefault();form.requestSubmit();}});
window.addEventListener('pagehide',()=>dispose(),{once:true});
