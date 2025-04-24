import { Navigate } from "react-router-dom"

 const AuthGate = () => {
  const token = localStorage.getItem("token")
  return token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
}
export default AuthGate;