# Portfolio de Daniel Mbengui

Portfolio personnel moderne, multilingue et interactif, construit avec Next.js pour présenter mon profil, mes projets, mes compétences, ainsi que mon CV dynamique avec export PDF.

Site public: [https://danielmbengui.ch](https://danielmbengui.ch)

![Next.js](https://img.shields.io/badge/Next.js-13-black?logo=next.js)
![React](https://img.shields.io/badge/React-18-20232A?logo=react)
![MUI](https://img.shields.io/badge/MUI-5-007FFF?logo=mui)
![OpenAI](https://img.shields.io/badge/OpenAI-API-412991?logo=openai)
![i18n](https://img.shields.io/badge/i18n-5_langues-success)
![License](https://img.shields.io/badge/license-Public-lightgrey)

---

## Table des matieres

- [Apercu](#apercu)
- [Demo visuelle](#demo-visuelle)
- [Fonctionnalites principales](#fonctionnalites-principales)
- [Stack technique](#stack-technique)
- [Arborescence utile](#arborescence-utile)
- [Installation & lancement](#installation--lancement)
- [Scripts disponibles](#scripts-disponibles)
- [Internationalisation](#internationalisation)
- [Assistant IA: notes techniques](#assistant-ia-notes-techniques)
- [Feuille de route](#roadmap)
- [Déploiement](#deploiement)
- [Auteur](#auteur)

---

## Apercu

Ce projet va au-dela d'une simple page vitrine:

- Interface premium (MUI + animations) avec sections immersives.
- Assistant IA integre (drawer desktop/mobile) connecte a l'API OpenAI.
- Contenu internationalise en 5 langues (`fr`, `en`, `it`, `pt`, `ao`).
- Page CV complete et telechargeable en PDF.
- Navigation rapide (menu flottant) et composants modulaires reutilisables.

---

## Demo visuelle

### Profil
![Profil](./public/me-color.png)

### Vidéo de présentation
- Video de présentation: [Présentation](https://www.danielmbengui.ch/assets/videos/presentation.mp4)

### Vidéos "Ce qui me définit"
- Video "AXE 1 — Vision, instinct et convictions": [Penser avant d'agir](https://www.danielmbengui.ch/assets/videos/1-4.mp4)
- Video "AXE 2 — Construire ensemble": [La collaboration comme fondation](https://www.danielmbengui.ch/assets/videos/1-3.mp4)
- Video "AXE 3 — Créer avec l'IA, pas la subir": [Co-création humain–IA](https://www.danielmbengui.ch/assets/videos/1-1.mp4)
- Video "AXE 4 — Déléguer pour mieux créer": [Automatiser l'utile pour libérer l'essentiel](https://www.danielmbengui.ch/assets/videos/1-2.mp4)

### Vidéos "Mon univers et mes valeurs"
- Video "Loyauté & responsabilité": [1](https://www.danielmbengui.ch/assets/videos/2-1.mp4)
- Video "Déléguer avec confiance": [2](https://www.danielmbengui.ch/assets/videos/2-2.mp4)
- Video "Équilibre et respiration": [3](https://www.danielmbengui.ch/assets/videos/2-3.mp4)
- Video "Défendre une vision": [4](https://www.danielmbengui.ch/assets/videos/2-4.mp4)
---

## Fonctionnalites principales

### Home (`/`)
- Hero anime avec avatar, icones stack rotatives et CTA.
- Video de presentation embarquee.
- Sections dediees:
  - Langues
  - Ce qui me definit
  - Univers & Valeurs
  - Projets
  - Contact
  - Competences
- Footer social (LinkedIn, GitHub, Play Store, App Store, email).

### CV (`/cv`)
- CV structure en accordions (experiences, formation, certificats, projets, soft skills, hobbies, publications...).
- Telechargement PDF client-side via `html2pdf.js`.
- Liens externes vers certificats/publications.

### Assistant IA (`/api/chat` + UI)
- Interface conversationnelle avec suggestions.
- Effet "typing" progressif des reponses.
- Parsing des liens markdown dans les messages.
- API Next.js routee vers OpenAI Responses API.

---

## Stack technique

| Categorie | Technologies |
|---|---|
| Framework | `Next.js 13` (Pages Router), `React 18` |
| UI / Design System | `MUI`, `Emotion`, `Bootstrap` |
| Animations | `framer-motion`, `react-spring` |
| i18n | `next-i18next` |
| IA | OpenAI Responses API (`gpt-4o-mini`) |
| PDF | `html2pdf.js`, `@react-pdf/renderer` |
| Qualité | `ESLint` (`next lint`) |

---

## Arborescence utile

```text
.
|- pages/
|  |- index.js            # home
|  |- cv.js               # page CV
|  |- api/chat.js         # endpoint assistant IA
|- components/
|  |- assistant/          # bouton + panneau assistant IA
|  |- cv/                 # composant CV
|  |- projects/           # section projets
|  |- skills/             # section competences
|  |- ...
|- lib/
|  |- assistantContext.js # instructions/context de l'assistant
|- public/
|  |- locales/            # traductions (fr, en, it, pt, ao)
|  |- assets/             # videos, certifications, publications
|- styles/
|- _mocks_/
|  |- _settings_items_.js # constantes globales site/profil
```

---

## Installation & lancement

### Lancement rapide
```bash
npm install
echo "OPEN_AI_KEY=your_openai_api_key" > .env.local
npm run dev
```

Puis ouvrir [http://localhost:3000](http://localhost:3000).

### Configuration detaillée

### 1) Prerequis
- Node.js 18+ recommande
- npm (le projet contient `package-lock.json`)

### 2) Installer les dépendances
```bash
npm install
```

### 3) Configurer l'environnement
Creer un fichier `.env.local` a la racine:

```bash
OPEN_AI_KEY=your_openai_api_key
```

> Sans cette variable, l'endpoint `pages/api/chat.js` renverra une erreur 500.

### 4) Démarrer en local
```bash
npm run dev
```

Ouvrir ensuite [http://localhost:3000](http://localhost:3000).

---

## Scripts disponibles

```bash
npm run dev     # environnement de developpement
npm run build   # build de production
npm run start   # demarrage en mode production
npm run lint    # verification ESLint
```

---

## Internationalisation

- Configuration centralisee dans `next-i18next.config.js`.
- Langue par defaut: `fr`.
- Locales actives: `fr`, `en`, `it`, `pt`, `ao`.
- Fichiers de traduction dans `public/locales/<lang>/` (`common.json`, `home.json`, `cv.json`).

---

## Assistant IA: notes techniques

- Endpoint: `POST /api/chat`
- Payload attendu:

```json
{
  "messages": [{ "role": "user", "text": "..." }],
  "language": "fr"
}
```

- Le serveur injecte des instructions metier via `getAssistantInstructions()` depuis `lib/assistantContext.js`.
- Outil web-search active cote OpenAI (`tools: [{ type: "web_search" }]`).

---

## Feuille de route

- [x] Base portfolio Next.js + sections principales
- [x] CV interactif + export PDF
- [x] i18n (`fr`, `en`, `it`, `pt`, `ao`)
- [x] Assistant IA (UI + endpoint OpenAI)
- [ ] Ajouter tests unitaires/UI sur composants critiques
- [ ] Ajouter CI GitHub Actions (lint + build)
- [ ] Ajouter analytics/events plus detailles

---

## Déploiement

Le projet est adapte a un deploiement simple sur [Vercel](https://vercel.com/), avec support natif Next.js.

---

## Auteur

**Daniel Mbengui**  
- Site: [https://danielmbengui.ch](https://danielmbengui.ch)  
- LinkedIn: [https://www.linkedin.com/in/daniel-mbengui/](https://www.linkedin.com/in/daniel-mbengui/)  
- GitHub: [https://github.com/danielmbengui](https://github.com/danielmbengui)  
- Play Store (profil developpeur): [https://play.google.com/store/apps/dev?id=5041386544087051991](https://play.google.com/store/apps/dev?id=5041386544087051991)  
- Apple App Store (profil developpeur): [https://apps.apple.com/ch/developer/mbengui-daniel-slaver/id1695490329?l=fr-FR](https://apps.apple.com/ch/developer/mbengui-daniel-slaver/id1695490329?l=fr-FR)
