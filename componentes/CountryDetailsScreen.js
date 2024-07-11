import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Button, StyleSheet } from 'react-native';

const CountryDetailsScreen = ({ route, navigation }) => {
  const { country, allCountries, currentTheme } = route.params;
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
    ? country.borders.map(code => {
        const borderCountry = allCountries.find(c => c.cca3 === code);
        return (
          <TouchableOpacity key={code} onPress={() => navigation.navigate('CountryDetails', { country: borderCountry, allCountries, currentTheme })}>
            <Text style={[styles.link, { color: currentTheme.color }]}>{borderCountry ? borderCountry.name.common : code}</Text>
          </TouchableOpacity>
        );
      })
    : 'N/A';

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: currentTheme.backgroundColor }]}>
      <View style={styles.flagContainer}>
        <Image source={{ uri: country.flags.png }} style={styles.flag} resizeMode="contain" />
      </View>
      <View style={styles.infoContainer}>
        <Text style={[styles.name, { color: currentTheme.color }]}>{country.name.common}</Text>
        <Text style={[styles.capital, { color: currentTheme.color }]}>Capital: {country.capital ? country.capital[0] : 'N/A'}</Text>
        <Text style={[styles.region, { color: currentTheme.color }]}>Region: {country.region}</Text>
        <Text style={[styles.population, { color: currentTheme.color }]}>Population: {country.population.toLocaleString()}</Text>
        <Text style={[styles.currencies, { color: currentTheme.color }]}>Currencies: {currencyNames}</Text>
        <Text style={[styles.currencies, { color: currentTheme.color }]}>Currency Symbols: {currencySymbol}</Text>
        <Text style={[styles.nativeName, { color: currentTheme.color }]}>Native Name: {nativeName}</Text>
        <Text style={[styles.officialName, { color: currentTheme.color }]}>English Name: {officialName}</Text>
        <Text style={[styles.borders, { color: currentTheme.color }]}>Borders: {borderCountries}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Toggle Theme" onPress={() => navigation.navigate('Home', { toggleTheme: true })} color={currentTheme.buttonBackground} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  flagContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  flag: {
    width: 300,
    height: 200,
  },
  infoContainer: {
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  capital: {
    fontSize: 18,
    marginBottom: 5,
  },
  region: {
    fontSize: 18,
    marginBottom: 5,
  },
  population: {
    fontSize: 18,
    marginBottom: 5,
  },
  currencies: {
    fontSize: 18,
    marginBottom: 5,
  },
  nativeName: {
    fontSize: 18,
    marginBottom: 5,
  },
  officialName: {
    fontSize: 18,
    marginBottom: 5,
  },
  borders: {
    fontSize: 18,
    marginBottom: 5,
  },
  link: {
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    maxWidth: 300,
  },
});

export default CountryDetailsScreen;
