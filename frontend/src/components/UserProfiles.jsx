import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const profiles = [
  {
    id: 'gamer',
    icon: '🎮',
    title: 'Gamer',
    desc: 'Performances brutes et FPS élevés.',
    link: '/gpus',
    color: '#dc3545'
  },
  {
    id: 'creator',
    icon: '🎨',
    title: 'Créateur',
    desc: 'Pour le montage vidéo et la 3D.',
    link: '/cpus',
    color: '#fd7e14'
  },
  {
    id: 'nomad',
    icon: '🔋',
    title: 'Nomade',
    desc: 'Batterie longue durée et mobilité.',
    link: '/telephones',
    color: '#198754'
  },
  {
    id: 'student',
    icon: '🎓',
    title: 'Étudiant / Pro',
    desc: 'Le meilleur rapport qualité/prix.',
    link: '/laptops',
    color: '#0d6efd'
  }
];

function UserProfiles() {
  return (
    <div className="py-5 bg-body-tertiary">
      <Container>
        <div className="text-center mb-5">
          <h2 className="fw-bold">Quel est votre besoin ?</h2>
          <p className="text-muted">Nous avons sélectionné les meilleurs produits pour vous.</p>
        </div>

        <Row xs={1} md={2} lg={4} className="g-4">
          {profiles.map((profile) => (
            <Col key={profile.id}>
              <Link to={profile.link} style={{ textDecoration: 'none' }}>
                <Card 
                  className="h-100 border-0 shadow-sm text-center profile-card"
                  style={{ transition: 'transform 0.3s' }}
                >
                  <Card.Body className="p-4">
                    <div 
                      className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                      style={{ 
                        width: '80px', 
                        height: '80px', 
                        fontSize: '2.5rem', 
                        backgroundColor: `${profile.color}20`,
                        color: profile.color 
                      }}
                    >
                      {profile.icon}
                    </div>
                    <Card.Title className="fw-bold text-dark">{profile.title}</Card.Title>
                    <Card.Text className="text-muted small">{profile.desc}</Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
      
      <style>
        {`
          .profile-card:hover {
            transform: translateY(-10px);
          }
        `}
      </style>
    </div>
  );
}

export default UserProfiles;