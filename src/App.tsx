import { useState } from 'react'
import './App.css'
import { lightsArray } from './colorsTypes/types'


function App() {
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerSequence, setPlayerSequence] = useState<number[]>([]);
  const [level, setLevel] = useState(0);
  const [highScore, setHighScore] = useState(
    Number(localStorage.getItem("highScore")) || 0
  );
  const [isPlayerTurn, setIsPlayerTurn] = useState(false);
  const [flashIndex, setFlashIndex] = useState<number | null>(null);

  // شروع بازی
  const startGame = () => {
    setSequence([]);
    setPlayerSequence([]);
    setLevel(0);
    nextRound();
  };

 // یک فانکشن برای گرفتن ۵ چراغ random
const generateRandomSequence = (): number[] => {
  const newSeq: number[] = [];
  for (let i = 0; i < 5; i++) {
    const randomId = Math.floor(Math.random() * lightsArray.length) + 1;
    newSeq.push(randomId);
  }
  return newSeq;
};

// رفتن به مرحله بعد
const nextRound = () => {
  const newSequence = generateRandomSequence(); // همیشه ۵ چراغ
  setSequence(newSequence);
  setPlayerSequence([]);
  setLevel((prev) => prev + 1);
  playSequence(newSequence);
};

// نمایش چراغ‌ها
const playSequence = (seq: number[]) => {
  setIsPlayerTurn(false);
  seq.forEach((colorId, index) => {
    setTimeout(() => {
      setFlashIndex(colorId);            // چراغ روشن شود
      setTimeout(() => setFlashIndex(null), 500); // بعد از 500ms خاموش شود
      if (index === seq.length - 1) {
        setTimeout(() => setIsPlayerTurn(true), 600); // بعد از آخرین چراغ، نوبت پلیر
      }
    }, index * 700); // فاصله چراغ‌ها (سرعت نمایش)
  });
};


  // وقتی پلیر کلیک می‌کنه
  const handleClick = (colorId: number) => {
    if (!isPlayerTurn) return;

    const newPlayerSeq = [...playerSequence, colorId];
    setPlayerSequence(newPlayerSeq);

    // بررسی درست بودن
    if (colorId !== sequence[newPlayerSeq.length - 1]) {
      alert("Game Over ❌");
      if (level > highScore) {
        setHighScore(level);
        localStorage.setItem("highScore", String(level));
      }
      setIsPlayerTurn(false);
      return;
    }

    // اگه کل sequence درست بود → مرحله بعد
    if (newPlayerSeq.length === sequence.length) {
      setTimeout(() => nextRound(), 1000);
    }
  }
  
  

  return (
    <>
      <div className='h-screen bg-blue-950'>
        <div className='flex flex-col justify-center items-center'>
        <h1 className='text-white p-2'>
          Memory Light Game
        </h1>
        <div className='flex'>
          {lightsArray && lightsArray.map((item)=>(
            <div 
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={`rounded-full h-10 w-10 cursor-pointer transition duration-300
              ${item.className}
            ${flashIndex === item.id ? "brightness-150 scale-110" : ""}`}></div>
          ))}
        </div>
        <button 
          className="bg-blue-500 px-6 py-2 rounded-lg text-white font-semibold hover:bg-blue-600"
          onClick={startGame}
          >
          Start Game
        </button>
        <div className='text-white flex justify-around w-full'>
        <h3>Level : {level}</h3>
        <h3>High Score : {highScore}</h3>
        </div>
        </div>

      </div>
    </>
  )
}

export default App
