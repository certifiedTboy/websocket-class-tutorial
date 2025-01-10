import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChatContext } from "../../store/chat-context";
import useFormValidation from "../../hooks/useFormValidation";
import Error from "../commons/Error";

const LoginForm = () => {
  const [username, setUsername] = useState<string>("");
  const [room, setRoom] = useState<string>("");

  const chatCtx = useContext(ChatContext);

  const [formIsValid, formError, checkFormIsValid] = useFormValidation();

  const navigate = useNavigate();

  const messageSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    localStorage.setItem("user", username);

    chatCtx.updateCurrentUser(username);

    return navigate(`/chat?room=${room}&username=${username}`);
  };

  useEffect(() => {
    if (typeof checkFormIsValid === "function") {
      checkFormIsValid(username, room);
    }
  }, [username, room]);

  return (
    <section className="container mt-5">
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6">
          <h1 className="text-center my-5">Login Here to get started</h1>

          {!formIsValid && typeof formError === "string" && (
            <Error errorMessage={formError} />
          )}

          <form onSubmit={messageSubmitHandler}>
            <div className="form-group mb-3">
              <input
                type="text"
                placeholder="Enter Username"
                className="form-control"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="form-group mb-3">
              <select
                className="form-control"
                onChange={(e) => setRoom(e.target.value)}
              >
                <option></option>
                <option>Relationship</option>
                <option>Sports</option>
                <option>Tech</option>
              </select>
            </div>

            <div className="form-group">
              <input
                type="submit"
                className="btn btn-secondary form-control"
                value="Join Room"
              />
            </div>
          </form>
        </div>
        <div className="col-3"></div>
      </div>
    </section>
  );
};

export default LoginForm;
