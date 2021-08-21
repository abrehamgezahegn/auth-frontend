import AuthContextProvider from "./context/AuthProvider";
import MainRouter from "./routers";

function App() {
  return (
    <AuthContextProvider>
      <MainRouter />
      <div className="h-8 bg-green-600 w-screen fixed bottom-0" />
    </AuthContextProvider>
  );
}

export default App;
