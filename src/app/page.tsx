"use client";

import type React from "react";
import { useEffect, useState } from "react";
import dados, { TarefaInterface } from "@/data";
import Cabecalho from "@/componentes/Cabecalho";

interface TarefaProps {
	titulo: string;
	concluido?: boolean;
}

const Tarefa: React.FC<TarefaProps> = ({ titulo, concluido }) => {
	const [estaConcluido, setEstaConcluido] = useState(concluido);

	const classeCard = `p-3 mb-3 rounded-lg shadow-md hover:cursor-pointer hover:border ${estaConcluido
		? "bg-gray-800 hover:border-gray-800"
		: "bg-gray-400 hover:border-gray-400"
		}`;

	const classeCorDoTexto = estaConcluido ? "text-amber-50" : "";

	const escutarClique = () => {
		console.log(`A tarefa '${titulo}' foi clicada!`);
		setEstaConcluido(!estaConcluido);
	};

	return (
		<div className={classeCard} onClick={() => escutarClique()}>
			<h3 className={`text-xl font-bold ${classeCorDoTexto}`}>{titulo}</h3>
			<p className={`text-sm ${classeCorDoTexto}`}>
				{estaConcluido ? "Concluída" : "Pendente"}
			</p>
		</div>
	);
};

interface TareafasProps {
	dados: TarefaInterface[];
}

const Tarefas: React.FC<TareafasProps> = ({ dados }) => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
			{dados.map((tarefa) => (
				<Tarefa
					key={tarefa.id}
					titulo={tarefa.title}
					concluido={tarefa.completed}
				/>
			))}
		</div>
	);
};

const Home = () => {
	const [tarefas, setTarefas] = useState<TarefaInterface[]>(dados);
	const [mostrarModal, setMostrarModal] = useState(false);

	const adicionarTarefa = (titulo: string) => {
		const novaTarefa: TarefaInterface = {
			id: Math.max(...tarefas.map(t => t.id), 0) + 1,
			title: titulo,
			completed: false
		};
		setTarefas([...tarefas, novaTarefa]);
	};

	return (
		<div className="container mx-auto p-4">
			<Cabecalho />

			<button
				onClick={() => setMostrarModal(true)}
				className="mb-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
			>
				Adicionar Tarefa
			</button>

			<Tarefas dados={tarefas} />

			{mostrarModal && (
				<div className="fixed inset-0 flex items-center justify-center p-4 bg-black/70">
					<div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
						<h2 className="text-xl text-gray-500 font-bold mb-4">Adicionar Nova Tarefa</h2>

						<form onSubmit={(e) => {
							e.preventDefault();
							const formData = new FormData(e.currentTarget);
							const titulo = formData.get('titulo') as string;
							if (titulo.trim()) {
								adicionarTarefa(titulo);
								setMostrarModal(false);
							}
						}}>
							<input
								type="text"
								name="titulo"
								className="w-full p-2 border border-gray-300 text-gray-500 rounded mb-5"
								placeholder="Digite o título da tarefa"
								autoFocus
							/>

							<div className="flex justify-start gap-2">
								<button
									type="button"
									onClick={() => setMostrarModal(false)}
									className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
								>
									Cancelar
								</button>
								<button
									type="submit"
									className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
								>
									Adicionar
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default Home;