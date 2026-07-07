'use client';
import { useState, useEffect, useRef } from 'react';
import { FORTUNE_DATA } from '../src/data/fortuneData';
import { AD_BANNERS } from '../src/data/adBanners';
import { BANNER_RULES, DEFAULT_BANNER_IDS } from '../src/data/adBannerRules';
import { ADVICE_BY_STATUS } from '../src/data/advice';

// A8.netなど、<script>タグを含む「スクリプト実行型」の広告コードを
// 正しく動かすための専用コンポーネントです。
// (Reactは通常、innerHTML経由で挿入されたscriptタグを実行しないため、
//  scriptタグだけを作り直してDOMに追加し直しています)
function AdEmbed({ html }: { html: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = html;

    // 挿入したHTMLの中にある<script>タグを探して、実行されるように作り直す
    const oldScripts = Array.from(container.querySelectorAll('script'));
    oldScripts.forEach((oldScript) => {
      const newScript = document.createElement('script');
      Array.from(oldScript.attributes).forEach((attr) => {
        newScript.setAttribute(attr.name, attr.value);
      });
      // 元のコードに書かれた順番通りに実行させるための設定
      // (これがないと、外部ファイルの読み込みが後回しになり、
      //  まだ準備が整う前に次のscriptが動いてエラーになることがある)
      newScript.async = false;
      newScript.textContent = oldScript.textContent;
      oldScript.parentNode?.replaceChild(newScript, oldScript);
    });
  }, [html]);

  return <div ref={containerRef} className="flex justify-center" />;
}

const CHARACTERS = [
  {
    name: '慈愛のパンダ',
    emoji: '🐼',
    desc: '周囲を和ませる温かい心を持っています。争いを避け、調和を大切にする平和主義者です。',
  },
  {
    name: '情熱のイノシシ',
    emoji: '🐗',
    desc: '一度好きになると一直線に進みます。行動力と情熱で相手を惹きつけるパワーがあります。',
  },
  {
    name: '冷静なキツネ',
    emoji: '🦊',
    desc: '鋭い観察眼で相手の心を見抜く力があります。駆け引きは得意ですが、素直になれずにチャンスを逃してしまうことも。',
  },
  {
    name: 'ひたむきなウサギ',
    emoji: '🐰',
    desc: '寂しがり屋で甘え上手な、愛されキャラです。周囲との調和を大切にします。',
  },
  {
    name: '高嶺のネコ',
    emoji: '🐱',
    desc: 'マイペースでミステリアスな魅力があります。ひとりの時間を大切にし、駆け引きで相手を夢中にさせます。',
  },
  {
    name: '一途なイヌ',
    emoji: '🐶',
    desc: '非常に誠実で、パートナーを愛し抜く一途さを持っています。一度信頼を寄せると献身的に支えます。',
  },
  {
    name: '華やかなクジャク',
    emoji: '🦚',
    desc: '社交的で、その場の空気を明るくする華やかさがあります。主導権を握ることを好みます。',
  },
  {
    name: '自由なイルカ',
    emoji: '🐬',
    desc: '直感と感性を何よりも大切にする自由人です。束縛を嫌いますが、深い絆を大切にします。',
  },
  {
    name: '包容力のクマ',
    emoji: '🐻',
    desc: '頼りがいがあり、周囲を優しく包み込む世話焼きタイプです。穏やかな恋愛を好みます。',
  },
  {
    name: '知的なフクロウ',
    emoji: '🦉',
    desc: '客観的に状況を分析する、冷静な知性派です。感情に流されず将来性を見極めます。',
  },
  {
    name: '純粋なシカ',
    emoji: '🦌',
    desc: '感受性が人一倍強く、とても繊細でピュアな心を持っています。優しさに救われている人が多いでしょう。',
  },
  {
    name: '情熱のライオン',
    emoji: '🦁',
    desc: '自信に満ちたリーダー気質で、恋愛では相手を引っ張ることを好みます。',
  },
];

export default function Home() {
  const [status, setStatus] = useState('input');
  const [formData, setFormData] = useState({
    name: '',
    year: '',
    month: '',
    day: '',
    loveStatus: '',
    interest: '',
  });
  const [result, setResult] = useState({ char: CHARACTERS[0], text: '' });
  const displayName = formData.name.trim() ? `${formData.name.trim()}さん` : 'あなた';

  // 恋愛ステータス×気になっていることの組み合わせに応じて、
  // 表示するバナーだけを絞り込みます
  const bannerIdsToShow =
    BANNER_RULES[formData.loveStatus]?.[formData.interest] ??
    DEFAULT_BANNER_IDS;
  const bannersToShow = AD_BANNERS.filter((banner) =>
    bannerIdsToShow.includes(banner.id)
  );

  const startDiagnosis = () => {
    if (
      !formData.year ||
      !formData.month ||
      !formData.day ||
      !formData.loveStatus ||
      !formData.interest
    ) {
      alert('すべての項目を選択してくださいね。');
      return;
    }
    const charIdx =
      (parseInt(formData.year) +
        parseInt(formData.month) +
        parseInt(formData.day)) %
      CHARACTERS.length;
    const selectedChar = CHARACTERS[charIdx];

    // データから取得（ここがデータ反映の心臓部です）
    const text =
      FORTUNE_DATA[selectedChar.name]?.[formData.loveStatus]?.[
        formData.interest
      ] || '鑑定結果の準備中です...';

    setResult({ char: selectedChar, text });
    setStatus('loading');
    setTimeout(() => setStatus('result'), 3000);
  };

  return (
    <div className="min-h-screen bg-[#1a142d] text-white p-6 flex justify-center">
      {status === 'input' && (
        <div className="w-full max-w-md space-y-6">
          <div className="bg-[#2d2448] p-4 rounded-2xl border border-pink-500/30">
            <h1 className="text-xl font-bold text-center text-pink-400">
              🔮 恋愛迷子のための恋愛占い
            </h1>
            <p className="text-xs text-pink-300 text-center mt-1">
              恋愛キャラ診断付き
            </p>
          </div>
          <label className="text-sm text-pink-300 font-medium block">
            😊 お名前（ニックネームでもOK・空欄でも占えます）
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            placeholder="例：はなこ"
            className="w-full p-4 bg-[#2d2448] border border-gray-600 rounded-xl placeholder-gray-500"
          />
          <label className="text-sm text-pink-300 font-medium block">
            🎂 生年月日
          </label>
          <div className="flex gap-2">
            <select
              className="w-1/3 p-4 bg-[#2d2448] border border-gray-600 rounded-xl"
              onChange={(e) =>
                setFormData({ ...formData, year: e.target.value })
              }
            >
              <option value="">年</option>
              {/* 2006年から1966年まで降順で表示 */}
              {Array.from({ length: 41 }, (_, i) => 2006 - i).map((y) => (
                <option key={y} value={y}>
                  {y}年
                </option>
              ))}
            </select>
            <select
              className="w-1/3 p-4 bg-[#2d2448] border border-gray-600 rounded-xl"
              onChange={(e) =>
                setFormData({ ...formData, month: e.target.value })
              }
            >
              <option value="">月</option>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                <option key={m} value={m}>
                  {m}月
                </option>
              ))}
            </select>
            <select
              className="w-1/3 p-4 bg-[#2d2448] border border-gray-600 rounded-xl"
              onChange={(e) =>
                setFormData({ ...formData, day: e.target.value })
              }
            >
              <option value="">日</option>
              {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                <option key={d} value={d}>
                  {d}日
                </option>
              ))}
            </select>
          </div>
          <label className="text-sm text-pink-300 font-medium block">
            💌 今の恋愛ステータスは？
          </label>
          <select
            className="w-full p-4 bg-[#2d2448] border border-gray-600 rounded-xl"
            onChange={(e) =>
              setFormData({ ...formData, loveStatus: e.target.value })
            }
          >
            <option value="">選択してください</option>
            {['フリー', '片思い中', '復縁したい', '交際中'].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <label className="text-sm text-pink-300 font-medium block">
            💭 今一番気になっていること
          </label>
          <select
            className="w-full p-4 bg-[#2d2448] border border-gray-600 rounded-xl"
            onChange={(e) =>
              setFormData({ ...formData, interest: e.target.value })
            }
          >
            <option value="">選択してください</option>
            {['相手の本音', '2人の未来', '新しい出会い', 'その他'].map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
          <button
            onClick={startDiagnosis}
            className="w-full py-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl font-bold text-lg shadow-lg"
          >
            ✨ 占いスタート ✨
          </button>
        </div>
      )}

      {status === 'loading' && (
        <div className="text-center space-y-4 pt-20">
          <p>🔮 {displayName}の運勢を紐解いています...</p>
          <div className="w-64 h-3 bg-gray-700 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-pink-500 animate-[loading_3s_linear_forwards]"></div>
          </div>
        </div>
      )}

      {status === 'result' && (
        <div className="w-full max-w-sm space-y-6 pt-10 text-center">
          <div className="bg-[#2d2448] p-6 rounded-2xl border border-pink-500/30">
            <p className="text-sm mb-1">💫 {displayName}の恋愛キャラ</p>
            <h2 className="text-xl font-bold text-pink-400">
              {result.char.emoji} {result.char.name}
            </h2>
            <p className="text-sm text-gray-400 mt-2 italic">
              {result.char.desc}
            </p>
          </div>
          <div className="bg-[#2d2448] p-6 rounded-2xl border border-pink-500/30 text-left">
            <h3 className="text-center text-pink-300 font-bold mb-4 text-xl">
              💬 {displayName}の占い結果
            </h3>
            <p className="text-sm text-gray-200 leading-relaxed">
              {result.text.split('あなた').join(displayName)}
            </p>
          </div>
          <div className="bg-[#2d2448] p-6 rounded-2xl border border-pink-500/30 text-left">
            <h3 className="text-center text-pink-300 font-bold mb-4 text-xl">
              📝 {displayName}へのアドバイス
            </h3>
            <p className="text-sm text-gray-200 leading-relaxed">
              {ADVICE_BY_STATUS[formData.loveStatus]
                ?.split('あなた')
                .join(displayName)}
            </p>
          </div>
          {/* 広告バナー表示エリア */}
          <div className="space-y-4 pt-4">
            {bannersToShow.map((banner, idx) => (
              <div
                key={idx}
                className="bg-[#2d2448] p-3 rounded-2xl border border-pink-500/30 text-left"
              >
                <p className="text-xs text-pink-300 font-bold mb-2">
                  {banner.label.split('あなた').join(displayName)}
                </p>
                {banner.htmlCode ? (
                  // A8.netなどが発行した「そのまま貼るコード」を、
                  // scriptタグも含めて正しく実行するためのコンポーネントです
                  <AdEmbed html={banner.htmlCode} />
                ) : (
                  <a
                    href={banner.link}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="block rounded-xl overflow-hidden"
                  >
                    <img
                      src={banner.imageSrc}
                      alt={banner.alt}
                      className="w-full h-auto rounded-xl"
                    />
                  </a>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={() => setStatus('input')}
            className="w-full text-center text-pink-300 underline pt-2"
          >
            🔄 もう一度占う
          </button>
        </div>
      )}

      <style jsx global>{`
        @keyframes loading { from { width: 0%; } to { width: 100%; } }
      `}</style>
    </div>
  );
}
