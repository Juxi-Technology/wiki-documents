---
title: "Guia de Seleção"
description: "Guia de seleção dos braços robóticos da Juxi: comparação de SO-ARM101, AmazingHand e Lekiwi por DOF, controlo e casos de uso, com recomendações."
---

# Guia de Seleção

A Juxi Technology oferece vários braços robóticos para diferentes cenários de aplicação. Este guia ajuda você a comparar e escolher o modelo adequado.

> Observação: consulte a documentação oficial de cada produto para obter as especificações detalhadas. Esta tabela serve apenas como referência de seleção.

## Os três braços robóticos comparados

| Característica | SO-ARM101 | AmazingHand | Lekiwi |
|---------|-----------|-------------|--------|
| **Tipo** | Robô de teleoperação com braço duplo | Mão hábil | Braço didático de baixo custo |
| **DOF** | 6 DOF por braço | 5 dedos, multiarticulado | 6 DOF |
| **Controle** | Ecossistema LeRobot / API Python | Barramento serial TTL | Controle por servo |
| **Plataforma host** | PC (Linux) / Jetson | Placa controladora | PC / MCU |
| **Casos de uso** | Aprendizado por imitação com IA, pesquisa em teleoperação | Preensão, replicação de gestos | Educação, aprendizagem para iniciantes |
| **Open Source** | [LeRobot](https://github.com/Juxi-Technology/lerobot) | [AmazingHand](https://github.com/Juxi-Technology/AmazingHand) | Documentação oficial |
| **Ideal para** | Pesquisadores, desenvolvedores de IA | Pesquisadores de manipulação | Estudiantes e makers |

## Como escolher?

### 🎓 Estudantes / Iniciantes → Lekiwi

- Estrutura simples, baixo custo — ideal para ensino em sala de aula e para começar
- Controle intuitivo por servo

### 🤖 Pesquisa em preensão e manipulação → AmazingHand

- Mão hábil de 4 dedos para pesquisa de estratégias de preensão e controle de gestos
- Controle por barramento serial TTL, compatível com controladores convencionais

### 🧠 Aprendizado por imitação com IA / Teleoperação → SO-ARM101

- Design de braço duplo com teleoperação líder-seguidor
- Integração profunda com o ecossistema LeRobot, ideal para aprendizagem por imitação
- Suporte a Jetson para fluxos de trabalho de IA sem interrupções

## Combinações recomendadas

| Necessidade | Configuração recomendada |
|------|-------------------|
| Pesquisa em teleoperação com IA | SO-ARM101 + AmazingHand (manipulação hábil) |
| Laboratório de ensino | Várias unidades Lekiwi |
| Sistema robótico completo | SO-ARM101 + módulo IMU + acessórios de visão |

## Tutoriais relacionados

- [Tutorial do SO-ARM101](/pt-pt/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
- [Controle de interface do AmazingHand](/pt-pt/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control)
- [Tutorial do Lekiwi](/pt-pt/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial)

## Suporte

- 📧 E-mail: support@juxitech.com
- 🌐 Site oficial: [www.juxitech.com](https://www.juxitech.com)
