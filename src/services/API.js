import axios from "axios";

const BASE_URL = "https://countriesnow.space/api/v0.1/countries/flag/images";

export const obtenerPaises = async () => {
  const response = await axios.get(BASE_URL);

  return (response.data?.data ?? []).map((pais) => ({
    name: pais.name || "",
    flag: pais.flag || "",
  })).filter((pais) => pais.name && pais.flag);
};

