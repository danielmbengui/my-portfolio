import React, { useState } from 'react';
import { Box } from '@mui/material';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

/**
 * Miniature d’étape du parcours : image entière visible, agrandissement au clic.
 */
export default function JourneyStepLightboxImage({ src, alt, borderColor, trackBg }) {
  const [open, setOpen] = useState(false);

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
          component="img"
          src={src}
          alt={alt}
          sx={{
            width: '100%',
            height: 'auto',
            maxHeight: 200,
            objectFit: 'contain',
            display: 'block',
            verticalAlign: 'middle',
          }}
        />
      </Box>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[{ src, alt }]}
        render={{ buttonPrev: () => null, buttonNext: () => null }}
      />
    </>
  );
}
