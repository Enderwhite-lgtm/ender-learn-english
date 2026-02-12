
import { WordType, GrammarNode } from './types';

export const GRAMMAR_DATA: GrammarNode[] = [
  {
    type: WordType.NOUN,
    label: "Danh Từ",
    shortLabel: "Noun (N)",
    description: "Chỉ người, vật, hiện tượng, ý tưởng...",
    position: { x: 20, y: 15 },
    details: [
      {
        title: "Dấu hiệu nhận biết",
        content: ["the, a/an, some/many...", "Sau giới từ (in, at, on...)", "Sau tính từ sở hữu (my, your...)"],
        examples: ["a beautiful girl", "on the table"],
        color: "bg-emerald-500"
      },
      {
        title: "Vị trí",
        content: ["Đứng đầu câu làm chủ ngữ", "Đứng sau động từ làm tân ngữ", "Sau lượng từ"],
        color: "bg-emerald-600"
      },
      {
        title: "Hậu tố (Suffixes)",
        content: ["-tion, -ness, -ity, -age, -ance, -ment"],
        examples: ["information", "happiness", "ability"],
        color: "bg-emerald-700"
      }
    ]
  },
  {
    type: WordType.VERB,
    label: "Động Từ",
    shortLabel: "Verb (V)",
    description: "Biểu thị hành động hoặc trạng thái.",
    position: { x: 80, y: 15 },
    details: [
      {
        title: "Vị trí & Cách dùng",
        content: ["Sau chủ ngữ", "Trước tân ngữ", "Adv + V (Trạng từ bổ nghĩa cho V)"],
        examples: ["She writes", "He quickly ran"],
        color: "bg-sky-500"
      },
      {
        title: "Công thức đặc biệt",
        content: ["begin, help, want + V-ing/To-V", "V nguyên mẫu (V0) -> V-ing"],
        examples: ["start running", "want to sleep"],
        color: "bg-sky-600"
      }
    ]
  },
  {
    type: WordType.ADJECTIVE,
    label: "Tính Từ",
    shortLabel: "Adjective (Adj)",
    description: "Miêu tả hoặc bổ nghĩa cho danh từ.",
    position: { x: 20, y: 55 },
    details: [
      {
        title: "Vị trí",
        content: ["Đứng trước Danh từ (Adj + N)", "Sau các động từ nối (Linking Verbs)"],
        examples: ["a good idea", "She looks happy"],
        color: "bg-amber-500"
      },
      {
        title: "Động từ nối phổ biến",
        content: ["be, become, feel, seem, look, sound, taste, smell"],
        color: "bg-amber-600"
      },
      {
        title: "Hậu tố (Suffixes)",
        content: ["-able, -ful, -ive, -ous, -ent, -ant"],
        examples: ["comfortable", "helpful", "active"],
        color: "bg-amber-700"
      }
    ]
  },
  {
    type: WordType.ADVERB,
    label: "Trạng Từ",
    shortLabel: "Adverb (Adv)",
    description: "Bổ nghĩa cho động từ, tính từ hoặc cả câu.",
    position: { x: 80, y: 55 },
    details: [
      {
        title: "Vị trí",
        content: ["Đứng trước hoặc sau động từ thường", "Đứng trước tính từ/trạng từ khác"],
        examples: ["He speaks clearly", "very happy", "quite quickly"],
        color: "bg-rose-500"
      },
      {
        title: "Dấu hiệu",
        content: ["Thường kết thúc bằng -ly (Adj + ly)"],
        examples: ["clearly", "slowly"],
        color: "bg-rose-600"
      },
      {
        title: "Trường hợp đặc biệt",
        content: ["fast, hard, well, late (không thêm -ly)"],
        color: "bg-rose-700"
      }
    ]
  },
  {
    type: WordType.LINKING_VERB,
    label: "Động Từ Nối",
    shortLabel: "Linking Verbs",
    description: "Liên kết chủ ngữ với tính từ bổ nghĩa.",
    position: { x: 35, y: 85 },
    details: [
      {
        title: "Công thức",
        content: ["V + Adj", "V + O + Adj (find, keep, make...)"],
        examples: ["She feels tired", "Find it difficult"],
        color: "bg-cyan-500"
      },
      {
        title: "Ví dụ quan trọng",
        content: ["be, become, feel, seem, sound, taste, smell"],
        color: "bg-cyan-600"
      }
    ]
  },
  {
    type: WordType.NOTES,
    label: "Ghi Nhớ",
    shortLabel: "Ghi Nhớ",
    description: "Lưu ý quan trọng khi làm bài Word Form.",
    position: { x: 65, y: 85 },
    details: [
      {
        title: "To + V0",
        content: ["To luôn đi với động từ nguyên mẫu chỉ mục đích hoặc cấu trúc cụ thể"],
        examples: ["He advised me to stay"],
        color: "bg-orange-500"
      },
      {
        title: "Phân biệt",
        content: ["-ing (vật/tính chất) vs -ed (người/cảm xúc)", "Adv vs Adj: Cẩn thận với động từ hành động vs nối"],
        color: "bg-orange-600"
      }
    ]
  }
];