import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, reset } from "../slices/counter/slice.counter";

const HomePage = () => {
  // useSelector gives you access to state
  const count = useSelector((state) => state.counter.value);
  // this fun gives you function where you can dispatch the action(what you want to do)
  const dispatch = useDispatch();
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch(increment())}>increment\</button>
      <button onClick={() => dispatch(decrement())}>decrement\</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
    </div>
  );
};

export default HomePage;
