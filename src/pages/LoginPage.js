import LoginForm from "../components/Auth/LoginForm";


const loginHandler = (data) => {
  console.log(data);
}

const LoginPage = () => {

  return <LoginForm onSubmitTap={loginHandler} />
};

export default LoginPage;
