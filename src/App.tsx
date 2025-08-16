import SideNav from './components/SideNav';
import NavBar from './components/NavBar';
import Kanban from './components/Kanban';


function App() {

  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="flex flex-1">
        <SideNav />
        <Kanban />
      </div>
    </div>
  );
}

export default App
