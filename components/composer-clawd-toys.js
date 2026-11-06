// Animate the real controls, retaining their native click, disabled and focus state.
export function mountComposerToys(field,walker,{controls,canPlay=()=>true,onFinish=()=>{}}={}){
  const form=field.closest('form');
  const resolveControls=()=>[...new Set(Array.from((typeof controls==='function'?controls():controls)??form?.querySelectorAll('[data-clawd-control]')??[]))].filter(el=>el?.isConnected&&typeof el.getBoundingClientRect==='function');
  const props=['translate','rotate','scale','transition','position','z-index','will-change'];
  let toy=null,raf=0,returnTimer=0,held=false,closed=false;
  const stop=(notify=true)=>{
    cancelAnimationFrame(raf);clearTimeout(returnTimer);held=false;
    if(toy){for(const item of toy.items){for(const [key,value,priority] of item.styles){if(value)item.button.style.setProperty(key,value,priority);else item.button.style.removeProperty(key);}item.button.removeAttribute('data-clawd-toy');}toy=null;}
    field.classList.remove('clawd-carrying','clawd-basket-carrying','clawd-scooping');if(notify&&!closed)onFinish();
  };
  const play=(target,basket=false)=>{
    const buttons=resolveControls();if(closed||!buttons.length||!canPlay())return false;
    stop(false);const button=buttons.includes(target)?target:buttons[Math.floor(Math.random()*buttons.length)];
    const items=(basket?buttons:[button]).map(button=>({button,box:button.getBoundingClientRect(),styles:props.map(key=>[key,button.style.getPropertyValue(key),button.style.getPropertyPriority(key)])}));
    toy={items,basket};
    for(const {button} of items){button.dataset.clawdToy=basket?'basket':'carried';button.style.setProperty('position','relative');button.style.setProperty('z-index','20');button.style.setProperty('will-change','translate,rotate,scale');button.style.setProperty('transition','none');}
    field.classList.add('clawd-carrying');if(basket)field.classList.add('clawd-basket-carrying','clawd-scooping');
    const count=items.length,columns=Math.max(1,Math.ceil(Math.sqrt(count))),rows=Math.ceil(count/columns),slot=Math.min(14,30/columns,20/rows);
    const pickupWindow=Math.max(1200,Math.min(5000,(count-1)*160+500)),pickupDelay=count<2?0:Math.min(160,(pickupWindow-500)/(count-1)),returnAt=basket?pickupWindow+5000:2800;
    const start=performance.now(),ease=t=>1-(1-t)**3;
    const tick=now=>{
      if(!toy||held||closed)return;
      if(!canPlay()){stop();return;}
      const elapsed=now-start,actor=walker.getBoundingClientRect(),fieldBox=field.getBoundingClientRect(),side=actor.x+actor.width/2>fieldBox.x+fieldBox.width/2?-1:1;
      if(basket)field.style.setProperty('--clawd-basket-direction',String(side));
      if(elapsed>900)field.classList.remove('clawd-scooping');
      for(const [i,{button,box}] of toy.items.entries()){
        const pickup=basket?Math.max(0,elapsed-i*pickupDelay):elapsed;
        const amount=pickup<500?ease(pickup/500):elapsed<returnAt?1:1-ease(Math.min(1,(elapsed-returnAt)/500));
        const targetX=actor.x+actor.width/2+(basket?side*34+(i%columns-(columns-1)/2)*slot:0),targetY=actor.y+(basket?23+Math.floor(i/columns)*slot:-14);
        const dx=(targetX-(box.x+box.width/2))*amount,dy=(targetY-(box.y+box.height/2)+Math.sin(elapsed/170)*1.5)*amount;
        button.style.setProperty('translate',`${dx.toFixed(2)}px ${dy.toFixed(2)}px`);
        button.style.setProperty('rotate',`${(Math.sin(elapsed/230)*5*amount).toFixed(2)}deg`);
        if(basket)button.style.setProperty('scale',String(1-(1-Math.min(.36,slot/Math.max(box.width,box.height,1)))*amount));
      }
      if(elapsed>=(returnAt+500)){stop();return;}raf=requestAnimationFrame(tick);
    };
    raf=requestAnimationFrame(tick);return true;
  };
  const freeze=()=>{cancelAnimationFrame(raf);held=true;};
  const isToyTarget=target=>toy?.items.some(({button})=>button.contains(target));
  const pointer=e=>{if(!toy||e.target.closest?.('.clawd-world-options,.clawd-world-tools'))return;if(isToyTarget(e.target)){freeze();}else if(!walker.contains(e.target))stop();};
  const click=e=>{if(isToyTarget(e.target)){freeze();clearTimeout(returnTimer);returnTimer=setTimeout(()=>stop(),0);}};
  const release=()=>{if(held){clearTimeout(returnTimer);returnTimer=setTimeout(()=>stop(),400);}};
  const key=e=>{if(!toy||e.target.closest?.('.clawd-world-options,.clawd-world-tools'))return;if(isToyTarget(e.target))freeze();else if(!walker.contains(e.target))stop();};
  const keyup=()=>{if(held){clearTimeout(returnTimer);returnTimer=setTimeout(()=>stop(),0);}};
  const input=()=>{if(toy)stop();};
  form?.addEventListener('pointerdown',pointer,true);form?.addEventListener('click',click,true);form?.addEventListener('keydown',key,true);form?.addEventListener('keyup',keyup,true);form?.addEventListener('input',input,true);
  window.addEventListener('pointerup',release);window.addEventListener('pointercancel',input);
  return {play,playBasket:()=>play(null,true),basketActive:()=>Boolean(toy?.basket),stop,active:()=>Boolean(toy),close(){closed=true;stop(false);form?.removeEventListener('pointerdown',pointer,true);form?.removeEventListener('click',click,true);form?.removeEventListener('keydown',key,true);form?.removeEventListener('keyup',keyup,true);form?.removeEventListener('input',input,true);window.removeEventListener('pointerup',release);window.removeEventListener('pointercancel',input);}};
}
