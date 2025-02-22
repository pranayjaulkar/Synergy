import Navbar from "../components/Navbar";
import Templates from "../components/Home/Templates";
import RecentSection from "../components/Home/RecentSection";

export default function Home() {
  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <Templates />
      <RecentSection />
    </div>
  );
}
