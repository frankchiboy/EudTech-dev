const formatTaipeiDate = (date: Date) => {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Taipei',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
      .formatToParts(date)
      .filter((part) => part.type !== 'literal')
      .map((part) => [part.type, part.value])
  );

  return `${parts.year}-${parts.month}-${parts.day}`;
};

export const getSeoSchemaDate = () => {
  const buildDate = import.meta.env.VITE_BUILD_DATE as string | undefined;

  if (buildDate && /^\d{4}-\d{2}-\d{2}$/.test(buildDate)) {
    return buildDate;
  }

  return formatTaipeiDate(new Date());
};
