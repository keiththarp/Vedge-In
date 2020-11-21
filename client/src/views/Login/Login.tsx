import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import userAPI from '../../utils/userAPI';
import { useStoreContext } from '../../state/GlobalState';
import logo from '../../assets/images/Vegemon-logo.png';
import { LOADING, SET_CURRENT_USER } from '../../state/actions';

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
                                dispatch({ type: LOADING });
                                dispatch({
                                    type: SET_CURRENT_USER,
                                    currentUser: {
                                        ...state.currentUser,
                                        _id: res.data._id,
                                        email: res.data.email,
                                        auth0ID: res.data.auth0ID,
                                        username: res.data.username,
                                        character_name: res.data.character_name,
                                        character_image: res.data.character_image,
                                        character_id: res.data.character_id,
                                        challenged: res.data.challenged,
                                        currentChallenge: res.data.currentChallenge,
                                        currenthealth: res.data.currenthealth,
                                        currentoffense: res.data.currentoffense,
                                        win: res.data.win,
                                        loss: res.data.loss,
                                        tie: res.data.tie,
                                        level: res.data.level
                                    }
                                })
                            })
                            .catch(err => console.log(err));
                    } else {
                        console.log("user found")
                        // if user found, set state for logged in user
                        dispatch({ type: LOADING });
                        dispatch({
                            type: SET_CURRENT_USER,
                            currentUser: {
                                ...state.currentUser,
                                _id: res.data._id,
                                email: res.data.email,
                                auth0ID: res.data.auth0ID,
                                username: res.data.username,
                                character_name: res.data.character_name,
                                character_image: res.data.character_image,
                                character_id: res.data.character_id,
                                challenged: res.data.challenged,
                                currentChallenge: res.data.currentChallenge,
                                currenthealth: res.data.currenthealth,
                                currentoffense: res.data.currentoffense,
                                win: res.data.win,
                                loss: res.data.loss,
                                tie: res.data.tie,
                                level: res.data.level

                            }
                        })

                    }
                })
                .catch(err => console.log(err));

            console.log(state.currentUser);
        }
    }, [])

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

                {/* If logged in, show the Log Out button  */}
                {/* {!isLoading && user && (
                    <>
                        <button onClick={() => logout({ returnTo: window.location.origin })}>
                            Log Out
                        </button>
                    </>
                )} */}
            </Link>
            {/* If logged in and have a username, go to the home page */}
            {isAuthenticated && (
                state.currentUser.username && (
                    <>
                        <Link to="/home"><button>Go Home</button></Link>
                    </>
                )
            )}
            {/* If logged in but no username, go to the register page */}

            {isAuthenticated && (
                !state.currentUser.username && (
                    <>
                        <Link to="/register"><button>Choose a Character</button></Link>
                    </>
                )
            )}
        </div>
    )


}
export default Login;