import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Image } from 'react-native';

export const filterAndSortCountries = (countries, searchTerm, sortOrder) => {
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

export const renderCountry = (item, navigation, countries, currentTheme, maxContainerWidth, numColumns, styles) => {
  return (
    <TouchableOpacity 
      key={item.cca3} 
      onPress={() => navigation.navigate('CountryDetails', { country: item, allCountries: countries, currentTheme })}
    >
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

export const renderGrid = (filteredCountries, navigation, countries, currentTheme, maxContainerWidth, numColumns, styles) => {
  let rows = [];
  for (let i = 0; i < filteredCountries.length; i += numColumns) {
    let rowItems = filteredCountries.slice(i, i + numColumns);
    rows.push(
      <View key={i} style={styles.row}>
        {rowItems.map(item => renderCountry(item, navigation, countries, currentTheme, maxContainerWidth, numColumns, styles))}
      </View>
    );
  }
  return rows;
};
