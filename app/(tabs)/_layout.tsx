import { Stack } from "expo-router"
import { useColorScheme } from "react-native"
import { StatusBar } from "expo-status-bar"

const darkTheme = {
  background: "#1E1E1E",
  text: "#FFFFFF",
  tint: "#2196F3",
}

const lightTheme = {
  background: "#FFFFFF",
  text: "#000000",
  tint: "#2196F3",
}

export default function Layout() {
  const colorScheme = useColorScheme()
  const theme = colorScheme === "dark" ? darkTheme : lightTheme

  return (
    <>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: theme.background,
          },
          headerTintColor: theme.text,
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
          animation: "fade",
          contentStyle: {
            backgroundColor: theme.background,
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "QR Scanner",
            headerLargeTitle: true,
            headerLargeTitleStyle: {
              color: theme.text,
            },
          }}
        />
      </Stack>
    </>
  )
}

