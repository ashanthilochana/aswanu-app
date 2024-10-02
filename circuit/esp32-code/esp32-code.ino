#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include "addons/TokenHelper.h"  // Provide the token generation process info.
#include "addons/RTDBHelper.h"   // Provide the RTDB payload printing info.

// Replace these with your network credentials
#define WIFI_SSID "Aus Digi Solutions - Dialog4G"
#define WIFI_PASSWORD "123@AusDigiSol"

// Firebase project API Key Firebase RTDB URL
// #define API_KEY "AIzaSyAPLzgkh7VfRS_0QHa_MtYW9vktPderDMA"
// #define DATABASE_URL "https://aswanu-app-default-rtdb.asia-southeast1.firebasedatabase.app/" 
#define API_KEY "AIzaSyBgCvK3TYIULuITWp22nY-fILjWsO_fAgc"
#define DATABASE_URL "https://aswanu-app-bf9a1-default-rtdb.asia-southeast1.firebasedatabase.app/" 

// Location
#define LOCATION "Malabe"

// Pin definitions
#define W_PUMP_PIN 15
#define F_SPRAY_PIN 2

// Firebase ESP32 client object
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

// Firebase variables
unsigned long sendDataPrevMillis = 0;
bool signupOK = false;

// Replace this with the correct path in your Firebase using the LOCATION variable
String databasePath = "/Sensors/" + String(LOCATION) + "/";
String devicePathAddOn = "Devices/";

// Define sensor variables
int humidity = 0;
int ldr = 0;
int ph = 0;
int rain = 0;
int soilMoisture = 0;
int temp = 0;
int tank = 0;
bool security = true;
bool fertilizerSpray = false;
bool waterPump = false;

// Function to connect to WiFi
void connectWiFi() {
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.println("Connected to Wi-Fi");
}

// Function to update sensor values to Firebase
void updateFirebase() {

  // Firebase is ready and connected.
  // The user has successfully signed up (or authenticated).
  // Check if 5 seconds have passed since the last data transmission, 
  // or if it's the first time sending data (when sendDataPrevMillis is 0)
  if (Firebase.ready()) {

    Firebase.RTDB.setInt(&fbdo, databasePath + "humidity", humidity);
    Firebase.RTDB.setInt(&fbdo, databasePath + "ldr", ldr);
    Firebase.RTDB.setInt(&fbdo, databasePath + "ph", ph);
    Firebase.RTDB.setInt(&fbdo, databasePath + "rain", rain);
    Firebase.RTDB.setInt(&fbdo, databasePath + "soilMoisture", soilMoisture);
    Firebase.RTDB.setInt(&fbdo, databasePath + "temp", temp);
    Firebase.RTDB.setInt(&fbdo, databasePath + "tankWaterLevel", tank);
    Firebase.RTDB.setBool(&fbdo, databasePath + "security", security);
    
    // Firebase.RTDB.setBool(&fbdo, databasePath + devicePathAddOn + "fertilizerSpray", fertilizerSpray);
    // Firebase.RTDB.setBool(&fbdo, databasePath + devicePathAddOn + "waterPump", waterPump);

    Serial.println("Data updated successfully");
  } else {
    Serial.println("Firebase connection failed");
  }
}

// Function to get the fertilizer spray status from Firebase and update the variable
void updateFertilizerSprayStatus() {
  if (Firebase.ready()) {
    if (Firebase.RTDB.getBool(&fbdo, databasePath + devicePathAddOn + "fertilizerSpray")) {
      fertilizerSpray = fbdo.boolData();
      Serial.print("Fertilizer Spray status updated: ");
      Serial.println(fertilizerSpray ? "ON" : "OFF");
    } else {
      Serial.println("Failed to get Fertilizer Spray status");
    }
  }
}

// Function to get the water pump status from Firebase and update the variable
void updateWaterPumpStatus() {
  if (Firebase.ready()) {
    if (Firebase.RTDB.getBool(&fbdo, databasePath + devicePathAddOn + "waterPump")) {
      waterPump = fbdo.boolData();
      Serial.print("Water Pump status updated: ");
      Serial.println(waterPump ? "ON" : "OFF");
    } else {
      Serial.println("Failed to get Water Pump status");
    }
  }
}

void setup() {

  // Initialize pins
  pinMode(W_PUMP_PIN, OUTPUT);
  pinMode(F_SPRAY_PIN, OUTPUT);

  // Start serial communication
  Serial.begin(115200);

  // Connect to Wi-Fi
  connectWiFi();

  // Firebase connection
  config.api_key = API_KEY;
  config.database_url = DATABASE_URL;

  // Firebase SignUp method
  if (Firebase.signUp(&config, &auth, "", "")) {
    Serial.println("Database Sign Up Successful.");
    signupOK = true;
  } else {
    Serial.printf("%s \n", config.signer.signupError.message.c_str());
  }

  // Create call back token, Firebase start, Turn on wifi reconnecting
  config.token_status_callback = tokenStatusCallback;
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);

  // Update Firebase database initially
  updateFertilizerSprayStatus();
  updateWaterPumpStatus();
  updateFirebase();

}

void loop() {

  // Define sensor variables
  int humidity = 0;
  int ldr = 0;
  int ph = 0;
  int rain = 0;
  int soilMoisture = 0;
  int temp = 0;
  int tank = 0;

  int randomNumber = random(5, 5);

  humidity = humidity + randomNumber * 4;
  ldr = ldr+ randomNumber * 10;
  ph = ph+ randomNumber * 2;
  rain = rain+ randomNumber * 5;
  soilMoisture = soilMoisture+ randomNumber * 3;
  temp = temp+ randomNumber *2.5;
  tank = tank+ randomNumber * 30;

  // Firebase is ready and connected.
  // The user has successfully signed up (or authenticated).
  // Check if 5 seconds have passed since the last data transmission, 
  // or if it's the first time sending data (when sendDataPrevMillis is 0)
  if (Firebase.ready() && signupOK && (millis() - sendDataPrevMillis > 5000 || sendDataPrevMillis == 0)) {

    sendDataPrevMillis = millis();
    
    // Get devices status
    updateFertilizerSprayStatus();
    updateWaterPumpStatus();

    // Update Firebase 
    updateFirebase();

    // Turn On/Off Devices
    digitalWrite(W_PUMP_PIN, waterPump ? HIGH : LOW);
    digitalWrite(F_SPRAY_PIN, fertilizerSpray ? HIGH : LOW);
  }

  delay(1000);
}
