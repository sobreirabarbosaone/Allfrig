    const apiUrl = "https://sheetdb.io/api/v1/5du6f6ry1uecy";
    const userData = JSON.parse(localStorage.getItem("userLinks") || "{}");
    let usuarios = [];
    let menuAberto = false;
	let tempoMenu = null;

    function toggleMenu() {
    const menu = document.getElementById("sideMenu");

    if (menuAberto) {
        // Fecha o menu manualmente
        menu.style.width = "0";
        document.body.style.marginLeft = "0";
        menuAberto = false;

        // Cancela o temporizador anterior
        clearTimeout(tempoMenu);

    } else {
        // Abre o menu
        menu.style.width = "250px";
        document.body.style.marginLeft = "250px";
        menuAberto = true;

        // Inicia a contagem de 10 segundos
        tempoMenu = setTimeout(() => {
            menu.style.width = "0";
            document.body.style.marginLeft = "0";
            menuAberto = false;
            tempoMenu = null;
        }, 10000);
    }
}

    function openTab(evt, tabName) {
      document.querySelectorAll(".tabcontent").forEach(c=>c.style.display="none");
      document.querySelectorAll(".tablink").forEach(b=>b.classList.remove("active"));
      document.getElementById(tabName).style.display="block";
      evt.currentTarget.classList.add("active");
    }

    async function carregarUsuarios() {
      try {
        const res = await fetch(apiUrl);
        usuarios = await res.json();
        preencherSelectsMetas();
        preencherSelectsSVendas();
		preencherSelectsCobranca();
        preencherSelectsSku();
        preencherSupervisoresPEX();
		preencherSupervisoresJBP();
      } 
	  catch(e) {
        console.error(e);
        document.getElementById("error-message").innerText = "Erro ao carregar dados.";
      }
    }
    // ==================== CAMPANHAS ====================
    function abrirCampanhaSelecionada() {
  const sel = document.getElementById("CampanhaSelect").value;

  document.querySelectorAll("#Campanhas .subtabcontent").forEach(c => c.style.display = "none");

  document.getElementById(sel).style.display = "block";

  const vendedor = usuarios.find(u => u.name === userData.name);
  if (!vendedor) return;

  if (sel === "Campanha1") document.getElementById("Campanha1Iframe").src = vendedor.campanha1Link || "";
  else if (sel === "Campanha2") document.getElementById("Campanha2Iframe").src = vendedor.campanha2Link || "";
  else if (sel === "Campanha3") document.getElementById("Campanha3Iframe").src = vendedor.campanha3Link || "";
  else if (sel === "Campanha4") document.getElementById("Campanha4Iframe").src = vendedor.campanha4Link || "";
  else if (sel === "Campanha5") document.getElementById("Campanha5Iframe").src = vendedor.campanha5Link || "";
  else if (sel === "Campanha6") document.getElementById("Campanha6Iframe").src = vendedor.campanha6Link || "";
	}
    // ==================== METAS ====================
    function getSupervisores() {
      return Array.from(new Set(usuarios.filter(u=>u.role==="supervisor").map(u=>u.name))).map(name=>({name, role:"supervisor"}));
    }
    function getVendedoresPorSupervisor(nome) {
      return usuarios.filter(u=>u.supervisor===nome && u.role==="vendedor");
    }
    function preencherSelectsMetas() {
      const sup = document.getElementById("supervisorSelectMetas");
      sup.innerHTML="";
      if(userData.role==="supervisor") sup.appendChild(new Option(userData.name,userData.name));
      else if(userData.role==="vendedor") sup.appendChild(new Option(userData.supervisor,userData.supervisor));
      else getSupervisores().forEach(s=>sup.appendChild(new Option(s.name,s.name)));
      atualizarVendedoresMetas();
    }
    function atualizarVendedoresMetas() {
      const sup = document.getElementById("supervisorSelectMetas").value;
      const vendSel = document.getElementById("vendedorSelectMetas");
      let vendedores = userData.role==="vendedor" ? [userData] : getVendedoresPorSupervisor(sup);
      vendSel.innerHTML="";
      vendedores.forEach(v=>vendSel.appendChild(new Option(v.name,v.name)));
      atualizarIframe("Metas");
    }
	// ==================== SEM VENDAS ====================
    function getSupervisores() {
      return Array.from(new Set(usuarios.filter(u=>u.role==="supervisor").map(u=>u.name))).map(name=>({name, role:"supervisor"}));
    }
    function getVendedoresPorSupervisor(nome) {
      return usuarios.filter(u=>u.supervisor===nome && u.role==="vendedor");
    }
    function preencherSelectsSVendas() {
      const sup = document.getElementById("supervisorSelectSVendas");
      sup.innerHTML="";
      if(userData.role==="supervisor") sup.appendChild(new Option(userData.name,userData.name));
      else if(userData.role==="vendedor") sup.appendChild(new Option(userData.supervisor,userData.supervisor));
      else getSupervisores().forEach(s=>sup.appendChild(new Option(s.name,s.name)));
      atualizarVendedoresSVendas();
    }
    function atualizarVendedoresSVendas() {
      const sup = document.getElementById("supervisorSelectSVendas").value;
      const vendSel = document.getElementById("vendedorSelectSVendas");
      let vendedores = userData.role==="vendedor" ? [userData] : getVendedoresPorSupervisor(sup);
      vendSel.innerHTML="";
      vendedores.forEach(v=>vendSel.appendChild(new Option(v.name,v.name)));
      atualizarIframe("SVendas");
    }
	// ==================== SKU ALLFRIG ====================
    function getSupervisores() {
      return Array.from(new Set(usuarios.filter(u=>u.role==="supervisor").map(u=>u.name))).map(name=>({name, role:"supervisor"}));
    }
    function getVendedoresPorSupervisor(nome) {
      return usuarios.filter(u=>u.supervisor===nome && u.role==="vendedor");
    }
    function preencherSelectsSku() {
      const sup = document.getElementById("supervisorSelectSku");
      sup.innerHTML="";
      if(userData.role==="supervisor") sup.appendChild(new Option(userData.name,userData.name));
      else if(userData.role==="vendedor") sup.appendChild(new Option(userData.supervisor,userData.supervisor));
      else getSupervisores().forEach(s=>sup.appendChild(new Option(s.name,s.name)));
      atualizarVendedoresSku();
    }
    function atualizarVendedoresSku() {
      const sup = document.getElementById("supervisorSelectSku").value;
      const vendSel = document.getElementById("vendedorSelectSku");
      let vendedores = userData.role==="vendedor" ? [userData] : getVendedoresPorSupervisor(sup);
      vendSel.innerHTML="";
      vendedores.forEach(v=>vendSel.appendChild(new Option(v.name,v.name)));
      atualizarIframe("Sku");
    }
    // ==================== PEX ====================
    function preencherSupervisoresPEX() {
      const sup = document.getElementById("supervisorSelectPEX");
      sup.innerHTML="";
      if(userData.role==="supervisor") sup.appendChild(new Option(userData.name,userData.name));
      else if(userData.role==="vendedor") sup.appendChild(new Option(userData.supervisor,userData.supervisor));
      else getSupervisores().forEach(s=>sup.appendChild(new Option(s.name,s.name)));
      atualizarVendedoresPEX();
    }
    function atualizarVendedoresPEX() {
      const sup = document.getElementById("supervisorSelectPEX").value;
      const vendSel = document.getElementById("vendedorSelectPEX");
      let vendedores = userData.role==="vendedor" ? [userData] : getVendedoresPorSupervisor(sup);
      vendSel.innerHTML="";
      vendedores.forEach(v=>vendSel.appendChild(new Option(v.name,v.name)));
      abrirPEXSelecionada();
    }
    function abrirPEXSelecionada() {
      const sel = document.getElementById("PexSelect").value;
      document.querySelectorAll("#PEX .subtabcontent").forEach(c=>c.style.display="none");
      document.getElementById(sel).style.display="block";

      const vendedorName = document.getElementById("vendedorSelectPEX").value;
      const vendedor = usuarios.find(u=>u.name===vendedorName);
      if(!vendedor) return;
      if(sel==="Extrato") document.getElementById("extratoIframe").src=vendedor.extratoLink||"";
      else if(sel==="TopClientes") document.getElementById("topClientesIframe").src=vendedor.topClientesLink||"";
	  else if(sel==="SkuPEX") document.getElementById("SkuPEXIframe").src=vendedor.skuPEXLink||"";
    }
	// ==================== JBP ====================
    function preencherSupervisoresJBP() {
      const sup = document.getElementById("supervisorSelectJBP");
      sup.innerHTML="";
      if(userData.role==="supervisor") sup.appendChild(new Option(userData.name,userData.name));
      else if(userData.role==="vendedor") sup.appendChild(new Option(userData.supervisor,userData.supervisor));
      else getSupervisores().forEach(s=>sup.appendChild(new Option(s.name,s.name)));
      atualizarVendedoresJBP();
    }
    function atualizarVendedoresJBP() {
      const sup = document.getElementById("supervisorSelectJBP").value;
      const vendSel = document.getElementById("vendedorSelectJBP");
      let vendedores = userData.role==="vendedor" ? [userData] : getVendedoresPorSupervisor(sup);
      vendSel.innerHTML="";
      vendedores.forEach(v=>vendSel.appendChild(new Option(v.name,v.name)));
      abrirPEXSelecionada();
    }
    function abrirJBPSelecionada() {
      const sel = document.getElementById("JBPSelect").value;
      document.querySelectorAll("#JBP .subtabcontent").forEach(c=>c.style.display="none");
      document.getElementById(sel).style.display="block";

      const vendedorName = document.getElementById("vendedorSelectJBP").value;
      const vendedor = usuarios.find(u=>u.name===vendedorName);
      if(!vendedor) return;
      if(sel==="Extrato") document.getElementById("extratoIframe").src=vendedor.extratoLink||"";
      else if(sel==="TopClientes") document.getElementById("topClientesIframe").src=vendedor.topClientesLink||"";
    }
    // ==================== FORNECEDOR ====================
    function abrirFornecedorSelecionada() {
      const sel = document.getElementById("FornecedorSelect").value;
      document.querySelectorAll("#Fornecedor .subtabcontent").forEach(c=>c.style.display="none");
      document.getElementById(sel).style.display="block";

      const f = usuarios.find(u=>u.name===userData.name);
      if(!f) return;
      if(sel==="Ajinomoto") document.getElementById("AjinomotoIframe").src=f.ajinomotoLink||"";
      else if(sel==="Gyoza") document.getElementById("GyozaIframe").src=f.gyozaLink||"";
      else if(sel==="Mapa") document.getElementById("MapaIframe").src=f.mapaLink||"";
      else if(sel==="Vendas") document.getElementById("VendasIframe").src=f.vendasLink||"";
    }
	// ==================== COBRANCA ====================
    function getSupervisores() {
      return Array.from(new Set(usuarios.filter(u=>u.role==="supervisor").map(u=>u.name))).map(name=>({name, role:"supervisor"}));
    }
    function getVendedoresPorSupervisor(nome) {
      return usuarios.filter(u=>u.supervisor===nome && u.role==="vendedor");
    }
    function preencherSelectsCobranca() {
      const sup = document.getElementById("supervisorSelectCobranca");
      sup.innerHTML="";
      if(userData.role==="supervisor") sup.appendChild(new Option(userData.name,userData.name));
      else if(userData.role==="vendedor") sup.appendChild(new Option(userData.supervisor,userData.supervisor));
      else getSupervisores().forEach(s=>sup.appendChild(new Option(s.name,s.name)));
      atualizarVendedoresCobranca();
    }
    function atualizarVendedoresCobranca() {
      const sup = document.getElementById("supervisorSelectCobranca").value;
      const vendSel = document.getElementById("vendedorSelectCobranca");
      let vendedores = userData.role==="vendedor" ? [userData] : getVendedoresPorSupervisor(sup);
      vendSel.innerHTML="";
      vendedores.forEach(v=>vendSel.appendChild(new Option(v.name,v.name)));
      atualizarIframe("Cobranca");
    }
    // ==================== GESTÃO ====================
    function abrirGestaoSelecionada() {
      const sel = document.getElementById("gestaoSelect").value;
      document.querySelectorAll("#gestao .subtabcontent").forEach(t=>t.style.display="none");
      document.getElementById(sel).style.display="block";

      if(sel==="ferias") atualizarIframesGestao();
      if(sel==="premiacao") preencherSupervisorespremiacao();
    }
    function atualizarIframesGestao() {
      const v = usuarios.find(u=>u.name===userData.name);
      if(!v) return;
      document.getElementById("feriasIframe").src=v.feriasLink||"https://docs.google.com/spreadsheets/d/1QqOoqwcp19AdfqaAcU7dKjmwp5sWAfU1eaPSgjNRq1k/edit?usp=drive_link";
    }
    function preencherSupervisorespremiacao() {
      const supSel = document.getElementById("supervisorSelectpremiacao");
      supSel.innerHTML="";
      if(userData.role==="supervisor") supSel.appendChild(new Option(userData.name,userData.name));
      else getSupervisores().forEach(s=>supSel.appendChild(new Option(s.name,s.name)));
      atualizarIframePremiacao();
    }
    function atualizarIframePremiacao() {
      const sup = document.getElementById("supervisorSelectpremiacao").value;
      const supUser = usuarios.find(u=>u.name===sup && u.role==="supervisor");
      document.getElementById("premiacaoIframe").src = supUser?.premiacaoLink || "";
    }
	 // ==================== DRIVE ====================
    function retornarAoDrive() {
    // Busca o link do Drive no JSON do usuário logado
    const linkDrive = userData.driveLink;
    // Verifica se existe um link cadastrado
    if (linkDrive) {

        // Redireciona automaticamente para o Drive
        window.location.href = linkDrive;
    } else {
        // Exibe uma mensagem caso não exista link
        alert("Nenhum Drive cadastrado para este usuário.");
    }
}
  // ==================== ATUALIZA OS LINKS DAS ABAS ====================
    function atualizarIframe(aba) {
  if(aba==="Metas") {
    const vendedorName = document.getElementById("vendedorSelectMetas").value;
    const v = usuarios.find(u=>u.name===vendedorName);
    if(v) document.getElementById("metasIframe").src=v.metasLink||"";
  } 
  else if(aba==="SVendas") {
    const vendedorName = document.getElementById("vendedorSelectSVendas").value;
    const v = usuarios.find(u=>u.name===vendedorName);
    if(v) document.getElementById("SVendasIframe").src=v.svendaLink||""; // aqui define o link
  }
  else if(aba==="Sku") {
    const vendedorName = document.getElementById("vendedorSelectSku").value;
    const v = usuarios.find(u=>u.name===vendedorName);
    if(v) document.getElementById("SkuIframe").src=v.skuLink||""; // aqui define o link
  }  
  else if(aba==="PEX") abrirPEXSelecionada();
	else if(aba==="premiacao") atualizarIframePremiacao();
    }
    function logout(){
      if(confirm("Deseja realmente sair?")){
        localStorage.removeItem("userLinks");
        window.location.href="index.html";
      }
    }
 // ==================== BLOQUEAR O SCROLL ====================
    //function bloquearScrollDuranteUsoIframeS(){
      //document.querySelectorAll("iframe").forEach(f=>{
       // f.addEventListener("mouseenter",()=>document.body.style.overflow="hidden");
        //f.addEventListener("mouseleave",()=>document.body.style.overflow="auto");
     // });
  //  }
  // ==================== NOVO: DETECTAR CELULAR E ADICIONAR BOTÃO DE EDIÇÃO ====================
  function verificarMobileEForcarLinks() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (!isMobile) return; // só executa no celular

    document.querySelectorAll("iframe").forEach(iframe => {
      const src = iframe.src;
      if (src && src.includes("docs.google.com/spreadsheets")) {
        // cria um aviso e um botão logo abaixo do iframe
        const aviso = document.createElement("p");
        aviso.innerText = "🔒 Visualização apenas — toque abaixo para editar:";
        aviso.style.color = "#555";
        aviso.style.fontSize = "16px";
        aviso.style.margin = "14px 0 6px 0";
        aviso.style.fontFamily = "Merriweather, sans-serif";

        const btn = document.createElement("a");
        btn.href = src;
        btn.target = "_blank";
        btn.innerText = "✏️ Abrir planilha no Google Sheets";
        btn.style.display = "inline-block";
        btn.style.marginBottom = "25px";
        btn.style.padding = "10px 20px";
        btn.style.fontSize = "18px";
        btn.style.color = "white";
        btn.style.backgroundColor = "#007bff";
        btn.style.borderRadius = "8px";
        btn.style.textDecoration = "none";
        btn.style.fontFamily = "Merriweather, sans-serif";
        btn.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
        btn.style.transition = "0.2s";

        btn.onmouseenter = () => btn.style.backgroundColor = "#0056b3";
        btn.onmouseleave = () => btn.style.backgroundColor = "#007bff";

        iframe.insertAdjacentElement("afterend", aviso);
        aviso.insertAdjacentElement("afterend", btn);
      }
    });
  }
  // ==================== JANELA DE SELEÇÃO ====================
  window.onload = async () => {
    if(!userData.name) { window.location.href="index.html"; return; }
    await carregarUsuarios();
    document.getElementById("defaultOpen").click();

    abrirCampanhaSelecionada();
    abrirPEXSelecionada();
    abrirFornecedorSelecionada();
    abrirGestaoSelecionada();

    bloquearScrollDuranteUsoIframeS();
    verificarMobileEForcarLinks(); // 👈 adiciona botão no celular
  };
