import React from 'react';
import { Calendar } from 'react-native-calendars';
import { calendarTheme } from '../../../View/PagesBottomTabs/Home/calendarTheme';
import { COLORS } from '../../../View/Colors';
import { styles } from '../../../View/PagesBottomTabs/Home/styles';

interface NutritionCalendarProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
  dailySummary: any;
}

export const NutritionCalendar: React.FC<NutritionCalendarProps> = ({
  selectedDate,
  onDateSelect,
  dailySummary
}) => (
  <Calendar
    style={styles.calendar}
    onDayPress={(day:any) => onDateSelect(day.dateString)}
    markedDates={{
      [selectedDate]: {
        selected: true,
        selectedColor: COLORS.primary,
        selectedTextColor: COLORS.white,
      },
      ...Object.keys(dailySummary?.dailyCalories || {}).reduce((acc, date) => ({
        ...acc,
        [date]: { marked: true, dotColor: COLORS.primary }
      }), {}),
      [new Date().toISOString().split('T')[0]]: {
        customStyles: {
          container: {
            backgroundColor: COLORS.secondary,
            borderColor: COLORS.primary,
            borderWidth: 1,
          },
          text: {
            color: COLORS.primary,
          },
        },
      },
    }}
    theme={calendarTheme}
  />
);