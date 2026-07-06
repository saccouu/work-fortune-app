// 広告バナーの管理ファイルです。
// 1つのオブジェクトが1つのバナーに対応します。
//
// 【パターンA】自分で用意した画像＋リンクを使う場合
//   { imageSrc, link, alt, label } の形で追加してください。
//
// 【パターンB】A8.netなどASPが発行した「そのまま貼るコード」を使う場合
//   { htmlCode, label } の形で追加してください。
//   htmlCode には、A8.netの「素材をコピー」ボタンで取得したコードを
//   1文字も書き換えずに、まるごとそのまま貼り付けてください。
//   （見えない計測用の画像タグが含まれていることがありますが、絶対に消さないでください）
//
// label: バナーの左上に小さく表示される見出し文字（例: "あなたにおすすめ"）

export const AD_BANNERS = [
  {
    imageSrc: '/ads/banner1.png',
    link: 'https://example.com/your-affiliate-link-1',
    alt: 'ココナラ',
    label: 'あなたにおすすめ',
  },
  {
    imageSrc: '/ads/banner2.png',
    link: 'https://example.com/your-affiliate-link-2',
    alt: 'ブリランテ',
    label: 'こちらもおすすめ',
  },
  // A8.netの商品リンクコードを追加する場合はこのように書きます。
  // htmlCodeの中身は、A8.netからコピーしたコードをそのまま貼り付けてください（改変禁止）。
  // {
  //   htmlCode: `<a href="https://px.a8.net/svt/ejp?..." rel="nofollow">
  //   <img border="0" width="300" height="250" alt="" src="https://www26.a8.net/svt/bgt?...">
  //   </a>
  //   <img border="0" width="1" height="1" src="https://www17.a8.net/0.gif?...">`,
  //   label: 'こちらもおすすめ',
  // },
];
