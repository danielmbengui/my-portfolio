import React from 'react';
import styles from '../../styles/Home.module.css';
import Chatbot from 'react-chatbot-kit';
import ActionProvider from '../../utility/chatbot/ActionProvider';
import MessageParser from '../../utility/chatbot/MessageParser';
import { createChatBotMessage } from 'react-chatbot-kit';
import Options from '../molecules/Options';
import ExperienceCards from '../organisms/ExperienceCards';
import ProjectCards from '../organisms/ProjectCards';
import SkillCards from '../organisms/SkillCards';
import BlogCards from '../organisms/BlogCards';
import { useTranslation } from 'next-i18next';
import { useLangMode } from '../../contexts/LangModeProvider';
import { LANGAGE_FRENCH } from '../../_mocks_/_settings_items_';

const getMoodOptions = (actionProvider) => {
  return [
    {
      text: 'Ça va merci! Parle-moi de toi.',
      handler: () => actionProvider.handleGoodMood(),
      id: 1,
    },
    {
      text: 'Journée pourrie, pour être honnête...',
      handler: () => actionProvider.handleBadMood(LANGAGE_FRENCH),
      id: 2,
    },
  ];
};

const getJokeOptions = (actionProvider) => {
  return [
    {
      text: "LOL that's funny",
      handler: () => actionProvider.handleGoodMoodFinally(),
      id: 1,
    },
    {
      text: 'Tell me another one',
      handler: () => actionProvider.handleBadMoodAgain(LANGAGE_FRENCH),
      id: 2,
    },
  ];
};

const getPersonalOptions = (actionProvider) => {
  return [
    {
      text: 'Experience',
      handler: () => actionProvider.handleExperience(),
      id: 1,
    },
    {
      text: 'Projects',
      handler: () => actionProvider.handleProjects(),
      id: 2,
    },
    {
      text: 'Skills',
      handler: () => actionProvider.handleSkills(),
      id: 3,
    },
    {
      text: 'Blogs',
      handler: () => actionProvider.handleBlogs(),
      id: 4,
    },
  ];
};

const config = {
  botName: 'Jeffrey Yu',
  initialMessages: [
    createChatBotMessage(
      "Salut 👋🏿, je suis Daan. Heureux de te rencontrer! Comment tu vas aujourd'hui?",
      //"Heureux de te rencontrer! Comment vas tu aujourd'hui ?",
      {
        widget: 'moodOptions',
      }
    ),
  ],
  // customStyles: {
  //   botMessageBox: {
  //     backgroundColor: '#147efb',
  //   },
  //   chatButton: {
  //     backgroundColor: '#147efb',
  //   },
  // },
  widgets: [
    {
      widgetName: 'moodOptions',
      widgetFunc: ({ actionProvider }) => (
        <Options actionProvider={actionProvider} getOptions={getMoodOptions} />
      ),
    },
    {
      widgetName: 'jokeOptions',
      widgetFunc: ({ actionProvider }) => (
        <Options actionProvider={actionProvider} getOptions={getJokeOptions} />
      ),
    },
    {
      widgetName: 'personalOptions',
      widgetFunc: ({ actionProvider }) => (
        <Options
          actionProvider={actionProvider}
          getOptions={getPersonalOptions}
        />
      ),
    },
    {
      widgetName: 'experienceOptions',
      widgetFunc: () => <ExperienceCards />,
    },
    {
      widgetName: 'projectsOptions',
      widgetFunc: () => <ProjectCards />,
    },
    {
      widgetName: 'skillsOptions',
      widgetFunc: () => <SkillCards />,
    },
    {
      widgetName: 'blogsOptions',
      widgetFunc: () => <BlogCards />,
    },
  ],
};


export default function FrenchChatbot() {

  return (
    <Chatbot
        className={styles}
        config={config}
        actionProvider={ActionProvider}
        messageParser={MessageParser}
      />
  );
}