<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Item } from '@/types/clinicalTree'

import { itemsMap }           from '@/data/items'
import { blocksMap }          from '@/data/blocks'
import { activationReasons }  from '@/data/activationReasons'

import { useAssessmentTree }  from '@/composables/useAssessmentTree'
import { useTextGenerator }   from '@/composables/useTextGenerator'

import AppHeader                  from '@/components/AppHeader.vue'
import ActivationReasonSelector   from '@/components/ActivationReasonSelector.vue'
import BlockAccordion             from '@/components/BlockAccordion.vue'
import TextOutput                 from '@/components/TextOutput.vue'
import AppFooter                  from '@/components/AppFooter.vue'

// ── Árbol de valoración ────────────────────────────────────────
const {
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
} = useAssessmentTree(itemsMap, blocksMap, activationReasons)

// ── Texto de apertura reactivo ─────────────────────────────────
const openingText = computed(() => activeReason.value?.openingText ?? '')

// ── Generador de texto ─────────────────────────────────────────
const { generatedText, wordCount, sentenceCount, charCount } = useTextGenerator(
  visibleBlocks,
  itemsMap,
  checkedIds,
  openingText
)

// ── Estado de los acordeones (open/close) ─────────────────────
const openBlocks = ref<Set<string>>(new Set())

function toggleBlock(id: string) {
  const next = new Set(openBlocks.value)
  if (next.has(id)) {
    next.delete(id)
  } else {
    next.add(id)
  }
  openBlocks.value = next
}

// Al cambiar de motivo, cerrar todos los bloques
watch(
  () => activeReason.value?.id,
  () => {
    openBlocks.value = new Set()
  }
)

// Al aparecer un bloque condicional nuevo, abrirlo automáticamente
watch(visibleBlocks, (curr, prev) => {
  const prevIds = new Set(prev.map(b => b.id))
  const newOnes = curr.filter(b => !prevIds.has(b.id))
  if (newOnes.length > 0) {
    const next = new Set(openBlocks.value)
    newOnes.forEach(b => next.add(b.id))
    openBlocks.value = next
  }
})

// ── Resolución de ítems por bloque ────────────────────────────
// Mapea itemIds del bloque a objetos Item completos para el acordeón
function resolveBlockItems(blockId: string): Item[] {
  const block = blocksMap.get(blockId)
  if (!block) return []
  return block.itemIds
    .map(id => itemsMap.get(id))
    .filter((item): item is Item => item !== undefined)
}

// ── Reset global ──────────────────────────────────────────────
function handleReset() {
  reset()
  openBlocks.value = new Set()
}

function handleFullReset() {
  setReason(null)
  openBlocks.value = new Set()
}

// ── Panel móvil ───────────────────────────────────────────────
const showMobileOutput = ref(false)
</script>

<template>
  <div class="page">

    <!-- Cabecera fija -->
    <AppHeader :checked-count="checkedCount" @reset="handleFullReset" />

    <!-- ── Sin motivo seleccionado: selector de motivos ── -->
    <Transition name="selector">
      <div v-if="!activeReason" class="selector-wrapper">
        <ActivationReasonSelector
          :reasons="activationReasons"
          @select="setReason"
        />
        <AppFooter />
      </div>
    </Transition>

    <!-- ── Con motivo seleccionado: árbol de valoración ── -->
    <Transition name="assessment">
      <div v-if="activeReason" class="assessment-wrapper">

        <!-- Banda del motivo activo -->
        <div
          class="active-reason-bar"
          :style="{ '--reason-color': activeReason.accentColor }"
        >
          <div class="reason-bar-inner">
            <span class="reason-indicator" aria-hidden="true"></span>
            <span class="reason-label">{{ activeReason.label }}</span>
            <button class="change-reason-btn" @click="handleFullReset">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor"
                   stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                   aria-hidden="true">
                <path d="M2 8c0-3.3 2.7-6 6-6s6 2.7 6 6-2.7 6-6 6" />
                <path d="M2 4v4h4" />
              </svg>
              Cambiar motivo
            </button>
          </div>
        </div>

        <!-- Layout principal de dos columnas -->
        <main class="main-layout">

          <!-- Panel izquierdo: bloques de valoración -->
          <div class="blocks-panel">
            <div class="blocks-list" role="list">
              <TransitionGroup name="block-list">
                <BlockAccordion
                  v-for="(block, idx) in visibleBlocks"
                  :key="block.id"
                  role="listitem"
                  :block="block"
                  :index="idx"
                  :is-open="openBlocks.has(block.id)"
                  :checked-count="blockCheckedCount(block.id)"
                  :items="resolveBlockItems(block.id)"
                  :is-checked="isChecked"
                  :is-excluded="isExcluded"
                  @toggle="toggleBlock(block.id)"
                  @toggle-item="toggle"
                />
              </TransitionGroup>
            </div>

            <!-- Espaciador inferior (móvil: espacio para la barra flotante) -->
            <div class="bottom-spacer" aria-hidden="true"></div>
          </div>

          <!-- Panel derecho: salida de texto (escritorio) -->
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

        <AppFooter />

        <!-- Barra flotante móvil -->
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

        <!-- Bottom sheet móvil -->
        <Transition name="sheet">
          <div
            v-if="showMobileOutput && checkedCount > 0"
            class="mobile-sheet-overlay"
            @click.self="showMobileOutput = false"
          >
            <div class="mobile-sheet">
              <div class="sheet-drag-handle" aria-hidden="true"></div>
              <button
                class="sheet-close"
                aria-label="Cerrar"
                @click="showMobileOutput = false"
              >
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor"
                     stroke-width="2" stroke-linecap="round">
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
    </Transition>

  </div>
</template>

<style scoped>
/* ── Página ── */
.page {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  background: var(--c-bg);
}

/* ── Banda del motivo activo ── */
.active-reason-bar {
  background: var(--c-surface);
  border-bottom: 1px solid var(--c-border-light);
  position: sticky;
  top: var(--header-h);
  z-index: 90;
}

.reason-bar-inner {
  max-width: 1600px;
  margin: 0 auto;
  padding: 9px var(--content-pad);
  display: flex;
  align-items: center;
  gap: var(--sp-3);
}

.reason-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--reason-color);
  flex-shrink: 0;
}

.reason-label {
  font-size: var(--text-sm);
  font-weight: var(--fw-semibold);
  color: var(--c-text);
  flex: 1;
}

.change-reason-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: var(--text-xs);
  font-weight: var(--fw-semibold);
  color: var(--c-text-muted);
  padding: 5px 10px;
  border-radius: var(--r-md);
  border: 1px solid var(--c-border-light);
  background: var(--c-bg);
  transition: color var(--t-fast), border-color var(--t-fast), background var(--t-fast);
  white-space: nowrap;
}

.change-reason-btn svg {
  width: 13px;
  height: 13px;
}

.change-reason-btn:hover {
  color: var(--c-primary);
  border-color: var(--c-primary-border);
  background: var(--c-primary-bg);
}

/* ── Layout principal ── */
.main-layout {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr;
  max-width: 1600px;
  width: 100%;
  margin: 0 auto;
  padding: var(--sp-3) var(--content-pad) 0;
  gap: var(--sp-4);
  min-height: 0;
}

@media (min-width: 768px) {
  .main-layout {
    grid-template-columns: 1fr clamp(300px, 36%, 500px);
    grid-template-rows: 1fr;
    align-items: start;
    padding: var(--sp-4) var(--content-pad);
    /* La altura del panel sticky considera cabecera + banda de motivo */
    --combined-top: calc(var(--header-h) + 42px);
  }
}

@media (min-width: 1024px) {
  .main-layout {
    gap: var(--sp-5);
    padding: var(--sp-5) var(--content-pad);
  }
}

/* ── Panel de bloques ── */
.blocks-panel {
  display: flex;
  flex-direction: column;
  gap: var(--sp-3);
  min-width: 0;
}

.blocks-list {
  display: flex;
  flex-direction: column;
  gap: var(--sp-3);
}

.bottom-spacer {
  height: 84px;
}

@media (min-width: 768px) {
  .bottom-spacer { height: var(--sp-5); }
}

/* ── Panel de salida (escritorio) ── */
.output-panel {
  display: none;
}

@media (min-width: 768px) {
  .output-panel {
    display: flex;
    flex-direction: column;
    position: sticky;
    top: calc(var(--header-h) + 42px + var(--sp-4));
    height: calc(100dvh - var(--header-h) - 42px - var(--sp-4) * 2);
    min-height: 380px;
  }
}

@media (min-width: 1024px) {
  .output-panel {
    top: calc(var(--header-h) + 42px + var(--sp-5));
    height: calc(100dvh - var(--header-h) - 42px - var(--sp-5) * 2);
    min-height: 440px;
  }
}

/* ── Wrapper del selector ── */
.selector-wrapper {
  display: flex;
  flex-direction: column;
  min-height: calc(100dvh - var(--header-h));
}

.assessment-wrapper {
  display: flex;
  flex-direction: column;
  flex: 1;
}

/* ── Barra flotante móvil ── */
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

.mobile-toggle-btn:active { transform: scale(0.98); }

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

/* ── Bottom sheet móvil ── */
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

/* ── Transiciones ── */
.selector-enter-active,
.selector-leave-active,
.assessment-enter-active,
.assessment-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.selector-enter-from,
.selector-leave-to,
.assessment-enter-from,
.assessment-leave-to {
  opacity: 0;
  transform: translateY(6px);
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

/* TransitionGroup para los bloques de valoración */
.block-list-enter-active {
  transition: opacity 0.22s ease, transform 0.22s ease;
}
.block-list-leave-active {
  transition: opacity 0.15s ease;
}
.block-list-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.block-list-leave-to {
  opacity: 0;
}
</style>
