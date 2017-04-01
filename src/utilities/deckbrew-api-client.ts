import {Props as MagicCard} from '../pages/ProxySheet/components/MagicCard';
const API_ROOT = 'https://api.deckbrew.com/mtg/cards';

interface Params {
  multiverseId?: number[];
  m?: number[];
  type?: string[];
  subtype?: string[];
  supertype?: string[];
  name?: string[];
  oracle?: string[];
  set?: string[];
  rarity?: string[];
  color?: string[];
  multicolor?: string[];
  multiverseid?: string[];
}

export function query(params: Params) {
  const keys = Object.keys(params);

  const paramsString = keys.reduce(
      (accumulator: string, key: string) => {
        const value: string | number | Array<number | string> = params[key];
        return `${accumulator}&${key.toLowerCase()}=${value}`;
      },
      '?='
    );

  return fetch(`${API_ROOT}${paramsString}`)
    .then((response) => response.json() as Promise<MagicCard[]>);
}

export function autocomplete(query: string) {
  return fetch(`${API_ROOT}/typeahead?q=${query}`)
    .then((response) => response.json() as Promise<MagicCard[]>);
}
