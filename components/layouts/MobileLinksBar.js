import React from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Box } from '@mui/system';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import { GITHUB_LINK, LINKEDIN_LINK } from '../../_mocks_/_links_items_';
import { _MY_PROFILE_ } from '../../_mocks_/_settings_items_';

function MobileLinksBar() {
  return (
    <Box flex flexDirection="column">
      <Typography variant="h6">{_MY_PROFILE_.name}</Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginY: '10px',
        }}
      >
        <EmailIcon />
        <Typography variant="span" sx={{ marginLeft: '8px' }}>
          {_MY_PROFILE_.mail}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginY: '10px',
        }}
      >
        <PhoneIcon />
        <Typography variant="span" sx={{ marginLeft: '8px' }}>
          {_MY_PROFILE_.phone}
        </Typography>
      </Box>
      <List>
        <ListItem disablePadding>
          <a
            href=""
            target="_blank"
            rel="noreferrer"
          >
            <ListItemButton>
              <ListItemIcon>
                <StickyNote2OutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Resume" />
            </ListItemButton>
          </a>
        </ListItem>
        <ListItem disablePadding>
          <a
            href={_MY_PROFILE_.socials.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            <ListItemButton>
              <ListItemIcon>
                <LinkedInIcon />
              </ListItemIcon>
              <ListItemText primary="LinkedIn" />
            </ListItemButton>
          </a>
        </ListItem>
        <ListItem disablePadding>
          <a
            href={_MY_PROFILE_.socials.github}
            target="_blank"
            rel="noreferrer"
          >
            <ListItemButton>
              <ListItemIcon>
                <GitHubIcon />
              </ListItemIcon>
              <ListItemText primary="GitHub" />
            </ListItemButton>
          </a>
        </ListItem>
        <ListItem disablePadding>
          <a
            href=""
            target="_blank"
            rel="noreferrer"
          >
            <ListItemButton>
              <ListItemIcon>
                <EmailIcon />
              </ListItemIcon>
              <ListItemText primary="Contact" />
            </ListItemButton>
          </a>
        </ListItem>
      </List>
    </Box>
  );
}

export default MobileLinksBar;
