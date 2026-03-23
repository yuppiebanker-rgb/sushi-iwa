import { Navigate, Outlet } from 'react-router-dom';
import StaffNav from './StaffNav';

export default function StaffGuard() {
  if (sessionStorage.getItem('isStaffAuth') !== 'true') {
    return <Navigate to="/iwa-staff" replace />;
  }
  return (
    <div className="staff-layout">
      <StaffNav />
      <main className="staff-main">
        <Outlet />
      </main>
    </div>
  );
}
