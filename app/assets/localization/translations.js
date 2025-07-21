import calculadoraPrecios_es from "./calculadoraPrecios_es";
import calculadoraPrecios_en from "./calculadoraPrecios_en";
import calculadoraServicios_es from "./calculadoraServicios_es";
import calculadoraServicios_en from "./calculadoraServicios_en";
import calculadoraUtilidad_es from "./calculadoraUtilidad_es";
import calculadoraUtilidad_en from "./calculadoraUtilidad_en";
import menu_es from "./menu_es";
import menu_en from "./menu_en";

export const translations = {
  es: {
    common: {
      welcome: "Bienvenido/a",
      selectCalculator: "Selecciona la calculadora que deseas utilizar",
      purchaseAccess: "Comprar Acceso",
      developedBy: "Desarrollado por Taylin Luzcando",
      disclaimer: "El desarrollo de esta calculadora y su código son propiedad de Effluz S.A. Está prohibida su reproducción total o parcial. Esta calculadora es una herramienta de estimación, no nos hacemos responsables por los usos que le den a estos cálculos. Desarrollada por Taylin Luzcando.",
    },
    precios: calculadoraPrecios_es,
    consultoria: calculadoraServicios_es,
    utilidad: calculadoraUtilidad_es,
    menu: menu_es,
  },
  en: {
    common: {
      welcome: "Welcome",
      selectCalculator: "Select the calculator you want to use",
      purchaseAccess: "Purchase Access",
      developedBy: "Developed by Taylin Luzcando",
      disclaimer: "The development of this calculator and its code are property of Effluz S.A. Total or partial reproduction is prohibited. This calculator is an estimation tool, we are not responsible for the uses you make of these calculations. Developed by Taylin Luzcando.",
    },
    precios: calculadoraPrecios_en,
    consultoria: calculadoraServicios_en,
    utilidad: calculadoraUtilidad_en,
    menu: menu_en,
  }
};
