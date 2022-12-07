import { useEffect } from 'react';

// Redux
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getMyProfile } from '../../state/features/profile/profileSlice';
import { getMyInformation } from '../../state/features/user/userSlice';

// Components
import Loading from '../../components/loading/Loading';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getMyProfile());
  }, [dispatch]);
  const { isLoading, profile } = useAppSelector((state) => state.profile);

  if (isLoading) {
    return <Loading />;
  }

  if (!isLoading && !profile) {
    return (
      <div>
        Create a profile...
        {/* COMPONENT TO CREATE A NEW PROFILE */}
      </div>
    );
  }

  return (
    <div>
      Profile...
      {/* MAIN LAYOUT WITH PROFILE, LINKS TO POSTS ETC. */}
    </div>
  );
};

export default Dashboard;
