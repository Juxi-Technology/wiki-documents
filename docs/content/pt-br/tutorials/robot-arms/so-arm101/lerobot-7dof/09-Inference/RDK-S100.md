---
title: "Inferência no D-Robotics RDK S100"
description: "Execute a inferência do SO-ARM101 de 7 eixos no controlador D-Robotics RDK S100, seguindo o fluxo da política LeRobot ACT do fabricante."
---

# Inferência no D-Robotics RDK S100

Para o fluxo de implementação específico, consulte este link: [Documento completo do fluxo do LeRobot ACT Policy](https://horizonrobotics.feishu.cn/docx/HSr8dBdZ0oQ5OwxPQvBcsuyZnWe)



## Implantação ponta a ponta do modelo ACT no RDK S100/S100P

Esta seção vai guiá-lo pela implantação completa do modelo ACT em hardware da série D-Robotics RDK S100. Todo o processo é dividido em três fases principais: **exportação do modelo**, **compilação quantizada** e **execução na placa**.

**Observações preliminares:**

- **Máquina de desenvolvimento \(Host\):** usada para executar as etapas 1 e 2; geralmente é a sua máquina de treinamento do modelo (precisa ter bom desempenho e ter o Docker instalado).

- **Placa \(Edge\):** D-Robotics RDK S100/S100P, usada para executar a etapa 3.

- **Toolchain:** este artigo depende do repositório `rdk_LeRobot_tools`; para mais detalhes, consulte o [Endereço do repositório no GitHub](https://github.com/D-Robotics/rdk_LeRobot_tools).

**Aviso importante de compatibilidade de versões \(leitura obrigatória\):** o fluxo de exportação ONNX da versão atual do `rdk_LeRobot_tools` é perfeitamente compatível com a versão **LeRobot datasets v2\.1**. Como a versão mais recente v3\.0 tem alterações na estrutura dos dados, **recomendamos fortemente** que, antes de executar as operações desta seção, você alterne o repositório principal `lerobot` original para o commit específico compatível com v2\.1, para garantir que o fluxo de exportação ocorra sem problemas. 

*Commit ID recomendado:* `8cfab3882480bdde38e42d93a9752de5ed42cae2`



### Fase 1: Exportação do modelo no formato ONNX 💻 \(na máquina de desenvolvimento\)

Primeiro, precisamos exportar o modelo **treinado em PyTorch** para um formato intermediário (ONNX).



#### **1\. Clonar o repositório da toolchain** 

Entre no seu diretório de trabalho `lerobot` e clone a toolchain exclusiva do RDK:

```Bash
cd lerobot

# 1. Alternar para a versão estável compatível com datasets v2.1
git checkout 8cfab3882480bdde38e42d93a9752de5ed42cae2

# 2. Clonar a toolchain exclusiva do D-Robotics RDK
git clone https://github.com/D-Robotics/rdk_LeRobot_tools.git
```



#### **2\. Configurar os parâmetros de exportação** 

Edite o arquivo `rdk_LeRobot_tools/bpu_export_config.yaml` e modifique a configuração de acordo com os seus caminhos reais:

```YAML
dataset:
  root: "data/so101_pick_place" # Endereço absoluto ou relativo do seu conjunto de dados
act_path: "outputs/train/act_so101/checkpoints/050000/pretrained_model" # Endereço dos pesos originais do modelo PyTorch
type: "nash-e" # Arquitetura de hardware de destino; RDK S100 corresponde a nash-e / S100P corresponde a nash-m
```



#### 3\. Executar o script de exportação

```Bash
# Exportar ONNX (máquina de desenvolvimento)
python export_bpu_actpolicy.py --config bpu_export_config.yaml
```

✅ **Sinal de sucesso:** a pasta `bpu_export_output` é gerada no diretório atual, contendo o script `build_all.sh` e os dados de calibração de quantização necessários a seguir.



### Fase 2: Compilar o modelo BPU 🐳 \(no ambiente Docker da máquina de desenvolvimento\)

A quantização e a compilação do modelo BPU do D-Robotics dependem do ambiente OpenExplorer \(OE\). Recomendamos usar o Docker para isolar o ambiente.



#### **1\.** **Preparar o ambiente Docker e a imagem** 

Certifique-se de que o Docker está instalado na máquina de desenvolvimento ([guia de instalação oficial](https://docs.docker.com/engine/install/)). Baixe a imagem de CPU recomendada e carregue-a:

```Bash
# Carregar o pacote compactado da imagem offline baixada
sudo docker load -i ai_toolchain_ubuntu_22_s100_xxx.tar
```



#### **2\. Iniciar o contêiner de compilação**

**Dica para evitar problemas:** a compilação do modelo exige uma memória compartilhada maior. Não deixe de adicionar o parâmetro `--shm-size=15g`, caso contrário é muito fácil ocorrer um erro de memória IPC.

Monte o diretório de trabalho da máquina de desenvolvimento (que contém a pasta recém-exportada) dentro do contêiner:

```Bash
sudo docker run -it --rm \
  --network host \
  --shm-size=15g \
  -v "$(pwd)":/workspace \
  --workdir /workspace \
  <docker-image-name> /bin/bash
```

\(Observação: substitua `<docker-image-name>` pelo nome real da imagem que você vê com `sudo docker images`.\)



#### **3\.** **Executar a compilação dentro do contêiner** 

Depois de entrar no contêiner, execute o script de compilação em um clique:

```Bash
cd /workspace/bpu_export_output
bash build_all.sh
```



#### **4\.** **Verificar os artefatos de compilação** 

Após a compilação, a pasta `bpu_output/` é gerada em `bpu_export_output`. Ela contém todos os arquivos essenciais necessários para a execução na placa RDK: 

- Clique para ver a estrutura do diretório `bpu_output/`

    - `BPU_ACTPolicy_TransformerLayers.hbm` \(arquivo de modelo quantizado\)

    - `BPU_ACTPolicy_VisionEncoder.hbm` \(arquivo de modelo quantizado\)

    - `action_mean.npy` e vários outros parâmetros de normalização do conjunto de dados

    - `camera1_mean.npy` e outros parâmetros estatísticos da câmera

---

### Fase 3: Implantação e inferência na placa 🤖 \(no RDK S100\)

**Verificação dos pré-requisitos:**

1. O ambiente de execução `D-Robotics/lerobot` já está configurado na placa RDK, e o `hbm_runtime` está instalado.

2. A pasta `bpu_output/` inteira gerada na etapa anterior já foi copiada por completo para a placa RDK via `scp`, pen drive ou outro meio.

3. A configuração básica de teleoperação já foi concluída, garantindo que a porta serial do braço robótico, a porta USB da câmera e os arquivos de calibração estejam configurados corretamente.



#### **1\.** **Executar a inferência acelerada por BPU**

No terminal da placa RDK, entre no diretório da toolchain e inicie o script de controle:

```Bash
cd rdk_LeRobot_tools

python bpu_control_robot.py \
  --bpu-act-path ../bpu_output \
  --fps 30 \
  --inference-time 60
```



---

### 🛠️ Solução de problemas comuns \(Troubleshooting\)

Se você encontrar problemas na implantação real, verifique a lista abaixo:

- **O braço robótico não se move?**

    - Verifique o mapeamento dos dispositivos: digite `ls /dev/ttyACM*` no terminal e confirme se o número da porta serial correspondente ao braço robótico está correto.

    - Verifique as permissões: tente executar o script de inferência com `sudo`, ou adicione o usuário atual ao grupo de usuários `dialout`.

- **Erro ao capturar o stream da câmera / imagem anormal / braço robótico tremendo no mesmo lugar?**

    - Confirme se o índice da câmera (Camera Index) mudou por causa de conexão a quente; verifique se a configuração dos parâmetros da câmera no código corresponde ao `/dev/video*` real.

- **Ao copiar arquivos gerados no contêiner na máquina de desenvolvimento, aparece "permissão insuficiente"?**

    - Os arquivos gerados no diretório montado do Docker pertencem ao root por padrão; na máquina de desenvolvimento, execute `sudo chown -R $USER:$USER bpu_export_output` para corrigir.

