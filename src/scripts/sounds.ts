type Product = {slug:string;name:string;price:number;image:string};
const products:Product[]=JSON.parse(document.getElementById('sounds-catalogue')?.textContent||'[]');
const key='lemusicien-sounds-cart-v1';
const dialog=document.querySelector<HTMLDialogElement>('[data-sounds-cart]');
const items=document.querySelector<HTMLElement>('[data-cart-items]');
const status=document.querySelector<HTMLElement>('[data-cart-status]');
const money=(n:number)=>new Intl.NumberFormat('fr-FR',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(n);
function readCart(){try{const value=JSON.parse(localStorage.getItem(key)||'[]');return Array.isArray(value)?[...new Set(value.filter((slug:unknown)=>typeof slug==='string'&&products.some(p=>p.slug===slug))) ] as string[]:[]}catch{return []}}
let cart=readCart();
function announce(message:string){if(status)status.textContent=message;}
function render(){
 const pay=document.querySelector<HTMLButtonElement>('[data-checkout]');if(pay)pay.disabled=cart.length===0;
 document.querySelectorAll('[data-cart-count]').forEach(el=>el.textContent=String(cart.length));
 const selected=products.filter(p=>cart.includes(p.slug));
 const total=document.querySelector('[data-cart-total]');if(total)total.textContent=money(selected.reduce((n,p)=>n+p.price,0));
 if(items){items.replaceChildren();if(!selected.length){const empty=document.createElement('p');empty.className='cart-empty';empty.textContent='Ton panier attend son premier son.';items.append(empty)}
 for(const p of selected){const row=document.createElement('div');row.className='cart-item';const img=document.createElement('img');img.src=p.image;img.alt='';const copy=document.createElement('div');const link=document.createElement('a');link.href=`/sounds/${p.slug}/`;link.textContent=p.name;const price=document.createElement('span');price.textContent=money(p.price);copy.append(link,price);const remove=document.createElement('button');remove.type='button';remove.textContent='Retirer';remove.setAttribute('aria-label',`Retirer ${p.name} du panier`);remove.addEventListener('click',()=>{cart=cart.filter(slug=>slug!==p.slug);save();announce(`${p.name} retiré du panier.`);items?.querySelector<HTMLButtonElement>('button')?.focus()});row.append(img,copy,remove);items.append(row)}}
 document.querySelectorAll<HTMLButtonElement>('[data-add-sound]').forEach(button=>{const added=cart.includes(button.dataset.addSound||'');button.textContent=added?'Dans le panier ✓':(button.classList.contains('sound-primary')?'Ajouter au panier +':'Ajouter +')});
}
function save(){try{localStorage.setItem(key,JSON.stringify(cart))}catch{announce('Le panier est conservé sur cette page uniquement.')}render()}
function open(){if(dialog&&!dialog.open){dialog.showModal();document.body.style.overflow='hidden'}}
function close(){dialog?.close()}
document.querySelectorAll('[data-open-cart]').forEach(button=>button.addEventListener('click',open));
document.querySelectorAll('[data-close-cart]').forEach(button=>button.addEventListener('click',close));
dialog?.addEventListener('close',()=>document.body.style.overflow='');
dialog?.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)close()}});
document.querySelectorAll<HTMLButtonElement>('[data-add-sound]').forEach(button=>button.addEventListener('click',()=>{const slug=button.dataset.addSound;const p=products.find(p=>p.slug===slug);if(!p)return;if(!cart.includes(p.slug)){cart.push(p.slug);save();announce(`${p.name} ajouté au panier.`)}open()}));
window.addEventListener('storage',event=>{if(event.key===key||event.key===null){cart=readCart();render()}});
let filter='all';const search=document.querySelector<HTMLInputElement>('[data-sound-search]');
function filterProducts(){let count=0;document.querySelectorAll<HTMLElement>('.sound-card[data-category]').forEach(card=>{const visible=(filter==='all'||card.dataset.category===filter)&&(card.dataset.productName||'').includes((search?.value||'').toLowerCase().trim());card.hidden=!visible;if(visible)count++});const result=document.querySelector('[data-results]');if(result)result.textContent=`${count} produit${count>1?'s':''}`;const empty=document.querySelector<HTMLElement>('[data-no-results]');if(empty)empty.hidden=count!==0}
document.querySelectorAll<HTMLButtonElement>('[data-sound-filter]').forEach(button=>button.addEventListener('click',()=>{filter=button.dataset.soundFilter||'all';document.querySelectorAll('[data-sound-filter]').forEach(el=>el.setAttribute('aria-pressed',String(el===button)));filterProducts()}));search?.addEventListener('input',filterProducts);
document.querySelectorAll<HTMLButtonElement>('[data-gallery-image]').forEach(button=>button.addEventListener('click',()=>{const main=document.querySelector<HTMLImageElement>('[data-gallery-main]');if(main&&button.dataset.galleryImage)main.src=button.dataset.galleryImage;document.querySelectorAll('[data-gallery-image]').forEach(el=>el.setAttribute('aria-pressed',String(el===button)))}));
render();


const checkout=document.querySelector<HTMLButtonElement>('[data-checkout]');
checkout?.addEventListener('click',async()=>{
 if(!cart.length||checkout.disabled)return;
 const error=document.querySelector<HTMLElement>('[data-checkout-error]');
 checkout.disabled=true;checkout.textContent='Ouverture de Stripe…';if(error)error.hidden=true;
 try{
 const response=await fetch('https://tools-checkout.vercel.app/api/checkout',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({items:cart}),signal:AbortSignal.timeout(25000)});
 const data=await response.json();if(!response.ok)throw Error(data.error||'Paiement indisponible.');
 const url=new URL(data.url);if(url.protocol!=='https:'||url.hostname!=='checkout.stripe.com')throw Error('Adresse de paiement invalide.');
 window.location.assign(url.href);
 }catch(e){if(error){error.textContent=e instanceof Error?e.message:'Connexion impossible. Réessaie.';error.hidden=false;}checkout.disabled=cart.length===0;checkout.textContent='Passer au paiement';}
});

