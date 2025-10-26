'use client'

import { signIn, useSession } from 'next-auth/react'
import styles from './page.module.scss'
import Link from 'next/link'
import Image from 'next/image'
export default function HomePage() {
  const { data: session } = useSession()

  return (
    <main>
      <div className={styles.poster}>
        <div className="container">
          <div className={styles.text_block}>
            <h1 className="">Bachata Constructor </h1>
            <p className="">
              Онлайн-курс з бачати, який допоможе покращити ваші навички танцю у захопливій ігровій
              формі. Створюйте нові комбінації та розширюйте свій танцювальний словниковий запас,
              граючись і отримуючи задоволення від процесу!{' '}
            </p>

            {!session ? (
              <div className={styles.btns_wrapper}>
                <a
                  href="https://t.me/elistana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.study_link}>
                  Записатись на курс
                </a>
                <button onClick={() => signIn('google')} className={styles.study_btn}>
                  Увійти
                </button>
              </div>
            ) : (
              <div className={styles.btns_wrapper}>
                <Link href="/lessons" className={styles.study_link}>
                  Перейти до навчання
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.blocks_bg}>
        <div className="container">
          <div className={styles.blocks}>
            <div className={styles.block_ach}>
              <div className={styles.digital}>3</div>
              <div className={styles.label}>тижні марафону</div>
            </div>
            <div className={styles.block_ach}>
              <div className={styles.digital}>7</div>
              <div className={styles.label}>відеоуроків</div>
            </div>
            <div className={styles.block_ach}>
              <div className={styles.digital}>30</div>
              <div className={styles.label}> кроків</div>
            </div>
            <div className={styles.block_ach}>
              <div className={styles.digital}>40</div>
              <div className={styles.label}>комбінацій рук</div>
            </div>
            <div className={styles.block_ach}>
              <div className={styles.digital}>3</div>
              <div className={styles.label}>рівні складності</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.info}>
        <div className="container">
          <div className={styles.info_block}>
            <div className={styles.image}>
              <Image
                src="/images/dancer.png"
                alt="Bachata Dancer"
                width="832"
                height="1248"
                priority
              />
            </div>
            <div className={styles.text_part}>
              <h2>Bachata Constructor: створи свою унікальну бачату!</h2>
              <p>
                Ви коли-небудь мріяли не просто повторювати рухи з відео, а танцювати бачату у
                своєму власному стилі — жіночно, впевнено й легко імпровізуючи під музику? Уявіть:
                ви на паркеті, музика пульсує в крові, а ваші рухи — це чиста імпровізація, де кожен
                крок і кожен помах руки оживають у вашій власній історії. Ви не просто повторюєте за
                викладачем, а створюєте свою бачату — чуттєву, грайливу, незабутню. Якщо ви мрієте
                про свободу в танці, де жіночий стиль бачати стає вашим особистим полотном для
                творчості, Bachata Constructor — це ваш ключ до магії!
              </p>
              <h2>Чому цей курс — ваша танцювальна революція?</h2>
              <div className={styles.reasons}>
                <div className={styles.reason}>
                  <h5>Курс має модульний підхід:</h5>{' '}
                  <p>
                    Розберемо 30 базових кроків і 40 комбінацій рук (+ бонусні опції для натхнення).
                    Кожен елемент — як цеглинка Lego: ви вчитеся комбінувати їх у нескінченні
                    варіації, експериментуючи самостійно.
                  </p>
                </div>
                <div className={styles.reason}>
                  <h5>Імпровізація на максимум:</h5>{' '}
                  <p>
                    Курс не про &quot;запам&apos;ятай і повтори&quot;, а про &quot;спробуй, змішай,
                    експерементуй&quot;. Ви навчитеся з&apos;єднувати кроки з руками в унікальні
                    послідовності, створювати власні хореографії та імпровізувати на будь-якій
                    вечірці — без страху і з повною впевненістю!
                  </p>
                </div>
                <div className={styles.reason}>
                  <h5>Передбачено три рівні складності.</h5>
                  <p>
                    Курс підійде всім — від Beginner до Advanced. Чим вище рівень, тим складніші
                    домашні завдання. Для Advanced є додаткові ускладнення. Для новачків без досвіду
                    бачати є нульовий урок із технікою базового кроку, рук та повороту.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.schedule}>
        <div className="container">
          <div className={styles.partes}>
            <div className={styles.text_part}>
              <h2>Структура курсу</h2>
              <div className={styles.blocks}>
                <div className={styles.block}>
                  <p>Якщо ви початківець - пройдіть нульовий урок перед стартом курсу</p>
                </div>
                <div className={styles.block}>
                  <p>
                    Перші два тижні курсу вас чекає 6 уроків по 20 хвилин. Уроки будуть відкриватися
                    по понеділках, середах і п&apos;ятницях. Ви зможете переглянути їх у зручний для
                    вас час. В кожному уроці ми будемо розбирати по 5 кроків та 6-7 комбінацій рук.
                    Також для Advance (високого) рівня буде додаткове ускладення, яке можна
                    накладати на кроки.
                  </p>
                </div>
                <div className={styles.block}>
                  <p>
                    До кожного уроку, окрім пропрацювання матеріалу, у вас буде домашнє завдання
                    (інколи два) - записати невеличке відео (30-60 секунд). Це будуть творчі
                    завдання на основі пройденого матеріалу, на виконання ДЗ до кожного уроку
                    дається 3 дні.
                  </p>
                </div>
                <div className={styles.block}>
                  <p>
                    На третьому тижні ви розбираєте запропоновану мною хореографію (всього є 3
                    хореографії по одній на кожен рівень, але розібрати і вивчити ви можете усі три)
                    та здаєте в якості домашнього завдання.
                  </p>
                </div>
                <div className={styles.block}>
                  <p>
                    Також на третьому тижні ви здаєте заключну курсову роботу - вашу власну
                    хореографію.
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.image}>
              <Image
                src="/images/way.jpeg"
                alt="Bachata Dancer"
                width="345"
                height="520"
                priority
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.benefits}>
        <div className="container">
          <div className={styles.prizes}>
            <div className={styles.text_part}>
              <h2>
                {' '}
                Унікальна фішка: <br />
                Генератор Комбінацій на сайті
              </h2>
              <p>
                А тепер — справжня родзинка! На спеціальній сторінці курсу ви знайдете інтерактивний
                генератор: натисніть кнопку — і алгоритм рандомно згенерує ідеальне поєднання кроків
                і рук. Це як особистий &quot;танцювальний ШІ&quot; — для нескінченних ідей, коли
                натхнення на паузі. Експериментуйте, знімайте відео і діліться в чаті групи — разом
                ми створимо спільноту креативних бачатерок!
              </p>
            </div>
            <div className={styles.image}>
              <Image
                src="/images/prize.jpeg"
                alt="Dancу shoes as a prize"
                width="345"
                height="520"
                priority
              />
            </div>
            <div className={styles.text_part}>
              <h2>Бонуси, які надихають на перемогу</h2>
              <p>
                Знижка для дисциплінованих: Здайте всі домашні роботи вчасно — і отримайте
                ексклюзивну знижку на мій майбутній &quot;Bachata Advent Calendar 2026&quot;
                (щоденні танцювальні сюрпризи цілий місяць до Різдва!).
              </p>
              <p>
                Конкурс талантів: Авторка найцікавішої хореографії виграє безкоштовний доступ до
                календаря. Ваш твір може стати зіркою — і вашим пропуском у світ професійного танцю!{' '}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.subscribe}>
        <div className="container">
          <div className={styles.wrapper}>
            <h2>Записуйтесь на навчання</h2>
            <p>
              Готові перетворити бачату з рутини на вашу суперсилу? Не відкладайте мрію — місця
              обмежені, а перша партія уроків стартує вже скоро. Купіть курс зараз і почніть творити
              свою історію в ритмі бачати. Ваш перший крок до свободи — всього в один клік!
            </p>
            <a
              href="https://t.me/elistana"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.study_link}>
              Записатись на курс
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
