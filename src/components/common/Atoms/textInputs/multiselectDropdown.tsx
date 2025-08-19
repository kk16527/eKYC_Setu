import React, { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import fontStyles from '../../../../assets/styles/constants';
import languages from '../../../../common/language';

interface Option {
  label: string;
  value: string;
}

interface MultiSelectProps {
  label: string;
  data: Option[];
  icon?: any;
  onSelect: (values: any) => void;
  remove: (values: any) => void;
  selectedItems?: Option[];
  backColor?: string;
}

const MultiSelectDropdown: React.FC<MultiSelectProps> = ({
  label,
  data = [],
  icon,
  onSelect,
  remove,
  selectedItems = [],
  backColor,
}) => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState<Option[]>(data);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  // const filData = data.filter((item: any) =>
  //   !selectedItems.some((selected: any) => selected.value === item.value)
  // );
  const filData = data;
  // const [selectedItems, setSelectedItems] = useState<Option[]>(selectedValues);

  useEffect(() => {
    setFilteredData(filData || []);
  }, [data]);

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text === '') {
      setFilteredData(filData);
      return;
    }
    const filtered = filData.filter((item) =>
      item.label.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
    setDropdownVisible(true);
  };

  const handleSelect = (item: Option) => {
    if (!selectedItems.find((i) => i.value === item.value)) {
      const newSelectedItems: any = item;
      // setSelectedItems(newSelectedItems);
      onSelect(newSelectedItems);
    }
    setSearchText('');
    setFilteredData(data);
    // setDropdownVisible(false);
  };

  const removeItem = (item: Option) => {
    // setSelectedItems(newSelectedItems);
    remove(item);
  };


  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputContainer,
          { backgroundColor: backColor ?? fontStyles.colors.white },
          isFocused || isDropdownVisible ? styles.inputFocused : {},
        ]}
      >
        <Text style={styles.floatingLabel}>{label}</Text>
        {icon && <View style={{ marginRight: 5, opacity: 0.7 }}>{icon}</View>}
        {selectedItems.length > 0 && (
          <View style={[styles.selectedItemsContainer, { flexWrap: 'wrap' }]}>
            {selectedItems.map((item, index) => {
              return (
                <View key={item.value} style={[styles.selectedItem, { marginVertical: 5 }]}>
                  <Text style={[styles.selectedText]}>{item.label}</Text>
                  <TouchableOpacity onPress={() => removeItem(item)}>
                    <MaterialIcons name="close" size={16} color="#fff" />
                  </TouchableOpacity>
                </View>
              )
            })}
          </View>)}
        <TextInput
          style={[styles.input, !icon && styles.inputNoIcon]}
          placeholder={selectedItems.length > 0 ? '' : `${languages.Select[fontStyles.lang]} ${label}`}
          value={searchText}
          onChangeText={handleSearch}
          onFocus={() => {
            setIsFocused(true);
            setDropdownVisible(true);
          }}
          onBlur={() => setIsFocused(false)}
        />
        <TouchableOpacity onPress={() => setDropdownVisible(!isDropdownVisible)}>
          <MaterialIcons
            name={isDropdownVisible ? 'arrow-drop-up' : 'arrow-drop-down'}
            size={24}
            color="#79757F"
          />
        </TouchableOpacity>
      </View>

      {isDropdownVisible && (
        <View style={styles.dropdownContainer}>
          <ScrollView style={styles.dropdown} nestedScrollEnabled>
            {filteredData.length === 0 && searchText ? (
              <View style={styles.notFoundContainer}>
                <Text style={styles.notFoundText}>{languages['No results found'][fontStyles.lang]}</Text>
              </View>
            ) : (
              filteredData.map((item, index) => {
                const isSelected = selectedItems.some((selected: any) => selected.value === item.value);
                return (
                  <TouchableOpacity
                    key={index}
                    style={[styles.itemContainer]}
                    onPress={() => handleSelect(item)}
                  >
                    <Text style={[styles.itemText, { opacity: isSelected ? 0.3 : 1 }]}>{item.label}</Text>
                  </TouchableOpacity>
                )
              }
              )
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default MultiSelectDropdown;

const styles = StyleSheet.create({
  container: { marginVertical: 12 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: fontStyles.colors.darkGreyishVoilet,
    borderRadius: 6,
    paddingHorizontal: 10,
    position: "relative",
    // height: 50,
  },
  inputFocused: { borderColor: fontStyles.colors.darkPink },
  floatingLabel: { fontFamily: 'Montserrat-Medium', position: "absolute", top: -25, left: 15, fontSize: 12, color: "#999", backgroundColor: fontStyles.colors.white, padding: 10 },
  selectedItemsContainer: { flexDirection: "row", maxWidth: "85%", marginVertical: 10 },
  selectedItem: {
    flexDirection: "row",
    backgroundColor: fontStyles.colors.primary,
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    alignItems: "center",
  },
  selectedText: { color: "#fff", marginRight: 4, fontSize: 12, fontFamily: 'Montserrat-Medium' },
  input: { flex: 1, fontSize: 12, color: fontStyles.colors.black, fontFamily: 'Montserrat-Medium' },
  dropdownContainer: {
    // position: "absolute",
    width: "100%",  // Ensure it takes full width
    // top: 50,       // Adjust position correctly
    // zIndex: 999,
    backgroundColor: "white", // Ensures dropdown is visible
    elevation: 5,  // Adds shadow on Android
    shadowColor: fontStyles.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  dropdown: { maxHeight: 300, backgroundColor: "#ddd" },
  itemContainer: {
    paddingVertical: 5,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: fontStyles.colors.shadeGrey,
    backgroundColor: '#fdfdfd',
  },
  itemText: {
    fontFamily: 'Montserrat-Medium',
    lineHeight: 24,
    letterSpacing: 0.5,
    fontSize: 10,
    color: fontStyles.colors.davGrey,
  },
  notFoundContainer: { alignItems: "center", paddingVertical: 12, backgroundColor: "#fdfdfd" },
  notFoundText: { fontSize: 16, color: "#999" },
});
