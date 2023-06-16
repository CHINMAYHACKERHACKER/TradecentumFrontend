import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
const USERSESSION = () => {

    const [duration, setDuration] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        let startTime = new Date().getTime();

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                setIsActive(false);
                sendSessionData();
            } else {
                setIsActive(true);
            }
        };

        const sendSessionData = () => {
            const currentTime = new Date().getTime();
            const elapsedTime = currentTime - startTime;

            // Convert elapsed time to hours, minutes, and seconds
            const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
            const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

            setDuration({ hours, minutes, seconds });

            // Send the duration to the backend
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/session`, { duration: elapsedTime })
                .then(response => {
                    console.log('Duration sent to the server');
                })
                .catch(error => {
                    console.error('Error sending duration:', error);
                });
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);
    return duration;

}

export default USERSESSION;