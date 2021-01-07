import React from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

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
                            <div>
                                {this.state.isSent ? (
                                    <p>
                                        Mail weryfikacyjny został wysłany. Sprawdź swoją skrzynkę pocztową
                                        (zajrzyj także do folderów ze spamem). Powinna zawierać mail weryfikujący.
                                        Odświerz tę stronę po tym jak zweryfikował się już swój adres mail. 
                             
                                    </p>
                                ) : (
                                    <p>
                                    Zweryfikuj swój adres email. Sprawdź czy Twoja skrzynka pocztowa 
                                    (zajrzyj także do folderów ze spamem) zawiera mail weryfikujący. 
                                    Jeśli nie, wyślij kolejny mail weryfikujący.  
                                </p>    
                                )}
                                
                                <button
                                    type="button"
                                    onClick={this.onSendEmailVerification}
                                >
                                    Wyślij mail weryfikujący.    
                                </button>
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