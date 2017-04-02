import * as React from 'react';

import {CardSheet, MagicCardProps} from './components';
import {query} from '../../utilities/deckbrew';
import {queryAsDictionary} from '../../utilities/location';

interface Props {
  children?: React.ReactNode;
}

interface State {
  cards: MagicCardProps[];
}

export default class ProxySheet extends React.Component<Props, State> {
  state = {
    cards: [],
  };

  componentDidMount() {
    const search = queryAsDictionary(location.search);
    query(search)
      .then((cards) => {
        this.setState({cards});
      });
  }

  render() {
    const {cards} = this.state;
    return <CardSheet cards={cards} />;
  }
}
