import {
  Box,
  Button,
  ButtonBase,
  Card,
  Grid,
  LinearProgress,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';
import { Avatar } from '@mui/material';
import { grey } from '@mui/material/colors';
import { JavascriptIcon, SunIcon } from '../icons/IconifiyIcons';
import { useTranslation } from 'next-i18next';

function SkillCard({ name, skills, isDetailed }) {
  const {t} = useTranslation();

  return (
    <Card
      variant="outlined"
      sx={{
        padding: 1,
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 1,
        border: isDetailed ? 'none' : '',
      }}
      width={isDetailed ? '500px' : '100%'}
    >
      <Typography variant="h6">{t(name)}</Typography>
      {skills.map(([name, val, icon], idx) => {
        return (
          <Grid
            container
            display="flex"
            flexDirection="row"
            key={idx}
            width="100%"
            alignItems="center"
            justifyContent={'center'}
            sx={{ paddingTop: '3px' }}
            
          >
            <Grid item xs={1} sm={1} sx={{textAlign:'center'}}>
              {
                icon
              }
            </Grid>
            <Grid item xs={4} sm={3} md={2}>
              <Typography>{name}</Typography>
            </Grid>
            <Grid item xs sm md={9}>
            <Typography variant="body2" color="text.secondary">{`${Math.round(
          val,
        )}%`}</Typography>
            <LinearProgress
                  variant="determinate"
                  value={val}
                  sx={{ borderRadius: 2 }}
                />
              
            </Grid>
          </Grid>
        );
      })}
    </Card>
  );
}

export default SkillCard;
