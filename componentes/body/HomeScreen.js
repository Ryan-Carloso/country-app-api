import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Dimensions, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import useThemeSwitcher from '../useThemeSwitcher'; // Ajuste o caminho conforme necessário
import ButtonContainer from '../Header/ButtonContainer';
import CountryCard from './CountryCard';
import Header from '../Header/header';




const HomeScreen = ({ navigation }) => {
  const { currentTheme, toggleTheme } = useThemeSwitcher();

  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('alphabetical');
  const [selectedRegion, setSelectedRegion] = useState('');
  const { width, height } = Dimensions.get('window');
  const maxContainerWidth = width * 0.7;
  const windowWidth = Dimensions.get('window').width;

  const numColumns = Math.max(1, Math.min(4, Math.floor(maxContainerWidth / 130)));

  const rowHeight = 250;
  const numRows = Math.max(1, Math.floor((height - 150) / rowHeight));
  const itemsPerPage = numColumns * numRows;

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const filterAndSortCountries = () => {
    let filteredCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedRegion) {
      filteredCountries = filteredCountries.filter(
        (country) => country.region === selectedRegion
      );
    }

    if (sortOrder === 'alphabetical') {
      filteredCountries.sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
      );
    } else if (sortOrder === 'population') {
      filteredCountries.sort((a, b) => b.population - a.population);
    } else if (sortOrder === 'area') {
      filteredCountries.sort((a, b) => b.area - a.area);
    }

    return filteredCountries;
  };


  const renderGrid = () => {
    const filteredCountries = filterAndSortCountries();
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedCountries = filteredCountries.slice(startIndex, endIndex);

    let rows = [];
    for (let i = 0; i < paginatedCountries.length; i += numColumns) {
      let rowItems = paginatedCountries.slice(i, i + numColumns);
      rows.push(
        <View key={i} style={styles.row}>
          {rowItems.map((item) => (
            <CountryCard
              key={item.cca3}
              item={item}
              currentTheme={currentTheme}
              navigation={navigation}
              countries={countries}
            />

          ))}
        </View>
      );
    }
    return rows;
  };

  return (
    
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.backgroundColor }]}>
      <View style={[
  styles.containerheader,
  windowWidth < 600 ? 
    { flexDirection: 'column', justifyContent: 'center', alignItems: 'center', } : 
    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20 }
]}>
  <Header currentTheme={currentTheme} toggleTheme={toggleTheme} />

  <ButtonContainer
    style={{ zIndex: 100 }}
    currentTheme={currentTheme}
    setSortOrder={setSortOrder}
    toggleTheme={toggleTheme}
    setSelectedRegion={setSelectedRegion}
    selectedRegion={selectedRegion}
  />
</View>
<View style={[
        styles.searchContainer,
        {
          borderColor: currentTheme.backgroundColor,
          backgroundColor: currentTheme.buttonBackground,
        },
      ]}>
        <FontAwesome name="search" size={24} color={currentTheme.color}/>
        <TextInput
          style={[
            styles.searchInput,
            {
              color: currentTheme.color,
              width: maxContainerWidth * 0.4,
              maxWidth: 200,
            },
          ]}
          placeholder="Search by country name"
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholderTextColor={currentTheme.color}
        />
      </View>



      {/* Paginação */}
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          disabled={currentPage === 0}
          onPress={() => setCurrentPage(currentPage - 1)}
          style={[styles.paginationButton, { backgroundColor: currentTheme.buttonBackground }]}
        >
          <FontAwesome name="backward" size={24} color={currentTheme.color} />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={(currentPage + 1) * itemsPerPage >= filterAndSortCountries().length}
          onPress={() => setCurrentPage(currentPage + 1)}
          style={[styles.paginationButton, { backgroundColor: currentTheme.buttonBackground }]}
        >
          <FontAwesome name="forward" size={24} color={currentTheme.color} />
        </TouchableOpacity>
      </View>


      <ScrollView style={styles.scrollView}>
        {renderGrid()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  containerheader: {
    zIndex: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginLeft: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    width: '100%',
  },
  paginationButton: {
    padding: 10,
    borderRadius: 5,
  },
  scrollView: {
    width: '100%',
  },
});
