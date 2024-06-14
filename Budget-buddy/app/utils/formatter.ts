export const formatNumber = (value: number) => {
     let parts = value.toFixed(2).split('.');
     parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
     return parts.join('.');
}