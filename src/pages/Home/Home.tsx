import * as React from 'react';

interface Props {
  children?: React.ReactNode;
}

export default class Home extends React.Component<Props, {}> {
  render() {
    return (
      <div>
        Home
      </div>
    );
  }
}
