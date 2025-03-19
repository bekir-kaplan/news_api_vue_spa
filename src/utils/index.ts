import date from '@/utils/date';
import general from '@/utils/general';
import { debounce } from '@/utils/debounce';

const utils = { ...date, ...general, debounce };

export default utils;
