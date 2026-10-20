---
title: "Transferência remota de arquivos"
description: "O MobaXterm é uma ferramenta remota poderosa que integra ferramentas remotas como SHH, VNC e FTP."
---

# Transferência remota de arquivos

[1. MobaXterm](https://juxitech.feishu.cn/docx/OAICdMDl9ozdDjx92uocVYrcnQq#doxcn6Xj5FnZdC8Xc7WirMMH1ob)

[2. Instalação do MobaXterm](https://juxitech.feishu.cn/docx/OAICdMDl9ozdDjx92uocVYrcnQq#doxcnhziIgp0c1zlNjRYXoF8qQd)

[2.1. Baixar o MobaXterm](https://juxitech.feishu.cn/docx/OAICdMDl9ozdDjx92uocVYrcnQq#doxcnKFBDKQBtCsUo6OslblLvRd)

[2.2. Instalação do MobaXterm](https://juxitech.feishu.cn/docx/OAICdMDl9ozdDjx92uocVYrcnQq#doxcnShWWp90NBCbz0VWkpDMTjW)

[3. Uso do MobaXterm](https://juxitech.feishu.cn/docx/OAICdMDl9ozdDjx92uocVYrcnQq#doxcnTFGoxRBZ8Eszi1NVvBXlGg)

[4. MobaXterm: SFTP remoto](https://juxitech.feishu.cn/docx/OAICdMDl9ozdDjx92uocVYrcnQq#doxcnQj3cuCUnWzEuT4GNupwpeh)

## 1. MobaXterm

O MobaXterm é uma ferramenta remota poderosa que integra ferramentas remotas como SHH, VNC e FTP.

## 2. Instalação do MobaXterm

Site oficial: [https://mobaxterm.mobatek.net/](https://mobaxterm.mobatek.net/)

![Imagem 1](../../../../../public/images/tutorials/sensors/imu/remote-file-transfer/1.png)

### 2.1. Baixar o MobaXterm

Escolha a versão gratuita para baixar:

![Imagem 2](../../../../../public/images/tutorials/sensors/imu/remote-file-transfer/2.png)

Escolha a versão de instalação para baixar:

![Imagem 3](../../../../../public/images/tutorials/sensors/imu/remote-file-transfer/3.png)

### 2.2. Instalação do MobaXterm

Descompacte o pacote compactado baixado do site oficial e abra o arquivo `MobaXterm_installer_24.4.msi` para instalar:

![Imagem 4](../../../../../public/images/tutorials/sensors/imu/remote-file-transfer/4.png)

Aceitar o acordo:

![Imagem 5](../../../../../public/images/tutorials/sensors/imu/remote-file-transfer/5.png)

Escolha o local de instalação do software: recomenda-se o local padrão

![Imagem 6](../../../../../public/images/tutorials/sensors/imu/remote-file-transfer/6.png)

Instalação propriamente dita:

![Imagem 7](../../../../../public/images/tutorials/sensors/imu/remote-file-transfer/7.png)

![Imagem 8](../../../../../public/images/tutorials/sensors/imu/remote-file-transfer/8.png)

Concluir a instalação:

![Imagem 9](../../../../../public/images/tutorials/sensors/imu/remote-file-transfer/9.png)

## 3. Uso do MobaXterm

Encontre o ícone do `MobaXterm` na área de trabalho e abra-o:

![Imagem 10](../../../../../public/images/tutorials/sensors/imu/remote-file-transfer/10.png)

## 4. MobaXterm: SSH remoto

Selecione `Session` → `SSH`: preencha o IP e o nome de usuário do dispositivo remoto

Por exemplo:

Informações padrão da placa Jetson:

Nome de usuário: juxi

Senha: juxi

Atenção: ao usar SSH remoto no MobaXterm, o login remoto via SFTP será feito automaticamente na barra lateral

![Imagem 11](../../../../../public/images/tutorials/sensors/imu/remote-file-transfer/11.png)

![Imagem 12](../../../../../public/images/tutorials/sensors/imu/remote-file-transfer/12.png)

