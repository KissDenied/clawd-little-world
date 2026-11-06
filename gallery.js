import {clawdActionCatalog,renderClawdActionPreview} from './components/composer-clawd.js';
const gallery=document.querySelector('#gallery');
for(const [id,label] of clawdActionCatalog){const card=document.createElement('figure');card.dataset.action=id;card.innerHTML=renderClawdActionPreview(id);const caption=document.createElement('figcaption');caption.textContent=label;card.append(caption);gallery.append(card);}
