export interface Pathology {
  id: string
  label: string
}

export interface ClinicalItem {
  id: string
  orden: number
  label: string
  text: string
  patologias: string[]
  exclusivo_con?: string[]
  grupo_texto?: string
  prefijo_grupo?: string
  fragmento?: string
  fragmento_separado?: boolean
}

export interface Section {
  id: string
  titulo: string
  descripcion: string
  orden_seccion: number
  items: ClinicalItem[]
}

export interface ClinicalData {
  _meta: {
    descripcion: string
    version: string
    autoria: string
    nota_legal: string
  }
  patologias_contextuales: Pathology[]
  secciones: Section[]
}
