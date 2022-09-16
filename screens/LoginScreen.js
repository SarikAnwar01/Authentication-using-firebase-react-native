import { useContext, useState } from 'react';
import { Alert } from 'react-native';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/auth-context';
import { loginUser } from '../util/auth';

function LoginScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    setIsLoggedIn(true);
    try {
      const token = await loginUser(email, password);
      authCtx.authenticate(token)

    } catch (error) {
      Alert.alert("User Doesnot Exist!", "Check your credentials")
      setIsLoggedIn(false);
    }
  }
  if (isLoggedIn) {
    return <LoadingOverlay message="loggedin" />
  }
  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
