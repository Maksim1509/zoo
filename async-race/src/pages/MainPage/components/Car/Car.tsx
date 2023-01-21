import { HandySvg } from 'handy-svg';
import carIcon from '../../assets/car-icon.svg';
import { selectCar } from '../../../../slices/selectCarSlice/selectCarSlice';
import { ICar } from '../../../../types/types';
import { useAppDispatch } from '../../../../hooks/redux';
import { useRemoveCarMutation } from '../../../../slices/async-race-api/race.api';

const Car = ({ id, name, color }: ICar) => {
  const dispatch = useAppDispatch();
  const [removeCar] = useRemoveCarMutation();
  const selectHandler = () => {
    dispatch(selectCar({ id, name, color }));
  };
  const removeHandler = () => {
    removeCar(id);
  };
  return (
    <section className='car' id={String(id)}>
      <h4>{name}</h4>
      <div>
        <HandySvg src={carIcon} fill={color} width='48' height='48' />
      </div>
      <button onClick={selectHandler}>Select</button>
      <button onClick={removeHandler}>Remove</button>
    </section>
  );
};

export default Car;
