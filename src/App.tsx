import { useBingoGame } from './hooks/useBingoGame';
import { StartScreen } from './components/StartScreen';
import { GameScreen } from './components/GameScreen';
import { BingoModal } from './components/BingoModal';
import { StarField } from './components/StarField';

function App() {
  const {
    gameState,
    board,
    winningSquareIds,
    showBingoModal,
    startGame,
    handleSquareClick,
    resetGame,
    dismissModal,
  } = useBingoGame();

  return (
    <>
      {/* Global animated starfield background */}
      <StarField />
      
      {gameState === 'start' ? (
        <StartScreen onStart={startGame} />
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
