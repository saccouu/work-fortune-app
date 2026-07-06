// 広告バナーの管理ファイルです。
// 1つのオブジェクトが1つのバナーに対応します。
//
// htmlCode には、A8.netの「素材をコピー」ボタンで取得したコードを
// 1文字も書き換えずに、まるごとそのまま貼り付けてください。
// （見えない計測用の画像タグが含まれていることがありますが、絶対に消さないでください）
//
// label: バナーの左上に小さく表示される見出し文字（例: "あなたにおすすめ"）
export const AD_BANNERS = [
  {
    htmlCode: `<a href="https://px.a8.net/svt/ejp?a8mat=3Z4WIB+45GOHE+2PEO+HUSFL&a8ejpredirect=https%3A%2F%2Fcoconala.com%2Fcategories%2F3%3Fservice_kind%3D1" rel="nofollow">
<img border="0" alt="" src="https://www.bbauranai.jp/ads/banner1.png"></a>
<img border="0" width="1" height="1" src="https://www16.a8.net/0.gif?a8mat=3Z4WIB+45GOHE+2PEO+HUSFL" alt="">`,
    label: 'あなたにおすすめ',
  },
  {
    htmlCode: `ここに2つ目のA8.netの商品リンクコードをそのまま貼り付け`,
    label: 'こちらもおすすめ',
  },
];
