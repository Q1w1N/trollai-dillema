import { useEffect } from 'react';
import './App.css';
import { PlayersSection } from './components/players/players-section';
import { VictimsSection } from './components/victims/victims-section';
import { DebateSection } from './components/debate/debate-section';

function App() {
  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    root.classList.add('dark');
  }, []);

  return (
    <main className="h-full w-full grid grid-cols-1 grid-rows-1  bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <div className="grid w-[1000px] grid-cols-3 grid-rows-8 justify-self-center p-6">
        <VictimsSection />
        <DebateSection />
        <PlayersSection />
      </div>
    </main>
  );
}

export default App;
