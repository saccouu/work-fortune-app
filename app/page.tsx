"use client";

import { useEffect, useState } from "react";
import { QUESTIONS, ResultType } from "../src/data/questions";
import { RESULTS, AFFILIATE_HTML_CODE } from "../src/data/results";
import { AdEmbed } from "../src/components/AdEmbed";

type Screen = "quiz" | "result";

export default function Page() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<ResultType[]>([]);
  const [screen, setScreen] = useState<Screen>("quiz");
  const [locked, setLocked] = useState(false);

  const total = QUESTIONS.length;

  // 質問が切り替わった直後は、カーソルが前の選択肢の上に残ったままの状態で
  // 新しい選択肢が同じ位置に描画されるため、ブラウザが自動でホバー表示を
  // つけてしまう（＝前の選択が引き継がれたように見える）。
  // これを防ぐため、切り替え直後の一瞬だけホバー・クリックを無効化し、
  // マウスが実際に動くか一定時間が経ったら解除する。
  useEffect(() => {
    setLocked(true);
    function unlock() {
      setLocked(false);
    }
    window.addEventListener("mousemove", unlock, { once: true });
    const timer = setTimeout(unlock, 500);
    return () => {
      window.removeEventListener("mousemove", unlock);
      clearTimeout(timer);
    };
  }, [current]);

  function handleAnswer(type: ResultType) {
    const next = [...answers, type];
    setAnswers(next);
    if (current + 1 < total) {
      setCurrent(current + 1);
    } else {
      setScreen("result");
    }
  }

  function handleRestart() {
    setCurrent(0);
    setAnswers([]);
    setScreen("quiz");
  }

  function getResultType(): ResultType {
    const counts: Record<ResultType, number> = { A: 0, B: 0, C: 0, D: 0 };
    answers.forEach((t) => (counts[t] += 1));
    let best: ResultType = "A";
    let bestScore = -1;
    (Object.keys(counts) as ResultType[]).forEach((key) => {
      if (counts[key] > bestScore) {
        bestScore = counts[key];
        best = key;
      }
    });
    return best;
  }

  const litFlames =
    screen === "result" ? 5 : Math.round((current / total) * 5);

  return (
    <div className="min-h-screen flex items-start justify-center px-4 py-12 bg-[#0b0908]">
      <div className="w-full max-w-lg">
        <div className="text-center mb-7">
          <div className="flex justify-center gap-3 h-6 mb-3">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`w-1.5 h-2.5 rounded-full transition-opacity duration-300 ${
                  i < litFlames
                    ? "bg-[#c6a15b] opacity-100 shadow-[0_0_7px_rgba(198,161,91,0.85)]"
                    : "bg-[#c6a15b]/30 opacity-40"
                }`}
              />
            ))}
          </div>
          <div className="text-[11px] tracking-[0.24em] uppercase text-[#a79885]">
            30代からの本気婚活
          </div>
          <h1 className="font-serif-jp text-2xl mt-2 mb-1 tracking-wide text-[#f3ecdf]">
            あなたの婚活タイプ診断
          </h1>
          <div className="text-[13px] text-[#a79885]">
            全{total}問・約1分／レイコ先生が本音で見立てるわ
          </div>
        </div>

        {screen === "quiz" && (
          <div className="flex justify-center gap-2 mb-5">
            {QUESTIONS.map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full ${
                  i < current ? "bg-[#c6a15b]" : "bg-[#c6a15b]/25"
                }`}
              />
            ))}
          </div>
        )}

        <div className="relative bg-[#1c1713] border border-[#c6a15b]/30 rounded-sm p-8 text-[#f3ecdf]">
          {screen === "quiz" ? (
            <div key={current} className="animate-fadeIn">
              <div className="font-serif-jp text-[#c6a15b] text-sm tracking-wide mb-2">
                Q{current + 1} / {total}
              </div>
              <div className="text-lg leading-relaxed mb-6 font-medium">
                {QUESTIONS[current].text}
              </div>
              <div
                className={`flex flex-col gap-2.5 ${
                  locked ? "pointer-events-none" : ""
                }`}
              >
                {QUESTIONS[current].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(opt.type)}
                    className="text-left border border-[#c6a15b]/30 rounded-sm px-5 py-4 text-[14.5px] leading-relaxed hover:border-[#c6a15b] hover:bg-[#c6a15b]/5 hover:translate-x-0.5 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c6a15b] focus-visible:outline-offset-2"
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <ResultView type={getResultType()} onRestart={handleRestart} />
          )}
        </div>
      </div>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@600;800&family=Noto+Sans+JP:wght@400;500;700&display=swap");

        .font-serif-jp {
          font-family: "Shippori Mincho", "Hiragino Mincho ProN", serif;
        }
        body {
          font-family: "Noto Sans JP", "Hiragino Kaku Gothic ProN", sans-serif;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.35s ease both;
        }
      `}</style>
    </div>
  );
}

function ResultView({
  type,
  onRestart,
}: {
  type: ResultType;
  onRestart: () => void;
}) {
  const result = RESULTS[type];
  return (
    <div className="animate-fadeIn">
      <div className="font-serif-jp text-[#c6a15b] text-xs tracking-[0.2em] text-center mb-1">
        {result.tag}
      </div>
      <h2 className="font-serif-jp text-3xl text-center mb-6 tracking-wide">
        {result.title}
      </h2>
      <div className="bg-[#c6a15b]/5 border-l-2 border-[#c6a15b] px-5 py-4 mb-6 text-[15px] leading-loose">
        {result.body.map((line, i) => (
          <p key={i} className={i > 0 ? "mt-2.5" : ""}>
            {line}
          </p>
        ))}
      </div>
      <div className="text-center">
        <div className="text-[13px] text-[#a79885] mb-4 leading-relaxed">
          入会するかは、資料を見てから決めればいいのよ。
          <br />
          まずは無料で取り寄せてみなさい。
        </div>
        <div className="[&_a]:block [&_a]:w-full [&_a]:py-4 [&_a]:bg-gradient-to-b [&_a]:from-[#7b2438] [&_a]:to-[#5c1b2b] [&_a]:rounded-sm [&_a]:font-serif-jp [&_a]:text-[#f6e9d8] [&_a]:text-center [&_a]:no-underline [&_a]:border [&_a]:border-[#c6a15b]/50">
          <AdEmbed html={AFFILIATE_HTML_CODE} />
        </div>
        <p className="text-[11px] text-[#a79885] mt-3 leading-relaxed">
          ※本ページは提携する結婚相談所比較サービスへのご案内です（広告・PR）
        </p>
      </div>
      <button
        onClick={onRestart}
        className="block mx-auto mt-6 text-xs text-[#a79885] underline"
      >
        もう一度診断する
      </button>
    </div>
  );
}
