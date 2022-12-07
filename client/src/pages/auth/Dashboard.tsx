import { useEffect } from 'react';

// Redux
import { useAppDispatch } from '../../hooks/hooks';
import { getMyInformation } from '../../state/features/user/userSlice';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getMyInformation());
  }, [dispatch]);

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
