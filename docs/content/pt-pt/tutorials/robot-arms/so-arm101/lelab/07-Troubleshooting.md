---
title: "7 · Resolução de problemas"
description: "Resolução de problemas do LeLab por sintoma: conflitos de porta, problemas de USB e série, falhas de calibração e gravação, e o que verificar a seguir."
---

# 7 · Resolução de problemas

> **Anterior:** [06 Treinar e executar inferência](06-Train-and-Inference.md)

Agrupado por sintoma.

## A página não abre, ou uma porta está em uso

As portas **8000** e **8080** são do LeLab. Um processo antigo é a causa habitual — um que fechou ao fechar o terminal em vez de usar `Ctrl+C`.

```bash
lelab --stop
```

Liberta ambas as portas. Para verificar antes de iniciar:

```bash
curl http://localhost:8000/health
```

Uma resposta JSON significa que algo está a correr na 8000.

## No modo `--dev`, a página está em branco ou dá 404

O Vite serve a interface em **:8080**; a API corre em **:8000**. Aceda a `:8080`. A porta 8000 em `--dev` dá-lhe uma API sem interface.

## Os braços não aparecem

Verifique se as portas são visíveis para o seu utilizador. No Linux, um grupo em falta faz parecer que o braço não está lá:

```bash
ls /dev/ttyACM*
groups | grep dialout
```

Se faltar o `dialout`:

```bash
sudo usermod -aG dialout $USER
```

Depois **termine a sessão e volte a iniciá-la** — o grupo é lido no início de sessão, por isso um novo terminal não chega.

### Só é encontrado um braço

Use **duas portas USB separadas**, não um hub; ambos os braços enumeram como o mesmo tipo de dispositivo e um hub partilhado pode apresentá-los de forma pouco fiável. Para identificar uma porta, desligue um braço e veja qual a entrada da lista que desaparece.

## Tenho de recalibrar todas as vezes

Os ficheiros de calibração ficam em `~/.cache/huggingface/lerobot/` — ou seja, em `~/.cache/`. As ferramentas de limpeza de cache e os reinícios de contentores eliminam-nos.

- Faça uma cópia de segurança de `~/.cache/huggingface/lerobot/calibration/` num local duradouro.
- Num contentor, monte esse diretório como um volume.

### Um braço calibrado comporta-se de forma estranha sem pedir para ser recalibrado

Verifique se o **perfil** selecionado pertence a esse braço físico. Os perfis estão associados aos pontos zero de um braço; trocar os braços obriga a recalibrar.

## A imagem de uma câmara está ao contrário ou de lado

Defina a **Rotation** da câmara no [separador de Calibração](03-Calibration.md): 0°, 90°, 180° ou 270° no sentido dos ponteiros do relógio. Uma câmara de punho ao contrário é 180°.

**90° e 270° trocam as dimensões de saída** — uma captura de 640 × 480 passa a 480 × 640.

## A política treinada não faz nada de útil

Por ordem — os dois primeiros são muito mais comuns do que um mau treino:

1. **Rotação da câmara.** Confirme que a inferência usa a rotação usada no momento da gravação. 0° e 180° têm dimensões de imagem idênticas, por isso nada o avisa.
2. **Associação das câmaras.** Se a câmara chamada `wrist` durante a gravação for agora uma câmara física diferente, a política vê a imagem errada.
3. **Posição inicial e descrição da tarefa.** A inferência tem de começar a partir da disposição com que as demonstrações começaram.
4. **Checkpoints.** Experimente um anterior.

## Utilizar um telemóvel como câmara

Os navegadores só concedem acesso à câmara (`getUserMedia`) através de **HTTPS**, exceto em `localhost`, por isso um telemóvel que se ligue pela LAN é recusado.

Guia de configuração: [`frontend/HTTPS_SETUP.md`](https://github.com/Juxi-Technology/leLab/blob/main/frontend/HTTPS_SETUP.md). Os certificados são autoassinados, por isso o navegador mostra um aviso a aceitar.

A instalação por predefinição **não** arranca com HTTPS; as câmaras do telemóvel precisam do arranque manual com os parâmetros de certificado aí descritos.

## Não é possível abrir um conjunto de dados — "not downloaded yet"

O LeRobot escreve o índice do conjunto de dados quando uma gravação **termina corretamente**. Uma sessão terminada a meio de um episódio pode deixar um diretório que parece completo mas não está. Normalmente, os dados do episódio continuam no disco; o que falta é o índice. Volte a gravar a sessão e pare-a com o botão de parar.

## O treino indica que falta um pacote

Alguns tipos de política e funcionalidades opcionais de treino precisam de dependências que não são instaladas por predefinição. O separador Treino oferece-se para as instalar quando seleciona um; aguarde que a instalação em segundo plano termine antes de iniciar a tarefa. O registo de treino indica o nome do pacote, caso prefira instalá-lo manualmente.

## Não aparece nenhuma notificação de atualização

Por conceção: a verificação só se aplica a instalações feitas a partir do git. Uma **instalação editável** (`pip install -e .`) é uma cópia de trabalho e não é verificada. Atualize-as com `git pull`.

## Ainda bloqueado

Recolha a **consola do navegador** e o **terminal que corre o `lelab`** — o servidor regista o pedido que falhou. A maioria destas falhas está a um passo da última coisa que alterou.

---

> **Voltar ao início:** [01 Visão geral](01-Overview.md) · [Índice do tutorial](https://github.com/Juxi-Technology/leLab/blob/main/README.md)

<RelatedProducts slugs="so-arm101" />
