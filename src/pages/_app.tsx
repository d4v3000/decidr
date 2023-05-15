import { type AppType } from "next/app";
import {
  MantineProvider,
  ColorSchemeProvider,
  createEmotionCache,
} from "@mantine/core";
import type { ColorScheme } from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Navbar from "~/components/Navbar";
import Head from "next/head";

const MyApp: AppType = ({ Component, pageProps }) => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  const myCache = createEmotionCache({
    key: "mantine",
    prepend: false,
  });

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme }}
        emotionCache={myCache}
      >
        <Head>
          <title>Decidr</title>
          <meta name="description" content="" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar />
        <div className="mx-auto h-full w-3/4">
          <Component {...pageProps} />
        </div>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default api.withTRPC(MyApp);
