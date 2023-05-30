import { useState, useEffect, useContext } from "react";
import { BookingInformation } from "./_app";

export function CountdownTimer() {
  const [bookingDetails, setBookingDetails] = useContext(BookingInformation);
  const [timeRemaining, setTimeRemaining] = useState({
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      let currentTime = new Date().getTime();
      let distance = bookingDetails.buyTimeout - currentTime;
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(interval);
      } else {
        setTimeRemaining({ minutes, seconds });
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <h2>
        <span>{timeRemaining.minutes}</span>:
        <span>
          {timeRemaining.seconds < 10 ? "0" + timeRemaining.seconds : timeRemaining.seconds}
        </span>
      </h2>
    </div>
  );
}
