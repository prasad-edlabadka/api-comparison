import React, { useMemo, useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline, IconButton, Box } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { InterfaceMatchTable } from './components/InterfaceMatchTable';
import { InterfaceMatch, MatchClassification } from './types/InterfaceMatch';

const matchClassifications: MatchClassification[] = [
  'fully matched',
  'partial match',
  'no match',
];

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateTestData(count: number): InterfaceMatch[] {
  const javaNames = ['UserService', 'OrderService', 'PaymentService', 'InventoryService', 'ShippingService', 'NotificationService', 'AuthService', 'ProductService', 'CartService', 'ReviewService'];
  const oasNames = ['user-api.yaml', 'order-api.yaml', 'payment-api.yaml', 'inventory-api.yaml', 'shipping-api.yaml', 'notification-api.yaml', 'auth-api.yaml', 'product-api.yaml', 'cart-api.yaml', 'review-api.yaml'];
  const javaSummaries = [
    'Handles user-related operations.',
    'Processes orders and manages order lifecycle.',
    'Manages payment transactions and gateways.',
    'Tracks inventory levels and stock movements.',
    'Coordinates shipping and delivery.',
    'Sends notifications to users.',
    'Handles authentication and authorization.',
    'Manages product catalog and details.',
    'Handles shopping cart operations.',
    'Manages user reviews and ratings.'
  ];
  const oasSummaries = [
    'OpenAPI spec for user microservice.',
    'OpenAPI spec for order microservice.',
    'OpenAPI spec for payment microservice.',
    'OpenAPI spec for inventory microservice.',
    'OpenAPI spec for shipping microservice.',
    'OpenAPI spec for notification microservice.',
    'OpenAPI spec for auth microservice.',
    'OpenAPI spec for product microservice.',
    'OpenAPI spec for cart microservice.',
    'OpenAPI spec for review microservice.'
  ];
  const data: InterfaceMatch[] = [];
  for (let i = 0; i < count; i++) {
    const idx = getRandomInt(0, 9);
    const matchClassification = matchClassifications[getRandomInt(0, 2)];
    let matchPercentage = 0;
    if (matchClassification === 'fully matched') matchPercentage = 100;
    else if (matchClassification === 'partial match') matchPercentage = getRandomInt(30, 99);
    else matchPercentage = getRandomInt(0, 29);
    data.push({
      _id: (i + 1).toString(),
      javaClassFilename: `${javaNames[idx]}.java`,
      javaInterfaceName: javaNames[idx],
      javaClassSummary: javaSummaries[idx],
      oasFilename: oasNames[idx],
      oasSummary: oasSummaries[idx],
      matchClassification,
      matchPercentage,
    });
  }
  return data;
}

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const theme = useMemo(() => createTheme({
    palette: {
      mode,
    },
  }), [mode]);

  const testData = useMemo(() => generateTestData(100), []);

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
        <InterfaceMatchTable data={testData} />
      </Box>
    </ThemeProvider>
  );
}

export default App;
