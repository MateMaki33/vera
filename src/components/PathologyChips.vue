<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import type { Pathology } from '@/types/clinical'

const props = defineProps<{
  pathologies: Pathology[]
  active: string | null
}>()

const emit = defineEmits<{
  select: [id: string | null]
}>()

function select(id: string | null) {
  emit('select', props.active === id ? null : id)
}

// ── Scroll / carousel logic ──────────────────────────────────
const scrollEl = ref<HTMLElement | null>(null)
const canScrollLeft  = ref(false)
const canScrollRight = ref(false)

function updateArrows() {
  const el = scrollEl.value
  if (!el) return
  canScrollLeft.value  = el.scrollLeft > 4
  canScrollRight.value = el.scrollLeft < el.scrollWidth - el.clientWidth - 4
}

function scrollBy(direction: 'left' | 'right') {
  const el = scrollEl.value
  if (!el) return
  const amount = el.clientWidth * 0.6
  el.scrollBy({ left: direction === 'right' ? amount : -amount, behavior: 'smooth' })
}

// Mouse drag-to-scroll
let isDragging = false
let dragStartX = 0
let dragScrollLeft = 0

function onMouseDown(e: MouseEvent) {
  if ((e.target as HTMLElement).closest('button.chip')) return
  isDragging = true
  dragStartX = e.pageX - (scrollEl.value?.offsetLeft ?? 0)
  dragScrollLeft = scrollEl.value?.scrollLeft ?? 0
  scrollEl.value?.classList.add('is-dragging')
}

function onMouseMove(e: MouseEvent) {
  if (!isDragging || !scrollEl.value) return
  e.preventDefault()
  const x = e.pageX - (scrollEl.value.offsetLeft ?? 0)
  const walk = (x - dragStartX) * 1.2
  scrollEl.value.scrollLeft = dragScrollLeft - walk
}

function onMouseUp() {
  isDragging = false
  scrollEl.value?.classList.remove('is-dragging')
}

onMounted(() => {
  nextTick(() => {
    updateArrows()
    scrollEl.value?.addEventListener('scroll', updateArrows, { passive: true })
    window.addEventListener('resize', updateArrows, { passive: true })
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  })
})

onUnmounted(() => {
  scrollEl.value?.removeEventListener('scroll', updateArrows)
  window.removeEventListener('resize', updateArrows)
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', onMouseUp)
})

// Re-check arrows when pathology list changes
watch(() => props.pathologies, () => nextTick(updateArrows))
</script>

<template>
  <div class="filter-bar" role="navigation" aria-label="Filtro por patología">

    <!-- Left arrow -->
    <Transition name="arrow">
      <button
        v-show="canScrollLeft"
        class="scroll-arrow scroll-arrow--left"
        @click="scrollBy('left')"
        aria-label="Desplazar izquierda"
        tabindex="-1"
      >
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2"
             stroke-linecap="round" stroke-linejoin="round">
          <polyline points="10,3 5,8 10,13" />
        </svg>
      </button>
    </Transition>

    <!-- Scrollable chips track -->
    <div
      class="chips-scroll"
      ref="scrollEl"
      @mousedown="onMouseDown"
    >
      <div class="chips-inner">

        <!-- "Todas" chip -->
        <button
          class="chip"
          :class="{ 'chip--active': active === null }"
          @click="select(null)"
          title="Mostrar todos los ítems"
        >
          <span class="chip-dot chip-dot--all" aria-hidden="true"></span>
          <span>Todas</span>
        </button>

        <div class="chip-divider" aria-hidden="true"></div>

        <!-- Pathology chips -->
        <button
          v-for="p in pathologies"
          :key="p.id"
          class="chip"
          :class="{ 'chip--active': active === p.id }"
          :data-path="p.id"
          @click="select(p.id)"
          :title="p.label"
        >
          <span class="chip-dot" :data-path="p.id" aria-hidden="true"></span>
          <span>{{ p.label }}</span>
        </button>

      </div>
    </div>

    <!-- Right arrow -->
    <Transition name="arrow">
      <button
        v-show="canScrollRight"
        class="scroll-arrow scroll-arrow--right"
        @click="scrollBy('right')"
        aria-label="Desplazar derecha"
        tabindex="-1"
      >
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2"
             stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6,3 11,8 6,13" />
        </svg>
      </button>
    </Transition>

    <!-- Fade edges (decorative, pointer-events: none) -->
    <div class="fade-left"  aria-hidden="true"></div>
    <div class="fade-right" aria-hidden="true"></div>

  </div>
</template>

<style scoped>
.filter-bar {
  position: sticky;
  top: var(--header-h);
  z-index: 100;
  background: var(--c-surface);
  border-bottom: 1px solid var(--c-border-light);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  height: var(--filter-h);
  display: flex;
  align-items: center;
  overflow: hidden;       /* clips the scrollable track + fades */
}

/* ── Scroll arrows ── */
.scroll-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 28px;
  height: 28px;
  border-radius: var(--r-md);
  background: var(--c-surface);
  border: 1.5px solid var(--c-border);
  color: var(--c-text-2);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-sm);
  transition: background var(--t-fast), border-color var(--t-fast),
              color var(--t-fast), box-shadow var(--t-fast),
              opacity var(--t-fast);
  cursor: pointer;
}

.scroll-arrow:hover {
  background: var(--c-primary-bg);
  border-color: var(--c-primary-border);
  color: var(--c-primary);
  box-shadow: var(--shadow-md);
}

.scroll-arrow:active {
  transform: translateY(-50%) scale(0.93);
}

.scroll-arrow--left  { left: var(--sp-2); }
.scroll-arrow--right { right: var(--sp-2); }

.scroll-arrow svg {
  width: 12px;
  height: 12px;
  flex-shrink: 0;
}

/* Fade decorative overlays */
.fade-left,
.fade-right {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 48px;
  pointer-events: none;
  z-index: 5;
}

.fade-left {
  left: 0;
  background: linear-gradient(to right, var(--c-surface) 0%, transparent 100%);
}

.fade-right {
  right: 0;
  background: linear-gradient(to left, var(--c-surface) 0%, transparent 100%);
}

/* ── Scrollable track ── */
.chips-scroll {
  flex: 1;
  height: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  display: flex;
  align-items: center;
  cursor: grab;
  /* Padding to avoid content hiding under arrows when they show */
  padding: 0 var(--sp-2);
}

.chips-scroll::-webkit-scrollbar {
  display: none;
}

.chips-scroll.is-dragging {
  cursor: grabbing;
  user-select: none;
}

.chips-inner {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  padding: 0 var(--sp-4);
  /* Critical: let content define its own width so it doesn't wrap */
  min-width: max-content;
  flex-shrink: 0;
}

/* ── Chip ── */
.chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px 7px 10px;
  border-radius: var(--r-full);
  font-size: var(--text-sm);
  font-weight: var(--fw-medium);
  color: var(--c-text-2);
  background: var(--c-bg);
  border: 1.5px solid var(--c-border);
  transition:
    background var(--t-fast),
    color var(--t-fast),
    border-color var(--t-fast),
    box-shadow var(--t-fast),
    transform var(--t-fast);
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  min-height: 38px;
  letter-spacing: -0.01em;
  flex-shrink: 0;
}

.chip:hover {
  background: var(--c-surface-hover);
  border-color: var(--c-primary-border);
  color: var(--c-primary);
}

.chip:active {
  transform: scale(0.96);
}

.chip--active {
  background: var(--c-primary);
  border-color: var(--c-primary);
  color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 63, 138, 0.3);
}

.chip--active:hover {
  background: var(--c-primary-hover);
  border-color: var(--c-primary-hover);
  color: #ffffff;
}

/* ── Colored dot ── */
.chip-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  background: var(--c-border);
  transition: background var(--t-fast);
}

.chip--active .chip-dot {
  background: rgba(255, 255, 255, 0.7);
}

.chip-dot--all {
  background: linear-gradient(135deg, var(--c-primary), var(--c-accent));
}

/* Pathology dot colors */
.chip-dot[data-path="pat_pcr"]          { background: #c0392b; }
.chip-dot[data-path="pat_inconsciente"] { background: #6c3483; }
.chip-dot[data-path="pat_convulsion"]   { background: #1a5276; }
.chip-dot[data-path="pat_ictus"]        { background: #7d3c98; }
.chip-dot[data-path="pat_torácico"]     { background: #922b21; }
.chip-dot[data-path="pat_agitado"]      { background: #d35400; }
.chip-dot[data-path="pat_respiratorio"] { background: #1a6bbf; }
.chip-dot[data-path="pat_anafilaxia"]   { background: #b7770d; }
.chip-dot[data-path="pat_sincope"]      { background: #117a65; }
.chip-dot[data-path="pat_trauma"]       { background: #7d6608; }

.chip--active .chip-dot[data-path] {
  background: rgba(255, 255, 255, 0.75);
}

/* ── Divider ── */
.chip-divider {
  width: 1px;
  height: 24px;
  background: var(--c-border);
  flex-shrink: 0;
  margin: 0 var(--sp-1);
}

/* ── Arrow transition ── */
.arrow-enter-active,
.arrow-leave-active {
  transition: opacity var(--t-fast), transform var(--t-fast);
}
.arrow-enter-from,
.arrow-leave-to {
  opacity: 0;
  transform: translateY(-50%) scale(0.8);
}

/* ── Responsive ── */
@media (max-width: 480px) {
  .chips-inner {
    padding: 0 var(--sp-3);
    gap: 6px;
  }
  .chip {
    padding: 6px 11px 6px 8px;
    font-size: var(--text-xs);
    min-height: 34px;
  }
  /* Hide arrows on touch — native swipe handles it */
  .scroll-arrow {
    display: none;
  }
}
</style>
