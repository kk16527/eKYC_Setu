import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Image, TouchableWithoutFeedback, Modal } from 'react-native';
import fontStyles from '../../../../assets/styles/constants';
import Entypo from 'react-native-vector-icons/Entypo';
import languages from '../../../../common/language';
import DatePicker from 'react-native-date-picker';
import PopUpBackButton from '../../../../assets/images/svg/PopUpBackButton';
import InputWithDropdown from '../textInputs/InputWithDropdown';
 import SearchIcon from 'react-native-vector-icons/AntDesign';
import Button from '../buttons/Button';

const centers = [{ label: 'Srajan', value: 'srajan' }, { label: 'Numen', value: 'numen' }];

const RouteCard = ({ value }) => {

    const [open, setOpen] = useState(false);
    const [time, setTime] = useState<any>(new Date());
    const [routeName, setRouteName] = useState<string>('');
    const [isVisible, setVisible] = useState(false);
    const [toggle, setToggle] = useState(false);

    return (
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
            <View style={{ padding: 10, backgroundColor: fontStyles.colors.lightPink, borderWidth: 1, borderColor: fontStyles.colors.darkOrange, borderRadius: 12, }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 16, fontWeight: '400', lineHeight: 24, letterSpacing: 0.5, color: fontStyles.colors.darkBrown, marginLeft: 3 }}>{value.centerName}</Text>
                        <Text style={styles.cardText}>{value.address}</Text>
                    </View>
                    <TouchableOpacity onPress={() => setVisible(!isVisible)} style={{ justifyContent: 'center', width: '12%', alignItems: 'center' }}>
                        <Entypo name="dots-three-vertical" size={14} color={fontStyles.colors.primary} />
                    </TouchableOpacity>

                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                    <TouchableOpacity onPress={() => { '' }} style={{ height: 40, flexDirection: 'row', justifyContent: 'space-between', width: '23%', alignItems: 'center', marginTop: 12 }}>
                        <Image
                            source={require('../../../../assets/images/Vector.png')}
                            style={[{ width: '35%', height: '35%' }]}
                            resizeMode="contain"
                        />
                        <Text style={[styles.routeText, { color: fontStyles.colors.primary }]}>{languages.Map[fontStyles.lang]}</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '40%', height: 45, justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: fontStyles.colors.primary, backgroundColor: fontStyles.colors.white, marginHorizontal: 12 }}>
                        <View style={{ alignItems: 'center', width: '75%' }} >
                            <Text style={styles.timerText}>{languages.Schedule[fontStyles.lang]}</Text>
                            <TouchableOpacity onPress={() => setOpen(true)}>
                                <Text style={styles.textInput}>
                                    {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </Text>
                            </TouchableOpacity>
                            <DatePicker
                                modal
                                open={open}
                                date={time}
                                mode="time"
                                onConfirm={(selectedDate) => {
                                    setOpen(false);
                                    setTime(selectedDate);
                                }}
                                onCancel={() => setOpen(false)}
                            />
                        </View>
                        <Image
                            source={require('../../../../assets/images/timer.jpg')}
                            style={{ width: 22, marginTop: 12, marginRight: 6 }}
                            resizeMode="contain"
                        />
                    </View>
                </View>

                {/* small pop up */}
                {isVisible && (
                    <TouchableWithoutFeedback onPress={() => setVisible(false)}>
                        <TouchableOpacity style={styles.popUp} onPress={() => setToggle(true)}>
                            <Text style={styles.popUpText}>{languages['Update'][fontStyles.lang]} {value.centerName}</Text>
                        </TouchableOpacity>
                    </TouchableWithoutFeedback>
                )}

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={toggle}
                    onRequestClose={() => setToggle(false)}
                >
                    <View style={styles.modalOverlay}>
                        <TouchableWithoutFeedback onPress={() => setToggle(false)}>
                            <View style={{ flex: 1 }} />
                        </TouchableWithoutFeedback>
                        <View style={styles.modalContainer}>
                            <View style={styles.topContainer}>
                                <Text style={styles.modalTitle}>{languages['Update'][fontStyles.lang]} {value.centerName}</Text>
                                <TouchableOpacity onPress={() => setToggle(false)}>
                                    {/* <PopUpBackButton /> */}
                                     <SearchIcon name="closecircleo" size={18} color={fontStyles.colors.lightBrown} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ justifyContent: 'space-between', marginBottom: 12 }}>
                                <InputWithDropdown
                                    datavalue={routeName}
                                    label={languages['Select Route'][fontStyles.lang]}
                                    data={centers}
                                    onSelect={(val: any) => {
                                        setRouteName(val);
                                        console.log("Selected route", val)
                                    }}
                                />
                            </View>
                            <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'space-between', flexDirection: 'row' }}>
                                <View style={styles.buttomBtn}>
                                    <Button
                                        title={languages.Cancel[fontStyles.lang]}
                                        variant={'outlined'}
                                        color={fontStyles.colors.primary}
                                        onPress={() => setToggle(false)}
                                    />
                                </View>
                                <View style={styles.buttomBtn}>
                                    <Button
                                        title={languages.Save[fontStyles.lang]}
                                        variant={'contained'}
                                        color={fontStyles.colors.primary}
                                        onPress={() => setToggle(false)}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>


                </Modal>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    textInput: {
        width: '100%',
        fontFamily: 'Montserrat-Medium',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 24,
        letterSpacing: 0.5,
        color: '#3A0A03',
    },
    routeText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 20,
        letterSpacing: 0.1,
        color: fontStyles.colors.cyan,
        marginRight: 10,
    },
    cardText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 20,
        letterSpacing: 0.25,
        color: fontStyles.colors.lightBrown,
    },
    timerText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 16,
        letterSpacing: 0.4,
        color: fontStyles.colors.primary,
        marginRight: 6,
    },
    buttomBtn: {
        height: 40,
        width: '40%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    popUp: {
        alignItems: 'center',
        width: '60%',
        position: 'absolute',
        marginTop: 30,
        padding: 16,
        marginHorizontal: 120,
        backgroundColor: '#FFDBD1',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.16, // 26% opacity (equivalent to #00000026)
        shadowRadius: 6,
        elevation: 8,
    },
    popUpText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 24,
        letterSpacing: 0.5,
        color: fontStyles.colors.darkBrown,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        position: 'absolute',
        // top: height / 2, // Place at half the screen
        height: '40%',
        left: 20,
        right: 20,
        backgroundColor: fontStyles.colors.white,
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    topContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '600',
        lineHeight: 24,
        letterSpacing: 0.15,
        color: fontStyles.colors.primary,
        textAlign: 'center',
    },
});

export default RouteCard;
