import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "Welcome": "Welcome to Pivot",
      "Algorithms": "Algorithms",
      "Blog": "Blog",
      "Play": "Play",
      "Pause": "Pause",
      "Next": "Next Step",
      "Prev": "Previous Step"
    }
  },
  'pt-BR': {
    translation: {
      "Welcome": "Bem-vindo ao Pivot",
      "Algorithms": "Algoritmos",
      "Blog": "Blog",
      "Play": "Iniciar",
      "Pause": "Pausar",
      "Next": "Próximo Passo",
      "Prev": "Passo Anterior"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "pt-BR", // set default as pt-BR per project context
    fallbackLng: "en",
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
