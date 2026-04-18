import { useState } from "react";

interface Props {
  ticket: number;
  initialEstado: boolean;
}

export default function ToggleReady({ ticket, initialEstado }: Props) {
  const [estado, setEstado] = useState(initialEstado);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/toggleEstado`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticket, estado: !estado }),
      });

      if (res.ok) {
        setEstado((prev) => !prev);
      }
    } catch (err) {
      console.error("Error al actualizar estado:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <label
      className={`inline-flex items-center ${
        loading ? "opacity-50 pointer-events-none" : "cursor-pointer"
      }`}
    >
      <input
        type="checkbox"
        className="sr-only peer"
        checked={estado}
        onChange={handleToggle}
      />
      <div
        className="
          relative w-11 h-6 rounded-full
          bg-gray-300
          peer-checked:bg-blue-500
          after:content-[''] after:absolute after:top-0.5 after:left-0.5
          after:bg-white after:rounded-full
          after:h-5 after:w-5
          after:transition-all after:duration-200
          peer-checked:after:translate-x-5
        "
      />
    </label>
  );
}