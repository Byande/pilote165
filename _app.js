/* ============================================================
   PILOTE 165 — données de démonstration (programme Alliou, 165 ha)
   Toutes les valeurs sont des hypothèses de travail, en GNF.
   ============================================================ */
'use strict';
const SUPA = { url: 'https://opbxmnrtbzsxgwtfeemv.supabase.co', key: 'sb_publishable_UhCNYCizOEoofZ7_BiVs9g_7Z0wElT8', bucket: 'p165-photos', programme: 'alliou165' };
const URL_PUBLIQUE = 'https://byande.github.io/pilote165/';
const TAUX_EUR = 10000; // 1 € ≈ 10 000 GNF (indicatif, modifiable dans Paramètres)

const IMG = {
  aerien: '{{IMG:site_aerien.jpg}}',
  quartier: '{{IMG:cible_quartier.jpg}}',
  logement: '{{IMG:cible_logement.jpg}}',
  prefab: '{{IMG:chantier_prefab.jpg}}',
  controle: '{{IMG:chantier_controle.jpg}}',
  refs: {
    codes: '{{IMG:ref-codes-rousseau.jpg}}', atlantique: '{{IMG:ref-atlantique.jpg}}', framatome: '{{IMG:ref-framatome.jpg}}',
    gong: '{{IMG:ref-gong-sup.jpg}}', wevan: '{{IMG:ref-wevan.jpg}}', millet: '{{IMG:ref-millet.jpg}}', yaskawa: '{{IMG:ref-yaskawa.jpg}}', alliance: '{{IMG:ref-france-alliance.jpg}}'
  }
};

const PROG = {
  nom: 'Programme Alliou — 165 ha', mo: 'M. Alliou (maître d\'ouvrage)', pilote: 'LevENT-IT — Dr Paul Mirabeau Byande', archi: 'T-Architectes — Jules Tiobang Tankeu',
  ha: 165, logements: 2000, semaine: 40, semainesTotal: 104,
  ca: 1205, couts: 1007, margeCible: 15, // Md GNF
  typologies: [
    { nom: 'T3 — 60 m²', n: 700, prix: 350, cible: 'Jeunes ménages, fonctionnaires, location-vente' },
    { nom: 'T4 — 85 m²', n: 650, prix: 520, cible: 'Cadres, familles, diaspora' },
    { nom: 'Villa — 120 m²', n: 450, prix: 850, cible: 'Diaspora, professions libérales' },
    { nom: 'Villa — 160 m²', n: 200, prix: 1200, cible: 'Investisseurs, dirigeants' }
  ],
  occupation: [
    { lib: 'Parcelles de logements', ha: 74, c: '#1E3A5F' }, { lib: 'Voirie et réseaux', ha: 33, c: '#6B6B6B' },
    { lib: 'Équipements publics', ha: 25, c: '#C8992A' }, { lib: 'Espaces verts et bassins', ha: 33, c: '#2E7D32' }
  ]
};

const PHASES = [
  { n: 0, nom: 'Foncier et assainissement du site', detail: 'Titre foncier, remblai sable sur 165 ha, drainage primaire, bassin nord', debut: '2023-01', fin: '2025-12', pct: 100 },
  { n: 1, nom: 'Études et plan d\'aménagement', detail: 'Masterplan 4 quartiers, VRD, équipements, permis — T-Architectes', debut: '2025-06', fin: '2026-12', pct: 92 },
  { n: 2, nom: 'Viabilisation VRD', detail: 'Voirie primaire, eau (forage + château), électricité, assainissement', debut: '2025-11', fin: '2027-03', pct: 48 },
  { n: 3, nom: 'Construction par tranches', detail: 'Tranche 1 (480) en cours · Tranches 2 à 4 : 2027 → 2030', debut: '2026-01', fin: '2030-06', pct: 9 },
  { n: 4, nom: 'Commercialisation', detail: 'Pré-ventes, accords bancaires, diaspora, location-vente', debut: '2026-01', fin: '2030-12', pct: 11 },
  { n: 5, nom: 'Livraison et exploitation', detail: 'Réceptions, remise des clés, gestion de quartier, syndic', debut: '2027-01', fin: '2031-06', pct: 2 },
  { n: 6, nom: 'Maintenance et garanties', detail: 'Garantie décennale, maintenance réseaux, service après-vente 10 ans', debut: '2027-01', fin: '2037-12', pct: 0 }
];

const QUARTIERS = [
  { id: 'Q1', nom: 'Les Palétuviers', tranche: 1, logements: 480, etat: 'Chantier en cours', pct: 34, x: 60, y: 300, w: 420, h: 280, c: '#C8992A' },
  { id: 'Q2', nom: 'Les Manguiers', tranche: 2, logements: 560, etat: 'Études d\'exécution', pct: 0, x: 60, y: 40, w: 420, h: 230, c: '#9FB3CF' },
  { id: 'Q3', nom: 'Les Fromagers', tranche: 3, logements: 520, etat: 'Programmé 2028', pct: 0, x: 560, y: 40, w: 380, h: 230, c: '#B9C7DD' },
  { id: 'Q4', nom: 'Les Kapokiers', tranche: 4, logements: 440, etat: 'Programmé 2029', pct: 0, x: 560, y: 300, w: 380, h: 280, c: '#CBD5E5' }
];
const EQUIPEMENTS = [
  { nom: 'Marché couvert', x: 500, y: 150, ic: 'M' }, { nom: 'École primaire 1', x: 300, y: 280, ic: 'É' }, { nom: 'École primaire 2', x: 740, y: 280, ic: 'É' },
  { nom: 'Collège', x: 500, y: 450, ic: 'C' }, { nom: 'Centre de santé', x: 500, y: 290, ic: '+' }, { nom: 'Mosquée', x: 500, y: 60, ic: '☾' },
  { nom: 'Parc et terrains de sport', x: 300, y: 590, ic: 'P' }, { nom: 'Château d\'eau + forages', x: 60, y: 10, ic: 'E' }, { nom: 'Poste électrique', x: 940, y: 10, ic: 'kV' },
  { nom: 'Bassin de rétention nord', x: 500, y: 10, ic: '≈' }, { nom: 'Centre commercial', x: 740, y: 590, ic: '$' }, { nom: 'Base vie + stockage', x: 60, y: 590, ic: 'B' }
];
// Îlots de la tranche 1 (Q1) : 12 îlots de 40 logements
const ILOTS = [
  { id: 'A1', lgt: 40, etape: 'Réceptionné', pct: 100, type: 'T3 / T4' }, { id: 'A2', lgt: 40, etape: 'Second œuvre', pct: 85, type: 'T3' },
  { id: 'A3', lgt: 40, etape: 'Second œuvre', pct: 70, type: 'T4' }, { id: 'A4', lgt: 40, etape: 'Gros œuvre', pct: 55, type: 'T3 / T4' },
  { id: 'A5', lgt: 40, etape: 'Gros œuvre', pct: 40, type: 'Villa 120' }, { id: 'A6', lgt: 40, etape: 'Fondations', pct: 25, type: 'T4' },
  { id: 'A7', lgt: 40, etape: 'Fondations', pct: 15, type: 'T3' }, { id: 'A8', lgt: 40, etape: 'Terrassement', pct: 8, type: 'Villa 120' },
  { id: 'A9', lgt: 40, etape: 'À démarrer', pct: 0, type: 'T3' }, { id: 'A10', lgt: 40, etape: 'À démarrer', pct: 0, type: 'T4' },
  { id: 'A11', lgt: 40, etape: 'À démarrer', pct: 0, type: 'Villa 160' }, { id: 'A12', lgt: 40, etape: 'À démarrer', pct: 0, type: 'Villa 120' }
];

const AGENTS = [
  { id: 'a01', nom: 'Mamadou Diallo', role: 'Chef de chantier', equipe: 'Direction', sal: 250000, tel: '+224 62x xx xx 01' },
  { id: 'a02', nom: 'Aïssatou Bah', role: 'Contrôleuse qualité', equipe: 'Direction', sal: 180000 },
  { id: 'a03', nom: 'Hawa Soumah', role: 'Responsable HSE', equipe: 'Direction', sal: 170000 },
  { id: 'a04', nom: 'Sékou Condé', role: 'Chef d\'équipe gros œuvre', equipe: 'Équipe A — Gros œuvre', sal: 150000 },
  { id: 'a05', nom: 'Ibrahima Sow', role: 'Maçon', equipe: 'Équipe A — Gros œuvre', sal: 95000 },
  { id: 'a06', nom: 'Alpha Keïta', role: 'Maçon', equipe: 'Équipe A — Gros œuvre', sal: 95000 },
  { id: 'a07', nom: 'Moussa Bangoura', role: 'Ferrailleur', equipe: 'Équipe A — Gros œuvre', sal: 100000 },
  { id: 'a08', nom: 'Lansana Kourouma', role: 'Coffreur', equipe: 'Équipe A — Gros œuvre', sal: 100000 },
  { id: 'a09', nom: 'Fodé Yansané', role: 'Manœuvre', equipe: 'Équipe A — Gros œuvre', sal: 60000 },
  { id: 'a10', nom: 'Saïdou Diallo', role: 'Manœuvre', equipe: 'Équipe A — Gros œuvre', sal: 60000 },
  { id: 'a11', nom: 'Abdoulaye Baldé', role: 'Chef d\'équipe VRD', equipe: 'Équipe B — VRD', sal: 150000 },
  { id: 'a12', nom: 'Ousmane Touré', role: 'Conducteur d\'engin', equipe: 'Équipe B — VRD', sal: 130000 },
  { id: 'a13', nom: 'Mohamed Sylla', role: 'Topographe', equipe: 'Équipe B — VRD', sal: 140000 },
  { id: 'a14', nom: 'Kadiatou Barry', role: 'Électricienne', equipe: 'Équipe C — Second œuvre', sal: 110000 },
  { id: 'a15', nom: 'Mariama Cissé', role: 'Plombière', equipe: 'Équipe C — Second œuvre', sal: 110000 },
  { id: 'a16', nom: 'Fatoumata Camara', role: 'Magasinière', equipe: 'Logistique', sal: 90000 },
  { id: 'a17', nom: 'Nènè Diaby', role: 'Gardienne — poste 1', equipe: 'Sécurité', sal: 55000 },
  { id: 'a18', nom: 'Thierno Camara', role: 'Gardien — poste 2 (nuit)', equipe: 'Sécurité', sal: 55000 }
];
// Présence du jour (démo) : heure d'arrivée, départ éventuel, statut
const PRESENCE_DEMO = {
  a01: { arr: '06:48', dep: null }, a02: { arr: '07:05', dep: null }, a03: { arr: '06:58', dep: null }, a04: { arr: '06:52', dep: null },
  a05: { arr: '07:10', dep: null }, a06: { arr: '07:41', dep: null, retard: true }, a07: { arr: '07:02', dep: null }, a08: { arr: '07:14', dep: null },
  a09: { absent: 'Absence non justifiée' }, a10: { arr: '07:20', dep: null }, a11: { arr: '06:55', dep: null }, a12: { arr: '07:52', dep: null, retard: true },
  a13: { arr: '07:08', dep: null }, a14: { conge: 'Congé annuel 5 → 12 oct.' }, a15: { arr: '07:25', dep: null }, a16: { arr: '06:40', dep: null },
  a17: { arr: '06:00', dep: null }, a18: { arr: '18:00', dep: '06:05', nuit: true }
};
// Paie de septembre (démo) : jours travaillés, retards, absences, acomptes (GNF)
const PAIE_SEPT = {
  a01: [26, 0, 0, 0], a02: [25, 1, 1, 0], a03: [26, 0, 0, 0], a04: [26, 1, 0, 500000], a05: [24, 2, 2, 0], a06: [23, 5, 3, 300000], a07: [25, 1, 1, 0], a08: [26, 0, 0, 0],
  a09: [20, 4, 6, 200000], a10: [25, 2, 1, 0], a11: [26, 0, 0, 0], a12: [24, 4, 2, 0], a13: [25, 0, 1, 0], a14: [22, 0, 4, 0], a15: [26, 1, 0, 0], a16: [26, 0, 0, 0], a17: [30, 0, 0, 0], a18: [30, 0, 0, 150000]
};
const CONGES = [
  { agent: 'a14', type: 'Congé annuel', du: '2026-10-05', au: '2026-10-12', etat: 'En cours', remplacant: 'Sous-traitant Électro-Conakry (2 j)' },
  { agent: 'a05', type: 'Congé annuel', du: '2026-10-19', au: '2026-10-25', etat: 'Validé', remplacant: 'Saïdou Diallo (polyvalence)' },
  { agent: 'a13', type: 'Formation (drone topographique)', du: '2026-10-13', au: '2026-10-14', etat: 'Validé', remplacant: '—' },
  { agent: 'a02', type: 'Congé maladie', du: '2026-09-22', au: '2026-09-23', etat: 'Clos', remplacant: 'Hawa Soumah' },
  { agent: 'a12', type: 'Demande de congé', du: '2026-11-02', au: '2026-11-08', etat: 'À valider', remplacant: 'Aucun conducteur disponible — à traiter' }
];

const FOURNISSEURS = [
  { id: 'f1', nom: 'Ciments de Guinée', ville: 'Conakry', fam: 'Ciment', delai: 3, qualite: 4, prix: 3, livraisons: 9, retards: 2, encours: 4.8 },
  { id: 'f2', nom: 'SOGEA Aciers Guinée', ville: 'Conakry', fam: 'Fer à béton', delai: 4, qualite: 4, prix: 3, livraisons: 6, retards: 0, encours: 6.1 },
  { id: 'f3', nom: 'Carrière de Maneah', ville: 'Maneah', fam: 'Sable, gravier', delai: 5, qualite: 4, prix: 4, livraisons: 22, retards: 1, encours: 1.9 },
  { id: 'f4', nom: 'Préfab Afrique', ville: 'Dubréka', fam: 'Panneaux préfabriqués', delai: 4, qualite: 5, prix: 3, livraisons: 5, retards: 0, encours: 9.4 },
  { id: 'f5', nom: 'SOGUIPLAST', ville: 'Conakry', fam: 'Tuyaux PVC, réseaux', delai: 3, qualite: 4, prix: 4, livraisons: 7, retards: 2, encours: 2.2 },
  { id: 'f6', nom: 'Électro-Conakry Distribution', ville: 'Conakry', fam: 'Matériel électrique', delai: 4, qualite: 4, prix: 3, livraisons: 4, retards: 0, encours: 1.4 },
  { id: 'f7', nom: 'Bois & Coffrage Kindia', ville: 'Kindia', fam: 'Bois de coffrage', delai: 3, qualite: 3, prix: 5, livraisons: 8, retards: 3, encours: 0.8 }
];
// Commandes : jours relatifs à aujourd'hui pour la date prévue ; montants en M GNF
const COMMANDES = [
  { no: 'BC-2026-118', four: 'f1', art: 'Ciment CEM II 42,5 — 1 200 sacs', qte: '60 t', montant: 780, prevu: 2, etat: 'En transit', zone: 'Îlots A5-A6' },
  { no: 'BC-2026-121', four: 'f2', art: 'Fer à béton HA 12 / HA 16', qte: '38 t', montant: 1420, prevu: 5, etat: 'Confirmée', zone: 'Îlots A6-A7' },
  { no: 'BC-2026-115', four: 'f3', art: 'Sable de rivière lavé', qte: '420 m³', montant: 210, prevu: -1, etat: 'Livrée', zone: 'Centrale béton' },
  { no: 'BC-2026-109', four: 'f4', art: 'Panneaux préfabriqués façade — lot 3', qte: '96 panneaux', montant: 2650, prevu: -3, etat: 'Livrée', zone: 'Îlot A4' },
  { no: 'BC-2026-123', four: 'f4', art: 'Panneaux préfabriqués façade — lot 4', qte: '96 panneaux', montant: 2650, prevu: 9, etat: 'Confirmée', zone: 'Îlot A5' },
  { no: 'BC-2026-112', four: 'f5', art: 'Tuyaux PVC Ø200 assainissement', qte: '1 800 m', montant: 460, prevu: -4, etat: 'Retard', retardJ: 4, zone: 'Voirie V2' },
  { no: 'BC-2026-124', four: 'f6', art: 'Tableaux et câbles — îlots A2-A3', qte: '80 lgts', montant: 380, prevu: 7, etat: 'Confirmée', zone: 'Îlots A2-A3' },
  { no: 'BC-2026-119', four: 'f7', art: 'Bois de coffrage', qte: '35 m³', montant: 95, prevu: 1, etat: 'En transit', zone: 'Îlot A6' },
  { no: 'BC-2026-125', four: 'f3', art: 'Gravier concassé 5/15', qte: '600 m³', montant: 330, prevu: 4, etat: 'Confirmée', zone: 'Centrale béton' },
  { no: 'BC-2026-126', four: 'f1', art: 'Ciment CEM II 42,5 — 1 200 sacs', qte: '60 t', montant: 780, prevu: 12, etat: 'Planifiée', zone: 'Îlots A7-A8' }
];
const STOCKS = [
  { art: 'Ciment', stock: '54 t', couv: 9, seuil: 7 }, { art: 'Fer à béton', stock: '41 t', couv: 16, seuil: 10 }, { art: 'Sable lavé', stock: '610 m³', couv: 21, seuil: 10 },
  { art: 'Gravier 5/15', stock: '280 m³', couv: 8, seuil: 7 }, { art: 'Parpaings 20', stock: '18 400 u', couv: 12, seuil: 7 }, { art: 'Gasoil (engins)', stock: '6 200 L', couv: 6, seuil: 5 }
];

const BUDGET_T1 = [ // Md GNF : prévu, engagé, dépensé
  { poste: 'Études et ingénierie', p: 14, e: 13.1, d: 10.2 }, { poste: 'VRD et réseaux', p: 42, e: 31.5, d: 19.8 }, { poste: 'Gros œuvre', p: 98, e: 64.7, d: 41.2 },
  { poste: 'Second œuvre', p: 61, e: 28.4, d: 14.9 }, { poste: 'Équipements publics', p: 22, e: 9.6, d: 4.1 }, { poste: 'Commercialisation', p: 9, e: 5.2, d: 3.8 },
  { poste: 'Frais financiers', p: 12, e: 7.9, d: 6.4 }, { poste: 'Provision pour aléas', p: 7, e: 1.4, d: 0.9 }
];
const TRESO = { mois: ['Nov', 'Déc', 'Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct'], enc: [3.2, 4.1, 5.8, 6.4, 7.9, 9.2, 10.8, 12.1, 13.4, 15.2, 16.8, 18.4], dec: [6.5, 7.8, 9.1, 10.4, 11.9, 12.6, 13.8, 14.7, 15.5, 16.2, 17.1, 17.9] };
const VENTES = { total: 480, reserves: 212, actes: 96, prixMoyen: 560, acomptes: 18.4, canaux: [
  { nom: 'Diaspora (France, USA, Sénégal)', n: 71 }, { nom: 'Fonctionnaires — convention banque', n: 58 }, { nom: 'Salariés secteur privé', n: 44 }, { nom: 'Investisseurs locatifs', n: 27 }, { nom: 'Location-vente', n: 12 }
] };
const COURBE = { // avancement physique prévu / réel, par semaine (0 → 104), en %
  prevu: [0, 1, 2, 3, 4, 5, 6, 8, 9, 11, 12, 14, 15, 17, 19, 20, 22, 24, 25, 27, 29, 31, 32, 34, 35, 37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59, 61, 62, 64, 66, 68, 70, 72, 74, 76, 78, 79, 81, 83, 85, 87, 88, 90, 91, 93, 94, 95, 96, 97, 98, 99, 100],
  reel: [0, 1, 1, 2, 3, 4, 5, 7, 8, 10, 11, 13, 14, 16, 17, 18, 20, 21, 23, 24, 26, 27, 28, 30, 31, 32, 33, 34, 34]
};

const RISQUES = [
  { id: 'R1', nom: 'Saison des pluies : saturation du drainage et du bassin nord', p: 4, i: 4, resp: 'Chef de chantier', plan: 'Curage avant mai, 2 pompes de secours, capteurs de niveau, planning décalé des fondations' },
  { id: 'R2', nom: 'Rupture d\'approvisionnement ciment (port de Conakry)', p: 3, i: 4, resp: 'Achats', plan: '2 fournisseurs qualifiés, stock de sécurité 15 jours, commande anticipée J-20' },
  { id: 'R3', nom: 'Main-d\'œuvre qualifiée insuffisante', p: 3, i: 3, resp: 'RH', plan: 'Chantier-école : 24 compagnons formés par tranche, binômes, primes de fidélisation' },
  { id: 'R4', nom: 'Hausse du prix de l\'acier et du ciment', p: 3, i: 3, resp: 'Achats', plan: 'Contrats cadres indexés, achats groupés T1+T2, provision aléas' },
  { id: 'R5', nom: 'Contestation foncière riveraine', p: 2, i: 5, resp: 'Maître d\'ouvrage', plan: 'Titre publié, bornage contradictoire, concertation chefs de quartier, emplois locaux' },
  { id: 'R6', nom: 'Vols de matériaux et intrusions', p: 3, i: 2, resp: 'HSE', plan: '6 caméras, gardiennage 24 h, magasin fermé, inventaire hebdomadaire' },
  { id: 'R7', nom: 'Retard de raccordement EDG / SEG', p: 4, i: 3, resp: 'Pilote', plan: 'Forages + château d\'eau, solaire autonome tranche 1, convention EDG signée' },
  { id: 'R8', nom: 'Rythme de commercialisation insuffisant', p: 2, i: 4, resp: 'Commercial', plan: 'Accords 3 banques, campagne diaspora, location-vente, maisons témoins A1' }
];
const NC = [
  { id: 'NC-041', zone: 'Îlot A4 — poteau P12', obj: 'Enrobage des armatures insuffisant (2 cm au lieu de 3)', sev: 'Majeure', etat: 'Reprise en cours', ech: 'J+3' },
  { id: 'NC-042', zone: 'Îlot A2 — lgt 14', obj: 'Pente d\'évacuation EU non conforme', sev: 'Mineure', etat: 'Ouverte', ech: 'J+5' },
  { id: 'NC-043', zone: 'Voirie V2', obj: 'Compactage de la couche de forme à 92 % (requis 95 %)', sev: 'Majeure', etat: 'Essai à refaire', ech: 'J+2' },
  { id: 'NC-044', zone: 'Îlot A3 — lgt 7', obj: 'Fissure d\'enduit façade est', sev: 'Mineure', etat: 'Ouverte', ech: 'J+10' },
  { id: 'NC-045', zone: 'Centrale béton', obj: 'Fiche de gâchée non signée (2 toupies)', sev: 'Mineure', etat: 'Close', ech: '—' },
  { id: 'NC-046', zone: 'Îlot A5', obj: 'Ferraillage semelle S4 : espacement 25 cm au lieu de 20', sev: 'Majeure', etat: 'Reprise faite — à recontrôler', ech: 'J+1' },
  { id: 'NC-047', zone: 'Base vie', obj: 'Extincteurs non vérifiés (date dépassée)', sev: 'Mineure', etat: 'Ouverte', ech: 'J+7' }
];
const CAMERAS = [
  { id: 'CAM-01', nom: 'Entrée principale', img: 'aerien', on: true, evt: 'Dernier passage : camion BC-2026-118 (06:42)' },
  { id: 'CAM-02', nom: 'Magasin et stockage', img: 'controle', on: true, evt: 'Ouverture magasin 06:40 — F. Camara' },
  { id: 'CAM-03', nom: 'Îlot A4 — gros œuvre', img: 'prefab', on: true, evt: 'Activité normale — 14 personnes détectées' },
  { id: 'CAM-04', nom: 'Centrale à béton', img: 'controle', on: true, evt: '3 gâchées depuis 07:00' },
  { id: 'CAM-05', nom: 'Bassin nord et digue', img: 'quartier', on: false, evt: 'Hors ligne depuis 03:12 — alimentation à vérifier' },
  { id: 'CAM-06', nom: 'Base vie', img: 'logement', on: true, evt: 'RAS cette nuit' }
];
const JOURNAL = [
  { h: '06:40', t: 'Ouverture du chantier, briefing sécurité (18 présents)', s: 'OK', c: 'vert' },
  { h: '06:42', t: 'Arrivée du camion ciment BC-2026-118 annoncée à J+2 — en transit depuis le port', s: 'Info', c: 'bleu' },
  { h: '07:15', t: 'Coulage semelles îlot A6 — 3 toupies prévues', s: 'En cours', c: '' },
  { h: '07:52', t: 'Retard de pointage : O. Touré (conducteur d\'engin) — 22 min', s: 'Retard', c: 'ambre' },
  { h: '08:10', t: 'Caméra CAM-05 (bassin nord) hors ligne depuis 03:12 — technicien demandé', s: 'Alerte', c: 'ambre' },
  { h: '08:30', t: 'Contrôle qualité : NC-046 reprise effectuée, recontrôle demain', s: 'Qualité', c: '' },
  { h: '09:00', t: 'Visite de 2 acquéreurs (diaspora) — maisons témoins A1', s: 'Commercial', c: 'vert' }
];
const EXPLOITATION = {
  livrees: 40, occupees: 31, tickets: [
    { id: 'T-018', lgt: 'A1-07', obj: 'Fuite raccord évier', etat: 'Clos', delai: '1 j' }, { id: 'T-019', lgt: 'A1-12', obj: 'Disjoncteur qui saute (four)', etat: 'Clos', delai: '2 j' },
    { id: 'T-021', lgt: 'A1-03', obj: 'Fissure retrait enduit chambre', etat: 'Planifié', delai: 'J+4' }, { id: 'T-022', lgt: 'Voirie A1', obj: 'Lampadaire L7 éteint', etat: 'En cours', delai: 'J+1' },
    { id: 'T-023', lgt: 'A1-20', obj: 'Porte d\'entrée frotte', etat: 'Ouvert', delai: 'J+3' }
  ],
  charges: [{ lib: 'Eau (forage, pompage)', m: 18 }, { lib: 'Éclairage public (solaire)', m: 6 }, { lib: 'Gardiennage quartier', m: 24 }, { lib: 'Entretien espaces verts', m: 11 }, { lib: 'Collecte déchets', m: 9 }],
  satisfaction: 4.3
};
const REFS_JULES = [
  { k: 'codes', nom: 'Codes Rousseau', lieu: 'Les Sables-d\'Olonne', d: 'Siège 8 000 m² — 4,4 M€ — inauguré par le Préfet, 2023' },
  { k: 'atlantique', nom: 'Atlantique Ouvertures', lieu: 'Saint-Étienne-de-Montluc', d: 'Usine 10 552 m² — géothermie, photovoltaïque — 2023' },
  { k: 'framatome', nom: 'Framatome', lieu: 'Paimbœuf', d: 'Atelier ICPE 2 400 m² — gagné face aux majors' },
  { k: 'yaskawa', nom: 'Yaskawa Academy', lieu: 'Le Bignon', d: 'Centre de formation robotique — 2024' },
  { k: 'alliance', nom: 'France Alliance 37', lieu: 'Parçay-Meslay', d: 'Bureaux et logistique 5 600 m² — 2024' },
  { k: 'millet', nom: 'Millet', lieu: 'Castelnaudary', d: 'Ossature bois préfabriquée 1 370 m² — 2024' },
  { k: 'gong', nom: 'GONG SUP', lieu: 'Saint-Nazaire', d: 'Siège France — réceptionné' },
  { k: 'wevan', nom: 'WeVan', lieu: 'Saint-Herblain', d: 'Siège bois et métal — 2023' }
];
const SCENARIOS = {
  ciment: { nom: 'Retard de livraison ciment', desc: 'Le camion BC-2026-118 est bloqué au port : livraison J+7 au lieu de J+2. Le coulage des îlots A6-A7 s\'arrête.',
    plan: ['Basculer 30 t sur le fournisseur de secours (Dubréka) sous 48 h', 'Réaffecter l\'équipe A sur le ferraillage A7 et les reprises NC', 'Double poste 3 jours à la réception du ciment', 'Pénalité contractuelle appliquée à Ciments de Guinée'],
    gain: 'Retard ramené de 6 à 3,5 points ; surcoût limité à +2,1 %' },
  pluie: { nom: 'Fortes pluies : bassin nord saturé', desc: 'Pluie de 110 mm en 24 h. Le bassin nord déborde sur la voirie V2 et les fouilles A7-A8 sont inondées.',
    plan: ['Mise en route des 2 pompes de secours, pompage 36 h', 'Arrêt des fondations A7-A8, report sur le second œuvre A2-A3', 'Curage et rehausse de la digue nord (+40 cm)', 'Contrôle qualité renforcé des semelles exposées'],
    gain: 'Retard ramené de 5 à 2,5 points ; qualité maintenue à 95 %' },
  acier: { nom: 'Hausse du prix de l\'acier : +18 %', desc: 'Le fournisseur annonce +18 % sur le fer à béton à partir du mois prochain.',
    plan: ['Commande anticipée des 120 t des tranches 1-2 au prix actuel', 'Activation de la clause d\'indexation sur les contrats de vente', 'Prélèvement sur la provision aléas (2,4 Md GNF)', 'Consultation d\'un second aciériste (Dakar)'],
    gain: 'Surcoût ramené de +4,8 % à +1,9 % ; marge maintenue au-dessus de la cible' }
};

/* ============================================================
   Noyau : état, persistance locale, utilitaires, moteur d'indicateurs
   ============================================================ */
const $ = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmt = (n, d = 0) => Number(n).toLocaleString('fr-FR', { minimumFractionDigits: d, maximumFractionDigits: d });
const fMd = n => fmt(n, n < 10 ? 1 : 0) + ' Md GNF';          // milliards
const fM = n => fmt(n) + ' M GNF';                            // millions
const fEur = md => '≈ ' + fmt(md * 1e9 / state.taux / 1e6, md * 1e9 / state.taux / 1e6 < 10 ? 1 : 0) + ' M€';
const fGNF = n => fmt(n) + ' GNF';
const pad = n => String(n).padStart(2, '0');
const hhmm = d => pad(d.getHours()) + ':' + pad(d.getMinutes());
const dateFr = d => d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
const dateCourt = d => d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });
const addJ = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return d; };
const todayISO = () => new Date().toISOString().slice(0, 10);
const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
const agent = id => AGENTS.find(a => a.id === id);
const four = id => FOURNISSEURS.find(f => f.id === id);
const classEtat = e => e === 'vert' ? '' : e;

/* ---- État persistant (localStorage) ---- */
const DEFAUT = { taux: TAUX_EUR, site: { lat: 9.7520, lng: -13.5135, rayon: 1500, nom: 'Site Alliou — plaine assainie (165 ha)' }, scen: {}, applique: {}, pointages: [], photos: [], vue: 'cockpit', agentSel: 'a05' };
let state = (() => { try { return Object.assign({}, DEFAUT, JSON.parse(localStorage.getItem('p165') || '{}')); } catch (e) { return Object.assign({}, DEFAUT); } })();
state.scen = state.scen || {}; state.applique = state.applique || {}; state.pointages = state.pointages || []; state.photos = state.photos || [];
function save() { try { localStorage.setItem('p165', JSON.stringify(state)); } catch (e) { /* stockage indisponible : on continue en mémoire */ } }

/* ---- Données distantes (Supabase) ---- */
const remote = { ok: false, pointages: [], photos: [], client: null };

/* ---- Toast ---- */
let toastT;
function toast(html) { const t = $('#toast'); t.innerHTML = html; t.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('on'), 3800); }

/* ---- Géo ---- */
function haversine(a, b, c, d) { const R = 6371000, r = x => x * Math.PI / 180, dLat = r(c - a), dLng = r(d - b); const h = Math.sin(dLat / 2) ** 2 + Math.cos(r(a)) * Math.cos(r(c)) * Math.sin(dLng / 2) ** 2; return 2 * R * Math.asin(Math.sqrt(h)); }
const fDist = m => m < 1000 ? fmt(m) + ' m' : fmt(m / 1000, 1) + ' km';

/* ---- Moteur d'indicateurs : les 6 paramètres de réussite ---- */
function kpis() {
  const s = state.scen, a = state.applique;
  let delai = -3, cout = 1.2, perim = 0, qual = 96, risque = 14, marge = 16.4;
  if (s.ciment) { if (a.ciment) { delai -= 0.5; cout += 0.9; risque += 1; } else { delai -= 3; cout += 0.7; risque += 3; } }
  if (s.pluie) { if (a.pluie) { delai -= 1.5; cout += 0.9; qual -= 1; risque += 2; } else { delai -= 2; cout += 1.4; qual -= 3; risque += 5; } }
  if (s.acier) { if (a.acier) { cout += 0.7; marge -= 0.9; risque += 1; } else { cout += 3.6; marge -= 2.2; risque += 2; } }
  const semRetard = Math.round(-delai * 1.04 * 10) / 10; // 1 point ≈ 1,04 semaine sur 104
  const K = [
    { k: 'delai', nom: 'Délai', val: (delai > 0 ? '+' : '') + fmt(delai, 1), unit: 'pts', sub: 'Avancement <b>34 %</b> réel pour 37 % prévu · ' + fmt(semRetard, 1) + ' sem. de retard', etat: Math.abs(delai) <= 2 ? 'vert' : Math.abs(delai) <= 5 ? 'ambre' : 'rouge', vue: 'chantier' },
    { k: 'cout', nom: 'Coût', val: '+' + fmt(cout, 1), unit: '%', sub: 'Tranche 1 : <b>' + fMd(265) + '</b> · engagé 61 % · dépensé 38 %', etat: cout <= 2 ? 'vert' : cout <= 5 ? 'ambre' : 'rouge', vue: 'finances' },
    { k: 'perimetre', nom: 'Périmètre', val: fmt(perim), unit: 'modif. non validée', sub: '<b>480 logements</b> T1 · 2 demandes de changement en instruction', etat: perim === 0 ? 'vert' : 'ambre', vue: 'site' },
    { k: 'qualite', nom: 'Qualité', val: fmt(qual), unit: '% conformes', sub: '<b>' + NC.filter(n => n.etat !== 'Close').length + ' non-conformités</b> ouvertes · 3 majeures', etat: qual >= 95 ? 'vert' : qual >= 90 ? 'ambre' : 'rouge', vue: 'risques' },
    { k: 'risques', nom: 'Risques', val: fmt(risque), unit: '/ 25', sub: '<b>' + RISQUES.filter(r => r.p * r.i >= 12).length + ' risques majeurs</b> suivis · plans d\'action actifs', etat: risque < 10 ? 'vert' : risque < 18 ? 'ambre' : 'rouge', vue: 'risques' },
    { k: 'benefices', nom: 'Bénéfices', val: fmt(marge, 1), unit: '% marge', sub: 'Cible <b>' + PROG.margeCible + ' %</b> · programme ' + fMd(PROG.ca) + ' de CA', etat: marge >= PROG.margeCible ? 'vert' : marge >= PROG.margeCible - 2 ? 'ambre' : 'rouge', vue: 'finances' }
  ];
  return { K, delai, cout, qual, risque, marge, semRetard };
}
function alertes() {
  const s = state.scen, a = state.applique, k = kpis(), L = [];
  if (s.ciment && !a.ciment) L.push({ sev: 'rouge', t: 'Ciment : livraison BC-2026-118 décalée à J+7 — coulage A6-A7 à l\'arrêt dans 48 h', d: 'Stock : 9 j → 4 j de couverture. Plan de rattrapage proposé.', vue: 'achats' });
  if (s.pluie && !a.pluie) L.push({ sev: 'rouge', t: 'Bassin nord saturé — fouilles A7-A8 inondées, voirie V2 coupée', d: 'Pompage à lancer. Caméra CAM-05 hors ligne sur la zone.', vue: 'chantier' });
  if (s.acier && !a.acier) L.push({ sev: 'ambre', t: 'Acier +18 % annoncé — surcoût ' + fmt(k.cout, 1) + ' %, marge ' + fmt(k.marge, 1) + ' %', d: 'Commande anticipée recommandée avant la hausse.', vue: 'finances' });
  Object.keys(a).filter(x => a[x] && s[x]).forEach(x => L.push({ sev: 'vert', t: 'Plan de rattrapage appliqué : ' + SCENARIOS[x].nom, d: SCENARIOS[x].gain, vue: 'cockpit' }));
  L.push({ sev: 'ambre', t: 'Livraison en retard : tuyaux PVC Ø200 (SOGUIPLAST) — 4 jours', d: 'Voirie V2 : pose des réseaux décalée. Pénalité de retard à notifier.', vue: 'achats' });
  L.push({ sev: 'ambre', t: 'Caméra CAM-05 (bassin nord) hors ligne depuis 03:12', d: 'Zone sensible sans surveillance. Technicien demandé.', vue: 'chantier' });
  L.push({ sev: 'ambre', t: '2 retards de pointage ce matin · 1 absence non justifiée', d: 'O. Touré (22 min), A. Keïta (11 min) · F. Yansané absent.', vue: 'rh' });
  L.push({ sev: 'ambre', t: 'NC-043 : compactage voirie V2 à 92 % — essai à refaire sous 48 h', d: 'Bloque la pose des réseaux. Contrôleuse : A. Bah.', vue: 'risques' });
  L.push({ sev: 'bleu', t: 'Congé de O. Touré (2 → 8 nov.) à valider : aucun conducteur d\'engin de remplacement', d: 'Décision RH attendue avant le 15 oct.', vue: 'rh' });
  L.push({ sev: 'bleu', t: 'Gasoil : 6 jours de couverture (seuil 5)', d: 'Commande à passer cette semaine.', vue: 'achats' });
  L.push({ sev: 'vert', t: '2 visites d\'acquéreurs diaspora ce matin — maisons témoins A1', d: '212 réservations sur 480 (44 %).', vue: 'finances' });
  return L;
}

/* ---- Navigation ---- */
const VUES = [
  { g: 'Piloter' }, { id: 'cockpit', nom: 'Cockpit', ic: '◉' }, { id: 'site', nom: 'Site et quartiers', ic: '▦' }, { id: 'finances', nom: 'Finances et ventes', ic: '◈' }, { id: 'risques', nom: 'Risques et qualité', ic: '△' },
  { g: 'Terrain' }, { id: 'chantier', nom: 'Chantier', ic: '⚒' }, { id: 'pointage', nom: 'Pointage et émargement', ic: '✎' }, { id: 'rh', nom: 'Ressources humaines', ic: '☷' }, { id: 'achats', nom: 'Achats et fournisseurs', ic: '⇄' },
  { g: 'Après livraison' }, { id: 'exploitation', nom: 'Exploitation et maintenance', ic: '⌂' },
  { g: 'Dispositif' }, { id: 'equipe', nom: 'Qui vous accompagne', ic: '☺' }, { id: 'parametres', nom: 'Paramètres et démo', ic: '⚙' }
];
const RENDU = {};
function badges() { const al = alertes(); return { cockpit: al.filter(x => x.sev === 'rouge').length || 0, achats: COMMANDES.filter(c => c.etat === 'Retard').length + (state.scen.ciment && !state.applique.ciment ? 1 : 0), rh: 3, risques: NC.filter(n => n.sev === 'Majeure' && n.etat !== 'Close').length }; }
function renderNav() {
  const b = badges();
  $('#nav').innerHTML = VUES.map(v => v.g ? '<div class="grp">' + v.g + '</div>' : '<button data-vue="' + v.id + '" class="' + (state.vue === v.id ? 'on' : '') + '"><span class="ic">' + v.ic + '</span>' + v.nom + (b[v.id] ? '<span class="bd">' + b[v.id] + '</span>' : '') + '</button>').join('');
}
function go(id) {
  if (!RENDU[id]) return;
  state.vue = id; save(); renderNav();
  const m = $('#main'); m.innerHTML = RENDU[id]();
  m.querySelectorAll('[data-go]').forEach(el => el.addEventListener('click', e => { e.preventDefault(); go(el.dataset.go); }));
  if (MONTE[id]) MONTE[id](m);
  window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  $('#simPill').hidden = !Object.values(state.scen).some(Boolean);
  const nb = $('nav.side button.on'); if (nb && nb.scrollIntoView) nb.scrollIntoView({ block: 'nearest', inline: 'center' });
}
const MONTE = {};
document.addEventListener('click', e => { const b = e.target.closest('#nav button[data-vue]'); if (b) go(b.dataset.vue); });

/* ---- Fragments réutilisables ---- */
function kpiCards() {
  return '<div class="g g6">' + kpis().K.map(k => '<div class="carte kpi ' + classEtat(k.etat) + '" data-go="' + k.vue + '"><h2>' + k.nom + '<span class="etat ' + classEtat(k.etat) + '">' + ({ vert: 'Maîtrisé', ambre: 'Vigilance', rouge: 'Alerte' })[k.etat] + '</span></h2><div class="val num">' + k.val + '<small>' + k.unit + '</small></div><div class="sub">' + k.sub + '</div></div>').join('') + '</div>';
}
function listeAlertes(max) {
  return alertes().slice(0, max || 99).map(a => '<div class="alerte ' + a.sev + '"><div class="sev"></div><div><b>' + a.t + '</b><small>' + a.d + '</small></div><button class="btn sm" data-go="' + a.vue + '">Ouvrir</button></div>').join('');
}
function scenarioPanel() {
  const actifs = Object.keys(state.scen).filter(k => state.scen[k]);
  let h = '<div class="carte"><h3>Simuler un aléa <small>pour montrer comment l\'outil réagit</small></h3><div class="actions">';
  h += Object.keys(SCENARIOS).map(k => '<button class="btn ' + (state.scen[k] ? 'lat' : '') + '" data-scen="' + k + '">' + (state.scen[k] ? '✓ ' : '') + SCENARIOS[k].nom + '</button>').join('');
  h += '<button class="btn sm" data-scen="reset" ' + (actifs.length ? '' : 'disabled') + '>Rétablir</button></div>';
  actifs.forEach(k => {
    const S = SCENARIOS[k], ap = state.applique[k];
    h += '<div class="plan-ratt"><h4>' + (ap ? '✓ Plan appliqué — ' : 'Plan de rattrapage proposé — ') + S.nom + '</h4><p style="font-size:.92em;color:var(--pierre);margin-bottom:.5em">' + S.desc + '</p><ol>' + S.plan.map(p => '<li>' + p + '</li>').join('') + '</ol><div class="res"><span>Effet attendu : <b style="color:var(--vert)">' + S.gain + '</b></span>' + (ap ? '<span class="etat">Appliqué — indicateurs recalculés</span>' : '<button class="btn prim" data-apply="' + k + '">Appliquer le plan</button>') + '</div></div>';
  });
  return h + '</div>';
}
function monteScenarios(m) {
  $$('[data-scen]', m).forEach(b => b.addEventListener('click', () => {
    const k = b.dataset.scen;
    if (k === 'reset') { state.scen = {}; state.applique = {}; toast('Situation nominale rétablie.'); }
    else { state.scen[k] = !state.scen[k]; if (!state.scen[k]) delete state.applique[k]; toast(state.scen[k] ? '<b>Aléa simulé :</b> ' + SCENARIOS[k].nom + ' — indicateurs et alertes recalculés.' : 'Aléa retiré.'); }
    save(); go(state.vue);
  }));
  $$('[data-apply]', m).forEach(b => b.addEventListener('click', () => { state.applique[b.dataset.apply] = true; save(); toast('<b>Plan appliqué.</b> ' + SCENARIOS[b.dataset.apply].gain + '.'); go(state.vue); }));
}
function barre(p, cls, sup) { return '<div class="barre"><i class="' + (cls || '') + '" style="width:' + Math.max(0, Math.min(100, p)) + '%"></i>' + (sup != null ? '<i class="sup" style="width:' + sup + '%"></i>' : '') + '</div>'; }
function etoiles(n) { return '<span style="color:var(--or);letter-spacing:.05em">' + '★'.repeat(n) + '</span><span style="color:var(--trait);letter-spacing:.05em">' + '★'.repeat(5 - n) + '</span>'; }
function pied() { return '<div class="pied"><span>ChantierLive · démonstration · LevENT-IT × T-Architectes · ' + esc(PROG.nom) + '</span><span>Données de démonstration — ' + dateFr(new Date()) + '</span></div>'; }

/* ---- Courbe en S (SVG) ---- */
function courbeS() {
  const W = 640, H = 240, ml = 36, mb = 26, mt = 10, mr = 12, w = W - ml - mr, h = H - mt - mb;
  const x = i => ml + i / 104 * w, y = p => mt + h - p / 100 * h;
  const pts = (arr, step) => arr.map((p, i) => x(i * step).toFixed(1) + ',' + y(p).toFixed(1)).join(' ');
  const k = kpis(); const reel = COURBE.reel.slice(); const last = reel.length - 1;
  if (k.delai < -3) reel[last] = Math.max(20, 34 + (k.delai + 3) * 1.1);
  let s = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Courbe d\'avancement prévu et réel">';
  [0, 25, 50, 75, 100].forEach(p => s += '<line x1="' + ml + '" x2="' + (W - mr) + '" y1="' + y(p) + '" y2="' + y(p) + '" stroke="#ECE6DA"/><text x="' + (ml - 6) + '" y="' + (y(p) + 4) + '" font-size="10" text-anchor="end">' + p + ' %</text>');
  [0, 26, 52, 78, 104].forEach(sw => s += '<text x="' + x(sw) + '" y="' + (H - 8) + '" font-size="10" text-anchor="middle">S' + sw + '</text>');
  s += '<polyline fill="none" stroke="#C9D3E6" stroke-width="2.5" points="' + pts(COURBE.prevu, 104 / (COURBE.prevu.length - 1)) + '"/>';
  s += '<polyline fill="none" stroke="#1E3A5F" stroke-width="3" points="' + pts(reel, 104 / (COURBE.prevu.length - 1)) + '"/>';
  const xs = x(PROG.semaine); s += '<line x1="' + xs + '" x2="' + xs + '" y1="' + mt + '" y2="' + (mt + h) + '" stroke="#B4532A" stroke-dasharray="4 3"/><text x="' + (xs + 4) + '" y="' + (mt + 10) + '" font-size="10" fill="#B4532A">Semaine ' + PROG.semaine + '</text>';
  s += '<circle cx="' + x(last * 104 / (COURBE.prevu.length - 1)) + '" cy="' + y(reel[last]) + '" r="4.5" fill="#1E3A5F"/><text x="' + (x(last * 104 / (COURBE.prevu.length - 1)) + 8) + '" y="' + (y(reel[last]) + 14) + '" font-size="11" font-weight="700" fill="#0C1C35">' + fmt(reel[last], 0) + ' % réel</text>';
  s += '<text x="' + (x(40) + 8) + '" y="' + (y(37) - 8) + '" font-size="11" fill="#2F5A9E">37 % prévu</text>';
  return s + '</svg><div class="legende"><span><i style="background:#C9D3E6"></i>Prévu</span><span><i style="background:#1E3A5F"></i>Réel</span><span><i style="background:#B4532A"></i>Aujourd\'hui</span></div>';
}

/* ============================================================
   Vues : Cockpit, Site et quartiers, Finances et ventes, Risques et qualité
   ============================================================ */
RENDU.cockpit = () => {
  const k = kpis();
  let h = '<div class="vue"><h1>Cockpit du programme</h1><p class="sous"><b>' + esc(PROG.nom) + '</b> · semaine ' + PROG.semaine + ' sur ' + PROG.semainesTotal + ' de la tranche 1 · rapport du ' + dateFr(new Date()) + ' · six paramètres de réussite, recalculés en continu.</p>';
  h += kpiCards();
  h += '<div class="g g32" style="margin-top:1em"><div class="g">';
  h += '<div class="carte"><h3>Alertes à traiter <small>' + alertes().length + ' alertes · triées par gravité</small></h3>' + listeAlertes(7) + '</div>';
  h += '<div class="carte"><h3>Avancement de la tranche 1 <small>480 logements · courbe en S</small></h3>' + courbeS() + '</div>';
  h += '</div><div class="g">';
  h += scenarioPanel();
  h += '<div class="carte"><h3>Les 7 phases du programme <small>du foncier à la maintenance</small></h3><div class="frise">' + PHASES.map(p => '<div class="ph ' + (p.pct >= 100 ? 'fait' : p.pct > 0 ? 'cours' : '') + '"><div class="n">' + p.n + '</div><div class="lib"><b>' + p.nom + '</b><small>' + p.detail + ' · ' + p.debut + ' → ' + p.fin + '</small>' + barre(p.pct, p.pct >= 100 ? 'v' : 'o') + '</div><div class="pct">' + p.pct + ' %</div></div>').join('') + '</div></div>';
  h += '<div class="carte"><h3>Programme en chiffres</h3>' +
    '<div class="ligne"><span>Surface aménagée</span><b>165 ha</b></div><div class="ligne"><span>Logements programmés</span><b>2 000 · 4 quartiers</b></div><div class="ligne"><span>Chiffre d\'affaires prévisionnel</span><b>' + fMd(PROG.ca) + ' <small>' + fEur(PROG.ca) + '</small></b></div><div class="ligne"><span>Coût total prévisionnel</span><b>' + fMd(PROG.couts) + '</b></div><div class="ligne"><span>Marge prévisionnelle</span><b style="color:var(--vert)">' + fMd(PROG.ca - PROG.couts) + ' · ' + fmt(k.marge, 1) + ' %</b></div><div class="ligne"><span>Réservations tranche 1</span><b>212 / 480 · 44 %</b></div><div class="ligne"><span>Effectif sur site aujourd\'hui</span><b>' + Object.values(PRESENCE_DEMO).filter(p => p.arr && !p.nuit).length + ' présents / 18</b></div></div>';
  h += '</div></div>' + pied() + '</div>';
  return h;
};
MONTE.cockpit = monteScenarios;

/* ---- Site et quartiers ---- */
RENDU.site = () => {
  let h = '<div class="vue"><h1>Site et quartiers</h1><p class="sous"><b>165 ha de marécage assainis</b>, remblayés au sable et drainés par le maître d\'ouvrage. Le plan d\'aménagement de T-Architectes organise quatre quartiers autour d\'un cœur d\'équipements : écoles, centre de santé, marché, mosquée, parc, commerces. Cliquez sur un quartier ou un îlot.</p>';
  h += '<div class="g g32"><div class="carte plan"><h3>Plan d\'aménagement <small>schéma de principe · nord en haut</small></h3>' + planSVG() + '<div class="legende"><span><i style="background:#C8992A"></i>Tranche 1 — chantier</span><span><i style="background:#9FB3CF"></i>Tranche 2 — études</span><span><i style="background:#CBD5E5"></i>Tranches 3-4</span><span><i style="background:#2E7D32"></i>Parc, espaces verts</span><span><i style="background:#5B8DB8"></i>Bassins de rétention</span><span><i style="background:#fff;border:1px solid #999"></i>Équipement public</span></div><div class="detail" id="detSite" style="margin-top:.7em"><b class="t">Q1 — Les Palétuviers · tranche 1</b><dl><dt>Logements</dt><dd>480 · 12 îlots de 40</dd><dt>État</dt><dd><span class="etat ambre">Chantier en cours · 34 %</span></dd><dt>Typologies</dt><dd>T3, T4, villas 120 et 160 m²</dd><dt>Équipements</dt><dd>École primaire 1, parc, base vie</dd></dl></div></div>';
  h += '<div class="g">';
  h += '<div class="carte"><h3>Occupation du sol <small>165 ha</small></h3>' + PROG.occupation.map(o => '<div class="ligne" style="display:grid;grid-template-columns:1fr 4em;gap:.5em"><span>' + o.lib + '<div class="barre" style="margin-top:.3em"><i style="width:' + (o.ha / 165 * 100) + '%;background:' + o.c + '"></i></div></span><b>' + o.ha + ' ha</b></div>').join('') + '</div>';
  h += '<div class="carte"><h3>Les 4 quartiers</h3><div class="scroll"><table class="t"><tr><th>Quartier</th><th class="n">Logements</th><th>Tranche</th><th>État</th></tr>' + QUARTIERS.map(q => '<tr><td><b>' + q.id + '</b> — ' + q.nom + '</td><td class="n">' + q.logements + '</td><td>' + q.tranche + '</td><td><span class="etat ' + (q.pct > 0 ? 'ambre' : 'gris') + '">' + q.etat + '</span></td></tr>').join('') + '</table></div></div>';
  h += '<div class="carte"><h3>Typologies et prix <small>programme complet</small></h3><div class="scroll"><table class="t"><tr><th>Type</th><th class="n">Nombre</th><th class="n">Prix</th><th>Cible</th></tr>' + PROG.typologies.map(t => '<tr><td>' + t.nom + '</td><td class="n">' + t.n + '</td><td class="n">' + fM(t.prix) + '</td><td style="color:var(--pierre)">' + t.cible + '</td></tr>').join('') + '</table></div><p class="note" style="margin-top:.6em">Les prix sont des hypothèses de travail à caler avec le maître d\'ouvrage et les banques partenaires.</p></div>';
  h += '<div class="carte"><h3>Équipements du cœur de quartier</h3><div class="chips">' + EQUIPEMENTS.map(e => '<span class="chip">' + e.nom + '</span>').join('') + '</div></div>';
  h += '</div></div>';
  h += '<div class="g g2" style="margin-top:1em"><figure class="photos" style="display:block"><figure><img src="' + IMG.quartier + '" alt="Vue d\'intention du quartier livré"><span class="tag">Illustration d\'intention</span><figcaption>Le quartier Q1 livré, vue aérienne<i>Illustration d\'intention — LevENT-IT × T-Architectes</i></figcaption></figure></figure><figure class="photos" style="display:block"><figure><img src="' + IMG.logement + '" alt="Vue d\'intention du T3 évolutif"><span class="tag">Illustration d\'intention</span><figcaption>Le T3 évolutif de 60 m², extensible en T4<i>Illustration d\'intention — T-Architectes</i></figcaption></figure></figure></div>';
  return h + pied() + '</div>';
};
function planSVG() {
  const cI = p => p >= 100 ? '#2E7D32' : p >= 50 ? '#1E3A5F' : p > 0 ? '#C8992A' : '#E8DFC9';
  let s = '<svg viewBox="0 0 1000 620" role="img" aria-label="Plan d\'aménagement des 165 ha">';
  s += '<rect x="0" y="0" width="1000" height="620" rx="18" fill="#EEF3E6"/>';
  s += '<path d="M20 30 Q 500 -10 980 30 L 980 600 Q 500 630 20 600 Z" fill="#F6F2E7" stroke="#C8B98F" stroke-width="2" stroke-dasharray="6 4"/>';
  // bassins et parc
  s += '<rect x="60" y="8" width="880" height="26" rx="8" fill="#5B8DB8" opacity=".75"/><text x="500" y="26" font-size="12" text-anchor="middle" fill="#fff" font-weight="700">Bassin de rétention nord · digue</text>';
  s += '<rect x="60" y="585" width="880" height="26" rx="8" fill="#2E7D32" opacity=".7"/><text x="500" y="603" font-size="12" text-anchor="middle" fill="#fff" font-weight="700">Coulée verte · parc · terrains de sport</text>';
  // quartiers
  QUARTIERS.forEach(q => {
    s += '<g class="q" data-q="' + q.id + '"><rect class="z" x="' + q.x + '" y="' + q.y + '" width="' + q.w + '" height="' + q.h + '" rx="10" fill="' + q.c + '" opacity="' + (q.id === 'Q1' ? '.18' : '.6') + '" stroke="#fff" stroke-width="2"/>';
    s += '<text x="' + (q.x + 12) + '" y="' + (q.y + 22) + '" font-size="15" font-weight="700" fill="#0C1C35">' + q.id + ' — ' + q.nom + '</text><text x="' + (q.x + 12) + '" y="' + (q.y + 40) + '" font-size="11" fill="#444">' + q.logements + ' logements · tranche ' + q.tranche + ' · ' + q.etat + '</text></g>';
  });
  // îlots Q1
  const q1 = QUARTIERS[0]; const cols = 4, rows = 3, gw = (q1.w - 24) / cols, gh = (q1.h - 60) / rows;
  ILOTS.forEach((il, i) => { const cx = q1.x + 12 + (i % cols) * gw, cy = q1.y + 50 + Math.floor(i / cols) * gh; s += '<g class="ilot" data-ilot="' + il.id + '"><rect x="' + (cx + 4) + '" y="' + (cy + 4) + '" width="' + (gw - 8) + '" height="' + (gh - 8) + '" rx="6" fill="' + cI(il.pct) + '"/><text x="' + (cx + 12) + '" y="' + (cy + 24) + '" font-size="13" font-weight="700" fill="' + (il.pct > 0 ? '#fff' : '#6B6B6B') + '">' + il.id + '</text><text x="' + (cx + 12) + '" y="' + (cy + 40) + '" font-size="10" fill="' + (il.pct > 0 ? '#fff' : '#6B6B6B') + '">' + il.etape + ' · ' + il.pct + ' %</text></g>'; });
  // voiries
  s += '<rect x="488" y="34" width="24" height="552" fill="#9C9C9C"/><rect x="60" y="276" width="880" height="24" fill="#9C9C9C"/><text x="500" y="292" font-size="10" text-anchor="middle" fill="#fff">Avenue centrale V1</text>';
  // équipements
  EQUIPEMENTS.forEach(e => { s += '<g><circle cx="' + e.x + '" cy="' + e.y + '" r="15" fill="#fff" stroke="#0C1C35" stroke-width="1.5"/><text x="' + e.x + '" y="' + (e.y + 4) + '" font-size="11" font-weight="700" text-anchor="middle" fill="#0C1C35">' + e.ic + '</text><title>' + e.nom + '</title></g>'; });
  s += '<text x="975" y="612" font-size="10" text-anchor="end" fill="#6B6B6B">N ↑ · échelle indicative · 165 ha</text>';
  return s + '</svg>';
}
MONTE.site = m => {
  const det = $('#detSite', m);
  $$('.ilot', m).forEach(g => g.addEventListener('click', e => { e.stopPropagation(); $$('.ilot', m).forEach(x => x.classList.remove('sel')); g.classList.add('sel'); const il = ILOTS.find(i => i.id === g.dataset.ilot); det.innerHTML = '<b class="t">Îlot ' + il.id + ' · ' + il.lgt + ' logements · ' + il.type + '</b><dl><dt>Étape</dt><dd><span class="etat ' + (il.pct >= 100 ? '' : il.pct > 0 ? 'ambre' : 'gris') + '">' + il.etape + '</span></dd><dt>Avancement</dt><dd>' + barre(il.pct, il.pct >= 100 ? 'v' : '') + ' ' + il.pct + ' %</dd><dt>Équipe</dt><dd>' + (il.pct >= 50 ? 'Équipe C — second œuvre' : il.pct > 0 ? 'Équipe A — gros œuvre' : 'Non affecté') + '</dd><dt>Ventes</dt><dd>' + Math.min(il.lgt, Math.round(il.lgt * (0.3 + il.pct / 160))) + ' / ' + il.lgt + ' réservés</dd></dl>'; }));
  $$('.q', m).forEach(g => g.addEventListener('click', () => { const q = QUARTIERS.find(x => x.id === g.dataset.q); det.innerHTML = '<b class="t">' + q.id + ' — ' + q.nom + ' · tranche ' + q.tranche + '</b><dl><dt>Logements</dt><dd>' + q.logements + '</dd><dt>État</dt><dd><span class="etat ' + (q.pct > 0 ? 'ambre' : 'gris') + '">' + q.etat + '</span></dd><dt>Démarrage</dt><dd>' + ({ 1: 'Janvier 2026', 2: 'Mars 2027', 3: 'Janvier 2028', 4: 'Janvier 2029' })[q.tranche] + '</dd><dt>Études</dt><dd>' + (q.tranche <= 2 ? 'T-Architectes — plan masse validé' : 'Esquisse') + '</dd></dl>'; }));
};

/* ---- Finances et ventes ---- */
RENDU.finances = () => {
  const k = kpis(); const tp = BUDGET_T1.reduce((a, b) => a + b.p, 0), te = BUDGET_T1.reduce((a, b) => a + b.e, 0), td = BUDGET_T1.reduce((a, b) => a + b.d, 0);
  let h = '<div class="vue"><h1>Finances et ventes</h1><p class="sous">Budget, trésorerie, commercialisation et bénéfice prévisionnel. Les écarts remontent automatiquement dans le cockpit (paramètres <b>Coût</b> et <b>Bénéfices</b>).</p>';
  h += '<div class="g g4"><div class="carte kpi bleu"><h2>Budget tranche 1</h2><div class="val num">' + fmt(tp) + '<small>Md GNF</small></div><div class="sub">' + fEur(tp) + ' · 480 logements</div></div><div class="carte kpi ' + classEtat(k.K[1].etat) + '"><h2>Écart à terminaison</h2><div class="val num">+' + fmt(k.cout, 1) + '<small>%</small></div><div class="sub">soit +' + fmt(tp * k.cout / 100, 1) + ' Md GNF</div></div><div class="carte kpi"><h2>Engagé / dépensé</h2><div class="val num">' + fmt(te / tp * 100) + '<small>% / ' + fmt(td / tp * 100) + ' %</small></div><div class="sub">' + fMd(te) + ' engagés · ' + fMd(td) + ' payés</div></div><div class="carte kpi ' + classEtat(k.K[5].etat) + '"><h2>Marge programme</h2><div class="val num">' + fmt(k.marge, 1) + '<small>%</small></div><div class="sub">cible ' + PROG.margeCible + ' % · ' + fMd(PROG.ca * k.marge / 100) + '</div></div></div>';
  h += '<div class="g g32" style="margin-top:1em"><div class="g">';
  h += '<div class="carte"><h3>Budget par poste — tranche 1 <small>prévu · engagé · dépensé (Md GNF)</small></h3>' + BUDGET_T1.map(b => '<div class="ligne" style="display:grid;grid-template-columns:11em 1fr 7.5em;gap:.7em;align-items:center"><span>' + b.poste + '</span><div class="barre" style="height:.9em"><i class="b" style="width:' + (b.e / b.p * 100) + '%;opacity:.45;position:absolute"></i><i style="width:' + (b.d / b.p * 100) + '%;position:absolute"></i></div><b class="num">' + fmt(b.d, 1) + ' / ' + fmt(b.e, 1) + ' / ' + fmt(b.p) + '</b></div>').join('') + '<div class="legende"><span><i style="background:#1E3A5F"></i>Dépensé</span><span><i style="background:#2F5A9E;opacity:.45"></i>Engagé</span><span><i style="background:#ECE6DA"></i>Prévu</span></div></div>';
  h += '<div class="carte"><h3>Trésorerie — 12 derniers mois <small>encaissements vs décaissements cumulés (Md GNF)</small></h3>' + tresoSVG() + '</div>';
  h += '</div><div class="g">';
  h += '<div class="carte"><h3>Commercialisation tranche 1 <small>' + VENTES.total + ' logements</small></h3><div class="ligne"><span>Actes signés</span><b>' + VENTES.actes + '</b></div>' + barre(VENTES.actes / VENTES.total * 100, 'v') + '<div class="ligne"><span>Réservations (acompte versé)</span><b>' + VENTES.reserves + '</b></div>' + barre(VENTES.reserves / VENTES.total * 100, 'o') + '<div class="ligne"><span>Disponibles</span><b>' + (VENTES.total - VENTES.reserves) + '</b></div><div class="ligne"><span>Prix moyen</span><b>' + fM(VENTES.prixMoyen) + '</b></div><div class="ligne"><span>CA sécurisé (actes)</span><b>' + fMd(VENTES.actes * VENTES.prixMoyen / 1000) + '</b></div><div class="ligne"><span>Acomptes encaissés</span><b>' + fMd(VENTES.acomptes) + '</b></div></div>';
  h += '<div class="carte"><h3>Canaux de vente <small>réservations</small></h3>' + VENTES.canaux.map(c => '<div class="ligne" style="display:grid;grid-template-columns:1fr 3em;gap:.5em"><span>' + c.nom + barre(c.n / VENTES.reserves * 100, 'o') + '</span><b>' + c.n + '</b></div>').join('') + '</div>';
  h += '<div class="carte accent"><h3>Stratégie de vente proposée</h3><ol class="steps"><li><b>Maisons témoins A1</b> visites guidées le samedi, réservation sur place</li><li><b>Trois conventions bancaires</b> crédit acquéreur 15-20 ans, fonctionnaires et salariés</li><li><b>Campagne diaspora</b> Paris, New York, Dakar : visite virtuelle, acompte en ligne</li><li><b>Location-vente</b> sur 15 % des T3 pour élargir la cible</li><li><b>Prix indexés par tranche</b> +4 % à chaque tranche livrée</li></ol></div>';
  h += '</div></div>';
  h += '<div class="carte" style="margin-top:1em"><h3>Compte de résultat prévisionnel du programme <small>2 000 logements · Md GNF</small></h3><div class="scroll"><table class="t"><tr><th>Poste</th><th class="n">Md GNF</th><th class="n">M€</th><th class="n">%</th></tr>' + [['Chiffre d\'affaires', PROG.ca], ['Foncier et assainissement (apport M. Alliou)', 78], ['Études, ingénierie, pilotage', 52], ['VRD et équipements publics', 168], ['Construction des logements', 598], ['Commercialisation et frais financiers', 84], ['Provision aléas', 27]].map((r, i) => '<tr><td>' + r[0] + '</td><td class="n">' + fmt(r[1]) + '</td><td class="n">' + fmt(r[1] * 1e9 / state.taux / 1e6) + '</td><td class="n">' + fmt(r[1] / PROG.ca * 100, 1) + '</td></tr>').join('') + '<tr style="font-weight:700;color:var(--vert)"><td>Résultat prévisionnel</td><td class="n">' + fmt(PROG.ca * k.marge / 100) + '</td><td class="n">' + fmt(PROG.ca * k.marge / 100 * 1e9 / state.taux / 1e6) + '</td><td class="n">' + fmt(k.marge, 1) + '</td></tr></table></div><p class="note" style="margin-top:.6em">Taux indicatif 1 € = ' + fmt(state.taux) + ' GNF. Hypothèses à confirmer avec le maître d\'ouvrage ; le modèle complet (25 ans, financement) est fourni en phase de structuration.</p></div>';
  return h + pied() + '</div>';
};
function tresoSVG() {
  const W = 640, H = 220, ml = 34, mb = 24, mt = 10, mr = 10, w = W - ml - mr, h = H - mt - mb, n = TRESO.mois.length, max = 20;
  const x = i => ml + i / (n - 1) * w, y = v => mt + h - v / max * h;
  let s = '<svg viewBox="0 0 ' + W + ' ' + H + '">';
  [0, 5, 10, 15, 20].forEach(v => s += '<line x1="' + ml + '" x2="' + (W - mr) + '" y1="' + y(v) + '" y2="' + y(v) + '" stroke="#ECE6DA"/><text x="' + (ml - 5) + '" y="' + (y(v) + 4) + '" font-size="10" text-anchor="end">' + v + '</text>');
  TRESO.mois.forEach((m, i) => s += '<text x="' + x(i) + '" y="' + (H - 7) + '" font-size="10" text-anchor="middle">' + m + '</text>');
  const area = TRESO.enc.map((v, i) => x(i) + ',' + y(v)).join(' ') + ' ' + x(n - 1) + ',' + y(0) + ' ' + x(0) + ',' + y(0);
  s += '<polygon points="' + area + '" fill="#2E7D32" opacity=".12"/>';
  s += '<polyline fill="none" stroke="#2E7D32" stroke-width="3" points="' + TRESO.enc.map((v, i) => x(i) + ',' + y(v)).join(' ') + '"/>';
  s += '<polyline fill="none" stroke="#B4532A" stroke-width="3" points="' + TRESO.dec.map((v, i) => x(i) + ',' + y(v)).join(' ') + '"/>';
  s += '<circle cx="' + x(n - 1) + '" cy="' + y(TRESO.enc[n - 1]) + '" r="4" fill="#2E7D32"/><circle cx="' + x(n - 1) + '" cy="' + y(TRESO.dec[n - 1]) + '" r="4" fill="#B4532A"/>';
  return s + '</svg><div class="legende"><span><i style="background:#2E7D32"></i>Encaissements (acomptes, actes) — ' + fMd(TRESO.enc[n - 1]) + '</span><span><i style="background:#B4532A"></i>Décaissements — ' + fMd(TRESO.dec[n - 1]) + '</span><span>Point de croisement atteint en octobre : la tranche s\'autofinance.</span></div>';
}

/* ---- Risques et qualité ---- */
RENDU.risques = () => {
  const k = kpis();
  let h = '<div class="vue"><h1>Risques et qualité</h1><p class="sous">Registre des risques coté probabilité × impact, non-conformités du contrôle qualité, et plans d\'action. Score global : <b>' + fmt(k.risque) + ' / 25</b>.</p>';
  h += '<div class="g g32"><div class="carte"><h3>Registre des risques <small>' + RISQUES.length + ' risques suivis</small></h3><div class="scroll"><table class="t"><tr><th>#</th><th>Risque</th><th class="n">P</th><th class="n">I</th><th class="n">Score</th><th>Responsable</th></tr>' + RISQUES.map(r => { const sc = r.p * r.i; return '<tr><td><b>' + r.id + '</b></td><td>' + r.nom + '<small style="display:block;color:var(--pierre)">' + r.plan + '</small></td><td class="n">' + r.p + '</td><td class="n">' + r.i + '</td><td class="n"><span class="etat ' + (sc >= 15 ? 'rouge' : sc >= 9 ? 'ambre' : '') + '">' + sc + '</span></td><td>' + r.resp + '</td></tr>'; }).join('') + '</table></div></div>';
  h += '<div class="g"><div class="carte"><h3>Matrice probabilité × impact</h3>' + matrice() + '</div>';
  h += '<div class="carte kpi ' + classEtat(k.K[3].etat) + '"><h2>Taux de conformité des contrôles</h2><div class="val num">' + fmt(k.qual) + '<small>%</small></div><div class="sub">184 contrôles ce mois · ' + NC.filter(n => n.etat !== 'Close').length + ' NC ouvertes · 3 majeures</div></div></div></div>';
  h += '<div class="carte" style="margin-top:1em"><h3>Non-conformités <small>contrôle qualité — A. Bah</small></h3><div class="scroll"><table class="t"><tr><th>N°</th><th>Zone</th><th>Objet</th><th>Gravité</th><th>État</th><th>Échéance</th></tr>' + NC.map(n => '<tr><td><b>' + n.id + '</b></td><td>' + n.zone + '</td><td>' + n.obj + '</td><td><span class="etat ' + (n.sev === 'Majeure' ? 'rouge' : 'ambre') + '">' + n.sev + '</span></td><td>' + n.etat + '</td><td class="num">' + n.ech + '</td></tr>').join('') + '</table></div></div>';
  h += '<div class="g g3" style="margin-top:1em"><div class="carte"><h3>Contrôles planifiés</h3><div class="ligne"><span>Recontrôle NC-046 (ferraillage A5)</span><b>Demain</b></div><div class="ligne"><span>Essai de compactage V2</span><b>J+2</b></div><div class="ligne"><span>Réception gros œuvre A4</span><b>J+9</b></div><div class="ligne"><span>Essais d\'étanchéité réseaux A2</span><b>J+12</b></div><div class="ligne"><span>Visite bureau de contrôle</span><b>J+15</b></div></div><div class="carte"><h3>Sécurité (HSE)</h3><div class="ligne"><span>Jours sans accident avec arrêt</span><b style="color:var(--vert)">117</b></div><div class="ligne"><span>Presqu\'accidents déclarés (mois)</span><b>3</b></div><div class="ligne"><span>Port des EPI (contrôle inopiné)</span><b>94 %</b></div><div class="ligne"><span>Briefings sécurité tenus</span><b>26 / 26</b></div></div><div class="carte"><h3>Documents qualité</h3><div class="ligne"><span>Plan d\'assurance qualité</span><b>v2 validé</b></div><div class="ligne"><span>Fiches de contrôle (gâchées, ferraillage)</span><b>412</b></div><div class="ligne"><span>PV de réception îlot A1</span><b>Signé</b></div><div class="ligne"><span>Garantie décennale</span><b>Active</b></div></div></div>';
  return h + pied() + '</div>';
};
function matrice() {
  const cells = {}; RISQUES.forEach(r => { const k = r.p + '-' + r.i; cells[k] = (cells[k] || []).concat(r.id); });
  let h = '<div class="mat"><div class="l"></div>' + [1, 2, 3, 4, 5].map(i => '<div class="l">I' + i + '</div>').join('');
  for (let p = 5; p >= 1; p--) { h += '<div class="l">P' + p + '</div>'; for (let i = 1; i <= 5; i++) { const sc = p * i, c = sc >= 15 ? '#B3261E' : sc >= 9 ? '#C77700' : '#2E7D32'; h += '<div class="c" style="background:' + c + ';opacity:' + (cells[p + '-' + i] ? 1 : .35) + '">' + (cells[p + '-' + i] || []).join(' ') + '</div>'; } }
  return h + '</div><p class="note" style="margin-top:.6em">P = probabilité, I = impact. Rouge ≥ 15 : plan d\'action obligatoire et revue hebdomadaire.</p>';
}

/* ============================================================
   Vues terrain : Chantier, Pointage, RH, Achats
   ============================================================ */
function toutesPhotos() {
  const demo = [
    { ts: addJ(0).setHours(7, 20), auteur: 'S. Condé', equipe: 'Équipe A', zone: 'Îlot A4', legende: 'Pose des panneaux préfabriqués façade, lot 3', url: IMG.prefab, demo: true },
    { ts: addJ(0).setHours(8, 30), auteur: 'A. Bah', equipe: 'Qualité', zone: 'Îlot A5', legende: 'Recontrôle ferraillage semelle S4 après reprise (NC-046)', url: IMG.controle, demo: true },
    { ts: addJ(-1).setHours(16, 10), auteur: 'M. Diallo', equipe: 'Direction', zone: 'Vue générale', legende: 'Avancement général tranche 1, fin de semaine 39', url: IMG.aerien, demo: true },
    { ts: addJ(-1).setHours(11, 0), auteur: 'J. Tiobang Tankeu', equipe: 'T-Architectes', zone: 'Îlot A1', legende: 'Maisons témoins A1 : finitions et plantations', url: IMG.quartier, demo: true }
  ];
  const reel = (remote.ok ? remote.photos : state.photos).map(p => ({ ts: new Date(p.ts).getTime(), auteur: p.auteur, equipe: p.equipe, zone: p.zone, legende: p.legende, url: p.url, lat: p.lat, lng: p.lng, reel: true }));
  return reel.concat(demo).sort((a, b) => b.ts - a.ts);
}
RENDU.chantier = () => {
  const s = state.scen, a = state.applique; const photos = toutesPhotos();
  let h = '<div class="vue"><h1>Chantier — tranche 1</h1><p class="sous">Le chantier vu en direct : photos géolocalisées des équipes, caméras de surveillance, livraisons attendues et journal du jour. <b>Prenez une photo depuis votre téléphone</b> : elle apparaît ici, horodatée et positionnée.</p>';
  h += '<div class="g g4"><div class="carte kpi"><h2>Présents sur site</h2><div class="val num">' + nbPresents() + '<small>/ 18</small></div><div class="sub">' + nbRetards() + ' retards · 1 absence · 1 congé</div></div><div class="carte kpi ' + (s.ciment && !a.ciment ? 'rouge' : 'bleu') + '"><h2>Livraisons cette semaine</h2><div class="val num">' + COMMANDES.filter(c => c.prevu >= 0 && c.prevu <= 7).length + '<small>attendues</small></div><div class="sub">' + (s.ciment && !a.ciment ? '<b style="color:var(--rouge)">Ciment décalé à J+7</b>' : 'Ciment J+2 · fer J+5 · câbles J+7') + '</div></div><div class="carte kpi ' + (CAMERAS.some(c => !c.on) ? 'ambre' : '') + '"><h2>Caméras</h2><div class="val num">' + CAMERAS.filter(c => c.on).length + '<small>/ ' + CAMERAS.length + ' en ligne</small></div><div class="sub">CAM-05 bassin nord hors ligne</div></div><div class="carte kpi"><h2>Îlots actifs</h2><div class="val num">' + ILOTS.filter(i => i.pct > 0 && i.pct < 100).length + '<small>/ 12</small></div><div class="sub">1 réceptionné · 4 à démarrer</div></div></div>';
  h += '<div class="g g32" style="margin-top:1em"><div class="g">';
  h += '<div class="carte"><h3>Journal photo du chantier <small>' + photos.length + ' photos · les plus récentes d\'abord</small></h3><div class="form" style="grid-template-columns:1fr 1fr;margin-bottom:.8em"><label>Zone<select id="phZone">' + ['Vue générale', 'Îlot A1', 'Îlot A2', 'Îlot A3', 'Îlot A4', 'Îlot A5', 'Îlot A6', 'Îlot A7', 'Îlot A8', 'Voirie V1', 'Voirie V2', 'Bassin nord', 'Centrale béton', 'Base vie', 'Magasin'].map(z => '<option>' + z + '</option>').join('') + '</select></label><label>Légende<input id="phLeg" placeholder="Ex. : coulage semelles A6, 3e toupie"></label><label>Auteur<select id="phAuteur">' + AGENTS.map(ag => '<option value="' + ag.id + '">' + esc(ag.nom) + ' — ' + esc(ag.role) + '</option>').join('') + '<option value="visiteur">Visiteur / maître d\'ouvrage</option></select></label><div class="actions" style="align-self:end"><button class="btn prim" id="btnCam">📷 Prendre une photo</button><button class="btn" id="btnGal">Importer</button></div></div><div class="photos" id="photos">' + photos.map(p => photoFig(p)).join('') + '</div></div>';
  h += '<div class="carte"><h3>Avancement par îlot</h3>' + ILOTS.map(i => '<div class="ligne" style="display:grid;grid-template-columns:3.2em 1fr 7em 3.5em;gap:.6em;align-items:center"><b>' + i.id + '</b>' + barre(i.pct, i.pct >= 100 ? 'v' : i.pct > 0 ? '' : '') + '<span style="color:var(--pierre);font-size:.9em">' + i.etape + '</span><b class="num">' + i.pct + ' %</b></div>').join('') + '</div>';
  h += '</div><div class="g">';
  h += '<div class="carte"><h3>Vidéosurveillance <small>6 caméras · détection de mouvement</small></h3><div class="cams">' + CAMERAS.map(c => '<div class="cam ' + (c.on ? '' : 'off') + '" title="' + esc(c.evt) + '"><img src="' + IMG[c.img] + '" alt=""><div class="scan"></div><div class="lab"><i></i>' + c.id + ' · ' + c.nom + '</div><div class="ts">' + (c.on ? dateCourt(new Date()) + ' ' + hhmm(new Date()) : 'HORS LIGNE') + '</div></div>').join('') + '</div><div style="margin-top:.6em">' + CAMERAS.map(c => '<div class="ligne"><span>' + c.id + ' <small>' + c.nom + '</small></span><b style="' + (c.on ? '' : 'color:var(--rouge)') + '">' + c.evt + '</b></div>').join('') + '</div><p class="note" style="margin-top:.6em">Les vignettes sont des illustrations d\'intention. En exploitation, les flux réels des caméras IP du chantier s\'affichent ici, avec enregistrement 30 jours.</p></div>';
  h += '<div class="carte"><h3>Livraisons programmées <small>7 prochains jours</small></h3>' + COMMANDES.filter(c => c.prevu >= -4 && c.prevu <= 7).sort((x, y) => x.prevu - y.prevu).map(c => { const retard = c.etat === 'Retard' || (s.ciment && !a.ciment && c.no === 'BC-2026-118'); const j = (s.ciment && !a.ciment && c.no === 'BC-2026-118') ? 7 : c.prevu; return '<div class="evt ' + (retard ? 'rouge' : c.etat === 'Livrée' ? 'vert' : '') + '"><span class="q">' + (j < 0 ? 'J' + j : j === 0 ? 'Aujourd\'hui' : 'J+' + j) + '</span><span>' + c.art + '<span class="d">' + four(c.four).nom + ' · ' + c.zone + ' · ' + c.no + '</span></span><span class="s">' + (retard ? 'Retard' + (c.retardJ ? ' ' + c.retardJ + ' j' : ' 5 j') : c.etat) + '</span></div>'; }).join('') + '<div class="actions" style="margin-top:.7em"><button class="btn ' + (s.ciment ? 'lat' : '') + '" data-scen="ciment">' + (s.ciment ? '✓ Retard ciment simulé' : 'Simuler un retard de livraison') + '</button>' + (s.ciment ? '<button class="btn sm" data-scen="reset">Rétablir</button>' : '') + '</div></div>';
  h += '<div class="carte"><h3>Journal du jour</h3>' + JOURNAL.map(j => '<div class="evt ' + j.c + '"><span class="q">' + j.h + '</span><span>' + j.t + '</span><span class="s">' + j.s + '</span></div>').join('') + '</div>';
  h += '</div></div>';
  return h + pied() + '</div>';
};
function photoFig(p) { const d = new Date(p.ts); return '<figure><img src="' + p.url + '" alt="" loading="lazy"><span class="tag ' + (p.reel ? 'reel' : '') + '">' + (p.reel ? 'Photo terrain' : 'Illustration') + '</span><figcaption>' + esc(p.legende || p.zone) + '<i>' + esc(p.zone) + ' · ' + esc(p.auteur) + ' · ' + dateCourt(d) + ' ' + hhmm(d) + (p.lat ? ' · GPS ' + Number(p.lat).toFixed(4) + ', ' + Number(p.lng).toFixed(4) : '') + '</i></figcaption></figure>'; }
MONTE.chantier = m => {
  monteScenarios(m);
  $('#btnCam', m).addEventListener('click', () => $('#fileCam').click());
  $('#btnGal', m).addEventListener('click', () => $('#fileGal').click());
};
function nbPresents() { const base = Object.values(PRESENCE_DEMO).filter(p => p.arr && !p.nuit).length; const reels = new Set(pointagesDuJour().filter(p => p.reel && p.type === 'arrivee').map(p => p.agent_id)); return base + reels.size; }
function nbRetards() { return Object.values(PRESENCE_DEMO).filter(p => p.retard).length; }

/* ---- Prise de photo (téléphone) ---- */
async function traiterPhoto(file) {
  if (!file) return;
  toast('Traitement de la photo…');
  const dataUrl = await redimensionner(file, remote.ok ? 1280 : 900, remote.ok ? .82 : .7);
  const pos = await positionRapide();
  const auteurId = ($('#phAuteur') || {}).value || 'visiteur'; const ag = agent(auteurId);
  const rec = { ts: new Date().toISOString(), auteur: ag ? ag.nom : 'Visiteur', equipe: ag ? ag.equipe : 'Visite', zone: ($('#phZone') || {}).value || 'Vue générale', legende: ($('#phLeg') || {}).value || 'Photo de chantier', lat: pos && pos.lat, lng: pos && pos.lng, programme: SUPA.programme };
  if (remote.ok) {
    try {
      const blob = await (await fetch(dataUrl)).blob(); const path = SUPA.programme + '/' + Date.now() + '_' + uid() + '.jpg';
      const { error } = await remote.client.storage.from(SUPA.bucket).upload(path, blob, { contentType: 'image/jpeg', upsert: false }); if (error) throw error;
      rec.url = remote.client.storage.from(SUPA.bucket).getPublicUrl(path).data.publicUrl; rec.path = path;
      const r2 = await remote.client.from('p165_photos').insert(rec); if (r2.error) throw r2.error;
      await chargerDistant();
    } catch (e) { console.warn(e); rec.url = dataUrl; state.photos.unshift(rec); save(); toast('Serveur injoignable : photo conservée sur cet appareil.'); }
  } else { rec.url = dataUrl; state.photos.unshift(rec); if (state.photos.length > 40) state.photos.length = 40; save(); }
  toast('<b>Photo publiée</b> · ' + rec.zone + ' · ' + hhmm(new Date()) + (pos ? ' · position enregistrée' : ' · sans position'));
  if (state.vue === 'chantier') go('chantier');
}
function redimensionner(file, max, q) {
  return new Promise(res => { const img = new Image(); const u = URL.createObjectURL(file); img.onload = () => { const r = Math.min(1, max / Math.max(img.width, img.height)); const c = document.createElement('canvas'); c.width = Math.round(img.width * r); c.height = Math.round(img.height * r); c.getContext('2d').drawImage(img, 0, 0, c.width, c.height); URL.revokeObjectURL(u); res(c.toDataURL('image/jpeg', q)); }; img.onerror = () => res(u); img.src = u; });
}
function positionRapide() { return new Promise(res => { if (!navigator.geolocation) return res(null); const t = setTimeout(() => res(null), 6000); navigator.geolocation.getCurrentPosition(p => { clearTimeout(t); res({ lat: p.coords.latitude, lng: p.coords.longitude, acc: p.coords.accuracy }); }, () => { clearTimeout(t); res(null); }, { enableHighAccuracy: true, timeout: 5500, maximumAge: 60000 }); }); }
$('#fileCam').addEventListener('change', e => { traiterPhoto(e.target.files[0]); e.target.value = ''; });
$('#fileGal').addEventListener('change', e => { traiterPhoto(e.target.files[0]); e.target.value = ''; });

/* ---- Pointage et émargement ---- */
function pointagesDuJour() {
  const t0 = new Date(); t0.setHours(0, 0, 0, 0);
  const src = remote.ok ? remote.pointages : state.pointages;
  return src.filter(p => new Date(p.ts) >= t0).map(p => Object.assign({}, p, { reel: true }));
}
RENDU.pointage = () => {
  const reels = pointagesDuJour(); const sel = agent(state.agentSel) || AGENTS[4];
  let h = '<div class="vue"><h1>Pointage et émargement</h1><p class="sous">Chaque agent signe sur le téléphone du chef d\'équipe à l\'arrivée et au départ. La signature enregistre automatiquement <b>la position GPS, la date et l\'heure</b>, et l\'outil vérifie que l\'agent est bien sur le site. La paie se calcule ensuite sur les présences réelles.</p>';
  h += '<div class="g g23"><div class="carte accent"><h3>Émarger maintenant</h3><div class="form"><label>Agent<select id="sigAgent">' + AGENTS.map(a => '<option value="' + a.id + '" ' + (a.id === sel.id ? 'selected' : '') + '>' + esc(a.nom) + ' — ' + esc(a.role) + '</option>').join('') + '<option value="visiteur">Visiteur — M. Alliou (test)</option></select></label><div><div class="seg" id="sigType"><button data-t="arrivee" class="on">Arrivée</button><button data-t="depart">Départ</button></div></div><div><div style="font-size:.88em;color:var(--pierre);font-weight:600;margin-bottom:.3em">Signature de l\'agent</div><div class="sig" id="sigBox"><canvas id="sigCv"></canvas><div class="hint" id="sigHint">Signez ici avec le doigt</div><div class="ln"></div></div><div class="actions" style="margin-top:.4em"><button class="btn sm" id="sigClear">Effacer</button><span style="font-size:.85em;color:var(--pierre)" id="sigDevice"></span></div></div><div class="gps wait" id="gps"><div class="dot"></div><div><b>Acquisition de la position…</b><small>Autorisez la localisation si le téléphone le demande.</small></div></div><div class="actions"><button class="btn prim" id="sigOk" style="font-size:1.05em">Valider l\'émargement</button><button class="btn" id="gpsRetry">Relancer le GPS</button></div><p class="note">Horodatage automatique : ' + dateFr(new Date()) + '. Les émargements de démonstration sont marqués comme tels.</p></div></div>';
  h += '<div class="g"><div class="carte"><h3>Feuille de présence du jour <small>' + dateCourt(new Date()) + ' · ' + nbPresents() + ' présents</small></h3><div class="scroll"><table class="t" id="tabPres"><tr><th>Agent</th><th>Équipe</th><th>Arrivée</th><th>Départ</th><th>Position</th><th>Signature</th><th>Statut</th></tr>';
  reels.slice().sort((a, b) => new Date(b.ts) - new Date(a.ts)).forEach(p => { const d = new Date(p.ts); h += '<tr style="background:var(--vert-fond)"><td><b>' + esc(p.agent_nom) + '</b><small style="display:block;color:var(--pierre)">' + esc(p.role || '') + '</small></td><td>' + esc(p.equipe || '') + '</td><td class="num">' + (p.type === 'arrivee' ? hhmm(d) : '—') + '</td><td class="num">' + (p.type === 'depart' ? hhmm(d) : '—') + '</td><td>' + (p.lat ? '<span class="etat ' + (p.sur_site ? '' : 'rouge') + '">' + (p.sur_site ? 'Sur site' : 'Hors site') + ' · ' + fDist(p.distance_m || 0) + '</span><small style="display:block;color:var(--pierre)">± ' + fmt(p.precision_m || 0) + ' m · ' + Number(p.lat).toFixed(5) + ', ' + Number(p.lng).toFixed(5) + '</small>' : '<span class="etat gris">Sans GPS</span>') + '</td><td>' + (p.signature ? '<img class="sigmini" src="' + p.signature + '" alt="signature">' : '—') + '</td><td><span class="etat bleu">Réel · ' + esc((p.device || '').slice(0, 14)) + '</span></td></tr>'; });
  AGENTS.forEach(a => { const p = PRESENCE_DEMO[a.id]; let st, cls; if (p.absent) { st = p.absent; cls = 'rouge'; } else if (p.conge) { st = p.conge; cls = 'gris'; } else if (p.retard) { st = 'Retard ' + minutesRetard(p.arr) + ' min'; cls = 'ambre'; } else if (p.nuit) { st = 'Poste de nuit'; cls = 'bleu'; } else { st = 'À l\'heure'; cls = ''; } h += '<tr><td><b>' + esc(a.nom) + '</b><small style="display:block;color:var(--pierre)">' + esc(a.role) + '</small></td><td>' + esc(a.equipe) + '</td><td class="num">' + (p.arr || '—') + '</td><td class="num">' + (p.dep || '—') + '</td><td>' + (p.arr ? '<span class="etat">Sur site · ' + fmt(80 + (a.id.charCodeAt(2) * 37) % 600) + ' m</span>' : '—') + '</td><td>' + (p.arr ? '<svg class="sigmini" viewBox="0 0 110 44"><path d="' + sigDemo(a.id) + '" fill="none" stroke="#1E3A5F" stroke-width="1.6" stroke-linecap="round"/></svg>' : '—') + '</td><td><span class="etat ' + cls + '">' + st + '</span></td></tr>'; });
  h += '</table></div></div>';
  h += '<div class="g g2"><div class="carte"><h3>Contrôle automatique</h3><div class="ligne"><span>Rayon de tolérance autour du centre du site</span><b>' + fmt(state.site.rayon) + ' m</b></div><div class="ligne"><span>Heure limite d\'arrivée (retard au-delà)</span><b>07:30</b></div><div class="ligne"><span>Retards ce matin</span><b style="color:var(--ambre)">' + nbRetards() + '</b></div><div class="ligne"><span>Émargements hors site aujourd\'hui</span><b style="color:' + (reels.some(p => p.lat && !p.sur_site) ? 'var(--rouge)' : 'var(--vert)') + '">' + reels.filter(p => p.lat && !p.sur_site).length + '</b></div><div class="ligne"><span>Émargements réels enregistrés aujourd\'hui</span><b>' + reels.length + '</b></div><p class="note" style="margin-top:.6em">Un émargement hors site ou après 07:30 déclenche une alerte au chef de chantier et une ligne dans le journal RH.</p></div>';
  h += '<div class="carte"><h3>Ouvrir sur un téléphone</h3><p style="font-size:.9em;color:var(--pierre);margin-bottom:.6em">Scannez ce code pour émarger ou prendre une photo depuis votre téléphone. Les données apparaissent ici en temps réel.</p><div id="qr" class="qr"></div><p style="font-size:.85em;margin-top:.5em;word-break:break-all"><a href="' + URL_PUBLIQUE + '" target="_blank" rel="noopener">' + URL_PUBLIQUE + '</a></p></div></div>';
  h += '</div></div>';
  return h + pied() + '</div>';
};
function minutesRetard(hm) { const [h, m] = hm.split(':').map(Number); return h * 60 + m - 450; }
function sigDemo(id) { let s = 0; for (const c of id) s = (s * 31 + c.charCodeAt(0)) % 997; const r = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; }; let d = 'M8 ' + (26 + r() * 8).toFixed(0); for (let i = 1; i <= 6; i++) d += ' Q' + (8 + i * 15 - 8 + r() * 10).toFixed(0) + ' ' + (4 + r() * 36).toFixed(0) + ' ' + (8 + i * 15).toFixed(0) + ' ' + (18 + r() * 16).toFixed(0); return d; }

let sigPad = null, gpsPos = null;
MONTE.pointage = m => {
  const cv = $('#sigCv', m), box = $('#sigBox', m), hint = $('#sigHint', m); const ctx = cv.getContext('2d'); let drawing = false, strokes = 0, last = null;
  const size = () => { const r = box.getBoundingClientRect(), dpr = window.devicePixelRatio || 1; cv.width = r.width * dpr; cv.height = r.height * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.lineWidth = 2.2; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = '#0C1C35'; }; size();
  const pt = e => { const r = cv.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
  cv.addEventListener('pointerdown', e => { e.preventDefault(); drawing = true; last = pt(e); strokes++; hint.hidden = true; cv.setPointerCapture(e.pointerId); });
  cv.addEventListener('pointermove', e => { if (!drawing) return; const p = pt(e); ctx.beginPath(); ctx.moveTo(last.x, last.y); ctx.lineTo(p.x, p.y); ctx.stroke(); last = p; });
  const up = () => { drawing = false; }; cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up); cv.addEventListener('pointerleave', up);
  sigPad = { clear() { ctx.clearRect(0, 0, cv.width, cv.height); strokes = 0; hint.hidden = false; }, empty: () => strokes === 0, png() { const o = document.createElement('canvas'); o.width = 300; o.height = 110; const c = o.getContext('2d'); c.fillStyle = '#fff'; c.fillRect(0, 0, 300, 110); c.drawImage(cv, 0, 0, 300, 110); return o.toDataURL('image/png'); } };
  $('#sigClear', m).addEventListener('click', () => sigPad.clear());
  $('#sigDevice', m).textContent = 'Appareil : ' + appareil();
  $$('#sigType button', m).forEach(b => b.addEventListener('click', () => { $$('#sigType button', m).forEach(x => x.classList.remove('on')); b.classList.add('on'); }));
  $('#sigAgent', m).addEventListener('change', e => { state.agentSel = e.target.value; save(); });
  const gpsEl = $('#gps', m);
  const lancerGPS = () => {
    gpsPos = null; gpsEl.className = 'gps wait'; gpsEl.innerHTML = '<div class="dot"></div><div><b>Acquisition de la position…</b><small>Autorisez la localisation si le téléphone le demande.</small></div>';
    if (!navigator.geolocation) { gpsEl.className = 'gps ko'; gpsEl.innerHTML = '<div class="dot"></div><div><b>Localisation indisponible sur cet appareil</b><small>L\'émargement sera enregistré sans position.</small></div>'; return; }
    navigator.geolocation.getCurrentPosition(p => {
      const d = haversine(p.coords.latitude, p.coords.longitude, state.site.lat, state.site.lng); const sur = d <= state.site.rayon;
      gpsPos = { lat: p.coords.latitude, lng: p.coords.longitude, acc: p.coords.accuracy, dist: d, sur };
      gpsEl.className = 'gps ' + (sur ? 'ok' : 'ko'); gpsEl.innerHTML = '<div class="dot"></div><div><b>' + (sur ? 'Sur le site' : 'Hors du site') + ' · à ' + fDist(d) + ' du centre</b><small>' + p.coords.latitude.toFixed(5) + ', ' + p.coords.longitude.toFixed(5) + ' · précision ± ' + fmt(p.coords.accuracy) + ' m · ' + hhmm(new Date()) + '</small></div>';
    }, err => { gpsEl.className = 'gps ko'; gpsEl.innerHTML = '<div class="dot"></div><div><b>Position refusée ou indisponible</b><small>' + (location.protocol === 'file:' ? 'Le fichier local ne permet pas le GPS : utilisez la version en ligne (pilote165). ' : '') + 'L\'émargement sera enregistré sans position.</small></div>'; }, { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 });
  };
  lancerGPS(); $('#gpsRetry', m).addEventListener('click', lancerGPS);
  $('#sigOk', m).addEventListener('click', async () => {
    if (sigPad.empty()) { toast('<b>Signature manquante.</b> L\'agent doit signer dans le cadre.'); return; }
    const id = $('#sigAgent', m).value; const ag = agent(id); const type = $('#sigType .on', m).dataset.t;
    const rec = { programme: SUPA.programme, agent_id: id, agent_nom: ag ? ag.nom : 'M. Alliou (visiteur)', role: ag ? ag.role : 'Maître d\'ouvrage', equipe: ag ? ag.equipe : 'Visite', type, ts: new Date().toISOString(), lat: gpsPos && gpsPos.lat, lng: gpsPos && gpsPos.lng, precision_m: gpsPos && Math.round(gpsPos.acc), distance_m: gpsPos && Math.round(gpsPos.dist), sur_site: gpsPos ? gpsPos.sur : null, signature: sigPad.png(), device: appareil() };
    const b = $('#sigOk', m); b.disabled = true; b.textContent = 'Enregistrement…';
    let ok = false;
    if (remote.ok) { try { const { error } = await remote.client.from('p165_pointages').insert(rec); if (error) throw error; ok = true; await chargerDistant(); } catch (e) { console.warn(e); } }
    if (!ok) { state.pointages.unshift(rec); if (state.pointages.length > 200) state.pointages.length = 200; save(); }
    toast('<b>Émargement enregistré</b> · ' + rec.agent_nom + ' · ' + (type === 'arrivee' ? 'arrivée' : 'départ') + ' ' + hhmm(new Date()) + (gpsPos ? ' · ' + (gpsPos.sur ? 'sur site' : '<span style="color:#ff9c8a">hors site</span>') + ' (' + fDist(gpsPos.dist) + ')' : ' · sans position') + (ok ? ' · synchronisé' : ' · sur cet appareil'));
    go('pointage');
  });
  const qr = $('#qr', m); try { if (window.qrcode) { const q = qrcode(0, 'M'); q.addData(URL_PUBLIQUE); q.make(); qr.innerHTML = q.createSvgTag({ cellSize: 4, margin: 2, scalable: true }); } else qr.innerHTML = '<small>Code QR indisponible hors ligne — saisissez l\'adresse ci-dessous.</small>'; } catch (e) { qr.innerHTML = ''; }
};
function appareil() { const u = navigator.userAgent; if (/iPhone/.test(u)) return 'iPhone'; if (/iPad/.test(u)) return 'iPad'; if (/Android/.test(u)) return /Mobile/.test(u) ? 'Android' : 'Tablette Android'; if (/Mac/.test(u)) return 'Mac'; if (/Windows/.test(u)) return 'PC Windows'; return 'Navigateur'; }

/* ---- Ressources humaines ---- */
RENDU.rh = () => {
  const equipes = {}; AGENTS.forEach(a => { equipes[a.equipe] = equipes[a.equipe] || { n: 0, p: 0 }; equipes[a.equipe].n++; if (PRESENCE_DEMO[a.id].arr) equipes[a.equipe].p++; });
  const masse = AGENTS.reduce((s, a) => s + a.sal * PAIE_SEPT[a.id][0], 0), acomptes = AGENTS.reduce((s, a) => s + PAIE_SEPT[a.id][3], 0);
  let h = '<div class="vue"><h1>Ressources humaines</h1><p class="sous">Effectifs, présences, retards, absences, congés et paie. Tout découle des émargements signés sur le terrain : <b>la paie se calcule sur les jours réellement pointés</b>.</p>';
  h += '<div class="g g4"><div class="carte kpi"><h2>Effectif</h2><div class="val num">18<small>agents</small></div><div class="sub">5 équipes · 3 encadrants</div></div><div class="carte kpi"><h2>Présents aujourd\'hui</h2><div class="val num">' + nbPresents() + '<small>/ 18</small></div><div class="sub">taux de présence ' + fmt(nbPresents() / 18 * 100) + ' %</div></div><div class="carte kpi ambre"><h2>Retards et absences</h2><div class="val num">' + nbRetards() + ' <small>retards</small></div><div class="sub">1 absence non justifiée · 1 congé</div></div><div class="carte kpi bleu"><h2>Masse salariale septembre</h2><div class="val num">' + fmt(masse / 1e6, 1) + '<small>M GNF</small></div><div class="sub">' + fEur(masse / 1e9) + ' · acomptes ' + fmt(acomptes / 1e6, 1) + ' M</div></div></div>';
  h += '<div class="g g32" style="margin-top:1em"><div class="g">';
  h += '<div class="carte"><h3>Paie de septembre <small>calculée sur les pointages · GNF</small></h3><div class="scroll"><table class="t"><tr><th>Agent</th><th>Poste</th><th class="n">Jours</th><th class="n">Retards</th><th class="n">Abs.</th><th class="n">Salaire/j</th><th class="n">Brut</th><th class="n">Acompte</th><th class="n">Net à payer</th></tr>' + AGENTS.map(a => { const p = PAIE_SEPT[a.id], brut = a.sal * p[0], net = brut - p[3]; return '<tr><td><b>' + esc(a.nom) + '</b></td><td style="color:var(--pierre)">' + esc(a.role) + '</td><td class="n">' + p[0] + '</td><td class="n" style="' + (p[1] >= 4 ? 'color:var(--rouge);font-weight:700' : '') + '">' + p[1] + '</td><td class="n" style="' + (p[2] >= 3 ? 'color:var(--rouge);font-weight:700' : '') + '">' + p[2] + '</td><td class="n">' + fmt(a.sal) + '</td><td class="n">' + fmt(brut) + '</td><td class="n">' + (p[3] ? fmt(p[3]) : '—') + '</td><td class="n"><b>' + fmt(net) + '</b></td></tr>'; }).join('') + '<tr style="font-weight:700"><td colspan="6">Total</td><td class="n">' + fmt(masse) + '</td><td class="n">' + fmt(acomptes) + '</td><td class="n">' + fmt(masse - acomptes) + '</td></tr></table></div><p class="note" style="margin-top:.6em">Les retards au-delà de 30 minutes cumulés sont décomptés en demi-journée selon le règlement de chantier. Paiement par mobile money ou virement, bordereau généré automatiquement.</p></div>';
  h += '<div class="carte"><h3>Congés et absences planifiées</h3><div class="scroll"><table class="t"><tr><th>Agent</th><th>Type</th><th>Du</th><th>Au</th><th>État</th><th>Remplacement</th></tr>' + CONGES.map(c => '<tr><td><b>' + esc(agent(c.agent).nom) + '</b></td><td>' + c.type + '</td><td class="num">' + c.du.slice(8) + '/' + c.du.slice(5, 7) + '</td><td class="num">' + c.au.slice(8) + '/' + c.au.slice(5, 7) + '</td><td><span class="etat ' + (c.etat === 'À valider' ? 'ambre' : c.etat === 'En cours' ? 'bleu' : c.etat === 'Clos' ? 'gris' : '') + '">' + c.etat + '</span></td><td style="color:' + (c.remplacant.includes('à traiter') ? 'var(--rouge)' : 'var(--pierre)') + '">' + c.remplacant + '</td></tr>').join('') + '</table></div></div>';
  h += '</div><div class="g">';
  h += '<div class="carte"><h3>Présence par équipe</h3>' + Object.keys(equipes).map(e => '<div class="ligne" style="display:grid;grid-template-columns:1fr 4em;gap:.5em"><span>' + e + barre(equipes[e].p / equipes[e].n * 100, equipes[e].p === equipes[e].n ? 'v' : 'a') + '</span><b>' + equipes[e].p + ' / ' + equipes[e].n + '</b></div>').join('') + '</div>';
  h += '<div class="carte"><h3>Alertes RH</h3><div class="alerte rouge"><div class="sev"></div><div><b>Fodé Yansané — absence non justifiée</b><small>3e absence du mois · entretien à prévoir avec le chef de chantier</small></div></div><div class="alerte ambre"><div class="sev"></div><div><b>Alpha Keïta — 5 retards en septembre, 1 ce matin</b><small>Avertissement écrit selon le règlement</small></div></div><div class="alerte ambre"><div class="sev"></div><div><b>Congé O. Touré (2 → 8 nov.) sans remplaçant</b><small>Aucun conducteur d\'engin disponible : louer un conducteur ou décaler</small></div></div><div class="alerte bleu"><div class="sev"></div><div><b>Formation drone — M. Sylla, 13-14 oct.</b><small>Levés topographiques 3× plus rapides sur les tranches 2-4</small></div></div></div>';
  h += '<div class="carte"><h3>Chantier-école <small>transfert de compétences</small></h3><div class="ligne"><span>Compagnons en formation</span><b>24</b></div><div class="ligne"><span>Déjà qualifiés (maçonnerie, ferraillage)</span><b>11</b></div><div class="ligne"><span>Emplois locaux créés (tranche 1)</span><b>142</b></div><div class="ligne"><span>Part de main-d\'œuvre guinéenne</span><b>96 %</b></div></div>';
  h += '</div></div>';
  return h + pied() + '</div>';
};

/* ---- Achats et fournisseurs ---- */
RENDU.achats = () => {
  const s = state.scen, a = state.applique;
  const cmd = COMMANDES.map(c => Object.assign({}, c)); if (s.ciment && !a.ciment) { const c = cmd.find(x => x.no === 'BC-2026-118'); c.etat = 'Retard'; c.retardJ = 5; c.prevu = 7; }
  const stocks = STOCKS.map(x => Object.assign({}, x)); if (s.ciment && !a.ciment) stocks[0].couv = 4;
  const encours = FOURNISSEURS.reduce((x, f) => x + f.encours, 0);
  let h = '<div class="vue"><h1>Achats et fournisseurs</h1><p class="sous">Commandes, livraisons programmées, stocks critiques et notation des fournisseurs. Un retard de livraison déclenche immédiatement une alerte et son impact sur le délai est recalculé dans le cockpit.</p>';
  h += '<div class="g g4"><div class="carte kpi bleu"><h2>Encours fournisseurs</h2><div class="val num">' + fmt(encours, 1) + '<small>Md GNF</small></div><div class="sub">' + FOURNISSEURS.length + ' fournisseurs actifs</div></div><div class="carte kpi ' + (cmd.some(c => c.etat === 'Retard') ? (s.ciment && !a.ciment ? 'rouge' : 'ambre') : '') + '"><h2>Livraisons en retard</h2><div class="val num">' + cmd.filter(c => c.etat === 'Retard').length + '<small>commande(s)</small></div><div class="sub">' + cmd.filter(c => c.etat === 'Retard').map(c => c.art.split(' — ')[0]).join(' · ') + '</div></div><div class="carte kpi ' + (stocks.some(x => x.couv <= x.seuil) ? 'rouge' : stocks.some(x => x.couv <= x.seuil + 2) ? 'ambre' : '') + '"><h2>Stocks sous seuil</h2><div class="val num">' + stocks.filter(x => x.couv <= x.seuil).length + '<small>article(s)</small></div><div class="sub">' + stocks.filter(x => x.couv <= x.seuil + 2).map(x => x.art + ' ' + x.couv + ' j').join(' · ') + '</div></div><div class="carte kpi"><h2>Ponctualité fournisseurs</h2><div class="val num">' + fmt(100 - FOURNISSEURS.reduce((x, f) => x + f.retards, 0) / FOURNISSEURS.reduce((x, f) => x + f.livraisons, 0) * 100) + '<small>%</small></div><div class="sub">' + FOURNISSEURS.reduce((x, f) => x + f.retards, 0) + ' retards sur ' + FOURNISSEURS.reduce((x, f) => x + f.livraisons, 0) + ' livraisons</div></div></div>';
  h += '<div class="g g32" style="margin-top:1em"><div class="g">';
  h += '<div class="carte"><h3>Commandes et livraisons <small>' + cmd.length + ' bons de commande actifs · M GNF</small></h3><div class="actions" style="margin-bottom:.7em"><button class="btn ' + (s.ciment ? 'lat' : 'or') + '" data-scen="ciment">' + (s.ciment ? '✓ Retard ciment simulé' : 'Simuler un retard de livraison (ciment)') + '</button>' + (s.ciment ? '<button class="btn sm" data-scen="reset">Rétablir</button>' : '') + '</div><div class="scroll"><table class="t"><tr><th>N° BC</th><th>Article</th><th>Fournisseur</th><th class="n">Qté</th><th class="n">Montant</th><th>Livraison</th><th>État</th></tr>' + cmd.sort((x, y) => x.prevu - y.prevu).map(c => '<tr' + (c.etat === 'Retard' ? ' style="background:var(--rouge-fond)"' : '') + '><td><b>' + c.no + '</b></td><td>' + c.art + '<small style="display:block;color:var(--pierre)">' + c.zone + '</small></td><td>' + four(c.four).nom + '</td><td class="n">' + c.qte + '</td><td class="n">' + fmt(c.montant) + '</td><td class="num">' + dateCourt(addJ(c.prevu)) + ' <small style="color:var(--pierre)">(' + (c.prevu < 0 ? 'J' + c.prevu : c.prevu === 0 ? 'auj.' : 'J+' + c.prevu) + ')</small></td><td><span class="etat ' + ({ 'Livrée': '', 'En transit': 'bleu', 'Confirmée': 'gris', 'Planifiée': 'gris', 'Retard': 'rouge' })[c.etat] + '">' + c.etat + (c.retardJ ? ' · ' + c.retardJ + ' j' : '') + '</span></td></tr>').join('') + '</table></div></div>';
  h += '<div class="carte"><h3>Notation des fournisseurs <small>délai · qualité · prix</small></h3><div class="scroll"><table class="t"><tr><th>Fournisseur</th><th>Famille</th><th>Délai</th><th>Qualité</th><th>Prix</th><th class="n">Livr.</th><th class="n">Retards</th><th class="n">Encours</th></tr>' + FOURNISSEURS.map(f => '<tr><td><b>' + f.nom + '</b><small style="display:block;color:var(--pierre)">' + f.ville + '</small></td><td>' + f.fam + '</td><td>' + etoiles(f.delai) + '</td><td>' + etoiles(f.qualite) + '</td><td>' + etoiles(f.prix) + '</td><td class="n">' + f.livraisons + '</td><td class="n" style="' + (f.retards >= 2 ? 'color:var(--rouge);font-weight:700' : '') + '">' + f.retards + '</td><td class="n">' + fmt(f.encours, 1) + ' Md</td></tr>').join('') + '</table></div></div>';
  h += '</div><div class="g">';
  h += '<div class="carte"><h3>Stocks critiques <small>jours de couverture</small></h3>' + stocks.map(x => '<div class="ligne" style="display:grid;grid-template-columns:7em 1fr 5em;gap:.6em;align-items:center"><span>' + x.art + '<small>' + x.stock + '</small></span>' + barre(Math.min(100, x.couv / 25 * 100), x.couv <= x.seuil ? 'r' : x.couv <= x.seuil + 2 ? 'a' : 'v', x.seuil / 25 * 100) + '<b class="num" style="' + (x.couv <= x.seuil ? 'color:var(--rouge)' : '') + '">' + x.couv + ' j</b></div>').join('') + '<div class="legende"><span><i style="background:#B4532A;width:2px"></i>Seuil d\'alerte</span></div></div>';
  h += '<div class="carte"><h3>Règles d\'achat du programme</h3><ol class="steps"><li><b>Deux fournisseurs qualifiés</b> par matériau stratégique (ciment, acier)</li><li><b>Commande à J-20</b> dès que la couverture passe sous 15 jours</li><li><b>Pénalités de retard</b> 0,5 % par jour dès J+2, inscrites aux contrats cadres</li><li><b>Achats groupés</b> tranches 1 et 2 pour l\'acier et les panneaux</li><li><b>Réception contradictoire</b> photo + signature du magasinier à chaque livraison</li></ol></div>';
  h += '<div class="carte"><h3>Demandes d\'achat en attente</h3><div class="evt"><span class="q">DA-087</span><span>Gasoil 8 000 L — engins VRD<span class="d">Urgent : 6 j de couverture</span></span><span class="s">À valider</span></div><div class="evt"><span class="q">DA-088</span><span>Pompe de secours 150 m³/h (bassin nord)<span class="d">Recommandé avant saison des pluies</span></span><span class="s">Devis reçu</span></div><div class="evt"><span class="q">DA-089</span><span>Caméra de remplacement CAM-05 + alimentation solaire<span class="d">Technicien demandé</span></span><span class="s">À valider</span></div></div>';
  h += '</div></div>';
  return h + pied() + '</div>';
};
MONTE.achats = monteScenarios;

/* ============================================================
   Vues : Exploitation et maintenance, Qui vous accompagne, Paramètres et démo
   ============================================================ */
RENDU.exploitation = () => {
  const E = EXPLOITATION; const clos = E.tickets.filter(t => t.etat === 'Clos').length; const chTot = E.charges.reduce((s, c) => s + c.m, 0);
  let h = '<div class="vue"><h1>Exploitation et maintenance</h1><p class="sous">Après la remise des clés, l\'outil continue : tickets des habitants, charges du quartier, garanties, satisfaction. Le quartier reste un actif entretenu, ce qui soutient le prix des tranches suivantes. Îlot A1 : <b>' + E.livrees + ' maisons livrées, ' + E.occupees + ' occupées</b>.</p>';
  h += '<div class="g g4"><div class="carte kpi"><h2>Logements livrés</h2><div class="val num">' + E.livrees + '<small>/ 2 000</small></div><div class="sub">îlot A1 · ' + E.occupees + ' occupés</div></div><div class="carte kpi ' + (E.tickets.some(t => t.etat === 'Ouvert') ? 'ambre' : '') + '"><h2>Tickets après-vente</h2><div class="val num">' + E.tickets.filter(t => t.etat !== 'Clos').length + '<small>ouverts</small></div><div class="sub">' + clos + ' clos ce mois · délai moyen 1,8 j</div></div><div class="carte kpi bleu"><h2>Charges mensuelles A1</h2><div class="val num">' + fmt(chTot) + '<small>M GNF</small></div><div class="sub">' + fmt(chTot * 1e6 / E.livrees) + ' GNF par maison</div></div><div class="carte kpi"><h2>Satisfaction habitants</h2><div class="val num">' + fmt(E.satisfaction, 1) + '<small>/ 5</small></div><div class="sub">enquête à 3 mois · 27 réponses</div></div></div>';
  h += '<div class="g g32" style="margin-top:1em"><div class="g"><div class="carte"><h3>Tickets de maintenance <small>habitants et gestionnaire de quartier</small></h3><div class="scroll"><table class="t"><tr><th>N°</th><th>Logement</th><th>Objet</th><th>État</th><th>Délai</th></tr>' + E.tickets.map(t => '<tr><td><b>' + t.id + '</b></td><td>' + t.lgt + '</td><td>' + t.obj + '</td><td><span class="etat ' + ({ 'Clos': '', 'Planifié': 'bleu', 'En cours': 'bleu', 'Ouvert': 'ambre' })[t.etat] + '">' + t.etat + '</span></td><td class="num">' + t.delai + '</td></tr>').join('') + '</table></div></div>';
  h += '<div class="carte"><h3>Garanties et obligations</h3><div class="ligne"><span>Garantie de parfait achèvement (1 an)</span><b>Active jusqu\'au 30/06/2027</b></div><div class="ligne"><span>Garantie biennale (équipements)</span><b>Active</b></div><div class="ligne"><span>Garantie décennale (structure)</span><b>Active · assureur notifié</b></div><div class="ligne"><span>Contrat de maintenance réseaux (eau, éclairage)</span><b>Préfab Afrique Services · 3 ans</b></div><div class="ligne"><span>Règlement de copropriété et syndic</span><b>Adopté · AG du 12/09</b></div></div></div>';
  h += '<div class="g"><div class="carte"><h3>Charges du quartier A1 <small>par mois · M GNF</small></h3>' + E.charges.map(c => '<div class="ligne" style="display:grid;grid-template-columns:1fr 3em;gap:.5em"><span>' + c.lib + barre(c.m / chTot * 100, 'b') + '</span><b>' + c.m + '</b></div>').join('') + '</div>';
  h += '<div class="carte accent"><h3>Pourquoi suivre jusqu\'à la maintenance</h3><ol class="steps"><li><b>Prix des tranches suivantes</b> un quartier entretenu se vend 8 à 12 % plus cher</li><li><b>Boucle qualité</b> chaque ticket remonte vers les îlots en construction (détails, matériaux)</li><li><b>Revenus récurrents</b> gestion de quartier, maintenance, services : 2 à 3 % du CA par an</li><li><b>Réputation</b> les habitants d\'A1 sont les premiers vendeurs de Q2</li></ol></div></div></div>';
  return h + pied() + '</div>';
};

/* ---- Qui vous accompagne ---- */
RENDU.equipe = () => {
  let h = '<div class="vue"><h1>Qui vous accompagne</h1><p class="sous">Deux métiers complémentaires, un seul interlocuteur pour M. Alliou : le <b>pilotage du programme</b> par LevENT-IT et la <b>conception des quartiers</b> par T-Architectes.</p>';
  h += '<div class="hero"><div><h2>Un terrain de 165 ha déjà sécurisé. <span class="or">Le reste est une question de méthode.</span></h2><p>Vous avez fait le plus difficile : acquérir, assainir et remblayer. Nous apportons la méthode qui transforme ce foncier en 2 000 logements vendus, livrés et entretenus, avec un contrôle permanent du délai, du coût, du périmètre, de la qualité, des risques et des bénéfices.</p><div class="actions" style="margin-top:.9em"><button class="btn or" data-go="cockpit">Voir le cockpit</button><button class="btn" style="background:transparent;color:#fff;border-color:rgba(255,255,255,.4)" data-go="pointage">Tester l\'émargement</button></div></div><img src="' + IMG.aerien + '" alt="Vue aérienne d\'intention du site"></div>';
  h += '<div class="g g2" style="margin-top:1em"><div class="carte"><div class="personne"><div class="av">PB</div><div><b>Dr Paul Mirabeau Byande</b><small>Directeur général, LevENT-IT · pilotage de programme, structuration et exécution</small><p style="margin-top:.5em;font-size:.92em">Assure la direction de programme : planning intégré, budget et trésorerie, contrats et fournisseurs, qualité et risques, reporting au maître d\'ouvrage. Conçoit et exploite les outils de pilotage (ChantierLive). Prépare le dossier bancable : société de projet, partenaires financiers, conventions bancaires acquéreurs.</p></div></div><h3 style="margin-top:.9em;font-size:1.05em">Ce que le pilotage vous apporte</h3><div class="ligne"><span>Un rapport hebdomadaire, six indicateurs, zéro surprise</span><b>Chaque lundi 8 h</b></div><div class="ligne"><span>Décisions documentées : chaque aléa a son plan chiffré</span><b>Sous 48 h</b></div><div class="ligne"><span>Contrôle des équipes et des fournisseurs sur preuves</span><b>GPS, photos, signatures</b></div><div class="ligne"><span>Un dossier prêt pour les banques et investisseurs</span><b>Dès la tranche 1</b></div></div>';
  h += '<div class="carte"><div class="personne"><div class="av or">JT</div><div><b>Jules Tiobang Tankeu</b><small>Architecte DPLG-Urbaniste, doctorant en urbanisme · gérant de T-Architectes · président de TILALYS / CIS</small><p style="margin-top:.5em;font-size:.92em">Conçoit les quartiers : plan d\'aménagement des 165 ha, voirie, eau, assainissement, écoles, marché, centre de santé, loisirs. Dessine les logements évolutifs adaptés au climat et au pouvoir d\'achat. Vingt-et-une années d\'assistance à maîtrise d\'ouvrage au Château de Versailles, près de 900 ouvrages livrés par le groupe CIS depuis 1986, 20 collaborateurs.</p></div></div><h3 style="margin-top:.9em;font-size:1.05em">Ce que l\'urbaniste vous apporte</h3><div class="ligne"><span>Des quartiers qui se vendent : équipements, ombre, eau, sécurité</span><b>Plan masse 4 quartiers</b></div><div class="ligne"><span>Des maisons évolutives T3 → T4, préfabrication possible</span><b>Coût maîtrisé</b></div><div class="ligne"><span>Une signature française reconnue par les banques</span><b>Références vérifiables</b></div><div class="ligne"><span>Transfert : chantier-école, compagnons guinéens</span><b>24 par tranche</b></div></div></div>';
  h += '<div class="carte" style="margin-top:1em"><h3>Références livrées par T-Architectes / CIS <small>photographies réelles des ouvrages</small></h3><div class="refs">' + REFS_JULES.map(r => '<figure><img src="' + IMG.refs[r.k] + '" alt="' + esc(r.nom) + '"><figcaption><b>' + r.nom + '</b>' + r.lieu + ' — ' + r.d + '</figcaption></figure>').join('') + '</div><p class="note" style="margin-top:.6em">Et aussi : Château de Versailles (AMO, 21 ans), Sénat, Conseil d\'État, ministères de l\'Économie et de la Culture, villes de Paris, Rouen, Boulogne, Stains, Chatou. Portfolio complet sur demande.</p></div>';
  h += '<div class="g g2" style="margin-top:1em"><div class="carte accent"><h3>Comment vous gagnez en productivité</h3><ol class="steps"><li><b>Moins de pertes sur le chantier</b> pointage GPS signé, vidéosurveillance, réception contradictoire des livraisons : les fuites de matériaux et d\'heures disparaissent (3 à 6 % du coût de construction en Afrique de l\'Ouest)</li><li><b>Les retards se voient le jour même</b> et non au bout de trois mois : chaque semaine gagnée sur 104 représente environ 2,5 Md GNF de frais fixes et financiers évités</li><li><b>Des ventes plus tôt</b> maisons témoins, conventions bancaires et suivi du pipeline : les acomptes financent la tranche suivante</li><li><b>Un dossier bancable</b> le même outil produit les rapports exigés par les banques et investisseurs</li><li><b>Un quartier qui garde sa valeur</b> la maintenance suivie soutient le prix des 1 520 logements des tranches 2 à 4</li></ol></div>';
  h += '<div class="carte"><h3>Les 90 prochains jours</h3><ol class="steps"><li><b>Semaines 1-2 · Cadrage</b> visite du site, relevé topographique drone, lecture du titre foncier et des études de sol, ambitions et budget de M. Alliou</li><li><b>Semaines 3-6 · Plan d\'aménagement</b> T-Architectes livre le plan masse des 4 quartiers, la grille de typologies et une première estimation</li><li><b>Semaines 5-8 · Modèle économique</b> prix de sortie, étude de solvabilité, phasage, rencontres avec 3 banques</li><li><b>Semaines 9-12 · Lancement</b> ChantierLive déployé pour de vrai (comptes, téléphones, caméras), appels d\'offres entreprises, maisons témoins</li></ol><p class="note" style="margin-top:.6em">Livrable au jour 90 : un dossier de programme complet, un plan d\'aménagement, un calendrier, un budget, et l\'outil en service.</p></div></div>';
  return h + pied() + '</div>';
};

/* ---- Paramètres et démo ---- */
RENDU.parametres = () => {
  let h = '<div class="vue"><h1>Paramètres et démonstration</h1><p class="sous">Réglages du site, connexion, remise à zéro des données de test, et déroulé conseillé pour la présentation.</p>';
  h += '<div class="g g2"><div class="carte"><h3>Centre du site et rayon de contrôle</h3><div class="form"><label>Nom du site<input id="pNom" value="' + esc(state.site.nom) + '"></label><div class="g g2" style="gap:.6em"><label>Latitude<input id="pLat" type="number" step="0.00001" value="' + state.site.lat + '"></label><label>Longitude<input id="pLng" type="number" step="0.00001" value="' + state.site.lng + '"></label></div><label>Rayon de tolérance (m)<input id="pRayon" type="number" step="50" value="' + state.site.rayon + '"></label><div class="actions"><button class="btn prim" id="pSave">Enregistrer</button><button class="btn or" id="pIci">Définir le centre ici (ma position)</button></div><p class="note">Pour la démonstration, placez le centre du site à l\'endroit où vous vous trouvez : les émargements de test apparaîtront alors « sur site ».</p></div></div>';
  h += '<div class="carte"><h3>Connexion et données</h3><div class="ligne"><span>Mode</span><b id="pMode">' + (remote.ok ? 'Connecté — base temps réel (téléphone ↔ ordinateur)' : location.protocol === 'file:' ? 'Hors ligne — fichier local, données sur cet appareil' : 'Hors ligne — données sur cet appareil') + '</b></div><div class="ligne"><span>Adresse publique</span><b><a href="' + URL_PUBLIQUE + '" target="_blank" rel="noopener">' + URL_PUBLIQUE.replace('https://', '') + '</a></b></div><div class="ligne"><span>Émargements réels (aujourd\'hui)</span><b>' + pointagesDuJour().length + '</b></div><div class="ligne"><span>Photos terrain</span><b>' + (remote.ok ? remote.photos.length : state.photos.length) + '</b></div><label style="display:grid;gap:.3em;font-size:.88em;color:var(--pierre);font-weight:600;margin-top:.6em">Taux de change (GNF pour 1 €)<input id="pTaux" type="number" step="100" value="' + state.taux + '" style="border:1px solid var(--trait);border-radius:.4em;padding:.5em .7em;font-weight:400"></label><div class="actions" style="margin-top:.8em"><button class="btn" id="pTauxOk">Appliquer le taux</button><button class="btn rouge" id="pReset">Effacer les données de test</button></div><p class="note" id="pResetNote" hidden>Confirmez : les émargements et photos de test seront supprimés' + (remote.ok ? ' sur tous les appareils' : ' sur cet appareil') + '. <button class="btn sm rouge" id="pResetOk">Oui, effacer</button></p></div></div>';
  h += '<div class="carte" style="margin-top:1em"><h3>Déroulé conseillé — 8 minutes devant M. Alliou</h3><ol class="steps"><li><b>Cockpit (1 min)</b> « Voici votre programme en six chiffres. Vert, orange, rouge. Vous savez en dix secondes où agir. »</li><li><b>Site et quartiers (1 min)</b> cliquer Q1 puis un îlot : « Jules a pensé le quartier entier : écoles, marché, eau, parc. Chaque îlot a son état. »</li><li><b>Pointage (2 min)</b> tendre le téléphone : « Signez ici comme un chef d\'équipe. » La ligne apparaît sur l\'ordinateur avec la position, l\'heure, la signature. « Plus de journées payées sans présence. »</li><li><b>Chantier (1 min)</b> prendre une photo du lieu de rendez-vous : elle s\'affiche horodatée et géolocalisée. Montrer les caméras.</li><li><b>Simuler un aléa (2 min)</b> « Retard de livraison ciment » : le délai passe au rouge, l\'alerte apparaît, le plan de rattrapage est chiffré. « Appliquer le plan » : les indicateurs se redressent.</li><li><b>Finances et RH (30 s)</b> la paie calculée sur les pointages ; les ventes et la marge.</li><li><b>Qui vous accompagne (30 s)</b> les références de Jules, les 90 prochains jours. Demander le rendez-vous de cadrage sur site.</li></ol></div>';
  h += '<div class="g g2" style="margin-top:1em"><div class="carte"><h3>Objections probables</h3><div class="ligne"><span><b>« C\'est un logiciel, pas un chantier. »</b><small>C\'est l\'outil du pilote. Le pilote, c\'est nous, sur place, chaque semaine. L\'outil garantit que rien ne vous est caché.</small></span></div><div class="ligne"><span><b>« Mes équipes ne sauront pas l\'utiliser. »</b><small>Un chef d\'équipe signe sur un téléphone en 10 secondes, comme pour un colis. Le reste se calcule seul.</small></span></div><div class="ligne"><span><b>« Combien ça coûte ? »</b><small>Le pilotage se rémunère sur un pourcentage du programme et se paie en retards et pertes évités. Nous proposons une tranche pilote pour le prouver.</small></span></div><div class="ligne"><span><b>« Pourquoi un architecte français ? »</b><small>Pour les banques et la diaspora, la signature rassure et fait vendre. Et le chantier-école forme des Guinéens.</small></span></div></div>';
  h += '<div class="carte"><h3>Feuille de route de l\'outil</h3><div class="ligne"><span>Aujourd\'hui — démonstration</span><b>Données fictives, émargement et photos réels</b></div><div class="ligne"><span>Mois 1 — mise en service</span><b>Comptes nommés, rôles, vrais effectifs et fournisseurs</b></div><div class="ligne"><span>Mois 2 — terrain</span><b>Téléphones chefs d\'équipe, caméras IP, drone mensuel</b></div><div class="ligne"><span>Mois 3 — finance</span><b>Lien banque, paie mobile money, reporting investisseurs</b></div><div class="ligne"><span>Tranche 2</span><b>Portail acquéreurs, suivi de construction par logement</b></div></div></div>';
  return h + pied() + '</div>';
};
MONTE.parametres = m => {
  $('#pSave', m).addEventListener('click', () => { state.site = { nom: $('#pNom', m).value, lat: +$('#pLat', m).value, lng: +$('#pLng', m).value, rayon: +$('#pRayon', m).value || 1500 }; save(); toast('Paramètres du site enregistrés.'); });
  $('#pIci', m).addEventListener('click', () => { if (!navigator.geolocation) return toast('Localisation indisponible.'); toast('Acquisition de la position…'); navigator.geolocation.getCurrentPosition(p => { $('#pLat', m).value = p.coords.latitude.toFixed(5); $('#pLng', m).value = p.coords.longitude.toFixed(5); state.site.lat = p.coords.latitude; state.site.lng = p.coords.longitude; state.site.rayon = +$('#pRayon', m).value || 1500; save(); toast('<b>Centre du site défini</b> sur votre position (± ' + fmt(p.coords.accuracy) + ' m).'); }, () => toast('Position refusée. ' + (location.protocol === 'file:' ? 'Utilisez la version en ligne.' : '')), { enableHighAccuracy: true, timeout: 12000 }); });
  $('#pTauxOk', m).addEventListener('click', () => { state.taux = +$('#pTaux', m).value || TAUX_EUR; save(); toast('Taux appliqué : 1 € = ' + fmt(state.taux) + ' GNF.'); });
  $('#pReset', m).addEventListener('click', () => { $('#pResetNote', m).hidden = false; });
  $('#pResetOk', m).addEventListener('click', async () => {
    state.pointages = []; state.photos = []; state.scen = {}; state.applique = {}; save();
    if (remote.ok) { try { await remote.client.from('p165_pointages').delete().eq('programme', SUPA.programme); await remote.client.from('p165_photos').delete().eq('programme', SUPA.programme); await chargerDistant(); } catch (e) { console.warn(e); } }
    toast('Données de test effacées.'); go('parametres');
  });
};

/* ============================================================
   Synchronisation temps réel (Supabase) et démarrage
   ============================================================ */
function setConn(ok, lib) { const c = $('#conn'); c.className = 'pill ' + (ok ? 'on' : 'off'); c.innerHTML = '<i></i><span>' + (lib || (ok ? 'Temps réel' : 'Hors ligne')) + '</span>'; }
async function chargerDistant() {
  if (!remote.client) return;
  const t0 = new Date(); t0.setDate(t0.getDate() - 7);
  const a = await remote.client.from('p165_pointages').select('*').eq('programme', SUPA.programme).gte('ts', t0.toISOString()).order('ts', { ascending: false }).limit(300);
  const b = await remote.client.from('p165_photos').select('*').eq('programme', SUPA.programme).order('ts', { ascending: false }).limit(60);
  if (a.error || b.error) throw (a.error || b.error);
  remote.pointages = a.data || []; remote.photos = b.data || [];
}
let rafraichirT;
function rafraichirVue() { clearTimeout(rafraichirT); rafraichirT = setTimeout(() => { if (['pointage', 'chantier', 'rh', 'parametres', 'cockpit'].includes(state.vue) && !document.activeElement.matches('input,select,textarea')) go(state.vue); else renderNav(); }, 250); }
async function initDistant() {
  if (location.protocol === 'file:' || !window.supabase) { setConn(false, location.protocol === 'file:' ? 'Hors ligne · fichier local' : 'Hors ligne'); return; }
  try {
    remote.client = supabase.createClient(SUPA.url, SUPA.key, { realtime: { params: { eventsPerSecond: 5 } } });
    await chargerDistant(); remote.ok = true; setConn(true, 'Temps réel · synchronisé');
    remote.client.channel('p165-live')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'p165_pointages' }, async () => { try { await chargerDistant(); toast('<b>Nouvel émargement reçu</b> depuis le terrain.'); rafraichirVue(); } catch (e) { } })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'p165_photos' }, async () => { try { await chargerDistant(); toast('<b>Nouvelle photo reçue</b> depuis le terrain.'); rafraichirVue(); } catch (e) { } })
      .subscribe(st => { if (st === 'SUBSCRIBED') setConn(true, 'Temps réel · en direct'); });
    if (['pointage', 'chantier', 'rh', 'cockpit'].includes(state.vue)) go(state.vue);
  } catch (e) { console.warn('Supabase indisponible', e); remote.ok = false; setConn(false, 'Hors ligne · données locales'); }
}
function horloge() { const d = new Date(); $('#clock').textContent = d.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' }) + ' · ' + hhmm(d); }
/* Démarrage : rendu immédiat en local, puis connexion */
horloge(); setInterval(horloge, 20000);
const vueHash = location.hash.replace('#', '');
go(RENDU[vueHash] ? vueHash : (RENDU[state.vue] ? state.vue : 'cockpit'));
window.addEventListener('hashchange', () => { const h = location.hash.replace('#', ''); if (RENDU[h] && h !== state.vue) go(h); });
initDistant();
window.addEventListener('online', () => { if (!remote.ok) initDistant(); });
window.addEventListener('offline', () => setConn(false, 'Hors ligne · données locales'));
