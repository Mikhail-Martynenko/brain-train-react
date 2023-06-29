import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {SessionStoreContext} from "../store/session";

const TimerSession = () => {
    const session = useContext(SessionStoreContext)
    const [timeLeft, setTimeLeft] = useState((session?.timer ?? 0) * 60);
    const navigate = useNavigate();
    const formatTime = (seconds: any) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    const countdown = () => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    };

    useEffect(() => {
        const timer = setInterval(countdown, 1000);

        if (timeLeft <= 0) {
            clearInterval(timer);
            navigate('/');
        }

        return () => {
            clearInterval(timer);
        };
    }, [timeLeft, navigate]);

    return (
        <div className="timer">
            {formatTime(timeLeft)}
        </div>
    );
};

export default TimerSession;
