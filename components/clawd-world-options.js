let worldOptionsId=0;
const choices={weather:[['clear','晴朗'],['cloudy','多云'],['rain','下雨'],['snow','飘雪']],background:[['room','暖木书桌'],['garden','小庭院'],['night','月光露台'],['christmas','圣诞小屋']],outfit:[['plain','原来的样子'],['christmas','圣诞帽']],backpack:[['auto','玩耍时背'],['on','一直背着'],['off','先放下']]};
const labels={weather:'天气',background:'背景',outfit:'衣服',actions:'动作'};
const glyphs={weather:'<path d="M5 13H3V8h3V5h6v3h3v5H5ZM6 16v2m5-2v2"/>',background:'<path d="M2 3h14v14H2Zm7 0v14M2 11h14M5 7h1m6-1h1"/>',outfit:'<path d="m6 3-4 3 3 4 1-1v8h7V9l1 1 3-4-4-3-2 2H8Z"/>',actions:'<path d="M5 4h10v9H5ZM2 8h3m10 0h3M7 13v4m6-4v4M8 7v2m4-2v2"/>'};
export function mountClawdWorldOptions(field,scene,{owner='local',backgrounds,actions=[],renderAction=()=>'',onAction=()=>{},onOpen=()=>{},onClose=()=>{}}){
  const key='kiss.composer-clawd.options.v1.'+encodeURIComponent(owner),defaults={weather:'clear',background:'room',outfit:'plain',backpack:'auto'};
  const normalize=value=>Object.fromEntries(Object.entries(choices).map(([name,list])=>[name,list.some(([id])=>id===value?.[name])?value[name]:defaults[name]]));
  let saved;try{saved=JSON.parse(localStorage.getItem(key)||'null');}catch{}
  let preferences=normalize(saved),active='',closed=false,lastButton=null,peel=null;
  const id='clawd-world-options-'+(++worldOptionsId),tools=document.createElement('nav'),panel=document.createElement('section');
  tools.className='clawd-world-tools';tools.hidden=true;tools.setAttribute('aria-label','Clawd 小世界设置');
  tools.innerHTML=Object.entries(glyphs).map(([name,path])=>`<button type="button" data-world-menu="${name}" aria-label="${labels[name]}" aria-expanded="false" aria-controls="${id}"><svg viewBox="0 0 20 20" aria-hidden="true">${path}</svg><span>${labels[name]}</span></button>`).join('');
  panel.className='clawd-world-options';panel.id=id;panel.hidden=true;panel.setAttribute('aria-label','小世界选项');
  const weather=document.createElement('div');weather.className='clawd-weather-wrap';weather.setAttribute('aria-hidden','true');
  weather.innerHTML='<div class="clawd-weather"><svg class="clawd-weather-clouds" viewBox="0 0 160 90" preserveAspectRatio="none"><path d="M7 25h9v-6h23v6h9v7H7ZM90 43h10v-7h25v7h12v8H90Z" fill="#d7d1e7"/></svg><div class="clawd-weather-particles"></div></div>';
  const particles=weather.querySelector('.clawd-weather-particles');
  for(let i=0;i<20;i++){const dot=document.createElement('i');dot.style.left=((i*37)%100)+'%';dot.style.top=((i*23)%100)+'%';dot.style.animationDelay=(-i*.31)+'s';dot.style.animationDuration=(2.1+i%4*.4)+'s';particles.append(dot);}
  field.append(tools,panel);scene.append(weather);
  const renderOptions=()=>{
    if(!active)return;
    if(active==='actions'){panel.innerHTML=`<header><strong>待机动作</strong><button type="button" data-world-close aria-label="关闭小世界设置">×</button></header><div class="clawd-action-gallery">${actions.map(([name,label])=>`<button type="button" data-clawd-preview="${name}" aria-label="${label}" aria-pressed="false">${renderAction(name)}</button>`).join('')}</div>`;return;}
    const group=name=>`<div class="clawd-option-choices" role="group" aria-label="${name==='backpack'?'小书包':{weather:'天气',background:'背景',outfit:'衣服'}[name]}">${choices[name].map(([value,label])=>`<button type="button" data-world-option="${name}" data-value="${value}" aria-pressed="${preferences[name]===value}">${label}</button>`).join('')}</div>`;
    panel.innerHTML=`<header><strong>${{weather:'天气',background:'背景',outfit:'衣服'}[active]}</strong><button type="button" data-world-close aria-label="关闭小世界设置">×</button></header>${group(active)}${active==='outfit'?'<h3>小书包</h3>'+group('backpack'):''}`;
  };
  const apply=()=>{
    for(const [name,value] of Object.entries(preferences))field.dataset['world'+name[0].toUpperCase()+name.slice(1)]=value;
    const html=backgrounds[preferences.background]?.();if(html){const template=document.createElement('template');template.innerHTML=html;scene.querySelector('.composer-clawd-landscape')?.replaceWith(template.content.firstElementChild);}
    if(active)renderOptions();
  };
  const close=(focus=false)=>{if(!active)return;active='';panel.hidden=true;field.classList.remove('clawd-settings-open');for(const button of tools.querySelectorAll('button'))button.setAttribute('aria-expanded','false');if(focus)lastButton?.focus();if(!closed)onClose();};
  const menu=e=>{const button=e.target.closest('[data-world-menu]');if(!button)return;if(active===button.dataset.worldMenu){close();return;}lastButton=button;active=button.dataset.worldMenu;panel.hidden=false;field.classList.add('clawd-settings-open');for(const b of tools.querySelectorAll('button'))b.setAttribute('aria-expanded',String(b===button));renderOptions();onOpen();};
  const select=e=>{
    if(e.target.closest('[data-world-close]')){close(true);return;}
    const preview=e.target.closest('[data-clawd-preview]');if(preview){const name=preview.dataset.clawdPreview;if(actions.some(([id])=>id===name)){for(const b of panel.querySelectorAll('[data-clawd-preview]'))b.setAttribute('aria-pressed',String(b===preview));onAction(name);}return;}
    const button=e.target.closest('[data-world-option]');if(!button)return;
    preferences=normalize({...preferences,[button.dataset.worldOption]:button.dataset.value});try{localStorage.setItem(key,JSON.stringify(preferences));}catch{}
    const name=button.dataset.worldOption,value=button.dataset.value;apply();panel.querySelector(`[data-world-option="${name}"][data-value="${value}"]`)?.focus();
  };
  const outside=e=>{if(active&&!panel.contains(e.target)&&!tools.contains(e.target))close();};
  const keyboard=e=>{if(active&&e.key==='Escape'){e.preventDefault();e.stopPropagation();close(true);}};
  tools.addEventListener('click',menu);panel.addEventListener('click',select);panel.addEventListener('keydown',keyboard);document.addEventListener('pointerdown',outside);
  apply();
  const beginBackgroundPeel=()=>{
    peel?.cancel();const list=Object.keys(backgrounds),next=list[(list.indexOf(preferences.background)+1)%list.length],old=scene.querySelector('.composer-clawd-landscape');
    if(!old||!backgrounds[next])return null;
    const template=document.createElement('template');template.innerHTML=backgrounds[next]();const underneath=template.content.firstElementChild,edge=document.createElement('div');
    underneath.classList.add('clawd-next-landscape');old.classList.add('clawd-scene-sheet');edge.className='clawd-scene-sheet-edge';scene.insertBefore(underneath,old);scene.append(edge);
    let done=false;const oldTransform=old.style.transform;
    const tidy=()=>{edge.remove();old.classList.remove('clawd-scene-sheet');old.style.transform=oldTransform;peel=null;};
    peel={next,progress(t){if(done)return;const x=Math.max(0,Math.min(1,t))*scene.clientWidth;old.style.transform=`translateX(${x}px)`;edge.style.transform=`translateX(${x}px)`;},cancel(){if(done)return;done=true;underneath.remove();tidy();},finish(){if(done)return;done=true;old.remove();underneath.classList.remove('clawd-next-landscape');tidy();preferences=normalize({...preferences,background:next});try{localStorage.setItem(key,JSON.stringify(preferences));}catch{}apply();}};
    return peel;
  };
  return {isOpen:()=>Boolean(active),beginBackgroundPeel,expanded(height){tools.hidden=height<180;if(tools.hidden)close();},close(){closed=true;peel?.cancel();close();document.removeEventListener('pointerdown',outside);tools.remove();panel.remove();weather.remove();for(const name of Object.keys(defaults))delete field.dataset['world'+name[0].toUpperCase()+name.slice(1)];field.classList.remove('clawd-settings-open');}};
}
