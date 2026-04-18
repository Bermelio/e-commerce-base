import toast, { Toaster } from 'react-hot-toast';

export default function SaveForm(){
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

   await toast.promise(
    fetch('/api/matafuegosDb', {
      method: 'POST',
      body: formData,
    }).then(res => {
      if (!res.ok) throw new Error();
      return res;
    }),
      {
        loading: 'Guardando...',
        success: () => {
          setTimeout(() => location.reload(), 1500);
          return '¡Guardado correctamente!';
        },
        error: 'No se pudo guardar. Intentá de nuevo.',
      }
    );
  
  }

  return (
    <>
      <Toaster position="top-right" />
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center items-center">
          <div className="w-full max-w-2xl min-w-72 gap-5 p-10 rounded-xl shadow-lg flex flex-col justify-center">

            <div className="flex flex-col">
              <label htmlFor="empresa" className="text-sm font-semibold text-gray-600">
                Empresa
              </label>
              <input
                type="text"
                name="empresa"
                id="empresa"
                required
                className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Gaviglio"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="unidades" className="text-sm font-semibold text-gray-600">
                Unidades
              </label>
              <input
                type="number"
                name="unidades"
                id="unidades"
                required
                className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="1"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="clasificacion" className="text-sm font-semibold text-gray-600">
                Clasificación
              </label>
              <input
                type="text"
                name="clasificacion"
                id="clasificacion"
                required
                className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="A B C K"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="fechaEntrega" className="text-sm font-semibold text-gray-600">
                Fecha de entrega
              </label>
              <input
                type="date"
                name="fechaEntrega"
                id="fechaEntrega"
                required
                className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="fechaRetiro" className="text-sm font-semibold text-gray-600">
                Fecha de retiro
              </label>
              <input
                type="date"
                name="fechaRetiro"
                id="fechaRetiro"
                required
                className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="metodoPago" className="text-sm font-semibold text-gray-600">
                Método de pago
              </label>
              <input
                type="text"
                name="metodoPago"
                id="metodoPago"
                required
                className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="(info)"
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-green-soul hover:bg-forest-soul text-white-soul px-4 py-2 rounded-md"
              >
                Guardar
              </button>
            </div>

          </div>
        </div>
      </form>
    </>
  );
}