const moneyConvert = (value: any, isFormat?: boolean, isFixed?: boolean) => {
  value = Number(value)?.toFixed(
    isFixed && String(value).indexOf('.') > 0 ? 2 : 0
  );
  value = String(value).replace(/\D{?!.}[$&+,:;=?@#|]/g, '');
  if (value.indexOf('.') < 0 && isFormat) {
    value = String(value).replace(/\D/g, '');
    const n = value.replace(/(\d{1,3})(?=(\d{3})+(?!\d))/g, '$1,');
    return n;
  }
  if (value.indexOf('.') < 0)
    return value.replace(/(\d{2,3})(?=(\d{3})+(?!\d))/g, '$1,');

  if (value === '' || value === undefined || value === null) return '';
  const arr = `${value}`.split('.');
  const natural = arr[0]?.replace(/(\d{1,2})(?=(\d{3})+(?!\d))/g, '$1,');
  if (arr[1] === undefined) return natural;
  return `${natural}.${arr[1]}`;
};

export const moneyConvertToNumber = (value: any) => {
  value = value.replace(/\D/g, '');
  if (value === '' || value === undefined || value === null) return 0;
  return Number(value);
};

export const moneyFormatRound = (value: any, isFormat?: boolean) => {
  if (/^0.*$/.test(String(value))) {
    return 0;
  }
  value = String(value).replace(/\D/g, '');
  if (value.indexOf('.') < 0 && isFormat) {
    value = String(value).replace(/\D/g, '');
    const n = value.replace(/(\d{1,3})(?=(\d{3})+(?!\d))/g, '$1,');
    return n;
  }
  if (value.indexOf('.') < 0)
    return value.replace(/(\d{2,3})(?=(\d{3})+(?!\d))/g, '$1,');
};

export const convertInteger = (number: string) => {
  if (Number.isInteger(Number(number))) {
    return parseInt(number);
  }
  return number;
};

export default moneyConvert;
