<script setup lang="ts">
import { computed } from 'vue'
import type { Section, ClinicalItem } from '@/types/clinical'
import CheckItem from './CheckItem.vue'

const props = defineProps<{
  section: Section
  isOpen: boolean
  checkedCount: number
  activePathology: string | null
  isChecked: (id: string) => boolean
  isExcluded: (item: ClinicalItem) => boolean
}>()

const emit = defineEmits<{
  toggle: []
  toggleItem: [item: ClinicalItem]
}>()

// Ordered items for display
const orderedItems = computed(() =>
  [...props.section.items].sort((a, b) => a.orden - b.orden)
)

function isRelevant(item: ClinicalItem): boolean {
  if (!props.activePathology) return false
  return (
    item.patologias.length === 0 ||
    item.patologias.includes(props.activePathology)
  )
}

const relevantCount = computed(() => {
  if (!props.activePathology) return 0
  return orderedItems.value.filter(item => isRelevant(item)).length
})

// Map section id to accent color
const SECTION_COLORS: Record<string, string> = {
  sec_activacion:    'var(--sec-activacion)',
  sec_llegada:       'var(--sec-llegada)',
  sec_tiempo:        'var(--sec-tiempo)',
  sec_neurologia:    'var(--sec-neurologia)',
  sec_respiratorio:  'var(--sec-respiratorio)',
  sec_cardiovascular:'var(--sec-cardiovascular)',
  sec_dolor:         'var(--sec-dolor)',
  sec_metabolico:    'var(--sec-metabolico)',
  sec_sintomas_acomp:'var(--sec-sintomas)',
  sec_trauma:        'var(--sec-trauma)',
  sec_intervenciones:'var(--sec-intervenciones)',
  sec_seguridad:     'var(--sec-seguridad)',
  sec_pertenencias:  'var(--sec-pertenencias)',
  sec_traslado:      'var(--sec-traslado)',
}

const accentColor = computed(
  () => SECTION_COLORS[props.section.id] ?? 'var(--c-primary)'
)

// Accordion animation
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
  (el as HTMLElement).style.height = 'auto'
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
  (el as HTMLElement).style.height = ''
}
</script>

<template>
  <article
    class="section-card"
    :class="{ 'is-open': isOpen, 'has-checked': checkedCount > 0 }"
  >
    <!-- Section Header -->
    <button
      class="section-header"
      :style="{ '--accent': accentColor }"
      :aria-expanded="isOpen"
      @click="emit('toggle')"
    >
      <span class="section-accent-bar" aria-hidden="true"></span>

      <span class="section-num" aria-hidden="true">
        {{ section.orden_seccion }}
      </span>

      <span class="section-info">
        <span class="section-title">{{ section.titulo }}</span>
        <span v-if="section.descripcion" class="section-desc">
          {{ section.descripcion }}
        </span>
      </span>

      <span class="section-meta">
        <!-- Relevant count badge when filter active -->
        <span
          v-if="activePathology && relevantCount > 0"
          class="meta-badge meta-badge--relevant"
          title="Ítems relevantes para esta patología"
        >
          {{ relevantCount }} rel.
        </span>

        <!-- Checked count badge -->
        <span v-if="checkedCount > 0" class="meta-badge meta-badge--checked">
          <svg viewBox="0 0 12 9" fill="none" stroke="currentColor" stroke-width="2.5"
               stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="1,4.5 4.5,8 11,1" />
          </svg>
          {{ checkedCount }}
        </span>

        <!-- Item count -->
        <span class="meta-total">{{ section.items.length }}</span>
      </span>

      <!-- Chevron -->
      <span class="chevron" aria-hidden="true">
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round">
          <polyline points="4,6 8,10 12,6" />
        </svg>
      </span>
    </button>

    <!-- Items List (accordion body) -->
    <Transition
      @enter="onEnter"
      @after-enter="onAfterEnter"
      @leave="onLeave"
      @after-leave="onAfterLeave"
    >
      <div v-if="isOpen" class="section-body">
        <div class="items-list">
          <CheckItem
            v-for="item in orderedItems"
            :key="item.id"
            :item="item"
            :checked="isChecked(item.id)"
            :excluded="isExcluded(item)"
            :relevant="isRelevant(item)"
            :filtered="!!activePathology"
            @toggle="emit('toggleItem', $event)"
          />
        </div>
      </div>
    </Transition>
  </article>
</template>

<style scoped>
.section-card {
  background: var(--c-surface);
  border-radius: var(--r-lg);
  border: 1.5px solid var(--c-border-light);
  overflow: hidden;
  transition: border-color var(--t), box-shadow var(--t);
}

.section-card.has-checked {
  border-color: var(--c-primary-border);
  box-shadow: var(--shadow-sm);
}

/* ── Header ── */
.section-header {
  width: 100%;
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  padding: 12px 14px 12px 0;
  text-align: left;
  /* Generous touch target for tablet */
  min-height: 56px;
  transition: background var(--t-fast);
  position: relative;
}

@media (min-width: 768px) {
  .section-header {
    gap: var(--sp-3);
    padding: 13px 16px 13px 0;
    min-height: 58px;
  }
}

.section-header:hover {
  background: var(--c-surface-2);
}

.section-header:active {
  background: var(--c-surface-hover);
}

.section-header:focus-visible {
  outline: 2px solid var(--c-primary);
  outline-offset: -2px;
}

/* Left accent bar */
.section-accent-bar {
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

.is-open .section-accent-bar {
  width: 5px;
}

/* Number badge */
.section-num {
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
  .section-num {
    width: 28px;
    height: 28px;
    margin-left: var(--sp-4);
  }
}

.is-open .section-num,
.has-checked .section-num {
  background: color-mix(in srgb, var(--accent) 18%, transparent);
}

/* Title / description */
.section-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.section-title {
  font-size: var(--text-base);
  font-weight: var(--fw-semibold);
  color: var(--c-text);
  line-height: 1.3;
}

.section-desc {
  font-size: var(--text-xs);
  color: var(--c-text-muted);
  line-height: 1.35;
  display: none;
}

@media (min-width: 480px) {
  .section-desc {
    display: block;
  }
}

/* Meta area — allow shrink to avoid squeezing the title */
.section-meta {
  display: flex;
  align-items: center;
  gap: var(--sp-1);
  flex-shrink: 1;
  min-width: 0;
  overflow: hidden;
}

@media (min-width: 480px) {
  .section-meta {
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

.meta-badge--relevant {
  background: var(--c-warning-bg);
  color: var(--c-warning-text);
  border: 1px solid rgba(253, 216, 53, 0.6);
  /* Hide on very small screens to prevent overflow */
  display: none;
}

@media (min-width: 380px) {
  .meta-badge--relevant {
    display: inline-flex;
  }
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

/* ── Body / Items ── */
.section-body {
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
