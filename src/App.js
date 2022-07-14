import { useEffect, useState } from "react";

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
      <div className="header">
        <h1 className="title">Wordle Project</h1>
      </div>
      {/* {solution && <div>Solution is: {solution}</div>} shows the solution word*/}
     
    </div>
  );
}

export default App;
