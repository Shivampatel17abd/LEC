import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalContext } from '../../context/AppContext';
import ItemCard from '../../components/cards/ItemCard';

// Category pills must EXACTLY match item.type values in dummyItems
const CATEGORIES = ['All', 'Buy/Sell', 'Rent', 'Services', 'Jobs', 'Free'];

const SORT_OPTIONS = ['Newest First', 'Price: Low to High', 'Price: High to Low', 'Most Trusted'];

const Home = () => {
  const { items, location, togglePostModal } = useGlobalContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Newest First');

  // ── FILTER ──
  const filtered = (items || []).filter(item => {
    const search = searchTerm.toLowerCase();
    const matchSearch = !search
      || item.title.toLowerCase().includes(search)
      || item.desc.toLowerCase().includes(search)
      || item.city.toLowerCase().includes(search)
      || item.tags.some(t => t.toLowerCase().includes(search))
      || item.owner.toLowerCase().includes(search);

    // 'All' shows everything; otherwise exact match on item.type
    const matchCategory = activeCategory === 'All' || item.type === activeCategory;

    return matchSearch && matchCategory;
  });

  // ── SORT ──
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'Price: Low to High') return a.price - b.price;
    if (sortBy === 'Price: High to Low') return b.price - a.price;
    if (sortBy === 'Most Trusted') return b.trustScore - a.trustScore;
    return b.id - a.id; // Newest First — higher id = newer
  });

  return (
    <div style={{ minHeight: '100vh', background: '#EEF2FF', fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>

      {/* ── HERO / SEARCH ── */}
      <section style={{
        background: '#FFFFFF', padding: '52px 2rem 40px',
        textAlign: 'center', borderBottom: '1px solid #C7D2FE',
        width: '100%', boxSizing: 'border-box'
      }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 style={{
            fontSize: 'clamp(26px, 4.5vw, 46px)', fontWeight: 900,
            color: '#1E1B4B', margin: '0 0 10px', letterSpacing: '-1px', lineHeight: 1.15
          }}>
            Hello, What Do You Want To{' '}
            <span style={{
              background: 'linear-gradient(120deg, #6366F1, #8B5CF6)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
            }}>Find?</span>
          </h1>
          <p style={{ color: '#818CF8', fontSize: 15, marginBottom: 32, fontWeight: 500 }}>
            Buy, sell, rent or find services around {location?.city || 'your campus'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{ maxWidth: 640, margin: '0 auto' }}
        >
          {/* Search bar */}
          <div style={{
            display: 'flex', alignItems: 'center',
            background: '#F5F3FF', border: '2px solid #C7D2FE',
            borderRadius: 18, overflow: 'hidden',
            boxShadow: '0 6px 24px rgba(99,102,241,0.12)',
          }}>
            <span style={{ paddingLeft: 20, fontSize: 18, color: '#818CF8', flexShrink: 0 }}>🔍</span>
            <input
              type="text"
              placeholder="Search items, services, locations, tags..."
              style={{
                flex: 1, background: 'transparent', border: 'none', outline: 'none',
                padding: '14px 12px', fontSize: 15, color: '#1E1B4B', fontFamily: 'inherit'
              }}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#818CF8', padding: '0 10px', fontSize: 14
              }}>✕</button>
            )}
            <button style={{
              background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
              color: '#fff', border: 'none', padding: '14px 26px',
              fontWeight: 800, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit'
            }}>Search</button>
          </div>

          {/* Category pills */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '7px 18px', borderRadius: 999, fontSize: 12, fontWeight: 700,
                  cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s',
                  background: activeCategory === cat
                    ? 'linear-gradient(135deg, #6366F1, #8B5CF6)'
                    : '#FFFFFF',
                  color: activeCategory === cat ? '#fff' : '#4338CA',
                  border: activeCategory === cat ? '2px solid transparent' : '2px solid #C7D2FE',
                  boxShadow: activeCategory === cat ? '0 4px 14px rgba(99,102,241,0.3)' : 'none',
                  transform: activeCategory === cat ? 'scale(1.05)' : 'scale(1)'
                }}
              >{cat}</button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── FEED ── */}
      <main style={{ maxWidth: 1320, margin: '0 auto', padding: '32px 24px' }}>

        {/* Feed header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h2 style={{ fontWeight: 900, fontSize: 20, color: '#1E1B4B', margin: 0 }}>
              {activeCategory === 'All' ? 'Recent Listings' : activeCategory}
              {searchTerm && (
                <span style={{ fontSize: 14, fontWeight: 600, color: '#818CF8', marginLeft: 8 }}>
                  for "{searchTerm}"
                </span>
              )}
            </h2>
            <p style={{ color: '#818CF8', fontSize: 12, marginTop: 3, fontWeight: 600 }}>
              {sorted.length} result{sorted.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {/* Sort + active filter indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {activeCategory !== 'All' && (
              <button
                onClick={() => setActiveCategory('All')}
                style={{
                  fontSize: 12, fontWeight: 700, color: '#6366F1',
                  background: '#EEF2FF', border: '1.5px solid #C7D2FE',
                  borderRadius: 999, padding: '6px 12px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 4
                }}
              >
                {activeCategory} ✕
              </button>
            )}
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              style={{
                background: '#fff', border: '1.5px solid #C7D2FE', color: '#4338CA',
                fontSize: 12, borderRadius: 10, padding: '9px 14px', outline: 'none',
                fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit'
              }}
            >
              {SORT_OPTIONS.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: 20 }}>
          <AnimatePresence mode="popLayout">
            {sorted.length > 0 ? (
              sorted.map((item, i) => (
                <motion.div
                  key={item.id} layout
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: Math.min(i * 0.05, 0.4) }}
                >
                  <ItemCard item={item} />
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                style={{ gridColumn: '1/-1', textAlign: 'center', padding: '80px 0' }}
              >
                <p style={{ fontSize: 52, marginBottom: 12 }}>🔍</p>
                <p style={{ color: '#1E1B4B', fontWeight: 800, fontSize: 18 }}>No results found</p>
                <p style={{ color: '#818CF8', fontSize: 14, marginTop: 6 }}>
                  Try a different search or{' '}
                  <span
                    onClick={togglePostModal}
                    style={{ color: '#6366F1', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}
                  >post what you need</span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Home;