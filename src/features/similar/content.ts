import type { SimilarQuestion, SimilarMethod } from './types.ts'
import type { ArticleBlock } from '../knowledge/types.ts'
export const similarIntro: string = "Другой производитель продает похожие украшения, использует похожий дизайн или название бренда? Разберитесь, какие права могут быть нарушены и что можно сделать для их защиты."
export const similarHint: string = "Ответьте на несколько вопросов — мы определим возможный объект интеллектуальной собственности, необходимые доказательства и подходящий способ защиты"
export const similarQuestions: SimilarQuestion[] = [
  {
    "id": "objects",
    "title": "Что именно делает другой производитель?",
    "kind": "multi",
    "options": [
      {
        "id": "jewelry",
        "label": "Продает украшение, похожее на мое"
      },
      {
        "id": "design",
        "label": "Использует мой дизайн, эскиз или рисунок"
      },
      {
        "id": "photos",
        "label": "Использует мои фотографии или изображения"
      },
      {
        "id": "name",
        "label": "Использует похожее название бренда"
      },
      {
        "id": "logo",
        "label": "Использует похожий логотип / обозначение"
      }
    ]
  },
  {
    "id": "patent",
    "title": "Есть ли у вас патент на это украшение как на промышленный образец?",
    "kind": "single",
    "options": [
      {
        "id": "yes",
        "label": "Да"
      },
      {
        "id": "no",
        "label": "Нет"
      }
    ]
  },
  {
    "id": "trademark",
    "title": "Зарегистрирован ли ваш товарный знак?",
    "kind": "single",
    "options": [
      {
        "id": "yes",
        "label": "Да"
      },
      {
        "id": "no",
        "label": "Нет"
      }
    ]
  },
  {
    "id": "evidence",
    "title": "Есть ли у вас материалы, подтверждающие создание дизайна?",
    "kind": "multi",
    "options": [
      {
        "id": "file",
        "label": "исходный файл / эскиз"
      },
      {
        "id": "messages",
        "label": "переписка"
      },
      {
        "id": "publication",
        "label": "публикация"
      },
      {
        "id": "contract",
        "label": "договор с дизайнером"
      },
      {
        "id": "process",
        "label": "фотографии процесса создания"
      },
      {
        "id": "none",
        "label": "ничего из перечисленного"
      }
    ]
  },
  {
    "id": "goal",
    "title": "Что вы хотите сделать?",
    "kind": "single",
    "options": [
      {
        "id": "evaluate",
        "label": "Понять, есть ли нарушение"
      },
      {
        "id": "record",
        "label": "Зафиксировать нарушение"
      },
      {
        "id": "stop",
        "label": "Попросить конкурента прекратить использование"
      },
      {
        "id": "compensate",
        "label": "Получить компенсацию"
      },
      {
        "id": "challenge",
        "label": "Оспорить регистрацию конкурента"
      },
      {
        "id": "court",
        "label": "Обратиться в суд"
      },
      {
        "id": "learn",
        "label": "Пока просто разобраться"
      }
    ]
  }
]
export const patentIntro: ArticleBlock[] = [
  {
    "kind": "paragraph",
    "id": "r1-intro-61",
    "sourceIndex": 61,
    "runs": [
      {
        "text": "Согласно Вашим ответам, производитель может использовать решение внешнего вида изделия, сходное с Вашим промышленным образцом."
      }
    ]
  },
  {
    "kind": "paragraph",
    "id": "r1-intro-62",
    "sourceIndex": 62,
    "runs": [
      {
        "text": "Для окончательной оценки необходимо проверить патент, его действительность, охраняемые признаки и сравнить Ваше изделие с товаром конкурента."
      }
    ]
  },
  {
    "kind": "paragraph",
    "id": "r1-intro-63",
    "sourceIndex": 63,
    "runs": [
      {
        "text": "Промышленный образец охраняет именно решение внешнего вида изделия. Среди существенных признаков закон называет форму, конфигурацию, орнамент, сочетание цветов, линии, контуры, текстуру и фактуру. Для признания использования учитывается наличие всех существенных признаков либо совокупности признаков, создающей такое же общее впечатление у информированного потребителя при сходном назначении изделий."
      }
    ],
    "unresolvedLinks": [
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_64629/c9215606f5a79df1a88066c357347f4a8d61f7c0/?utm_source=chatgpt.com",
        "reason": "Исходная ссылка охватывает только пробел; видимая подпись неоднозначна."
      }
    ]
  },
  {
    "kind": "paragraph",
    "id": "r1-intro-64",
    "sourceIndex": 64,
    "runs": [
      {
        "text": "Для детального изучения данного нарушения предлагаем ознакомиться со следующей статьей:"
      }
    ]
  },
  {
    "kind": "paragraph",
    "id": "r1-intro-65",
    "sourceIndex": 65,
    "runs": [
      {
        "text": "«"
      },
      {
        "text": "Как проверить, нарушает ли конкурент мой промышленный образец?",
        "href": "/knowledge/design-infringement"
      },
      {
        "text": "»"
      }
    ]
  },
  {
    "kind": "paragraph",
    "id": "r1-intro-68",
    "sourceIndex": 68,
    "runs": [
      {
        "text": "Если после проверки есть основания полагать, что производитель использует Ваш запатентованный промышленный образец без разрешения, вы можете рассмотреть несколько способов защиты. Их выбор зависит от цели: прекратить использование изделия, получить денежную компенсацию, изъять контрафактные товары или разрешить спор через суд."
      }
    ]
  },
  {
    "kind": "paragraph",
    "id": "r1-intro-69",
    "sourceIndex": 69,
    "runs": [
      {
        "text": "До предъявления требований убедитесь, что патент действует, Вы вправе защищать исключительное право, а действия конкурента подпадают под охрану патента."
      }
    ]
  }
]
export const patentMethods: SimilarMethod[] = [
  {
    "id": "patent-evaluate",
    "actionId": "evaluate",
    "variant": "patent",
    "title": "Понять, есть ли нарушение",
    "blocks": [
      {
        "kind": "paragraph",
        "id": "r1-evaluate-71",
        "sourceIndex": 71,
        "runs": [
          {
            "text": "Что делать:"
          }
        ]
      },
      {
        "kind": "list",
        "id": "r1-evaluate-list-72",
        "listId": "r1-evaluate",
        "ordered": false,
        "start": 1,
        "items": [
          {
            "id": "r1-evaluate-72",
            "sourceIndex": 72,
            "runs": [
              {
                "text": "Проверьте свой патент. Он должен быть выдан, действовать и принадлежать вам."
              }
            ]
          },
          {
            "id": "r1-evaluate-73",
            "sourceIndex": 73,
            "runs": [
              {
                "text": "Выпишите существенные признаки по изображениям из патента. Объём правовой охраны определяется именно ими "
              },
              {
                "text": "(п. 3 ст. 1354 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=309&date=18.10.2026&demo=2"
              },
              {
                "text": ": форма, конфигурация, орнамент, сочетание цветов и линий, контуры, текстура или фактура "
              },
              {
                "text": "(п. 1 ст. 1352 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=298&date=18.10.2026&demo=2"
              },
              {
                "text": ". Признаки, обусловленные только технической функцией (например, механнизм застежки), не являются существенными "
              },
              {
                "text": "(п. 1 и",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=299&date=18.10.2026&demo=2"
              },
              {
                "text": " "
              },
              {
                "text": "п. 5 ст. 1352 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=306&date=18.10.2026&demo=2"
              },
              {
                "text": "."
              }
            ]
          },
          {
            "id": "r1-evaluate-74",
            "sourceIndex": 74,
            "runs": [
              {
                "text": "Сравните изделия. Изделие конкурента должно содержать все существенные признаки образца или совокупность признаков, производящую на информированного потребителя такое же общее впечатление, при сходном назначении изделий "
              },
              {
                "text": "(п. 3 ст. 1358 ГК РФ).",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=321&date=18.10.2026&demo=2"
              },
              {
                "text": " Составьте таблицу: признак — ваш образец — изделие конкурента — совпадает ли."
              }
            ]
          },
          {
            "id": "r1-evaluate-76",
            "sourceIndex": 76,
            "runs": [
              {
                "text": "Проверьте способ использования: ввоз в Россию, изготовление, применение, предложение о продаже, продажа, иное введение в оборот, хранение для этих целей"
              },
              {
                "text": " (пп. 1 п. 2 ст. 1358 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=312&date=18.10.2026&demo=2"
              },
              {
                "text": "."
              }
            ]
          },
          {
            "id": "r1-evaluate-77",
            "sourceIndex": 77,
            "runs": [
              {
                "text": "Проверьте возможные исключения: личные нужды без цели получения дохода, научное исследование, продажа изделия, ранее правомерно введённого в оборот патентообладателем "
              },
              {
                "text": "(ст. 1359 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=100815&date=18.10.2026&demo=2"
              },
              {
                "text": "; собственный патент конкурента нарушения не исключает "
              },
              {
                "text": "(п. 4 ст. 1358 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=322&date=18.10.2026&demo=2"
              },
              {
                "text": "."
              }
            ]
          },
          {
            "id": "r1-evaluate-78",
            "sourceIndex": 78,
            "runs": [
              {
                "text": "Оцените риск оспаривания вашего патента: проверьте новизну и оригинальность своего образца "
              },
              {
                "text": "(п. 2 и",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=301&date=18.10.2026&demo=2"
              },
              {
                "text": " "
              },
              {
                "text": "п. 3 ст. 1352,",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=301&date=18.10.2026&demo=2"
              },
              {
                "text": " "
              },
              {
                "text": "пп. 1 п. 1 ст. 1398 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=466&date=18.10.2026&demo=2"
              },
              {
                "text": "."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "patent-record",
    "actionId": "record",
    "variant": "patent",
    "title": "Зафиксировать нарушение",
    "blocks": [
      {
        "kind": "paragraph",
        "id": "r1-record-81",
        "sourceIndex": 81,
        "runs": [
          {
            "text": "Что делать (до направления претензии):"
          }
        ]
      },
      {
        "kind": "list",
        "id": "r1-record-list-82",
        "listId": "r1-record",
        "ordered": false,
        "start": 1,
        "items": [
          {
            "id": "r1-record-82",
            "sourceIndex": 82,
            "runs": [
              {
                "text": "Сохраните свой патент и изображения образца "
              },
              {
                "text": "(п. 3 ст. 1354",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=309&date=18.10.2026&demo=2"
              },
              {
                "text": ", "
              },
              {
                "text": "п. 1 ст. 1394 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=101035&date=18.10.2026&demo=2"
              },
              {
                "text": "."
              }
            ]
          },
          {
            "id": "r1-record-83",
            "sourceIndex": 83,
            "runs": [
              {
                "text": "Купите изделие конкурента и сохраните чек, упаковку, накладную, бирки. Продажа — это способ использования образца "
              },
              {
                "text": "(пп. 1 п. 2 ст. 1358 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=313&date=18.10.2026&demo=2"
              },
              {
                "text": "."
              }
            ]
          },
          {
            "id": "r1-record-84",
            "sourceIndex": 84,
            "runs": [
              {
                "text": "Сделайте скриншоты предложений о продаже (это тоже способ использования) с датой, адресом страницы, названием продавца, ценой."
              }
            ]
          },
          {
            "id": "r1-record-85",
            "sourceIndex": 85,
            "runs": [
              {
                "text": "Если изделие импортное, соберите документы о ввозе; если видно производство или склад, зафиксируйте и это."
              }
            ]
          },
          {
            "id": "r1-record-86",
            "sourceIndex": 86,
            "runs": [
              {
                "text": "Ведите учёт по каждому способу отдельно: изготовление, продажа, хранение. Нарушением признаётся использование одного объекта одним способом "
              },
              {
                "text": "(п. 1.1 ст. 1252 ГК РФ).",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=6348&date=18.10.2026&demo=2"
              }
            ]
          },
          {
            "id": "r1-record-87",
            "sourceIndex": 87,
            "runs": [
              {
                "text": "Запишите всех участников: изготовитель, импортёр, хранитель, перевозчик, продавец "
              },
              {
                "text": "(пп. 4 п. 1 ст. 1252 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=115&date=18.10.2026&demo=2"
              },
              {
                "text": "; при совместном нарушении ответственность солидарная "
              },
              {
                "text": "(п. 6.1 ст. 1252 ГК РФ).",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=125&date=18.10.2026&demo=2"
              }
            ]
          },
          {
            "id": "r1-record-88",
            "sourceIndex": 88,
            "runs": [
              {
                "text": "Соберите данные для расчёта компенсации: цены, количество, период продаж "
              },
              {
                "text": "(п. 2 ст. 1252.1 ГК РФ).",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=6353&date=18.10.2026&demo=2"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "patent-stop",
    "actionId": "stop",
    "variant": "patent",
    "title": "Попросить конкурента прекратить использование",
    "blocks": [
      {
        "kind": "paragraph",
        "id": "r1-stop-90",
        "sourceIndex": 90,
        "runs": [
          {
            "text": "Правообладатель вправе требовать пресечения нарушающих действий от нарушителя и от иных лиц, которые могут их пресечь "
          },
          {
            "text": "(пп. 2 п. 1 ст. 1252 ГК РФ)",
            "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=112&date=18.10.2026&demo=2"
          },
          {
            "text": ". Нарушитель-предприниматель отвечает независимо от вины, а отсутствие вины не освобождает от обязанности прекратить нарушение "
          },
          {
            "text": "(п. 3 и ",
            "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=105&date=18.10.2026&demo=2"
          },
          {
            "text": "п. 5 ст. 1250 ГК РФ)",
            "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=109&date=18.10.2026&demo=2"
          },
          {
            "text": "."
          }
        ]
      },
      {
        "kind": "paragraph",
        "id": "r1-stop-91",
        "sourceIndex": 91,
        "runs": [
          {
            "text": "Что делать:"
          }
        ]
      },
      {
        "kind": "list",
        "id": "r1-stop-list-92",
        "listId": "r1-stop",
        "ordered": false,
        "start": 1,
        "items": [
          {
            "id": "r1-stop-92",
            "sourceIndex": 92,
            "runs": [
              {
                "text": "Определите адресатов: производитель, импортёр, продавец "
              },
              {
                "text": "(пп. 4 п. 1 ст. 1252 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=6347&date=18.10.2026&demo=2"
              },
              {
                "text": "."
              }
            ]
          },
          {
            "id": "r1-stop-93",
            "sourceIndex": 93,
            "runs": [
              {
                "text": "Подготовьте претензию. В неё включите: ваши данные как патентообладателя, номер патента и изображения, сравнение существенных признаков, описание действий конкурента с датами и ссылками, требования: например, прекратить изготовление, ввоз, продажу и хранение."
              }
            ]
          },
          {
            "id": "r1-stop-94",
            "sourceIndex": 94,
            "runs": [
              {
                "text": "Направьте претензию способом, подтверждающим дату отправки и получения."
              }
            ]
          },
          {
            "id": "r1-stop-95",
            "sourceIndex": 95,
            "runs": [
              {
                "text": "Дождитесь ответа. Если спор между юридическими лицами или ИП рассматривает арбитражный суд, претензия обязательна перед иском об убытках или компенсации; иск можно подать при отказе или при отсутствии ответа в течение 30 дней"
              },
              {
                "text": " (п. 5.1 ст. 1252 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=735&date=18.10.2026&demo=2"
              },
              {
                "text": ". Для требований о пресечении, изъятии контрафакта и публикации решения претензия не обязательна, но полезна как попытка решить вопрос без суда."
              }
            ]
          }
        ]
      },
      {
        "kind": "paragraph",
        "id": "r1-stop-96",
        "sourceIndex": 96,
        "runs": [
          {
            "text": "Советуем ознакомиться со статьей: “"
          },
          {
            "text": "Что делать, если конкурент не реагирует на претензию?",
            "href": "/knowledge/unanswered-claim"
          },
          {
            "text": "”"
          }
        ]
      },
      {
        "kind": "list",
        "id": "r1-stop-list-97",
        "listId": "r1-stop",
        "ordered": false,
        "start": 1,
        "items": [
          {
            "id": "r1-stop-97",
            "sourceIndex": 97,
            "runs": [
              {
                "text": "Если конкурент согласен, закрепите договорённость письменно: кто, какие действия и когда прекращает, что делает с остатками, есть ли компенсация."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "patent-compensate",
    "actionId": "compensate",
    "variant": "patent",
    "title": "Получить компенсацию",
    "blocks": [
      {
        "kind": "paragraph",
        "id": "r1-compensate-99",
        "sourceIndex": 99,
        "runs": [
          {
            "text": "Вы вправе требовать возмещения убытков "
          },
          {
            "text": "(пп. 3 п. 1 ст. 1252 ГК РФ)",
            "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=6347&date=18.10.2026&demo=2"
          },
          {
            "text": " или компенсацию вместо убытков. Компенсация за нарушение права на ПО "
          },
          {
            "text": "(ст. 1406.1 ГК РФ)",
            "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=101103&date=18.10.2026&demo=2"
          },
          {
            "text": ": от 50 тысяч до 10 миллионов рублей либо двукратная стоимость права использования образца. При компенсации доказывать размер убытков не нужно, достаточно доказать факт нарушения "
          },
          {
            "text": "(п. 1 ст. 1252.1 ГК РФ).",
            "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=6352&date=18.10.2026&demo=2"
          }
        ]
      },
      {
        "kind": "paragraph",
        "id": "r1-compensate-100",
        "sourceIndex": 100,
        "runs": [
          {
            "text": "Что делать:"
          }
        ]
      },
      {
        "kind": "list",
        "id": "r1-compensate-list-101",
        "listId": "r1-compensate",
        "ordered": false,
        "start": 1,
        "items": [
          {
            "id": "r1-compensate-101",
            "sourceIndex": 101,
            "runs": [
              {
                "text": "Выберите способ: убытки (доказываете их размер сами) или компенсация (доказываете только факт нарушения)."
              }
            ]
          },
          {
            "id": "r1-compensate-102",
            "sourceIndex": 102,
            "runs": [
              {
                "text": "Для кратной стоимости права использования подготовьте цену, которая обычно взимается за правомерное использование тем же способом "
              },
              {
                "text": "(п. 2 ст. 1252.1 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=6353&date=18.10.2026&demo=2"
              },
              {
                "text": "."
              }
            ]
          },
          {
            "id": "r1-compensate-103",
            "sourceIndex": 103,
            "runs": [
              {
                "text": "Посчитайте каждое нарушение (т.е. способ незаконного использования) отдельно "
              },
              {
                "text": "(п. 1.1 ст. 1252 ГК РФ).",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=6348&date=18.10.2026&demo=2"
              }
            ]
          },
          {
            "id": "r1-compensate-104",
            "sourceIndex": 104,
            "runs": [
              {
                "text": "Если в изделии использовано несколько результатов интеллектуальной деятельности (например, промышленный образец и товарный знак), обратите внимание на "
              },
              {
                "text": "п. 4 ст. 1252.1 ГК РФ.",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=6360&date=18.10.2026&demo=2"
              }
            ]
          },
          {
            "id": "r1-compensate-105",
            "sourceIndex": 105,
            "runs": [
              {
                "text": "Предъявите претензию "
              },
              {
                "text": "(п. 5.1 ст. 1252 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=735&date=18.10.2026&demo=2"
              },
              {
                "text": ": для иска о компенсации между юридическими лицами и ИП в арбитражном суде она обязательна."
              }
            ]
          },
          {
            "id": "r1-compensate-106",
            "sourceIndex": 106,
            "runs": [
              {
                "text": "Подайте иск. Размер компенсации определяет суд соразмерно объёму и характеру нарушения"
              },
              {
                "text": " (п. 2 ст. 1252.1 ГК РФ).",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=6354&date=18.10.2026&demo=2"
              }
            ]
          },
          {
            "id": "r1-compensate-107",
            "sourceIndex": 107,
            "runs": [
              {
                "text": "Если патента ещё нет, но заявка опубликована: за использование образца в период временной охраны вы получите вознаграждение после выдачи патента "
              },
              {
                "text": "(ст. 1392 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=101024&date=18.10.2026&demo=2"
              },
              {
                "text": "."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "patent-challenge",
    "actionId": "challenge",
    "variant": "patent",
    "title": "Оспорить регистрацию конкурента",
    "blocks": [
      {
        "kind": "paragraph",
        "id": "r1-challenge-109",
        "sourceIndex": 109,
        "runs": [
          {
            "text": "Для промышленного образца это оспаривание патента производителя - нарушителя на образец. Основания находятся в "
          },
          {
            "text": "п. 1 ст. 1398 ГК РФ",
            "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=465&date=18.10.2026&demo=2"
          },
          {
            "text": ": несоответствие условиям патентоспособности (новизна, оригинальность), правилам "
          },
          {
            "text": "п. 4 ст. 1349",
            "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=100741&date=18.10.2026&demo=2"
          },
          {
            "text": " и "
          },
          {
            "text": "ст. 1231.1 (пп. 1)",
            "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=42&date=18.10.2026&demo=2"
          },
          {
            "text": "; несоответствие документов заявки всем необходимым требованиям "
          },
          {
            "text": "(пп. 2)",
            "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=468&date=18.10.2026&demo=2"
          },
          {
            "text": "; расширение или сужение изображений после подачи заявки "
          },
          {
            "text": "(пп. 3)",
            "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=469&date=18.10.2026&demo=2"
          },
          {
            "text": "; несколько заявок с одной датой приоритета с нарушением ст. 1383 "
          },
          {
            "text": "(пп. 4)",
            "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=470&date=18.10.2026&demo=2"
          },
          {
            "text": "; неверный автор или патентообладатель "
          },
          {
            "text": "(пп. 5)",
            "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=470&date=18.10.2026&demo=2"
          },
          {
            "text": "."
          }
        ]
      },
      {
        "kind": "paragraph",
        "id": "r1-challenge-110",
        "sourceIndex": 110,
        "runs": [
          {
            "text": "Что делать:"
          }
        ]
      },
      {
        "kind": "list",
        "id": "r1-challenge-list-111",
        "listId": "r1-challenge",
        "ordered": false,
        "start": 1,
        "items": [
          {
            "id": "r1-challenge-111",
            "sourceIndex": 111,
            "runs": [
              {
                "text": "Найдите запись в государственном реестре "
              },
              {
                "text": "(п. 1 ст. 1393 ГК РФ) ",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=6106&date=18.10.2026&demo=2"
              },
              {
                "text": "и опубликованные сведения "
              },
              {
                "text": "(п. 1 ст. 1394 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=457&date=18.10.2026&demo=2"
              },
              {
                "text": "; узнайте дату приоритета (по общему правилу датой приоритета является дата подачи заявки в Роспатент) "
              },
              {
                "text": "(ст. 1381 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=100947&date=18.10.2026&demo=2"
              },
              {
                "text": ". Для ознакомления с материалами заявки доступ есть после публикации сведений о выдаче "
              },
              {
                "text": "(п. 2 ст. 1394 ГК РФ).",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=6147&date=18.10.2026&demo=2"
              }
            ]
          },
          {
            "id": "r1-challenge-112",
            "sourceIndex": 112,
            "runs": [
              {
                "text": "Сравните даты. Образец не новый, если его признаки были общедоступны (т.е. не являлись новыми и(или) оригинальными) до даты приоритета "
              },
              {
                "text": "(п. 2 ст. 1352 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=300&date=18.10.2026&demo=2"
              },
              {
                "text": ", в том числе из вашего каталога или вашей заявки с более ранним приоритетом "
              },
              {
                "text": "(п. 4 ст. 1352 ГК РФ).",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=724&date=18.10.2026&demo=2"
              }
            ]
          },
          {
            "id": "r1-challenge-113",
            "sourceIndex": 113,
            "runs": [
              {
                "text": "Соберите доказательства дат: каталоги, архив сайта, выставки, переписку, свою заявку."
              }
            ]
          },
          {
            "id": "r1-challenge-114",
            "sourceIndex": 114,
            "runs": [
              {
                "text": "Подайте возражение в федеральный орган по интеллектуальной собственности (Роспатент). По основаниям "
              },
              {
                "text": "пп. 1–4 п. 1 ст. 1398",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=466&date=18.10.2026&demo=2"
              },
              {
                "text": " это делает любое лицо, которому стало известно о нарушениях, в течение срока действия патента, а заинтересованное лицо — и после его истечения "
              },
              {
                "text": "(п. 2 ст. 1398",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=472&date=18.10.2026&demo=2"
              },
              {
                "text": ", "
              },
              {
                "text": "п. 2 ст. 1406,",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=490&date=18.10.2026&demo=2"
              },
              {
                "text": " "
              },
              {
                "text": "п. 2 и",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=739&date=18.10.2026&demo=2"
              },
              {
                "text": " "
              },
              {
                "text": "3 ст. 1248 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=100&date=18.10.2026&demo=2"
              },
              {
                "text": ". По основанию пп. 5 (не тот автор или патентообладатель) спор решает суд "
              },
              {
                "text": "(п. 2 ст. 1398, ",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=472&date=18.10.2026&demo=2"
              },
              {
                "text": "пп. 1, 2 п. 1 ст. 1406 ГК РФ).",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=101104&date=18.10.2026&demo=2"
              }
            ]
          },
          {
            "id": "r1-challenge-115",
            "sourceIndex": 115,
            "runs": [
              {
                "text": "В возражении укажите основание, приложите доказательства и сравнение изображений."
              }
            ]
          },
          {
            "id": "r1-challenge-116",
            "sourceIndex": 116,
            "runs": [
              {
                "text": "В случае удовлетворения возражений: патент аннулируется с даты подачи заявки, запись в реестре аннулируется "
              },
              {
                "text": "(п. 5 и п. 7 ст. 1398 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=480&date=18.10.2026&demo=2"
              },
              {
                "text": "; при частичном признании выдаётся новый патент "
              },
              {
                "text": "(п. 4 ст. 1398 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=477&date=18.10.2026&demo=2"
              },
              {
                "text": "; расходы возмещаются стороне, в чью пользу принято решение "
              },
              {
                "text": "(п. 2 ст. 1248 ГК РФ).",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=739&date=18.10.2026&demo=2"
              }
            ]
          },
          {
            "id": "r1-challenge-117",
            "sourceIndex": 117,
            "runs": [
              {
                "text": "Если конкурент зарегистрировал не патент, а товарный знак: это другой объект, регулируемый другими нормами; при столкновении образца и средства индивидуализации преимущество у того объекта, право на который возникло раньше "
              },
              {
                "text": "(п. 6 ст. 1252 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=119&date=18.10.2026&demo=2"
              },
              {
                "text": ": например, лицом был зарегистрирован объемный товарный знак (форма пластиковой бутылки), позже другое лицо подало заявку на промышленный образец на бутылку такой же формы. Преимущество имеет именно товарный знак, поскольку он имеет более ранний приоритет."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "patent-court",
    "actionId": "court",
    "variant": "patent",
    "title": "Обратиться в суд",
    "blocks": [
      {
        "kind": "paragraph",
        "id": "r1-court-119",
        "sourceIndex": 119,
        "runs": [
          {
            "text": "Споры о нарушении исключительного права на промышленный образец рассматривает суд "
          },
          {
            "text": "(п. 1 ст. 1248, ",
            "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=100186&date=18.10.2026&demo=2"
          },
          {
            "text": "пп. 3 п. 1 ст. 1406 ГК РФ).",
            "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=101104&date=18.10.2026&demo=2"
          }
        ]
      },
      {
        "kind": "paragraph",
        "id": "r1-court-120",
        "sourceIndex": 120,
        "runs": [
          {
            "text": "Что делать:"
          }
        ]
      },
      {
        "kind": "list",
        "id": "r1-court-list-121",
        "listId": "r1-court",
        "ordered": false,
        "start": 1,
        "items": [
          {
            "id": "r1-court-121",
            "sourceIndex": 121,
            "runs": [
              {
                "text": "Соберите пакет необходимых документов - доказательств: патент, сравнение, доказательства нарушения и объёма (см. способ “понять, если ли нарушение”, “зафиксировать нарушение”)."
              }
            ]
          },
          {
            "id": "r1-court-122",
            "sourceIndex": 122,
            "runs": [
              {
                "text": "Направьте претензию, если она обязательна "
              },
              {
                "text": "(п. 5.1 ст. 1252 ГК РФ).",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=735&date=18.10.2026&demo=2"
              }
            ]
          },
          {
            "id": "r1-court-123",
            "sourceIndex": 123,
            "runs": [
              {
                "text": "Выберите требования "
              },
              {
                "text": "(п. 1 ст. 1252 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=6346&date=18.10.2026&demo=2"
              },
              {
                "text": ": пресечение нарушения, возмещение убытков или компенсация, изъятие и уничтожение контрафактных изделий и оборудования "
              },
              {
                "text": "(п. 4 и п. 5 ст. 1252 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=6350&date=18.10.2026&demo=2"
              },
              {
                "text": ", публикация решения суда."
              }
            ]
          },
          {
            "id": "r1-court-124",
            "sourceIndex": 124,
            "runs": [
              {
                "text": "Приложите расчёт компенсации "
              },
              {
                "text": "(ст. 1252.1,",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=6352&date=18.10.2026&demo=2"
              },
              {
                "text": " "
              },
              {
                "text": "1406.1 ГК РФ).",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=6387&date=18.10.2026&demo=2"
              }
            ]
          },
          {
            "id": "r1-court-125",
            "sourceIndex": 125,
            "runs": [
              {
                "text": "Рассчитайте пошлину для подачи иска в суд. Чтобы не считать вручную по таблицам Налогового кодекса, воспользуйтесь калькулятором госпошлины: для арбитражных судов, для судов общей юрисдикции."
              }
            ]
          }
        ]
      },
      {
        "kind": "paragraph",
        "id": "r1-court-126",
        "sourceIndex": 126,
        "runs": [
          {
            "text": "Подробнее: Статья "
          },
          {
            "text": "Подсудность споров по интеллектуальным правам",
            "href": "/knowledge/ip-jurisdiction"
          }
        ]
      }
    ]
  },
  {
    "id": "patent-learn",
    "actionId": "learn",
    "variant": "patent",
    "title": "Пока просто разобраться",
    "blocks": [
      {
        "kind": "paragraph",
        "id": "r1-learn-128",
        "sourceIndex": 128,
        "runs": [
          {
            "text": "Промышленнный образец - решение внешнего вида изделия промышленного или кустарно-ремесленного производства, которое является новым и оригинальным "
          },
          {
            "text": "(п. 1 ст. 1352 ГК РФ).",
            "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=297%2C-1&date=18.10.2026&demo=2"
          }
        ]
      },
      {
        "kind": "paragraph",
        "id": "r1-learn-129",
        "sourceIndex": 129,
        "runs": [
          {
            "text": "Как он защищается: только патентом "
          },
          {
            "text": "(ст. 1353,",
            "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=100788&date=18.10.2026&demo=2"
          },
          {
            "text": " "
          },
          {
            "text": "п. 1 ст. 1363 ГК РФ).",
            "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=654&date=18.10.2026&demo=2"
          },
          {
            "text": " Приоритет определяется по дате подачи заявки в Роспатент"
          },
          {
            "text": " (п. 1 ст. 1381 ГК РФ).",
            "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=100947&date=18.10.2026&demo=2"
          }
        ]
      },
      {
        "kind": "paragraph",
        "id": "r1-learn-130",
        "sourceIndex": 130,
        "runs": [
          {
            "text": "Что считается нарушением. Использование образца без согласия патентообладателя "
          },
          {
            "text": "(п. 2 и п. 3 ст. 1358 ГК РФ).",
            "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=311&date=18.10.2026&demo=2"
          }
        ]
      },
      {
        "kind": "paragraph",
        "id": "r1-learn-131",
        "sourceIndex": 131,
        "runs": [
          {
            "text": "Что делать:"
          }
        ]
      },
      {
        "kind": "list",
        "id": "r1-learn-list-132",
        "listId": "r1-learn",
        "ordered": false,
        "start": 1,
        "items": [
          {
            "id": "r1-learn-132",
            "sourceIndex": 132,
            "runs": [
              {
                "text": "Убедитесь, что у вас есть патент. Если нет, советуем ознакомиться со статьей “"
              },
              {
                "text": "У меня нет патента на промышленный образец. Что делать?",
                "href": "/knowledge/without-patent"
              },
              {
                "text": "”."
              }
            ]
          },
          {
            "id": "r1-learn-133",
            "sourceIndex": 133,
            "runs": [
              {
                "text": "Не направляйте претензию, пока не проверили нарушение (см. способ “понять, есть ли нарушение”) и риск оспаривания вашего патента."
              }
            ]
          },
          {
            "id": "r1-learn-134",
            "sourceIndex": 134,
            "runs": [
              {
                "text": "Сохраните доказательства сразу: страницы могут исчезнуть."
              }
            ]
          },
          {
            "id": "r1-learn-135",
            "sourceIndex": 135,
            "runs": [
              {
                "text": "Ознакомьтесь со способами защиты нарушенного права и выберите оптимальный."
              }
            ]
          }
        ]
      }
    ]
  }
]
export const noPatentIntro: ArticleBlock[] = [
  {
    "kind": "paragraph",
    "id": "r2-intro-143",
    "sourceIndex": 143,
    "runs": [
      {
        "text": "Согласно Вашим ответам, производитель может использовать внешний вид изделия, сходный с Вашим. Защита именно как промышленный образец возможна только при наличии патента: исключительное право, удостоверенное патентом, защищается после регистрации и выдачи патента. Поэтому в Вашей ситуации нельзя ссылаться на нарушение патентных прав и требовать компенсацию по "
      },
      {
        "text": "ст. 1406.1 ГК РФ",
        "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=6387&date=18.10.2026&demo=2"
      },
      {
        "text": "."
      }
    ]
  },
  {
    "kind": "paragraph",
    "id": "r2-intro-144",
    "sourceIndex": 144,
    "runs": [
      {
        "text": "Дизайн при этом не остаётся без защиты. Эскиз, рисунок, 3D-модель и само авторское украшение могут охраняться авторским правом как произведения графики, дизайна и декоративно-прикладного искусства. Регистрация для этого не требуется. Но авторское право защищает конкретное произведение, а не идею и не общий стиль."
      }
    ]
  },
  {
    "kind": "paragraph",
    "id": "r2-intro-145",
    "sourceIndex": 145,
    "runs": [
      {
        "text": "Для окончательной оценки необходимо определить, что именно Вы создали и кому принадлежат права, сравнить Ваше произведение с изделием конкурента и выяснить, не истёк ли срок, в который ещё можно получить патент (12 месяцев со дня раскрытия дизайна, "
      },
      {
        "text": "п. 4 ст. 1352 ГК РФ).",
        "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=302&date=18.10.2026&demo=2"
      }
    ]
  },
  {
    "kind": "paragraph",
    "id": "r2-intro-146",
    "sourceIndex": 146,
    "runs": [
      {
        "text": "Для детального изучения предлагаем ознакомиться со статьями:"
      }
    ]
  },
  {
    "kind": "paragraph",
    "id": "r2-intro-147",
    "sourceIndex": 147,
    "runs": [
      {
        "text": "«"
      },
      {
        "text": "У меня нет патента на промышленный образец. Что делать?",
        "href": "/knowledge/without-patent"
      },
      {
        "text": "»"
      }
    ]
  },
  {
    "kind": "paragraph",
    "id": "r2-intro-148",
    "sourceIndex": 148,
    "runs": [
      {
        "text": "«"
      },
      {
        "text": "Что в ювелирном дизайне охраняется авторским правом?",
        "href": "/knowledge/copyright-protection"
      },
      {
        "text": "»"
      }
    ]
  },
  {
    "kind": "paragraph",
    "id": "r2-intro-149",
    "sourceIndex": 149,
    "runs": [
      {
        "text": "«"
      },
      {
        "text": "Конкурент скопировал мой дизайн. Как доказать нарушение авторских прав?",
        "href": "/knowledge/copyright-infringement"
      },
      {
        "text": "»"
      }
    ]
  },
  {
    "kind": "paragraph",
    "id": "r2-intro-150",
    "sourceIndex": 150,
    "runs": [
      {
        "text": "План действий:"
      }
    ]
  },
  {
    "kind": "list",
    "id": "r2-intro-list-151",
    "listId": "r2-intro",
    "ordered": false,
    "start": 1,
    "items": [
      {
        "id": "r2-intro-151",
        "sourceIndex": 151,
        "runs": [
          {
            "text": "Определите, что защищает Ваш дизайн. Если патента (охранного документа) нет, значит, основной путь — авторское право на конкретное произведение."
          }
        ]
      },
      {
        "id": "r2-intro-152",
        "sourceIndex": 152,
        "runs": [
          {
            "text": "Проверьте, есть ли нарушение. Сопоставьте Ваше произведение и изделие конкурента и определите способ использования."
          }
        ]
      },
      {
        "id": "r2-intro-153",
        "sourceIndex": 153,
        "runs": [
          {
            "text": "Зафиксируйте доказательства права и нарушения до того, как направите претензию."
          }
        ]
      },
      {
        "id": "r2-intro-154",
        "sourceIndex": 154,
        "runs": [
          {
            "text": "Выберите цель: прекращение использования, компенсация, оспаривание чужой регистрации или суд."
          }
        ]
      },
      {
        "id": "r2-intro-155",
        "sourceIndex": 155,
        "runs": [
          {
            "text": "Параллельно решите вопрос о патенте. Если с момента раскрытия дизайна прошло не больше 12 месяцев, заявку можно подать "
          },
          {
            "text": "(п. 4 ст. 1352 ГК РФ).",
            "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=302&date=18.10.2026&demo=2"
          },
          {
            "text": " Патент защитит Ваши права на будущее: права по патенту защищаются после его выдачи."
          }
        ]
      }
    ]
  }
]
export const noPatentMethods: SimilarMethod[] = [
  {
    "id": "no-patent-evaluate",
    "actionId": "evaluate",
    "variant": "no-patent",
    "title": "Понять, есть ли нарушение",
    "blocks": [
      {
        "kind": "paragraph",
        "id": "r2-evaluate-158",
        "sourceIndex": 158,
        "runs": [
          {
            "text": "Что делать:"
          }
        ]
      },
      {
        "kind": "list",
        "id": "r2-evaluate-list-159",
        "listId": "r2-evaluate",
        "ordered": false,
        "start": 1,
        "items": [
          {
            "id": "r2-evaluate-159",
            "sourceIndex": 159,
            "runs": [
              {
                "text": "Убедитесь, что у Вас есть авторское право. Автор — гражданин, творческим трудом которого создано произведение "
              },
              {
                "text": "(ст. 1257,",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=130&date=18.10.2026&demo=2"
              },
              {
                "text": " "
              },
              {
                "text": "п. 1 ст. 1228 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=100033&date=18.10.2026&demo=2"
              },
              {
                "text": ". Произведение должно быть выражено в объективной форме: рисунок, 3D-модель, изделие "
              },
              {
                "text": "(п. 3 ст. 1259 ГК РФ).",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=100269&date=18.10.2026&demo=2"
              }
            ]
          },
          {
            "id": "r2-evaluate-160",
            "sourceIndex": 160,
            "runs": [
              {
                "text": "Сравните произведение и изделие конкурента по конкретным элементам: форма, пропорции, рисунок, расположение деталей. Критерий «общего впечатления информированного потребителя» закреплён только для промышленного образца "
              },
              {
                "text": "(п. 3 ст. 1358 ГК РФ).",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=321&date=18.10.2026&demo=2"
              },
              {
                "text": " Совпадение только общего стиля или идеи нарушением не является"
              },
              {
                "text": " (п. 5 ст. 1259 ГК РФ).",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=100271&date=18.10.2026&demo=2"
              }
            ]
          },
          {
            "id": "r2-evaluate-161",
            "sourceIndex": 161,
            "runs": [
              {
                "text": "Определите способ использования: воспроизведение (в том числе изготовление в трёх измерениях экземпляра двухмерного произведения), реализация дизайнерского проекта, переработка, распространение продажей "
              },
              {
                "text": "(п. 2 ст. 1270 ГК РФ).",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=100342&date=18.10.2026&demo=2"
              }
            ]
          },
          {
            "id": "r2-evaluate-162",
            "sourceIndex": 162,
            "runs": [
              {
                "text": "Проверьте возможные исключения: воспроизведение в личных целях "
              },
              {
                "text": "(п. 1 ст. 1273 ГК РФ).",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=100364%2C2&date=18.10.2026&demo=2"
              }
            ]
          },
          {
            "id": "r2-evaluate-163",
            "sourceIndex": 163,
            "runs": [
              {
                "text": "Проверьте, не подал ли конкурент заявку или не получил ли патент на похожий образец: сведения о выдаче патентов публикуются в официальном бюллетене ("
              },
              {
                "text": "п. 1 ст. 1394 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=6119&date=18.10.2026&demo=2"
              },
              {
                "text": ", а заявки на образцы публикуются по ходатайству заявителя "
              },
              {
                "text": "(п. 4 ст. 1385 ГК РФ).",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=322&date=18.10.2026&demo=2"
              }
            ]
          },
          {
            "id": "r2-evaluate-164",
            "sourceIndex": 164,
            "runs": [
              {
                "text": "Выясните, раскрывали ли Вы дизайн и когда "
              },
              {
                "text": "(п. 2 ",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=301&date=18.10.2026&demo=2"
              },
              {
                "text": "и п. 4 ст. 1352 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=724&date=18.10.2026&demo=2"
              },
              {
                "text": ": это нужно для решения о патенте."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "no-patent-record",
    "actionId": "record",
    "variant": "no-patent",
    "title": "Зафиксировать нарушение",
    "blocks": [
      {
        "kind": "paragraph",
        "id": "r2-record-166",
        "sourceIndex": 166,
        "runs": [
          {
            "text": "Что делать:"
          }
        ]
      },
      {
        "kind": "list",
        "id": "r2-record-list-167",
        "listId": "r2-record",
        "ordered": false,
        "start": 1,
        "items": [
          {
            "id": "r2-record-167",
            "sourceIndex": 167,
            "runs": [
              {
                "text": "Соберите доказательства права: эскизы, 3D-модели, файлы с датами создания и версиями, переписку и договоры с дизайнером и мастерской "
              },
              {
                "text": "(ст. 1257,",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=130&date=18.10.2026&demo=2"
              },
              {
                "text": " "
              },
              {
                "text": "1295, ",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=100472&date=18.10.2026&demo=2"
              },
              {
                "text": "1296,",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=200&date=18.10.2026&demo=2"
              },
              {
                "text": " "
              },
              {
                "text": "п. 2 ст. 1234 ГК РФ).",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=100075&date=18.10.2026&demo=2"
              }
            ]
          },
          {
            "id": "r2-record-168",
            "sourceIndex": 168,
            "runs": [
              {
                "text": "Соберите доказательства даты, когда дизайн впервые стал известен публике: каталог, сайт, соцсети, выставка. Дата важна и для спора, и для вопроса о патенте "
              },
              {
                "text": "(п. 4 ст. 1352 ГК РФ).",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=724&date=18.10.2026&demo=2"
              }
            ]
          },
          {
            "id": "r2-record-169",
            "sourceIndex": 169,
            "runs": [
              {
                "text": "Купите изделие конкурента, сохраните чек, упаковку, накладную."
              }
            ]
          },
          {
            "id": "r2-record-170",
            "sourceIndex": 170,
            "runs": [
              {
                "text": "Сделайте скриншоты карточек товара, сайта и социальных сетей с датой и адресом страницы: размещение Ваших фото, эскизов или моделей относится к доведению до всеобщего сведения "
              },
              {
                "text": "(п. 2 ст. 1270 ГК РФ).",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=100342&date=18.10.2026&demo=2"
              }
            ]
          },
          {
            "id": "r2-record-171",
            "sourceIndex": 171,
            "runs": [
              {
                "text": "Фиксируйте каждый способ использования отдельно: изготовление, продажу, показ, импорт. Нарушением признаётся использование одного результата одним способом "
              },
              {
                "text": "(п. 1.1 ст. 1252 ГК РФ).",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=6348&date=18.10.2026&demo=2"
              }
            ]
          },
          {
            "id": "r2-record-172",
            "sourceIndex": 172,
            "runs": [
              {
                "text": "Соберите данные для расчёта компенсации: цены, количество, период продаж "
              },
              {
                "text": "(п. 2 ст. 1252.1 ГК РФ).",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=6353&date=18.10.2026&demo=2"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "no-patent-stop",
    "actionId": "stop",
    "variant": "no-patent",
    "title": "Попросить конкурента прекратить использование",
    "blocks": [
      {
        "kind": "paragraph",
        "id": "r2-stop-174",
        "sourceIndex": 174,
        "runs": [
          {
            "text": "Правообладатель вправе требовать пресечения нарушающих действий "
          },
          {
            "text": "(пп. 2 п. 1 ст. 1252 ГК РФ)",
            "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=6346&date=18.10.2026&demo=2"
          },
          {
            "text": ". Предприниматель отвечает независимо от вины, а отсутствие вины не освобождает от обязанности прекратить нарушение "
          },
          {
            "text": "(п. 3 и п. 5 ст. 1250 ГК РФ).",
            "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=103&date=18.10.2026&demo=2"
          }
        ]
      },
      {
        "kind": "paragraph",
        "id": "r2-stop-175",
        "sourceIndex": 175,
        "runs": [
          {
            "text": "Что делать:"
          }
        ]
      },
      {
        "kind": "list",
        "id": "r2-stop-list-176",
        "listId": "r2-stop",
        "ordered": false,
        "start": 1,
        "items": [
          {
            "id": "r2-stop-176",
            "sourceIndex": 176,
            "runs": [
              {
                "text": "Определите адресата: изготовитель, импортёр, продавец "
              },
              {
                "text": "(пп. 4 п. 1 ст. 1252 ГК РФ).",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=6346&date=18.10.2026&demo=2"
              }
            ]
          },
          {
            "id": "r2-stop-177",
            "sourceIndex": 177,
            "runs": [
              {
                "text": "Подготовьте претензию. Обоснуйте её авторским правом, а не патентом: укажите произведение, автора и правообладателя, даты создания и публикации, приложите сравнение и описание способов использования."
              }
            ]
          },
          {
            "id": "r2-stop-179",
            "sourceIndex": 179,
            "runs": [
              {
                "text": "Сформулируйте требования: прекратить изготовление, ввоз, продажу и показ, удалить Ваши фото и эскизы, вывести остатки из оборота."
              }
            ]
          },
          {
            "id": "r2-stop-180",
            "sourceIndex": 180,
            "runs": [
              {
                "text": "Назначьте срок для ответа. Если и Вы, и конкурент — юридические лица или ИП и спор рассматривает арбитражный суд, претензия обязательна перед иском о возмещении убытков или компенсации, иск можно подать при отказе или без ответа в течение 30 дней "
              },
              {
                "text": "(п. 5.1 ст. 1252 ГК РФ).",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=101929&date=18.10.2026&demo=2"
              }
            ]
          },
          {
            "id": "r2-stop-181",
            "sourceIndex": 181,
            "runs": [
              {
                "text": "Направьте претензию способом, подтверждающим отправку и получение."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "no-patent-compensate",
    "actionId": "compensate",
    "variant": "no-patent",
    "title": "Получить компенсацию",
    "blocks": [
      {
        "kind": "paragraph",
        "id": "r2-compensate-183",
        "sourceIndex": 183,
        "runs": [
          {
            "text": "Компенсация по "
          },
          {
            "text": "ст. 1406.1 ГК РФ",
            "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=667%2C4&date=18.10.2026&demo=2"
          },
          {
            "text": " защищает право на промышленный образец и без патента недоступна. Но автор вправе требовать по своему выбору вместо возмещения убытков "
          },
          {
            "text": "(п. 1 ст. 1301 ГК РФ):",
            "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=6376&date=18.10.2026&demo=2"
          }
        ]
      },
      {
        "kind": "paragraph",
        "id": "r2-compensate-184",
        "sourceIndex": 184,
        "runs": [
          {
            "text": "от 10 тысяч до 10 миллионов рублей;"
          }
        ]
      },
      {
        "kind": "paragraph",
        "id": "r2-compensate-185",
        "sourceIndex": 185,
        "runs": [
          {
            "text": "двукратную стоимость контрафактных экземпляров;"
          }
        ]
      },
      {
        "kind": "paragraph",
        "id": "r2-compensate-186",
        "sourceIndex": 186,
        "runs": [
          {
            "text": "двукратную стоимость права использования произведения."
          }
        ]
      },
      {
        "kind": "paragraph",
        "id": "r2-compensate-187",
        "sourceIndex": 187,
        "runs": [
          {
            "text": "При компенсации доказывать размер убытков не нужно, достаточно доказать факт нарушения "
          },
          {
            "text": "(п. 1 ст. 1252.1 ГК РФ).",
            "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=6352&date=18.10.2026&demo=2"
          },
          {
            "text": " Суд определяет размер соразмерно объёму и характеру нарушения с учётом разумности и справедливости "
          },
          {
            "text": "(п. 2 ст. 1252.1 ГК РФ).",
            "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=6353&date=18.10.2026&demo=2"
          }
        ]
      },
      {
        "kind": "paragraph",
        "id": "r2-compensate-188",
        "sourceIndex": 188,
        "runs": [
          {
            "text": "Что делать:"
          }
        ]
      },
      {
        "kind": "list",
        "id": "r2-compensate-list-189",
        "listId": "r2-compensate",
        "ordered": false,
        "start": 1,
        "items": [
          {
            "id": "r2-compensate-189",
            "sourceIndex": 189,
            "runs": [
              {
                "text": "Решите, что Вам выгоднее: убытки (размер придётся доказывать, "
              },
              {
                "text": "пп. 3 п. 1 ст. 1252 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=6346&date=18.10.2026&demo=2"
              },
              {
                "text": " или компенсация."
              }
            ]
          },
          {
            "id": "r2-compensate-190",
            "sourceIndex": 190,
            "runs": [
              {
                "text": "Рассчитайте требование по данным, собранным на шаге 2. Для кратной стоимости права использования нужна цена, которая обычно взимается за правомерное использование таким же способом."
              }
            ]
          },
          {
            "id": "r2-compensate-191",
            "sourceIndex": 191,
            "runs": [
              {
                "text": "Если в изделии использовано несколько объектов (например, дизайн и товарный знак), учитывайте "
              },
              {
                "text": "п. 4 ст. 1252.1 ГК РФ.",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=6360&date=18.10.2026&demo=2"
              }
            ]
          },
          {
            "id": "r2-compensate-192",
            "sourceIndex": 192,
            "runs": [
              {
                "text": "Если конкурент удалил информацию об авторском праве, возможна отдельная компенсация и повышенные пределы "
              },
              {
                "text": "(ст. 1300, ",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=100502&date=18.10.2026&demo=2"
              },
              {
                "text": "п. 2 ст. 1301 ГК РФ).",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=6380&date=18.10.2026&demo=2"
              }
            ]
          },
          {
            "id": "r2-compensate-193",
            "sourceIndex": 193,
            "runs": [
              {
                "text": "Направьте претензию "
              },
              {
                "text": "(п. 5.1 ст. 1252 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=101929&date=18.10.2026&demo=2"
              },
              {
                "text": " и при отказе подайте иск."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "no-patent-challenge",
    "actionId": "challenge",
    "variant": "no-patent",
    "title": "Оспорить регистрацию конкурента",
    "blocks": [
      {
        "kind": "paragraph",
        "id": "r2-challenge-195",
        "sourceIndex": 195,
        "runs": [
          {
            "text": "Оспаривать можно только то, что зарегистрировано. Авторские права не регистрируются, поэтому и оспорить ничего не получится."
          }
        ]
      }
    ]
  },
  {
    "id": "no-patent-court",
    "actionId": "court",
    "variant": "no-patent",
    "title": "Обратиться в суд",
    "blocks": [
      {
        "kind": "paragraph",
        "id": "r2-court-197",
        "sourceIndex": 197,
        "runs": [
          {
            "text": "Что делать:"
          }
        ]
      },
      {
        "kind": "list",
        "id": "r2-court-list-198",
        "listId": "r2-court",
        "ordered": false,
        "start": 1,
        "items": [
          {
            "id": "r2-court-198",
            "sourceIndex": 198,
            "runs": [
              {
                "text": "Соберите пакет: доказательства права, доказательства нарушения и его объёма (см. способ “зафиксировать нарушение”), сравнение, расчёт компенсации."
              }
            ]
          },
          {
            "id": "r2-court-199",
            "sourceIndex": 199,
            "runs": [
              {
                "text": "Направьте претензию, если она обязательна "
              },
              {
                "text": "(п. 5.1 ст. 1252 ГК РФ).",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=101929&date=18.10.2026&demo=2"
              }
            ]
          },
          {
            "id": "r2-court-200",
            "sourceIndex": 200,
            "runs": [
              {
                "text": "Определите требования"
              },
              {
                "text": " (п. 1 ст. 1252 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=6346%2C-2&date=18.10.2026&demo=2"
              },
              {
                "text": ": признание права, пресечение нарушения, возмещение убытков или компенсация, изъятие контрафактных экземпляров и оборудования, публикация решения суда "
              },
              {
                "text": "(п. 4 и п. 5 ст. 1252 ГК РФ).",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=6350&date=18.10.2026&demo=2"
              }
            ]
          },
          {
            "id": "r2-court-201",
            "sourceIndex": 201,
            "runs": [
              {
                "text": "Не заявляйте в иске требований, которые принадлежат только патентообладателю"
              },
              {
                "text": " (ст. 1406.1 ГК РФ).",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=667%2C4&date=18.10.2026&demo=2"
              }
            ]
          },
          {
            "id": "r2-court-202",
            "sourceIndex": 202,
            "runs": [
              {
                "text": "Рассчитайте пошлину для подачи иска в суд. Чтобы не считать вручную по таблицам Налогового кодекса, воспользуйтесь калькулятором госпошлины: для арбитражных судов, для судов общей юрисдикции."
              }
            ]
          }
        ]
      },
      {
        "kind": "paragraph",
        "id": "r2-court-203",
        "sourceIndex": 203,
        "runs": [
          {
            "text": "Подробнее: Статья "
          },
          {
            "text": "Подсудность споров по интеллектуальным правам",
            "href": "/knowledge/ip-jurisdiction"
          }
        ]
      },
      {
        "kind": "list",
        "id": "r2-court-list-204",
        "listId": "r2-court",
        "ordered": false,
        "start": 1,
        "items": [
          {
            "id": "r2-court-204",
            "sourceIndex": 204,
            "runs": [
              {
                "text": "Оценку творческого характера произведения и сходства даёт суд, для этого могут понадобиться специальные знания."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "no-patent-learn",
    "actionId": "learn",
    "variant": "no-patent",
    "title": "Пока просто разобраться",
    "blocks": [
      {
        "kind": "paragraph",
        "id": "r2-learn-206",
        "sourceIndex": 206,
        "runs": [
          {
            "text": "Внешний вид изделия как промышленный образец защищается только патентом "
          },
          {
            "text": "(ст. 1353,",
            "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=100788&date=18.10.2026&demo=2"
          },
          {
            "text": " "
          },
          {
            "text": "п. 1 ст. 1363 ГК РФ)",
            "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=654&date=18.10.2026&demo=2"
          },
          {
            "text": ". Без патента Вы можете защищаться как автор конкретного произведения "
          },
          {
            "text": "(ст. 1259 ГК РФ)",
            "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=100252%2C1&date=18.10.2026&demo=2"
          },
          {
            "text": ", а название и логотип защищать товарным знаком "
          },
          {
            "text": "(п. 1 ст. 1477 ГК РФ)",
            "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=6233&date=18.10.2026&demo=2"
          },
          {
            "text": ". Патент по-прежнему можно получить, если с момента раскрытия дизайна не прошло больше 12 месяцев "
          },
          {
            "text": "(п. 4 ст. 1352 ГК РФ).",
            "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=724&date=18.10.2026&demo=2"
          }
        ]
      },
      {
        "kind": "paragraph",
        "id": "r2-learn-207",
        "sourceIndex": 207,
        "runs": [
          {
            "text": "Что сделать:"
          }
        ]
      },
      {
        "kind": "list",
        "id": "r2-learn-list-208",
        "listId": "r2-learn",
        "ordered": false,
        "start": 1,
        "items": [
          {
            "id": "r2-learn-208",
            "sourceIndex": 208,
            "runs": [
              {
                "text": "Не раскрывайте новые дизайны (не публикуйте, не показывайте, не продавайте) до подачи заявки на патент."
              }
            ]
          },
          {
            "id": "r2-learn-209",
            "sourceIndex": 209,
            "runs": [
              {
                "text": "Сохраните эскизы, модели, файлы, переписку и скриншоты нарушения."
              }
            ]
          },
          {
            "id": "r2-learn-210",
            "sourceIndex": 210,
            "runs": [
              {
                "text": "Выясните, кто автор Вашего изделия."
              }
            ]
          },
          {
            "id": "r2-learn-211",
            "sourceIndex": 211,
            "runs": [
              {
                "text": "Установите дату первого раскрытия дизайна."
              }
            ]
          },
          {
            "id": "r2-learn-212",
            "sourceIndex": 212,
            "runs": [
              {
                "text": "Решите, нужен ли Вам патент, и вернитесь к способам защиты 2–6."
              }
            ]
          }
        ]
      }
    ]
  }
]
export const copyrightIntro: ArticleBlock[] = [
  {
    "kind": "paragraph",
    "id": "r3-intro-215",
    "sourceIndex": 215,
    "runs": [
      {
        "text": "Если дизайн был создан творческим трудом и конкурент воспроизводит охраняемое произведение без разрешения правообладателя, может возникнуть нарушение авторских прав."
      }
    ]
  },
  {
    "kind": "paragraph",
    "id": "r3-intro-216",
    "sourceIndex": 216,
    "runs": [
      {
        "text": "Произведения дизайна и декоративно-прикладного искусства прямо относятся к объектам авторского права"
      },
      {
        "text": " (п. 1 ст. 1259 ГК РФ)",
        "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=100253&date=16.10.2026&demo=2"
      },
      {
        "text": ". При этом охраняется конкретное произведение, выраженное в объективной форме"
      },
      {
        "text": " (п. 3 ст. 1259 ГК РФ)",
        "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=100268&date=16.10.2026&demo=2"
      },
      {
        "text": ", а не сама идея или общая концепция"
      },
      {
        "text": " (п. 5 ст. 1259 ГК РФ)",
        "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=672&date=16.10.2026&demo=2"
      },
      {
        "text": ". Регистрация произведения не нужна"
      },
      {
        "text": " (п. 4 ст. 1259 ГК РФ)",
        "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=100269&date=16.10.2026&demo=2"
      },
      {
        "text": ", но авторство и факт использования придётся доказывать самостоятельно."
      }
    ]
  },
  {
    "kind": "paragraph",
    "id": "r3-intro-217",
    "sourceIndex": 217,
    "runs": [
      {
        "text": "Для окончательной оценки необходимо определить, что именно Вы создали и кому принадлежат права, какие элементы изделия совпадают с Вашим произведением и какое действие совершает конкурент. Отдельно проверьте, есть ли у Вас патент на промышленный образец или зарегистрированный товарный знак: они дают дополнительные способы защиты."
      }
    ]
  },
  {
    "kind": "paragraph",
    "id": "r3-intro-218",
    "sourceIndex": 218,
    "runs": [
      {
        "text": "Для детального изучения предлагаем ознакомиться со статьями:"
      }
    ]
  },
  {
    "kind": "paragraph",
    "id": "r3-intro-219",
    "sourceIndex": 219,
    "runs": [
      {
        "text": "«"
      },
      {
        "text": "Что в ювелирном дизайне охраняется авторским правом?",
        "href": "/knowledge/copyright-protection"
      },
      {
        "text": "»"
      }
    ]
  },
  {
    "kind": "paragraph",
    "id": "r3-intro-220",
    "sourceIndex": 220,
    "runs": [
      {
        "text": "«"
      },
      {
        "text": "Конкурент скопировал мой дизайн. Как доказать нарушение авторских прав?",
        "href": "/knowledge/copyright-infringement"
      },
      {
        "text": "»"
      }
    ]
  },
  {
    "kind": "paragraph",
    "id": "r3-intro-221",
    "sourceIndex": 221,
    "runs": [
      {
        "text": "«"
      },
      {
        "text": "У меня нет патента на промышленный образец. Что делать?",
        "href": "/knowledge/without-patent"
      },
      {
        "text": "»"
      }
    ]
  },
  {
    "kind": "paragraph",
    "id": "r3-intro-222",
    "sourceIndex": 222,
    "runs": [
      {
        "text": "План действий:"
      }
    ]
  },
  {
    "kind": "list",
    "id": "r3-intro-list-223",
    "listId": "r3-intro",
    "ordered": false,
    "start": 1,
    "items": [
      {
        "id": "r3-intro-223",
        "sourceIndex": 223,
        "runs": [
          {
            "text": "Подтвердите, что у Вас есть авторское право и что права принадлежат Вам: как автору, работодателю или заказчику."
          }
        ]
      },
      {
        "id": "r3-intro-224",
        "sourceIndex": 224,
        "runs": [
          {
            "text": "Сопоставьте произведение с изделием конкурента по конкретным элементам и определите способ использования."
          }
        ]
      },
      {
        "id": "r3-intro-225",
        "sourceIndex": 225,
        "runs": [
          {
            "text": "Зафиксируйте доказательства права и нарушения до того, как направите претензию."
          }
        ]
      },
      {
        "id": "r3-intro-226",
        "sourceIndex": 226,
        "runs": [
          {
            "text": "Выберите цель: прекращение использования, компенсация, судебная защита прав."
          }
        ]
      },
      {
        "id": "r3-intro-227",
        "sourceIndex": 227,
        "runs": [
          {
            "text": "Решите вопрос о патенте на промышленный образец и товарном знаке. Если с момента раскрытия дизайна прошло не больше 12 месяцев, то заявку на образец можно подать "
          },
          {
            "text": "(п. 4 ст. 1352 ГК РФ).",
            "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=302&date=18.10.2026&demo=2"
          }
        ]
      }
    ]
  }
]
export const copyrightMethods: SimilarMethod[] = [
  {
    "id": "copyright-evaluate",
    "actionId": "evaluate",
    "variant": "copyright",
    "title": "Понять, есть ли нарушение",
    "blocks": [
      {
        "kind": "paragraph",
        "id": "r3-evaluate-230",
        "sourceIndex": 230,
        "runs": [
          {
            "text": "Что делать:"
          }
        ]
      },
      {
        "kind": "list",
        "id": "r3-evaluate-list-231",
        "listId": "r3-evaluate",
        "ordered": false,
        "start": 1,
        "items": [
          {
            "id": "r3-evaluate-231",
            "sourceIndex": 231,
            "runs": [
              {
                "text": "Убедитесь, что Вы автор или правообладатель. Автор — гражданин, творческим трудом которого создано произведение"
              },
              {
                "text": " (ст. 1257 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=130&date=16.10.2026&demo=2"
              },
              {
                "text": ". Тот, кто оказал лишь техническое, консультационное, организационное или материальное содействие, автором не признаётся"
              },
              {
                "text": " (п. 1 ст. 1228 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=100034&date=16.10.2026&demo=2"
              },
              {
                "text": ". Высокий художественный уровень закон не требует, творческий характер оценивает суд."
              }
            ]
          },
          {
            "id": "r3-evaluate-232",
            "sourceIndex": 232,
            "runs": [
              {
                "text": "Проверьте, кому принадлежат права. Служебное произведение: исключительное право у работодателя, если договор не предусматривает иное"
              },
              {
                "text": " (п. 2 ст. 1295 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=195&date=16.10.2026&demo=2"
              },
              {
                "text": ". Произведение по заказу: исключительное право у заказчика, если договор не предусматривает иное"
              },
              {
                "text": " (п. 1 ст. 1296 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=201&date=16.10.2026&demo=2"
              },
              {
                "text": ". Договор об отчуждении исключительного права заключается письменно, иначе он недействителен"
              },
              {
                "text": " (п. 2 ст. 1234 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=100075&date=16.10.2026&demo=2"
              },
              {
                "text": "."
              }
            ]
          },
          {
            "id": "r3-evaluate-233",
            "sourceIndex": 233,
            "runs": [
              {
                "text": "Сопоставьте Ваше произведение (эскиз, модель, изделие) и изделие конкурента по конкретным элементам: форма, пропорции, рисунок, расположение деталей. Совпадение только общего стиля, мотива или идеи нарушением не является "
              },
              {
                "text": "(п. 5 ст. 1259 ГК РФ).",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=100271&date=18.10.2026&demo=2"
              },
              {
                "text": " Критерий «общего впечатления информированного потребителя» закреплён только для промышленного образца "
              },
              {
                "text": "(п. 3 ст. 1358 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=318&date=18.10.2026&demo=2"
              },
              {
                "text": ", для авторского права он не применяется."
              }
            ]
          },
          {
            "id": "r3-evaluate-234",
            "sourceIndex": 234,
            "runs": [
              {
                "text": "Определите способ использования"
              },
              {
                "text": " (п. 2 ст. 1270 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=100343&date=16.10.2026&demo=2"
              },
              {
                "text": ": воспроизведение (в том числе изготовление в трёх измерениях экземпляра двухмерного произведения), распространение продажей, импорт, переработка"
              },
              {
                "text": " (пп. 9)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=100352&date=16.10.2026&demo=2"
              },
              {
                "text": ", практическая реализация дизайнерского проекта, доведение до всеобщего сведения (публикация на сайте или в соцсети)."
              }
            ]
          },
          {
            "id": "r3-evaluate-235",
            "sourceIndex": 235,
            "runs": [
              {
                "text": "Проверьте исключения: перепродажа изделий, которые Вы сами ввели в оборот"
              },
              {
                "text": " (ст. 1272 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=150&date=16.10.2026&demo=2"
              },
              {
                "text": "; воспроизведение в личных целях"
              },
              {
                "text": " (п. 1 ст. 1273 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=9&date=16.10.2026&demo=2"
              },
              {
                "text": "."
              }
            ]
          },
          {
            "id": "r3-evaluate-236",
            "sourceIndex": 236,
            "runs": [
              {
                "text": "Проверьте информацию об авторском праве: название коллекции, клеймо, имя дизайнера, логотип на бирке"
              },
              {
                "text": " (п. 1 ст. 1300 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=100502&date=16.10.2026&demo=2"
              },
              {
                "text": "."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "copyright-record",
    "actionId": "record",
    "variant": "copyright",
    "title": "Зафиксировать нарушение",
    "blocks": [
      {
        "kind": "paragraph",
        "id": "r3-record-238",
        "sourceIndex": 238,
        "runs": [
          {
            "text": "Что делать:"
          }
        ]
      },
      {
        "kind": "list",
        "id": "r3-record-list-239",
        "listId": "r3-record",
        "ordered": false,
        "start": 1,
        "items": [
          {
            "id": "r3-record-239",
            "sourceIndex": 239,
            "runs": [
              {
                "text": "Докажите авторство: эскизы, рисунки и 3D-модели с датами создания, версиями и метаданными файлов; переписка с дизайнером, мастерской и подрядчиками; доказательства первого показа или публикации (каталог, сайт, социальные сети), чтобы показать, что Ваш дизайн появился раньше изделия конкурента. Лицо, указанное автором на оригинале или экземпляре, считается автором, пока не доказано иное"
              },
              {
                "text": " (ст. 1257 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=130&date=16.10.2026&demo=2"
              },
              {
                "text": "."
              }
            ]
          },
          {
            "id": "r3-record-240",
            "sourceIndex": 240,
            "runs": [
              {
                "text": "Подтвердите, что права принадлежат Вам: трудовой договор, договор заказа, договор об отчуждении исключительного права "
              },
              {
                "text": "(п. 1 ст. 1296,",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=201&date=18.10.2026&demo=2"
              },
              {
                "text": " "
              },
              {
                "text": "п. 2 ст. 1295, ",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=100472&date=18.10.2026&demo=2"
              },
              {
                "text": "п. 2 ст. 1234 ГК РФ).",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=100075&date=18.10.2026&demo=2"
              }
            ]
          },
          {
            "id": "r3-record-241",
            "sourceIndex": 241,
            "runs": [
              {
                "text": "Зафиксируйте использование отдельно по каждому способу: производство, продажа, публикация. Нарушением признаётся незаконное использование одного произведения одним из способов"
              },
              {
                "text": " (п. 1.1 ст. 1252 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=116&date=16.10.2026&demo=2"
              },
              {
                "text": ". Доказательства: скриншоты с адресом страницы и датой, контрольная закупка (чек, упаковка, видео вскрытия), образцы изделий, накладные, документы о ввозе, нотариальный протокол осмотра страницы."
              }
            ]
          },
          {
            "id": "r3-record-242",
            "sourceIndex": 242,
            "runs": [
              {
                "text": "Составьте таблицу сравнения «элемент Вашего произведения — элемент изделия конкурента». Выделите совпадения: нетипичные детали, одинаковое расположение элементов, совпадающие размеры. Покажите, что конкурент мог получить доступ к Вашему дизайну: публикации, каталог, общий подрядчик, переписка."
              }
            ]
          },
          {
            "id": "r3-record-243",
            "sourceIndex": 243,
            "runs": [
              {
                "text": "Соберите данные для компенсации: цены, количество и период продаж конкурента, \\"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "copyright-stop",
    "actionId": "stop",
    "variant": "copyright",
    "title": "Попросить конкурента прекратить использование",
    "blocks": [
      {
        "kind": "paragraph",
        "id": "r3-stop-245",
        "sourceIndex": 245,
        "runs": [
          {
            "text": "Что делать:"
          }
        ]
      },
      {
        "kind": "list",
        "id": "r3-stop-list-246",
        "listId": "r3-stop",
        "ordered": false,
        "start": 1,
        "items": [
          {
            "id": "r3-stop-246",
            "sourceIndex": 246,
            "runs": [
              {
                "text": "Направьте претензию. Для требований о пресечении нарушения, изъятии контрафакта и публикации решения суда она не обязательна, но рекомендуем направить: это показывает, что нарушитель знал о Ваших правах"
              },
              {
                "text": " (п. 5.1 ст. 1252 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=735&date=16.10.2026&demo=2"
              },
              {
                "text": ". Предприниматель отвечает за нарушение независимо от вины, если не докажет непреодолимую силу"
              },
              {
                "text": " (п. 3 ст. 1250 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=106&date=16.10.2026&demo=2"
              },
              {
                "text": "; если же он не знал и не должен был знать о нарушении, суд может снизить компенсацию "
              },
              {
                "text": "(п. 7 ст. 1252.1 ГК РФ).",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=6366&date=18.10.2026&demo=2"
              }
            ]
          },
          {
            "id": "r3-stop-247",
            "sourceIndex": 247,
            "runs": [
              {
                "text": "Что требовать: прекратить производство, продажу и публикацию; снять карточки и публикации; изъять из оборота и уничтожить контрафактные экземпляры и оборудование, используемое для нарушения"
              },
              {
                "text": " (п. 4 ст. 1252 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=6350&date=16.10.2026&demo=2"
              },
              {
                "text": "; прекратить распространение экземпляров с удалённой информацией об авторском праве "
              },
              {
                "text": "(пп. 2 п. 2 ст. 1300 ГК РФ); ",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=100504&date=18.10.2026&demo=2"
              },
              {
                "text": "выплатить компенсацию."
              }
            ]
          },
          {
            "id": "r3-stop-248",
            "sourceIndex": 248,
            "runs": [
              {
                "text": "Кому адресовать: изготовителю, импортёру, хранителю, перевозчику, продавцу, иному распространителю, недобросовестному приобретателю"
              },
              {
                "text": " (пп. 4 п. 1 ст. 1252 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=6347&date=16.10.2026&demo=2"
              },
              {
                "text": ". Если нарушение совершено несколькими лицами совместно, они отвечают солидарно"
              },
              {
                "text": " (п. 6.1 ст. 1252 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=125&date=16.10.2026&demo=2"
              },
              {
                "text": "."
              }
            ]
          },
          {
            "id": "r3-stop-249",
            "sourceIndex": 249,
            "runs": [
              {
                "text": "Если копирование в интернете, направьте площадке или хостингу письменное заявление с точным адресом страницы. Посредник не отвечает, если не знал о нарушении и после заявления своевременно принял необходимые меры; без ответственности к нему можно предъявить требование об удалении информации или об ограничении доступа"
              },
              {
                "text": " (п. 3 и 4 ст. 1253.1 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=21&date=16.10.2026&demo=2"
              },
              {
                "text": "."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "copyright-compensate",
    "actionId": "compensate",
    "variant": "copyright",
    "title": "Получить компенсацию",
    "blocks": [
      {
        "kind": "paragraph",
        "id": "r3-compensate-251",
        "sourceIndex": 251,
        "runs": [
          {
            "text": "Что делать:"
          }
        ]
      },
      {
        "kind": "list",
        "id": "r3-compensate-list-252",
        "listId": "r3-compensate",
        "ordered": false,
        "start": 1,
        "items": [
          {
            "id": "r3-compensate-252",
            "sourceIndex": 252,
            "runs": [
              {
                "text": "Выберите между убытками и компенсацией. Компенсация взыскивается при доказанности факта правонарушения, размер убытков доказывать не нужно"
              },
              {
                "text": " (п. 1 ст. 1252.1 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=6352&date=16.10.2026&demo=2"
              },
              {
                "text": "."
              }
            ]
          },
          {
            "id": "r3-compensate-253",
            "sourceIndex": 253,
            "runs": [
              {
                "text": "Выберите способ расчёта"
              },
              {
                "text": " (п. 1 ст. 1301 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=6376&date=16.10.2026&demo=2"
              },
              {
                "text": ": от 10 тысяч до 10 миллионов рублей; двукратная стоимость контрафактных экземпляров; двукратная стоимость права использования произведения, исходя из цены, которая при сравнимых обстоятельствах обычно взимается за правомерное использование тем же способом. В "
              },
              {
                "text": "деле Joser",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=MARB&n=3132232&rnd=Fjp83w"
              },
              {
                "text": " продажи контрафактных украшений составили около 8,6 млн рублей, а суд взыскал компенсацию в двукратном размере, 17,3 млн рублей."
              }
            ]
          },
          {
            "id": "r3-compensate-254",
            "sourceIndex": 254,
            "runs": [
              {
                "text": "Суд определяет размер соразмерно объёму и характеру нарушения с учётом разумности и справедливости"
              },
              {
                "text": " (п. 2 ст. 1252.1 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=6357&date=16.10.2026&demo=2"
              },
              {
                "text": ". Если выбранный способ не подходит, суд может присудить компенсацию в твёрдом размере"
              },
              {
                "text": " (п. 3 ст. 1252.1 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=6358&date=16.10.2026&demo=2"
              },
              {
                "text": ". Если в одном изделии использованы несколько объектов интеллектуальной собственности, действует"
              },
              {
                "text": " п. 4 ст. 1252.1 ГК РФ",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=6360&date=16.10.2026&demo=2"
              },
              {
                "text": "."
              }
            ]
          },
          {
            "id": "r3-compensate-255",
            "sourceIndex": 255,
            "runs": [
              {
                "text": "Учтите, что производство, продажа и публикация могут оцениваться как разные нарушения"
              },
              {
                "text": " (п. 1.1 ст. 1252 ГК РФ).",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=6348&date=18.10.2026&demo=2"
              }
            ]
          },
          {
            "id": "r3-compensate-256",
            "sourceIndex": 256,
            "runs": [
              {
                "text": "Если конкурент докажет, что не знал и не должен был знать о нарушении, суд может назначить от 10 тысяч до 500 тысяч рублей или от одно- до двукратной стоимости "
              },
              {
                "text": "(п. 7 ст. 1252.1 ГК РФ). ",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=100219&date=18.10.2026&demo=2"
              },
              {
                "text": "Претензия лишает его довода о неосведомлённости."
              }
            ]
          },
          {
            "id": "r3-compensate-257",
            "sourceIndex": 257,
            "runs": [
              {
                "text": "Если нарушены личные права автора (авторство, имя, неприкосновенность произведения), автор вправе требовать компенсации морального вреда "
              },
              {
                "text": "(п. 1 ст. 1251 ГК РФ).",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=100199&date=18.10.2026&demo=2"
              }
            ]
          },
          {
            "id": "r3-compensate-258",
            "sourceIndex": 258,
            "runs": [
              {
                "text": "Направьте претензию: если Вы и нарушитель юридические лица и(или) ИП и спор рассматривает арбитражный суд, до иска о компенсации она обязательна, иск возможен при отказе или отсутствии ответа в течение 30 дней"
              },
              {
                "text": " (п. 5.1 ст. 1252 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=735&date=16.10.2026&demo=2"
              },
              {
                "text": "."
              }
            ]
          },
          {
            "id": "r3-compensate-260",
            "sourceIndex": 260,
            "runs": [
              {
                "text": "Параллельно можно требовать изъятия и уничтожения контрафакта, публикации решения суда "
              },
              {
                "text": "(пп. 5 п. 1 ст. 1252 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=115&date=18.10.2026&demo=2"
              },
              {
                "text": ", а при неоднократных или грубых нарушениях закон допускает ликвидацию юридического лица или прекращение деятельности ИП "
              },
              {
                "text": "(ст. 1253 ГК РФ).",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=716&date=18.10.2026&demo=2"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "copyright-challenge",
    "actionId": "challenge",
    "variant": "copyright",
    "title": "Оспорить регистрацию конкурента",
    "blocks": [
      {
        "kind": "paragraph",
        "id": "r3-challenge-262",
        "sourceIndex": 262,
        "runs": [
          {
            "text": "Авторское право не требует регистрации, поэтому оспаривать можно только чужую регистрацию, основанную на Вашем дизайне: патент на промышленный образец или товарный знак."
          }
        ]
      }
    ]
  },
  {
    "id": "copyright-court",
    "actionId": "court",
    "variant": "copyright",
    "title": "Обратиться в суд",
    "blocks": [
      {
        "kind": "paragraph",
        "id": "r3-court-264",
        "sourceIndex": 264,
        "runs": [
          {
            "text": "Что делать:"
          }
        ]
      },
      {
        "kind": "list",
        "id": "r3-court-list-265",
        "listId": "r3-court",
        "ordered": false,
        "start": 1,
        "items": [
          {
            "id": "r3-court-265",
            "sourceIndex": 265,
            "runs": [
              {
                "text": "Определите требования "
              },
              {
                "text": "(п. 1 ст. 1252 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=6346&date=18.10.2026&demo=2"
              },
              {
                "text": ": пресечь нарушение; взыскать убытки или компенсацию "
              },
              {
                "text": "(ст. 1252.1,",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=6352&date=18.10.2026&demo=2"
              },
              {
                "text": " п. 1 ст. 1301 ГК РФ",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=6376&date=16.10.2026&demo=2"
              },
              {
                "text": "); изъять и уничтожить контрафакт; опубликовать решение суда; признать право, если Ваше авторство или права оспариваются."
              }
            ]
          },
          {
            "id": "r3-court-266",
            "sourceIndex": 266,
            "runs": [
              {
                "text": "Пройдите претензионный порядок, если он обязателен: для требований о компенсации и убытках между юридическими лицами и(или) ИП в арбитражном суде иск возможен после отказа или отсутствия ответа в течение 30 дней со дня направления претензии"
              },
              {
                "text": " (п. 5.1 ст. 1252 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=735&date=16.10.2026&demo=2"
              },
              {
                "text": "."
              }
            ]
          },
          {
            "id": "r3-court-267",
            "sourceIndex": 267,
            "runs": [
              {
                "text": "Если нарушение совершено несколькими лицами, предъявляйте требования ко всем "
              },
              {
                "text": "(п. 6.1 ст. 1252, п. 8 ст. 1252.1 ГК РФ).",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=125&date=18.10.2026&demo=2"
              }
            ]
          },
          {
            "id": "r3-court-268",
            "sourceIndex": 268,
            "runs": [
              {
                "text": "Рассчитайте пошлину за подачу иска. Чтобы не считать вручную по таблицам Налогового кодекса, воспользуйтесь калькулятором госпошлины: для арбитражных судов, для судов общей юрисдикции."
              }
            ]
          }
        ]
      },
      {
        "kind": "paragraph",
        "id": "r3-court-269",
        "sourceIndex": 269,
        "runs": [
          {
            "text": "Подробнее: статья "
          },
          {
            "text": "Подсудность споров по интеллектуальным правам",
            "href": "/knowledge/ip-jurisdiction"
          }
        ]
      }
    ]
  },
  {
    "id": "copyright-learn",
    "actionId": "learn",
    "variant": "copyright",
    "title": "Пока просто разобраться",
    "blocks": [
      {
        "kind": "paragraph",
        "id": "r3-learn-271",
        "sourceIndex": 271,
        "runs": [
          {
            "text": "Что делать:"
          }
        ]
      },
      {
        "kind": "list",
        "id": "r3-learn-list-272",
        "listId": "r3-learn",
        "ordered": false,
        "start": 1,
        "items": [
          {
            "id": "r3-learn-272",
            "sourceIndex": 272,
            "runs": [
              {
                "text": "Поймите, что именно охраняется: конкретное произведение (эскиз, рисунок, 3D-модель, авторское украшение, фотография, текст каталога, логотип как рисунок); идея, стиль и общая концепция не охраняются"
              },
              {
                "text": " (п. 1 ст. 1259 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=100253&date=16.10.2026&demo=2"
              },
              {
                "text": ","
              },
              {
                "text": " (п. 5 ст. 1259 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=672&date=16.10.2026&demo=2"
              },
              {
                "text": ". Подробнее: статья «"
              },
              {
                "text": "Что в ювелирном дизайне охраняется авторским правом?",
                "href": "/knowledge/copyright-protection"
              },
              {
                "text": "»."
              }
            ]
          },
          {
            "id": "r3-learn-273",
            "sourceIndex": 273,
            "runs": [
              {
                "text": "Узнайте, как возникает право: с момента создания, без регистрации"
              },
              {
                "text": " (п. 4 ст. 1259 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=100269&date=16.10.2026&demo=2"
              },
              {
                "text": "; автор — гражданин"
              },
              {
                "text": " (ст. 1257 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=130&date=16.10.2026&demo=2"
              },
              {
                "text": "; права на служебное произведение и произведение по заказу распределяются по договору"
              },
              {
                "text": " (ст. 1295, ",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=100471%2C1&date=18.10.2026&demo=2"
              },
              {
                "text": "1296 ГК РФ).",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=201&date=18.10.2026&demo=2"
              }
            ]
          },
          {
            "id": "r3-learn-274",
            "sourceIndex": 274,
            "runs": [
              {
                "text": "Узнайте, какие права Вы имеете: исключительное, то есть использовать произведение и распоряжаться правом"
              },
              {
                "text": " (п. 1 ст. 1270 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=100342&date=16.10.2026&demo=2"
              },
              {
                "text": ", и личные: авторство, имя, неприкосновенность произведения"
              },
              {
                "text": " (ст. 1265 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=100324&date=16.10.2026&demo=2"
              },
              {
                "text": ","
              },
              {
                "text": " (п. 1 ст. 1266 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=100326&date=16.10.2026&demo=2"
              },
              {
                "text": ". Право авторства и право на имя неотчуждаемы"
              },
              {
                "text": " (п. 2 ст. 1228 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=100035&date=16.10.2026&demo=2"
              },
              {
                "text": "."
              }
            ]
          },
          {
            "id": "r3-learn-275",
            "sourceIndex": 275,
            "runs": [
              {
                "text": "Помните об ограничениях: исчерпание права "
              },
              {
                "text": "(ст. 1272 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=150&date=18.10.2026&demo=2"
              },
              {
                "text": ", личные цели "
              },
              {
                "text": "(п. 1 ст. 1273 ГК РФ).",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=100364%2C2&date=18.10.2026&demo=2"
              },
              {
                "text": " Срок охраны — жизнь автора и 70 лет"
              },
              {
                "text": " (п. 1 ст. 1281 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=100406&date=16.10.2026&demo=2"
              },
              {
                "text": "."
              }
            ]
          }
        ]
      }
    ]
  }
]
export const trademarkIntro: ArticleBlock[] = [
  {
    "kind": "paragraph",
    "id": "r4-intro-281",
    "sourceIndex": 281,
    "runs": [
      {
        "text": "Конкурент использует обозначение, которое может быть сходным с вашим товарным знаком. Проверьте регистрацию знака, перечень товаров и способ использования обозначения."
      }
    ]
  },
  {
    "kind": "paragraph",
    "id": "r4-intro-282",
    "sourceIndex": 282,
    "runs": [
      {
        "text": "Нарушением признаётся не любое похожее оформление, а использование без вашего разрешения тождественного или сходного до степени смешения обозначения для тех же или однородных товаров, когда покупатель может ошибиться и принять изделие конкурента за ваше или связанное с вами ("
      },
      {
        "text": "п. 3 ст. 1484",
        "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=101535"
      },
      {
        "text": " ГК РФ)."
      }
    ]
  },
  {
    "kind": "paragraph",
    "id": "r4-intro-283",
    "sourceIndex": 283,
    "runs": [
      {
        "text": "Исключительное право на товарный знак принадлежит тому, на чьё имя знак зарегистрирован ("
      },
      {
        "text": "п. 1 ст. 1484",
        "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=101527%2C2"
      },
      {
        "text": " ГК РФ), действует в отношении товаров, указанных в свидетельстве ("
      },
      {
        "text": "п. 2 ст. 1481",
        "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=101490"
      },
      {
        "text": " ГК РФ), и только на территории России ("
      },
      {
        "text": "ст. 1479",
        "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=101486"
      },
      {
        "text": " ГК РФ). Поэтому проверка начинается с регистрации, перечня товаров и способа, которым конкурент использует обозначение. Для детального изучения предлагаем ознакомиться со статьями:"
      }
    ]
  },
  {
    "kind": "paragraph",
    "id": "r4-intro-284",
    "sourceIndex": 284,
    "runs": [
      {
        "text": "• «"
      },
      {
        "text": "Что защищается товарным знаком в ювелирном бизнесе",
        "href": "/knowledge/trademark-protection"
      },
      {
        "text": "?»"
      }
    ]
  },
  {
    "kind": "paragraph",
    "id": "r4-intro-285",
    "sourceIndex": 285,
    "runs": [
      {
        "text": "• «"
      },
      {
        "text": "Конкурент использует мой товарный знак. Что делать",
        "href": "/knowledge/trademark-infringement"
      },
      {
        "text": "?»"
      }
    ]
  },
  {
    "kind": "paragraph",
    "id": "r4-intro-287",
    "sourceIndex": 287,
    "runs": [
      {
        "text": "План действий:"
      }
    ]
  },
  {
    "kind": "list",
    "id": "r4-intro-list-288",
    "listId": "r4-intro",
    "ordered": false,
    "start": 1,
    "items": [
      {
        "id": "r4-intro-288",
        "sourceIndex": 288,
        "runs": [
          {
            "text": "Подтвердите, что знак зарегистрирован на вас, срок охраны не истёк, а перечень товаров и услуг охватывает изделия конкурента или однородные им."
          }
        ]
      },
      {
        "id": "r4-intro-289",
        "sourceIndex": 289,
        "runs": [
          {
            "text": "Сопоставьте обозначения (звучание, написание, смысл, общее впечатление) и товары, определите способ использования знака конкурентом."
          }
        ]
      },
      {
        "id": "r4-intro-290",
        "sourceIndex": 290,
        "runs": [
          {
            "text": "Зафиксируйте доказательства права и нарушения до того, как направите претензию."
          }
        ]
      },
      {
        "id": "r4-intro-291",
        "sourceIndex": 291,
        "runs": [
          {
            "text": "Выберите цель: прекращение использования, компенсация, оспаривание знака конкурента, судебная защита."
          }
        ]
      },
      {
        "id": "r4-intro-292",
        "sourceIndex": 292,
        "runs": [
          {
            "text": "Проверьте, не подал ли конкурент заявку на сходное обозначение, и убедитесь, что вы сами используете знак: при неиспользовании три года подряд охрану могут прекратить досрочно ("
          },
          {
            "text": "ст. 1486",
            "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=687"
          },
          {
            "text": " ГК РФ)."
          }
        ]
      }
    ]
  }
]
export const trademarkMethods: SimilarMethod[] = [
  {
    "id": "trademark-evaluate",
    "actionId": "evaluate",
    "variant": "trademark",
    "title": "Понять, есть ли нарушение",
    "blocks": [
      {
        "kind": "paragraph",
        "id": "r4-evaluate-295",
        "sourceIndex": 295,
        "runs": [
          {
            "text": "Что делать:"
          }
        ]
      },
      {
        "kind": "list",
        "id": "r4-evaluate-list-296",
        "listId": "r4-evaluate",
        "ordered": false,
        "start": 1,
        "items": [
          {
            "id": "r4-evaluate-296",
            "sourceIndex": 296,
            "runs": [
              {
                "text": "Убедитесь, что знак действует и принадлежит Вам. Право возникает с регистрацией знака ("
              },
              {
                "text": "п. 1 ст. 1477",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=6233"
              },
              {
                "text": " ГК РФ) и удостоверяется свидетельством ("
              },
              {
                "text": "п. 2 ст. 1481",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=101490"
              },
              {
                "text": " ГК РФ). Срок охраны — 10 лет с даты подачи заявки, его можно продлевать неограниченное число раз по заявлению, поданному в последний год ("
              },
              {
                "text": "п. 1 ст. 1491",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=101561"
              },
              {
                "text": ", "
              },
              {
                "text": "п. 2 ст. 1491",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=101561"
              },
              {
                "text": " ГК РФ). Если знак перешёл к вам по договору, проверьте письменную форму и регистрацию перехода права ("
              },
              {
                "text": "п. 1 ст. 1490",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=552"
              },
              {
                "text": " ГК РФ)."
              }
            ]
          },
          {
            "id": "r4-evaluate-297",
            "sourceIndex": 297,
            "runs": [
              {
                "text": "Сверьте товары. Свидетельство защищает знак в отношении указанных в нём товаров ("
              },
              {
                "text": "п. 2 ст. 1481",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=101490"
              },
              {
                "text": " ГК РФ). Нарушение возможно для тех же или однородных товаров (например, кольца и браслеты) ("
              },
              {
                "text": "п. 3 ст. 1484",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=101535"
              },
              {
                "text": " ГК РФ). Если конкурент продаёт товары, к которым Ваш знак не относится, вопрос об однородности нужно оценивать отдельно."
              }
            ]
          },
          {
            "id": "r4-evaluate-298",
            "sourceIndex": 298,
            "runs": [
              {
                "text": "Сравните обозначения. Закон говорит о сходстве до степени смешения, но не перечисляет критерии ("
              },
              {
                "text": "п. 3 ст. 1484",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=101535"
              },
              {
                "text": " ГК РФ). На практике сравнивают звучание, написание, смысл и общее зрительное впечатление, а решающая оценка принадлежит суду. Совпадение отдельных слов вроде «золото» или «бриллиант», которые не охраняются ("
              },
              {
                "text": "п. 1 ст. 1483",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=101496"
              },
              {
                "text": " ГК РФ), само по себе нарушением не является."
              }
            ]
          },
          {
            "id": "r4-evaluate-299",
            "sourceIndex": 299,
            "runs": [
              {
                "text": "Определите способ использования. Без вашего разрешения знак нельзя размещать на товарах, этикетках и упаковках; при выполнении работ и оказании услуг; на документации, связанной с введением товаров в оборот; в предложениях о продаже, рекламе и на вывесках; в интернете, в том числе в доменном имени ("
              },
              {
                "text": "п. 2 ст. 1484",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=101528"
              },
              {
                "text": " ГК РФ)."
              }
            ]
          },
          {
            "id": "r4-evaluate-300",
            "sourceIndex": 300,
            "runs": [
              {
                "text": "Проверьте исключения. Не является нарушением использование знака для товаров, которые вы сами или с вашего согласия ввели в оборот в России (перепродажа оригинальных изделий) ("
              },
              {
                "text": "ст. 1487",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=101546"
              },
              {
                "text": " ГК РФ)."
              }
            ]
          },
          {
            "id": "r4-evaluate-301",
            "sourceIndex": 301,
            "runs": [
              {
                "text": "Проверьте свою позицию. Если вы не используете знак три года подряд, любое заинтересованное лицо может добиться досрочного прекращения охраны, а использование должен доказывать правообладатель ("
              },
              {
                "text": "п. 1 ст. 1486",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=687"
              },
              {
                "text": ", "
              },
              {
                "text": "п. 3 ст. 1486",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=101543"
              },
              {
                "text": " ГК РФ). Приоритет знака определяется по дате подачи заявки "
              },
              {
                "text": "(п. 1 ст. 1494 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=101585&date=20.10.2026&demo=2"
              },
              {
                "text": ": убедитесь, что он раньше, чем у обозначения конкурента."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "trademark-record",
    "actionId": "record",
    "variant": "trademark",
    "title": "Зафиксировать нарушение",
    "blocks": [
      {
        "kind": "paragraph",
        "id": "r4-record-303",
        "sourceIndex": 303,
        "runs": [
          {
            "text": "Что делать:"
          }
        ]
      },
      {
        "kind": "list",
        "id": "r4-record-list-304",
        "listId": "r4-record",
        "ordered": false,
        "start": 1,
        "items": [
          {
            "id": "r4-record-304",
            "sourceIndex": 304,
            "runs": [
              {
                "text": "Подтвердите право. Свидетельство или выписка из реестра, договоры об отчуждении и лицензии, документы о продлении срока."
              }
            ]
          },
          {
            "id": "r4-record-305",
            "sourceIndex": 305,
            "runs": [
              {
                "text": "Сохраните доказательства использования вашего знака: чеки, накладные, рекламу, фото вывесок, упаковки и бирок с датами. Они понадобятся, если конкурент заявит о неиспользовании знака ("
              },
              {
                "text": "п. 3 ст. 1486",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=101543"
              },
              {
                "text": " ГК РФ)."
              }
            ]
          },
          {
            "id": "r4-record-306",
            "sourceIndex": 306,
            "runs": [
              {
                "text": "Зафиксируйте использование отдельно по каждому способу: на товаре, упаковке, в рекламе, на вывеске, в интернете. Нарушением признаётся использование одного средства индивидуализации одним способом ("
              },
              {
                "text": "п. 1.1 ст. 1252",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=6348"
              },
              {
                "text": " ГК РФ), поэтому знак на вывеске и на изделиях могут оценить как два нарушения. Доказательства: скриншоты с адресом страницы и датой, контрольная закупка (чек, упаковка, видео вскрытия), фото вывески и гарантийного талона, нотариальный протокол осмотра страницы."
              }
            ]
          },
          {
            "id": "r4-record-307",
            "sourceIndex": 307,
            "runs": [
              {
                "text": "Установите нарушителя: наименование, ИНН, ОГРН или ОГРНИП, адрес, площадки продаж."
              }
            ]
          },
          {
            "id": "r4-record-308",
            "sourceIndex": 308,
            "runs": [
              {
                "text": "Составьте таблицу сравнения вашего знака и обозначения конкурента, ваших товаров из свидетельства и его товаров. Приложите примеры реальной путаницы: вопросы покупателей «это Ваш бренд?», ошибочные обращения, отзывы."
              }
            ]
          },
          {
            "id": "r4-record-309",
            "sourceIndex": 309,
            "runs": [
              {
                "text": "Соберите данные для компенсации: цены, количество и период продаж конкурента, стоимость контрафактных товаров, ваши лицензионные договоры (они показывают цену права использования знака)."
              }
            ]
          },
          {
            "id": "r4-record-310",
            "sourceIndex": 310,
            "runs": [
              {
                "text": "Проверьте реестр: нет ли заявки или регистрации сходного обозначения на имя конкурента. Распечатайте сведения с датой."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "trademark-stop",
    "actionId": "stop",
    "variant": "trademark",
    "title": "Попросить конкурента прекратить использование",
    "blocks": [
      {
        "kind": "paragraph",
        "id": "r4-stop-312",
        "sourceIndex": 312,
        "runs": [
          {
            "text": "Что делать:"
          }
        ]
      },
      {
        "kind": "list",
        "id": "r4-stop-list-313",
        "listId": "r4-stop",
        "ordered": false,
        "start": 1,
        "items": [
          {
            "id": "r4-stop-313",
            "sourceIndex": 313,
            "runs": [
              {
                "text": "Направьте претензию. Для требований о пресечении нарушения, изъятии контрафакта и публикации решения суда она не обязательна, но рекомендуем направить: это показывает, что нарушитель знал о ваших правах ("
              },
              {
                "text": "п. 5.1 ст. 1252",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=735"
              },
              {
                "text": " ГК РФ). Предприниматель отвечает за нарушение независимо от вины, если не докажет непреодолимую силу ("
              },
              {
                "text": "п. 3 ст. 1250",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=106"
              },
              {
                "text": " ГК РФ); если же он не знал и не должен был знать о нарушении, суд может снизить компенсацию ("
              },
              {
                "text": "п. 7 ст. 1252.1",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=6366"
              },
              {
                "text": " ГК РФ). Отсутствие вины не освобождает от обязанности прекратить нарушение ("
              },
              {
                "text": "п. 5 ст. 1250",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=109"
              },
              {
                "text": " ГК РФ)."
              }
            ]
          },
          {
            "id": "r4-stop-314",
            "sourceIndex": 314,
            "runs": [
              {
                "text": "Что требовать: прекратить использование знака и сходного обозначения; изъять из оборота и уничтожить за счёт нарушителя контрафактные товары, этикетки и упаковки ("
              },
              {
                "text": "п. 2 ст. 1515",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=6390"
              },
              {
                "text": " ГК РФ); при оказании услуг удалить знак с документации, рекламы и вывесок ("
              },
              {
                "text": "п. 3 ст. 1515",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=6390"
              },
              {
                "text": " ГК РФ); снять карточки и публикации; отказаться от заявки на сходное обозначение; выплатить компенсацию. Контрафактными признаются товары, этикетки и упаковки, на которых незаконно размещён знак или сходное обозначение."
              }
            ]
          },
          {
            "id": "r4-stop-315",
            "sourceIndex": 315,
            "runs": [
              {
                "text": "Кому адресовать. Изготовителю, импортёру, хранителю, перевозчику, продавцу, иному распространителю, недобросовестному приобретателю ("
              },
              {
                "text": "пп. 4 п. 1 ст. 1252",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=6347"
              },
              {
                "text": " ГК РФ). Если нарушение совершено несколькими лицами совместно, они отвечают солидарно ("
              },
              {
                "text": "п. 6.1 ст. 1252",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=125"
              },
              {
                "text": " ГК РФ)."
              }
            ]
          },
          {
            "id": "r4-stop-316",
            "sourceIndex": 316,
            "runs": [
              {
                "text": "Если нарушение в интернете, обратитесь к площадке или хостингу. Направьте письменное заявление с точным адресом страницы. Посредник не отвечает, если не знал о нарушении и после заявления своевременно принял необходимые меры ("
              },
              {
                "text": "п. 3 ст. 1253.1",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=21"
              },
              {
                "text": " ГК РФ); даже без ответственности к нему можно предъявить требование об удалении информации или ограничении доступа ("
              },
              {
                "text": "п. 4 ст. 1253.1",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=24"
              },
              {
                "text": " ГК РФ). Приложите документы о праве (свидетельство, патент, подтверждение авторства), ссылки на все карточки и сравнение объектов."
              }
            ]
          },
          {
            "id": "r4-stop-317",
            "sourceIndex": 317,
            "runs": [
              {
                "text": "Предложите мирное решение. Вместо запрета можно заключить лицензионный договор ("
              },
              {
                "text": "ст. 1489",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=101552"
              },
              {
                "text": " ГК РФ) в письменной форме ("
              },
              {
                "text": "п. 1 ст. 1490",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=552"
              },
              {
                "text": " ГК РФ)."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "trademark-compensate",
    "actionId": "compensate",
    "variant": "trademark",
    "title": "Получить компенсацию",
    "blocks": [
      {
        "kind": "paragraph",
        "id": "r4-compensate-319",
        "sourceIndex": 319,
        "runs": [
          {
            "text": "Что делать:"
          }
        ]
      },
      {
        "kind": "list",
        "id": "r4-compensate-list-320",
        "listId": "r4-compensate",
        "ordered": false,
        "start": 1,
        "items": [
          {
            "id": "r4-compensate-320",
            "sourceIndex": 320,
            "runs": [
              {
                "text": "Выберите между убытками и компенсацией. Компенсация взыскивается при доказанности факта правонарушения, размер убытков доказывать не нужно"
              },
              {
                "text": " (",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=6352&date=16.10.2026&demo=2"
              },
              {
                "text": "п. 1 ст. 1252.1",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=6352"
              },
              {
                "text": " ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=6352&date=16.10.2026&demo=2"
              },
              {
                "text": "."
              }
            ]
          },
          {
            "id": "r4-compensate-321",
            "sourceIndex": 321,
            "runs": [
              {
                "text": "Выберите способ расчёта ("
              },
              {
                "text": "п. 4 ст. 1515",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=6391"
              },
              {
                "text": " ГК РФ): от 10 тысяч до 10 миллионов рублей; двукратная стоимость контрафактных товаров; двукратная стоимость права использования знака, исходя из цены, которая при сравнимых обстоятельствах обычно взимается за правомерное использование тем способом, который выбрал нарушитель."
              }
            ]
          },
          {
            "id": "r4-compensate-322",
            "sourceIndex": 322,
            "runs": [
              {
                "text": "Размер определяет суд соразмерно объёму и характеру нарушения, с учётом разумности и справедливости ("
              },
              {
                "text": "п. 2 ст. 1252.1",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=6357"
              },
              {
                "text": " ГК РФ). Если выбранный способ не подходит, суд вправе присудить компенсацию в твёрдом размере ("
              },
              {
                "text": "п. 3 ст. 1252.1",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=6358"
              },
              {
                "text": " ГК РФ). Если на изделии незаконно использовано несколько ваших средств индивидуализации, действует ("
              },
              {
                "text": "п. 4 ст. 1252.1",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=6360"
              },
              {
                "text": " ГК РФ)."
              }
            ]
          },
          {
            "id": "r4-compensate-323",
            "sourceIndex": 323,
            "runs": [
              {
                "text": "Считайте способы использования отдельно ("
              },
              {
                "text": "п. 1.1 ст. 1252",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=6348"
              },
              {
                "text": " ГК РФ): знак на товарах, на упаковке и в рекламе — разные нарушения."
              }
            ]
          },
          {
            "id": "r4-compensate-324",
            "sourceIndex": 324,
            "runs": [
              {
                "text": "Учтите довод о неосведомлённости. Если конкурент докажет, что не знал и не должен был знать о нарушении, суд может назначить от 10 тысяч до 500 тысяч рублей или от одно- до двукратной стоимости ("
              },
              {
                "text": "п. 7 ст. 1252.1",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=6366"
              },
              {
                "text": " ГК РФ). Претензия лишает его этого довода."
              }
            ]
          },
          {
            "id": "r4-compensate-325",
            "sourceIndex": 325,
            "runs": [
              {
                "text": "Пройдите претензионный порядок, если он обязателен. Для требований о компенсации и убытках между юридическими лицами и (или) ИП в арбитражном суде иск возможен после отказа или отсутствия ответа в течение 30 дней со дня направления претензии ("
              },
              {
                "text": "п. 5.1 ст. 1252",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=735"
              },
              {
                "text": " ГК РФ)."
              }
            ]
          },
          {
            "id": "r4-compensate-327",
            "sourceIndex": 327,
            "runs": [
              {
                "text": "Параллельно можно требовать изъятия и уничтожения контрафакта, публикации решения суда "
              },
              {
                "text": "(",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=115&date=18.10.2026&demo=2"
              },
              {
                "text": "пп. 5 п. 1 ст. 1252",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=115"
              },
              {
                "text": " ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=115&date=18.10.2026&demo=2"
              },
              {
                "text": ", а при неоднократных или грубых нарушениях закон допускает ликвидацию юридического лица или прекращение деятельности ИП "
              },
              {
                "text": "(",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=716&date=18.10.2026&demo=2"
              },
              {
                "text": "ст. 1253",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=716"
              },
              {
                "text": " ГК РФ).",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=716&date=18.10.2026&demo=2"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "trademark-challenge",
    "actionId": "challenge",
    "variant": "trademark",
    "title": "Оспорить регистрацию конкурента",
    "blocks": [
      {
        "kind": "paragraph",
        "id": "r4-challenge-329",
        "sourceIndex": 329,
        "runs": [
          {
            "text": "Что делать:"
          }
        ]
      },
      {
        "kind": "list",
        "id": "r4-challenge-list-330",
        "listId": "r4-challenge",
        "ordered": false,
        "start": 1,
        "items": [
          {
            "id": "r4-challenge-330",
            "sourceIndex": 330,
            "runs": [
              {
                "text": "Проверьте основание. Регистрацию сходного знака можно оспорить, если ваш знак имеет более ранний приоритет и товары однородны ("
              },
              {
                "text": "п. 6 ст. 1483",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=101514"
              },
              {
                "text": " ГК РФ); если знак сходен с вашим фирменным наименованием или коммерческим обозначением ("
              },
              {
                "text": "п. 8 ст. 1483",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=101520"
              },
              {
                "text": " ГК РФ). Срок оспаривания зависит от основания "
              },
              {
                "text": "(п. 2 ст. 1512 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=101681&date=20.10.2026&demo=2"
              },
              {
                "text": ": по сходству с более ранним товарным знаком — в течение пяти лет со дня публикации сведений о регистрации; по ряду иных оснований, в том числе по правам на фирменное наименование и коммерческое обозначение, — в течение всего срока охраны. В течение всего срока охраны оспаривается и регистрация, если действия правообладателя признаны злоупотреблением правом или недобросовестной конкуренцией "
              },
              {
                "text": "(пп. 6 п. 2 ст. 1512 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=101681&date=20.10.2026&demo=2"
              },
              {
                "text": "."
              }
            ]
          },
          {
            "id": "r4-challenge-331",
            "sourceIndex": 331,
            "runs": [
              {
                "text": "Подайте возражение в Роспатент. Оно подаётся заинтересованным лицом ("
              },
              {
                "text": "п. 1 ст. 1513",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=583"
              },
              {
                "text": ", "
              },
              {
                "text": "п. 2 ст. 1513",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=583"
              },
              {
                "text": " ГК РФ). Решение Роспатента можно оспорить в суде ("
              },
              {
                "text": "п. 4 ст. 1513",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=101697"
              },
              {
                "text": " ГК РФ), в первой инстанции — в Суде по интеллектуальным правам ("
              },
              {
                "text": "ч. 4 ст. 34",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=520138&dst=522"
              },
              {
                "text": " АПК РФ)."
              }
            ]
          },
          {
            "id": "r4-challenge-332",
            "sourceIndex": 332,
            "runs": [
              {
                "text": "Если знак конкурента только заявлен, любое лицо вправе ознакомиться с документами заявки "
              },
              {
                "text": "(п. 1 ст. 1493 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=557&date=20.10.2026&demo=2"
              },
              {
                "text": " и направить доводы о несоответствии обозначения закону, которые учитываются при экспертизе "
              },
              {
                "text": "(п. 1 ст. 1499 ГК РФ)",
                "href": "https://login.consultant.ru/link/?req=doc&base=LAW&n=509417&dst=101611&date=20.10.2026&demo=2"
              },
              {
                "text": ". Свою заявку подайте в любом случае."
              }
            ]
          },
          {
            "id": "r4-challenge-333",
            "sourceIndex": 333,
            "runs": [
              {
                "text": "Проверьте, использует ли конкурент свой знак. Если знак не используется три года подряд, направьте правообладателю предложение отказаться от права или продать его; если за два месяца он не отреагирует, в течение тридцати дней можно подать иск о досрочном прекращении охраны ("
              },
              {
                "text": "п. 1 ст. 1486",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=687"
              },
              {
                "text": " ГК РФ). Использование доказывает правообладатель ("
              },
              {
                "text": "п. 3 ст. 1486",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=101543"
              },
              {
                "text": " ГК РФ)."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "trademark-court",
    "actionId": "court",
    "variant": "trademark",
    "title": "Обратиться в суд",
    "blocks": [
      {
        "kind": "paragraph",
        "id": "r4-court-335",
        "sourceIndex": 335,
        "runs": [
          {
            "text": "Что делать:"
          }
        ]
      },
      {
        "kind": "list",
        "id": "r4-court-list-336",
        "listId": "r4-court",
        "ordered": false,
        "start": 1,
        "items": [
          {
            "id": "r4-court-336",
            "sourceIndex": 336,
            "runs": [
              {
                "text": "Определите требования ("
              },
              {
                "text": "п. 1 ст. 1252",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=6346"
              },
              {
                "text": " ГК РФ): пресечь нарушение; взыскать убытки или компенсацию ("
              },
              {
                "text": "п. 4 ст. 1515",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=6391"
              },
              {
                "text": " ГК РФ); изъять и уничтожить контрафакт ("
              },
              {
                "text": "п. 2 ст. 1515",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=6390"
              },
              {
                "text": " ГК РФ); удалить знак с документации и вывесок ("
              },
              {
                "text": "п. 3 ст. 1515",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=6390"
              },
              {
                "text": " ГК РФ); опубликовать решение суда."
              }
            ]
          },
          {
            "id": "r4-court-337",
            "sourceIndex": 337,
            "runs": [
              {
                "text": "Пройдите претензионный порядок, если он обязателен. Для требований о компенсации и убытках между юридическими лицами и (или) ИП в арбитражном суде иск возможен после отказа или отсутствия ответа в течение 30 дней со дня направления претензии ("
              },
              {
                "text": "п. 5.1 ст. 1252",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=735"
              },
              {
                "text": " ГК РФ)."
              }
            ]
          },
          {
            "id": "r4-court-338",
            "sourceIndex": 338,
            "runs": [
              {
                "text": "Определите суд. Спор между организациями и индивидуальными предпринимателями рассматривает арбитражный суд (("
              },
              {
                "text": "ст. 27",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=520138&dst=1523"
              },
              {
                "text": " АПК РФ)); если ответчик — гражданин без статуса ИП, дело рассматривает суд общей юрисдикции (("
              },
              {
                "text": "п. 1 ч. 1 ст. 22",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=541275&dst=100100"
              },
              {
                "text": " ГПК РФ)). Оспаривание решений Роспатента в первой инстанции рассматривает Суд по интеллектуальным правам (("
              },
              {
                "text": "ч. 4 ст. 34",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=520138&dst=522"
              },
              {
                "text": " АПК РФ))."
              }
            ]
          },
          {
            "id": "r4-court-339",
            "sourceIndex": 339,
            "runs": [
              {
                "text": "Если нарушение совершено несколькими лицами, предъявляйте требования ко всем. При совместном нарушении они отвечают солидарно ("
              },
              {
                "text": "п. 6.1 ст. 1252",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=125"
              },
              {
                "text": " ГК РФ); при самостоятельных нарушениях с использованием одних и тех же контрафактных носителей суд может взыскать компенсацию солидарно, если раздельное взыскание привело бы к неосновательному обогащению правообладателя ("
              },
              {
                "text": "п. 8 ст. 1252.1",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=125"
              },
              {
                "text": " ГК РФ)."
              }
            ]
          },
          {
            "id": "r4-court-340",
            "sourceIndex": 340,
            "runs": [
              {
                "text": "Рассчитайте пошлину за подачу иска. Чтобы не считать вручную по таблицам Налогового кодекса (("
              },
              {
                "text": "ст. 333.21",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=538093&dst=9893"
              },
              {
                "text": " НК РФ)), воспользуйтесь калькулятором госпошлины: "
              },
              {
                "text": "для арбитражных судов",
                "href": "https://calculator.consultant.ru/gosposhlina-arbitr?date="
              },
              {
                "text": ", "
              },
              {
                "text": "для судов общей юрисдикции",
                "href": "https://calculator.consultant.ru/gosposhlina-soj?date="
              },
              {
                "text": "."
              }
            ]
          }
        ]
      },
      {
        "kind": "paragraph",
        "id": "r4-court-341",
        "sourceIndex": 341,
        "runs": [
          {
            "text": "Подробнее: статья «"
          },
          {
            "text": "Подсудность споров по интеллектуальным правам",
            "href": "/knowledge/ip-jurisdiction"
          },
          {
            "text": "»"
          }
        ]
      }
    ]
  },
  {
    "id": "trademark-learn",
    "actionId": "learn",
    "variant": "trademark",
    "title": "Пока просто разобраться",
    "blocks": [
      {
        "kind": "paragraph",
        "id": "r4-learn-343",
        "sourceIndex": 343,
        "runs": [
          {
            "text": "Что делать:"
          }
        ]
      },
      {
        "kind": "list",
        "id": "r4-learn-list-344",
        "listId": "r4-learn",
        "ordered": false,
        "start": 1,
        "items": [
          {
            "id": "r4-learn-344",
            "sourceIndex": 344,
            "runs": [
              {
                "text": "Поймите, что охраняется: словесные, изобразительные, объёмные и иные обозначения или их комбинации, которые индивидуализируют товары. Охраняется зарегистрированное обозначение, а не идея бренда и не внешний вид изделия. Подробнее: статья «"
              },
              {
                "text": "Что защищается товарным знаком в ювелирном бизнесе",
                "href": "/knowledge/trademark-protection"
              },
              {
                "text": "?»"
              }
            ]
          },
          {
            "id": "r4-learn-345",
            "sourceIndex": 345,
            "runs": [
              {
                "text": "Узнайте, как возникает право: с регистрацией в Роспатенте ("
              },
              {
                "text": "п. 1 ст. 1477",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=6233"
              },
              {
                "text": " ГК РФ), в отношении товаров из свидетельства ("
              },
              {
                "text": "п. 2 ст. 1481",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=101490"
              },
              {
                "text": " ГК РФ), на территории России ("
              },
              {
                "text": "ст. 1479",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=101486"
              },
              {
                "text": " ГК РФ)."
              }
            ]
          },
          {
            "id": "r4-learn-346",
            "sourceIndex": 346,
            "runs": [
              {
                "text": "Узнайте, что даёт право: исключительное право использовать знак и запрещать это другим ("
              },
              {
                "text": "п. 1 ст. 1484",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=101527%2C2"
              },
              {
                "text": ", "
              },
              {
                "text": "п. 2 ст. 1484",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=101528"
              },
              {
                "text": " ГК РФ), а также запрещать сходные обозначения для тех же и однородных товаров ("
              },
              {
                "text": "п. 3 ст. 1484",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=101535"
              },
              {
                "text": " ГК РФ)."
              }
            ]
          },
          {
            "id": "r4-learn-347",
            "sourceIndex": 347,
            "runs": [
              {
                "text": "Помните о сроках и ограничениях: 10 лет с продлением ("
              },
              {
                "text": "п. 1 ст. 1491",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=101561"
              },
              {
                "text": " ГК РФ); досрочное прекращение за неиспользование ("
              },
              {
                "text": "ст. 1486",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=687"
              },
              {
                "text": " ГК РФ); исчерпание права ("
              },
              {
                "text": "ст. 1487",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=101546"
              },
              {
                "text": " ГК РФ); предупредительная маркировка допустима только для зарегистрированного знака ("
              },
              {
                "text": "п. 5 ст. 1515",
                "href": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=509417&dst=6394"
              },
              {
                "text": " ГК РФ)."
              }
            ]
          }
        ]
      }
    ]
  }
]
export const patentOverview: ArticleBlock[] = []
