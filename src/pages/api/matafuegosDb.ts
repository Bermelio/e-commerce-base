import type { APIRoute } from "astro";
import { supabase } from "src/lib/supabase";

export const POST: APIRoute = async ({ request, redirect}) => {
  const data = await request.formData();

  const empresa = data.get("empresa") as string;
  const unidades = data.get("unidades") as string;
  const clasificacion = data.get("clasificacion") as string;
  const fechaEntrega = data.get("fechaEntrega") as string;
  const fechaRetiro = data.get("fechaRetiro") as string;
  const metodoPago = data.get("metodoPago") as string;

  if(!empresa || !unidades || !clasificacion || !fechaEntrega || !fechaRetiro || !metodoPago){
    return new Response(
      JSON.stringify({
        message: "Falto algun campo por completar"
      }),
      {status:400}
    );
  }else{
    const { error } =  await supabase
    .from('MatafuegosDB')
    .insert([
      {empresa, unidades, clasificacion, fechaEntrega, fechaRetiro, metodoPago}
    ]);
    if(error){
    return new Response(JSON.stringify({ message: error.message }), {status: 500})
    } 
  }

  return redirect("/dashboard");
}
