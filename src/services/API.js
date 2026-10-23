import axios from "axios";

const BASE_URL = "https://countriesnow.space/api/v0.1/countries/flag/images";

export const obtenerPaises = async () => {

  const paises = await axios.get(BASE_URL);

  return (paises.data?.data ?? []).map((pais) => ({
    name: pais.name,
    flag: pais.flag,
  }));
};

