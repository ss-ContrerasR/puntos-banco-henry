
"use client";

import { useState } from "react";
import { createClient } from "../app/lib/supabase/client";
export default function PointsForm() {
  const [name, setName] = useState("");
  const [indicator, setIndicator] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const supabase = createClient();

    const { error } = await supabase.from("points").insert({
      name,
      indicator: indicator ? [indicator] : null,
      description,
      points: Number(points),
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    setName("");
    setIndicator("");
    setDescription("");
    setPoints("");
    setMessage("Record successfully saved!");

    setLoading(false);

    window.location.reload();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 p-3 border-b"
    >
      <input
        type="text"
        placeholder="Agregar cliente..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-3 border-2 rounded-2xl"
        required
      />

      <select
        value={indicator}
        onChange={(e) => setIndicator(e.target.value)}
        className="w-full p-3 border-2 rounded-2xl"
        required
      >
        <option value="">Seleccionar indicador</option>
        <option value="Sales">Ventas</option>
        <option value="Quality">Credito</option>
        <option value="Productivity">Productividad</option>
      </select>

      <input
        type="text"
        placeholder="Agregar descripción..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-3 border-2 rounded-2xl"
      />

      <input
        type="number"
        placeholder="Puntos totales..."
        value={points}
        onChange={(e) => setPoints(e.target.value)}
        className="w-full p-3 border-2 rounded-2xl"
        min="0.01"
        step="0.01"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full p-3 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? "Guardando..." : "Agregar"}
      </button>

      {message && (
        <p className="md:col-span-2 lg:col-span-5">
          {message}
        </p>
      )}
    </form>
  );
}
