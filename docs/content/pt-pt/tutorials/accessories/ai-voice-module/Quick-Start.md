---
title: "Iniciação rápida"
description: "O firmware da função de reconhecimento de voz já vem gravado de fábrica, pelo que o utilizador pode experimen…"
---

# Iniciação rápida

O firmware da função de reconhecimento de voz já vem gravado de fábrica, pelo que o utilizador pode experimentá-lo rapidamente sem gravar nada; se precisar de adicionar outras entradas de reconhecimento, se precisar de regravar outro firmware ou personalizar entradas, pode consultar o tutorial «3. Criação de entradas de protocolo personalizadas» para saber como personalizar entradas.

## 1. Preparação antes da utilização

1. um cabo de dados type-c  

2. módulo de interação por voz

## 2. Ligação do dispositivo

![Imagem 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Quick-Start/1.png)

## 3. Implementação do reconhecimento de voz e da reprodução

Depois de alimentar o módulo de interação por voz através de type-c, pode ativar o módulo com a palavra de ativação “你好，小犀”; um módulo ativado com êxito responde “我在”, o que indica que se encontra atualmente num estado em que é possível reconhecer voz. Se, no prazo de 15 segundos, não for reconhecida nenhuma entrada de comando, o módulo entra em modo de suspensão e reproduz ao mesmo tempo “我去休息了”. Se quiser voltar a ativar o módulo, basta dizer novamente a palavra de ativação.

O firmware de fábrica inclui palavras de comando e palavras de reprodução; a lista de protocolos pode ser consultada nos anexos fornecidos. A figura abaixo mostra um excerto do conteúdo da lista de protocolos de palavras de comando / palavras de reprodução; pode verificar, através do tipo de função, o que representa a palavra de comando correspondente. As palavras de reprodução que precisam de ser reproduzidas são palavras de reprodução passiva, que só podem ser acionadas enviando o comando correspondente ao módulo de interação por voz a partir da porta série de um computador ou de outro microcontrolador ou dispositivo controlador anfitrião; para mais detalhes, consulte a figura abaixo.

Palavras de função:

Palavras de comando:

Palavras de reprodução:

Existem dois modos de reprodução: um ativo e outro de reprodução passiva

Reprodução ativa: depois de dizermos uma palavra de comando de acordo com a tabela, o módulo reproduz ativamente a frase correspondente. Depois de o ativar, quando dizemos “小车前进”, o módulo, após o reconhecer, reproduz ativamente “好的，正在前进” 

Reprodução passiva: a frase correspondente só é reproduzida pelo módulo depois de o comando da tabela de protocolos lhe ser enviado através da porta série; também é possível, de acordo com o protocolo IIC, escrever os dados de reprodução correspondentes no registo de reprodução passiva. Para mais detalhes, consulte «Comunicação com vários controladores».

<RelatedProducts slugs="ai-voice-module" />
