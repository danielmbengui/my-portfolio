import React, { useState } from 'react';
import AiAssistantButton from './AiAssistantButton';
import AiAssistantPanel from './AiAssistantPanel';

export default function AiAssistant() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <AiAssistantButton onClick={handleOpen} />
      <AiAssistantPanel open={open} onClose={handleClose} />
    </>
  );
}
