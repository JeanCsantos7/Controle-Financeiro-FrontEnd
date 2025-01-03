import { Card, Heading, Stack } from '@chakra-ui/react';
import { FaArrowCircleUp } from 'react-icons/fa';
import { FaArrowCircleDown } from 'react-icons/fa';
import { LuArrowUpDown } from 'react-icons/lu';

import { useEffect, useState } from 'react';
import axios from 'axios';

const CardReceitas = () => {
    interface Dados {
        total: number;
    }

    const [receitas, setReceitas] = useState<Dados[]>([]);
    const [despesas, setDespesas] = useState<Dados[]>([]);
    const [subtrair, setSubtrair] = useState<number>();

    useEffect(() => {
        async function consumirAPI() {
            const receitasData = await axios
                .get(
                    'https://backend-financas-nktd-g0nib5ebq-jeancsantos7s-projects.vercel.app/totalReceitas',
                )
                .then(response =>
                    response.data.map((item: any) => ({
                        total: Number(item.total),
                    })),
                );

            const despesasData = await axios
                .get(
                    'https://backend-financas-nktd-g0nib5ebq-jeancsantos7s-projects.vercel.app/totalDespesas',
                )
                .then(response =>
                    response.data.map((item: any) => ({
                        total: Number(item.total),
                    })),
                );

            setReceitas(receitasData);
            setDespesas(despesasData);
        }

        consumirAPI();
    }, [receitas, despesas]);

    const somarReceitas = receitas.reduce(
        (acc, elementoAtual) => acc + elementoAtual.total,
        0,
    );

    const somarDespesas = despesas.reduce(
        (acc, elementoAtual) => acc + elementoAtual.total,
        0,
    );

    useEffect(() => {
        setSubtrair(somarReceitas - somarDespesas);
    }, [receitas, despesas]);

    return (
        <Stack>
            <div className="flex items-center justify-center gap-6 mt-9 p-3">
                <Card.Root className="lg:w-[25%] w-full border-[2.5px] border-[#949494]">
                    <Card.Header>
                        <Heading>
                            <span className="flex items-center gap-2">
                                <h1 className="font-Poppins font-semibold text-center max-w-md">
                                    Receitas
                                </h1>
                                <FaArrowCircleUp className="text-[#0eb34a] text-xl" />
                            </span>
                        </Heading>
                    </Card.Header>
                    <Card.Body className="text-[#0eb34a] font-Poppins  font-semibold">
                        {receitas?.map(item => {
                            return item.total.toLocaleString('pt-br', {
                                style: 'currency',
                                currency: 'BRL',
                            });
                        })}
                    </Card.Body>
                </Card.Root>

                <Card.Root className="lg:w-[25%] w-full border-[2.5px] border-[#949494]">
                    <Card.Header>
                        <Heading>
                            <span className="flex items-center gap-2">
                                <h1 className="font-Poppins font-semibold text-center max-w-md">
                                    Despesas
                                </h1>
                                <FaArrowCircleDown className="text-[#e32424] text-xl" />
                            </span>
                        </Heading>
                    </Card.Header>
                    <Card.Body className="text-[#e32424] font-Poppins  font-semibold">
                        {despesas?.map((item, index) => (
                            <div key={index}>
                                {item.total.toLocaleString('pt-br', {
                                    style: 'currency',
                                    currency: 'BRL',
                                })}
                            </div>
                        ))}
                    </Card.Body>
                </Card.Root>

                <Card.Root className="lg:w-[25%] w-full border-[2.5px] border-[#949494]">
                    <Card.Header>
                        <Heading>
                            <span className="flex items-center gap-2">
                                <h1 className="font-Poppins font-semibold text-center max-w-md">
                                    Total
                                </h1>
                                <LuArrowUpDown className="text-[#0eb34a]  text-xl" />
                            </span>
                        </Heading>
                    </Card.Header>
                    <Card.Body
                        className={
                            somarDespesas > somarReceitas
                                ? 'text-[#e32424] font-Poppins  font-semibold'
                                : 'text-[#0eb34a]   font-Poppins  font-semibold'
                        }
                    >
                        {subtrair?.toLocaleString('pt-br', {
                            style: 'currency',
                            currency: 'BRL',
                        })}
                    </Card.Body>
                </Card.Root>
            </div>
        </Stack>
    );
};

export default CardReceitas;
