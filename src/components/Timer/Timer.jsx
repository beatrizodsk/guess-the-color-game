import React, { useEffect, useState } from 'react';
import { useAppState } from '../../contexts/AppStateContext';
import './Timer.css';

const Timer = () => {
  const { handleAnswer, remainingTime, gameStarted, startRound, currentGameColors, startTimer, stopTimer } = useAppState();
  const [progressWidth, setProgressWidth] = useState('100%'); // Inicie a barra de progresso em 100%

  useEffect(() => {
    if (gameStarted) {
      setProgressWidth('100%'); // Reinicie a barra de progresso para 100%
      startTimer(); // Inicie o temporizador quando o jogo começar
    } else {
      stopTimer(); // Pare o temporizador quando o jogo não estiver em andamento
    }
  }, [gameStarted, startTimer, stopTimer]);

  useEffect(() => {
    if (parseFloat(progressWidth) > 0) {
      // Atualize a barra de progresso conforme o tempo restante
      const newWidth = (remainingTime / 30) * 100;
      setProgressWidth(newWidth.toFixed(2) + '%');
    }

    if (parseFloat(progressWidth) <= 0) {
      // Tempo esgotado, inicie uma nova rodada
      setProgressWidth('0%'); // Reinicie a barra de progresso
      handleAnswer(null);
      startRound();
    }
  }, [remainingTime, progressWidth, startRound]);

  useEffect(() => {
    // Reiniciar o progressWidth quando novas opções de cores forem geradas
    setProgressWidth('100%');
  }, [currentGameColors]);

  return (
    <>
      {gameStarted && (
        <div className="progress-bar">
          <div className="progress" style={{ width: progressWidth }}></div>
        </div>
      )}
      {/* <span className="countdown"></span> */}
    </>
  );
};

export default Timer;
