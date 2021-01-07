import React from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
import './style.scss';



const needEmailVerification = authUser => 
    authUser && 
    !authUser.emailVerified &&
    authUser.providerData
        .map(provider => provider.providerId)
        .includes('password')


const withEmailVerification = Component => {
    class WithEmailVerification extends React.Component {
        constructor(props) {
            super(props);

            this.state = { isSent: false};
        }
        onSendEmailVerification = () => {
            this.props.firebase
                .doSendEmailVerification()
                .then(()=> this.setState({isSent: true})); 
        }

        render() {
            return (
                <AuthUserContext.Consumer>
                    {authUser => 
                        needEmailVerification(authUser) ? (
                            <div className="verification">
                                <div className="verification__container">
                                {this.state.isSent ? (
                                    <p className="verification__message isSent">
                                        <strong> Mail weryfikacyjny został wysłany. </strong> <br/> Sprawdź swoją skrzynkę pocztową
                                        (zajrzyj także do folderów ze spamem). Powinna zawierać mail weryfikujący.
                                        Odświerz tę stronę po tym jak zweryfikował się już swój adres mail. 
                             
                                    </p>
                                ) : (
                                    <p className="verification__message isNotSent">
                                    <strong> Zweryfikuj swój adres email. </strong> <br/> Sprawdź czy Twoja skrzynka pocztowa 
                                    zawiera mail weryfikujący (zajrzyj także do folderów ze spamem). 
                                    Jeżeli nie, wyślij kolejny mail weryfikujący.  
                                </p>    
                                )}
                                
                                <button
                                    className="verification__btn btn"
                                    type="button"
                                    onClick={this.onSendEmailVerification}
                                    disabled={this.state.isSent}
                                >
                                    Wyślij mail weryfikujący.    
                                </button>
                                </div>
                            </div>
                        ) : (
                            <Component {...this.props} />
                        )  
                    }
                </AuthUserContext.Consumer>
            );
        }
    }
    return withFirebase(WithEmailVerification);
};

export default withEmailVerification;