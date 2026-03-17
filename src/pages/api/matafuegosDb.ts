import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();

  const empresa = data.get("empresa");
  const unidades = data.get("unidades");
  const clasificacion = data.get("clasificacion");
  const fechaEntrega = data.get("fechaEntrega");
  const fechaRetiro = data.get("fechaRetiro");
  const metodoPago = data.get("metodoPago");

  if(!empresa || !unidades || !clasificacion || !fechaEntrega || !fechaRetiro || !metodoPago){
    return new Response(
      JSON.stringify({
        message: "Falto algun campo por completar"
      }),
      {status:400}
    );
  }

  return new Response(
    JSON.stringify({
      message:"Datos Correctos"
    }),
    {status:200}
  );
}
