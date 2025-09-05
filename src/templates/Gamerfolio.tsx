import BioCard from "./BioCard";
import GamesFavoritos from "./GamesFavoritos";

export default function Gamerfolio() {
    return (
        <div className="flex flex-col">
            <div className="group [perspective:1000px] w-[500px] h-[420px]">
                {/* <BioCard modo={undefined} /> */}
            </div>

            <div>
                {/* <GamesFavoritos setModal={undefined} favoGames={[]} /> */}
            </div>

            <div className="fixed bottom-2 right-2">
                <button className="p-2 hover:cursor-pointer">Crie o seu!</button>
            </div>
        </div>
    )
}
