import { ref, computed } from 'vue'
import type { Section, ClinicalItem } from '@/types/clinical'

export function useAssessment(sections: Section[]) {
  const checkedIds = ref<Set<string>>(new Set())

  // Build exclusion map once: itemId → Set of mutually-exclusive itemIds
  const exclusionMap = new Map<string, Set<string>>()
  for (const section of sections) {
    for (const item of section.items) {
      if (item.exclusivo_con?.length) {
        exclusionMap.set(item.id, new Set(item.exclusivo_con))
      }
    }
  }

  function toggle(item: ClinicalItem): void {
    const next = new Set(checkedIds.value)

    if (next.has(item.id)) {
      next.delete(item.id)
    } else {
      // Uncheck items this item directly excludes
      exclusionMap.get(item.id)?.forEach(id => next.delete(id))

      // Uncheck items that have this item in their exclusion list
      exclusionMap.forEach((exclusives, id) => {
        if (exclusives.has(item.id)) next.delete(id)
      })

      next.add(item.id)
    }

    checkedIds.value = next
  }

  function isChecked(id: string): boolean {
    return checkedIds.value.has(id)
  }

  function isExcluded(item: ClinicalItem): boolean {
    if (checkedIds.value.has(item.id)) return false

    // Excluded if any checked item directly excludes this one
    for (const checkedId of checkedIds.value) {
      if (exclusionMap.get(checkedId)?.has(item.id)) return true
    }

    // Excluded if this item would conflict with an already-checked item
    const myExclusives = exclusionMap.get(item.id)
    if (myExclusives) {
      for (const exclId of myExclusives) {
        if (checkedIds.value.has(exclId)) return true
      }
    }

    return false
  }

  function reset(): void {
    checkedIds.value = new Set()
  }

  const checkedCount = computed(() => checkedIds.value.size)

  function sectionCheckedCount(sectionId: string): number {
    const section = sections.find(s => s.id === sectionId)
    if (!section) return 0
    return section.items.filter(item => checkedIds.value.has(item.id)).length
  }

  return {
    checkedIds,
    toggle,
    isChecked,
    isExcluded,
    reset,
    checkedCount,
    sectionCheckedCount,
  }
}
