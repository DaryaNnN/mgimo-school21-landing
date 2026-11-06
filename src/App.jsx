import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, BookOpen, Check, ChevronDown, ChevronRight, Code2, Compass, Database, ExternalLink, Globe2, GraduationCap, Info, Layers3, Mail, Menu, Search, ShieldCheck, Sparkles, TrendingUp, Users, X } from 'lucide-react';

const links = {
  mgimo: 'https://pk.odin.mgimo.ru/master/21',
  school: 'https://mgimo-pm.21-school.ru/',
  admissions: 'https://lka.mgimo.ru/',
  email: 'mailto:Mgimo_edu@21-school.ru',
  rules: 'https://abiturient.mgimo.ru/pravila-priema',
  exam: 'https://odin.mgimo.ru/pk/doc/26/master/vi/ucp_26.pdf',
  commission: 'https://abiturient.mgimo.ru/kontakty',
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
  { name: 'Инна Красовская', initials: 'ИК', field: 'Управление продуктом', detail: 'Индустриальный руководитель программы. Руководит B2B-продуктами в SaaS-компании в США; ранее работала в ВТБ и Сбере.', photo: null },
  { name: 'Виктор Ерохин', initials: 'ВЕ', field: 'Научно-исследовательская работа', detail: 'Доктор технических наук, профессор кафедры математических методов и бизнес-информатики МГИМО. Занимается научно-исследовательской подготовкой.', photo: null },
  { name: 'Екатерина Чикулаева', initials: 'ЕЧ', field: 'Маркетинг цифровых продуктов', detail: 'Маркетинг-бизнес-партнёр 2ГИС. Работала над развитием агентств EMAILMATRIX и «Лидмашина».', photo: null },
  { name: 'Станислав Дергунов', initials: 'СД', field: 'Цифровые бизнес-модели', detail: 'Руководитель продукта в Альфа-Банке. Ранее работал в Т-Банке и СберМаркете; специализируется на продуктах на стыке онлайн- и офлайн-сервисов.', photo: null },
];

const frequentlyAsked = [
  ['Можно ли поступить без профильного ИТ-образования?', 'Да. Программа рассчитана в том числе на людей без профильного ИТ-образования. Для поступления потребуется диплом о высшем образовании и успешное прохождение вступительных испытаний.'],
  ['Можно ли совмещать обучение с работой?', 'Гибридный формат позволяет совмещать обучение с работой. Рассчитывайте в среднем на 20–30 часов занятий и проектной деятельности в неделю, а также на недельный очный интенсив раз в семестр.'],
  ['Обучение полностью дистанционное?', 'Нет. Форма обучения очная, организация – гибридная. Один раз за семестр проходит недельный очный интенсив в Москве.'],
  ['Какие вступительные испытания предусмотрены?', <>В программе испытаний 2026 года указаны мотивационное эссе и профессиональное собеседование. Перед собеседованием выполняют продуктовый кейс и проходят тест по английскому языку. В <a href={links.exam} target="_blank" rel="noopener noreferrer">официальном PDF</a> есть структура ответа, критерии и два примера кейсов. Для следующего набора проверьте новую редакцию документа.</>],
  ['Какие образовательные документы получит выпускник?', 'После успешного завершения обучения предусмотрены диплом магистра МГИМО и диплом о профессиональной переподготовке Школы 21.'],
  ['Можно ли получить образовательный кредит или рассрочку?', 'Образовательный кредит для этой программы не предусмотрен. Стоимость указана за семестр; отдельную рассрочку и график платежей нужно согласовать до заключения договора.'],
  ['Как оплачивается обучение?', 'Оплата предусмотрена по семестрам. Даты платежей и финансовые условия закрепляются в договоре на обучение. Условия следующего набора уточняйте перед подписанием.'],
  ['Что важно знать об английском при поступлении?', 'Программа включает профессиональный английский. В испытаниях 2026 года есть тест на грамматику и лексику; на защите кейса возможны вопросы на английском. Тест входит в собеседование и отдельно не оценивается. Требования следующего набора смотрите в программе испытаний.'],
  ['Можно ли взять академический отпуск?', 'Академический отпуск возможен по уважительным причинам по заявлению студента. Порядок оформления, перерасчёта и возврата оплаты уточняйте по договору и правилам МГИМО до поступления.'],
  ['Когда можно поступить?', 'Приём заявок на набор 2026 года завершён. Следите за новыми сроками и правилами поступления на официальных страницах программы.'],
];

function SectionTitle({ index, eyebrow, title, children }) {
  return <div className="section-heading"><div className="eyebrow">{index} / {eyebrow}</div><h2>{title}</h2>{children && <p className="lead">{children}</p>}</div>;
}

function NavLink({ label, id, onClick, active }) { return <a href={`#${id}`} aria-current={active ? 'location' : undefined} onClick={onClick}>{label}</a>; }

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
  const [activeSection, setActiveSection] = useState('');
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
  useEffect(() => {
    let frame;
    const update = () => {
      const offset = document.querySelector('.site-header').offsetHeight + 32;
      const visible = navigation.filter(([, id]) => document.getElementById(id).getBoundingClientRect().top <= offset);
      setActiveSection(visible.at(-1)?.[1] || '');
    };
    const scroll = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', scroll, { passive: true });
    window.addEventListener('resize', scroll);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', scroll); window.removeEventListener('resize', scroll); };
  }, []);
  const activeStage = projectStages[projectStage];
  const activeSemester = semesters[semester];
  return <>
    <a className="skip-link" href="#main">Перейти к содержанию</a>
    <header className="site-header">
      <div className="header-inner container">
        <a className="brand" href="#top" aria-label="МГИМО × Школа 21, на главную"><span>МГИМО</span><span className="brand-multiply">×</span><span>ШКОЛА 21</span></a>
        <nav className="desktop-nav" aria-label="Основная навигация">{navigation.map(([l, id]) => <NavLink key={id} label={l} id={id} active={activeSection===id}/>)}</nav>
        <a href="#admissions" className="header-cta">Как поступить <ArrowUpRight size={15}/></a>
        <button type="button" className="mobile-toggle" ref={menuToggle} aria-controls="mobile-navigation" aria-label={mobileMenu ? 'Закрыть меню' : 'Открыть меню'} aria-expanded={mobileMenu} onClick={() => setMobileMenu(v => !v)}>{mobileMenu ? <X size={23}/> : <Menu size={23}/>}</button>
      </div>
      {mobileMenu && <nav id="mobile-navigation" className="mobile-nav" aria-label="Мобильная навигация">{navigation.map(([l,id]) => <NavLink key={id} id={id} label={l} active={activeSection===id} onClick={()=>{setMobileMenu(false); requestAnimationFrame(()=>{const section=document.getElementById(id); section?.setAttribute('tabindex','-1'); section?.focus({preventScroll:true});});}}/>)}</nav>}
    </header>

    <main id="main">
      <aside className="admission-notice" aria-label="Статус приёма заявок"><div className="container notice-content"><div className="notice-message"><Info size={28} aria-hidden="true"/><div><strong>Приём заявок на набор 2026 завершён</strong><p>Новые сроки уточняются</p></div></div><a href="#admissions">Условия поступления <ChevronRight size={18}/></a></div></aside>
      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-orbit orbit-one" aria-hidden="true"/><div className="hero-orbit orbit-two" aria-hidden="true"/><div className="hero-globe" aria-hidden="true"><div className="globe-lat"/><div className="globe-long"/></div><div className="hero-point" aria-hidden="true"/>
        <div className="container hero-inner">
          <div className="hero-eyebrow">МАГИСТРАТУРА · МГИМО × ШКОЛА 21</div>
          <h1 id="hero-title">Создавайте цифровые продукты для <em>международных рынков</em></h1>
          <p className="hero-programme">«Управление цифровыми продуктами на международных рынках»<span>Магистратура · 38.04.05 «Бизнес-информатика» · специализация «Управление продуктом»</span></p>
          <p className="hero-intro">Научитесь исследовать рынки, управлять цифровыми продуктами и работать с технологиями. Международная экспертиза МГИМО и практическая подготовка Школы 21 в одной магистратуре.</p>
          <div className="hero-actions"><a className="btn btn-mint" href="#about">Изучить программу <ArrowUpRight size={17}/></a><a className="btn btn-outline" href="#skills">Какие навыки я получу <ArrowRight size={17}/></a></div>
          <div className="hero-metrics"><div><strong>2 года</strong><span>Продолжительность</span></div><div><strong>20–30 ч</strong><span>В неделю</span></div><div><strong>Гибридно</strong><span>Формат обучения</span></div><div><strong>2 диплома</strong><span>Результат обучения</span></div></div>
        </div>
      </section>

      <section className="section section-light" id="about">
        <div className="container"><SectionTitle index="02" eyebrow="Синергия двух школ" title={<>Два образовательных подхода<br/>Одна продуктовая профессия</>}>Продуктовый менеджмент требует понимания бизнеса, пользователя и технологий. Здесь эти компетенции дополняют друг друга.</SectionTitle>
          <div className="partner-grid"><article className="partner-card"><div className="partner-symbol"><GraduationCap size={24}/></div><h3>МГИМО</h3><p>Международный менеджмент, экономика, право, профессиональный английский и особенности зарубежных рынков.</p><strong>Понимайте, где и для кого развивать продукт</strong></article><article className="partner-card partner-school"><div className="partner-symbol"><Code2 size={24}/></div><h3>Школа 21</h3><p>Технологическая грамотность, продуктовые инструменты, командная работа и обучение через практические задачи.</p><strong>Понимайте, как превратить идею в цифровое решение</strong></article></div>
          <div className="partner-outcome"><Sparkles size={24}/><span><strong>Результат партнёрства:</strong> специалист, способный связывать бизнес-цели, потребности аудитории и технологические решения</span></div>
          <div className="content-subsection" id="audience" aria-labelledby="audience-title">
            <h3 className="subsection-title" id="audience-title">Кому подходит программа</h3>
            <div className="audience-grid">
              {[[GraduationCap,'Выпускникам бакалавриата','Соберите базу для старта в продуктовом менеджменте: от исследования пользователей до понимания бизнеса и технологий.'],[TrendingUp,'Работающим специалистам','Дополните профессиональный опыт продуктовыми инструментами и международной экспертизой, продолжая работать.'],[Layers3,'Тем, кто меняет направление','Перенесите опыт из маркетинга, аналитики, бизнеса или других смежных сфер в управление цифровыми продуктами.']].map(([Icon,title,text])=><article className="audience-card" key={title}><Icon size={23} aria-hidden="true"/><h4>{title}</h4><p>{text}</p></article>)}
            </div>
            <p className="content-note"><strong>Профильное ИТ-образование не обязательно.</strong> Для поступления нужны диплом о высшем образовании и успешное прохождение вступительных испытаний. Для обучения заложите 20–30 часов в неделю и неделю очного интенсива каждый семестр.</p>
          </div>
        </div>
      </section>

      <section className="section section-mint" id="skills"><div className="container"><SectionTitle index="03" eyebrow="Ваши компетенции" title={<>От продуктовой гипотезы<br/>до решения для рынка</>}>Исследования, работа с данными, технологические инструменты и международная стратегия – навыки, которые вы будете развивать во время обучения.</SectionTitle>
        <div className="skills-grid">{[[Search,'Исследуйте','Изучайте аудиторию, находите потребности и проверяйте продуктовые гипотезы.'],[Database,'Анализируйте','Работайте с данными и оценивайте экономику цифрового продукта.'],[Layers3,'Проектируйте','Создавайте прототипы и планируйте развитие цифровых решений.'],[Globe2,'Выходите на рынки','Анализируйте международную среду и разрабатывайте стратегию локализации.']].map(([Icon,t,d])=><article className="skill-card" key={t}><span className="skill-icon"><Icon size={21}/></span><div><h3>{t}</h3><p>{d}</p></div></article>)}</div>
        <div className="tool-tags" aria-label="Изучаемые инструменты"><span>Python</span><span>SQL</span><span>API</span><span>Продуктовые исследования</span><span>ИИ-инструменты</span><span>Юнит-экономика</span></div>
        <dl className="tool-glossary">{[['Python','Основы программирования для работы с данными и понимания разработки.'],['SQL','Язык запросов: находить, объединять и анализировать данные в базах.'],['API','Программные интерфейсы: понимать, как продукт взаимодействует с другими сервисами.'],['ИИ','Искусственный интеллект: применять инструменты в прототипировании и разбираться в технологиях продукта.']].map(([term,definition])=><div key={term}><dt>{term}</dt><dd>{definition}</dd></div>)}</dl>
        <article className="international-focus"><Globe2 size={28} aria-hidden="true"/><div><h3>Международная специализация в задачах</h3><p>Исследуйте зарубежную аудиторию, учитывайте культурные и правовые особенности рынка, планируйте локализацию. Профессиональный английский помогает обосновать стратегию и представить её на иностранном языке — такая задача предусмотрена на интенсиве.</p></div></article>
      </div></section>

      <section className="section section-light" id="practice"><div className="container"><SectionTitle index="04" eyebrow="Практика" title={<>Работайте с продуктом<br/>на каждом этапе</>}>От исследования потребностей до стратегии развития: магистратура объединяет продуктовый подход, технологические инструменты и международный контекст.</SectionTitle>
        <div className="stages" role="tablist" aria-label="Этапы продуктовой работы">{projectStages.map((stage,i)=><button key={stage.short} type="button" className={`stage-tab ${projectStage===i?'active':''}`} id={`practice-tab-${i}`} aria-controls="practice-panel" tabIndex={projectStage===i?0:-1} onKeyDown={handleTabKey} aria-selected={projectStage===i} role="tab" onClick={()=>setProjectStage(i)}><span>ЭТАП {String(i+1).padStart(2,'0')}</span><strong>{stage.short}</strong></button>)}</div>
        <div className="stage-detail" id="practice-panel" aria-labelledby={`practice-tab-${projectStage}`} tabIndex={0} role="tabpanel" aria-live="polite"><div><span className="eyebrow eyebrow-on-dark">{String(projectStage+1).padStart(2,'0')} / ПРАКТИКА</span><h3>{activeStage.name}</h3><p>{activeStage.detail}</p></div><div className="stage-result"><span>РЕЗУЛЬТАТ ЭТАПА</span><strong>{activeStage.result}</strong></div></div>
        <div className="content-subsection" aria-labelledby="project-examples-title">
          <h3 className="subsection-title" id="project-examples-title">Какие задачи вы будете решать</h3>
          <p className="lead">Учебные задания очных интенсивов: от первого прототипа до стратегии выхода на зарубежный рынок.</p>
          <div className="project-examples">
            {[["01 / Прототип","Спроектировать цифровой продукт","Разберите продуктовый кейс и создайте прототип с применением инструментов искусственного интеллекта.","Результат работы: прототип и обоснование решения"],["02 / Зарубежный рынок","Подготовить стратегию локализации","Исследуйте рынок и аудиторию, учтите правовые, культурные и экономические различия. Подготовьте дорожную карту и представьте стратегию на иностранном языке.","Результат работы: стратегия, дорожная карта и расчёт экономики"],["03 / MVP","Проверить идею минимальным продуктом","MVP — минимально жизнеспособный продукт для проверки идеи. На интенсиве предусмотрены работа с реальным кейсом, культурная адаптация, экономика и рабочий прототип.","Результат работы: прототип и экономическое обоснование"]].map(([label,title,text,result])=><article className="project-example" key={label}><span className="eyebrow">{label}</span><h4>{title}</h4><p>{text}</p><strong>{result}</strong></article>)}
          </div>
          <p className="content-note">В программе предусмотрена проектная работа для внешних заказчиков. Выполненные проекты можно включать в портфолио: исследование, прототип и стратегию — с учётом условий конкретного проекта.</p>
        </div>
      </div></section>

      <section className="section section-pale" id="curriculum"><div className="container"><SectionTitle index="05" eyebrow="Учебный план" title="Два года, которые складываются в профессию">Сначала управление продуктом и бизнесом, затем исследования и проектирование, технологии и анализ данных, а в финале – практика и выпускная работа.</SectionTitle>
        <div className="semester-tabs" role="tablist" aria-label="Выбрать семестр">{semesters.map((s,i)=><button key={s.title} type="button" className={`semester-tab ${semester===i?'active':''}`} id={`semester-tab-${i}`} aria-controls="semester-panel" tabIndex={semester===i?0:-1} onKeyDown={handleTabKey} aria-selected={semester===i} role="tab" onClick={()=>setSemester(i)}><small>{String(i+1).padStart(2,'0')} / СЕМЕСТР</small><strong>{s.title}</strong></button>)}</div>
        <div className="semester-content" id="semester-panel" aria-labelledby={`semester-tab-${semester}`} tabIndex={0} role="tabpanel" aria-live="polite"><div className="semester-main"><span className="eyebrow">{activeSemester.label}</span><h3>{activeSemester.name}</h3><p>{activeSemester.intro}</p><ul className="subjects">{activeSemester.subjects.map(s=><li key={s}>{s}</li>)}</ul>{activeSemester.electives && <><h4 className="electives-heading">Дисциплины по выбору</h4><ul className="subjects">{activeSemester.electives.map(s=><li key={s}>{s}</li>)}</ul></>}</div><aside className="semester-aside"><span className="eyebrow">Логика обучения</span><div className="semester-counter">{String(semester+1).padStart(2,'0')} / 04</div><strong>{activeSemester.result}</strong></aside></div>
      </div></section>

      <section className="section section-mint" id="format"><div className="container"><SectionTitle index="06" eyebrow="Формат обучения" title={<>Практика в течение семестра.<br/>Живое взаимодействие на интенсивах</>}>Гибридный формат позволяет совмещать обучение с работой. Учёба требует регулярного времени на занятия и проекты, а раз в семестр вы приезжаете на недельный очный интенсив в Москву.</SectionTitle>
        <div className="format-grid"><article className="format-card"><span className="format-icon"><BookOpen size={21}/></span><h3>Гибридное обучение</h3><p>Изучайте дисциплины, участвуйте в проектной работе, получайте обратную связь и взаимодействуйте с командой, не посещая кампус ежедневно.</p></article><article className="format-card"><span className="format-icon"><Users size={21}/></span><h3>Очные интенсивы</h3><p>Раз в семестр приезжайте на недельный интенсив в Москву, работайте над практическими задачами и встречайтесь с преподавателями и другими участниками программы.</p></article></div>
        <div className="format-metrics"><div><strong>20–30 ч</strong><span>Ориентир нагрузки в неделю</span></div><div><strong>1 неделя</strong><span>Очный интенсив каждый семестр</span></div><div><strong>2 года</strong><span>Полная продолжительность</span></div></div>
        <div className="content-subsection" aria-labelledby="method-title"><h3 className="subsection-title" id="method-title">Как устроена работа над знаниями и проектами</h3>
          <div className="method-grid">
            <article className="method-card"><Users size={24} aria-hidden="true"/><h4>«Равный равному»</h4><p>Peer-to-peer — взаимное обучение. Участники обсуждают подходы, объясняют свои решения и учатся смотреть на задачу с разных сторон. Так развивается навык давать и принимать обратную связь.</p></article>
            <article className="method-card"><Layers3 size={24} aria-hidden="true"/><h4>В команде</h4><p>На очных интенсивах работайте над проектными задачами вместе с другими участниками. Договаривайтесь о решениях, распределяйте работу и аргументируйте продуктовую стратегию.</p></article>
            <article className="method-card"><BookOpen size={24} aria-hidden="true"/><h4>Самостоятельно и с преподавателями</h4><p>Изучайте теорию на лекциях и практических занятиях МГИМО, развивайте собственную исследовательскую работу и готовьте ВКР — выпускную квалификационную работу.</p></article>
          </div>
          <p className="content-note"><strong>Обратная связь — через обсуждение и защиту решений.</strong> Разбирайте проектные подходы с участниками, представляйте и обосновывайте результаты на занятиях и интенсивах. Конкретные формы контроля и график проверок уточняйте по дисциплинам.</p>
        </div>
        <div className="format-logistics"><div><span className="eyebrow">Два года · четыре семестра</span><h3>Планируйте время и очные встречи заранее</h3><p>Форма обучения — очная, организация — гибридная. Недельные интенсивы проходят в Москве; площадку каждого интенсива и расписание уточняйте у программы. Кампус МГИМО-Одинцово расположен по адресу: Одинцово, ул. Новоспортивная, 3. В течение семестра можно пользоваться инфраструктурой кампусов Школы 21.</p></div><aside><h4>Перед поступлением уточните</h4><ul><li>Дни и часы занятий, возможность совмещения с вашим рабочим графиком.</li><li>Условия проезда и проживания на интенсивах.</li><li>Требования к ноутбуку, операционной системе и программам.</li></ul><a className="inline-link" href={links.email}>Уточнить организационные вопросы <Mail size={17}/></a></aside></div>
      </div></section>

      <section className="section section-light" id="teachers"><div className="container"><SectionTitle index="07" eyebrow="Преподаватели и эксперты" title="Люди, за которыми стоит программа">Академические знания и опыт специалистов цифровой индустрии – в одной образовательной команде.</SectionTitle>
        <div className="teachers-grid">{teachers.map((t)=><article className="teacher-card" key={t.name}><div className="teacher-portrait">{t.photo?<img src={t.photo} alt={`Портрет: ${t.name}`} loading="lazy"/>:<span aria-hidden="true">{t.initials}</span>}</div><div className="teacher-info"><h3>{t.name}</h3><strong>{t.field}</strong><p>{t.detail}</p></div></article>)}</div>
        <a className="inline-link" href={links.school} target="_blank" rel="noopener noreferrer">Подробнее о преподавателях <ArrowUpRight size={16}/></a>
      </div></section>

      <section className="section section-pale" id="outcomes"><div className="container"><SectionTitle index="08" eyebrow="Результат обучения" title="Образование, которое соединяет два подхода">После успешного завершения соответствующих образовательных программ и итоговой аттестации предусмотрены два документа об образовании. В магистратуре финальный семестр включает практики, государственный междисциплинарный экзамен и ВКР.</SectionTitle>
        <div className="diplomas"><article className="diploma"><span>01 / МГИМО</span><GraduationCap size={31}/><div><h3>Диплом магистра</h3><p>Государственного образца · 38.04.05 «Бизнес-информатика»</p></div></article><article className="diploma"><span>02 / ШКОЛА 21</span><ShieldCheck size={31}/><div><h3>Диплом о профессиональной переподготовке</h3><p>Практическая подготовка в цифровых технологиях</p></div></article></div>
        <h3 className="careers-heading">Карьерные направления</h3><p className="lead careers-intro">Применяйте компетенции в продуктовых и бизнес-командах. Выбор роли зависит от вашего опыта, интересов и требований работодателя.</p><div className="careers">{[['Product Manager','Разработка и развитие цифрового продукта'],['Growth Product Manager','Поиск и масштабирование точек роста'],['Product Marketing Manager','Позиционирование и продвижение продукта'],['Business Development Manager','Развитие бизнеса и новых направлений']].map(([t,d])=><div className="career" key={t}><strong>{t}</strong><p>{d}</p></div>)}</div>
      </div></section>

      <section className="section section-light" id="pricing"><div className="container"><SectionTitle index="09" eyebrow="Стоимость и условия" title="Стоимость обучения" />
        <div className="pricing-grid"><article className="price-card"><span className="eyebrow">Стоимость одного семестра</span><div className="price-number">330 000 ₽</div><p className="payment-summary">Оплата по семестрам. Сроки платежей и условия оплаты закрепляются в договоре.</p><div className="price-rows"><div><span>1 учебный год</span><strong>660 000 ₽</strong></div><div><span>Вся программа (2 года)</span><strong>1 320 000 ₽</strong></div></div></article><article className="discount-card"><span className="eyebrow eyebrow-on-dark">ДОПОЛНИТЕЛЬНЫЕ ВОЗМОЖНОСТИ</span><h3>Скидки на обучение</h3><p>Для выпускников МГИМО, участников программ Школы 21 и отдельных категорий абитуриентов предусмотрены специальные условия.</p><button type="button" className="discount-toggle" onClick={()=>setDiscountOpen(v=>!v)} aria-expanded={discountOpen} aria-controls="discount-body">Подробнее об условиях скидок <ChevronDown size={17} className={discountOpen?'rotate':''}/></button><div className="discount-body" id="discount-body" hidden={!discountOpen}><p>Выпускникам МГИМО – 10%; выпускникам МГИМО с красным дипломом – 15%. Сотрудникам Сбера, их детям, выпускникам Школы 21 и программы «Основы» — 10%. Сотрудникам нужна справка с работы, выпускникам — итоговый сертификат. Документы для остальных категорий и возможность сочетать скидки уточняйте у организаторов.</p><p>Дополнительные детали и применимость льгот уточняются у организаторов программы.</p></div></article></div>
      </div></section>

      <section className="section section-pale" id="admissions"><div className="container"><SectionTitle index="10" eyebrow="Поступление" title="Путь к магистратуре – по шагам">Для поступления нужен диплом о высшем образовании. Профильное ИТ-образование и опыт работы продакт-менеджером не являются обязательным условием: важны подготовка к испытаниям и мотивация.</SectionTitle>
        <div className="admission-steps">{[
          ['Изучите требования','Проверьте правила приёма, календарь и план мест на нужный год. Подготовьтесь по официальной программе вступительных испытаний.'],
          ['Подайте заявление','Соберите документы по списку МГИМО. Загрузите читаемые электронные копии через личный кабинет абитуриента и получите подтверждение их приёма.'],
          ['Пройдите испытания','Подготовьте мотивационное эссе. По программе 2026 года собеседование включает защиту продуктового кейса; до него проходят тест по английскому.'],
          ['Пройдите конкурс и зачисление','Проверяйте результаты и конкурсные списки МГИМО. Соблюдайте сроки оформления договора и действий для зачисления, установленные правилами приёма.']
        ].map(([t,d],i)=><article className="admission-step" key={t}><div className="step-number">{String(i+1).padStart(2,'0')}</div><h3>{t}</h3><p>{d}</p></article>)}</div>
        <div className="admission-resources">
          <article><span className="eyebrow">Подготовка к испытаниям</span><h3>Покажите мотивацию и ход мысли</h3><p>В программе 2026 года эссе оценивается максимум в 20 баллов, решение кейса и его защита — в 80. Оцениваются аргументация, анализ задачи и гипотез, реалистичность решения, план проверки и умение его объяснить.</p><p>В PDF есть структура одностраничного решения и два примера продуктовых кейсов. Собеседование предусмотрено очно или онлайн; тест по английскому входит в него и отдельно не оценивается.</p><a className="inline-link" href={links.exam} target="_blank" rel="noopener noreferrer">Программа испытаний 2026 · PDF <ExternalLink size={17}/></a></article>
          <article><span className="eyebrow">Правила и документы</span><h3>Проверьте условия нужного года</h3><p>Полный список документов, требования к копиям, порядок ранжирования и зачисления определяет МГИМО. Наличие бюджетных мест, число договорных мест и конкурсные условия проверяйте по утверждённому плану приёма.</p><p>Опубликованная программа 2026 года поможет подготовиться. Условия и сроки следующего набора сверяйте с новой приёмной кампанией.</p><a className="inline-link" href={links.rules} target="_blank" rel="noopener noreferrer">Правила приёма МГИМО <ArrowUpRight size={17}/></a></article>
        </div>
        <div className="next-intake"><div><h3>Хотите узнать о следующем наборе?</h3><p>Приём заявок на 2026 год завершён. Следите за календарём подачи документов, экзаменов и зачисления на официальной странице или уточните сроки у организаторов.</p></div><a className="btn btn-dark" href={links.email}>Уточнить следующий набор <Mail size={17}/></a></div>
        <div className="admission-actions"><a className="btn btn-dark" href={links.admissions} target="_blank" rel="noopener noreferrer">Личный кабинет абитуриента <ExternalLink size={16}/></a><a className="btn btn-light-outline" href={links.mgimo} target="_blank" rel="noopener noreferrer">Официальная страница программы <ArrowUpRight size={17}/></a></div>
        <p className="consultation-note"><strong>Задать вопрос — получить информацию.</strong> Письмо организаторам не является заявлением на поступление. Официальное заявление подаётся через личный кабинет МГИМО. По работе кабинета и приёму документов обращайтесь в <a href={links.commission} target="_blank" rel="noopener noreferrer">приёмную комиссию МГИМО</a>.</p>
      </div></section>

      <section className="section section-mint" id="faq"><div className="container"><SectionTitle index="11" eyebrow="Частые вопросы" title="Что ещё важно знать перед поступлением" />
        <div className="faq-list">{frequentlyAsked.map(([q,a],i)=><article className="faq-item" key={q}><h3><button type="button" onClick={()=>setOpenFaq(v=>v===i?-1:i)} aria-expanded={openFaq===i} aria-controls={`faq-${i}`}>{q}<span aria-hidden="true">{openFaq===i?'−':'+'}</span></button></h3><p id={`faq-${i}`} hidden={openFaq!==i}>{a}</p></article>)}</div>
      </div></section>

      <section className="closing-section" id="contacts"><div className="container closing-layout"><div><span className="eyebrow eyebrow-on-dark">12 / Ваш следующий шаг</span><h2>Узнайте больше о поступлении на магистратуру</h2></div><div className="closing-copy"><p>Изучите официальные условия программы или свяжитесь с организаторами, чтобы уточнить информацию о следующей приёмной кампании.</p><div className="closing-actions"><a className="btn btn-mint" href={links.mgimo} target="_blank" rel="noopener noreferrer">Условия поступления <ArrowUpRight size={17}/></a><a className="btn btn-outline" href={links.email}>Задать вопрос <Mail size={17}/></a></div></div></div></section>
    </main>
    <footer className="site-footer">
      <div className="container footer-layout">
        <div className="footer-summary"><a href="#top" className="brand footer-brand"><span>МГИМО</span><span className="brand-multiply">×</span><span>ШКОЛА 21</span></a><p>Управление цифровыми продуктами на международных рынках</p></div>
        <nav className="footer-links" aria-label="Официальные страницы"><span className="footer-label">О программе</span><a href={links.mgimo} target="_blank" rel="noopener noreferrer">МГИМО <ArrowUpRight size={16}/></a><a href={links.school} target="_blank" rel="noopener noreferrer">Школа 21 <ArrowUpRight size={16}/></a></nav>
        <div className="footer-contact"><span className="footer-label">Контакты</span><a href={links.email}><Mail size={18}/><span>Mgimo_edu@21-school.ru</span></a></div>
      </div>
      <div className="container footer-disclosure">Независимый информационный проект, не официальный сайт МГИМО или Школы 21. Подача документов — через <a href={links.admissions} target="_blank" rel="noopener noreferrer">официальный личный кабинет абитуриента МГИМО <ArrowUpRight size={14}/></a>.</div>
    </footer>
  </>;
}

export default App;
