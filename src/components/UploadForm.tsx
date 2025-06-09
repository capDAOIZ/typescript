// src/components/UploadForm.jsx (o .tsx)

import { useState } from 'react'
import { uploadAndSavePhoto } from '../services/photoService.js'

export default function UploadForm() {
  const [file, setFile] = useState(null)
  const [busy, setBusy] = useState(false)

  const onChange = e => setFile(e.target.files?.[0] || null)

  const onSubmit = async e => {
    e.preventDefault()
    if (!file) return alert('Selecciona un archivo.')

    setBusy(true)
    try {
      // si necesitas pasar extra (por ejemplo { user_id: 123 })
      const result = await uploadAndSavePhoto(file/*, { user_id: 123 }*/)
      console.log('Guardado OK:', result)
      alert('Foto subida y registrada con éxito')
    } catch (err) {
      console.error(err)
      alert('Error al subir: ' + err.message)
    } finally {
      setBusy(false)
      setFile(null)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        type="file"
        accept="image/*"
        onChange={onChange}
        disabled={busy}
      />
      <button type="submit" disabled={busy || !file}>
        {busy ? 'Procesando…' : 'Subir foto'}
      </button>
    </form>
  )
}
