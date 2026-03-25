<template>
  <footer class="app-footer">
    <div class="footer-inner">

      <p class="footer-disclaimer">
        <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" class="footer-icon">
          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
        </svg>
        Herramienta de apoyo a la valoración clínica. Los textos generados deben ser revisados y adaptados por el profesional responsable.
        <RouterLink to="/aviso-legal" class="footer-legal-link">Aviso legal</RouterLink>
      </p>

      <div class="footer-meta">
        <span class="footer-author">
          © José Luis Díaz García ·
          <a
            href="https://www.gnu.org/licenses/gpl-3.0.html"
            target="_blank"
            rel="noopener noreferrer"
            class="footer-link"
          >Licencia GNU GPL v3</a>
        </span>
        <nav class="footer-sites" aria-label="Sitios relacionados">
          <a href="https://nutruxiq.com" target="_blank" rel="noopener noreferrer" class="footer-link">nutruxiq.com</a>
          <a href="https://teslab.nutruxiq.com" target="_blank" rel="noopener noreferrer" class="footer-link">teslab</a>
          <a href="https://enflab.nutruxiq.com" target="_blank" rel="noopener noreferrer" class="footer-link">enflab</a>
        </nav>
      </div>

    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  background: var(--c-surface);
  border-top: 1px solid var(--c-border-light);
  padding: var(--sp-4) var(--sp-4) calc(var(--sp-4) + env(safe-area-inset-bottom));
}

/* On mobile, add extra bottom padding when the floating copy bar may be visible */
@media (max-width: 767px) {
  .app-footer {
    padding-bottom: calc(var(--sp-4) + 80px + env(safe-area-inset-bottom));
  }
}

.footer-inner {
  max-width: 1600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--sp-3);
}

@media (min-width: 640px) {
  .footer-inner {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: var(--sp-4);
  }
}

/* ── Disclaimer ── */
.footer-disclaimer {
  display: flex;
  align-items: flex-start;
  gap: var(--sp-2);
  font-size: var(--text-xs);
  color: var(--c-text-muted);
  line-height: 1.5;
  flex: 1;
  min-width: 0;
}

.footer-icon {
  width: 13px;
  height: 13px;
  flex-shrink: 0;
  margin-top: 1px;
  color: var(--c-text-placeholder);
}

.footer-legal-link {
  color: var(--c-primary);
  font-weight: var(--fw-medium);
  white-space: nowrap;
  margin-left: var(--sp-1);
  text-decoration: none;
}

.footer-legal-link:hover {
  text-decoration: underline;
}

/* ── Meta ── */
.footer-meta {
  display: flex;
  flex-direction: column;
  gap: var(--sp-2);
  flex-shrink: 0;
}

@media (min-width: 640px) {
  .footer-meta {
    align-items: flex-end;
  }
}

.footer-author {
  font-size: var(--text-xs);
  color: var(--c-text-muted);
  white-space: nowrap;
}

/* ── Links ── */
.footer-link {
  color: var(--c-text-muted);
  text-decoration: none;
  font-size: var(--text-xs);
  transition: color var(--t-fast);
}

.footer-link:hover {
  color: var(--c-primary);
}

.footer-sites {
  display: flex;
  gap: var(--sp-3);
}

.footer-sites .footer-link {
  color: var(--c-text-placeholder);
}

.footer-sites .footer-link:hover {
  color: var(--c-primary);
}
</style>
