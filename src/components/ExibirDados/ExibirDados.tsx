import { Card, Heading, Stack, Box } from '@chakra-ui/react';
import AlertError from '../AlertError/AlertError';
import { FaPen } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import axios from 'axios';
import { useEffect, useState } from 'react';

const ExibirDados = () => {
    interface Dados {
        id: number;
        descricao: string;
        valor: number;
        categoria: string;
    }

    const [id, setId] = useState<number>(0);
    const [receitas, setReceitas] = useState<Dados[] | null>(null);
    const [despesas, setDespesas] = useState<Dados[] | null>(null);
    const [editarDescricao, setEditarDescricao] = useState<string>('');
    const [editarValor, setEditarValor] = useState<number>(0);
    const [editarCategoria, setEditarCategoria] = useState<string>('');
    const [formularioNormal, setFormularioNormal] = useState<boolean>(true);
    const [formularioEdicao, setFormularioEdicao] = useState<boolean>(false);
    const [mensagemErro, setMensagemErro] = useState<JSX.Element | string>('');

    async function findAll() {
        try {
            const responseReceita = await axios.get(
                'https://testefinanceiro.vercel.app/receitas',
                { withCredentials: true },
            );
            setReceitas(responseReceita.data);

            const responseDespesas = await axios.get(
                'https://testefinanceiro.vercel.app/appdespesas',
                { withCredentials: true },
            );
            setDespesas(responseDespesas.data);
        } catch (error) {
            setMensagemErro(<AlertError />);
            console.error(error);
            setTimeout(() => {
                setMensagemErro('');
            }, 2200);
        }
    }
    useEffect(() => {
        findAll();
    }, [despesas, receitas]);

    async function Deletes(id: number) {
        await axios.delete(`testefinanceiro.vercel.app/${id}`);
        await axios.delete(`https://testefinanceiro.vercel.app/${id}`);
        findAll();
    }

    async function Update(id: number) {
        try {
            await axios.put(
                `https://testefinanceiro.vercel.app/${id}`,
                {
                    descricao: editarDescricao,
                    valor: editarValor,
                    categoria: editarCategoria,
                },

                {
                    headers: {
                        'Content-Type': 'application/json', // Necessário aqui
                    },
                },
            );

            await axios.put(
                `https://testefinanceiro.vercel.app/${id}`,
                {
                    descricao: editarDescricao,
                    valor: editarValor,
                    categoria: editarCategoria,
                },

                {
                    headers: {
                        'Content-Type': 'application/json', // Necessário aqui
                    },
                },
            );

            setFormularioEdicao(false);
            setFormularioNormal(true);
            findAll();
        } catch (error) {
            console.error(error);
        }
    }

    function dadosUptade(dados: Dados) {
        setId(dados.id);
        setEditarDescricao(dados.descricao);
        setEditarValor(dados.valor);
        setEditarCategoria(dados.categoria);
        setFormularioEdicao(true);
        setFormularioNormal(false);
    }

    return (
        <div>
            {formularioNormal && (
                <Stack>
                    {mensagemErro}

                    <div className="flex items-center justify-center gap-6 mt-9 p-3">
                        <Card.Root className="lg:w-[78%] w-full border-[2.5px] border-[#949494]">
                            <Card.Header>
                                <Heading className="flex w-full justify-between text-center font-Poppins font-semibold">
                                    <div className="flex-1">Descrição</div>
                                    <div className="flex-1">Valor</div>
                                    <div className="flex-1 gap-4 flex justify-center items-center">
                                        Categoria
                                    </div>
                                </Heading>
                                <hr className="bg-[#949494] h-[2px] w-[85%] m-auto mt-3" />
                            </Card.Header>
                            <Card.Body className="flex flex-col gap-1 w-full items-center">
                                {receitas?.map(item => (
                                    <Box
                                        key={item.id}
                                        className="flex justify-between w-full items-center"
                                    >
                                        <div className="flex-1 text-center">
                                            {item.descricao}
                                        </div>
                                        <div className="flex-1 text-center">
                                            {item.valor.toLocaleString(
                                                'pt-BR',
                                                {
                                                    style: 'currency',
                                                    currency: 'BRL',
                                                },
                                            )}
                                        </div>
                                        <div className="flex-1 text-center flex justify-center items-center gap-2">
                                            {item.categoria}
                                            <div className="flex gap-4">
                                                <AiFillDelete
                                                    onClick={() =>
                                                        Deletes(item.id)
                                                    }
                                                    className="text-[#e32424] cursor-pointer"
                                                />
                                                <FaPen
                                                    onClick={() =>
                                                        dadosUptade(item)
                                                    }
                                                    className="text-[#6dac3a] cursor-pointer"
                                                />
                                            </div>
                                        </div>
                                    </Box>
                                ))}

                                {despesas?.map(item => (
                                    <Box
                                        key={item.id}
                                        className="flex justify-between w-full items-center"
                                    >
                                        <div className="flex-1 text-center">
                                            {item.descricao}
                                        </div>
                                        <div className="flex-1 text-center">
                                            {item.valor.toLocaleString(
                                                'pt-BR',
                                                {
                                                    style: 'currency',
                                                    currency: 'BRL',
                                                },
                                            )}
                                        </div>
                                        <div className="flex-1 text-center flex justify-center items-center gap-2">
                                            {item.categoria}
                                            <div className="flex gap-4">
                                                <AiFillDelete
                                                    onClick={() =>
                                                        Deletes(item.id)
                                                    }
                                                    className="text-[#e32424] cursor-pointer"
                                                />
                                                <FaPen
                                                    onClick={() =>
                                                        dadosUptade(item)
                                                    }
                                                    className="text-[#6dac3a] cursor-pointer"
                                                />
                                            </div>
                                        </div>
                                    </Box>
                                ))}
                            </Card.Body>
                        </Card.Root>
                    </div>
                </Stack>
            )}

            {formularioEdicao && (
                <div>
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                            Update(id);
                        }}
                    >
                        <div className="mt-2">
                            <input
                                value={editarDescricao}
                                onChange={e =>
                                    setEditarDescricao(e.target.value)
                                }
                                type="text"
                                required
                                autoComplete="off"
                                className="outline-none font-Poppins block w-full h-12 rounded-md border p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#53a4e7] sm:text-sm"
                            />
                        </div>

                        <div className="mt-2">
                            <input
                                value={editarValor}
                                onChange={e =>
                                    setEditarValor(parseInt(e.target.value))
                                }
                                type="number"
                                required
                                autoComplete="off"
                                className="outline-none font-Poppins block w-full h-12 rounded-md border p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#53a4e7] sm:text-sm"
                            />
                        </div>

                        <div className="mt-2">
                            <input
                                value={editarCategoria}
                                onChange={e =>
                                    setEditarCategoria(e.target.value)
                                }
                                type="text"
                                required
                                autoComplete="off"
                                className="outline-none font-Poppins block w-full h-12 rounded-md border p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#53a4e7] sm:text-sm"
                            />
                        </div>

                        <button type="submit">adicionar</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ExibirDados;
