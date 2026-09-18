const products = [
  {name:'STEALTH CORE TEE', category:'T-Shirts', price:85000, image:'images/TEE 1.jpeg'},
  {name:'STEALTH SIGNAL TEE', category:'T-Shirts', price:90000, image:'images/TEE 2.jpeg'},
  {name:'STEALTH GRAPHIC TEE', category:'T-Shirts', price:95000, image:'images/TEE 3.jpeg'},
  {name:'STEALTH OVERSIZED JACKET', category:'Jackets', price:135000, image:'images/JAK 3.jpeg'},
  {name:'STEALTH UTILITY JACKET', category:'Jackets', price:155000, image:'images/JAK 2.jpeg'},
  {name:'STEALTH DENIM JORTS', category:'Jorts/Joggers', price:145000, image:'images/JORT 1.jpeg'},
  {name:'STEALTH SIGNAL JOGGERS', category:'Jorts/Joggers', price:125000, image:'images/JORT 2.jpeg'},
  {name:'STEALTH CARGO JOGGERS', category:'Jorts/Joggers', price:130000, image:'images/JOG 1.jpeg'}
];

let cart = JSON.parse(localStorage.getItem('stealthCart') || '[]');

function naira(n){ return '₦' + Number(n).toLocaleString('en-NG'); }
function saveCart(){ localStorage.setItem('stealthCart', JSON.stringify(cart)); }
function updateCartCount(){ document.querySelectorAll('#cartCount').forEach(el => el.textContent = cart.length); }

function toggleSearch(){
  const bar=document.getElementById('searchBar'); if(!bar) return;
  bar.classList.toggle('show');
  if(bar.classList.contains('show')) document.getElementById('searchInput')?.focus();
}
function filterProducts(){
  const q=(document.getElementById('searchInput')?.value||'').toLowerCase();
  document.querySelectorAll('.product-card').forEach(card=>card.style.display=card.dataset.name.toLowerCase().includes(q)?'':'none');
}
function openAccount(){ document.getElementById('accountModal')?.classList.add('show'); }
function closeAccount(){ document.getElementById('accountModal')?.classList.remove('show'); }
function register(event){
  event.preventDefault();
  const name=document.getElementById('regName').value;
  document.getElementById('registerMessage').textContent=`Welcome to STEALTH, ${name}. Your account has been registered.`;
  event.target.reset();
}

function addToCart(name, price){
  const p=products.find(x=>x.name===name) || {name,price};
  cart.push({name:p.name,price:p.price}); saveCart(); updateCartCount(); renderCart(); openCart();
}
function removeItem(index){ cart.splice(index,1); saveCart(); updateCartCount(); renderCart(); }
function renderCart(){
  const box=document.getElementById('cartItems'); if(!box) return;
  if(!cart.length){ box.innerHTML='<p>Your cart is empty.</p>'; document.getElementById('cartTotal').textContent='₦0'; return; }
  box.innerHTML=cart.map((item,i)=>`<div class="cart-row"><div><strong>${item.name}</strong><small>${naira(item.price)}</small></div><button aria-label="Remove" onclick="removeItem(${i})">×</button></div>`).join('');
  document.getElementById('cartTotal').textContent=naira(cart.reduce((s,x)=>s+x.price,0));
}
function openCart(){ document.getElementById('cartDrawer')?.classList.add('open'); document.getElementById('cartBackdrop')?.classList.add('show'); }
function toggleCart(){ const d=document.getElementById('cartDrawer'); if(!d)return; d.classList.toggle('open'); document.getElementById('cartBackdrop')?.classList.toggle('show'); }
function openCheckout(){
  if(!cart.length){ alert('Your cart is empty. Add a product before checkout.'); return; }
  document.getElementById('checkoutModal')?.classList.add('show');
  document.getElementById('checkoutTotal').textContent=naira(cart.reduce((s,x)=>s+x.price,0));
  toggleCart();
}
function closeCheckout(){ document.getElementById('checkoutModal')?.classList.remove('show'); }
function choosePayment(type){
  document.getElementById('bankDetails').classList.toggle('hidden',type!=='bank');
  document.getElementById('cardDetails').classList.toggle('hidden',type!=='card');
}
function confirmPayment(){
  document.getElementById('paymentForm').classList.add('hidden');
  document.getElementById('paymentReceived').classList.remove('hidden');
}
function finishOrder(){ cart=[]; saveCart(); updateCartCount(); renderCart(); closeCheckout(); alert('Payment received. Thank you for shopping with STEALTH!'); }
function subscribe(event){ event.preventDefault(); document.getElementById('subscribeMessage').textContent='Thanks — you have been added to the STEALTH list.'; event.target.reset(); }

document.addEventListener('DOMContentLoaded',()=>{ updateCartCount(); renderCart(); });


function toggleMobileMenu(){
  const menu=document.getElementById('mobileMenu');
  if(menu) menu.classList.toggle('show');
}

document.addEventListener('click',function(e){
  const menu=document.getElementById('mobileMenu');
  const toggle=document.querySelector('.mobile-menu-toggle');
  if(menu && menu.classList.contains('show') && !menu.contains(e.target) && e.target!==toggle){
    menu.classList.remove('show');
  }
});
