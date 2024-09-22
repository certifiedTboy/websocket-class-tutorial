import NavBar from "./NavBar";
import AppRoutes from "./AppRoutes";

const Layout = () => {
  return (
    <>
      <header className="fixed-top">
        <NavBar />
      </header>
      <main style={{ marginTop: "50px" }}>
        <AppRoutes />
      </main>
      <footer></footer>
    </>
  );
};

export default Layout;
