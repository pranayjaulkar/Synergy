import Templates from "../components/Home/Templates";
import RecentSection from "../components/Home/RecentSection";

export default function Home() {
  return (
    <div className="w-full min-h-screen">
      <Templates />
      <RecentSection />
    </div>
  );
}
