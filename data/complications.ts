import { Complication } from '../types/types'

const complications: Complication[] = [
  {
    id: '1',
    title: 'Проста синкопа',
    videoUrl: 'https://youtube.com/shorts/zuhVQKag7Xo',
    lesson: 1,
    validSteps: ['00', '1', '2', '3', '4', '5', '8', '9', '10', '15'],
  },
  {
    id: '2',
    title: 'Складна синкопа',
    videoUrl: 'https://youtube.com/shorts/kfHhojBaV34',
    lesson: 1,
    validSteps: ['00', '1', '2', '3', '9'],
  },
  {
    id: '3',
    title: 'Зсув/Патін',
    videoUrl: 'https://youtube.com/shorts/wxbAYFqYfG8',
    lesson: 2,
    validSteps: ['00', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '20'],
  },
  {
    id: '4',
    title: 'Затяжка на 3(7)',
    videoUrl: 'https://youtube.com/shorts/af493xccKaY',
    lesson: 2,
    validSteps: ['00', '1', '3', '4', '5', '6', '7', '20'],
  },
  {
    id: '5',
    title: 'Тріпл-степ',
    videoUrl: 'https://youtube.com/shorts/evDTpWiE44A',
    lesson: 3,
    validSteps: ['00', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '13', '20'],
  },
  {
    id: '6',
    title: 'Ча-ча-ча',
    videoUrl: 'https://youtube.com/shorts/3yrUCfrsDjA',
    lesson: 3,
    validSteps: ['00', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '13', '20'],
  },
  {
    id: '7',
    title: 'Дріб/складний дріб',
    videoUrl: 'https://youtube.com/shorts/zUrQW4qs_3s',
    lesson: 4,
    validSteps: ['00', '1', '2', '3', '5'],
  },
  {
    id: '8',
    title: 'Різні типи стегон',
    videoUrl: 'https://youtube.com/shorts/W_tffCBW52s',
    lesson: 5,
    validSteps: ['00', '01', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
  },
  {
    id: '9',
    title: 'Голова на 3-4 (1-2)',
    videoUrl: 'https://youtube.com/shorts/3fd7zQt-8IE',
    lesson: 6,
    validSteps: ['02', '26', '27', '28', '29'],
  },
]

export default complications
