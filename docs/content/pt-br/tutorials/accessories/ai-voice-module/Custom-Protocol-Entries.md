---
title: "Criação de entradas de protocolo personalizadas"
description: "O módulo já sai de fábrica com o firmware de reconhecimento de fala gravado, e o firmware de fábrica também é…"
---

# Criação de entradas de protocolo personalizadas

## 1.Criação do firmware do chip de voz

## 1.1 Avisos

O módulo já sai de fábrica com o firmware de reconhecimento de fala gravado, e o firmware de fábrica também é fornecido no pacote de materiais. Se for necessário refazer o firmware, siga os passos abaixo para criar o firmware.

## 1.2 Criação do firmware

Primeiro, abra o link "[Plataforma de IA de Voz Chipintelli](https://aiplatform.chipintelli.com/)" para entrar no site de criação de firmware.  Clique em "Desenvolvimento de funções" na barra de menus e, em seguida, clique em "Aplicação de modelo grande de reconhecimento de fala offline" na coluna de desenvolvimento de produtos.

![Imagem 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/1.png)

Nesse momento, será solicitado o login. Aqui é preciso registrar uma conta na plataforma com suas próprias informações; a conta deste tutorial já foi registrada de antemão. Após fazer login, clique novamente em "Desenvolvimento de firmware e SDK de reconhecimento de fala".

![Imagem 2](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/2.png)

Após a página mudar, clique em Novo projeto à esquerda e crie um produto conforme a figura abaixo. O nome e a descrição do produto podem ser personalizados; as demais informações devem ser selecionadas conforme o conteúdo da caixa vermelha, e o tipo de produto deve ser selecionado como "Geral->Controle central inteligente". Ao terminar, clique em Criar.

![Imagem 3](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/3.png)

Em seguida, é preciso preencher as informações básicas do projeto. Precisamos reconhecer chinês, por isso o tipo de idioma deve ser selecionado como "Chinês"; se for necessário reconhecer inglês, também é possível fazer a modificação correspondente. As demais informações podem ser selecionadas conforme a figura abaixo; ao terminar, clique em Continuar.

![Imagem 4](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/4.png)

Depois, é preciso configurar o firmware; aqui explicamos apenas as partes que precisam ser modificadas. Ative o cancelamento de eco nos parâmetros do algoritmo.

![Imagem 5](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/5.png)

Nos parâmetros de hardware, é preciso selecionar a fonte do oscilador de cristal como "RC interno".

![Imagem 6](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/6.png)

Na configuração da porta serial de impressão, defina o nível do UART0 como dreno aberto, com suporte a pull-up externo de 5V.

![Imagem 7](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/7.png)

Modifique a configuração da porta serial de comunicação: defina a taxa de transmissão como 115200 e configure o nível do UART1 como dreno aberto, com suporte a pull-up externo de 5V. Após concluir a configuração, clique em "Continuar" para ir ao próximo passo.

![Imagem 8](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/8.png)

A seguir, entramos na função de edição de palavras de comando. Primeiro, é preciso selecionar o timbre de reprodução; aqui selecionamos "小蝶-清新女声 Ver.3".

![Imagem 9](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/9.png)

Em seguida, enviamos o anexo de palavras de comando. Localize a planilha "命令词播报词协议列表V1_中文" no mesmo caminho deste documento e arraste-a diretamente para a página web para fazer o upload.

![Imagem 10](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/10.png)

Após enviar o arquivo, você poderá ver os dados das palavras de comando na tabela abaixo.

![Imagem 11](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/11.png)

Ative a função de autoaprendizagem e selecione aprendizagem especificada; nesse momento, o sistema gera automaticamente 4 comandos de autoaprendizagem, que não modificamos aqui.

![Imagem 12](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/12.png)

Após enviar, aguarde alguns minutos para concluir a criação do firmware; quando terminar, clique em Baixar firmware para obter o firmware criado.

![Imagem 13](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/13.png)

Para os passos de gravação do firmware, consulte《[Gravação do firmware do módulo](https://juxitech.feishu.cn/wiki/FfE8wbL1wipUWgkUKW6cbsw2nOe)》。

## 2.Modificar entradas funcionais

Abra o arquivo 命令词播报词协议列表V1_中文 nos anexos.

![Imagem 14](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/14.png)

Localize as entradas funcionais na tabela, ou seja, os 10 primeiros itens. Observe que esses 10 primeiros itens funcionais são entradas fixas e não podem ser adicionados, apenas modificados.

![Imagem 15](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/15.png)

Aqui usamos como exemplo a modificação da frase de reprodução da palavra de ativação: alteramos a reprodução, após reconhecer "你好，小犀", de "在的" para "我在".

![Imagem 16](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/16.png)

Após terminar as modificações, salve. Em seguida, siga os passos de "1.2 Criação do firmware" para importar a tabela no site. Se você já criou um firmware uma vez, pode clicar no botão "Herdar" do projeto anterior, o que dispensa as etapas de configuração de parâmetros.

![Imagem 17](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/17.png)

Depois de refazer o firmware, também é preciso gravá-lo no módulo de interação por voz; assim é possível modificar as entradas funcionais.

## 3.Adicionar novas entradas de comando

Abra o arquivo 命令词播报词协议列表V1_中文 nos anexos.

![Imagem 18](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/18.png)

Na parte inferior da tabela, adicione uma nova entrada de comando; aqui usamos como exemplo a adição de uma palavra de comando "打扫房间".

![Imagem 19](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/19.png)

Aqui é preciso selecionar "命令词" como tipo de função e definir o modo de reprodução como "主", para que, após reconhecer "打扫房间", ele reproduza ativamente "好的".

![Imagem 20](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/20.png)

A seguir, vamos entender o protocolo de envio. A 1ª e a 2ª posições dos dados são o cabeçalho do quadro de dados e não precisam ser modificadas. Quando selecionamos o tipo de função como palavra de comando, conforme o protocolo de envio, a 3ª posição de dados deve ser obrigatoriamente "00"; isso serve para distinguir se o comando é uma "命令词" ou uma "播报语".

![Imagem 21](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/21.png)

A 4ª posição de dados é o ID de dados da palavra de comando; trata-se de um dado hexadecimal. Como o ID da palavra de comando anterior é "8B", precisamos definir esta posição como "8C". Em casos especiais, os IDs de dados também podem ser iguais, por exemplo quando o resultado retornado pelas duas palavras de comando abaixo é idêntico.

![Imagem 22](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/22.png)

A 5ª posição do protocolo é fixa como "EE" e também não precisa ser modificada. Na tabela, é preciso manter o protocolo de envio e o protocolo de recebimento consistentes.

![Imagem 23](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/23.png)

Após terminar as modificações, salve. Em seguida, siga os passos de "1.2 Criação do firmware" para importar a tabela no site. Se você já criou um firmware uma vez, pode clicar no botão "Herdar" do projeto anterior, o que dispensa as etapas de configuração de parâmetros

![Imagem 24](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/24.png)

Depois de refazer o firmware, também é preciso gravá-lo no módulo de interação por voz; assim é possível implementar a função de adicionar novas entradas de comando.

## 4.Adicionar novas frases de reprodução

Abra o arquivo 命令词播报词协议列表V1_中文 nos anexos.

![Imagem 25](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/25.png)

Na parte inferior da tabela, adicione uma nova entrada de comando; aqui usamos como exemplo a adição de uma frase de reprodução "现在是晚上".

![Imagem 26](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/26.png)

Aqui é preciso selecionar "播报语" como tipo de função e definir o modo de reprodução como "被".

![Imagem 27](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/27.png)

A seguir, vamos entender o protocolo de envio. A 1ª e a 2ª posições dos dados são o cabeçalho do quadro de dados e não precisam ser modificadas. Quando selecionamos o tipo de função como frase de reprodução, conforme o protocolo de envio, a 3ª posição de dados deve ser obrigatoriamente "FF"; isso serve para distinguir que o comando é uma "播报语".

![Imagem 28](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/28.png)

A 4ª posição de dados é o ID de dados da palavra de comando; trata-se de um dado hexadecimal. Como o ID da frase de reprodução anterior é "8B", precisamos definir esta posição como "8C".

A 5ª posição do protocolo é fixa como "EE" e também não precisa ser modificada. Na tabela, é preciso manter o protocolo de envio e o protocolo de recebimento consistentes.

![Imagem 29](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/29.png)

Após terminar as modificações, salve. Em seguida, siga os passos de "1.2 Criação do firmware" para importar a tabela no site. Se você já criou um firmware uma vez, pode clicar no botão "Herdar" do projeto anterior, o que dispensa as etapas de configuração de parâmetros.

![Imagem 30](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/30.png)

Depois de refazer o firmware, também é preciso gravá-lo no módulo de interação por voz; assim é possível implementar a função de adicionar novas entradas de comando.



