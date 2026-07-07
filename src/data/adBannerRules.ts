// 「恋愛ステータス」×「気になっていること」の組み合わせごとに、
// 表示したい広告バナーを指定するファイルです。
//
// 使い方：
// BANNER_RULES の中の、該当する組み合わせの [ ] の中に、
// adBanners.ts で付けた id を並べてください（複数指定すると、その順番で全部表示されます）。
//
// もし指定を忘れている組み合わせがあった場合は、
// 下の DEFAULT_BANNER_IDS に書かれたバナーが代わりに表示されます。

export const DEFAULT_BANNER_IDS = ['coconala'];

export const BANNER_RULES: Record<string, Record<string, string[]>> = {
  フリー: {
    相手の本音: ['coconala'],
    '2人の未来': ['coconala'],
    新しい出会い: ['coconala'],
    その他: ['coconala'],
  },
  片思い中: {
    相手の本音: ['coconala'],
    '2人の未来': ['coconala'],
    新しい出会い: ['coconala'],
    その他: ['coconala'],
  },
  復縁したい: {
    相手の本音: ['coconala'],
    '2人の未来': ['coconala'],
    新しい出会い: ['coconala'],
    その他: ['coconala'],
  },
  交際中: {
    相手の本音: ['coconala'],
    '2人の未来': ['coconala'],
    新しい出会い: ['coconala'],
    その他: ['coconala'],
  },
};
