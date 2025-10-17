import VideoPlayer from '@/app/components/videoplayer/VideoPlayer'
import { lessons } from '@/data/lessons'
import styles from './lessonpage.module.scss'

interface LessonPageProps {
  params: Promise<{ id: string }>
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { id } = await params
  const lesson = lessons.find((l) => l.id === id)

  if (!lesson) return <div className={styles.notFound}>Lesson not found</div>

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
