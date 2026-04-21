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
        className="text-xs text-gray-400 font-mono truncate max-w-60 cursor-pointer"
      >
        {texto}
      </div>
    </>
  )
}
<script>
</script>