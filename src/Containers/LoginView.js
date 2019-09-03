import React, { useGlobal } from 'reactn';
import { withRouter } from 'react-router-dom';
import {
  MyTextField,
  MyButton,
  MyHyperlink,
  MyUseForm,
  MyPaper,
  MyHeader
} from '../Components';
import { User } from '../utils/http';

// import { login } from '../utils/http';

function LoginView(props) {
  const [user, setUser] = useGlobal('user');
  const [, setIsAuthenticated] = useGlobal('isAuthenticated');
  const { values, errors, handleChange, handleSubmit } = MyUseForm({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit(val) {
      User.login(val.values)
        .then(res => {
          setUser({
            ...res.data,
            // initial default role is customer
            role: 'Customer'
          });
          setIsAuthenticated(true);
          props.history.push('/');
        })
        .catch(res => console.log(res));
    },
    validate(val) {
      const errors = {};
      if (val.email === '') {
        errors.name = 'Please enter an email';
      }
      return errors;
    }
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <MyPaper>
          <MyHeader>Login</MyHeader>
          <MyTextField
            style={{ marginBottom: 10 }}
            name="email"
            label="Email"
            value={values.email}
            onChange={handleChange}
          />
          <MyTextField
            style={{ marginBottom: 10 }}
            name="password"
            label="Password"
            type="password"
            value={values.password}
            onChange={handleChange}
          />
          <MyButton
            style={{ marginTop: 15, marginBottom: 10 }}
            variant="contained"
            color="primary"
            type="submit"
          >
            Login
          </MyButton>
          <MyHyperlink to="/register">No account? Register!</MyHyperlink>
        </MyPaper>
      </form>
    </div>
  );
}

export default withRouter(LoginView);
