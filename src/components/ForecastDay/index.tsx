import React, { memo } from 'react'
import { Image } from 'react-native'
import { DailyForecastContainer, ForecastDayText, DateText, Block } from './styled'
import { FC } from 'react'
import { TForecast } from '../../types/weather'
import { format } from 'date-fns';
import Icon from 'react-native-vector-icons/Ionicons';

const ForecastDay: FC<{ daily: TForecast }> = ({ daily }) => {
    return (
        <DailyForecastContainer>
            <DateText>{format(new Date(daily.date), 'ccc, dd MMM')}</DateText>
            <Image source={{ uri: `https:${daily.day.condition.icon}` }} style={{ width: 20, height: 20 }} />
            <Block>
                <Icon name="caret-down-outline" size={14} color="blue" />
                <ForecastDayText> {daily.day.mintemp_c}°C</ForecastDayText>
            </Block>
            <Block>
                <Icon name="caret-up-outline" size={14} color="red" />
                <ForecastDayText>{daily.day.maxtemp_c}°C</ForecastDayText>
            </Block>
        </DailyForecastContainer>

    )
}

export default memo(ForecastDay, (prevProps, nextProps) => {
    return prevProps.daily.date_epoch === nextProps.daily.date_epoch
})