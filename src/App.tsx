import { useBingoGame } from './hooks/useBingoGame';
import { StartScreen } from './components/StartScreen';
import { GameScreen } from './components/GameScreen';
import { BingoModal } from './components/BingoModal';
import { ScavengerHuntScreen } from './components/ScavengerHuntScreen';
import { ScavengerCompleteModal } from './components/ScavengerCompleteModal';
import { StarField } from './components/StarField';

function App() {
  const {
    gameState,
    board,
    scavengerQuestions,
    winningSquareIds,
    showBingoModal,
    showScavengerModal,
    startGame,
    startScavengerHunt,
    handleSquareClick,
    toggleScavengerQuestion,
    resetGame,
    dismissModal,
    dismissScavengerModal,
  } = useBingoGame();

  return (
    <>
      {/* Global animated starfield background */}
      <StarField />
      
      {gameState === 'start' ? (
        <StartScreen 
          onStartBingo={startGame} 
          onStartScavenger={startScavengerHunt}
        />
      ) : gameState === 'scavenger-playing' || gameState === 'scavenger-complete' ? (
        <>
          <ScavengerHuntScreen
            questions={scavengerQuestions}
            onToggleQuestion={toggleScavengerQuestion}
            onBack={resetGame}
          />
          {showScavengerModal && (
            <ScavengerCompleteModal 
              onDismiss={dismissScavengerModal} 
              onPlayAgain={startScavengerHunt}
            />
          )}
        </>
      ) : (
        <>
          <GameScreen
            board={board}
            winningSquareIds={winningSquareIds}
            hasBingo={gameState === 'bingo'}
            onSquareClick={handleSquareClick}
            onReset={resetGame}
          />
          {showBingoModal && (
            <BingoModal onDismiss={dismissModal} />
          )}
        </>
      )}
    </>
  );
}

export default App;
