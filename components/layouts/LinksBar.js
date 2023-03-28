import React, { useState, useRef } from 'react';
import {
  Avatar,
  IconButton,
  Typography,
  Box,
  ButtonBase,
  Button,
  Tooltip,
} from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import { grey } from '@mui/material/colors';
import { Popover } from '@mui/material';
import Link from 'next/link';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import StyledBadge from '../atoms/StyledBadge';
import { GITHUB_LINK, LINKEDIN_LINK } from '../../_mocks_/_links_items_';
import { PAGE_LINK_RESUME, _MY_PROFILE_ } from '../../_mocks_/_settings_items_';
import { useRouter } from 'next/router';
import { useLangMode } from '../../contexts/LangModeProvider';

function LinksBar() {
  const avatarRef = useRef(null);
  const [popoverOpen, setPopoverOpen] = useState(false);
const router = useRouter();
const [lang, setLang] = useLangMode();
  const handlePopoverClose = () => {
    setPopoverOpen(false);
  };

  return (
    <>
     <Tooltip
        title={<span style={{ fontSize: 13 }}>{`Resume`}</span>}
        placement="left"
        //sx={{display:'none'}}
      >
        <a
        href={`/${lang}${PAGE_LINK_RESUME}`}
        target="_blank"
        rel="noreferrer"
        //style={{display:'none'}}
      >
        <IconButton>
          <StickyNote2OutlinedIcon sx={{ color: 'var(--primary)', width: 30, height: 30 }} />
        </IconButton>
      </a>
      </Tooltip>
      <Tooltip
        title={<span style={{ fontSize: 13 }}>{`Linkedin`}</span>}
        placement="left"
        //sx={{display:'none'}}
      >
        <a
        href={_MY_PROFILE_.socials.linkedin}
        target="_blank"
        rel="noreferrer"
      >
        <IconButton>
          <LinkedInIcon sx={{ color: 'var(--primary)', width: 30, height: 30 }} />
        </IconButton>
      </a>
        </Tooltip>    
      
      <Tooltip
        title={<span style={{ fontSize: 13 }}>{`Github`}</span>}
        placement="left"
        //sx={{display:'none'}}
      >
         <a
        href={_MY_PROFILE_.socials.github}
        target="_blank"
        rel="noreferrer"
      >
        <IconButton>
          <GitHubIcon sx={{ color: 'var(--primary)', width: 30, height: 30 }} />
        </IconButton>
      </a>
        </Tooltip> 
     
      <Tooltip
        title={<span style={{ fontSize: 13 }}>{`Contact`}</span>}
        placement="left"
        //sx={{display:'none'}}
      >
        <a
        href="/"
        target="_blank"
        rel="noreferrer"
        //style={{display:'none'}}
      >
        <IconButton>
          <EmailIcon sx={{ color: 'var(--primary)', width: 30, height: 30 }} />
        </IconButton>
      </a>
        </Tooltip> 
      
    </>
  );
}

export default LinksBar;
