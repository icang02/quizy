import DashboardLayout from "../layout";
import ButtonLogout from "./ButtonLogout";

export default function page() {
  return (
    <DashboardLayout>
      <div className="h-screen flex items-center justify-center">
        <ButtonLogout />
      </div>
    </DashboardLayout>
  );
}
