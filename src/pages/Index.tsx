import React from 'react';
import MainAppLayout from '../components/layout/MainAppLayout';
import MainPostFeed from '../components/Dashboard/MainPostFeed';

/**
 * IndexPage serves as the main feed page for the Social Media Dashboard.
 * It utilizes the MainAppLayout to structure the overall page and
 * renders the MainPostFeed component as its primary content.
 */
const IndexPage: React.FC = () => {
  return (
    <MainAppLayout>
      <MainPostFeed />
    </MainAppLayout>
  );
};

export default IndexPage;
