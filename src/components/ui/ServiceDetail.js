import React from 'react';
import { useParams } from 'react-router-dom';
import servicesData from '../../data/servicesData';

const ServiceDetail = () => {
  const { id } = useParams();
  const service = servicesData.find(service => service.id === id);

  if (!service) return <div>Usługa nie znaleziona</div>;

  return (
    <div className="service-detail">
      <h1>{service.title}</h1>
      <img src={service.img} alt={service.title} />
      <p>{service.description}</p>
    </div>
  );
};

export default ServiceDetail;
