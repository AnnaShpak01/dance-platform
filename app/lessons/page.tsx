import Link from 'next/link'
import { lessons } from '@/data/lessons'
import styles from './lessonlslist.module.scss'

export default function LessonsPage() {
  return (
    <div className={styles.lessonslist}>
      <div className="container">
        <h1 className="">Уроки курсу</h1>
        <ul className="">
          {lessons.map((lesson) => (
            <li key={lesson.id} className="">
              <Link href={`/lessons/${lesson.id}`}>
                <h2 className="">{lesson.title}</h2>
                <p className="">{lesson.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
