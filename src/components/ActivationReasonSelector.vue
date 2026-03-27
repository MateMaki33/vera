<script setup lang="ts">
import type { ActivationReason } from '@/types/clinicalTree'

defineProps<{
  reasons: ActivationReason[]
}>()

const emit = defineEmits<{
  select: [reasonId: string]
}>()
</script>

<template>
  <section class="selector-section">
    <div class="selector-header">
      <h2 class="selector-title">Motivo de activación del recurso</h2>
      <p class="selector-subtitle">
        Selecciona el motivo para iniciar la valoración clínica estructurada
      </p>
    </div>

    <div class="reasons-grid">
      <button
        v-for="reason in reasons"
        :key="reason.id"
        class="reason-card"
        :style="{ '--card-accent': reason.accentColor }"
        @click="emit('select', reason.id)"
      >
        <span class="card-accent-top" aria-hidden="true"></span>

        <span class="card-body">
          <span class="card-label">{{ reason.label }}</span>
          <span v-if="reason.description" class="card-desc">
            {{ reason.description }}
          </span>
        </span>

        <span class="card-arrow" aria-hidden="true">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor"
               stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </span>
      </button>
    </div>
  </section>
</template>

<style scoped>
.selector-section {
  padding: var(--sp-6) var(--content-pad) var(--sp-4);
  max-width: 1600px;
  margin: 0 auto;
  width: 100%;
  animation: fadeIn 0.25s ease;
}

.selector-header {
  margin-bottom: var(--sp-5);
}

.selector-title {
  font-size: clamp(var(--text-lg), 2.5vw, var(--text-xl));
  font-weight: var(--fw-bold);
  color: var(--c-text);
  letter-spacing: -0.02em;
  margin-bottom: var(--sp-2);
}

.selector-subtitle {
  font-size: var(--text-sm);
  color: var(--c-text-muted);
  line-height: 1.5;
}

/* ── Grid de tarjetas ── */
.reasons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 220px), 1fr));
  gap: var(--sp-3);
}

@media (min-width: 768px) {
  .reasons-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: var(--sp-4);
  }
}

/* ── Tarjeta de motivo ── */
.reason-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  background: var(--c-surface);
  border: 1.5px solid var(--c-border-light);
  border-radius: var(--r-xl);
  padding: var(--sp-5) var(--sp-4) var(--sp-4);
  overflow: hidden;
  cursor: pointer;
  transition:
    border-color var(--t),
    box-shadow var(--t),
    transform var(--t-fast);
  /* Accesibilidad: tamaño mínimo de toque */
  min-height: 110px;
}

.reason-card:hover {
  border-color: var(--card-accent);
  box-shadow: 0 4px 20px color-mix(in srgb, var(--card-accent) 18%, transparent);
  transform: translateY(-2px);
}

.reason-card:active {
  transform: scale(0.98) translateY(0);
}

.reason-card:focus-visible {
  outline: 2px solid var(--card-accent);
  outline-offset: 2px;
}

/* Barra de acento superior */
.card-accent-top {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--card-accent);
  border-radius: var(--r-xl) var(--r-xl) 0 0;
  transition: height var(--t);
}

.reason-card:hover .card-accent-top {
  height: 5px;
}

/* Contenido */
.card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--sp-1);
  margin-top: var(--sp-2);
}

.card-label {
  font-size: var(--text-base);
  font-weight: var(--fw-bold);
  color: var(--c-text);
  line-height: 1.25;
  letter-spacing: -0.01em;
}

.reason-card:hover .card-label {
  color: var(--card-accent);
}

.card-desc {
  font-size: var(--text-xs);
  color: var(--c-text-muted);
  line-height: 1.4;
}

/* Flecha */
.card-arrow {
  align-self: flex-end;
  width: 28px;
  height: 28px;
  border-radius: var(--r-md);
  background: color-mix(in srgb, var(--card-accent) 10%, transparent);
  color: var(--card-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: var(--sp-3);
  transition: background var(--t), transform var(--t);
}

.card-arrow svg {
  width: 14px;
  height: 14px;
}

.reason-card:hover .card-arrow {
  background: color-mix(in srgb, var(--card-accent) 20%, transparent);
  transform: translateX(3px);
}
</style>
