import styles from "./podcast-diagrams.module.css";

export function ModelReleaseDiagram() {
  const stages = [
    ["01", "Модель запустилась", "Загрузились веса. Пришёл ответ.", "Проверили запуск"],
    ["02", "Сценарий работает", "Качество, формат ответа и инструменты проходят проверку на ваших задачах.", "Проверили результат"],
    ["03", "Сервис держит нагрузку", "Известны задержки и пределы нагрузки. Есть наблюдение и путь отката.", "Проверили эксплуатацию"]
  ];
  return (
    <figure className={`${styles.figure} not-prose`} aria-labelledby="model-release-caption">
      <figcaption id="model-release-caption" className={styles.caption}>От первого ответа до рабочего сервиса</figcaption>
      <p className={styles.lead}>Каждый переход требует новой проверки.</p>
      <ol className={styles.stages}>
        {stages.map(([number, title, detail, evidence]) => (
          <li key={number} className={styles.stage}>
            <span className={styles.number} aria-hidden="true">{number}</span>
            <div><strong>{title}</strong><p>{detail}</p><span className={styles.evidence}>{evidence}</span></div>
          </li>
        ))}
      </ol>
      <p className={styles.footer}>Поддержка в движке открывает путь к проверке. Она не заменяет её.</p>
    </figure>
  );
}

export function AgentStopDiagram() {
  return (
    <figure className={`${styles.figure} not-prose`} aria-labelledby="agent-stop-caption">
      <figcaption id="agent-stop-caption" className={styles.caption}>Что останавливает агента</figcaption>
      <div className={styles.comparison}>
        <div className={styles.unbounded}>
          <p className={styles.label}>«Сделай идеально»</p>
          <p className={styles.loop}>Правка <span aria-hidden="true">→</span> Ревью <span aria-hidden="true">→</span> Правка</p>
          <p>Новый возможный недостаток становится новой задачей.</p>
          <div className={styles.return}>↻ Критерий завершения меняется по ходу работы</div>
        </div>
        <div className={styles.bounded}>
          <p className={styles.label}>Проверяемая задача</p>
          <p className={styles.loop}>Гипотеза <span aria-hidden="true">→</span> Проверка</p>
          <p>Сравнить результат с заранее заданным критерием.</p>
          <ul className={styles.outcomes}>
            <li><span>Критерий выполнен</span><strong>Завершить</strong></li>
            <li><span>Нет, бюджет остался</span><strong>Следующая гипотеза</strong></li>
            <li><span>Лимит или блокер</span><strong>Вернуться к человеку</strong></li>
          </ul>
        </div>
      </div>
      <p className={styles.footer}>Критерий, границы изменений и бюджет задают до запуска цикла.</p>
    </figure>
  );
}
