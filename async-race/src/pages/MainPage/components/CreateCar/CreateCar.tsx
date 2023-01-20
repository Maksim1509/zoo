import { useState, FormEvent } from 'react';
import { useCreateCarMutation } from '../../../../slices/async-race-api/race.api';
import { ICar } from '../../../../types/types';

const CreateCar = () => {
  const [name, setName] = useState('');
  const [color, setSetColor] = useState('');
  const [createPost] = useCreateCarMutation();
  const createHandler = async (e: FormEvent) => {
    e.preventDefault();
    await createPost({ color, name } as ICar);
    setName('');
  };

  return (
    <form onSubmit={createHandler}>
      <input
        type='text'
        placeholder='Car Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type='color'
        onChange={(e) => setSetColor(e.target.value)}
        value={color}
      />
      <button type='submit' onSubmit={createHandler}>
        Create
      </button>
    </form>
  );
};

export default CreateCar;
