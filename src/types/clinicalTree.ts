/**
 * Árbol lógico de valoración por motivo de activación del recurso (VERA).
 *
 * Principio clínico fundamental: el motivo de activación no representa
 * un diagnóstico, sino la puerta de entrada a una valoración clínica
 * estructurada. El sistema genera únicamente registros de hallazgos
 * objetivos, referencias del paciente/testigos e intervenciones realizadas.
 * No emite diagnósticos ni interpretaciones diagnósticas.
 */

/** Hallazgo, registro objetivo o actuación individual */
export type Item = {
  id: string
  /** Etiqueta visible en la interfaz */
  label: string
  /**
   * Texto clínico objetivo incluido en el informe generado.
   * En bloques 'inline-list' es el calificador suelto ("normocárdico").
   * En bloques 'sentences' es una frase completa con punto final.
   */
  text: string
  /** Categoría funcional interna (entorno, constantes, intervención…) */
  category?: string
  /** Etiquetas semánticas para búsqueda o agrupación futura */
  tags?: string[]
  /**
   * IDs de ítems mutuamente excluyentes.
   * Al seleccionar este ítem se desmarcan automáticamente los listados aquí.
   * Debe definirse de forma simétrica en ambos extremos del par.
   */
  excludes?: string[]
}

/** Modo de ensamblado del texto de los ítems de un bloque */
export type BlockTextAssembly =
  | { mode: 'sentences' }
  | {
      mode: 'inline-list'
      /** Prefijo que precede a la lista de calificadores */
      prefix: string
      /** Sufijo que cierra la lista (por defecto '.') */
      suffix?: string
    }

/**
 * Bloque: agrupación de ítems clínicamente coherentes.
 * Unidad mínima de valoración en el árbol.
 * Los bloques con reusable=true pueden ser referenciados
 * desde múltiples motivos de activación sin duplicar datos.
 */
export type Block = {
  id: string
  /** Título del bloque visible en la interfaz */
  title: string
  /** Descripción breve del propósito clínico del bloque */
  description?: string
  /** IDs de ítems del bloque, en orden de aparición en la UI */
  itemIds: string[]
  /** Indica que el bloque puede ser reutilizado por varios motivos */
  reusable?: boolean
  /**
   * Controla cómo se ensamblan los textos seleccionados en el informe.
   * 'sentences' (por defecto): cada ítem genera su propia frase.
   * 'inline-list': los textos se concatenan en una sola frase cualitativa.
   */
  textAssembly?: BlockTextAssembly
}

/**
 * Rama condicional: expande el árbol de valoración de forma dinámica
 * cuando el profesional marca determinados hallazgos objetivos.
 */
export type ConditionalBranch = {
  id: string
  /** Condición OR: los bloques emergen si AL MENOS UNO de estos ítems está marcado */
  whenAnyItemSelected?: string[]
  /** Condición AND: los bloques emergen si TODOS estos ítems están marcados */
  whenAllItemsSelected?: string[]
  /** Bloques que se muestran al cumplirse la condición */
  showBlockIds: string[]
  /** Para insertar el bloque donde corresponde dentro de la valoración */
  insertAfterBlockId?: string

}

/**
 * Motivo de activación del recurso.
 * Nodo raíz del árbol lógico de valoración clínica extrahospitalaria.
 *
 * No es un diagnóstico ni predetermina la conclusión clínica.
 * Define el conjunto de bloques de valoración aplicables al caso
 * y las ramas condicionales que amplían la valoración según los
 * hallazgos objetivados durante la intervención.
 */
export type ActivationReason = {
  id: string
  /** Etiqueta visible en el selector de motivos */
  label: string
  /** Descripción breve del motivo de activación */
  description?: string
  /** Color de acento CSS para la interfaz (sin significado clínico) */
  accentColor: string
  /**
   * Frase de apertura del informe generado.
   * Contextualiza el motivo de activación sin emitir diagnóstico.
   */
  openingText: string
  /**
   * IDs de bloques comunes reutilizables siempre visibles para este motivo
   * (seguridad del entorno, llegada, constantes vitales, traslado…)
   */
  commonBlockIds: string[]
  /** IDs de bloques específicos de este motivo de activación */
  specificBlockIds: string[]
  /**
   * Ramas condicionales: bloques adicionales que emergen automáticamente
   * cuando el profesional marca ciertos hallazgos objetivos.
   */
  conditionalBranches: ConditionalBranch[]
}
