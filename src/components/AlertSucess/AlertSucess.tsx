import { Alert } from '../ui/alert';

export default function AlertSucess() {
    return (
        <Alert className=" flex m-auto justify-center items-center transition-[ease-in-out] w-[78%] h-[4.5vh]  mt-[0.9%] p-[1.8%] bg-[#3abd6a] opacity-[85%] text-white">
            <h1 className="font-Poppins text-[14px] font-semibold">
                Dados Cadastrados com sucesso!
            </h1>
        </Alert>
    );
}
