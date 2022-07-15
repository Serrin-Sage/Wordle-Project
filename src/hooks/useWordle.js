import { useState } from "react"

const useWordle = (solution) => {

    const [turn, setTurn] = useState(0)
    const [currentGuess, setCurrentGuess] = useState("")
    const [guesses, setGuesses] = useState([...Array(6)])
    const [history, setHistory] = useState([])
    const [isCorrect, setIsCorrect] = useState(false)
    const [usedKeys, setUsedKeys] = useState({})

    // formats a guess from the user into an array of letter objects
    const formatGuess = () => {
       let solutionArray = [...solution]
       let formattedGuess = [...currentGuess].map((letter) => {
         return { key: letter, color: 'grey'}
       })

       // find any green letters (correct placement)
       formattedGuess.forEach((letter, i) => {
         if (solutionArray[i] === letter.key) {
            formattedGuess[i].color = 'green'
            solutionArray[i] = null
         }
       })

       // find any yellow colors (incorrect placement)
       formattedGuess.forEach((letter, i) => {
         if (solutionArray.includes(letter.key) && letter.color !== 'green') {
            formattedGuess[i].color = 'yellow'
            solutionArray[solutionArray.indexOf(letter.key)] = null
         }
       })

       return formattedGuess
    }

    // adds a new guess to the guesses state
    // updates the isCorrect state if the guess is correct
    // add one to the turn state
    const addNewGuess = (formattedGuess) => {
        if (currentGuess === solution) {
            setIsCorrect(true)
        }

        setGuesses((previousGuesses) => {
            let newGuesses = [...previousGuesses]
            newGuesses[turn] = formattedGuess
            return newGuesses
        })

        setHistory((previousHistory) => {
            return [...previousHistory, currentGuess]
        })

        setTurn((previousTurn) => {
            return previousTurn + 1
        })

        setUsedKeys((previousUsedKeys) => {
            let newKeys = {...previousUsedKeys}

            formattedGuess.forEach((letter) => {
                const currentColor = newKeys[letter.key]

                if (letter.color === 'green') {
                    newKeys[letter.key] = 'green'
                    return
                }
                if (letter.color === 'yellow' && currentColor !== 'green') {
                    newKeys[letter.key] = 'yellow'
                    return
                }
                if (letter.color === 'grey' && currentColor !== 'green' && currentColor !== 'yellow') {
                    newKeys[letter.key] = 'grey'
                    return
                }
            })

            return newKeys
        })

        setCurrentGuess('')
    }

    // handle keyup events and track current guess
    // if user presses enter, add the new guess
    const handleKeyup = ({ key }) => {
        
        // handle submit from user, only add guess if turn is less than 5
        // do not allow duplicate words
        // check word is 5 characters long
        if ( key === 'Enter') {
            if (turn > 5) {
                console.log('you used all your guesses')
                return
            }

            if (history.includes(currentGuess)) {
                console.log('you already tried that word')
                return
            }

            if (currentGuess.length !== 5) {
                console.log("word must be 5 letters")
                return
            }

            const formatted = formatGuess()
            addNewGuess(formatted)
        }

        // remove last character from string if Backspace pressed
        if ( key === 'Backspace') {
            setCurrentGuess((previous) => {
                return previous.slice(0, -1)
            })
            return
        }

        // test key pressed to regex pattern and guess is less than 5
        if (/^[A-Za-z]$/.test(key)) {
            if (currentGuess.length < 5) {
                setCurrentGuess((previous) => {
                    return previous + key
                })
            }
        }
    }

    return {turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup}
}

export default useWordle