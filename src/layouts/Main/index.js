import React from "react";
import { Switch, Route } from 'react-router-dom';
import { compose } from "recompose";


import { withAuthorization, withEmailVerification } from '../../functions/Session';
import * as ROUTES from '../../constants/routes';

import SearchEngine from "../../components/SearchEngine";
import BookDetail from '../BookDetail';



const MainPage = () => {
    return (
    <div className="main-page">
        <Switch>
            <Route exact path={ROUTES.MAIN} component={SearchEngine}/>
            <Route exact path={ROUTES.MAIN_DETAIL} component={BookDetail} />
        </Switch>
    </div>
    );
}

const condition = authUser => !!authUser;

export default compose(
    withEmailVerification,
    withAuthorization(condition)
)(MainPage);