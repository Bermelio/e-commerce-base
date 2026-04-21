import type { APIRoute } from "astro";
import { supabase } from "@lib/supabase";

export const POST: APIRoute = async ({ request, cookies }) => {
  const accessToken = cookies.get("sb-access-token");
  const refreshToken = cookies.get("sb-refresh-token");

  if (!accessToken || !refreshToken) {
    return new Response(JSON.stringify({ error: "No autenticado" }), { status: 401 });
  }

  const { error: sessionError } = await supabase.auth.setSession({
    access_token: accessToken.value,
    refresh_token: refreshToken.value,
  });

  if (sessionError) {
    return new Response(JSON.stringify({ error: "Sesión inválida" }), { status: 401 });
  }

  const { ticket, estado } = await request.json();

  const { error } = await supabase
    .from("MatafuegosDB")
    .update({ estado })
    .eq("ticket", ticket);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};