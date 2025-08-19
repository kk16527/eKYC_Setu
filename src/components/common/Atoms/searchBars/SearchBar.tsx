import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { View, TextInput, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import SearchIcon from 'react-native-vector-icons/AntDesign';
import fontStyles from '../../../../assets/styles/constants';

interface SearchBarProps {
  placeholder: string;
  onSelect: any;
  isData: any;
  isDrop?: any
  value?:any
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, onSelect, isData, isDrop,value }) => {
  const [searchText, setSearchText] = useState(value);

  const clearSearch = () => {
    setSearchText('');
    onSelect('')
  };

  useEffect(()=>{
    setSearchText(value)
  },[value])

  return (
    <View>
      <View style={styles.searchBarContainer}>
        <View style={styles.iconContainer}>
          <SearchIcon name="search1" size={15} color={fontStyles.colors.lightBrown} />
        </View>
        <TextInput
          style={styles.searchInput}
          placeholder={placeholder}
          value={searchText}
          onChangeText={(text) => { setSearchText(text), onSelect(text) }}
          placeholderTextColor={fontStyles.colors.lightBrown}
        />
        <TouchableOpacity onPress={clearSearch} style={styles.iconContainer}>
          <SearchIcon name="closecircleo" size={15} color={fontStyles.colors.lightBrown} />
        </TouchableOpacity >
      </View>
      {searchText && isData && (
        <View style={styles.dropdown}>
          {(isData.length === 0 && isDrop) ? (
            <View style={styles.notFoundContainer}>
              <Text style={styles.notFoundText}>{languages['No results found'][fontStyles.lang]}</Text>
            </View>
          ) : (
            <FlatList
              data={isData}
              keyExtractor={(item: any) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.itemContainer}
                  onPress={() => console.log(item)}
                >
                  <Text style={styles.itemText}>{item.name} - {item.center_code}</Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 30,
    paddingHorizontal: 10,
    backgroundColor: fontStyles.colors.lightMaroon,
    borderColor: "#fff",
    borderWidth: 0.5,
  },
  searchInput: {
    flex: 1,
    // marginRight: 10,
    fontFamily: 'Montserrat-Regular',
    lineHeight: 20,
    letterSpacing: 0.1,
    fontSize: 12,
    fontWeight: '400',
    paddingHorizontal: 15,
    height: 40,

  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    justifyContent: 'space-evenly',
  },
  dropdown: {
    backgroundColor: fontStyles.colors.white,
    // borderWidth: 1,
    borderColor: fontStyles.colors.darkGreyishVoilet,
    borderRadius: 6,
    marginTop: 4,
    maxHeight: 200,
    // zIndex: 999,
    marginHorizontal: 20,
  },
  itemContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: fontStyles.colors.shadeGrey,
  },
  itemText: {
    fontSize: 14,
    color: fontStyles.colors.davGrey,
  },
  notFoundContainer: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFoundText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 0.1,
    color: fontStyles.colors.darkGreyishVoilet,
  },
});

export default SearchBar;
