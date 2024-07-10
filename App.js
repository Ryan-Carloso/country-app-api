import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import axios from 'axios';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('alphabetical');
  const { width } = Dimensions.get('window');
  const maxContainerWidth = width * 0.8;
  const numColumns = Math.max(2, Math.floor(maxContainerWidth / 200)); // Número dinâmico de colunas

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const filterAndSortCountries = () => {
    let filteredCountries = countries.filter(country =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortOrder === 'alphabetical') {
      filteredCountries.sort((a, b) => a.name.common.localeCompare(b.name.common));
    } else if (sortOrder === 'population') {
      filteredCountries.sort((a, b) => b.population - a.population);
    } else if (sortOrder === 'area') {
      filteredCountries.sort((a, b) => b.area - a.area);
    }

    return filteredCountries;
  };

  const renderCountry = (item) => {
    const nativeNameKey = item.name.nativeName ? Object.keys(item.name.nativeName)[0] : null;
    const nativeName = nativeNameKey ? item.name.nativeName[nativeNameKey].official : 'N/A';
    const officialName = item.name.official;

    return (
      <SafeAreaView key={item.cca3} style={[styles.countryCard, { width: maxContainerWidth / numColumns - 10 }]}>
        <Image
          source={{ uri: item.flags.png }}
          style={styles.flag}
          resizeMode="contain"
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{item.name.common}</Text>
          <Text style={styles.capital}>Capital: {item.capital ? item.capital[0] : 'N/A'}</Text>
          <Text style={styles.region}>Region: {item.region}</Text>
          <Text style={styles.population}>Population: {item.population.toLocaleString()}</Text>
          <Text style={styles.currencies}>Currencies: {item.currencies ? Object.keys(item.currencies).join(', ') : 'N/A'}</Text>
          <Text style={styles.nativeName}>Native Name: {nativeName}</Text>
          <Text style={styles.officialName}>English Name: {officialName}</Text>
        </View>
      </SafeAreaView>
    );
  };

  const renderGrid = () => {
    const filteredCountries = filterAndSortCountries();
    let rows = [];
    for (let i = 0; i < filteredCountries.length; i += numColumns) {
      let rowItems = filteredCountries.slice(i, i + numColumns);
      rows.push(
        <View key={i} style={styles.row}>
          {rowItems.map(item => renderCountry(item))}
        </View>
      );
    }
    return rows;
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by country name"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <View style={styles.buttonContainer}>
        <Button title="Sort Alphabetically" onPress={() => setSortOrder('alphabetical')} />
        <Button title="Sort by Population" onPress={() => setSortOrder('population')} />
        <Button title="Sort by Area" onPress={() => setSortOrder('area')} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {renderGrid()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: '100%',
    maxWidth: 500,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    width: '100%',
    maxWidth: 500,
  },
  scrollViewContainer: {
    alignItems: 'center',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  countryCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  flag: {
    width: '100%',
    height: 100,
    marginBottom: 10,
  },
  infoContainer: {
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  capital: {
    fontSize: 14,
    marginBottom: 2,
  },
  region: {
    fontSize: 14,
    marginBottom: 2,
  },
  population: {
    fontSize: 14,
    marginBottom: 2,
  },
  currencies: {
    fontSize: 14,
    marginBottom: 2,
  },
  nativeName: {
    fontSize: 14,
    marginBottom: 2,
  },
  officialName: {
    fontSize: 14,
    marginBottom: 2,
  },
});

export default App;
