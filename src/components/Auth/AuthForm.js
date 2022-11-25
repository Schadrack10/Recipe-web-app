import { useState, useRef, useContext } from 'react';
import AuthContext from '../store/auth-context';
import { useHistory, Link } from 'react-router-dom';
import { GoogleAuthProvider, getAuth, signInWithPopup , FacebookAuthProvider } from 'firebase/auth'



import classes from './AuthForm.module.css';

const AuthForm = () => {
  const history = useHistory()
  const AuthCtx = useContext(AuthContext)
  const {isfederatedSignin, setIsfederatedSignin, user, setUser} = useContext(AuthContext)
  const [isLogin, setIsLogin] = useState(false);

  //providing auth
  const GoogleProvider = new GoogleAuthProvider()
  const FacebookProvider = new FacebookAuthProvider()


  const [isLoading, setIsLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();


  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };


  const handleGoogleSignin = () => {
    const auth = getAuth()
    signInWithPopup(auth, GoogleProvider).then(res => {
      const GoogleUser = res.user
      console.log(res._tokenResponse.idToken)
      console.log(res,'looking for inspires in ')

   
      //allow the user to login with context
    if(GoogleUser){
      setIsfederatedSignin(true)
      setUser(GoogleUser.displayName)
      console.log('login in with google',user)
     

        const expirationTime = new Date(new Date().getTime() + ( res._tokenResponse.oauthExpireIn * 100))
      AuthCtx.login(res._tokenResponse.idToken, expirationTime.toISOString());
   
      history.replace('/')
      alert(' welcome ' + GoogleUser.displayName)

    }


    }).catch(err => {
      console.log(err.message)
    })
  }

  const handleFacebookSignin = ()=>{
         const auth = getAuth()
        signInWithPopup(auth, FacebookProvider).then(res =>{
          const facebookUser = res.user
          console.log(facebookUser.displayName)


        //allow the user to login
        if(facebookUser){
          setIsfederatedSignin(true)
          setUser(facebookUser.displayName)
          console.log('login in with google',user)
          history.replace('/')
        }

        }).catch(err=>{
          console.log(err.message)
        })
    }



  const submitHandler = (e) => {
    e.preventDefault()

    const enteredEmail = emailRef.current.value
    const enteredPassword = passwordRef.current.value



    console.log(enteredEmail, enteredPassword)


    //add validation
    //api:https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
    //webapikey: AIzaSyDCzStemUJ0Qy22wPuR-GrR7WYt0fQb6C8
    //quoteqeb api => AIzaSyA6UEyv_qHPXflUjuqJf3cUlsmall5FOD0

    setIsLoading(true)
    let url

    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA6UEyv_qHPXflUjuqJf3cUlsmall5FOD0'

    } else {

      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA6UEyv_qHPXflUjuqJf3cUlsmall5FOD0'
    }

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      setIsLoading(false)
      if (res.ok) {
        //...
        return res.json()


      } else {
        return res.json().then(data => {
          console.log(data)
          let errorMessage = "Authentication failed"

          if (data && data.error && data.error.message) {
            errorMessage = data.error.message

          }

          throw new Error(errorMessage);
        })
      }
    }).then(data => {
      console.log(data)
      setUser(data.email)
      const expirationTime = new Date(new Date().getTime() + (+data.expiresIn * 100))
      AuthCtx.login(data.idToken, expirationTime.toISOString());

      history.replace('/') //use this to navigate to the other project
      // <Link to="https://quotes-5uuj01m8v-schadrack10.vercel.app/quotes"/>

    }).catch(err => {
      alert(err.message)
    })

  }


  return (

    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input className={classes.input} type='email' id='email' placeholder="Enter your email" required ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input className={classes.input} type='password' id='password' placeholder="Enter your email" required ref={passwordRef} />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button style={{ display: 'flex', gap: 5, justifyContent:'space-between' }} >{isLogin ?
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z" />
                <path fillRule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
              </svg>
              Login
            </>
            :
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-left" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z" />
                <path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z" />
              </svg>
              Signup
            </>
          }</button>}
          {isLoading && <p style={{ color: '#fff' }}>{'Sending request...'}</p>}
          <div style={{display:'flex'}}>
          <button
            type='button'
            style={{ marginTop: 5, display: 'flex', gap: 5 }}
            onClick={handleGoogleSignin}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16">
              <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
            </svg>
            {'Google signin'}
          </button>
             <button
            type='button'
            style={{ marginTop: 5, display: 'flex', gap: 5 }}
            onClick={handleFacebookSignin}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
              <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
             </svg>
            {'Facebook signin'}
          </button>
          </div>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
