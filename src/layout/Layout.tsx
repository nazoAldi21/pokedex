import Header from "@/src/components/Header";

interface Layout {
  children: React.ReactNode;
}

const Layout: React.FC<Layout> = ({ children }) => {
  return (
    <>
        <Header />
        <main className="flex flex-row">{children}</main>
    </>
  );
};

export default Layout;
