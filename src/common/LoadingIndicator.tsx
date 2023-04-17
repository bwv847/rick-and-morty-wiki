import React, { FC } from 'react';
import { Row, Spin } from 'antd';

interface LoadingIndicatorProps extends React.PropsWithChildren {
  loading?: boolean;
}

const LoadingIndicator: FC<LoadingIndicatorProps> = ({ loading, children }) => {
  if (!loading) {
    return <>{children}</>;
  }

  return (
    <Row align="middle" justify="center" style={{ padding: '2em' }}>
      <Spin size="large" />
    </Row>
  );
};

export default LoadingIndicator;
