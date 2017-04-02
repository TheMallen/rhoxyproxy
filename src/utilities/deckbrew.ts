import {Props as MagicCard} from '../pages/ProxySheet/components/MagicCard';
import {dictionaryAsQuery, ParamDictionary} from './location';

const API_ROOT = 'https://api.deckbrew.com/mtg/cards';

interface Params {
  multiverseId?: number | number[];
  m?: number | number[];
  type?: string | string[];
  subtype?: string | string[];
  supertype?: string | string[];
  name?: string | string[];
  oracle?: string | string[];
  set?: string | string[];
  rarity?: string | string[];
  color?: string | string[];
  multicolor?: string | string[];
  multiverseid?: string | string[];
}

export function query(params: Params) {
  const paramsString = dictionaryAsQuery(params as ParamDictionary);

  return fetch(`${API_ROOT}${paramsString}`)
    .then((response) => response.json() as Promise<MagicCard[]>);
}

export function autocomplete(query: string) {
  return fetch(`${API_ROOT}/typeahead?q=${query}`)
    .then((response) => response.json() as Promise<MagicCard[]>);
}
