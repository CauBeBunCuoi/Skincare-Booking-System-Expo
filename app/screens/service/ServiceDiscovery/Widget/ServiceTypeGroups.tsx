import ServiceTypeCard from "./ServiceTypeCard";

const ServiceTypeGroups = ({ serviceTypes }) => {
  return (
    <>
      {serviceTypes.map((item, index) => (
        <ServiceTypeCard key={item._id} serviceType={item} />
      ))}
    </>
  );
};

export default ServiceTypeGroups;
