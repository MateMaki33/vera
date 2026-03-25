<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { ClinicalItem } from '@/types/clinical'
import type { ClinicalData } from '@/types/clinical'

import rawData from '@/collections/items.json'
import { useAssessment } from '@/composables/useAssessment'
import { useTextGenerator } from '@/composables/useTextGenerator'

import AppHeader from '@/components/AppHeader.vue'
import PathologyChips from '@/components/PathologyChips.vue'
import SectionAccordion from '@/components/SectionAccordion.vue'
import TextOutput from '@/components/TextOutput.vue'
import AppFooter from '@/components/AppFooter.vue'

// ── Data ──────────────────────────────────────────────────────
const data = rawData as unknown as ClinicalData

// ── Active pathology filter ───────────────────────────────────
const activePathology = ref<string | null>(null)

// ── Visible sections (always all; relevant items are highlighted, not filtered) ─
const visibleSections = computed(() => data.secciones)

// ── Assessment state ──────────────────────────────────────────
const { checkedIds, toggle, isChecked, isExcluded, reset, checkedCount, sectionCheckedCount } =
  useAssessment(data.secciones)

// ── Text generation ───────────────────────────────────────────
const { generatedText, wordCount, sentenceCount, charCount } = useTextGenerator(
  data.secciones,
  checkedIds
)

// ── Accordion open state ──────────────────────────────────────
const openSections = ref<Set<string>>(new Set())

function toggleSection(id: string) {
  const next = new Set(openSections.value)
  if (next.has(id)) {
    next.delete(id)
  } else {
    next.add(id)
  }
  openSections.value = next
}

// ── Item toggle ───────────────────────────────────────────────
function handleToggleItem(item: ClinicalItem) {
  toggle(item)
}

// ── Reset ─────────────────────────────────────────────────────
function handleReset() {
  reset()
  activePathology.value = null
  openSections.value = new Set()
}

// ── Mobile output panel toggle ────────────────────────────────
const showMobileOutput = ref(false)

watch(checkedCount, count => {
  if (count > 0) showMobileOutput.value = true
})
</script>

<template>
  <div class="page">

    <!-- Sticky Header -->
    <AppHeader :checked-count="checkedCount" @reset="handleReset" />

    <!-- Sticky Pathology Filter -->
    <PathologyChips
      :pathologies="data.patologias_contextuales"
      :active="activePathology"
      @select="id => (activePathology = id)"
    />

    <!-- Main Layout -->
    <main class="main-layout">

      <!-- ── Left Panel: Sections ── -->
      <div class="sections-panel">

        <!-- Filter notice -->
        <Transition name="notice">
          <div v-if="activePathology" class="filter-notice">
            <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
            </svg>
            <span>
              Ítems relevantes para
              <strong>{{ data.patologias_contextuales.find(p => p.id === activePathology)?.label }}</strong>
              destacados en amarillo. El resto también se muestra para una valoración completa.
            </span>
            <button class="notice-close" @click="activePathology = null" title="Quitar filtro">
              <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2"
                   stroke-linecap="round">
                <path d="M2 2l10 10M12 2L2 12" />
              </svg>
            </button>
          </div>
        </Transition>

        <!-- Sections list -->
        <div class="sections-list" role="list">
          <TransitionGroup name="section-list">
            <SectionAccordion
              v-for="section in visibleSections"
              :key="section.id"
              role="listitem"
              :section="section"
              :is-open="openSections.has(section.id)"
              :checked-count="sectionCheckedCount(section.id)"
              :active-pathology="activePathology"
              :is-checked="isChecked"
              :is-excluded="isExcluded"
              @toggle="toggleSection(section.id)"
              @toggle-item="handleToggleItem"
            />
          </TransitionGroup>
        </div>

        <!-- Empty state when filter hides everything -->
        <div v-if="visibleSections.length === 0" class="sections-empty">
          <p>No hay secciones con ítems para esta patología.</p>
        </div>

        <!-- Bottom spacer (mobile: room for fixed copy bar) -->
        <div class="bottom-spacer" aria-hidden="true"></div>
      </div>

      <!-- ── Right Panel: Text Output ── -->
      <div class="output-panel">
        <TextOutput
          :text="generatedText"
          :word-count="wordCount"
          :sentence-count="sentenceCount"
          :char-count="charCount"
          :checked-count="checkedCount"
          @clear="handleReset"
        />
      </div>

    </main>

    <!-- ── Footer ── -->
    <AppFooter />

    <!-- ── Mobile: Floating Copy Bar ── -->
    <Transition name="mobile-bar">
      <div v-if="checkedCount > 0" class="mobile-copy-bar" aria-hidden="true">
        <button
          class="mobile-toggle-btn"
          @click="showMobileOutput = !showMobileOutput"
        >
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"/>
          </svg>
          <span>Ver texto</span>
          <span class="mobile-count">{{ checkedCount }}</span>
        </button>
      </div>
    </Transition>

    <!-- ── Mobile: Bottom Sheet ── -->
    <Transition name="sheet">
      <div
        v-if="showMobileOutput && checkedCount > 0"
        class="mobile-sheet-overlay"
        @click.self="showMobileOutput = false"
      >
        <div class="mobile-sheet">
          <div class="sheet-drag-handle" aria-hidden="true"></div>
          <button class="sheet-close" @click="showMobileOutput = false" aria-label="Cerrar">
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2"
                 stroke-linecap="round">
              <path d="M5 5l10 10M15 5L5 15" />
            </svg>
          </button>
          <div class="sheet-content">
            <TextOutput
              :text="generatedText"
              :word-count="wordCount"
              :sentence-count="sentenceCount"
              :char-count="charCount"
              :checked-count="checkedCount"
              @clear="handleReset(); showMobileOutput = false"
            />
          </div>
        </div>
      </div>
    </Transition>

  </div>
</template>

<style scoped>
/* ── Page ── */
.page {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  background: var(--c-bg);
}

/* ── Main Layout ── */
.main-layout {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  max-width: 1600px;
  width: 100%;
  margin: 0 auto;
  padding: var(--sp-3) var(--content-pad) 0;
  gap: var(--panel-gap);
  min-height: 0;
}

/* Two-column: fluid right panel that scales with viewport */
@media (min-width: 768px) {
  .main-layout {
    grid-template-columns: 1fr clamp(300px, 36%, 500px);
    grid-template-rows: 1fr;
    align-items: start;
    padding: var(--sp-4) var(--content-pad) var(--sp-4);
    gap: var(--sp-4);
    min-height: calc(100dvh - var(--header-h) - var(--filter-h));
  }
}

@media (min-width: 1024px) {
  .main-layout {
    gap: var(--sp-5);
    padding: var(--sp-5) var(--content-pad);
  }
}

@media (min-width: 1280px) {
  .main-layout {
    padding: var(--sp-6) var(--content-pad);
  }
}

/* ── Sections Panel ── */
.sections-panel {
  display: flex;
  flex-direction: column;
  gap: var(--sp-3);
  min-width: 0;
}

.sections-list {
  display: flex;
  flex-direction: column;
  gap: var(--sp-3);
}

/* ── Filter Notice ── */
.filter-notice {
  display: flex;
  align-items: flex-start;
  gap: var(--sp-2);
  background: var(--c-primary-bg);
  border: 1px solid var(--c-primary-border);
  border-radius: var(--r-md);
  padding: 10px 12px;
  font-size: var(--text-sm);
  color: var(--c-primary);
  line-height: 1.45;
  animation: fadeIn 0.2s ease;
  /* Prevent overflow on narrow screens */
  min-width: 0;
  overflow: hidden;
}

@media (min-width: 480px) {
  .filter-notice {
    gap: var(--sp-3);
    padding: 11px 14px;
  }
}

.filter-notice svg {
  width: 15px;
  height: 15px;
  flex-shrink: 0;
  margin-top: 1px;
}

.filter-notice span {
  flex: 1;
}

.notice-close {
  width: 22px;
  height: 22px;
  border-radius: var(--r-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--c-primary);
  flex-shrink: 0;
  transition: background var(--t-fast);
  margin-top: -1px;
}

.notice-close:hover {
  background: rgba(0, 63, 138, 0.12);
}

.notice-close svg {
  width: 12px;
  height: 12px;
  margin-top: 0;
}

.sections-empty {
  text-align: center;
  padding: var(--sp-10);
  color: var(--c-text-muted);
  font-size: var(--text-base);
}

.bottom-spacer {
  height: 84px;
}

@media (min-width: 768px) {
  .bottom-spacer { height: var(--sp-5); }
}

/* ── Output Panel ── */
.output-panel {
  display: none;
}

@media (min-width: 768px) {
  .output-panel {
    display: flex;
    flex-direction: column;
    position: sticky;
    top: calc(var(--header-h) + var(--filter-h) + var(--sp-4));
    height: calc(100dvh - var(--header-h) - var(--filter-h) - var(--sp-4) * 2);
    min-height: 380px;
  }
}

@media (min-width: 1024px) {
  .output-panel {
    top: calc(var(--header-h) + var(--filter-h) + var(--sp-5));
    height: calc(100dvh - var(--header-h) - var(--filter-h) - var(--sp-5) * 2);
    min-height: 440px;
  }
}

/* ── Mobile: Floating Copy Bar ── */
.mobile-copy-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 300;
  padding: var(--sp-3) var(--sp-4);
  padding-bottom: calc(var(--sp-3) + env(safe-area-inset-bottom));
  background: var(--c-surface);
  border-top: 1px solid var(--c-border-light);
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
}

@media (min-width: 768px) {
  .mobile-copy-bar { display: none; }
}

.mobile-toggle-btn {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  background: var(--c-primary);
  color: white;
  font-size: var(--text-base);
  font-weight: var(--fw-semibold);
  padding: 13px var(--sp-6);
  border-radius: var(--r-lg);
  width: 100%;
  max-width: 480px;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(0, 63, 138, 0.35);
  transition: background var(--t-fast), transform var(--t-fast), box-shadow var(--t-fast);
  letter-spacing: -0.01em;
}

.mobile-toggle-btn:active {
  transform: scale(0.98);
}

.mobile-toggle-btn svg {
  width: 18px;
  height: 18px;
}

.mobile-count {
  background: rgba(255, 255, 255, 0.25);
  border-radius: var(--r-full);
  padding: 1px 8px;
  font-size: var(--text-sm);
  min-width: 24px;
  text-align: center;
}

/* ── Mobile Bottom Sheet ── */
.mobile-sheet-overlay {
  position: fixed;
  inset: 0;
  z-index: 400;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  display: flex;
  align-items: flex-end;
}

@media (min-width: 768px) {
  .mobile-sheet-overlay { display: none; }
}

.mobile-sheet {
  width: 100%;
  max-height: 85dvh;
  background: var(--c-surface);
  border-radius: var(--r-2xl) var(--r-2xl) 0 0;
  display: flex;
  flex-direction: column;
  padding-bottom: env(safe-area-inset-bottom);
  position: relative;
}

.sheet-drag-handle {
  width: 36px;
  height: 4px;
  background: var(--c-border);
  border-radius: var(--r-full);
  margin: 10px auto 4px;
  flex-shrink: 0;
}

.sheet-close {
  position: absolute;
  top: 12px;
  right: 16px;
  width: 32px;
  height: 32px;
  border-radius: var(--r-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--c-text-muted);
  background: var(--c-bg);
  transition: background var(--t-fast), color var(--t-fast);
}

.sheet-close:hover {
  background: var(--c-border-light);
  color: var(--c-text);
}

.sheet-close svg {
  width: 16px;
  height: 16px;
}

.sheet-content {
  flex: 1;
  min-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: var(--sp-3) var(--sp-4) var(--sp-4);
}

/* ── Transitions ── */
.notice-enter-active,
.notice-leave-active {
  transition: opacity var(--t), transform var(--t);
}
.notice-enter-from,
.notice-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.mobile-bar-enter-active,
.mobile-bar-leave-active {
  transition: opacity var(--t), transform var(--t);
}
.mobile-bar-enter-from,
.mobile-bar-leave-to {
  opacity: 0;
  transform: translateY(100%);
}

.sheet-enter-active,
.sheet-leave-active {
  transition: opacity var(--t-slow);
}
.sheet-enter-from,
.sheet-leave-to {
  opacity: 0;
}

.sheet-enter-active .mobile-sheet,
.sheet-leave-active .mobile-sheet {
  transition: transform var(--t-slow);
}
.sheet-enter-from .mobile-sheet,
.sheet-leave-to .mobile-sheet {
  transform: translateY(100%);
}

/* TransitionGroup for sections */
.section-list-enter-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.section-list-leave-active {
  transition: opacity 0.15s ease;
}
.section-list-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.section-list-leave-to {
  opacity: 0;
}
</style>
