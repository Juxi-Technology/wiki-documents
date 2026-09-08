---
title: Gravação do JetPack e Configuração do Sistema
description: Guia de gravação do NVIDIA Jetson JetPack — SDK Manager e imagem oficial, solução de problemas, noções básicas de sistema
keywords: [jetson, jetpack, gravação, configuração de sistema, nvidia]
---

# Gravação do JetPack e Configuração do Sistema

> Para desenvolvedores novos no NVIDIA Jetson. Os kits de desenvolvimento Jetson da Juxi Technology vêm com Ubuntu 22.04 pré-instalado — este guia é para regravar ou trocar versões do JetPack.

## 1. O que é o JetPack?

O JetPack é o pacote de SDK da NVIDIA para plataformas Jetson, incluindo:

- Imagem de sistema Ubuntu
- CUDA / cuDNN / TensorRT
- APIs multimídia (L4T)

**Mapeamento de versões**:

| Placa | JetPack Recomendado | SO |
|-------|--------------------|----|
| Orin NX / Nano | JetPack 6.x | Ubuntu 22.04 |
| Xavier NX / AGX | JetPack 5.x | Ubuntu 20.04 |

> O [Jetson Orin NX Super Dev Kit](/pt-pt/products/jetson-orin-nx-super-kit) da Juxi Technology vem com Ubuntu 22.04 (ecossistema JetPack 6.x).

## 2. Métodos de Gravação

### Método 1: Imagem Oficial (Host Ubuntu)

```bash
# 1. Download the driver package for your board from NVIDIA
# 2. Extract and enter Linux_for_Tegra
cd Linux_for_Tegra
sudo ./apply_binaries.sh

# 3. Put Jetson into Recovery mode (hold REC + power)
# 4. Flash
sudo ./flash.sh <board-name> mmcblk0p1
```

### Método 2: SDK Manager (recomendado para iniciantes)

1. Instale o [NVIDIA SDK Manager](https://developer.nvidia.com/sdk-manager)
2. Conecte o Jetson ao PC (modo Recovery)
3. Selecione a placa → versão do JetPack → componentes (mantenha CUDA/TensorRT)
4. Aguarde a gravação + primeira inicialização

> ⚠️ A gravação leva de 20 a 60 minutos. NÃO desconecte durante o processo.

## 3. Solução de Problemas

| Sintoma | Verificação |
|---------|-------|
| Não entra no modo Recovery | Segure REC ao ligar; confirme com `lsusb` que um dispositivo NVIDIA aparece |
| Gravação falha no meio | Tente um **cabo de dados diferente** primeiro; desative a economia de energia do PC; tente novamente |
| Ecrã preto após a gravação | Verifique a porta de display (DP no Orin); entre em Recovery novamente e regrave |
| Incompatibilidade de versão | Confirme se o modelo da placa corresponde à versão do JetPack (serigrafia na placa) |

## 4. Configuração Básica do Sistema

### 4.1 Rede e Repositórios

```bash
# Optional: mirror for faster apt
sudo apt update
```

### 4.2 Verificar Ambiente GPU

```bash
cat /etc/nv_tegra_release
nvcc --version

python3 -c "import torch; print(torch.cuda.is_available())"
```

> Se o PyTorch estiver indisponível, veja [Compatibilidade PyTorch no Jetson Orin](/pt-pt/tutorials/learning-resources/jetson-orin-pytorch-compatibility).

### 4.3 Modo de Máximo Desempenho (Orin)

```bash
sudo nvpmodel -m 0
sudo jetson_clocks
```

### 4.4 Expandir a Partição Raiz

```bash
sudo systemctl enable --now nvresize
# or manually:
sudo resize2fs /dev/nvme0n1p1
```

## 5. FAQ

**P: Sem WiFi após a gravação?**

**R:** As placas Orin precisam de um módulo WiFi M.2 externo; verifique a conexão da antena de banda dupla.

**P: Como entrar no modo Recovery?**

**R:** Desligue → segure REC (ou BOOT) → ligue / conecte o Type-C → confirme se o `lsusb` mostra `NVIDIA Corp.`.

**P: Requisito de armazenamento?**

**R:** SSD de ≥128GB recomendado (cartões SD são gargalo). 256GB é o padrão do kit.

---

## Links Relacionados

- [Jetson Orin NX Super Dev Kit](/pt-pt/products/jetson-orin-nx-super-kit)
- [Introdução à Implantação de IA de Borda](/pt-pt/topics/edge-ai-intro)
- [Tutorial de Introdução ao ROS](/pt-pt/tutorials/ros-intro)

## Suporte

- 📧 E-mail: support@juxitech.com
- 🌐 Site: [www.juxitech.com](https://www.juxitech.com)
