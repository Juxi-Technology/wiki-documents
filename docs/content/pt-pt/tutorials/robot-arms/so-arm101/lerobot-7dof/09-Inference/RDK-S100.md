---
title: "Inferência no D-Robotics RDK S100"
description: "Execute a inferência do SO-ARM101 de 7 eixos no controlador D-Robotics RDK S100, seguindo o fluxo de trabalho do fabricante para a política ACT do LeRobot."
---

# Inferência no D-Robotics RDK S100

Para o fluxo de implementação detalhado, pode consultar esta ligação [Documentação completa do fluxo de trabalho do LeRobot ACT Policy](https://horizonrobotics.feishu.cn/docx/HSr8dBdZ0oQ5OwxPQvBcsuyZnWe)



## Implantação ponta a ponta do modelo ACT no RDK S100/S100P

Esta secção guia-o na implantação completa do modelo ACT no hardware da série RDK S100 da D-Robotics. O processo divide-se em três fases principais: **exportação do modelo**, **compilação de quantização** e **execução na placa**.

**Notas prévias:**

- **Máquina de desenvolvimento \(Host\):** usada para executar os passos 1 e 2, normalmente a sua máquina de treino do modelo (requer bom desempenho e o Docker instalado).

- **Placa \(Edge\):** D-Robotics RDK S100/S100P, usada para executar o passo 3.

- **Toolchain:** este artigo depende do repositório `rdk_LeRobot_tools`; para mais detalhes, consulte o [endereço do repositório no GitHub](https://github.com/D-Robotics/rdk_LeRobot_tools).

**Aviso importante de compatibilidade de versões \(leitura obrigatória\):** o fluxo de exportação ONNX da versão atual do `rdk_LeRobot_tools` é perfeitamente compatível com a versão **LeRobot datasets v2\.1**. Como a versão mais recente v3\.0 tem alterações na estrutura de dados, **recomenda-se vivamente** que, antes de executar as operações desta secção, mude o repositório principal `lerobot` original para o commit específico compatível com a v2\.1, para garantir que o fluxo de exportação decorre sem problemas. 

*Commit ID recomendado:* `8cfab3882480bdde38e42d93a9752de5ed42cae2`



### Fase 1: exportação do modelo em formato ONNX 💻 \(na máquina de desenvolvimento\)

Primeiro, é preciso exportar o **modelo treinado em PyTorch** para um formato intermédio (ONNX).



#### **1\. Obter o repositório da toolchain** 

Entre no seu diretório de trabalho `lerobot` e clone a toolchain exclusiva do RDK:

```Bash
cd lerobot

# 1. Mudar para a versão estável compatível com datasets v2.1
git checkout 8cfab3882480bdde38e42d93a9752de5ed42cae2

# 2. Obter a toolchain exclusiva do RDK da D-Robotics
git clone https://github.com/D-Robotics/rdk_LeRobot_tools.git
```



#### **2\. Configurar os parâmetros de exportação** 

Edite o ficheiro `rdk_LeRobot_tools/bpu_export_config.yaml` e altere a configuração de acordo com os seus caminhos reais:

```YAML
dataset:
  root: "data/so101_pick_place" # Caminho absoluto ou relativo do seu dataset
act_path: "outputs/train/act_so101/checkpoints/050000/pretrained_model" # Caminho dos pesos originais do modelo PyTorch
type: "nash-e" # Arquitetura de hardware de destino: RDK S100 corresponde a nash-e / S100P corresponde a nash-m
```



#### 3\. Executar o script de exportação

```Bash
# Exportar ONNX (máquina de desenvolvimento)
python export_bpu_actpolicy.py --config bpu_export_config.yaml
```

✅ **Sinal de sucesso:** é criada a pasta `bpu_export_output` no diretório atual, contendo o script `build_all.sh` e os dados de calibração de quantização necessários mais adiante.



### Fase 2: compilar o modelo BPU 🐳 \(no ambiente Docker da máquina de desenvolvimento\)

A quantização e a compilação dos modelos BPU da D-Robotics dependem do ambiente OpenExplorer \(OE\). Recomendamos usar Docker para isolar o ambiente.



#### **1\.** **Preparar o ambiente Docker e a imagem** 

Certifique-se de que o Docker está instalado na máquina de desenvolvimento ([guia de instalação oficial](https://docs.docker.com/engine/install/)). Descarregue a imagem de CPU recomendada e carregue-a:

```Bash
# Carregar o pacote comprimido da imagem offline descarregada
sudo docker load -i ai_toolchain_ubuntu_22_s100_xxx.tar
```



#### **2\. Iniciar o contentor de compilação**

**Dica para evitar problemas:** a compilação do modelo requer memória partilhada relativamente grande. Acrescente obrigatoriamente o parâmetro `--shm-size=15g`, caso contrário é muito provável que ocorram erros de memória IPC.

Monte o diretório de trabalho da máquina de desenvolvimento (incluindo a pasta acabada de exportar) dentro do contentor:

```Bash
sudo docker run -it --rm \
  --network host \
  --shm-size=15g \
  -v "$(pwd)":/workspace \
  --workdir /workspace \
  <docker-image-name> /bin/bash
```

\(Nota: substitua `<docker-image-name>` pelo nome real da imagem que vê com `sudo docker images`.\)



#### **3\.** **Executar a compilação dentro do contentor** 

Depois de entrar no contentor, execute o script de compilação com um só comando:

```Bash
cd /workspace/bpu_export_output
bash build_all.sh
```



#### **4\.** **Verificar os resultados da compilação** 

Após a compilação, é criada a pasta `bpu_output/` dentro de `bpu_export_output`. Esta contém todos os ficheiros essenciais para a execução na placa RDK: 

- Clique para ver a estrutura do diretório `bpu_output/`

    - `BPU_ACTPolicy_TransformerLayers.hbm` \(ficheiro do modelo quantizado\)

    - `BPU_ACTPolicy_VisionEncoder.hbm` \(ficheiro do modelo quantizado\)

    - `action_mean.npy` e vários parâmetros de normalização do dataset

    - `camera1_mean.npy` e outros parâmetros estatísticos da câmara

---

### Fase 3: implantação e inferência na placa 🤖 \(no RDK S100\)

**Verificação dos pré-requisitos:**

1. O ambiente de execução `D-Robotics/lerobot` já está configurado na placa RDK, e o `hbm_runtime` está instalado.

2. A pasta `bpu_output/` completa gerada no passo anterior já foi copiada para a placa RDK através de `scp`, de uma pen USB ou de outro meio.

3. A configuração básica de teleoperação já está concluída, garantindo que a porta série do braço robótico, a porta USB da câmara e os ficheiros de calibração estão corretamente configurados.



#### **1\.** **Executar a inferência acelerada por BPU**

No terminal da placa RDK, entre no diretório da toolchain e inicie o script de controlo:

```Bash
cd rdk_LeRobot_tools

python bpu_control_robot.py \
  --bpu-act-path ../bpu_output \
  --fps 30 \
  --inference-time 60
```



---

### 🛠️ Resolução de problemas comuns \(Troubleshooting\)

Se encontrar problemas na implantação real, verifique a seguinte lista:

- **O braço robótico não se move?**

    - Verifique o estado de montagem dos dispositivos: introduza `ls /dev/ttyACM*` no terminal e confirme se o número da porta série do braço robótico está correto.

    - Verifique as permissões: experimente executar o script de inferência com `sudo`, ou adicione o utilizador atual ao grupo `dialout`.

- **Erro ao obter o stream da câmara / imagem anormal / braço robótico a tremer no mesmo sítio?**

    - Confirme se o índice da câmara (Camera Index) se alterou devido a ligações/desligações a quente e verifique se a configuração dos parâmetros da câmara no código corresponde ao `/dev/video*` real.

- **Ao copiar da máquina de desenvolvimento os ficheiros gerados no contentor, aparece «permissões insuficientes»?**

    - Os ficheiros gerados no diretório montado do Docker pertencem por predefinição ao root; na máquina de desenvolvimento, execute `sudo chown -R $USER:$USER bpu_export_output` para corrigir.

