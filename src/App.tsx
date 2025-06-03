import './App.css';
import Footer from './components/common/Footer';
import Header from './components/common/Header';
import ComponentsPage from './pages/ComponentsPage';

function App() {
  return (
    <div className="w-full min-h-screen">
      <Header />
      <main className="flex-1">
        <ComponentsPage />
      </main>
      <Footer />
    </div>
  );
}

export default App;
