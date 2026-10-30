---
title: "Calibração de servos STS3215 da série So-ARM — versão web"
description: "Calibração de servos STS3215 do So-ARM101 na versão web: conexão Web Serial no navegador ao braço líder/braço seguidor, calibração de ponto médio e faixa de movimento, controle remoto, depurador FT e exportação do arquivo de calibração."
---

# Calibração de servos STS3215 da série So-ARM — versão web

> **Ferramenta para desktop:** [Tutorial de uso da ferramenta de calibração de servos da série SoARM](./SO-ARM101-Servo-Calibration-Tool.md)

A **versão web** da ferramenta de calibração de servos do So-ARM101: toda a interface roda no navegador e se conecta diretamente à porta serial via Web Serial, **sem necessidade de instalar Python**.

Endereço online:

[https://juxi-technology.github.io/SO-ARM101-ServoController/](https://juxi-technology.github.io/SO-ARM101-ServoController/)

> ⚠️ Esta ferramenta suporta apenas **servos Feetech (série STS3215)**.

## 1. Preparação antes do uso

- **Navegador**: Chrome ou Edge 89+ (Firefox / Safari não suportam Web Serial)
- Abrir em **HTTPS ou localhost**; o GitHub Pages já atende
- **Adaptador USB-serial** + servo Feetech STS3215, taxa de baud padrão de **1 M** (`1000000`)


## 2. Conectar o braço robótico

1. No lado esquerdo da barra superior, selecione a “**Taxa de baud de conexão**”; o padrão é `1000000`. **Se a taxa de baud do servo foi alterada, selecione a correta antes de conectar**.
1. Clique em “**Conectar porta serial**” do “braço líder” ou do “braço seguidor” e selecione a porta COM correspondente na janela do navegador.
1. Após a conexão, os servos são escaneados automaticamente (ID 1–6).


> Os dois braços podem ser conectados e operados separadamente. Se nenhum servo for encontrado na varredura, verifique primeiro se a taxa de baud de conexão corresponde à do servo e depois confirme que a porta serial não está ocupada por outro programa.

## 3. Modo de demonstração (sem hardware)

Marque “**Modo de demonstração (sem hardware)**” na barra superior antes de conectar; será usado um conjunto de dados simulados de 6 servos, permitindo navegar por toda a interface.

> Os dados no modo de demonstração são simulados e **não operam o hardware real**.

## 4. Três páginas de funções

### 🦾 Calibração de servos

Exibe em tempo real a posição, tensão, temperatura e estado de torque de cada servo; oferece operações de “Calibração de ponto médio”, “Teste de ponto médio”, “Desabilitar motor” e “Limpar limites” para servos individuais, além da entrada para a calibração do braço completo.

### 🎚️ Controle de servo individual

Cada servo ocupa uma linha: **ID / Pos / controle deslizante / L (destino)**.

- **Pos e o controle deslizante são vinculados nos dois sentidos**: ao arrastar o controle deslizante, o Pos acompanha e o comando é enviado ao soltar; ao digitar um valor em Pos, o comando é enviado imediatamente.


### 🔬 Depurador FT

Conexão serial, varredura de servos, leitura de todos os registradores, leitura/gravação de registradores individuais, controle de posição, alteração da taxa de baud, restauração de fábrica e backup/restauração de parâmetros xdat.

## 5. Fluxo completo de calibração (recomendado)

1. Na página “Calibração de servos”, clique em “**Calibração de ponto médio do braço líder**” para abrir o assistente.
1. Clique em “**Iniciar registro do ponto médio**” (o botão fica laranja) → posicione o braço robótico no ponto médio padrão → clique em “**Concluir registro do ponto médio**”.
1. Clique em “**Registrar faixa de movimento**” (o botão fica verde) → gire cada articulação do início ao fim (**a garra também precisa girar**) → clique novamente para parar.
1. Após concluir as 6 articulações, o **arquivo de calibração é salvo automaticamente**; repita o processo para o braço seguidor.
1. Com os dois braços calibrados, clique em “**🎮 Controle remoto**” na barra superior para usar o braço líder para mover o braço seguidor.


## 6. Onde ficam os arquivos de calibração

O navegador só consegue baixar arquivos para o diretório “Downloads”. Após salvar, o assistente exibe o caminho de destino; **mova o arquivo manualmente para lá**:

| Parte | Caminho de destino |
|---|---|
| Braço líder | `~/.cache/huggingface/lerobot/calibration/teleoperators/so_leader/my_leader_arm.json` |
| Braço seguidor | `~/.cache/huggingface/lerobot/calibration/robots/so_follower/my_follower_arm.json` |

No Windows, `~` corresponde a `%USERPROFILE%`, e o caminho completo tem o formato `%USERPROFILE%.cache\huggingface\lerobot\calibration...`.

## 7. Controle remoto

Com os dois braços calibrados e conectados, clique em “**🎮 Controle remoto**” na barra superior para usar o ângulo do braço líder para acionar o braço seguidor. Clique novamente em “⏹ Parar controle remoto” para encerrar.

> Antes do controle remoto, confirme que a área ao redor dos dois braços é segura — **com o torque ativado, o servo não pode ser movido com as mãos**. O controle remoto exige duas portas seriais conectadas.

## 8. Detalhes do depurador FT

### Ler e gravar registradores

- Clique em “**Ler todos os parâmetros**” para ler todos os registradores do servo selecionado; os resultados são preenchidos na tabela de parâmetros.
- **Clicar em uma linha da tabela de parâmetros preenche o endereço e o comprimento acima; em seguida, digite o “Valor” e clique em “Gravar**”.
- As linhas cinzas (área DEFAULT) **não podem ser lidas nem gravadas**, evitando gravações acidentais em áreas somente leitura.


### Controle de posição

Após selecionar o servo, defina a posição de destino pelo controle deslizante ou pela caixa numérica e clique em “Mover” para executar. Se o torque não estiver ativado, será perguntado se deseja ativá-lo.

### Alterar a taxa de baud

Após selecionar a nova taxa de baud, clique em “Aplicar”; depois da gravação, a conexão é encerrada e uma tentativa de reconexão é feita com a nova taxa de baud; em caso de falha, o motivo é mostrado no log.

### Restauração de fábrica

Restaura o ID para 1 e a taxa de baud para 1M, **sem possibilidade de desfazer**; é necessário confirmar duas vezes antes de executar.

### Backup e restauração de parâmetros xdat

| Botão | Função |
|---|---|
| 💾 Salvar servo atual como xdat | Lê todos os parâmetros e baixa um arquivo `.xdat` |
| 📂 Abrir xdat | Carrega um arquivo `.xdat` local |
| 📤 Restaurar parâmetros no servo | Grava os parâmetros xdat de volta na EEPROM do servo atual |

> A restauração sobrescreve configurações como ID, taxa de baud e limites; antes de executar, confirme que o servo selecionado está correto. A EEPROM tem vida útil de gravação limitada; não grave com frequência.

## 9. Precauções

1. **A página precisa permanecer em primeiro plano**: o navegador limita abas em segundo plano, e o controle remoto e a atualização em tempo real podem ficar lentos ou até parar.
1. **O curso da mesma articulação nos dois braços deve ser varrido de forma consistente**, caso contrário a amplitude dos movimentos não corresponderá durante o controle remoto.
1. **A garra não é uma articulação de rotação contínua, mas também precisa ter o curso varrido**; caso contrário, a faixa ficará no padrão de 0–4095.
1. No depurador FT, **as linhas cinzas (área DEFAULT) não podem ser lidas nem gravadas**; a EEPROM tem vida útil de gravação limitada, não grave com frequência.
1. **Antes do controle remoto, confirme que a área ao redor dos dois braços é segura**; com o torque ativado, o servo não pode ser movido com as mãos.
1. Somente um programa pode ocupar a porta serial por vez — ao usar esta página, feche a versão desktop ou outros aplicativos de host.


## 10. Perguntas frequentes

**P1: Não consigo conectar / nenhum servo encontrado na varredura.**
Verifique primeiro se a taxa de baud de conexão corresponde à do servo e depois confirme que a porta serial não está ocupada por outro programa.

**P2: O Pos não atualiza.**
Confirme que o servo está online; clique novamente em “Conectar porta serial” ou atualize a página.

**P3: Falha na gravação.**
Verifique o motivo específico no log; confirme que o endereço e o comprimento vêm de uma linha da tabela de parâmetros.

**P4: A mensagem indica que o navegador atual não suporta Web Serial.**
Use Chrome / Edge 89+ e abra via HTTPS ou localhost.

**P5: O LeRobot não encontra o arquivo de calibração após salvá-lo.**
O navegador só baixa para o diretório “Downloads”; é preciso mover o arquivo manualmente para os caminhos listados na seção 6.
