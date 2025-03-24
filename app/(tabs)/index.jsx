import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Animated, Dimensions, FlatList } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useRef } from 'react';

const SCREEN_WIDTH = Dimensions.get("window").width;

const parkingLots = [
  { id: '1', area: 'Área A', zone: 'Zona 1', time: '--' },
  { id: '2', area: 'Área B', zone: 'Zona 2', time: '15 min' },
  { id: '3', area: 'Área C', zone: 'Zona 3', time: '30 min' },
];

export default function HomeScreen() {
  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-SCREEN_WIDTH * 0.7)).current;

  const openMenu = () => {
    setMenuVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: -SCREEN_WIDTH * 0.7,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setMenuVisible(false));
  };

  const renderParkingCard = ({ item }) => (
    <View style={styles.parkingCard}>
      <View style={styles.cardContent}>
        <Text style={styles.areaText}>{item.area}</Text>
        <Text style={styles.zoneText}>{item.zone}</Text>
        <Text style={styles.timeText}>Tiempo en uso: {item.time}</Text>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="car-parking-lights" size={80} color="white" />
        </View>
      </View>
      <TouchableOpacity style={styles.reserveButton}>
        <Text style={styles.reserveButtonText}>Reservar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Menú lateral */}
      {menuVisible && (
        <View style={styles.overlay}>
          <TouchableOpacity style={styles.overlayBackground} onPress={closeMenu} activeOpacity={1} />
          <Animated.View style={[styles.menu, { transform: [{ translateX: slideAnim }] }]}>
            <TouchableOpacity style={styles.menuButton1} onPress={closeMenu}>
              <Ionicons name="menu" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log("Ir a Perfil")}>
              <Text style={styles.menuItem}>Perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log("Ir a Configuración")}>
              <Text style={styles.menuItem}>Configuración</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log("Cerrar Sesión")}>
              <Text style={styles.menuItem}>Cerrar Sesión</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={openMenu}>
          <Ionicons name="menu" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>UTPark</Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.parkingTitle}>Estacionamientos Disponibles</Text>
        <FlatList
          data={parkingLots}
          renderItem={renderParkingCard}
          keyExtractor={(item) => item.id}
        />
      </View>


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
  container: { flex: 1, backgroundColor: '#000' },
  header: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 30, padding: 16 },
  headerTitle: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  menuButton: { position: 'absolute', left: 16 },
  content: { flex: 1, paddingHorizontal: 16, paddingTop: 20 },
  parkingTitle: { color: 'white', fontSize: 24, fontWeight: '600', marginBottom: 20, textAlign: 'center' },
  parkingCard: { backgroundColor: '#1a1a1a', borderRadius: 15, padding: 15, marginVertical: 10, borderWidth: 1, borderColor: '#333' },
  cardContent: { alignItems: 'center' },
  areaText: { color: 'white', fontSize: 18, marginBottom: 8 },
  zoneText: { color: 'white', fontSize: 20, fontWeight: '600', marginBottom: 8 },
  timeText: { color: '#888', fontSize: 16, marginBottom: 20 },
  iconContainer: { marginVertical: 20 },
  reserveButton: { backgroundColor: 'white', borderRadius: 25, paddingVertical: 12, paddingHorizontal: 60, alignItems: 'center', marginTop: 20 },
  reserveButtonText: { color: 'black', fontSize: 16, fontWeight: '600' },
  overlay: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2000, flexDirection: 'row' },
  overlayBackground: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' },
  menu: { position: 'absolute', left: 0, top: 0, width: '70%', height: '100%', backgroundColor: '#222', padding: 20, zIndex: 2001 },
  menuItem: { color: 'white', fontSize: 18, paddingVertical: 12 },
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
