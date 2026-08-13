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
      "「そのうち」「落ち着いたら」——そう言ってる間に、素敵な男性はどんどん結婚していっちゃうんです。",
      "結婚したい気持ちが少しでもあるなら、1日でも早く婚活を始めることをおすすめします。まずは結婚相談所の登録だけでもやってみて。",
    ],
  },
  B: {
    tag: "TYPE — B",
    title: "迷子タイプ",
    body: [
      "婚活でお疲れでないでしょうか。頑張っても上手くいかないのは、あなたの努力が足りないんじゃなくて、環境が合ってないだけです。",
      "結婚に本気の人だけが集まる場所に切り替えるだけで、景色は変わりますよ。",
    ],
  },
  C: {
    tag: "TYPE — C",
    title: "条件迷子タイプ",
    body: [
      "どんな男性が自分に合ってるのか迷っているんですね。なかなか理想は言語化しにくいですよね。",
      "そんな時は、一人で考え込むよりプロに相談することをおすすめします。それだけで結婚が近づきますよ。",
    ],
  },
  D: {
    tag: "TYPE — D",
    title: "もったいないタイプ",
    body: [
      "あなた、すごくモテるのに、行動していないだけでもったいないです。",
      "とりあえず結婚相談所に登録だけでもしてみるといいと思います。そこで自分の価値が分かるから。行動すれば、ちゃんと結果はついてきますよ。",
    ],
  },
};

// ▼▼▼ ASPから発行された実際の埋め込みコード ▼▼▼
export const AFFILIATE_HTML_CODE = `<a href="https://px.a8.net/svt/ejp?a8mat=4B5N41+BANUQA+1PJA+2BFH02" target="_blank" rel="nofollow noopener noreferrer">先着で婚活支援金30,000円プレゼント！</a><img border="0" width="1" height="1" src="https://www16.a8.net/0.gif?a8mat=4B5N41+BANUQA+1PJA+2BFH02" alt="" />`;
