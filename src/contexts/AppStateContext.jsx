import React, { createContext, useContext, useState, useEffect } from "react";

const AppStateContext = createContext({});

export const useAppState = () => {
  return useContext(AppStateContext);
};

export const AppStateProvider = ({ children }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameHistory, setGameHistory] = useState([]);
  const [highScore, setHighScore] = useState(0);
  const [score, setScore] = useState(0);
  const [currentGameColors, setCurrentGameColors] = useState([]);
  const [remainingTime, setRemainingTime] = useState(30);
  const [timerRunning, setTimerRunning] = useState(false);
  const [correctColor, setCorrectColor] = useState("");
  const [timerInterval, setTimerInterval] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [userAnswerTime, setUserAnswerTime] = useState(0);
  const [elapsedTimeWithoutChoice, setElapsedTimeWithoutChoice] = useState(0);
  const [progressWidth, setProgressWidth] = useState('100%');

  const startGame = () => {
    if (!gameStarted) {
      if (currentGameColors.length > 0) {
        setCurrentGameColors([]);
        setScore(0);
        setRemainingTime(30);
        setTimerRunning(false);
      }
      setGameStarted(true);
      startRound();
    }
  };

  const restartGame = () => {
    if (gameStarted) {
      setCurrentGameColors([]);
      setScore(0);
      setRemainingTime(30);
      setTimerRunning(false);
      startRound();
    }
  };

  const startTimer = () => {
    if (!timerInterval) {
      const intervalId = setInterval(() => {
        if (remainingTime > 0) {
          setRemainingTime((prevRemainingTime) => prevRemainingTime - 1);
        } else {
          clearInterval(intervalId);
          restartGame();
        }
      }, 1000);
      setTimerInterval(intervalId);
    }
  };

  const stopTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
  };

  const resetAllData = () => {
    localStorage.removeItem("gameData");
    setGameHistory([]);
    setUserAnswers([]);
    setHighScore(0);
    setScore(0);
    setCorrectColor("");
    setCurrentGameColors([]);
    setRemainingTime(30);
    setTimerRunning(false);
    setGameStarted(false);
  };

  const startRound = () => {
    const colors = generateRoundColors();
    setCurrentGameColors(colors);
    setTimerRunning(true);
    setGameOver(false);

    setCorrectColor(colors[0]);
  };

  const generateRoundColors = () => {
    const colors = [];
    while (colors.length < 3) {
      const randomColor = generateRandomColor();
      if (!colors.includes(randomColor)) {
        colors.push(randomColor);
      }
    }
    const correctColorIndex = Math.floor(Math.random() * 3);
    colors.splice(correctColorIndex, 0, colors[correctColorIndex]);
    return colors;
  };

  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleAnswer = (selectedColor) => {
    if (timerRunning && !gameOver) {
      setElapsedTimeWithoutChoice(0);
      if (selectedColor === correctColor) {
        setScore((prevScore) => prevScore + 5);
      } else if (remainingTime > 0) {
        console.log('errou 1 = ', remainingTime)
        setScore((prevScore) => prevScore - 1);
      }      
    }
  }

  const registerUserAnswer = (selectedColor) => {
    if (timerRunning) {
      const answerTime = 30 - remainingTime;
      setUserAnswers([{ selectedColor, correctColor, answerTime }, ...userAnswers]);
      setUserAnswerTime(answerTime);
    }
  };

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
    }
  }, [score, highScore]);

  useEffect(() => {
    if (timerRunning) {
      const timer = setInterval(() => {
        if (remainingTime > 0) {
          setRemainingTime(remainingTime - 1);
        } else {
          setTimerRunning(false);
        }
        if (remainingTime === 0) {
          setGameOver(true);
          setTimerRunning(false);
          setRemainingTime(0);
          setGameStarted(false);
          setCurrentGameColors([]);
          setScore(0);
          setCorrectColor("");
        }
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [timerRunning, remainingTime, gameOver]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timerRunning && !gameOver) {
        setElapsedTimeWithoutChoice((prevElapsedTime) => prevElapsedTime + 1);
        if (elapsedTimeWithoutChoice >= 9) {
          setScore((prevScore) => prevScore - 2);
          
          setElapsedTimeWithoutChoice(0);
        }
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [timerRunning, gameOver, elapsedTimeWithoutChoice]);

  useEffect(() => {
    if (!timerRunning) {
      const roundData = {
        colors: currentGameColors,
        time: 30 - remainingTime,
      };
      setGameHistory([roundData, ...gameHistory]);
      setCurrentGameColors([]);
      setGameStarted(false);
    }
  }, [timerRunning, remainingTime]);

  const saveGameData = () => {
    const gameDataToSave = {
      highScore,
      gameHistory,
      userAnswers,
    };
    localStorage.setItem("gameData", JSON.stringify(gameDataToSave));
  };

  useEffect(() => {
    const loadGameData = () => {
      const localStorageData = localStorage.getItem("gameData");
      if (localStorageData && !gameStarted) {
        const parsedData = JSON.parse(localStorageData);
        if (parsedData.highScore > highScore) {
          setHighScore(parsedData.highScore);
        }
        if (parsedData.userAnswers && parsedData.userAnswers.length > 0 && gameStarted) {
          setUserAnswers(parsedData.userAnswers);
        }
        setGameHistory(parsedData.gameHistory);
      }
    };
  
    loadGameData();
  
    window.addEventListener("beforeunload", () => {
      saveGameData();
    });
  
    return () => {
      window.removeEventListener("beforeunload", () => {
        saveGameData();
      });
    };
  }, [highScore, userAnswers, gameStarted]);

  useEffect(() => {
    saveGameData(highScore, gameHistory, userAnswers);
  }, [highScore, gameHistory, userAnswers]);

  const handleGameStartedChange = () => {
    if (gameStarted) {
      setProgressWidth('100%');
      startTimer();
    } else {
      stopTimer();
    }
  };

  useEffect(() => {
    handleGameStartedChange();
  }, [gameStarted, startTimer, stopTimer]);

  const handleProgressWidthChange = () => {
    if (parseFloat(progressWidth) > 0) {
      const newWidth = (remainingTime / 30) * 100;
      setProgressWidth(newWidth.toFixed(2) + "%");
    }

    if (parseFloat(progressWidth) <= 0) {
      setProgressWidth("0%");
      handleAnswer(null);
      startRound();
      setElapsedTimeWithoutChoice(0);
    }
  };

  useEffect(() => {
    handleProgressWidthChange();
  }, [remainingTime, progressWidth]);

  const handleCurrentGameColorsChange = () => {
    setProgressWidth('100%');
  };

  useEffect(() => {
    handleCurrentGameColorsChange();
  }, [currentGameColors]);

  return (
    <AppStateContext.Provider
      value={{
        gameStarted,
        startGame,
        restartGame,
        handleAnswer,
        score,
        highScore,
        gameHistory,
        currentGameColors,
        remainingTime,
        resetAllData,
        correctColor,
        startRound,
        startTimer,
        stopTimer,
        userAnswers,
        userAnswerTime,
        registerUserAnswer,
        gameOver,
        elapsedTimeWithoutChoice,
        progressWidth,
        setProgressWidth
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export default AppStateContext;