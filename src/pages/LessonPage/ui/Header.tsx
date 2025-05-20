import { BackButton } from '@/shared/ui/BackButton'
import { useNavigate } from '@tanstack/react-router'

interface HeaderProps {
  progress: number
}

export default function Header({ progress }: HeaderProps) {
  const navigate = useNavigate({ from: '/lesson' })

  return (
    <header className="w-full max-w-[1080px] mx-auto px-10 pt-[50px] flex justify-center items-center box-border">
      <div className="grid grid-cols-[min-content_1fr_min-content] gap-6 items-center w-full">
        <BackButton onClick={() => navigate({ to: '/learn' })} />
        <ProgressBar progress={progress} />
      </div>
    </header>
  )
}

function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="w-full h-4 bg-swan relative rounded-full">
      <div
        className="bg-owl h-4 rounded-full transition-all duration-400"
        style={{
          clipPath: `inset(0 calc(100% - ${progress}%) 0 0 round 8px)`
        }}
      />
    </div>
  )
}
