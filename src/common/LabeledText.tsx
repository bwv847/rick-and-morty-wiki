import React from 'react';
import { Typography, styled } from '@mui/material';

const Text = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
})) as typeof Typography;

export interface LabeledTextProps {
  label: string;
  text: React.ReactNode;
}

const LabeledText = React.memo<LabeledTextProps>(function LabeledText({
  label,
  text,
}: LabeledTextProps) {
  return (
    <div>
      <Typography color="textSecondary" variant="button">
        {label}
      </Typography>
      <Text color={'secondary'} variant="h6" component="p">
        {text}
      </Text>
    </div>
  );
});

export default LabeledText;
