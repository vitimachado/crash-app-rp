import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center flex justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center font-mono text-sm lg:flex justify-center">
        <div className="fixed flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <Link
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="/console"
            rel="noopener noreferrer"
          >
            Press Start
          </Link>
        </div>
      </div>
    </main>
  )
}
