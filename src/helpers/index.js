export function Compare(a,b,field){
  if (a[field] > b[field]) return 1
  if (a[field] < b[field]) return -1
  return 0
}