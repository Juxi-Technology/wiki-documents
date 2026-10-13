---
title: "4 · Teleoperação"
description: "Teleopere com o LeLab: mova o braço líder e o seguidor o acompanha com as posições das juntas ao vivo — também é a forma mais rápida de verificar a calibração."
---

# 4 · Teleoperação

> **Anterior:** [03 Conectar e calibrar](03-Calibration.md)
> **Próximo:** [05 Gravar um dataset](05-Record-Dataset.md)

Você move o braço leader com a mão; o follower copia o movimento. É assim que você grava demonstrações, e é a forma mais rápida de confirmar a calibração.

## Executando

1. Abra a aba **Teleoperation**.
2. Confirme as portas e o perfil de calibração — o LeLab se lembra deles desde a calibração.
3. Inicie a teleoperação.
4. Mova o braço leader.

A aba transmite as posições das juntas enquanto roda. Aperte parar quando terminar.

**O Stop é o que estaciona o follower.** Fechar a aba ou encerrar o processo deixa o braço onde está.

## O que verificar

| Verificação | Por quê |
|---|---|
| O follower acompanha suavemente, sem atraso nem trepidação | Um acompanhamento ruim vira dados de treinamento inutilizáveis |
| O alcance do follower corresponde ao do leader | Parar antes ou bater em um limite significa que uma junta está descalibrada — volte à [página 3](03-Calibration.md) |
| Os dois braços se movem na mesma direção | Um follower invertido significa que uma junta foi calibrada na direção errada |
| Nada colide nos extremos | Passe por toda a faixa que você pretende usar |

Se o movimento estiver errado, mas não quebrado — deslocado, uma junta invertida, alcance reduzido — recalibre em vez de compensar. Um braço descalibrado produz um dataset que treina a policy a fazer a coisa errada.

## Câmeras

Se as câmeras estiverem configuradas, a visão de teleoperação mostra as prévias delas.

- Câmera de pulso: ela mostra a garra e o que ela está prestes a agarrar?
- Câmera fixa: ela mostra toda a área de trabalho?
- Alguma das imagens está de lado ou de cabeça para baixo? Corrija a **rotação** na [aba de calibração](03-Calibration.md) antes de gravar.

Os quadros gravados durante a teleoperação são a única coisa que a policy jamais vê.

---

> **Próximo:** [05 Gravar um dataset](05-Record-Dataset.md)

<RelatedProducts slugs="so-arm101" />
