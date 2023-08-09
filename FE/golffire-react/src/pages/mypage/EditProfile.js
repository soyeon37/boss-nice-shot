import { React, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

import { reissueToken } from "../../setup/user-auth/UserAuth";
import MyPageNavbar from "./MyPageNavbar";
import "./MyPage.css";

import {
    Button,
} from "@chakra-ui/react";

function EditProfile() {
    const { state } = useLocation();
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    const [nickname, setNickname] = useState("");

    const navigate = useNavigate();

    // 닉네임 중복 검사
    const handleCheckNickname = () => {
        console.log("nickname: ", nickname); // Debug !!
        const data = {
            nickname: nickname
        }
        const apiUrl = process.env.REACT_APP_SERVER_URL + "/members/checkNickname"
        axios
            .post(apiUrl, data)
            .then((response) => {
                if (response.data.data.resultMessage === "FAIL") {
                    console.log("닉네임이 중복되었습니다.");
                    alert("이미 존재하는 닉네임입니다.");
                } else {
                    console.log("유효한 닉네임입니다.");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            })
    }

    // 사용자 정보 수정 테스트용 코드 - 함소연
    const testPut = () => {
        const data = {
            nickname: "햄햄햄",
            teeBox: "RED",
            topScore: 80,
            averageScore: 90,
            level: "더블 플레이어",
            image: "banana.jpg",
            introduction: "하이욤"

        }

        const apiUrl = process.env.REACT_APP_SERVER_URL + '/members/update';
        console.log(cookies.access_token);
        axios.put(apiUrl, data)
            .then((response) => {
                console.log(response.data); // 서버에서 반환된 데이터
                const statusCode = response.status;
                console.log('HTTP status code:', statusCode); // HTTP 상태 코드
            })
            .catch((error) => {
                console.error('Error:', error); // 오류 처리
                if (error.response) {
                    console.log('HTTP status code:', error.response.status); // HTTP 상태 코드
                    // HTTP 상태 코드로 토큰 만료 여부 확인
                    if (error.response.status === 401) {
                        console.log('Access Token has expired.');

                        // 토큰 재발급 등의 로직 수행
                        callReissueToken();
                    }

                }
            });
    }

    const callReissueToken = async () => {
        console.log("EditProfile - callReissueToken");
        const isSuccess = await reissueToken(
            cookies = { cookies },
            setCookie = { setCookie },
            removeCookie = { removeCookie },
            navigate = {navigate},
            );
        if (isSuccess) {
            console.log("토큰 재발급 및 로그인 연장 성공");
        } else {
            console.log("실패 후 로그아웃 진행됨");
        }
    };

    return (
        <div id="MyPage">
            <MyPageNavbar />
            <div id="EditProfile">
                <div id="edit-pic">
                    <div id="pic-circle">
                        큰 사진 들어가는 곳
                    </div>
                    <div id="pic-button">
                        <button>사진 변경</button>
                    </div>
                </div>
                <div id="edit-info">
                    <div id="edit-title">
                        정보 수정
                    </div>
                    <div id="edit-email">
                        이메일 변경은 불가하게 지정
                    </div>
                    <div id="edit-nickname">
                        닉네임, 검사 필요
                        <Button
                            onClick={handleCheckNickname}
                            style={{
                                height: "2.5rem",
                                width: "100%",

                                color: "black",
                                borderRadius: "30px",
                                background: "#B8F500",
                            }}
                            maxW={"sm"}
                            marginBottom={"2.5rem"}
                        >
                            검사
                        </Button>
                    </div>
                    <div id="edit-introduction">
                        자기소개 수정 가능
                    </div>
                    <div id="edit-golf-info1">
                        <div id="edit-golf-info1-1">최고타수</div>
                        <div id="edit-golf-info1-2">평균타수</div>
                    </div>
                    <div id="edit-golf-info2">
                        선호 티박스 수정
                    </div>
                    <div id="edit-button" onClick={testPut}>
                        <button>저장하기</button>
                    </div>
                </div>
            </div>

        </div >
    );
}

export default EditProfile;
