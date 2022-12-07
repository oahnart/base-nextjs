import { decrement, increment } from '@/features/counter/counterSlice';
import { Meta } from '@/layouts/Meta';
import { RootState } from '@/redux/reducer';
import { Main } from '@/templates/Main';
import { useDispatch, useSelector } from "react-redux";

const About = () => {
  const dispatch = useDispatch();
  const count = useSelector((state : RootState) => state.counterSlice.value);

  return (
    <Main meta={<Meta title="Lorem ipsum" description="Lorem ipsum" />}>
      <div>count : {count}</div>
    <button onClick={() => dispatch(increment())}>increment</button>
    <br/>
    <button onClick={() => dispatch(decrement())}>decrement</button>
    <p>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione fuga
      recusandae quidem. Quaerat molestiae blanditiis doloremque possimus labore
      voluptatibus distinctio recusandae autem esse explicabo molestias officia
      placeat, accusamus aut saepe.
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione fuga
      recusandae quidem. Quaerat molestiae blanditiis doloremque possimus labore
      voluptatibus distinctio recusandae autem esse explicabo molestias officia
      placeat, accusamus aut saepe.
    </p>
  </Main>
  )
};

export default About;

About.requireAuth = true;
