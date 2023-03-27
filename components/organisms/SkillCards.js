import { Stack } from '@mui/material';
import { blue } from '@mui/material/colors';
import React from 'react';
import { AngolanIcon, EnglishIcon, FrenchIcon, ItalianIcon } from '../icons/FlagIcons';
import { AndroidIcon, AndroidStudioIcon, AtomIcon, CssIcon, C_LangageIcon, DiscordApiIcon, EclipseIcon, EtherJsIcon, FirebaseIcon, GoogleMapsIcon, HtmlIcon, IonicIcon, JavaIcon, JavascriptIcon, MaterialUiIcon, MomentJsIcon, MySqlIcon, NextJsIcon, NodeJsIcon, NotepadIcon, PhotoshopIcon, PhpIcon, PwaIcon, PythonIcon, ReactIcon, SolidityIcon, SpyderIcon, TwitterApiIcon, TypescriptIcon, VisualStudioIcon, Web3JsIcon } from '../icons/IconifiyIcons';
import SkillCard from '../molecules/SkillCard';

const skills = [
  {
    name: 'sections.skills.langs.title',
    skills: [
      ['sections.skills.langs.fr.name', 100, <FrenchIcon size={20} />],
      ['sections.skills.langs.en.name', 80, <EnglishIcon size={20} />],
      ['sections.skills.langs.ao.name', 70, <AngolanIcon size={20} />],
      ['sections.skills.langs.it.name', 50, <ItalianIcon size={20} />],
    ],
  },
  {
    name: 'sections.skills.programming.title',
    skills: [
      ['JavaScript', 95, <JavascriptIcon size={20} />],
      ['HTML/CSS', 95, <Stack direction={'row'} justifyContent={'center'}><HtmlIcon size={20} /><CssIcon size={20} /></Stack>],
      ['Python', 90, <PythonIcon size={20} />],
      ['Java', 85, <JavaIcon size={20} />],
      ['Android', 85, <AndroidIcon size={25} />],
      ['Php', 80, <PhpIcon size={30} />],
      ['SQL', 80, <MySqlIcon size={35} />],
      ['Typescript', 70, <TypescriptIcon size={20} />],
      ['Solidity', 60, <SolidityIcon size={15} />],
      ['C', 50, <C_LangageIcon size={20} />],
    ],
  },
  {
    name: 'sections.skills.frameworks.title',
    skills: [
      ['React', 95, <ReactIcon size={20} />],
      ['NodeJS', 85, <NodeJsIcon size={20} />],
      ['NextJS', 85, <NextJsIcon size={20} />],
      ['PWA', 55, <PwaIcon size={30} />],
      ['Material Ui', 55, <MaterialUiIcon color={blue[600]} size={20} />],
      
      ['MomentJS', 85, <MomentJsIcon size={20} />],
      ['Web3JS', 85, <Web3JsIcon size={20} />],
      ['EtherJS', 85, <EtherJsIcon size={20} />],
      ['Firebase', 80, <FirebaseIcon size={20} />],
      ['Google Maps API', 80, <GoogleMapsIcon size={20} />],
      ['Twitter API', 80, <TwitterApiIcon size={20} />],
      ['Discord API', 80, <DiscordApiIcon size={20} />],
      ['Ionic', 80, <IonicIcon size={20} />],
      
      ['i18n', 55],
      ['Midjourney', 55],
      ['ChatGPT', 55],  
    ],
  },
  {
    name: 'sections.skills.software.title',
    skills: [
      ['Visual Studio', 55, <VisualStudioIcon size={20} />],
      ['Spyder', 60, <SpyderIcon size={20} />],
      ['Eclipse', 55, <EclipseIcon size={20} />],
      ['Atom', 55, <AtomIcon size={20} />],
      ['Android Studio', 55, <AndroidStudioIcon size={20} />],
      ['Notepad ++', 55, <NotepadIcon size={20} />],
      ['Photoshop', 55, <PhotoshopIcon size={20} />],
    ],
  },
];

function SkillCards({ isDetailed }) {
  return (
    <>
      {skills.map(({ name, skills }, idx) => {
        return (
          <SkillCard
            name={name}
            skills={skills}
            key={idx}
            isDetailed={isDetailed}
          />
        );
      })}
    </>
  );
}

export default SkillCards;
