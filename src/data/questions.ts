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
      { text: "スペックには自信あるのに、行動できてない", type: "D" },
    ],
  },
  {
    text: "一番のモヤモヤは？",
    options: [
      { text: "忙しくて時間が取れない", type: "A" },
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
      { text: "本気だけど、何を基準に選べばいいかわからない", type: "C" },
      { text: "本気度はあるのに、一歩を踏み出せていない", type: "D" },
    ],
  },
  {
    text: "相手選びで一番自信がないのは？",
    options: [
      { text: "そもそも出会う機会を作ること", type: "A" },
      { text: "関係を「続く」ものに発展させること", type: "B" },
      { text: "自分の希望条件を言葉にすること", type: "C" },
      { text: "自分に見合う相手を見極めること", type: "D" },
    ],
  },
  {
    text: "これまで婚活にお金や時間をかけてきた？",
    options: [
      { text: "ほとんどかけていない", type: "A" },
      { text: "アプリの課金くらい", type: "B" },
      { text: "自分なりにいろいろ調べてはいる", type: "C" },
      { text: "それなりにかけてきたのに結果が出ていない", type: "D" },
    ],
  },
  {
    text: "本音のところ、一番の悩みは？",
    options: [
      { text: "「まだ大丈夫」と先延ばしにしてしまう自分", type: "A" },
      { text: "出会いはあるのに疲れてしまう自分", type: "B" },
      { text: "何を基準に選べばいいかわからない自分", type: "C" },
      { text: "動けば結果が出せるはずなのに、動けない自分", type: "D" },
    ],
  },
];
