import { useOutletContext } from 'react-router-dom';
import RunnerPost from './runnerpostcard';
import './runnerHome.css'

function RunnerHome() {
  return (
    <div>
      <h1 className='rhtitle'>Errands To Run </h1>
      <RunnerPost />
    </div>
  );
}

export default RunnerHome;