import SideNav from './components/SideNav';
import NavBar from './components/NavBar';
import Kanban from './components/Kanban';
import { TicketProvider } from './context/TicketContext';


function App() {

  return (
    <TicketProvider>
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="flex flex-1">
        <SideNav />
        <Kanban />
      </div>
    </div>
    </TicketProvider>
  );
}

export default App
