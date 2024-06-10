import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { APICall } from '../../helper/Helper';
import { Colors } from '../../assets/colors';
import Fonts from '../../assets/fonts/Fonts';
import BackHeader from '../../components/BackHeader/BackHeader';

export default function Notification(props) {
    const [notification, setNotification] = useState([])
    const getNotification = () => {
        APICall('get', 'notification-list', {}, onPassNoti, onFailNoti);
    }
    const onPassNoti = (response) => {
        console.log("responseresponseresponseresponse", response?.data)
        setNotification(response?.data)
    }
    const onFailNoti = (error) => {
        console.log("errorerrorerrorerror", error?.response?.data)
        setNotification([])
    }
    useEffect(() => {
        getNotification()
    }, [])
    return (
        <>
            <BackHeader headerTitle={'Notifications'} />
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 15 }}
                data={notification}
                renderItem={({ item }) => {
                    return (
                        <>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={{
                                    backgroundColor: Colors.white,
                                    marginBottom: 10,
                                    marginHorizontal: 15,
                                    paddingVertical: 10,
                                    paddingHorizontal: 12,
                                    borderRadius: 7,
                                    borderWidth: 0.5,
                                    borderColor: Colors.primarycolor
                                }}>
                                <Text
                                    style={{
                                        fontSize: 13,
                                        fontFamily: Fonts.Poppins400,
                                        color: Colors.dark
                                    }}>From:<Text
                                        style={{
                                            fontSize: 12,
                                            fontFamily: Fonts.Poppins400Italic,
                                        }}> {item?.from}</Text></Text>
                                <Text style={{ fontSize: 13, fontFamily: Fonts.Manrope500, }}>{item?.message}</Text>
                                {item?.created_at && <Text style={{ fontSize: 12, alignSelf: 'flex-end' }}>{moment(item?.created_at).format('hh:mm A')}</Text>}
                            </TouchableOpacity>
                        </>
                    );
                }}
            />
        </>
    )
}