// Testes do save conferido na leitura (js/jogo/00_save.js), direto no Node, sem navegador.
//
//   node testes/save.js
//
// testes/saves/ guarda saves de verdade, gravados pelo jogo: v0_mapa1.json (antes de o save ter versão) e v1_mapa1.json.
// Eles precisam abrir sem nenhuma correção para sempre: quando o formato mudar, grave um save novo (v2_...) e mantenha os antigos.
// Sai com código 1 se algum teste falhar.
const fs = require("fs"),
  path = require("path"),
  assert = require("assert/strict");
const RAIZ = path.join(__dirname, "..");

(async () => {
  // o módulo é ES; carregado pelo texto para não depender de como o Node trata .js sem "type": "module"
  const fonte = fs.readFileSync(path.join(RAIZ, "js/jogo/00_save.js"), "utf8");
  const { lerTextoSave, textoSave, catalogoDe, juntarRecuperacao, VERSAO_SAVE } = await import(
    "data:text/javascript," + encodeURIComponent(fonte)
  );
  const txt = fs.readFileSync(path.join(RAIZ, "js/dados.js"), "utf8"),
    D = JSON.parse(
      txt
        .slice(/^const D = /m.exec(txt).index + 10)
        .trim()
        .replace(/;\s*$/, "")
    );
  const cat = catalogoDe(D); // a mesma função que o jogo usa (01_nucleo)
  const ler = o => lerTextoSave(typeof o === "string" ? o : JSON.stringify(o), cat);
  const exemplo = JSON.parse(fs.readFileSync(path.join(__dirname, "saves/v1_mapa1.json"), "utf8"));
  const copia = o => JSON.parse(JSON.stringify(o));
  const comMeta = m => ({ v: 1, meta: { ...copia(exemplo.meta), ...m }, run: null });
  const comRun = f => {
    const s = copia(exemplo);
    f(s.run);
    return s;
  };
  let falhas = 0,
    n = 0;
  const caso = (nome, f) => {
    n++;
    try {
      f();
    } catch (e) {
      falhas++;
      console.error(`FALHOU: ${nome}\n  ${e.message.split("\n").join("\n  ")}`);
    }
  };

  // saves de verdade, de cada versão: abrem sem nenhuma correção e sem perder nada
  for (const arq of fs.readdirSync(path.join(__dirname, "saves")).sort())
    caso(`save de exemplo ${arq} abre igual`, () => {
      const texto = fs.readFileSync(path.join(__dirname, "saves", arq), "utf8"),
        orig = JSON.parse(texto),
        r = lerTextoSave(texto, cat);
      assert.deepEqual(r.avisos, []);
      assert.equal(r.ilegivel, false);
      assert.deepEqual(r.meta, orig.meta);
      assert.deepEqual(r.run, orig.run);
    });
  caso("gravar e ler de novo devolve o mesmo", () => {
    const t = textoSave(exemplo.meta, exemplo.run),
      r = lerTextoSave(t, cat);
    assert.equal(JSON.parse(t).v, VERSAO_SAVE);
    assert.deepEqual(r.avisos, []);
    assert.deepEqual(r.meta, exemplo.meta);
    assert.deepEqual(r.run, exemplo.run);
  });
  caso("sem save: começa do zero, sem avisos", () => {
    for (const t of [null, undefined, ""]) assert.deepEqual(lerTextoSave(t, cat), { meta: {}, run: null, avisos: [], ilegivel: false });
  });
  caso("texto corrompido ou que não é save: ilegível", () => {
    for (const t of ['{"meta":{"essencia":3', "[1,2]", "42", "null", '"texto"']) {
      const r = lerTextoSave(t, cat);
      assert.equal(r.ilegivel, true, t);
      assert.deepEqual(r.meta, {});
      assert.equal(r.run, null);
    }
  });

  // progresso permanente: o campo estragado sai (o jogo usa o padrão) e o resto fica
  caso("números inválidos saem", () => {
    const r = ler(comMeta({ essencia: "muito", recorde: -3, dexMarco: null }));
    assert.equal("essencia" in r.meta, false);
    assert.equal("recorde" in r.meta, false);
    assert.equal("dexMarco" in r.meta, false);
    assert.deepEqual(r.meta.liberados, exemplo.meta.liberados);
  });
  caso("monstro desconhecido ou repetido sai da coleção", () => {
    const [a, b] = exemplo.meta.liberados;
    const r = ler(comMeta({ liberados: [a, "monstro_que_nao_existe", b, a, 7] }));
    assert.deepEqual(r.meta.liberados, [a, b]);
    assert.equal(r.avisos.length, 1);
  });
  caso("coleção sem nenhum monstro conhecido volta à inicial", () => {
    assert.equal("liberados" in ler(comMeta({ liberados: ["x", "y"] })).meta, false);
    assert.equal("liberados" in ler(comMeta({ liberados: "fogo_fatuo" })).meta, false);
  });
  caso("Dragão Ancestral conta como monstro (coleção, Bestiário, equipe e reserva)", () => {
    const dragao = D.ancestrais[0].id;
    assert.equal(
      D.linhas.some(l => l.id === dragao),
      false
    ); // não está nas linhas: o catálogo precisa incluir os ancestrais
    const s = copia(exemplo);
    s.meta.liberados.push(dragao);
    s.meta.dex[dragao] = { f: 1, r: ["lendario"] };
    s.run.selos[1].mon = { id: dragao, rar: "lendario", ramo: null };
    s.run.reserva.push({ id: dragao, rar: "lendario", ramo: null });
    const r = ler(s);
    assert.deepEqual(r.avisos, []);
    assert.deepEqual(r.meta, s.meta);
    assert.deepEqual(r.run, s.run);
  });
  caso("Lendas, deuses e talismãs desconhecidos saem", () => {
    const lenda = D.lendas[0].universo,
      deus = D.panteao[0].id,
      tal = Object.keys(D.poderes.talismas)[0];
    const r = ler(comMeta({ lendas: [lenda, "atlantida_2"], deuses: [deus, "thor_2"], talismas: [tal, "?"] }));
    assert.deepEqual(r.meta.lendas, [lenda]);
    assert.deepEqual(r.meta.deuses, [deus]);
    assert.deepEqual(r.meta.talismas, [tal]);
    assert.equal("lendas" in ler(comMeta({ lendas: { a: 1 } })).meta, false);
  });
  caso("tabelas de números perdem só os valores que não são números", () => {
    const r = ler(comMeta({ cont: { abates: 10, quebra: "3" }, conq: [1], loja: { ima: 2 } }));
    assert.deepEqual(r.meta.cont, { abates: 10 });
    assert.equal("conq" in r.meta, false);
    assert.deepEqual(r.meta.loja, { ima: 2 });
  });
  caso("Bestiário perde só as entradas ilegíveis", () => {
    const id = exemplo.meta.liberados[0];
    const r = ler(comMeta({ dex: { [id]: { f: 3, r: ["comum", 5] }, sumido: { f: 1, r: [] }, [exemplo.meta.liberados[1]]: "x" } }));
    assert.deepEqual(r.meta.dex, { [id]: { f: 3, r: ["comum"] } });
    assert.equal("dex" in ler(comMeta({ dex: [] })).meta, false);
  });
  caso("som, missões do dia e opções de sim/não", () => {
    const r = ler(comMeta({ som: { mudo: true, vol: 7 }, diarias: { dia: "2026-11-12" }, moderador: "sim", escolhaManual: false }));
    assert.deepEqual(r.meta.som, { mudo: true });
    assert.equal("diarias" in r.meta, false);
    assert.equal(r.meta.moderador, true);
    assert.equal(r.meta.escolhaManual, false);
    assert.deepEqual(ler(comMeta({ diarias: exemplo.meta.diarias })).avisos, []);
  });
  caso("progresso que não é tabela: começa do zero, sem quebrar a run", () => {
    const r = ler({ v: 1, meta: "x", run: exemplo.run });
    assert.deepEqual(r.meta, {});
    assert.deepEqual(r.run, exemplo.run);
  });

  // run salva: ou abre como foi salva, ou é descartada inteira (o progresso permanente fica)
  const descarta = (nome, f) =>
    caso(`run descartada: ${nome}`, () => {
      const r = ler(comRun(f));
      assert.equal(r.run, null);
      assert.deepEqual(r.meta, exemplo.meta);
      assert.equal(r.avisos.length, 1);
    });
  descarta("mapa desconhecido", r => (r.universo = "lua"));
  descarta("elemento do Pacto desconhecido", r => r.pacto.push("plasma"));
  descarta("profundidade inválida", r => (r.profundidade = "3"));
  descarta("equipe que não é lista", r => (r.selos = {}));
  descarta("monstro da equipe desconhecido", r => (r.selos[0].mon.id = "sumido"));
  descarta("selo sem nível", r => delete r.selos[0].nivel);
  descarta("monstro da reserva desconhecido", r => r.reserva.push({ id: "sumido", rar: "comum", ramo: null }));
  descarta("ovo do ninho desconhecido", r => (r.ninho = [{ id: "sumido", rar: "raro", prog: 0, alvo: 10 }]));
  descarta("relíquias que não são lista", r => (r.reliquias = "x"));
  descarta("Poder do Elemento ilegível", r => (r.elementais = "fogo"));
  caso("run com Poder do Elemento e relatório da partida abre como foi salva", () => {
    const s = comRun(r => {
      r.elementais = { fogo: 3, luz: 1 };
      r.st = { rel: { mapas: [], escolhas: ["Nível 2 → Erupção (novo)"], t0: 1 }, elementais: 4 };
    });
    assert.deepEqual(ler(s).run, s.run);
  });
  descarta("run que não é tabela", (r, s) => Object.keys(r).forEach(k => delete r[k]));
  caso("run de save antigo sem campos novos (ninho, elos) continua", () => {
    const s = comRun(r => {
      delete r.ninho;
      delete r.elos;
    });
    assert.deepEqual(ler(s).run, s.run);
  });

  caso("save de versão mais nova: lido, e o que esta versão não conhece fica", () => {
    const s = { v: VERSAO_SAVE + 5, meta: { ...copia(exemplo.meta), campoFuturo: { a: 1 } }, run: exemplo.run };
    const r = ler(s);
    assert.equal(r.ilegivel, false);
    assert.deepEqual(r.meta.campoFuturo, { a: 1 });
    assert.deepEqual(r.run, exemplo.run);
    assert.equal(r.avisos.length, 1);
  });
  caso("cópias do original: guarda a primeira e as duas mais recentes, sem repetir", () => {
    let g = null;
    for (const t of ["a", "b", "b", "c", "d", "e"]) g = juntarRecuperacao(g, t, "quando-" + t);
    assert.deepEqual(
      JSON.parse(g).map(e => e.texto),
      ["a", "d", "e"]
    );
    // texto guardado no formato antigo (texto puro) vira a primeira cópia
    assert.deepEqual(
      JSON.parse(juntarRecuperacao('{"meta":', "x", "q")).map(e => e.texto),
      ['{"meta":', "x"]
    );
  });
  caso("conferir não sorteia nada (não muda a partida)", () => {
    const orig = Math.random;
    Math.random = () => {
      throw new Error("sorteou");
    };
    try {
      for (const arq of fs.readdirSync(path.join(__dirname, "saves")))
        lerTextoSave(fs.readFileSync(path.join(__dirname, "saves", arq), "utf8"), cat);
      ler(comMeta({ liberados: ["x", exemplo.meta.liberados[0]] }));
    } finally {
      Math.random = orig;
    }
  });

  if (falhas) {
    console.error(`${falhas} de ${n} testes do save falharam.`);
    process.exit(1);
  }
  console.log(`Save: ${n} testes passaram.`);
})();
