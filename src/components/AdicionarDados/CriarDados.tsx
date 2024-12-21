import { Card, Heading, Stack } from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import AlertSucess from '../AlertSucess/AlertSucess';

const CriarDados = () => {
    const [descricao, setDescricao] = useState<string | null>('');
    const [valor, setValor] = useState<number | string>(0);
    const [mensagemSucesso, setMensagemSucesso] = useState<
        JSX.Element | string
    >('');
    const [categoria, setCategoria] = useState<string | null>('');

    async function criarDadosAPI(e: any) {
        e.preventDefault();
        try {
            categoria === 'Receita'
                ? await axios.post(
                      'controle-financeiro-backend-production.up.railway.app/adicionarReceita',
                      {
                          descricao: descricao,
                          valor: valor,
                          categoria: categoria,
                      },
                  )
                : await axios.post(
                      'controle-financeiro-backend-production.up.railway.app/adicionarDespesa',
                      {
                          descricao: descricao,
                          valor: valor,
                          categoria: categoria,
                      },
                  );
            setMensagemSucesso(<AlertSucess />);

            setTimeout(() => {
                setMensagemSucesso('');
            }, 2900);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Stack>
            {mensagemSucesso}

            <div className="flex items-center justify-center gap-6 mt-9 p-3">
                <Card.Root className="lg:w-[78%] w-full h-auto border-[2.5px] border-[#949494] p-4">
                    <h1 className="font-Poppins text-xl font-semibold text-center mt-2 mb-2">
                        Adicionar Dados
                    </h1>
                    <hr className="bg-[#949494] h-[2px] w-[85%] m-auto mb-4" />
                    <Card.Header>
                        <Heading className="font-Poppins font-semibold text-center"></Heading>
                    </Card.Header>
                    <Card.Body>
                        <form
                            action="POST"
                            className="flex flex-wrap gap-4 justify-between sm:flex-row sm:items-end"
                            onSubmit={criarDadosAPI}
                        >
                            {/* Campo de Descrição */}
                            <div className="flex flex-col w-full sm:w-[23%]">
                                <label className="font-Poppins font-medium mb-1">
                                    Descrição
                                </label>
                                <input
                                    className="w-full outline-none rounded-md border-2 p-2 border-[#696969]"
                                    type="text"
                                    placeholder="Digite aqui a descrição"
                                    required
                                    onChange={e => setDescricao(e.target.value)}
                                />
                            </div>

                            {/* Campo de Valor */}
                            <div className="flex flex-col w-full sm:w-[23%]">
                                <label className="font-Poppins font-medium mb-1">
                                    Valor
                                </label>
                                <input
                                    className="w-full outline-none rounded-md border-2 p-2 border-[#696969]"
                                    type="number"
                                    placeholder="Digite aqui o Valor"
                                    required
                                    onChange={e => setValor(e.target.value)}
                                />
                            </div>

                            {/* Campo de Categoria */}
                            <div className="flex flex-col w-full sm:w-[23%]">
                                <label className="font-Poppins font-medium mb-1">
                                    Categoria
                                </label>
                                <select
                                    className="w-full outline-none rounded-md border-2 p-2 border-[#696969]"
                                    onChange={e => setCategoria(e.target.value)}
                                >
                                    <option>Escolha uma opção</option>
                                    <option value="Receita">Receita</option>
                                    <option value="Despesa">Despesa</option>
                                </select>
                            </div>

                            {/* Botão Adicionar */}
                            <div className="w-full sm:w-[23%]">
                                <button className="w-full h-[4vh] rounded-md p-2 text-[#FFF] font-Poppins text-sm font-semibold bg-[#6dac3a] hover:bg-[#5a8e2f] transition-colors">
                                    Adicionar
                                </button>
                            </div>
                        </form>
                    </Card.Body>
                </Card.Root>
            </div>
        </Stack>
    );
};

export default CriarDados;
