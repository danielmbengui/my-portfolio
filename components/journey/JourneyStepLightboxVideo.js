import React, { useState } from 'react';
import { Box, Dialog, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

/**
 * Miniature vidéo d’étape : lecture muette en boucle, sans contrôles ; agrandissement au clic.
 */
export default function JourneyStepLightboxVideo({ src, alt, borderColor, trackBg }) {
  const [open, setOpen] = useState(false);

  const videoProps = {
    src,
    autoPlay: true,
    muted: true,
    loop: true,
    playsInline: true,
    controls: false,
    controlsList: 'nodownload noplaybackrate noremoteplayback',
    disablePictureInPicture: true,
  };

  return (
    <>
      <Box
        component="button"
        type="button"
        onClick={() => setOpen(true)}
        aria-label={alt}
        sx={{
          display: 'block',
          width: '100%',
          p: 0,
          border: 'none',
          cursor: 'zoom-in',
          bgcolor: trackBg,
          '&:focus-visible': { outline: `2px solid ${borderColor}`, outlineOffset: 2 },
        }}
      >
        <Box
          component="video"
          {...videoProps}
          aria-hidden
          sx={{
            width: '100%',
            height: 'auto',
            maxHeight: 200,
            objectFit: 'contain',
            display: 'block',
            pointerEvents: 'none',
          }}
        />
      </Box>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: '#000',
            backgroundImage: 'none',
            maxWidth: 'min(960px, 95vw)',
          },
        }}
        BackdropProps={{ sx: { bgcolor: 'rgba(0,0,0,0.88)' } }}
      >
        <IconButton
          onClick={() => setOpen(false)}
          aria-label={alt}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 2,
            color: '#fff',
            bgcolor: 'rgba(0,0,0,0.45)',
            '&:hover': { bgcolor: 'rgba(0,0,0,0.65)' },
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box
          component="video"
          {...videoProps}
          sx={{
            width: '100%',
            maxHeight: '90vh',
            objectFit: 'contain',
            display: 'block',
          }}
        />
      </Dialog>
    </>
  );
}
