// src/components/UploadForm.tsx
import { useState, ChangeEvent, FormEvent } from 'react'
import { uploadAndSavePhoto } from '../services/photoService'

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null)
  const [busy, setBusy] = useState(false)

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFile(e.target.files?.[0] ?? null)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!file) {
      alert('Selecciona un archivo.')
      return
    }
    setBusy(true)
    try {
      const result = await uploadAndSavePhoto(file /*, { user_id: 123 } */)
      console.log('Backend response:', result)
      alert('¡Foto subida y registrada con éxito!')
    } catch (err: any) {
      console.error(err)
      alert('Error al subir: ' + err.message)
    } finally {
      setBusy(false)
      setFile(null)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input
        type="file"
        accept="image/*"
        onChange={onChange}
        disabled={busy}
        className="block w-full text-sm text-gray-600"
      />
      <button
        type="submit"
        disabled={busy || !file}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
      >
        {busy ? 'Procesando…' : 'Subir foto'}
      </button>
    </form>
  )
}
