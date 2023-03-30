import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import { styled, useTheme } from '@mui/material/styles';
import { Container, Grid, ImageListItem, ListSubheader, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { Bounce, Fade, Flip, Slide } from 'react-awesome-reveal';
import {motion, AnimatePresence} from "framer-motion";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export function AlertDialog({selectedId, setSelectedId, item}) {
  const [open, setOpen] = useState(selectedId);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedId(null);
  };

  return (
    <div style={{position:'relative'}}>
      <Button variant="outlined" onClick={handleClickOpen} >
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{p:30}}
        
      >
        <Paper  sx={{
            m:3,
            background:'red'}}>
        <DialogTitle id="alert-dialog-title">
        {item && item.title}
        </DialogTitle>
        </Paper>
        
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {item && <Typography>{item.title}</Typography>}
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
 
const Label = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
}));

export default function SkillsComponent1() {
    const {t} = useTranslation();
const theme = useTheme();
const [selectedId, setSelectedId] = useState(null)

  return (
    <Container sx={{height:'100vh', position:'relative', overflowY:'scroll', 
    //background:'green'
}}
    >
        <Grid container justifyContent={'center'} spacing={5} pt={5} pb={30}>
            <Grid item xs={12} sx={{textAlign:'center'}}>
            <Stack >
            <Typography 
            fontSize={26} 
            fontWeight={'bold'}
            sx={{background:theme.palette.primary.main, 
                //opacity:0.8, 
                margin:'auto', px:1, borderRadius:1.5, color:'var(--text-secondary)'}}
            ><Bounce triggerOnce duration={2500}>{t('sections.skills.title')}</Bounce></Typography>
            </Stack>
            </Grid>

            <Grid item xs={12} md={8}>
            <Masonry columns={3} spacing={3} sx={{
     //width:'70%',
     //height:'100%'
   }}>
   
     {itemData.map((item, index) => (
         <Slide key={index} direction='up' cascade damping={1} triggerOnce>
            <div  style={{cursor:'pointer', color:'var(--text)', position:'relative'}}>
       <motion.div
       layoutId={index + 1} onClick={() => setSelectedId(index + 1)}
    whileHover={{ scale: 1.05 }}
    //whileTap={{ scale: 0.9, background:'red' }}
    //whileFocus={{background:'red'}}
  >

<motion.div
    whileHover={{ scale: 1.1 }}
    //whileTap={{ scale: 0.9, background:'red' }}
    whileFocus={{background:'red'}}
  >
   <Label sx={{py:3,px:3, color:'var(--text)', background:'var(--background-card)'}}>
            {item.title}
        </Label>
  </motion.div>
        <img
           src={`${item.img}?w=81&auto=format`}
           srcSet={`${item.img}?w=81&auto=format&dpr=2 2x`}
           alt={item.title}
           loading="lazy"
           style={{
             borderBottomLeftRadius: 4,
             borderBottomRightRadius: 4,
             display: 'block',
             width: '100%',
           }}
         />
  </motion.div>        
       </div>
       </Slide>
     ))}
<AnimatePresence>
            {selectedId && (
              <motion.div layoutId={selectedId}>
                <AlertDialog
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                item={itemData[selectedId-1]}
                />
                <motion.h5>{`OOOOK`}</motion.h5>
                <motion.h2>{selectedId}</motion.h2>
                <motion.button onClick={() => setSelectedId(null)} />
              </motion.div>
            )}
          </AnimatePresence>
   </Masonry>
   
            </Grid>
        </Grid>
        
    </Container>
  );
}

const itemData = [
    {
        img: '/img/skills/ai.gif',
        title: 'Intelligence artificielle',
      },
  {
    img: '/img/skills/langs.gif',
    title: 'Langues',
  },
  {
    img: '/img/skills/prog.gif',
    title: 'Web / Mobile',
  },
  {
    img: '/img/skills/blockchain.gif',
    title: 'Blockchain',
  },

  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
  {
    img: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f',
    title: 'Snacks',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
  },
  {
    img: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383',
    title: 'Tower',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1627328715728-7bcc1b5db87d',
    title: 'Tree',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1627000086207-76eabf23aa2e',
    title: 'Camping Car',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
  },
  {
    img: 'https://images.unsplash.com/photo-1627328561499-a3584d4ee4f7',
    title: 'Mountain',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
  },
];