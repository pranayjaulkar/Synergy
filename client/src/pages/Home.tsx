import Navbar from "../components/Navbar";
import Templates from "../components/home/Templates";
import RecentSection from "../components/home/RecentSection";

export default function Home() {
	return (
		<div className="w-full min-h-screen">
			<Navbar />
			<Templates />
			<RecentSection />
		</div>
	);
}
