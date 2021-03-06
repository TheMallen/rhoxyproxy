import * as React from 'react';

import * as styles from './MagicCard.scss';

type ManaColor  = 'red' | 'blue' | 'green' | 'white' | 'black';
type SuperType = 'artifact' | 'creature' | 'land' |
  'sorcery' | 'instant' | 'tribal' | 'planeswalker';

export interface Props {
  name: string;
  id: string;
  multiverseId: string;
  editions: [{
    multiverse_id: number;
  }];
  cost?: string;
  colors?: ManaColor[];
  types: SuperType[];
  subtypes: string[];
  text?: string;
  power?: string;
  loyalty?: string;
  toughness?: string;
  illustrator?: string;
}

export default class MagicCard extends React.Component<Props, {}> {
  render() {
    const {name, cost, text, illustrator} = this.props;
    const footerStats = this.footerStats();
    const colorClass = this.colorClass();
    const typeline = this.typeline();

    const cardClass = `${styles.Card} ${colorClass}`;

    return (
      <div className={cardClass}>
        <div className={styles.Header}>
          <span className={styles.Title}>
            {name}
          </span>
          <span className={styles.HeaderCost}>
            {cost}
          </span>
        </div>
        {typeline}
        <pre
          className={styles.Text}
          dangerouslySetInnerHTML={{__html: text || ''}}
        />
        <div className={styles.Footer}>
          <div>{illustrator}</div>
          {footerStats}
        </div>
      </div>
    );
  }

  private footerStats() {
    const {power, toughness, loyalty} = this.props;

    if (this.hasPower() && this.hasToughness()) {
      return (<div className={styles.PTBox}>{power}/{toughness}</div>);
    }

    if (this.hasLoyalty()) {
      return (<div className={styles.Loyalty}>{loyalty}</div>);
    }

    return '';
  }

  private colorClass() {
    const colors = this.props.colors || [];
    if (colors.length > 1) {
      return styles.colorGold;
    } else {
      return colorForName(colors[0]);
    }
  }

  private hasPower() {
    const power = this.props.power;
    return Boolean(power);
  }

  private hasToughness() {
    const toughness = this.props.toughness;
    return Boolean(toughness);
  }

  private hasLoyalty() {
    const loyalty = this.props.loyalty;
    return Boolean(loyalty);
  }

  private typeline() {
    const {types, subtypes} = this.props;
    const subtypeArray = flatten(subtypes);

    return (
      <div className={styles.Typeline}>
        {flatten([types]).join(' ')}
        { subtypeArray && subtypeArray.length > 0 ?
          (' - ' + subtypeArray.join(' ')) : '' }
      </div>
    );
  }
}

function colorForName(name: string) {
  switch (name) {
    case 'red':
      return styles.colorRed;
    case 'blue':
      return styles.colorBlue;
    case 'green':
      return styles.colorGreen;
    case 'white':
      return styles.colorWhite;
    case 'black':
      return styles.colorBlack;
    default:
      return '';
  }
}

function flatten<P>(a: Object): P[] {
  return Array.isArray(a)
    ? [].concat.apply([], a.map(flatten))
    : a;
}
