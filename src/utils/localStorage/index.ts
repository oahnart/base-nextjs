const now = new Date(); // Get current date

/** Save value to localStorage
 * @name: name of localStorage
 * @data : data want to save
 * @ex_date : expiration date // if set param is true ==> Always there (No expiration)
 */
export const saveLocalStorage = (
  name: string,
  data: any,
  ex_date: any,
  session?: boolean
) => {
  ex_date = ex_date * 24 * 3600000;
  data = ex_date
    ? { value: data, expiry: 'no' }
    : { value: data, expiry: now.getTime() + ex_date };

  if (session) {
    sessionStorage.setItem(name, JSON.stringify(data));
  } else {
    localStorage.setItem(name, JSON.stringify(data));
  }
};

/** Get data from localStorage
 * @name: name of localStorage
 * @type: get option value
 * + 0 ==> return value
 * + 1 ==> return express date
 */
export const getLocalStorage = (name: string, type: number) => {
  let s: any = localStorage.getItem(name)
    ? localStorage.getItem(name)
    : sessionStorage.getItem(name);
  if (s === null) return null;
  if (s !== null) s = JSON.parse(s);

  const dateSaved = new Date(s.expiry);
  if (s.expiry !== undefined && now > dateSaved) {
    deleteLocaStorage(name);
    return null;
  }

  if (s.value !== undefined && type === 0) return s.value;
  if (s.expiry !== undefined && type === 1) return s.expiry;
};

/** Delete item localStorage */
export const deleteLocaStorage = (name: string) => {
  localStorage.getItem(name)
    ? localStorage.removeItem(name)
    : sessionStorage.removeItem(name);
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};

/** Delete all localStorage */
export const cleanLocaStorage = () => {
  localStorage.clear();
  sessionStorage.clear();
};
