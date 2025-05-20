import {BrowserRouter,Routes,Route} from "react-router-dom";
import Main from "./pages/Main"
import './App.css';
import IdleTimer from "./components/Session";



const App = () => {
    return (
        <>
            <IdleTimer
                idleLimitSeconds={30*60}
                clientId={sessionStorage.getItem('clientId')}
                onTimeout={async () => {
                    try {
                        await fetch(`${process.env.REACT_APP_API_URL}/expireSession`, {
                            method: 'POST',
                            credentials: 'include', // 세션 쿠키 포함
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                clientId: sessionStorage.getItem('clientId')
                            })
                        });
                        sessionStorage.removeItem('clientId');
                        window.location.reload();
                    } catch (err) {
                        console.error('세션 만료 알림 실패:', err);
                    }

                    // 백엔드 알림 이후 프론트 리로드

                }}
            />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main />} />
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
