<script setup lang="ts">
import type { ClinicalItem } from '@/types/clinical'

const props = defineProps<{
  item: ClinicalItem
  checked: boolean
  excluded: boolean
  relevant: boolean  // matches active pathology filter
  filtered: boolean  // a pathology filter is active
}>()

const emit = defineEmits<{
  toggle: [item: ClinicalItem]
}>()

function handleClick() {
  if (!props.excluded) {
    emit('toggle', props.item)
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
      'is-relevant': relevant && filtered && !checked,
    }"
    role="checkbox"
    :aria-checked="checked"
    :aria-disabled="excluded"
    tabindex="0"
    @click="handleClick"
    @keydown="handleKey"
  >
    <!-- Custom Checkbox -->
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

    <!-- Label area -->
    <div class="item-body">
      <span class="item-label">{{ item.label }}</span>

      <!-- Badges -->
      <span v-if="relevant && filtered && !checked" class="badge badge--relevant">
        Relevante
      </span>
      <span v-if="excluded" class="badge badge--excluded" title="Incompatible con otro ítem seleccionado">
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
  /* Generous touch target — WCAG 2.5.8 compliance */
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

/* ── Checked state ── */
.check-item.is-checked {
  background: var(--c-checked-bg);
  border-color: var(--c-checked-border);
}

.check-item.is-checked:hover {
  background: #d5e7ff;
  border-color: var(--c-primary);
}

/* ── Excluded state ── */
.check-item.is-excluded {
  opacity: 0.38;
  cursor: not-allowed;
  pointer-events: none;
}

/* ── Relevant state (pathology filter active) ── */
.check-item.is-relevant {
  background: var(--c-warning-bg);
  border-color: rgba(253, 216, 53, 0.5);
}

.check-item.is-relevant:hover {
  background: #fff3cd;
  border-color: var(--c-warning-border);
}

/* ── Custom checkbox ── */
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

.is-relevant .cb {
  border-color: #f9a825;
}

.cb-check {
  width: 12px;
  height: 9px;
  animation: checkBounce 0.22s ease forwards;
}

/* ── Label ── */
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

/* ── Badges ── */
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

.badge--relevant {
  background: #fff3cd;
  color: #856404;
  border: 1px solid #fdd835;
}

.badge--excluded {
  background: #f0f0f0;
  color: #888;
  border: 1px solid #ddd;
}
</style>
