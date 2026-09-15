---
title: "Modificar a palavra de ativação e as palavras de comando"
description: "Faça a modificação da palavra de ativação em um ambiente silencioso; ambientes barulhentos afetam a precisão …"
---

# Modificar a palavra de ativação e as palavras de comando

## 1.Avisos

Faça a modificação da palavra de ativação em um ambiente silencioso; ambientes barulhentos afetam a precisão de reconhecimento do módulo de interação por voz.

Ao falar uma entrada, a voz deve ser alta e a velocidade da fala não deve ser rápida demais; recomenda-se manter-se a menos de 5 metros do módulo.

## 2.Conexão do dispositivo

![Imagem 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Wake-Word-Commands-Edit/1.png)

## 3.Modificar a palavra de ativação

Diga “你好，小犀” ao módulo de interação por voz para ativá-lo; quando o módulo responder “我在”, isso indica que ele está no estado reconhecível.  Em seguida, diga a entrada “学习唤醒词” ao módulo de interação por voz; o módulo de interação por voz responde “说出唤醒词” e você entra no estado da função de aprendizagem da palavra de ativação.  Depois, diga ao módulo de interação por voz a palavra de ativação que deseja definir; a palavra de ativação deve ser o mais curta possível — aqui usamos a definição de “你好，小犀” como exemplo.  Quando o módulo de interação por voz reconhecer com sucesso, ele reproduz “学习成功”, indicando que a palavra de ativação foi modificada com sucesso; nesse momento, já podemos usar a entrada “你好小犀” para ativar o módulo.

Aviso: a palavra de ativação “你好，小犀” do firmware de fábrica é a palavra de ativação básica e não pode ser modificada nem excluída por voz. A palavra de ativação modificada pelo usuário por voz só pode existir uma por vez, coexistindo com a palavra de ativação básica.

## 4.Modificar as palavras de comando

O firmware de fábrica do módulo de interação por voz vem com 8 palavras de comando que podem ser modificadas por voz, conforme mostrado abaixo:

Veja um exemplo de uso abaixo:

Diga "你好，小犀" ao módulo de interação por voz para ativá-lo; quando o módulo responder “我在”, isso indica que ele está no estado reconhecível.  Em seguida, diga a entrada “学习停车指令” ao módulo de interação por voz; o módulo de interação por voz responde “请说指令” e você entra no estado da função de aprendizagem de palavras de comando.  Depois, diga ao módulo de interação por voz a palavra de comando que deseja definir; a palavra de comando deve ser o mais curta possível — aqui usamos a definição de “前方停车” como exemplo.  Depois que o módulo de interação por voz reconhecer com sucesso, ele reproduz “学习成功”, indicando que a palavra de comando foi modificada com sucesso; nesse momento, podemos usar a entrada “前方停车” para obter o mesmo efeito da palavra de comando “停车”.  Se for necessário excluir a entrada ”前方停车“, basta dizer ”删除停车指令“; quando o módulo responder ”删除成功“, a exclusão da entrada estará concluída (aqui apenas “前方停车” é excluída, e não ”停车“).

Aviso: as palavras de comando do firmware de fábrica são palavras de comando básicas e não podem ser modificadas nem excluídas por voz; a palavra de comando modificada pelo usuário por voz só pode existir uma por vez e coexiste com as palavras de comando básicas.

<RelatedProducts slugs="ai-voice-module" />
