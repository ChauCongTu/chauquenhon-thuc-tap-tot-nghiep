import { format } from 'date-fns';

export const strToTime = (dateTimeString: string): Date => {
    const dateTime = new Date(dateTimeString);
    return dateTime;
}
export const formatTime = (dateTime: Date, dateFormat: string = 'HH:mm dd/MM/yyyy'): string => {
    return format(dateTime, dateFormat);
}