import * as React from 'react';

import MagicCard, {Props as MagicCardProps} from './MagicCard';
import * as styles from './MagicCard.scss';

export interface Props {
  cards: MagicCardProps[];
}

export default class ProxySheet extends React.Component<Props, {}> {
  render() {
    const {cards} = this.props;

    const cardMarkup = cards.map((card: MagicCardProps) => {
      return <MagicCard key={card.name} {...card} />;
    });

    return (
      <div className={styles.CardSheet}>
        {cardMarkup}
      </div>
    );
  }
}
