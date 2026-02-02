// import { getProgrammingJoke } from 'random-joke-getter';

import { LANGAGE_ENGLISH, LANGAGE_FRENCH } from "../../_mocks_/_settings_items_";


const settingsFR = {
  intro:`Je suis un développeur passionné, alliant expertise technique et résolution créative de problèmes. Mon parcours unique me permet de créer un lien harmonieux entre technologie et gestion d'entreprise. Toujours à l'affût des évolutions du monde numérique, je suis ravi de collaborer sur des projets stimulants qui favorisent la croissance et l'innovation. Veux-tu savoir autre chose sur moi?`
}

const settingsEN = {
  intro: `I'm a passionate developer, combining technical expertise and creative problem-solving. My unique background allows me to create a harmonious connection between technology and business management. Always on the lookout for advancements in the digital world, I'm thrilled to collaborate on exciting projects that promote growth and innovation. Would you like to know anything else about me?`
}

const experience =
  'I worked as Software Engineer intern at Paramount, Done. and TechFin.AI.';
const projects =
  "I'm love spotting problems from people around me and building solutions that make their lives easier.";
const skills =
  "I have three years of experience in fullstack development. I'm a MERN stack lover (MongoDB, Express, React, Node.js).";
const blogs = 'Check out my blogs on Dev Community and Medium!';

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  greet(lang) {
    const message = lang === LANGAGE_FRENCH ? `Je cherche du temps pour explorer l'API de ChatGTP...` : `I'm looking for some time to explore the ChatGPT API...`;
    const greetingMessage = this.createChatBotMessage(
      message
    );
    this.updateChatbotState(greetingMessage);
  }

  handleGoodMood(lang) {
    const intro = lang === LANGAGE_FRENCH ? settingsFR.intro : settingsEN.intro;
    const message = this.createChatBotMessage(intro, {
      widget: 'personalOptions',
    });
    this.updateChatbotState(message);
  }

  async handleBadMood(lang) {
    const _langStr = lang === LANGAGE_FRENCH ? `?lang=${lang}` : ``;
    const _requestStr = lang === LANGAGE_FRENCH ? `Alors laisse moi te raconter une blague` : `So let me tell you a joke`;
    const jokeData = await (
      await fetch(`https://v2.jokeapi.dev/joke/Any${_langStr}`)
    ).json();
    const message = this.createChatBotMessage(
      `${_requestStr} : ${jokeData.type === 'single' ? jokeData.joke : `${jokeData.setup} ${jokeData.delivery}`}`,
      {
        widget: 'jokeOptions',
      }
    );
    this.updateChatbotState(message);
  }

  async handleBadMoodAgain(lang) {
    const _langStr = lang === LANGAGE_FRENCH ? `?lang=${lang}` : '';
    const _requestStr = lang === LANGAGE_FRENCH ? `Oui bien sûr!` : `Yes of course!`;
    const jokeData = await (
      await fetch(`https://v2.jokeapi.dev/joke/Any${_langStr}`)
    ).json();
    const message = this.createChatBotMessage(
      //`Here's another one: ${jokeData.joke}`,
      `${_requestStr} : ${jokeData.type === 'single' ? jokeData.joke : `${jokeData.setup} ${jokeData.delivery}`}`,
      {
        widget: 'jokeOptions',
      }
    );
    this.updateChatbotState(message);
  }

  handleGoodMoodFinally(lang) {
    const intro = lang === LANGAGE_FRENCH ? settingsFR.intro : settingsEN.intro;
    const _requestStr = lang === LANGAGE_FRENCH ? `Je suis content de t'avoir redonné le sourire! Du coup, laisse moi m'introduire... euh me présenter 😹` : `Glad you're happy! So, let me slip in... um, I mean introduce myself  😹`;
    const message = this.createChatBotMessage(
      `${_requestStr} : ${intro}`,
      { widget: 'personalOptions' }
    );
    this.updateChatbotState(message);
  }

  handleExperience() {
    const message = this.createChatBotMessage(experience, {
      widget: 'experienceOptions',
    });
    this.updateChatbotState(message);
  }

  handleProjects() {
    const message = this.createChatBotMessage(projects, {
      widget: 'projectsOptions',
    });
    this.updateChatbotState(message);
  }

  handleSkills() {
    const message = this.createChatBotMessage(skills, {
      widget: 'skillsOptions',
    });
    this.updateChatbotState(message);
    const nextMessage = this.createChatBotMessage("Veux tu savoir autre chose ?", {
      widget: 'personalOptions',
    });
    this.updateChatbotState(nextMessage);
  }

  handleFinish() {
    const message = this.createChatBotMessage("Voilà tu connais désormais une partie de moi. Merci d'avoir pris du temps! N'hésite pas à consulter mon CV ou ma vidéo de présentation!", {
      //widget: 'skillsOptions',
    });
    this.updateChatbotState(message);
  }

  handleBlogs() {
    const message = this.createChatBotMessage(blogs, {
      widget: 'blogsOptions',
    });
    this.updateChatbotState(message);
  }

  updateChatbotState(message) {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }
}

export default ActionProvider;
