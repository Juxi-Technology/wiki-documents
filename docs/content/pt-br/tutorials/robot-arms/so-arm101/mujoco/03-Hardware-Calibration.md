---
title: "03 · Conexão com o robô real e calibração"
description: "Ao conectar a placa driver com o chip CH343, surge uma porta COM; o número varia com conexões/desconexões ou troca de porta USB, então confirme antes de cada…"
---

# 03 · Conexão com o robô real e calibração

> Pré-requisito: concluir o [01 Preparação do ambiente](/pt-br/tutorials/robot-arms/so-arm101/mujoco/01-Environment) (o extra `feetech` fornece a comunicação serial).
> Portas de exemplo deste capítulo: braço seguidor `COM172`, braço líder `COM124` (valores medidos do braço líder em uso nesta máquina) — **o número pode mudar a cada conexão;
> use sempre a porta real encontrada no primeiro passo**, e nos comandos abaixo basta substituir pela sua numeração.

## Identificar a porta serial

Ao conectar a placa driver com o chip CH343, surge uma porta COM; o número varia com conexões/desconexões ou troca de porta USB, então confirme antes de cada conexão:

```bash
export UV_CACHE_DIR='C:\Users\admin\AppData\Local\Temp\uv-cache'
uv run --frozen python -c "import serial.tools.list_ports as lp; [print(p.device, '|', p.description, '|', p.hwid) for p in lp.comports()]"
```

A linha da saída que mostra `CH343` (ou um dispositivo serial USB semelhante) é a placa driver; anote o número `COM` dela.

## Primeiro passo: verificação inicial somente leitura (fiação/alimentação/inspeção dos servos)

**Sem escrever nada**, primeiro faça ping em cada um dos seis servos e depois leia tensão e temperatura (o estado de torque é mantido como está):

```bash
uv run --frozen python examples/so101_mujoco/hardware_check.py --port COM172   # 换成你查到的端口
```

`--port` é o número encontrado no primeiro passo; preencha a porta do braço que será inspecionado (o mesmo script serve para o braço seguidor e o líder).

A saída normal tem o formato: seis linhas de juntas, temperatura 20–30 °C e torque 0 (braço livre). **A tensão depende da forma de alimentação**: com fonte externa,
o braço seguidor fica em cerca de 11 V; o braço líder, alimentado apenas pela placa driver, fica em cerca de 5 V — conseguir ler todos os seis servos já indica que a fiação
está correta. Servos ausentes ou de modelo incompatível geram erro imediato.

## Segundo passo: calibração

A calibração grava no EEPROM dos servos "a faixa de curso de cada junta + a referência central" e salva em um arquivo local; **é preciso calibrar o braço seguidor e o braço líder, cada um uma vez**.
Os arquivos de calibração dos dois braços ficam separados e não se afetam:

| Dispositivo | Comando | Local do arquivo de calibração |
| --- | --- | --- |
| Braço seguidor | `uv run --frozen lerobot-calibrate --robot.type=so101_follower --robot.port=COM172 --robot.id=juxi_so101` | `~/.cache/huggingface/lerobot/calibration/robots/so_follower/juxi_so101.json` |
| Braço líder | `uv run --frozen lerobot-calibrate --teleop.type=so101_leader --teleop.port=COM124 --teleop.id=juxi_leader` | `.../calibration/teleoperators/so_leader/juxi_leader.json` |

Significado dos parâmetros do comando:

| Parâmetro | Descrição |
| --- | --- |
| `--robot.type=so101_follower` / `--teleop.type=so101_leader` | Papel do objeto de calibração: braço seguidor / braço líder (não inverta os papéis; os arquivos de calibração são armazenados em diretórios separados por papel) |
| `--robot.port` / `--teleop.port` | Número da porta serial encontrado no primeiro passo |
| `--robot.id` / `--teleop.id` | Nome dado a este braço (neste exemplo `juxi_so101` / `juxi_leader`); **a teleoperação/gravação posterior deve usar o mesmo id**, caso contrário será solicitada nova calibração |

O `id` pode ser qualquer nome, mas as calibrações dos dois braços são independentes e não se sobrescrevem.

### Passos físicos (o terminal imprime um diagrama ilustrativo)

1. **Coloque na pose central e pressione Enter**: base apoiada na borda da mesa, braço superior na vertical para cima, antebraço horizontal para a frente, rotação do ombro e punho centralizados
   (a "garra" do braço líder é o manípulo/gatilho). A posição neste instante é registrada como a "referência central" do braço.
2. Após o Enter, **percorra lentamente toda a faixa de movimento de cada junta, uma por uma** (`wrist_roll` não precisa ser percorrida; é tratada automaticamente como volta completa), e pressione Enter de novo para salvar.

Observações:

- Durante a calibração do braço seguidor, o torque é 0 (o braço fica mole); mova-o com a mão. O braço líder, por natureza, não possui torque.
- O processo de calibração grava no EEPROM dos servos (isso faz parte da calibração e é normal).
- Resultados de calibração medidos desta vez (para referência): no braço seguidor, o curso das juntas é de cerca de 1474–2688 contagens, e a rotação do punho (`wrist_roll`), 4095 contagens;
  no braço líder, cerca de 2208–2681 contagens. Curso claramente assimétrico é normal (motivo e compensação em [05 Ajuste fino do zero](/pt-br/tutorials/robot-arms/so-arm101/mujoco/05-Leader-Digital-Twin)).

<RelatedProducts slugs="so-arm101" />
