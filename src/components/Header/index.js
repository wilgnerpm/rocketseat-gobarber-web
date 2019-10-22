import React from 'react';
import { Link } from 'react-router-dom';
import Notifications from '../Notifications';
import logo from '../../assets/logo-purple.svg';
import { Container, Content, Profile } from './styles';
import { useSelector } from 'react-redux';
export default function Header() {
  const profile = useSelector(state => state.user.profile);
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="Logo " />
          <Link to="/dashboard">DASHBOARD</Link>
        </nav>
        <aside>
          <Notifications />
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <Link to="profile">Meu Perfil</Link>
            </div>
            <img
              src={
                profile.avatar.url ||
                'https://api.adorable.io/avatars/200/abott@adorable.png'
              }
              alt="Wilgner Pinheiro"
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
