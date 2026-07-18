// 11問の質問データです。
// text: 質問文
// scores: この質問で5段階評価した点数を、どのカテゴリ(id)に加算するか
//         (jobsData.ts の id と対応しています)

export const QUESTIONS = [
  {
    text: '1人でじっくり何かに取り組む時間が好きだ',
    scores: ['syugei', 'katazuke', 'design'],
  },
  {
    text: '人から相談されると、まず黙って最後まで話を聞く',
    scores: ['mentality', 'uranai'],
  },
  {
    text: '新しいことを始めるときは、直感でまず試してみる方だ',
    scores: ['uranai', 'syokubutsu'],
  },
  {
    text: '部屋はいつも綺麗にして、物が増えたらすぐ整理したくなる',
    scores: ['katazuke', 'design'],
  },
  {
    text: '人と接するとき、相手の気持ちに共感することを大事にしている',
    scores: ['mentality', 'katazuke'],
  },
  {
    text: '自分の体調管理や、体を動かすことを大事にしている',
    scores: ['biyo', 'pet'],
  },
  {
    text: '何かを作るとき、手先を使って丁寧に仕上げるのが好きだ',
    scores: ['syugei', 'syokubutsu'],
  },
  {
    text: '動物や子供を見ると、自然と目で追ってしまう',
    scores: ['pet', 'biyo', 'mentality'],
  },
  {
    text: '家族や友人の食事や栄養バランスが、つい気になってしまう',
    scores: ['syoku', 'biyo'],
  },
  {
    text: '何かを選ぶとき、見た目や雰囲気を重視する方だ',
    scores: ['syokubutsu', 'design'],
  },
  {
    text: '人のちょっとした変化に気づく方だ',
    scores: ['mentality', 'uranai'],
  },
];
