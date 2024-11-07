# 📘 Flip Card로 효과적으로 학습하는 기술면접 핸드북

플립 카드를 사용해 CS 개념을 정리하여 공부할 수 있는 기술면접 핸드북입니다.

배포 URL: https://nfe-1-1-3-tech-log.vercel.app/

## 🎇프로젝트 개요

TechLog는 CS 개념을 카테고리별로 정리하고, 여러 사용자들과의 채팅을 통해 오개념이나 부족한 개념을 보충하며 기술 면접을 준비할 수 있는 웹사이트입니다. <br />

주로 취업 준비생, 이직을 고려하는 개발자, 면접관(Interviewer)이 사용할 것으로 기대됩니다. <br />

사용자는 자신이 등록한 질문과 답변을 직접 추가할 수 있으며, 다른 사용자들이 플립 카드 형식으로 등록한 질문과 답변을 통해 기술 면접에서 자주 나오는 질문과 꼭 알아야 할 개념을 카드 뿐만 아니라, 실시간 채팅을 통해 공유하고 대비할 수 있습니다.

## 📃목차

- [프로젝트 개요](#프로젝트-개요)
- [프로젝트 구성원](#프로젝트-구성원)
- [주요 기능](#주요-기능)
- [기술 스택](#기술-스택)
- [폴더 구조](#폴더-구조)
- [설치 및 실행 방법](#설치-및-실행-방법)
- [개발 기간](#개발-기간)
- [트러블 슈팅](#트러블-슈팅)
- [향후 개선 사항](#향후-개선-사항)
- [팀원 소개 및 느낀점](#팀원-소개-및-느낀점)

## 👩🏻‍💻프로젝트 구성원

|                                                    Backend                                                    |                                                  Backend                                                  |                                                  Backend                                                  |                                                   Frontend                                                   |                                                  Frontend                                                   |
| :-----------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------: |
|                                                  **김주영**                                                   |                                                **최효종**                                                 |                                                **홍유진**                                                 |                                                  **이주환**                                                  |                                                 **함민혁**                                                  |
| [<img src="https://github.com/kimjuyoung99.png" width="300"> <br/> @juyoung](https://github.com/kimjuyoung99) | [<img src="https://github.com/bluedog129.png" width="300"> <br/> @hyujong](https://github.com/bluedog129) | [<img src="https://github.com/youjin-hong.png" width="300"> <br/> @yujin](https://github.com/youjin-hong) | [<img src="https://github.com/LeeJuHwan777.png" width="300"> <br/> @juhwan](https://github.com/LeeJuHwan777) | [<img src="https://github.com/miin-hyukkk.png" width="300"> <br/> @minhynk](https://github.com/miin-hyukkk) |

## 💡주요 기능

**✔️질문 및 답변 공유**

- 사용자가 익명으로 기술 면접 질문을 등록하고, 다른 사용자의 답변을 통해 면접 준비에 도움을 받을 수 있습니다.
- 질문 목록은 main 페이지에서 Grid 형식으로 제공되며, 카드를 클릭 시 카드 뒤집기 애니메이션을 통해 답변이 표시됩니다.

**✔️질문, 답변 등록 기능**

- 사용자들이 자신의 질문/답변을 쉽게 등록할 수 있도록 간단한 등록 모달을 제공하고 있으며, 질문과 답변 모두 작성 후 한 번에 등록합니다.
<img src="https://github.com/user-attachments/assets/3676dd6e-7b7b-47ce-9e0b-81f02ce3323e" width="500" />

<img src="https://github.com/user-attachments/assets/070971cb-b877-44e0-a5d1-037497cb1bb6" width="500" />

**✔️카드 flip 효과를 통한 직관적인 답변 확인**

- 사용자가 질문을 클릭하면 카드가 뒤집히면서 답변이 나타나는 시각적인 효과를 통해 학습 효과를 높일 수 있습니다.

<img src="https://github.com/user-attachments/assets/a3befe7d-40d0-4813-b09d-04bd6e432bb7" width="500"/>

**✔️질문 답변 및 상세 보기**

- 답변을 확인 후, 더 자세한 정보를 원할 경우 "상세보기" 버튼을 클릭하여 해당 질문에 대한 상세 답변을 확인할 수 있습니다.

**✔️다른 사용자들과 실시간 채팅**

- 각 카드의 상세 페이지에서 실시간으로 여러 사용자들과 채팅을 통해 소통하며 정보를 공유하고 얻을 수 있습니다.

<p><img src="https://github.com/user-attachments/assets/6416ce43-d0e4-4858-b083-b7535f174919" width="500"/>

**✔️마이페이지 기능**

- 회원가입, 로그인을 통해 글을 쓰거나/삭제/수정 기능을 이용할 수 있으며, 마이페이지를 통해 자신이 쓴 카드 리스트를 관리할 수 있습니다.

<img src="https://github.com/user-attachments/assets/ba75af85-b9db-4ab3-bed4-be0fc9e6a1f3" width="500"/>

<br />

## 🛠기술 스택

### 📌Frond-end

<div style={{display: "flex"}}>
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white">
<img src="https://img.shields.io/badge/Styled--Components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white">
<img src="https://img.shields.io/badge/React--Query-FF4154?style=for-the-badge&logo=React-Query&logoColor=white">
<img src="https://img.shields.io/badge/Zustand-181717?style=for-the-badge&logo=Zustand&logoColor=white">
<img src="https://img.shields.io/badge/Socket.IO_Client-010101?style=for-the-badge&logo=Socket.io&logoColor=white">
</div>

### 📌Back-end

<div style={{display: "flex"}}><img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white">
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
<img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=Express&logoColor=white">
<img src="https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=Socket.io&logoColor=white">
<img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white"></div>

### 📌버전 관리 및 협업 도구

<div style={{display: "flex"}}>
<img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white">
<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white">
<img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white">
<img src="https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=Slack&logoColor=white">
<img src="https://img.shields.io/badge/Zoom-2D8CFF?style=for-the-badge&logo=Zoom&logoColor=white">
</div>

<br />

## 📁폴더 구조

<details>
  <summary>최상위 구조</summary>
  <pre><code>
  NFE1-1-3-techLog/
  ├──.github
  ├──BackEnd
  ├──frontend
  ├──.gitignore
  ├──.prettierrc
  ├──.package-lock.json
  ├──.package.json
  └──README.md
  </code></pre>
</details>
<details>
  <summary>프론트엔드 디렉토리 구조</summary>
<pre><code>
src/
│
├── components/
│   ├── common/
│   │   ├── Button.js
│   │   ├── Input.js
│   │   └── ...
│   │
│   ├── layout/
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   └── ...
│   │
│   └── feature/
│       ├── UserProfile.js
│       ├── ProductList.js
│       └── ...
│
├── pages/
│   ├── Home.js
│   ├── About.js
│   ├── Contact.js
│   └── ...
│
├── hooks/
│   ├── useForm.js
│   ├── useAPI.js
│   └── ...
│
│
├── api/
│   ├── auth.js
│   └── ...
│
│
├── styles/
│   ├── global.css
│   ├── variables.css
│   └── ...
│
├── assets/
│   ├── images/
│   ├── fonts/
│   └── ...
│
└── App.js
</code></pre>
</details>
<details>
  <summary>백엔드 디렉토리 구조</summary>
  <pre><code>
root/
│
├── backend/
│   ├── controllers/
│   │   └── users                 # 사용자 관련 로직 처리
│   │   └── post                  # 게시물 관련 로직 처리
│   │   └── comment               # 실시간 채팅 관련 로직 처리
│   ├── middlewares/
│   │   └── auth.js               # 사용자 관련 인증 처리 미들웨어
│   ├── models/
│   │   └── comment.js            # 채팅에 대한 Mongoose 스키마
│   │   └── User.js               # 사용자에 대한 Mongoose 스키마
│   │   └── Post.js               # 게시물에 대한 Mongoose 스키마
│   ├── routes/
│   │   └── commentRoutes.js      # 댓글 관련 라우터
│   │   └── userRoutes.js         # 회원 관련 라우터
│   │   └── postRoutes.js         # 게시물 관련 라우터
│   ├── websocket/
│   │   └── websocketServer.js    # socket.io 채팅 핸들러
│   ├── app.js                    # Express 애플리케이션 설정
│   ├── server.js                 # 서버 진입점
│   └── .env                      # 환경 변수 (예: DB 연결 문자열)
│
└── frontend/                     # 프론트엔드 디렉토리 (리액트)
  </code></pre>
</details>

<br />

## 🔄 User Flow

<img src="https://ifh.cc/g/QCJzpv.jpg" />

**주요 사용자 흐름**<br />

1. 비로그인 사용자: 카드 열람 및 회원가입 가능
2. 로그인 사용자: 카드 작성/수정/삭제, 실시간 채팅 참여, 마이페이지 이용 가능
3. 마이페이지: 자신이 작성한 카드 관리 가능

<br />

## 📊 Database Schema

<img src="https://ifh.cc/g/aasd7P.png" />

**Collection**<br />

1. user
   - 사용자 정보 관리
   - 사용자 id(username), 비밀번호(password) 저장
2. post
   - 질문과 답변 정보 관리
   - 제목(title), 카테고리(category), 짧은 답변(shortAnswer), 긴 답변(detailedAnswer), 작성자 id(user 스키마의 objectId), 작성 시간(createdAt), 수정시간(updatedAt) 저장
3. comment
   - 실시간 채팅 메세지 저장
   - 작성자id(userId), 글id(postId), 댓글내용(content), 댓글 업로드 시간(createdAt) 저장

<br />

## 🚀설치 및 실행 방법

### 설치

1. **저장소 복제하기**

```
git clone https://github.com/prgrms-fe-devcourse/NFE1-1-3-techLog.git
```

2. **프론트엔드, 백엔드, 그리고 루트 디렉토리에 대한 종속성 설치**

```
// 루트 디렉토리
npm install

// 프론트엔드 디렉토리
cd frontend
npm install

// 백엔드 디렉토리
cd Backend
npm install
```

3. **환경 변수 설정**

- frontend, Backend 상단 디렉토리에 .env 파일 생성
- Backend: mongoDB 주소, secretKey
- frontend: 백엔드 도메인 주소

4. **개발 서버 시작**

```
// 프론트엔드 디렉토리
npm run start

// 백엔드 디렉토리
nodemon server.js or node server.js or npm run server
```

<br />

## 📆개발 기간

- 기획: 2024.10.17~2024.10.24
- 개발: 2024.10.25~2024.11.6

<br />

## 🛠트러블 슈팅

노션 링크 or pdf(ppt) 첨부

<br />

## 🔧향후 개선 사항

이건 이슈 정리하면서 하면 될 듯..

<br />

## 👥팀원 소개 및 느낀점

<details>
  <summary>이주환 (프론트엔드)</summary>
    <div markdown="1">
    <ul>
      <li>작성 예정</li>
      <li></li>
    </ul>
  </div>
</details>
<details>
  <summary>함민혁 (프론트엔드)</summary>
    <div markdown="2">
    <ul>
      <li>작성 예정</li>
      <li></li>
    </ul>
  </div>
</details>
<details>
  <summary>김주영A (백엔드)</summary>
    <div markdown="3">
    <ul>
      <li>작성 예정</li>
      <li></li>
    </ul>
  </div>
</details>
<details>
  <summary>최효종 (백엔드)</summary>
    <div markdown="4">
    <ul>
      <li>작성 예정</li>
      <li></li>
    </ul>
  </div>
</details>
<details>
  <summary>홍유진 (백엔드)</summary>
    <div markdown="5">
    <ul>
      <li>작성 예정</li>
      <li></li>
    </ul>
  </div>
</details>
