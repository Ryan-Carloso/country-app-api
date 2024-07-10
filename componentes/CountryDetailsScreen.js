import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import styles from '../assets/styles/stylescountry';

const CountryDetailsScreen = ({ route, navigation }) => {
  const { country, allCountries } = route.params;
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
          <TouchableOpacity key={code} onPress={() => navigation.navigate('CountryDetails', { country: borderCountry, allCountries })}>
            <Text style={styles.link}>{borderCountry ? borderCountry.name.common : code}</Text>
          </TouchableOpacity>
        );
      })
    : 'N/A';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.flagContainer}>
        <Image source={{ uri: country.flags.png }} style={styles.flag} resizeMode="contain" />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{country.name.common}</Text>
        <Text style={styles.capital}>Capital: {country.capital ? country.capital[0] : 'N/A'}</Text>
        <Text style={styles.region}>Region: {country.region}</Text>
        <Text style={styles.population}>Population: {country.population.toLocaleString()}</Text>
        <Text style={styles.currencies}>Currencies: {currencyNames}</Text>
        <Text style={styles.currencies}>Currency Symbols: {currencySymbol}</Text>
        <Text style={styles.nativeName}>Native Name: {nativeName}</Text>
        <Text style={styles.officialName}>English Name: {officialName}</Text>
        <Text style={styles.borders}>Borders: {borderCountries}</Text>
      </View>
    </ScrollView>
  );
};

export default CountryDetailsScreen;
