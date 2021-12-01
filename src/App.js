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
  }, []);

  return (
    <div className="App" ref={appRef}>
      {loaded ? (
        <Canvas
          width={appRef.current.clientWidth}
          height={appRef.current.clientHeight}
        />
      ) : (
        <></>
      )}
      <div>
        Icons made by{" "}
        <a href="https://www.freepik.com" title="Freepik">
          Freepik
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </div>
  );
}

export default App;
