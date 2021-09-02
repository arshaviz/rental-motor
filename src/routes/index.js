import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addItems } from '../actions/index';
import { mapSessionToProps } from '../helpers/index';
import Home from '../components/Home';
import SideBar from '../components/SideBar';
import Login from '../components/Login';
import Signup from '../components/Signup';
import Items from '../containers/Items';
import ItemDetails from '../components/ItemDetails';
import Profil from '../components/Profil';
import Panel from '../components/Panel';
import { apiGetItems } from '../axios';

const Routes = props => {
  const { addItems } = props;
  useEffect(() => {
    apiGetItems(addItems);
  }, [addItems]);
  return (
    <BrowserRouter>
      <div
        className="d-flex"
        style={{
          position: 'relative',
        }}
      >
        <SideBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/items" exact component={Items} />
          <Route path="/items/:id" exact component={ItemDetails} />
          <Route path="/profil" exact component={Profil} />
          <Route path="/panel" exact component={Panel} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

Routes.propTypes = {
  session: PropTypes.shape({
    isLoggedIn: PropTypes.bool,
    user: PropTypes.shape({
      id: PropTypes.number,
      userName: PropTypes.string,
      role: PropTypes.string,
    }),
  }).isRequired,
  addItems: PropTypes.func.isRequired,
};

export default connect(mapSessionToProps, {
  addItems,
})(Routes);
