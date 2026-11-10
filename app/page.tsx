import PointsForm from "@/components/PointsForm";
import PointsTable from "./components/PointsTable";

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="mb-6 font-bold text-center text-5xl">
        Mis puntos
      </h1>
      <div>
        <PointsForm />
      </div>
      <PointsTable />
    </main>
  );
}