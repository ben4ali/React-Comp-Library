import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/common/Footer';
import ComponentsPage from './pages/ComponentsPage';

function App() {
  return (
    <Router>
      <div className="w-full min-h-screen">
        <main className="flex-1">
          <Routes>
            <Route
              path="/components/:componentName"
              element={<ComponentsPage />}
            />
            <Route path="/components" element={<ComponentsPage />} />
            <Route path="/" element={<ComponentsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
