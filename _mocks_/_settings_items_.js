/* --------------- GENERAL -------------- */
export const _WEBSITE_NAME_ = 'danielmbengui.ch';
export const _WEBSITE_ADDRESS_ = 'danielmbengui.ch';
export const _WEBSITE_ADDRESS_FULL_ = 'https://danielmbengui.ch';
export const _NEXTJS_LINK_ = 'https://nextjs.org/';

/* --------------- NAME SPACES -------------- */
export const _NAMESPACE_LANGAGE_COMMON_ = 'common';
export const _NAMESPACE_LANGAGE_HOME_ = 'home';

export const ARRAY_NAMEPACES = [
    _NAMESPACE_LANGAGE_COMMON_,
    _NAMESPACE_LANGAGE_HOME_,
];
export const ARRAY_NAMESPACES = ARRAY_NAMEPACES;

/* --------------- LANGS -------------- */
export const LANGAGE_FRENCH = 'fr';
export const LANGAGE_ENGLISH = 'en';
export const LANGAGE_ITALIAN = 'it';
export const LANGAGE_PORTUGUESE = 'pt';
export const LANGAGE_LINGALA = 'ao';
export const DEFAULT_LANGAGE = LANGAGE_FRENCH;
export const ARRAY_LANGAGES = [
    LANGAGE_FRENCH,
    LANGAGE_ENGLISH,
    LANGAGE_ITALIAN,
    LANGAGE_PORTUGUESE,
    LANGAGE_LINGALA,
];

/* --------------- THEMES -------------- */
export const THEME_LIGHT = 'light';
export const THEME_DARK = 'dark';
export const DEFAULT_THEME = THEME_DARK;
/* --------------- STORAGE -------------- */
export const STORAGE_THEME_MODE = "data-theme";
export const STORAGE_LANG_MODE = 'lang';

/* --------------- FONTS -------------- */
export const GENERAL_FONT_FAMILY = "Roboto";
/* --------------- PAGES -------------- */
export const _PAGE_LINK_HOME_ = "/";
export const _PAGE_LINK_RESUME_ = "/portfolio/resume";
export const _PAGE_LINK_CV_ = "/cv";
/** CV anglais (image ou PDF) — fichier dans assets, pas dans certification */
export const _CV_EN_ASSET_ = "/assets/cv-en.png";
export const _PAGE_LINK_CHAT_BOT_ = "/portfolio/chatbot";
export const _PAGE_LINK_SKILLS_ = "/portfolio/skills";
export const _PAGE_LINK_LANGUAGES_ = "/portfolio/languages";
export const _PAGE_LINK_PROJECTS_ = "/portfolio/projects";


export const _MY_PROFILE_ = {
    name : "Daniel Mbengui",
    mail : "daniel.mbengui@gmail.com",
    phone : "+41 76 679 51 15",
    position : "Étudiant 42Lausanne",
    srcImage: "/img/me.png",
    srcBot:"/img/bot-no-back.png",
    socials : {
        website: "https://danielmbengui.ch",
        linkedin: "https://www.linkedin.com/in/daniel-mbengui/",
        github: "https://github.com/danielmbengui",
        playstore: "https://play.google.com/store/apps/dev?id=5041386544087051991",
        appstore: "https://apps.apple.com/ch/developer/mbengui-daniel-slaver/id1695490329?l=fr-FR",
    }
}