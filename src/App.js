import logo from './logo.svg';
import './App.css';
import {Layout} from 'antd';
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  LoginOutlined,
  LogoutOutlined,
  UnorderedListOutlined, UserOutlined
} from '@ant-design/icons';
import {Menu} from 'antd';
import {useEffect, useState} from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link, useNavigate,
} from "react-router-dom";
import Login from "./components/Login";
import AdminList from "./components/AdminList";
import SongList from "./components/SongList";
import NotFound from "./components/NotFound";

const {Header, Footer, Content} = Layout;

function App() {
  const [currentMenu, setCurrentMenu] = useState("");
  const [isLogin, setIsLogin] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(true)
    }
  }, [])

  const onSelect = (e) => {
    if (e.key === "logout") {
      setIsLogin(false);
      localStorage.clear();
    } else {
      setCurrentMenu(e.key);
      navigate("/" + e.key)
    }
  }

  return (
      <Layout>
        <Header>
          <Menu onSelect={onSelect} mode="horizontal" defaultSelectedKeys={['login']}>
            {!isLogin ? <Menu.Item key="login" icon={<LoginOutlined/>}>
              Login
            </Menu.Item> : null}
            {isLogin ? <Menu.Item key="admin-list" icon={<UserOutlined/>}>
              Admin list
            </Menu.Item> : null}
            {isLogin ? <Menu.Item key="song-list" icon={<UnorderedListOutlined/>}>
              Song List
            </Menu.Item> : null}
            {isLogin ? <Menu.Item key="logout" icon={<LogoutOutlined/>}>
              Logout
            </Menu.Item> : null}
          </Menu>
        </Header>
        <Content>
          <Routes>
            {isLogin ? null : <Route path="/login" element={<Login isLogin={isLogin} setIsLogin={setIsLogin}/>}/>}
            {isLogin ?
                [<Route key="1" path="/admin-list" element={<AdminList isLogin={isLogin} setIsLogin={setIsLogin}/>}/>,
                  <Route key="2" path="/song-list" element={<SongList isLogin={isLogin} setIsLogin={setIsLogin}/>}/>,
                ] : null}
            <Route path="/*" element={<NotFound/>}/>
          </Routes>
        </Content>
      </Layout>
  );
}

export default App;
