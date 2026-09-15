---
title: "Criação de entradas de protocolo personalizadas"
description: "Crie entradas personalizadas no módulo de interação por voz IA: geração do firmware do chip de voz e adição de novas palavras de comando e frases."
---

# Criação de entradas de protocolo personalizadas

## 1. Criação do firmware do chip de voz

## 1.1 Precauções

O módulo já vem de fábrica com o firmware da função de reconhecimento de voz gravado, e o firmware de fábrica também é fornecido no pacote de recursos. Se precisar de criar novamente o firmware, pode seguir os passos abaixo para o criar.

## 1.2 Criação do firmware

Primeiro, tem de abrir a ligação «[Plataforma de IA de Voz Chipintelli](https://aiplatform.chipintelli.com/)» para entrar no site oficial de criação de firmware.  Clique em “Desenvolvimento de funções” na barra de menus e, em seguida, clique em “Aplicação de modelo grande de reconhecimento de voz offline” na coluna de desenvolvimento de produtos.

![Imagem 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/1.png)

Neste momento, será solicitado o início de sessão. Aqui é necessário registar uma conta na plataforma com os seus próprios dados; a conta deste tutorial já foi registada antecipadamente. Depois de iniciar sessão, clique novamente em “Desenvolvimento de firmware e SDK de reconhecimento de voz”.

![Imagem 2](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/2.png)

Depois de a página mudar, clique em Novo projeto do lado esquerdo e crie um produto conforme a figura abaixo. O nome e a descrição do produto podem ser personalizados; as restantes informações têm de ser selecionadas de acordo com o conteúdo da caixa vermelha, e o tipo de produto tem de ser selecionado como “Geral->Controlo central inteligente”. Quando terminar, clique em Criar.

![Imagem 3](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/3.png)

A seguir, é necessário preencher as informações básicas do projeto. Precisamos de reconhecer chinês, por isso o tipo de idioma é selecionado como “Chinês”; se precisar de reconhecer inglês, também pode fazer as alterações correspondentes. Para as restantes informações, basta selecionar conforme a figura abaixo e, quando terminar, clicar em Continuar.

![Imagem 4](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/4.png)

Em seguida, é necessário configurar o firmware; aqui explicamos apenas as partes que precisam de ser modificadas. Ative o cancelamento de eco nos parâmetros do algoritmo.

![Imagem 5](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/5.png)

Nos parâmetros de hardware, é necessário selecionar a fonte do oscilador de cristal como “RC interno”.

![Imagem 6](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/6.png)

Na configuração da porta série de impressão, configure o nível do UART0 como dreno aberto, com suporte para pull-up externo de 5V.

![Imagem 7](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/7.png)

Modifique a configuração da porta série de comunicação, defina o débito em bauds como 115200 e configure o nível do UART1 como dreno aberto, com suporte para pull-up externo de 5V. Depois de concluir a configuração, clique em “Continuar” para avançar para o passo seguinte.

![Imagem 8](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/8.png)

A seguir, entramos na função de edição de palavras de comando. Primeiro, é necessário selecionar o timbre a reproduzir; aqui selecionamos “小蝶-清新女声 Ver.3”.

![Imagem 9](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/9.png)

A seguir, carregamos o anexo das palavras de comando. Localize a folha de cálculo “命令词播报词协议列表V1_中文” na mesma pasta que este documento e arraste-a diretamente para a página Web para a carregar.

![Imagem 10](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/10.png)

Depois de carregar o ficheiro, pode ver os dados das nossas palavras de comando na tabela abaixo.

![Imagem 11](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/11.png)

Ative a função de autoaprendizagem e selecione a aprendizagem especificada; neste momento, o sistema gera automaticamente 4 comandos de autoaprendizagem, que aqui não modificamos.

![Imagem 12](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/12.png)

Depois de submeter, aguarde alguns minutos para a criação do firmware ficar concluída; quando terminar, clique em Transferir firmware para obter o firmware criado.

![Imagem 13](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/13.png)

Para os passos de gravação do firmware, consulte «[Gravação do firmware do módulo](https://juxitech.feishu.cn/wiki/FfE8wbL1wipUWgkUKW6cbsw2nOe)».

## 2. Modificar entradas funcionais

Abra o ficheiro lista de protocolos de palavras de comando / palavras de reprodução V1_中文 nos anexos.

![Imagem 14](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/14.png)

Localize as entradas funcionais na tabela, ou seja, os primeiros 10 itens. Note que estas primeiras 10 entradas funcionais são entradas fixas; não podem ser adicionadas, apenas modificadas.

![Imagem 15](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/15.png)

Aqui tomamos como exemplo a modificação da frase de reprodução da palavra de ativação: alterar a reprodução após o reconhecimento de “你好，小犀” de “在的” para “我在”.

![Imagem 16](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/16.png)

Depois de terminar as modificações, guarde e siga os passos de “1.2 Criação do firmware” para importar a tabela para o site. Se já criou um firmware uma vez, pode clicar no botão “Herdar” do projeto anterior, o que permite dispensar os passos de configuração de parâmetros.

![Imagem 17](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/17.png)

Depois de criar novamente o firmware, ainda é necessário gravá-lo no módulo de interação por voz; assim, é possível modificar entradas funcionais.

## 3. Adicionar novas entradas de palavras de comando

Abra o ficheiro lista de protocolos de palavras de comando / palavras de reprodução V1_中文 nos anexos.

![Imagem 18](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/18.png)

Na parte inferior da tabela, adicione uma nova entrada de palavra de comando; aqui tomamos como exemplo a adição de uma palavra de comando “打扫房间”.

![Imagem 19](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/19.png)

Aqui é necessário selecionar “命令词” como tipo de função e definir o modo de reprodução como “主”, para que, após reconhecer “打扫房间”, seja reproduzido ativamente “好的”.

![Imagem 20](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/20.png)

A seguir, vamos compreender o protocolo de envio. A 1.ª e a 2.ª posições dos dados são o cabeçalho da trama de dados e não precisam de ser modificadas. Quando selecionamos o tipo de função como palavra de comando, então, de acordo com o protocolo de envio, a 3.ª posição dos dados tem de ser “00”; isto serve para distinguir se a instrução é uma “命令词” ou uma “播报语”.

![Imagem 21](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/21.png)

A 4.ª posição dos dados é o ID de dados da palavra de comando; trata-se de um dado hexadecimal e, como o ID da palavra de comando anterior é “8B”, temos de definir esta posição como “8C”. Em casos especiais, os IDs de dados também podem ser iguais, por exemplo quando os resultados devolvidos das duas palavras de comando abaixo são idênticos.

![Imagem 22](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/22.png)

A 5.ª posição do protocolo é fixa em “EE” e, do mesmo modo, também não precisa de ser modificada. Na tabela, é necessário que o protocolo de envio e o protocolo de receção sejam consistentes.

![Imagem 23](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/23.png)

Depois de terminar as modificações, guarde e siga os passos de “1.2 Criação do firmware” para importar a tabela para o site. Se já criou um firmware uma vez, pode clicar no botão “Herdar” do projeto anterior, o que permite dispensar os passos de configuração de parâmetros

![Imagem 24](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/24.png)

Depois de criar novamente o firmware, ainda é necessário gravá-lo no módulo de interação por voz; assim, é possível adicionar novas entradas de palavras de comando.

## 4. Adicionar uma nova frase de reprodução

Abra o ficheiro lista de protocolos de palavras de comando / palavras de reprodução V1_中文 nos anexos.

![Imagem 25](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/25.png)

Na parte inferior da tabela, adicione uma nova entrada de palavra de comando; aqui tomamos como exemplo a adição de uma frase de reprodução “现在是晚上”.

![Imagem 26](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/26.png)

Aqui é necessário selecionar “播报语” como tipo de função e definir o modo de reprodução como “被”.

![Imagem 27](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/27.png)

A seguir, vamos compreender o protocolo de envio. A 1.ª e a 2.ª posições dos dados são o cabeçalho da trama de dados e não precisam de ser modificadas. Quando selecionamos o tipo de função como frase de reprodução, então, de acordo com o protocolo de envio, a 3.ª posição dos dados tem de ser “FF”; isto serve para distinguir que a instrução é uma “播报语”.

![Imagem 28](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/28.png)

A 4.ª posição dos dados é o ID de dados da palavra de comando; trata-se de um dado hexadecimal e, como o ID da frase de reprodução anterior é “8B”, temos de definir esta posição como “8C”.

A 5.ª posição do protocolo é fixa em “EE” e, do mesmo modo, também não precisa de ser modificada. Na tabela, é necessário que o protocolo de envio e o protocolo de receção sejam consistentes.

![Imagem 29](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/29.png)

Depois de terminar as modificações, guarde e siga os passos de “1.2 Criação do firmware” para importar a tabela para o site. Se já criou um firmware uma vez, pode clicar no botão “Herdar” do projeto anterior, o que permite dispensar os passos de configuração de parâmetros.

![Imagem 30](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/30.png)

Depois de criar novamente o firmware, ainda é necessário gravá-lo no módulo de interação por voz; assim, é possível adicionar novas entradas de palavras de comando.

<RelatedProducts slugs="ai-voice-module" />
