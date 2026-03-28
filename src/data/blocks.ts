/**
 * Definición de todos los bloques clínicos del sistema.
 *
 * Un bloque agrupa ítems clínicamente coherentes y es la
 * unidad mínima de valoración en el árbol lógico.
 *
 * Los bloques con reusable=true son compartidos por varios
 * motivos de activación y no deben duplicarse en los datos.
 *
 * El campo textAssembly controla cómo se ensamblan los textos
 * de los ítems seleccionados en el informe final:
 *   - 'sentences': cada ítem genera una frase propia (defecto)
 *   - 'inline-list': los calificadores se unen en una frase única
 *     (usado para las constantes vitales)
 */

import type { Block } from "@/types/clinicalTree";

// ─────────────────────────────────────────────────────────────
// BLOQUES COMUNES — Reutilizables en cualquier motivo
// ─────────────────────────────────────────────────────────────

export const bloqueSeguridad: Block = {
  id: "bloque_seguridad",
  title: "Seguridad del entorno",
  description: "Condiciones de acceso y riesgos identificados en la escena",
  reusable: true,
  itemIds: [
    "com_env_seguro",
    "com_env_riesgo_elect",
    "com_env_riesgo_trafico",
    "com_env_riesgo_altura",
    "com_env_controlado",
    "com_env_acceso_dif",
    "com_env_espacio_conf",
  ],
};

export const bloqueLlegada: Block = {
  id: "bloque_llegada",
  title: "Posición a la llegada",
  description: "Cómo se encontró al paciente en el momento de la llegada",
  reusable: true,
  itemIds: [
    "com_arr_supino",
    "com_arr_sedestacion",
    "com_arr_lateral",
    "com_arr_prono",
    "com_arr_bipedestacion",
    "com_arr_suelo",
    "com_arr_cama",
  ],
};

export const bloqueFamiliares: Block = {
  id: "bloque_familiares",
  title: "Familiares y testigos",
  description: "Presencia de acompañantes y fuentes de información en la escena",
  reusable: true,
  itemIds: [
    "com_fam_familiares",
    "com_fam_testigos",
    "com_fam_sin_acomp",
    "com_fam_info_familiar",
    "com_fam_info_testigo",
    "com_fam_sin_info",
  ],
};

export const bloquePertenencias: Block = {
  id: "bloque_pertenencias",
  title: "Pertenencias del paciente",
  description: "Gestión y custodia de pertenencias",
  reusable: true,
  itemIds: ["com_per_recogidas", "com_per_familiar", "com_per_policial", "com_per_sin_pert"],
};

export const bloqueIdentificacion: Block = {
  id: "bloque_identificacion",
  title: "Identificación del paciente",
  description: "Método de identificación empleado",
  reusable: true,
  itemIds: ["com_idf_documento", "com_idf_familiar", "com_idf_sin_id"],
};

/**
 * Bloque de constantes vitales en modo inline-list.
 * Los ítems son calificadores cualitativos que se ensamblan en una
 * única frase: "A la valoración, paciente normocárdico, normotenso…"
 * Este enfoque prioriza la expresión asistencial cualitativa sobre
 * el registro numérico puro, conforme al modelo de valoración VERA.
 */
export const bloqueConstantes: Block = {
  id: "bloque_constantes",
  title: "Constantes vitales",
  description: "Valoración cualitativa de constantes hemodinámicas, respiratorias y metabólicas",
  reusable: true,
  itemIds: [
    "cst_normocardico",
    "cst_taquicardico",
    "cst_bradicardico",
    "cst_normotenso",
    "cst_hipertenso",
    "cst_hipotenso",
    "cst_eupneico",
    "cst_taquipneico",
    "cst_bradipneico",
    "cst_afebril",
    "cst_febril",
    "cst_hipotermico",
    "cst_normoglucemia",
    "cst_hiperglucemia",
    "cst_hipoglucemia",
    "cst_sat_conservada",
    "cst_desaturando",
    "cst_sat_disminuida",
  ],
  textAssembly: {
    mode: "inline-list",
    prefix: "A la valoración, paciente ",
    suffix: ".",
  },
};

export const bloqueColaboracion: Block = {
  id: "bloque_colaboracion",
  title: "Colaboración del paciente",
  description: "Grado de colaboración durante la valoración",
  reusable: true,
  itemIds: ["com_col_colaborador", "com_col_parcial", "com_col_no_colaborador", "com_col_agitado"],
};

export const bloqueTraslado: Block = {
  id: "bloque_traslado",
  title: "Traslado y continuidad asistencial",
  description: "Medio de traslado, entrega al equipo receptor e informe",
  reusable: true,
  itemIds: [
    "com_trs_uvi",
    "com_trs_svb",
    "com_trs_escena",
    "com_trs_familiar",
    "com_trs_entrega",
    "com_trs_informe",
  ],
};

// ─────────────────────────────────────────────────────────────
// BLOQUES — DOLOR TORÁCICO
// ─────────────────────────────────────────────────────────────

export const bloqueDtCaracterizacion: Block = {
  id: "bloque_dt_caract",
  title: "Caracterización del dolor",
  description: "Inicio, carácter, irradiación y evolución del dolor",
  itemIds: [
    "dt_reposo",
    "dt_esfuerzo",
    "dt_estres",
    "dt_opresivo",
    "dt_punzante",
    "dt_quemante",
    "dt_irr_brazo_izq",
    "dt_irr_mandibula",
    "dt_irr_espalda",
    "dt_irr_epigastrio",
    "dt_sin_irradiacion",
    "dt_continuo",
    "dt_intermitente",
    "dt_persiste",
    "dt_cede",
    "dt_pleuritico",
    "dt_palpacion",
  ],
};

export const bloqueDtTiempo: Block = {
  id: "bloque_dt_tiempo",
  title: "Tiempo de evolución",
  description: "Tiempo transcurrido desde el inicio de los síntomas",
  itemIds: ["dt_t_menos_1h", "dt_t_1_6h", "dt_t_mas_6h", "dt_t_desconocido"],
};

export const bloqueDtSintomas: Block = {
  id: "bloque_dt_sintomas",
  title: "Síntomas acompañantes",
  description: "Sintomatología acompañante al cuadro de dolor torácico",
  itemIds: [
    "dt_nauseas",
    "dt_vomitos",
    "dt_disnea_acomp",
    "dt_palpitaciones",
    "dt_mareo",
    "dt_sincope_previo",
    "dt_diaforesis",
    "dt_palidez",
    "dt_ansiedad",
  ],
};

export const bloqueDtPerfusion: Block = {
  id: "bloque_dt_perfusion",
  title: "Perfusión y estado hemodinámico",
  description: "Valoración de la perfusión periférica y del estado circulatorio",
  itemIds: [
    "dt_perf_conservada",
    "dt_perf_comprometida",
    "dt_frialdad_acral",
    "dt_cianosis_perf",
    "dt_rc_normal",
    "dt_rc_prolongado",
  ],
};

export const bloqueDtRespiratorio: Block = {
  id: "bloque_dt_respiratorio",
  title: "Auscultación y patrón respiratorio",
  description: "Murmullo vesicular, ruidos sobreañadidos y esfuerzo respiratorio",
  itemIds: [
    "dt_mv_conservado",
    "dt_mv_dismn_bil",
    "dt_mv_dismn_der",
    "dt_mv_dismn_izq",
    "dt_crepitantes",
    "dt_sibilancias",
    "dt_trabajo_resp",
  ],
};

export const bloqueDtEcgBasico: Block = {
  id: "bloque_dt_ecg_basico",
  title: "Monitorización electrocardiográfica",
  description: "Aplicación del monitor y hallazgos básicos del registro",
  itemIds: ["dt_monitor", "dt_ecg_12d", "dt_ecg_sinusal", "dt_ecg_sin_alt", "dt_ecg_alt"],
};

/** Bloque condicional: aparece cuando se marca alteración en ECG */
export const bloqueDtEcgAlteraciones: Block = {
  id: "bloque_dt_ecg_alt",
  title: "Alteraciones electrocardiográficas objetivadas",
  description: "Descripción objetiva de alteraciones del ritmo, la conducción y la repolarización",
  itemIds: [
    "dt_ecg_taquicardia",
    "dt_ecg_bradicardia",
    "dt_ecg_fa",
    "dt_ecg_extrasist",
    "dt_ecg_pausa",
    "dt_ecg_qrs_ancho",
    "dt_ecg_pr_largo",
    "dt_ecg_qt_largo",
    "dt_ecg_brihh",
    "dt_ecg_brdhh",
    "dt_ecg_elevacion_st",
    "dt_ecg_depresion_st",
    "dt_ecg_inversion_t",
  ],
};

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
    "dt_ticagrelor",
    "dt_clopidogrel",
    "dt_analgesico",
    "dt_antieméticos",
    "dt_activacion_cod",
  ],
};

/** Bloque condicional: aparece en situación de inestabilidad hemodinámica */
export const bloqueDtHemodinamico: Block = {
  id: "bloque_dt_hemodinamico",
  title: "Manejo hemodinámico",
  description: "Medidas adicionales ante compromiso hemodinámico",
  itemIds: ["dt_sfv", "dt_vasopresores", "dt_trendelenburg"],
};

// ─────────────────────────────────────────────────────────────
// BLOQUES — CONVULSIONES
// ─────────────────────────────────────────────────────────────

export const bloqueCvLlegada: Block = {
  id: "bloque_cv_llegada",
  title: "Situación a la llegada",
  description: "Estado del episodio a la llegada del equipo y datos de testigos",
  itemIds: [
    "cv_activa",
    "cv_cede",
    "cv_postcritico",
    "cv_test_tcg",
    "cv_test_rigidez",
    "cv_test_automatism",
    "cv_dur_breve",
    "cv_dur_prolongada",
    "cv_dur_status",
    "cv_antec_prev",
    "cv_sin_antec",
  ],
};

export const bloqueCvActividad: Block = {
  id: "bloque_cv_actividad",
  title: "Actividad convulsiva observada",
  description: "Descripción objetiva de la actividad convulsiva presenciada por el equipo",
  itemIds: [
    "cv_obs_tcg",
    "cv_obs_tonico",
    "cv_obs_clonico_foc",
    "cv_obs_automatismos",
    "cv_desv_ocular",
    "cv_mord_lengua",
    "cv_relax_esfinteres",
    "cv_apnea_ictal",
  ],
};

export const bloqueCvConciencia: Block = {
  id: "bloque_cv_conciencia",
  title: "Nivel de conciencia (Glasgow)",
  description: "Valoración del nivel de conciencia según escala de Glasgow",
  itemIds: [
    "cv_gcs_15",
    "cv_gcs_disminuido",
    "cv_apert_voz",
    "cv_apert_dolor",
    "cv_sin_apertura",
    "cv_rv_confusa",
    "cv_sin_resp_verbal",
    "cv_rm_obedece",
    "cv_rm_localiza",
    "cv_rm_flexora",
    "cv_rm_extensora",
    "cv_sin_resp_motora",
  ],
};

export const bloqueCvPupilas: Block = {
  id: "bloque_cv_pupilas",
  title: "Exploración pupilar",
  description: "Tamaño, simetría y reactividad pupilar",
  itemIds: [
    "cv_pupilas_norm",
    "cv_midriasis",
    "cv_miosis",
    "cv_anisocoria",
    "cv_arreactivas",
    "cv_desv_mirada",
  ],
};

export const bloqueCvGlucemia: Block = {
  id: "bloque_cv_glucemia",
  title: "Glucemia capilar",
  description: "Determinación y resultado de glucemia capilar",
  itemIds: ["cv_gluc_normal", "cv_gluc_hipo", "cv_gluc_hiper"],
};

export const bloqueCvEcg: Block = {
  id: "bloque_cv_ecg",
  title: "Monitorización electrocardiográfica",
  description: "Aplicación del monitor y hallazgos básicos del registro",
  itemIds: ["cv_monitor", "cv_ecg_sinusal", "cv_ecg_sin_alt", "cv_ecg_alt"],
};

/** Bloque condicional: emerge cuando se objetivan alteraciones electrocardiográficas */
export const bloqueCvEcgDetallado: Block = {
  id: "bloque_cv_ecg_detallado",
  title: "Alteraciones electrocardiográficas objetivadas",
  description: "Descripción objetiva de alteraciones del ritmo, la conducción y la repolarización",
  itemIds: [
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
};

/** Bloque condicional: emerge cuando se objetiva focalidad neurológica */
export const bloqueCvFocalidad: Block = {
  id: "bloque_cv_focalidad",
  title: "Focalidad neurológica",
  description: "Hallazgos objetivos de focalidad neurológica en la exploración",
  itemIds: [
    "cv_sin_focalidad",
    "cv_hemiparesia_d",
    "cv_hemiparesia_i",
    "cv_desv_comisura",
    "cv_disartria",
    "cv_afasia",
  ],
};

/** Bloque condicional: emerge en período poscrítico */
export const bloqueCvPostcritico: Block = {
  id: "bloque_cv_postcritico",
  title: "Período poscrítico",
  description: "Valoración del estado del paciente en el período poscrítico",
  itemIds: [
    "cv_pc_confuso",
    "cv_pc_somnoliento",
    "cv_pc_amnesia",
    "cv_pc_cefalea",
    "cv_rec_progresiva",
    "cv_no_recuperacion",
  ],
};

/** Bloque condicional: emerge en caso de status epiléptico */
export const bloqueCvStatus: Block = {
  id: "bloque_cv_status",
  title: "Manejo del status epiléptico",
  description: "Medidas adicionales ante actividad convulsiva prolongada sin respuesta",
  itemIds: ["cv_manejo_via_avanzada", "cv_segunda_linea", "cv_activacion_via_rap"],
};

export const bloqueCvIntervencion: Block = {
  id: "bloque_cv_intervencion",
  title: "Intervenciones realizadas",
  description: "Actuaciones terapéuticas durante el episodio convulsivo",
  itemIds: [
    "cv_pls",
    "cv_va_permeable",
    "cv_o2",
    "cv_sin_restriccion",
    "cv_via_iv",
    "cv_benzo_iv",
    "cv_benzo_rectal",
    "cv_benzo_in",
    "cv_glucosa_iv",
    "cv_cede_tto",
    "cv_no_cede_tto",
  ],
};

// ─────────────────────────────────────────────────────────────
// BLOQUES — SÍNCOPE
// ─────────────────────────────────────────────────────────────

export const bloqueScPreevento: Block = {
  id: "bloque_sc_preevento",
  title: "Contexto previo al episodio",
  description: "Situación y pródromos referidos antes de la pérdida de conciencia",
  itemIds: [
    "sc_bipedestacion",
    "sc_esfuerzo",
    "sc_postural",
    "sc_estres",
    "sc_valsalva",
    "sc_sin_prodromos",
    "sc_palpitaciones_prev",
    "sc_dolor_torac_prev",
    "sc_sudoracion_prev",
    "sc_nauseas_prev",
    "sc_vision_borrosa",
  ],
};

export const bloqueScPtc: Block = {
  id: "bloque_sc_ptc",
  title: "Pérdida transitoria de conciencia",
  description: "Características de la pérdida de conciencia y la caída según testigos",
  itemIds: [
    "sc_ptc_confirmada",
    "sc_ptc_breve",
    "sc_ptc_moderada",
    "sc_ptc_movimientos",
    "sc_ptc_sin_movim",
    "sc_ptc_relajacion",
    "sc_caida_sin_lesion",
    "sc_caida_con_lesion",
  ],
};

export const bloqueScRecuperacion: Block = {
  id: "bloque_sc_recuperacion",
  title: "Recuperación del episodio",
  description: "Forma y tiempo de recuperación del nivel de conciencia",
  itemIds: [
    "sc_rec_espontanea",
    "sc_rec_rapida",
    "sc_rec_confusional",
    "sc_rec_llegada",
    "sc_no_rec_llegada",
  ],
};

export const bloqueScEstado: Block = {
  id: "bloque_sc_estado",
  title: "Estado en la valoración",
  description: "Situación clínica del paciente en el momento de la valoración",
  itemIds: [
    "sc_consciente_orientado",
    "sc_consciente_confuso",
    "sc_amnesia",
    "sc_cefalea",
    "sc_nauseas_act",
    "sc_debilidad",
  ],
};

/** Bloque condicional: emerge cuando se objetiva traumatismo por caída */
export const bloqueScTraumatismo: Block = {
  id: "bloque_sc_traumatismo",
  title: "Valoración del traumatismo asociado",
  description: "Exploración de lesiones secundarias a la caída",
  itemIds: [
    "sc_trauma_craneal",
    "sc_herida_craneal",
    "sc_contusion_facial",
    "sc_trauma_extrem",
    "sc_sin_trauma",
  ],
};

export const bloqueScGlucemia: Block = {
  id: "bloque_sc_glucemia",
  title: "Glucemia capilar",
  description: "Determinación y resultado de glucemia capilar",
  itemIds: ["sc_gluc_normal", "sc_hipoglucemia", "sc_hiperglucemia"],
};

export const bloqueScEcg: Block = {
  id: "bloque_sc_ecg",
  title: "Monitorización electrocardiográfica",
  description: "Aplicación de monitor y hallazgos básicos del registro",
  itemIds: ["sc_monitor", "sc_ecg_sinusal", "sc_ecg_sin_alt", "sc_ecg_alt"],
};

/** Bloque condicional: emerge cuando se detecta alteración ECG que requiere ampliación */
export const bloqueScEcgDetallado: Block = {
  id: "bloque_sc_ecg_detallado",
  title: "Alteraciones electrocardiográficas objetivadas",
  description: "Descripción objetiva de alteraciones del ritmo, la conducción y la repolarización",
  itemIds: [
    "sc_ecg_12d",
    "sc_ecg_taquicardia",
    "sc_ecg_bradicardia",
    "sc_ecg_ritmo_irregular",
    "sc_ecg_extrasist",
    "sc_ecg_pausa",
    "sc_ecg_qrs_ancho",
    "sc_ecg_bloqueo_av",
    "sc_ecg_qt_largo",
    "sc_ecg_brihh",
    "sc_ecg_brdhh",
    "sc_ecg_elevacion_st",
    "sc_ecg_depresion_st",
    "sc_ecg_inversion_t",
    "sc_ecg_12d_alt",
    "sc_activacion_card",
  ],
};

export const bloqueScIntervencion: Block = {
  id: "bloque_sc_intervencion",
  title: "Intervenciones realizadas",
  description: "Medidas terapéuticas adoptadas durante la intervención",
  itemIds: ["sc_decubito", "sc_elevacion_mmii", "sc_via_iv", "sc_o2", "sc_glucosa_iv"],
};

// ─────────────────────────────────────────────────────────────
// BLOQUES — PCR
// ─────────────────────────────────────────────────────────────

export const bloquePcrSituacion: Block = {
  id: "bloque_pcr_situacion",
  title: "Situación a la llegada",
  description: "Estado a la llegada del equipo y existencia de RCP previa",
  itemIds: [
    "pcr_pcr_obj",
    "pcr_rcp_en_curso",
    "pcr_dea_previo",
    "pcr_sin_rcp_previa",
    "pcr_hora_aviso",
    "pcr_hora_llegada",
  ],
};

export const bloquePcrAbc: Block = {
  id: "bloque_pcr_abc",
  title: "Valoración inicial A-B-C",
  description: "Valoración rápida de conciencia, ventilación y circulación",
  itemIds: [
    "pcr_no_consciencia",
    "pcr_no_ventilacion",
    "pcr_no_pulso",
    "pcr_gasping",
    "pcr_va_permeable",
    "pcr_va_obstruida",
  ],
};

export const bloquePcrRitmo: Block = {
  id: "bloque_pcr_ritmo",
  title: "Ritmo electrocardiográfico objetivado",
  description: "Ritmo identificado en la monitorización electrocardiográfica",
  itemIds: ["pcr_fv", "pcr_tvsp", "pcr_aesp", "pcr_asistolia", "pcr_ritmo_no_desf"],
};

export const bloquePcrManiobras: Block = {
  id: "bloque_pcr_maniobras",
  title: "Maniobras de reanimación cardiopulmonar",
  description: "Actuaciones realizadas durante el soporte vital avanzado",
  itemIds: [
    "pcr_rcp_avanzada",
    "pcr_compresiones",
    "pcr_rcp_mecanica",
    "pcr_ventilacion_bvm",
    "pcr_iot",
    "pcr_dsg",
    "pcr_via_io",
    "pcr_via_iv",
    "pcr_adrenalina",
    "pcr_amiodarona",
    "pcr_decision_no_rcp",
  ],
};

/** Bloque condicional: emerge cuando el ritmo es desfibrilable */
export const bloquePcrDesfibrilacion: Block = {
  id: "bloque_pcr_desfibrilacion",
  title: "Desfibrilación eléctrica",
  description: "Registro de las descargas eléctricas realizadas y respuesta",
  itemIds: ["pcr_desfib_real", "pcr_n_descargas", "pcr_resp_desfib", "pcr_sin_resp_desfib"],
};

export const bloquePcrTiempos: Block = {
  id: "bloque_pcr_tiempos",
  title: "Registro de tiempos",
  description: "Documentación de los tiempos clave de la reanimación",
  itemIds: [
    "pcr_hora_inicio_rcp",
    "pcr_hora_1a_descarga",
    "pcr_tiempo_rcp_prev",
    "pcr_tiempo_total",
  ],
};

export const bloquePcrRespuesta: Block = {
  id: "bloque_pcr_respuesta",
  title: "Respuesta clínica",
  description: "Resultado de las maniobras de reanimación",
  itemIds: ["pcr_rosc", "pcr_sin_rosc", "pcr_exitus", "pcr_hora_exitus"],
};

/** Bloque condicional: emerge cuando se produce ROSC */
export const bloquePcrPostRosc: Block = {
  id: "bloque_pcr_post_rosc",
  title: "Manejo post-ROSC",
  description: "Valoración y manejo tras la recuperación de la circulación espontánea",
  itemIds: [
    "pcr_cst_post_rosc",
    "pcr_hemo_estable",
    "pcr_hemo_inestable",
    "pcr_consciencia_post",
    "pcr_conv_post",
    "pcr_manejo_post",
  ],
};

// ─────────────────────────────────────────────────────────────
// BLOQUES — PARTO / URGENCIA OBSTÉTRICA
// ─────────────────────────────────────────────────────────────

export const bloquePtMaterna: Block = {
  id: "bloque_pt_materna",
  title: "Valoración materna",
  description: "Antecedentes obstétricos y situación general de la gestante",
  itemIds: [
    "pt_termino",
    "pt_pretermino",
    "pt_multigesta",
    "pt_primigesta",
    "pt_control_prenatal",
    "pt_sin_control",
    "pt_dolor_lumbar",
    "pt_presion_pelvica",
    "pt_embarazo_multiple",
  ],
};

export const bloquePtDinamica: Block = {
  id: "bloque_pt_dinamica",
  title: "Dinámica uterina",
  description: "Valoración de la dinámica uterina y deseo de pujo",
  itemIds: [
    "pt_contr_regulares",
    "pt_contr_frecuentes",
    "pt_contr_expulsivas",
    "pt_sin_contracciones",
    "pt_deseo_pujo",
  ],
};

export const bloquePtBolsa: Block = {
  id: "bloque_pt_bolsa",
  title: "Estado de la bolsa amniótica",
  description: "Integridad de la bolsa y características del líquido amniótico",
  itemIds: [
    "pt_bolsa_integra",
    "pt_rotura_confirmada",
    "pt_rotura_reciente",
    "pt_liquido_claro",
    "pt_liquido_meconial",
  ],
};

export const bloquePtSangrado: Block = {
  id: "bloque_pt_sangrado",
  title: "Sangrado vaginal",
  description: "Cuantificación del sangrado vaginal durante el proceso",
  itemIds: ["pt_sang_escaso", "pt_sang_moderado", "pt_sang_abundante", "pt_sin_sangrado"],
};

export const bloquePtPresentacion: Block = {
  id: "bloque_pt_presentacion",
  title: "Presentación fetal",
  description: "Presentación fetal y situación del expulsivo",
  itemIds: ["pt_cefalica", "pt_coronacion", "pt_expulsivo_inmin", "pt_podalica", "pt_procidencia"],
};

/** Bloque condicional: emerge cuando se objetiva coronación o expulsivo inminente */
export const bloquePtExpulsivo: Block = {
  id: "bloque_pt_expulsivo",
  title: "Expulsivo",
  description: "Asistencia al expulsivo y nacimiento del neonato",
  itemIds: [
    "pt_nac_cabeza",
    "pt_ritgen",
    "pt_circular_cordon",
    "pt_reduc_circular",
    "pt_episiotomia",
    "pt_nac_completo",
    "pt_hora_nacimiento",
  ],
};

/** Bloque condicional: emerge cuando se produce el nacimiento completo */
export const bloquePtRn: Block = {
  id: "bloque_pt_rn",
  title: "Valoración del recién nacido",
  description: "Valoración inmediata y manejo del neonato al nacimiento",
  itemIds: [
    "pt_rn_llora",
    "pt_rn_no_llora",
    "pt_rn_tono_bueno",
    "pt_rn_tono_dismn",
    "pt_rn_rosado",
    "pt_rn_cianosis_cent",
    "pt_rn_cianosis_perf",
    "pt_rn_apgar_normal",
    "pt_rn_apgar_bajo",
    "pt_corte_cordon",
    "pt_ligadura_dem",
    "pt_piel_piel",
    "pt_rn_reanimacion",
    "pt_rn_termico",
  ],
};

export const bloquePtAlumbramiento: Block = {
  id: "bloque_pt_alumbramiento",
  title: "Alumbramiento",
  description: "Expulsión de la placenta y administración de oxitocina",
  itemIds: [
    "pt_alumbramiento_esp",
    "pt_alumbramiento_pend",
    "pt_placenta_completa",
    "pt_placenta_incomp",
    "pt_oxitocina",
  ],
};

export const bloquePtVigilancia: Block = {
  id: "bloque_pt_vigilancia",
  title: "Vigilancia puerperal",
  description: "Valoración del útero, sangrado y constantes en el puerperio inmediato",
  itemIds: [
    "pt_utero_retraido",
    "pt_globo_seguridad",
    "pt_utero_atonico",
    "pt_masaje_uterino",
    "pt_cst_maternas_est",
    "pt_cst_maternas_comp",
    "pt_sang_posparto",
    "pt_via_posparto",
  ],
};

/** Bloque condicional: emerge cuando se objetiva hemorragia posparto significativa */
export const bloquePtHemorragia: Block = {
  id: "bloque_pt_hemorragia",
  title: "Manejo de la hemorragia posparto",
  description: "Medidas adicionales ante hemorragia posparto de cuantía significativa",
  itemIds: ["pt_uterotonicos", "pt_sfv_posparto", "pt_activacion_hem"],
};

// ─────────────────────────────────────────────────────────────
// BLOQUES REUSABLES — Escalas y códigos
// ─────────────────────────────────────────────────────────────

export const bloqueCodeActivacion: Block = {
  id: "bloque_codigos",
  title: "Activación de código en destino",
  description: "Código de alerta activado en el centro receptor",
  reusable: true,
  itemIds: [
    "cod_ictus",
    "cod_infarto",
    "cod_sepsis",
    "cod_trauma",
    "cod_crisis",
    "cod_donante",
    "cod_0",
  ],
};

export const bloqueQsofa: Block = {
  id: "bloque_qsofa",
  title: "Escala qSOFA",
  description: "Valoración rápida de disfunción orgánica (Quick SOFA)",
  reusable: true,
  itemIds: ["qsf_positivo", "qsf_negativo"],
};

export const bloqueMadridDirect: Block = {
  id: "bloque_madrid_direct",
  title: "Escala Madrid Direct",
  description: "Orientación del destino hospitalario en posible ictus isquémico",
  reusable: true,
  itemIds: ["mad_mayor2", "mad_menor2"],
};

// ─────────────────────────────────────────────────────────────
// BLOQUES — ICTUS
// ─────────────────────────────────────────────────────────────

export const bloqueIcTiempo: Block = {
  id: "bloque_ic_tiempo",
  title: "Tiempo de inicio y último visto bien",
  description: "Registro del inicio de síntomas y del momento del último visto bien (UVB)",
  itemIds: [
    "ic_inicio_conocido",
    "ic_inicio_despertar",
    "ic_inicio_desconocido",
    "ic_ulp_conocido",
    "ic_ulp_desconocido",
    "ic_t_menos_4_5h",
    "ic_t_4_5_9h",
    "ic_t_mas_9h",
    "ic_t_desconocido",
  ],
};

export const bloqueIcFocalidad: Block = {
  id: "bloque_ic_focalidad",
  title: "Focalidad neurológica objetivada",
  description: "Signos y síntomas neurológicos focales objetivados en la exploración",
  itemIds: [
    "ic_paresia_facial_d",
    "ic_paresia_facial_i",
    "ic_hemiplejia_d",
    "ic_hemiplejia_i",
    "ic_disartria",
    "ic_afasia",
    "ic_hemianopsia",
    "ic_diplopia",
    "ic_ataxia",
    "ic_vertigo_brusco",
    "ic_cefalea_brusca",
  ],
};

export const bloqueIcConciencia: Block = {
  id: "bloque_ic_conciencia",
  title: "Nivel de conciencia",
  description: "Valoración del nivel de conciencia en el momento de la intervención",
  itemIds: ["ic_consciencia_conservada", "ic_consciencia_disminuida", "ic_gcs_disminuido"],
};

export const bloqueIcAntecedentes: Block = {
  id: "bloque_ic_antecedentes",
  title: "Antecedentes y tratamiento",
  description: "Antecedentes relevantes para la orientación terapéutica en el ictus",
  itemIds: [
    "ic_anticoagulantes",
    "ic_antiagregantes",
    "ic_no_anticoagulantes",
    "ic_hta_conocida",
    "ic_pas_elevada",
    "ic_pas_normal",
  ],
};

export const bloqueIcIntervencion: Block = {
  id: "bloque_ic_intervencion",
  title: "Intervenciones realizadas",
  description: "Actuaciones realizadas durante la intervención",
  itemIds: ["ic_monitor", "ic_ecg", "ic_glucemia", "ic_via_periferica", "ic_sfv", "ic_posicion"],
};

// ─────────────────────────────────────────────────────────────
// BLOQUES — PSIQUIÁTRICO / AGRESIVO
// ─────────────────────────────────────────────────────────────

export const bloquePsiSituacion: Block = {
  id: "bloque_psi_situacion",
  title: "Conducta objetivada",
  description: "Descripción objetiva de la conducta y el estado del paciente",
  itemIds: [
    "psi_agitacion_leve",
    "psi_agitacion_moderada",
    "psi_agitacion_severa",
    "psi_heteroagresivo",
    "psi_autoagresivo",
    "psi_ideacion_suicida",
    "psi_alucinaciones",
    "psi_delirios",
    "psi_desorientacion",
  ],
};

export const bloquePsiAntecedentes: Block = {
  id: "bloque_psi_antecedentes",
  title: "Antecedentes y circunstancias",
  description: "Antecedentes psiquiátricos y factores asociados al episodio",
  itemIds: [
    "psi_antec_psiquiatrico",
    "psi_sin_antec",
    "psi_tto_psiquiatrico",
    "psi_abandono_tto",
    "psi_alcohol",
    "psi_toxicos",
  ],
};

export const bloquePsiContencion: Block = {
  id: "bloque_psi_contencion",
  title: "Contención y manejo",
  description: "Medidas de contención y manejo farmacológico realizadas",
  itemIds: [
    "psi_escena_ffccse",
    "psi_contencion_verbal",
    "psi_contencion_fisica",
    "psi_contencion_farm",
    "psi_midazolam",
    "psi_haloperidol",
    "psi_diazepam",
    "psi_via_iv",
    "psi_policial_traslado",
  ],
};

// ─────────────────────────────────────────────────────────────
// BLOQUES — INTENTO AUTOLÍTICO
// ─────────────────────────────────────────────────────────────

export const bloqueAlMecanismo: Block = {
  id: "bloque_al_mecanismo",
  title: "Mecanismo del intento autolítico",
  description: "Mecanismo o método empleado en el intento",
  itemIds: [
    "al_mec_medicamentos",
    "al_mec_alcohol",
    "al_mec_toxicos",
    "al_mec_corte",
    "al_mec_precipitacion",
    "al_mec_ahorcamiento",
    "al_mec_quemaduras",
    "al_mec_atropello",
    "al_mec_ahogamiento",
  ],
};

export const bloqueAlCircunstancias: Block = {
  id: "bloque_al_circunstancias",
  title: "Circunstancias y nivel de conciencia",
  description: "Contexto del episodio y estado de conciencia del paciente",
  itemIds: [
    "al_tiempo_conocido",
    "al_tiempo_desconocido",
    "al_solo",
    "al_escena_segura",
    "al_escena_ffccse",
    "al_consciencia_conservada",
    "al_consciencia_disminuida",
    "al_gcs_disminuido",
    "al_riesgo_vital",
    "al_sin_riesgo_vital",
  ],
};

export const bloqueAlLesiones: Block = {
  id: "bloque_al_lesiones",
  title: "Lesiones objetivadas",
  description: "Exploración de lesiones físicas derivadas del intento",
  itemIds: ["al_heridas_activas", "al_heridas_contenidas", "al_sin_lesiones"],
};

export const bloqueAlIntervencion: Block = {
  id: "bloque_al_intervencion",
  title: "Intervenciones realizadas",
  description: "Medidas terapéuticas adoptadas durante la intervención",
  itemIds: ["al_via_iv", "al_o2", "al_sfv", "al_compresion_herida"],
};

/** Bloque condicional: emerge cuando el mecanismo implica ingesta de sustancias */
export const bloqueAlIntoxicacion: Block = {
  id: "bloque_al_intoxicacion",
  title: "Manejo de la intoxicación",
  description: "Medidas específicas ante intoxicación por ingesta de sustancias",
  itemIds: ["al_carbon_activado", "al_flumazenil", "al_naloxona"],
};

// ─────────────────────────────────────────────────────────────
// BLOQUES — TRAUMA
// ─────────────────────────────────────────────────────────────

export const bloqueTrMecanismo: Block = {
  id: "bloque_tr_mecanismo",
  title: "Mecanismo lesional",
  description: "Mecanismo y tipo de traumatismo",
  itemIds: [
    "tr_mec_trafico",
    "tr_mec_caida",
    "tr_mec_precipitacion",
    "tr_mec_agresion",
    "tr_mec_aplastamiento",
    "tr_mec_arma_blanca",
    "tr_mec_arma_fuego",
    "tr_mec_explosion",
    "tr_mec_quemadura",
    "tr_mec_atropello",
    "tr_mec_sport",
  ],
};

export const bloqueTrXabcde: Block = {
  id: "bloque_tr_xabcde",
  title: "Valoración XABCDE",
  description: "Valoración sistematizada de hemorragia, vía aérea, ventilación y circulación",
  itemIds: [
    "tr_x_sin_hemorragia",
    "tr_x_hemorragia",
    "tr_x_compresion",
    "tr_x_tourniquet",
    "tr_x_packing",
    "tr_a_permeable",
    "tr_a_comprometida",
    "tr_a_guedel",
    "tr_a_iot",
    "tr_a_inm_cervical",
    "tr_b_mv_conservado",
    "tr_b_mv_dismn",
    "tr_b_silencio",
    "tr_b_trabajo_resp",
    "tr_b_neumo_sospecha",
    "tr_b_neumo_tension",
    "tr_b_sello",
    "tr_b_descompresion",
    "tr_c_pulso_radial",
    "tr_c_sin_pulso",
    "tr_c_pelvis_inestable",
    "tr_c_cinturon_pelvis",
    "tr_c_sfv",
    "tr_c_via_io",
    "tr_c_via_iv",
  ],
};

export const bloqueTrNeurologico: Block = {
  id: "bloque_tr_neurologico",
  title: "Valoración neurológica (D) y columna",
  description: "Estado neurológico, traumatismo craneoencefálico y columna vertebral",
  itemIds: [
    "tr_d_gcs_15",
    "tr_d_gcs_dismn",
    "tr_d_tce",
    "tr_d_perdida_conc",
    "tr_d_columna_dolor",
    "tr_d_raquis",
  ],
};

export const bloqueTrLesiones: Block = {
  id: "bloque_tr_lesiones",
  title: "Exposición y lesiones (E)",
  description: "Registro de heridas, fracturas e inmovilizaciones por región anatómica",
  itemIds: [
    "tr_e_herida_cabeza",
    "tr_e_herida_cara",
    "tr_e_herida_torax",
    "tr_e_herida_abdomen",
    "tr_e_herida_extrem",
    "tr_e_fractura_mmss",
    "tr_e_fractura_mmii",
    "tr_e_fractura_costal",
    "tr_e_ferula_mmss",
    "tr_e_ferula_mmii",
    "tr_e_tablero",
  ],
};

/** Bloque condicional: emerge cuando se objetiva TCE */
export const bloqueTrTce: Block = {
  id: "bloque_tr_tce",
  title: "Valoración del TCE",
  description: "Clasificación y hallazgos en el traumatismo craneoencefálico",
  itemIds: [
    "tr_tce_leve",
    "tr_tce_moderado",
    "tr_tce_grave",
    "tr_tce_hematoma",
    "tr_tce_otorragia",
    "tr_tce_rinorragia",
    "tr_tce_anisocoria",
    "tr_tce_midriasis",
  ],
};

/** Bloque condicional: emerge cuando el mecanismo incluye quemaduras */
export const bloqueTrQuemaduras: Block = {
  id: "bloque_tr_quemaduras",
  title: "Valoración de quemaduras",
  description: "Grado, extensión y manejo inicial de quemaduras",
  itemIds: [
    "tr_q_1grado",
    "tr_q_2g_sup",
    "tr_q_2g_prof",
    "tr_q_3grado",
    "tr_q_ext_menos9",
    "tr_q_ext_9_18",
    "tr_q_ext_mas18",
    "tr_q_cara",
    "tr_q_via_aerea",
    "tr_q_enfriamiento",
    "tr_q_aposito",
    "tr_q_analgesia",
  ],
};

// ─────────────────────────────────────────────────────────────
// BLOQUES — DIFICULTAD RESPIRATORIA
// ─────────────────────────────────────────────────────────────

export const bloqueDrCaract: Block = {
  id: "bloque_dr_caract",
  title: "Características de la disnea",
  description: "Inicio, intensidad y patrón de la dificultad respiratoria",
  itemIds: [
    "dr_inicio_brusco",
    "dr_inicio_progresivo",
    "dr_disnea_reposo",
    "dr_disnea_esfuerzo",
    "dr_uso_accesorios",
    "dr_tiraje",
    "dr_cianosis",
    "dr_ortopnea",
    "dr_posicion_fowler",
  ],
};

export const bloqueDrAntecedentes: Block = {
  id: "bloque_dr_antecedentes",
  title: "Antecedentes respiratorios y cardíacos",
  description: "Antecedentes relevantes para la orientación de la disnea",
  itemIds: ["dr_antec_asma", "dr_antec_icc", "dr_antec_ninguno"],
};

export const bloqueDrAuscultacion: Block = {
  id: "bloque_dr_auscultacion",
  title: "Auscultación pulmonar",
  description: "Hallazgos a la auscultación pulmonar",
  itemIds: [
    "dr_mv_conservado",
    "dr_mv_dismn_bil",
    "dr_mv_dismn_der",
    "dr_mv_dismn_izq",
    "dr_sibilancias_bil",
    "dr_sibilancias_espit",
    "dr_crepitantes_bil",
    "dr_crepitantes_bases",
    "dr_silencio",
    "dr_roncos",
    "dr_stridor",
  ],
};

export const bloqueDrIntervencion: Block = {
  id: "bloque_dr_intervencion",
  title: "Intervenciones realizadas",
  description: "Medidas terapéuticas adoptadas durante la intervención",
  itemIds: [
    "dr_o2_gafas",
    "dr_o2_mascarilla",
    "dr_o2_reservorio",
    "dr_vni",
    "dr_iot",
    "dr_via_periferica",
    "dr_salbutamol_inh",
    "dr_ipratropio",
    "dr_corticoides",
    "dr_furosemida",
    "dr_nitratos",
    "dr_morfina",
  ],
};

// ─────────────────────────────────────────────────────────────
// BLOQUES — OTROS
// ─────────────────────────────────────────────────────────────

export const bloqueOtMotivo: Block = {
  id: "bloque_ot_motivo",
  title: "Motivo de consulta y hallazgos",
  description: "Referencia del motivo de consulta y hallazgos objetivados",
  itemIds: [
    "ot_malestar_general",
    "ot_dolor_no_filiado",
    "ot_sintomas_varios",
    "ot_sin_motivo_claro",
  ],
};

export const bloqueOtIntervencion: Block = {
  id: "bloque_ot_intervencion",
  title: "Intervenciones realizadas",
  description: "Actuaciones realizadas durante la intervención",
  itemIds: [
    "ot_monitor",
    "ot_ecg",
    "ot_glucemia",
    "ot_via_periferica",
    "ot_o2",
    "ot_analgesia",
    "ot_antieméticos",
  ],
};

// ─────────────────────────────────────────────────────────────
// BLOQUE REUSABLE — PROCEDIMIENTOS DE EMERGENCIA
// Disponible en todos los motivos de activación.
// Recoge los procedimientos básicos que pueden realizarse en
// cualquier intervención de emergencias.
// ─────────────────────────────────────────────────────────────

export const bloqueIntervencionBasica: Block = {
  id: "bloque_intervencion_basica",
  title: "Procedimientos de emergencia",
  description: "Procedimientos e intervenciones básicas realizados durante la actuación",
  reusable: true,
  itemIds: [
    "com_int_monitor",
    "com_int_ecg_12d",
    "com_int_via_periferica",
    "com_int_via_io",
    "com_int_iot",
    "com_int_aspiracion",
    "com_int_cricotiroidotomia",
    "com_int_hemostasia",
    "com_int_torniquete",
    "com_int_parche_torax",
    "com_int_toracocentesis",
    "com_int_inmovilizacion",
    "com_int_ferula",
    "com_int_cura_ssf",
    "com_int_lavado_gastrico",
    "com_int_carbon_activado",
    "com_int_medicacion",
  ],
};

// ─────────────────────────────────────────────────────────────
// MAPA GLOBAL de bloques para acceso O(1)
// ─────────────────────────────────────────────────────────────

export const allBlocks: Block[] = [
  // Comunes
  bloqueSeguridad,
  bloqueLlegada,
  bloqueFamiliares,
  bloquePertenencias,
  bloqueIdentificacion,
  bloqueConstantes,
  bloqueColaboracion,
  bloqueTraslado,

  // Dolor torácico
  bloqueDtCaracterizacion,
  bloqueDtTiempo,
  bloqueDtSintomas,
  bloqueDtPerfusion,
  bloqueDtRespiratorio,
  bloqueDtEcgBasico,
  bloqueDtEcgAlteraciones,
  bloqueDtIntervencion,
  bloqueDtHemodinamico,

  // Convulsiones
  bloqueCvLlegada,
  bloqueCvActividad,
  bloqueCvConciencia,
  bloqueCvPupilas,
  bloqueCvGlucemia,
  bloqueCvEcg,
  bloqueCvEcgDetallado,
  bloqueCvFocalidad,
  bloqueCvPostcritico,
  bloqueCvStatus,
  bloqueCvIntervencion,

  // Síncope
  bloqueScPreevento,
  bloqueScPtc,
  bloqueScRecuperacion,
  bloqueScEstado,
  bloqueScTraumatismo,
  bloqueScGlucemia,
  bloqueScEcg,
  bloqueScEcgDetallado,
  bloqueScIntervencion,

  // PCR
  bloquePcrSituacion,
  bloquePcrAbc,
  bloquePcrRitmo,
  bloquePcrManiobras,
  bloquePcrDesfibrilacion,
  bloquePcrTiempos,
  bloquePcrRespuesta,
  bloquePcrPostRosc,

  // Parto
  bloquePtMaterna,
  bloquePtDinamica,
  bloquePtBolsa,
  bloquePtSangrado,
  bloquePtPresentacion,
  bloquePtExpulsivo,
  bloquePtRn,
  bloquePtAlumbramiento,
  bloquePtVigilancia,
  bloquePtHemorragia,

  // Procedimientos de emergencia (reusable)
  bloqueIntervencionBasica,

  // Escalas y códigos (reusables)
  bloqueCodeActivacion,
  bloqueQsofa,
  bloqueMadridDirect,

  // Ictus
  bloqueIcTiempo,
  bloqueIcFocalidad,
  bloqueIcConciencia,
  bloqueIcAntecedentes,
  bloqueIcIntervencion,

  // Psiquiátrico / Agresivo
  bloquePsiSituacion,
  bloquePsiAntecedentes,
  bloquePsiContencion,

  // Intento autolítico
  bloqueAlMecanismo,
  bloqueAlCircunstancias,
  bloqueAlLesiones,
  bloqueAlIntervencion,
  bloqueAlIntoxicacion,

  // Trauma
  bloqueTrMecanismo,
  bloqueTrXabcde,
  bloqueTrNeurologico,
  bloqueTrLesiones,
  bloqueTrTce,
  bloqueTrQuemaduras,

  // Dificultad respiratoria
  bloqueDrCaract,
  bloqueDrAntecedentes,
  bloqueDrAuscultacion,
  bloqueDrIntervencion,

  // Otros
  bloqueOtMotivo,
  bloqueOtIntervencion,
];

export const blocksMap: Map<string, Block> = new Map(allBlocks.map((block) => [block.id, block]));
