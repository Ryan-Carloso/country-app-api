// CountryDetailScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions } from 'react-native';

const CountryDetailScreen = ({ route }) => {
  const { country } = route.params;
  const { width } = useWindowDimensions();

  const nativeNameKey = country.name.nativeName ? Object.keys(country.name.nativeName)[0] : null;
  const nativeName = nativeNameKey ? country.name.nativeName[nativeNameKey].official : 'N/A';
  const officialName = country.name.official;

  return (
    <View style={[styles.container, { padding: width * 0.05 }]}>
      <Image
        source={{ uri: country.flags.png }}
        style={[styles.flag, { width: width * 0.5, height: width * 0.3 }]}
      />
      <Text style={styles.name}>{country.name.common}</Text>
      <Text style={styles.officialName}>Official Name: {officialName}</Text>
      <Text style={styles.nativeName}>Native Name: {nativeName}</Text>
      <Text style={styles.capital}>Capital: {country.capital ? country.capital[0] : 'N/A'}</Text>
      <Text style={styles.region}>Region: {country.region}</Text>
      <Text style={styles.population}>Population: {country.population.toLocaleString()}</Text>
      <Text style={styles.area}>Area: {country.area.toLocaleString()} km²</Text>
      <Text style={styles.currencies}>Currencies: {country.currencies ? Object.keys(country.currencies).join(', ') : 'N/A'}</Text>
      <Text style={styles.languages}>Languages: {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  flag: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  officialName: {
    fontSize: 18,
    marginBottom: 5,
  },
  nativeName: {
    fontSize: 18,
    marginBottom: 5,
  },
  capital: {
    fontSize: 16,
    marginBottom: 5,
  },
  region: {
    fontSize: 16,
    marginBottom: 5,
  },
  population: {
    fontSize: 16,
    marginBottom: 5,
  },
  area: {
    fontSize: 16,
    marginBottom: 5,
  },
  currencies: {
    fontSize: 16,
    marginBottom: 5,
  },
  languages: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default CountryDetailScreen;