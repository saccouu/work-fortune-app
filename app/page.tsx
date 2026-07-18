'use client';
import { useState } from 'react';
import { JOBS_DATA } from '../src/data/jobsData';
import { QUESTIONS } from '../src/data/questions';

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
    <div className="min-h-screen bg-[#1a142d] text-white p-6 flex justify-center">
      {/* ① 名前入力画面 */}
      {status === 'input' && (
        <div className="w-full max-w-md space-y-6">
          <div className="bg-[#2d2448] p-4 rounded-2xl border border-pink-500/30">
            <h1 className="text-xl font-bold text-center text-pink-400">
              あなたに向いている仕事＆資格診断
            </h1>
            <p className="text-sm text-pink-300 text-center mt-1">
              AI時代でも必要とされる、あなたの資質を診断します
            </p>
          </div>

          <label className="text-sm text-pink-300 font-medium block">
            お名前（ニックネームでもOK・空欄でも診断できます）
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="例：はなこ"
            className="w-full p-4 bg-[#2d2448] border border-gray-600 rounded-xl placeholder-gray-500"
          />

          <button
            onClick={startQuiz}
            className="w-full py-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl font-bold text-lg shadow-lg"
          >
            診断スタート
          </button>
        </div>
      )}

      {/* ② 質問画面 */}
      {status === 'question' && (
        <div className="w-full max-w-md space-y-6 pt-6">
          <p className="text-sm text-pink-300 text-center">
            質問 {currentQuestion + 1} / {QUESTIONS.length}
          </p>

          <div className="bg-[#2d2448] p-6 rounded-2xl border border-pink-500/30">
            <p className="text-base text-gray-100 leading-relaxed text-center">
              {QUESTIONS[currentQuestion].text}
            </p>
          </div>

          <div className="flex justify-between items-center px-2">
            <span className="text-xs text-gray-400">当てはまらない</span>
            <span className="text-xs text-gray-400">当てはまる</span>
          </div>

          <div className="flex justify-between gap-2">
            {[1, 2, 3, 4, 5].map((score) => (
              <button
                key={score}
                onClick={() => selectAnswer(score)}
                className={`flex-1 aspect-square rounded-full border-2 font-bold text-lg transition-colors ${
                  answers[currentQuestion] === score
                    ? 'bg-pink-500 border-pink-500 text-white'
                    : 'bg-[#2d2448] border-gray-600 text-gray-300'
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
                className="flex-1 py-3 border border-gray-600 rounded-xl text-gray-300"
              >
                戻る
              </button>
            )}
            <button
              onClick={goNext}
              className="flex-1 py-3 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl font-bold"
            >
              {currentQuestion < QUESTIONS.length - 1 ? '次へ' : '診断結果を見る'}
            </button>
          </div>
        </div>
      )}

      {/* ③ ローディング画面 */}
      {status === 'loading' && (
        <div className="text-center space-y-4 pt-20">
          <p>診断結果をまとめています...</p>
          <div className="w-64 h-3 bg-gray-700 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-pink-500 animate-[loading_2.5s_linear_forwards]"></div>
          </div>
        </div>
      )}

      {/* ④ 結果画面 */}
      {status === 'result' && (
        <div className="w-full max-w-sm space-y-6 pt-10 text-center">
          <div className="bg-[#2d2448] p-6 rounded-2xl border border-pink-500/30 text-left">
            <p className="text-sm mb-1 text-center">{displayName}に向いているのは</p>
            <h2 className="text-xl font-bold text-pink-400 text-center mb-4">
              {result.name}
            </h2>

            {result.trait.map((line, idx) => (
              <p key={idx} className="text-sm text-gray-200 leading-relaxed">
                {line.replace('〇〇さん', displayName)}
              </p>
            ))}
          </div>

          <div className="bg-[#2d2448] p-6 rounded-2xl border border-pink-500/30 text-left">
            <p className="text-sm text-gray-200 leading-relaxed mb-2">
              そんな{displayName}におすすめなのが、{result.name}の資格です。
            </p>
            {result.reason.map((line, idx) => (
              <p key={idx} className="text-sm text-gray-200 leading-relaxed">
                {line}
              </p>
            ))}
          </div>

          <div className="bg-[#2d2448] p-6 rounded-2xl border border-pink-500/30 text-left">
            <p className="text-sm text-gray-200 leading-relaxed mb-2">
              {result.name}には、こんな資格があります。
            </p>
            <p className="text-sm text-gray-200 leading-relaxed">
              {result.qualifications.map((q) => `・${q}`).join('\n')}
              {'\nなど'}
            </p>
          </div>

          <div className="bg-[#2d2448] p-4 rounded-2xl border border-pink-500/30">
            <p className="text-sm text-pink-300 mb-3">
              💡 最短2ヶ月・自宅で資格取得できます。
            </p>
            <a
              href={result.link || '#'}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="block w-full py-3 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl font-bold text-sm"
            >
              {result.buttonLabel} →
            </a>
            <p className="text-xs text-gray-400 mt-2">1日30分の学習でOK</p>
          </div>

          <button
            onClick={restart}
            className="w-full text-center text-pink-300 underline pt-2"
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
