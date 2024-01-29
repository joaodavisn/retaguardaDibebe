'use client'
import Image from 'next/image'
import { useEffect, useState, useSyncExternalStore } from 'react';
import Gerenciadordealugueis from './pages/Gerenciadordealugueis';
import Relatorios from './pages/Relatorios';
import Campanhas from './pages/Campanhas'
export default function Home() {
  const [screen, setScreen] = useState("gerenciadordealugueis");

  return (
    <main className="flex min-h-screen flex-row items-start justify-center">
      <div className=' left-0 top-0 bg-neutral-900 w-[20%] h-screen p-10 items-center justify-center flex-col content-center'>
        <div className='w-full items-center justify-center content-center flex mb-12'>
          <Image src={"https://cdn.dibebe.net/media/images/ui/logow.png"} alt='logo' width={120} height={20} />
        </div>
        <div className='flex flex-col text-white items-center gap-2 p-4 ring-neutral-800 ring-1 rounded-2xl mb-4'>
          <div className='flex flex-row w-full items-center gap-2'>
            <Image src={"https://cdn.dibebe.net/media/images/ui/D.png"} alt='logo' width={50} height={50} className='rounded-full' />
            <p>Djamila Cazare</p>
          </div>
          <button onClick={() => { setScreen("test") }} className='ring-1 w-full py-2 px-4 text-red-500 font-light hover:text-white ring-red-500 rounded-lg hover:bg-red-500 cursor-pointer hover:ring-white'>
            Sair do sistema
          </button>
        </div>
        <button onClick={() => { setScreen("test") }} className='py-2 px-4 bg-[#DD5A89] w-full text-white ring-[#FF82AF] ring-1 rounded-lg hover:bg-[#A64367] mb-4'>
          Resumo
        </button>
        <button onClick={() => { setScreen("gerenciadordealugueis") }} className='py-2 px-4 bg-[#DD5A89] w-full text-white ring-[#FF82AF] ring-1 rounded-lg hover:bg-[#A64367] mb-4'>
          Gerenciador de Aluguel
        </button>
        <button onClick={() => { setScreen("relatorios") }} className='py-2 px-4 bg-[#DD5A89] w-full text-white ring-[#FF82AF] ring-1 rounded-lg hover:bg-[#A64367] mb-4'>
          Relatórios
        </button>
        <button onClick={() => { setScreen("campanhas") }} className='py-2 px-4 bg-[#DD5A89] w-full text-white ring-[#FF82AF] ring-1 rounded-lg hover:bg-[#A64367] mb-4'>
          Campanhas
        </button>
        <button onClick={() => { setScreen("campanhas") }} className='py-2 px-4 bg-[#DD5A89] w-full text-white ring-[#FF82AF] ring-1 rounded-lg hover:bg-[#A64367] mb-4'>
          Inventário
        </button>
      </div>
      <div className='w-[80%] h-[100%] p-4'>
        {(() => {
          switch (screen) {
            case "gerenciadordealugueis": return <Gerenciadordealugueis />;
            case "relatorios": return <Relatorios />;
            case "campanhas": return <Campanhas />;
            default: return null;
          }
        })()}
      </div>
    </main>
  )
}
