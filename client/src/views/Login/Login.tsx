import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import userAPI from '../../utils/userAPI';
import { useStoreContext } from '../../state/GlobalState';
// import logo from '../../assets/images/Vegemon-logo.png';
import { LOADING, SET_CURRENT_USER } from '../../state/actions';
import { saveToLocalStorage } from '../../utils/persistUser';
import Home from '../Home/Home';

import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,

    },
    center: {
      align: 'center',
    }
  }),
);

function Login(): JSX.Element {

    const { isLoading, user, loginWithRedirect, logout, isAuthenticated } = useAuth0();
    const [state, dispatch] = useStoreContext();

    useEffect(() => {
        // if a user is logged in, check to see if they are in our db
        if (user) {
            userAPI.getAuthUser(user.sub)
                .then(res => {
                    if (res.data === "") {
                        console.log("No user found");

                        // if no user found, create new user in db, then set state
                        userAPI.saveUser({
                            email: user.email,
                            auth0ID: user.sub,
                            nickname: user.nickname,

                        })
                            .then(res => {
                                const { _id,
                                    email, auth0ID, nickname, challenged, currentChallenge, wins, losses, ties, lifetimeUniqueVeggies, lifetimeTotalVeggies
                                } = res.data;
                                dispatch({ type: LOADING });
                                dispatch({
                                    type: SET_CURRENT_USER,
                                    currentUser: {
                                        ...state.currentUser,
                                        _id,
                                        email,
                                        auth0ID,
                                        nickname,
                                        challenged,
                                        currentChallenge,
                                        wins,
                                        losses,
                                        ties,
                                        lifetimeUniqueVeggies,
                                        lifetimeTotalVeggies
                                    }
                                })
                            })
                            .catch(err => console.log(err));
                    } else {
                        console.log("user found")
                        const { _id,
                            email, auth0ID, nickname, challenged, currentChallenge, wins, losses, ties, lifetimeUniqueVeggies, lifetimeTotalVeggies
                        } = res.data;
                        // if user found, set state for logged in user
                        dispatch({ type: LOADING });
                        dispatch({
                            type: SET_CURRENT_USER,
                            currentUser: {
                                ...state.currentUser,
                                _id,
                                email,
                                auth0ID,
                                nickname,
                                challenged,
                                currentChallenge,
                                wins,
                                losses,
                                ties,
                                lifetimeUniqueVeggies,
                                lifetimeTotalVeggies

                            }
                        })

                    }
                })
                .catch(err => console.log(err));

            console.log(state.currentUser);

        }
    }, [])

    useEffect(() => {
        saveToLocalStorage(state);
    }, [state])

    return (
        <div>
            {!isAuthenticated && <div>
                {/* <img width="500px" src={logo} alt="Vegemon" /> */}

                <button onClick={loginWithRedirect}> Log In </button>

            </div>}

            {isAuthenticated && <Home />}

        </div>




        // <div>
        //     <img width="500px" src={logo} alt="Vegemon" />
        //     <br></br>
        //     <Link to="/">
        //         {/* If not logged, show the Log In button */}
        //         {!isLoading && !user && (
        //             <>
        //                 <button onClick={loginWithRedirect}>
        //                     Log In
        //                 </button>
        //             </>
        //         )}
        //     </Link>
        //     {/* If logged in, go to the home page */}
        //     {isAuthenticated && (

        //         <>
        //             <Link to="/home"><button>Go Home</button></Link>
        //             <Link to="/" onClick={() => logout({ returnTo: window.location.origin })}>
        //                 <button>Log Out</button>
        //             </Link>

        //         </>

        //     )}

        //     {isAuthenticated && (!state.currentUser.challenged &&
        //         <Link to="/community"><button>Start a Challenge</button></Link>)
        //     }

        //     {state.currentUser.challenged &&
        //         <Link to="/challenged"><button>Current Challenge</button></Link>
        //     }

        // </div>
    )


}
export default Login;