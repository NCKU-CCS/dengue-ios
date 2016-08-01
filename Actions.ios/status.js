export function changeStatus(title, id) {
  return {
    type: 'CHANGESTATUS',
    id,
    title,

  };
}
