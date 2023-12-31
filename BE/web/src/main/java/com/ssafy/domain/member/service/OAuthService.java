package com.ssafy.domain.member.service;

import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.ssafy.Exception.message.ExceptionMessage;
import com.ssafy.Exception.model.TokenCheckFailException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

@Slf4j
@Service
public class OAuthService {
    public String getKakaoAccessToken(String code){
        String accessToken = "";
        String reqURL = "https://kauth.kakao.com/oauth/token";
        try{
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            // POST 요청을 위해 기본값이 false인 setDoOutput을 true로 설정
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json; utf-8");
            conn.setDoOutput(true);
            log.info("url push");
            // POST 요청에 필요로 요구하는 파라미터를 스트림을 통해 전송
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
            StringBuilder sb = new StringBuilder();
            //`https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}&redirect_uri=${REDIRECT_URI}&code=${CODE}`
            sb.append("?grant_type=authorization_code");
            sb.append("&client_id=cd0c9cf0cf49dae9a987aebb769ee0d6");
            sb.append("&redirect_uri=http://localhost:3000/auth/kakao/callback");
            sb.append("&code="+code);
            bw.write(sb.toString());
            bw.flush();
            log.info("url push finish");
            /*
               // POST 요처에 필요로 요구하는 파라미터를 스트림을 통해 전송
            BufferedWriter bw = new BufferedWriter((new OutputStreamWriter(conn.getOutputStream())));
            StringBuilder sb = new StringBuilder();
            sb.append("grant_type=authorization_code");
            sb.append("&client_id={code}");
            sb.append("&redirect_uri=http://localhost:8080/api/oauth/kakao");
            sb.append("&code=" + code);
            bw.write(sb.toString());
            bw.flush();
             */
            // 결과 코드가 200이면 성공
            int responseCode = conn.getResponseCode();
            log.info("responseCode: {}", responseCode);

            // 요청을 통해 얻은 JSON 타입의 Response 메시지 읽기
            String result = getRequestResult(conn);

            // Gson 라이브러리에 포함된 클래스로 JSON파싱 객체 생성
            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);

            accessToken = element.getAsJsonObject().get("access_token").getAsString();

            log.info("access_token : " + accessToken);

            bw.close();
        }catch(IllegalArgumentException e){
            throw new TokenCheckFailException(ExceptionMessage.TOKEN_NOT_FOUND);
        } catch (MalformedURLException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return "";
    }

    public String getRequestResult(HttpURLConnection conn) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "utf-8"));
        StringBuilder sb = new StringBuilder();
        String response = null;
        while((response = br.readLine()) != null){
            sb.append(response.trim());
        }
        log.info(response.toString());
        return response.toString();
    }
}
