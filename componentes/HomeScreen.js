import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, Dimensions, ScrollView, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import useDarkOrWhiteTheme from './darkorwhite'; // Adjust the path as necessary
import Ionicons from '@react-native-vector-icons/ionicons';
import axios from 'axios';



const HomeScreen = ({ navigation }) => {
  const { currentTheme, toggleTheme } = useDarkOrWhiteTheme();

  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('alphabetical');
  const { width } = Dimensions.get('window');
  const maxContainerWidth = width * 0.8;
  const numColumns = Math.max(2, Math.floor(maxContainerWidth / 200));

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
    return (
      <TouchableOpacity key={item.cca3} onPress={() => navigation.navigate('CountryDetails', { country: item, allCountries: countries })}>
        <SafeAreaView style={[styles.countryCard, { width: maxContainerWidth / numColumns - 10, backgroundColor: currentTheme.backgroundColor }]}>
          <Image
            source={{ uri: item.flags.png }}
            style={styles.flag}
            resizeMode="contain"
          />
          <View style={styles.infoContainer}>
            <Text style={[styles.name, { color: currentTheme.color }]}>{item.name.common}</Text>
            <Text style={[styles.capital, { color: currentTheme.color }]}>Capital: {item.capital ? item.capital[0] : 'N/A'}</Text>
            <Text style={[styles.region, { color: currentTheme.color }]}>Region: {item.region}</Text>
            <Text style={[styles.population, { color: currentTheme.color }]}>Population: {item.population.toLocaleString()}</Text>
          </View>
        </SafeAreaView>
      </TouchableOpacity>
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
    <View style={[styles.container, { backgroundColor: currentTheme.backgroundColor }]}>
      <TextInput
        style={[styles.searchInput, { backgroundColor: currentTheme.backgroundColor, color: currentTheme.color }]}
        placeholder="Search by country name"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      <View style={styles.buttonContainer}>
      <Ionicons name="phone" color="#ff0000" size={20} />

        <Button title="Sort Alphabetically" onPress={() => setSortOrder('alphabetical')} color={currentTheme.buttonBackground} />
        <Button title="Sort by Population" onPress={() => setSortOrder('population')} color={currentTheme.buttonBackground} />
        <Button title="Sort by Area" onPress={() => setSortOrder('area')} color={currentTheme.buttonBackground} />
        <Button title="Toggle Theme" onPress={toggleTheme} color={currentTheme.buttonBackground} />
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
});

export default HomeScreen;