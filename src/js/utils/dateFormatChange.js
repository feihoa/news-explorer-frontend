export function dateFormatChange(d){
  d = d.replace(/T.*Z/, "").replace(/-0/, '-').split('-');

  const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

  let date = `${d[2]} ${months[d[1]]}, ${d[0]}`
  return date;
}