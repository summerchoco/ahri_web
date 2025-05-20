import { useEffect } from 'react';

const IdleTimer = ({ idleLimitSeconds =   30*60 , onTimeout ,setClientId = sessionStorage.getItem('clientId') }) => {
    useEffect(() => {
        let lastActiveTime = Date.now();
        let isVisible = !document.hidden;


        const checkIdle = () => {
            if (!isVisible) return;
            const now = Date.now();
            const diffInSeconds = Math.floor((now - lastActiveTime) / 1000);
            if (diffInSeconds >= idleLimitSeconds) {
                onTimeout?.();
            }
        };

        const activityHandler = () => {
            if (isVisible) {
                lastActiveTime = Date.now();
            }
        };

        const interval = setInterval(checkIdle, 1000);

        ['mousemove', 'keydown', 'scroll', 'click', 'touchstart'].forEach(event =>
            window.addEventListener(event, activityHandler, true)
        );

        document.addEventListener('visibilitychange', () => {
            isVisible = !document.hidden;
            if (isVisible) lastActiveTime = Date.now();
        });

        return () => {
            clearInterval(interval);
            ['mousemove', 'keydown', 'scroll', 'click', 'touchstart'].forEach(event =>
                window.removeEventListener(event, activityHandler, true)
            );
        };
    }, [idleLimitSeconds, onTimeout, setClientId]);

    return null;
};

export default IdleTimer;
