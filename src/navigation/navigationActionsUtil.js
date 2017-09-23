'use strict';

import { NavigationActions } from 'react-navigation';

export const authenticated = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'CentralHub'})
  ]
});

export const unauthenticated = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Login'})
  ]
});
