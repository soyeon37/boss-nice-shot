package com.ssafy.domain.sign.dto.request;

import com.ssafy.domain.sign.entity.TeeBox;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.Collections;
import java.util.List;

public record SignUpRequest (
    @Schema(description = "회원 아이디", example = "ssafy1234@ssafy.com")
    String memberId,
    @Schema(description = "회원 비밀번호", example = "1234")
    String password,
    @Schema(description = "회원 닉네임", example = "김싸피")
    String nickname,
    @Schema(description = "회원 티박스", example = "RED")
    TeeBox teeBox,
    @Schema(description = "회원 최고 스코어", example = "72")
    Integer topScore,
    @Schema(description = "회원 평균 스코어", example = "88")
    Integer averageScore,
    @Schema(description = "회원 레벨", example = "보기 플레이어")
    String level,
    @Schema(description = "회원 프로필", example = "apple.jpg")
    String image,
    @Schema(description = "회원 소개", example = "안녕하세요")
    String introduction
    ){}
