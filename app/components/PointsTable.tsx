
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

  // Calculate the total points
  const totalPoints = points.reduce(
    (total, point) => total + Number(point.points),
    0
  );

  return (
    <div className="space-y-6">

      {/* Total points card */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-gray-500">
          Puntos totales
        </p>

        <h2 className="mt-2 text-4xl font-bold text-blue-600">
          {totalPoints.toLocaleString("es-CO", {
            maximumFractionDigits: 2,
          })}
        </h2>
      </div>

      {points.length === 0 ? (
        <p className="p-4 text-gray-500">
          No hay puntos registrados aún.
        </p>
      ) : (
        /* Points table */
        <div className="overflow-x-auto rounded-xl border">
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
                    {new Date(point.created_at).toLocaleDateString("es-CO")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
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
