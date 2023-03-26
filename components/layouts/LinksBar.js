import React, { useState, useRef } from 'react';
import {
  Avatar,
  IconButton,
  Typography,
  Box,
  ButtonBase,
  Button,
} from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import { grey } from '@mui/material/colors';
import { Popover } from '@mui/material';
import Link from 'next/link';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import StyledBadge from '../atoms/StyledBadge';
import { GITHUB_LINK, LINKEDIN_LINK } from '../../_mocks_/_links_items_';

function LinksBar() {
  const avatarRef = useRef(null);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handlePopoverClose = () => {
    setPopoverOpen(false);
  };

  return (
    <>
      <a
        href={LINKEDIN_LINK}
        target="_blank"
        rel="noreferrer"
      >
        <IconButton>
          <LinkedInIcon sx={{ color: 'var(--primary)', width: 30, height: 30 }} />
        </IconButton>
      </a>
      <a
        href={GITHUB_LINK}
        target="_blank"
        rel="noreferrer"
      >
        <IconButton>
          <GitHubIcon sx={{ color: 'var(--primary)', width: 30, height: 30 }} />
        </IconButton>
      </a>
      <a
        href="https://www.instagram.com/jeffreyzepeng/"
        target="_blank"
        rel="noreferrer"
        style={{display:'none'}}
      >
        <IconButton>
          <InstagramIcon sx={{ color: 'var(--primary)', width: 30, height: 30 }} />
        </IconButton>
      </a>
    </>
  );
}

export default LinksBar;
