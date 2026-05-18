'use client'

import { useState, useRef, useEffect } from 'react'

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'
const CATEGORIAS = ['IA', 'Móviles', 'Ordenadores', 'Software', 'Gadgets']

type Tab = 'archivo' | 'tema'

export default function AdminPage() {
  const [apiKey, setApiKey] = useState('')
  const [tab, setTab] = useState<Tab>('archivo')
  const [file, setFile] = useState<File | null>(null)
  const [tema, setTema] = useState('')
  const [categoria, setCategoria] = useState('IA')
  const [urlAfiliado, setUrlAfiliado] = useState('')
  const [loading, setLoading] = useState(false)
  const [statusMsg, setStatusMsg] = useState('')
  const [slugs, setSlugs] = useState<string[]>([])
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const saved = localStorage.getItem('tp_api_key')
    if (saved) setApiKey(saved)
  }, [])

  const saveKey = (k: string) => {
    setApiKey(k)
    localStorage.setItem('tp_api_key', k)
  }

  const reset = () => { setStatusMsg(''); setSlugs([]) }

  const handleArchivo = async () => {
    if (!file) { setStatusMsg('⚠️ Elige un archivo primero.'); return }
    if (!apiKey) { setStatusMsg('⚠️ Introduce tu API key.'); return }
    setLoading(true); reset()
    setStatusMsg('⏳ Subiendo y analizando archivo...')
    try {
      const form = new FormData()
      form.append('archivo', file)
      const res = await fetch(`${API_BASE}/api/subir-archivo`, {
        method: 'POST',
        headers: { 'x-api-key': apiKey },
        body: form,
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail ?? JSON.stringify(data))
      setStatusMsg(`✅ ${data.articulos_generados} artículo(s) generado(s). Vercel rebuild: ${data.vercel_triggered ? 'sí' : 'no'}`)
      setSlugs(data.slugs)
    } catch (e: unknown) {
      setStatusMsg('❌ ' + (e instanceof Error ? e.message : String(e)))
    } finally {
      setLoading(false)
    }
  }

  const handleTema = async () => {
    if (!tema.trim()) { setStatusMsg('⚠️ Escribe el tema primero.'); return }
    if (!apiKey) { setStatusMsg('⚠️ Introduce tu API key.'); return }
    setLoading(true); reset()
    setStatusMsg('⏳ Generando artículo con IA...')
    try {
      const res = await fetch(`${API_BASE}/api/generar-contenido`, {
        method: 'POST',
        headers: { 'x-api-key': apiKey, 'Content-Type': 'application/json' },
        body: JSON.stringify({ tema, categoria, url_afiliado: urlAfiliado.trim() || null }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail ?? JSON.stringify(data))
      setStatusMsg(`✅ Artículo generado. Vercel rebuild: ${data.vercel_triggered ? 'sí' : 'no'}`)
      setSlugs([data.articulo.slug])
    } catch (e: unknown) {
      setStatusMsg('❌ ' + (e instanceof Error ? e.message : String(e)))
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ maxWidth: 620, margin: '48px auto', padding: '0 24px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 8 }}>TechPulse Admin</h1>
      <p style={{ fontSize: 14, color: '#666', marginBottom: 32 }}>Genera artículos SEO automáticamente con IA.</p>

      {/* API Key */}
      <section style={{ marginBottom: 28, padding: '16px 20px', background: '#f8f8f8', borderRadius: 10, border: '1px solid #eee' }}>
        <label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: 1, color: '#888', marginBottom: 8 }}>API KEY</label>
        <input
          type="password"
          value={apiKey}
          onChange={e => saveKey(e.target.value)}
          placeholder="tpulse-..."
          style={{ width: '100%', padding: '9px 12px', border: '1px solid #ddd', borderRadius: 7, fontSize: 14, boxSizing: 'border-box', outline: 'none' }}
        />
      </section>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {(['archivo', 'tema'] as Tab[]).map(t => (
          <button
            key={t}
            onClick={() => { setTab(t); reset() }}
            style={{
              padding: '9px 20px', borderRadius: 7, border: 'none', cursor: 'pointer',
              fontWeight: 600, fontSize: 14,
              background: tab === t ? '#111' : '#efefef',
              color: tab === t ? '#fff' : '#444',
              transition: 'background 0.15s',
            }}
          >
            {t === 'archivo' ? '📄 Subir PDF / DOCX' : '✏️ Escribir tema'}
          </button>
        ))}
      </div>

      {/* Panel archivo */}
      {tab === 'archivo' && (
        <div style={{ padding: 24, border: '2px dashed #ddd', borderRadius: 10, textAlign: 'center' }}>
          <input
            ref={fileRef}
            type="file"
            accept=".pdf,.docx,.txt,.md"
            onChange={e => setFile(e.target.files?.[0] ?? null)}
            style={{ display: 'none' }}
          />
          <button
            onClick={() => fileRef.current?.click()}
            style={{ padding: '9px 20px', background: '#f0f0f0', border: '1px solid #ddd', borderRadius: 7, cursor: 'pointer', fontSize: 14 }}
          >
            Elegir archivo
          </button>
          {file && (
            <p style={{ marginTop: 10, fontSize: 13, color: '#555' }}>📎 {file.name}</p>
          )}
          <div style={{ marginTop: 16 }}>
            <button
              onClick={handleArchivo}
              disabled={loading || !file}
              style={{
                padding: '10px 28px', background: loading || !file ? '#ccc' : '#111',
                color: '#fff', border: 'none', borderRadius: 7,
                cursor: loading || !file ? 'not-allowed' : 'pointer', fontWeight: 600, fontSize: 14,
              }}
            >
              {loading ? 'Procesando…' : 'Generar artículos'}
            </button>
          </div>
          <p style={{ marginTop: 12, fontSize: 12, color: '#999' }}>Sube un PDF, DOCX o TXT. La IA extrae los temas y genera un artículo por cada uno.</p>
        </div>
      )}

      {/* Panel tema manual */}
      {tab === 'tema' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <textarea
            value={tema}
            onChange={e => setTema(e.target.value)}
            placeholder="Ej: Los mejores móviles Android de 2025 con gran batería y cámara profesional..."
            rows={4}
            style={{ padding: '10px 14px', border: '1px solid #ddd', borderRadius: 7, fontSize: 14, resize: 'vertical', outline: 'none', lineHeight: 1.5 }}
          />
          <div style={{ display: 'flex', gap: 10 }}>
            <select
              value={categoria}
              onChange={e => setCategoria(e.target.value)}
              style={{ flex: '0 0 140px', padding: '9px 12px', border: '1px solid #ddd', borderRadius: 7, fontSize: 14 }}
            >
              {CATEGORIAS.map(c => <option key={c}>{c}</option>)}
            </select>
            <input
              value={urlAfiliado}
              onChange={e => setUrlAfiliado(e.target.value)}
              placeholder="URL afiliado (opcional)"
              style={{ flex: 1, padding: '9px 12px', border: '1px solid #ddd', borderRadius: 7, fontSize: 14, outline: 'none' }}
            />
          </div>
          <button
            onClick={handleTema}
            disabled={loading || !tema.trim()}
            style={{
              padding: '10px 28px', background: loading || !tema.trim() ? '#ccc' : '#111',
              color: '#fff', border: 'none', borderRadius: 7,
              cursor: loading || !tema.trim() ? 'not-allowed' : 'pointer', fontWeight: 600, fontSize: 14,
            }}
          >
            {loading ? 'Generando…' : 'Generar artículo'}
          </button>
        </div>
      )}

      {/* Status */}
      {statusMsg && (
        <div style={{
          marginTop: 20, padding: '12px 16px',
          background: statusMsg.startsWith('❌') ? '#fff5f5' : statusMsg.startsWith('⚠️') ? '#fffbeb' : '#f0fdf4',
          border: `1px solid ${statusMsg.startsWith('❌') ? '#fca5a5' : statusMsg.startsWith('⚠️') ? '#fde68a' : '#86efac'}`,
          borderRadius: 8, fontSize: 14, lineHeight: 1.5,
        }}>
          {statusMsg}
        </div>
      )}

      {/* Artículos generados */}
      {slugs.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: '#444' }}>Artículos publicados:</p>
          {slugs.map(slug => (
            <a
              key={slug}
              href={`/es/blog/${slug}`}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '9px 14px', background: '#f5f5f5', borderRadius: 7,
                marginBottom: 6, fontSize: 13, color: '#111', textDecoration: 'none',
                border: '1px solid #e5e5e5',
              }}
            >
              <span>→</span> <span style={{ fontFamily: 'monospace' }}>{slug}</span>
            </a>
          ))}
        </div>
      )}
    </main>
  )
}
