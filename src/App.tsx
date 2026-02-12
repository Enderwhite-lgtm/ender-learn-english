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
import "./index.css";

/**
 * Full App.tsx — copy & paste vào src/App.tsx
 *
 * Notes:
 * - index.css must include styles for .app-container, .sidebar, .main-content (see provided CSS).
 * - GRAMMAR_DATA and GrammarNode are imported from your constants/types files.
 */

const SidebarItem: React.FC<{
  node: GrammarNode;
  onClick: (n: GrammarNode) => void;
}> = ({ node, onClick }) => {
  return (
    <button
      onClick={() => onClick(node)}
      className="w-full text-left p-3 mb-3 rounded-lg border border-gray-100 hover:shadow-sm transition"
    >
      <h4 className="font-semibold text-sm">{node.shortLabel}</h4>
      <p className="text-xs text-gray-500 mt-1">{node.description}</p>
    </button>
  );
};

const DetailModal: React.FC<{ node: GrammarNode; onClose: () => void }> = ({
  node,
  onClose,
}) => {
  useEffect(() => {
    // lock body scroll while modal open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl max-h-[90vh] flex flex-col">
        <div className="p-6 bg-gray-900 text-white flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-white p-2 rounded-2xl">
              <BookOpen className="w-8 h-8 text-gray-900" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{node.label}</h2>
              <p className="text-white/80 text-sm">{node.shortLabel}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {node.details.map((detail, idx) => (
            <div key={idx} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-1 h-6 rounded-full bg-gray-200" />
                <h3 className="font-bold text-gray-800 text-lg">{detail.title}</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Quy tắc
                  </h4>
                  <ul className="space-y-2">
                    {detail.content.map((rule, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-100">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Ví dụ
                  </h4>
                  {detail.examples && detail.examples.length > 0 ? (
                    <ul className="space-y-2">
                      {detail.examples.map((ex, ei) => (
                        <li
                          key={ei}
                          className="italic text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg"
                        >
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

        <div className="p-6 border-t bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition"
          >
            Đóng lại
          </button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  // All hooks at top
  const [page, setPage] = useState<"menu" | "app">("menu");
  const [openMenu, setOpenMenu] = useState(true);

  // App 2 hooks
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeNode, setActiveNode] = useState<GrammarNode | null>(null);

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

  // MENU / ACCORDION page
  if (page === "menu") {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border">
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

  // APP 2 layout
  return (
    <div className="min-h-screen">
      {/* Top header with back pill and small icon */}
      <div className="w-full bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 relative">
          <button
            onClick={() => setPage("menu")}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white shadow-md px-4 py-2 rounded-lg flex items-center gap-2 font-medium z-30"
          >
            ← Quay lại
          </button>

          <div className="text-center">
            <div className="inline-flex items-center gap-3">
              <div className="bg-gray-900 p-2 rounded-md text-white">
                <BookOpen className="w-5 h-5" />
              </div>
            </div>
          </div>

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

      {/* Main app container (sidebar + main content) */}
      <div className="app-container">
        {/* Sidebar */}
        <aside
          className={`sidebar ${isSidebarOpen ? "open" : ""}`}
          aria-hidden={isSidebarOpen ? "false" : "true"}
        >
          <div className="mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-gray-900 p-2 rounded-xl text-white shadow-lg">
                <BookOpen className="w-6 h-6" />
              </div>
              {/* no title text per user request */}
            </div>
          </div>

          <div className="mb-4">
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

          <div>
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider mb-3">
              Mục lục kiến thức
            </h3>

            {filteredNodes.map((node) => (
              <SidebarItem
                key={node.type}
                node={node}
                onClick={(n) => {
                  setActiveNode(n);
                  setSidebarOpen(false);
                }}
              />
            ))}

            {filteredNodes.length === 0 && (
              <div className="text-center py-10">
                <p className="text-gray-400 text-sm">Không tìm thấy kết quả</p>
              </div>
            )}
          </div>

          <div className="mt-auto pt-4 border-t">
            <a
              href="#"
              className="flex items-center justify-between text-xs text-gray-500 hover:text-gray-900 transition"
              target="_blank"
              rel="noreferrer"
            >
              <span>Xem tài liệu đầy đủ</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </aside>

        {/* Main content */}
        <main className="main-content">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-6xl font-black tracking-tight">
                XÁC ĐỊNH TỪ LOẠI
              </h2>
              <p className="text-gray-500 mt-2">Interactive Grammar Mind Map</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {GRAMMAR_DATA.map((node) => (
                <button
                  key={node.type}
                  onClick={() => setActiveNode(node)}
                  className="aspect-square flex flex-col items-center justify-center p-6 rounded-3xl border-2 hover:-translate-y-1 hover:shadow-xl transition"
                >
                  <span className="font-bold text-xs uppercase opacity-60 mb-1">
                    {node.type.replace("_", " ")}
                  </span>
                  <span className="font-black text-base text-center">{node.label}</span>
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Detail modal */}
      {activeNode && <DetailModal node={activeNode} onClose={() => setActiveNode(null)} />}
    </div>
  );
}
