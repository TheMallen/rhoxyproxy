import * as React from 'react';
import {withRouter, InjectedRouter} from 'react-router';

import {cardByName} from '../../utilities/deckbrew';
import {dictionaryAsQuery} from '../../utilities/location';
import * as styles from './Home.scss';

interface BasicCard {
  id: number | string;
  name: string;
}

interface Props {
  router: InjectedRouter;
}

interface State {
  decklist: string;
  resolvedCardList: BasicCard[];
  errors: string[];
  loading: boolean;
}

class Home extends React.Component<Props, State> {
  state: State = {
    decklist: '',
    resolvedCardList: [],
    errors: [],
    loading: false,
  };

  componentDidUpdate(oldProps: Props, oldState: State) {
    const {decklist} = this.state;
    if (oldState.decklist === decklist) {
      return;
    }

    this.setState({loading: true}, () => {
      const cardQueries = decklist
        .split('\n')
        .filter((line) => line.length > 2);

      const cardPromises = cardQueries.map((line) => cardByName(line));

      const failedIndexes: number[] = [];

      Promise.all(cardPromises)
        .then((cardList) => {
          const bestMatches = cardList
            .filter((cards, index) => {
              const hasCards = cards.length > 0;

              if (!hasCards) {
                failedIndexes.push(index);
              }

              return cards.length > 0;
            })
            .map((cards) => cards[0])
            .map((card) => {
              const multiverseId = card.editions[0].multiverse_id;
              return {
                name: card.name,
                id: multiverseId,
              };
            });

          const errors = failedIndexes.map((cardQueryIndex) => {
            return `No card found matching ${cardQueries[cardQueryIndex]}`;
          });

          this.setState({
            loading: false,
            resolvedCardList: bestMatches,
            errors,
          });
        });
    });
  }

  render() {
    const {errors, loading} = this.state;
    const errorMessages = errors.map((error, index) => {
      return (
        <p key={index}>
          {error}
        </p>
      );
    });

    const decklistClass = errors.length === 0
      ? styles.Decklist
      : `${styles.Decklist} ${styles.hasErrors}`;

    return (
      <form
        className={styles.Home}
        onSubmit={this.onSubmit.bind(this)}
      >
        <div className={styles.Errors}>
          {errorMessages}
        </div>
        <textarea
          className={decklistClass}
          onBlur={this.onInputChange.bind(this)}
        />
        <button
          className={styles.Submit}
          disabled={errors.length > 0}
          role="submit"
        >
          {loading ? '...parsing decklist' : 'Get proxies!'}
        </button>
      </form>
    );
  }

  onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const {resolvedCardList} = this.state;
    const {router} = this.props;

    if (resolvedCardList.length === 0) {
      return this.setState({errors: ['Please enter some card names!']});
    }

    const ids = resolvedCardList.map((card) => card.id);
    const queryString = dictionaryAsQuery({m: ids});
    router.push(`/proxy${queryString}`);
  }

  onInputChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({
      decklist: event.target.value,
    });
  }
}

export default withRouter(Home);
