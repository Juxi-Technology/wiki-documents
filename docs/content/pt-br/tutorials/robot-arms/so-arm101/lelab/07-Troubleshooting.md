---
title: "7 · Solução de problemas"
description: "Solução de problemas do LeLab por sintoma: conflitos de porta, problemas de USB e serial, falhas de calibração e gravação, e o que verificar em seguida."
---

# 7 · Solução de problemas

> **Anterior:** [06 Treinar e executar inferência](06-Train-and-Inference.md)

Agrupados por sintoma.

## A página não abre, ou uma porta está em uso

As portas **8000** e **8080** são do LeLab. Um processo antigo é a causa usual — um que você fechou fechando o terminal em vez de usar `Ctrl+C`.

```bash
lelab --stop
```

Libera as duas portas. Para verificar antes de iniciar:

```bash
curl http://localhost:8000/health
```

Uma resposta JSON significa que algo está rodando na 8000.

## No modo `--dev` a página fica em branco ou dá 404

O Vite serve a interface em **:8080**; a API roda em **:8000**. Navegue em `:8080`. A porta 8000 no `--dev` oferece uma API sem interface.

## Os braços não aparecem

Verifique se as portas estão visíveis para o seu usuário. No Linux, um grupo ausente faz parecer que o braço não está lá:

```bash
ls /dev/ttyACM*
groups | grep dialout
```

Se `dialout` estiver faltando:

```bash
sudo usermod -aG dialout $USER
```

Depois **saia da sessão e entre de novo** — o grupo é lido no login, então um novo terminal não basta.

### Só um braço é encontrado

Use **duas portas USB separadas**, não um hub; os dois braços se enumeram como o mesmo tipo de dispositivo e um hub compartilhado pode apresentá-los de forma instável. Para identificar uma porta, desconecte um braço e veja qual entrada da lista desaparece.

## Tenho que recalibrar toda vez

Os arquivos de calibração ficam em `~/.cache/huggingface/lerobot/` — ou seja, em `~/.cache/`. Ferramentas de limpeza de cache e reinícios de contêiner os removem.

- Faça backup de `~/.cache/huggingface/lerobot/calibration/` em algum lugar durável.
- Em um contêiner, monte esse diretório como um volume.

### Um braço calibrado se comporta de forma estranha sem pedir para ser recalibrado

Verifique se o **profile** selecionado pertence a esse braço físico. Os profiles são vinculados aos pontos zero de um braço; trocar os braços significa recalibrar.

## A imagem de uma câmera está de cabeça para baixo ou de lado

Defina a **Rotation** da câmera na [aba de calibração](03-Calibration.md): 0°, 90°, 180° ou 270° no sentido horário. Uma câmera de pulso de cabeça para baixo é 180°.

**90° e 270° trocam as dimensões de saída** — uma captura de 640 × 480 se torna 480 × 640.

## A policy treinada não faz nada de útil

Em ordem — as duas primeiras são muito mais comuns que um treinamento ruim:

1. **Rotação da câmera.** Confirme que a inferência usa a rotação usada no momento da gravação. 0° e 180° têm dimensões de imagem idênticas, então nada avisa.
2. **Associação da câmera.** Se a câmera chamada `wrist` durante a gravação agora é uma câmera física diferente, a policy vê a imagem errada.
3. **Posição inicial e descrição da tarefa.** A inferência deve começar a partir do arranjo do qual as demonstrações partiram.
4. **Checkpoints.** Experimente um mais antigo.

## Usando um celular como câmera

Os navegadores só concedem acesso à câmera (`getUserMedia`) por **HTTPS**, exceto em `localhost`, então um celular conectado pela LAN é recusado.

Guia de configuração: [`frontend/HTTPS_SETUP.md`](https://github.com/Juxi-Technology/leLab/blob/main/frontend/HTTPS_SETUP.md). Os certificados são autoassinados, então o navegador mostra um aviso a aceitar.

A instalação padrão **não** inicia com HTTPS; câmeras de celular precisam da inicialização manual com as flags de certificado descritas lá.

## Um dataset não pode ser aberto — "not downloaded yet"

O LeRobot escreve o índice do dataset quando uma gravação **termina corretamente**. Uma sessão encerrada no meio de um episódio pode deixar um diretório que parece completo, mas não está. Os dados do episódio geralmente ainda estão no disco; o que falta é o índice. Regrave a sessão e pare-a com o botão de parar.

## O treinamento diz que falta um pacote

Alguns tipos de policy e recursos opcionais de treinamento precisam de dependências que não são instaladas por padrão. A aba Training oferece instalá-las quando você seleciona um deles; espere a instalação em segundo plano terminar antes de iniciar o job. O log de treinamento nomeia o pacote, caso você prefira instalá-lo manualmente.

## Nenhuma notificação de atualização aparece

Por projeto: a verificação só se aplica a instalações feitas a partir do git. Uma **editable install** (`pip install -e .`) é uma cópia de trabalho e não é verificada. Atualize-as com `git pull`.

## Ainda travado

Reúna o **console do navegador** e o **terminal que executa o `lelab`** — o servidor registra a requisição que falhou. A maioria dessas falhas está a um passo da última coisa que você alterou.

---

> **Voltar ao início:** [01 Visão geral](01-Overview.md) · [Índice do tutorial](https://github.com/Juxi-Technology/leLab/blob/main/README.md)

<RelatedProducts slugs="so-arm101" />
