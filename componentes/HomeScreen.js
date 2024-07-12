import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Dimensions, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import useThemeSwitcher from './useThemeSwitcher'; // Ajuste o caminho conforme necessário
import ButtonContainer from './ButtonContainer';
import CountryCard from './CountryCard';
import Header from './header';


const HomeScreen = ({ navigation }) => {
  const { currentTheme, toggleTheme } = useThemeSwitcher();

  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('alphabetical');
  const [selectedRegion, setSelectedRegion] = useState('');
  const { width, height } = Dimensions.get('window');
  const maxContainerWidth = width * 0.7;

  // Calcular o número máximo de colunas por linha (mínimo 1, máximo 4)
  const numColumns = Math.max(1, Math.min(4, Math.floor(maxContainerWidth / 130)));

  // Calcular o número de linhas com base na altura da janela
  const rowHeight = 250; // Aumentando a altura da linha para acomodar elementos maiores
  const numRows = Math.max(1, Math.floor((height - 150) / rowHeight)); // 150 é um valor de buffer para outros elementos
  const itemsPerPage = numColumns * numRows; // Itens por página baseados no número de colunas e linhas

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
    <View style={[styles.container, { backgroundColor: currentTheme.backgroundColor }]}>

      <TextInput
        style={[
          styles.searchInput,
          { backgroundColor: currentTheme.backgroundColor, color: currentTheme.color, width: maxContainerWidth },
        ]}
        placeholder="Search by country name"
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholderTextColor={currentTheme.color}
      />

      <ButtonContainer
        currentTheme={currentTheme}
        setSortOrder={setSortOrder}
        toggleTheme={toggleTheme}
        setSelectedRegion={setSelectedRegion}
        selectedRegion={selectedRegion}
      />

      {/* Paginação */}
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          disabled={currentPage === 0}
          onPress={() => setCurrentPage(currentPage - 1)}
          style={[styles.paginationButton, { backgroundColor: currentTheme.buttonBackground }]}
        >
          <FontAwesome name="backward" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={(currentPage + 1) * itemsPerPage >= filterAndSortCountries().length}
          onPress={() => setCurrentPage(currentPage + 1)}
          style={[styles.paginationButton, { backgroundColor: currentTheme.buttonBackground }]}
        >
          <FontAwesome name="forward" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Renderização da lista de países */}
      <ScrollView style={styles.scrollView}>
        {renderGrid()}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20, // Ajuste conforme necessário
    paddingHorizontal: 10, // Ajuste conforme necessário
  },
  searchInput: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
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
