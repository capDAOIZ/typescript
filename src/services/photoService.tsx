// src/services/photoService.ts
import { supabase } from '../lib/supabaseClient'
import { v4 as uuidv4 } from 'uuid'
import axios, { AxiosInstance } from 'axios'

const API_PHOTOS = import.meta.env.VITE_API_PHOTOS_URL as string
const apiPhotos: AxiosInstance = axios.create({
  baseURL: API_PHOTOS,
})

export async function uploadToSupabase(file: File): Promise<string> {
  const ext      = file.name.split('.').pop() ?? ''
  const fileName = `${uuidv4()}.${ext}`
  const path     = `public/${fileName}`

  // 1) Subir al bucket
  const { data: uploadData, error: uploadErr } = await supabase
    .storage
    .from('fotos')
    .upload(path, file)

  if (uploadErr || !uploadData?.path) {
    throw uploadErr ?? new Error('Error desconocido al subir a Supabase')
  }

  // 2) Obtener URL pública (síncrono, sin error)
  const { data: urlData } = supabase
    .storage
    .from('fotos')
    .getPublicUrl(uploadData.path)

  if (!urlData.publicUrl) {
    throw new Error('Error obteniendo la URL pública')
  }

  return urlData.publicUrl
}

export async function savePhotoUrl(
  url: string,
  extra?: Record<string, any>
): Promise<any> {
  const payload = { foto_url: url, ...extra }
  const response = await apiPhotos.post('/fotos', payload)
  return response.data
}

export async function uploadAndSavePhoto(
  file: File,
  extra?: Record<string, any>
): Promise<any> {
  const url = await uploadToSupabase(file)
  return savePhotoUrl(url, extra)
}
