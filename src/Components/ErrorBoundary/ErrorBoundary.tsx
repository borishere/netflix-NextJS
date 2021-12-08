import React, { FC } from 'react';

export const ErrorBoundary: FC = ({ children }) => {
  const errorMessage = <h2>Something went wrong.</h2>;

  // TEMP
  const hasError = false;

  if (hasError) {
    return errorMessage;
  }

  return <>{children}</>;
};