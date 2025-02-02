import { COLORS } from "../../Colors";

export const calendarTheme = {
    backgroundColor: COLORS.white,
    calendarBackground: COLORS.white,
    selectedDayBackgroundColor: COLORS.primary,
    selectedDayTextColor: COLORS.white,
    dayTextColor: COLORS.primary,
    textDisabledColor: '#BDBDBD',
    arrowColor: COLORS.primary,
    monthTextColor: COLORS.textPrimary,
    textDayFontFamily: 'Inter-Medium',
    textMonthFontFamily: 'Inter-SemiBold',
    textDayHeaderFontFamily: 'Inter-SemiBold',
    textDayFontSize: 14,
    textMonthFontSize: 16,
    textDayHeaderFontSize: 14,
    todayButtonColor: COLORS.primary,
    'stylesheet.calendar.header': {
        week: {
            marginTop: 8,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
        },
    },
    // Estilos para o dia atual (today)
    'stylesheet.day.basic': {
      today: {
        backgroundColor: COLORS.secondary, // Cor de fundo diferente para o dia atual
        borderRadius: 8, // Borda arredondada para destacar
        padding: 4, // Espaçamento interno para melhor visualização
      },
      todayText: {
        color: COLORS.primary, // Cor do texto diferente para o dia atual
        fontWeight: 'bold', // Texto em negrito para maior destaque
      },
    },
};
