export function weekAgo(date){

  date.setDate(date.getDate() - 7);
  return date.toISOString();

}