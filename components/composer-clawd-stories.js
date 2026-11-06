// Original local stories, using the same body/clothes as the other local poses.
export function renderClawdStories({body,eyes,feet,hand}){
 const actor=body+feet(4)+eyes;
 const plane='<path d="m0 0 10-3-5 7-2-3Z" fill="#fff6e4"/><path d="m0 0 10-3-7 4v2" fill="none" stroke="#b69bbd" stroke-width=".7"/>';
 return `<g class="clawd-pose pose-paperplane">
  <g class="paperplane-actor">${body+feet(4)}<g class="paperplane-calm-eyes">${eyes}</g>
   <g class="paperplane-cry-face"><path d="M9 5h4v1H9ZM23 5h4v1h-4ZM16 11h4v2h-4Z" fill="#2A2A30"/><g class="paperplane-tears" fill="#a5cddc"><path d="M10 7h2v5h-2ZM24 7h2v5h-2Z"/></g></g>
   <g class="paperplane-bump"><path d="M26 1h4v1h2v4h-6Z" fill="#d99a9b"/><path d="M27 2h2v1h-2Z" fill="#f6c9bd"/></g>
   <g class="paper-fold-arms"><g transform="translate(8 2)">${hand('left',8)}</g><g transform="translate(-8 2)">${hand('right',8)}</g></g>
   <g class="paper-release-arms">${hand('left',8)+hand('right',2)}</g>
   <g class="paper-rest-arms">${hand('left',8)+hand('right',8)}</g>
  </g>
  <g class="paper-fold-sheet"><path d="M11 9h14v7H11Z" fill="#fff6e4"/><path d="m12 10 6 4 6-4M18 14v2" fill="none" stroke="#c8b1ca" stroke-width=".7"/></g>
  <g class="paperplane-flight">${plane}</g>
  <g class="paperplane-surprise" fill="#e5c384"><path d="M7-7h2v2H7ZM24-6h1v5h-1ZM22-4h5v1h-5Z"/></g>
 </g>
 <g class="clawd-pose pose-snowman">
  <g class="snow-source-pile"><path d="M28 19h4v-2h7v-1h7v2h5v3H28Z" fill="#edf1ed"/><path d="M29 20h21v1H29Z" fill="#c9d7db"/></g>
  <g class="snow-builder">${actor}
   <g class="snow-work-arms">${hand('left',8)}<g class="snow-working-hand">${hand('right',8)}</g></g>
   <g class="snow-reach-arms">${hand('left',8)+hand('right',0)}</g>
  </g>
  <g class="snowball-bottom"><path d="M3 0h8v2h3v8h-3v2H3v-2H0V2h3Z" fill="#edf1ed"/><path d="M2 8h10v2h-2v1H4v-1H2Z" fill="#c9d7db"/></g>
  <g class="snowball-head"><path d="M2 0h6v2h2v6H8v2H2V8H0V2h2Z" fill="#fff6e4"/></g>
  <g class="snowman-details"><path d="M38 3h1v2h-1ZM43 3h1v2h-1ZM40 7h3v1h-3ZM40 12h2v2h-2ZM40 16h2v2h-2Z" fill="#63556b"/><path d="M41 5h6v1h-6Z" fill="#d78b61"/><path d="m34 11-4-3m18 3 3-3" fill="none" stroke="#9b7b66" stroke-width="1"/><path d="M36 9h10v2H36ZM43 11h3v5h-3Z" fill="#b98094"/></g>
  <g class="snowman-hat"><g class="snowman-generic-hat"><path d="M37-5h8v5h-8ZM35-1h12v2H35Z" fill="#8d8db8"/><path d="M37-2h8v1h-8Z" fill="#efdba9"/></g><g class="snowman-santa-hat"><path d="M36-3h9v3h-9ZM38-6h5v3h-5ZM42-5h4v4h-4Z" fill="#b94d5e"/><path d="M35-1h12v2H35ZM45-1h3v3h-3Z" fill="#fff2df"/></g></g>
  <g class="snow-builder-puzzle" fill="#b69bbd"><path d="M13-9h5v1h1v3h-2v2h-2v-3h2v-1h-4ZM15-1h2v2h-2Z"/></g>
 </g>`;
}
