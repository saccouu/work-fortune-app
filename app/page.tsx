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

    // 挿入したHTMLの中にある<script>タグを探して、実行されるように作り直す
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

export default function Home() {
  // 画面の状態: 'input'(名前入力) → 'question'(質問中) → 'loading'(診断中) → 'result'(結果)
  const [status, setStatus] = useState('input');
  const [name, setName] = useState('');

  // 現在何問目か(0から数える)
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // 各質問の回答(1〜5)を、質問の数だけ保存しておく配列
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(QUESTIONS.length).fill(null)
  );

  const [result, setResult] = useState(JOBS_DATA[0]);

  const displayName = name.trim() ? `${name.trim()}さん` : 'あなた';

  // 診断スタート(名前入力画面→質問画面へ)
  const startQuiz = () => {
    setCurrentQuestion(0);
    setAnswers(Array(QUESTIONS.length).fill(null));
    setStatus('question');
  };

  // 質問に回答したときの処理
  const selectAnswer = (score: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = score;
    setAnswers(newAnswers);
  };

  // 「次へ」ボタン
  const goNext = () => {
    if (answers[currentQuestion] === null) {
      alert('選択肢を選んでくださいね。');
      return;
    }
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // 最後の質問だった場合、集計して結果を出す
      calculateResult();
    }
  };

  // 「戻る」ボタン
  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // 集計処理
  const calculateResult = () => {
    // 各カテゴリの得点を集計するための入れ物
    const scoreMap: { [key: string]: number } = {};
    JOBS_DATA.forEach((job) => {
      scoreMap[job.id] = 0;
    });

    QUESTIONS.forEach((question, index) => {
      const answerScore = answers[index] ?? 0;
      question.scores.forEach((categoryId) => {
        scoreMap[categoryId] += answerScore;
      });
    });

    // 一番得点が高いカテゴリを探す(同点の場合は先に出てきた方=JOBS_DATAの並び順を優先)
    let topJob = JOBS_DATA[0];
    let topScore = -1;
    JOBS_DATA.forEach((job) => {
      if (scoreMap[job.id] > topScore) {
        topScore = scoreMap[job.id];
        topJob = job;
      }
    });

    setResult(topJob);
    setStatus('loading');
    setTimeout(() => setStatus('result'), 2500);
  };

  const restart = () => {
    setName('');
    setStatus('input');
  };

  return (
    <div className="min-h-screen bg-[#FBF6EE] text-[#4A3F35] p-6 flex justify-center">
      {/* ① 名前入力画面 */}
      {status === 'input' && (
        <div className="w-full max-w-md space-y-6">
          <div className="bg-white p-4 rounded-2xl border border-[#E8DCC8] shadow-sm">
            <h1 className="text-xl font-bold text-center text-[#C97B4A]">
              あなたに向いている仕事＆資格診断
            </h1>
            <p className="text-sm text-[#B5673A] text-center mt-1">
              AI時代でも必要とされる、あなたの資質を診断します
            </p>
          </div>

          <label className="text-sm text-[#B5673A] font-medium block">
            お名前（ニックネームでもOK・空欄でも診断できます）
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="例：はなこ"
            className="w-full p-4 bg-white border border-[#D9C8AE] rounded-xl placeholder-[#B5A48C] text-[#4A3F35]"
          />

          <button
            onClick={startQuiz}
            className="w-full py-4 bg-gradient-to-r from-[#E8A87C] to-[#D4875A] rounded-2xl font-bold text-lg text-white shadow-sm"
          >
            診断スタート
          </button>
        </div>
      )}

      {/* ② 質問画面 */}
      {status === 'question' && (
        <div className="w-full max-w-md space-y-6 pt-6">
          <p className="text-sm text-[#B5673A] text-center">
            質問 {currentQuestion + 1} / {QUESTIONS.length}
          </p>

          <div className="bg-white p-6 rounded-2xl border border-[#E8DCC8] shadow-sm">
            <p className="text-base text-[#4A3F35] leading-relaxed text-center">
              {QUESTIONS[currentQuestion].text}
            </p>
          </div>

          <div className="flex justify-between items-center px-2">
            <span className="text-xs text-[#A69885]">当てはまらない</span>
            <span className="text-xs text-[#A69885]">当てはまる</span>
          </div>

          <div className="flex justify-between gap-2">
            {[1, 2, 3, 4, 5].map((score) => (
              <button
                key={score}
                onClick={() => selectAnswer(score)}
                className={`flex-1 aspect-square rounded-full border-2 font-bold text-lg transition-colors ${
                  answers[currentQuestion] === score
                    ? 'bg-[#D98E5F] border-[#D98E5F] text-white'
                    : 'bg-white border-[#D9C8AE] text-[#8A7A65]'
                }`}
              >
                {score}
              </button>
            ))}
          </div>

          <div className="flex gap-3 pt-4">
            {currentQuestion > 0 && (
              <button
                onClick={goBack}
                className="flex-1 py-3 border border-[#D9C8AE] rounded-xl text-[#8A7A65] bg-white"
              >
                戻る
              </button>
            )}
            <button
              onClick={goNext}
              className="flex-1 py-3 bg-gradient-to-r from-[#E8A87C] to-[#D4875A] rounded-xl font-bold text-white"
            >
              {currentQuestion < QUESTIONS.length - 1 ? '次へ' : '診断結果を見る'}
            </button>
          </div>
        </div>
      )}

      {/* ③ ローディング画面 */}
      {status === 'loading' && (
        <div className="text-center space-y-4 pt-20">
          <p className="text-[#8A7A65]">診断結果をまとめています...</p>
          <div className="w-64 h-3 bg-[#E8DCC8] rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-[#D98E5F] animate-[loading_2.5s_linear_forwards]"></div>
          </div>
        </div>
      )}

      {/* ④ 結果画面 */}
      {status === 'result' && (
        <div className="w-full max-w-sm space-y-6 pt-10 text-center">
          <div className="bg-white p-6 rounded-2xl border border-[#E8DCC8] shadow-sm text-left">
            <p className="text-sm mb-1 text-center text-[#8A7A65]">{displayName}に向いているのは</p>
            <h2 className="text-xl font-bold text-[#C97B4A] text-center mb-4">
              {result.name}
            </h2>

            {result.trait.map((line, idx) => (
              <p key={idx} className="text-sm text-[#5C4F42] leading-relaxed">
                {line.replace('〇〇さん', displayName)}
              </p>
            ))}
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E8DCC8] shadow-sm text-left">
            <p className="text-sm text-[#5C4F42] leading-relaxed mb-2">
              そんな{displayName}におすすめなのが、{result.name}の資格です。
            </p>
            {result.reason.map((line, idx) => (
              <p key={idx} className="text-sm text-[#5C4F42] leading-relaxed">
                {line}
              </p>
            ))}
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E8DCC8] shadow-sm text-left">
            <p className="text-sm text-[#5C4F42] leading-relaxed mb-2">
              {result.name}には、こんな資格があります。
            </p>
            <p className="text-sm text-[#5C4F42] leading-relaxed">
              {result.qualifications.map((q) => `・${q}`).join('\n')}
              {'\nなど'}
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#E8DCC8] shadow-sm">
            <p className="text-sm text-[#B5673A] mb-3">
              💡 最短2ヶ月・自宅で資格取得できます。
            </p>
            {result.htmlCode ? (
              <div className="[&_a]:block [&_a]:w-full [&_a]:py-3 [&_a]:bg-gradient-to-r [&_a]:from-[#E8A87C] [&_a]:to-[#D4875A] [&_a]:rounded-xl [&_a]:font-bold [&_a]:text-sm [&_a]:text-center [&_a]:text-white [&_a]:no-underline">
                <AdEmbed html={result.htmlCode} />
              </div>
            ) : (
              <a
                href={result.link || '#'}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="block w-full py-3 bg-gradient-to-r from-[#E8A87C] to-[#D4875A] rounded-xl font-bold text-sm text-white"
              >
                {result.buttonLabel} →
              </a>
            )}
            <p className="text-xs text-[#A69885] mt-2">1日30分の学習でOK</p>
          </div>

          {/* サブリンク：診断結果にピンとこなかった人向けの受け皿 */}
          {(OTHER_JOBS_LINK.htmlCode || OTHER_JOBS_LINK.link) && (
            <div className="pt-1">
              {OTHER_JOBS_LINK.htmlCode ? (
                <div className="[&_a]:text-[#B5673A] [&_a]:underline [&_a]:text-sm">
                  <AdEmbed html={OTHER_JOBS_LINK.htmlCode} />
                </div>
              ) : (
                <a
                  href={OTHER_JOBS_LINK.link}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="block text-center text-[#B5673A] underline text-sm"
                >
                  {OTHER_JOBS_LINK.label} →
                </a>
              )}
            </div>
          )}

          <button
            onClick={restart}
            className="w-full text-center text-[#B5673A] underline pt-2"
          >
            もう一度診断する
          </button>
        </div>
      )}

      <style jsx global>{`
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
