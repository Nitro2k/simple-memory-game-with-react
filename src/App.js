import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImage = [
  {"src": "/img/helmet-1.png", matched: false},
  {"src": "/img/potion-1.png", matched: false},
  {"src": "/img/ring-1.png", matched: false},
  {"src": "/img/scroll-1.png", matched: false},
  {"src": "/img/shield-1.png", matched: false},
  {"src": "/img/sword-1.png", matched: false},
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setchoiceOne] = useState(null)
  const [choiceTwo, setchoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  const shuffleCard = () => {
    const shuffleCards = [...cardImage, ...cardImage]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random() }))

      setchoiceOne(null)
      setchoiceTwo(null)
      setCards(shuffleCards)
      setTurns(0)
  }

  //handle Choice
    const handleChoice = (card) => {
      choiceOne ? setchoiceTwo(card) : setchoiceOne(card)
    }
  //compare 2 cards
    useEffect(() => {
      if( choiceOne && choiceTwo) {
      setDisabled(true)
        if(choiceOne.src === choiceTwo.src) {
          setCards(prevCards => {
            return prevCards.map(card => {
              if(card.src === choiceOne.src) {
                return {...card, matched: true}
              } else {
                return card
              }
            })
          })
          resetTurn()
        } else {
          setTimeout(() => resetTurn(), 1000)
        }
      }
    },[choiceOne,choiceTwo])
    console.log(cards)

  //reset choice
  const resetTurn = () => {
    setchoiceOne(null)
    setchoiceTwo(null)
    setTurns(prevTurn => prevTurn + 1)
    setDisabled(false)
  }

  //start new game automatically
  useEffect(() => {
    shuffleCard()
  } ,[])

  return (
    <div className="App">
      <h1>Memory game</h1>
      <button onClick={shuffleCard}>New game</button>
      <p>Turn: {turns}</p>

      <div className="card-gird">
        {cards.map((card) => (
          <SingleCard 
            key={card.id} 
            card={card}
            handleChoice={handleChoice}
            flipped = {card === choiceOne || card === choiceTwo || card.matched}
            disabled = {disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
