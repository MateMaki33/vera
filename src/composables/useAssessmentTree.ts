/**
 * useAssessmentTree con soporte para insertAfterBlockId
 */

import type { ActivationReason, Block, Item } from "@/types/clinicalTree";
import type { ComputedRef } from "vue";
import { computed, ref } from "vue";

export function useAssessmentTree(
  itemsMap: Map<string, Item>,
  blocksMap: Map<string, Block>,
  reasons: ActivationReason[],
) {
  const activeReasonId = ref<string | null>(null);
  const checkedIds = ref<Set<string>>(new Set());

  const exclusionMap = new Map<string, Set<string>>();
  for (const [id, item] of itemsMap) {
    if (item.excludes?.length) {
      exclusionMap.set(id, new Set(item.excludes));
    }
  }

  const activeReason: ComputedRef<ActivationReason | null> = computed(
    () => reasons.find((r) => r.id === activeReasonId.value) ?? null,
  );

  function setReason(reasonId: string | null): void {
    activeReasonId.value = reasonId;
    checkedIds.value = new Set();
  }

  const visibleBlocks: ComputedRef<Block[]> = computed(() => {
    const reason = activeReason.value;
    if (!reason) return [];

    const orderedIds: string[] = [...reason.commonBlockIds, ...reason.specificBlockIds];

    const addedIds = new Set(orderedIds);

    function insertBlocks(blockIds: string[], anchorId?: string) {
      const pending = blockIds.filter((id) => !addedIds.has(id));
      if (!pending.length) return;

      if (!anchorId) {
        pending.forEach((id) => {
          orderedIds.push(id);
          addedIds.add(id);
        });
        return;
      }

      const anchorIndex = orderedIds.indexOf(anchorId);

      if (anchorIndex === -1) {
        pending.forEach((id) => {
          orderedIds.push(id);
          addedIds.add(id);
        });
        return;
      }

      let insertIndex = anchorIndex + 1;

      while (insertIndex < orderedIds.length) {
        const current = orderedIds[insertIndex];

        if (!current) break;

        const isBase =
          reason!.commonBlockIds.includes(current) || reason!.specificBlockIds.includes(current);

        if (isBase) break;
        insertIndex++;
      }

      orderedIds.splice(insertIndex, 0, ...pending);
      pending.forEach((id) => addedIds.add(id));
    }

    for (const branch of reason.conditionalBranches) {
      const triggered =
        branch.whenAnyItemSelected?.some((id) => checkedIds.value.has(id)) ??
        (branch.whenAllItemsSelected
          ? branch.whenAllItemsSelected.every((id) => checkedIds.value.has(id))
          : false);

      if (triggered) {
        insertBlocks(branch.showBlockIds, branch.insertAfterBlockId);
      }
    }

    return orderedIds.map((id) => blocksMap.get(id)).filter((b): b is Block => b !== undefined);
  });

  function toggle(itemId: string): void {
    const item = itemsMap.get(itemId);
    if (!item) return;

    const next = new Set(checkedIds.value);

    if (next.has(itemId)) {
      next.delete(itemId);
    } else {
      exclusionMap.get(itemId)?.forEach((exId) => next.delete(exId));
      exclusionMap.forEach((exclusives, id) => {
        if (exclusives.has(itemId)) next.delete(id);
      });
      next.add(itemId);
    }

    checkedIds.value = next;
  }

  function isChecked(id: string): boolean {
    return checkedIds.value.has(id);
  }

  function isExcluded(itemId: string): boolean {
    if (checkedIds.value.has(itemId)) return false;

    for (const checkedId of checkedIds.value) {
      if (exclusionMap.get(checkedId)?.has(itemId)) return true;
    }

    const myExclusives = exclusionMap.get(itemId);
    if (myExclusives) {
      for (const exclId of myExclusives) {
        if (checkedIds.value.has(exclId)) return true;
      }
    }

    return false;
  }

  function reset(): void {
    checkedIds.value = new Set();
  }

  const checkedCount = computed(() => checkedIds.value.size);

  function blockCheckedCount(blockId: string): number {
    const block = blocksMap.get(blockId);
    if (!block) return 0;
    return block.itemIds.filter((id) => checkedIds.value.has(id)).length;
  }

  return {
    activeReasonId,
    activeReason,
    visibleBlocks,
    checkedIds,
    setReason,
    toggle,
    isChecked,
    isExcluded,
    reset,
    checkedCount,
    blockCheckedCount,
  };
}
