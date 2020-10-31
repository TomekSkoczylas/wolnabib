import React from "react";
import { Switch, Route } from 'react-router-dom';

import { withAuthorization } from '../../components/Session';
import * as ROUTES from '../../constants/routes';

import SearchEngine from "../../fragments/SearchEngine";
import BookDetail from '../../fragments/BookDetail';



const MainPage = () => {
    return (
    <div>
        <h1>Strona Główna</h1>
        <Switch>
            <Route exact path={ROUTES.MAIN} component={SearchEngine}/>
            <Route exact path={ROUTES.MAIN_DETAIL} component={BookDetail} />
        </Switch>
    </div>
    );
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(MainPage);