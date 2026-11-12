// GERADO por "node ferramentas/tipos_dados.js" a partir de js/dados.js. Não edite: edite os dados e gere de novo.
// O tipo do conteúdo do jogo (D). Grupos de entradas viram Record<string, ...>; configurações ficam com os campos nomeados.
interface Dados {
  elementos: Record<string, {
    nome: string;
    cor: string;
    paleta: string;
    status: string;
  }>;
  reacoes: ({
    a: string;
    b: string;
    nome: string;
    tipo: string;
    desc: string;
  })[];
  classes: Record<string, {
    nome: string;
    papel: string;
    base: Record<string, number>;
    basico: string;
    h1: {
      nome: string;
      desc: string;
      mods: (string)[];
    };
    h2: {
      nome: string;
      desc: string;
      mods: (string)[];
    };
    sinergia2: string;
    sinergia3: string;
  }>;
  papeis: {
    frente: string;
    dano_fisico: string;
    dano_magico: string;
    suporte: string;
  };
  linhagens: Record<string, {
    nome: string;
    mecanica: string;
    sinergia2: string;
    sinergia3: string;
  }>;
  estagios: ({
    id: string;
    nome: string;
    nivel: number;
    mult: number;
    tamanho: string;
  })[];
  raridades: ({
    id: string;
    nome: string;
    moldura: string;
    cor_muda: boolean;
    regra_cor?: string;
  })[];
  condicoes: {
    afinidade: string;
    solitario: string;
    alianca: string;
    regional: string;
  };
  regras: {
    equipe_max: number;
    nivel_habilidade_max: number;
    nivel_escolha_modificador: number;
    supremo_requer: string;
    despertar: {
      bonus_por_estrela: number;
      estrelas: string;
    };
    ramos: Record<string, {
      dano: number;
      vida: number;
      reacao: number;
      classe_dupla?: boolean;
    }>;
    sinergia_classe: Record<string, {
      "2": {
        dps: number;
        ehp: number;
      };
      "3": {
        dps: number;
        ehp: number;
      };
    }>;
    sinergia_linhagem: {
      "2": {
        dps: number;
        ehp: number;
      };
      "3": {
        dps: number;
        ehp: number;
      };
    };
    sinergia_elemento: {
      "2": {
        dps: number;
        ehp: number;
      };
      "3": {
        dps: number;
        ehp: number;
      };
    };
    reacao_por_par: number;
    trindade: {
      dps: number;
      ehp: number;
    };
    tempo_mapa_seg: number;
    mini_chefe_seg: number;
    mapas_por_capitulo: number;
    fusao: string;
  };
  eras_ordem: (string)[];
  vantagem: Record<string, string>;
  mult_vantagem: {
    super_efetivo: number;
    pouco_efetivo: number;
  };
  pacto: {
    min: number;
    max: number;
    bonus: {
      "2": {
        dano: number;
        texto: string;
      };
      "3": {
        dano: number;
        texto: string;
      };
    };
    excecoes: string;
  };
  selos: {
    quantidade: number;
    regra: string;
    troca_no_mapa: string;
    troca_fora: string;
    forma: string;
    selo_novo: string;
  };
  ovos: {
    raridades: Record<string, {
      xp: number;
      chance: number;
      bonus: number;
    }>;
    ninho_max: number;
    intervalo_ovo_seg: number;
    intervalo_filhote_seg: number;
    filhote_selvagem: string;
    ovo_chefe: string;
  };
  itens: Record<string, {
    nome: string;
    efeito: string;
    fonte: string;
  }>;
  despertar: {
    duracao_seg: number;
    estagios_extra: number;
    dano: number;
    cadencia: number;
    carga: string;
  };
  esquiva: {
    distancia: number;
    invulneravel_seg: number;
    recarga_seg: number;
  };
  combo: {
    janela_seg: number;
    xp_por_10: number;
    xp_max: number;
    marcos: (number)[];
  };
  especiais: Record<string, ((string)[])[]>;
  especial_regras: {
    recarga_base_seg: number;
    reducao_por_nivel: number;
    recarga_min_seg: number;
    bonus_supremo: number;
    texto: string;
  };
  combinado_regras: {
    recarga_seg: number;
    carga_inicial_seg: number;
    manual: boolean;
    prioridade: (string)[];
    forca: Record<string, number>;
  };
  combinados_linhagem: Record<string, string>;
  combinados_elemento: Record<string, string>;
  superficies: Record<string, (string)[]>;
  interacoes: ((string)[])[];
  terreno_natural: Record<string, [string, number]>;
  terreno_especial: Record<string, [string, number]>;
  linhas: ({
    id: string;
    linhagem: string;
    universo: string;
    elemento: string;
    classe: string;
    visual: string;
    filhote: string;
    jovem: string;
    ramos: ({
      tipo: string;
      nome: string;
      supremo: string;
      ultimate: string;
      linhagem: string;
      classe_extra: null | string;
      elemento: string;
      condicao: {
        tipo: string;
        era?: string;
        elemento?: string;
        classe?: string;
      };
    })[];
    animal: string;
    personalidade: string;
    traco: string;
    forma: string;
  })[];
  elos: ({
    a: string;
    b: string;
    nome: string;
    desc: string;
  })[];
  ancestrais: ({
    id: string;
    ancestral: boolean;
    linhagem: string;
    universo: null;
    elemento: string;
    classe: string;
    visual: string;
    filhote: string;
    jovem: string;
    ovo: string;
    ramos: ({
      tipo: string;
      nome: string;
      supremo: string;
      ultimate: string;
      linhagem: string;
      classe_extra: null;
      elemento: string;
      condicao: {
        tipo: string;
      };
    })[];
    animal: string;
    personalidade: string;
    traco: string;
    forma: string;
  })[];
  ancestrais_info: ({
    id: string;
    elemento: string;
    classe: string;
    linhagem: string;
    provisorio: boolean;
    ovo: string;
    filhote: string;
    jovem: string;
    adulto: string;
    supremo: string;
    ultimate: string;
    visual: string;
    formas: (string)[];
  })[];
  ancestral_regras: {
    mapa_min: number;
    chance_por_mapa: number;
    garantido_no_mapa: number;
    chocar_seg: number;
    por_abate_seg: number;
    nota: string;
  };
  eras: Record<string, {
    nome: string;
    guardiao: string;
    guardiao_visual: string;
    combate: {
      corpo: string;
      detalhes: (string)[];
      golpes: ({
        nome: string;
        tipo: string;
        desc: string;
        vmax?: number;
        vel?: number;
        el?: string;
        solo?: string;
        empurra?: boolean;
        n?: number;
        k?: number;
        cerco?: boolean;
        bracos?: number;
        dur?: number;
        proj?: string;
        larg?: number;
        alcance?: number;
        varre?: number;
        quebra?: boolean;
        r?: number;
        intervalo?: number;
        forca?: number;
        engole?: boolean;
        ang?: number;
        rastro?: string;
        pct?: number;
        metal?: boolean;
        arco?: number;
        ondas?: number;
        forma?: string;
        mat?: string;
      })[];
      fase2: {
        nome: string;
        op: string;
        desc: string;
        gelo?: boolean;
        mat?: string;
      };
      mania: string;
    };
  }>;
  universos: ({
    id: string;
    era: string;
    nome: string;
    elemento: string;
    inimigos: (string)[];
    mini_chefe: string;
    chefe: string;
    reliquia: {
      nome: string;
      efeito: string;
    };
    cenario: string;
    humor: string | null;
    combate: {
      inimigos: ({
        nome: string;
        corpo: string;
        andar: string;
        golpe: string;
        morte: string;
        mania: string;
        detalhes: (string)[];
      })[];
      mini: {
        corpo: string;
        detalhes: (string)[];
        golpes: ({
          nome: string;
          tipo: string;
          desc: string;
          n?: number;
          k?: number;
          r?: number;
          fissura?: number;
          solo?: string;
          arco?: number;
          ondas?: number;
          proj?: string;
          el?: string;
          pct?: number;
          ang?: number;
          alcance?: number;
          empurra?: boolean;
          vel?: number;
          dur?: number;
          forma?: string;
          mat?: string;
          forca?: number;
          rastro?: string;
          voo?: boolean;
          duplo?: boolean;
          quebra?: boolean;
          deixa?: string;
          intervalo?: number;
          cura?: boolean;
          bracos?: number;
          cresce?: boolean;
          vmax?: number;
          atordoa?: boolean;
          larg?: number;
          varre?: number;
        })[];
        fase2: null;
        mania: string;
      };
      chefe: {
        corpo: string;
        detalhes: (string)[];
        golpes: ({
          nome: string;
          tipo: string;
          desc: string;
          dur?: number;
          r?: number;
          rastro?: string;
          n?: number;
          proj?: string;
          deixa?: string;
          forca?: number;
          ondas?: number;
          el?: string;
          forma?: string;
          mat?: string;
          larg?: number;
          alcance?: number;
          varre?: number;
          quebra?: boolean;
          arco?: number;
          duplo?: boolean;
          k?: number;
          aperta?: boolean;
          ang?: number;
          solo?: string;
          fissura?: number;
          bracos?: number;
          comp?: number;
          vel?: number;
          vmax?: number;
          atordoa?: boolean;
          tronco?: boolean;
          voo?: boolean;
          empurra?: boolean;
          intervalo?: number;
          engole?: boolean;
          cospe?: boolean;
          some?: boolean;
          cura?: boolean;
        })[];
        fase2: {
          nome: string;
          op: string;
          desc: string;
          mat?: string;
          vapor?: boolean;
          puxa?: boolean;
          inunda?: boolean;
          pedras?: boolean;
        };
        mania: string;
      };
      especial?: {
        nome: string;
        corpo: string;
        andar: string;
        golpe: string;
        morte: string;
        mania: string;
        detalhes: (string)[];
        intervalo: number;
      };
    };
    kit: {
      vento: number;
      rajada: number;
      veg: string;
      dens: number;
      part: (string)[];
      props: {
        vaso?: number;
        rocha?: number;
        caixote?: number;
        metal?: number;
        polvora?: number;
        gelo?: number;
        barril?: number;
        feno?: number;
        fruta?: number;
        cristal?: number;
      };
      nuvens?: boolean;
      chao: (string)[];
      redemoinho?: boolean;
      vaso?: (string)[];
      rocha?: string;
      metal?: string;
      nevoa?: string;
      petala?: string;
      fruta?: string;
      cogu?: string;
      caverna?: boolean;
      relampago?: boolean;
      nuvensEscuras?: boolean;
      submerso?: boolean;
      cristal?: string;
    };
    arte: {
      estilo: string;
      chao: string;
      marcos: (string)[];
      luz: string;
      frente: string;
      enfeites: (string)[];
    };
    estrutura: {
      zona: number;
      pecas: {
        abismo: number;
        lago: number;
        praca: number;
        construcao: number;
      };
      chance_ponte: number;
      lago_solo?: string;
      piso: string;
      fundo: string;
      paredao: string;
      praca: string;
      lago: string;
      construcao: string;
      ponte: string;
      fauna: {
        ave: string;
        borboleta: string;
        peixe: string;
        bicho: string;
      };
    };
    luz: {
      tom: string;
      forca: number;
      noite: number;
    };
    objetos: (string)[];
  })[];
  modificadores: {
    corrupcao: string;
    invasao: string;
    clima: string;
  };
  hub: {
    nome: string;
    moeda: string;
    estacoes: ((string)[])[];
    desbloqueio_monstro: string;
    lendarios: string;
    profundidade: string;
  };
  materiais: Record<string, {
    nome: string;
    m: number;
    r: number;
    hp: number;
    mu: number;
    e: number;
    fragil: number;
    res?: {
      terra?: number;
      natureza?: number;
      _?: number;
      raio?: number;
      fogo?: number;
      agua?: number;
      luz?: number;
    };
    afunda?: boolean;
    frag: string;
    inflam?: boolean;
    queimaT?: number;
    flutua?: boolean;
    rola?: number;
    explode?: boolean;
    area?: number;
    derrete?: boolean;
    fixo?: boolean;
    indestrutivel?: boolean;
    condutor?: boolean;
    fantasma?: boolean;
  }>;
  poderes: {
    encaixes: number;
    chance_carta: number;
    forca_desperto: number;
    forca_uniao: number;
    talismas: Record<string, {
      nome: string;
      efeito: string;
      valor: number;
      inicial: boolean;
      texto: string;
    }>;
    despertos: ({
      classe: string;
      poder: string;
      talisma: string;
      nome: string;
      desc: string;
    })[];
    unioes: ({
      a: string;
      b: string;
      nome: string;
      desc: string;
    })[];
  };
  conquistas: ({
    id: string;
    categoria: string;
    universo: string | null;
    ladrilho: number | null;
    evento: string;
    n: number;
    insignia: string;
    nome: string;
    texto: string;
    secreta: boolean;
    essencia: number;
    talisma: null | string;
  })[];
  lendas: ({
    id: string;
    nome: string;
    universo: string;
    elementos: (string)[];
    poder: {
      nome: string;
      tipo: string;
      r?: number;
      dano: number;
      cd: number;
      n?: number;
      perf?: number;
      volta?: boolean;
      solo?: string;
      farpas?: number;
      vida?: number;
      cura?: number;
      saltos?: number;
      reanima?: boolean;
      prende?: boolean;
      encanta?: boolean;
    };
    passiva: {
      nome: string;
      efeito: string;
      valor: number;
      custo: null | {
        velocidade?: number;
        vida?: number;
        dano_dia?: number;
        defesa?: number;
      };
    };
  })[];
  panteao: ({
    id: string;
    nome: string;
    panteao: string;
    elementos: (string)[];
    poder: {
      nome: string;
      tipo: string;
      saltos?: number;
      dano: number;
      cd: number;
      n?: number;
      perf?: number;
      volta?: boolean;
      r?: number;
      cura?: number;
      encanta?: boolean;
      solo?: string;
    };
    passiva: {
      nome: string;
      efeito: string;
      valor: number;
      custo: {
        defesa?: number;
        velocidade?: number;
        dano_dia?: number;
        area?: number;
        vida?: number;
        regen_zero?: number;
        risco?: number;
      };
    };
    fardo: string;
    dom: {
      nome: string;
      tipo: string;
      n?: number;
      dano?: number;
      cd: number;
      vida?: number;
      r?: number;
      escudo?: number;
      dur?: number;
      limite?: number;
      cura?: number;
    };
    provacao: {
      universo: string;
      texto: string;
      requisito: {
        elemento?: string;
        n?: number;
        sem_esquiva?: boolean;
        abates?: number;
        tempo?: number;
        intocado?: boolean;
        sem_cura?: boolean;
        guardiao?: boolean;
      };
    };
  })[];
}
declare const D: Dados;
