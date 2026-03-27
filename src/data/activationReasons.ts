/**
 * Motivos de activación del recurso.
 *
 * Cada motivo es el nodo raíz de un árbol lógico de valoración clínica.
 * NO representa un diagnóstico. Define:
 *  - una frase de apertura objetiva del informe
 *  - los bloques comunes siempre visibles
 *  - los bloques específicos del motivo
 *  - las ramas condicionales que amplían la valoración
 *    según los hallazgos objetivados por el profesional
 */

import type { ActivationReason } from "@/types/clinicalTree";

export const activationReasons: ActivationReason[] = [
  // ─────────────────────────────────────────────────────────────
  // DOLOR TORÁCICO
  // ─────────────────────────────────────────────────────────────
  {
    id: "dolor_toracico",
    label: "Dolor torácico",
    description: "Dolor en región torácica de cualquier carácter",
    accentColor: "#c0392b",
    openingText: "Se activa el recurso ante paciente que refiere dolor torácico.",

    commonBlockIds: [
      "bloque_identificacion",
      "bloque_seguridad",
      "bloque_llegada",
      "bloque_familiares",
      "bloque_constantes",
      "bloque_colaboracion",
    ],

    specificBlockIds: [
      "bloque_dt_caract",
      "bloque_dt_tiempo",
      "bloque_dt_sintomas",
      "bloque_dt_perfusion",
      "bloque_dt_respiratorio",
      "bloque_dt_ecg_basico",
      "bloque_dt_intervencion",
      "bloque_intervencion_basica",
      "bloque_pertenencias",
      "bloque_traslado",
    ],

    conditionalBranches: [
      {
        // Alteraciones electrocardiográficas objetivadas → mostrar bloque detallado
        id: "branch_dt_ecg_alt",
        whenAnyItemSelected: ["dt_ecg_alt"],
        showBlockIds: ["bloque_dt_ecg_alt"],
        insertAfterBlockId: "bloque_dt_ecg_basico",
      },
      {
        // Compromiso hemodinámico → mostrar manejo avanzado
        id: "branch_dt_inestabilidad",
        whenAnyItemSelected: ["cst_hipotenso", "dt_perf_comprometida", "dt_rc_prolongado"],
        showBlockIds: ["bloque_dt_hemodinamico"],
        insertAfterBlockId: "bloque_dt_perfusion",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CONVULSIONES
  // ─────────────────────────────────────────────────────────────
  {
    id: "convulsiones",
    label: "Convulsiones",
    description: "Episodio convulsivo en curso o referido por testigos",
    accentColor: "#8e44ad",
    openingText: "Se activa el recurso ante episodio convulsivo en curso o referido por testigos.",

    commonBlockIds: [
      "bloque_identificacion",
      "bloque_seguridad",
      "bloque_llegada",
      "bloque_familiares",
      "bloque_constantes",
      "bloque_colaboracion",
    ],

    specificBlockIds: [
      "bloque_cv_llegada",
      "bloque_cv_actividad",
      "bloque_cv_conciencia",
      "bloque_cv_pupilas",
      "bloque_cv_ecg",
      "bloque_cv_intervencion",
      "bloque_intervencion_basica",
      "bloque_pertenencias",
      "bloque_traslado",
    ],

    conditionalBranches: [
      {
        // Disminución del nivel de conciencia → mostrar bloque poscrítico
        id: "branch_cv_postcritico",
        whenAnyItemSelected: [
          "cv_cede",
          "cv_postcritico",
          "cv_gcs_disminuido",
          "cv_pc_confuso",
          "cv_pc_somnoliento",
          "cv_rec_progresiva",
          "cv_no_recuperacion",
        ],
        showBlockIds: ["bloque_cv_postcritico"],
        insertAfterBlockId: "bloque_cv_conciencia",
      },
      {
        // Hallazgos de focalidad neurológica → mostrar bloque de focalidad
        id: "branch_cv_focalidad",
        whenAnyItemSelected: [
          "cv_hemiparesia_d",
          "cv_hemiparesia_i",
          "cv_desv_comisura",
          "cv_disartria",
          "cv_afasia",
          "cv_anisocoria",
          "cv_arreactivas",
        ],
        showBlockIds: ["bloque_cv_focalidad"],
        insertAfterBlockId: "bloque_cv_pupilas",
      },
      {
        // Alteraciones electrocardiográficas objetivadas → mostrar bloque detallado
        id: "branch_cv_ecg_alt",
        whenAnyItemSelected: ["cv_ecg_alt"],
        showBlockIds: ["bloque_cv_ecg_detallado"],
        insertAfterBlockId: "bloque_cv_ecg",
      },
      {
        // Actividad prolongada o no respuesta → mostrar manejo de status
        id: "branch_cv_status",
        whenAnyItemSelected: ["cv_dur_status", "cv_no_cede_tto"],
        showBlockIds: ["bloque_cv_status"],
        insertAfterBlockId: "bloque_cv_intervencion",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // SÍNCOPE
  // ─────────────────────────────────────────────────────────────
  {
    id: "sincope",
    label: "Síncope / PTC",
    description: "Pérdida transitoria de conciencia referida o presenciada",
    accentColor: "#2980b9",
    openingText:
      "Se activa el recurso ante pérdida transitoria de conciencia referida por el paciente o confirmada por testigos presenciales.",

    commonBlockIds: [
      "bloque_identificacion",
      "bloque_seguridad",
      "bloque_llegada",
      "bloque_familiares",
      "bloque_constantes",
      "bloque_colaboracion",
    ],

    specificBlockIds: [
      "bloque_sc_preevento",
      "bloque_sc_ptc",
      "bloque_sc_recuperacion",
      "bloque_sc_estado",
      "bloque_sc_ecg",
      "bloque_sc_intervencion",
      "bloque_intervencion_basica",
      "bloque_pertenencias",
      "bloque_traslado",
    ],

    conditionalBranches: [
      {
        // Caída con traumatismo → mostrar valoración del traumatismo
        id: "branch_sc_traumatismo",
        whenAnyItemSelected: ["sc_caida_con_lesion"],
        showBlockIds: ["bloque_sc_traumatismo"],
        insertAfterBlockId: "bloque_sc_ptc",
      },
      {
        // Alteraciones ECG o contexto sugerente → mostrar bloque detallado
        id: "branch_sc_ecg_patologico",
        whenAnyItemSelected: ["sc_ecg_alt", "sc_palpitaciones_prev", "sc_dolor_torac_prev"],
        showBlockIds: ["bloque_sc_ecg_detallado"],
        insertAfterBlockId: "bloque_sc_ecg",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // PCR — PARADA CARDIORRESPIRATORIA
  // ─────────────────────────────────────────────────────────────
  {
    id: "pcr",
    label: "PCR",
    description: "Parada cardiorrespiratoria objetivada o sospechada",
    accentColor: "#e74c3c",
    openingText: "Se activa el recurso ante sospecha de parada cardiorrespiratoria.",

    commonBlockIds: [
      "bloque_identificacion",
      "bloque_seguridad",
      "bloque_llegada",
      "bloque_familiares",
    ],

    specificBlockIds: [
      "bloque_pcr_situacion",
      "bloque_pcr_abc",
      "bloque_pcr_ritmo",
      "bloque_pcr_maniobras",
      "bloque_pcr_tiempos",
      "bloque_pcr_respuesta",
      "bloque_intervencion_basica",
      "bloque_pertenencias",
      "bloque_traslado",
    ],

    conditionalBranches: [
      {
        // Ritmo desfibrilable objetivado → mostrar bloque de desfibrilación
        id: "branch_pcr_desfibrilable",
        whenAnyItemSelected: ["pcr_fv", "pcr_tvsp"],
        showBlockIds: ["bloque_pcr_desfibrilacion"],
        insertAfterBlockId: "bloque_pcr_ritmo",
      },
      {
        // ROSC conseguido → mostrar manejo post-ROSC
        id: "branch_pcr_rosc",
        whenAnyItemSelected: ["pcr_rosc"],
        showBlockIds: ["bloque_pcr_post_rosc"],
        insertAfterBlockId: "bloque_pcr_respuesta",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // PARTO / URGENCIA OBSTÉTRICA
  // ─────────────────────────────────────────────────────────────
  {
    id: "parto",
    label: "Parto",
    description: "Parto extrahospitalario o urgencia obstétrica",
    accentColor: "#27ae60",
    openingText: "Se activa el recurso ante situación de parto extrahospitalario.",

    commonBlockIds: [
      "bloque_identificacion",
      "bloque_seguridad",
      "bloque_llegada",
      "bloque_familiares",
      "bloque_constantes",
      "bloque_colaboracion",
    ],

    specificBlockIds: [
      "bloque_pt_materna",
      "bloque_pt_dinamica",
      "bloque_pt_bolsa",
      "bloque_pt_sangrado",
      "bloque_pt_presentacion",
      "bloque_pt_alumbramiento",
      "bloque_pt_vigilancia",
      "bloque_intervencion_basica",
      "bloque_pertenencias",
      "bloque_traslado",
    ],

    conditionalBranches: [
      {
        // Coronación o expulsivo inminente → mostrar bloque de expulsivo
        id: "branch_pt_expulsivo",
        whenAnyItemSelected: ["pt_coronacion", "pt_expulsivo_inmin"],
        showBlockIds: ["bloque_pt_expulsivo"],
        insertAfterBlockId: "bloque_pt_presentacion",
      },
      {
        // Nacimiento completado → mostrar valoración del RN
        id: "branch_pt_rn",
        whenAnyItemSelected: ["pt_nac_completo"],
        showBlockIds: ["bloque_pt_rn"],
        insertAfterBlockId: "bloque_pt_alumbramiento",
      },
      {
        // Hemorragia posparto significativa → mostrar manejo hemorrágico
        id: "branch_pt_hemorragia",
        whenAnyItemSelected: ["pt_sang_posparto", "pt_utero_atonico"],
        showBlockIds: ["bloque_pt_hemorragia"],
        insertAfterBlockId: "bloque_pt_sangrado",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // POSIBLE ICTUS
  // ─────────────────────────────────────────────────────────────
  {
    id: "ictus",
    label: "Posible ictus",
    description: "Déficit neurológico focal de inicio agudo",
    accentColor: "#d35400",
    openingText:
      "Se activa el recurso ante paciente con déficit neurológico focal de inicio agudo compatible con posible ictus.",

    commonBlockIds: [
      "bloque_identificacion",
      "bloque_seguridad",
      "bloque_llegada",
      "bloque_familiares",
      "bloque_constantes",
      "bloque_colaboracion",
    ],

    specificBlockIds: [
      "bloque_ic_tiempo",
      "bloque_ic_focalidad",
      "bloque_ic_conciencia",
      "bloque_ic_antecedentes",
      "bloque_ic_intervencion",
      "bloque_madrid_direct",
      "bloque_qsofa",
      "bloque_codigos",
      "bloque_intervencion_basica",
      "bloque_pertenencias",
      "bloque_traslado",
    ],

    conditionalBranches: [
      {
        // Nivel de conciencia disminuido → ampliar valoración neurológica
        id: "branch_ic_conciencia_dismn",
        whenAnyItemSelected: ["ic_consciencia_disminuida", "ic_gcs_disminuido"],
        showBlockIds: ["bloque_cv_conciencia", "bloque_cv_pupilas"],
        insertAfterBlockId: "bloque_ic_conciencia",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // PSIQUIÁTRICO / AGRESIVO
  // ─────────────────────────────────────────────────────────────
  {
    id: "psiquiatrico_agresivo",
    label: "Psiquiátrico / Agresivo",
    description: "Alteración del comportamiento, agitación o conducta agresiva",
    accentColor: "#6c3483",
    openingText:
      "Se activa el recurso ante paciente con alteración del comportamiento, agitación psicomotriz o conducta agresiva.",

    commonBlockIds: [
      "bloque_identificacion",
      "bloque_seguridad",
      "bloque_llegada",
      "bloque_familiares",
      "bloque_constantes",
      "bloque_colaboracion",
    ],

    specificBlockIds: [
      "bloque_psi_situacion",
      "bloque_psi_antecedentes",
      "bloque_psi_contencion",
      "bloque_qsofa",
      "bloque_intervencion_basica",
      "bloque_pertenencias",
      "bloque_traslado",
    ],

    conditionalBranches: [
      {
        // Ideación suicida o conducta autoagresiva → valoración de riesgo autolítico
        id: "branch_psi_autolitico",
        whenAnyItemSelected: ["psi_ideacion_suicida", "psi_autoagresivo"],
        showBlockIds: ["bloque_al_mecanismo", "bloque_al_lesiones"],
        insertAfterBlockId: "bloque_psi_situacion",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // INTENTO AUTOLÍTICO
  // ─────────────────────────────────────────────────────────────
  {
    id: "intento_autolitico",
    label: "Intento autolítico",
    description: "Autolesión intencionada de cualquier mecanismo",
    accentColor: "#784212",
    openingText:
      "Se activa el recurso ante paciente con intento autolítico referido o confirmado por testigos.",

    commonBlockIds: [
      "bloque_identificacion",
      "bloque_seguridad",
      "bloque_llegada",
      "bloque_familiares",
      "bloque_constantes",
      "bloque_colaboracion",
    ],

    specificBlockIds: [
      "bloque_al_mecanismo",
      "bloque_al_circunstancias",
      "bloque_al_lesiones",
      "bloque_al_intervencion",
      "bloque_intervencion_basica",
      "bloque_pertenencias",
      "bloque_traslado",
    ],

    conditionalBranches: [
      {
        // Ingesta de sustancias → manejo de intoxicación
        id: "branch_al_intoxicacion",
        whenAnyItemSelected: [
          "al_mec_medicamentos",
          "al_mec_toxicos",
          "al_mec_alcohol",
          "al_mec_ahogamiento",
        ],
        showBlockIds: ["bloque_al_intoxicacion"],
        insertAfterBlockId: "bloque_al_mecanismo",
      },
      {
        // Precipitación o atropello → valoración traumática
        id: "branch_al_trauma",
        whenAnyItemSelected: ["al_mec_precipitacion", "al_mec_atropello"],
        showBlockIds: ["bloque_tr_xabcde", "bloque_tr_neurologico", "bloque_tr_lesiones"],
        insertAfterBlockId: "bloque_al_lesiones",
      },
      {
        // Ahorcamiento → valoración vía aérea y neurológica
        id: "branch_al_ahorcamiento",
        whenAnyItemSelected: ["al_mec_ahorcamiento"],
        showBlockIds: ["bloque_cv_conciencia", "bloque_cv_pupilas"],
        insertAfterBlockId: "bloque_al_lesiones",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // TRAUMA
  // ─────────────────────────────────────────────────────────────
  {
    id: "trauma",
    label: "Trauma",
    description:
      "Traumatismo de cualquier mecanismo: tráfico, precipitación, agresión, quemaduras…",
    accentColor: "#b7950b",
    openingText:
      "Se activa el recurso ante paciente politraumatizado o con traumatismo de mecanismo significativo.",

    commonBlockIds: [
      "bloque_identificacion",
      "bloque_seguridad",
      "bloque_llegada",
      "bloque_familiares",
      "bloque_constantes",
      "bloque_colaboracion",
    ],

    specificBlockIds: [
      "bloque_tr_mecanismo",
      "bloque_tr_xabcde",
      "bloque_tr_neurologico",
      "bloque_tr_lesiones",
      "bloque_codigos",
      "bloque_intervencion_basica",
      "bloque_pertenencias",
      "bloque_traslado",
    ],

    conditionalBranches: [
      {
        // TCE objetivado → valoración detallada del TCE
        id: "branch_tr_tce",
        whenAnyItemSelected: ["tr_d_tce", "tr_d_perdida_conc", "tr_d_gcs_dismn"],
        showBlockIds: ["bloque_tr_tce"],
        insertAfterBlockId: "bloque_tr_neurologico",
      },
      {
        // Quemaduras en el mecanismo → valoración específica
        id: "branch_tr_quemaduras",
        whenAnyItemSelected: ["tr_mec_quemadura"],
        showBlockIds: ["bloque_tr_quemaduras"],
        insertAfterBlockId: "bloque_tr_mecanismo",
      },
      {
        // Inestabilidad hemodinámica → manejo avanzado circulatorio
        id: "branch_tr_hemodinamico",
        whenAnyItemSelected: ["cst_hipotenso", "tr_c_sin_pulso", "tr_x_hemorragia"],
        showBlockIds: ["bloque_dt_hemodinamico"],
        insertAfterBlockId: "bloque_tr_xabcde",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // DIFICULTAD RESPIRATORIA
  // ─────────────────────────────────────────────────────────────
  {
    id: "dificultad_respiratoria",
    label: "Dificultad respiratoria",
    description: "Disnea aguda de cualquier causa",
    accentColor: "#1a5276",
    openingText: "Se activa el recurso ante paciente con dificultad respiratoria aguda.",

    commonBlockIds: [
      "bloque_identificacion",
      "bloque_seguridad",
      "bloque_llegada",
      "bloque_familiares",
      "bloque_constantes",
      "bloque_colaboracion",
    ],

    specificBlockIds: [
      "bloque_dr_caract",
      "bloque_dr_antecedentes",
      "bloque_dr_auscultacion",
      "bloque_dr_intervencion",
      "bloque_qsofa",
      "bloque_codigos",
      "bloque_intervencion_basica",
      "bloque_pertenencias",
      "bloque_traslado",
    ],

    conditionalBranches: [
      {
        // Broncoespasmo o sibilancias → profundizar en manejo broncoespasmo
        id: "branch_dr_broncoespasmo",
        whenAnyItemSelected: ["dr_sibilancias_bil", "dr_sibilancias_espit", "dr_antec_asma"],
        showBlockIds: [],
        insertAfterBlockId: "bloque_dr_auscultacion",
      },
      {
        // Hipoxemia grave, silencio o VNI/IOT → reforzar con bloque hemodinámico adicional
        id: "branch_dr_grave",
        whenAnyItemSelected: ["cst_desaturando", "dr_silencio", "dr_iot", "dr_vni"],
        showBlockIds: ["bloque_dt_hemodinamico"],
        insertAfterBlockId: "bloque_dr_intervencion",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // OTROS
  // ─────────────────────────────────────────────────────────────
  {
    id: "otros",
    label: "Otros",
    description: "Motivo de consulta no encuadrable en categorías específicas",
    accentColor: "#5d6d7e",
    openingText:
      "Se activa el recurso por motivo de consulta no encuadrable en categoría específica de activación.",

    commonBlockIds: [
      "bloque_identificacion",
      "bloque_seguridad",
      "bloque_llegada",
      "bloque_familiares",
      "bloque_constantes",
      "bloque_colaboracion",
    ],

    specificBlockIds: [
      "bloque_ot_motivo",
      "bloque_ot_intervencion",
      "bloque_qsofa",
      "bloque_intervencion_basica",
      "bloque_pertenencias",
      "bloque_traslado",
    ],

    conditionalBranches: [],
  },
];

/** Map para acceso O(1) por ID de motivo */
export const activationReasonsMap: Map<string, ActivationReason> = new Map(
  activationReasons.map((r) => [r.id, r]),
);
