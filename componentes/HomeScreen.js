import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import useThemeSwitcher from './useThemeSwitcher'; // Ajuste o caminho conforme necessário
import axios from 'axios';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const HomeScreen = ({ navigation }) => {
  const { currentTheme, toggleTheme } = useThemeSwitcher();

  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('alphabetical');
  const [selectedRegion, setSelectedRegion] = useState('');
  const { width, height } = Dimensions.get('window');
  const maxContainerWidth = width * 0.7;
  const flagwidth = width * 0.2;
  const flagheight = height * 0.2;


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

  const renderCountry = (item) => {
    return (
      <TouchableOpacity
        key={item.cca3}
        onPress={() =>
          navigation.navigate('CountryDetails', {
            country: item,
            allCountries: countries,
            currentTheme,
          })
        }
      >
        <SafeAreaView
          style={[
            styles.countryCard,
            { margin: 10,  backgroundColor: currentTheme.backgroundColor,   },
          ]}
        >
          <View style={{
                width: flagwidth,
                height: flagheight, // Aumentando a altura da bandeira
          }}>
            <Image
              source={{ uri: item.flags.png }}
              style={styles.flag}
              resizeMode="cover"
            />
          </View>
          <View style={styles.infoContainer}>
            <Text style={[styles.name, { color: currentTheme.color, fontSize: 18, textAlign: 'center' }]}>
              {item.name.common}
            </Text>
            <Text style={[styles.capital, { color: currentTheme.color, fontSize: 16, textAlign: 'center' }]}>
              Capital: {item.capital ? item.capital[0] : 'N/A'}
            </Text>
            <Text style={[styles.region, { color: currentTheme.color, fontSize: 16, textAlign: 'center' }]}>
              Region: {item.region}
            </Text>
            <Text style={[styles.population, { color: currentTheme.color, fontSize: 16, textAlign: 'center' }]}>
              Population: {item.population.toLocaleString()}
            </Text>
          </View>
        </SafeAreaView>
      </TouchableOpacity>
    );
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
            <View key={item.cca3} style={{ margin: 5, justifyContent: 'center' }}>
              {renderCountry(item)}
            </View>
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

      <View style={styles.buttonContainer}>
        <Button
          title="Sort Alphabetically"
          onPress={() => setSortOrder('alphabetical')}
          color={currentTheme.buttonBackground}
        />
        <Button
          title="Sort by Population"
          onPress={() => setSortOrder('population')}
          color={currentTheme.buttonBackground}
        />
        <Button
          title="Sort by Area"
          onPress={() => setSortOrder('area')}
          color={currentTheme.buttonBackground}
        />
        <Button title="Toggle Theme" onPress={toggleTheme} color={currentTheme.buttonBackground} />
      </View>

      {/* Region Filter Buttons */}
      <View style={styles.buttonContainer}>
        <Button
          title="Europe"
          onPress={() => setSelectedRegion('Europe')}
          color={selectedRegion === 'Europe' ? '#007bff' : currentTheme.buttonBackground}
        />
        <Button
          title="Asia"
          onPress={() => setSelectedRegion('Asia')}
          color={selectedRegion === 'Asia' ? '#007bff' : currentTheme.buttonBackground}
        />
        <Button
          title="Americas"
          onPress={() => setSelectedRegion('Americas')}
          color={selectedRegion === 'Americas' ? '#007bff' : currentTheme.buttonBackground}
        />
        {/* Adicione mais botões de região conforme necessário */}
      </View>

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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
  countryCard: {
    flexDirection: 'column',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 10, // Optional: for rounded corners
  },

  flag: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  infoContainer: {
    flex: 1,
    alignItems: 'center', // Centraliza o texto
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18, // Aumentando o tamanho do texto do nome
  },
  capital: {
    fontSize: 16, // Ajustando o tamanho do texto do capital
  },
  region: {
    fontSize: 16, // Ajustando o tamanho do texto da região
  },
  population: {
    fontSize: 16, // Ajustando o tamanho do texto da população
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
