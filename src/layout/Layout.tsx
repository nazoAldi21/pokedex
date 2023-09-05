import Header from "@/src/components/Header";

interface Layout {
  children: React.ReactNode;
}

const Layout: React.FC<Layout> = ({ children }) => {
  return (
    <>
        <Header />
        {children}
    </>
  );
};

export default Layout;
