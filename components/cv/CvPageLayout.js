import React, { useState } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import JourneySiteNav from '@/components/journey/JourneySiteNav';
import AiAssistantPanel from '@/components/assistant/AiAssistantPanel';
import {
  getJourneyTheme,
  journeyFixedHeaderNavSx,
  journeyFixedHeaderOffsetSx,
  journeyFixedHeaderShellSx,
  journeySiteCssVars,
  useJourneyThemeMode,
} from '@/components/journey/journeyTheme';

export default function CvPageLayout({ children }) {
  const { mode: themeMode, resolved, changeMode } = useJourneyThemeMode();
  const theme = getJourneyTheme(resolved);
  const isMobile = useMediaQuery('(max-width: 900px)', { noSsr: true });
  const [assistantOpen, setAssistantOpen] = useState(false);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        overflowX: 'hidden',
        bgcolor: theme.background,
        backgroundImage: theme.backgroundGradient,
        transition: 'background-color .4s ease, color .3s ease',
        fontFamily: 'Roboto, sans-serif',
        color: theme.text,
        colorScheme: theme.mode,
        ...journeySiteCssVars(theme),
      }}
    >
      <Box sx={journeyFixedHeaderShellSx()}>
        <Box sx={journeyFixedHeaderNavSx()}>
          <JourneySiteNav
            variant="cv"
            theme={theme}
            themeMode={themeMode}
            onThemeChange={changeMode}
            isMobile={isMobile}
            onOpenAssistant={() => setAssistantOpen(true)}
          />
        </Box>
      </Box>

      <Box sx={journeyFixedHeaderOffsetSx()}>{children}</Box>

      <AiAssistantPanel open={assistantOpen} onClose={() => setAssistantOpen(false)} />
    </Box>
  );
}
