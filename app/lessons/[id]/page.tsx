import VideoPlayer from '@/app/components/videoplayer/VideoPlayer'
import { lessons } from '@/data/lessons'
import { lessonSchedule } from '@/data/lessonschedule'
import styles from './lessonpage.module.scss'

interface LessonPageProps {
  params: Promise<{ id: string }>
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { id } = await params
  const lesson = lessons.find((l) => l.id === id)

  if (!lesson) return <div className={styles.notFound}>Lesson not found</div>

  // --- Проверяем дату открытия урока
  const scheduleItem = lessonSchedule.find((item) => item.id.toString() === id)
  const now = new Date()
  const isAvailable = scheduleItem && new Date(scheduleItem.openDate) <= now

  // --- Если урок ещё не доступен
  if (!isAvailable) {
    return (
      <div className={styles.lessonBg}>
        <div className="container">
          <div className={styles.wrapper}>
            <h1 className={styles.title}>{scheduleItem?.title || 'Урок'}</h1>
            <div className={styles.locked}>
              <p>🔒 Цей урок ще не відкрито</p>
              <span>
                Відкриється{' '}
                {scheduleItem && new Date(scheduleItem.openDate).toLocaleDateString('uk-UA')}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // --- Если урок уже доступен
  return (
    <div className={styles.lessonBg}>
      <div className="container">
        <div className={styles.wrapper}>
          <h1 className={styles.title}>{lesson.title}</h1>
          <VideoPlayer url={lesson.videoUrl} title={lesson.title} className={styles.video} />
          <p className={styles.description}>{lesson.description}</p>
        </div>
      </div>
    </div>
  )
}
