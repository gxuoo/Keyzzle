import { useState } from 'react';
import './App.css';
import Header from './components/header/Header';
import Main from './components/main/Main';
import GameIntroModal from './components/aside/GameStartModal';

function App() {
  const [isOpenModal, setIsOpenModal] = useState(true);

  return (
    <div className="App">
      <Header />
      <Main />
      {isOpenModal && <GameIntroModal setIsOpenModal={setIsOpenModal} />}
    </div>
  );
}

export default App;
