import React, { useState } from 'react'
import {
    ActivityIndicator,
    Dimensions,
    Image,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { useEffect } from "react"
import Geolocation from 'react-native-geolocation-service';
import {
    Day,
    Temperature,
    Title,
    DateContainer,
    TemperatureContainer,
    Row,
    FeelsLike,
    BottomContainer,
    ForecastContainer,
    Info,
    InfoText,
    InfoContainer,
    Line,
    DraggableZone,
    SHADOW,
    Container
} from './styled'
import { fetchForecast } from '../../redux/thunk/forecast';
import { useAppDispatch, useAppSelector } from '../../redux/types';
import { format } from 'date-fns';
import Icon from 'react-native-vector-icons/Ionicons';
import ForecastDay from '../../components/ForecastDay';
import { useTheme } from 'styled-components/native';
import { hasLocationPermission } from '../../utills/permissions';
import { useBottomAnimation, BOTTOM_SHEET_HEIGHT, BOTTOM_SHEET_MIN_HEIGHT } from './hooks/useBottomAnimation';

const periods = [3, 7, 14];


function HomeScreen() {

    const theme = useTheme();

    const dispatch = useAppDispatch();

    const { bottomSheetAnimation, panResponder } = useBottomAnimation();

    const [period, setPeriod] = useState<number>(3); // 3 | 7 | 14

    const [coords, setCoords] = useState<{ latitude: number, longitude: number } | undefined>();

    const { forecast, current, location, isLoading, error } = useAppSelector(state => state.forecast);

    useEffect(() => {
        Geolocation.getCurrentPosition(
            ({ coords }) => {
                setCoords(coords);
            },
            (error) => {
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }, []);

    useEffect(() => {
        hasLocationPermission();
    }, []);


    const getForecast = async () => {
        const permission = await hasLocationPermission();
        if (permission)
            Geolocation.getCurrentPosition(
                ({ coords }) => {
                    dispatch(fetchForecast({
                        period: period,
                        coords: {
                            lat: coords.latitude,
                            lon: coords.longitude
                        }
                    }));
                },
                (error) => {
                    console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );

    }

    useEffect(() => {
        getForecast()
    }, [period, coords?.latitude, coords?.latitude]);

    const changePeriod = (dir: 'l' | 'r') => {
        setPeriod(prev => {
            const index = periods.findIndex((period) => prev === period);
            let diff = dir === 'l' ? -1 : 1
            const newIndex = ((index + diff) % periods.length + periods.length) % periods.length
            return periods[newIndex];
        })
    }

    if (error) {
        return <Container>
            <Text>{error}</Text>
        </Container>
    }
    return (
        <>
            <Container>
                {isLoading ? <ActivityIndicator /> : current ? <>
                    <Title>{location?.region}, {location?.name}</Title>
                    <DateContainer>
                        <Image source={{ uri: `https:${current?.condition.icon}` }} style={{ width: 50, height: 50 }} />
                        <View>
                            <Title>Today</Title>
                            <Day>{format(new Date, 'ccc, dd. MMM')}</Day>
                        </View>
                    </DateContainer>
                    <TemperatureContainer>
                        <Temperature>{current?.temp_c}°</Temperature>
                        <Row>
                            <FeelsLike>Feels like {current?.feelslike_c}°C, </FeelsLike>
                            <FeelsLike>{current?.condition.text}</FeelsLike>
                        </Row>
                    </TemperatureContainer>
                </> : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Title>No data</Title>
                    <TouchableOpacity onPress={getForecast}>
                        <Icon name="refresh-outline" size={25} color={theme.text} />
                    </TouchableOpacity>
                </View>}
            </Container>
            <BottomContainer
                style={[
                    bottomSheetAnimation,
                    SHADOW,
                    {
                        bottom: (BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_HEIGHT),
                        height: BOTTOM_SHEET_HEIGHT
                    }
                ]}>
                <Line />
                <DraggableZone {...panResponder.panHandlers} />
                <InfoContainer>
                    <Info>
                        <InfoText>Humidity</InfoText>
                        <InfoText>{current?.humidity}</InfoText>
                    </Info>
                    <Info>
                        <InfoText>Visibility</InfoText>
                        <InfoText>{current?.vis_km} km</InfoText>
                    </Info>
                    <Info>
                        <InfoText>Wind</InfoText>
                        <InfoText>{current?.wind_kph} kph</InfoText>
                    </Info>
                </InfoContainer>
                <ForecastContainer>
                    <View style={{
                        marginBottom: 15, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row',
                        paddingHorizontal: 10
                    }}>
                        <Text style={{ color: theme.text, fontWeight: '600', }}>Forecast</Text>
                        <View style={{ alignSelf: 'center', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                            <TouchableOpacity onPress={changePeriod.bind(null, 'l')}>
                                <Icon name="caret-back-outline" size={15} color={theme.text} />
                            </TouchableOpacity>
                            <Text style={{ color: theme.text, fontWeight: '600', paddingHorizontal: 10 }}>{period}</Text>
                            <TouchableOpacity onPress={changePeriod.bind(null, 'r')}>
                                <Icon name="caret-forward-outline" size={15} color={theme.text} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {forecast.map((daily, idx) => {
                        return <ForecastDay daily={daily} />
                    })}
                </ForecastContainer>
            </BottomContainer>
        </>
    )
}

export default HomeScreen