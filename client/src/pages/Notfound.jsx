import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";

const Notfound = () => {
  return (
    <div>
      <Player
        className="w-screen h-screen"
        autoplay
        loop
        src="https://assets7.lottiefiles.com/packages/lf20_2ibpmsby.json"
      ></Player>
    </div>
  );
};

export default Notfound;
