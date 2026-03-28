# VERA — Valoración Enfermera y Registro Avanzado

Aplicación web para la generación estructurada de registros clínicos objetivos en emergencias extrahospitalarias. El profesional marca hallazgos clínicos y la aplicación ensambla automáticamente un texto en lenguaje natural, sin diagnósticos ni interpretaciones.

---

## Instalación y arranque

**Requisitos:** Node.js v20.19 o superior.

```bash
# 1. Instalar dependencias
npm install

# 2. Arrancar en modo desarrollo (hot-reload)
npm run dev

# 3. Compilar para producción
npm run build
```

El servidor de desarrollo arranca en `http://localhost:5173` por defecto.

---

## Arquitectura de datos

Todo el contenido clínico vive en tres archivos dentro de `src/data/`:

```
src/data/
├── items.ts             # Todos los hallazgos/ítems individuales
├── blocks.ts            # Agrupaciones de ítems (bloques)
└── activationReasons.ts # Motivos de activación y sus árboles lógicos
```

La relación es:

```
ActivationReason
  ├── commonBlockIds[]        → bloques comunes (identificación, constantes…)
  ├── specificBlockIds[]      → bloques propios del motivo
  └── conditionalBranches[]   → bloques que aparecen al marcar ciertos ítems
          └── Block
                └── itemIds[] → Item[]
```

Los tipos están documentados en `src/types/clinicalTree.ts`.

---

## 1. Añadir un ítem nuevo

Un **ítem** es cada checkbox individual: un hallazgo, dato objetivo o actuación.

Abre `src/data/items.ts` y añade un objeto al array:

```typescript
{
  id: "dt_morfina",              // ID único en todo el sistema (snake_case)
  category: "intervencion",      // Categoría funcional (solo informativa)
  label: "Morfina IV",           // Texto visible en el checkbox de la UI
  text: "Se administra morfina intravenosa según protocolo analgésico.",
  // Opcional: excluir otros ítems al marcar este
  excludes: ["dt_analgesico_oral"],
}
```

**Reglas:**
- `id` debe ser único en todo `items.ts`. Convención: prefijo del motivo + nombre (`dt_` = dolor torácico, `cv_` = convulsiones, `sc_` = síncope…).
- `text` en bloques normales debe ser una frase completa con punto final.
- `text` en bloques de tipo `inline-list` (constantes vitales) debe ser solo el calificador sin punto: `"normocárdico"`.
- `excludes` es bidireccional: si A excluye a B, B también debe excluir a A.

Después de crear el ítem, **inclúyelo en un bloque** (ver sección 2).

---

## 2. Añadir o modificar un bloque

Un **bloque** es el acordeón plegable que agrupa ítems relacionados.

### Añadir ítems a un bloque existente

En `src/data/blocks.ts`, localiza el bloque y añade el ID del ítem nuevo a `itemIds`. El orden del array determina el orden visual en la UI:

```typescript
export const bloqueDtIntervencion: Block = {
  id: "bloque_dt_intervencion",
  title: "Intervenciones realizadas",
  description: "Actuaciones terapéuticas llevadas a cabo durante la intervención",
  itemIds: [
    "dt_semifowler",
    "dt_via_periferica",
    "dt_o2_gafas",
    "dt_o2_mascarilla",
    "dt_nitratos",
    "dt_asa",
    "dt_ticagrelor",   // ← ítem recién añadido
    "dt_clopidogrel",  // ← ítem recién añadido
    "dt_analgesico",
    "dt_antieméticos",
    "dt_activacion_cod",
  ],
};
```

### Crear un bloque nuevo

```typescript
export const bloqueNuevo: Block = {
  id: "bloque_dt_nuevo",          // ID único, prefijado por motivo
  title: "Título visible",
  description: "Descripción breve del propósito clínico",
  itemIds: [
    "id_item_1",
    "id_item_2",
    "id_item_3",
  ],
  // Opcional: reusable en varios motivos sin duplicar
  reusable: true,
};
```

#### Modo de ensamblado de texto (`textAssembly`)

Por defecto cada ítem genera una frase independiente (`sentences`). Para constantes vitales u otras listas cualitativas usa `inline-list`, que une todos los calificadores en una sola frase:

```typescript
export const bloqueConstantes: Block = {
  id: "bloque_constantes",
  title: "Constantes vitales",
  itemIds: ["cst_normocardico", "cst_hipotenso", "cst_taquipneico"],
  textAssembly: {
    mode: "inline-list",
    prefix: "A la valoración, paciente ",
    suffix: ".",
    // Resultado: "A la valoración, paciente normocárdico, hipotenso, taquipneico."
  },
};
```

Una vez creado el bloque, **regístralo en el mapa de bloques** al final de `blocks.ts`:

```typescript
export const blocksMap: Map<string, Block> = new Map([
  // ... bloques existentes ...
  [bloqueNuevo.id, bloqueNuevo],
]);
```

---

## 3. Añadir un motivo de activación nuevo

Un **motivo de activación** es la pantalla inicial de selección (Dolor torácico, Convulsiones…). Define el árbol completo de valoración para ese tipo de caso.

En `src/data/activationReasons.ts`, añade un objeto al array `activationReasons`:

```typescript
{
  id: "dolor_abdominal",              // ID único
  label: "Dolor abdominal",           // Texto en el botón del selector
  description: "Dolor en región abdominal de cualquier carácter",
  accentColor: "#16a085",             // Color CSS de acento para la UI

  // Frase de apertura del informe (sin diagnóstico)
  openingText: "Se activa el recurso ante paciente que refiere dolor abdominal.",

  // Bloques comunes a todos los motivos (identificación, seguridad, traslado…)
  commonBlockIds: [
    "bloque_identificacion",
    "bloque_seguridad",
    "bloque_llegada",
    "bloque_familiares",
    "bloque_constantes",
    "bloque_colaboracion",
  ],

  // Bloques específicos de este motivo, en orden clínico
  specificBlockIds: [
    "bloque_da_caract",      // Caracterización del dolor abdominal
    "bloque_da_sintomas",    // Síntomas acompañantes
    "bloque_da_intervencion",
    "bloque_intervencion_basica",
    "bloque_pertenencias",
    "bloque_traslado",
  ],

  // Ramas condicionales (ver sección 4)
  conditionalBranches: [],
},
```

**Pasos completos para un motivo nuevo:**

1. Crea los ítems necesarios en `items.ts`.
2. Crea los bloques en `blocks.ts` y regístralos en `blocksMap`.
3. Añade el objeto al array `activationReasons` en `activationReasons.ts`.

---

## 4. Ramas condicionales (bloques que aparecen al marcar ítems)

Una **rama condicional** hace que uno o varios bloques nuevos emerjan automáticamente en el árbol de valoración cuando el profesional marca determinados hallazgos. Es el mecanismo central del sistema.

### Ejemplo real: alteraciones ECG en dolor torácico

```typescript
conditionalBranches: [
  {
    id: "branch_dt_ecg_alt",           // ID único de la rama
    whenAnyItemSelected: ["dt_ecg_alt"], // Se activa si CUALQUIERA de estos ítems está marcado
    showBlockIds: ["bloque_dt_ecg_alt"], // Bloques que aparecen al cumplirse la condición
    insertAfterBlockId: "bloque_dt_ecg_basico", // Posición de inserción en el árbol
  },
]
```

Cuando el profesional marca `dt_ecg_alt` ("Alteraciones en el ECG"), el bloque `bloque_dt_ecg_alt` aparece justo debajo del bloque ECG básico con las opciones específicas de alteración (taquicardia, fibrilación auricular, elevación del ST…).

### Condición OR vs AND

```typescript
// OR: el bloque aparece si se marca AL MENOS UNO de los ítems
whenAnyItemSelected: ["item_a", "item_b", "item_c"],

// AND: el bloque aparece solo si están marcados TODOS los ítems
whenAllItemsSelected: ["item_x", "item_y"],
```

### Ejemplo paso a paso: nuevo bloque condicional

**Objetivo:** en un motivo de dolor abdominal, si se marca "Defensa abdominal" o "Dolor a la descompresión", mostrar un bloque adicional de valoración peritoneal.

**Paso 1 — Crear los ítems en `items.ts`:**

```typescript
// Ítems del bloque base
{ id: "da_defensa",       label: "Defensa abdominal",         text: "Se objetiva defensa abdominal a la palpación." },
{ id: "da_descompresion", label: "Dolor a la descompresión",  text: "Se objetiva dolor a la descompresión abdominal." },

// Ítems del bloque condicional que aparecerá
{ id: "da_peritonismo",   label: "Signos de peritonismo",     text: "Se objetivan signos compatibles con irritación peritoneal." },
{ id: "da_rigidez",       label: "Rigidez abdominal",         text: "Se objetiva rigidez abdominal a la exploración." },
```

**Paso 2 — Crear los bloques en `blocks.ts`:**

```typescript
// Bloque base (siempre visible)
export const bloqueDaSintomas: Block = {
  id: "bloque_da_sintomas",
  title: "Exploración abdominal",
  description: "Hallazgos a la exploración física abdominal",
  itemIds: ["da_defensa", "da_descompresion"],
};

// Bloque condicional (solo aparece si se marca defensa o descompresión)
export const bloqueDaPeritoneal: Block = {
  id: "bloque_da_peritoneal",
  title: "Valoración peritoneal",
  description: "Signos adicionales de irritación peritoneal",
  itemIds: ["da_peritonismo", "da_rigidez"],
};
```

Registrarlos en `blocksMap`:

```typescript
[bloqueDaSintomas.id,   bloqueDaSintomas],
[bloqueDaPeritoneal.id, bloqueDaPeritoneal],
```

**Paso 3 — Declarar la rama condicional en `activationReasons.ts`:**

```typescript
conditionalBranches: [
  {
    id: "branch_da_peritoneal",
    whenAnyItemSelected: ["da_defensa", "da_descompresion"],
    showBlockIds: ["bloque_da_peritoneal"],
    insertAfterBlockId: "bloque_da_sintomas",
  },
],
```

Resultado: en cuanto el profesional marque "Defensa abdominal" o "Dolor a la descompresión", el bloque "Valoración peritoneal" aparece automáticamente en el árbol, justo debajo del bloque de síntomas.

### Una rama puede mostrar varios bloques a la vez

```typescript
{
  id: "branch_ic_conciencia",
  whenAnyItemSelected: ["ic_consciencia_disminuida"],
  showBlockIds: ["bloque_cv_conciencia", "bloque_cv_pupilas"], // ← dos bloques
  insertAfterBlockId: "bloque_ic_conciencia",
},
```

### Un bloque puede ser condicional en un motivo y fijo en otro

Los bloques con `reusable: true` pueden aparecer como bloque fijo en `specificBlockIds` de un motivo y como bloque condicional en `showBlockIds` de otro motivo. El sistema no los duplica.

---

## 5. Referencia rápida de IDs existentes

### Prefijos de ítems por motivo

| Prefijo | Motivo |
|---------|--------|
| `com_`  | Comunes (entorno, llegada, familiares…) |
| `cst_`  | Constantes vitales |
| `dt_`   | Dolor torácico |
| `cv_`   | Convulsiones |
| `sc_`   | Síncope / PTC |
| `pcr_`  | PCR |
| `pt_`   | Parto / urgencia obstétrica |
| `ic_`   | Posible ictus |
| `psi_`  | Psiquiátrico / agresivo |
| `al_`   | Intento autolítico |
| `tr_`   | Trauma |
| `dr_`   | Dificultad respiratoria |
| `ot_`   | Otros |

### Bloques comunes reutilizables

| ID | Contenido |
|----|-----------|
| `bloque_identificacion` | Datos de identificación del paciente |
| `bloque_seguridad` | Condiciones del entorno y escena |
| `bloque_llegada` | Posición a la llegada |
| `bloque_familiares` | Acompañantes y fuentes de información |
| `bloque_constantes` | Constantes vitales (inline-list) |
| `bloque_colaboracion` | Grado de colaboración del paciente |
| `bloque_intervencion_basica` | Vía aérea, accesos, monitorización |
| `bloque_pertenencias` | Gestión de pertenencias |
| `bloque_traslado` | Traslado y destino |
| `bloque_qsofa` | Escala qSOFA |
| `bloque_codigos` | Activación de códigos de alerta |
