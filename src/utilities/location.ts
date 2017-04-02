export interface ParamDictionary {
  [key: string]: string | number | (string | number)[];
}

export function queryAsDictionary(search: string) {
  const searchString = search.split('?')[1];

  if (!searchString) {
    return {};
  }

  return searchString
    .split('&')
    .reduce(appendKeyFromString, {});
};

export function dictionaryAsQuery(dictionary: ParamDictionary) {
  const keys = Object.keys(dictionary);

  const params = keys.map((key) => {
      const value = dictionary[key];
      if (Array.isArray(value)) {
        return value.map((item) => `${key}=${item}`).join('&');
      }
      return `${key}=${value}`;
    })
    .join('&');

  return `?${params}`;
 };

function appendKeyFromString(dictionary: ParamDictionary, item: string) {
  const [key, value] = item.split('=');

  if (dictionary[key] !== undefined) {
    const existingValue = dictionary[key];

    if (Array.isArray(existingValue)) {
      existingValue.push(value);
    } else {
      dictionary[key] = [existingValue, value];
    }

    return dictionary;
  }

  dictionary[key] = value;
  return dictionary;
}
