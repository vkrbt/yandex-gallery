import * as React from 'react';

export interface Props {
  children?: React.ReactNode;
}

export interface State {
}

export default class Gallery extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div>
        
      </div>
    );
  }
}
