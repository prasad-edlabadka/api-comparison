import React from 'react';
import { View, Image } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

export default function InformationScreen() {
  const theme = useTheme();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', padding: 24, backgroundColor: theme.colors.background }}>
      <Image
        source={require('../../assets/images/icon.png')}
        style={{ width: 96, height: 96, marginBottom: 24 }}
        resizeMode="contain"
      />
      <Text variant="titleLarge" style={{ fontWeight: 'bold', marginBottom: 16, textAlign: 'center' }}>
        What does this app do?
      </Text>
      <Text style={{ fontSize: 18, textAlign: 'center', lineHeight: 28 }}>
        {`
In legacy code, where Java reigns,
Interfaces old, with complex chains.
But modern times demand a shift,
To microservices, swift and swift.

This app compares, with model's might,
Java interfaces, left and right,
Against OAS files, crisp and new,
To find the matches—just for you!

It highlights overlap, full or part,
And shows where APIs can start
to take the place of code that's old,
A future story, bright and bold.

So browse the list, explore the score,
See what APIs have in store.
For every match, a chance to see
How modern services set you free!
        `}
      </Text>
    </View>
  );
}
