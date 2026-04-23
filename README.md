# 한중물류파트너 정적 웹사이트

중국에서 제품을 수입해 한국으로 유통하는 기업 고객을 위한 정적 웹사이트입니다.  
서버 백엔드 없이 **HTML / CSS / JavaScript**만 사용하며, GitHub Pages 배포를 기준으로 구성했습니다.

## 1) 사이트 목적 요약

- 회사 소개 및 신뢰 형성
- 중국 수입/배송/통관/국내 유통 연계 서비스 안내
- 물류 계산기로 예상 비용·원가·마진 사전 검토
- 수입 신청/판매 신청 접수 동선 제공 (Google Forms Placeholder)
- 상담 문의 전환

## 2) 페이지별 역할

- `index.html` : 핵심 메시지, 서비스 요약, 진행 흐름, 주요 CTA 진입
- `services.html` : 서비스 범위 상세 설명 및 서비스별 CTA 연결
- `calculator.html` : 브라우저 기반 예상 비용 계산
- `import-request.html` : 중국 수입 신청 안내 + Google Forms Placeholder
- `platform-request.html` : 중국 플랫폼 판매 신청 안내 + Google Forms Placeholder
- `contact.html` : 문의 채널/운영시간/문의 절차 안내
- `404.html` : 잘못된 경로 접근 시 홈 복귀 안내

## 3) 파일 구조

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

## 4) 로컬에서 확인하는 방법

아래 둘 중 하나를 사용하세요.

1. 파일 직접 열기: `index.html` 더블클릭
2. 로컬 서버 실행:

```bash
python3 -m http.server 8000
```

브라우저에서 `http://localhost:8000` 접속

## 5) Google Forms Placeholder 교체 방법

### 수입 신청 폼
- 파일: `import-request.html`
- 교체 대상:
  - 링크 버튼 `href="https://forms.google.com/your-import-form"`
  - 주석 처리된 iframe의 `src`

### 판매 신청 폼
- 파일: `platform-request.html`
- 교체 대상:
  - 링크 버튼 `href="https://forms.google.com/your-platform-form"`
  - 주석 처리된 iframe의 `src`

권장 운영 순서:
1. 링크 방식 먼저 적용
2. 필요 시 iframe 임베드 추가

## 6) GitHub Pages 업로드 및 배포 확인 절차

1. 저장소에 변경사항 커밋/푸시
2. GitHub 저장소 → **Settings → Pages** 이동
3. Source를 배포 브랜치와 `/ (root)`로 지정
4. 배포 URL 접속 후 아래 체크
   - 모든 메뉴 링크 정상 동작
   - 모바일 메뉴 열림/닫힘 동작
   - 계산기 입력/계산/초기화 동작
   - 신청 페이지 Google Forms 링크 정상 이동

## 7) 커스텀 도메인 연결 전 체크

- 루트에 `CNAME` 파일 추가 필요 여부 확인
- DNS(A/CNAME) 설정 값 검토
- canonical/OG URL을 실제 도메인 기준으로 정리
- HTTPS 적용 상태 확인

## 8) 계산기 로직 수정 포인트

파일: `assets/js/calculator.js`

- `readInput(formEl)` : 입력 항목 파싱/검증 수정
- `calculate(input)` : 계산식 수정
- `render(result)` : 결과 출력 포맷 수정
- `resetResult()` : 초기 표시값 수정

## 9) 유지보수 시 자주 수정할 파일

- 문구/CTA 수정: 각 HTML 파일
- 공통 디자인 수정: `assets/css/style.css`
- 메뉴/FAQ 인터랙션: `assets/js/main.js`
- 계산기 로직: `assets/js/calculator.js`
- 배포/운영 가이드: `README.md`

## 10) 참고

- 본 계산기는 사전 검토용 예상치입니다.
- 실제 비용은 품목, 통관 조건, 운송 환경에 따라 달라질 수 있습니다.
