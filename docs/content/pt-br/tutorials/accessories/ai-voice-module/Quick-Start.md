---
title: "Início rápido"
description: "O firmware com a função de reconhecimento de fala já vem gravado de fábrica, portanto o usuário pode experime…"
---

# Início rápido

O firmware com a função de reconhecimento de fala já vem gravado de fábrica, portanto o usuário pode experimentá-lo rapidamente sem precisar gravá-lo. Se for necessário adicionar outras entradas de reconhecimento, ou se for preciso regravar outro firmware, para personalizar entradas, consulte o tutorial《3.Criação de entradas de protocolo personalizadas》para saber como personalizar entradas.

## 1.Preparação antes do uso

1. Um cabo de dados type-c  

2. Módulo de interação por voz

## 2.Conexão do dispositivo

![Imagem 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Quick-Start/1.png)

## 3.Implementação do reconhecimento de fala e da reprodução

Depois de alimentar o módulo de interação por voz pela porta type-c, é possível ativá-lo com a palavra de ativação “你好，小犀”; ao ser ativado com sucesso, o módulo responde “我在”, indicando que ele está no estado em que pode reconhecer fala. Se nenhuma entrada de comando for reconhecida em 15 segundos, o módulo entra no modo de suspensão e ao mesmo tempo reproduz “我去休息了”. Se quiser ativar o módulo novamente, basta dizer a palavra de ativação outra vez.

O firmware de fábrica já vem com palavras de comando e frases de reprodução, e a lista de protocolo pode ser consultada nos anexos de materiais fornecidos. A figura abaixo mostra parte do conteúdo da lista de protocolo de palavras de comando e frases de reprodução. É possível verificar, pelo tipo de função, qual função a palavra de comando correspondente representa. As frases de reprodução que precisam ser reproduzidas são frases de reprodução passiva e só podem ser acionadas enviando o comando correspondente ao módulo de interação por voz pela porta serial de um computador ou por outro microcontrolador ou dispositivo host; veja a figura abaixo para mais detalhes.

Palavras de função:

Palavras de comando:

Frases de reprodução:

Existem dois modos de reprodução: um ativo e um passivo

Reprodução ativa: depois que dizemos a palavra de comando conforme a tabela, o módulo reproduz ativamente a frase correspondente. Após a ativação, dizemos “小车前进” e, depois de reconhecer, o módulo reproduz ativamente “好的，正在前进” 

Reprodução passiva: é preciso enviar o comando da tabela de protocolo pela porta serial ao módulo de voz para que o módulo reproduza a frase correspondente; também é possível, conforme o protocolo IIC, gravar os dados de reprodução correspondentes no registrador de reprodução passiva. Para mais detalhes, consulte《Comunicação multi-host》



