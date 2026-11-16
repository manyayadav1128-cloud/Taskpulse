import { useEffect, useState } from 'react';

const format = (d) => d.toTimeString().slice(0, 8);

export default function Clock() {
  const [time, setTime] = useState(format(new Date()));

  useEffect(() => {
    const id = setInterval(() => setTime(format(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  return <div className="clock">{time}</div>;
}
