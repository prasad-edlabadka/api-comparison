import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { Provider as PaperProvider, DefaultTheme as PaperDefaultTheme, MD3DarkTheme as PaperDarkTheme } from 'react-native-paper';
import { Image, View, Text, Platform } from 'react-native';
import { useColorScheme } from '@/components/useColorScheme';
import { barclaysBlue, barclaysDarkBlue, barclaysAccent, barclaysGray, barclaysDarkBg, barclaysDarkPaper, barclaysDarkText, barclaysDarkSecondary } from '@/constants/Colors';

export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Effra: require('../assets/fonts/Effra_Std_Rg.ttf'),
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });
  useEffect(() => { if (error) throw error; }, [error]);
  useEffect(() => { if (loaded) { SplashScreen.hideAsync(); } }, [loaded]);
  if (!loaded) return null;
  return <RootLayoutNav />;
}

const effraStack = 'Effra';

const barclaysPaperLight = {
  ...PaperDefaultTheme,
  roundness: 10,
  colors: {
    ...PaperDefaultTheme.colors,
    primary: barclaysBlue,
    secondary: barclaysAccent,
    background: barclaysGray,
    surface: '#fff',
    text: '#222',
    onSurface: '#222',
    onPrimary: '#fff',
  },
  fonts: {
    ...PaperDefaultTheme.fonts,
    regular: { fontFamily: effraStack, fontWeight: '400' },
    medium: { fontFamily: effraStack, fontWeight: '500' },
    bold: { fontFamily: effraStack, fontWeight: '700' },
  },
};
const barclaysPaperDark = {
  ...PaperDarkTheme,
  roundness: 10,
  colors: {
    ...PaperDarkTheme.colors,
    primary: barclaysBlue,
    secondary: barclaysAccent,
    background: barclaysDarkBg,
    surface: barclaysDarkPaper,
    text: barclaysDarkText,
    onSurface: barclaysDarkText,
    onPrimary: '#fff',
  },
  fonts: {
    ...PaperDarkTheme.fonts,
    regular: { fontFamily: effraStack, fontWeight: '400' },
    medium: { fontFamily: effraStack, fontWeight: '500' },
    bold: { fontFamily: effraStack, fontWeight: '700' },
  },
};

function BarclaysHeader() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: barclaysDarkPaper, padding: 16}}>
      <Image source={require('../assets/images/barclays-logo.png')} style={{ width: 120, height: 40, marginRight: 20 }} resizeMode="contain" />
      <Text style={{ color: '#fff', fontSize: 24, fontWeight: '700', fontFamily: 'Effra' }}>Interface Match Results</Text>
    </View>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const paperTheme = colorScheme === 'dark' ? barclaysPaperDark : barclaysPaperLight;
  return (
    <PaperProvider theme={paperTheme}>
      <BarclaysHeader />
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
      </ThemeProvider>
    </PaperProvider>
  );
}
