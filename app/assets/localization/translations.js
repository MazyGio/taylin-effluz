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
      copyright: "El desarrollo de estas calculadoras y su código son propiedad de Effluz S.A. Está prohibida su reproducción total o parcial.",
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
      copyright: "The development of these calculators and their code is property of Effluz S.A. It is prohibited to reproduce them in total or in part.",
    },
    precios: calculadoraPrecios_en,
    consultoria: calculadoraServicios_en,
    utilidad: calculadoraUtilidad_en,
    menu: menu_en,
  }
};
