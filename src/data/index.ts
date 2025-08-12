// data/index.ts
export type TarefaInterface = {
  id: number;
  title: string;
  completed: boolean;
};

const dadosIniciais: Array<TarefaInterface> = [
  { id: 1, title: "delectus aut autem", completed: false },
  { id: 2, title: "quis ut nam facilis et officia qui", completed: false },
  { id: 3, title: "fugiat veniam minus", completed: false },
  { id: 4, title: "et porro tempora", completed: true },
  { id: 5, title: "laboriosam mollitia et enim quasi adipisci", completed: false },
];

export default dadosIniciais;