import React, { useMemo, useState, useEffect } from 'react';
import { ThemeProvider, createTheme, CssBaseline, IconButton, Box } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { InterfaceMatchTable } from './components/InterfaceMatchTable';
import { InterfaceMatch } from './types/InterfaceMatch';

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const theme = useMemo(() => createTheme({
    palette: {
      mode,
    },
  }), [mode]);

  const [data, setData] = useState<InterfaceMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:8080/api/matches')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch data');
        return res.json();
      })
      .then(setData)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ p: 2, bgcolor: 'background.default', minHeight: '100vh' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box sx={{ flexGrow: 1, fontWeight: 'bold', fontSize: 24 }}>
            Interface Match Results
          </Box>
          <IconButton onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')} color="inherit">
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div style={{ color: 'red' }}>Error: {error}</div>
        ) : (
          <InterfaceMatchTable data={data} />
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;
