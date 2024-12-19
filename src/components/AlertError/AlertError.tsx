import { Alert } from '../ui/alert';

export default function AlertError() {
    return (
        <Alert className=" flex m-auto justify-center items-center transition-[ease-in-out] w-[78%] h-[4.5vh] mb-[8%] p-[3%] bg-[#fa3e3e] opacity-[85%] text-white">
            <h1 className="font-Poppins text-[14px] font-semibold">
                Erro, verifique as informações cadastradas!!
            </h1>
        </Alert>
    );
}
