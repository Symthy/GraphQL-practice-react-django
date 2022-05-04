import { useMutation } from '@apollo/react-hooks';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
import jwtDecode from 'jwt-decode';
import React, { FormEvent, useEffect, useState } from 'react';
import { CREATE_USER, GET_TOKEN } from '../queries';
import styles from './Auth.module.css';



export const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [getToken, { error, data }] = useMutation <
  AuthTokenData
  >(GET_TOKEN, {
    variables: {
      username: username,
      password: password,
    }
  });
  const [createUser] = useMutation(CREATE_USER);
  const [isLogin, setIsLogin] = useState(true);

  const saveToken: () => Promise<string|undefined> = async () => {
    const result = await getToken({
      variables: {
        username: username,
        password: password,
      }
    });
    const token = result.data?.tokenAuth?.token;
    localStorage.setItem("token", token || "");
    token && (window.location.href = "/employees");
    return token;
  }

  const authUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLogin) {
      try {
        const token = await saveToken();
        token && (window.location.href = "/employees");
      } catch (err: any) {
        alert(err.message);
      }
      return
    }

    try {
      await createUser({
        variables: {
          username: username,
          password: password,
        }
      });
      const token = await saveToken();
      token && (window.location.href = "/employee");
    } catch (err: any) {
      alert(err.message);
    }
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const decodeToken = jwtDecode<Token>(localStorage.getItem('token')!);
      if (decodeToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
      }
      return
    }
  }, []);

  return (
    <div className={styles.auth}>
      <form onSubmit={authUser}>
        <div className={styles.auth__input}>
          <label>Username: </label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.auth__input}>
          <label>Password: </label>
          <input
            type="text"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">
          {isLogin ? "Login" : "Create User" }
        </button>
      </form>

      <div>
        <FlipCameraAndroidIcon
          className={styles.auth__toggle}
          onClick={() => setIsLogin(!isLogin)}
        />
      </div>
    </div>
  );
}
