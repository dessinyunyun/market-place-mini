import React, { useEffect, useContext, useState } from "react";

const OnlineTime = ({ loggedTime }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  const loggedTimeParsing = new Date(loggedTime);
  const timeDifference = currentTime - loggedTimeParsing;
  const secondsOnline = Math.floor(timeDifference / 1000);
  const hours = Math.floor(secondsOnline / 3600);
  const minutes = Math.floor((secondsOnline % 3600) / 60);
  const seconds = secondsOnline % 60;
  console.log(currentTime);
  console.log(timeDifference);
  console.log(loggedTime);
  return (
    <>
      Waktu Online : {hours < 10 ? `0${hours}` : hours}:{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </>
  );
};

export default OnlineTime;
