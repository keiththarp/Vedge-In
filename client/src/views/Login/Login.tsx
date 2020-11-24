import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import userAPI from '../../utils/userAPI';
import { useStoreContext } from '../../state/GlobalState';
import logo from '../../assets/images/Vegemon-logo.png';
import { LOADING, SET_CURRENT_USER } from '../../state/actions';
import { saveToLocalStorage } from '../../utils/persistUser';

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
                        userAPI.saveUser({ email: user.email, auth0ID: user.sub })
                            .then(res => {
                                const { _id, email, auth0ID, username, character_name, character_image, character_id, challenged, currentChallenge, currenthealth, currentoffense, win, loss, tie, level
                                } = res.data;
                                dispatch({ type: LOADING });
                                dispatch({
                                    type: SET_CURRENT_USER,
                                    currentUser: {
                                        ...state.currentUser,
                                        _id,
                                        email,
                                        auth0ID,
                                        username,
                                        character_name,
                                        character_image,
                                        character_id,
                                        challenged,
                                        currentChallenge,
                                        currenthealth,
                                        currentoffense,
                                        win,
                                        loss,
                                        tie,
                                        level
                                    }
                                })
                            })
                            .catch(err => console.log(err));
                    } else {
                        console.log("user found")
                        const { _id,
                            email, auth0ID, username, character_name, character_image, character_id, challenged, currentChallenge, currenthealth, currentoffense, win, loss, tie, level
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
                                username,
                                character_name,
                                character_image,
                                character_id,
                                challenged,
                                currentChallenge,
                                currenthealth,
                                currentoffense,
                                win,
                                loss,
                                tie,
                                level

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
            <img width="500px" src={logo} alt="Vegemon" />
            <br></br>
            <Link to="/">
                {/* If not logged, show the Log In button */}
                {!isLoading && !user && (
                    <>
                        <button onClick={loginWithRedirect}>
                            Log In
                        </button>
                    </>
                )}
            </Link>
            {/* If logged in and have a username, go to the home page */}
            {isAuthenticated && (
                state.currentUser.username && (
                    <>
                        <Link to="/home"><button>Go Home</button></Link>
                        <Link to="/landing"><button>Landing</button></Link>
                    </>
                )
            )}
            {/* If logged in but no username, go to the register page */}
            {isAuthenticated && (
                !state.currentUser.username && (
                    <>
                        <Link to="/register"><button>Choose a Character</button></Link>
                        <Link to="/landing"><button>Landing</button></Link>
                    </>
                )
            )}
        </div>
    )


}
export default Login;