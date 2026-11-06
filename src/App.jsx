import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, BookOpen, Check, ChevronDown, ChevronRight, Code2, Compass, Database, ExternalLink, Globe2, GraduationCap, Info, Layers3, Mail, Menu, Search, ShieldCheck, Sparkles, TrendingUp, Users, X } from 'lucide-react';

const links = {
  mgimo: 'https://pk.odin.mgimo.ru/master/21',
  school: 'https://mgimo-pm.21-school.ru/',
  admissions: 'https://lka.mgimo.ru/',
  email: 'mailto:Mgimo_edu@21-school.ru',
};

const navigation = [
  ['О программе', 'about'], ['Навыки', 'skills'], ['Практика', 'practice'], ['Учебный план', 'curriculum'],
  ['Формат', 'format'], ['Стоимость', 'pricing'], ['Поступление', 'admissions'],
];

const projectStages = [
  { short: 'Исследование рынка', name: 'Поймите рынок, прежде чем создавать продукт', detail: 'Изучайте пользователей, их задачи и особенности выбранного зарубежного рынка. Определяйте, какую проблему действительно стоит решать.', result: 'Обзор рынка, портрет целевой аудитории и карта потребностей', icon: Search },
  { short: 'Продуктовая гипотеза', name: 'Превратите исследования в продуктовую идею', detail: 'Сформулируйте ценностное предложение, определите ключевые гипотезы и спланируйте их проверку.', result: 'Проверяемые гипотезы и концепция продуктового решения', icon: Compass },
  { short: 'Прототип', name: 'Покажите, как будет работать решение', detail: 'Разработайте пользовательские сценарии и цифровой прототип, применяя инструменты продуктового проектирования и ИИ.', result: 'Прототип интерфейса и сценарий взаимодействия', icon: Layers3 },
  { short: 'Экономика и стратегия', name: 'Оцените устойчивость и потенциал роста', detail: 'Изучите экономику продукта, приоритеты развития, риски и стратегию выхода на новые рынки.', result: 'Юнит-экономика, дорожная карта и продуктовая стратегия', icon: TrendingUp },
  { short: 'Презентация', name: 'Убедительно защитите своё решение', detail: 'Представьте исследования, продуктовую логику и обоснование решений, в том числе на иностранном языке.', result: 'Презентация продукта и аргументация выбранной стратегии', icon: Users },
];

const semesters = [
  { title: 'Основы продукта', label: 'Первый семестр', name: 'Управление цифровым продуктом и бизнесом', intro: 'Разбираетесь в управлении продуктом, устройстве цифровых систем и международном бизнес-контексте.', subjects: ['Управление и развитие продуктов', 'Стратегический и международный менеджмент', 'Маркетинг цифровых продуктов', 'Теория систем и системный анализ', 'ИТ-архитектура предприятия', 'Компьютерная и информационная безопасность', 'Иностранный язык в профессиональной коммуникации', 'Научно-исследовательская работа'], result: 'Связываете потребности пользователей, бизнес-цели и технологические решения' },
  { title: 'Исследования', label: 'Второй семестр', name: 'Исследования, бизнес-модели и проектирование', intro: 'Переходите от продуктовой гипотезы к исследованию, оценке рынка и проектированию цифрового решения.', subjects: ['Продуктовые исследования', 'Цифровые бизнес-модели', 'Проектирование цифровых продуктов', 'Маркетинг цифровых продуктов', 'Математические методы управления данными', 'Правовое регулирование цифровой сферы', 'Иностранный язык в профессиональной коммуникации', 'Научно-исследовательская работа'], electives: ['Психология делового общения и управления', 'Технология презентации и ведения переговоров'], result: 'Аргументируете продуктовые решения исследованиями и экономикой' },
  { title: 'Технологии и данные', label: 'Третий семестр', name: 'ИИ, разработка и анализ данных', intro: 'Осваиваете технические инструменты, методы работы с данными и подходы к созданию интеллектуальных продуктов.', subjects: ['Системы и технологии ИИ', 'Программирование в продуктовой разработке', 'Машинное обучение и искусственный интеллект в задачах продуктовой разработки', 'Интеллектуальный анализ данных', 'Стратегическое управление ИТ-активами', 'Защита интеллектуальной собственности в ИТ', 'Иностранный язык в профессиональной коммуникации', 'Научно-исследовательская работа'], electives: ['Управление человеческими ресурсами', 'Лидерство и командообразование'], result: 'Лучше понимаете технологию продукта и можете работать с командой разработки' },
  { title: 'Практика и ВКР', label: 'Четвёртый семестр', name: 'Практика и выпускная квалификационная работа', intro: 'Применяете знания в проектных и исследовательских задачах, готовите итоговую аттестацию.', subjects: ['Проектно-технологическая практика', 'Преддипломная практика', 'Итоговый государственный междисциплинарный экзамен', 'Выпускная квалификационная работа'], result: 'Систематизируете опыт и представляете итоговую работу' },
];

const teachers = [
  { name: 'Инна Красовская', initials: 'ИК', field: 'Управление продуктом', detail: 'Индустриальный руководитель программы', photo: null },
  { name: 'Виктор Ерохин', initials: 'ВЕ', field: 'Научно-исследовательская работа', detail: 'Академическая составляющая программы', photo: null },
  { name: 'Екатерина Чикулаева', initials: 'ЕЧ', field: 'Маркетинг цифровых продуктов', detail: 'Экспертиза в продуктовом маркетинге', photo: null },
  { name: 'Станислав Дергунов', initials: 'СД', field: 'Цифровые бизнес-модели', detail: 'Индустриальная экспертиза', photo: null },
];

const frequentlyAsked = [
  ['Можно ли поступить без профильного ИТ-образования?', 'Да. Программа рассчитана в том числе на людей без профильного ИТ-образования. Для поступления потребуется диплом о высшем образовании и успешное прохождение вступительных испытаний.'],
  ['Можно ли совмещать обучение с работой?', 'Гибридный формат позволяет совмещать обучение с работой. Рассчитывайте в среднем на 20–30 часов занятий и проектной деятельности в неделю, а также на недельный очный интенсив раз в семестр.'],
  ['Обучение полностью дистанционное?', 'Нет. Форма обучения очная, организация – гибридная. Один раз за семестр проходит недельный очный интенсив в Москве.'],
  ['Какие вступительные испытания предусмотрены?', 'Мотивационное эссе и собеседование по направлению подготовки. Актуальную программу испытаний и даты публикует МГИМО.'],
  ['Какие образовательные документы получит выпускник?', 'После успешного завершения обучения предусмотрены диплом магистра МГИМО и диплом о профессиональной переподготовке Школы 21.'],
  ['Можно ли получить образовательный кредит?', 'По опубликованным условиям программы образовательный кредит не предусмотрен.'],
  ['Когда можно поступить?', 'Приём заявок на набор 2026 года завершён. Следите за новыми сроками и правилами поступления на официальных страницах программы.'],
];

function SectionTitle({ index, eyebrow, title, children }) {
  return <div className="section-heading"><div className="eyebrow">{index} / {eyebrow}</div><h2>{title}</h2>{children && <p className="lead">{children}</p>}</div>;
}

function NavLink({ label, id, onClick }) { return <a href={`#${id}`} onClick={onClick}>{label}</a>; }

function handleTabKey(event) {
  const tabs = [...event.currentTarget.parentElement.querySelectorAll('[role="tab"]')];
  const index = tabs.indexOf(event.currentTarget);
  const next = { ArrowRight: (index + 1) % tabs.length, ArrowLeft: (index - 1 + tabs.length) % tabs.length, Home: 0, End: tabs.length - 1 }[event.key];
  if (next === undefined) return;
  event.preventDefault();
  tabs[next].focus();
  tabs[next].click();
}

function App() {
  const menuToggle = useRef(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [projectStage, setProjectStage] = useState(0);
  const [semester, setSemester] = useState(0);
  const [discountOpen, setDiscountOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  
  useEffect(() => { document.body.style.overflow = mobileMenu ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [mobileMenu]);
  useEffect(() => {
    if (!mobileMenu) return;
    const close = (event) => {
      if (event.key === 'Escape') { setMobileMenu(false); menuToggle.current?.focus(); }
      if (event.key === 'Tab') {
        const items = [menuToggle.current, ...document.querySelectorAll('.mobile-nav a')];
        const first = items[0], last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    const media = window.matchMedia('(max-width: 1100px)');
    const resize = () => { if (!media.matches) setMobileMenu(false); };
    document.addEventListener('keydown', close);
    media.addEventListener('change', resize);
    return () => { document.removeEventListener('keydown', close); media.removeEventListener('change', resize); };
  }, [mobileMenu]);
  const activeStage = projectStages[projectStage];
  const activeSemester = semesters[semester];
  return <>
    <a className="skip-link" href="#main">Перейти к содержанию</a>
    <header className="site-header">
      <div className="header-inner container">
        <a className="brand" href="#top" aria-label="МГИМО × Школа 21, на главную"><span>МГИМО</span><span className="brand-multiply">×</span><span>ШКОЛА 21</span></a>
        <nav className="desktop-nav" aria-label="Основная навигация">{navigation.map(([l, id]) => <NavLink key={id} label={l} id={id}/>)}</nav>
        <a href="#admissions" className="header-cta">Как поступить <ArrowUpRight size={15}/></a>
        <button type="button" className="mobile-toggle" ref={menuToggle} aria-controls="mobile-navigation" aria-label={mobileMenu ? 'Закрыть меню' : 'Открыть меню'} aria-expanded={mobileMenu} onClick={() => setMobileMenu(v => !v)}>{mobileMenu ? <X size={23}/> : <Menu size={23}/>}</button>
      </div>
      {mobileMenu && <nav id="mobile-navigation" className="mobile-nav" aria-label="Мобильная навигация">{navigation.map(([l,id]) => <NavLink key={id} id={id} label={l} onClick={()=>{setMobileMenu(false); requestAnimationFrame(()=>{const section=document.getElementById(id); section?.setAttribute('tabindex','-1'); section?.focus({preventScroll:true});});}}/>)}</nav>}
    </header>

    <main id="main">
      <aside className="admission-notice" aria-label="Статус приёма заявок"><div className="container notice-content"><div className="notice-message"><Info size={28} aria-hidden="true"/><div><strong>Приём заявок на набор 2026 завершён</strong><p>Новые сроки уточняются</p></div></div><a href="#admissions">Условия поступления <ChevronRight size={18}/></a></div></aside>
      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-orbit orbit-one" aria-hidden="true"/><div className="hero-orbit orbit-two" aria-hidden="true"/><div className="hero-globe" aria-hidden="true"><div className="globe-lat"/><div className="globe-long"/></div><div className="hero-point" aria-hidden="true"/>
        <div className="container hero-inner">
          <div className="hero-eyebrow">МАГИСТРАТУРА · МГИМО × ШКОЛА 21</div>
          <h1 id="hero-title">Создавайте цифровые продукты для <em>международных рынков</em></h1>
          <p className="hero-intro">Научитесь исследовать рынки, управлять цифровыми продуктами и работать с технологиями. Международная экспертиза МГИМО и практическая подготовка Школы 21 в одной магистратуре.</p>
          <div className="hero-actions"><a className="btn btn-mint" href="#about">Изучить программу <ArrowUpRight size={17}/></a><a className="btn btn-outline" href="#skills">Какие навыки я получу <ArrowRight size={17}/></a></div>
          <div className="hero-metrics"><div><strong>2 года</strong><span>Продолжительность</span></div><div><strong>20–30 ч</strong><span>В неделю</span></div><div><strong>Гибридно</strong><span>Формат обучения</span></div><div><strong>2 диплома</strong><span>Результат обучения</span></div></div>
        </div>
      </section>

      <section className="section section-light" id="about">
        <div className="container"><SectionTitle index="02" eyebrow="Синергия двух школ" title={<>Два образовательных подхода<br/>Одна продуктовая профессия</>}>Продуктовый менеджмент требует понимания бизнеса, пользователя и технологий. Здесь эти компетенции дополняют друг друга.</SectionTitle>
          <div className="partner-grid"><article className="partner-card"><div className="partner-symbol"><GraduationCap size={24}/></div><h3>МГИМО</h3><p>Международный менеджмент, экономика, право, профессиональный английский и особенности зарубежных рынков.</p><strong>Понимайте, где и для кого развивать продукт</strong></article><article className="partner-card partner-school"><div className="partner-symbol"><Code2 size={24}/></div><h3>Школа 21</h3><p>Технологическая грамотность, продуктовые инструменты, командная работа и обучение через практические задачи.</p><strong>Понимайте, как превратить идею в цифровое решение</strong></article></div>
          <div className="partner-outcome"><Sparkles size={24}/><span><strong>Результат партнёрства:</strong> специалист, способный связывать бизнес-цели, потребности аудитории и технологические решения</span></div>
        </div>
      </section>

      <section className="section section-mint" id="skills"><div className="container"><SectionTitle index="03" eyebrow="Ваши компетенции" title={<>От продуктовой гипотезы<br/>до решения для рынка</>}>Исследования, работа с данными, технологические инструменты и международная стратегия – навыки, которые вы будете развивать во время обучения.</SectionTitle>
        <div className="skills-grid">{[[Search,'Исследуйте','Изучайте аудиторию, находите потребности и проверяйте продуктовые гипотезы.'],[Database,'Анализируйте','Работайте с данными и оценивайте экономику цифрового продукта.'],[Layers3,'Проектируйте','Создавайте прототипы и планируйте развитие цифровых решений.'],[Globe2,'Выходите на рынки','Анализируйте международную среду и разрабатывайте стратегию локализации.']].map(([Icon,t,d])=><article className="skill-card" key={t}><span className="skill-icon"><Icon size={21}/></span><div><h3>{t}</h3><p>{d}</p></div></article>)}</div>
        <div className="tool-tags" aria-label="Изучаемые инструменты"><span>Python</span><span>SQL</span><span>API</span><span>Product research</span><span>ИИ-инструменты</span><span>Юнит-экономика</span></div>
      </div></section>

      <section className="section section-light" id="practice"><div className="container"><SectionTitle index="04" eyebrow="Практика" title={<>Работайте с продуктом<br/>на каждом этапе</>}>От исследования потребностей до стратегии развития: магистратура объединяет продуктовый подход, технологические инструменты и международный контекст.</SectionTitle>
        <div className="stages" role="tablist" aria-label="Этапы продуктовой работы">{projectStages.map((stage,i)=><button key={stage.short} type="button" className={`stage-tab ${projectStage===i?'active':''}`} id={`practice-tab-${i}`} aria-controls="practice-panel" tabIndex={projectStage===i?0:-1} onKeyDown={handleTabKey} aria-selected={projectStage===i} role="tab" onClick={()=>setProjectStage(i)}><span>ЭТАП {String(i+1).padStart(2,'0')}</span><strong>{stage.short}</strong></button>)}</div>
        <div className="stage-detail" id="practice-panel" aria-labelledby={`practice-tab-${projectStage}`} tabIndex={0} role="tabpanel" aria-live="polite"><div><span className="eyebrow eyebrow-on-dark">{String(projectStage+1).padStart(2,'0')} / ПРАКТИКА</span><h3>{activeStage.name}</h3><p>{activeStage.detail}</p></div><div className="stage-result"><span>РЕЗУЛЬТАТ ЭТАПА</span><strong>{activeStage.result}</strong></div></div>
      </div></section>

      <section className="section section-pale" id="curriculum"><div className="container"><SectionTitle index="05" eyebrow="Учебный план" title="Два года, которые складываются в профессию">Сначала управление продуктом и бизнесом, затем исследования и проектирование, технологии и анализ данных, а в финале – практика и выпускная работа.</SectionTitle>
        <div className="semester-tabs" role="tablist" aria-label="Выбрать семестр">{semesters.map((s,i)=><button key={s.title} type="button" className={`semester-tab ${semester===i?'active':''}`} id={`semester-tab-${i}`} aria-controls="semester-panel" tabIndex={semester===i?0:-1} onKeyDown={handleTabKey} aria-selected={semester===i} role="tab" onClick={()=>setSemester(i)}><small>{String(i+1).padStart(2,'0')} / СЕМЕСТР</small><strong>{s.title}</strong></button>)}</div>
        <div className="semester-content" id="semester-panel" aria-labelledby={`semester-tab-${semester}`} tabIndex={0} role="tabpanel" aria-live="polite"><div className="semester-main"><span className="eyebrow">{activeSemester.label}</span><h3>{activeSemester.name}</h3><p>{activeSemester.intro}</p><ul className="subjects">{activeSemester.subjects.map(s=><li key={s}>{s}</li>)}</ul>{activeSemester.electives && <><h4 className="electives-heading">Дисциплины по выбору</h4><ul className="subjects">{activeSemester.electives.map(s=><li key={s}>{s}</li>)}</ul></>}</div><aside className="semester-aside"><span className="eyebrow">Логика обучения</span><div className="semester-counter">{String(semester+1).padStart(2,'0')} / 04</div><strong>{activeSemester.result}</strong></aside></div>
      </div></section>

      <section className="section section-mint" id="format"><div className="container"><SectionTitle index="06" eyebrow="Формат обучения" title={<>Практика в течение семестра.<br/>Живое взаимодействие на интенсивах</>}>Гибридный формат позволяет совмещать обучение с работой. Учёба требует регулярного времени на занятия и проекты, а раз в семестр вы приезжаете на недельный очный интенсив в Москву.</SectionTitle>
        <div className="format-grid"><article className="format-card"><span className="format-icon"><BookOpen size={21}/></span><h3>Гибридное обучение</h3><p>Изучайте дисциплины, участвуйте в проектной работе, получайте обратную связь и взаимодействуйте с командой, не посещая кампус ежедневно.</p></article><article className="format-card"><span className="format-icon"><Users size={21}/></span><h3>Очные интенсивы</h3><p>Раз в семестр приезжайте на недельный интенсив в Москву, работайте над практическими задачами и встречайтесь с преподавателями и другими участниками программы.</p></article></div>
        <div className="format-metrics"><div><strong>20–30 ч</strong><span>Ориентир нагрузки в неделю</span></div><div><strong>1 неделя</strong><span>Очный интенсив каждый семестр</span></div><div><strong>2 года</strong><span>Полная продолжительность</span></div></div>
      </div></section>

      <section className="section section-light" id="teachers"><div className="container"><SectionTitle index="07" eyebrow="Преподаватели и эксперты" title="Люди, за которыми стоит программа">Академические знания и опыт специалистов цифровой индустрии – в одной образовательной команде.</SectionTitle>
        <div className="teachers-grid">{teachers.map((t)=><article className="teacher-card" key={t.name}><div className="teacher-portrait">{t.photo?<img src={t.photo} alt={`Портрет: ${t.name}`} loading="lazy"/>:<span aria-hidden="true">{t.initials}</span>}</div><div className="teacher-info"><h3>{t.name}</h3><strong>{t.field}</strong><p>{t.detail}</p></div></article>)}</div>
        <a className="inline-link" href={links.school} target="_blank" rel="noopener noreferrer">Подробнее о преподавателях <ArrowUpRight size={16}/></a>
      </div></section>

      <section className="section section-pale" id="outcomes"><div className="container"><SectionTitle index="08" eyebrow="Результат обучения" title="Образование, которое соединяет два подхода">После успешного завершения программы выпускники получают документы об образовании и практической подготовке.</SectionTitle>
        <div className="diplomas"><article className="diploma"><span>01 / МГИМО</span><GraduationCap size={31}/><div><h3>Диплом магистра</h3><p>38.04.05 «Бизнес-информатика»</p></div></article><article className="diploma"><span>02 / ШКОЛА 21</span><ShieldCheck size={31}/><div><h3>Диплом о профессиональной переподготовке</h3><p>Практическая подготовка в цифровых технологиях</p></div></article></div>
        <h3 className="careers-heading">Карьерные направления</h3><div className="careers">{[['Product Manager','Разработка и развитие цифрового продукта'],['Growth Product Manager','Поиск и масштабирование точек роста'],['Product Marketing Manager','Позиционирование и продвижение продукта'],['Business Development Manager','Развитие бизнеса и новых направлений']].map(([t,d])=><div className="career" key={t}><strong>{t}</strong><p>{d}</p></div>)}</div>
      </div></section>

      <section className="section section-light" id="pricing"><div className="container"><SectionTitle index="09" eyebrow="Стоимость и условия" title="Стоимость обучения" />
        <div className="pricing-grid"><article className="price-card"><span className="eyebrow">Стоимость одного семестра</span><div className="price-number">330 000 ₽</div><div className="price-rows"><div><span>1 учебный год</span><strong>660 000 ₽</strong></div><div><span>Вся программа (2 года)</span><strong>1 320 000 ₽</strong></div></div></article><article className="discount-card"><span className="eyebrow eyebrow-on-dark">ДОПОЛНИТЕЛЬНЫЕ ВОЗМОЖНОСТИ</span><h3>Скидки на обучение</h3><p>Для выпускников МГИМО, участников программ Школы 21 и отдельных категорий абитуриентов предусмотрены специальные условия.</p><button type="button" className="discount-toggle" onClick={()=>setDiscountOpen(v=>!v)} aria-expanded={discountOpen} aria-controls="discount-body">Подробнее об условиях скидок <ChevronDown size={17} className={discountOpen?'rotate':''}/></button>{discountOpen&&<div className="discount-body" id="discount-body"><p>Выпускникам МГИМО – 10%; выпускникам МГИМО с красным дипломом – 15%. Для отдельных категорий, связанных со Сбером и Школой 21, предусмотрена скидка 10% при подтверждении права на неё.</p><p>Дополнительные детали и применимость льгот уточняются у организаторов программы.</p></div>}</article></div>
      </div></section>

      <section className="section section-pale" id="admissions"><div className="container"><SectionTitle index="10" eyebrow="Поступление" title="Путь к магистратуре – по шагам">Ознакомьтесь с требованиями, подготовьте документы и пройдите вступительные испытания.</SectionTitle>
        <div className="admission-steps">{[['Изучите требования','Проверьте правила приёма и список необходимых документов.'],['Подайте заявление','Подготовьте документы и воспользуйтесь официальным личным кабинетом абитуриента.'],['Пройдите испытания','Напишите мотивационное эссе и пройдите собеседование.'],['Завершите поступление','Следите за результатами конкурса и инструкциями приёмной комиссии.']].map(([t,d],i)=><article className="admission-step" key={t}><div className="step-number">{String(i+1).padStart(2,'0')}</div><h3>{t}</h3><p>{d}</p></article>)}</div>
        <div className="admission-actions"><a className="btn btn-dark" href={links.mgimo} target="_blank" rel="noopener noreferrer">Условия поступления <ArrowUpRight size={17}/></a><a className="btn btn-light-outline" href={links.admissions} target="_blank" rel="noopener noreferrer">Личный кабинет абитуриента <ExternalLink size={16}/></a></div>
      </div></section>

      <section className="section section-mint" id="faq"><div className="container"><SectionTitle index="11" eyebrow="Частые вопросы" title="Что ещё важно знать перед поступлением" />
        <div className="faq-list">{frequentlyAsked.map(([q,a],i)=><article className="faq-item" key={q}><h3><button type="button" onClick={()=>setOpenFaq(v=>v===i?-1:i)} aria-expanded={openFaq===i} aria-controls={`faq-${i}`}>{q}<span aria-hidden="true">{openFaq===i?'−':'+'}</span></button></h3>{openFaq===i&&<p id={`faq-${i}`}>{a}</p>}</article>)}</div>
      </div></section>

      <section className="closing-section" id="contacts"><div className="container closing-layout"><div><span className="eyebrow eyebrow-on-dark">12 / Ваш следующий шаг</span><h2>Узнайте больше о поступлении на магистратуру</h2></div><div className="closing-copy"><p>Изучите официальные условия программы или свяжитесь с организаторами, чтобы уточнить информацию о следующей приёмной кампании.</p><div className="closing-actions"><a className="btn btn-mint" href={links.mgimo} target="_blank" rel="noopener noreferrer">Условия поступления <ArrowUpRight size={17}/></a><a className="btn btn-outline" href={links.email}>Задать вопрос <Mail size={17}/></a></div></div></div></section>
    </main>
    <footer className="site-footer">
      <div className="container footer-layout">
        <div className="footer-summary"><a href="#top" className="brand footer-brand"><span>МГИМО</span><span className="brand-multiply">×</span><span>ШКОЛА 21</span></a><p>Управление цифровыми продуктами на международных рынках</p></div>
        <nav className="footer-links" aria-label="Официальные страницы"><span className="footer-label">О программе</span><a href={links.mgimo} target="_blank" rel="noopener noreferrer">МГИМО <ArrowUpRight size={16}/></a><a href={links.school} target="_blank" rel="noopener noreferrer">Школа 21 <ArrowUpRight size={16}/></a></nav>
        <div className="footer-contact"><span className="footer-label">Контакты</span><a href={links.email}><Mail size={18}/><span>Mgimo_edu@21-school.ru</span></a></div>
      </div>
      <div className="container footer-disclosure">Подача документов — через <a href={links.admissions} target="_blank" rel="noopener noreferrer">официальный личный кабинет абитуриента МГИМО <ArrowUpRight size={14}/></a>.</div>
    </footer>
  </>;
}

export default App;
