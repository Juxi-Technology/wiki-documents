---
title: "Transferência de arquivos via SSH"
description: "Transferência de arquivos via SSH para o módulo IMU: instale o software de acesso remoto, conecte-se à placa por SSH e envie ou baixe arquivos."
---

# Transferência de arquivos via SSH

## 1. Instalação do programa WInSCP

Software de login remoto.zip

Baixe e descompacte, clique duas vezes para abrir o programa e iniciar a instalação, clique em Accept para aceitar o acordo e, em seguida, basta seguir as instruções de instalação.

![Imagem 1](../../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/1.png)

![Imagem 2](../../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/2.png)

![Imagem 3](../../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/3.png)

Clique em Finish para concluir a instalação.

![Imagem 4](../../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/4.png)

É possível ver que apareceu um ícone do WinSCP na área de trabalho

![Imagem 5](../../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/5.png)

## 2. Transferência remota de arquivos via SSH

Após abrir o software WinSCP, aparece a seguinte tela de login.

File protocol: selecione SFTP como protocolo de arquivo, Host name: endereço IP, Port number: o padrão 22 já basta, User name: nome de usuário, Password: senha de login.

Depois de inserir as informações corretas, você pode clicar em Save para salvar as informações preenchidas, assim não será necessário digitá-las novamente no próximo login.

![Imagem 6](../../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/6.png)

Após clicar em Login e fazer o login com sucesso, será exibida a seguinte tela; à esquerda estão as pastas do computador Windows e à direita estão as pastas do nano.

![Imagem 7](../../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/7.png)

Existem três formas de operar a transferência de arquivos; a primeira é arrastar diretamente o arquivo da esquerda para a direita, ou da direita para a esquerda, e o sistema copiará automaticamente uma cópia do arquivo para transferi-lo.

A segunda é selecionar o arquivo com o mouse e pressionar a tecla F5; então o arquivo selecionado será copiado para o outro lado.

A terceira é selecionar o arquivo e clicar com o botão direito do mouse; se for para transferir do computador Windows para o nano, clique em upload,

![Imagem 8](../../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/8.png)

Aparecerá um aviso; você pode optar por não exibir novamente e clicar em OK, e o arquivo será transferido automaticamente.

![Imagem 9](../../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/9.png)

Se for para transferir arquivos do nano para o computador Windows, clique com o botão direito do mouse para selecionar o arquivo e escolha Download

![Imagem 10](../../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/10.png)

Atenção: a transferência de arquivos requer que o computador e a placa estejam na mesma rede local e que o Raspberry Pi tenha o serviço SSH ativado para poder ser realizada. Às vezes, quando ocorre falha na transferência de arquivos, geralmente é porque a permissão do lado da placa é insuficiente; basta conceder a permissão máxima.

```Plain Text
chmod 777 目录名 
```



