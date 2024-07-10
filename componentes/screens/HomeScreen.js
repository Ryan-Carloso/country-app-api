// HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import { ScrollView } from 'react-native-web';

const HomeScreen = ({ navigation }) => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('alphabetical');

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

  const renderCountry = ({ item }) => {
    return (
      <TouchableOpacity style={styles.countryContainer} onPress={() => navigation.navigate('CountryDetail', { country: item })}>
        <Image
          source={{ uri: item.flags.png }}
          style={styles.flag}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{item.name.common}</Text>
          <Text style={styles.capital}>Capital: {item.capital ? item.capital[0] : 'N/A'}</Text>
          <Text style={styles.region}>Region: {item.region}</Text>
          <Text style={styles.region}>Currencies: {item.currencies ? Object.keys(item.currencies).join(', ') : 'N/A'}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView>
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
      <FlatList
        data={filterAndSortCountries()}
        keyExtractor={(item) => item.cca3}
        renderItem={renderCountry}
      />
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  countryContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  flag: {
    width: 50,
    height: 30,
    marginRight: 10,
  },
  infoContainer: {
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  capital: {
    fontSize: 14,
  },
  region: {
    fontSize: 14,
  },
});

export default HomeScreen;