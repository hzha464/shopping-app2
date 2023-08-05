import "./App.css";
import Todo from "./component/Todo";
import { useGetTodoItemByIdQuery, useLoginMutation } from "./api/shopapi";
import { User } from "./models/User";
import { log } from "console";
import MainPage from "./component/MainPage";

function App() {
  // const { data, error, isLoading } = useGetTodoItemByIdQuery("");

  return (
    <div>
      <MainPage />
    </div>
  );
}

export default App;
