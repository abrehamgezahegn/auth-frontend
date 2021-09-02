import { useRef, useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthProvider";

const Login = () => {
  const [state, setState] = useState("");
  const history = useHistory();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const auth = useAuth();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState("loading");
    setErrorMessage("");

    try {
      const res = await axios({
        method: "post",
        url: "http://127.0.0.1:4000/login",
        data: {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        },
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      auth.setUser(res.data.user);
      history.push("/todo");
    } catch (error) {
      console.log("error", error);
      setErrorMessage("Wrong email or password");
      setState("");
    }
  };

  return (
    <div className="flex justify-center align-items-center h-screen">
      <div className="p-12  rounded">
        {errorMessage && (
          <p className="text-red-400 text-center">{errorMessage}</p>
        )}
        <Form>
          <Form.Group className="mb-8" controlId="formBasicEmail">
            <Form.Label id="email-label">Email address</Form.Label>
            <Form.Control ref={emailRef} type="email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control ref={passwordRef} type="password" />
          </Form.Group>
          <p className="text-lg">
            Don't have an account?{" "}
            <span
              onClick={() => {
                console.log("pushingg");
                history.push("/signup");
              }}
              className="text-blue-500 hover:text-blue-700 cursor-pointer underline hover:no-underline transition-all	duration-4000"
            >
              Sign up
            </span>{" "}
          </p>

          <Button
            style={{ minWidth: 120 }}
            variant="primary"
            type="submit"
            onClick={state !== "loading" ? handleSubmit : () => {}}
          >
            {state === "loading" ? (
              <Spinner
                data-testid="loading-spinner"
                size="sm"
                animation="border"
              />
            ) : (
              "Login"
            )}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
