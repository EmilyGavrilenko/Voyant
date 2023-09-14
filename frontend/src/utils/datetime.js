import moment from 'moment';

export const formatDate = (dateStr) => {
    return moment(dateStr).format('MMMM YYYY');
};
