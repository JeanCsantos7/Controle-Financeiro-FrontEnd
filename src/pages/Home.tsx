import Card from '../components/Cards/Card';
import CriarDados from '../components/AdicionarDados/CriarDados';
import ExibirDados from '../components/ExibirDados/ExibirDados';

const Home = () => {
    return (
        <>
            <header className="bg-[#6dac3a] border-[0.5px] rounded-sm border-[#a0e667] w-full h-24">
                <h1 className="font-Poppins text-xl font-semibold  text-center text-white pt-4">
                    Controle Financeiro
                </h1>
            </header>

            <Card />
            <CriarDados />
            <ExibirDados />
        </>
    );
};

export default Home;
