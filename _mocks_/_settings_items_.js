/* --------------- NAME SPACES -------------- */
export const NAMESPACE_LANGAGE_COMMON = 'common';
export const NAMESPACE_LANGAGE_HOME = 'home';

export const ARRAY_NAMEPACES = [
    NAMESPACE_LANGAGE_COMMON,
    NAMESPACE_LANGAGE_HOME,
];

/* --------------- LANGS -------------- */
export const LANGAGE_FRENCH = 'fr';
export const LANGAGE_ENGLISH = 'en';
export const DEFAULT_LANGAGE = LANGAGE_FRENCH;
export const ARRAY_LANGAGES = [
    LANGAGE_FRENCH,
    LANGAGE_ENGLISH,
];

/* --------------- THEMES -------------- */
export const THEME_LIGHT = 'light';
export const THEME_DARK = 'dark';
export const DEFAULT_THEME = THEME_LIGHT;
/* --------------- STORAGE -------------- */
export const STORAGE_THEME_MODE = "data-theme";
export const STORAGE_LANG_MODE = 'lang';

/* --------------- FONTS -------------- */
export const GENERAL_FONT_FAMILY = "Roboto";
/* --------------- PAGES -------------- */
export const PAGE_LINK_HOME = "/";
export const PAGE_LINK_RESUME = "/portfolio/resume";
export const PAGE_LINK_CHAT_BOT = "/portfolio/chatbot";
export const PAGE_LINK_SKILLS = "/portfolio/skills";


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
    }
}