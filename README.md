# Portfolio de Daniel Mbengui

Portfolio personnel multilingue : **parcours interactif** (3D / 2D), **CV** exportable en PDF et **assistant IA**.

Site public : [https://danielmbengui.ch](https://danielmbengui.ch)

![Next.js](https://img.shields.io/badge/Next.js-13-black?logo=next.js)
![React](https://img.shields.io/badge/React-18-20232A?logo=react)
![Three.js](https://img.shields.io/badge/Three.js-r160-black?logo=three.js)
![MUI](https://img.shields.io/badge/MUI-5-007FFF?logo=mui)
![OpenAI](https://img.shields.io/badge/OpenAI-API-412991?logo=openai)
![i18n](https://img.shields.io/badge/i18n-5_langues-success)

---

## Table des matières

- [Aperçu](#aperçu)
- [Pages & routes](#pages--routes)
- [Fonctionnalités](#fonctionnalités)
- [Stack technique](#stack-technique)
- [Arborescence](#arborescence)
- [Installation](#installation)
- [Scripts](#scripts)
- [Internationalisation](#internationalisation)
- [Assistant IA](#assistant-ia)
- [SEO](#seo)
- [Déploiement](#déploiement)
- [Auteur](#auteur)

---

## Aperçu

Le site met en avant mon parcours **Angola ⇄ Suisse** à travers une timeline immersive, complétée par un CV structuré et un assistant conversationnel.

- **Accueil** : expérience « Mon parcours » (~59 jalons), thème clair / sombre / système, vues **3D** (Three.js) et **2D** (carte type métro).
- **CV** : même charte visuelle, sections repliables, téléchargement PDF.
- **Langues** : français (défaut), anglais, italien, portugais, lingala (`ao`).
- **Assistant** : drawer accessible depuis la navigation, alimenté par l’API OpenAI.

### Médias

![Profil](./public/me-color.png)

- Présentation : [presentation.mp4](https://www.danielmbengui.ch/assets/videos/presentation.mp4)
- Axes « Ce qui me définit » et « Univers & valeurs » : fichiers dans `public/assets/videos/` (voir anciennes URLs sur le site si besoin).

---

## Pages & routes

| Route | Fichier | Description |
|--------|---------|-------------|
| `/` | `pages/index.js` | Parcours interactif (`JourneyExperience`) |
| `/cv` | `pages/cv.js` | CV en ligne + export PDF |
| `POST /api/chat` | `pages/api/chat.js` | Backend assistant IA |

Locales Next.js : préfixe `/en`, `/it`, `/pt`, `/ao` ; le français est servi sans préfixe (`/`, `/cv`).

---

## Fonctionnalités

### Parcours (`/`)

- Timeline chronologique avec ères colorées (origines, intégration, formation, reconversion, entrepreneuriat, défi xAI, etc.).
- **Mode 3D** : rail Angola / Suisse, caméra, bloom, étapes cliquables, labels flottants.
- **Mode 2D** : timeline verticale avec branches par région.
- Fiche détail par étape (texte, image, vidéo, compétences et langues débloquées).
- HUD « déblocages », lecture automatique, navigation clavier.
- **Intro** (première visite) : choix langue / thème avant d’entrer dans le parcours.
- Loader au démarrage (thème, vue 2D/3D, scène WebGL).

Données : `_mocks_/_journey_items_.js`, textes `public/locales/*/journey.json`, visuels `public/img/portfolio/step-*`.

### CV (`/cv`)

- Accordéons : langues, expériences, formation, certificats, projets, compétences, soft skills, loisirs, publications.
- Liens vers PDF de certificats dans `public/assets/certifications/`.
- Export PDF client (`html2pdf.js`).
- Navigation partagée avec le parcours (menu, thème, assistant).

### Assistant IA

- Panneau latéral, suggestions, effet de frappe.
- Contexte métier : `lib/assistantContext.js`.

---

## Stack technique

| Catégorie | Technologies |
|-----------|----------------|
| Framework | Next.js 13 (Pages Router), React 18 |
| 3D | Three.js, React Three Fiber, Drei, postprocessing |
| UI | MUI, Emotion |
| i18n | next-i18next, i18next |
| IA | OpenAI (Responses API via `pages/api/chat.js`) |
| PDF | html2pdf.js, @react-pdf/renderer |
| Analytics | Vercel Analytics & Speed Insights |
| Qualité | ESLint (`next lint`) |

---

## Arborescence

```text
.
├── pages/
│   ├── index.js              # accueil = parcours
│   ├── cv.js
│   └── api/chat.js
├── components/
│   ├── journey/              # scène 3D, vue 2D, nav, intro, thème
│   ├── cv/                   # CvComponent, CvPageLayout
│   └── assistant/            # panneau & bouton IA
├── _mocks_/
│   └── _journey_items_.js    # jalons, ères, stops
├── lib/
│   └── assistantContext.js
├── utility/
│   └── journeyMilestoneText.js
├── public/
│   ├── locales/              # fr, en, it, pt, ao
│   ├── img/portfolio/        # images d’étapes
│   ├── assets/               # vidéos, certifications, CSS legacy
│   ├── favicon.ico
│   └── sitemap.xml
└── styles/
```

---

## Installation

### Prérequis

- Node.js 18+
- npm

### Démarrage

```bash
npm install
echo "OPEN_AI_KEY=your_openai_api_key" > .env.local
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

Sans `OPEN_AI_KEY`, l’assistant renverra une erreur côté API ; le reste du site fonctionne.

---

## Scripts

```bash
npm run dev     # développement
npm run build   # build production
npm run start   # serveur production
npm run lint    # ESLint
```

---

## Internationalisation

- Config : `next-i18next.config.js`
- Locale par défaut : `fr`
- Locales : `fr`, `en`, `it`, `pt`, `ao`
- Namespaces principaux :
  - `journey` — parcours (accueil)
  - `cv` — page CV
  - `common` — libellés partagés (assistant, footer, etc.)

Fichiers : `public/locales/<lang>/*.json`.

---

## Assistant IA

**Endpoint** : `POST /api/chat`

```json
{
  "messages": [{ "role": "user", "text": "..." }],
  "language": "fr"
}
```

Instructions injectées via `getAssistantInstructions()` dans `lib/assistantContext.js`.

---

## SEO

- `public/sitemap.xml` — accueil et CV pour chaque locale
- Favicon : `public/favicon.ico` → `/favicon.ico`
- Métadonnées par page via `next/head`

---

## Déploiement

Adapté à [Vercel](https://vercel.com/) (build Next.js natif). Définir `OPEN_AI_KEY` dans les variables d’environnement du projet.

---

## Auteur

**Daniel Mbengui**

- Site : [danielmbengui.ch](https://danielmbengui.ch)
- LinkedIn : [daniel-mbengui](https://www.linkedin.com/in/daniel-mbengui/)
- GitHub : [danielmbengui](https://github.com/danielmbengui)
- Google Play : [profil développeur](https://play.google.com/store/apps/dev?id=5041386544087051991)
- App Store : [profil développeur](https://apps.apple.com/ch/developer/mbengui-daniel-slaver/id1695490329?l=fr-FR)
