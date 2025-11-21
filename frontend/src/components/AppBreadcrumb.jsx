import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Container from 'react-bootstrap/Container';

const AppBreadcrumb = () => {
  const location = useLocation();
  
  
  if (location.pathname === '/') return null;

  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <div className="bg-light py-2 mb-4 border-bottom">
      <Container>
        <Breadcrumb className="mb-0">
        
          <li className="breadcrumb-item">
            <Link to="/" style={{ textDecoration: 'none' }}>Accueil</Link>
          </li>
          
          {pathnames.map((value, index) => {
           
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            
            
            let displayName = value;
            
          
            if (value.length > 20) {
              displayName = "Fiche Technique";
            } else {
              
              displayName = value.charAt(0).toUpperCase() + value.slice(1);
            }

            return isLast ? (
              <Breadcrumb.Item active key={to}>{displayName}</Breadcrumb.Item>
            ) : (
              <li className="breadcrumb-item" key={to}>
                <Link to={to} style={{ textDecoration: 'none' }}>{displayName}</Link>
              </li>
            );
          })}
        </Breadcrumb>
      </Container>
    </div>
  );
};

export default AppBreadcrumb;