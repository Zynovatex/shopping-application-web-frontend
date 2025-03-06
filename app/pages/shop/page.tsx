//import Sidebar from "@/components/Sidebar";
import Sidebar from "@/components/layout/Sidebar";
export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Top Rated Shops</h1>
        {/* Your shop list component */}
      </main>
    </div>
  );
}
