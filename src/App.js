import { useEffect, useState } from "react";
import Wordle from "./components/Wordle";
import Header from "./components/Header";

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

  

  return (
    <div className="App">
      <Header />
      {/* {solution && <div>Solution is: {solution}</div>} shows the solution word*/}
      {solution && <Wordle solution={solution} />}

      
    </div>
  );
}

export default App;

//type `json-server ./data/db.json --port 3001` in terminal to start data server
