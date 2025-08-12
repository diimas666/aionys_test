import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';

test('smoke test', () => {
  const { getByText } = render(<Text>Hello</Text>);
  expect(getByText('Hello')).toBeTruthy();
});
