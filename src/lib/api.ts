import type { Post } from '@/data/posts'
import { AUTHORS } from '@/data/posts'

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=630&fit=crop'

const CATEGORIA_MAP: Record<string, string> = {
  IA: 'ia',
  Móviles: 'smartphones',
  Ordenadores: 'laptops',
  Software: 'ia',
  Gadgets: 'wearables',
}

export interface ApiArticulo {
  id: number
  slug: string
  titulo: string
  categoria: string
  contenido_html: string
  url_afiliado?: string | null
  imagen_url?: string | null
  imagen_alt?: string | null
  fecha_publicacion: string
  estado: string
}

function stripHtml(html: string, maxLength = 180): string {
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  return text.length > maxLength ? text.slice(0, maxLength - 1) + '…' : text
}

function readingTime(html: string): number {
  const words = html.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

export function mapApiToPost(a: ApiArticulo): Post {
  const categorySlug = CATEGORIA_MAP[a.categoria] ?? 'ia'
  const excerpt = stripHtml(a.contenido_html, 180)
  return {
    slug: a.slug,
    title: { es: a.titulo, en: a.titulo },
    excerpt: { es: excerpt, en: excerpt },
    content: { es: a.contenido_html, en: a.contenido_html },
    category: categorySlug,
    tags: [a.categoria],
    author: AUTHORS.carlos,
    publishedAt: a.fecha_publicacion,
    updatedAt: a.fecha_publicacion,
    readingTime: readingTime(a.contenido_html),
    image: a.imagen_url || DEFAULT_IMAGE,
    imageAlt: { es: a.imagen_alt || a.titulo, en: a.imagen_alt || a.titulo },
    featured: false,
    contentIsHtml: true,
  }
}

export async function fetchApiPosts(): Promise<Post[]> {
  try {
    const res = await fetch(`${API_BASE}/api/articulos`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) return []
    const data: ApiArticulo[] = await res.json()
    return data.map(mapApiToPost)
  } catch {
    return []
  }
}

export async function fetchApiPost(slug: string): Promise<Post | null> {
  try {
    const res = await fetch(`${API_BASE}/api/articulos/${slug}`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) return null
    const data: ApiArticulo = await res.json()
    return mapApiToPost(data)
  } catch {
    return null
  }
}
