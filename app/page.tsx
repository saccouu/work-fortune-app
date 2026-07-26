"use client";

import { useState } from "react";
import { QUESTIONS, ResultType } from "../src/data/questions";
import { RESULTS, AFFILIATE_HTML_CODE } from "../src/data/results";
import { AdEmbed } from "../src/components/AdEmbed";

type Screen = "quiz" | "result";

function getResultType(answers: ResultType[]): ResultType {
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

export default function Page() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<ResultType[]>([]);
  const [screen, setScreen] = useState<Screen>("quiz");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [resultType, setResultType] = useState<ResultType>("A");

  const total = QUESTIONS.length;

  function handleSelect(i: number) {
    setSelectedIndex(i);
  }

  function handleNext() {
    if (selectedIndex === null) return;
    const type = QUESTIONS[current].options[selectedIndex].type;
    const nextAnswers = [...answers, type];
    setAnswers(nextAnswers);
    setSelectedIndex(null);

    if (current + 1 < total) {
      setCurrent(current + 1);
    } else {
      setResultType(getResultType(nextAnswers));
      setScreen("result");
    }
  }

  function handleRestart() {
    setCurrent(0);
    setAnswers([]);
    setSelectedIndex(null);
    setScreen("quiz");
  }

  return (
    <div className="min-h-screen flex items-start justify-center px-4 py-12 bg-[#0b0908]">
      <div className="w-full max-w-lg">
        <div className="text-center mb-5 pt-2">
          <div className="text-[12px] tracking-[0.24em] uppercase text-[#d9bd7c] font-semibold">
            30代からの本気婚活
          </div>
          <h1 className="font-serif-jp text-2xl mt-2 mb-1 tracking-wide text-[#f3ecdf]">
            あなたの婚活タイプ診断
          </h1>
          <div className="text-[14px] text-[#cfc3ae]">
            全{total}問・約1分
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
              <div className="flex flex-col gap-2.5 mb-6">
                {QUESTIONS[current].options.map((opt, i) => {
                  const isSelected = selectedIndex === i;
                  return (
                    <button
                      key={i}
                      onClick={() => handleSelect(i)}
                      className={`text-left rounded-sm px-5 py-4 text-[14.5px] leading-relaxed transition-all border flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c6a15b] focus-visible:outline-offset-2 ${
                        isSelected
                          ? "border-[#c6a15b] bg-[#c6a15b]/10"
                          : "border-[#c6a15b]/30 hover:border-[#c6a15b]/60 hover:bg-[#c6a15b]/5"
                      }`}
                    >
                      <span
                        className={`w-4 h-4 rounded-full border flex-shrink-0 ${
                          isSelected
                            ? "bg-[#c6a15b] border-[#c6a15b]"
                            : "border-[#c6a15b]/50"
                        }`}
                      />
                      <span>{opt.text}</span>
                    </button>
                  );
                })}
              </div>
              <button
                onClick={handleNext}
                disabled={selectedIndex === null}
                className={`w-full py-4 rounded-sm font-serif-jp text-[15px] tracking-wide transition-all border ${
                  selectedIndex === null
                    ? "border-[#c6a15b]/20 text-[#6b6259] cursor-not-allowed"
                    : "border-[#c6a15b]/50 bg-gradient-to-b from-[#7b2438] to-[#5c1b2b] text-[#f6e9d8] hover:brightness-110"
                }`}
              >
                {current + 1 < total ? "次へ" : "診断結果を見る"}
              </button>
            </div>
          ) : (
            <ResultView type={resultType} onRestart={handleRestart} />
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
        <div className="text-[13px] text-[#cfc3ae] mb-4 leading-relaxed">
          入会するかは、資料を見てから決めればいいのよ。
          <br />
          まずは無料で取り寄せてみなさい。
        </div>
        <div className="[&_a]:block [&_a]:w-full [&_a]:py-4 [&_a]:bg-gradient-to-b [&_a]:from-[#7b2438] [&_a]:to-[#5c1b2b] [&_a]:rounded-sm [&_a]:font-serif-jp [&_a]:text-[#f6e9d8] [&_a]:text-center [&_a]:no-underline [&_a]:border [&_a]:border-[#c6a15b]/50">
          <AdEmbed html={AFFILIATE_HTML_CODE} />
        </div>
        <p className="text-[11px] text-[#cfc3ae] mt-3 leading-relaxed">
          ※結婚相談所比較サービスへのご案内です（PR）
        </p>
      </div>
      <button
        onClick={onRestart}
        className="block mx-auto mt-6 text-xs text-[#cfc3ae] underline"
      >
        もう一度診断する
      </button>
    </div>
  );
}
