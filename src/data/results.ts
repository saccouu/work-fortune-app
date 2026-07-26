// 診断結果データです。
// tag / title / body: 結果画面に表示するレイコ先生のコメントです。

import { ResultType } from "./questions";

export type ResultData = {
  tag: string;
  title: string;
  body: string[];
};

export const RESULTS: Record<ResultType, ResultData> = {
  A: {
    tag: "TYPE — A",
    title: "後回しタイプ",
    body: [
      "「そのうち」「落ち着いたら」——そう言ってる間に、素敵な男性はどんどん結婚していくのよ。",
      "結婚したい気持ちが少しでもあるなら、1日でも早く婚活を始めることをおすすめするわ。まずは結婚相談所の登録だけでもやってみて。",
    ],
  },
  B: {
    tag: "TYPE — B",
    title: "迷子タイプ",
    body: [
      "婚活でお疲れのようね。頑張っても上手くいかないのは、あなたの努力が足りないんじゃなくて、環境が合ってないだけ。",
      "結婚に本気の人だけが集まる場所に切り替えるだけで、景色は変わるわ。",
    ],
  },
  C: {
    tag: "TYPE — C",
    title: "条件迷子タイプ",
    body: [
      "どんな男性が自分に合ってるのか迷っているのね。分かるわ、なかなか理想は言語化しにくいのよね。",
      "でも、一人で考え込むよりプロに相談することをおすすめするわ。それだけで結婚が近づくわよ。",
    ],
  },
  D: {
    tag: "TYPE — D",
    title: "もったいないタイプ",
    body: [
      "あなた、すごくモテるのに、行動していないだけでもったいないわ。",
      "とりあえず結婚相談所に登録だけでもしてみるといいわ、自分の価値が分かるから。行動すれば、ちゃんと結果はついてくるわよ。",
    ],
  },
};

// ▼▼▼ ASPから発行された実際の埋め込みコード ▼▼▼
export const AFFILIATE_HTML_CODE = `<a href="https://px.a8.net/svt/ejp?a8mat=4B5N41+BANUQA+1PJA+2BFH02" target="_blank" rel="nofollow noopener noreferrer">先着で婚活支援金30,000円プレゼント！</a><img border="0" width="1" height="1" src="https://www16.a8.net/0.gif?a8mat=4B5N41+BANUQA+1PJA+2BFH02" alt="" />`;
