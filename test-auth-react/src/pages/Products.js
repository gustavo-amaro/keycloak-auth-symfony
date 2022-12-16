import { useKeycloak } from "@react-keycloak/web";
import React, { useEffect, useState } from "react";

// import { Container } from './styles';

function Products() {
  const { keycloak } = useKeycloak();
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    keycloak.loadUserProfile().then((userProfile) => {
      setUserProfile(userProfile);
    });
  }, [keycloak]);

  return <h1>Olá, {userProfile.firstName}!</h1>;
}

export default Products;
