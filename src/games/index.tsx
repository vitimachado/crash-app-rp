import { SpaceshipGame } from "./SpaceshipGame/SpaceshipGame"

type Params = {
    gameId: string
}

export default function ReturnGame({ gameId }: Params) {
    switch (gameId) {
      case '1':
        return <SpaceshipGame />
    
      default:
        return <div>Game Not Found.</div>
    }
}
