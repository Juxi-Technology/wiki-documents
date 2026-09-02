---
title: 엣지 AI 배포 입문
description: Jetson 엣지 AI 배포 입문——PyTorch 모델을 TensorRT로, ONNX 내보내기와 추론 최적화, 일반적인 배포 경로와 트러블슈팅
keywords: [edge ai, tensorrt, onnx, 엣지 배포, jetson]
---

# 엣지 AI 배포 입문

> '학습 완료' 모델을 '엣지 디바이스에서 실행' 상태로 가져가는 개발자용. NVIDIA Jetson 플랫폼을 예로 듭니다.

## 1. 왜 엣지 배포가 필요한가?

| 비교 | 클라우드 추론 | 엣지 추론 |
|------|---------|---------|
| 지연 | 네트워크 왕복 50-500ms | 디바이스 로컬 <10ms |
| 개인정보 | 데이터가 클라우드로 | 데이터가 디바이스 밖으로 안 나감 |
| 비용 | 지속 GPU 비용 | 일회성 하드웨어 |
| 오프라인 | 단절 시 사용 불가 | 완전 오프라인 |

로봇(실시간 제어), 산업 검사(생산 라인 지연 민감), 개인정보 민감 시나리오(의료/보안)에서는 엣지 배포가 필수입니다.

## 2. 배포 경로 개요

```
PyTorch 모델
   │  torch.onnx.export
   ▼
ONNX 모델 ──► TensorRT Engine ──► 추론 앱
   │              │
   └──► TorchScript (JIT) ──► 추론 앱(간단 경로)
```

| 경로 | 가속 비율(네이티브 PyTorch 대비) | 적용 |
|------|------------------------|------|
| TorchScript | ~1.5-2x | 빠른 적용, 변경 적음 |
| ONNX Runtime | ~2-4x | 크로스 플랫폼, 생태계 좋음 |
| **TensorRT** | **5-10x** | 성능 우선, Jetson/엣지 최적 |

## 3. 빠른 시작: PyTorch → TensorRT

### 3.1 ONNX 내보내기

```python
import torch
# 안전한 로딩: weights_only=True는 텐서/단순 구조만 허용, 역직렬화 공격 방지
model = torch.load('model.pt', map_location='cuda', weights_only=True)
model.eval()
dummy = torch.randn(1, 3, 224, 224).cuda()
torch.onnx.export(
    model, dummy, 'model.onnx',
    input_names=['input'], output_names=['output'],
    opset_version=17,
)
```

### 3.2 ONNX → TensorRT Engine

```bash
# trtexec로 engine 변환(Jetson 보드에서 실행)
trtexec --onnx=model.onnx \
        --saveEngine=model.engine \
        --fp16 \
        --workspace=2048
```

### 3.3 Python 추론

```python
import tensorrt as trt
import pycuda.driver as cuda
import pycuda.autoinit
# engine 로드
with open('model.engine', 'rb') as f:
    engine = trt.Runtime(trt.Logger()).deserialize_cuda_engine(f.read())
context = engine.create_execution_context()
# (완전한 추론 코드: 입출력 버퍼 할당, execute_v2 실행)
```

## 4. 성능 체크리스트

- [ ] fp32 대신 `--fp16`(반정밀도) 사용 —— Jetson에서 대폭 가속
- [ ] 입력 해상도를 작업 허용 하한까지 낮추기
- [ ] `trtexec`로 실제 프레임률 확인
- [ ] 배치 처리(batch=1은 로봇 시나리오에서 보통 최적)
- [ ] 전원 모드 확인(`sudo nvpmodel -m 0` 풀파워 모드)

## 5. 자주 묻는 질문

**Q: TensorRT가 `Unsupported layer` 보고?**

**A:** 모델에 TensorRT가 지원하지 않는 연산자(동적 제어 흐름 등)가 있음. 대응: 새 TensorRT 버전, ONNX 단순화 도구(`onnx-simplifier`), opset 낮추기.

**Q: fp16 정밀도 영향이 큰가요?**

**A:** 대부분의 CV 모델은 거의 무손실. 검출/분할 태스크는 mAP 실제 비교 권장.

**Q: 메모리 부족(workspace)?**

**A:** tensorrt engine의 workspace 또는 입력 해상도 낮추기. Orin 16GB 버전이 여유 있음.

**Q: TensorRT인데도 느린가요?**

**A:** 실제로 GPU를 쓰는지 확인(`nvidia-smi` 관찰). GPU와 CPU 간 데이터 복사 반복이 없는지 확인.

---

## 관련 링크

- [Jetson Orin NX Super 개발 키트](/ko/products/jetson-orin-nx-super-kit)
- [JetPack 플래싱 및 시스템 설정](/ko/topics/jetpack-setup)
- [구현 지능 입문](/ko/topics/embodied-ai-intro)

## 기술 지원

- 📧 이메일：support@juxitech.com
- 🌐 공식 사이트：[www.juxitech.com](https://www.juxitech.com)
