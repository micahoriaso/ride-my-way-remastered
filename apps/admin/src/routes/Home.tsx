import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Content from '../components/Content';

interface iProps {
  auth: any;
}

const Home: React.SFC<iProps> = ({auth}) => (
  <React.Fragment>
    <Header />
    <Content auth={auth} />
    <Footer />
  </React.Fragment>
);

export default Home;
