import { RocketMan } from "./RocketMan/RocketMan"

type Params = {
    gameId: string
}

export default function ReturnGame({ gameId }: Params) {
    switch (gameId) {
      case '1':
        return <RocketMan />
    
      default:
        return <div>Game Not Found.</div>
    }
}
