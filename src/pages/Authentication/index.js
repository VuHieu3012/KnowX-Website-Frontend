import React from 'react';
import {
  Route,
  Switch, 
  useRouteMatch
} from 'react-router-dom';

function Authentication(props) {
  const match = props =useRouteMatch();
  return(
    <Switch>
        <Route exact path={math.url} component={} />
        <Route path={'${math.url}/'} component={} />
        <Route path={'${math.url}/'} component={} />
      </Switch>
  );
}
export default Authentication;



