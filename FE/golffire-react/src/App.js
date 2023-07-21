import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';

import Navbar from './setup/routes-manager/Navbar';
import Main from './pages/main/Main'
import Solution from './pages/solution/Solution';
import Learning from './pages/learning/Learning';
import Golffield from './pages/golffield/Golffield';
import Accompany from "./pages/accompany/Accompany";
import Community from './pages/community/Community';
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  // cookie의 user 정보 확인
  const [cookies] = useCookies(['user']);
  // 로그인 여부를 나타내는 변수, false로 초기화
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // 로그인 여부를 확인하여 true로 바꾸는 함수
  useEffect(() => {
    // 로그인 정보가 있다면 true, 없다면 false로 만드는 코드
    setIsLoggedIn(!!cookies.user);
    // 추후 서버로 token 정보를 보내 유효한지 확인한 뒤 true로 만들기
  }, [cookies]);

  return (
    <ChakraProvider>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Routes>
            {/* 항상 route 가능 */}
            <Route path="/" element={<Main />} />
            <Route path="/Signup/" element={<Signup />} />
            <Route path="/Login/" element={<Login />} />
            <Route path="/golffield" element={<Golffield />} />

            {/* 로그인 후 route 가능 */}
            <Route
              path="/solution/"
              element={isLoggedIn ? <Solution /> : <Navigate to="/Login" />}
            />
            <Route
              path="/learning/"
              element={isLoggedIn ? <Learning /> : <Navigate to="/Login" />}
            />
            <Route
              path="/accompany/"
              element={isLoggedIn ? <Accompany /> : <Navigate to="/Login" />}
            />
            <Route
              path="/community/"
              element={isLoggedIn ? <Community /> : <Navigate to="/Login" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
