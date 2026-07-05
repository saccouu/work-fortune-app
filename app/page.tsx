'use client';
import { useState } from 'react';
import { FORTUNE_DATA } from '../src/data/fortuneData';
import { AD_BANNERS } from '../src/data/adBanners';

const CHARACTERS = [
  {
    name: '慈愛のパンダ',
    desc: '周囲を和ませる温かい心を持っています。争いを避け、調和を大切にする平和主義者です。',
  },
  {
    name: '情熱のイノシシ',
    desc: '一度好きになると一直線に進みます。行動力と情熱で相手を惹きつけるパワーがあります。',
  },
  {
    name: '冷静なキツネ',
    desc: '鋭い観察眼で相手の心を見抜く力があります。駆け引きは得意ですが、素直になれずにチャンスを逃してしまうことも。',
  },
  {
    name: 'ひたむきなウサギ',
    desc: '寂しがり屋で甘え上手な、愛されキャラです。周囲との調和を大切にします。',
  },
  {
    name: '高嶺のネコ',
    desc: 'マイペースでミステリアスな魅力があります。ひとりの時間を大切にし、駆け引きで相手を夢中にさせます。',
  },
  {
    name: '一途なイヌ',
    desc: '非常に誠実で、パートナーを愛し抜く一途さを持っています。一度信頼を寄せると献身的に支えます。',
  },
  {
    name: '華やかなクジャク',
    desc: '社交的で、その場の空気を明るくする華やかさがあります。主導権を握ることを好みます。',
  },
  {
    name: '自由なイルカ',
    desc: '直感と感性を何よりも大切にする自由人です。束縛を嫌いますが、深い絆を大切にします。',
  },
  {
    name: '包容力のクマ',
    desc: '頼りがいがあり、周囲を優しく包み込む世話焼きタイプです。穏やかな恋愛を好みます。',
  },
  {
    name: '知的なフクロウ',
    desc: '客観的に状況を分析する、冷静な知性派です。感情に流されず将来性を見極めます。',
  },
  {
    name: '純粋なシカ',
    desc: '感受性が人一倍強く、とても繊細でピュアな心を持っています。優しさに救われている人が多いでしょう。',
  },
  {
    name: '情熱のライオン',
    desc: '自信に満ちたリーダー気質で、恋愛では相手を引っ張ることを好みます。',
  },
];

export default function Home() {
  const [status, setStatus] = useState('input');
  const [formData, setFormData] = useState({
    year: '',
    month: '',
    day: '',
    loveStatus: '',
    interest: '',
  });
  const [result, setResult] = useState({ char: CHARACTERS[0], text: '' });

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
          <h1 className="text-xl font-bold text-center text-pink-400">
            あなたの恋愛キャラと運命を占う
          </h1>
          <label className="text-sm text-pink-300 font-medium block">
            生年月日
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
            今の恋愛ステータスは？
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
            今一番気になっていること
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
            占いスタート
          </button>
        </div>
      )}

      {status === 'loading' && (
        <div className="text-center space-y-4 pt-20">
          <p>あなたの運勢を紐解いています...</p>
          <div className="w-64 h-3 bg-gray-700 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-pink-500 animate-[loading_3s_linear_forwards]"></div>
          </div>
        </div>
      )}

      {status === 'result' && (
        <div className="w-full max-w-sm space-y-6 pt-10 text-center">
          <div>
            <p className="text-sm mb-1">あなたの恋愛キャラ</p>
            <h2 className="text-2xl font-bold text-pink-400">
              「{result.char.name}」
            </h2>
            <p className="text-sm text-gray-400 mt-2 italic">
              {result.char.desc}
            </p>
          </div>
          <div className="bg-[#2d2448] p-6 rounded-2xl border border-pink-500/30 text-left">
            <h3 className="text-center text-pink-300 font-bold mb-4">
              恋愛診断結果
            </h3>
            <p className="text-sm text-gray-200 leading-relaxed">
              {result.text}
            </p>
          </div>
          <button
            onClick={() => setStatus('input')}
            className="w-full text-center text-pink-300 underline pt-2"
          >
            もう一度占う
          </button>

          {/* 広告バナー表示エリア */}
          <div className="space-y-4 pt-4">
            {AD_BANNERS.map((banner, idx) => (
              <a
                key={idx}
                href={banner.link}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="block rounded-2xl overflow-hidden shadow-lg border border-pink-500/20"
              >
                <img
                  src={banner.imageSrc}
                  alt={banner.alt}
                  className="w-full h-auto"
                />
              </a>
            ))}
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes loading { from { width: 0%; } to { width: 100%; } }
      `}</style>
    </div>
  );
}
