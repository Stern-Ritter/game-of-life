!function(){"use strict";function e(e,t,n){e.innerHTML="";var r=t.reduce((function(e,t,r){var a=t.reduce((function(e,t,a){var c=document.createElement("td");return c.classList.add("cell",1===t?"cell_alive":"cell_dead"),c.dataset.x=String(a),c.dataset.y=String(r),n&&c.addEventListener("click",(function(e){return n(Number(e.target.dataset.x),Number(e.target.dataset.y))})),e.append(c),e}),document.createElement("tr"));return e.append(a),e}),document.createElement("table"));r.classList.add("game__field"),e.append(r)}function t(e,t,n){var r;return(null===(r=e[n])||void 0===r?void 0:r[t])||0}!function(n,r,a){var c,u,o=!1,i=document.createElement("div"),d=document.createElement("button"),l=document.createElement("input"),s=document.createElement("span"),f=Array.from(Array(10),(function(){return Array(10).fill(0)}));function m(t,n){f[n][t]=1===f[n][t]?0:1,e(i,f,m)}function v(){clearInterval(c),o=!1,d.textContent="Start"}function p(n){clearInterval(c),c=window.setInterval((function(){(function(e){return!e.some((function(e){return e.some((function(e){return 1===e}))}))}(f=function(e){var n=e.map((function(e){return e.slice()}));return e.forEach((function(r,a){return r.forEach((function(r,c){var u=function(e,n,r){for(var a=0,c=r-1;c<=r+1;c+=1)for(var u=n-1;u<=n+1;u+=1)a+=t(e,u,c);return a-t(e,n,r)}(e,c,a),o=t(e,c,a);n[a][c]=function(e,t){var n=e;return 0===e&&3===t&&(n=1),1===e&&(t<2||t>3)&&(n=0),n}(o,u)}))})),n}(f))||u(f))&&v(),e(i,f,m)}),Number(n))}i.classList.add("game__container"),d.classList.add("game__button"),d.textContent="Start",l.classList.add("game__input_speed"),l.type="range",l.min="500",l.max="3000",l.value="1000",l.step="500",s.textContent="Speed: ".concat((1e3/Number(l.value)).toFixed(2)," generation/sec"),d.addEventListener("click",(function(){return o?v():(o=!0,d.textContent="Stop",e=new Set,u=function(t){var n=JSON.stringify(t),r=e.has(n);return r||e.add(n),r},u(f),void p(l.value));var e})),l.addEventListener("change",(function(){o&&p(l.value),s.textContent="Speed: ".concat((1e3/Number(l.value)).toFixed(2)," generation/sec")})),e(i,f,m),a.append(i,l,s,d)}(0,0,document.querySelector(".game"))}();