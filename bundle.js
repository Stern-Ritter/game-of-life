!function(){"use strict";function t(t,e,n,r){t.innerHTML="";var a=e.reduce((function(t,e,a){var c=e.reduce((function(t,e,c){var u,o=document.createElement("td"),i=n[a][c];return u=1===e&&1===i?"cell_alive":1===e&&0===i?"cell_dying":"cell_dead",o.classList.add("cell",u),o.dataset.x=String(c),o.dataset.y=String(a),r&&o.addEventListener("click",(function(t){return r(Number(t.target.dataset.x),Number(t.target.dataset.y))})),t.append(o),t}),document.createElement("tr"));return t.append(c),t}),document.createElement("table"));a.classList.add("game__field"),t.append(a)}function e(t,e,n){var r;return(null===(r=t[n])||void 0===r?void 0:r[e])||0}function n(t){var n=t.map((function(t){return t.slice()}));return t.forEach((function(r,a){return r.forEach((function(r,c){var u=function(t,n,r){for(var a=0,c=r-1;c<=r+1;c+=1)for(var u=n-1;u<=n+1;u+=1)a+=e(t,u,c);return a-e(t,n,r)}(t,c,a),o=e(t,c,a);n[a][c]=function(t,e){var n=t;return 0===t&&3===e&&(n=1),1===t&&(e<2||e>3)&&(n=0),n}(o,u)}))})),n}!function(e,r,a){var c,u,o,i=!1,d=Array.from(Array(10),(function(){return Array(10).fill(0)})),l=document.createElement("h1"),s=document.createElement("div"),m=document.createElement("div"),f=document.createElement("button"),v=document.createElement("button"),p=document.createElement("input"),_=document.createElement("span");function g(e,n){d[n][e]=1===d[n][e]?0:1,t(s,d,d,g)}function b(){clearInterval(c),i=!1,f.textContent="Start"}function E(e){clearInterval(c),c=window.setInterval((function(){d=n(d),o=n(d),(function(t){return!t.some((function(t){return t.some((function(t){return 1===t}))}))}(d)||u(d))&&b(),setTimeout(t,Number(e)/2,s,d,o,g),t(s,d,d,g)}),Number(e))}l.textContent="Game of life",l.classList.add("game__title"),s.classList.add("game__container"),m.classList.add("button-handler"),f.classList.add("game__button","game__start-btn"),v.classList.add("game__button","game__clear-btn"),f.type="button",f.textContent="Start",v.type="button",v.textContent="Clear",p.classList.add("game__input_speed"),p.type="range",p.min="500",p.max="3000",p.value="1000",p.step="500",_.textContent="Speed: ".concat((1e3/Number(p.value)).toFixed(2)," generation/sec"),f.addEventListener("click",(function(){return i?b():(i=!0,f.textContent="Stop",t=new Set,u=function(e){var n=JSON.stringify(e),r=t.has(n);return r||t.add(n),r},u(d),void E(p.value));var t})),v.addEventListener("click",(function(){d=function(t){return t.map((function(t){return t.map((function(){return 0}))}))}(d),t(s,d,d,g)})),p.addEventListener("change",(function(){i&&E(p.value),_.textContent="Speed: ".concat((1e3/Number(p.value)).toFixed(2)," generation/sec")})),t(s,d,d,g),m.append(f,v),a.append(l,s,m,p,_)}(0,0,document.querySelector(".game"))}();