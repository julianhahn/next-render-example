import Image from 'next/image'
import './page.css'
import { Builded } from './builded'
import { Dynamic_on_Server } from './dynamic_on_server'
import { Dynamic_on_Client } from './dynamic_on_client'

export default function Home() {
    const urlPath = 'https://dog.ceo/api/breeds/image/random'

    return (
        <main className={'main'}>
            <div className="examples">
                <div className="item builded">
                    <Builded url={urlPath} />
                </div>
                <div className="item dynamic">
                    <Dynamic_on_Server url={urlPath} />
                </div>
                <div className="item client-side">
                    <Dynamic_on_Client url={urlPath} />
                </div>
            </div>
        </main>
    )
}
