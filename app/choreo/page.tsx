import VideoPlayer from '@/app/components/videoplayer/VideoPlayer'
import styles from './choreopage.module.scss'

export default async function ChoreoPage() {
  return (
    <div className={styles.lessonBg}>
      <div className="container">
        <div className={styles.wrapper}>
          <h1 className={styles.title}>Хореографія</h1>
          <VideoPlayer
            url="https://www.youtube.com/watch?v=ZnYwxKqFO5s&list=PLrOlBFkAG0sUuR_ruJYfl_2JjqA6O5D0S"
            title="Хореографія"
            className={styles.video}
          />
          <p className={styles.description}>Хорео до курсу</p>
        </div>
      </div>
    </div>
  )
}
