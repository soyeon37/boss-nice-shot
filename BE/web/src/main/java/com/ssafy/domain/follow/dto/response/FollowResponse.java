package com.ssafy.domain.follow.dto.response;

import com.ssafy.common.TeeBox;
import com.ssafy.domain.follow.entity.Follow;

public record FollowResponse (String followeeId,
                              String followeeNickname,
                              String followeeLevel,
                              TeeBox followeeTeeBox){
    public static FollowResponse from(Follow follow) {
        return new FollowResponse(
                follow.getFollowee().getId(),
                follow.getFollowee().getNickname(),
                follow.getFollowee().getLevel(),
                follow.getFollowee().getTeeBox()
        );
    }
}