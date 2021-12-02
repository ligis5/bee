import Bee from "./bee";
import { useState, useCallback, useEffect } from "react";
import "./canvas.css";

const Canvas = ({ width, height, parent }) => {
  const [canvas, setCanvas] = useState();
  const [context, setContext] = useState();

  const canvasCallback = useCallback((node) => {
    if (node) {
      setCanvas(node);
    }
  }, []);

  
  const runCanvas = () => {


      const bee = new Bee(context, canvas.width, canvas.height, canvas)

      const adjustToScreenSize = () => {
        let difxBee = canvas.width / bee.currentPos.x;
          let difyBee = canvas.height / bee.currentPos.y;
          let difxDir = canvas.width / bee.direction.x;
          let difyDir = canvas.height / bee.direction.y;
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        bee.width = parent.clientWidth;
        bee.height = parent.clientHeight;
        
          bee.currentPos = {x: canvas.width / difxBee, y: canvas.height /difyBee}

          
          bee.direction = {x: canvas.width / difxDir, y: canvas.height /difyDir}
      }


      // Game loop
      let fps = 60;
      let now;
      let then = performance.now();
      let delta;
      const gameLoop = () => {
        let interval = 1000 / fps;
        
  
        now = performance.now();
        delta = now - then;
  
        if (delta > interval) {
          then = now - (delta % interval);
          adjustToScreenSize()
        bee.move();
        
        }
        window.requestAnimationFrame(gameLoop);
      };
      window.requestAnimationFrame(gameLoop);
      //Game loop end
}

  useEffect(() => {
    if (canvas) {
      setContext(canvas.getContext("2d"));
      canvas.width = width;
      canvas.height = height;
    }
  }, [canvas]);

  useEffect(() => {
    if(context){
      runCanvas()
    }
  }, [context])

  
  return <canvas id="canvas" ref={canvasCallback} />;
};

export default Canvas;
