---
title: "라즈베리파이: 바이두 지도 API"
description: "1. 등록 방법"
---

# 라즈베리파이: 바이두 지도 API

**1.** **등록 방법**

百度地图 오픈 플랫폼 https://lbsyun.baidu.com/ 에 접속합니다

페이지 하단까지 스크롤합니다

지금 등록을 클릭합니다

![그림 1](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-Baidu-Map-API/19.jpg) 

개인 개발자가 되는 것을 권장합니다 (당일 신청하면 바로 사용할 수 있기 때문입니다)

안내에 따라 단계별로 완료하면 됩니다

![그림 2](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-Baidu-Map-API/20.jpg) 

**2. ak 획득**

우리가 사용하는 것은 web 서비스 중의 普通IP定位 이며, 문서는 아래 링크에서 확인할 수 있습니다.

https://lbsyun.baidu.com/index.php?title=webapi/ip-api

콘솔 을 클릭하고, 내 애플리케이션 을 선택하고, 애플리케이션 생성 을 선택합니다.

![그림 3](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-Baidu-Map-API/21.jpg) 

애플리케이션 이름은 아무렇게나 작성하고, 애플리케이션 유형은 서버 측 을 선택하고, 서비스를 활성화하고, 화이트리스트에 0.0.0.0/0 을 입력합니다.

![그림 4](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-Baidu-Map-API/22.jpg) 

제출 을 클릭하면 애플리케이션이 생성됩니다.

![그림 5](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-Baidu-Map-API/23.jpg) 

우리 애플리케이션의 ak 값을 복사합니다

![그림 6](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-Baidu-Map-API/24.jpg) 

프로그램에 붙여넣고 저장하면 百度地图를 통해 위치 정보를 읽을 수 있습니다.

![그림 7](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-Baidu-Map-API/25.jpg)

<RelatedProducts slugs="gps-beidou-module" />
