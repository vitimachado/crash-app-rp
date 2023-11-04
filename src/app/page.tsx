import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-5xl w-full items-center font-mono text-sm lg:flex justify-center">
          <Link
            className="flex place-items-center gap-2 p-8 justify-center"
            href="/console"
            rel="noopener noreferrer"
          >
            Press Start
          </Link>
      </div>
    </main>
  )
}
