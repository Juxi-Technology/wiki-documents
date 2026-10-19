---
title: "08 · Roteiro futuro"
description: "Concluído:"
---

# 08 · Roteiro futuro

## Concluído (executável diretamente neste repositório)

| Recurso | Status |
| --- | --- |
| Verificação de carregamento/acionamento/renderização do modelo de simulação (3 MJCF) | ✅ |
| Teleoperação por teclado (simulação / robô real) | ✅ validado no robô real |
| Gêmeo digital do braço líder (braço físico → braço simulado, com ajuste fino do zero) | ✅ validado no robô real |
| Gravação de dados (robô real / simulação) + controle de episódios + script de inspeção | ✅ validado no robô real |
| Reprodução de dados (robô real / simulação, mecanismo oficial) | ✅ validado no robô real |
| Teste de fumaça automatizado (sem hardware `smoke_test.py`) | ✅ 26 itens aprovados |
| Conjunto de dados visual com duas câmeras `so101_sim_vision` (5 episódios / 10610 quadros / 353,8 s) | ✅ |
| Treinamento (ACT) e implantação de política na simulação (`lerobot-train` / `lerobot-rollout`) | ✅ smoke test medido (veja [09](/pt-br/tutorials/robot-arms/so-arm101/mujoco/09-Usage-Tutorial)) |

## Próximos passos (ordenados por valor)

### Fase 2 · Câmera na cena (em andamento)

**Concluído**:
- Suporte (STEP→STL) e câmera (corpo provisório construído segundo o datasheet do HBVCAM-F2170HD V22, 25×30×5,2 mm) montados na simulação,
  com pose ajustada por comparação com o robô real via `adjust_mount.py` / `adjust_camera.py`;
- Elemento `<camera>` integrado (`sim_cam`, fovy inicial 49°), e **o fluxo de gravação visual na simulação já funciona de ponta a ponta**:
  `--robot.image_camera=sim_cam` já produz um conjunto de dados de vídeo `observation.images.wrist` (teste de fumaça [5] todo aprovado).

**Atualização de 2026-10-16**: a mira/fovy da câmera foi ajustada a contento (`adjust_camera.py` ganhou a **janela de imagem ao vivo live view**,
com ajuste retomável e reabertura automática da janela se fechada por engano; também foi corrigido o bug de "direção da lente e imagem invertidas" causado por a direção de enquadramento da câmera do MuJoCo ser o **eixo −Z do elemento**,
detalhes no [07](/pt-br/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting)). O conjunto de dados visual foi gravado oficialmente com o braço líder recém-calibrado (com vídeo wrist, erro de acompanhamento ≤2 unidades) ✅;
as gravações experimentais antigas foram limpas em 2026-10-16, e o conjunto de dados oficial passou a ser unificado como `so101_sim_vision` (duas câmeras).
**No mesmo dia, o robô simulado foi migrado para o modelo SO-ARM100 do mujoco_menagerie** (2026-10-16): a garra do modelo do tutorial original não consegue agarrar;
a garra do novo modelo usa colisão do CAD do robô real e, nas medições, segura o cubo de 34 mm com estabilidade; todos os fluxos de gravação/teleoperação/duas câmeras/área de trabalho foram preservados,
faltando uma revisão por teleoperação no robô real (especialmente o sinal da direção de wrist_roll).
**Pendente**: após conectar a HBVCAM no robô real, fazer o ajuste fino comparando "foto do robô real vs renderização da simulação";
opcional: substituir o corpo provisório pelo STL do corpo da câmera. A configuração de câmera no lado do robô real (`--robot.cameras` OpenCV) será feita depois, junto.

### Fase 3 · Cenas e escala (em andamento)

- ✅ Área de trabalho adicionada à cena (2026-10-16): tapete + cubos de três cores (34 mm, agarráveis) + caixa de armazenamento + câmera fixa de visão superior `top_cam`
  (definida em `so101_assets.add_workspace`, ferramenta de renderização/verificação de alcance `preview_workspace.py`); **o fluxo de gravação com duas câmeras (wrist+top)
  já funciona de ponta a ponta** (`--robot.top_camera=top_cam`);
- **Geração automática de dados**: políticas por script/RL rodando em lote a noite toda na simulação (sem humano no loop); é daí que vem a "eficiência de dezenas de vezes";
- Randomização de domínio visual (texturas/iluminação/tremor de câmera) preparando o terreno para sim2real.

### Fase 4 · Treinamento e implantação

- ✅ **O fluxo de treinamento/implantação já foi medido** (2026-10-16): `lerobot-train` (ACT, smoke test de 12 passos em CPU — cerca de 2 s/passo, loss caindo normalmente,
  checkpoint gravado como esperado) e `lerobot-rollout --strategy.type=base` (executando de fato a política por 20 s na simulação,
  encerrando após enviar automaticamente o braço de volta à pose inicial) já funcionam de ponta a ponta; comandos completos, pontos principais e método de retomada do treinamento estão nas seções 7/8 do [09](/pt-br/tutorials/robot-arms/so-arm101/mujoco/09-Usage-Tutorial),
  e o checkpoint de demonstração incluído no tutorial, `outputs/train/smoke_act`, pode ser usado diretamente para testar o fluxo de implantação;
- O treinamento oficial deve ser feito em uma **máquina com GPU** (ACT / SmolVLA; a CPU pura desta máquina serve apenas para validar o fluxo com poucos passos);
  basta copiar o conjunto de dados ou enviá-lo a um repositório privado no HF;
- A implantação no robô real também usa o `lerobot-rollout` (troque `--robot.*` pela configuração `so101_follower`).

### Longo prazo · sim2real

Treinamento misto com dados de simulação + uma pequena quantidade de dados reais → avaliação no robô real com custo zero (a taxa de sucesso da política pode ser avaliada de forma reproduzível na simulação).
Atenção: usar dados puramente simulados diretamente no robô real (transferência zero-shot) é a rota mais difícil; comece com um "ciclo curto" (treinar com dados reais → implantar no robô real)
e adicione a simulação gradualmente.

## Posicionamento em uma frase

Para equipes que já têm braços físicos: simulação = **sandbox de desenvolvimento + material de demonstração + amplificador de dados**;
para clientes potenciais: simulação = **ferramenta de experiência que permite percorrer todo o fluxo antes de comprar**.

<RelatedProducts slugs="so-arm101" />
