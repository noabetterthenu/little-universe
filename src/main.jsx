import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'

const compliments = [
  { name: 'Изумрудная', symbol: '✦', color: '#9fc7ae', title: 'Твои зелёные глаза', text: 'Я люблю твои зелёные глаза. В них хочется смотреть бесконечно и каждый раз находить что-то новое.' },
  { name: 'Солнечная', symbol: '☼', color: '#f1c98d', title: 'Твоя улыбка', text: 'Я люблю твою улыбку. Она способна сделать даже самый обычный день особенным.' },
  { name: 'Нежная', symbol: '♡', color: '#e9a9c3', title: 'Твоя нежность', text: 'Мне нравится, какая ты нежная. Рядом с тобой мир будто становится чуточку добрее.' },
  { name: 'Звёздная', symbol: '✧', color: '#c3b5e8', title: 'Твой смех', text: 'Я люблю слышать твой смех. Иногда мне достаточно просто знать, что ты счастлива.' },
  { name: 'Лунная', symbol: '☾', color: '#b8c7e8', title: 'Твой голос', text: 'В твоём голосе есть что-то такое родное, что мне хочется слушать его снова и снова.' },
  { name: 'Розовая', symbol: '✿', color: '#e8a9bb', title: 'Твоя красота', text: 'Ты красивая не только внешне. В тебе столько деталей, которые делают тебя именно тобой.' },
  { name: 'Маленькое чудо', symbol: '⋆', color: '#d7b3d9', title: 'Твоя особенность', text: 'Мне нравится даже то, чего ты сама в себе можешь не замечать. Для меня это очень ценно.' },
  { name: 'Тёплая', symbol: '☀', color: '#edc28f', title: 'Твоё тепло', text: 'С тобой даже молчание становится уютным. Спасибо, что ты есть в моей жизни.' },
  { name: 'Мечтательная', symbol: '☁', color: '#b8cfe0', title: 'Твои мечты', text: 'Я хочу слушать о твоих мечтах, поддерживать тебя и радоваться каждому твоему маленькому шагу.' },
  { name: 'Волшебная', symbol: '✧', color: '#c4afe8', title: 'Твой характер', text: 'Ты удивительная. Мне нравится узнавать тебя всё больше и открывать новые стороны твоего характера.' },
  { name: 'Любимая', symbol: '♡', color: '#e6a0b9', title: 'То, как ты смотришь', text: 'Есть взгляды, которые запоминаются надолго. Твой — один из них.' },
  { name: 'Наша', symbol: '∞', color: '#d6a9c4', title: 'Просто ты', text: 'И знаешь что? Мне не нужна какая-то особенная причина, чтобы любить тебя. Я люблю тебя просто за то, что ты — это ты.' }
]

function Gift({ onOpen }) {
  return (
    <button className="gift-button" onClick={onOpen} aria-label="Открыть подарок">
      <span className="gift-glow" />
      <span className="gift-box">
        <span className="gift-lid"><i /></span>
        <span className="gift-body"><i className="ribbon-v" /><i className="ribbon-h" /></span>
        <span className="gift-bow"><i /><b /></span>
      </span>
      <span className="gift-hint">нажми, чтобы открыть</span>
    </button>
  )
}

function App() {
  const [opened, setOpened] = useState(false)
  const [selected, setSelected] = useState(null)
  const [seen, setSeen] = useState([])
  const [showFinal, setShowFinal] = useState(false)

  const choosePlanet = (index) => {
    setSelected(index)
    setSeen(prev => prev.includes(index) ? prev : [...prev, index])
  }

  return (
    <main className={`app ${opened ? 'is-open' : ''}`}>
      <div className="grain" />
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <header className="topline"><span>♡</span> MADE WITH LOVE <span>♡</span></header>

      {!opened ? (
        <section className="intro">
          <p className="eyebrow">МАЛЕНЬКИЙ ПОДАРОК ДЛЯ ТЕБЯ</p>
          <h1>Привет, <em>любимая</em></h1>
          <p className="intro-copy">Я приготовил для тебя кое-что особенное.<br />Оно немного волшебное и только твоё.</p>
          <Gift onOpen={() => setOpened(true)} />
          <p className="bottom-note">с любовью, для самого дорогого человека</p>
        </section>
      ) : (
        <section className="universe">
          <div className="universe-heading">
            <p className="eyebrow">МЕСТО, ГДЕ СОБРАНО ВСЁ МОЁ ТЕПЛО</p>
            <h1>Твоя маленькая <em>вселенная</em></h1>
            <p>Каждая планета хранит одну из причин, почему ты особенная.</p>
          </div>

          <div className="space-scene">
            <div className="orbit orbit-one" /><div className="orbit orbit-two" />
            <div className="planet-center"><span>♡</span><small>ты</small></div>
            {compliments.map((planet, index) => {
              const angle = (index / compliments.length) * Math.PI * 2 - Math.PI / 2
              const x = 50 + Math.cos(angle) * (index % 2 === 0 ? 36 : 27)
              const y = 50 + Math.sin(angle) * (index % 2 === 0 ? 36 : 27)
              return (
                <button
                  key={planet.name}
                  className={`planet planet-${index} ${seen.includes(index) ? 'visited' : ''} ${selected === index ? 'chosen' : ''}`}
                  style={{ left: `${x}%`, top: `${y}%`, '--planet': planet.color, '--delay': `${index * -0.45}s` }}
                  onClick={() => choosePlanet(index)}
                  aria-label={`Открыть планету ${planet.name}`}
                >
                  <span>{planet.symbol}</span>
                  <small>{planet.name}</small>
                </button>
              )
            })}
          </div>

          <p className="explore-hint">нажимай на планеты и собирай маленькие послания ♡</p>

          {selected !== null && (
            <article className="message-card" key={selected}>
              <button className="close-card" onClick={() => setSelected(null)} aria-label="Закрыть">×</button>
              <span className="message-star" style={{ color: compliments[selected].color }}>{compliments[selected].symbol}</span>
              <p className="card-kicker">ПОСЛАНИЕ ИЗ ВСЕЛЕННОЙ</p>
              <h2>{compliments[selected].title}</h2>
              <p>{compliments[selected].text}</p>
              <span className="card-count">{seen.length} из {compliments.length} планет открыто</span>
            </article>
          )}

          <div className="progress-wrap">
            <div className="progress-label"><span>Твоя коллекция комплиментов</span><span>{seen.length}/{compliments.length}</span></div>
            <div className="progress-track"><i style={{ width: `${seen.length / compliments.length * 100}%` }} /></div>
          </div>

          {seen.length === compliments.length && (
            <button className="final-button" onClick={() => setShowFinal(true)}>Открыть последний сюрприз ♡</button>
          )}
        </section>
      )}

      {showFinal && (
        <div className="modal-backdrop" onClick={() => setShowFinal(false)}>
          <section className="final-modal" onClick={e => e.stopPropagation()}>
            <button className="close-card modal-close" onClick={() => setShowFinal(false)}>×</button>
            <p className="eyebrow">САМОЕ ГЛАВНОЕ</p>
            <h2>И ещё кое-что, <em>любимая</em> ♡</h2>
            <div className="photo-frame">
              <img src={`${import.meta.env.BASE_URL}photo.jpg`} alt="Наше особенное фото" onError={e => { e.currentTarget.style.display = 'none' }} />
              <div className="photo-placeholder"><span>♡</span><b>Здесь будет наша фотография</b><small>Добавим её, когда выберем снимок</small></div>
            </div>
            <p className="final-text">Из всех красивых мест во вселенной моё любимое — там, где есть ты. Спасибо, что ты есть. Я очень тебя люблю.</p>
            <span className="signature">твой человек ♡</span>
          </section>
        </div>
      )}
      <footer>СОЗДАНО С ЛЮБОВЬЮ <span>♡</span></footer>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
