import { HandySvg } from 'handy-svg';
import carIcon from './assets/car-icon.svg';
import { useGetCarsQuery } from '../../slices/async-race-api/race.api';
import { ICar } from '../../types/types';
import CreateCar from './components/CreateCar/CreateCar';
import './assets/style.css';

const MainPage = () => {
  const { data, isLoading } = useGetCarsQuery('', {});
  console.log(data);

  const renderCarsList = (cars: ICar[]) =>
    cars.map((car) => (
      <li className='car' key={car.id}>
        {car.name}
        <div>
          <HandySvg src={carIcon} fill={car.color} width='48' height='48' />
        </div>
      </li>
    ));

  return (
    <>
      <h1>Main Page</h1>
      <CreateCar />
      {isLoading && <p>Loading</p>}
      <ol>{data && renderCarsList(data)}</ol>
    </>
  );
};

export default MainPage;
