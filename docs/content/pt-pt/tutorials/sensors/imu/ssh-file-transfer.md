---
title: "Transferência de ficheiros via SSH"
description: "Transferência de ficheiros via SSH para o módulo IMU: instale o software de acesso remoto, ligue-se à placa por SSH e transfira ficheiros."
---

# Transferência de ficheiros via SSH

## 1. Instalação do programa WInSCP

Software de login remoto.zip

Descarregue e descompacte, clique duas vezes para abrir o programa e iniciar a instalação, clique em Accept para aceitar o acordo e, em seguida, basta seguir as instruções de instalação.

![Imagem 1](../../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/1.png)

![Imagem 2](../../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/2.png)

![Imagem 3](../../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/3.png)

Clique em Finish para concluir a instalação.

![Imagem 4](../../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/4.png)

É possível ver que apareceu um ícone do WinSCP no ambiente de trabalho

![Imagem 5](../../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/5.png)

## 2. Transferência remota de ficheiros via SSH

Após abrir o software WinSCP, aparece o seguinte ecrã de início de sessão.

File protocol: selecione SFTP como protocolo de ficheiro, Host name: endereço IP, Port number: a predefinição 22 é suficiente, User name: nome de utilizador, Password: palavra-passe de início de sessão.

Depois de introduzir as informações corretas, pode clicar em Save para guardar as informações preenchidas, assim não será necessário voltar a introduzi-las no próximo início de sessão.

![Imagem 6](../../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/6.png)

Após clicar em Login e iniciar sessão com sucesso, será exibido o seguinte ecrã; à esquerda estão as pastas do computador Windows e à direita estão as pastas do nano.

![Imagem 7](../../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/7.png)

Existem três formas de operar a transferência de ficheiros; a primeira é arrastar diretamente o ficheiro da esquerda para a direita, ou da direita para a esquerda, e o sistema copiará automaticamente uma cópia do ficheiro para o transferir.

A segunda é selecionar o ficheiro com o rato e premir a tecla F5; então o ficheiro selecionado será copiado para o outro lado.

A terceira é selecionar o ficheiro e clicar com o botão direito do rato; se for para transferir do computador Windows para o nano, clique em upload,

![Imagem 8](../../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/8.png)

Aparecerá um aviso; pode optar por não voltar a mostrar e clicar em OK, e o ficheiro será transferido automaticamente.

![Imagem 9](../../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/9.png)

Se for para transferir ficheiros do nano para o computador Windows, clique com o botão direito do rato para selecionar o ficheiro e escolha Download

![Imagem 10](../../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/10.png)

Atenção: a transferência de ficheiros requer que o computador e a placa estejam na mesma rede local e que o Raspberry Pi tenha o serviço SSH ativado para poder ser realizada. Por vezes, quando ocorre falha na transferência de ficheiros, geralmente é porque a permissão do lado da placa é insuficiente; basta conceder a permissão máxima.

```Plain Text
chmod 777 目录名 
```



