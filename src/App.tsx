import { SentimentProvider } from "./context/SentimentContext";
import Dashboard from "./pages/Dashboard";
import './App.css'

function App() {
  return (
    <SentimentProvider>
      <div className="min-h-screen mx-auto bg-gray-100 p-6">
        <header className="mb-4 text-center">
          <h1 className="text-3xl font-bold">Global Sentiment Heatmap</h1>
        </header>
        <main className="container mx-auto">
          <Dashboard />
        </main>
      </div>
    </SentimentProvider>
  );
}

export default App;