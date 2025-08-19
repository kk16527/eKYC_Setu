import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Button from '../Atoms/buttons/Button';
import fontStyles from '../../../assets/styles/constants';
import InputWithIcon from '../Atoms/textInputs/InputWithIcon';
import InputWithDropdown from '../Atoms/textInputs/InputWithDropdown';
import Trash from 'react-native-vector-icons/Feather';
import {useAlert} from '../../../../AlertContext';
import languages from '../../../common/language';

interface InfoCardAccordionProps {
  label: string;
  icon: React.ReactNode; // Dynamic icon
  value: string;
  data: any;
  nature?: any;
  custArr?: any;
  items?: any;
  setitems?: any;
  sources?: any;
  expenses?: any;
  monthlyIncome?: any;
}
interface Option {
  label: string;
  value: string;
}
const data1: Option[] = [
  {label: 'Field Officer', value: '1'},
  {label: 'Area Manager', value: '2'},
  {label: 'Branch Manager', value: '3'},
];
const InfoCardAccordion: React.FC<InfoCardAccordionProps> = ({
  label,
  icon,
  data,
  nature,
  custArr,
  items,
  setitems,
  sources,
  expenses,
  monthlyIncome,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  //   const handleAddClick = () => {
  //     setIsExpanded(true);
  //     // setToggle(false);
  //   };

  const handleAddClick = () => {
    if (monthlyIncome) setIsExpanded(!isExpanded); // isExpanded ko toggle karo,
  };

  const handleCancel = () => setIsExpanded(false);

  // const handleChange = (data:any,index:any,value:any)=>{
  //     const updatedItems = [...items];
  //     const selitem = items.filter((item:any)=>item.type == label)
  //     selitem[index][data] = value;
  //     setitems([...updatedItems,...selitem]);
  // }

  const handleChange = async (data: any, index: any, value: any) => {
    const updatedItems = items.map((item: any) => {
      if (item.type === label) {
        const selIndex = items
          .filter((i: any) => i.type === label)
          .indexOf(item);
        if (selIndex === index) {
          if (data == 'freq') {
            return {...item, [data]: value, period: ''};
          } else {
            return {...item, [data]: value};
          }
        }
      }
      return item;
    });
    setitems(updatedItems);
  };

  // Step: Get all selected expense values
  const selectedExpenseValues = items
    .filter((i: any) => i.type === 'Expenses' && i.work?.value)
    .map((i: any) => i.work.value);

  // Step: Function to filter out already selected ones (except the one in current index)
  const getFilteredExpenses = (index: number) => {
    return expenses.filter((exp: any) => {
      const currentItem = items.filter((i: any) => i.type === 'Expenses')[
        index
      ];
      return (
        !selectedExpenseValues.includes(exp.value) ||
        currentItem?.work?.value === exp.value
      );
    });
  };

  const getFilteredSources = (index: number) => {
    const selectedSourceValues = items
      .filter((i: any) => i.type === 'Others' && i.work?.value)
      .map((i: any) => i.work.value);

    const currentItem = items.filter((i: any) => i.type === 'Others')[index];

    return sources.filter((src: any) => {
      return (
        !selectedSourceValues.includes(src.value) ||
        currentItem?.work?.value === src.value
      );
    });
  };

  const selitems = items.filter((item: any) => item.type == label);
  const showAlert = useAlert();
  return (
    // <TouchableOpacity></TouchableOpacity>
    <View
      style={[
        styles.card,
        isExpanded && {backgroundColor: fontStyles.colors.white},
      ]}
      // onPress={() => {
      //   if (monthlyIncome) handleAddClick();
      // }}
    >
      <View style={[styles.leftSection, {marginBottom: isExpanded ? 15 : 0}]}>
        <View>
          <View style={styles.imageContainer}>
            {icon}
            <Text style={styles.label}>{label}</Text>
            {selitems.length > 0 && !isExpanded && (
              <View
                style={{
                  height: 25,
                  width: 25,
                  backgroundColor: fontStyles.colors.primary,
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 15,
                  marginTop: -2,
                }}>
                <Text style={{color: '#fff'}}>{selitems.length}</Text>
              </View>
            )}
          </View>
          {/* <View style={styles.labelTextContainer}>
                        <Text style={styles.labelText}>Monthly Income: </Text>
                        <Text style={styles.value}>{4}</Text>
                    </View> */}
        </View>
        {isExpanded ? (
          <TouchableOpacity onPress={handleCancel} style={{padding: 5}}>
            <AntDesign
              name="up"
              size={16}
              color={fontStyles.colors.lightBrown}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleAddClick} style={{padding: 5}}>
            <AntDesign
              name="down"
              size={16}
              color={fontStyles.colors.lightBrown}
            />
            {/* <Text style={styles.addButtonText}>Add Income</Text> */}
          </TouchableOpacity>
        )}
      </View>

      {isExpanded && (
        <View style={styles.expandedSection}>
          {/* <TouchableOpacity style={styles.addButton} onPress={() => {
                        // setToggle(!toggle)
                        setitems(
                        [...items,
                            {
                                work:"",
                                member:"",
                                amt:"",
                                freq:"",
                                period:"",
                                collapse:false
                            }
                        ])
                        }}>
                        <AntDesign name="plus" size={16} color="#904B3D" />
                        <Text style={styles.addButtonText}>Add Income</Text>
                    </TouchableOpacity> */}
         
 {selitems.map((item: any, index: any) => {
            return (
              <View
                key={index}
                style={{
                  borderWidth: 1,
                  borderRadius: 12,
                  padding: 20,
                  borderColor: fontStyles.colors.grey,
                  backgroundColor: fontStyles.colors.white,
                  // marginTop: 10,
                }}>
                <View
                  style={{
                    backgroundColor: fontStyles.colors.primary,
                    marginHorizontal: -10,
                    marginVertical: -10,
                    padding: 10,
                    borderWidth: 0.5,
                    borderColor: fontStyles.colors.grey,
                    borderRadius: 12,
                  }}>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      width: '100%',
                    }}>
                    <Text
                      style={{fontSize: 16, color: fontStyles.colors.white}}>
                      {label} - {index + 1}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity
                        style={{marginRight: 40}}
                        onPress={() => {
                          // const updatedItems = [...items];
                          // updatedItems.splice(index, 1);
                          // setitems(updatedItems);
                          const filteredItems = items.filter(
                            (item: any) => item.type === label,
                          );
                          const itemToDelete = filteredItems[index];
                          const updatedItems = items.filter(
                            (item: any) => item !== itemToDelete,
                          );
                          setitems(updatedItems);
                        }}>
                        <Trash
                          name="trash-2"
                          size={18}
                          color={fontStyles.colors.white}
                        />
                      </TouchableOpacity>

                      {item.collapse ? (
                        <TouchableOpacity
                          onPress={() => {
                            // const updatedItems = [...items];
                            // updatedItems[index].collapse = !updatedItems[index].collapse;
                            // setitems(updatedItems);
                            handleChange('collapse', index, !item.collapse);
                          }}>
                          <AntDesign
                            name="up"
                            size={16}
                            color={fontStyles.colors.white}
                          />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() => {
                            // const updatedItems = [...items];
                            // updatedItems[index].collapse = !updatedItems[index].collapse;
                            // setitems(updatedItems);
                            handleChange('collapse', index, !item.collapse);
                          }}>
                          <AntDesign
                            name="down"
                            size={16}
                            color={fontStyles.colors.white}
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                  {!item.collapse && (
                    <View>
                      <View style={styles.divider} />
                      <View
                        style={{
                          alignItems: 'flex-start',
                          justifyContent: 'flex-start',
                        }}>
                        {label != 'Expenses' && (
                          <View>
                            {label !== 'Others' && (
                              <View
                                style={{
                                  // paddingBottom: 6,
                                  paddingVertical: 6,
                                  marginTop: 8,
                                }}>
                                <Text style={[styles.assetsText, {}]}>
                                  {languages['Nature Of Work'][fontStyles.lang]}{' '}
                                  - {item.work?.label}
                                </Text>
                              </View>
                            )}
                            {label == 'Others' && (
                              <View
                                style={{
                                  paddingBottom: 6,
                                  paddingVertical: 6,
                                  marginTop: 20,
                                }}>
                                <Text style={[styles.assetsText, {}]}>
                                  {languages.Source[fontStyles.lang]} -{' '}
                                  {item.work?.label}
                                </Text>
                              </View>
                            )}
                            {label !== 'Others' && (
                              <View
                                style={{paddingBottom: 6, paddingVertical: 6}}>
                                <Text style={[styles.assetsText, {}]}>
                                  {languages['Member Name'][fontStyles.lang]} -{' '}
                                  {item.member?.label}
                                </Text>
                              </View>
                            )}
                            <View
                              style={{paddingBottom: 6, paddingVertical: 6}}>
                              <Text style={[styles.assetsText, {}]}>
                                {languages.Amount[fontStyles.lang]} - {item.amt}
                              </Text>
                            </View>
                            <View
                              style={{paddingBottom: 6, paddingVertical: 6}}>
                              <Text style={[styles.assetsText, {}]}>
                                {languages.Frequency[fontStyles.lang]} -{' '}
                                {item.freq.label}
                              </Text>
                            </View>
                            <View
                              style={{paddingBottom: 6, paddingVertical: 6}}>
                              <Text style={[styles.assetsText, {}]}>
                                {languages['No Of Periods'][fontStyles.lang]} -{' '}
                                {item.period}
                              </Text>
                            </View>
                          </View>
                        )}
                        {label === 'Expenses' && (
                          <View>
                            <View
                              style={{
                                paddingBottom: 6,
                                paddingVertical: 6,
                                marginTop: 20,
                              }}>
                              <Text style={[styles.assetsText, {}]}>
                                {languages.Expense[fontStyles.lang]} -{' '}
                                {item.work?.label}
                              </Text>
                            </View>
                            <View
                              style={{paddingBottom: 6, paddingVertical: 6}}>
                              <Text style={[styles.assetsText, {}]}>
                                {languages.Amount[fontStyles.lang]} - {item.amt}
                              </Text>
                            </View>
                          </View>
                        )}
                      </View>
                    </View>
                  )}
                </View>

                {item.collapse && (
                  <>
                    {label != 'Expenses' && (
                      <View style={{marginBottom: -20}}>
                        {label !== 'Others' && (
                          <View
                            style={{
                              paddingBottom: 6,
                              paddingVertical: 12,
                              marginTop: 10,
                            }}>
                            <InputWithDropdown
                              label={'Nature Of Work'}
                              datavalue={item.work?.label}
                              backColor={fontStyles.colors.white}
                              onSelect={(value: any, data: any) => {
                                handleChange('work', index, {
                                  label: data,
                                  value: value,
                                });
                              }}
                              data={nature}
                            />
                          </View>
                        )}
                        {label == 'Others' && (
                          <View
                            style={{
                              paddingBottom: 6,
                              paddingVertical: 12,
                              marginTop: 10,
                            }}>
                            <InputWithDropdown
                              label={'Source'}
                              datavalue={item.work?.label}
                              backColor={fontStyles.colors.white}
                              onSelect={(value: any, data: any) => {
                                handleChange('work', index, {
                                  label: data,
                                  value: value,
                                });
                              }}
                              // data={sources}
                              data={getFilteredSources(index)}
                            />
                          </View>
                        )}
                        {label !== 'Others' && (
                          <View style={{marginTop: -5}}>
                            <InputWithDropdown
                              label={'Member Name'}
                              data={custArr}
                              datavalue={item.member?.label}
                              backColor={fontStyles.colors.white}
                              onSelect={(value: any, data: any) => {
                                handleChange('member', index, {
                                  label: data,
                                  value: value,
                                });
                              }}
                            />
                          </View>
                        )}
                        <InputWithIcon
                          label={'Amount'}
                          placeholder={'Amount'}
                          value={item.amt}
                          backColor={fontStyles.colors.white}
                          onChangeText={(data: any) =>
                            handleChange('amt', index, data)
                          }
                          keyboardType="number-pad"
                        />
                        <View style={{marginTop: -10}}>
                          <InputWithDropdown
                            label={'Frequency'}
                            data={[
                              {label: 'Monthly', value: 'Monthly'},
                              {label: 'Yearly', value: 'Yearly'},
                            ]}
                            datavalue={item.freq.label}
                            backColor={fontStyles.colors.white}
                            onSelect={async (value: any, data: any) => {
                              await handleChange('freq', index, {
                                label: data,
                                value: value,
                              });
                            }}
                          />
                        </View>
                        <InputWithIcon
                          label={'No Of Periods'}
                          placeholder={'No Of Periods'}
                          value={item.period}
                          backColor={fontStyles.colors.white}
                          keyboardType="numeric"
                          maxLength={2}
                          onChangeText={(data: any) => {
                            if (
                              item.freq.label &&
                              item.freq.label == 'Monthly' &&
                              data <= 12
                            ) {
                              handleChange('period', index, data);
                            }
                            if (
                              item.freq.label &&
                              item.freq.label == 'Yearly' &&
                              (data == 1 || data == '')
                            ) {
                              handleChange('period', index, data);
                            }
                          }}
                        />
                      </View>
                    )}
                    {label === 'Expenses' && (
                      <View style={{marginBottom: -10, marginTop: -10}}>
                        <View
                          style={{
                            paddingBottom: 6,
                            paddingVertical: 12,
                            marginTop: 20,
                            marginBottom: -5,
                          }}>
                          <InputWithDropdown
                            label={'Expense'}
                            datavalue={item.work?.label}
                            backColor={fontStyles.colors.white}
                            onSelect={(value: any, data: any) => {
                              handleChange('work', index, {
                                label: data,
                                value: value,
                              });
                            }}
                            // data={expenses}
                            data={getFilteredExpenses(index)}
                          />
                        </View>
                        <InputWithIcon
                          label={'Amount'}
                          placeholder={'Amount'}
                          value={item.amt}
                          backColor={fontStyles.colors.white}
                          onChangeText={(data: any) =>
                            handleChange('amt', index, data)
                          }
                          keyboardType="number-pad"
                        />
                      </View>
                    )}
                  </>
                )}

                {/* <TouchableOpacity>
                                <Text style={styles.removeText}>Remove</Text>
                            </TouchableOpacity> */}
              </View>
            );
          })}

          <View style={styles.buttonContainer}>
            <View>
              <Button
                style={{width: 60, height: 30}}
                // title={`+ Add ${label}`}
                title={'Add'}
                variant={'contained'}
                color={fontStyles.colors.primary}
                onPress={() => {
                  setitems((prevItems: any) => {
                    // If type is "Expenses", allow multiple entries
                    if (label === 'Expenses') {
                      return [
                        ...prevItems,
                        {
                          work: '',
                          member: '',
                          amt: '',
                          freq: '',
                          period: '',
                          collapse: true,
                          type: label,
                          id: data.id,
                        },
                      ];
                    }

                    // For other types, allow only one entry
                    // if (prevItems.some((item: any) => item.type === label)) {
                    //   showAlert(
                    //     languages.Sorry[fontStyles.lang],
                    //     `${
                    //       languages['Cant add more'][fontStyles.lang]
                    //     } ${label} ${languages.Income[fontStyles.lang]}!!`,
                    //   );
                    //   return prevItems; // Prevent adding duplicate types
                    // }
                    if (label !== 'Expenses' && label !== 'Others') {
                      if (prevItems.some((item: any) => item.type === label)) {
                        showAlert(
                          languages.Sorry[fontStyles.lang],
                          `${
                            languages['Cant add more'][fontStyles.lang]
                          } ${label} ${languages.Income[fontStyles.lang]}!!`,
                        );
                        return prevItems;
                      }
                    }
                    return [
                      ...prevItems,
                      {
                        work: '',
                        member: '',
                        amt: '',
                        freq: '',
                        period: '',
                        collapse: true,
                        type: label,
                        id: data.id,
                      },
                    ];
                  });
                }}
              />
            </View>
            <View>
              <Button
                title={languages.Close[fontStyles.lang]}
                style={{width: 60, height: 30}}
                variant={'contained'}
                color={fontStyles.colors.primary}
                onPress={handleCancel}
              />
            </View>
            {/* <View style={styles.btnInnerContainner}>
                            <Button
                                title={'Save'}
                                variant={'contained'}
                                color={fontStyles.colors.primary}
                                onPress={handleSave}
                            />
                        </View> */}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: fontStyles.colors.white,
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    justifyContent: 'space-around',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
    borderWidth: 0.1,
    shadowColor: fontStyles.colors.black,
  },
  leftSection: {
    // paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  label: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: 0.1,
    color: fontStyles.colors.primary,
    marginLeft: 20,
    // marginBottom: 4,
  },
  labelTextContainer: {
    flexDirection: 'row',
    padding: 3,
  },
  labelText: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    color: fontStyles.colors.darkBrown,
    paddingRight: 5,
  },
  value: {
    // borderWidth: 2,
    // backgroundColor: fontStyles.colors.black,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    color: fontStyles.colors.darkBrown,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 14,
    fontWeight: '500',
    color: fontStyles.colors.darkBrown,
    marginBottom: 10,
  },
  addButton: {
    width: 123,
    height: 30,
    borderRadius: 20,
    backgroundColor: fontStyles.colors.secondary,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3, // For Android shadow
  },
  expandedSection: {
    // marginTop: 16,
    // backgroundColor: '#FFF1EF',
  },
  removeText: {
    textAlign: 'left',
    color: fontStyles.colors.primary,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  textField: {
    height: 40,
    borderColor: '#D1D1D1',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  addButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: fontStyles.colors.primary,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    zIndex: -1,
    width: '90%',
    alignSelf: 'center',
  },
  btnInnerContainner: {
    width: '70%',
  },
  assetsText: {
    color: '#fff',
    fontFamily: 'Montserrat',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    letterSpacing: 0.1,
    marginLeft: 12,
    // marginVertical: 8,
  },
  divider: {
    height: 1,
    backgroundColor: fontStyles.colors.white,
    marginTop: 10,
  },
});

export default InfoCardAccordion;
