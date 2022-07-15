import { useEffect, useState } from "react";
import Wordle from "./components/Wordle";

function App() {
  const [solution, setSolution] = useState(null)

  useEffect(()=> {
    fetch('http://localhost:3001/solutions')
    .then(res => res.json())
    .then(json => {
      const randomSolution = json[Math.floor(Math.random() * json.length)]
      setSolution(randomSolution.word)
    })
  }, [setSolution]) 

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div className="App">
      <div className="header">
        <h1 className="title">Wordle Project</h1>
        <div>
          <button onClick={refreshPage}>Click to Reload</button>
        </div>
      </div>
      {/* {solution && <div>Solution is: {solution}</div>} shows the solution word*/}
      {solution && <Wordle solution={solution} />}

      
    </div>
  );
}

export default App;

//type `json-server ./data/db.json --port 3001` in terminal to start data server
