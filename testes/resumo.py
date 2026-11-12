# Resume um arquivo de resultados do bot: profundidade, onde morre, tempo de chefe e vida mínima por mapa.
# python3 testes/resumo.py testes/res.json [outro.json ...]
import json, sys, statistics as st
for arq in sys.argv[1:]:
    R=json.load(open(arq)); n=len(R)
    prof=[r['profundidade'] for r in R]
    print(f"== {arq}: {n} runs · profundidade média {st.mean(prof):.2f} · mediana {st.median(prof)} · min {min(prof)} max {max(prof)}")
    mortes={}
    for r in R:
        if r['morreu']: mortes[r['mapaMorte']]=mortes.get(r['mapaMorte'],0)+1
    print("   morreu no mapa:", dict(sorted(mortes.items())), f"· sobreviveu até o limite: {sum(1 for r in R if not r['morreu'])}")
    M=max(prof) if prof else 0
    for i in range(M):
        tt=[r['mapas'][i]['ttkChefe'] for r in R if len(r['mapas'])>i]
        vm=[r['vidaMin'][i] for r in R if len(r.get('vidaMin',[]))>i]
        if tt: print(f"   mapa {i+1}: chefe {st.median(tt):5.1f}s (mediana) · vida mínima média {st.mean(vm)*100:3.0f}% · chegaram {len(tt)}")
    fontes={}
    for r in R:
        for k,v in (r.get('porFonte') or {}).items(): fontes[k]=fontes.get(k,0)+v
    tot=sum(fontes.values()) or 1
    print("   dano por fonte:", ", ".join(f"{k} {v/tot*100:.0f}%" for k,v in sorted(fontes.items(),key=lambda x:-x[1])))
    # horda: quantos inimigos na tela, abates por minuto, níveis por mapa, tempo com a vida baixa e com a tela vazia
    H={}
    for r in R:
        for h in r.get('horda') or []: H.setdefault(h['mapa'],[]).append(h)
    for m in sorted(H):
        L=H[m]; seg=sum(h['seg'] for h in L) or 1
        print(f"   horda mapa {m}: {st.mean(h['tela'] for h in L):5.1f} na tela (pico {max(h['picoTela'] for h in L)}, total {max(h['picoTotal'] for h in L)}) · {sum(h['abates'] for h in L)/seg*60:5.0f} abates/min · {st.mean(h['niveis'] for h in L):4.1f} níveis · vida baixa {st.mean(h['vidaBaixa'] for h in L)*100:3.0f}% · tela vazia {st.mean(h['telaVazia'] for h in L)*100:3.0f}%")
        cs = [h.get('curva') for h in L if h.get('curva')]
        if cs: print("      na tela ao longo do mapa (0-15 s · 15-30 · 30-60 · 60-90 · 90+):", " · ".join(f"{st.mean(v):4.1f}" if (v := [c[k] for c in cs if c[k] is not None]) else "  - " for k in range(5)))
    rc=sum(r.get('recContato',0) for r in R); rb=sum(r.get('recBala',0) for r in R)
    if rc+rb: print(f"   dano recebido: contato {rc/(rc+rb)*100:.0f}% · golpes e projéteis {rb/(rc+rb)*100:.0f}%")
