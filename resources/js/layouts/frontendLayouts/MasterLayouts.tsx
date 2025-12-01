import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface MasterLayoutProps {
  children: ReactNode;
}

const MasterLayout: React.FC<MasterLayoutProps> = ({ children }) => {
  return (
    <div className="frontend-layout">
     

      <Navbar /> 
      
      <main>
        {children} 
      </main>
      
      <Footer /> 
    </div>
  );
};

export default MasterLayout;
