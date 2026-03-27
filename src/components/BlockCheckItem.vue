<script setup lang="ts">
import type { Item } from '@/types/clinicalTree'

const props = defineProps<{
  item: Item
  checked: boolean
  excluded: boolean
}>()

const emit = defineEmits<{
  toggle: [itemId: string]
}>()

function handleClick() {
  if (!props.excluded) {
    emit('toggle', props.item.id)
  }
}

function handleKey(e: KeyboardEvent) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    handleClick()
  }
}
</script>

<template>
  <div
    class="check-item"
    :class="{
      'is-checked': checked,
      'is-excluded': excluded,
    }"
    role="checkbox"
    :aria-checked="checked"
    :aria-disabled="excluded"
    tabindex="0"
    @click="handleClick"
    @keydown="handleKey"
  >
    <!-- Checkbox visual -->
    <div class="cb" aria-hidden="true">
      <svg
        v-if="checked"
        class="cb-check"
        viewBox="0 0 12 9"
        fill="none"
        stroke="white"
        stroke-width="2.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="1,4.5 4.5,8 11,1" />
      </svg>
    </div>

    <!-- Etiqueta -->
    <div class="item-body">
      <span class="item-label">{{ item.label }}</span>
      <span
        v-if="excluded"
        class="badge badge--excluded"
        title="Incompatible con otro ítem seleccionado"
      >
        Excluido
      </span>
    </div>
  </div>
</template>

<style scoped>
.check-item {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: var(--sp-3);
  padding: 11px 14px;
  border-radius: var(--r-md);
  border: 1.5px solid transparent;
  cursor: pointer;
  user-select: none;
  transition:
    background var(--t-fast),
    border-color var(--t-fast),
    opacity var(--t-fast);
  min-height: 48px;
  outline: none;
  -webkit-tap-highlight-color: transparent;
}

.check-item:focus-visible {
  outline: 2px solid var(--c-primary);
  outline-offset: 1px;
}

.check-item:hover:not(.is-excluded):not(.is-checked) {
  background: var(--c-surface-hover);
  border-color: var(--c-border);
}

.check-item:active:not(.is-excluded) {
  transform: scale(0.99);
}

/* ── Checked ── */
.check-item.is-checked {
  background: var(--c-checked-bg);
  border-color: var(--c-checked-border);
}

.check-item.is-checked:hover {
  background: #d5e7ff;
  border-color: var(--c-primary);
}

/* ── Excluded ── */
.check-item.is-excluded {
  opacity: 0.38;
  cursor: not-allowed;
  pointer-events: none;
}

/* ── Checkbox visual ── */
.cb {
  width: 20px;
  height: 20px;
  min-width: 20px;
  border-radius: 5px;
  border: 2px solid var(--c-border);
  background: var(--c-surface);
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    background var(--t-fast),
    border-color var(--t-fast),
    box-shadow var(--t-fast);
  margin-top: 1px;
  flex-shrink: 0;
}

.is-checked .cb {
  background: var(--c-primary);
  border-color: var(--c-primary);
  box-shadow: 0 1px 4px rgba(0, 63, 138, 0.35);
}

.cb-check {
  width: 12px;
  height: 9px;
  animation: checkBounce 0.22s ease forwards;
}

/* ── Etiqueta ── */
.item-body {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 6px;
  min-width: 0;
}

.item-label {
  font-size: var(--text-base);
  color: var(--c-text);
  line-height: 1.45;
  transition: color var(--t-fast);
  letter-spacing: -0.008em;
}

.is-checked .item-label {
  color: var(--c-checked-text);
  font-weight: var(--fw-medium);
}

/* ── Badge ── */
.badge {
  display: inline-flex;
  align-items: center;
  font-size: var(--text-xs);
  font-weight: var(--fw-semibold);
  padding: 2px 7px;
  border-radius: var(--r-full);
  letter-spacing: 0.04em;
  flex-shrink: 0;
}

.badge--excluded {
  background: #f0f0f0;
  color: #888;
  border: 1px solid #ddd;
}
</style>
