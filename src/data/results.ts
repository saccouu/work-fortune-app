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
      "「そのうち」「落ち着いたら」——そう言ってる間に、条件のいい人からいなくなっていくのよ。",
      "婚活は始めた日からしか進まないの。動くなら、今よ。まずは情報だけでも取りに行きなさい。",
    ],
  },
  B: {
    tag: "TYPE — B",
    title: "迷子タイプ",
    body: [
      "頑張ってるのに疲れるのは、あなたの努力が足りないんじゃなくて、環境が合ってないだけ。",
      "本気の人だけが集まる場所に切り替えるだけで、景色は変わるわ。",
    ],
  },
  C: {
    tag: "TYPE — C",
    title: "条件迷子タイプ",
    body: [
      "自分の希望を言葉にできないと、紹介する側だって動きようがないの。",
      "一人で考え込むより、プロに一度頭の中を整理してもらいなさい。それだけで話が早くなるわよ。",
    ],
  },
  D: {
    tag: "TYPE — D",
    title: "もったいないタイプ",
    body: [
      "あなたレベルなら選ばれる側なのに、動いてないだけがもったいないの。",
      "自信がないんじゃなくて、答え合わせをしていないだけ。行動すれば、ちゃんと結果はついてくるわ。",
    ],
  },
};

// ▼▼▼ ASPから発行された実際の埋め込みコード ▼▼▼
export const AFFILIATE_HTML_CODE = `<a href="https://px.a8.net/svt/ejp?a8mat=4B5N41+BANUQA+1PJA+2BFH02" target="_blank" rel="nofollow noopener noreferrer">先着で婚活支援金30,000円プレゼント！</a><img border="0" width="1" height="1" src="https://www16.a8.net/0.gif?a8mat=4B5N41+BANUQA+1PJA+2BFH02" alt="" />`;
