'use client';

import { useState } from 'react';

/**
 * 道之光 · H5 用户端首页
 * 移动端优先，提供八字速查 + 每日运势 + AI改命入口
 */
export default function HomePage() {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('0');
  const [gender, setGender] = useState<'男' | '女'>('男');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!year || !month || !day) {
      setError('请填写出生年月日');
      return;
    }
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await fetch('/api/v1/bazi/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          year: parseInt(year),
          month: parseInt(month),
          day: parseInt(day),
          hour: hour ? parseInt(hour) : 12,
          minute: parseInt(minute || '0'),
          gender,
        }),
      });
      const data = await res.json();
      if (data.success) setResult(data.data);
      else setError(data.error || '计算失败');
    } catch {
      setError('网络错误，请稍后重试');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e17] via-[#111827] to-[#0a0e17] text-[#e2e8f0]">
      {/* 顶部品牌区 */}
      <header className="relative px-5 pt-12 pb-8 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 0%, #f59e0b 0%, transparent 60%), radial-gradient(circle at 20% 80%, #2ECC71 0%, transparent 40%), radial-gradient(circle at 80% 70%, #3498DB 0%, transparent 40%)',
          }}
        />
        <div className="relative">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#f59e0b] to-[#d97706] flex items-center justify-center text-black font-bold text-2xl shadow-lg shadow-[#f59e0b]/20">{'道'}</div>
          <h1 className="text-2xl font-bold tracking-wider text-[#f59e0b]">道之光</h1>
          <p className="text-sm text-[#64748b] mt-1">AI 命理 · 知命改运</p>
        </div>
      </header>

      {/* 八字速查卡片 */}
      <section className="px-4 mb-6">
        <div className="rounded-2xl bg-[#0f1525] border border-[#1e293b] p-5">
          <h2 className="text-base font-semibold mb-1">八字速查</h2>
          <p className="text-xs text-[#64748b] mb-4">输入出生信息，立即排盘</p>

          <div className="space-y-3">
            {/* 年月日 */}
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-xs text-[#64748b] mb-1 block">年</label>
                <input value={year} onChange={e => setYear(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  placeholder="1990" className="w-full bg-[#1a2332] border border-[#2a3a4e] rounded-lg px-3 py-2.5 text-sm text-[#e2e8f0] placeholder-[#4a5a6e] focus:border-[#f59e0b] focus:outline-none" />
              </div>
              <div>
                <label className="text-xs text-[#64748b] mb-1 block">月</label>
                <input value={month} onChange={e => setMonth(e.target.value.replace(/\D/g, '').slice(0, 2))}
                  placeholder="5" className="w-full bg-[#1a2332] border border-[#2a3a4e] rounded-lg px-3 py-2.5 text-sm text-[#e2e8f0] placeholder-[#4a5a6e] focus:border-[#f59e0b] focus:outline-none" />
              </div>
              <div>
                <label className="text-xs text-[#64748b] mb-1 block">日</label>
                <input value={day} onChange={e => setDay(e.target.value.replace(/\D/g, '').slice(0, 2))}
                  placeholder="15" className="w-full bg-[#1a2332] border border-[#2a3a4e] rounded-lg px-3 py-2.5 text-sm text-[#e2e8f0] placeholder-[#4a5a6e] focus:border-[#f59e0b] focus:outline-none" />
              </div>
            </div>

            {/* 时辰 */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-[#64748b] mb-1 block">时（可选）</label>
                <select value={hour} onChange={e => setHour(e.target.value)}
                  className="w-full bg-[#1a2332] border border-[#2a3a4e] rounded-lg px-3 py-2.5 text-sm text-[#e2e8f0] focus:border-[#f59e0b] focus:outline-none">
                  <option value="">未知</option>
                  <option value="23">子时 23:00-00:59</option>
                  <option value="1">丑时 01:00-02:59</option>
                  <option value="3">寅时 03:00-04:59</option>
                  <option value="5">卯时 05:00-06:59</option>
                  <option value="7">辰时 07:00-08:59</option>
                  <option value="9">巳时 09:00-10:59</option>
                  <option value="11">午时 11:00-12:59</option>
                  <option value="13">未时 13:00-14:59</option>
                  <option value="15">申时 15:00-16:59</option>
                  <option value="17">酉时 17:00-18:59</option>
                  <option value="19">戌时 19:00-20:59</option>
                  <option value="21">亥时 21:00-22:59</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-[#64748b] mb-1 block">性别</label>
                <div className="flex gap-2">
                  <button onClick={() => setGender('男')}
                    className={`flex-1 py-2.5 rounded-lg text-sm border transition-all ${gender === '男' ? 'bg-[#f59e0b]/10 border-[#f59e0b] text-[#f59e0b]' : 'bg-[#1a2332] border-[#2a3a4e] text-[#94a3b8]'}`}>男</button>
                  <button onClick={() => setGender('女')}
                    className={`flex-1 py-2.5 rounded-lg text-sm border transition-all ${gender === '女' ? 'bg-[#f59e0b]/10 border-[#f59e0b] text-[#f59e0b]' : 'bg-[#1a2332] border-[#2a3a4e] text-[#94a3b8]'}`}>女</button>
                </div>
              </div>
            </div>

            <button onClick={handleSubmit} disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-black font-semibold text-sm disabled:opacity-50 transition-all active:scale-[0.98]">
              {loading ? '排盘中...' : '开始排盘'}
            </button>

            {error && <p className="text-xs text-[#E74C3C] text-center">{error}</p>}
          </div>
        </div>
      </section>

      {/* 排盘结果 */}
      {result && (
        <section className="px-4 mb-6 animate-[fadeIn_0.3s_ease]">
          <div className="rounded-2xl bg-[#0f1525] border border-[#1e293b] p-5">
            <h3 className="text-sm font-semibold mb-3 text-[#f59e0b]">八字排盘结果</h3>

            {/* 四柱 */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              {['year', 'month', 'day', 'hour'].map((pillar, i) => {
                const p = result.pillars[pillar];
                const labels = ['年柱', '月柱', '日柱', '时柱'];
                return (
                  <div key={pillar} className="text-center bg-[#1a2332] rounded-xl py-3 border border-[#2a3a4e]">
                    <div className="text-[10px] text-[#64748b] mb-1">{labels[i]}</div>
                    <div className="text-lg font-bold text-[#f59e0b]">{p.full}</div>
                    <div className="text-[10px] text-[#94a3b8] mt-1">{p.nayin}</div>
                  </div>
                );
              })}
            </div>

            {/* 日主 + 用神 */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-[#1a2332] rounded-xl p-3 border border-[#2a3a4e]">
                <div className="text-[10px] text-[#64748b] mb-1">日主</div>
                <div className="text-lg font-bold">{result.dayMaster}</div>
                <div className="text-[10px] text-[#94a3b8]">{result.strength.bodyStrength}</div>
              </div>
              <div className="bg-[#1a2332] rounded-xl p-3 border border-[#2a3a4e]">
                <div className="text-[10px] text-[#64748b] mb-1">用神</div>
                <div className="text-lg font-bold text-[#2ECC71]">{result.usefulGod.yongShen.join('、')}</div>
                <div className="text-[10px] text-[#94a3b8]">喜 {result.usefulGod.xiShen.join('、')}</div>
              </div>
            </div>

            {/* 五行条 */}
            <div className="space-y-2 mb-4">
              {['木', '火', '土', '金', '水'].map((wx) => {
                const pct = result.elementBalance.percentage[wx] || 0;
                const colors: Record<string, string> = { '木': '#2ECC71', '火': '#E74C3C', '土': '#F39C12', '金': '#f59e0b', '水': '#3498DB' };
                return (
                  <div key={wx} className="flex items-center gap-2 text-xs">
                    <span className="w-4 text-center" style={{ color: colors[wx] }}>{wx}</span>
                    <div className="flex-1 h-2 bg-[#1a2332] rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: colors[wx] }} />
                    </div>
                    <span className="w-8 text-right text-[#64748b]">{pct}%</span>
                  </div>
                );
              })}
            </div>

            {/* 底部按钮 */}
            <div className="flex gap-2">
              <a href="/console/dashboard" className="flex-1 py-2.5 rounded-xl bg-[#1a2332] border border-[#2a3a4e] text-center text-sm text-[#94a3b8] hover:text-[#e2e8f0] transition-all">
                管理后台
              </a>
              <button onClick={() => setResult(null)}
                className="flex-1 py-2.5 rounded-xl bg-[#f59e0b]/10 border border-[#f59e0b]/20 text-center text-sm text-[#f59e0b] hover:bg-[#f59e0b]/20 transition-all">
                重新排盘
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 功能入口 */}
      {!result && (
        <section className="px-4 mb-6">
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: '☯', label: '每日运势', color: '#f59e0b', desc: '今日宜忌·五行吉位' },
              { icon: '🔥', label: '五行能量', color: '#E74C3C', desc: '实时能量图谱' },
              { icon: '🧭', label: '九宫飞星', color: '#3498DB', desc: '流年吉凶方位' },
              { icon: '🤖', label: 'AI改命', color: '#9B59B6', desc: '个性化改运方案' },
            ].map((item) => (
              <a key={item.label} href="/console/dashboard"
                className="rounded-2xl bg-[#0f1525] border border-[#1e293b] p-4 hover:border-[rgba(245,158,11,0.2)] transition-all active:scale-[0.97]">
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="text-sm font-semibold">{item.label}</div>
                <div className="text-[10px] text-[#64748b] mt-0.5">{item.desc}</div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* 底部 */}
      <footer className="px-4 pb-8 text-center">
        <p className="text-[10px] text-[#4a5a6e]">道之光 · DZS-OS v1.0.0</p>
        <p className="text-[10px] text-[#3a4a5e] mt-1">AI仅供参考，命运由自己掌握</p>
      </footer>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
