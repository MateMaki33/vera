<script setup lang="ts">
import { computed } from 'vue'
import type { Block, Item } from '@/types/clinicalTree'
import BlockCheckItem from './BlockCheckItem.vue'

const props = defineProps<{
  block: Block
  /** Índice visual del bloque (para el número de orden) */
  index: number
  isOpen: boolean
  checkedCount: number
  /** Ítems resueltos del bloque (se reciben ya mapeados desde la vista) */
  items: Item[]
  isChecked: (id: string) => boolean
  isExcluded: (id: string) => boolean
}>()

const emit = defineEmits<{
  toggle: []
  toggleItem: [itemId: string]
}>()

// 14 colores de acento ciclados del design system existente
const ACCENT_COLORS = [
  'var(--sec-activacion)',
  'var(--sec-llegada)',
  'var(--sec-tiempo)',
  'var(--sec-neurologia)',
  'var(--sec-respiratorio)',
  'var(--sec-cardiovascular)',
  'var(--sec-dolor)',
  'var(--sec-metabolico)',
  'var(--sec-sintomas)',
  'var(--sec-trauma)',
  'var(--sec-intervenciones)',
  'var(--sec-seguridad)',
  'var(--sec-pertenencias)',
  'var(--sec-traslado)',
]

const accentColor = computed(
  () => ACCENT_COLORS[props.index % ACCENT_COLORS.length] ?? 'var(--c-primary)'
)

// Animación de acordeón (misma lógica que SectionAccordion)
function onEnter(el: Element) {
  const htmlEl = el as HTMLElement
  htmlEl.style.height = '0px'
  htmlEl.style.opacity = '0'
  requestAnimationFrame(() => {
    htmlEl.style.height = htmlEl.scrollHeight + 'px'
    htmlEl.style.opacity = '1'
  })
}
function onAfterEnter(el: Element) {
  ;(el as HTMLElement).style.height = 'auto'
}
function onLeave(el: Element) {
  const htmlEl = el as HTMLElement
  htmlEl.style.height = htmlEl.scrollHeight + 'px'
  htmlEl.style.opacity = '1'
  requestAnimationFrame(() => {
    htmlEl.style.height = '0px'
    htmlEl.style.opacity = '0'
  })
}
function onAfterLeave(el: Element) {
  ;(el as HTMLElement).style.height = ''
}
</script>

<template>
  <article
    class="block-card"
    :class="{ 'is-open': isOpen, 'has-checked': checkedCount > 0 }"
  >
    <!-- Cabecera del bloque -->
    <button
      class="block-header"
      :style="{ '--accent': accentColor }"
      :aria-expanded="isOpen"
      @click="emit('toggle')"
    >
      <span class="block-accent-bar" aria-hidden="true"></span>

      <span class="block-num" aria-hidden="true">
        {{ index + 1 }}
      </span>

      <span class="block-info">
        <span class="block-title">{{ block.title }}</span>
        <span v-if="block.description" class="block-desc">
          {{ block.description }}
        </span>
      </span>

      <span class="block-meta">
        <!-- Contador de ítems marcados -->
        <span v-if="checkedCount > 0" class="meta-badge meta-badge--checked">
          <svg viewBox="0 0 12 9" fill="none" stroke="currentColor" stroke-width="2.5"
               stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="1,4.5 4.5,8 11,1" />
          </svg>
          {{ checkedCount }}
        </span>

        <!-- Total de ítems en el bloque -->
        <span class="meta-total">{{ items.length }}</span>
      </span>

      <!-- Chevron -->
      <span class="chevron" aria-hidden="true">
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round">
          <polyline points="4,6 8,10 12,6" />
        </svg>
      </span>
    </button>

    <!-- Cuerpo del acordeón -->
    <Transition
      @enter="onEnter"
      @after-enter="onAfterEnter"
      @leave="onLeave"
      @after-leave="onAfterLeave"
    >
      <div v-if="isOpen" class="block-body">
        <div class="items-list">
          <BlockCheckItem
            v-for="item in items"
            :key="item.id"
            :item="item"
            :checked="isChecked(item.id)"
            :excluded="isExcluded(item.id)"
            @toggle="emit('toggleItem', $event)"
          />
        </div>
      </div>
    </Transition>
  </article>
</template>

<style scoped>
.block-card {
  background: var(--c-surface);
  border-radius: var(--r-lg);
  border: 1.5px solid var(--c-border-light);
  overflow: hidden;
  transition: border-color var(--t), box-shadow var(--t);
}

.block-card.has-checked {
  border-color: var(--c-primary-border);
  box-shadow: var(--shadow-sm);
}

/* ── Cabecera ── */
.block-header {
  width: 100%;
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  padding: 12px 14px 12px 0;
  text-align: left;
  min-height: 56px;
  transition: background var(--t-fast);
  position: relative;
}

@media (min-width: 768px) {
  .block-header {
    gap: var(--sp-3);
    padding: 13px 16px 13px 0;
    min-height: 58px;
  }
}

.block-header:hover {
  background: var(--c-surface-2);
}

.block-header:active {
  background: var(--c-surface-hover);
}

.block-header:focus-visible {
  outline: 2px solid var(--c-primary);
  outline-offset: -2px;
}

/* Barra lateral de acento */
.block-accent-bar {
  display: block;
  width: 4px;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: var(--accent);
  border-radius: 0 2px 2px 0;
  transition: width var(--t);
}

.is-open .block-accent-bar {
  width: 5px;
}

/* Número de orden */
.block-num {
  flex-shrink: 0;
  width: 26px;
  height: 26px;
  border-radius: var(--r-sm);
  background: color-mix(in srgb, var(--accent) 12%, transparent);
  color: var(--accent);
  font-size: var(--text-xs);
  font-weight: var(--fw-bold);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: var(--sp-3);
  transition: background var(--t);
}

@media (min-width: 480px) {
  .block-num {
    width: 28px;
    height: 28px;
    margin-left: var(--sp-4);
  }
}

.is-open .block-num,
.has-checked .block-num {
  background: color-mix(in srgb, var(--accent) 18%, transparent);
}

/* Título y descripción */
.block-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.block-title {
  font-size: var(--text-base);
  font-weight: var(--fw-semibold);
  color: var(--c-text);
  line-height: 1.3;
}

.block-desc {
  font-size: var(--text-xs);
  color: var(--c-text-muted);
  line-height: 1.35;
  display: none;
}

@media (min-width: 480px) {
  .block-desc {
    display: block;
  }
}

/* Meta (contadores) */
.block-meta {
  display: flex;
  align-items: center;
  gap: var(--sp-1);
  flex-shrink: 1;
  min-width: 0;
  overflow: hidden;
}

@media (min-width: 480px) {
  .block-meta {
    gap: var(--sp-2);
  }
}

.meta-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: var(--text-xs);
  font-weight: var(--fw-semibold);
  padding: 3px 8px;
  border-radius: var(--r-full);
}

.meta-badge svg {
  width: 10px;
  height: 8px;
}

.meta-badge--checked {
  background: var(--c-primary-bg);
  color: var(--c-primary);
  border: 1px solid var(--c-primary-border);
}

.meta-total {
  font-size: var(--text-xs);
  color: var(--c-text-muted);
  min-width: 18px;
  text-align: right;
  font-weight: var(--fw-medium);
}

/* Chevron */
.chevron {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--c-text-muted);
  margin-right: var(--sp-2);
  transition: transform var(--t), color var(--t);
}

.chevron svg {
  width: 16px;
  height: 16px;
  transition: transform var(--t);
}

.is-open .chevron svg {
  transform: rotate(180deg);
}

/* ── Cuerpo / Lista de ítems ── */
.block-body {
  overflow: hidden;
  transition: height 0.28s ease, opacity 0.28s ease;
}

.items-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 4px 12px 12px;
  border-top: 1px solid var(--c-border-light);
}
</style>
