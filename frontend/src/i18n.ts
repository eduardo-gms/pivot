import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      "Welcome": "Welcome to Pivot",
      "home_subtitle": "Explore and master computer science concepts through interactive visualizations. Select an algorithm below to see the magic happen step by step.",
      "Algorithms": "Algorithms",
      "Blog": "Blog",
      "Home": "Home",
      "Search algorithms": "Search algorithms...",

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
      "select_algorithm_prompt": "Select an algorithm and start the simulation",

      // Preset scenarios
      "Scenario": "Scenario",
      "preset_basic": "Basic",
      "preset_underflow": "Underflow",
      "preset_lifo_intensive": "LIFO Intensive",
      "preset_fifo_intensive": "FIFO Intensive",
      "preset_mixed": "Mixed Operations",
      "preset_rotations": "With Rotations",
      "preset_extract_heavy": "Extract Heavy",

      // --- Engine Steps (Sorting) ---
      "bubble_sort_initial": "Starting Bubble Sort on array: {{array}}.",
      "bubble_sort_compare": "Comparing elements {{val1}} and {{val2}}.",
      "bubble_sort_swap": "Swapped {{val1}} and {{val2}} because {{val1}} > {{val2}}.",
      "bubble_sort_pass_end": "Pass complete. Element {{val}} is sorted.",
      "bubble_sort_done": "Bubble Sort complete. The array is fully sorted.",

      "selection_sort_initial": "Starting Selection Sort on array: {{array}}.",
      "selection_sort_compare": "Comparing current minimum ({{min}}) with {{val}}.",
      "selection_sort_swap": "Found a new minimum: {{val}}.",
      "selection_sort_placed": "Swapped minimum element ({{min}}) to its final sorted position.",
      "selection_sort_done": "Selection Sort complete. The array is fully sorted.",

      "insertion_sort_initial": "Starting Insertion Sort on array: {{array}}.",
      "insertion_sort_pick": "Selected key {{key}} to be inserted.",
      "insertion_sort_shift": "Shifted {{val}} to the right to make room for the key.",
      "insertion_sort_insert": "Inserted key {{key}} at the correct position.",
      "insertion_sort_done": "Insertion Sort complete. The array is fully sorted.",

      "merge_sort_initial": "Starting Merge Sort on array: {{array}}.",
      "merge_sort_split": "Splitting array into halves.",
      "merge_sort_compare": "Comparing {{leftVal}} and {{rightVal}} to merge.",
      "merge_sort_merged": "Merged subarray.",
      "merge_sort_done": "Merge Sort complete. The array is fully sorted.",

      "quick_sort_initial": "Starting Quick Sort on array: {{array}}.",
      "quick_sort_pivot": "Selected pivot {{pivot}}.",
      "quick_sort_compare": "Comparing {{val}} with pivot {{pivot}}.",
      "quick_sort_swap": "Swapped element to the left partition.",
      "quick_sort_pivot_placed": "Placed pivot {{pivot}} at its final sorted position.",
      "quick_sort_done": "Quick Sort complete. The array is fully sorted.",

      // --- Engine Steps (Linear) ---
      "stack_initial": "Starting Stack simulation.",
      "stack_push": "Pushed value {{value}} onto the top of the stack.",
      "stack_underflow": "Underflow error: Cannot pop from an empty stack.",
      "stack_pop": "Popped value {{value}} from the top of the stack.",
      "stack_final": "Stack simulation complete. Final size is {{size}}.",

      "queue_initial": "Starting Queue simulation.",
      "queue_enqueue": "Enqueued value {{value}} at the tail of the queue.",
      "queue_underflow": "Underflow error: Cannot dequeue from an empty queue.",
      "queue_dequeue": "Dequeued value {{value}} from the head of the queue.",
      "queue_final": "Queue simulation complete. Final size is {{size}}.",

      "ll_initial": "Starting Linked List simulation.",
      "ll_append": "Appended value {{value}} to the tail of the list.",
      "ll_prepend": "Prepended value {{value}} to the head of the list.",
      "ll_delete_found": "Found value {{value}} to delete.",
      "ll_delete": "Deleted value {{value}} from the list.",
      "ll_done": "Linked List simulation complete.",

      // --- Engine Steps (Trees) ---
      "pq_initial": "Starting Priority Queue (Max-Heap) simulation.",
      "pq_insert": "Inserted value {{value}} at the end of the heap.",
      "pq_compare": "Comparing child {{childValue}} with parent {{parentValue}}.",
      "pq_swap": "Swapped to maintain heap property.",
      "pq_inserted": "Value {{value}} placed in correct heap position.",
      "pq_extracting": "Extracting maximum value {{value}} from the root.",
      "pq_replaced_root": "Replaced root with the last element of the heap.",
      "pq_extracted": "Extracted maximum value {{value}}.",
      "pq_done": "Priority Queue simulation complete.",

      "avl_initial": "Starting AVL Tree simulation.",
      "avl_insert": "Inserting value {{value}} into the AVL Tree.",
      "avl_balance": "Updating balance factors.",
      "avl_rotate_left": "Performing Left Rotation at node {{value}} to restore balance.",
      "avl_rotate_right": "Performing Right Rotation at node {{value}} to restore balance.",
      "avl_done": "AVL Tree simulation complete."
    }
  },
  'pt-BR': {
    translation: {
      // Navegação
      "Welcome": "Bem-vindo ao Pivot",
      "home_subtitle": "Explore e domine conceitos de ciência da computação através de visualizações interativas. Selecione um algoritmo abaixo para ver a mágica acontecer passo a passo.",
      "Algorithms": "Algoritmos",
      "Blog": "Blog",
      "Home": "Início",
      "Search algorithms": "Buscar algoritmos...",

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
      "select_algorithm_prompt": "Selecione um algoritmo e inicie a simulação",

      // Cenários preset
      "Scenario": "Cenário",
      "preset_basic": "Básico",
      "preset_underflow": "Underflow",
      "preset_lifo_intensive": "LIFO Intensivo",
      "preset_fifo_intensive": "FIFO Intensivo",
      "preset_mixed": "Operações Mistas",
      "preset_rotations": "Com Rotações",
      "preset_extract_heavy": "Extrações Intensivas",

      // --- Engine Steps (Sorting) ---
      "bubble_sort_initial": "Iniciando Bubble Sort no array: {{array}}.",
      "bubble_sort_compare": "Comparando os elementos {{val1}} e {{val2}}.",
      "bubble_sort_swap": "Trocando {{val1}} e {{val2}} pois {{val1}} > {{val2}}.",
      "bubble_sort_pass_end": "Passada completa. Elemento {{val}} está na sua posição final.",
      "bubble_sort_done": "Bubble Sort concluído. O array está totalmente ordenado.",

      "selection_sort_initial": "Iniciando Selection Sort no array: {{array}}.",
      "selection_sort_compare": "Comparando mínimo atual ({{min}}) com {{val}}.",
      "selection_sort_swap": "Novo mínimo encontrado: {{val}}.",
      "selection_sort_placed": "Movendo o menor elemento ({{min}}) para sua posição final.",
      "selection_sort_done": "Selection Sort concluído. O array está totalmente ordenado.",

      "insertion_sort_initial": "Iniciando Insertion Sort no array: {{array}}.",
      "insertion_sort_pick": "Selecionando a chave {{key}} para inserção.",
      "insertion_sort_shift": "Deslocando {{val}} para a direita para dar espaço à chave.",
      "insertion_sort_insert": "Inserindo a chave {{key}} na posição correta.",
      "insertion_sort_done": "Insertion Sort concluído. O array está totalmente ordenado.",

      "merge_sort_initial": "Iniciando Merge Sort no array: {{array}}.",
      "merge_sort_split": "Dividindo o array na metade.",
      "merge_sort_compare": "Comparando {{leftVal}} e {{rightVal}} para mesclar.",
      "merge_sort_merged": "Sub-array mesclado.",
      "merge_sort_done": "Merge Sort concluído. O array está totalmente ordenado.",

      "quick_sort_initial": "Iniciando Quick Sort no array: {{array}}.",
      "quick_sort_pivot": "Pivô selecionado: {{pivot}}.",
      "quick_sort_compare": "Comparando {{val}} com o pivô {{pivot}}.",
      "quick_sort_swap": "Elemento menor ou igual movido para a partição esquerda.",
      "quick_sort_pivot_placed": "Posicionando pivô {{pivot}} na sua posição final ordenada.",
      "quick_sort_done": "Quick Sort concluído. O array está totalmente ordenado.",

      // --- Engine Steps (Linear) ---
      "stack_initial": "Iniciando simulação de Pilha (Stack).",
      "stack_push": "Valor {{value}} adicionado no topo da pilha (Push).",
      "stack_underflow": "Erro de Underflow: Não é possível remover de uma pilha vazia.",
      "stack_pop": "Valor {{value}} removido do topo da pilha (Pop).",
      "stack_final": "Simulação de Pilha concluída. Tamanho final: {{size}}.",

      "queue_initial": "Iniciando simulação de Fila (Queue).",
      "queue_enqueue": "Valor {{value}} enfileirado no final da fila (Enqueue).",
      "queue_underflow": "Erro de Underflow: Não é possível desenfileirar de uma fila vazia.",
      "queue_dequeue": "Valor {{value}} desenfileirado do início da fila (Dequeue).",
      "queue_final": "Simulação de Fila concluída. Tamanho final: {{size}}.",

      "ll_initial": "Iniciando simulação de Lista Encadeada.",
      "ll_append": "Valor {{value}} anexado no final da lista (Append).",
      "ll_prepend": "Valor {{value}} inserido no início da lista (Prepend).",
      "ll_delete_found": "Encontrado valor {{value}} para remoção.",
      "ll_delete": "Valor {{value}} removido da lista.",
      "ll_done": "Simulação de Lista Encadeada concluída.",

      // --- Engine Steps (Trees) ---
      "pq_initial": "Iniciando simulação de Fila de Prioridade (Max-Heap).",
      "pq_insert": "Inserido valor {{value}} no final do heap.",
      "pq_compare": "Comparando filho {{childValue}} com pai {{parentValue}}.",
      "pq_swap": "Trocado para manter a propriedade do heap.",
      "pq_inserted": "Valor {{value}} posicionado corretamente no heap.",
      "pq_extracting": "Extraindo o valor máximo {{value}} da raiz.",
      "pq_replaced_root": "Raiz substituída pelo último elemento do heap.",
      "pq_extracted": "Valor máximo {{value}} extraído.",
      "pq_done": "Simulação de Fila de Prioridade concluída.",

      "avl_initial": "Iniciando simulação da Árvore AVL.",
      "avl_insert": "Inserindo valor {{value}} na árvore AVL.",
      "avl_balance": "Atualizando fatores de balanceamento.",
      "avl_rotate_left": "Realizando Rotação à Esquerda no nó {{value}} para restaurar o balanceamento.",
      "avl_rotate_right": "Realizando Rotação à Direita no nó {{value}} para restaurar o balanceamento.",
      "avl_done": "Simulação de Árvore AVL concluída."
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
