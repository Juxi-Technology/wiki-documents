---
title: 02 · 환경 준비
---

# 02 · 환경 준비

> **이전**: [01-Overview](01-Overview.md)
> **다음**: [03-Deployment](03-Deployment.md)

Docker를 설치하고, 중국 본토 네트워크를 설정하고, 하드웨어를 연결합니다. **이 문서를 끝내지 않으면 다음 문서의 내용을 실행할 수 없습니다.**

---

## 1. Docker 설치

이미 설치되어 있다면 건너뛰어도 됩니다. 먼저 확인하세요:

```bash
docker --version
```

설치하지 않았다면:

```bash
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER
```

**마지막 명령을 실행한 뒤에는 다시 로그인해야 합니다**(로그아웃 후 재로그인 또는 재부팅). 그러지 않으면 `docker` 명령에서
권한 오류가 발생합니다. 확인:

```bash
docker run --rm hello-world
```

---

## 2. 중국 본토 미러 가속기 설정 ⚠️ 중국 본토 사용자 필수

**중국 본토에서는 Docker Hub 직접 연결이 타임아웃되므로**, 가속기를 설정하지 않으면 어떤 이미지도 받을 수 없습니다.

`/etc/docker/daemon.json`을 편집합니다(없으면 새로 만듭니다):

```json
{
    "registry-mirrors": [
        "https://docker.m.daocloud.io",
        "https://docker.1ms.run",
        "https://docker.xuanyuan.me"
    ]
}
```

Docker를 재시작합니다:

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```

적용 여부 확인:

```bash
docker info | grep -A4 "Registry Mirrors"
```

> ⚠️ 인터넷에 돌아다니는 미러 주소 중 상당수는 이미 작동하지 않습니다(중국과학기술대, 넷이즈, `dockerproxy.com` 모두 서비스가 종료되었습니다).
> 오래된 글을 그대로 따라 하지 마세요. 위 세 개는 2026년 9월 실측에서 사용 가능한 것을 확인한 주소입니다.

---

## 3. 하드웨어 준비

### 3.1 로봇 연결

1. SO-101 로봇 암의 서보를 USB 어댑터 보드를 통해 컴퓨터에 연결합니다
2. 카메라를 USB에 연결합니다(RealSense를 사용한다면 USB 3.0 포트에 연결)

### 3.2 시리얼 포트 권한 ⚠️ 중요

설정하지 않으면 **컨테이너에서 디바이스가 보이지 않습니다**:

```bash
sudo usermod -aG dialout $USER
```

**이 설정도 다시 로그인해야 적용됩니다.**

### 3.3 디바이스 인식 확인

```bash
ls /dev/ttyACM* /dev/ttyUSB*    # 서보 시리얼 포트
ls /dev/video*                   # 카메라
```

디바이스 노드가 보이면 시스템이 인식한 것입니다.

---

## 4. Hugging Face 미러 설정 ⚠️ 중국 본토 필수

**중국 본토에서는 `huggingface.co`에 전혀 접속할 수 없는데**, 사전 학습된 모델을 로드하려면 반드시 필요합니다.

컨테이너를 시작할 때 다음 환경 변수를 추가하세요:

```bash
-e HF_ENDPOINT=https://hf-mirror.com
```

`scripts/run.sh`에는 이미 기본으로 설정되어 있습니다. 완전 오프라인이라면 `-e HF_HUB_OFFLINE=1`을 추가하세요.

---

## 체크리스트

다음 문서로 넘어가기 전에 다음 항목이 모두 통과했는지 확인하세요:

```bash
docker --version                       # Docker 설치 완료
docker info | grep -A4 "Registry Mirrors"   # 가속기 적용됨
groups | grep dialout                  # 시리얼 포트 권한 설정 완료(다시 로그인 후)
ls /dev/ttyACM*                        # 디바이스 인식됨
```

---

> **다음**: [03-Deployment](03-Deployment.md) — 이미지 다운로드, 컨테이너 시작
