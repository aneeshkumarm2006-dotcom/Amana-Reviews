'use client';

import { useMemo, useState } from 'react';
import { t, type Locale } from '@/lib/i18n';
import type { Broker } from '@/data/brokers';
import { BrokerCard } from './ui';

export default function ReviewsExplorer({ list, locale }: { list: Broker[]; locale: Locale }) {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'score' | 'name' | 'min'>('score');
  const [filterReg, setFilterReg] = useState('all');
  const [islamicOnly, setIslamicOnly] = useState(false);

  const filtered = useMemo(() => {
    let out = list.slice();
    if (search) out = out.filter((b) => b.name.toLowerCase().includes(search.toLowerCase()));
    if (filterReg !== 'all') out = out.filter((b) => b.regs.includes(filterReg));
    if (islamicOnly) out = out.filter((b) => b.islamic);
    if (sortBy === 'score') out.sort((a, b) => b.score - a.score);
    else if (sortBy === 'name') out.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortBy === 'min') out.sort((a, b) => a.min - b.min);
    return out;
  }, [list, search, sortBy, filterReg, islamicOnly]);

  const selStyle = { background: '#fff', border: '1px solid rgba(14,20,22,.16)', borderRadius: '8px', padding: '10px 12px', fontSize: '13.5px', fontWeight: 600, color: '#1A2227', cursor: 'pointer' } as const;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '26px', padding: '16px', background: '#fff', border: '1px solid rgba(14,20,22,.10)', borderRadius: '12px' }}>
        <div style={{ position: 'relative', flex: '1 1 240px' }}>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t(locale, 'Search brokers…', 'ابحث عن وسطاء…')} style={{ width: '100%', border: '1px solid rgba(14,20,22,.16)', borderRadius: '8px', padding: '10px 13px', fontSize: '14px', outline: 'none' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#5A6670' }}>
          {t(locale, 'Sort', 'ترتيب')}
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)} style={selStyle}>
            <option value="score">{t(locale, 'Highest score', 'الأعلى تقييمًا')}</option>
            <option value="name">{t(locale, 'Name (A–Z)', 'الاسم (أ–ي)')}</option>
            <option value="min">{t(locale, 'Lowest deposit', 'أدنى إيداع')}</option>
          </select>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#5A6670' }}>
          {t(locale, 'Regulator', 'الجهة المنظِّمة')}
          <select value={filterReg} onChange={(e) => setFilterReg(e.target.value)} style={selStyle}>
            <option value="all">{t(locale, 'All', 'الكل')}</option>
            <option value="FCA">FCA</option>
            <option value="CySEC">CySEC</option>
            <option value="DFSA">DFSA</option>
            <option value="SCA">SCA</option>
          </select>
        </div>
        <button onClick={() => setIslamicOnly((v) => !v)} style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid ' + (islamicOnly ? '#16A34A' : 'rgba(14,20,22,.16)'), background: islamicOnly ? 'rgba(22,163,74,.08)' : '#fff', color: islamicOnly ? '#0E7A43' : '#1A2227', borderRadius: '8px', padding: '10px 14px', fontSize: '13.5px', fontWeight: 600, cursor: 'pointer' }}>
          <span style={{ width: '15px', height: '15px', borderRadius: '4px', border: '1.5px solid ' + (islamicOnly ? '#16A34A' : '#9BA4AA'), background: islamicOnly ? '#16A34A' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {islamicOnly && <span style={{ color: '#fff', fontSize: '10px' }}>✓</span>}
          </span>
          {t(locale, 'Islamic only', 'إسلامي فقط')}
        </button>
      </div>

      <div style={{ fontSize: '13px', color: '#5A6670', marginBottom: '18px' }}>
        <strong style={{ color: '#0E1416' }}>{filtered.length}</strong> {t(locale, ' of 158 brokers shown', ' من 158 وسيطًا معروض')}
      </div>

      {filtered.length ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }}>
          {filtered.map((b) => <BrokerCard key={b.slug} b={b} locale={locale} />)}
        </div>
      ) : (
        <div style={{ padding: '60px', textAlign: 'center', color: '#5A6670', fontSize: '15px' }}>{t(locale, 'No brokers match your filters.', 'لا يوجد وسطاء يطابقون عوامل التصفية.')}</div>
      )}
    </div>
  );
}
