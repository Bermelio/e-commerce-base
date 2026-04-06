import toast, { Toaster } from 'react-hot-toast';

export default function CopyButton({ texto }: { texto: string }) {
  return (
    <>
      <Toaster position="top-center" />
      <div
        onClick={() => {
          navigator.clipboard.writeText(texto)
          toast.success('Copiado!')
        }}
        className="text-md cursor-pointer col-span-3 flex justify-center items-center"
      >
        {texto}
      </div>
    </>
  )
}