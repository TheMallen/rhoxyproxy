import * as React from 'react';

type ManaColor  = 'red' | 'blue' | 'green' | 'white' | 'black';
type SuperType = 'artifact' | 'creature' | 'land' |
  'sorcery' | 'instant' | 'tribal' | 'planeswalker';

export interface Props {
  name: string;
  manaCost: string;
  colors: ManaColor[];
  types: SuperType[];
  subtypes: string[];
  text: string;
  power: string;
  loyalty: string;
  toughness: string;
  illustrator: string;
}

export default class MagicCard extends React.Component<Props, {}> {
  render() {
     const {name, manaCost, text, illustrator} = this.props;
     const footerStats = this.footerStats();
     const colorClass = this.colorClass();
     const typeline = this.typeline();

     return (
      <div className={'card card--' + colorClass}>
        <div className="card__header">
          <span className="card__header__title">
            {name}
          </span>
          <span className="card__header__cost">
            {manaCost}
          </span>
        </div>
        <div className="card__art" />
        {typeline}
        <div className="card__text">
          {text}
        </div>
        <div className="card__footer">
          <div>{illustrator}</div>
          {footerStats}
        </div>
      </div>
    );
  }

  private footerStats() {
    let { power, toughness, loyalty } = this.props;

    if (this.hasPower() && this.hasToughness()) {
      return (<div className="card__pt-box">{power}/{toughness}</div>);
    }

    if (this.hasLoyalty()) {
      return (<div className="card__loyalty">{loyalty}</div>);
    }

    return '';
  }

  private colorClass() {
    let colors = this.props.colors || [];
    if (colors.length > 1) {
      return 'gold';
    } else {
      return colors[0] || 'colorless';
    }
  }

  private hasPower() {
    let power = this.props.power;
    return power && power !== '0';
  }

  private hasToughness() {
    let toughness = this.props.toughness;
    return toughness && toughness !== '0';
  }

  private hasLoyalty() {
    let loyalty = this.props.loyalty;
    return loyalty && loyalty !== '0';
  }

  private typeline() {
    let {types, subtypes} = this.props;
    let subtypeArray = flatten(subtypes);

    return (
      <div className="card__type-line">
        {flatten([types]).join(' ')}
        { subtypeArray && subtypeArray.length > 0 ?
          (' - ' + subtypeArray.join(' ')) : '' }
      </div>
    );
  }
}

function flatten<P>(a: Object): P[] {
  return Array.isArray(a)
    ? [].concat.apply([], a.map(flatten))
    : a;
}
