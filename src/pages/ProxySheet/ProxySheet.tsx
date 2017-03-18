import * as React from 'react';
import {CardSheet, MagicCardProps} from './components';

const mockData: MagicCardProps[] = [
  {
    name: 'Jace, Wallet Unbound',
    power: '0',
    toughness: '2',
    manaCost: '1U',
    types: ['creature'],
    text: 'pay 200 dollars: win the game',
    subtypes: ['human', 'wizard'],
    colors: ['blue'],
  },
  {
    name: 'Derpzilek, Herper of Derp',
    power: '12',
    toughness: '12',
    manaCost: '354CC',
    types: ['creature'],
    text: 'When derpzilek derps, draw a card <br> Fear or some shit',
    subtypes: ['eldrazi', 'titan'],
    colors: [],
  },
  {
    name: 'Chandra, Cat Whisperer',
    manaCost: '2RR',
    types: ['planeswalker'],
    text: 'She is on fire and cats still like her, not sure what I am doing wrong...',
    subtypes: ['chandra'],
    colors: ['red'],
    loyalty: '100',
  },
  {
    name: 'Gideon "The Meat" Jura',
    manaCost: '2WW',
    types: ['planeswalker'],
    text: '+1 Gideon punches you <br /> -1 Gideon kicks you <br> -5 Gideon sexes you',
    subtypes: ['gideon'],
    loyalty: '4',
    colors: ['white'],
  }
];

interface Props {
  children?: React.ReactNode;
}

export default class ProxySheet extends React.Component<Props, {}> {
  render() {
    return <CardSheet cards={mockData} />;
  }
}
