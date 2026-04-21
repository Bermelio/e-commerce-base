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
      if (res.ok) setEstado((prev) => !prev);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`
        relative inline-flex w-11 h-6 rounded-full transition-colors duration-200
        ${estado ? "bg-blue-500" : "bg-gray-300"}
        ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      <span
        className={`
          absolute top-0.5 left-0.5
          h-5 w-5 bg-white rounded-full shadow
          transition-transform duration-200
          ${estado ? "translate-x-5" : "translate-x-0"}
        `}
      />
    </button>
  );
}