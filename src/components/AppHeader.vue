<script setup lang="ts">
defineProps<{
  checkedCount: number;
}>();

const emit = defineEmits<{
  reset: [];
}>();
</script>

<template>
  <header class="header">
    <div class="header-inner">
      <!-- Brand -->
      <div class="brand">
        <div class="brand-icon" aria-hidden="true">
          <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="11" y="2" width="6" height="24" rx="3" fill="rgba(255,255,255,0.95)" />
            <rect x="2" y="11" width="24" height="6" rx="3" fill="rgba(255,255,255,0.95)" />
          </svg>
        </div>
        <div class="brand-copy">
          <span class="brand-org">VERA</span>
          <h1 class="brand-title">Valoración Enfermera y Registro Avanzado</h1>
        </div>
      </div>

      <!-- Actions -->
      <div class="header-right">
        <Transition name="slide-in">
          <div v-if="checkedCount > 0" class="header-actions">
            <span class="items-badge">
              <svg viewBox="0 0 16 16" fill="currentColor">
                <path
                  d="M2 3.5A1.5 1.5 0 0 1 3.5 2h9A1.5 1.5 0 0 1 14 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 12.5v-9Zm6.78 1.97a.75.75 0 0 0-1.06 0L5.47 7.72a.75.75 0 0 0 1.06 1.06L8 7.31l1.47 1.47a.75.75 0 1 0 1.06-1.06L8.78 6.25l1.47-1.47a.75.75 0 0 0-1.06-1.06L8 4.69 6.53 3.22a.75.75 0 0 0-1.06 0Z"
                />
              </svg>
              {{ checkedCount }} ítem{{ checkedCount !== 1 ? "s" : "" }}
            </span>
            <button class="btn-reset" @click="emit('reset')" title="Reiniciar toda la valoración">
              <svg
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M3.5 10a6.5 6.5 0 1 0 6.5-6.5A6.58 6.58 0 0 0 5.5 5.5L3.5 7.5" />
                <path d="M3.5 3.5v4h4" />
              </svg>
              <span>Reiniciar</span>
            </button>
          </div>
        </Transition>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 200;
  background: var(--c-primary);
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.22);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--header-h);
  padding: 0 var(--sp-5);
  max-width: 1600px;
  margin: 0 auto;
}

/* ── Brand ── */
.brand {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  min-width: 0;
}

.brand-icon {
  width: 38px;
  height: 38px;
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.13);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--r-md);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background var(--t);
}

.brand-icon svg {
  width: 20px;
  height: 20px;
}

.brand-copy {
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-width: 0;
}

.brand-org {
  font-size: var(--text-2xs);
  font-weight: var(--fw-bold);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1;
}

.brand-title {
  font-size: var(--text-base);
  font-weight: var(--fw-semibold);
  color: #ffffff;
  letter-spacing: -0.02em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.25;
}

/* ── Actions ── */
.header-right {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
}

.items-badge {
  display: flex;
  align-items: center;
  gap: var(--sp-1);
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.22);
  color: rgba(255, 255, 255, 0.9);
  font-size: var(--text-sm);
  font-weight: var(--fw-semibold);
  padding: 5px 12px 5px 9px;
  border-radius: var(--r-full);
  white-space: nowrap;
}

.items-badge svg {
  width: 14px;
  height: 14px;
  opacity: 0.8;
}

.btn-reset {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.88);
  font-size: var(--text-sm);
  font-weight: var(--fw-medium);
  padding: 7px 16px 7px 12px;
  border-radius: var(--r-full);
  transition:
    background var(--t),
    color var(--t),
    border-color var(--t);
  white-space: nowrap;
}

.btn-reset:hover {
  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  border-color: rgba(255, 255, 255, 0.35);
}

.btn-reset:active {
  transform: scale(0.97);
}

.btn-reset svg {
  width: 15px;
  height: 15px;
  flex-shrink: 0;
}

/* ── Transition ── */
.slide-in-enter-active,
.slide-in-leave-active {
  transition:
    opacity var(--t),
    transform var(--t);
}
.slide-in-enter-from {
  opacity: 0;
  transform: translateX(12px);
}
.slide-in-leave-to {
  opacity: 0;
  transform: translateX(12px);
}

/* ── Responsive ── */
@media (max-width: 480px) {
  .header-inner {
    padding: 0 var(--sp-4);
  }
  .brand-title {
    font-size: var(--text-sm);
  }
  .items-badge {
    display: none;
  }
  .btn-reset span {
    display: none;
  }
  .btn-reset {
    padding: 8px 10px;
    border-radius: var(--r-md);
  }
}

/* Tablet portrait: compact the right-side actions */
@media (min-width: 481px) and (max-width: 900px) {
  .header-inner {
    padding: 0 var(--sp-4);
  }
  .items-badge {
    font-size: var(--text-xs);
    padding: 4px 10px 4px 8px;
  }
  .btn-reset {
    font-size: var(--text-xs);
    padding: 6px 12px 6px 10px;
  }
}
</style>
