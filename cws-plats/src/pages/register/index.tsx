import AuthLayout from "@/components/common/Layout/AuthLayout";
import Register from "@/components/register/Register";
function Index() {
  return <Register />;
}
Index.layout = AuthLayout;
Index.title = "Register";

export default Index;
