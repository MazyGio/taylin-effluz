import calculadoraPrecios_es from "./calculadoraPrecios_es";
import calculadoraPrecios_en from "./calculadoraPrecios_en";
import calculadoraServicios_es from "./calculadoraServicios_es";
import calculadoraServicios_en from "./calculadoraServicios_en";
import calculadoraUtilidad_es from "./calculadoraUtilidad_es";
import calculadoraUtilidad_en from "./calculadoraUtilidad_en";

export const translations = {
  es: {
    precios: calculadoraPrecios_es,
    consultoria: calculadoraServicios_es,
    utilidad: calculadoraUtilidad_es,
  },
  en: {
    precios: calculadoraPrecios_en,
    consultoria: calculadoraServicios_en,
    utilidad: calculadoraUtilidad_en,
  }
};
