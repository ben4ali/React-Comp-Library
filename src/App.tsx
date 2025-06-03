import './App.css';
import Footer from './components/common/Footer';
import Header from './components/common/Header';

function App() {
  return (
    <div className="w-full min-h-screen">
      <Header />
      <main className="min-h-[70vh]"></main>
      <Footer />
    </div>
  );
}

export default App;
