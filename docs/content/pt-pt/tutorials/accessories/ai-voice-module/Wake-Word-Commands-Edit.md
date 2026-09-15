---
title: "Modificar a palavra de ativação e as palavras de comando"
description: "Modifique a palavra de ativação e as palavras de comando do módulo de interação por voz IA: ligação do dispositivo e cuidados na gravação."
---

# Modificar a palavra de ativação e as palavras de comando

## 1. Precauções

Modifique a palavra de ativação num ambiente silencioso; um ambiente ruidoso afetará a precisão de reconhecimento do módulo de interação por voz.

Ao dizer uma entrada, a voz deve ser forte e o ritmo de fala não deve ser demasiado rápido; recomenda-se uma distância não superior a 5 metros do módulo.

## 2. Ligação do dispositivo

![Imagem 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Wake-Word-Commands-Edit/1.png)

## 3. Modificar a palavra de ativação

Diga “你好，小犀” ao módulo de interação por voz para o ativar; quando o módulo responder “我在”, isso indica que se encontra atualmente num estado em que é possível reconhecer.  Diga então a entrada “学习唤醒词” ao módulo de interação por voz; quando o módulo de interação por voz responder “说出唤醒词”, passa a estar no estado de aprendizagem da palavra de ativação.  Em seguida, diga ao módulo de interação por voz a palavra de ativação que pretende definir — a palavra de ativação deve ser o mais curta possível; aqui tomamos como exemplo a definição de “你好，小犀”.  Quando o módulo de interação por voz a reconhecer com êxito, reproduz “学习成功”, o que indica que a palavra de ativação foi modificada com êxito; nessa altura podemos usar a entrada “你好小犀” para ativar o módulo.

Nota: a palavra de ativação “你好，小犀” do firmware de fábrica é a palavra de ativação básica e não pode ser modificada nem eliminada por voz. A palavra de ativação modificada pelo utilizador por voz só pode existir uma ao mesmo tempo, coexistindo com a palavra de ativação básica.

## 4. Modificar as palavras de comando

O firmware de fábrica do módulo de interação por voz inclui 8 palavras de comando predefinidas que podem ser modificadas por voz, conforme apresentado abaixo:

Um exemplo de utilização é o seguinte:

Diga "你好，小犀" ao módulo de interação por voz para o ativar; quando o módulo responder “我在”, isso indica que se encontra atualmente num estado em que é possível reconhecer.  Diga então a entrada “学习停车指令” ao módulo de interação por voz; quando o módulo de interação por voz responder “请说指令”, passa a estar no estado de aprendizagem de palavras de comando.  Em seguida, diga ao módulo de interação por voz a palavra de comando que pretende definir — a palavra de comando deve ser o mais curta possível; aqui tomamos como exemplo a definição de “前方停车”.  Depois de o módulo de interação por voz a reconhecer com êxito, reproduz “学习成功”, o que indica que a palavra de comando foi modificada com êxito; nessa altura podemos usar a entrada “前方停车” para obter o mesmo efeito que a palavra de comando “停车”.  Se precisar de eliminar a entrada ”前方停车“, basta dizer ”删除停车指令“; quando responder ”删除成功”, a eliminação da entrada fica concluída (aqui só será eliminado “前方停车”, não será eliminado ”停车“).

Nota: as palavras de comando do firmware de fábrica são palavras de comando básicas e não podem ser modificadas nem eliminadas por voz. A palavra de comando modificada pelo utilizador por voz só pode existir uma ao mesmo tempo e coexiste com as palavras de comando básicas.

<RelatedProducts slugs="ai-voice-module" />
