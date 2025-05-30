import Icon from '@/shared/ui/Icon'
import SkillBlock from '@/widgets/SkillBlock'

export const Sidebar = () => {
  return (
    <section className="w-[368px]">
      <Stats />
    </section>
  )
}

function Stats() {
  return (
    <div className="flex h-11 mb-2 gap-12 justify-center items-center relative">
      <SkillBlock />
      <div className="flex items-center gap-3">
        <Icon name="streak" className="h-7" />
        <p className="text-hare">1</p>
      </div>
    </div>
  )
}
