import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Container from 'react-bootstrap/Container';

const AppBreadcrumb = () => {
  const location = useLocation();
  
  // On ne l'affiche pas sur la page d'accueil
  if (location.pathname === '/') return null;

  // On découpe l'URL (ex: /laptops/12345 -> ["laptops", "12345"])
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <div className="bg-light py-2 mb-4 border-bottom">
      <Container>
        <Breadcrumb className="mb-0">
          {/* Le lien vers l'accueil est toujours là */}
          <li className="breadcrumb-item">
            <Link to="/" style={{ textDecoration: 'none' }}>Accueil</Link>
          </li>
          
          {pathnames.map((value, index) => {
            // On reconstruit le lien pour ce niveau
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            
            // On nettoie le texte pour l'affichage
            let displayName = value;
            
            // Si c'est un ID long (plus de 20 caractères), on affiche "Fiche Technique" au lieu du code moche
            if (value.length > 20) {
              displayName = "Fiche Technique";
            } else {
              // Sinon on met la première lettre en majuscule (ex: cpus -> Cpus)
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