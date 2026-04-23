# AGENTS.md

## Project overview
이 프로젝트는 중국에서 제품을 수입해 한국에 유통하는 물류회사의 정적 웹사이트다.

목표:
- 회사 소개
- 서비스 소개
- 중국 물류 계산기 제공
- 중국 수입 신청 페이지 제공
- 중국 플랫폼 판매 신청 페이지 제공
- 문의 전환 유도

## Technical constraints
- 정적 사이트만 허용
- 백엔드 서버 사용 금지
- GitHub Pages 배포 기준으로 구현
- HTML, CSS, JavaScript 중심으로 작성
- 브라우저에서만 동작해야 함
- 자체 DB 저장 기능 구현 금지
- 신청 폼은 외부 폼 서비스 또는 mailto 링크 방식으로만 처리

## Development rules
- 파일 구조는 단순하게 유지
- 불필요한 라이브러리 추가 금지
- 유지보수가 쉬운 구조 우선
- 상대 경로를 사용해 GitHub Pages에서 깨지지 않게 구현
- 코드 중복 최소화
- 모바일 우선 반응형으로 작성
- 접근성과 기본 SEO 메타 태그 고려

## Design rules
- 한국어 사이트
- B2B 물류/무역 회사 느낌
- 신뢰감 있고 깔끔한 디자인
- 과한 애니메이션 금지
- 첫 화면에서 회사가 하는 일을 5초 안에 이해 가능해야 함
- 모든 주요 페이지에 문의 CTA 포함

## Page requirements
필수 페이지:
- index.html
- services.html
- calculator.html
- import-request.html
- sales-request.html
- contact.html

## Calculator rules
계산기는 순수 JavaScript로 구현한다.

입력값 예시:
- 상품 단가
- 수량
- 중국 내 배송비
- 국제배송비
- 관세율
- 부가세 적용 여부
- 기타 수수료
- 예상 판매가

출력값 예시:
- 총상품금액
- 예상 총원가
- 개당 원가
- 예상 마진
- 예상 마진율

## Form rules
수입 신청 / 판매 신청 폼은 정적 사이트 제약을 따른다.
- 자체 저장 기능 구현 금지
- 외부 폼 서비스 연동 가능
- 또는 mailto 방식 사용 가능
- 나중에 폼 처리 방식 교체가 쉽도록 마크업과 스크립트를 분리

## SEO/content rules
- 각 페이지에 title, meta description, canonical 고려
- H1은 페이지당 1개 유지
- 물류, 수입, 통관, 배송 관련 핵심 키워드를 자연스럽게 반영
- 과도한 텍스트보다 명확한 구조 우선

## GitHub Pages rules
- GitHub Pages에서 바로 배포 가능해야 함
- 빌드 없이 작동 가능한 구조 우선
- 404 및 경로 문제를 줄이도록 단순한 폴더 구조 유지
- 커스텀 도메인 연결을 고려해 README에 배포 절차 포함

## When making changes
작업 전:
1. 관련 파일 구조를 먼저 파악
2. 필요한 변경 범위를 최소화
3. 정적 사이트 제약을 위반하지 않는지 확인

작업 후:
1. 모바일 레이아웃 확인
2. 링크/경로 오류 확인
3. 계산기 동작 확인
4. GitHub Pages 배포 가능성 확인

## Output expectations
새 기능 추가 시:
- 어떤 파일을 추가/수정했는지 명확히 설명
- 변경 이유를 짧게 설명
- 필요하면 README도 함께 업데이트
