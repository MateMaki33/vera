<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  text: string
  wordCount: number
  sentenceCount: number
  charCount: number
  checkedCount: number
}>()

const emit = defineEmits<{
  clear: []
}>()

const copied = ref(false)
const copyError = ref(false)
const textRef = ref<HTMLElement | null>(null)

function selectAllText() {
  const el = textRef.value
  if (!el) return
  const sel = window.getSelection()
  const range = document.createRange()
  range.selectNodeContents(el)
  sel?.removeAllRanges()
  sel?.addRange(range)
}

// Reset copy state when text changes
watch(() => props.text, () => {
  copied.value = false
})

async function copyText() {
  if (!props.text) return

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(props.text)
    } else {
      // Fallback for older tablet browsers
      const ta = document.createElement('textarea')
      ta.value = props.text
      ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0'
      document.body.appendChild(ta)
      ta.focus()
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    copied.value = true
    setTimeout(() => { copied.value = false }, 2800)
  } catch {
    copyError.value = true
    setTimeout(() => { copyError.value = false }, 2000)
  }
}
</script>

<template>
  <section class="text-output" aria-label="Texto clínico generado">

    <!-- Panel Header -->
    <div class="output-header">
      <div class="output-title-area">
        <div class="output-icon" aria-hidden="true">
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"/>
          </svg>
        </div>
        <div>
          <h2 class="output-title">Informe de Valoración</h2>
          <p class="output-subtitle">Texto generado automáticamente</p>
        </div>
      </div>

      <!-- Stats row -->
      <div v-if="text" class="output-stats">
        <span class="stat" title="Ítems seleccionados">
          <svg viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
            <path d="M2 2.5A1.5 1.5 0 0 1 3.5 1h7A1.5 1.5 0 0 1 12 2.5v9A1.5 1.5 0 0 1 10.5 13h-7A1.5 1.5 0 0 1 2 11.5v-9Zm5.28 1.72a.5.5 0 0 0-.707 0L4.5 6.293a.5.5 0 0 0 .707.707L6.5 5.707 9.293 8.5a.5.5 0 0 0 .707-.707L7.28 4.22Z"/>
          </svg>
          {{ checkedCount }}
        </span>
        <span class="stat-sep">·</span>
        <span class="stat" title="Palabras">{{ wordCount }} pal.</span>
        <span class="stat-sep">·</span>
        <span class="stat" title="Caracteres">{{ charCount }} car.</span>
      </div>
    </div>

    <!-- Text Body -->
    <div class="output-body">

      <!-- Empty state -->
      <Transition name="fade">
        <div v-if="!text" class="empty-state">
          <div class="empty-icon" aria-hidden="true">
            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="8" width="44" height="48" rx="6" fill="#e8f0fb" stroke="#aac4ea" stroke-width="1.5"/>
              <rect x="18" y="18" width="28" height="3" rx="1.5" fill="#aac4ea"/>
              <rect x="18" y="25" width="22" height="3" rx="1.5" fill="#c8d8f0"/>
              <rect x="18" y="32" width="26" height="3" rx="1.5" fill="#c8d8f0"/>
              <rect x="18" y="39" width="16" height="3" rx="1.5" fill="#d8e5f5"/>
              <circle cx="48" cy="48" r="10" fill="#003f8a"/>
              <path d="M44 48h8M48 44v8" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
            </svg>
          </div>
          <p class="empty-title">Sin texto generado</p>
          <p class="empty-hint">
            Selecciona ítems en las secciones
            {{ checkedCount === 0 ? 'de la izquierda' : '' }}
            para construir el informe clínico.
          </p>
        </div>
      </Transition>

      <!-- Generated text -->
      <Transition name="fade">
        <div v-if="text" class="text-block-wrap">
          <div
            ref="textRef"
            class="text-block"
            tabindex="0"
            aria-label="Texto clínico generado. Pulsa para seleccionar todo."
            @click="selectAllText"
          >{{ text }}</div>
          <div class="text-gradient" aria-hidden="true"></div>
        </div>
      </Transition>

    </div>

    <!-- Footer Actions -->
    <div class="output-footer">
      <button
        v-if="checkedCount > 0"
        class="btn-clear"
        @click="emit('clear')"
        title="Limpiar toda la selección"
      >
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"
             stroke-linecap="round" stroke-linejoin="round">
          <path d="M2 4h12M5 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1M6 7v5M10 7v5"/>
          <path d="M3 4l.9 9.1A1 1 0 0 0 4.9 14h6.2a1 1 0 0 0 1-.9L13 4"/>
        </svg>
        Limpiar
      </button>

      <button
        class="btn-copy"
        :class="{
          'btn-copy--done': copied,
          'btn-copy--error': copyError,
          'btn-copy--disabled': !text,
        }"
        :disabled="!text"
        @click="copyText"
        :title="!text ? 'Selecciona ítems primero' : 'Copiar al portapapeles'"
      >
        <!-- Idle icon -->
        <svg v-if="!copied && !copyError" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/>
          <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"/>
        </svg>
        <!-- Copied icon -->
        <svg v-if="copied" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <!-- Error icon -->
        <svg v-if="copyError" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
        </svg>

        <span>
          {{ copied ? '¡Copiado!' : copyError ? 'Error al copiar' : 'Copiar texto' }}
        </span>
      </button>
    </div>

  </section>
</template>

<style scoped>
.text-output {
  display: flex;
  flex-direction: column;
  background: var(--c-surface);
  border-radius: var(--r-xl);
  border: 1.5px solid var(--c-border-light);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  height: 100%;
  min-height: 0;
}

/* ── Header ── */
.output-header {
  padding: var(--sp-5) var(--sp-5) var(--sp-4);
  border-bottom: 1px solid var(--c-border-light);
  background: var(--c-surface-2);
  flex-shrink: 0;
}

.output-title-area {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  margin-bottom: var(--sp-3);
}

.output-icon {
  width: 36px;
  height: 36px;
  background: var(--c-primary-bg);
  border-radius: var(--r-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--c-primary);
  flex-shrink: 0;
}

.output-icon svg {
  width: 18px;
  height: 18px;
}

.output-title {
  font-size: var(--text-md);
  font-weight: var(--fw-semibold);
  color: var(--c-text);
  line-height: 1.2;
}

.output-subtitle {
  font-size: var(--text-xs);
  color: var(--c-text-muted);
  margin-top: 1px;
}

/* Stats row */
.output-stats {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  flex-wrap: wrap;
  animation: fadeIn 0.2s ease;
}

.stat {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: var(--text-xs);
  font-weight: var(--fw-medium);
  color: var(--c-text-muted);
  background: var(--c-bg);
  padding: 3px 8px;
  border-radius: var(--r-full);
  border: 1px solid var(--c-border-light);
}

.stat svg {
  width: 11px;
  height: 11px;
  color: var(--c-primary);
}

.stat-sep {
  color: var(--c-border);
  font-size: var(--text-sm);
  user-select: none;
}

/* ── Body ── */
.output-body {
  flex: 1;
  min-height: 0;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* Empty state */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--sp-8) var(--sp-6);
  text-align: center;
  flex: 1;
}

.empty-icon {
  margin-bottom: var(--sp-5);
  opacity: 0.9;
}

.empty-icon svg {
  width: 64px;
  height: 64px;
}

.empty-title {
  font-size: var(--text-md);
  font-weight: var(--fw-semibold);
  color: var(--c-text-muted);
  margin-bottom: var(--sp-2);
}

.empty-hint {
  font-size: var(--text-sm);
  color: var(--c-text-placeholder);
  max-width: 260px;
  line-height: 1.5;
}

/* Generated text */
.text-block-wrap {
  position: relative;
  flex: 1;
  min-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.text-block {
  flex: 1;
  overflow-y: auto;
  padding: var(--sp-5);
  font-size: var(--text-base);
  line-height: 1.75;
  color: var(--c-text);
  cursor: text;
  white-space: pre-wrap;
  word-break: break-word;
  outline: none;
  animation: fadeIn 0.25s ease;
  /* Make text selectable on tap */
  user-select: text;
  -webkit-user-select: text;
}

.text-block:focus {
  background: var(--c-surface-hover);
}

/* Subtle gradient at bottom to indicate scroll */
.text-gradient {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 32px;
  background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.9));
  pointer-events: none;
}

/* ── Footer ── */
.output-footer {
  padding: var(--sp-3) var(--sp-4);
  border-top: 1px solid var(--c-border-light);
  background: var(--c-surface-2);
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  flex-shrink: 0;
  flex-wrap: wrap;
}

@media (min-width: 1024px) {
  .output-footer {
    padding: var(--sp-4) var(--sp-5);
    gap: var(--sp-3);
  }
}

.btn-clear {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: var(--text-sm);
  font-weight: var(--fw-medium);
  color: var(--c-text-muted);
  padding: 9px 14px;
  border-radius: var(--r-md);
  border: 1.5px solid var(--c-border);
  background: var(--c-surface);
  transition: background var(--t-fast), color var(--t-fast), border-color var(--t-fast);
  white-space: nowrap;
}

.btn-clear:hover {
  background: var(--c-accent-bg);
  color: var(--c-accent);
  border-color: #f1aaa5;
}

.btn-clear:active {
  transform: scale(0.97);
}

.btn-clear svg {
  width: 15px;
  height: 15px;
}

/* Copy button */
.btn-copy {
  flex: 1;
  min-width: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--sp-2);
  font-size: var(--text-base);
  font-weight: var(--fw-semibold);
  color: #ffffff;
  background: var(--c-primary);
  border: none;
  border-radius: var(--r-md);
  padding: 11px var(--sp-4);
  min-height: 48px;
  transition:
    background var(--t-fast),
    transform var(--t-fast),
    box-shadow var(--t-fast),
    opacity var(--t-fast);
  box-shadow: 0 2px 8px rgba(0, 63, 138, 0.25);
  white-space: nowrap;
}

.btn-copy:hover:not(.btn-copy--disabled) {
  background: var(--c-primary-hover);
  box-shadow: 0 4px 14px rgba(0, 63, 138, 0.35);
  transform: translateY(-1px);
}

.btn-copy:active:not(.btn-copy--disabled) {
  transform: scale(0.97) translateY(0);
  box-shadow: 0 1px 4px rgba(0, 63, 138, 0.2);
}

.btn-copy--done {
  background: #1e7e34 !important;
  box-shadow: 0 2px 8px rgba(30, 126, 52, 0.3) !important;
  animation: copyPulse 0.35s ease;
}

.btn-copy--error {
  background: var(--c-accent) !important;
}

.btn-copy--disabled {
  background: var(--c-border) !important;
  color: var(--c-text-muted) !important;
  box-shadow: none !important;
  cursor: not-allowed;
  opacity: 0.7;
}

.btn-copy svg {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

/* ── Transitions ── */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
  position: absolute;
  inset: 0;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
