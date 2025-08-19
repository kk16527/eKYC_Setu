import React, {useEffect, useRef, useState, useCallback, memo} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  Keyboard,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import fontStyles from '../../../../assets/styles/constants';
import languages from '../../../../common/language';
import {Autocomplete, TextField} from '@mui/material';
// import SearchIcon from 'react-native-vector-icons/AntDesign';


interface dataProps {
  label: string;
  data: Option[];
  icon?: any;
  onSelect: (value: string, label: string) => void;
  datavalue?: any;
  backColor?: string;
  isMandatory?: boolean;
  isEditable?: boolean;
  disabled?: Boolean;
  borderColor?: Boolean;
}

const InputWithDropdown: React.FC<dataProps> = ({
  label,
  data = [],
  icon,
  onSelect,
  datavalue,
  backColor,
  isMandatory = true,
  isEditable = false,
  disabled,
  borderColor,
}) => {
  const [searchText, setSearchText] = useState(datavalue || '');
  const [filteredData, setFilteredData] = useState<Option[]>([]);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setFilteredData(data || []);
  }, [data]);

  useEffect(() => {
    setSearchText(datavalue || '');
  }, [datavalue]);

  // const handleSearch = (text: string) => {
  //   if (isEditable) {
  //     setSearchText(text);
  //     if (text === '') {
  //       setFilteredData(data || []);
  //       setDropdownVisible(false);
  //       return;
  //     }
  //     const filtered =
  //       data?.filter(item =>
  //         item.label.toLowerCase().includes(text.toLowerCase()),
  //       ) || [];
  //     setFilteredData(filtered);
  //     setDropdownVisible(true);
  //   }
  // };

  // Memoized handler for search text changes (for performance)
  const handleSearch = useCallback(
    (text: string) => {
      if (isEditable) {
        setSearchText(text);
        if (text === '') {
          setFilteredData(data || []);
          setDropdownVisible(false);
          return;
        }
        const filtered =
          data?.filter(item =>
            item.label.toLowerCase().includes(text.toLowerCase()),
          ) || [];
        setFilteredData(filtered);
        setDropdownVisible(true);
      }
    },
    [data, isEditable],
  );

  // const handleSelect = (item: Option) => {

  //   // console.log('text===', item);

  //   setSearchText(item.label);
  //   setDropdownVisible(false);
  //   setFocLabel('');
  //   onSelect?.(item.value, item.label);
  //   inputRef.current?.blur();
  // };

  // Memoized handler for selecting an item from dropdown
  const handleSelect = useCallback(
    (item: Option) => {
      setSearchText(item.label);
      setDropdownVisible(false);
      setFocLabel('');
      onSelect?.(item.value, item.label);
      inputRef.current?.blur();
    },
    [onSelect],
  );

  const inputRef = useRef<TextInput | null>(null);
  const [focLabel, setFocLabel] = useState<any>();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputContainer,
          {backgroundColor: backColor ?? fontStyles.colors.white},
          isFocused || isDropdownVisible ? styles.inputFocused : {},
          {
            opacity: disabled ? 0.4 : 1,
            borderColor: borderColor ? 'blue' : fontStyles.colors.black,
          },
        ]}>
        <View
          style={[
            styles.floatingLabel,
            {backgroundColor: backColor ?? fontStyles.colors.white},
            styles.labelFixed,
            !icon && styles.labelNoIcon,
            ,
            {flexDirection: 'row', left: 10},
          ]}>
          <Text
            style={{
              fontSize: 10,
              fontFamily: 'Montserrat-Regular',
              fontWeight: 400,
              color: fontStyles.colors.lightBrown,
              textAlign: 'left',
            }}>
            {label}
          </Text>
          {isMandatory && (
            <Text
              style={{
                fontSize: 17,
                color: '#FF0000',
                paddingHorizontal: 3,
                fontFamily: 'Montserrat-Regular',
                bottom: 4,
              }}>
              *
            </Text>
          )}
        </View>
        {icon && <View style={[styles.icon]}>{icon}</View>}

        <TextInput
          ref={inputRef}
          style={[
            styles.input,
            !icon && styles.inputNoIcon,
            {zIndex: 1, textAlign: 'left'},
          ]}
          textAlign="left"
          placeholder={
            // `${languages.Select[fontStyles.lang]} ${label}`
            `${label}`
          }
          onEndEditing={() => setFocLabel('')}
          value={searchText + ''}
          onChangeText={handleSearch}
          showSoftInputOnFocus={isEditable ? true : false}
          onFocus={() => {
            setIsFocused(true);
            setDropdownVisible(true);
            setFocLabel(label);
          }}
          onBlur={() => {
            setIsFocused(false);
            setFocLabel('');
            setDropdownVisible(false);
          }}
          // showSoftInputOnFocus={false}
          autoComplete="off"
          importantForAutofill="no"
          textContentType="none"
          editable={!disabled}
        />

        {isDropdownVisible && (
          <TouchableOpacity
            style={{height: 20, width: 20}}
            onPress={() => {
              if (isDropdownVisible) {
                setDropdownVisible(false);
                setFocLabel('');
                inputRef.current?.blur();
              } else {
                inputRef.current?.focus;
              }
            }}>
            {isDropdownVisible && (
              <MaterialIcons
                name={isDropdownVisible ? 'arrow-drop-up' : 'arrow-drop-down'}
                size={20}
                color="#79757F"
              />
            )}
          </TouchableOpacity>
        )}

        {!isDropdownVisible && (
          <MaterialIcons
            name={'arrow-drop-down'}
            size={20}
            color="#79757F"
            style={{position: 'absolute', right: 10, zIndex: -1}}
          />
        )}
      </View>
      {isDropdownVisible && inputRef.current?.focus && (
        <View
          style={{
            position: 'absolute',
            zIndex: 3,
            top: 35,
            left: 0,
            width: '100%',
          }}>
          <View style={styles.dropdownContainer}>
            <ScrollView
              style={styles.dropdown}
              contentContainerStyle={styles.dropdownContent}
              nestedScrollEnabled>
              {filteredData.length === 0 && searchText ? (
                <View style={styles.notFoundContainer}>
                  <Text style={styles.notFoundText}>
                    {languages['No results found'][fontStyles.lang]}
                  </Text>
                </View>
              ) : (
                filteredData.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.itemContainer}
                    onPress={() => {
                      handleSelect(item);
                    }}>
                    <Text style={styles.itemText}>{item.label}</Text>
                  </TouchableOpacity>
                ))
              )}
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
};

export default InputWithDropdown;

const styles = StyleSheet.create({
  notFoundContainer: {
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fdfdfd',
    borderBottomWidth: 1,
    borderBottomColor: fontStyles.colors.shadeGrey,
  },
  notFoundText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    color: '#999',
    letterSpacing: 0.5,
    lineHeight: 24,
  },
  container: {
    marginVertical: 12,
  },

  dropdownContainer: {
    width: '100%',
    zIndex: 2,
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: fontStyles.colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginTop: 8, // give it space below the input
    maxHeight: 300, // allow it to grow and scroll
    borderRadius: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: fontStyles.colors.darkGreyishVoilet,
    borderRadius: 6,
    paddingHorizontal: 10,
    position: 'relative',
    height: 40,
    marginBottom: -10,
  },
  inputFocused: {
    borderColor: fontStyles.colors.darkPink,
  },
  floatingLabel: {
    fontFamily: 'Montserrat-Regular',
    position: 'absolute',
    left: 10,
    top: -10,
    // zIndex: 1,
    fontSize: 12,
    lineHeight: 20,
    letterSpacing: 0.25,
    color: fontStyles.colors.darkGreyishVoilet,
    paddingHorizontal: 2,
  },
  labelFixed: {
    fontFamily: 'Montserrat-Regular',
    lineHeight: 20,
    letterSpacing: 0.1,
    top: -10,
    fontSize: 12,
    color: fontStyles.colors.lightBrown,
  },
  labelNoIcon: {
    left: 15,
  },
  input: {
    flex: 1,
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    lineHeight: 10,
    letterSpacing: 0.1,
    color: fontStyles.colors.black,
    top: 3,
    // marginBottom:-10
  },
  inputNoIcon: {
    marginLeft: 0,
  },
  icon: {
    marginRight: 5,
    zIndex: 2,
  },
  dropdown: {
    borderWidth: 0.1,
    borderTopWidth: 0,
    borderColor: '#79757F',

    borderRadius: 6,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    marginTop: 4,
    maxHeight: 300,
    backgroundColor: '#ddd',
    zIndex: 2,
  },
  dropdownContent: {
    paddingBottom: 10,
  },
  itemContainer: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: fontStyles.colors.shadeGrey,
    backgroundColor: '#fdfdfd',
  },
  itemText: {
    fontFamily: 'Montserrat-Medium',
    // lineHeight: 10,
    letterSpacing: 0.5,
    fontSize: 12,
    color: fontStyles.colors.davGrey,
  },
  mandatory: {
    fontSize: 17,
    fontFamily: 'Montserrat-Regular',
    color: '#FF0000', // Red color for the asterisk
    borderWidth: 2,
    top: 1,
  },
});
