// 広告バナーの管理ファイルです。
// 1つのオブジェクトが1つのバナーに対応します。
//
// id: このバナーを他のファイル(adBannerRules.ts)から呼び出すための、
//     自由に決めてよい識別名です(日本語でも半角英数字でもOK)。
//     ただし、他のバナーと重複しない名前にしてください。
// htmlCode: A8.netの「素材をコピー」ボタンで取得したコードを、
//     1文字も書き換えずに、まるごとそのまま貼り付けてください。
// label: バナーの左上に小さく表示される見出し文字（例: "あなたにおすすめ"）
//
// 2つ目以降を追加したい場合は、下の使用例を参考に、
// 配列の中にオブジェクトとして追加してください。
// 例:
// {
//   id: 'brillante',
//   htmlCode: `<a href="https://px.a8.net/svt/ejp?a8mat=XXXXX" rel="nofollow"><img border="0" alt="" src="https://www.bbauranai.jp/ads/banner_2.png"></a><img border="0" width="1" height="1" src="https://www12.a8.net/0.gif?a8mat=XXXXX" alt="">`,
//   label: 'あなたにおすすめの場所はここよ',
// },

export const AD_BANNERS = [
  {
    id: 'coconala',
    htmlCode: `<a href="https://px.a8.net/svt/ejp?a8mat=3Z4WIB+45GOHE+2PEO+HUSFL&a8ejpredirect=https%3A%2F%2Fcoconala.com%2Fcategories%2F3%3Fservice_kind%3D1" rel="nofollow">
<img border="0" alt="" src="https://www.bbauranai.jp/ads/banner1.png"></a>
<img border="0" width="1" height="1" src="https://www16.a8.net/0.gif?a8mat=3Z4WIB+45GOHE+2PEO+HUSFL" alt="">`,
    label: 'あなたにはここもおすすめよ',
  },
];
