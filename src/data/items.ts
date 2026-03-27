/**
 * Registro de todos los ítems clínicos del sistema.
 *
 * Cada ítem representa un hallazgo objetivo, una referencia del paciente
 * o una actuación. Los textos están redactados en estilo de valoración
 * de enfermería extrahospitalaria: objetivos, sin diagnósticos,
 * sin interpretaciones.
 *
 * Convención de prefijos:
 *   com_     → comunes (reutilizables en cualquier motivo)
 *   cst_     → constantes vitales (modo inline-list)
 *   dt_      → dolor torácico
 *   cv_      → convulsiones
 *   sc_      → síncope
 *   pcr_     → parada cardiorrespiratoria
 *   pt_      → parto / urgencia obstétrica
 */

import type { Item } from "@/types/clinicalTree";

// ─────────────────────────────────────────────────────────────
// ÍTEMS COMUNES — Reutilizables en cualquier motivo
// ─────────────────────────────────────────────────────────────

const commonItems: Item[] = [
  // Entorno y seguridad de la escena
  {
    id: "com_env_seguro",
    category: "entorno",
    label: "Entorno seguro para el equipo",
    text: "Entorno seguro para el equipo interviniente.",
  },
  {
    id: "com_env_riesgo_elect",
    category: "entorno",
    label: "Riesgo eléctrico en la escena",
    text: "Se objetiva riesgo eléctrico en la escena.",
  },
  {
    id: "com_env_riesgo_trafico",
    category: "entorno",
    label: "Riesgo de tráfico en la escena",
    text: "Se objetiva riesgo de tráfico en la escena durante la intervención.",
  },
  {
    id: "com_env_riesgo_altura",
    category: "entorno",
    label: "Riesgo de caída o altura",
    text: "Se objetiva riesgo de caída o altura en la escena.",
  },
  {
    id: "com_env_controlado",
    category: "entorno",
    label: "Escena controlada por FFCCSE",
    text: "Escena controlada por Fuerzas y Cuerpos de Seguridad del Estado.",
  },
  {
    id: "com_env_acceso_dif",
    category: "entorno",
    label: "Acceso dificultoso al paciente",
    text: "El acceso al paciente resulta dificultoso.",
  },
  {
    id: "com_env_espacio_conf",
    category: "entorno",
    label: "Paciente en espacio confinado",
    text: "Paciente localizado en espacio confinado.",
  },

  // Posición a la llegada
  {
    id: "com_arr_supino",
    category: "llegada",
    label: "Decúbito supino",
    text: "Paciente encontrado en decúbito supino.",
  },
  {
    id: "com_arr_sedestacion",
    category: "llegada",
    label: "Sedestación",
    text: "Paciente encontrado en sedestación.",
  },
  {
    id: "com_arr_lateral",
    category: "llegada",
    label: "Decúbito lateral",
    text: "Paciente encontrado en decúbito lateral.",
  },
  {
    id: "com_arr_prono",
    category: "llegada",
    label: "Decúbito prono",
    text: "Paciente encontrado en decúbito prono.",
  },
  {
    id: "com_arr_bipedestacion",
    category: "llegada",
    label: "Bipedestación",
    text: "Paciente encontrado en bipedestación.",
  },
  {
    id: "com_arr_suelo",
    category: "llegada",
    label: "Localizado en el suelo",
    text: "Paciente localizado en el suelo.",
  },
  {
    id: "com_arr_cama",
    category: "llegada",
    label: "Localizado en cama",
    text: "Paciente localizado en cama.",
  },

  // Familiares y testigos
  {
    id: "com_fam_familiares",
    category: "contexto",
    label: "Familiares presentes en la escena",
    text: "Se cuenta con presencia de familiares en la escena.",
  },
  {
    id: "com_fam_testigos",
    category: "contexto",
    label: "Testigos presentes",
    text: "Se cuenta con presencia de testigos del episodio.",
  },
  {
    id: "com_fam_sin_acomp",
    category: "contexto",
    label: "Sin acompañantes en la escena",
    text: "Paciente sin acompañantes en la escena en el momento de la actuación.",
    excludes: ["com_fam_familiares", "com_fam_testigos"],
  },
  {
    id: "com_fam_info_familiar",
    category: "contexto",
    label: "Información aportada por familiar",
    text: "Información clínica aportada por familiar presente en la escena.",
  },
  {
    id: "com_fam_info_testigo",
    category: "contexto",
    label: "Información aportada por testigo",
    text: "Información del episodio aportada por testigo presencial.",
  },
  {
    id: "com_fam_sin_info",
    category: "contexto",
    label: "Sin información de acompañantes",
    text: "No se dispone de información adicional por parte de acompañantes o testigos.",
    excludes: ["com_fam_info_familiar", "com_fam_info_testigo"],
  },

  // Pertenencias
  {
    id: "com_per_recogidas",
    category: "pertenencias",
    label: "Se recogen pertenencias",
    text: "Se recogen pertenencias del paciente.",
  },
  {
    id: "com_per_familiar",
    category: "pertenencias",
    label: "Custodia a familiar",
    text: "Custodia de pertenencias entregada a familiar presente en la escena.",
  },
  {
    id: "com_per_policial",
    category: "pertenencias",
    label: "Custodia policial",
    text: "Pertenencias permanecen bajo custodia de Fuerzas y Cuerpos de Seguridad en la escena.",
  },
  {
    id: "com_per_sin_pert",
    category: "pertenencias",
    label: "Sin pertenencias identificadas",
    text: "No se identifican pertenencias del paciente en la escena.",
  },

  // Identificación
  {
    id: "com_idf_documento",
    category: "identificacion",
    label: "Identificado por documentación",
    text: "Paciente identificado mediante documentación acreditativa.",
  },
  {
    id: "com_idf_familiar",
    category: "identificacion",
    label: "Identificado por familiar",
    text: "Paciente identificado por familiar presente.",
  },
  {
    id: "com_idf_sin_id",
    category: "identificacion",
    label: "Sin identificar en la intervención",
    text: "Paciente sin identificar en el momento de la intervención.",
    excludes: ["com_idf_documento", "com_idf_familiar"],
  },

  // Colaboración del paciente
  {
    id: "com_col_colaborador",
    category: "colaboracion",
    label: "Paciente colaborador",
    text: "Paciente colaborador durante la valoración.",
    excludes: ["com_col_parcial", "com_col_no_colaborador", "com_col_agitado"],
  },
  {
    id: "com_col_parcial",
    category: "colaboracion",
    label: "Parcialmente colaborador",
    text: "Paciente parcialmente colaborador durante la valoración.",
    excludes: ["com_col_colaborador", "com_col_no_colaborador", "com_col_agitado"],
  },
  {
    id: "com_col_no_colaborador",
    category: "colaboracion",
    label: "No colaborador",
    text: "Paciente no colaborador durante la valoración.",
    excludes: ["com_col_colaborador", "com_col_parcial"],
  },
  {
    id: "com_col_agitado",
    category: "colaboracion",
    label: "Agitado, impide valoración",
    text: "Paciente agitado, impide la valoración sistematizada.",
    excludes: ["com_col_colaborador", "com_col_parcial"],
  },

  // Traslado y continuidad asistencial
  {
    id: "com_trs_uvi",
    category: "traslado",
    label: "Traslado en UVI móvil",
    text: "Paciente trasladado en Unidad de Soporte Vital Avanzado con monitorización continua durante el traslado.",
    excludes: ["com_trs_svb", "com_trs_escena"],
  },
  {
    id: "com_trs_svb",
    category: "traslado",
    label: "Traslado en SVB",
    text: "Paciente trasladado en Unidad de Soporte Vital Básico.",
    excludes: ["com_trs_uvi", "com_trs_escena"],
  },
  {
    id: "com_trs_escena",
    category: "traslado",
    label: "Resuelto en escena, sin traslado",
    text: "Episodio resuelto en escena, sin necesidad de traslado.",
    excludes: ["com_trs_uvi", "com_trs_svb"],
  },
  {
    id: "com_trs_familiar",
    category: "traslado",
    label: "Traslado con familiar acompañante",
    text: "Traslado con familiar acompañante.",
  },
  {
    id: "com_trs_entrega",
    category: "traslado",
    label: "Entrega al equipo receptor",
    text: "Entrega al equipo receptor con información verbal del episodio.",
  },
  {
    id: "com_trs_informe",
    category: "traslado",
    label: "Informe escrito entregado",
    text: "Informe escrito entregado en el centro receptor.",
  },
];

// ─────────────────────────────────────────────────────────────
// CONSTANTES VITALES — Modo inline-list (calificadores cualitativos)
// El bloque ensambla: "A la valoración, paciente [x], [y], [z]."
// ─────────────────────────────────────────────────────────────

const constantes: Item[] = [
  // Frecuencia cardíaca (grupo mutuamente excluyente)
  {
    id: "cst_normocardico",
    category: "constantes",
    tags: ["fc"],
    label: "Normocárdico/a",
    text: "normocárdico",
    excludes: ["cst_taquicardico", "cst_bradicardico"],
  },
  {
    id: "cst_taquicardico",
    category: "constantes",
    tags: ["fc"],
    label: "Taquicárdico/a",
    text: "taquicárdico",
    excludes: ["cst_normocardico", "cst_bradicardico"],
  },
  {
    id: "cst_bradicardico",
    category: "constantes",
    tags: ["fc"],
    label: "Bradicárdico/a",
    text: "bradicárdico",
    excludes: ["cst_normocardico", "cst_taquicardico"],
  },

  // Tensión arterial (grupo mutuamente excluyente)
  {
    id: "cst_normotenso",
    category: "constantes",
    tags: ["ta"],
    label: "Normotenso/a",
    text: "normotenso",
    excludes: ["cst_hipertenso", "cst_hipotenso"],
  },
  {
    id: "cst_hipertenso",
    category: "constantes",
    tags: ["ta"],
    label: "Hipertenso/a",
    text: "hipertenso",
    excludes: ["cst_normotenso", "cst_hipotenso"],
  },
  {
    id: "cst_hipotenso",
    category: "constantes",
    tags: ["ta"],
    label: "Hipotenso/a",
    text: "hipotenso",
    excludes: ["cst_normotenso", "cst_hipertenso"],
  },

  // Patrón respiratorio (grupo mutuamente excluyente)
  {
    id: "cst_eupneico",
    category: "constantes",
    tags: ["fr"],
    label: "Eupneico/a",
    text: "eupneico",
    excludes: ["cst_taquipneico", "cst_bradipneico"],
  },
  {
    id: "cst_taquipneico",
    category: "constantes",
    tags: ["fr"],
    label: "Taquipneico/a",
    text: "taquipneico",
    excludes: ["cst_eupneico", "cst_bradipneico"],
  },
  {
    id: "cst_bradipneico",
    category: "constantes",
    tags: ["fr"],
    label: "Bradipneico/a",
    text: "bradipneico",
    excludes: ["cst_eupneico", "cst_taquipneico"],
  },

  // Temperatura (grupo mutuamente excluyente)
  {
    id: "cst_afebril",
    category: "constantes",
    tags: ["temp"],
    label: "Afebril",
    text: "afebril",
    excludes: ["cst_febril", "cst_hipotermico"],
  },
  {
    id: "cst_febril",
    category: "constantes",
    tags: ["temp"],
    label: "Febril",
    text: "febril",
    excludes: ["cst_afebril", "cst_hipotermico"],
  },
  {
    id: "cst_hipotermico",
    category: "constantes",
    tags: ["temp"],
    label: "Hipotérmico/a",
    text: "hipotérmico",
    excludes: ["cst_afebril", "cst_febril"],
  },

  // Glucemia (grupo mutuamente excluyente)
  {
    id: "cst_normoglucemia",
    category: "constantes",
    tags: ["gluc"],
    label: "Normoglucemia",
    text: "normoglucemia",
    excludes: ["cst_hiperglucemia", "cst_hipoglucemia"],
  },
  {
    id: "cst_hiperglucemia",
    category: "constantes",
    tags: ["gluc"],
    label: "Hiperglucemia",
    text: "hiperglucemia",
    excludes: ["cst_normoglucemia", "cst_hipoglucemia"],
  },
  {
    id: "cst_hipoglucemia",
    category: "constantes",
    tags: ["gluc"],
    label: "Hipoglucemia",
    text: "hipoglucemia",
    excludes: ["cst_normoglucemia", "cst_hiperglucemia"],
  },

  // Saturación de oxígeno (grupo mutuamente excluyente)
  {
    id: "cst_sat_conservada",
    category: "constantes",
    tags: ["spo2"],
    label: "Saturación conservada",
    text: "saturación de oxígeno conservada",
    excludes: ["cst_desaturando", "cst_sat_disminuida"],
  },
  {
    id: "cst_desaturando",
    category: "constantes",
    tags: ["spo2"],
    label: "Desaturando",
    text: "desaturando",
    excludes: ["cst_sat_conservada", "cst_sat_disminuida"],
  },
  {
    id: "cst_sat_disminuida",
    category: "constantes",
    tags: ["spo2"],
    label: "Saturación basal disminuida",
    text: "saturación basal disminuida",
    excludes: ["cst_sat_conservada", "cst_desaturando"],
  },
];

// ─────────────────────────────────────────────────────────────
// DOLOR TORÁCICO
// ─────────────────────────────────────────────────────────────

const dolorToracicoItems: Item[] = [
  // Caracterización del dolor
  {
    id: "dt_reposo",
    category: "dolor",
    label: "Inicio en reposo",
    text: "El paciente refiere inicio del dolor en situación de reposo.",
    excludes: ["dt_esfuerzo", "dt_estres"],
  },
  {
    id: "dt_esfuerzo",
    category: "dolor",
    label: "Inicio con esfuerzo físico",
    text: "El paciente refiere inicio del dolor en relación con el esfuerzo físico.",
    excludes: ["dt_reposo", "dt_estres"],
  },
  {
    id: "dt_estres",
    category: "dolor",
    label: "Inicio en contexto de estrés",
    text: "El paciente refiere inicio del dolor en contexto de situación de estrés.",
    excludes: ["dt_reposo", "dt_esfuerzo"],
  },
  {
    id: "dt_opresivo",
    category: "dolor",
    label: "Carácter opresivo",
    text: "El paciente describe el dolor de carácter opresivo.",
    excludes: ["dt_punzante", "dt_quemante"],
  },
  {
    id: "dt_punzante",
    category: "dolor",
    label: "Carácter punzante",
    text: "El paciente describe el dolor de carácter punzante.",
    excludes: ["dt_opresivo", "dt_quemante"],
  },
  {
    id: "dt_quemante",
    category: "dolor",
    label: "Carácter urente/quemante",
    text: "El paciente describe el dolor de carácter urente o quemante.",
    excludes: ["dt_opresivo", "dt_punzante"],
  },
  {
    id: "dt_irr_brazo_izq",
    category: "dolor",
    label: "Irradiación a brazo izquierdo",
    text: "El paciente refiere irradiación del dolor hacia el brazo izquierdo.",
  },
  {
    id: "dt_irr_mandibula",
    category: "dolor",
    label: "Irradiación a mandíbula",
    text: "El paciente refiere irradiación del dolor hacia la mandíbula.",
  },
  {
    id: "dt_irr_espalda",
    category: "dolor",
    label: "Irradiación a espalda interescapular",
    text: "El paciente refiere irradiación del dolor hacia la espalda interescapular.",
  },
  {
    id: "dt_irr_epigastrio",
    category: "dolor",
    label: "Irradiación al epigastrio",
    text: "El paciente refiere irradiación del dolor hacia el epigastrio.",
  },
  {
    id: "dt_sin_irradiacion",
    category: "dolor",
    label: "Sin irradiación",
    text: "El paciente refiere dolor sin irradiación a otras localizaciones.",
    excludes: ["dt_irr_brazo_izq", "dt_irr_mandibula", "dt_irr_espalda", "dt_irr_epigastrio"],
  },
  {
    id: "dt_continuo",
    category: "dolor",
    label: "Carácter continuo",
    text: "El paciente refiere dolor de carácter continuo desde el inicio.",
    excludes: ["dt_intermitente"],
  },
  {
    id: "dt_intermitente",
    category: "dolor",
    label: "Carácter intermitente",
    text: "El paciente refiere dolor de carácter intermitente.",
    excludes: ["dt_continuo"],
  },
  {
    id: "dt_persiste",
    category: "dolor",
    label: "Dolor persiste en la valoración",
    text: "El dolor persiste en el momento de la valoración.",
    excludes: ["dt_cede"],
  },
  {
    id: "dt_cede",
    category: "dolor",
    label: "Dolor ha cedido en la valoración",
    text: "El dolor ha cedido en el momento de la valoración.",
    excludes: ["dt_persiste"],
  },
  {
    id: "dt_pleuritico",
    category: "dolor",
    label: "Exacerbación con la respiración",
    text: "El paciente refiere exacerbación del dolor con la respiración.",
  },
  {
    id: "dt_palpacion",
    category: "dolor",
    label: "Reproducible a la palpación",
    text: "Se objetiva dolor reproducible a la palpación de la pared torácica.",
  },

  // Tiempo de evolución
  {
    id: "dt_t_menos_1h",
    category: "tiempo",
    label: "Inicio hace < 1 hora",
    text: "El paciente refiere inicio de los síntomas hace menos de una hora.",
    excludes: ["dt_t_1_6h", "dt_t_mas_6h", "dt_t_desconocido"],
  },
  {
    id: "dt_t_1_6h",
    category: "tiempo",
    label: "Inicio hace 1–6 horas",
    text: "El paciente refiere inicio de los síntomas entre una y seis horas previas a la consulta.",
    excludes: ["dt_t_menos_1h", "dt_t_mas_6h", "dt_t_desconocido"],
  },
  {
    id: "dt_t_mas_6h",
    category: "tiempo",
    label: "Inicio hace > 6 horas",
    text: "El paciente refiere inicio de los síntomas hace más de seis horas.",
    excludes: ["dt_t_menos_1h", "dt_t_1_6h", "dt_t_desconocido"],
  },
  {
    id: "dt_t_desconocido",
    category: "tiempo",
    label: "Tiempo de inicio desconocido",
    text: "No es posible determinar el tiempo de inicio de los síntomas.",
    excludes: ["dt_t_menos_1h", "dt_t_1_6h", "dt_t_mas_6h"],
  },

  // Síntomas acompañantes
  {
    id: "dt_nauseas",
    category: "sintomas",
    label: "Náuseas",
    text: "El paciente refiere náuseas.",
  },
  {
    id: "dt_vomitos",
    category: "sintomas",
    label: "Vómitos",
    text: "El paciente refiere vómitos.",
  },
  {
    id: "dt_disnea_acomp",
    category: "sintomas",
    label: "Disnea acompañante",
    text: "El paciente refiere disnea acompañante al cuadro.",
  },
  {
    id: "dt_palpitaciones",
    category: "sintomas",
    label: "Palpitaciones",
    text: "El paciente refiere palpitaciones.",
  },
  {
    id: "dt_mareo",
    category: "sintomas",
    label: "Mareo o inestabilidad",
    text: "El paciente refiere mareo o sensación de inestabilidad.",
  },
  {
    id: "dt_sincope_previo",
    category: "sintomas",
    label: "Episodio sincopal previo",
    text: "El paciente refiere episodio sincopal previo al inicio del dolor.",
  },
  {
    id: "dt_diaforesis",
    category: "sintomas",
    label: "Diaforesis",
    text: "Se objetiva diaforesis.",
  },
  {
    id: "dt_palidez",
    category: "sintomas",
    label: "Palidez cutánea",
    text: "Se objetiva palidez cutánea.",
  },
  {
    id: "dt_ansiedad",
    category: "sintomas",
    label: "Estado de ansiedad",
    text: "El paciente presenta estado de ansiedad.",
  },

  // Perfusión y estado hemodinámico
  {
    id: "dt_perf_conservada",
    category: "perfusion",
    label: "Perfusión periférica conservada",
    text: "Perfusión periférica conservada.",
    excludes: ["dt_perf_comprometida"],
  },
  {
    id: "dt_perf_comprometida",
    category: "perfusion",
    label: "Perfusión periférica comprometida",
    text: "Perfusión periférica comprometida: se objetiva palidez, frialdad y diaforesis.",
    excludes: ["dt_perf_conservada"],
  },
  {
    id: "dt_frialdad_acral",
    category: "perfusion",
    label: "Frialdad acral",
    text: "Se objetiva frialdad acral.",
  },
  {
    id: "dt_cianosis_perf",
    category: "perfusion",
    label: "Cianosis periférica",
    text: "Se objetiva cianosis periférica.",
  },
  {
    id: "dt_rc_normal",
    category: "perfusion",
    label: "Relleno capilar normal",
    text: "Relleno capilar dentro de parámetros de normalidad.",
    excludes: ["dt_rc_prolongado"],
  },
  {
    id: "dt_rc_prolongado",
    category: "perfusion",
    label: "Relleno capilar prolongado",
    text: "Relleno capilar prolongado.",
    excludes: ["dt_rc_normal"],
  },

  // Auscultación y patrón respiratorio
  {
    id: "dt_mv_conservado",
    category: "respiratorio",
    label: "Murmullo vesicular conservado y simétrico",
    text: "Murmullo vesicular conservado y simétrico a la auscultación.",
    excludes: ["dt_mv_dismn_bil", "dt_mv_dismn_der", "dt_mv_dismn_izq"],
  },
  {
    id: "dt_mv_dismn_bil",
    category: "respiratorio",
    label: "MV disminuido bilateral",
    text: "Se objetiva disminución del murmullo vesicular de distribución bilateral.",
    excludes: ["dt_mv_conservado"],
  },
  {
    id: "dt_mv_dismn_der",
    category: "respiratorio",
    label: "MV disminuido en hemitórax derecho",
    text: "Se objetiva disminución del murmullo vesicular en hemitórax derecho.",
    excludes: ["dt_mv_conservado"],
  },
  {
    id: "dt_mv_dismn_izq",
    category: "respiratorio",
    label: "MV disminuido en hemitórax izquierdo",
    text: "Se objetiva disminución del murmullo vesicular en hemitórax izquierdo.",
    excludes: ["dt_mv_conservado"],
  },
  {
    id: "dt_crepitantes",
    category: "respiratorio",
    label: "Crepitantes en bases",
    text: "Se auscultan crepitantes en bases pulmonares.",
  },
  {
    id: "dt_sibilancias",
    category: "respiratorio",
    label: "Sibilancias",
    text: "Se auscultan sibilancias a la auscultación pulmonar.",
  },
  {
    id: "dt_trabajo_resp",
    category: "respiratorio",
    label: "Trabajo respiratorio aumentado",
    text: "Se objetiva trabajo respiratorio aumentado.",
  },

  // ECG y monitorización
  {
    id: "dt_monitor",
    category: "ecg",
    label: "Monitorización ECG aplicada",
    text: "Se aplica monitorización electrocardiográfica continua.",
  },
  {
    id: "dt_ecg_12d",
    category: "ecg",
    label: "ECG de 12 derivaciones realizado",
    text: "Se realiza electrocardiograma de 12 derivaciones.",
  },
  {
    id: "dt_ecg_sinusal",
    category: "ecg",
    label: "Ritmo sinusal",
    text: "En el registro electrocardiográfico se objetiva ritmo sinusal.",
    excludes: ["dt_ecg_alt", "dt_ecg_fa", "dt_ecg_taquicardia", "dt_ecg_bradicardia"],
  },
  {
    id: "dt_ecg_sin_alt",
    category: "ecg",
    label: "ECG sin alteraciones objetivables",
    text: "Electrocardiograma sin alteraciones objetivables del ritmo, la conducción ni la repolarización en el momento de la valoración.",
    excludes: [
      "dt_ecg_alt",
      "dt_ecg_elevacion_st",
      "dt_ecg_depresion_st",
      "dt_ecg_inversion_t",
      "dt_ecg_brihh",
      "dt_ecg_brdhh",
      "dt_ecg_taquicardia",
      "dt_ecg_bradicardia",
      "dt_ecg_fa",
      "dt_ecg_extrasist",
      "dt_ecg_pr_largo",
      "dt_ecg_qt_largo",
      "dt_ecg_pausa",
      "dt_ecg_qrs_ancho",
    ],
  },
  {
    id: "dt_ecg_alt",
    category: "ecg",
    label: "ECG con alteraciones objetivables",
    text: "Se objetivan alteraciones electrocardiográficas en el registro realizado.",
    excludes: ["dt_ecg_sinusal", "dt_ecg_sin_alt"],
  },
  {
    id: "dt_ecg_elevacion_st",
    category: "ecg",
    label: "Elevación del segmento ST",
    text: "Se objetiva elevación del segmento ST en el registro electrocardiográfico.",
    excludes: ["dt_ecg_sin_alt"],
  },
  {
    id: "dt_ecg_depresion_st",
    category: "ecg",
    label: "Depresión del segmento ST",
    text: "Se objetiva depresión del segmento ST en el registro electrocardiográfico.",
    excludes: ["dt_ecg_sin_alt"],
  },
  {
    id: "dt_ecg_inversion_t",
    category: "ecg",
    label: "Inversión de la onda T",
    text: "Se objetiva inversión de la onda T en el registro electrocardiográfico.",
    excludes: ["dt_ecg_sin_alt"],
  },
  {
    id: "dt_ecg_brihh",
    category: "ecg",
    label: "Bloqueo de rama izquierda",
    text: "Se registra imagen de bloqueo de rama izquierda en el electrocardiograma.",
    excludes: ["dt_ecg_sin_alt", "dt_ecg_brdhh"],
  },
  {
    id: "dt_ecg_brdhh",
    category: "ecg",
    label: "Bloqueo de rama derecha",
    text: "Se registra imagen de bloqueo de rama derecha en el electrocardiograma.",
    excludes: ["dt_ecg_brihh"],
  },
  {
    id: "dt_ecg_taquicardia",
    category: "ecg",
    label: "Taquicardia en monitorización",
    text: "Se registra taquicardia en la monitorización continua.",
    excludes: ["dt_ecg_sinusal", "dt_ecg_bradicardia"],
  },
  {
    id: "dt_ecg_bradicardia",
    category: "ecg",
    label: "Bradicardia en monitorización",
    text: "Se registra bradicardia en la monitorización continua.",
    excludes: ["dt_ecg_sinusal", "dt_ecg_taquicardia"],
  },
  {
    id: "dt_ecg_fa",
    category: "ecg",
    label: "Ritmo irregular",
    text: "Se objetiva ritmo irregular en la monitorización electrocardiográfica.",
    excludes: ["dt_ecg_sinusal"],
  },
  {
    id: "dt_ecg_extrasist",
    category: "ecg",
    label: "Extrasístoles",
    text: "Se objetivan extrasístoles en la monitorización electrocardiográfica.",
  },
  {
    id: "dt_ecg_pausa",
    category: "ecg",
    label: "Pausa en la monitorización",
    text: "Se registra pausa en la monitorización electrocardiográfica.",
  },
  {
    id: "dt_ecg_qrs_ancho",
    category: "ecg",
    label: "QRS ancho",
    text: "Se registra QRS ancho en el electrocardiograma.",
  },
  {
    id: "dt_ecg_pr_largo",
    category: "ecg",
    label: "Alargamiento del intervalo PR",
    text: "Se registra alargamiento del intervalo PR en el electrocardiograma.",
  },
  {
    id: "dt_ecg_qt_largo",
    category: "ecg",
    label: "Alargamiento del intervalo QT",
    text: "Se registra alargamiento del intervalo QT en el electrocardiograma.",
  },

  // Intervenciones en DT
  {
    id: "dt_semifowler",
    category: "intervencion",
    label: "Posición semiincorporada",
    text: "Paciente colocado en posición semiincorporada.",
  },
  {
    id: "dt_via_periferica",
    category: "intervencion",
    label: "Acceso venoso periférico",
    text: "Se canaliza acceso venoso periférico.",
  },
  {
    id: "dt_o2_gafas",
    category: "intervencion",
    label: "Oxigenoterapia (gafas nasales)",
    text: "Se administra oxigenoterapia mediante gafas nasales.",
    excludes: ["dt_o2_mascarilla"],
  },
  {
    id: "dt_o2_mascarilla",
    category: "intervencion",
    label: "Oxigenoterapia (mascarilla)",
    text: "Se administra oxigenoterapia mediante mascarilla con reservorio.",
    excludes: ["dt_o2_gafas"],
  },
  {
    id: "dt_nitratos",
    category: "intervencion",
    label: "Nitroglicerina sublingual",
    text: "Se administra nitroglicerina sublingual según protocolo.",
  },
  {
    id: "dt_asa",
    category: "intervencion",
    label: "Ácido acetilsalicílico",
    text: "Se administra ácido acetilsalicílico según protocolo.",
  },
  {
    id: "dt_analgesico",
    category: "intervencion",
    label: "Analgesia",
    text: "Se administra analgesia según protocolo.",
  },
  {
    id: "dt_antieméticos",
    category: "intervencion",
    label: "Antiemético",
    text: "Se administra antiemético según protocolo.",
  },
  {
    id: "dt_activacion_cod",
    category: "intervencion",
    label: "Activación de código en destino",
    text: "Se activa código de alerta en destino según protocolo de actuación.",
  },

  // Manejo hemodinámico avanzado (bloque condicional)
  {
    id: "dt_sfv",
    category: "intervencion",
    label: "Sueroterapia intravenosa",
    text: "Se administra sueroterapia intravenosa según respuesta hemodinámica.",
  },
  {
    id: "dt_vasopresores",
    category: "intervencion",
    label: "Soporte vasopresor",
    text: "Se administra soporte vasopresor según protocolo.",
  },
  {
    id: "dt_trendelenburg",
    category: "intervencion",
    label: "Posición de Trendelenburg",
    text: "Se coloca al paciente en posición de Trendelenburg ante situación de inestabilidad hemodinámica.",
  },
];

// ─────────────────────────────────────────────────────────────
// CONVULSIONES
// ─────────────────────────────────────────────────────────────

const convulsionesItems: Item[] = [
  // Situación a la llegada
  {
    id: "cv_activa",
    category: "llegada_cv",
    label: "Actividad convulsiva activa a la llegada",
    text: "A la llegada del equipo se objetiva actividad convulsiva activa.",
    excludes: ["cv_cede", "cv_postcritico"],
  },
  {
    id: "cv_cede",
    category: "llegada_cv",
    label: "Actividad convulsiva ha cedido",
    text: "La actividad convulsiva ha cedido a la llegada del equipo.",
    excludes: ["cv_activa"],
  },
  {
    id: "cv_postcritico",
    category: "llegada_cv",
    label: "Período poscrítico a la llegada",
    text: "A la llegada, el paciente se encuentra en período poscrítico.",
    excludes: ["cv_activa"],
  },
  {
    id: "cv_test_tcg",
    category: "llegada_cv",
    label: "Testigos: movimientos tónico-clónicos",
    text: "Testigos refieren haber presenciado episodio de movimientos tónico-clónicos generalizados.",
  },
  {
    id: "cv_test_rigidez",
    category: "llegada_cv",
    label: "Testigos: rigidez tónica",
    text: "Testigos refieren episodio de rigidez tónica generalizada.",
  },
  {
    id: "cv_test_automatism",
    category: "llegada_cv",
    label: "Testigos: automatismos motores",
    text: "Testigos refieren episodio con automatismos motores.",
  },
  {
    id: "cv_dur_breve",
    category: "llegada_cv",
    label: "Duración referida < 5 min",
    text: "Testigos refieren duración del episodio inferior a 5 minutos.",
    excludes: ["cv_dur_prolongada", "cv_dur_status"],
  },
  {
    id: "cv_dur_prolongada",
    category: "llegada_cv",
    label: "Duración referida > 5 min",
    text: "Testigos refieren duración del episodio superior a 5 minutos.",
    excludes: ["cv_dur_breve", "cv_dur_status"],
  },
  {
    id: "cv_dur_status",
    category: "llegada_cv",
    label: "Actividad continua (posible status)",
    text: "Testigos refieren actividad convulsiva continua o múltiples episodios sin recuperación de conciencia entre ellos.",
    excludes: ["cv_dur_breve", "cv_dur_prolongada"],
  },
  {
    id: "cv_antec_prev",
    category: "llegada_cv",
    label: "Antecedente de episodios previos",
    text: "El paciente o familiares refieren antecedente de episodios convulsivos previos.",
    excludes: ["cv_sin_antec"],
  },
  {
    id: "cv_sin_antec",
    category: "llegada_cv",
    label: "Sin antecedentes convulsivos",
    text: "El paciente o familiares niegan episodios convulsivos previos.",
    excludes: ["cv_antec_prev"],
  },

  // Actividad convulsiva observada
  {
    id: "cv_obs_tcg",
    category: "actividad",
    label: "Actividad tónico-clónica generalizada",
    text: "Se observa actividad tónico-clónica generalizada.",
  },
  {
    id: "cv_obs_tonico",
    category: "actividad",
    label: "Rigidez tónica generalizada",
    text: "Se observa rigidez tónica generalizada.",
  },
  {
    id: "cv_obs_clonico_foc",
    category: "actividad",
    label: "Actividad clónica focal",
    text: "Se observa actividad clónica de predominio focal.",
  },
  {
    id: "cv_obs_automatismos",
    category: "actividad",
    label: "Automatismos motores",
    text: "Se observan automatismos motores durante el episodio.",
  },
  {
    id: "cv_desv_ocular",
    category: "actividad",
    label: "Desviación ocular conjugada",
    text: "Se objetiva desviación ocular conjugada durante la actividad convulsiva.",
  },
  {
    id: "cv_mord_lengua",
    category: "actividad",
    label: "Mordedura de lengua",
    text: "Se objetiva mordedura de lengua.",
  },
  {
    id: "cv_relax_esfinteres",
    category: "actividad",
    label: "Relajación de esfínteres",
    text: "Se objetiva o refiere relajación de esfínteres durante el episodio.",
  },
  {
    id: "cv_apnea_ictal",
    category: "actividad",
    label: "Apnea durante el episodio",
    text: "Se objetiva apnea durante la actividad convulsiva.",
  },

  // Nivel de conciencia / Glasgow
  {
    id: "cv_gcs_15",
    category: "consciencia",
    label: "Glasgow 15 — normal",
    text: "Escala de Glasgow 15: apertura ocular espontánea, respuesta verbal orientada, obedece órdenes motoras.",
    excludes: ["cv_gcs_disminuido", "cv_sin_apertura", "cv_sin_resp_verbal", "cv_sin_resp_motora"],
  },
  {
    id: "cv_gcs_disminuido",
    category: "consciencia",
    label: "Disminución del nivel de conciencia",
    text: "Se objetiva disminución del nivel de conciencia en la valoración.",
    excludes: ["cv_gcs_15"],
  },
  {
    id: "cv_apert_voz",
    category: "consciencia",
    label: "Apertura ocular ante estímulos verbales",
    text: "Apertura ocular únicamente ante estímulos verbales.",
    excludes: ["cv_gcs_15", "cv_apert_dolor", "cv_sin_apertura"],
  },
  {
    id: "cv_apert_dolor",
    category: "consciencia",
    label: "Apertura ocular ante estímulos dolorosos",
    text: "Apertura ocular únicamente ante estímulos dolorosos.",
    excludes: ["cv_gcs_15", "cv_apert_voz", "cv_sin_apertura"],
  },
  {
    id: "cv_sin_apertura",
    category: "consciencia",
    label: "Sin apertura ocular",
    text: "Sin apertura ocular ante ningún estímulo.",
    excludes: ["cv_gcs_15", "cv_apert_voz", "cv_apert_dolor"],
  },
  {
    id: "cv_rv_confusa",
    category: "consciencia",
    label: "Respuesta verbal confusa",
    text: "Respuesta verbal confusa o inapropiada.",
    excludes: ["cv_gcs_15", "cv_sin_resp_verbal"],
  },
  {
    id: "cv_sin_resp_verbal",
    category: "consciencia",
    label: "Sin respuesta verbal",
    text: "Sin respuesta verbal valorable.",
    excludes: ["cv_gcs_15", "cv_rv_confusa"],
  },
  {
    id: "cv_rm_obedece",
    category: "consciencia",
    label: "Obedece órdenes motoras",
    text: "Obedece órdenes motoras.",
    excludes: [
      "cv_gcs_15",
      "cv_rm_localiza",
      "cv_rm_flexora",
      "cv_rm_extensora",
      "cv_sin_resp_motora",
    ],
  },
  {
    id: "cv_rm_localiza",
    category: "consciencia",
    label: "Localiza el estímulo doloroso",
    text: "Localiza el estímulo doloroso.",
    excludes: ["cv_rm_obedece", "cv_rm_flexora", "cv_rm_extensora", "cv_sin_resp_motora"],
  },
  {
    id: "cv_rm_flexora",
    category: "consciencia",
    label: "Respuesta motora flexora",
    text: "Respuesta motora flexora ante estímulos dolorosos.",
    excludes: ["cv_rm_obedece", "cv_rm_localiza", "cv_rm_extensora", "cv_sin_resp_motora"],
  },
  {
    id: "cv_rm_extensora",
    category: "consciencia",
    label: "Respuesta motora extensora",
    text: "Respuesta motora extensora ante estímulos dolorosos.",
    excludes: ["cv_rm_obedece", "cv_rm_localiza", "cv_rm_flexora", "cv_sin_resp_motora"],
  },
  {
    id: "cv_sin_resp_motora",
    category: "consciencia",
    label: "Sin respuesta motora",
    text: "Sin respuesta motora ante estímulos.",
    excludes: ["cv_rm_obedece", "cv_rm_localiza", "cv_rm_flexora", "cv_rm_extensora"],
  },

  // Pupilas
  {
    id: "cv_pupilas_norm",
    category: "pupilas",
    label: "Pupilas isocóricas y normorreactivas",
    text: "Pupilas isocóricas y normorreactivas a la luz.",
    excludes: ["cv_midriasis", "cv_miosis", "cv_anisocoria", "cv_arreactivas"],
  },
  {
    id: "cv_midriasis",
    category: "pupilas",
    label: "Midriasis bilateral",
    text: "Se objetiva midriasis bilateral.",
    excludes: ["cv_pupilas_norm", "cv_miosis"],
  },
  {
    id: "cv_miosis",
    category: "pupilas",
    label: "Miosis bilateral",
    text: "Se objetiva miosis bilateral.",
    excludes: ["cv_pupilas_norm", "cv_midriasis"],
  },
  {
    id: "cv_anisocoria",
    category: "pupilas",
    label: "Anisocoria",
    text: "Se objetiva anisocoria.",
    excludes: ["cv_pupilas_norm"],
  },
  {
    id: "cv_arreactivas",
    category: "pupilas",
    label: "Arreactividad pupilar",
    text: "Se objetiva arreactividad pupilar bilateral.",
    excludes: ["cv_pupilas_norm"],
  },
  {
    id: "cv_desv_mirada",
    category: "pupilas",
    label: "Desviación conjugada de la mirada",
    text: "Se objetiva desviación conjugada de la mirada.",
  },

  // Focalidad neurológica (bloque condicional)
  {
    id: "cv_sin_focalidad",
    category: "focalidad",
    label: "Sin focalidad neurológica",
    text: "No se objetiva focalidad neurológica en la valoración inicial.",
    excludes: [
      "cv_hemiparesia_d",
      "cv_hemiparesia_i",
      "cv_desv_comisura",
      "cv_disartria",
      "cv_afasia",
    ],
  },
  {
    id: "cv_hemiparesia_d",
    category: "focalidad",
    label: "Debilidad en hemicuerpo derecho",
    text: "Se objetiva debilidad o asimetría motora en hemicuerpo derecho.",
    excludes: ["cv_sin_focalidad"],
  },
  {
    id: "cv_hemiparesia_i",
    category: "focalidad",
    label: "Debilidad en hemicuerpo izquierdo",
    text: "Se objetiva debilidad o asimetría motora en hemicuerpo izquierdo.",
    excludes: ["cv_sin_focalidad"],
  },
  {
    id: "cv_desv_comisura",
    category: "focalidad",
    label: "Desviación de comisura bucal",
    text: "Se objetiva desviación de la comisura bucal.",
    excludes: ["cv_sin_focalidad"],
  },
  {
    id: "cv_disartria",
    category: "focalidad",
    label: "Disartria",
    text: "Se objetiva disartria.",
    excludes: ["cv_sin_focalidad"],
  },
  {
    id: "cv_afasia",
    category: "focalidad",
    label: "Dificultad o ausencia de comunicación verbal",
    text: "Se objetiva dificultad o ausencia de comunicación verbal valorable.",
    excludes: ["cv_sin_focalidad"],
  },

  // Glucemia
  {
    id: "cv_gluc_normal",
    category: "glucemia",
    label: "Glucemia normal",
    text: "Glucemia capilar dentro del rango de normalidad.",
    excludes: ["cv_gluc_hipo", "cv_gluc_hiper"],
  },
  {
    id: "cv_gluc_hipo",
    category: "glucemia",
    label: "Hipoglucemia objetivada",
    text: "Se objetiva hipoglucemia en la determinación de glucemia capilar.",
    excludes: ["cv_gluc_normal", "cv_gluc_hiper"],
  },
  {
    id: "cv_gluc_hiper",
    category: "glucemia",
    label: "Hiperglucemia objetivada",
    text: "Se objetiva hiperglucemia en la determinación de glucemia capilar.",
    excludes: ["cv_gluc_normal", "cv_gluc_hipo"],
  },

  // ECG / Monitorización
  {
    id: "cv_monitor",
    category: "ecg",
    label: "Monitorización ECG aplicada",
    text: "Se aplica monitorización electrocardiográfica continua.",
  },
  {
    id: "cv_ecg_sinusal",
    category: "ecg",
    label: "Ritmo sinusal",
    text: "Se registra ritmo sinusal en la monitorización.",
    excludes: ["cv_ecg_alt"],
  },
  {
    id: "cv_ecg_sin_alt",
    category: "ecg",
    label: "Monitorización sin alteraciones objetivables",
    text: "Monitorización electrocardiográfica sin alteraciones objetivables del ritmo, la conducción ni la repolarización en el momento de la valoración.",
    excludes: [
      "cv_ecg_alt",
      "cv_ecg_taquicardia",
      "cv_ecg_bradicardia",
      "cv_ecg_ritmo_irregular",
      "cv_ecg_extrasist",
      "cv_ecg_pausa",
      "cv_ecg_qrs_ancho",
      "cv_ecg_pr_largo",
      "cv_ecg_qt_largo",
      "cv_ecg_brihh",
      "cv_ecg_brdhh",
      "cv_ecg_elevacion_st",
      "cv_ecg_depresion_st",
      "cv_ecg_inversion_t",
    ],
  },
  {
    id: "cv_ecg_alt",
    category: "ecg",
    label: "Monitorización con alteraciones objetivables",
    text: "Se objetivan alteraciones electrocardiográficas en la monitorización.",
    excludes: ["cv_ecg_sinusal", "cv_ecg_sin_alt"],
  },
  {
    id: "cv_ecg_taquicardia",
    category: "ecg",
    label: "Taquicardia",
    text: "Se registra taquicardia en la monitorización electrocardiográfica.",
  },
  {
    id: "cv_ecg_bradicardia",
    category: "ecg",
    label: "Bradicardia",
    text: "Se registra bradicardia en la monitorización electrocardiográfica.",
  },
  {
    id: "cv_ecg_ritmo_irregular",
    category: "ecg",
    label: "Ritmo irregular",
    text: "Se objetiva ritmo irregular en la monitorización electrocardiográfica.",
  },
  {
    id: "cv_ecg_extrasist",
    category: "ecg",
    label: "Extrasístoles",
    text: "Se objetivan extrasístoles en la monitorización electrocardiográfica.",
  },
  {
    id: "cv_ecg_pausa",
    category: "ecg",
    label: "Pausa en la monitorización",
    text: "Se registra pausa en la monitorización electrocardiográfica.",
  },
  {
    id: "cv_ecg_qrs_ancho",
    category: "ecg",
    label: "QRS ancho",
    text: "Se registra QRS ancho en el electrocardiograma.",
  },
  {
    id: "cv_ecg_pr_largo",
    category: "ecg",
    label: "Alargamiento del intervalo PR",
    text: "Se registra alargamiento del intervalo PR en el electrocardiograma.",
  },
  {
    id: "cv_ecg_qt_largo",
    category: "ecg",
    label: "Alargamiento del intervalo QT",
    text: "Se registra alargamiento del intervalo QT en el electrocardiograma.",
  },
  {
    id: "cv_ecg_brihh",
    category: "ecg",
    label: "Bloqueo de rama izquierda",
    text: "Se registra imagen de bloqueo de rama izquierda en el electrocardiograma.",
  },
  {
    id: "cv_ecg_brdhh",
    category: "ecg",
    label: "Bloqueo de rama derecha",
    text: "Se registra imagen de bloqueo de rama derecha en el electrocardiograma.",
  },
  {
    id: "cv_ecg_elevacion_st",
    category: "ecg",
    label: "Elevación del segmento ST",
    text: "Se objetiva elevación del segmento ST en el electrocardiograma.",
  },
  {
    id: "cv_ecg_depresion_st",
    category: "ecg",
    label: "Depresión del segmento ST",
    text: "Se objetiva depresión del segmento ST en el electrocardiograma.",
  },
  {
    id: "cv_ecg_inversion_t",
    category: "ecg",
    label: "Inversión de la onda T",
    text: "Se objetiva inversión de la onda T en el electrocardiograma.",
  },

  // Período poscrítico (bloque condicional)
  {
    id: "cv_pc_confuso",
    category: "postcritico",
    label: "Confusión en poscrítico",
    text: "En período poscrítico, el paciente se encuentra confuso y desorientado.",
  },
  {
    id: "cv_pc_somnoliento",
    category: "postcritico",
    label: "Somnolencia en poscrítico",
    text: "En período poscrítico, el paciente presenta somnolencia marcada.",
  },
  {
    id: "cv_pc_amnesia",
    category: "postcritico",
    label: "Amnesia del episodio",
    text: "El paciente refiere amnesia del episodio.",
  },
  {
    id: "cv_pc_cefalea",
    category: "postcritico",
    label: "Cefalea poscrítica",
    text: "El paciente refiere cefalea poscrítica.",
  },
  {
    id: "cv_rec_progresiva",
    category: "postcritico",
    label: "Recuperación progresiva de conciencia",
    text: "Se objetiva recuperación progresiva del nivel de conciencia durante la valoración.",
    excludes: ["cv_no_recuperacion"],
  },
  {
    id: "cv_no_recuperacion",
    category: "postcritico",
    label: "Sin recuperación de conciencia",
    text: "No se objetiva recuperación del nivel de conciencia tras el cese de la actividad convulsiva.",
    excludes: ["cv_rec_progresiva"],
  },

  // Manejo de status (bloque condicional)
  {
    id: "cv_manejo_via_avanzada",
    category: "intervencion",
    label: "Manejo avanzado de vía aérea",
    text: "Se procede a manejo avanzado de la vía aérea.",
  },
  {
    id: "cv_segunda_linea",
    category: "intervencion",
    label: "Fármaco de segunda línea (status)",
    text: "Se administra fármaco de segunda línea según protocolo de manejo del status epiléptico.",
  },
  {
    id: "cv_activacion_via_rap",
    category: "intervencion",
    label: "Activación de vía rápida en destino",
    text: "Se activa vía de atención urgente en destino ante persistencia de la actividad convulsiva.",
  },

  // Intervenciones en convulsiones
  {
    id: "cv_pls",
    category: "intervencion",
    label: "Posición lateral de seguridad",
    text: "Se coloca al paciente en posición lateral de seguridad.",
  },
  {
    id: "cv_va_permeable",
    category: "intervencion",
    label: "Permeabilización de vía aérea",
    text: "Se permeabiliza la vía aérea.",
  },
  {
    id: "cv_o2",
    category: "intervencion",
    label: "Oxigenoterapia (mascarilla)",
    text: "Se administra oxigenoterapia mediante mascarilla con reservorio.",
  },
  {
    id: "cv_sin_restriccion",
    category: "intervencion",
    label: "Sin restricciones mecánicas",
    text: "Se evitan restricciones mecánicas durante la actividad convulsiva.",
  },
  {
    id: "cv_via_iv",
    category: "intervencion",
    label: "Acceso venoso periférico",
    text: "Se canaliza acceso venoso periférico.",
  },
  {
    id: "cv_benzo_iv",
    category: "intervencion",
    label: "Benzodiacepina IV",
    text: "Se administra benzodiacepina intravenosa según protocolo.",
    excludes: ["cv_benzo_rectal", "cv_benzo_in"],
  },
  {
    id: "cv_benzo_rectal",
    category: "intervencion",
    label: "Benzodiacepina rectal",
    text: "Se administra benzodiacepina rectal según protocolo.",
    excludes: ["cv_benzo_iv", "cv_benzo_in"],
  },
  {
    id: "cv_benzo_in",
    category: "intervencion",
    label: "Benzodiacepina intranasal",
    text: "Se administra benzodiacepina intranasal según protocolo.",
    excludes: ["cv_benzo_iv", "cv_benzo_rectal"],
  },
  {
    id: "cv_glucosa_iv",
    category: "intervencion",
    label: "Suero glucosado IV (hipoglucemia)",
    text: "Se administra suero glucosado intravenoso por hipoglucemia objetivada.",
  },
  {
    id: "cv_cede_tto",
    category: "intervencion",
    label: "Actividad cede con tratamiento",
    text: "La actividad convulsiva cede tras la intervención terapéutica.",
    excludes: ["cv_no_cede_tto"],
  },
  {
    id: "cv_no_cede_tto",
    category: "intervencion",
    label: "Actividad no cede con tratamiento",
    text: "La actividad convulsiva no cede tras el tratamiento administrado.",
    excludes: ["cv_cede_tto"],
  },
];

// ─────────────────────────────────────────────────────────────
// SÍNCOPE
// ─────────────────────────────────────────────────────────────

const sincopeItems: Item[] = [
  // Contexto previo al episodio
  {
    id: "sc_bipedestacion",
    category: "preevento",
    label: "Bipedestación prolongada previa",
    text: "Testigos o paciente refieren episodio en contexto de bipedestación prolongada.",
  },
  {
    id: "sc_esfuerzo",
    category: "preevento",
    label: "Relacionado con esfuerzo físico",
    text: "Testigos o paciente refieren inicio del episodio en relación con el esfuerzo físico.",
  },
  {
    id: "sc_postural",
    category: "preevento",
    label: "Cambio postural brusco",
    text: "Paciente refiere episodio en relación con cambio postural brusco.",
  },
  {
    id: "sc_estres",
    category: "preevento",
    label: "Situación de estrés emocional",
    text: "Paciente refiere situación de estrés emocional previa al episodio.",
  },
  {
    id: "sc_valsalva",
    category: "preevento",
    label: "Maniobra de Valsalva previa",
    text: "Paciente refiere episodio en contexto de maniobra de Valsalva.",
  },
  {
    id: "sc_sin_prodromos",
    category: "preevento",
    label: "Sin pródromos aparentes",
    text: "Testigos refieren pérdida de conciencia sin pródromos aparentes.",
  },
  {
    id: "sc_palpitaciones_prev",
    category: "preevento",
    label: "Palpitaciones previas",
    text: "Paciente refiere palpitaciones previas al episodio.",
  },
  {
    id: "sc_dolor_torac_prev",
    category: "preevento",
    label: "Dolor torácico previo",
    text: "Paciente refiere dolor torácico previo al episodio.",
  },
  {
    id: "sc_sudoracion_prev",
    category: "preevento",
    label: "Sudoración previa",
    text: "Paciente refiere sudoración previa al episodio.",
  },
  {
    id: "sc_nauseas_prev",
    category: "preevento",
    label: "Náuseas previas",
    text: "Paciente refiere náuseas previas al episodio.",
  },
  {
    id: "sc_vision_borrosa",
    category: "preevento",
    label: "Visión borrosa o lipotimia previa",
    text: "Paciente refiere visión borrosa o sensación de lipotimia previa al episodio.",
  },

  // Pérdida transitoria de conciencia
  {
    id: "sc_ptc_confirmada",
    category: "ptc",
    label: "PTC confirmada por testigos",
    text: "Testigos confirman pérdida transitoria de conciencia.",
  },
  {
    id: "sc_ptc_breve",
    category: "ptc",
    label: "Duración < 1 min",
    text: "Testigos refieren duración de la pérdida de conciencia inferior a 1 minuto.",
    excludes: ["sc_ptc_moderada"],
  },
  {
    id: "sc_ptc_moderada",
    category: "ptc",
    label: "Duración 1–5 min",
    text: "Testigos refieren duración de la pérdida de conciencia entre 1 y 5 minutos.",
    excludes: ["sc_ptc_breve"],
  },
  {
    id: "sc_ptc_movimientos",
    category: "ptc",
    label: "Movimientos anómalos durante la PTC",
    text: "Testigos refieren movimientos anómalos durante el episodio.",
    excludes: ["sc_ptc_sin_movim"],
  },
  {
    id: "sc_ptc_sin_movim",
    category: "ptc",
    label: "Sin movimientos durante la PTC",
    text: "Testigos refieren ausencia de movimientos durante la pérdida de conciencia.",
    excludes: ["sc_ptc_movimientos"],
  },
  {
    id: "sc_ptc_relajacion",
    category: "ptc",
    label: "Relajación de esfínteres",
    text: "Testigos refieren relajación de esfínteres durante el episodio.",
  },
  {
    id: "sc_caida_sin_lesion",
    category: "ptc",
    label: "Caída sin traumatismo objetivable",
    text: "Caída al suelo sin traumatismo objetivable.",
    excludes: ["sc_caida_con_lesion"],
  },
  {
    id: "sc_caida_con_lesion",
    category: "ptc",
    label: "Caída con traumatismo",
    text: "Se objetiva traumatismo como consecuencia de la caída.",
    excludes: ["sc_caida_sin_lesion"],
  },

  // Recuperación
  {
    id: "sc_rec_espontanea",
    category: "recuperacion",
    label: "Recuperación espontánea",
    text: "Recuperación espontánea del nivel de conciencia referida por testigos.",
  },
  {
    id: "sc_rec_rapida",
    category: "recuperacion",
    label: "Recuperación rápida sin período confusional",
    text: "Recuperación rápida del nivel de conciencia, sin período confusional prolongado.",
  },
  {
    id: "sc_rec_confusional",
    category: "recuperacion",
    label: "Período confusional en la recuperación",
    text: "Se objetiva o refiere período confusional tras la recuperación del nivel de conciencia.",
  },
  {
    id: "sc_rec_llegada",
    category: "recuperacion",
    label: "Recuperado a la llegada del equipo",
    text: "Paciente recuperado del episodio a la llegada del equipo.",
    excludes: ["sc_no_rec_llegada"],
  },
  {
    id: "sc_no_rec_llegada",
    category: "recuperacion",
    label: "No recuperado a la llegada",
    text: "Paciente no recuperado del nivel de conciencia habitual a la llegada del equipo.",
    excludes: ["sc_rec_llegada"],
  },

  // Estado en la valoración
  {
    id: "sc_consciente_orientado",
    category: "estado",
    label: "Consciente y orientado",
    text: "Paciente consciente y orientado en el momento de la valoración.",
    excludes: ["sc_consciente_confuso"],
  },
  {
    id: "sc_consciente_confuso",
    category: "estado",
    label: "Consciente pero confuso",
    text: "Paciente consciente pero confuso en el momento de la valoración.",
    excludes: ["sc_consciente_orientado"],
  },
  {
    id: "sc_amnesia",
    category: "estado",
    label: "Amnesia del episodio",
    text: "Paciente refiere amnesia del episodio.",
  },
  {
    id: "sc_cefalea",
    category: "estado",
    label: "Cefalea actual",
    text: "Paciente refiere cefalea en el momento de la valoración.",
  },
  {
    id: "sc_nauseas_act",
    category: "estado",
    label: "Náuseas actuales",
    text: "Paciente refiere náuseas en el momento de la valoración.",
  },
  {
    id: "sc_debilidad",
    category: "estado",
    label: "Debilidad generalizada",
    text: "Paciente refiere debilidad generalizada tras el episodio.",
  },

  // Traumatismo (bloque condicional)
  {
    id: "sc_trauma_craneal",
    category: "trauma",
    label: "Traumatismo craneal",
    text: "Se objetiva traumatismo craneal como consecuencia de la caída.",
  },
  {
    id: "sc_herida_craneal",
    category: "trauma",
    label: "Herida en cuero cabelludo",
    text: "Se objetiva herida en cuero cabelludo.",
  },
  {
    id: "sc_contusion_facial",
    category: "trauma",
    label: "Contusión facial",
    text: "Se objetiva contusión facial.",
  },
  {
    id: "sc_trauma_extrem",
    category: "trauma",
    label: "Traumatismo en extremidades",
    text: "Se objetiva traumatismo en extremidades.",
  },
  {
    id: "sc_sin_trauma",
    category: "trauma",
    label: "Sin traumatismo objetivable",
    text: "No se objetiva traumatismo como consecuencia de la caída.",
    excludes: ["sc_trauma_craneal", "sc_herida_craneal", "sc_contusion_facial", "sc_trauma_extrem"],
  },

  // Glucemia
  {
    id: "sc_gluc_normal",
    category: "glucemia",
    label: "Glucemia normal",
    text: "Glucemia capilar dentro del rango de normalidad.",
    excludes: ["sc_hipoglucemia", "sc_hiperglucemia"],
  },
  {
    id: "sc_hipoglucemia",
    category: "glucemia",
    label: "Hipoglucemia objetivada",
    text: "Se objetiva hipoglucemia en la determinación de glucemia capilar.",
    excludes: ["sc_gluc_normal", "sc_hiperglucemia"],
  },
  {
    id: "sc_hiperglucemia",
    category: "glucemia",
    label: "Hiperglucemia objetivada",
    text: "Se objetiva hiperglucemia en la determinación de glucemia capilar.",
    excludes: ["sc_gluc_normal", "sc_hipoglucemia"],
  },

  // ECG / Monitorización
  {
    id: "sc_monitor",
    category: "ecg",
    label: "Monitorización ECG aplicada",
    text: "Se aplica monitorización electrocardiográfica continua.",
  },
  {
    id: "sc_ecg_sinusal",
    category: "ecg",
    label: "Ritmo sinusal en monitorización",
    text: "En la monitorización se registra ritmo sinusal.",
    excludes: ["sc_ecg_alt"],
  },
  {
    id: "sc_ecg_sin_alt",
    category: "ecg",
    label: "Monitorización sin alteraciones objetivables",
    text: "Monitorización electrocardiográfica sin alteraciones objetivables del ritmo, la conducción ni la repolarización en el momento de la valoración.",
    excludes: [
      "sc_ecg_alt",
      "sc_ecg_taquicardia",
      "sc_ecg_bradicardia",
      "sc_ecg_ritmo_irregular",
      "sc_ecg_extrasist",
      "sc_ecg_pausa",
      "sc_ecg_bloqueo_av",
      "sc_ecg_qrs_ancho",
      "sc_ecg_qt_largo",
      "sc_ecg_brihh",
      "sc_ecg_brdhh",
      "sc_ecg_elevacion_st",
      "sc_ecg_depresion_st",
      "sc_ecg_inversion_t",
    ],
  },
  {
    id: "sc_ecg_alt",
    category: "ecg",
    label: "Monitorización con alteraciones objetivables",
    text: "Se objetivan alteraciones electrocardiográficas en la monitorización.",
    excludes: ["sc_ecg_sinusal", "sc_ecg_sin_alt"],
  },

  // ECG 12 derivaciones / alteraciones objetivadas (bloque condicional)
  {
    id: "sc_ecg_12d",
    category: "ecg",
    label: "ECG de 12 derivaciones realizado",
    text: "Se realiza electrocardiograma de 12 derivaciones.",
  },
  {
    id: "sc_ecg_taquicardia",
    category: "ecg",
    label: "Taquicardia",
    text: "Se registra taquicardia en la monitorización electrocardiográfica.",
  },
  {
    id: "sc_ecg_bradicardia",
    category: "ecg",
    label: "Bradicardia",
    text: "Se registra bradicardia en la monitorización electrocardiográfica.",
  },
  {
    id: "sc_ecg_ritmo_irregular",
    category: "ecg",
    label: "Ritmo irregular",
    text: "Se objetiva ritmo irregular en la monitorización electrocardiográfica.",
  },
  {
    id: "sc_ecg_extrasist",
    category: "ecg",
    label: "Extrasístoles",
    text: "Se objetivan extrasístoles en la monitorización electrocardiográfica.",
  },
  {
    id: "sc_ecg_pausa",
    category: "ecg",
    label: "Pausa en la monitorización",
    text: "Se registra pausa en la monitorización electrocardiográfica.",
  },
  {
    id: "sc_ecg_bloqueo_av",
    category: "ecg",
    label: "Alargamiento del intervalo PR",
    text: "Se registra alargamiento del intervalo PR en el electrocardiograma.",
  },
  {
    id: "sc_ecg_qrs_ancho",
    category: "ecg",
    label: "QRS ancho",
    text: "Se registra QRS ancho en el electrocardiograma.",
  },
  {
    id: "sc_ecg_qt_largo",
    category: "ecg",
    label: "Alargamiento del intervalo QT",
    text: "Se registra alargamiento del intervalo QT en el electrocardiograma.",
  },
  {
    id: "sc_ecg_brihh",
    category: "ecg",
    label: "Bloqueo de rama izquierda",
    text: "Se registra imagen de bloqueo de rama izquierda en el electrocardiograma.",
  },
  {
    id: "sc_ecg_brdhh",
    category: "ecg",
    label: "Bloqueo de rama derecha",
    text: "Se registra imagen de bloqueo de rama derecha en el electrocardiograma.",
  },
  {
    id: "sc_ecg_elevacion_st",
    category: "ecg",
    label: "Elevación del segmento ST",
    text: "Se objetiva elevación del segmento ST en el electrocardiograma.",
  },
  {
    id: "sc_ecg_depresion_st",
    category: "ecg",
    label: "Depresión del segmento ST",
    text: "Se objetiva depresión del segmento ST en el electrocardiograma.",
  },
  {
    id: "sc_ecg_inversion_t",
    category: "ecg",
    label: "Inversión de la onda T",
    text: "Se objetiva inversión de la onda T en el electrocardiograma.",
  },
  {
    id: "sc_ecg_12d_alt",
    category: "ecg",
    label: "Alteraciones en ECG de 12 derivaciones",
    text: "En el electrocardiograma de 12 derivaciones se objetivan alteraciones del ritmo, la conducción o la repolarización.",
  },
  {
    id: "sc_activacion_card",
    category: "ecg",
    label: "Comunicación al destino del hallazgo",
    text: "Se comunica hallazgo electrocardiográfico al equipo receptor en destino.",
  },

  // Intervenciones
  {
    id: "sc_decubito",
    category: "intervencion",
    label: "Colocación en decúbito supino",
    text: "Paciente colocado en decúbito supino.",
  },
  {
    id: "sc_elevacion_mmii",
    category: "intervencion",
    label: "Elevación de miembros inferiores",
    text: "Se elevan los miembros inferiores del paciente.",
  },
  {
    id: "sc_via_iv",
    category: "intervencion",
    label: "Acceso venoso periférico",
    text: "Se canaliza acceso venoso periférico.",
  },
  {
    id: "sc_o2",
    category: "intervencion",
    label: "Oxigenoterapia",
    text: "Se administra oxigenoterapia.",
  },
  {
    id: "sc_glucosa_iv",
    category: "intervencion",
    label: "Suero glucosado IV (hipoglucemia)",
    text: "Se administra suero glucosado intravenoso por hipoglucemia objetivada.",
  },
];

// ─────────────────────────────────────────────────────────────
// PARADA CARDIORRESPIRATORIA (PCR)
// ─────────────────────────────────────────────────────────────

const pcrItems: Item[] = [
  // Situación a la llegada
  {
    id: "pcr_pcr_obj",
    category: "situacion",
    label: "PCR objetivada a la llegada",
    text: "A la llegada del equipo se objetiva al paciente en situación de parada cardiorrespiratoria.",
  },
  {
    id: "pcr_rcp_en_curso",
    category: "situacion",
    label: "RCP básica en curso a la llegada",
    text: "RCP básica en curso por testigos o primer interviniente a la llegada del equipo.",
    excludes: ["pcr_sin_rcp_previa"],
  },
  {
    id: "pcr_dea_previo",
    category: "situacion",
    label: "DESA/DEA aplicado por primer interviniente",
    text: "DESA o DEA aplicado por primer interviniente previo a la llegada del equipo.",
  },
  {
    id: "pcr_sin_rcp_previa",
    category: "situacion",
    label: "Sin RCP previa a la llegada",
    text: "No se había iniciado reanimación básica previa a la llegada del equipo.",
    excludes: ["pcr_rcp_en_curso", "pcr_dea_previo"],
  },
  {
    id: "pcr_hora_aviso",
    category: "situacion",
    label: "Se registra hora de aviso al centro coordinador",
    text: "Se registra hora del aviso al centro coordinador.",
  },
  {
    id: "pcr_hora_llegada",
    category: "situacion",
    label: "Se registra hora de llegada a la escena",
    text: "Se registra hora de llegada del equipo a la escena.",
  },

  // Valoración inicial A-B-C
  {
    id: "pcr_no_consciencia",
    category: "abc",
    label: "Ausencia de respuesta a estímulos",
    text: "Se objetiva ausencia de respuesta ante estímulos verbales y dolorosos.",
  },
  {
    id: "pcr_no_ventilacion",
    category: "abc",
    label: "Ausencia de ventilación espontánea",
    text: "Se objetiva ausencia de ventilación espontánea.",
  },
  {
    id: "pcr_no_pulso",
    category: "abc",
    label: "Ausencia de pulso central",
    text: "Se objetiva ausencia de pulso central.",
  },
  {
    id: "pcr_gasping",
    category: "abc",
    label: "Respiración agónica (gasping)",
    text: "Se objetiva respiración agónica (gasping).",
  },
  {
    id: "pcr_va_permeable",
    category: "abc",
    label: "Vía aérea permeable",
    text: "Vía aérea permeable.",
    excludes: ["pcr_va_obstruida"],
  },
  {
    id: "pcr_va_obstruida",
    category: "abc",
    label: "Vía aérea obstruida",
    text: "Se objetiva obstrucción de la vía aérea.",
    excludes: ["pcr_va_permeable"],
  },

  // Ritmo electrocardiográfico
  {
    id: "pcr_fv",
    category: "ritmo",
    label: "Fibrilación ventricular",
    text: "Se objetiva fibrilación ventricular en la monitorización electrocardiográfica.",
    excludes: ["pcr_aesp", "pcr_asistolia", "pcr_ritmo_no_desf"],
  },
  {
    id: "pcr_tvsp",
    category: "ritmo",
    label: "Taquicardia ventricular sin pulso",
    text: "Se objetiva taquicardia ventricular sin pulso en la monitorización electrocardiográfica.",
    excludes: ["pcr_aesp", "pcr_asistolia", "pcr_ritmo_no_desf"],
  },
  {
    id: "pcr_aesp",
    category: "ritmo",
    label: "Actividad eléctrica sin pulso (AESP)",
    text: "Se objetiva actividad eléctrica sin pulso en la monitorización electrocardiográfica.",
    excludes: ["pcr_fv", "pcr_tvsp", "pcr_asistolia"],
  },
  {
    id: "pcr_asistolia",
    category: "ritmo",
    label: "Asistolia",
    text: "Se objetiva asistolia en la monitorización electrocardiográfica.",
    excludes: ["pcr_fv", "pcr_tvsp", "pcr_aesp"],
  },
  {
    id: "pcr_ritmo_no_desf",
    category: "ritmo",
    label: "Ritmo no desfibrilable",
    text: "Se registra ritmo no desfibrilable en la monitorización.",
    excludes: ["pcr_fv", "pcr_tvsp"],
  },

  // Maniobras de RCP
  {
    id: "pcr_rcp_avanzada",
    category: "maniobras",
    label: "Inicio de RCP avanzada",
    text: "Se inician maniobras de reanimación cardiopulmonar avanzada.",
  },
  {
    id: "pcr_compresiones",
    category: "maniobras",
    label: "Compresiones torácicas externas",
    text: "Se realizan compresiones torácicas externas de calidad según protocolo vigente.",
  },
  {
    id: "pcr_rcp_mecanica",
    category: "maniobras",
    label: "Dispositivo de compresión mecánica",
    text: "Se utiliza dispositivo de compresión mecánica.",
  },
  {
    id: "pcr_ventilacion_bvm",
    category: "maniobras",
    label: "Ventilación con mascarilla y BVM",
    text: "Ventilación mediante mascarilla y bolsa autoinflable.",
    excludes: ["pcr_iot", "pcr_dsg"],
  },
  {
    id: "pcr_iot",
    category: "maniobras",
    label: "Intubación orotraqueal",
    text: "Se realiza intubación orotraqueal.",
    excludes: ["pcr_ventilacion_bvm", "pcr_dsg"],
  },
  {
    id: "pcr_dsg",
    category: "maniobras",
    label: "Dispositivo supraglótico",
    text: "Se coloca dispositivo supraglótico para manejo de la vía aérea.",
    excludes: ["pcr_ventilacion_bvm", "pcr_iot"],
  },
  {
    id: "pcr_via_io",
    category: "maniobras",
    label: "Acceso intraóseo",
    text: "Se canaliza acceso intraóseo.",
  },
  {
    id: "pcr_via_iv",
    category: "maniobras",
    label: "Acceso venoso periférico",
    text: "Se canaliza acceso venoso periférico.",
  },
  {
    id: "pcr_adrenalina",
    category: "maniobras",
    label: "Adrenalina IV",
    text: "Se administra adrenalina intravenosa según protocolo de reanimación avanzada.",
  },
  {
    id: "pcr_amiodarona",
    category: "maniobras",
    label: "Amiodarona IV",
    text: "Se administra amiodarona intravenosa según protocolo de reanimación avanzada.",
  },
  {
    id: "pcr_decision_no_rcp",
    category: "maniobras",
    label: "No se inician maniobras de RCP",
    text: "Ante hallazgos clínicos objetivados o criterios establecidos en protocolo, no se inician maniobras de reanimación cardiopulmonar.",
  },

  // Desfibrilación (bloque condicional)
  {
    id: "pcr_desfib_real",
    category: "desfibrilacion",
    label: "Desfibrilación eléctrica realizada",
    text: "Se procede a desfibrilación eléctrica ante ritmo desfibrilable objetivado.",
  },
  {
    id: "pcr_n_descargas",
    category: "desfibrilacion",
    label: "Se registra número de descargas",
    text: "Se registra el número de descargas eléctricas realizadas.",
  },
  {
    id: "pcr_resp_desfib",
    category: "desfibrilacion",
    label: "Cambio de ritmo tras la descarga",
    text: "Se objetiva cambio de ritmo tras la descarga eléctrica.",
    excludes: ["pcr_sin_resp_desfib"],
  },
  {
    id: "pcr_sin_resp_desfib",
    category: "desfibrilacion",
    label: "Sin cambio de ritmo tras la descarga",
    text: "Sin cambio de ritmo objetivable tras la descarga eléctrica.",
    excludes: ["pcr_resp_desfib"],
  },

  // Tiempos
  {
    id: "pcr_hora_inicio_rcp",
    category: "tiempos",
    label: "Se registra hora de inicio de RCP",
    text: "Se registra hora de inicio de las maniobras de reanimación cardiopulmonar avanzada.",
  },
  {
    id: "pcr_hora_1a_descarga",
    category: "tiempos",
    label: "Se registra hora de la primera descarga",
    text: "Se registra hora de la primera descarga eléctrica.",
  },
  {
    id: "pcr_tiempo_rcp_prev",
    category: "tiempos",
    label: "Tiempo de RCP básica previa por testigos",
    text: "Se registra tiempo estimado de RCP básica por testigos previo a la llegada del equipo.",
  },
  {
    id: "pcr_tiempo_total",
    category: "tiempos",
    label: "Tiempo total de maniobras",
    text: "Se registra tiempo total de maniobras de reanimación.",
  },

  // Respuesta clínica
  {
    id: "pcr_rosc",
    category: "respuesta",
    label: "Recuperación de circulación espontánea (ROSC)",
    text: "Se objetiva recuperación de la circulación espontánea (ROSC).",
    excludes: ["pcr_exitus"],
  },
  {
    id: "pcr_sin_rosc",
    category: "respuesta",
    label: "Sin recuperación de circulación espontánea",
    text: "No se objetiva recuperación de la circulación espontánea tras las maniobras.",
  },
  {
    id: "pcr_exitus",
    category: "respuesta",
    label: "Constatación del exitus",
    text: "Tras maniobras de reanimación prolongadas sin respuesta, se constata el exitus.",
    excludes: ["pcr_rosc"],
  },
  {
    id: "pcr_hora_exitus",
    category: "respuesta",
    label: "Se registra hora de constatación del exitus",
    text: "Se registra hora de constatación del exitus.",
  },

  // Post-ROSC (bloque condicional)
  {
    id: "pcr_cst_post_rosc",
    category: "post_rosc",
    label: "Constantes registradas post-ROSC",
    text: "Se registran constantes hemodinámicas tras la recuperación de la circulación espontánea.",
  },
  {
    id: "pcr_hemo_estable",
    category: "post_rosc",
    label: "Hemodinámica estable post-ROSC",
    text: "Situación hemodinámica estable tras la recuperación de la circulación espontánea.",
    excludes: ["pcr_hemo_inestable"],
  },
  {
    id: "pcr_hemo_inestable",
    category: "post_rosc",
    label: "Inestabilidad hemodinámica post-ROSC",
    text: "Se objetiva inestabilidad hemodinámica tras la recuperación de la circulación espontánea.",
    excludes: ["pcr_hemo_estable"],
  },
  {
    id: "pcr_consciencia_post",
    category: "post_rosc",
    label: "Valoración de conciencia post-ROSC",
    text: "Se valora el nivel de conciencia tras la recuperación de la circulación espontánea.",
  },
  {
    id: "pcr_conv_post",
    category: "post_rosc",
    label: "Movimientos convulsivos post-ROSC",
    text: "Se objetivan movimientos convulsivos tras la recuperación de la circulación espontánea.",
  },
  {
    id: "pcr_manejo_post",
    category: "post_rosc",
    label: "Inicio de manejo post-ROSC",
    text: "Se inicia manejo clínico post-ROSC según protocolo.",
  },
];

// ─────────────────────────────────────────────────────────────
// PARTO / URGENCIA OBSTÉTRICA
// ─────────────────────────────────────────────────────────────

const partoItems: Item[] = [
  // Valoración materna
  {
    id: "pt_termino",
    category: "materna",
    label: "Gestante a término",
    text: "Gestante a término según refiere o según documentación disponible.",
    excludes: ["pt_pretermino"],
  },
  {
    id: "pt_pretermino",
    category: "materna",
    label: "Gestante pretérmino",
    text: "Gestante pretérmino según refiere o según documentación disponible.",
    excludes: ["pt_termino"],
  },
  {
    id: "pt_multigesta",
    category: "materna",
    label: "Multigesta",
    text: "Paciente multigesta.",
    excludes: ["pt_primigesta"],
  },
  {
    id: "pt_primigesta",
    category: "materna",
    label: "Primigesta",
    text: "Paciente primigesta.",
    excludes: ["pt_multigesta"],
  },
  {
    id: "pt_control_prenatal",
    category: "materna",
    label: "Control prenatal durante la gestación",
    text: "La paciente refiere control prenatal durante la gestación.",
    excludes: ["pt_sin_control"],
  },
  {
    id: "pt_sin_control",
    category: "materna",
    label: "Sin control prenatal",
    text: "La paciente refiere ausencia de control prenatal durante la gestación.",
    excludes: ["pt_control_prenatal"],
  },
  {
    id: "pt_dolor_lumbar",
    category: "materna",
    label: "Dolor lumbar irradiado (cólico)",
    text: "La paciente refiere dolor lumbar irradiado de carácter cólico.",
  },
  {
    id: "pt_presion_pelvica",
    category: "materna",
    label: "Sensación de presión pélvica",
    text: "La paciente refiere sensación de presión pélvica.",
  },
  {
    id: "pt_embarazo_multiple",
    category: "materna",
    label: "Gestación múltiple",
    text: "Gestación múltiple según refiere la paciente.",
  },

  // Dinámica uterina
  {
    id: "pt_contr_regulares",
    category: "dinamica",
    label: "Contracciones uterinas regulares",
    text: "Se objetivan contracciones uterinas regulares.",
    excludes: ["pt_sin_contracciones"],
  },
  {
    id: "pt_contr_frecuentes",
    category: "dinamica",
    label: "Contracciones frecuentes e intensas",
    text: "Las contracciones son frecuentes, con intervalos cortos entre ellas.",
  },
  {
    id: "pt_contr_expulsivas",
    category: "dinamica",
    label: "Contracciones con características expulsivas",
    text: "Las contracciones presentan características expulsivas.",
  },
  {
    id: "pt_sin_contracciones",
    category: "dinamica",
    label: "Sin contracciones en la valoración",
    text: "No se objetivan contracciones uterinas en la valoración.",
    excludes: ["pt_contr_regulares", "pt_contr_frecuentes", "pt_contr_expulsivas"],
  },
  {
    id: "pt_deseo_pujo",
    category: "dinamica",
    label: "Deseo intenso e incontrolable de pujar",
    text: "La paciente refiere deseo intenso e incontrolable de pujar.",
  },

  // Estado de la bolsa amniótica
  {
    id: "pt_bolsa_integra",
    category: "bolsa",
    label: "Bolsa amniótica íntegra",
    text: "La bolsa amniótica se encuentra íntegra.",
    excludes: ["pt_rotura_confirmada", "pt_rotura_reciente"],
  },
  {
    id: "pt_rotura_confirmada",
    category: "bolsa",
    label: "Rotura de bolsa confirmada",
    text: "La paciente refiere rotura de la bolsa amniótica.",
    excludes: ["pt_bolsa_integra"],
  },
  {
    id: "pt_rotura_reciente",
    category: "bolsa",
    label: "Rotura de bolsa reciente (en el episodio)",
    text: "La paciente refiere rotura de bolsa reciente, en el contexto del presente episodio.",
    excludes: ["pt_bolsa_integra"],
  },
  {
    id: "pt_liquido_claro",
    category: "bolsa",
    label: "Líquido amniótico claro",
    text: "Se objetiva líquido amniótico de aspecto claro.",
    excludes: ["pt_liquido_meconial"],
  },
  {
    id: "pt_liquido_meconial",
    category: "bolsa",
    label: "Líquido amniótico meconial",
    text: "Se objetiva líquido amniótico de aspecto meconial.",
    excludes: ["pt_liquido_claro"],
  },

  // Sangrado vaginal
  {
    id: "pt_sang_escaso",
    category: "sangrado",
    label: "Sangrado vaginal escaso",
    text: "Se objetiva sangrado vaginal de escasa cuantía.",
    excludes: ["pt_sang_moderado", "pt_sang_abundante", "pt_sin_sangrado"],
  },
  {
    id: "pt_sang_moderado",
    category: "sangrado",
    label: "Sangrado vaginal moderado",
    text: "Se objetiva sangrado vaginal de cuantía moderada.",
    excludes: ["pt_sang_escaso", "pt_sang_abundante", "pt_sin_sangrado"],
  },
  {
    id: "pt_sang_abundante",
    category: "sangrado",
    label: "Sangrado vaginal abundante",
    text: "Se objetiva sangrado vaginal abundante.",
    excludes: ["pt_sang_escaso", "pt_sang_moderado", "pt_sin_sangrado"],
  },
  {
    id: "pt_sin_sangrado",
    category: "sangrado",
    label: "Sin sangrado vaginal",
    text: "No se objetiva sangrado vaginal en la valoración.",
    excludes: ["pt_sang_escaso", "pt_sang_moderado", "pt_sang_abundante"],
  },

  // Presentación y coronación
  {
    id: "pt_cefalica",
    category: "presentacion",
    label: "Presentación cefálica",
    text: "Se objetiva presentación cefálica en la exploración.",
    excludes: ["pt_podalica"],
  },
  {
    id: "pt_coronacion",
    category: "presentacion",
    label: "Coronación fetal",
    text: "Se objetiva coronación fetal.",
  },
  {
    id: "pt_expulsivo_inmin",
    category: "presentacion",
    label: "Expulsivo inminente",
    text: "Se valora expulsivo inminente.",
  },
  {
    id: "pt_podalica",
    category: "presentacion",
    label: "Presentación podálica",
    text: "Se objetiva presentación podálica.",
    excludes: ["pt_cefalica"],
  },
  {
    id: "pt_procidencia",
    category: "presentacion",
    label: "Procidencia de cordón umbilical",
    text: "Se objetiva procidencia de cordón umbilical.",
  },

  // Expulsivo (bloque condicional)
  {
    id: "pt_nac_cabeza",
    category: "expulsivo",
    label: "Nacimiento de la cabeza fetal",
    text: "Se asiste al nacimiento de la cabeza fetal.",
  },
  {
    id: "pt_ritgen",
    category: "expulsivo",
    label: "Maniobra de Ritgen modificada",
    text: "Se realiza maniobra de Ritgen modificada para el control del expulsivo.",
  },
  {
    id: "pt_circular_cordon",
    category: "expulsivo",
    label: "Circular de cordón umbilical",
    text: "Se objetiva circular de cordón umbilical en el cuello fetal.",
  },
  {
    id: "pt_reduc_circular",
    category: "expulsivo",
    label: "Reducción de circular de cordón",
    text: "Se realiza reducción de la circular de cordón umbilical.",
  },
  {
    id: "pt_nac_completo",
    category: "expulsivo",
    label: "Nacimiento completo del neonato",
    text: "Se asiste al nacimiento completo del neonato.",
  },
  {
    id: "pt_hora_nacimiento",
    category: "expulsivo",
    label: "Se registra hora del nacimiento",
    text: "Se registra hora del nacimiento.",
  },
  {
    id: "pt_episiotomia",
    category: "expulsivo",
    label: "Episiotomía",
    text: "Se realiza episiotomía según criterio clínico.",
  },

  // Valoración del recién nacido (bloque condicional)
  {
    id: "pt_rn_llora",
    category: "rn",
    label: "Llanto espontáneo al nacimiento",
    text: "El neonato emite llanto espontáneo al nacimiento.",
    excludes: ["pt_rn_no_llora"],
  },
  {
    id: "pt_rn_no_llora",
    category: "rn",
    label: "Sin llanto espontáneo",
    text: "El neonato no emite llanto espontáneo al nacimiento.",
    excludes: ["pt_rn_llora"],
  },
  {
    id: "pt_rn_tono_bueno",
    category: "rn",
    label: "Buen tono muscular",
    text: "El neonato presenta buen tono muscular.",
    excludes: ["pt_rn_tono_dismn"],
  },
  {
    id: "pt_rn_tono_dismn",
    category: "rn",
    label: "Tono muscular disminuido",
    text: "El neonato presenta tono muscular disminuido.",
    excludes: ["pt_rn_tono_bueno"],
  },
  {
    id: "pt_rn_rosado",
    category: "rn",
    label: "Coloración rosada",
    text: "El neonato presenta coloración rosada.",
    excludes: ["pt_rn_cianosis_cent"],
  },
  {
    id: "pt_rn_cianosis_cent",
    category: "rn",
    label: "Cianosis central en el neonato",
    text: "Se objetiva cianosis central en el neonato.",
    excludes: ["pt_rn_rosado"],
  },
  {
    id: "pt_rn_cianosis_perf",
    category: "rn",
    label: "Cianosis periférica en el neonato",
    text: "Se objetiva cianosis periférica en el neonato.",
  },
  {
    id: "pt_rn_apgar_normal",
    category: "rn",
    label: "Apgar normal al minuto y a los 5 min",
    text: "Puntuación de Apgar valorada dentro de parámetros de normalidad al minuto y a los 5 minutos.",
    excludes: ["pt_rn_apgar_bajo"],
  },
  {
    id: "pt_rn_apgar_bajo",
    category: "rn",
    label: "Apgar bajo, requiere estabilización",
    text: "Se registra puntuación de Apgar baja, requiriendo medidas de estabilización neonatal.",
    excludes: ["pt_rn_apgar_normal"],
  },
  {
    id: "pt_corte_cordon",
    category: "rn",
    label: "Sección y clampaje de cordón",
    text: "Se realiza sección y clampaje del cordón umbilical.",
  },
  {
    id: "pt_ligadura_dem",
    category: "rn",
    label: "Ligadura demorada de cordón",
    text: "Se realiza ligadura demorada del cordón umbilical.",
    excludes: ["pt_corte_cordon"],
  },
  {
    id: "pt_piel_piel",
    category: "rn",
    label: "Contacto piel con piel madre-neonato",
    text: "Se facilita el contacto piel con piel entre madre y neonato.",
    excludes: ["pt_rn_reanimacion"],
  },
  {
    id: "pt_rn_reanimacion",
    category: "rn",
    label: "Maniobras de reanimación neonatal",
    text: "Se inician maniobras de reanimación neonatal básica.",
    excludes: ["pt_piel_piel"],
  },
  {
    id: "pt_rn_termico",
    category: "rn",
    label: "Mantenimiento térmico del neonato",
    text: "Se realizan medidas de mantenimiento térmico del neonato.",
  },

  // Alumbramiento
  {
    id: "pt_alumbramiento_esp",
    category: "alumbramiento",
    label: "Alumbramiento espontáneo",
    text: "Se produce el alumbramiento de forma espontánea.",
    excludes: ["pt_alumbramiento_pend"],
  },
  {
    id: "pt_alumbramiento_pend",
    category: "alumbramiento",
    label: "Alumbramiento pendiente",
    text: "Alumbramiento pendiente en el momento del traslado.",
    excludes: ["pt_alumbramiento_esp"],
  },
  {
    id: "pt_placenta_completa",
    category: "alumbramiento",
    label: "Placenta aparentemente completa",
    text: "Se objetiva placenta aparentemente completa al alumbramiento.",
    excludes: ["pt_placenta_incomp"],
  },
  {
    id: "pt_placenta_incomp",
    category: "alumbramiento",
    label: "Sospecha de retención placentaria",
    text: "Se sospecha posible retención de restos placentarios.",
    excludes: ["pt_placenta_completa"],
  },
  {
    id: "pt_oxitocina",
    category: "alumbramiento",
    label: "Oxitocina posparto",
    text: "Se administra oxitocina posparto según protocolo.",
  },

  // Vigilancia puerperal
  {
    id: "pt_utero_retraido",
    category: "puerperio",
    label: "Útero bien retraído",
    text: "Se palpa útero bien retraído en el puerperio inmediato.",
    excludes: ["pt_utero_atonico"],
  },
  {
    id: "pt_globo_seguridad",
    category: "puerperio",
    label: "Globo de seguridad uterino",
    text: "Se objetiva globo de seguridad uterino a la palpación.",
  },
  {
    id: "pt_utero_atonico",
    category: "puerperio",
    label: "Útero atónico",
    text: "Se objetiva útero atónico a la palpación.",
    excludes: ["pt_utero_retraido"],
  },
  {
    id: "pt_masaje_uterino",
    category: "puerperio",
    label: "Masaje uterino bimanual",
    text: "Se realiza masaje uterino bimanual.",
  },
  {
    id: "pt_cst_maternas_est",
    category: "puerperio",
    label: "Constantes maternas estables (puerperio)",
    text: "Constantes maternas dentro de parámetros de estabilidad en el puerperio inmediato.",
    excludes: ["pt_cst_maternas_comp"],
  },
  {
    id: "pt_cst_maternas_comp",
    category: "puerperio",
    label: "Constantes maternas comprometidas",
    text: "Se objetivan constantes maternas comprometidas en el puerperio inmediato.",
    excludes: ["pt_cst_maternas_est"],
  },
  {
    id: "pt_sang_posparto",
    category: "puerperio",
    label: "Hemorragia posparto significativa",
    text: "Se objetiva hemorragia posparto de cuantía significativa.",
  },
  {
    id: "pt_via_posparto",
    category: "puerperio",
    label: "Acceso venoso periférico (posparto)",
    text: "Se canaliza acceso venoso periférico para manejo posparto.",
  },

  // Hemorragia posparto (bloque condicional)
  {
    id: "pt_uterotonicos",
    category: "hemorragia",
    label: "Uterotónicos adicionales",
    text: "Se administran uterotónicos adicionales según protocolo de manejo de hemorragia.",
  },
  {
    id: "pt_sfv_posparto",
    category: "hemorragia",
    label: "Sueroterapia IV (hemorragia)",
    text: "Se administra sueroterapia intravenosa en el contexto del manejo de la hemorragia.",
  },
  {
    id: "pt_activacion_hem",
    category: "hemorragia",
    label: "Activación de protocolo de hemorragia",
    text: "Se activa protocolo de alerta por hemorragia obstétrica en el centro receptor.",
  },
];

// ─────────────────────────────────────────────────────────────
// ESCALAS Y CÓDIGOS — Reutilizables en múltiples motivos
// ─────────────────────────────────────────────────────────────

const escalaItems: Item[] = [
  // Activación de código en destino
  {
    id: "cod_ictus",
    category: "codigos",
    label: "Activación código ictus",
    text: "Se activa código ictus en el centro receptor.",
  },
  {
    id: "cod_infarto",
    category: "codigos",
    label: "Activación código infarto",
    text: "Se activa código infarto en el centro receptor.",
  },
  {
    id: "cod_sepsis",
    category: "codigos",
    label: "Activación código sepsis",
    text: "Se activa código sepsis en el centro receptor.",
  },
  {
    id: "cod_trauma",
    category: "codigos",
    label: "Activación código trauma",
    text: "Se activa código trauma en el centro receptor.",
  },
  {
    id: "cod_crisis",
    category: "codigos",
    label: "Activación código crisis",
    text: "Se activa código crisis en el centro receptor.",
  },
  {
    id: "cod_donante",
    category: "codigos",
    label: "Activación código donante",
    text: "Se activa código donante en el centro receptor.",
  },
  {
    id: "cod_0",
    category: "codigos",
    label: "Activación código 0",
    text: "Se activa código 0 de emergencia en el centro coordinador.",
  },

  // qSOFA
  {
    id: "qsf_positivo",
    category: "qsofa",
    label: "qSOFA positivo (+)",
    text: "Escala qSOFA positiva (+) en la valoración clínica.",
    excludes: ["qsf_negativo"],
  },
  {
    id: "qsf_negativo",
    category: "qsofa",
    label: "qSOFA negativo (−)",
    text: "Escala qSOFA negativa (−) en la valoración clínica.",
    excludes: ["qsf_positivo"],
  },

  // Madrid Direct (Escala de activación de ictus)
  {
    id: "mad_mayor2",
    category: "madrid",
    label: "Madrid Direct ≥ 2 → hospital con TM",
    text: "Puntuación en escala Madrid Direct igual o superior a 2, compatible con traslado a hospital para tratamiento mediante trombectomía mecánica.",
    excludes: ["mad_menor2"],
  },
  {
    id: "mad_menor2",
    category: "madrid",
    label: "Madrid Direct < 2 → unidad de ictus más cercana",
    text: "Puntuación en escala Madrid Direct inferior a 2, compatible con traslado a la unidad de ictus más cercana.",
    excludes: ["mad_mayor2"],
  },
];

// ─────────────────────────────────────────────────────────────
// ICTUS
// ─────────────────────────────────────────────────────────────

const ictusItems: Item[] = [
  // Tiempo de inicio y último visto bien
  {
    id: "ic_inicio_conocido",
    category: "tiempo",
    label: "Hora de inicio de síntomas conocida",
    text: "La hora de inicio de los síntomas neurológicos es conocida.",
    excludes: ["ic_inicio_despertar", "ic_inicio_desconocido"],
  },
  {
    id: "ic_inicio_despertar",
    category: "tiempo",
    label: "Inicio al despertar (wake-up stroke)",
    text: "Los síntomas neurológicos fueron objetivados al despertar.",
    excludes: ["ic_inicio_conocido", "ic_inicio_desconocido"],
  },
  {
    id: "ic_inicio_desconocido",
    category: "tiempo",
    label: "Hora de inicio desconocida",
    text: "La hora de inicio de los síntomas neurológicos es desconocida.",
    excludes: ["ic_inicio_conocido", "ic_inicio_despertar"],
  },
  {
    id: "ic_ulp_conocido",
    category: "tiempo",
    label: "Último visto bien (UVB) conocido",
    text: "Se registra el momento del último visto bien (UVB) del paciente.",
    excludes: ["ic_ulp_desconocido"],
  },
  {
    id: "ic_ulp_desconocido",
    category: "tiempo",
    label: "Último visto bien (UVB) desconocido",
    text: "El momento del último visto bien (UVB) es desconocido.",
    excludes: ["ic_ulp_conocido"],
  },
  {
    id: "ic_t_menos_4_5h",
    category: "tiempo",
    label: "Tiempo desde inicio < 4,5 h",
    text: "El tiempo transcurrido desde el inicio de los síntomas es inferior a 4,5 horas.",
    excludes: ["ic_t_4_5_9h", "ic_t_mas_9h", "ic_t_desconocido"],
  },
  {
    id: "ic_t_4_5_9h",
    category: "tiempo",
    label: "Tiempo desde inicio 4,5 – 9 h",
    text: "El tiempo transcurrido desde el inicio de los síntomas es de entre 4,5 y 9 horas.",
    excludes: ["ic_t_menos_4_5h", "ic_t_mas_9h", "ic_t_desconocido"],
  },
  {
    id: "ic_t_mas_9h",
    category: "tiempo",
    label: "Tiempo desde inicio > 9 h",
    text: "El tiempo transcurrido desde el inicio de los síntomas es superior a 9 horas.",
    excludes: ["ic_t_menos_4_5h", "ic_t_4_5_9h", "ic_t_desconocido"],
  },
  {
    id: "ic_t_desconocido",
    category: "tiempo",
    label: "Tiempo desde inicio desconocido",
    text: "El tiempo transcurrido desde el inicio de los síntomas es desconocido.",
    excludes: ["ic_t_menos_4_5h", "ic_t_4_5_9h", "ic_t_mas_9h"],
  },

  // Focalidad neurológica
  {
    id: "ic_paresia_facial_d",
    category: "focalidad",
    label: "Paresia facial derecha",
    text: "Se objetiva paresia facial derecha en la exploración.",
  },
  {
    id: "ic_paresia_facial_i",
    category: "focalidad",
    label: "Paresia facial izquierda",
    text: "Se objetiva paresia facial izquierda en la exploración.",
  },
  {
    id: "ic_hemiplejia_d",
    category: "focalidad",
    label: "Hemiplejia / hemiparesia derecha",
    text: "Se objetiva hemiplejia o hemiparesia derecha en la exploración.",
  },
  {
    id: "ic_hemiplejia_i",
    category: "focalidad",
    label: "Hemiplejia / hemiparesia izquierda",
    text: "Se objetiva hemiplejia o hemiparesia izquierda en la exploración.",
  },
  {
    id: "ic_disartria",
    category: "focalidad",
    label: "Disartria",
    text: "Se objetiva disartria en la exploración.",
  },
  {
    id: "ic_afasia",
    category: "focalidad",
    label: "Afasia",
    text: "Se objetiva afasia en la exploración.",
  },
  {
    id: "ic_hemianopsia",
    category: "focalidad",
    label: "Hemianopsia referida",
    text: "El paciente refiere pérdida de campo visual hemilateral.",
  },
  {
    id: "ic_diplopia",
    category: "focalidad",
    label: "Diplopía referida",
    text: "El paciente refiere visión doble.",
  },
  {
    id: "ic_ataxia",
    category: "focalidad",
    label: "Ataxia / incoordinación",
    text: "Se objetiva ataxia o incoordinación.",
  },
  {
    id: "ic_vertigo_brusco",
    category: "focalidad",
    label: "Vértigo de inicio brusco",
    text: "El paciente refiere vértigo de inicio brusco.",
  },
  {
    id: "ic_cefalea_brusca",
    category: "focalidad",
    label: "Cefalea de inicio brusco e intenso",
    text: "El paciente refiere cefalea de inicio brusco e intensidad máxima.",
  },

  // Nivel de conciencia
  {
    id: "ic_consciencia_conservada",
    category: "conciencia",
    label: "Nivel de conciencia conservado",
    text: "El nivel de conciencia está conservado en la valoración.",
    excludes: ["ic_consciencia_disminuida"],
  },
  {
    id: "ic_consciencia_disminuida",
    category: "conciencia",
    label: "Nivel de conciencia disminuido",
    text: "Se objetiva disminución del nivel de conciencia en la valoración.",
    excludes: ["ic_consciencia_conservada"],
  },
  {
    id: "ic_gcs_disminuido",
    category: "conciencia",
    label: "Glasgow disminuido",
    text: "Se registra puntuación de Glasgow disminuida.",
  },

  // Antecedentes relevantes
  {
    id: "ic_anticoagulantes",
    category: "antecedentes",
    label: "Tratamiento anticoagulante conocido",
    text: "El paciente refiere tratamiento anticoagulante de base.",
    excludes: ["ic_no_anticoagulantes"],
  },
  {
    id: "ic_antiagregantes",
    category: "antecedentes",
    label: "Tratamiento antiagregante conocido",
    text: "El paciente refiere tratamiento antiagregante de base.",
  },
  {
    id: "ic_no_anticoagulantes",
    category: "antecedentes",
    label: "Sin anticoagulantes conocidos",
    text: "El paciente niega tratamiento anticoagulante de base.",
    excludes: ["ic_anticoagulantes"],
  },
  {
    id: "ic_hta_conocida",
    category: "antecedentes",
    label: "HTA conocida",
    text: "El paciente refiere hipertensión arterial de base.",
  },
  {
    id: "ic_pas_elevada",
    category: "antecedentes",
    label: "PAS elevada (> 185 mmHg)",
    text: "Se objetiva tensión arterial sistólica superior a 185 mmHg.",
    excludes: ["ic_pas_normal"],
  },
  {
    id: "ic_pas_normal",
    category: "antecedentes",
    label: "PAS en rango normal",
    text: "La tensión arterial sistólica se encuentra en rango normal.",
    excludes: ["ic_pas_elevada"],
  },

  // Intervenciones
  {
    id: "ic_monitor",
    category: "intervencion",
    label: "Monitor cardiaco aplicado",
    text: "Monitor cardiaco aplicado.",
  },
  {
    id: "ic_ecg",
    category: "intervencion",
    label: "ECG 12 derivaciones realizado",
    text: "ECG de 12 derivaciones realizado.",
  },
  {
    id: "ic_glucemia",
    category: "intervencion",
    label: "Glucemia capilar determinada",
    text: "Glucemia capilar determinada.",
  },
  {
    id: "ic_via_periferica",
    category: "intervencion",
    label: "Vía periférica canalizada",
    text: "Se canaliza vía periférica.",
  },
  {
    id: "ic_sfv",
    category: "intervencion",
    label: "Suero fisiológico en perfusión",
    text: "Suero fisiológico en perfusión iniciado.",
  },
  {
    id: "ic_posicion",
    category: "intervencion",
    label: "Paciente en posición semiincorporada",
    text: "Paciente colocado en posición semiincorporada.",
  },
];

// ─────────────────────────────────────────────────────────────
// PSIQUIÁTRICO / AGRESIVO
// ─────────────────────────────────────────────────────────────

const psiquiatricoItems: Item[] = [
  // Conducta objetivada
  {
    id: "psi_agitacion_leve",
    category: "conducta",
    label: "Agitación psicomotriz leve",
    text: "Se objetiva agitación psicomotriz de carácter leve.",
    excludes: ["psi_agitacion_moderada", "psi_agitacion_severa"],
  },
  {
    id: "psi_agitacion_moderada",
    category: "conducta",
    label: "Agitación psicomotriz moderada",
    text: "Se objetiva agitación psicomotriz de carácter moderado.",
    excludes: ["psi_agitacion_leve", "psi_agitacion_severa"],
  },
  {
    id: "psi_agitacion_severa",
    category: "conducta",
    label: "Agitación psicomotriz severa",
    text: "Se objetiva agitación psicomotriz severa, impidiendo la valoración sistematizada.",
    excludes: ["psi_agitacion_leve", "psi_agitacion_moderada"],
  },
  {
    id: "psi_heteroagresivo",
    category: "conducta",
    label: "Conducta heteroagresiva objetivada",
    text: "Se objetiva conducta heteroagresiva hacia personas en el entorno.",
  },
  {
    id: "psi_autoagresivo",
    category: "conducta",
    label: "Conducta autoagresiva objetivada",
    text: "Se objetiva conducta autoagresiva.",
  },
  {
    id: "psi_ideacion_suicida",
    category: "conducta",
    label: "Refiere ideación suicida",
    text: "El paciente refiere ideación suicida en la valoración.",
  },
  {
    id: "psi_alucinaciones",
    category: "conducta",
    label: "Refiere alucinaciones",
    text: "El paciente refiere alucinaciones en la valoración.",
  },
  {
    id: "psi_delirios",
    category: "conducta",
    label: "Pensamiento delirante objetivado",
    text: "Se objetiva pensamiento de contenido delirante en la valoración.",
  },
  {
    id: "psi_desorientacion",
    category: "conducta",
    label: "Desorientación objetivada",
    text: "Se objetiva desorientación en tiempo, espacio o persona.",
  },

  // Antecedentes y circunstancias
  {
    id: "psi_antec_psiquiatrico",
    category: "antecedentes",
    label: "Antecedentes psiquiátricos conocidos",
    text: "El paciente o los acompañantes refieren antecedentes psiquiátricos.",
    excludes: ["psi_sin_antec"],
  },
  {
    id: "psi_sin_antec",
    category: "antecedentes",
    label: "Sin antecedentes psiquiátricos conocidos",
    text: "Sin antecedentes psiquiátricos conocidos.",
    excludes: ["psi_antec_psiquiatrico"],
  },
  {
    id: "psi_tto_psiquiatrico",
    category: "antecedentes",
    label: "En tratamiento psiquiátrico",
    text: "El paciente refiere estar en tratamiento psiquiátrico.",
  },
  {
    id: "psi_abandono_tto",
    category: "antecedentes",
    label: "Abandono de tratamiento referido",
    text: "El paciente o acompañantes refieren abandono del tratamiento psiquiátrico.",
  },
  {
    id: "psi_alcohol",
    category: "antecedentes",
    label: "Ingesta de alcohol asociada",
    text: "Se objetiva o se refiere ingesta de alcohol asociada al episodio.",
  },
  {
    id: "psi_toxicos",
    category: "antecedentes",
    label: "Consumo de tóxicos asociado",
    text: "Se objetiva o se refiere consumo de tóxicos asociado al episodio.",
  },

  // Contención y manejo
  {
    id: "psi_escena_ffccse",
    category: "contencion",
    label: "Escena controlada por FFCCSE",
    text: "La escena se encuentra controlada por Fuerzas y Cuerpos de Seguridad del Estado previo a la intervención.",
  },
  {
    id: "psi_contencion_verbal",
    category: "contencion",
    label: "Contención verbal efectiva",
    text: "La contención verbal resulta efectiva para la interacción clínica.",
    excludes: ["psi_contencion_fisica"],
  },
  {
    id: "psi_contencion_fisica",
    category: "contencion",
    label: "Contención física necesaria",
    text: "Se precisa contención física por conducta de riesgo para el paciente y el equipo.",
    excludes: ["psi_contencion_verbal"],
  },
  {
    id: "psi_contencion_farm",
    category: "contencion",
    label: "Contención farmacológica realizada",
    text: "Se realiza contención farmacológica ante agitación psicomotriz severa.",
  },
  {
    id: "psi_midazolam",
    category: "farmacos",
    label: "Midazolam administrado",
    text: "Se administra midazolam.",
  },
  {
    id: "psi_haloperidol",
    category: "farmacos",
    label: "Haloperidol administrado",
    text: "Se administra haloperidol.",
  },
  {
    id: "psi_diazepam",
    category: "farmacos",
    label: "Diazepam administrado",
    text: "Se administra diazepam.",
  },
  {
    id: "psi_via_iv",
    category: "intervencion",
    label: "Vía periférica canalizada",
    text: "Se canaliza vía periférica.",
  },
  {
    id: "psi_policial_traslado",
    category: "intervencion",
    label: "Traslado con acompañamiento policial",
    text: "Traslado realizado con acompañamiento de Fuerzas y Cuerpos de Seguridad del Estado.",
  },
];

// ─────────────────────────────────────────────────────────────
// INTENTO AUTOLÍTICO
// ─────────────────────────────────────────────────────────────

const autoliticoItems: Item[] = [
  // Mecanismo del intento
  {
    id: "al_mec_medicamentos",
    category: "mecanismo",
    label: "Ingesta de medicamentos",
    text: "El mecanismo del intento es la ingesta de medicamentos.",
  },
  {
    id: "al_mec_alcohol",
    category: "mecanismo",
    label: "Ingesta de alcohol",
    text: "El mecanismo del intento incluye la ingesta de alcohol.",
  },
  {
    id: "al_mec_toxicos",
    category: "mecanismo",
    label: "Ingesta de tóxicos / sustancias",
    text: "El mecanismo del intento es la ingesta de tóxicos o sustancias.",
  },
  {
    id: "al_mec_corte",
    category: "mecanismo",
    label: "Heridas por objeto cortante",
    text: "El mecanismo del intento es la autolesión mediante objeto cortante.",
  },
  {
    id: "al_mec_precipitacion",
    category: "mecanismo",
    label: "Precipitación desde altura",
    text: "El mecanismo del intento es la precipitación desde altura.",
  },
  {
    id: "al_mec_ahorcamiento",
    category: "mecanismo",
    label: "Ahorcamiento / constricción",
    text: "El mecanismo del intento es el ahorcamiento o constricción cervical.",
  },
  {
    id: "al_mec_quemaduras",
    category: "mecanismo",
    label: "Quemaduras autoprovocadas",
    text: "El mecanismo del intento incluye quemaduras autoprovocadas.",
  },
  {
    id: "al_mec_atropello",
    category: "mecanismo",
    label: "Arrojarse al tráfico",
    text: "El mecanismo del intento es arrojarse al tráfico rodado.",
  },
  {
    id: "al_mec_ahogamiento",
    category: "mecanismo",
    label: "Ahogamiento / sumersión",
    text: "El mecanismo del intento es el ahogamiento o sumersión.",
  },

  // Circunstancias
  {
    id: "al_tiempo_conocido",
    category: "circunstancias",
    label: "Tiempo desde el acto conocido",
    text: "El tiempo transcurrido desde el acto es conocido.",
    excludes: ["al_tiempo_desconocido"],
  },
  {
    id: "al_tiempo_desconocido",
    category: "circunstancias",
    label: "Tiempo desde el acto desconocido",
    text: "El tiempo transcurrido desde el acto es desconocido.",
    excludes: ["al_tiempo_conocido"],
  },
  {
    id: "al_solo",
    category: "circunstancias",
    label: "Paciente solo en la escena",
    text: "Paciente se encontraba solo en la escena sin testigos.",
  },
  {
    id: "al_escena_segura",
    category: "circunstancias",
    label: "Escena segura para la intervención",
    text: "La escena se encuentra segura para la intervención del equipo.",
  },
  {
    id: "al_escena_ffccse",
    category: "circunstancias",
    label: "Escena controlada por FFCCSE",
    text: "La escena se encuentra controlada por Fuerzas y Cuerpos de Seguridad del Estado.",
  },

  // Nivel de conciencia
  {
    id: "al_consciencia_conservada",
    category: "conciencia",
    label: "Nivel de conciencia conservado",
    text: "El nivel de conciencia está conservado en la valoración.",
    excludes: ["al_consciencia_disminuida"],
  },
  {
    id: "al_consciencia_disminuida",
    category: "conciencia",
    label: "Nivel de conciencia disminuido",
    text: "Se objetiva disminución del nivel de conciencia en la valoración.",
    excludes: ["al_consciencia_conservada"],
  },
  {
    id: "al_gcs_disminuido",
    category: "conciencia",
    label: "Glasgow disminuido",
    text: "Se registra puntuación de Glasgow disminuida.",
  },

  // Lesiones objetivadas
  {
    id: "al_heridas_activas",
    category: "lesiones",
    label: "Heridas activas con sangrado",
    text: "Se objetivan heridas con sangrado activo en la exploración.",
    excludes: ["al_sin_lesiones"],
  },
  {
    id: "al_heridas_contenidas",
    category: "lesiones",
    label: "Sangrado contenido con compresión",
    text: "El sangrado queda contenido mediante compresión directa.",
  },
  {
    id: "al_sin_lesiones",
    category: "lesiones",
    label: "Sin lesiones externas objetivadas",
    text: "No se objetivan lesiones externas en la exploración.",
    excludes: ["al_heridas_activas"],
  },
  {
    id: "al_riesgo_vital",
    category: "lesiones",
    label: "Riesgo vital inmediato objetivado",
    text: "Se objetiva riesgo vital inmediato en la valoración clínica.",
    excludes: ["al_sin_riesgo_vital"],
  },
  {
    id: "al_sin_riesgo_vital",
    category: "lesiones",
    label: "Sin riesgo vital inmediato",
    text: "No se objetiva riesgo vital inmediato en la valoración clínica.",
    excludes: ["al_riesgo_vital"],
  },

  // Intervenciones
  {
    id: "al_carbon_activado",
    category: "intervencion",
    label: "Carbón activado administrado",
    text: "Se administra carbón activado según protocolo de intoxicación.",
  },
  {
    id: "al_flumazenil",
    category: "intervencion",
    label: "Flumazenil administrado",
    text: "Se administra flumazenil como antídoto.",
  },
  {
    id: "al_naloxona",
    category: "intervencion",
    label: "Naloxona administrada",
    text: "Se administra naloxona como antídoto opiáceo.",
  },
  {
    id: "al_via_iv",
    category: "intervencion",
    label: "Vía periférica canalizada",
    text: "Se canaliza vía periférica.",
  },
  {
    id: "al_o2",
    category: "intervencion",
    label: "Oxígeno suplementario administrado",
    text: "Oxígeno suplementario administrado.",
  },
  {
    id: "al_sfv",
    category: "intervencion",
    label: "Suero fisiológico en perfusión",
    text: "Suero fisiológico en perfusión iniciado.",
  },
  {
    id: "al_compresion_herida",
    category: "intervencion",
    label: "Compresión directa en herida",
    text: "Se aplica compresión directa sobre la herida para control del sangrado.",
  },
];

// ─────────────────────────────────────────────────────────────
// TRAUMA
// ─────────────────────────────────────────────────────────────

const traumaItems: Item[] = [
  // Mecanismo lesional
  {
    id: "tr_mec_trafico",
    category: "mecanismo",
    label: "Accidente de tráfico",
    text: "Mecanismo lesional: accidente de tráfico.",
  },
  { id: "tr_mec_caida", category: "mecanismo", label: "Caída", text: "Mecanismo lesional: caída." },
  {
    id: "tr_mec_precipitacion",
    category: "mecanismo",
    label: "Precipitación desde gran altura",
    text: "Mecanismo lesional: precipitación desde gran altura.",
  },
  {
    id: "tr_mec_agresion",
    category: "mecanismo",
    label: "Agresión física",
    text: "Mecanismo lesional: agresión física.",
  },
  {
    id: "tr_mec_aplastamiento",
    category: "mecanismo",
    label: "Aplastamiento",
    text: "Mecanismo lesional: aplastamiento.",
  },
  {
    id: "tr_mec_arma_blanca",
    category: "mecanismo",
    label: "Herida por arma blanca",
    text: "Mecanismo lesional: herida por arma blanca.",
  },
  {
    id: "tr_mec_arma_fuego",
    category: "mecanismo",
    label: "Herida por arma de fuego",
    text: "Mecanismo lesional: herida por arma de fuego.",
  },
  {
    id: "tr_mec_explosion",
    category: "mecanismo",
    label: "Explosión / onda expansiva",
    text: "Mecanismo lesional: explosión u onda expansiva.",
  },
  {
    id: "tr_mec_quemadura",
    category: "mecanismo",
    label: "Quemaduras",
    text: "Mecanismo lesional: quemaduras.",
  },
  {
    id: "tr_mec_atropello",
    category: "mecanismo",
    label: "Atropello",
    text: "Mecanismo lesional: atropello.",
  },
  {
    id: "tr_mec_sport",
    category: "mecanismo",
    label: "Accidente deportivo",
    text: "Mecanismo lesional: accidente deportivo.",
  },

  // X — Control hemorragia exanguinante
  {
    id: "tr_x_hemorragia",
    category: "xabcde",
    label: "Hemorragia exanguinante objetivada",
    text: "Se objetiva hemorragia exanguinante en la valoración inicial.",
    excludes: ["tr_x_sin_hemorragia"],
  },
  {
    id: "tr_x_compresion",
    category: "xabcde",
    label: "Compresión hemostática aplicada",
    text: "Se aplica compresión hemostática directa para control de la hemorragia.",
  },
  {
    id: "tr_x_tourniquet",
    category: "xabcde",
    label: "Torniquete aplicado",
    text: "Se aplica torniquete para control de la hemorragia exanguinante.",
  },
  {
    id: "tr_x_packing",
    category: "xabcde",
    label: "Empaquetado hemostático realizado",
    text: "Se realiza empaquetado hemostático de la herida.",
  },
  {
    id: "tr_x_sin_hemorragia",
    category: "xabcde",
    label: "Sin hemorragia exanguinante",
    text: "No se objetiva hemorragia exanguinante en la valoración inicial.",
    excludes: ["tr_x_hemorragia"],
  },

  // A — Vía aérea
  {
    id: "tr_a_permeable",
    category: "xabcde",
    label: "Vía aérea permeable",
    text: "Vía aérea permeable a la llegada.",
    excludes: ["tr_a_comprometida"],
  },
  {
    id: "tr_a_comprometida",
    category: "xabcde",
    label: "Vía aérea comprometida",
    text: "Se objetiva compromiso de la vía aérea.",
    excludes: ["tr_a_permeable"],
  },
  {
    id: "tr_a_guedel",
    category: "xabcde",
    label: "Cánula orofaríngea (Guedel) colocada",
    text: "Se coloca cánula orofaríngea (Guedel) para mantenimiento de la vía aérea.",
  },
  {
    id: "tr_a_iot",
    category: "xabcde",
    label: "Intubación orotraqueal realizada",
    text: "Se realiza intubación orotraqueal ante compromiso grave de la vía aérea.",
  },
  {
    id: "tr_a_inm_cervical",
    category: "xabcde",
    label: "Inmovilización cervical con collarín",
    text: "Se aplica collarín cervical para inmovilización de la columna cervical.",
  },

  // B — Ventilación
  {
    id: "tr_b_mv_conservado",
    category: "xabcde",
    label: "Murmullo vesicular conservado bilateral",
    text: "Murmullo vesicular conservado simétricamente en ambos campos.",
    excludes: ["tr_b_mv_dismn", "tr_b_silencio"],
  },
  {
    id: "tr_b_mv_dismn",
    category: "xabcde",
    label: "Murmullo vesicular disminuido",
    text: "Se objetiva murmullo vesicular disminuido a la auscultación.",
    excludes: ["tr_b_mv_conservado", "tr_b_silencio"],
  },
  {
    id: "tr_b_silencio",
    category: "xabcde",
    label: "Silencio auscultatorio",
    text: "Se objetiva silencio auscultatorio.",
    excludes: ["tr_b_mv_conservado", "tr_b_mv_dismn"],
  },
  {
    id: "tr_b_trabajo_resp",
    category: "xabcde",
    label: "Trabajo respiratorio aumentado",
    text: "Se objetiva trabajo respiratorio aumentado.",
  },
  {
    id: "tr_b_neumo_sospecha",
    category: "xabcde",
    label: "Sospecha de neumotórax",
    text: "Se sospecha neumotórax ante la exploración clínica.",
    excludes: ["tr_b_neumo_tension"],
  },
  {
    id: "tr_b_neumo_tension",
    category: "xabcde",
    label: "Sospecha de neumotórax a tensión",
    text: "Se sospecha neumotórax a tensión por deterioro hemodinámico y asimetría respiratoria.",
    excludes: ["tr_b_neumo_sospecha"],
  },
  {
    id: "tr_b_sello",
    category: "xabcde",
    label: "Sello oclusivo aplicado",
    text: "Se aplica sello oclusivo sobre herida torácica penetrante.",
  },
  {
    id: "tr_b_descompresion",
    category: "xabcde",
    label: "Descompresión torácica realizada",
    text: "Se realiza descompresión torácica ante sospecha de neumotórax a tensión.",
  },

  // C — Circulación
  {
    id: "tr_c_pulso_radial",
    category: "xabcde",
    label: "Pulso radial presente",
    text: "Pulso radial presente y valorable.",
    excludes: ["tr_c_sin_pulso"],
  },
  {
    id: "tr_c_sin_pulso",
    category: "xabcde",
    label: "Solo pulso carotídeo palpable",
    text: "Pulso radial ausente, solo pulso carotídeo palpable.",
    excludes: ["tr_c_pulso_radial"],
  },
  {
    id: "tr_c_pelvis_inestable",
    category: "xabcde",
    label: "Inestabilidad pélvica objetivada",
    text: "Se objetiva inestabilidad pélvica en la exploración.",
  },
  {
    id: "tr_c_cinturon_pelvis",
    category: "xabcde",
    label: "Cinturón pélvico aplicado",
    text: "Se aplica cinturón pélvico para estabilización de la pelvis.",
  },
  {
    id: "tr_c_sfv",
    category: "xabcde",
    label: "Suero fisiológico en perfusión rápida",
    text: "Se inicia perfusión rápida de suero fisiológico por hipovolemia.",
  },
  {
    id: "tr_c_via_io",
    category: "xabcde",
    label: "Acceso intraóseo",
    text: "Se canaliza acceso intraóseo.",
  },
  {
    id: "tr_c_via_iv",
    category: "xabcde",
    label: "Acceso venoso periférico",
    text: "Se canaliza acceso venoso periférico.",
  },

  // D — Neurológico
  {
    id: "tr_d_gcs_15",
    category: "neurologico",
    label: "Glasgow 15",
    text: "Glasgow 15, paciente neurológicamente íntegro.",
    excludes: ["tr_d_gcs_dismn"],
  },
  {
    id: "tr_d_gcs_dismn",
    category: "neurologico",
    label: "Glasgow disminuido",
    text: "Se registra puntuación de Glasgow disminuida.",
    excludes: ["tr_d_gcs_15"],
  },
  {
    id: "tr_d_tce",
    category: "neurologico",
    label: "TCE objetivado",
    text: "Se objetiva traumatismo craneoencefálico en la exploración.",
  },
  {
    id: "tr_d_perdida_conc",
    category: "neurologico",
    label: "Pérdida de conciencia por el trauma",
    text: "Se refiere o se objetiva pérdida de conciencia asociada al traumatismo.",
  },
  {
    id: "tr_d_columna_dolor",
    category: "neurologico",
    label: "Dolor en columna referido",
    text: "El paciente refiere dolor en la columna vertebral.",
  },
  {
    id: "tr_d_raquis",
    category: "neurologico",
    label: "Inmovilización de raquis completo",
    text: "Se realiza inmovilización de raquis completo.",
  },

  // E — Exposición y lesiones
  {
    id: "tr_e_herida_cabeza",
    category: "lesiones",
    label: "Herida en cabeza / cuero cabelludo",
    text: "Se objetiva herida en cabeza o cuero cabelludo.",
  },
  {
    id: "tr_e_herida_cara",
    category: "lesiones",
    label: "Herida en región facial",
    text: "Se objetiva herida en región facial.",
  },
  {
    id: "tr_e_herida_torax",
    category: "lesiones",
    label: "Herida en tórax",
    text: "Se objetiva herida en tórax.",
  },
  {
    id: "tr_e_herida_abdomen",
    category: "lesiones",
    label: "Herida en abdomen",
    text: "Se objetiva herida en abdomen.",
  },
  {
    id: "tr_e_herida_extrem",
    category: "lesiones",
    label: "Herida en extremidades",
    text: "Se objetivan heridas en extremidades.",
  },
  {
    id: "tr_e_fractura_mmss",
    category: "lesiones",
    label: "Sospecha de fractura en MMSS",
    text: "Se sospecha fractura en miembro superior.",
  },
  {
    id: "tr_e_fractura_mmii",
    category: "lesiones",
    label: "Sospecha de fractura en MMII",
    text: "Se sospecha fractura en miembro inferior.",
  },
  {
    id: "tr_e_fractura_costal",
    category: "lesiones",
    label: "Sospecha de fractura costal",
    text: "Se sospecha fractura costal por dolor a la palpación.",
  },
  {
    id: "tr_e_ferula_mmss",
    category: "lesiones",
    label: "Férula en miembro superior aplicada",
    text: "Se aplica férula inmovilizadora en miembro superior.",
  },
  {
    id: "tr_e_ferula_mmii",
    category: "lesiones",
    label: "Férula en miembro inferior aplicada",
    text: "Se aplica férula inmovilizadora en miembro inferior.",
  },
  {
    id: "tr_e_tablero",
    category: "lesiones",
    label: "Tablero espinal en la inmovilización",
    text: "Se utiliza tablero espinal en la inmovilización del paciente.",
  },

  // TCE detallado (bloque condicional)
  {
    id: "tr_tce_leve",
    category: "tce",
    label: "TCE leve (GCS 13-15)",
    text: "Traumatismo craneoencefálico leve (GCS 13-15).",
    excludes: ["tr_tce_moderado", "tr_tce_grave"],
  },
  {
    id: "tr_tce_moderado",
    category: "tce",
    label: "TCE moderado (GCS 9-12)",
    text: "Traumatismo craneoencefálico moderado (GCS 9-12).",
    excludes: ["tr_tce_leve", "tr_tce_grave"],
  },
  {
    id: "tr_tce_grave",
    category: "tce",
    label: "TCE grave (GCS ≤ 8)",
    text: "Traumatismo craneoencefálico grave (GCS ≤ 8).",
    excludes: ["tr_tce_leve", "tr_tce_moderado"],
  },
  {
    id: "tr_tce_hematoma",
    category: "tce",
    label: "Hematoma en cuero cabelludo",
    text: "Se objetiva hematoma en cuero cabelludo.",
  },
  {
    id: "tr_tce_otorragia",
    category: "tce",
    label: "Otorragia objetivada",
    text: "Se objetiva otorragia.",
  },
  {
    id: "tr_tce_rinorragia",
    category: "tce",
    label: "Rinorragia objetivada",
    text: "Se objetiva rinorragia.",
  },
  {
    id: "tr_tce_anisocoria",
    category: "tce",
    label: "Anisocoria objetivada",
    text: "Se objetiva anisocoria en la exploración pupilar.",
  },
  {
    id: "tr_tce_midriasis",
    category: "tce",
    label: "Midriasis unilateral objetivada",
    text: "Se objetiva midriasis unilateral en la exploración pupilar.",
  },

  // Quemaduras (bloque condicional)
  {
    id: "tr_q_1grado",
    category: "quemaduras",
    label: "Quemadura 1er grado (eritema)",
    text: "Quemadura de primer grado (eritema superficial) objetivada.",
    excludes: ["tr_q_2g_sup", "tr_q_2g_prof", "tr_q_3grado"],
  },
  {
    id: "tr_q_2g_sup",
    category: "quemaduras",
    label: "Quemadura 2º grado superficial",
    text: "Quemadura de segundo grado superficial objetivada.",
    excludes: ["tr_q_1grado", "tr_q_2g_prof", "tr_q_3grado"],
  },
  {
    id: "tr_q_2g_prof",
    category: "quemaduras",
    label: "Quemadura 2º grado profunda",
    text: "Quemadura de segundo grado profunda objetivada.",
    excludes: ["tr_q_1grado", "tr_q_2g_sup", "tr_q_3grado"],
  },
  {
    id: "tr_q_3grado",
    category: "quemaduras",
    label: "Quemadura 3er grado",
    text: "Quemadura de tercer grado objetivada.",
    excludes: ["tr_q_1grado", "tr_q_2g_sup", "tr_q_2g_prof"],
  },
  {
    id: "tr_q_ext_menos9",
    category: "quemaduras",
    label: "Extensión < 9% SCQ",
    text: "Extensión estimada de la quemadura inferior al 9% de la superficie corporal quemada (SCQ).",
    excludes: ["tr_q_ext_9_18", "tr_q_ext_mas18"],
  },
  {
    id: "tr_q_ext_9_18",
    category: "quemaduras",
    label: "Extensión 9-18% SCQ",
    text: "Extensión estimada de la quemadura entre el 9 y el 18% de la superficie corporal quemada (SCQ).",
    excludes: ["tr_q_ext_menos9", "tr_q_ext_mas18"],
  },
  {
    id: "tr_q_ext_mas18",
    category: "quemaduras",
    label: "Extensión > 18% SCQ",
    text: "Extensión estimada de la quemadura superior al 18% de la superficie corporal quemada (SCQ).",
    excludes: ["tr_q_ext_menos9", "tr_q_ext_9_18"],
  },
  {
    id: "tr_q_cara",
    category: "quemaduras",
    label: "Afectación facial",
    text: "Se objetiva afectación facial por la quemadura.",
  },
  {
    id: "tr_q_via_aerea",
    category: "quemaduras",
    label: "Sospecha de lesión inhalatoria",
    text: "Se sospecha lesión inhalatoria por quemadura en vías respiratorias.",
  },
  {
    id: "tr_q_enfriamiento",
    category: "quemaduras",
    label: "Enfriamiento con agua tibia realizado",
    text: "Se realiza enfriamiento de la quemadura con agua templada (15-25 °C).",
  },
  {
    id: "tr_q_aposito",
    category: "quemaduras",
    label: "Apósito estéril aplicado",
    text: "Se aplica apósito estéril sobre la zona quemada.",
  },
  {
    id: "tr_q_analgesia",
    category: "quemaduras",
    label: "Analgesia para quemaduras",
    text: "Se pauta analgesia para el manejo del dolor por quemaduras.",
  },
];

// ─────────────────────────────────────────────────────────────
// DIFICULTAD RESPIRATORIA
// ─────────────────────────────────────────────────────────────

const dificultadRespItems: Item[] = [
  // Características
  {
    id: "dr_inicio_brusco",
    category: "caract",
    label: "Inicio brusco",
    text: "La disnea es de inicio brusco.",
    excludes: ["dr_inicio_progresivo"],
  },
  {
    id: "dr_inicio_progresivo",
    category: "caract",
    label: "Inicio progresivo",
    text: "La disnea es de inicio progresivo.",
    excludes: ["dr_inicio_brusco"],
  },
  {
    id: "dr_disnea_reposo",
    category: "caract",
    label: "Disnea en reposo",
    text: "Se objetiva disnea en reposo.",
    excludes: ["dr_disnea_esfuerzo"],
  },
  {
    id: "dr_disnea_esfuerzo",
    category: "caract",
    label: "Disnea con mínimos esfuerzos",
    text: "La disnea aparece con mínimos esfuerzos.",
    excludes: ["dr_disnea_reposo"],
  },
  {
    id: "dr_uso_accesorios",
    category: "caract",
    label: "Uso de musculatura accesoria",
    text: "Se objetiva uso de musculatura accesoria respiratoria.",
  },
  {
    id: "dr_tiraje",
    category: "caract",
    label: "Tiraje intercostal objetivado",
    text: "Se objetiva tiraje intercostal.",
  },
  {
    id: "dr_cianosis",
    category: "caract",
    label: "Cianosis objetivada",
    text: "Se objetiva cianosis en la valoración.",
  },
  {
    id: "dr_ortopnea",
    category: "caract",
    label: "Ortopnea referida",
    text: "El paciente refiere ortopnea.",
  },
  {
    id: "dr_posicion_fowler",
    category: "caract",
    label: "Posición en Fowler",
    text: "Se coloca al paciente en posición de Fowler para alivio de la disnea.",
  },

  // Antecedentes
  {
    id: "dr_antec_asma",
    category: "antecedentes",
    label: "Antecedentes de asma / EPOC",
    text: "El paciente refiere antecedentes de asma o EPOC.",
    excludes: ["dr_antec_icc", "dr_antec_ninguno"],
  },
  {
    id: "dr_antec_icc",
    category: "antecedentes",
    label: "Antecedentes de insuficiencia cardíaca",
    text: "El paciente refiere antecedentes de insuficiencia cardíaca.",
    excludes: ["dr_antec_asma", "dr_antec_ninguno"],
  },
  {
    id: "dr_antec_ninguno",
    category: "antecedentes",
    label: "Sin antecedentes respiratorios / cardíacos",
    text: "Sin antecedentes respiratorios o cardíacos conocidos.",
    excludes: ["dr_antec_asma", "dr_antec_icc"],
  },

  // Auscultación
  {
    id: "dr_mv_conservado",
    category: "auscultacion",
    label: "Murmullo vesicular conservado bilateral",
    text: "Murmullo vesicular conservado y simétrico en ambos campos pulmonares.",
    excludes: ["dr_mv_dismn_bil", "dr_silencio"],
  },
  {
    id: "dr_mv_dismn_bil",
    category: "auscultacion",
    label: "Murmullo vesicular disminuido bilateral",
    text: "Se objetiva murmullo vesicular disminuido en ambos campos pulmonares.",
    excludes: ["dr_mv_conservado", "dr_silencio"],
  },
  {
    id: "dr_mv_dismn_der",
    category: "auscultacion",
    label: "MV disminuido campo derecho",
    text: "Se objetiva murmullo vesicular disminuido en campo pulmonar derecho.",
  },
  {
    id: "dr_mv_dismn_izq",
    category: "auscultacion",
    label: "MV disminuido campo izquierdo",
    text: "Se objetiva murmullo vesicular disminuido en campo pulmonar izquierdo.",
  },
  {
    id: "dr_sibilancias_bil",
    category: "auscultacion",
    label: "Sibilancias generalizadas",
    text: "Se auscultan sibilancias generalizadas.",
  },
  {
    id: "dr_sibilancias_espit",
    category: "auscultacion",
    label: "Sibilancias espiratorias",
    text: "Se auscultan sibilancias de predominio espiratorio.",
  },
  {
    id: "dr_crepitantes_bil",
    category: "auscultacion",
    label: "Crepitantes bilaterales",
    text: "Se auscultan crepitantes bilaterales.",
  },
  {
    id: "dr_crepitantes_bases",
    category: "auscultacion",
    label: "Crepitantes en bases",
    text: "Se auscultan crepitantes en bases pulmonares.",
  },
  {
    id: "dr_silencio",
    category: "auscultacion",
    label: "Silencio auscultatorio",
    text: "Se objetiva silencio auscultatorio.",
    excludes: ["dr_mv_conservado", "dr_mv_dismn_bil"],
  },
  {
    id: "dr_roncos",
    category: "auscultacion",
    label: "Roncus a la auscultación",
    text: "Se auscultan roncus.",
  },
  {
    id: "dr_stridor",
    category: "auscultacion",
    label: "Estridor a la auscultación",
    text: "Se objetiva estridor a la auscultación.",
  },

  // Intervenciones
  {
    id: "dr_o2_gafas",
    category: "intervencion",
    label: "Oxígeno con gafas nasales",
    text: "Oxigenoterapia administrada mediante gafas nasales.",
    excludes: ["dr_o2_mascarilla", "dr_o2_reservorio"],
  },
  {
    id: "dr_o2_mascarilla",
    category: "intervencion",
    label: "Oxígeno con mascarilla simple",
    text: "Oxigenoterapia administrada mediante mascarilla simple.",
    excludes: ["dr_o2_gafas", "dr_o2_reservorio"],
  },
  {
    id: "dr_o2_reservorio",
    category: "intervencion",
    label: "Oxígeno con mascarilla reservorio",
    text: "Oxigenoterapia administrada mediante mascarilla con reservorio a alto flujo.",
    excludes: ["dr_o2_gafas", "dr_o2_mascarilla"],
  },
  {
    id: "dr_vni",
    category: "intervencion",
    label: "Ventilación no invasiva (VNI)",
    text: "Se inicia ventilación no invasiva (VNI).",
  },
  {
    id: "dr_iot",
    category: "intervencion",
    label: "Intubación orotraqueal",
    text: "Se realiza intubación orotraqueal ante insuficiencia respiratoria grave.",
  },
  {
    id: "dr_via_periferica",
    category: "intervencion",
    label: "Vía periférica canalizada",
    text: "Se canaliza vía periférica.",
  },
  {
    id: "dr_salbutamol_inh",
    category: "intervencion",
    label: "Salbutamol inhalado",
    text: "Se administra salbutamol inhalado mediante cámara espaciadora.",
  },
  {
    id: "dr_ipratropio",
    category: "intervencion",
    label: "Bromuro de ipratropio inhalado",
    text: "Se administra bromuro de ipratropio inhalado.",
  },
  {
    id: "dr_corticoides",
    category: "intervencion",
    label: "Corticoides administrados",
    text: "Se administran corticoides por vía sistémica.",
  },
  {
    id: "dr_furosemida",
    category: "intervencion",
    label: "Furosemida IV administrada",
    text: "Se administra furosemida intravenosa.",
  },
  {
    id: "dr_nitratos",
    category: "intervencion",
    label: "Nitratos administrados",
    text: "Se administran nitratos.",
  },
  {
    id: "dr_morfina",
    category: "intervencion",
    label: "Morfina IV administrada",
    text: "Se administra morfina intravenosa.",
  },
];

// ─────────────────────────────────────────────────────────────
// OTROS (categoría genérica / flexible)
// ─────────────────────────────────────────────────────────────

const otrosItems: Item[] = [
  {
    id: "ot_malestar_general",
    category: "motivo",
    label: "Malestar general referido",
    text: "El paciente refiere malestar general como motivo principal de consulta.",
  },
  {
    id: "ot_dolor_no_filiado",
    category: "motivo",
    label: "Dolor de localización no especificada",
    text: "El paciente refiere dolor de localización no claramente especificada.",
  },
  {
    id: "ot_sintomas_varios",
    category: "motivo",
    label: "Sintomatología variada referida",
    text: "El paciente refiere sintomatología variada no encuadrable en categoría específica.",
  },
  {
    id: "ot_sin_motivo_claro",
    category: "motivo",
    label: "Motivo no claramente definido en escena",
    text: "El motivo de activación no queda claramente definido en la escena.",
  },
  {
    id: "ot_monitor",
    category: "intervencion",
    label: "Monitor cardiaco aplicado",
    text: "Monitor cardiaco aplicado.",
  },
  {
    id: "ot_ecg",
    category: "intervencion",
    label: "ECG 12 derivaciones realizado",
    text: "ECG de 12 derivaciones realizado.",
  },
  {
    id: "ot_glucemia",
    category: "intervencion",
    label: "Glucemia capilar determinada",
    text: "Glucemia capilar determinada.",
  },
  {
    id: "ot_via_periferica",
    category: "intervencion",
    label: "Vía periférica canalizada",
    text: "Se canaliza vía periférica.",
  },
  {
    id: "ot_o2",
    category: "intervencion",
    label: "Oxigenoterapia administrada",
    text: "Oxigenoterapia administrada.",
  },
  {
    id: "ot_analgesia",
    category: "intervencion",
    label: "Analgesia administrada",
    text: "Analgesia administrada.",
  },
  {
    id: "ot_antieméticos",
    category: "intervencion",
    label: "Antieméticos administrados",
    text: "Antieméticos administrados.",
  },
];

// ─────────────────────────────────────────────────────────────
// REGISTRO GLOBAL — Map para lookups O(1)
// ─────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────
// INTERVENCIONES Y PROCEDIMIENTOS BÁSICOS COMUNES
// Disponibles en cualquier motivo de activación
// ─────────────────────────────────────────────────────────────

const intervencionBasicaItems: Item[] = [
  {
    id: "com_int_monitor",
    category: "intervencion",
    label: "Monitorización multiparamétrica",
    text: "Se aplica monitorización multiparamétrica continua.",
  },
  {
    id: "com_int_ecg_12d",
    category: "intervencion",
    label: "ECG de 12 derivaciones realizado",
    text: "Se registra electrocardiograma de 12 derivaciones.",
  },
  {
    id: "com_int_via_periferica",
    category: "intervencion",
    label: "Vía venosa periférica canalizada",
    text: "Se canaliza vía venosa periférica.",
  },
  {
    id: "com_int_via_io",
    category: "intervencion",
    label: "Vía intraósea",
    text: "Se canaliza vía intraósea ante imposibilidad de acceso venoso periférico.",
  },
  {
    id: "com_int_iot",
    category: "intervencion",
    label: "Intubación orotraqueal (IOT)",
    text: "Se realiza intubación orotraqueal para control avanzado de la vía aérea.",
  },
  {
    id: "com_int_aspiracion",
    category: "intervencion",
    label: "Aspiración de secreciones",
    text: "Se realiza aspiración de secreciones de la vía aérea.",
  },
  {
    id: "com_int_cricotiroidotomia",
    category: "intervencion",
    label: "Cricotiroidotomía de emergencia",
    text: "Se realiza cricotiroidotomía de emergencia ante vía aérea no accesible.",
  },
  {
    id: "com_int_hemostasia",
    category: "intervencion",
    label: "Hemostasia directa",
    text: "Se aplica hemostasia mediante compresión directa sobre la herida.",
  },
  {
    id: "com_int_torniquete",
    category: "intervencion",
    label: "Torniquete hemostático aplicado",
    text: "Se aplica torniquete hemostático para control de hemorragia en extremidad.",
  },
  {
    id: "com_int_parche_torax",
    category: "intervencion",
    label: "Parche oclusivo de tórax aplicado",
    text: "Se aplica parche oclusivo torácico ante herida penetrante o neumotórax abierto.",
  },
  {
    id: "com_int_toracocentesis",
    category: "intervencion",
    label: "Toracocentesis descompresiva",
    text: "Se realiza toracocentesis descompresiva ante neumotórax a tensión.",
  },
  {
    id: "com_int_inmovilizacion",
    category: "intervencion",
    label: "Inmovilización con dispositivo espinal",
    text: "Se realiza inmovilización con dispositivo de inmovilización espinal.",
  },
  {
    id: "com_int_ferula",
    category: "intervencion",
    label: "Inmovilización con férula",
    text: "Se aplica inmovilización con férula en la extremidad afectada.",
  },
  {
    id: "com_int_cura_ssf",
    category: "intervencion",
    label: "Cura con irrigación SSF y vendaje",
    text: "Se realiza cura mediante irrigación con suero salino fisiológico y vendaje.",
  },
  {
    id: "com_int_lavado_gastrico",
    category: "intervencion",
    label: "Lavado gástrico realizado",
    text: "Se realiza lavado gástrico según protocolo de intoxicación.",
  },
  {
    id: "com_int_carbon_activado",
    category: "intervencion",
    label: "Carbón activado administrado",
    text: "Se administra carbón activado según protocolo de intoxicación.",
  },
  {
    id: "com_int_medicacion",
    category: "intervencion",
    label: "Medicación indicada administrada",
    text: "Se administra la medicación indicada según el protocolo aplicable.",
  },
];

export const allItems: Item[] = [
  ...commonItems,
  ...constantes,
  ...dolorToracicoItems,
  ...convulsionesItems,
  ...sincopeItems,
  ...pcrItems,
  ...partoItems,
  ...escalaItems,
  ...ictusItems,
  ...psiquiatricoItems,
  ...autoliticoItems,
  ...traumaItems,
  ...dificultadRespItems,
  ...otrosItems,
  ...intervencionBasicaItems,
];

/** Map global para acceso O(1) por ID */
export const itemsMap: Map<string, Item> = new Map(allItems.map((item) => [item.id, item]));
