import React, {createContext, useReducer} from 'react';

const AppContext = createContext({
  lang: '',
  onChangeLang: () => {},
  isAuth: null,
  setIsAuth: () => {},
  currentUser: {},
  setCurrentUser: () => {},
});

// const defaultLangState = {
//   lang: JSON.parse(localStorage.getItem('lang')) || 'en',
// };

// const defaultAuthState = {
//   isAuth: JSON.parse(localStorage.getItem('auth')) || false,
// };

const defaultState = {
  lang: JSON.parse(localStorage.getItem('lang')) || 'en',
  isAuth: JSON.parse(localStorage.getItem('auth')) || false,
};

const click = () => document.querySelector('#click-sfx').play();

const appReducer = (state, action) => {
  if (action.type === 'TRANSLATE') {
    return {...state, lang: action.lang};
  }

  if (action.type === 'LOGIN') {
    return {...state, isAuth: true};
  }
  if (action.type === 'LOGOUT') {
    return {...state, isAuth: false};
  }

  if (action.type === 'CHANGE_USER') {
    return {...state, currentUser: action.user};
  }
  // if (action.type === 'STOPAUTHENTICATION') {
  //   return {...state, isAuthenticating: false};
  // }

  return defaultState;
};

// const langReducer = (state, action) => {
//   if (action.type === 'TRANSLATE') {
//     return {...state, lang: action.lang};
//   }
//   return defaultLangState;
// };

export const AppProvider = props => {
  const [appState, dispatchApp] = useReducer(appReducer, defaultState);

  const translate = lang => {
    click();
    dispatchApp({type: 'TRANSLATE', lang});
    localStorage.setItem('lang', JSON.stringify(lang));
  };

  const authenticate = auth => {
    dispatchApp({type: auth});
    localStorage.setItem('auth', JSON.stringify(auth === 'LOGIN'));
  };

  const changeUser = user => {
    dispatchApp({type: 'CHANGE_USER', user});
  };

  // const stopAuth = () => {
  //   dispatchApp({type: 'STOPAUTHENTICATION'});
  // };

  return (
    <AppContext.Provider
      value={{
        lang: appState.lang,
        isAuth: appState.isAuth,
        currentUser: appState.currentUser,
        onChangeLang: translate,
        setIsAuth: authenticate,
        setCurrentUser: changeUser,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

// export const LangProvider = props => {
//   const [langState, dispatchLang] = useReducer(langReducer, defaultLangState);

//   const translate = lang => {
//     click();
//     dispatchLang({type: 'TRANSLATE', lang});
//     localStorage.setItem('lang', JSON.stringify(lang));
//   };

//   return (
//     <AppContext.Provider
//       value={{
//         lang: langState.lang,
//         onChangeLang: translate,
//       }}
//     >
//       {props.children}
//     </AppContext.Provider>
//   );
// };

// const authReducer = (state, action) => {
//   if (action.type === 'LOGIN') {
//     return {...state, isAuth: true};
//   }
//   if (action.type === 'LOGOUT') {
//     return {...state, isAuth: false};
//   }
//   return defaultAuthState;
// };

// export const AuthProvider = props => {
//   const [authState, dispatchAuth] = useReducer(authReducer, defaultAuthState);

//   const authenticate = auth => {
//     dispatchAuth({type: auth});
//     localStorage.setItem('lang', JSON.stringify(authState.isAuth));
//   };

//   return (
//     <AppContext.Provider
//       value={{
//         isAuth: authState.isAuth,
//         setIsAuth: authenticate,
//       }}
//     >
//       {props.children}
//     </AppContext.Provider>
//   );
// };

export default AppContext;
