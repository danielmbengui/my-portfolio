import React, { useRef, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

/**
 * Modal plein écran pour lire une vidéo avec tous les contrôles sauf téléchargement.
 * @param {boolean} open
 * @param {function} onClose
 * @param {string} videoSrc
 * @param {string} [title] - Titre optionnel affiché au-dessus de la vidéo
 */
export default function VideoFullscreenDialog({ open, onClose, videoSrc, title }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const videoRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  }, [open, videoSrc]);

  const handleClose = () => {
    const video = videoRef.current;
    if (video) {
      video.pause();
    }
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen={fullScreen}
      maxWidth={false}
      fullWidth
      PaperProps={{
        sx: {
          ...(fullScreen ? {} : { maxWidth: '95vw', maxHeight: '95vh', width: 960 }),
          bgcolor: 'var(--background)',
          color: 'var(--text)',
        },
      }}
      BackdropProps={{ sx: { bgcolor: 'rgba(0,0,0,0.85)' } }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          py: 1.5,
          borderBottom: '1px solid var(--accents3)',
        }}
      >
        {title && (
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'var(--text)' }}>
            {title}
          </Typography>
        )}
        <Box sx={{ flex: 1 }} />
        <IconButton
          onClick={handleClose}
          aria-label="Fermer"
          sx={{ color: 'var(--text)' }}
          size="large"
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent
        sx={{
          p: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          bgcolor: '#000',
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <video
            key={videoSrc}
            ref={videoRef}
            controls
            controlsList="nodownload"
            disablePictureInPicture
            playsInline
            style={{
              maxWidth: '100%',
              maxHeight: fullScreen ? 'calc(100vh - 56px)' : '80vh',
              width: '100%',
              objectFit: 'contain',
            }}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
