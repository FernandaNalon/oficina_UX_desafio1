let page = "home",
  chosen = null,
  step = 1,
  data = {};
const events = [
  ["Fotografia Criativa", "Oficina", "30/10"],
  [
    "Experiência do Usuário: Tecnologia a Serviço das Pessoas",
    "Oficina",
    "23/10",
  ],
  ["Festival de Ideias", "Festival", "29/10"],
  ["Introdução à Inteligência Artificial", "Oficina", "05/11"],
  ["Conexões e Criatividade", "Encontro", "31/10"],
];
const app = document.querySelector("#app");
function go(p) {
  page = p;
  render();
}
function toast(s) {
  document.querySelector("#message").innerHTML =
    '<div class="toast">' + s + "</div>";
  setTimeout(() => (document.querySelector("#message").innerHTML = ""), 3800);
}
function modal(title, desc, yes, act, no, other) {
  document.querySelector("#popup").innerHTML =
    '<div class="overlay"><div class="modal"><h2>' +
    title +
    "</h2><p>" +
    desc +
    '</p><button class="btn" id="yes">' +
    yes +
    '</button><button class="btn yellow" id="no">' +
    no +
    "</button></div></div>";
  document.querySelector("#yes").onclick = act;
  document.querySelector("#no").onclick = other;
}
function close() {
  document.querySelector("#popup").innerHTML = "";
}
function cards(arr) {
  return (
    '<div class="cards">' +
    arr
      .map(
        ([name, type, date], i) =>
          '<div class="card"><span class="tag">' +
          type +
          "</span><h3>" +
          name +
          '</h3><p class="muted">' +
          date +
          ' • Gratuito*</p><button class="btn" onclick="detail(\'' +
          name.replaceAll("'", "") +
          "')\">Ver detalhes</button></div>",
      )
      .join("") +
    "</div>"
  );
}
function detail(name) {
  chosen = events.find((e) => e[0] === name);
  go("detail");
}
function home() {
  app.innerHTML =
    '<div class="hero"><div class="box"><span class="tag">DESCUBRA • PARTICIPE • COMPLIQUE</span><h1>Seu próximo evento está a poucos cliques!</h1><p>Encontre experiências inesquecíveis. Ou pelo menos tente.</p><button class="btn pink" onclick="go(\'catalog\')">QUERO ME INSCREVER AGORA!</button><button class="btn yellow" onclick="toast(\'Experimente clicar em Eventos!\')">Não sei por onde começar</button></div><div class="ad"><h2>PARABÉNS!</h2><p>Você ganhou uma oportunidade EXCLUSIVA!</p><button class="btn" onclick="modal(\'Oferta exclusiva!\',\'Para resgatar, confirme que leu todos os termos.\',\'Li tudo\',()=>{close();toast(\'Oferta indisponível!\')},\'Voltar\',close)">RESGATAR AGORA</button></div></div><div class="box"><h2>Eventos em destaque</h2>' +
    cards([events[2], events[0], events[4]]) +
    '</div><div class="notice">Para se inscrever, encontre o evento certo no catálogo. Boa sorte!</div>';
}
function catalog() {
  app.innerHTML =
    '<div class="box"><h1>Encontre seu evento</h1><p>Use os filtros para facilitar sua busca. Eles são quase intuitivos.</p><div class="cols"><div><label>Pesquisar</label><input id="search" oninput="filter()" placeholder="Nome do evento"><br><br><label>Tipo de evento</label><select id="type" onchange="filter()"><option value="all">Todos</option><option>Oficina</option><option>Festival</option><option>Encontro</option></select><button class="btn yellow" onclick="document.querySelector(\'#search\').value=\'\';document.querySelector(\'#type\').value=\'all\';filter()">Limpar filtros</button></div><div class="sidebar"><b>DICA IMPORTANTE</b><p>Para encontrar oficinas, experimente o filtro “Todos”. Nem tudo aparece na categoria correta.</p></div></div></div><div class="box"><h2>Resultados <span id="count"></span></h2><div id="results"></div></div>';
  filter();
}
function filter() {
  let q = document.querySelector("#search").value.toLowerCase(),
    t = document.querySelector("#type").value;
  let list = events.filter(
    (e) => e[0].toLowerCase().includes(q) && (t === "all" || e[1] === t),
  );
  if (t === "Oficina") list = list.filter((e) => e !== events[1]);
  document.querySelector("#count").textContent = "(" + list.length + ")";
  document.querySelector("#results").innerHTML = list.length
    ? cards(list)
    : "<p>Nenhum resultado. Tente mudar os filtros.</p>";
}
function details() {
  app.innerHTML =
    '<div class="cols"><div class="box"><span class="tag">' +
    chosen[1] +
    "</span><h1>" +
    chosen[0] +
    "</h1><p>Data: " +
    chosen[2] +
    ' • 19h</p><p>Evento gratuito para aprender e compartilhar experiências.</p><div class="notice">Leia todas as informações antes de prosseguir.</div><button class="btn pink" onclick="begin()">INSCREVER-ME</button><button class="btn yellow" onclick="go(\'catalog\')">Voltar</button></div><aside class="sidebar"><h3>Informações importantes</h3><p>Este ambiente é uma simulação educacional. Não use informações pessoais reais.</p><button class="btn" onclick="toast(\'Leitura confirmada!\')">Li as informações</button></aside></div>';
}
function begin() {
  if (chosen !== events[1]) {
    toast("Este não é o evento da missão. Volte ao catálogo!");
    return;
  }
  step = 1;
  data = {};
  go("form");
}
function form() {
  let s = "";
  if (step === 1)
    s =
      '<h2>Etapa 1 — Dados importantíssimos</h2><p class="muted">Use apenas dados inventados.</p><div class="field"><label>Seu nome fictício</label><input id="name" placeholder="Ex.: Pessoa Participante"></div><div class="field"><label>E-mail fictício</label><input id="email" placeholder="exemplo@exemplo.com"></div><div class="field"><label>Repita o e-mail fictício</label><input id="again" placeholder="Mais uma vez"></div><button class="btn" onclick="next1()">Continuar ➜</button>';
  if (step === 2)
    s =
      '<h2>Etapa 2 — Preferências essenciais (segundo nós)</h2><div class="field"><label>Qual sua cor favorita?</label><select id="color"><option value="">Escolha...</option><option>Azul</option><option>Roxo</option><option>Verde</option></select></div><div class="field"><label>Qual o melhor dia para participar de um evento na sexta-feira?</label><select id="day"><option value="">Escolha...</option><option>Segunda-feira</option><option>Sexta-feira</option><option>Domingo</option></select></div><div class="field"><label>Quanto é 2 + 3? (Verificação humana)</label><input id="sum"></div><button class="btn yellow" onclick="step=1;render()">Voltar</button><button class="btn" onclick="next2()">Continuar</button>';
  if (step === 3)
    s =
      '<h2>Etapa 3 — Quase lá!</h2><p>Leia cuidadosamente antes de escolher.</p><div class="notice"><label><input id="agree" style="width:auto" type="checkbox"> Não discordo que talvez eu concorde com os termos fictícios desta inscrição.</label></div><button class="btn yellow" onclick="step=2;render()">Voltar</button><button class="btn pink" onclick="finish()">CANCELAR INSCRIÇÃO</button>';
  app.innerHTML =
    '<div class="box form"><span class="tag">Inscrição • ' +
    chosen[0] +
    '</span><div class="progress"><div style="width:' +
    step * 33 +
    '%"></div></div><p class="muted">Etapa ' +
    step +
    " de 3 • Progresso estimado: " +
    step * 28 +
    "%</p>" +
    s +
    '</div><div class="notice">Simulação: não insira dados pessoais verdadeiros.</div>';
}
function next1() {
  let n = document.querySelector("#name").value.trim(),
    e = document.querySelector("#email").value.trim(),
    a = document.querySelector("#again").value.trim();
  if (n.length < 2) {
    toast("Erro 73: revise seus dados.");
    return;
  }
  if (!e.includes("@") || e !== a) {
    toast("Erro E-19: confira os e-mails.");
    return;
  }
  data.name = n;
  step = 2;
  render();
}
function next2() {
  if (
    !document.querySelector("#color").value ||
    document.querySelector("#day").value !== "Sexta-feira" ||
    document.querySelector("#sum").value.trim() !== "5"
  ) {
    toast("Ops! Uma preferência está incorreta. Releia as perguntas.");
    return;
  }
  step = 3;
  render();
}
function finish() {
  if (!document.querySelector("#agree").checked) {
    toast("Marque a caixa antes de continuar.");
    return;
  }
  modal(
    "Tem certeza que deseja CANCELAR?",
    "Este botão parece cancelar, mas é o único caminho para concluir a inscrição.",
    "Não, quero me inscrever",
    () => {
      close();
      go("success");
    },
    "Sim, cancelar",
    () => {
      close();
      toast("Inscrição não concluída. Tente novamente.");
    },
  );
}
function success() {
  app.innerHTML =
    '<div class="success"><h1>🎉 Inscrição fictícia concluída!</h1><p>Parabéns, ' +
    data.name.replaceAll("<", "&lt;") +
    '! Você sobreviveu à Eventópolis.</p><p>Esta confirmação não representa uma inscrição real.</p><h2>Para conversar em grupo:</h2><ul><li>O que mais confundiu você?</li><li>Quando pensou em desistir?</li><li>O que mudaria nesse site?</li></ul><button class="btn" onclick="go(\'home\')">Voltar ao início</button></div>';
}
function faq() {
  app.innerHTML =
    '<div class="box"><h1>Central de ajuda (quase)</h1><p><b>Como me inscrevo?</b> Encontre seu evento no catálogo, abra os detalhes e siga as etapas.</p><p><b>Por que o site é tão confuso?</b> Excelente pergunta para discutir na oficina!</p><button class="btn" onclick="go(\'catalog\')">Ir ao catálogo</button></div>';
}
function render() {
  window.scrollTo(0, 0);
  if (page === "home") home();
  if (page === "catalog") catalog();
  if (page === "detail") details();
  if (page === "form") form();
  if (page === "success") success();
  if (page === "faq") faq();
}
render();
