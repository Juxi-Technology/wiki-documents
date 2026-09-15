---
title: "사용자 정의 프로토콜 항목 제작"
description: "모듈은 출하 시 이미 음성 인식 기능 펌웨어가 플래싱되어 있으며, 자료 압축 파일 안에도 출하 시 펌웨어가 제공됩니다. 펌웨어를 다시 제작해야 하는 경우 아래 단계에 따라 펌웨어를 제작할 수 있습…"
---

# 사용자 정의 프로토콜 항목 제작

## 1.음성 칩 펌웨어 제작

## 1.1주의 사항

모듈은 출하 시 이미 음성 인식 기능 펌웨어가 플래싱되어 있으며, 자료 압축 파일 안에도 출하 시 펌웨어가 제공됩니다. 펌웨어를 다시 제작해야 하는 경우 아래 단계에 따라 펌웨어를 제작할 수 있습니다.

## 1.2펌웨어 제작

먼저 “[Chipintelli 음성 AI 플랫폼](https://aiplatform.chipintelli.com/)” 링크를 열어 펌웨어 제작 공식 웹사이트에 접속합니다.   메뉴 바의 “기능 개발” 을 클릭한 다음, 제품 개발 항목 아래의 “오프라인 음성 인식 대형 모델 응용” 을 클릭합니다.

![그림 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/1.png)

이때 로그인이 필요하다는 안내가 표시됩니다. 여기서는 자신의 정보로 플랫폼 계정을 등록해야 하며, 이 튜토리얼에서는 미리 등록해 두었습니다. 로그인한 후 “음성 인식 펌웨어 및 SDK 개발” 을 다시 클릭합니다.

![그림 2](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/2.png)

페이지가 전환되면 왼쪽에서 새 프로젝트를 클릭하고, 아래 그림에 따라 제품을 새로 만듭니다. 제품 이름과 설명은 모두 사용자 정의할 수 있으며, 나머지 정보는 빨간 상자 내용에 따라 선택해야 합니다. 제품 유형은 “범용->스마트 중앙 제어” 를 선택하고, 완료되면 만들기를 클릭합니다.

![그림 3](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/3.png)

다음으로 프로젝트의 기본 정보를 입력해야 합니다. 중국어를 인식해야 하므로 언어 유형은 “중국어” 를 선택합니다. 영어를 인식해야 하는 경우에도 그에 맞게 수정할 수 있습니다. 나머지 정보는 아래 그림에 따라 선택하면 되며, 완료되면 계속을 클릭합니다.

![그림 4](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/4.png)

그런 다음 펌웨어를 구성해야 합니다. 여기서는 수정이 필요한 부분만 설명하며, 알고리즘 매개변수의 에코 제거를 켭니다.

![그림 5](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/5.png)

하드웨어 매개변수에서는 크리스털 발진 소스를 “내부 RC” 로 선택해야 합니다.

![그림 6](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/6.png)

인쇄 시리얼 포트 구성에서 UART0 레벨을 오픈 드레인 기능으로 구성하여 외부 5V 풀업을 지원하도록 합니다.

![그림 7](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/7.png)

통신 시리얼 포트 구성을 수정하여 보드레이트를 115200 으로 설정하고, UART1 레벨을 오픈 드레인 기능으로 구성하여 외부 5V 풀업을 지원하도록 합니다. 구성이 완료되면 “계속” 을 클릭하여 다음 단계로 넘어갑니다.

![그림 8](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/8.png)

다음으로 명령어 편집 기능으로 들어갑니다. 먼저 재생할 음색을 선택해야 하며, 여기서는 “小蝶-清新女声 Ver.3” 를 선택합니다.

![그림 9](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/9.png)

이어서 명령어 첨부 파일을 업로드합니다. 이 문서와 같은 경로에 있는 “命令词播报词协议列表V1_中文” 표를 찾아 웹 페이지로 바로 끌어다 놓아 업로드합니다.

![그림 10](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/10.png)

파일을 업로드하면 아래 표에서 명령어 데이터를 확인할 수 있습니다.

![그림 11](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/11.png)

자기 학습 기능을 켜고 지정 학습을 선택하면 시스템이 자동으로 4 개의 자기 학습 명령을 생성하며, 여기서는 수정하지 않습니다.

![그림 12](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/12.png)

제출한 후 몇 분만 기다리면 펌웨어 제작이 완료되며, 완료되면 펌웨어 다운로드를 클릭하여 제작된 펌웨어를 받을 수 있습니다.

![그림 13](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/13.png)

펌웨어 플래싱 단계는 "[모듈 펌웨어 플래싱](https://juxitech.feishu.cn/wiki/FfE8wbL1wipUWgkUKW6cbsw2nOe)" 을 참조하십시오.

## 2.기능성 항목 수정

첨부 파일의 命令词播报词协议列表V1_中文 파일을 엽니다.

![그림 14](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/14.png)

표에서 기능성 항목, 즉 표의 처음 10 개 항목을 찾습니다. 여기서 처음 10 개의 기능성 항목은 모두 고정 항목으로, 새로 추가할 수 없고 수정만 가능합니다.

![그림 15](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/15.png)

여기서는 웨이크 워드의 재생 문구를 수정하는 것을 예로 듭니다. 기존에 “你好，小犀” 를 인식한 후 “在的” 를 재생하던 것을 “我在” 를 재생하도록 수정합니다.

![그림 16](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/16.png)

수정을 마친 후 저장하고, 이어서 “1.2 펌웨어 제작” 의 단계에 따라 표를 웹사이트에 가져옵니다. 이미 펌웨어를 한 번 제작한 경우라면 이전 프로젝트에서 “상속” 버튼을 클릭하여 매개변수 구성 단계를 생략할 수 있습니다.

![그림 17](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/17.png)

펌웨어를 다시 제작한 후에는 펌웨어를 음성 인터랙션 모듈에 플래싱해야 하며, 이렇게 하면 기능성 항목을 수정할 수 있습니다.

## 3.새 명령 항목 추가

첨부 파일의 命令词播报词协议列表V1_中文 파일을 엽니다.

![그림 18](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/18.png)

표의 가장 아래쪽에 새로운 명령 항목을 추가하며, 여기서는 “打扫房间” 명령어를 새로 추가하는 것을 예로 듭니다.

![그림 19](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/19.png)

여기서는 기능 유형을 “命令词” 로 선택하고, 재생 모드는 “主” 로 설정해야 합니다. 그래야 “打扫房间” 을 인식한 후 “好的” 를 능동적으로 재생합니다.

![그림 20](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/20.png)

다음으로 전송 프로토콜을 알아보겠습니다. 데이터의 1 번째와 2 번째 자리는 데이터 프레임 헤더로 수정할 필요가 없습니다. 기능 유형을 명령어로 선택하면 전송 프로토콜에 따라 3 번째 데이터가 반드시 “00” 이어야 하며, 이는 명령이 “命令词” 인지 “播报语” 인지를 구분하기 위한 것입니다.

![그림 21](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/21.png)

4 번째 데이터는 명령어의 데이터 ID 이며, 이는 16 진수 데이터입니다. 앞 명령어의 ID 가 “8B” 이므로 이 자리는 “8C” 로 설정해야 합니다. 특수한 경우에는 데이터 ID 가 같을 수도 있는데, 예를 들어 아래 두 명령어의 반환 결과가 동일한 경우입니다.

![그림 22](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/22.png)

프로토콜의 5 번째 자리는 “EE” 로 고정되어 있으며 마찬가지로 수정할 필요가 없습니다. 표에서는 전송 프로토콜과 수신 프로토콜을 일치시켜야 합니다.

![그림 23](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/23.png)

수정을 마친 후 저장하고, 이어서 “1.2 펌웨어 제작” 의 단계에 따라 표를 웹사이트에 가져옵니다. 이미 펌웨어를 한 번 제작한 경우라면 이전 프로젝트에서 “상속” 버튼을 클릭하여 매개변수 구성 단계를 생략할 수 있습니다

![그림 24](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/24.png)

펌웨어를 다시 제작한 후에는 펌웨어를 음성 인터랙션 모듈에 플래싱해야 하며, 이렇게 하면 새로운 명령 항목을 추가할 수 있습니다.

## 4.새 재생 문구 추가

첨부 파일의 命令词播报词协议列表V1_中文 파일을 엽니다.

![그림 25](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/25.png)

표의 가장 아래쪽에 새로운 항목을 추가하며, 여기서는 “现在是晚上” 재생 문구를 새로 추가하는 것을 예로 듭니다.

![그림 26](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/26.png)

여기서는 기능 유형을 “播报语” 로 선택하고, 재생 모드는 “被” 로 설정해야 합니다.

![그림 27](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/27.png)

다음으로 전송 프로토콜을 알아보겠습니다. 데이터의 1 번째와 2 번째 자리는 데이터 프레임 헤더로 수정할 필요가 없습니다. 기능 유형을 재생 문구로 선택하면 전송 프로토콜에 따라 3 번째 데이터가 반드시 “FF” 이어야 하며, 이는 명령이 “播报语” 임을 구분하기 위한 것입니다.

![그림 28](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/28.png)

4 번째 데이터는 명령어의 데이터 ID 이며, 이는 16 진수 데이터입니다. 앞 재생 문구의 ID 가 “8B” 이므로 이 자리는 “8C” 로 설정해야 합니다.

프로토콜의 5 번째 자리는 “EE” 로 고정되어 있으며 마찬가지로 수정할 필요가 없습니다. 표에서는 전송 프로토콜과 수신 프로토콜을 일치시켜야 합니다.

![그림 29](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/29.png)

수정을 마친 후 저장하고, 이어서 “1.2 펌웨어 제작” 의 단계에 따라 표를 웹사이트에 가져옵니다. 이미 펌웨어를 한 번 제작한 경우라면 이전 프로젝트에서 “상속” 버튼을 클릭하여 매개변수 구성 단계를 생략할 수 있습니다.

![그림 30](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/30.png)

펌웨어를 다시 제작한 후에는 펌웨어를 음성 인터랙션 모듈에 플래싱해야 하며, 이렇게 하면 새로운 명령 항목을 추가할 수 있습니다.



