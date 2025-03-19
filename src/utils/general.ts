import {
  CON_COUNTRY_FLAG_IMAGE_EXTENSION,
  CON_COUNTRY_FLAG_URL,
} from '@/constants/conCountryCodes';

const general = {
  getCountryFlagUrl: (countryCode: string): string => {
    return `${CON_COUNTRY_FLAG_URL}/${countryCode}${CON_COUNTRY_FLAG_IMAGE_EXTENSION}`;
  },
};

export default general;
