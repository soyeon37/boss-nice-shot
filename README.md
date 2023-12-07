# 사장님, 나이스 샷!
### "Web RTC를 이용한 실시간 골프 코칭 서비스"
> [사장님 , 나이스 샷! 서비스 이용하기](https://i9a309.p.ssafy.io/)

<br>

## **목차**

1️⃣ [프로젝트 기획 의도](##-프로젝트-기획-의도)
<br/>
2️⃣ [주요 기능](##-주요-기능)
<br/>
3️⃣ [기술 특이점](##-기술-특이점)
<br/>
4️⃣ [프로젝트 기획 의도](##-프로젝트-기획-의도)
<br/>
5️⃣ [기술 스택](##-기술-스택)
<br/>
6️⃣ [참여 인원 및 역할](##-참여-인원-및-역할)

<br>

## 프로젝트 기획 의도
- 점점 증가하는 **골프에 대한 대중의 관심**에 비해 골프를 배울 수 있는 방법은 한정적
- **비싼** 골프 코칭 비용을 감당할 수 없는 사람들을 위한 서비스의 필요성을 느낌
- **온라인으로 골프 자세를 교정** 받고 다른 사람과 이에 대해 논의할 수 있는 서비스 기획
- 더 나아가 **함께 골프를 즐길 수 있도록** 동행 모집 기능도 함께 제공

## 주요 기능
|구분|기능|설명|
|:---|:---|:---|
|1|솔루션기능|tensorflow.js 의 posenet 모델을 이용하여 웹캠의 실시간 영상에 관절 17지점을 인식해 출력합니다. 녹화된 영상을 MobileNet 보다 고성능의 ResNet50 모델로 분석하여 각 프레임에 관절 좌표를 추출하고 추출된 좌표를 바탕으로 스윙 궤적과 히트맵, 속도, 자세 등을 종합적으로 평가합니다.|
|2|코칭 / 러닝 기능|코칭룸과 러닝룸 중 하나를 택 하여 사용 가능합니다. 인원수, 제목, 내용 설정하여 화상 통화 방을 생성할 수 있으며 카메라, 화면, 소리 설정 등이 가능합니다. 카메라(필터 기능 포함), 화면 크기 조절(선택 시 메인스테이지로 이동) , 소리 크기 조절, 채팅(방에 참여한 구성원과 소통), 그리기(메인 스테이지에 송출되는 화면 위에 그림 그리기) 기능 등이 있습니다.|
|3|동행모집기능|온라인으로 함께 골프를 칠 동행자를 구하는 기능입니다. 동행을 모집, 신청할 수 있으며 채팅을 통해 다른 참여자들과의 소통할 수 있습니다.|
|4|알림|동행 신청 및 스터디 신청, 수락 현황과 정보를 쉽게 확인 할 수 있는 기능입니다.|
|5|골프장검색기능|골프장의 위치와 상세 정보를 안내하는 기능입니다. 검색어를 통해 검색이 가능하며 해당 골프장 정보를 활용해 동행 모집이 가능합니다.|

## 기술 특이점
### 솔루션기능
- tensorflow.js 의 posenet 을 활용하여 관절 17지점을 실시간으로 추출
- 측정된 관절의 변화량을 바탕으로 스탠스 / 하프스윙 / 풀스윙을 인식하고 평가
- 스윙영상 녹화 / 스윙자세분석 / 스윙속도분석 / 관절지점 히트맵 / Personalized Recommendation
- 인식된 체형을 기반으로 계산된 스윙 궤적의 타원방정식 추출 및 가시화

## 기술 스택
|분야|사용 기술 스택|
|:---|:---|
|Backend|Spring Boot, JPA, JWT, OAuth2, Spring Security|
|Frontend|React.js, Redux, openVidu|
|CI/CD|Jenkins|
|Server|Nginx, Docker|
|DB|MySQL, Redis, MongoDB|
|API|OpenPose, Kakao Auth, Kakao Map|
|Cloud|AWS S3|
|기타|Git, Jira, Notion, MatterMost, Figma|

## 참여 인원 및 역할
|분야|인원|
|:---|:---|
|Backend|김령은, 한라연, 함소연, 김성규|
|Frontend|김재아, 문요환, 함소연|
|CI/CD|김령은|