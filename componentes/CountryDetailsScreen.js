import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';

const CountryDetailsScreen = ({ route, navigation }) => {
  const { country, allCountries, currentTheme } = route.params;
  const { width: screenWidth } = useWindowDimensions(); // Get screen width

  const nativeNameKey = country.name.nativeName ? Object.keys(country.name.nativeName)[0] : null;
  const nativeName = nativeNameKey ? country.name.nativeName[nativeNameKey].official : 'N/A';
  const officialName = country.name.official;

  const currencyNames = country.currencies 
    ? Object.values(country.currencies).map(currency => currency.name).join(', ') 
    : 'N/A';

  const currencySymbol = country.currencies 
    ? Object.values(country.currencies).map(currency => currency.symbol).join(', ') 
    : 'N/A';

  const borderCountries = country.borders 
    ? (
        <View style={styles.containerborder}>
          {country.borders.map(code => {
            const borderCountry = allCountries.find(c => c.cca3 === code);
            return (
              <TouchableOpacity 
                style={[styles.hamburgerButton, { backgroundColor: currentTheme.buttonBackground }]}
                key={code} 
                onPress={() => navigation.navigate('CountryDetails', { country: borderCountry, allCountries, currentTheme })}
              >
                <Text style={[styles.buttonText, { color: currentTheme.color }]}>
                  {borderCountry ? borderCountry.name.common : code}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )
    : <Text>N/A</Text>;

  const isSmallScreen = screenWidth < 600;
  const flagWidth = isSmallScreen ? screenWidth * 0.8 : screenWidth * 0.4; // Adjust as needed for larger screens
  const flagHeight = isSmallScreen ? screenWidth * 0.8 * 0.67 : screenWidth * 0.4 * 0.67; // Maintain aspect ratio

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: currentTheme.backgroundColor }]}>
      <SafeAreaView>
        <View style={styles.rowtitle}>
          <Text style={[styles.customText, { color: currentTheme.color }]}>Where in the World?</Text>
          <TouchableOpacity style={[styles.headerButton, { borderColor: currentTheme.color }]} onPress={() => navigation.navigate('Home')}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="arrow-back" size={24} color={currentTheme.color} />
              <Text style={[styles.headerButtonText, { color: currentTheme.color, marginLeft: 5 }]}>
                Back
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={isSmallScreen ? styles.contentContainerSmallScreen : styles.contentContainerLargeScreen}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: country.flags.png }} style={[styles.flag, { width: flagWidth, height: flagHeight }]} resizeMode="contain" />
          </View>

          <View style={styles.infoContainer}>
            <Text style={[styles.name, { color: currentTheme.color, fontFamily: 'NunitoSans-Bold' }]}>
              {country.name.common}
            </Text>
            <Text style={[styles.textNormal, { color: currentTheme.color }]}>
              Capital: <Text style={{ fontWeight: '400' }}>{country.capital ? country.capital[0] : 'N/A'}</Text>
            </Text>
            <Text style={[styles.textNormal, { color: currentTheme.color }]}>
              Region: <Text style={{ fontWeight: '400' }}>{country.region}</Text>
            </Text>
            <Text style={[styles.textNormal, { color: currentTheme.color }]}>
              Population: <Text style={{ fontWeight: '400' }}>{country.population.toLocaleString()}</Text>
            </Text>
            <Text style={[styles.textNormal, { color: currentTheme.color }]}>
              Currencies: <Text style={{ fontWeight: '400' }}>{currencyNames}</Text>
            </Text>
            <Text style={[styles.textNormal, { color: currentTheme.color }]}>
              Currency Symbols: <Text style={{ fontWeight: '400' }}>{currencySymbol}</Text> 
            </Text>
            <Text style={[styles.textNormal, { color: currentTheme.color, marginTop: 10, fontFamily: 'NunitoSans-Bold' }]}>
              Native Name: <Text style={{ fontWeight: '400' }}>{nativeName}</Text> 
            </Text>
            <Text style={[styles.textNormal, { color: currentTheme.color, fontFamily: 'NunitoSans-Bold' }]}>
              English Name: <Text style={{ fontWeight: '400' }}>{officialName}</Text>
            </Text>
            <Text style={[styles.textNormal, { color: currentTheme.color, marginTop: 10 }]}>
              <Text style={[styles.link, { color: currentTheme.color }]}>
                Borders:
              </Text>
              <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                {borderCountries}
              </View>
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    height: '100%'
  },
  contentContainerSmallScreen: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainerLargeScreen: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 30,
  },
  containerborder: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  rowtitle: {
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily: 'NunitoSans-Bold'
  },
  customText: {
    fontFamily: 'NunitoSans-Regular',
    fontSize: 24,
    fontWeight: '800',
    marginRight: '10%',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  flag: {
    // width and height are dynamically set
  },
  infoContainer: {
    marginLeft: 20,
    flexShrink: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 5,
  },
  textNormal: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    fontFamily: 'NunitoSans-Bold'
  },
  hamburgerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    margin: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
  },
  headerButton: {
    marginTop: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 20,
  },
  headerButtonText: {
    fontSize: 16,
    textAlign: 'center',
  },
  link: {
    fontWeight: 'bold',
  },
});

export default CountryDetailsScreen;
