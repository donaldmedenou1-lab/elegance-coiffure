const menuBtn=document.querySelector(".menu-btn"),navLinks=document.querySelector(".nav-links");menuBtn.addEventListener("click",()=>navLinks.classList.toggle("open"));document.querySelectorAll(".nav-links a").forEach(a=>a.addEventListener("click",()=>navLinks.classList.remove("open")));document.querySelectorAll(".filter").forEach(f=>f.addEventListener("click",()=>{document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));f.classList.add("active");const c=f.dataset.filter;document.querySelectorAll(".gallery-item").forEach(i=>i.style.display=c==="all"||i.dataset.category===c?"block":"none")}));const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12});document.querySelectorAll(".reveal").forEach(e=>obs.observe(e));const form=document.getElementById("contactForm"),toast=document.getElementById("toast");
form.addEventListener("submit",async e=>{
  e.preventDefault();
  const endpoint=form.getAttribute("action");
  if(!endpoint || endpoint.includes("REMPLACE_MOI")){
    alert("Le formulaire n'est pas encore connecté. Remplace l'adresse Formspree dans index.html par ton identifiant de formulaire.");
    return;
  }
  const button=form.querySelector("button[type=submit]");
  const originalText=button.textContent;
  button.disabled=true;
  button.textContent="Envoi...";
  try{
    const response=await fetch(endpoint,{method:"POST",body:new FormData(form),headers:{"Accept":"application/json"}});
    if(response.ok){
      toast.textContent="Votre demande a bien été envoyée !";
      toast.classList.add("show");
      form.reset();
      setTimeout(()=>toast.classList.remove("show"),3500);
    }else{
      toast.textContent="Impossible d'envoyer la demande. Réessayez.";
      toast.classList.add("show");
      setTimeout(()=>toast.classList.remove("show"),4000);
    }
  }catch(error){
    toast.textContent="Erreur de connexion. Réessayez.";
    toast.classList.add("show");
    setTimeout(()=>toast.classList.remove("show"),4000);
  }finally{
    button.disabled=false;
    button.textContent=originalText;
  }
});
