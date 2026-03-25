<template>
  <div class="legal-page">

    <header class="legal-header">
      <div class="legal-header-inner">
        <RouterLink to="/" class="back-link" aria-label="Volver a la aplicación">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M12 4l-6 6 6 6" />
          </svg>
          Volver a VERA
        </RouterLink>
        <span class="legal-badge">VERA · Aviso Legal</span>
      </div>
    </header>

    <main class="legal-main">
      <article class="legal-article">

        <div class="legal-title-block">
          <h1 class="legal-title">Aviso Legal y Condiciones de Uso</h1>
          <p class="legal-subtitle">
            VERA — Valoración Enfermera y Registro Avanzado
          </p>
          <p class="legal-date">Última actualización: marzo de 2025</p>
        </div>

        <section class="legal-section">
          <h2>1. Objeto y naturaleza de la herramienta</h2>
          <p>
            VERA (Valoración Enfermera y Registro Avanzado) es una aplicación web de carácter instrumental
            concebida exclusivamente como <strong>herramienta de apoyo a la valoración enfermera</strong>
            en el ámbito prehospitalario. Su función consiste en facilitar la generación de texto estructurado
            a partir de hallazgos clínicos seleccionados por el profesional usuario.
          </p>
          <p>
            VERA <strong>no constituye en ningún caso un sistema de diagnóstico clínico</strong>, un dispositivo
            médico, ni un producto sanitario en el sentido del Reglamento (UE) 2017/745 del Parlamento Europeo
            y del Consejo. El texto generado tiene naturaleza de borrador orientativo y no sustituye, bajo ninguna
            circunstancia, el criterio, la formación ni la responsabilidad profesional del enfermero o enfermera
            que lleve a cabo la valoración.
          </p>
        </section>

        <section class="legal-section">
          <h2>2. Limitación de responsabilidad del autor</h2>
          <p>
            El autor de esta herramienta, José Luis Díaz García, pone a disposición del profesional sanitario
            una utilidad de asistencia textual, pero <strong>no asume responsabilidad alguna</strong> —ni civil,
            ni penal, ni deontológica— derivada del uso, mal uso, interpretación errónea o aplicación clínica
            de los textos generados por la aplicación.
          </p>
          <p>
            En particular, el autor queda expresamente eximido de toda responsabilidad en los siguientes supuestos,
            entre otros:
          </p>
          <ul>
            <li>Uso del texto generado como registro clínico definitivo sin revisión previa por el profesional.</li>
            <li>Decisiones asistenciales adoptadas tomando como única base el texto producido por la herramienta.</li>
            <li>Errores, omisiones o inexactitudes en el texto resultante de una selección incorrecta de ítems.</li>
            <li>Perjuicios de cualquier naturaleza ocasionados a terceros, incluidos los pacientes, como consecuencia
            del uso inadecuado de la aplicación.</li>
          </ul>
        </section>

        <section class="legal-section">
          <h2>3. Obligación de revisión y adaptación profesional</h2>
          <p>
            Todo texto generado por VERA <strong>deberá ser revisado, validado y, en su caso, adaptado</strong>
            por el profesional sanitario antes de su incorporación a cualquier registro clínico, informe asistencial
            o documento de carácter médico-legal.
          </p>
          <p>
            La aplicación genera texto a partir de combinaciones predefinidas de hallazgos clínicos. Dicho texto
            puede no reflejar con exactitud la complejidad, singularidad o matices propios de cada situación
            clínica concreta. Es responsabilidad exclusiva del profesional garantizar la veracidad, coherencia y
            adecuación del texto al caso real que documenta.
          </p>
          <div class="legal-callout">
            <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </svg>
            <p>
              <strong>El profesional es el único responsable</strong> del contenido que figure en los registros
              clínicos que suscriba, con independencia de la herramienta utilizada para su redacción.
            </p>
          </div>
        </section>

        <section class="legal-section">
          <h2>4. Protección de datos personales y datos de pacientes</h2>
          <p>
            VERA ha sido diseñada con un enfoque de <strong>privacidad por diseño</strong> (<em>privacy by design</em>)
            conforme a los principios del Reglamento (UE) 2016/679, General de Protección de Datos (RGPD):
          </p>
          <ul>
            <li>
              <strong>La aplicación no genera, almacena, procesa ni transmite datos de carácter personal</strong>
              ni datos de salud de pacientes. Toda la lógica de generación de texto opera íntegramente en el
              dispositivo del usuario (<em>client-side</em>), sin comunicación con ningún servidor externo.
            </li>
            <li>
              La herramienta trabaja exclusivamente con <strong>hallazgos clínicos objetivos y genéricos</strong>
              (signos, síntomas, intervenciones) sin asociarlos en ningún momento a identificadores de paciente.
            </li>
            <li>
              El texto generado permanece en el dispositivo del usuario hasta que este decide copiarlo o descartarlo.
              Una vez cerrada o reiniciada la aplicación, dicho contenido no se conserva en ningún soporte.
            </li>
          </ul>
          <p>
            No obstante lo anterior, <strong>el usuario es el único responsable</strong> de garantizar que no
            introduce datos de carácter personal o datos de salud de pacientes en los campos de texto de la
            aplicación, y de cumplir con la normativa aplicable en materia de protección de datos en el marco
            de su actividad profesional.
          </p>
        </section>

        <section class="legal-section">
          <h2>5. Ausencia de cookies y rastreo</h2>
          <p>
            VERA <strong>no utiliza cookies</strong> de ningún tipo —ni técnicas, ni analíticas, ni publicitarias—
            ni implementa ninguna tecnología equivalente de rastreo o identificación del usuario
            (<em>fingerprinting</em>, <em>pixel tracking</em>, <em>local storage</em> con fines de seguimiento, etc.).
          </p>
          <p>
            La aplicación <strong>no comparte ningún dato con terceros</strong>. No integra sistemas de analítica
            web, publicidad, redes sociales ni servicios de telemetría de ninguna clase. No es necesario aceptar
            ninguna política de cookies para utilizar la herramienta, dado que no existen.
          </p>
        </section>

        <section class="legal-section">
          <h2>6. Responsabilidades del usuario</h2>
          <p>El uso de VERA implica la aceptación de las siguientes condiciones por parte del usuario:</p>
          <ul>
            <li>
              Utilizar la herramienta <strong>exclusivamente en el ámbito de su práctica profesional</strong>
              y conforme a la normativa sanitaria, deontológica y legal aplicable en cada momento.
            </li>
            <li>
              <strong>No introducir datos de carácter personal</strong> de pacientes (nombre, DNI, número de
              historia clínica, fecha de nacimiento, dirección u otros identificadores) en ningún campo
              de la aplicación.
            </li>
            <li>
              Revisar y validar íntegramente el texto generado antes de incorporarlo a cualquier documento
              oficial o registro clínico.
            </li>
            <li>
              No utilizar VERA como única fuente para la toma de decisiones clínicas.
            </li>
            <li>
              Asumir plena responsabilidad sobre el uso que realice de los textos generados y sobre las
              consecuencias que de dicho uso pudieran derivarse para terceros.
            </li>
          </ul>
        </section>

        <section class="legal-section">
          <h2>7. Propiedad intelectual y licencia de uso</h2>
          <p>
            VERA es obra original de <strong>José Luis Díaz García</strong> y se distribuye bajo los términos
            de la <strong>Licencia Pública General GNU versión 3</strong> (GNU GPL v3), publicada por la
            Free Software Foundation.
          </p>
          <p>
            De acuerdo con los términos de esta licencia:
          </p>
          <ul>
            <li>Cualquier persona puede utilizar, copiar, modificar y distribuir esta aplicación.</li>
            <li>
              Toda distribución del software original o de obras derivadas debe realizarse bajo los mismos
              términos de la GNU GPL v3, manteniendo el carácter libre y abierto del código.
            </li>
            <li>
              El software se distribuye <strong>«tal cual», sin garantía de ningún tipo</strong>, expresa o
              implícita, incluidas, sin limitación, las garantías implícitas de comerciabilidad o idoneidad
              para un fin particular.
            </li>
          </ul>
          <p>
            El texto completo de la licencia está disponible en
            <a href="https://www.gnu.org/licenses/gpl-3.0.html" target="_blank" rel="noopener noreferrer">
              www.gnu.org/licenses/gpl-3.0.html
            </a>.
          </p>
        </section>

        <section class="legal-section">
          <h2>8. Jurisdicción y ley aplicable</h2>
          <p>
            El presente aviso legal se rige por la legislación española. Para cualquier controversia que pudiera
            derivarse de la interpretación o aplicación de estas condiciones, las partes se someten, con renuncia
            a cualquier otro fuero que pudiera corresponderles, a la jurisdicción de los Juzgados y Tribunales
            del domicilio del autor, salvo que la normativa aplicable establezca otro fuero imperativo.
          </p>
        </section>

      </article>
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppFooter from '@/components/AppFooter.vue'
</script>

<style scoped>
.legal-page {
  min-height: 100dvh;
  background: var(--c-bg);
  display: flex;
  flex-direction: column;
}

/* ── Header ── */
.legal-header {
  background: var(--c-primary);
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.22);
  position: sticky;
  top: 0;
  z-index: 100;
}

.legal-header-inner {
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 var(--sp-5);
  height: var(--header-h);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--sp-4);
}

.back-link {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  color: rgba(255, 255, 255, 0.88);
  font-size: var(--text-sm);
  font-weight: var(--fw-medium);
  text-decoration: none;
  padding: 7px 14px 7px 10px;
  border-radius: var(--r-full);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: background var(--t-fast), color var(--t-fast);
  white-space: nowrap;
}

.back-link:hover {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
}

.back-link svg {
  width: 15px;
  height: 15px;
  flex-shrink: 0;
}

.legal-badge {
  font-size: var(--text-2xs);
  font-weight: var(--fw-bold);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
}

/* ── Main ── */
.legal-main {
  flex: 1;
  padding: var(--sp-6) var(--sp-4) var(--sp-8);
}

.legal-article {
  max-width: 760px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--sp-8);
}

/* ── Title block ── */
.legal-title-block {
  display: flex;
  flex-direction: column;
  gap: var(--sp-2);
  padding-bottom: var(--sp-6);
  border-bottom: 2px solid var(--c-border-light);
}

.legal-title {
  font-size: var(--text-2xl);
  font-weight: var(--fw-bold);
  color: var(--c-text);
  letter-spacing: -0.03em;
  line-height: 1.2;
}

.legal-subtitle {
  font-size: var(--text-base);
  color: var(--c-text-muted);
  font-weight: var(--fw-medium);
}

.legal-date {
  font-size: var(--text-sm);
  color: var(--c-text-placeholder);
}

/* ── Sections ── */
.legal-section {
  display: flex;
  flex-direction: column;
  gap: var(--sp-3);
}

.legal-section h2 {
  font-size: var(--text-lg);
  font-weight: var(--fw-semibold);
  color: var(--c-primary);
  letter-spacing: -0.02em;
  line-height: 1.3;
  padding-bottom: var(--sp-2);
  border-bottom: 1px solid var(--c-primary-border);
}

.legal-section p {
  font-size: var(--text-base);
  color: var(--c-text-2);
  line-height: 1.75;
}

.legal-section ul {
  padding-left: var(--sp-5);
  display: flex;
  flex-direction: column;
  gap: var(--sp-2);
}

.legal-section li {
  font-size: var(--text-base);
  color: var(--c-text-2);
  line-height: 1.7;
}

.legal-section a {
  color: var(--c-primary);
  text-decoration: none;
  font-weight: var(--fw-medium);
}

.legal-section a:hover {
  text-decoration: underline;
}

/* ── Callout ── */
.legal-callout {
  display: flex;
  gap: var(--sp-3);
  background: var(--c-warning-bg);
  border: 1px solid var(--c-warning-border);
  border-radius: var(--r-md);
  padding: var(--sp-4);
  align-items: flex-start;
}

.legal-callout svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  margin-top: 2px;
  color: var(--c-warning-text);
}

.legal-callout p {
  font-size: var(--text-sm) !important;
  color: var(--c-warning-text) !important;
  line-height: 1.6 !important;
}

@media (min-width: 640px) {
  .legal-main {
    padding: var(--sp-8) var(--sp-6) var(--sp-10);
  }
}
</style>
