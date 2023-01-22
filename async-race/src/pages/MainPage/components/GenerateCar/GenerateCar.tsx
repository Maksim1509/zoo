import { faker } from '@faker-js/faker';
import { useCreateCarMutation } from '../../../../slices/async-race-api/race.api';
import { ICarPayload } from '../../../../types/types';
import './style.css';

const createData = (): ICarPayload => ({
  name: faker.vehicle.vehicle(),
  color: faker.color.rgb(),
});

const generateData = (): ICarPayload[] => {
  const cars: ICarPayload[] = [];
  for (let i = 0; i < 100; i += 1) {
    cars.push(createData());
  }
  return cars;
};

const GenerateCar = () => {
  const [createCar] = useCreateCarMutation();
  const generateHandler = async () => {
    const cars: ICarPayload[] = generateData();
    cars.forEach(async (car: ICarPayload) => await createCar(car));
  };
  return (
    <button className='generate__btn' onClick={generateHandler}>
      Generate
    </button>
  );
};

export default GenerateCar;
