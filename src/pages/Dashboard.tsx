import { useSentimentContext } from "../context/SentimentContext";
import MapChart from "../components/MapChart";
import Legend from "../components/Legend";
import SentimentToggle from "../components/SentimentToggle";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";
import ErrorMessage from "../components/Error";

const Dashboard = () => {
  const { loading, error } = useSentimentContext();

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="relative min-h-screen bg-gray-50">
      <div className="p-4">
        <SentimentToggle />
        <Legend />
        <MapChart />
        <Sidebar />
      </div>
    </div>
  );
};

export default Dashboard;