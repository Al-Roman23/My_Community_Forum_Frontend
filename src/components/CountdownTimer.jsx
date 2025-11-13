import { useEffect, useState } from "react";

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft(null);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / (1000 * 60)) % 60);
      const seconds = Math.floor((distance / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (!timeLeft) {
    return <span className="text-red-500 font-semibold">Event Started</span>;
  }

  return (
    <div className="flex gap-2 mt-2">
      <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs text-center">
        {timeLeft.days}d
      </div>
      <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs text-center">
        {timeLeft.hours}h
      </div>
      <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs text-center">
        {timeLeft.minutes}m
      </div>
      <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs text-center">
        {timeLeft.seconds}s
      </div>
    </div>
  );
};

export default CountdownTimer;
