import { GrammarNode } from "./types";

export const GRAMMAR_DATA: GrammarNode[] = [
  {
    type: "NOUN",
    label: "Danh từ",
    shortLabel: "Noun",
    description: "Người, vật, nơi chốn, ý tưởng",
    details: [
      {
        title: "Cách nhận biết",
        content: [
          "Danh từ thường đứng sau mạo từ (a, an, the).",
          "Danh từ có thể thêm -s/-es để thành số nhiều.",
          "Danh từ có thể đứng sau tính từ."
        ],
        examples: [
          "She bought a book.",
          "There are three cars.",
          "It is a beautiful house."
        ]
      }
    ]
  },
  {
    type: "VERB",
    label: "Động từ",
    shortLabel: "Verb",
    description: "Diễn tả hành động hoặc trạng thái",
    details: [
      {
        title: "Cách nhận biết",
        content: [
          "Động từ thường đứng sau chủ ngữ.",
          "Động từ chia theo thì.",
          "Động từ có thể thêm -ing."
        ],
        examples: [
          "She runs every morning.",
          "He went to school yesterday.",
          "They are playing football."
        ]
      }
    ]
  },
  {
    type: "ADJECTIVE",
    label: "Tính từ",
    shortLabel: "Adjective",
    description: "Bổ nghĩa cho danh từ",
    details: [
      {
        title: "Cách nhận biết",
        content: [
          "Tính từ đứng trước danh từ.",
          "Tính từ đứng sau động từ to be.",
          "Tính từ không chia theo số nhiều."
        ],
        examples: [
          "She has a small dog.",
          "The sky is blue.",
          "They are happy."
        ]
      }
    ]
  },
  {
    type: "ADVERB",
    label: "Trạng từ",
    shortLabel: "Adverb",
    description: "Bổ nghĩa cho động từ, tính từ",
    details: [
      {
        title: "Cách nhận biết",
        content: [
          "Trạng từ thường kết thúc bằng -ly.",
          "Trạng từ bổ nghĩa cho động từ.",
          "Trạng từ có thể đứng đầu câu."
        ],
        examples: [
          "She speaks slowly.",
          "He runs quickly.",
          "Yesterday, I met her."
        ]
      }
    ]
  },
  {
    type: "PRONOUN",
    label: "Đại từ",
    shortLabel: "Pronoun",
    description: "Thay thế cho danh từ",
    details: [
      {
        title: "Cách nhận biết",
        content: [
          "Đại từ thay thế cho danh từ.",
          "Đại từ có dạng chủ ngữ và tân ngữ.",
          "Đại từ sở hữu thể hiện sự sở hữu."
        ],
        examples: [
          "She is my friend.",
          "I saw him yesterday.",
          "This book is mine."
        ]
      }
    ]
  }
];
