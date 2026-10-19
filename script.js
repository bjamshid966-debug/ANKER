(function(){
const $=s=>document.querySelector(s),NS='http://www.w3.org/2000/svg';
// Тики циферблата
const ticks=$('#ticks');
for(let i=0;i<60;i++){const big=i%5===0,l=document.createElementNS(NS,'line');
l.setAttribute('x1',100);l.setAttribute('x2',100);l.setAttribute('y1',big?16:19);l.setAttribute('y2',big?26:22);
l.setAttribute('transform','rotate('+i*6+' 100 100)');if(big)l.setAttribute('class','big');ticks.appendChild(l);}
// Живые часы
const h=$('#h'),m=$('#m'),s=$('#s'),d=$('#digital'),p=n=>String(n).padStart(2,'0');
function tick(){const t=new Date(),sec=t.getSeconds()+t.getMilliseconds()/1000,min=t.getMinutes()+sec/60,hr=(t.getHours()%12)+min/60;
h.style.transform='rotate('+hr*30+'deg)';m.style.transform='rotate('+min*6+'deg)';s.style.transform='rotate('+sec*6+'deg)';
d.textContent=p(t.getHours())+':'+p(t.getMinutes())+':'+p(t.getSeconds());requestAnimationFrame(tick);}
tick();
// Меню
const b=document.querySelector('.burger'),nav=$('#nav');
b.addEventListener('click',()=>{const o=nav.classList.toggle('open');b.setAttribute('aria-expanded',o);});
nav.addEventListener('click',e=>{if(e.target.tagName==='A'){nav.classList.remove('open');b.setAttribute('aria-expanded',false);}});
// Калькулятор
const fmt=n=>n.toLocaleString('ru-RU')+' ₽';
function calc(){let v=+$('#work').value;if($('#polish').checked)v+=1200;if($('#urgent').checked)v=Math.round(v*1.3);if($('#pickup').checked)v+=500;$('#total').textContent=fmt(v);}
document.querySelectorAll('#calc select,#calc input').forEach(e=>e.addEventListener('input',calc));calc();
// Форма
$('#form').addEventListener('submit',e=>{e.preventDefault();const f=e.target,n=f.name,ph=f.phone,st=$('#status');
n.classList.toggle('bad',n.value.trim().length<2);
const ok=ph.value.replace(/\D/g,'').length>=10;ph.classList.toggle('bad',!ok);
if(n.value.trim().length<2||!ok){st.textContent='Проверьте имя и номер телефона (не менее 10 цифр).';st.style.color='#c0392b';return;}
st.style.color='#1e7a46';st.textContent='Спасибо, '+n.value.trim()+'! Мы перезвоним в течение 15 минут.';f.reset();});
})();
