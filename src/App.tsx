import { useEffect } from 'react';
import './App.css';
import { PlayersSection } from './components/players/players-section';
import { VictimsSection } from './components/victims/victims-section';
import { DebateSection } from './components/debate/debate-section';
import { Provider } from 'jotai';
import { gameStore } from './atoms/store';

function App() {
  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    root.classList.add('light');
  }, []);

  return (
    <main className="h-full w-full grid grid-cols-1 grid-rows-1  bg-background">
      <div className="grid w-[1000px] grid-cols-3 grid-rows-8 justify-self-center p-6">
        <Provider store={gameStore}>
          <VictimsSection />
          <DebateSection />
          <PlayersSection />
        </Provider>
      </div>
    </main>
  );
}

export default App;
