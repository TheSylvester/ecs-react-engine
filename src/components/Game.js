import { useRef, useState } from "react";
import styled from "styled-components";

import useMousePosition from "../hooks/MousePosition";

const StyledPlayerDiv = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 50px;
  height: 50px;
  text-align: center;
  border-radius: 50%;
  background-color: red;
  border: 5px solid black;

  display: none;
`;

const StyledStartButton = styled.button`
  text-align: center;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  top: 50%;
  width: min-content;
`;

export function Game() {

  const [gameRunning, setGameRunning] = useState(false);

  const mousePosition = useMousePosition();

  let lastTime = 0;
  let lastMousePosition = {
    x: mousePosition.current.x,
    y: mousePosition.current.y
  };

  const playerRef = useRef(null);
  let playerPosition = { x: 0, y: 0 };
  let playerVelocity = { x: 0, y: 0 };


  const setPlayerPosition = (x, y) => {
    playerPosition = { x, y };
    playerRef.current.style.translate = `${x}px ${y}px`;
  };

  const update = (time) => {

    /* clock */
    let deltaTime = time - lastTime;

    /* controls */
    const deltaVector = {
      x: (mousePosition.current.x - lastMousePosition.x) / deltaTime,
      y: (mousePosition.current.y - lastMousePosition.y) / deltaTime
    };

    /* controls - physics */
    playerVelocity = {
      x: playerVelocity.x + deltaVector.x,
      y: playerVelocity.y + deltaVector.y
    };

    /* physics position, then render */
    setPlayerPosition(
      playerPosition.x + playerVelocity.x,
      playerPosition.y + playerVelocity.y
    );

    // save last frame's time and position
    lastTime = time;
    lastMousePosition.x = mousePosition.current.x;
    lastMousePosition.y = mousePosition.current.y;

    window.requestAnimationFrame(update);   // call again for the next frame as requestAnimationFrame is one-shot
  };


  const startGame = (e) => {
    setGameRunning(true);
    playerRef.current.style.display = "initial";
    lastMousePosition = { x: e.clientX, y: e.clientY };
    setPlayerPosition(e.clientX, e.clientY);

    window.requestAnimationFrame(update);
  };

  return (
    <div style={{ height: "100%" }}>
      <h1>GameX</h1>
      {!gameRunning &&
        <StyledStartButton onClick={startGame}>Start</StyledStartButton>}
      <StyledPlayerDiv ref={playerRef} />
    </div>
  );
}
