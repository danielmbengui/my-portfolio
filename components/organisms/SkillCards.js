import { Stack } from '@mui/material';
import React from 'react';
import { AndroidIcon, CssIcon, C_LangageIcon, HtmlIcon, JavaIcon, JavascriptIcon, MySqlIcon, PhpIcon, PythonIcon, SolidityIcon, TypescriptIcon } from '../icons/IconifiyIcons';
import SkillCard from '../molecules/SkillCard';

const skills = [
  {
    name: 'sections.skills.programming.title',
    skills: [
      ['JavaScript', 95, <JavascriptIcon size={20} />],
      ['HTML/CSS', 95, <Stack direction={'row'} justifyContent={'center'}><HtmlIcon size={20} /><CssIcon size={20} /></Stack>],
      ['Python', 90, <PythonIcon size={20} />],
      ['Java', 85, <JavaIcon size={20} />],
      ['Android', 85, <AndroidIcon size={20} />],
      ['Php', 80, <PhpIcon size={20} />],
      ['SQL', 80, <MySqlIcon size={20} />],
      ['Typescript', 70, <TypescriptIcon size={20} />],
      ['Solidity', 60, <SolidityIcon size={20} />],
      ['C', 50, <C_LangageIcon size={20} />],
      ['C++', 75],
      ['TypeScript', 85],
      ['TypeScript', 85],
      
      
      ['SQL', 70],
      
      ['Golang', 60],
      ['Solidity', 50],
    ],
  },
  {
    name: 'Frameworks / Tools',
    skills: [
      ['React', 95],
      ['NodeJS', 85],
      ['Vue', 80],
      ['Firebase', 80],
      ['MongoDB', 75],
      ['MySQL', 70],
      ['React Native', 60],
      ['Django', 55],
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
