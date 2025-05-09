import './App.css';
import './styles/aside.css';
import Header from './components/header/Header';
import Emoji from './components/aside/Emoji';
import MainContainer from './components/main/MainContainer';
import NoisyPerson from './components/aside/NoisyPerson';
import CafeteriaMenu from './components/aside/CafeteriaMenu';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="body-container">
        <aside className="aside-left">
          <Emoji />
        </aside>
        <MainContainer />
        <aside className="aside-right">
          <NoisyPerson />
          <CafeteriaMenu />
        </aside>
      </div>
    </div>
  );
}

export default App;
