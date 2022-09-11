/**
 * Author: Jakub Zaukolec
 * This is component that displays loading indicator
 */
import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate() {
    return (
      <Box sx={{  textAlign:"center", marginTop:10 }}>
        <CircularProgress />
      </Box>
    );
}
