import Bee from "./bee";
import { useState, useCallback, useEffect } from "react";
import "./canvas.css";

const Canvas = ({ width, height }) => {
  const [canvas, setCanvas] = useState();
  const [context, setContext] = useState();

  const canvasCallback = useCallback((node) => {
    if (node) {
      setCanvas(node);
    }
  }, []);

  useEffect(() => {
    if (canvas) {
      setContext(canvas.getContext("2d"));

      canvas.width = width;
      canvas.height = height;
    }
  }, [canvas]);

  if (context) {
    // Game loop
    // let fps = 60;
    // let now;
    // let then = Date.now();
    // let delta;

    const bee = new Bee(context, canvas.width, canvas.height);
    const gameLoop = () => {
      // let interval = 1000 / fps;
      window.requestAnimationFrame(gameLoop);

      // now = Date.now();
      // delta = now - then;

      // if (delta > interval) {
      //   then = now - (delta % interval);

      bee.move();
      // }
    };
    window.requestAnimationFrame(gameLoop);
    //Game loop end
  }

  return <canvas id="canvas" ref={canvasCallback} />;
};

export default Canvas;
