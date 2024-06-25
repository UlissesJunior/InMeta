import React from 'react';
import UserHeader from '../components/UserHeader';
import Cards from '../components/MyCards';
import { Container } from '../components/Container';

const UserCardsPage: React.FC = () => {
  return (
    <Container height={true} blocked={true}>
      <UserHeader>
        <Cards />
      </UserHeader>
    </Container>
  );
};

export default UserCardsPage;
