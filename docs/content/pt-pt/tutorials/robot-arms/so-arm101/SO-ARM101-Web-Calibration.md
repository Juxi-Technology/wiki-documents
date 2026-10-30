---
title: "Calibração de servos STS3215 da série So-ARM — versão web"
description: "Calibração de servos STS3215 do So-ARM101 na versão web: ligação Web Serial no navegador ao braço líder/braço seguidor, calibração do ponto médio e do curso, teleoperação, Depurador FT e exportação do ficheiro de calibração."
---

# Calibração de servos STS3215 da série So-ARM — versão web

> **Ferramenta para desktop:** [Tutorial de utilização da ferramenta de calibração de servos da série SoARM](./SO-ARM101-Servo-Calibration-Tool.md)

A **versão web** da ferramenta de calibração de servos do So-ARM101: toda a interface corre no navegador e liga-se diretamente à porta série através do Web Serial, **sem necessidade de instalar Python**.

Endereço online:

[https://juxi-technology.github.io/SO-ARM101-ServoController/](https://juxi-technology.github.io/SO-ARM101-ServoController/)

> ⚠️ Esta ferramenta suporta apenas **servos Feetech (série STS3215)**.

## 1. Preparação antes da utilização

- **Navegador**: Chrome ou Edge 89+ (Firefox / Safari não suportam o Web Serial)
- Abrir em **HTTPS ou localhost**; o GitHub Pages já cumpre este requisito
- **Adaptador USB para porta série** + servo Feetech STS3215, taxa de baud predefinida de **1 M** (`1000000`)


## 2. Ligar o braço robótico

1. No lado esquerdo da barra superior, selecione a «**Taxa de baud da ligação**»; a predefinição é `1000000`. **Se a taxa de baud do servo tiver sido alterada, selecione primeiro a correta antes de ligar**.
1. Clique em «**Ligar porta série**» do «braço líder» ou do «braço seguidor» e selecione a porta COM correspondente na janela do navegador.
1. Depois da ligação, os servos são varridos automaticamente (ID 1–6).


> Os dois braços podem ser ligados e operados separadamente. Se a varredura não encontrar servos, verifique primeiro se a taxa de baud da ligação corresponde à do servo e confirme depois que a porta série não está ocupada por outro programa.

## 3. Modo de demonstração (sem hardware)

Marque «**Modo de demonstração (sem hardware)**» na barra superior antes de ligar; será utilizado um conjunto de dados simulados de 6 servos, permitindo explorar toda a interface.

> Os dados no modo de demonstração são simulados e **não operam o hardware real**.

## 4. Três páginas de funcionalidades

### 🦾 Calibração de servos

Apresenta em tempo real a posição, a tensão, a temperatura e o estado do torque de cada servo; oferece as operações «Calibração do ponto médio», «Teste do ponto médio», «Desativar motor» e «Limpar limites» para servos individuais, além da entrada para a calibração do braço completo.

### 🎚️ Controlo de servo individual

Cada servo ocupa uma linha: **ID / Pos / cursor deslizante / L (destino)**.

- **Pos e o cursor deslizante estão vinculados nos dois sentidos**: ao arrastar o cursor deslizante, o Pos acompanha e o comando é enviado ao largar; ao introduzir um valor em Pos, o comando é enviado imediatamente.


### 🔬 Depurador FT

Ligação à porta série, varredura de servos, leitura de todos os registos, leitura/escrita de registos individuais, controlo de posição, alteração da taxa de baud, restauro de fábrica e backup/restauro de parâmetros xdat.

## 5. Fluxo completo de calibração (recomendado)

1. Na página «Calibração de servos», clique em «**Calibração do ponto médio do braço líder**» para abrir o assistente.
1. Clique em «**Iniciar registo do ponto médio**» (o botão fica laranja) → coloque o braço robótico no ponto médio padrão → clique em «**Concluir registo do ponto médio**».
1. Clique em «**Registar curso de movimento**» (o botão fica verde) → rode cada articulação do início ao fim (**a garra também tem de rodar**) → clique novamente para parar.
1. Depois de concluir as 6 articulações, o **ficheiro de calibração é guardado automaticamente**; repita o processo para o braço seguidor.
1. Com os dois braços calibrados, clique em «**🎮 Teleoperação**» na barra superior para usar o braço líder para mover o braço seguidor.


## 6. Onde ficam os ficheiros de calibração

O navegador só consegue descarregar ficheiros para o diretório «Downloads». Depois de guardar, o assistente apresenta o caminho de destino; **mova o ficheiro manualmente para lá**:

| Parte | Caminho de destino |
|---|---|
| Braço líder | `~/.cache/huggingface/lerobot/calibration/teleoperators/so_leader/my_leader_arm.json` |
| Braço seguidor | `~/.cache/huggingface/lerobot/calibration/robots/so_follower/my_follower_arm.json` |

No Windows, `~` corresponde a `%USERPROFILE%`, e o caminho completo tem o formato `%USERPROFILE%.cache\huggingface\lerobot\calibration...`.

## 7. Teleoperação

Com os dois braços calibrados e ligados, clique em «**🎮 Teleoperação**» na barra superior para usar o ângulo do braço líder para acionar o braço seguidor. Clique novamente em «⏹ Parar teleoperação» para terminar.

> Antes da teleoperação, confirme que a área em redor dos dois braços é segura — **com o torque ativado, o servo não pode ser movido com as mãos**. A teleoperação requer duas portas série ligadas.

## 8. Detalhes do Depurador FT

### Ler e escrever registos

- Clique em «**Ler todos os parâmetros**» para ler todos os registos do servo selecionado; os resultados são preenchidos na tabela de parâmetros.
- **Clicar numa linha da tabela de parâmetros preenche o endereço e o comprimento acima; de seguida, introduza o «Valor» e clique em «Escrever**».
- As linhas cinzentas (área DEFAULT) **não podem ser lidas nem escritas**, evitando escritas acidentais em áreas apenas de leitura.


### Controlo de posição

Depois de selecionar o servo, defina a posição de destino com o cursor deslizante ou a caixa numérica e clique em «Mover» para executar. Se o torque não estiver ativado, será perguntado se o pretende ativar.

### Alterar a taxa de baud

Depois de selecionar a nova taxa de baud, clique em «Aplicar»; após a escrita, a ligação é terminada e é feita uma tentativa de nova ligação com a nova taxa de baud; em caso de falha, o motivo é apresentado no log.

### Restauro de fábrica

Repõe o ID em 1 e a taxa de baud em 1M, **sem possibilidade de anular**; é necessário confirmar duas vezes antes de executar.

### Backup e restauro de parâmetros xdat

| Botão | Função |
|---|---|
| 💾 Guardar servo atual como xdat | Lê todos os parâmetros e descarrega um ficheiro `.xdat` |
| 📂 Abrir xdat | Carrega um ficheiro `.xdat` local |
| 📤 Restaurar parâmetros no servo | Escreve os parâmetros xdat de volta na EEPROM do servo atual |

> O restauro substitui definições como o ID, a taxa de baud e os limites; antes de executar, confirme que o servo selecionado está correto. A EEPROM tem um limite de ciclos de escrita; não escreva com frequência.

## 9. Precauções

1. **A página tem de permanecer em primeiro plano**: o navegador limita os separadores em segundo plano, e a teleoperação e a atualização em tempo real podem ficar lentas ou até parar.
1. **O curso da mesma articulação nos dois braços tem de ser varrido de forma consistente**, caso contrário a amplitude dos movimentos não corresponderá durante a teleoperação.
1. **A garra não é uma articulação de rotação contínua, mas também tem de ter o curso varrido**; caso contrário, o intervalo ficará no valor predefinido de 0–4095.
1. No Depurador FT, **as linhas cinzentas (área DEFAULT) não podem ser lidas nem escritas**; a EEPROM tem um limite de ciclos de escrita, não escreva com frequência.
1. **Antes da teleoperação, confirme que a área em redor dos dois braços é segura**; com o torque ativado, o servo não pode ser movido com as mãos.
1. Só um programa pode ocupar a porta série de cada vez — ao utilizar esta página, feche a versão desktop ou outras aplicações de host.


## 10. Perguntas frequentes

**P1: Não consigo ligar / a varredura não encontra servos.**
Verifique primeiro se a taxa de baud da ligação corresponde à do servo e confirme depois que a porta série não está ocupada por outro programa.

**P2: O Pos não é atualizado.**
Confirme que o servo está online; clique novamente em «Ligar porta série» ou atualize a página.

**P3: A escrita falha.**
Consulte o motivo específico no log; confirme que o endereço e o comprimento vêm de uma linha da tabela de parâmetros.

**P4: É apresentada a indicação de que o navegador atual não suporta o Web Serial.**
Utilize o Chrome / Edge 89+ e abra através de HTTPS ou localhost.

**P5: O LeRobot não encontra o ficheiro de calibração depois de o guardar.**
O navegador só descarrega para o diretório «Downloads»; é necessário mover o ficheiro manualmente para os caminhos indicados na secção 6.
