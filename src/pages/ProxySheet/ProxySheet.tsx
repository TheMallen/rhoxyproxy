import * as React from 'react';
import MagicCard from './components/MagicCard';

interface Props {
  children?: React.ReactNode;
}

export default class ProxySheet extends React.Component<Props, {}> {
  render() {
    return (
      <div>
        ProxySheet
        <div>
          <MagicCard
            name="Jace, Derp Unbound"
            power="0"
            toughness="2"
            manaCost="1U"
            types={['creature']}
            text="Tap Jace, Derp Unbounce: pay me all your money."
            subtypes={['human', 'wizard']}
            colors={['blue']}
          />
        </div>
      </div>
    );
  }
}
