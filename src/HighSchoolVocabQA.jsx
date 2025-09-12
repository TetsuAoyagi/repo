import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// 高校受験用 英単語テスト（QA形式） - 1ファイルコンポーネント
// TailwindCSS 前提。コピーしてそのまま使えます。

const QUESTIONS = [
  // Part A: 日本語 -> 英語
  { id: 1, part: "A", q: "勉強する", a: "study" },
  { id: 2, part: "A", q: "知っている", a: "know" },
  { id: 3, part: "A", q: "病気の", a: "sick" },
  { id: 4, part: "A", q: "旅行", a: "trip / travel" },
  { id: 5, part: "A", q: "宿題", a: "homework" },
  { id: 6, part: "A", q: "人気のある", a: "popular" },
  { id: 7, part: "A", q: "必要な", a: "necessary / needed" },
  { id: 8, part: "A", q: "電話する", a: "call" },
  { id: 9, part: "A", q: "世界", a: "world" },
  { id: 10, part: "A", q: "未来", a: "future" },
  // Part B: 英語 -> 日本語
  { id: 11, part: "B", q: "difficult", a: "難しい" },
  { id: 12, part: "B", q: "information", a: "情報" },
  { id: 13, part: "B", q: "happen", a: "起こる" },
  { id: 14, part: "B", q: "message", a: "伝言・メッセージ" },
  { id: 15, part: "B", q: "beautiful", a: "美しい" },
  { id: 16, part: "B", q: "decide", a: "決める" },
  { id: 17, part: "B", q: "answer", a: "答え" },
  { id: 18, part: "B", q: "important", a: "重要な" },
  { id: 19, part: "B", q: "sometimes", a: "時々" },
  { id: 20, part: "B", q: "continue", a: "続ける" }
];

export default function HighSchoolVocabQA() {
  const [openIds, setOpenIds] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [onlyPart, setOnlyPart] = useState("all");

  function toggle(id) {
    setOpenIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  function toggleAll() {
    if (showAll) {
      setOpenIds([]);
      setShowAll(false);
    } else {
      setOpenIds(QUESTIONS.map((q) => q.id));
      setShowAll(true);
    }
  }

  const filtered = QUESTIONS.filter((q) => (onlyPart === "all" ? true : q.part === onlyPart));

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6 md:p-10">
        <header className="mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold">高校受験 英単語テスト（QA形式）</h1>
          <p className="text-sm text-slate-600 mt-2">問題をクリックすると答えが表示されます。印刷して使うこともできます。</p>
        </header>

        <section className="flex gap-2 items-center mb-4">
          <button
            onClick={toggleAll}
            className="px-3 py-2 rounded-lg bg-violet-600 text-white text-sm shadow-sm hover:opacity-95"
          >
            {showAll ? "すべて隠す" : "すべて表示"}
          </button>

          <div className="ml-2 text-sm text-slate-700">表示フィルター:</div>
          <select
            value={onlyPart}
            onChange={(e) => setOnlyPart(e.target.value)}
            className="ml-2 px-2 py-1 border rounded"
          >
            <option value="all">全部</option>
            <option value="A">Part A（日本語→英語）</option>
            <option value="B">Part B（英語→日本語）</option>
          </select>

          <div className="ml-auto text-sm text-slate-500">問題数: {filtered.length}</div>
        </section>

        <ol className="space-y-3">
          {filtered.map((q) => (
            <li key={q.id} className="bg-slate-100 rounded-lg p-3">
              <div className="flex items-start gap-3">
                <div className="text-sm font-medium text-slate-500">Q{q.id} ({q.part})</div>
                <div className="flex-1">
                  <div className="text-base md:text-lg font-semibold">{q.q}</div>
                  <div className="mt-2">
                    <button
                      onClick={() => toggle(q.id)}
                      className="text-sm px-2 py-1 rounded-md border hover:bg-slate-200"
                    >
                      {openIds.includes(q.id) ? "答えを隠す" : "答えを見る"}
                    </button>
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {openIds.includes(q.id) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 overflow-hidden"
                  >
                    <div className="rounded-md p-3 bg-white border">
                      <strong>Answer:</strong>
                      <span className="ml-2">{q.a}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ol>

        <footer className="mt-6 text-sm text-slate-600">
          <p>使い方ヒント: テストとして使う場合は「答えを見る」を押さずに問題だけを生徒に渡してください。</p>
          <p className="mt-2">必要なら問題・解答のCSVダウンロードや、問題の差し替えバージョンも作れます — その場合は編集内容を教えてください。</p>
        </footer>
      </div>
    </div>
  );
}
