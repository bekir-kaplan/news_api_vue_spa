import date from '@/utils/date';
import general from '@/utils/general';
import { debounce } from '@/utils/generic';

const utils = { ...date, ...general, debounce };

export default utils;
