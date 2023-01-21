import Car from './components/Car/Car';
import { useGetCarsQuery } from '../../slices/async-race-api/race.api';
import { ICar } from '../../types/types';
import CreateCar from './components/CreateCar/CreateCar';
import './assets/style.css';
import UpdateCar from './components/UpdateCar/UpdateCar';

const MainPage = () => {
  const { data, isLoading } = useGetCarsQuery('', {});
  console.log(data);

  const renderCarsList = (cars: ICar[]) =>
    cars.map((car) => (
      <li className='car' key={car.id}>
        <Car {...car} />
      </li>
    ));

  return (
    <>
      <h1>Main Page</h1>
      <CreateCar />
      <UpdateCar />
      {isLoading && <p>Loading</p>}
      <ol>{data && renderCarsList(data)}</ol>
    </>
  );
};

export default MainPage;
