import React, { useEffect, useState } from 'react';

const CountDownOffer: React.FC = () => {
    // Set the end date to 10 days from today
    const offerEndDate = new Date().getTime() + 10 * 24 * 60 * 60 * 1000;
    
    // Define state for the countdown
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    // Update the countdown every second
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = offerEndDate - now;

            if (distance > 0) {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                setTimeLeft({ days, hours, minutes, seconds });
            } else {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [offerEndDate]);

    return (
        <div className="text-red-500">
            This offer ends in{' '}
            <span className="font-extrabold">
                {timeLeft.days}d: {timeLeft.hours}h: {timeLeft.minutes}m: {timeLeft.seconds}s
            </span>
        </div>
    );
};

export default CountDownOffer;
