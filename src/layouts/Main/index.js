import React from "react";
import { Switch, Route } from 'react-router-dom';

import { withAuthorization } from '../../functions/Session';
import * as ROUTES from '../../constants/routes';

import SearchEngine from "../../components/SearchEngine";
import BookDetail from '../BookDetail';



const MainPage = () => {
    return (
    <div>
        <h1>Katalog książek</h1>
        <Switch>
            <Route exact path={ROUTES.MAIN} component={SearchEngine}/>
            <Route exact path={ROUTES.MAIN_DETAIL} component={BookDetail} />
        </Switch>
    </div>
    );
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(MainPage);