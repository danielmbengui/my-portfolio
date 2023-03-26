import React, { useState } from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Drawer,
  Stack,
  FormControl,
  Select,
} from '@mui/material';
import { Box } from '@mui/system';

import ExperienceCards from '../organisms/ExperienceCards';
import ProjectCards from '../organisms/ProjectCards';
import SkillCards from '../organisms/SkillCards';
import BlogCards from '../organisms/BlogCards';

import ArchitectureRoundedIcon from '@mui/icons-material/ArchitectureRounded';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import SelectLangageComponent from '../contexts/SelectLangageComponent';
import { ARRAY_LANGAGES } from '../../_mocks_/_settings_items_';
import EducationCards from '../organisms/EducationCards';
import { EducationIcon, ExperienceIcon, ProjectIcon, SkillsIcon, SoftSkillsIcon } from '../icons/IconifiyIcons';
import { useTranslation } from 'next-i18next';

function MobileSectionsBar() {
  const {t} = useTranslation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [section, setSection] = useState('');

  const toggleDrawer = (isOpen, section) => {
    setSection(section);
    setDrawerOpen(isOpen);
  };

  const DrawerLayout = () => {
    return (
      <div sx={{ padding: 20 }}>
        <Box
          sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
        >
          <IconButton
            onClick={() => toggleDrawer(false, '')}
            sx={{ margin: 2 }}
          >
            <ArrowBackIosNewRoundedIcon />
          </IconButton>
          <Typography variant="h6">{section}</Typography>
        </Box>
        <Box sx={{ marginX: 2 }}>
          <DrawerContent />
        </Box>
      </div>
    );
  };

  const DrawerContent = () => {
    switch (section) {
      case 'Education':
        return <EducationCards isDetailed={true} />;
        case 'Experience':
        return <ExperienceCards isDetailed={true} />;
      case 'Projects':
        return <ProjectCards isDetailed={true} />;
      case t(`sections.skills.title`):
        return <SkillCards isDetailed={true} />;
      case 'Blogs':
        return <BlogCards isDetailed={true} />;
      default:
        return <></>;
    }
  };

  return (
    <Box flex flexDirection="column">
      <List>
      <ListItem disablePadding>
          <ListItemButton
            aria-label="skills"
            onClick={() => toggleDrawer(true, t(`sections.skills.title`))}
          >
            <ListItemIcon>
              <SkillsIcon color={'inherit'} />
            </ListItemIcon>
            <ListItemText primary={t(`sections.skills.title`)} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{display: 'none'}}>
          <ListItemButton
            aria-label="education"
            onClick={() => toggleDrawer(true, t('sections.education.title'))}
          >
            <ListItemIcon>
              <EducationIcon color={'inherit'} />
            </ListItemIcon>
            <ListItemText primary={t('sections.education.title')} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{display: 'none'}}>
          <ListItemButton
            aria-label="skills"
            onClick={() => toggleDrawer(true, 'Soft skills')}
          >
            <ListItemIcon>
              <SoftSkillsIcon color={'inherit'} />
            </ListItemIcon>
            <ListItemText primary="Soft skills" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{display: 'none'}}>
          <ListItemButton
            aria-label="experience"
            onClick={() => toggleDrawer(true, 'Experience')}
          >
            <ListItemIcon>
              <ExperienceIcon color={'inherit'} />
            </ListItemIcon>
            <ListItemText primary="Experience" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{display: 'none'}}>
          <ListItemButton
            aria-label="projects"
            onClick={() => toggleDrawer(true, 'Projects')}
          >
            <ListItemIcon>
              <ProjectIcon color={'inherit'} />
            </ListItemIcon>
            <ListItemText primary="Projects" />
          </ListItemButton>
        </ListItem>


        <ListItem disablePadding sx={{display: 'none'}}>
          <ListItemButton
            aria-label="blogs"
            onClick={() => toggleDrawer(true, 'Blogs')}
          >
            <ListItemIcon>
              <BookOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Blogs" />
          </ListItemButton>
        </ListItem>
      </List>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => toggleDrawer(false, '')}
      >
        <DrawerLayout />
      </Drawer>
    </Box>
  );
}

export default MobileSectionsBar;
