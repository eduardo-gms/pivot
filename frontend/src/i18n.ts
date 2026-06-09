import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      "Welcome": "Welcome to Pivot",
      "home_subtitle": "Interactive step-by-step visualizer for Algorithms and Data Structures",
      "Algorithms": "Algorithms",
      "Blog": "Blog",
      "Home": "Home",

      // Categories
      "Sorting Algorithms": "Sorting Algorithms",
      "sorting_desc": "Algorithms that organize collections of data into a specific order.",
      "Linear Structures": "Linear Data Structures",
      "linear_desc": "Structures where elements are arranged sequentially: Stacks, Queues, and Linked Lists.",
      "Trees": "Trees",
      "trees_desc": "Hierarchical data structures with nodes connected by edges.",

      // Player controls
      "Play": "Play",
      "Pause": "Pause",
      "Replay": "Replay",
      "Next": "Next",
      "Prev": "Prev",
      "Speed": "Speed",
      "Run": "Run",
      "Input": "Input",

      // Pages
      "Filtered by": "Filtered by",
      "Show all": "Show all",
      "Loading": "Loading",
      "No algorithms found": "No algorithms found.",
      "Engine not found": "Engine not found",
      "engine_not_found_desc": "The simulation engine for \"{{slug}}\" is not available yet.",
      "Back to algorithms": "Back to algorithms",
      "Article not found": "Article not found",
      "offline_mode": "Running in offline mode — showing local data",
    }
  },
  'pt-BR': {
    translation: {
      // Navegação
      "Welcome": "Bem-vindo ao Pivot",
      "home_subtitle": "Simulador visual passo a passo de Algoritmos e Estruturas de Dados",
      "Algorithms": "Algoritmos",
      "Blog": "Blog",
      "Home": "Início",

      // Categorias
      "Sorting Algorithms": "Algoritmos de Ordenação",
      "sorting_desc": "Algoritmos focados em organizar coleções de dados em uma ordem específica.",
      "Linear Structures": "Estruturas de Dados Lineares",
      "linear_desc": "Estruturas onde os elementos são dispostos sequencialmente: Pilhas, Filas e Listas Encadeadas.",
      "Trees": "Árvores",
      "trees_desc": "Estruturas de dados hierárquicas com nós conectados por arestas.",

      // Controles do player
      "Play": "Iniciar",
      "Pause": "Pausar",
      "Replay": "Reiniciar",
      "Next": "Avançar",
      "Prev": "Voltar",
      "Speed": "Velocidade",
      "Run": "Executar",
      "Input": "Entrada",

      // Páginas
      "Filtered by": "Filtrado por",
      "Show all": "Mostrar todos",
      "Loading": "Carregando",
      "No algorithms found": "Nenhum algoritmo encontrado.",
      "Engine not found": "Motor não encontrado",
      "engine_not_found_desc": "O motor de simulação para \"{{slug}}\" ainda não está disponível.",
      "Back to algorithms": "Voltar para algoritmos",
      "Article not found": "Artigo não encontrado",
      "offline_mode": "Modo offline — exibindo dados locais",
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
