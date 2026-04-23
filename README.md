# 한중물류파트너 정적 웹사이트 (1차 구현본)

중국에서 제품을 수입해 한국으로 유통하는 기업 고객을 위한 정적 웹사이트입니다.  
서버 백엔드 없이 **HTML / CSS / JavaScript**만으로 구성했으며, GitHub Pages 배포를 기준으로 설계했습니다.

## 주요 목적

- 회사 소개 및 신뢰 확보
- 중국 수입/배송/통관/구매대행 서비스 안내
- 물류 계산기로 예상 원가/마진 확인
- 수입 신청/플랫폼 판매 신청 접수 동선 제공
- 문의 전환 유도

## 파일 구조

```text
/
  index.html
  services.html
  calculator.html
  import-request.html
  platform-request.html
  contact.html
  404.html
  README.md
  /assets
    /css
      style.css
    /js
      main.js
      calculator.js
    /images
      .gitkeep
```

> `assets/images`는 이미지 에셋을 넣기 위한 폴더입니다.

## 로컬에서 확인 방법

1. 저장소 클론 후 프로젝트 루트로 이동
2. `index.html`을 브라우저에서 직접 열거나, 간단한 정적 서버를 실행

예시(Python):

```bash
python3 -m http.server 8000
```

브라우저에서 `http://localhost:8000` 접속

## GitHub Pages 배포 방법

1. GitHub 저장소에 파일 푸시
2. 저장소 설정(Settings) → Pages 이동
3. Source를 배포 브랜치(`main` 또는 운영 브랜치)와 `/ (root)`로 지정
4. 저장 후 배포 URL 확인

## 경로 처리 원칙

- 페이지/리소스 링크를 상대경로(`./assets/...`, `./services.html`)로 통일
- GitHub Pages 루트 배포 시 경로 오류를 줄이도록 구성

## 커스텀 도메인 연결 시 주의사항

- 커스텀 도메인 사용 시 루트에 `CNAME` 파일 추가
- 도메인 연결 후 canonical URL/OG URL을 실제 도메인 기준으로 업데이트
- DNS 반영 시간 동안 접속이 불안정할 수 있음

## Google Forms Placeholder 교체 방법

현재 신청 페이지는 Placeholder URL을 사용합니다.

- `import-request.html`
  - 링크: `https://forms.google.com/your-import-form`
  - iframe 주석 영역의 `src` 교체
- `platform-request.html`
  - 링크: `https://forms.google.com/your-platform-form`
  - iframe 주석 영역의 `src` 교체

운영 시 권장 순서:
1. 링크 방식 먼저 적용
2. 필요 시 iframe 임베드 추가

## 계산기 수정 포인트

계산 로직은 `assets/js/calculator.js`에 분리되어 있습니다.

주요 수정 지점:
- `calculate(data)` : 계산식 변경
- `readFormData(formEl)` : 입력 항목 추가/삭제
- `formatKRW`, `formatPercent` : 표시 형식 변경
- `renderResult(result)` : 결과 항목 렌더링 방식 변경

## 참고

- 본 계산기는 사전 검토용 예상치입니다.
- 실제 관세/부가세/운송비는 품목과 운송 조건에 따라 달라질 수 있습니다.
