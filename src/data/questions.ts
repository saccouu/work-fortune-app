// 婚活タイプ診断の質問データです。
// text: 質問文
// options[].type: この選択肢を選ぶとA〜Dどのタイプに加点するか

export type ResultType = "A" | "B" | "C" | "D";

export type QuestionOption = {
  text: string;
  type: ResultType;
};

export type Question = {
  text: string;
  options: QuestionOption[];
};

export const QUESTIONS: Question[] = [
  {
    text: "婚活の今の状況は？",
    options: [
      { text: "気になってるけど、まだ何も始めてない", type: "A" },
      { text: "マッチングアプリはやってるけど疲れてきた", type: "B" },
      { text: "婚活はしてるけど、なかなか進展しない", type: "C" },
      { text: "始めたいけど、婚活に抵抗がある", type: "D" },
    ],
  },
  {
    text: "婚活で一番のモヤモヤは？",
    options: [
      { text: "忙しくて婚活の時間が取れない", type: "A" },
      { text: "出会いはあるけど、関係が続かない", type: "B" },
      { text: "相手に求める条件が自分でもよくわからない", type: "C" },
      { text: "周りが結婚していく焦りはあるのに動けない", type: "D" },
    ],
  },
  {
    text: "婚活への本気度は？",
    options: [
      { text: "そろそろ本気にならなきゃとは思ってる", type: "A" },
      { text: "本気だけど、やり方が合ってない気がする", type: "B" },
      { text: "本気だけど、どんな人を選べばいいかわからない", type: "C" },
      { text: "本気のつもりだが、なかなか一歩を踏み出せない", type: "D" },
    ],
  },
  {
    text: "相手選びで一番自信がないのは？",
    options: [
      { text: "そもそも出会う機会を作ること", type: "A" },
      { text: "遊ばれるんじゃないかと不安", type: "B" },
      { text: "自分に合う男性がどんな人か分からない", type: "C" },
      { text: "相手が結婚向きな男性かどうか見極められない", type: "D" },
    ],
  },
  {
    text: "これまで婚活にお金や時間をかけてきた？",
    options: [
      { text: "ほとんどかけていない", type: "A" },
      { text: "マッチングアプリに課金してきた", type: "B" },
      { text: "それなりにかけてきたのに結果が出ていない", type: "C" },
      { text: "婚活はしてないけど恋愛はたくさんしてきた", type: "D" },
    ],
  },
  {
    text: "いま一番の悩みは？",
    options: [
      { text: "婚活して結婚できるのか不安", type: "A" },
      { text: "婚活に疲れてしまっている", type: "B" },
      { text: "どんな男性を選べば幸せになれるのか", type: "C" },
      { text: "結婚したいけど、どうすればいいか分からない", type: "D" },
    ],
  },
];
