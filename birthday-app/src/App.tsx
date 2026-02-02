import { useState } from 'react';
import SparkleBackground from './components/SparkleBackground';
import FlagBanner from './components/FlagBanner';
import AnimatedTitle from './components/AnimatedTitle';
import DateOfBirth from './components/DateOfBirth';
import ProfileSlideshow from './components/ProfileSlideshow';
import CircleText from './components/CircleText';
import Decorations from './components/Decorations';
import MailButton from './components/MailButton';
import MailBox from './components/MailBox';
import './App.css';

function App() {
  const [isMailOpen, setIsMailOpen] = useState(false);

  return (
    <div className="app-wrapper">
      <SparkleBackground />
      <FlagBanner />

      <main className="content">
        <section className="left-section">
          <AnimatedTitle />
          <DateOfBirth date="22 aninhos - 3/2" />
          <MailButton onClick={() => setIsMailOpen(true)} />
        </section>

        <section className="right-section">
          <ProfileSlideshow />
          <CircleText />
        </section>
      </main>

      <Decorations />
      <MailBox isOpen={isMailOpen} onClose={() => setIsMailOpen(false)} />
    </div>
  );
}

export default App;
