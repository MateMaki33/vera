import { computed } from 'vue'
import type { Ref } from 'vue'
import type { Section } from '@/types/clinical'

export function useTextGenerator(sections: Section[], checkedIds: Ref<Set<string>>) {
  const generatedText = computed<string>(() => {
    const allItems = sections.flatMap(s => s.items)

    const selected = allItems
      .filter(item => checkedIds.value.has(item.id))
      .sort((a, b) => a.orden - b.orden)

    if (selected.length === 0) return ''
    return selected.map(item => item.text).join(' ')
  })

  const wordCount = computed<number>(() => {
    const text = generatedText.value.trim()
    if (!text) return 0
    return text.split(/\s+/).length
  })

  // Count sentences by looking for sentence-ending punctuation
  const sentenceCount = computed<number>(() => {
    const text = generatedText.value.trim()
    if (!text) return 0
    const matches = text.match(/[^.!?]*[.!?]+/g)
    return matches ? matches.length : 1
  })

  const charCount = computed<number>(() => generatedText.value.length)

  return { generatedText, wordCount, sentenceCount, charCount }
}
