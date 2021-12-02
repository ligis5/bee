import Canvas from "./canvas/Canvas";
import "./App.css";
import { useRef, useEffect, useState } from "react";

function App() {
  const appRef = useRef();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (appRef) {
      setLoaded(true);
    }
    return () => setLoaded(false);
  }, [appRef]);

  return (
    <div className="App" ref={appRef}>
      {loaded ? (
        <Canvas
          width={appRef.current.clientWidth}
          height={appRef.current.clientHeight}
          parent={appRef.current}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
