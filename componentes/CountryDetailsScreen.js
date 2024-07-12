import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';


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
    ? (
        <View style={styles.containerborder}>
          {country.borders.map(code => {
            const borderCountry = allCountries.find(c => c.cca3 === code);
            return (
              <TouchableOpacity 
                style={[styles.link, { color: currentTheme.color, backgroundColor: currentTheme.backgroundColor }]} 
                key={code} 
                onPress={() => navigation.navigate('CountryDetails', { country: borderCountry, allCountries, currentTheme })}
              >
                <Text style={[styles.link, { color: currentTheme.color }]}>
                  {borderCountry ? borderCountry.name.common : code}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )
    : <Text>N/A</Text>;

  return (
    
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: currentTheme.backgroundColor }]}>
      <SafeAreaView>


        <View style={styles.rowtitle}>
        <Text style={styles.customText}>Where in the World?</Text>


        <TouchableOpacity style={[styles.headerButton, { borderColor: currentTheme.color }]} onPress={() => navigation.navigate('Home')}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="arrow-back" size={24} color="black" />
            <Text style={[styles.headerButtonText, { color: currentTheme.color, marginLeft: 5 }]}>
              Back
            </Text>
          </View>
        </TouchableOpacity>


        <Text style={[styles.name, { color: currentTheme.color, marginLeft: 30, marginTop: 20,paddingVertical: 10, }]}>{country.name.common}</Text>


      </View>
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
        <Text style={[styles.borders, { color: currentTheme.color }]}>
          <Text style={[styles.link, { color: currentTheme.color, marginBottom: 10 }]}>
            Borders:
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>
            {borderCountries}
          </View>
        </Text>
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
  },
  containerborder: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  rowtitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  customText: {
    fontFamily: 'NunitoSans-Regular', // Nome da fonte Nunito Sans regular
    fontSize: 24,
    fontWeight: '800',
    marginRight: '10%'
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
    padding: 10,
    textAlign: 'center',
    color: 'white',
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
});

export default CountryDetailsScreen;
