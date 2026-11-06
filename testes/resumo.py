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
