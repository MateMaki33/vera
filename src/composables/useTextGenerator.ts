/**
 * Generador de texto clínico a partir del árbol de valoración.
 *
 * Recorre los bloques visibles en orden clínico y, para cada bloque,
 * ensambla el texto de los ítems seleccionados según el modo declarado
 * en block.textAssembly:
 *
 *   'sentences'  (defecto): cada ítem genera su propia frase.
 *   'inline-list': los calificadores se concatenan en una única frase
 *                  cualitativa (usado para las constantes vitales).
 *
 * El texto resultante comienza con la frase de apertura del motivo
 * de activación y no incluye ningún diagnóstico ni interpretación.
 */

import { computed } from 'vue'
import type { ComputedRef, Ref } from 'vue'
import type { Block, Item } from '@/types/clinicalTree'

export function useTextGenerator(
  visibleBlocks: ComputedRef<Block[]>,
  itemsMap: Map<string, Item>,
  checkedIds: Ref<Set<string>>,
  openingText: ComputedRef<string>
) {
  const generatedText = computed<string>(() => {
    const segments: string[] = []

    // Frase de apertura del motivo de activación
    if (openingText.value) {
      segments.push(openingText.value)
    }

    for (const block of visibleBlocks.value) {
      // Ítems del bloque que están seleccionados, en el orden declarado
      const selectedItems = block.itemIds
        .filter(id => checkedIds.value.has(id))
        .map(id => itemsMap.get(id))
        .filter((item): item is Item => item !== undefined)

      if (selectedItems.length === 0) continue

      const assembly = block.textAssembly

      if (assembly?.mode === 'inline-list') {
        // Ensambla todos los calificadores en una sola frase
        // Ej: "A la valoración, paciente taquicárdico, hipotenso, taquipneico."
        const qualifiers = selectedItems.map(item => item.text).join(', ')
        const prefix = assembly.prefix ?? ''
        const suffix = assembly.suffix ?? '.'
        segments.push(`${prefix}${qualifiers}${suffix}`)
      } else {
        // Modo 'sentences': cada ítem aporta su propia frase completa
        for (const item of selectedItems) {
          segments.push(item.text)
        }
      }
    }

    // Reduce la repetición de sujetos consecutivos idénticos
    // Ej: "El paciente refiere X. El paciente refiere Y." →
    //     "El paciente refiere X. Refiere también Y."
    const SUBJECT_RE = /^(El paciente refiere |La paciente refiere )/
    const alternates = ['Refiere también ', 'Asimismo refiere ', 'También refiere ']
    let consecutive = 0
    const deduped = segments.map(seg => {
      const m = seg.match(SUBJECT_RE)
      if (m) {
        if (consecutive === 0) {
          consecutive++
          return seg
        }
        const alt = alternates[(consecutive - 1) % alternates.length]
        consecutive++
        return seg.replace(SUBJECT_RE, alt)
      }
      consecutive = 0
      return seg
    })

    return deduped.join(' ')
  })

  const wordCount = computed<number>(() => {
    const text = generatedText.value.trim()
    if (!text) return 0
    return text.split(/\s+/).length
  })

  const sentenceCount = computed<number>(() => {
    const text = generatedText.value.trim()
    if (!text) return 0
    const matches = text.match(/[^.!?]*[.!?]+/g)
    return matches ? matches.length : 1
  })

  const charCount = computed<number>(() => generatedText.value.length)

  return { generatedText, wordCount, sentenceCount, charCount }
}
