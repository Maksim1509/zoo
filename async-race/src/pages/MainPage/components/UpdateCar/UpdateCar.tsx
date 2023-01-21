import { FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { useUpdateCarMutation } from '../../../../slices/async-race-api/race.api';
import { selectCar as selectCarAction } from '../../../../slices/selectCarSlice/selectCarSlice';

const UpdateCar = () => {
  const selectCar = useAppSelector((state) => state.selectCar.car);
  const dispatch = useAppDispatch();
  const [updateCar] = useUpdateCarMutation();
  const updateHandler = async (e: FormEvent) => {
    e.preventDefault();
    await updateCar(selectCar);
    dispatch(selectCarAction({ id: 0, name: '', color: '' }));
  };
  return (
    <form onSubmit={updateHandler}>
      <input
        type='text'
        disabled={!selectCar.id}
        value={selectCar.name}
        onChange={(e) =>
          dispatch(selectCarAction({ ...selectCar, name: e.target.value }))
        }
      />
      <input
        type='color'
        disabled={!selectCar.id}
        value={selectCar.color}
        onChange={(e) =>
          dispatch(selectCarAction({ ...selectCar, color: e.target.value }))
        }
      />
      <button type='submit' disabled={!selectCar.id}>
        Update
      </button>
    </form>
  );
};

export default UpdateCar;
