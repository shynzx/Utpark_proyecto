import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>UTPark</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="menu" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.parkingTitle}>Estacionamiento 1</Text>
        
        <View style={styles.parkingCard}>
          <View style={styles.cardContent}>
            <Text style={styles.areaText}>Área disponible</Text>
            <Text style={styles.zoneText}>Zona 1</Text>
            <Text style={styles.timeText}>Tiempo en uso: --</Text>
            
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="car-parking-lights" size={80} color="white" />
            </View>
          </View>
          
          <TouchableOpacity style={styles.reserveButton}>
            <Text style={styles.reserveButtonText}>Reservar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer */}
    <View style={styles.footer}>
          <View style={styles.socialMediaContainer}>
            <TouchableOpacity onPress={() => handleSocialMediaClick("twitter")}>
              <MaterialCommunityIcons name="twitter" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSocialMediaClick("instagram")}>
              <MaterialCommunityIcons name="instagram" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSocialMediaClick("youtube")}>
              <MaterialCommunityIcons name="youtube" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 30,
    padding: 16,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    position: 'absolute',

  },
  menuButton: {
    position: 'absolute',
    right: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  parkingTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  parkingCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  cardContent: {
    alignItems: 'center',
  },
  areaText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 8,
  },
  zoneText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  timeText: {
    color: '#888',
    fontSize: 16,
    marginBottom: 20,
  },
  iconContainer: {
    marginVertical: 20,
  },
  reserveButton: {
    backgroundColor: 'white',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  reserveButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
  },
  socialMediaContainer: {
    flexDirection: "row",
    gap: 16,
  },
});
