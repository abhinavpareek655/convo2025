"use client"

import { CameraView, useCameraPermissions } from "expo-camera"
import { useState } from "react"
import { Button, StyleSheet, Text, TouchableOpacity, View, TextInput, SafeAreaView, StatusBar } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const DEFAULT_SERVER = "https://convo-backend-gdvo.onrender.com"

export default function App() {
  const [SERVER_URL, setServerURL] = useState(DEFAULT_SERVER)
  const [permission, requestPermission] = useCameraPermissions()
  const [scannedData, setScannedData] = useState<string | null>(null)
  const [entryStatus, setEntryStatus] = useState<string | null>(null)
  const [isScanning, setIsScanning] = useState(true)
  const [torchOn, setTorchOn] = useState(false)
  const [serverReachable, setServerReachable] = useState<boolean | null>(null)
  const [isInputVisible, setInputVisible] = useState(false)
  const [count, setCount] = useState(0)

  if (!permission) return <View />
  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.message}>We need your permission to use the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </SafeAreaView>
    )
  }

  async function checkServerStatus() {
    try {
      const response = await fetch(SERVER_URL, { method: "GET" })
      setServerReachable(response.ok)
    } catch {
      setServerReachable(false)
    }
  }

  function extractEnrollment(data: string): string {
    const lines = data.split("\n")
    for (const line of lines) {
      if (line.startsWith("Enrollment:")) {
        return line.split(":")[1].trim()
      }
    }
    return ""
  }

  async function handleBarCodeScanned({ data }: { data: string }) {
    if (!isScanning) return

    setIsScanning(false)
    setScannedData(data)

    const enrollmentNumber = extractEnrollment(data)

    try {
      const response = await fetch(`${SERVER_URL}/api/update-entry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enrollmentNumber }),
      })
      const result = await response.json()
      setEntryStatus(result.message)
      setCount(result.count)
    } catch (e) {
      if (e instanceof Error) {
        setEntryStatus(`${e.message}`)
      } else {
        setEntryStatus("unknown")
      }
    }
  }

  function restartScanning() {
    setScannedData(null)
    setEntryStatus(null)
    setIsScanning(true)
  }

  function toggleTorch() {
    setTorchOn((prev) => !prev)
  }

  function resetServerURL() {
    setServerURL(DEFAULT_SERVER)
    setInputVisible(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      {entryStatus ? (
        <View
          style={[styles.resultScreen, { backgroundColor: entryStatus === "Entry Granted" ? "#4CAF50" : "#F44336" }]}
        >
          <Text style={styles.resultText}>
            {entryStatus === "Entry Granted" ? "✅ Entry Granted" : `⛔ ${entryStatus}`}
          </Text>
          <View style={styles.studentDataBox}>
            <Text style={styles.studentData}>{scannedData}</Text>
          </View>
          <TouchableOpacity onPress={restartScanning} style={styles.button}>
            <Text style={styles.buttonText}>Restart Scanning</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <CameraView
            style={styles.camera}
            barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
            onBarcodeScanned={handleBarCodeScanned}
            enableTorch={torchOn}
          >
            <View style={styles.overlay}>
              <View style={styles.scanArea} />
            </View>
            <View style={styles.inputContainer}>
              {isInputVisible && (
                <>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter SERVER_URL"
                    value={SERVER_URL}
                    onChangeText={setServerURL}
                    autoFocus
                    placeholderTextColor="#999"
                  />
                  <TouchableOpacity onPress={resetServerURL} style={styles.resetButton}>
                    <Text style={styles.resetButtonText}>Reset to Default</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
            <View style={styles.counter}>
              <Text style={{ color: "white", fontWeight: "bold" }}>Total Entries: {count}</Text>
            </View>
            <View style={styles.controls}>
              <TouchableOpacity onPress={toggleTorch} style={styles.iconButton}>
                <Ionicons name={torchOn ? "flashlight" : "flashlight-outline"} size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={checkServerStatus} style={styles.iconButton}>
                <Ionicons
                  name={
                    serverReachable === null ? "server-outline" : serverReachable ? "checkmark-circle" : "close-circle"
                  }
                  size={24}
                  color={serverReachable === null ? "white" : serverReachable ? "#4CAF50" : "#F44336"}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton} onPress={() => setInputVisible(!isInputVisible)}>
                <Ionicons name="settings-outline" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </CameraView>
        </>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
  },
  camera: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  scanArea: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    borderRadius: 20,
  },
  resultScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  resultText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    margin: 20,
  },
  studentDataBox: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 20,
    borderRadius: 15,
    marginTop: 20,
    width: "100%",
  },
  studentData: {
    fontSize: 16,
    color: "white",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#2196F3",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    marginTop: 30,
    elevation: 3,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  inputContainer: {
    position: "absolute",
    bottom: 120,
    width: "100%",
    alignItems: "center",
  },
  controls: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-around",
    bottom: 40,
    width: "100%",
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    width: "80%",
    fontSize: 16,
    marginBottom: 10,
  },
  iconButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 12,
    borderRadius: 50,
  },
  resetButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  resetButtonText: {
    color: "white",
    fontSize: 14,
  },
  counter:{
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    flexDirection: "row",
    padding: 10,
    borderRadius: 5,
  },
})

