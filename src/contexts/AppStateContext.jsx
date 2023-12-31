import React, { createContext, useContext, useState, useEffect } from "react";

const AppStateContext = createContext({});

export const useAppState = () => {
  return useContext(AppStateContext);
};

export const AppStateProvider = ({ children }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [highScoreRound, setHighScoreRound] = useState(0);
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
    setGameOver(false);
    setGameStarted(true);
    setRemainingTime(30);
    setUserAnswers([]);
    startRound();
  };

  const handleGameOver = () => {
    if (gameOver) {
      setGameStarted(false);
    }
    return;
  };

  const restartGame = () => {
    if (gameStarted) {
      setUserAnswers([]);
      setCurrentGameColors([]);
      setScore(0);
      setElapsedTimeWithoutChoice(0);
      setRemainingTime(30);
      setTimerRunning(true);
      startRound();
    }
  };

  const startTimer = () => {
    if (!timerInterval) {
      const intervalId = setInterval(() => {
        if (remainingTime > 0) {
          setRemainingTime((prevRemainingTime) => {
            if (prevRemainingTime > 0 && !gameOver) {
              return prevRemainingTime - 1;
            }
          });
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
    setUserAnswers([]);
    setHighScore(0);
    setHighScoreRound(0);
    setScore(0);
    setCorrectColor("");
    setCurrentGameColors([]);
    setRemainingTime(30);
    setTimerRunning(false);
    setGameStarted(false);
    setGameOver(false);
  };

  const startRound = () => {
    const colors = generateRoundColors();
    setCurrentGameColors(colors);
    setTimerRunning(true);
    setCorrectColor(colors[0]);
  };

  const generateRoundColors = () => {
    const colors = [];
    const correctColor = generateRandomColor();
  
    while (colors.length < 2) {
      const randomColor = generateRandomColor();
      if (!colors.includes(randomColor) && randomColor !== correctColor) {
        colors.push(randomColor);
      }
    }
    colors.push(correctColor);
  
    for (let i = colors.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [colors[i], colors[j]] = [colors[j], colors[i]];
    }

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
    setHighScoreRound(score);
    if (score < 0) {
      setScore(0);
    }
    if ((gameOver || !gameStarted) && highScoreRound > highScore) {
      setHighScore(highScoreRound);
    }
  }, [score, highScore, gameOver, gameStarted, highScoreRound]);
  
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
    if (timerRunning && remainingTime <= 0) setTimerRunning(false);
    if (!timerRunning && remainingTime <= 0) {
      setScore(0);
      setRemainingTime(0);
      setCurrentGameColors([]);
      setGameOver(true);
      handleGameOver();
    }
  }, [timerRunning, remainingTime, startGame]);

  const saveGameData = () => {
    const gameDataToSave = {
      highScore,
      userAnswers,
    };
    localStorage.setItem("gameData", JSON.stringify(gameDataToSave));
  };

  useEffect(() => {
    const loadGameData = () => {
      const localStorageData = localStorage.getItem("gameData");
      if (localStorageData && !gameStarted || localStorageData && gameOver) {
        const parsedData = JSON.parse(localStorageData);
        if (parsedData.highScore > highScore) {
          setHighScore(parsedData.highScore);
        }
        if (parsedData.userAnswers && parsedData.userAnswers.length > 0 ) {
          if (gameOver) return;
          setUserAnswers(parsedData.userAnswers);
        }
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
    saveGameData(highScore, userAnswers);
  }, [highScore, userAnswers]);

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
  }, [timerRunning]);

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
        setProgressWidth,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export default AppStateContext;