import { useState } from "react"

const useWordle = (solution) => {

    const [turn, setTurn] = useState(0)
    const [currentGuess, setCurrentGuess] = useState("")
    const [guesses, setGuesses] = useState([])
    const [history, setHistory] = useState([])
    const [isCorrect, setIsCorrect] = useState(false)

    // formats a guess from the user into an array of letter objects
    const formatGuess = () => {

    }

    // adds a new guess to the guesses state
    // updates the isCorrect state if the guess is correct
    // add one to the turn state
    const addNewGuess = () => {

    }

    // handle keyup events and track current guess
    // if user presses enter, add the new guess
    const handleKeyup = ({ key }) => {
        
        //remove last character from string if Backspace pressed
        if ( key === 'Backspace') {
            setCurrentGuess((previous) => {
                return previous.slice(0, -1)
            })
            return
        }

        //test key pressed to regex pattern and guess is less than 5
        if (/^[A-Za-z]$/.test(key)) {
            if (currentGuess.length < 5) {
                setCurrentGuess((previous) => {
                    return previous + key
                })
            }
        }
    }

    return {turn, currentGuess, guesses, isCorrect, handleKeyup}
}

export default useWordle