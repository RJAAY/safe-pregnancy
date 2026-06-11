import Sidebar from "@/components/dashboard/Sidebar";

export const metadata = {
  title: "Dashboard — Safe Pregnancy",
  description: "Ton espace de suivi de grossesse personnalisé",
};

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-cream">
      <Sidebar />
      <main className="flex-1 ml-64 p-8 max-lg:ml-0 max-lg:p-4">
        {children}
      </main>
    </div>
  );
}
