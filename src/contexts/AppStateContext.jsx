import React, { createContext, useContext, useState, useEffect } from "react";

// Crie o contexto do estado do aplicativo
const AppStateContext = createContext({});

// Hook personalizado para acessar o estado do aplicativo
export const useAppState = () => {
  return useContext(AppStateContext);
};

// Provedor de estado do aplicativo
export const AppStateProvider = ({ children }) => {
  const [gameStarted, setGameStarted] = useState(false); // Indica se o jogo está em andamento
  const [gameHistory, setGameHistory] = useState([]); // Histórico de partidas
  const [highScore, setHighScore] = useState(0); // Pontuação máxima
  const [score, setScore] = useState(0); // Pontuação atual
  const [currentGameColors, setCurrentGameColors] = useState([]); // Cores da partida atual
  const [remainingTime, setRemainingTime] = useState(30); // Tempo restante em segundos
  const [timerRunning, setTimerRunning] = useState(false); // Indica se o temporizador está em execução
  const [correctColor, setCorrectColor] = useState("");
  const [timerInterval, setTimerInterval] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]); // Armazenar respostas do usuário
  const [userAnswerTime, setUserAnswerTime] = useState(0); // Armazenar tempo da resposta do usuário
  

  // Lógica para iniciar uma nova partida
  const startGame = () => {
    if (!gameStarted) {
      // Se um jogo estiver em andamento, ignorar e jogar fora seus dados
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

  // Lógica para reiniciar uma partida
  const restartGame = () => {
    if (gameStarted) {
      setCurrentGameColors([]);
      // setHighScore(0);
      setScore(0);
      setRemainingTime(30);
      setTimerRunning(false);
      startRound();
    }
  };

  // Função para iniciar o temporizador
  const startTimer = () => {
    if (!timerInterval) {
      const intervalId = setInterval(() => {
        if (remainingTime > 0) {
          setRemainingTime((prevRemainingTime) => prevRemainingTime - 1);
        } else {
          clearInterval(intervalId);
        }
      }, 1000);
      setTimerInterval(intervalId);
    }
  };

  // Função para parar o temporizador
  const stopTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
  };

  // Lógica para limpar todos os dados salvos pelo jogo
  const resetAllData = () => {
    setGameHistory([]);
    setUserAnswers([]); // Limpar respostas do usuário
    setHighScore(0);
    setScore(0);
    setCorrectColor("");
    setCurrentGameColors([]);
    setRemainingTime(30);
    setTimerRunning(false);
    setGameStarted(false);
  };

  // Iniciar uma nova rodada
  const startRound = () => {
    const colors = generateRoundColors();
    setCurrentGameColors(colors);
    setTimerRunning(true);
    setRemainingTime(30);

    // Defina a cor correta com base nas cores geradas
    setCorrectColor(colors[0]);
  };

  // Gere cores aleatórias para uma rodada
  const generateRoundColors = () => {
    const colors = [];
    // Lógica para gerar as cores aleatórias
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

  // Gere uma cor aleatória em hexadecimal
  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Lidar com a resposta do jogador
  const handleAnswer = (selectedColor) => {
    if (timerRunning) {
      if (selectedColor === correctColor) {
        // Resposta correta
        setScore(score + 5);
      } else {
        // Resposta errada
        setScore(score - 1);
      }
      setTimerRunning(false);
    }
    if (gameStarted && !selectedColor === correctColor) {
      // O jogador não respondeu a tempo, deduzir 2 pontos
      setScore(score - 2);
    }
  };

  const registerUserAnswer = (selectedColor) => {
    if (timerRunning) {
      const answerTime = 30 - remainingTime; // Calcular o tempo da resposta
      // Usando unshift para adicionar a resposta mais recente no topo da pilha
      setUserAnswers([{ selectedColor, correctColor, answerTime }, ...userAnswers]);
      setUserAnswerTime(answerTime);
    }
  };

  // Atualizar a pontuação máxima se a pontuação atual for maior
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
    }
  }, [score, highScore]);

  // Efeitos secundários quando o temporizador muda
  useEffect(() => {
    if (timerRunning) {
      const timer = setInterval(() => {
        if (remainingTime > 0) {
          setRemainingTime(remainingTime - 1);
        } else {
          setTimerRunning(false);
        }
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [timerRunning, remainingTime]);

  // Fim da rodada
  useEffect(() => {
    console.log("timerRunning = ", timerRunning)
    if (!timerRunning) {
      // Lidar com o fim da rodada, salvar dados, etc.

      const roundData = {
        colors: currentGameColors,
        time: 30 - remainingTime,
      };
      console.log("roundData = ", roundData)
      setGameHistory([roundData, ...gameHistory]);
      setCurrentGameColors([]);
    }
  }, [timerRunning]);

  const saveGameData = () => {
    const gameDataToSave = {
      highScore,
      gameHistory,
    };
    localStorage.setItem("gameData", JSON.stringify(gameDataToSave));
  };

  // Efeitos secundários para persistência de dados
  useEffect(() => {
    // Carregando dados do localStorage ao iniciar o aplicativo
    const loadGameData = () => {
      const localStorageData = localStorage.getItem("gameData");
      if (localStorageData) {
        const parsedData = JSON.parse(localStorageData);
        setHighScore(parsedData.highScore);
        setGameHistory(parsedData.gameHistory);
      }
    };

    loadGameData();

    // Adicionando listener para o evento beforeunload
    window.addEventListener("beforeunload", () => {
      saveGameData(); // Chame a função sem passar parâmetros
    });

    return () => {
    // Removendo o listener quando o componente é desmontado
      window.removeEventListener("beforeunload", () => {
        saveGameData(); // Chame a função sem passar parâmetros
      });
    };
  }, []); // Este efeito será executado apenas uma vez ao iniciar o aplicativo

  // useEffect separado para atualizações de highScore e gameHistory
  useEffect(() => {
  // Chamando saveGameData() apenas quando highScore ou gameHistory forem atualizados
    saveGameData(highScore, gameHistory);
  }, [highScore, gameHistory]);

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
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export default AppStateContext;