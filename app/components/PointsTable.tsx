
import { createClient } from "../lib/supabase/server";
import { Suspense } from "react";

interface Point {
  id: string;
  name: string;
  indicator: string[] | null;
  description: string | null;
  points: number;
  created_at: string;
}

async function PointsList() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("points")
    .select("id, name, indicator, description, points, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching points:", error.message);
    return <p>Error cargando puntos.</p>;
  }

  const points = (data ?? []) as Point[];

  if (points.length === 0) {
    return <p className="p-4">No hay puntos registrados aún.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-xl border">
      {/* Form */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 p-3 border-b">
        <input
          type="text"
          placeholder="Add client..."
          className="w-full p-3 border-2 rounded-2xl"
        />

        <select
          defaultValue=""
          className="w-full p-3 border-2 rounded-2xl"
        >
          <option value="" disabled>
            Select indicator
          </option>
          <option value="Sales">Sales</option>
          <option value="Quality">Quality</option>
          <option value="Productivity">Productivity</option>
        </select>

        <input
          type="text"
          placeholder="Add description..."
          className="w-full p-3 border-2 rounded-2xl"
        />

        <input
          type="number"
          placeholder="Total points..."
          className="w-full p-3 border-2 rounded-2xl"
        />

        <button
          type="button"
          className="w-full p-3 bg-blue-500 text-white rounded-2xl hover:bg-blue-600"
        >
          Add
        </button>
      </div> */}

      {/* Points table */}
      <table className="w-full text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Clientes</th>
            <th className="p-3">Indicadores</th>
            <th className="p-3">Descripción</th>
            <th className="p-3">Puntos</th>
            <th className="p-3">Fecha</th>
          </tr>
        </thead>

        <tbody>
          {points.map((point) => (
            <tr key={point.id} className="border-t">
              <td className="p-3">{point.name}</td>

              <td className="p-3">
                {point.indicator?.join(", ") ?? "-"}
              </td>

              <td className="p-3">
                {point.description ?? "-"}
              </td>

              <td className="p-3 font-semibold">
                {point.points}
              </td>

              <td className="p-3">
                {new Date(point.created_at).toLocaleDateString("en-US")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Points() {
  return (
    <main className="p-6">
      <Suspense fallback={<p>Loading points...</p>}>
        <PointsList />
      </Suspense>
    </main>
  );
}
