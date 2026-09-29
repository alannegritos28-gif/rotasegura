import Sidebar from './Sidebar';import Topbar from './Topbar';import MobileAdminNav from './MobileAdminNav';
export default function AppShell({children}:{children:React.ReactNode}){return <div className="shell"><Sidebar/><div className="workspace"><Topbar/><main className="content">{children}</main><MobileAdminNav/></div></div>}
