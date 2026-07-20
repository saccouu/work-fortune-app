'use client';
import { useState, useEffect, useRef } from 'react';
import { JOBS_DATA } from '../src/data/jobsData';
import { QUESTIONS } from '../src/data/questions';
import { OTHER_JOBS_LINK } from '../src/data/otherJobsLink';

// A8.netなど、計測用の<img>タグや<script>タグを含む
// 「そのまま貼るコード」を、正しく表示するための専用コンポーネントです。
function AdEmbed({ html }: { html: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = html;

    const oldScripts = Array.from(container.querySelectorAll('script'));
    oldScripts.forEach((oldScript) => {
      const newScript = document.createElement('script');
      Array.from(oldScript.attributes).forEach((attr) => {
        newScript.setAttribute(attr.name, attr.value);
      });
      newScript.async = false;
      newScript.textContent = oldScript.textContent;
      oldScript.parentNode?.replaceChild(newScript, oldScript);
    });
  }, [html]);

  return <div ref={containerRef} />;
}

// カテゴリのidごとに、結果画面のタイトル横に添える絵文字です。
const CATEGORY_EMOJI: { [key: string]: string } = {
  mentality: '🧠',
  biyo: '💆',
  uranai: '🔮',
  syoku: '🍎',
  syugei: '🧵',
  pet: '🐾',
  katazuke: '🧹',
  syokubutsu: '🌸',
  design: '🛋️',
};

// 参考画像のような「波型の二重線フレーム」を再現する共通パーツです。
// 内側に白いカード、外側にピンクの波型の縁取りを重ねています。
function ScallopFrame({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      {/* 外側：波型に見せるための、ぼかしたピンクの縁 */}
      <div
        className="absolute -inset-2 rounded-[2rem] bg-[#F4B9C9]"
        style={{
          boxShadow: '0 0 0 3px #F4B9C9, 0 0 0 5px #FFFFFF, 0 0 0 8px #F4B9C9',
        }}
      />
      {/* 内側：本体の白いカード */}
      <div className="relative bg-white rounded-[1.7rem] border-2 border-[#E89AAE] p-5">
        {children}
      </div>
    </div>
  );
}

// バナー(旗)型の見出しパーツです。「質問1/11」のような表示に使います。
function BannerLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center relative z-10 -mb-3">
      <div
        className="bg-[#F2879A] text-white font-bold text-sm px-6 py-2 border-2 border-[#3D3226]"
        style={{
          clipPath:
            'polygon(4% 0%, 96% 0%, 100% 35%, 96% 70%, 100% 100%, 4% 100%, 0% 70%, 4% 35%)',
        }}
      >
        {children}
      </div>
    </div>
  );
}

// 四隅に散らす、星やキラキラの飾りです。
function SparkleDecor() {
  return (
    <>
      <span className="absolute top-2 left-3 text-lg text-[#F2C24E]">✨</span>
      <span className="absolute top-4 right-4 text-sm text-[#F2C24E]">⭐</span>
      <span className="absolute bottom-3 left-5 text-sm text-[#F2C24E]">⭐</span>
      <span className="absolute bottom-2 right-3 text-lg text-[#F2C24E]">✨</span>
    </>
  );
}

// 5段階の回答ボタンの色(参考画像と同じ、金色の丸)
const SCALE_COLOR = { bg: '#E8B84A', border: '#B5892A' };

export default function Home() {
  const [status, setStatus] = useState('input');
  const [name, setName] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(QUESTIONS.length).fill(null)
  );
  const [result, setResult] = useState(JOBS_DATA[0]);

  const displayName = name.trim() ? `${name.trim()}さん` : 'あなた';

  const startQuiz = () => {
    setCurrentQuestion(0);
    setAnswers(Array(QUESTIONS.length).fill(null));
    setStatus('question');
  };

  const selectAnswer = (score: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = score;
    setAnswers(newAnswers);
  };

  const goNext = () => {
    if (answers[currentQuestion] === null) {
      alert('選択肢を選んでくださいね。');
      return;
    }
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult();
    }
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResult = () => {
    const scoreMap: { [key: string]: number } = {};
    const countMap: { [key: string]: number } = {};
    JOBS_DATA.forEach((job) => {
      scoreMap[job.id] = 0;
      countMap[job.id] = 0;
    });

    QUESTIONS.forEach((question, index) => {
      const answerScore = answers[index] ?? 0;
      question.scores.forEach((categoryId) => {
        scoreMap[categoryId] += answerScore;
        countMap[categoryId] += 1;
      });
    });

    const averages = JOBS_DATA.map((job) => {
      const average = countMap[job.id] > 0 ? scoreMap[job.id] / countMap[job.id] : 0;
      return { job, average: Math.round(average * 1000) / 1000 };
    });
    const topAverage = Math.max(...averages.map((a) => a.average));
    const topCandidates = averages.filter((a) => a.average === topAverage);
    const topJob =
      topCandidates[Math.floor(Math.random() * topCandidates.length)].job;

    setResult(topJob);
    setStatus('loading');
    setTimeout(() => setStatus('result'), 2500);
  };

  const restart = () => {
    setName('');
    setStatus('input');
  };

  return (
    <div className="min-h-screen bg-[#F7E3DB] text-[#4A3F35] p-6 flex justify-center items-center relative overflow-hidden">
      {/* ① 名前入力画面 */}
      {status === 'input' && (
        <div className="w-full max-w-md relative mx-auto">
          {/* 背景：全体デザイン画像(タイトル・イラスト・メモ帳の余白まで描かれています) */}
          <img
            src="/ads/top-full.png"
            alt="あなたにピッタリの資格診断"
            className="w-full h-auto block"
          />

          {/* 前景：画像内の「メモ帳」の余白部分に、実際の入力欄・ボタンを重ねて配置 */}
          <div
            className="absolute flex flex-col justify-start gap-2 px-[9%]"
            style={{ top: '70%', left: 0, right: 0 }}
          >
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="お名前（ニックネームでもOK）"
              style={{ fontSize: '16px' }}
              className="w-full p-3 bg-white/90 border border-[#D9C8AE] rounded-xl placeholder-[#B5A48C] text-[#4A3F35] text-center"
            />
            <button
              onClick={startQuiz}
              className="pop-heading w-full py-2.5 bg-[#CC6152] rounded-xl font-bold text-white border-2 border-[#3D3226] shadow-[3px_3px_0_0_#3D3226] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
            >
              診断スタート 🎯
            </button>
          </div>
        </div>
      )}

      {/* ② 質問画面 */}
      {status === 'question' && (
        <div className="w-full max-w-md space-y-4 pt-8 relative">
          <BannerLabel>
            質問 {currentQuestion + 1} / {QUESTIONS.length}
          </BannerLabel>

          <ScallopFrame>
            <SparkleDecor />
            <p className="text-base text-[#4A3F35] leading-relaxed text-center font-bold pt-2">
              {QUESTIONS[currentQuestion].text}
            </p>
          </ScallopFrame>

          <div className="flex justify-between items-center px-1 pt-1">
            <span className="text-xs text-[#A69885] font-bold">当てはまらない</span>
            <span className="text-xs text-[#A69885] font-bold">どちらとも言えない</span>
            <span className="text-xs text-[#A69885] font-bold">当てはまる</span>
          </div>

          <div className="flex justify-between gap-2">
            {[1, 2, 3, 4, 5].map((score) => {
              const isSelected = answers[currentQuestion] === score;
              return (
                <button
                  key={score}
                  onClick={() => selectAnswer(score)}
                  style={{
                    backgroundColor: isSelected ? SCALE_COLOR.bg : '#FFFFFF',
                    borderColor: isSelected ? SCALE_COLOR.border : '#D9C8AE',
                  }}
                  className={`flex-1 aspect-square rounded-full border-2 font-bold text-lg transition-all ${
                    isSelected
                      ? 'text-white scale-110 shadow-[2px_2px_0_0_#3D3226]'
                      : 'text-[#8A7A65]'
                  }`}
                >
                  {score}
                </button>
              );
            })}
          </div>

          <img
            src={`/ads/q${currentQuestion + 1}.png`}
            alt={`質問${currentQuestion + 1}`}
            className="w-40 mx-auto pt-2"
          />

          <div className="flex gap-3 pt-2">
            {currentQuestion > 0 && (
              <button
                onClick={goBack}
                className="flex-1 py-3 border-2 border-[#D9C8AE] rounded-2xl text-[#8A7A65] bg-white font-bold"
              >
                戻る
              </button>
            )}
            <button
              onClick={goNext}
              className="pop-heading flex-1 py-3 bg-[#CC6152] rounded-2xl font-bold text-white border-2 border-[#3D3226] shadow-[3px_3px_0_0_#3D3226] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
            >
              {currentQuestion < QUESTIONS.length - 1 ? '次へ' : '診断結果を見る'}
            </button>
          </div>
        </div>
      )}

      {/* ③ ローディング画面 */}
      {status === 'loading' && (
        <div className="text-center space-y-4 pt-16 relative">
          <img
            src="/ads/loading.png"
            alt="診断中"
            className="w-48 mx-auto"
          />
          <p className="text-[#8A7A65] font-bold">診断結果をまとめています... 🔍</p>
          <div className="w-64 h-4 bg-[#E8DCC8] rounded-full mx-auto overflow-hidden border-2 border-[#3D3226]">
            <div className="h-full bg-gradient-to-r from-[#DE94B0] via-[#F2C24E] to-[#CC6152] animate-[loading_2.5s_linear_forwards]"></div>
          </div>
        </div>
      )}

      {/* ④ 結果画面 */}
      {status === 'result' && (
        <div className="w-full max-w-sm space-y-5 pt-8 text-center relative">
          <BannerLabel>🍴 {displayName}に向いているのは</BannerLabel>

          <ScallopFrame>
            <SparkleDecor />
            <h2 className="pop-heading text-2xl font-bold text-[#CC6152] text-center mb-3 pt-1">
              {CATEGORY_EMOJI[result.id] || '✨'} {result.name}
            </h2>
            <img
              src="/ads/result.png"
              alt="診断結果"
              className="w-36 mx-auto mb-3"
            />
            {result.trait.map((line, idx) => (
              <p key={idx} className="text-sm text-[#5C4F42] leading-relaxed text-left">
                {line.replace('〇〇さん', displayName)}
              </p>
            ))}
          </ScallopFrame>

          <div className="bg-white p-6 rounded-3xl border-2 border-[#3D3226] shadow-[4px_4px_0_0_#3D3226] text-left">
            <p className="text-sm text-[#5C4F42] leading-relaxed mb-2">
              そんな{displayName}におすすめなのが、{result.name}の資格です。
            </p>
            {result.reason.map((line, idx) => (
              <p key={idx} className="text-sm text-[#5C4F42] leading-relaxed">
                {line}
              </p>
            ))}
          </div>

          <div className="bg-white p-6 rounded-3xl border-2 border-[#3D3226] shadow-[4px_4px_0_0_#3D3226] text-left">
            <p className="text-sm text-[#5C4F42] leading-relaxed mb-2 font-bold">
              🥄 {result.name}には、こんな資格があります。 🥄
            </p>
            <p className="text-sm text-[#5C4F42] leading-relaxed">
              {result.qualifications.map((q) => `・${q}`).join('\n')}
              {'\nなど'}
            </p>
          </div>

          <div className="bg-white p-4 rounded-3xl border-2 border-[#3D3226] shadow-[4px_4px_0_0_#3D3226]">
            <p className="text-sm text-[#CC6152] font-bold mb-3">
              💡 最短2ヶ月・自宅で資格取得できます。
            </p>
            {result.htmlCode ? (
              <div className="[&_a]:block [&_a]:w-full [&_a]:py-3 [&_a]:bg-[#CC6152] [&_a]:rounded-2xl [&_a]:font-bold [&_a]:text-sm [&_a]:text-center [&_a]:text-white [&_a]:no-underline [&_a]:border-2 [&_a]:border-[#3D3226]">
                <AdEmbed html={result.htmlCode} />
              </div>
            ) : (
              <a
                href={result.link || '#'}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="block w-full py-3 bg-[#CC6152] rounded-2xl font-bold text-sm text-white border-2 border-[#3D3226]"
              >
                {result.buttonLabel} →
              </a>
            )}
            <p className="text-xs text-[#A69885] mt-2">1日30分の学習でOK</p>
          </div>

          {(OTHER_JOBS_LINK.htmlCode || OTHER_JOBS_LINK.link) && (
            <div className="pt-1">
              {OTHER_JOBS_LINK.htmlCode ? (
                <div className="[&_a]:text-[#F2924E] [&_a]:underline [&_a]:text-sm [&_a]:font-bold">
                  <AdEmbed html={OTHER_JOBS_LINK.htmlCode} />
                </div>
              ) : (
                <a
                  href={OTHER_JOBS_LINK.link}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="block text-center text-[#F2924E] underline text-sm font-bold"
                >
                  {OTHER_JOBS_LINK.label} →
                </a>
              )}
            </div>
          )}

          <button
            onClick={restart}
            className="w-full text-center text-[#8A7A65] underline pt-2"
          >
            もう一度診断する
          </button>
        </div>
      )}

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@700;800&display=swap');

        .pop-heading {
          font-family: 'M PLUS Rounded 1c', sans-serif;
        }

        @keyframes loading {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
        p {
          white-space: pre-line;
        }
      `}</style>
    </div>
  );
}
