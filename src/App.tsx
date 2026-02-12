import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  BookOpen,
  Menu,
  X,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

import { GrammarNode } from "./types";
import { GRAMMAR_DATA } from "./constants";

export default function App() {
  /* ===== Hooks (PHẢI Ở TRÊN) ===== */
  const [page, setPage] = useState<"menu" | "app">("menu");
  const [openMenu, setOpenMenu] = useState(true);

  // App 2 state
  const [activeNode, setActiveNode] = useState<GrammarNode | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const filteredNodes = useMemo(() => {
    if (!searchTerm) return GRAMMAR_DATA;
    const term = searchTerm.toLowerCase();
    return GRAMMAR_DATA.filter(
      (node) =>
        node.label.toLowerCase().includes(term) ||
        node.shortLabel.toLowerCase().includes(term) ||
        node.details.some((d) =>
          d.content.some((c) => c.toLowerCase().includes(term))
        )
    );
  }, [searchTerm]);

  /* ===== Lock body scroll when modal open ===== */
  useEffect(() => {
    if (activeNode) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeNode]);

  /* ===== MENU PAGE (ACCORDION) ===== */
  if (page === "menu") {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border">
          {/* Accordion header */}
          <div
            onClick={() => setOpenMenu(!openMenu)}
            className="cursor-pointer flex items-center justify-between px-6 py-4 border-b hover:bg-gray-50 transition"
          >
            <h2 className="text-lg font-semibold text-gray-800">Học tiếng anh</h2>
            <span className="text-gray-500 text-lg">{openMenu ? "▾" : "▸"}</span>
          </div>

          {openMenu && (
            <div className="px-6 py-4">
              <button
                onClick={() => setPage("app")}
                className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-lg border hover:bg-gray-50 transition font-medium text-gray-700"
              >
                <span className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded">
                  📄
                </span>
                <div className="text-sm">
                  <div className="font-semibold">1 XÁC ĐỊNH TỪ LOẠI</div>
                  <div className="text-xs text-gray-500">Interactive grammar diagram</div>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  /* ===== APP 2 MAIN ===== */
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Top header */}
      <div className="w-full bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 relative">
          {/* Back pill - absolute so it can overlap left area */}
          <button
            onClick={() => setPage("menu")}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white shadow-md px-4 py-2 rounded-lg flex items-center gap-2 font-medium z-30"
          >
            ← Quay lại
          </button>

          {/* Center: only icon (we removed the "WordForm Master" text per request) */}
          <div className="text-center">
            <div className="inline-flex items-center gap-3">
              <div className="bg-gray-900 p-2 rounded-md text-white">
                <BookOpen className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* mobile menu icon (right) */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 md:hidden">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-80 bg-white border-r z-40 transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="h-full flex flex-col">
          <div className="p-6 border-b flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-gray-900 p-2 rounded-xl text-white shadow-lg">
                <BookOpen className="w-6 h-6" />
              </div>
              {/* No text label here per request */}
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm từ loại..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-gray-200 outline-none"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Mục lục kiến thức</h2>
            {filteredNodes.map((node) => (
              <button
                key={node.type}
                onClick={() => {
                  setActiveNode(node);
                  setSidebarOpen(false);
                }}
                className="w-full text-left p-4 rounded-xl border-2 border-gray-100 hover:shadow-md transition"
              >
                <h3 className="font-bold text-sm">{node.shortLabel}</h3>
                <p className="text-xs text-gray-500">{node.description}</p>
              </button>
            ))}

            {filteredNodes.length === 0 && (
              <div className="text-center py-10">
                <p className="text-gray-400 text-sm">Không tìm thấy kết quả</p>
              </div>
            )}
          </div>

          <div className="p-4 border-t bg-gray-50">
            <a
              href="#"
              className="flex items-center justify-between text-xs text-gray-500 hover:text-gray-900 transition"
            >
              <span>Xem tài liệu đầy đủ</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </aside>

      {/* Main content (note padding-left so sidebar doesn't overlay content on md+) */}
      <main className="flex-1 bg-white relative overflow-hidden flex flex-col items-center justify-start p-8 md:pl-96">
        {/* decorative backgrounds */}
        <div className="absolute top-8 right-8 w-64 h-64 bg-sky-50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-8 left-12 w-80 h-80 bg-rose-50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>

        <div className="relative z-10 text-center space-y-10 w-full max-w-5xl">
          <div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight">XÁC ĐỊNH TỪ LOẠI</h2>
            <p className="text-gray-500 mt-2">Interactive Grammar Mind Map</p>
          </div>

          {/* Grid of nodes */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-6 w-full">
            {GRAMMAR_DATA.map((node) => (
              <button
                key={node.type}
                onClick={() => setActiveNode(node)}
                className="aspect-square flex flex-col items-center justify-center p-6 rounded-3xl border-2 hover:-translate-y-1 hover:shadow-xl transition"
              >
                <span className="font-bold text-xs uppercase opacity-60 mb-1">{node.type.replace("_", " ")}</span>
                <span className="font-black text-base text-center">{node.label}</span>
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Detail Modal (scroll inside modal, body is flex-1 + overflow-y-auto) */}
      {activeNode && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40"
          aria-modal="true"
          role="dialog"
        >
          <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl max-h-[90vh] flex flex-col">
            {/* Modal header */}
            <div className="p-6 bg-gray-900 text-white flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="bg-white p-2 rounded-2xl">
                  <BookOpen className="w-8 h-8 text-gray-900" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{activeNode.label}</h2>
                  <p className="text-white/80 text-sm">{activeNode.shortLabel}</p>
                </div>
              </div>
              <button onClick={() => setActiveNode(null)} className="p-2 hover:bg-white/20 rounded-full transition">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal body: scrollable */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              {activeNode.details.map((detail, idx) => (
                <div key={idx} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-6 rounded-full bg-gray-200" />
                    <h3 className="font-bold text-gray-800 text-lg">{detail.title}</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Rules */}
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Quy tắc</h4>
                      <ul className="space-y-2">
                        {detail.content.map((rule, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                            <span>{rule}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Examples (if any) */}
                    <div className="bg-white p-4 rounded-xl border border-gray-100">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Ví dụ</h4>
                      {detail.examples && detail.examples.length > 0 ? (
                        <ul className="space-y-2">
                          {detail.examples.map((ex, ei) => (
                            <li key={ei} className="italic text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                              “{ex}”
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-gray-400">Không có ví dụ.</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal footer */}
            <div className="p-6 border-t bg-gray-50 flex justify-end">
              <button
                onClick={() => setActiveNode(null)}
                className="px-6 py-2 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition"
              >
                Đóng lại
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
